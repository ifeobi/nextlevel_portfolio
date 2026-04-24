export interface IfexActions {
  open_calendly?: boolean;
  notify_ife?: boolean;
  visitor_name?: string;
  visitor_contact?: string;
  brief?: string;
  booking_promised?: boolean;
  followup_promised?: boolean;
}

const MARKER_OPEN = "<ifex-actions>";
const MARKER_CLOSE = "</ifex-actions>";
const MARKER_RE = /<ifex-actions>([\s\S]*?)<\/ifex-actions>/;

/**
 * Return the part of the streaming buffer that's safe to display right now.
 * If the opening marker has appeared, we hide everything from that point on
 * to prevent the raw tag from flashing before the stream finishes.
 */
export function visibleText(buffer: string): string {
  const idx = buffer.indexOf(MARKER_OPEN);
  return idx === -1 ? buffer : buffer.slice(0, idx).trimEnd();
}

/**
 * Extract actions from a completed response. Returns null if no marker present
 * or if the marker's payload isn't parseable JSON.
 */
export function extractActions(fullText: string): IfexActions | null {
  const m = fullText.match(MARKER_RE);
  if (!m) return null;
  try {
    const parsed = JSON.parse(m[1].trim());
    if (parsed && typeof parsed === "object") return parsed as IfexActions;
  } catch {
    // model emitted malformed JSON — swallow
  }
  return null;
}
