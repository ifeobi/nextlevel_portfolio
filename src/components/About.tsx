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
        <p className={`${styles.sectionSubText}`}>Why companies hire me over entire teams</p>
        <h2 className={`${styles.sectionHeadText}`}>I don't build features. I build outcomes.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Most companies hire three engineers and still ship slow. I was brought in as
        the sole engineer for an enterprise-grade ERP — covering inventory, accounting,
        AI document processing, and a real-time multi-channel CRM for a Belgian diamond
        trading and atelier jewellery business. I architected and shipped 1,100+
        TypeScript files: a NestJS + PostgreSQL API, a Next.js frontend, and an internal
        AI Copilot (powered by Claude) with 38+ tools that gives staff complete
        natural-language control over the entire platform. The automated debt recovery
        system I designed contributed to over $2M in recovered receivables. My background
        in law is not a quirk — it is why I think in systems, edge cases, and business
        consequences before I write a single line of code. I am currently evaluating
        1–2 new remote partnerships. If your product needs someone who owns it
        end-to-end and can prove it — let's talk.
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
