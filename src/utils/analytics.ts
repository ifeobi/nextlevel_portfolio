declare function gtag(...args: unknown[]): void;

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, params);
  }
};
