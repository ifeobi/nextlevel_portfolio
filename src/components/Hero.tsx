import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { download } from "../assets";

const LINKEDIN_URL = "https://www.linkedin.com/in/ifechukwu-obijiofor-761040109/";
const PROFILE_IMG = "https://ik.imagekit.io/sco75u7ale/ife%20from%20chatgpt.png";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} hero-overlay absolute top-[120px] left-0 right-0 max-w-7xl mx-auto flex items-start gap-5 z-10`}
      >
        {/* accent line */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* text + photo */}
        <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            {/* availability badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-[13px] font-medium tracking-wide">
                Currently evaluating 1–2 remote partnerships
              </span>
            </div>

            <h1 className={`${styles.heroHeadText}`}>
              The engineer companies <span className="text-[#915eff]">bring in</span>{" "}
              <br className="hidden sm:block" />
              when everything needs to ship.
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              I architect AI-powered SaaS systems solo — end-to-end.{" "}
              <br className="hidden sm:block" />
              My last build contributed to $2M+ in recovered receivables.
            </p>

            {/* CTA buttons — interactive */}
            <div className="hero-interactive mt-6 flex flex-wrap gap-3">
              <a
                href="/ife-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#915eff] hover:bg-[#7c3aed] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                <img src={download} alt="download" className="w-4 h-4 object-contain invert" />
                Download CV
              </a>
              <a
                href="#work"
                className="flex items-center gap-2 border border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                See the work →
              </a>
            </div>
          </div>

          {/* profile picture — interactive */}
          <div className="hero-interactive hidden sm:block flex-shrink-0">
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

      <ComputersCanvas />

      {/* scroll indicator */}
      <div className="absolute xs:bottom-0 bottom-32 w-full flex justify-center items-center pointer-events-auto">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
