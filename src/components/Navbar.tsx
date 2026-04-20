import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo2, menu, close, github } from "../assets/index";

const GITHUB_URL = "https://github.com/ifeobi";
const LINKEDIN_URL = "https://www.linkedin.com/in/ifechukwu-obijiofor-761040109/";

// Simple LinkedIn SVG icon (no external dep)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => { setActive(""); window.scrollTo(0, 0); }}
        >
          <img src={logo2} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Ife Obijiofor&nbsp;
            <span className="sm:block hidden">| Fullstack &amp; AI Engineer</span>
          </p>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-8">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="flex items-center gap-4 border-l border-secondary/30 pl-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors duration-200"
              title="GitHub"
            >
              <img src={github} alt="GitHub" className="w-5 h-5 object-contain invert opacity-60 hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-[#0a66c2] transition-colors duration-200"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl`}
          >
            <ul className="list-none flex flex-col justify-end items-start gap-4 w-full">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => { setToggle(!toggle); setActive(link.title); }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li className="flex gap-4 pt-2 border-t border-secondary/30 w-full">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors">
                  <img src={github} alt="GitHub" className="w-5 h-5 object-contain invert opacity-60" />
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-[#0a66c2] transition-colors">
                  <LinkedInIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
