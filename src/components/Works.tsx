import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import type { Project } from "../types";

const GITHUB_PROFILE = "https://github.com/ifeobi";

const chapters = [
  {
    label: "I — The Belgian Chapter",
    projects: projects.slice(0, 2), // Sprks, OnlyJewels
  },
  {
    label: "II — Crossing the Atlantic",
    projects: projects.slice(2, 4), // U&U Designs, TSH Living
  },
  {
    label: "III — Building His Own",
    projects: projects.slice(4),    // Munai
  },
];

// External link icon SVG
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#915eff]">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

type ProjectCardProps = Project & { index: number };

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
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
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

        {/* content */}
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

const ChapterDivider = ({ label, index }: { label: string; index: number }) => (
  <motion.div
    variants={fadeIn("", "", index * 0.2, 0.6)}
    className="flex items-center gap-4 mt-16 mb-8"
  >
    <div className="flex-1 h-px bg-[#915eff]/20" />
    <span className="text-[#915eff] text-[12px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap">
      {label}
    </span>
    <div className="flex-1 h-px bg-[#915eff]/20" />
  </motion.div>
);

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>The story in code.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Every project below is live, in production, and part of a bigger story.
          Each chapter brought a different brief, a different continent, and a
          different problem to solve.
        </motion.p>
      </div>

      {chapters.map((chapter, chapterIndex) => (
        <div key={chapter.label}>
          <ChapterDivider label={chapter.label} index={chapterIndex} />
          <div className={`grid grid-cols-1 gap-7 items-stretch ${
            chapter.projects.length === 1
              ? "sm:grid-cols-1 max-w-lg mx-auto"
              : "sm:grid-cols-2"
          }`}>
            {chapter.projects.map((project, projectIndex) => (
              <ProjectCard
                key={project.name}
                index={chapterIndex * 2 + projectIndex}
                {...project}
              />
            ))}
          </div>
        </div>
      ))}

      {/* GitHub CTA */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        className="mt-14 flex justify-center"
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

export default SectionWrapper(Works, "work");
