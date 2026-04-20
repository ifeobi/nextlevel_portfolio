import { lazy, Suspense, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { download } from "../assets";
import { trackEvent } from "../utils/analytics";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const PROFILE_IMG = "https://ik.imagekit.io/sco75u7ale/ife%20from%20chatgpt.png";

/** Avoid mounting WebGL on narrow viewports (Tailwind `sm` = 640px). */
function useMinWidthSm() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(min-width: 640px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 640px)").matches,
    () => false
  );
}

const Hero = () => {
  const showDeskCanvas = useMinWidthSm();

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
                The AI age is here — is your business actually in it?
              </span>
            </div>

            <h1
              id="hero-heading"
              className={`${styles.heroHeadText} lg:text-[72px] sm:text-[54px] xs:text-[46px] text-[36px]`}
            >
              Every competitor
              <br className="hidden sm:block" />
              is <span className="text-[#915eff]">automating.</span>
              <br />
              Your business still
              <br className="hidden sm:block" />
              runs on gut feel.
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I'm Ife — I build the systems that change that. AI pipelines, full SaaS,
              revenue recovery tools. My last system contributed to{" "}
              <span className="text-white font-semibold">$2M+ in recovered receivables.</span>{" "}
              I work like I have a stake in the outcome, because I treat every business I touch like it's my own.
            </p>
            <p className="mt-3 text-[13px] text-[#aaa6c3] font-medium">
              Not another remote dev who goes quiet after onboarding.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/ife-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#915eff] hover:bg-[#7c3aed] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                <img src={download} alt="download" className="w-4 h-4 object-contain invert" />
                Download CV
              </a>
              <button
                onClick={() => {
                  trackEvent("calendly_popup_opened", { event_category: "engagement" });
                  (window as any).Calendly?.initPopupWidget({ url: 'https://calendly.com/ifeobijiofor1/30min' });
                }}
                className="flex items-center gap-2 bg-white text-[#915eff] hover:bg-[#f3f0ff] text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                Book a call
              </button>
              <a
                href="#work"
                className="flex items-center gap-2 border border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                See the work →
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
                <a href="#about" className="pointer-events-auto" aria-label="Scroll to About">
                  <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                    <motion.div
                      animate={{ y: [0, 24, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                      className="w-3 h-3 rounded-full bg-secondary mb-1"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Hero;
