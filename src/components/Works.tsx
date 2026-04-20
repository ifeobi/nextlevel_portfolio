import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import type { Project } from "../types";

const GITHUB_PROFILE = "https://github.com/ifeobi";

// External link icon SVG
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

type ProjectCardProps = Project & { index: number };

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#915eff]">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_site,
  isPrivate,
}: ProjectCardProps) => {
  const hasSourceCode = source_code_link && source_code_link !== "#";
  const hasLiveSite   = live_site && live_site !== "#";

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className="h-full"
    >
      <Tilt
        options={{ max: 15, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl w-full h-full flex flex-col"
      >
        {/* image */}
        <div className="relative w-full h-[210px] bg-black/30 rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-contain ${isPrivate ? "blur-sm scale-105" : ""}`}
          />

          {/* private overlay */}
          {isPrivate && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex items-center gap-2 bg-black/70 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <LockIcon />
                <span className="text-white/80 text-[11px] font-medium tracking-wide">Private Client System</span>
              </div>
            </div>
          )}

          {/* hover action icons */}
          {!isPrivate && (
            <div className="absolute inset-0 flex justify-end items-start gap-2 m-3 card-img_hover opacity-0 hover:opacity-100 transition-opacity">
              {hasSourceCode && (
                <div
                  onClick={() => window.open(source_code_link, "_blank")}
                  className="black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer"
                  title="Source code"
                >
                  <img src={github} alt="github" className="w-4 h-4 object-contain" />
                </div>
              )}
              {hasLiveSite && (
                <div
                  onClick={() => window.open(live_site, "_blank")}
                  className="black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer text-white"
                  title="Live site"
                >
                  <ExternalLinkIcon />
                </div>
              )}
            </div>
          )}
        </div>

        {/* content — flex-1 so all cards stretch to same height */}
        <div className="mt-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-bold text-[20px] leading-tight">{name}</h3>
            {hasLiveSite && !isPrivate && (
              <a
                href={live_site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-white flex-shrink-0 mt-1 transition-colors"
                title="Visit site"
              >
                <ExternalLinkIcon />
              </a>
            )}
          </div>
          <p className="mt-2 text-secondary text-[13px] leading-relaxed flex-1">{description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[12px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          A selection of projects that reflect how I work — from enterprise SaaS
          platforms with embedded AI, to polished consumer products. Each one is
          live, in production, and solving a real business problem.
        </motion.p>
      </div>

      {/* equal-height grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>

      {/* See more → GitHub */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-10 flex justify-center"
      >
        <a
          href={GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white text-[15px] font-semibold px-7 py-3 rounded-lg transition-colors duration-200"
        >
          <img src={github} alt="github" className="w-4 h-4 object-contain" style={{ filter: "invert(1)" }} />
          More work on GitHub →
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "");
