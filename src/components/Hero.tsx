import { styles } from "../styles";
import { download } from "../assets";

const LINKEDIN_URL = "https://www.linkedin.com/in/ifechukwu-obijiofor-761040109/";
const PROFILE_IMG = "https://ik.imagekit.io/sco75u7ale/ife%20from%20chatgpt.png";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto flex items-center">
      <div
        className={`${styles.paddingX} max-w-7xl mx-auto w-full flex items-start gap-5`}
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
                Open to the right remote role
              </span>
            </div>

            <h1
              className={`${styles.heroHeadText} lg:text-[72px] sm:text-[54px] xs:text-[46px] text-[36px]`}
            >
              Hi, I'm <span className="text-[#915eff]">Ife</span> —
              <br className="hidden sm:block" />
              I build AI systems that move the needle.
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100`}>
              Senior Fullstack Engineer specialising in TypeScript SaaS{" "}
              <br className="hidden sm:block" />
              and AI integration. My last system contributed to $2M+ in recovered receivables.
            </p>

            {/* CTA buttons */}
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
              <a
                href="#about"
                className="flex items-center gap-2 border border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
              >
                See the work →
              </a>
            </div>
          </div>

          {/* profile picture */}
          <div className="hidden sm:block flex-shrink-0">
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
    </section>
  );
};

export default Hero;
