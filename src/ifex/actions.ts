import emailjs from "@emailjs/browser";
import { trackEvent } from "../utils/analytics";

const CALENDLY_URL = "https://calendly.com/ifeobijiofor1/30min";

const EMAILJS = {
  service: "service_3a4370h",
  template: "template_7ks8ycb",
  publicKey: "N3iIrNRWbcEj_5ZZk",
  toEmail: "ifeobijiofor1@gmail.com",
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string; prefill?: Record<string, string> }) => void;
    };
  }
}

export interface NotifyPayload {
  brief: string;
  visitor_name?: string;
  visitor_contact?: string;
  timezone?: string;
  booking_promised?: boolean;
  followup_promised?: boolean;
  conversation_id?: string;
}

export function openCalendly(prefill?: { name?: string; email?: string }) {
  trackEvent("ifex_calendly_opened", { event_category: "engagement" });
  window.Calendly?.initPopupWidget({
    url: CALENDLY_URL,
    ...(prefill ? { prefill } : {}),
  });
}

export async function notifyIfe(payload: NotifyPayload): Promise<void> {
  const timezone =
    payload.timezone ??
    (typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "unknown");

  const status = payload.booking_promised
    ? "Pushed Calendly — may book"
    : payload.followup_promised
      ? "Promised you'd follow up"
      : "Left warm, no explicit promise";

  const message = [
    `New Ifex conversation flagged.`,
    ``,
    `Status: ${status}`,
    `Visitor timezone: ${timezone}`,
    ``,
    `Brief from Ifex:`,
    payload.brief,
    ``,
    payload.conversation_id ? `Conversation ID: ${payload.conversation_id}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await emailjs.send(
      EMAILJS.service,
      EMAILJS.template,
      {
        name: payload.visitor_name || "Ifex (portfolio visitor)",
        to_name: "Ife",
        email: payload.visitor_contact || "no-reply@ifex.local",
        to_email: EMAILJS.toEmail,
        message,
      },
      EMAILJS.publicKey,
    );
    trackEvent("ifex_notify_ife_sent", { event_category: "engagement" });
  } catch (err) {
    console.error("[ifex] notifyIfe failed:", err);
    trackEvent("ifex_notify_ife_failed", { event_category: "engagement" });
  }
}
