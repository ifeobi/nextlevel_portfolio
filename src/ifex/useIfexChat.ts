import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../lib/ifex/types";
import { extractActions, visibleText, type IfexActions } from "./parseActions";
import { trackEvent } from "../utils/analytics";

const VISITOR_KEY = "ifex_visitor_id";

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export interface UseIfexChatState {
  messages: ChatMessage[];
  streaming: string;
  isStreaming: boolean;
  error: string | null;
  send: (text: string) => Promise<void>;
  stop: () => void;
  /** Fired exactly once after a response completes, if Ifex emitted an actions block. */
  onActions: (cb: (actions: IfexActions, conversationId: string | null) => void) => void;
}

export function useIfexChat(): UseIfexChatState {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streaming, setStreaming] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const conversationIdRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const streamingBufferRef = useRef("");
  const rafRef = useRef<number | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const actionsListenerRef = useRef<
    ((actions: IfexActions, conversationId: string | null) => void) | null
  >(null);

  const onActions = useCallback(
    (cb: (actions: IfexActions, conversationId: string | null) => void) => {
      actionsListenerRef.current = cb;
    },
    [],
  );

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Best-effort wrap when the tab is closed or navigated away.
  useEffect(() => {
    const flushWrap = () => {
      const conversationId = conversationIdRef.current;
      const msgs = messagesRef.current;
      if (!conversationId || msgs.length === 0) return;

      const body = JSON.stringify({
        visitorId: getVisitorId(),
        conversationId,
        messages: msgs,
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/ifex/wrap", blob);
      } else {
        fetch("/api/ifex/wrap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => undefined);
      }
    };

    window.addEventListener("pagehide", flushWrap);
    return () => {
      window.removeEventListener("pagehide", flushWrap);
    };
  }, []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setError(null);

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messagesRef.current, userMsg];
    setMessages(nextMessages);

    setIsStreaming(true);
    streamingBufferRef.current = "";
    setStreaming("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ifex/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          visitorId: getVisitorId(),
          conversationId: conversationIdRef.current ?? undefined,
          messages: nextMessages,
          timezone:
            typeof Intl !== "undefined"
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : undefined,
        }),
      });

      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => `HTTP ${res.status}`);
        throw new Error(msg || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          let event: Record<string, unknown>;
          try {
            event = JSON.parse(line.slice(6));
          } catch {
            continue;
          }

          const type = event.type as string;

          if (type === "conversation_id") {
            conversationIdRef.current = event.id as string;
          } else if (type === "token") {
            streamingBufferRef.current += (event.content as string) ?? "";
            if (rafRef.current === null) {
              rafRef.current = requestAnimationFrame(() => {
                // Display only the text before any <ifex-actions> marker —
                // prevents the tag flashing in the UI while we're still streaming.
                setStreaming(visibleText(streamingBufferRef.current));
                rafRef.current = null;
              });
            }
          } else if (type === "error") {
            throw new Error((event.message as string) ?? "Stream error");
          } else if (type === "done") {
            // Handled in finally.
          }
        }
      }

      const rawFinal = streamingBufferRef.current;
      const actions = extractActions(rawFinal);
      const visible = visibleText(rawFinal);

      if (visible) {
        setMessages((prev) => [...prev, { role: "assistant", content: visible }]);
      }

      if (actions && actionsListenerRef.current) {
        actionsListenerRef.current(actions, conversationIdRef.current);
      }

      trackEvent("ifex_stream_completed", {
        event_category: "engagement",
        response_length: visible.length,
        fired_calendly: !!actions?.open_calendly,
        fired_notify: !!actions?.notify_ife,
      });
    } catch (err) {
      const name = (err as Error).name;
      if (name !== "AbortError") {
        setError((err as Error).message);
        trackEvent("ifex_stream_error", {
          event_category: "engagement",
          message: (err as Error).message.slice(0, 120),
        });
      } else {
        trackEvent("ifex_stream_aborted", { event_category: "engagement" });
      }
    } finally {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setStreaming("");
      streamingBufferRef.current = "";
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [isStreaming]);

  return { messages, streaming, isStreaming, error, send, stop, onActions };
}
