import { motion } from "framer-motion";
import { ComputersCanvas } from "./canvas";

const PCSection = () => {
  return (
    <section className="relative w-full h-screen hidden sm:block">
      <ComputersCanvas />

      <div className="absolute bottom-10 w-full flex justify-center items-center pointer-events-none">
        <a href="#about" className="pointer-events-auto">
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

export default PCSection;
