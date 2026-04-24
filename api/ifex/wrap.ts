import Anthropic from '@anthropic-ai/sdk';
import { neon } from '@neondatabase/serverless';
import type { WrapRequestBody, KeyPoints } from '../../lib/ifex/types';

export const config = { runtime: 'edge' };

const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 512;

const SUMMARIZER_PROMPT = `You are a summarizer for Ife's portfolio chat. You will be given a transcript between a visitor and Ifex (Ife's alter-ego assistant).

Return a single JSON object, nothing else, with this shape:

{
  "summary": "2–4 sentences. What the visitor seemed to want, the vibe of the chat, and whether there's a potential opportunity here for Ife.",
  "key_points": {
    "problem": "The actual problem the visitor wants solved, in their own framing. Omit if unclear.",
    "role_type": "one_off_project | monthly_contract | full_time | unclear",
    "signals": ["short phrases of what stood out — hiring intent, budget hints, technical needs, tone"],
    "contact": "Email, LinkedIn, or any contact the visitor offered. Omit if none."
  }
}

Only include fields you have real evidence for. Output JSON only. No prose, no markdown.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let body: WrapRequestBody;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  if (!body?.conversationId || !Array.isArray(body.messages) || body.messages.length === 0) {
    return json({ error: 'Missing conversationId or messages' }, 400);
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return json({ error: 'ANTHROPIC_API_KEY is not configured' }, 500);
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return json({ error: 'DATABASE_URL is not configured' }, 500);
  }

  const transcript = body.messages
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join('\n\n');

  const anthropic = new Anthropic({ apiKey: anthropicKey });

  let summary: string | null = null;
  let keyPoints: KeyPoints | null = null;

  try {
    const result = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system: SUMMARIZER_PROMPT,
      messages: [{ role: 'user', content: transcript }],
    });

    const textBlock = result.content.find((c) => c.type === 'text');
    const raw = textBlock && textBlock.type === 'text' ? textBlock.text.trim() : '';

    const parsed = JSON.parse(stripCodeFence(raw));
    summary = typeof parsed.summary === 'string' ? parsed.summary : null;
    keyPoints = parsed.key_points ?? null;
  } catch (err) {
    console.error('[ifex/wrap] summarizer failed:', err);
    return json({ error: 'Summarizer failed' }, 502);
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      update ifex_conversations
      set summary = ${summary},
          key_points = ${keyPoints ? JSON.stringify(keyPoints) : null}::jsonb,
          ended_at = now()
      where id = ${body.conversationId}
    `;
  } catch (err) {
    console.error('[ifex/wrap] DB write failed:', err);
    return json({ error: 'DB write failed' }, 500);
  }

  return json({ ok: true, summary, key_points: keyPoints });
}

function stripCodeFence(s: string): string {
  const m = s.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
  return m ? m[1] : s;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
