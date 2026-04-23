import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { trackEvent } from "../utils/analytics";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CalendlyAbandonModal = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const hasStartedFilling = useRef(false);

  useEffect(() => {
    if (isOpen) {
      hasStartedFilling.current = false;
      trackEvent("calendly_abandon_modal_opened", { event_category: "engagement" });
    }
  }, [isOpen]);

  const handleFieldChange = (field: string, value: string) => {
    if (!hasStartedFilling.current && value.length > 0) {
      hasStartedFilling.current = true;
      trackEvent("calendly_abandon_modal_field_start", {
        event_category: "engagement",
        field,
      });
    }
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;

    setSubmitting(true);
    trackEvent("calendly_abandon_feedback_submit", {
      event_category: "engagement",
      has_name: !!form.name.trim(),
      has_email: !!form.email.trim(),
    });

    try {
      await emailjs.send(
        "service_3a4370h",
        "template_7ks8ycb",
        {
          name: form.name || "Anonymous",
          to_name: "Ife",
          email: form.email || "not provided",
          to_email: "ifeobijiofor1@gmail.com",
          message: `[Calendly abandon feedback]\n\n${form.message}`,
        },
        "N3iIrNRWbcEj_5ZZk",
      );
      setSubmitted(true);
    } catch {
      // silently fail — feedback is a bonus, not a blocker
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    trackEvent("calendly_abandon_modal_closed", {
      event_category: "engagement",
      after_submit: submitted,
      had_started_filling: hasStartedFilling.current,
    });
    onClose();
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Non-interactive backdrop — intentionally no onClick */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[#1d1836] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/[0.08] relative pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="abandon-modal-title"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#aaa6c3] hover:text-white text-lg leading-none transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="text-3xl mb-4">🙏</div>
                  <h3 className="text-white font-bold text-[22px] mb-2">
                    Thanks — genuinely.
                  </h3>
                  <p className="text-[#aaa6c3] text-[14px] leading-relaxed">
                    Your message helps more than you know. I'll read it and take it seriously.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 bg-[#915eff] hover:bg-[#7c3aed] text-white text-[14px] font-semibold px-6 py-2.5 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h3
                    id="abandon-modal-title"
                    className="text-white font-bold text-[22px] mb-2"
                  >
                    No worries at all.
                  </h3>
                  <p className="text-[#aaa6c3] text-[14px] leading-relaxed mb-6">
                    Mind sharing what stopped you? Even one line helps — I'm genuinely
                    trying to understand what you're looking for, and maybe I can help
                    right now without a call.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={form.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      className="bg-[#151030] text-white placeholder:text-[#555] text-[14px] rounded-lg px-4 py-3 outline-none border border-white/[0.06] focus:border-[#915eff]/60 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email (optional — if you'd like a reply)"
                      value={form.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      className="bg-[#151030] text-white placeholder:text-[#555] text-[14px] rounded-lg px-4 py-3 outline-none border border-white/[0.06] focus:border-[#915eff]/60 transition-colors"
                    />
                    <textarea
                      rows={3}
                      required
                      placeholder='What stopped you? (even "bad timing" counts)'
                      value={form.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      className="bg-[#151030] text-white placeholder:text-[#555] text-[14px] rounded-lg px-4 py-3 outline-none border border-white/[0.06] focus:border-[#915eff]/60 transition-colors resize-none"
                    />

                    <button
                      type="submit"
                      disabled={submitting || !form.message.trim()}
                      className="bg-[#915eff] hover:bg-[#7c3aed] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors mt-1"
                    >
                      {submitting ? "Sending..." : "Send feedback →"}
                    </button>

                    <p className="text-[#555] text-[12px] text-center">
                      You can stay completely anonymous — name and email are optional.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalendlyAbandonModal;
