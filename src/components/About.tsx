import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

type ServiceCardProps = {
  index: number;
  title: string;
  icon: string;
};

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  return (
    <Tilt
      className="xs:w-[250px] w-full"
      options={{ max: 45, scale: 1, speed: 450 }}
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText}`}>Overview.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I transitioned from a career in law into software engineering in 2022 — and
        I have not looked back since. What started with self-taught React projects
        quickly grew into building full production SaaS platforms. Today I am a
        Senior Fullstack Engineer at Biggerocks BV in Antwerp, Belgium, where I
        architected and ship Sprks — an enterprise ERP for the diamond trading and
        atelier jewellery industry, with a dual AI system — an intelligent document
        import pipeline and an internal Copilot (powered by the Claude API) that
        can execute any platform action via natural language — real-time WebSocket
        infrastructure, and 1,100+ TypeScript files
        across NestJS, Next.js, PostgreSQL, and more. My legal background gives me
        a precision for detail and systems thinking that I apply to every codebase
        I touch. If you need someone who can own a product end-to-end, ship fast,
        and build things that actually work — let us talk.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
