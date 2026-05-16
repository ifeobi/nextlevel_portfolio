import { lazy, Suspense, useSyncExternalStore, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { download } from "../assets";
import { trackEvent } from "../utils/analytics";
import CalendlyAbandonModal from "./CalendlyAbandonModal";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const PROFILE_IMG =
  "https://ik.imagekit.io/sco75u7ale/ife%20from%20chatgpt.png";

/** Avoid mounting WebGL on narrow viewports (Tailwind `sm` = 640px). */
function useMinWidthSm() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 640px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 640px)").matches,
    () => false,
  );
}

const Hero = () => {
  const showDeskCanvas = useMinWidthSm();
  const [showAbandonModal, setShowAbandonModal] = useState(false);

  const handleBookCall = () => {
    trackEvent("calendly_popup_opened", { event_category: "engagement" });

    let booked = false;
    let overlaySeenOnce = false;

    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "calendly.event_scheduled") {
          booked = true;
        }
      } catch {
        // ignore non-JSON messages
      }
    };
    window.addEventListener("message", handleMessage);

    const observer = new MutationObserver(() => {
      const overlay = document.querySelector(".calendly-overlay");
      if (overlay) {
        overlaySeenOnce = true;
      } else if (overlaySeenOnce) {
        observer.disconnect();
        window.removeEventListener("message", handleMessage);
        if (!booked) {
          trackEvent("calendly_popup_abandoned", {
            event_category: "engagement",
          });
          setShowAbandonModal(true);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    (window as any).Calendly?.initPopupWidget({
      url: "https://calendly.com/ifeobijiofor1/30min",
    });
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative w-full pt-32 pb-12 sm:pt-40 sm:pb-16 mx-auto"
    >
      {/* Intro row: accent + headline/CTAs + avatar (aligned to one content width) */}
      <div
        className={`${styles.paddingX} max-w-7xl mx-auto w-full flex items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5 flex-shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-56 h-36 violet-gradient" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#915eff] animate-pulse" />
              <span className="text-[#915eff] text-[13px] font-medium tracking-wide">
                Senior Fullstack Engineer · TypeScript · AI Systems
              </span>
            </div>

            <h1
              id="hero-heading"
              className={`${styles.heroHeadText} text-[32px] leading-[1.12] xs:text-[42px] sm:text-[54px] sm:leading-tight lg:text-[72px] lg:leading-[88px]`}
            >
              Hi, I'm <span className="text-[#915eff]">Ife.</span>
              <br />
              I build production <br className="hidden sm:block" />
              SaaS, backend <br className="hidden sm:block" />
              systems, and AI tools.
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Former practising lawyer turned senior fullstack engineer.
              5+ years building enterprise-grade websites and automated
              systems for teams across{" "}
              <span className="text-white font-semibold">
                Africa, Europe, and the USA
              </span>{" "}
              — full-stack TypeScript SaaS, backend system design, and
              enterprise AI integration.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/ife-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#915eff] hover:bg-[#7c3aed] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                <img
                  src={download}
                  alt="download"
                  className="w-4 h-4 object-contain invert"
                />
                Download CV
              </a>
              <button
                type="button"
                onClick={handleBookCall}
                className="flex items-center gap-2 bg-white text-[#915eff] hover:bg-[#f3f0ff] text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                Book a call
              </button>
              <a
                href="#work"
                className="flex items-center gap-2 border border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                View work →
              </a>
            </div>
          </div>

          <div className="hidden sm:block flex-shrink-0 lg:pt-2">
            <div className="w-[130px] h-[130px] rounded-full border-2 border-[#915eff] overflow-hidden shadow-lg shadow-[#915eff33]">
              <img
                src={PROFILE_IMG}
                alt="Ife Obijiofor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {showDeskCanvas ? (
        <div className={`mt-8 sm:mt-10 ${styles.paddingX}`}>
          <div className="max-w-7xl mx-auto">
            <div className="relative w-full h-[min(52vh,560px)] min-h-[300px] rounded-2xl overflow-hidden border border-white/[0.08] bg-transparent isolate">
              <Suspense fallback={null}>
                <ComputersCanvas />
              </Suspense>
              <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
                <a
                  href="#about"
                  className="pointer-events-auto"
                  aria-label="Scroll to About"
                >
                  <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                    <motion.div
                      animate={{ y: [0, 24, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                      }}
                      className="w-3 h-3 rounded-full bg-secondary mb-1"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <CalendlyAbandonModal
        isOpen={showAbandonModal}
        onClose={() => setShowAbandonModal(false)}
      />
    </section>
  );
};

export default Hero;
