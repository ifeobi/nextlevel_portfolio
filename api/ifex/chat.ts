import Anthropic from '@anthropic-ai/sdk';
import { neon } from '@neondatabase/serverless';
import { buildSystemPrompt } from '../../lib/ifex/system-prompt';
import type { ChatRequestBody, ChatMessage } from '../../lib/ifex/types';

export const config = { runtime: 'edge' };

const CLAUDE_MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;
const CALENDLY_URL = 'https://calendly.com/ifeobijiofor1/30min';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { visitorId, messages, timezone } = body;
  let { conversationId } = body;

  if (!visitorId || !Array.isArray(messages) || messages.length === 0) {
    return new Response('Missing visitorId or messages', { status: 400 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    return new Response('ANTHROPIC_API_KEY is not configured', { status: 500 });
  }

  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

  const system = buildSystemPrompt({
    today: new Date().toISOString().slice(0, 10),
    calendlyUrl: CALENDLY_URL,
    visitorTimezone: timezone,
  });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const emit = (type: string, data: Record<string, unknown> = {}) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type, ...data })}\n\n`),
        );
      };

      try {
        // Ensure conversation exists and persist the latest user message.
        // DB writes are best-effort — streaming must not fail if DB is unreachable.
        if (sql) {
          try {
            if (!conversationId) {
              const rows = await sql`
                insert into ifex_conversations (visitor_id)
                values (${visitorId})
                returning id
              ` as Array<{ id: string }>;
              conversationId = rows[0]?.id;
            }

            if (conversationId) {
              const lastUser = [...messages].reverse().find((m) => m.role === 'user');
              if (lastUser) {
                await sql`
                  insert into ifex_messages (conversation_id, role, content)
                  values (${conversationId}, 'user', ${lastUser.content})
                `;
                await sql`
                  update ifex_conversations
                  set last_message_at = now()
                  where id = ${conversationId}
                `;
              }
            }
          } catch (dbErr) {
            // Silent fail — keep serving the user; log for debugging.
            console.error('[ifex/chat] DB write failed:', dbErr);
          }
        }

        if (conversationId) {
          emit('conversation_id', { id: conversationId });
        }

        // Stream the model response.
        const response = await anthropic.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: MAX_TOKENS,
          system,
          messages: messages.map((m: ChatMessage) => ({
            role: m.role,
            content: m.content,
          })),
        });

        let assistantText = '';
        for await (const event of response) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            const chunk = event.delta.text;
            assistantText += chunk;
            emit('token', { content: chunk });
          }
        }

        // Persist assistant turn.
        if (sql && conversationId && assistantText) {
          try {
            await sql`
              insert into ifex_messages (conversation_id, role, content)
              values (${conversationId}, 'assistant', ${assistantText})
            `;
            await sql`
              update ifex_conversations
              set last_message_at = now()
              where id = ${conversationId}
            `;
          } catch (dbErr) {
            console.error('[ifex/chat] assistant persist failed:', dbErr);
          }
        }

        emit('done');
      } catch (err) {
        emit('error', { message: (err as Error).message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
