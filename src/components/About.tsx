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
        <p className={`${styles.sectionSubText}`}>The story so far</p>
        <h2 className={`${styles.sectionHeadText}`}>From Lagos courtrooms to Belgian boardrooms.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        In 2022 I walked away from a law career in Nigeria and taught myself to code.
        What happened next I could not have planned.
        <br /><br />
        Within two years I was the sole engineer behind the entire digital
        infrastructure of a Belgian diamond merchant's business — an enterprise ERP
        covering inventory, accounting, AI document processing, and a real-time
        multi-channel CRM. The automated debt recovery system I built contributed to
        over $2M in recovered receivables.
        <br /><br />
        When you deliver at that level, word travels without you asking. The merchant's
        circle became clients. Then businesses in the United States found me — an event
        planning company, a construction entrepreneur who wanted a site so well-built
        he could hand it off and never call me again.
        <br /><br />
        In the space between client work, I am building Munai — an AI creative studio
        I started because the tools I needed did not exist yet.
        <br /><br />
        From a lawyer whose practice ended at Nigeria's borders, to an engineer whose
        work doesn't.
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
