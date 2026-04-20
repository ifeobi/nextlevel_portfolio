import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { lazy, Suspense } from "react";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { trackEvent } from "../utils/analytics";

const EarthCanvas = lazy(() => import("./canvas/Earth"));

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    emailjs
      .send(
        "service_3a4370h",
        "template_7ks8ycb",
        {
          name: form.name,
          to_name: "Ife",
          email: form.email,
          to_email: "ifeobijiofor1@gmail.com",
          message: form.message,
        },
        "N3iIrNRWbcEj_5ZZk"
      )
      .then(
        () => {
          setLoading(false);
          trackEvent("contact_form_submit", { event_category: "engagement" });
          alert("Thank you. I will get back to you shortly!");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (err) => {
          setLoading(false);
          console.log(err);
          alert("Something went wrong!")
        }
      );
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Limited availability</p>
        <h3 className={styles.sectionHeadText}>Work With Me.</h3>
        <p className="mt-3 text-secondary text-[15px] leading-[26px] max-w-md">
          I am evaluating 1–2 remote partnerships for the months ahead. If you
          need an engineer who can own your product end-to-end — architecture,
          AI integration, and shipping — tell me what you are building.
        </p>

        <form
          ref={formRef as React.RefObject<HTMLFormElement>}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Company or work email"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What are you building, what's broken, and what does a win look like for you?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? "Sending..." : "Send →"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <Suspense fallback={null}>
          <EarthCanvas />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
