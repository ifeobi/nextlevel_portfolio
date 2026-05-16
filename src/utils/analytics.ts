declare function gtag(...args: unknown[]): void;
declare function fbq(...args: unknown[]): void;

// Map high-intent custom events to Meta Pixel *standard* events so Meta Ads
// can target them as conversion objectives. Everything else still flows
// through as a custom event via `trackCustom`.
const META_STANDARD_EVENTS: Record<string, string> = {
  contact_form_submit: "Lead",
  calendly_booking_completed: "Schedule",
  ifex_calendly_opened: "InitiateCheckout",
};

export const trackEvent = (
  eventName: string,
  params?: Record<string, unknown>,
) => {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, params);
  }

  if (typeof fbq !== "undefined") {
    fbq("trackCustom", eventName, params ?? {});
    const standard = META_STANDARD_EVENTS[eventName];
    if (standard) {
      fbq("track", standard, params ?? {});
    }
  }
};
