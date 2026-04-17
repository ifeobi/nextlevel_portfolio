import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie_consent";
type ConsentValue = "accepted" | "declined" | null;

declare function gtag(...args: unknown[]): void;

const CookieConsent = () => {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    if (stored === "accepted") {
      grantConsent();
      setConsent("accepted");
    } else if (stored === "declined") {
      setConsent("declined");
    } else {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const grantConsent = () => {
    gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
    grantConsent();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] px-4 py-4 sm:px-8 sm:py-5"
      style={{ backgroundColor: "#0d0d2b", borderTop: "1px solid #2a2a6a" }}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
        <p className="text-[#aaa6c3] text-[13px] sm:text-[14px] leading-relaxed flex-1">
          We use cookies to analyse traffic and improve your experience.
          By clicking{" "}
          <span className="text-white font-medium">Accept All</span>, you
          consent to our use of cookies.{" "}
          <a
            href="/privacy-policy"
            className="underline text-[#915eff] hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </p>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-[13px] text-[#aaa6c3] border border-[#2a2a6a] rounded hover:border-[#915eff] hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 text-[13px] text-white rounded font-medium transition-colors"
            style={{ backgroundColor: "#915eff" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7a4de0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#915eff")
            }
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
