import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useIfexChat } from "./useIfexChat";
import { openCalendly, notifyIfe } from "./actions";
import { trackEvent } from "../utils/analytics";

const GREETING =
  "Hi — I'm Ifex, Ife's alter ego. He's probably already pitched you something about AI or systems somewhere on this page. Tell me what you'd actually want solved, and I'll see how we can help.";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hasUnread, setHasUnread] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const { messages, streaming, isStreaming, error, send, stop, onActions } = useIfexChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const INPUT_MAX_HEIGHT = 140;
  const autoGrow = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, INPUT_MAX_HEIGHT)}px`;
  };
  const wasStreamingRef = useRef(false);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  useEffect(() => {
    if (open) {
      setHasUnread(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // If a response finishes while the panel is closed, surface an unread dot.
  useEffect(() => {
    if (wasStreamingRef.current && !isStreaming && !openRef.current) {
      setHasUnread(true);
    }
    wasStreamingRef.current = isStreaming;
  }, [isStreaming]);

  useEffect(() => {
    onActions((actions, conversationId) => {
      if (actions.open_calendly) {
        openCalendly({
          ...(actions.visitor_name ? { name: actions.visitor_name } : {}),
          ...(actions.visitor_contact ? { email: actions.visitor_contact } : {}),
        });
      }

      if (actions.notify_ife) {
        void notifyIfe({
          brief: actions.brief ?? "(Ifex did not provide a brief)",
          visitor_name: actions.visitor_name,
          visitor_contact: actions.visitor_contact,
          booking_promised: actions.booking_promised,
          followup_promised: actions.followup_promised,
          conversation_id: conversationId ?? undefined,
          timezone:
            typeof Intl !== "undefined"
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : undefined,
        });
      }
    });
  }, [onActions]);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        trackEvent("ifex_chat_opened", {
          event_category: "engagement",
          first_open: !hasOpenedOnce,
          message_count: messages.length,
        });
        if (!hasOpenedOnce) setHasOpenedOnce(true);
      } else {
        trackEvent("ifex_chat_closed", {
          event_category: "engagement",
          message_count: messages.length,
        });
      }
      return next;
    });
  };

  const submit = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");
    // Reset textarea height after clearing.
    requestAnimationFrame(() => {
      if (inputRef.current) inputRef.current.style.height = "auto";
    });
    trackEvent("ifex_message_sent", {
      event_category: "engagement",
      turn_index: messages.filter((m) => m.role === "user").length + 1,
      message_length_bucket: lengthBucket(text),
    });
    await send(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits; Shift+Enter inserts a newline (ChatGPT/Claude convention).
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  // "Thinking" state: user sent a turn, stream is live, but no tokens yet.
  const thinking = isStreaming && !streaming;

  return (
    <>
      {/* Floating trigger — pill with emoji + label */}
      <button
        type="button"
        aria-label={open ? "Close Ifex chat" : "Chat with Ifex"}
        onClick={handleToggle}
        className="fixed bottom-5 right-5 z-[9998] flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-transform hover:scale-105"
        style={{
          backgroundColor: "#915eff",
          color: "white",
          boxShadow: "0 8px 24px rgba(145,94,255,0.35)",
        }}
      >
        <span aria-hidden="true" className="text-[18px] leading-none">
          {open ? "×" : "😎"}
        </span>
        <span className="text-[13px] font-medium">
          {open ? "Close" : "Chat with Ifex"}
        </span>
        {hasUnread && !open && (
          <span
            aria-label="New reply"
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
            style={{ backgroundColor: "#f87171", borderColor: "#0d0d2b" }}
          />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            role="dialog"
            aria-label="Chat with Ifex"
            className="fixed bottom-20 right-5 z-[9997] w-[min(92vw,380px)] h-[min(70vh,560px)] flex flex-col rounded-xl overflow-hidden"
            style={{
              backgroundColor: "#0d0d2b",
              border: "1px solid #2a2a6a",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid #1a1a4a" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#4ade80" }}
                  aria-hidden="true"
                />
                <div>
                  <div className="text-white text-[14px] font-medium">Ifex</div>
                  <div className="text-[#aaa6c3] text-[11px]">Ife's alter ego</div>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={handleToggle}
                className="text-[#aaa6c3] hover:text-white transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            >
              {messages.length === 0 && !streaming && !thinking && (
                <MessageBubble role="assistant" content={GREETING} />
              )}
              {messages.map((m, i) => (
                <MessageBubble key={i} role={m.role} content={m.content} />
              ))}
              {thinking && <ThinkingBubble />}
              {streaming && (
                <MessageBubble role="assistant" content={streaming} streaming />
              )}
              {error && (
                <div className="text-[12px] text-red-400 italic">{error}</div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 flex gap-2 items-end"
              style={{ borderTop: "1px solid #1a1a4a" }}
            >
              <textarea
                ref={inputRef}
                value={input}
                rows={1}
                onChange={(e) => {
                  setInput(e.target.value);
                  autoGrow();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything... (Shift+Enter for newline)"
                disabled={isStreaming}
                className="flex-1 px-3 py-2 text-[13px] text-white rounded outline-none resize-none leading-relaxed"
                style={{
                  backgroundColor: "#050816",
                  border: "1px solid #2a2a6a",
                  maxHeight: `${INPUT_MAX_HEIGHT}px`,
                  overflowY: "auto",
                }}
              />
              {isStreaming ? (
                <button
                  type="button"
                  onClick={stop}
                  className="px-3 py-2 text-[13px] rounded text-white"
                  style={{ backgroundColor: "#2a2a6a" }}
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-3 py-2 text-[13px] rounded text-white font-medium disabled:opacity-40"
                  style={{ backgroundColor: "#915eff" }}
                >
                  Send
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const MessageBubble = ({ role, content, streaming }: MessageBubbleProps) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] px-3 py-2 rounded-lg text-[13px] leading-relaxed whitespace-pre-wrap"
        style={
          isUser
            ? { backgroundColor: "#915eff", color: "white" }
            : { backgroundColor: "#1a1a4a", color: "#e4e1f5" }
        }
      >
        {content}
        {streaming && (
          <span
            className="inline-block w-1 h-3 ml-1 align-middle animate-pulse"
            style={{ backgroundColor: "#aaa6c3" }}
          />
        )}
      </div>
    </div>
  );
};

const ThinkingBubble = () => (
  <div className="flex justify-start">
    <div
      className="px-3 py-2 rounded-lg text-[13px] flex items-center gap-1"
      style={{ backgroundColor: "#1a1a4a", color: "#aaa6c3" }}
    >
      <span className="italic">Ifex is thinking</span>
      <span className="flex gap-1 ml-1">
        <Dot delay={0} />
        <Dot delay={0.15} />
        <Dot delay={0.3} />
      </span>
    </div>
  </div>
);

function lengthBucket(text: string): string {
  const n = text.length;
  if (n < 30) return "short";
  if (n < 120) return "medium";
  if (n < 400) return "long";
  return "xlong";
}

const Dot = ({ delay }: { delay: number }) => (
  <motion.span
    className="inline-block w-1 h-1 rounded-full"
    style={{ backgroundColor: "#aaa6c3" }}
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ duration: 1.1, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

export default ChatWidget;
