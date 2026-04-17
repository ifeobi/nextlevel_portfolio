import type {
  NavLink,
  Service,
  Technology,
  Experience,
  Testimonial,
  Project,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  onlyjewels,
  stripe,
  mrparts,
  shopify,
  threejs,
  biggerocks,
} from "../assets";

export const navLinks: NavLink[] = [
  { id: "about", title: "About" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

const services: Service[] = [
  { title: "Fullstack Engineer", icon: web },
  { title: "AI Integration Engineer", icon: creator },
  { title: "Backend / API Architect", icon: backend },
  { title: "SaaS Product Builder", icon: mobile },
];

const technologies: Technology[] = [
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Node JS", icon: nodejs },
  { name: "Three JS", icon: threejs },
  { name: "Redux Toolkit", icon: redux },
  { name: "Tailwind CSS", icon: tailwind },
  { name: "MongoDB", icon: mongodb },
  { name: "git", icon: git },
  { name: "figma", icon: figma },
  { name: "docker", icon: docker },
  { name: "JavaScript", icon: javascript },
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
];

const experiences: Experience[] = [
  {
    title: "Senior Fullstack Engineer",
    company_name: "Biggerocks BV — Antwerp, Belgium",
    company_url: "https://sprks.net",
    icon: biggerocks,
    iconBg: "#1a1a2e",
    date: "Feb 2024 - Present",
    points: [
      "Architected and built Sprks — a production-grade SaaS ERP for the diamond trading and atelier jewellery industry, covering inventory, accounting, production, CRM, and document management across two business modules (Carats & Jewels).",
      "Engineered a dual AI system: an intelligent document import pipeline that extracts and structures data from PDFs, images, and Excel files directly into ERP records; and an internal Copilot (powered by the Claude API) with 38+ tools that mirrors every manual action in the platform — executing batch operations, running processes in the background, and giving staff complete natural-language control over the entire system.",
      "Built the Desk module — a unified multi-channel inbox (WhatsApp, IONOS email, Trengo) with AI ticket classification, auto-routing, a 6-stage Kanban pipeline, real-time WebSocket gateway, and cross-module sub-ticket linking between Carats and Jewels.",
      "Designed an automated interest and debt recovery system — calculated accrued interest on overdue client balances, dispatched proactive payment warnings, and generated per-contact accounting reports — directly contributing to over $2M in recovered receivables.",
      "Integrated live Rapaport diamond pricing, GIA/HRD/IGI certificate auto-fill, ZPL label printing for Zebra printers, BullMQ background workers, and role-based access control across multi-company and legal entity structures.",
      "Sole engineer on a full TypeScript codebase — NestJS + Prisma + PostgreSQL API and Next.js + Redux + MUI frontend — 1,100+ files shipped and maintained end-to-end.",
    ],
  },
  {
    title: "Fullstack Developer",
    company_name: "OnlyJewels BV — Antwerp, Belgium",
    company_url: "https://www.onlyjewels.com",
    icon: onlyjewels,
    iconBg: "#E6DEDD",
    date: "Sept 2023 - Feb 2024",
    points: [
      "Architected and launched OnlyJewels e-commerce platform and admin portal, cutting page load time from 120s to under 3s via SSR optimisation, lazy loading, and image CDN strategies.",
      "Implemented advanced SEO including structured data, dynamic sitemaps, and meta optimisation, significantly improving product visibility in the Belgian luxury jewellery market.",
      "Engineered a cost-effective hybrid infrastructure using Vercel, AWS Lightsail, and headless WordPress.",
      "Built integrations between product catalogue management, Stripe payment processing, and real-time inventory tracking.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "Stripe-Tec",
    icon: stripe,
    iconBg: "#383E56",
    date: "Jan 2022 - Sept 2023",
    points: [
      "Developed and maintained multiple client-facing web applications using React.js, TypeScript, and modern CSS frameworks.",
      "Collaborated with cross-functional teams to ship high-quality, responsive products on tight deadlines.",
      "Championed performance and accessibility best practices, and contributed to code reviews to uphold engineering standards.",
      "This role marked the start of my professional engineering career, building the foundation that led to architecting full SaaS platforms.",
    ],
  },
  {
    title: "Shopify Developer",
    company_name: "Zam&Zom LLC",
    company_url: "https://zamandzom.com",
    icon: shopify,
    iconBg: "#383E56",
    date: "June 2023 - Dec 2023",
    points: [
      "Delivered a fully functional Shopify e-commerce store with custom theme development, app integrations, and a seamless checkout experience.",
      "Configured payment gateways, inventory management, and SEO tools tailored to the product catalogue.",
      "Ensured cross-browser compatibility and mobile-first responsiveness throughout.",
    ],
  },
  {
    title: "Content Creator & SEO Strategist",
    company_name: "MrParts.ng",
    company_url: "https://mrparts.ng",
    icon: mrparts,
    iconBg: "#E6DEDD",
    date: "Jan 2019 - Sept 2022",
    points: [
      "Created high-ranking product descriptions, technical blog posts, and multimedia content that established MrParts.ng as a trusted authority in the Nigerian automotive parts market.",
      "Developed and executed an SEO content strategy that grew organic search traffic and brand recognition over three years.",
      "The analytical discipline from this role translated directly into how I approach system architecture today.",
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Ife proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I have never met a web developer who truly cares about their clients success like Ife does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Ife optimized our website, our traffic increased by 50%. We cannot thank him enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects: Project[] = [
  {
    name: "Munai",
    description:
      "AI-powered audio platform — transcribe speech to text in seconds, or convert text into natural-sounding audio. Evolving into a full creative AI hub: AI-generated images and videos, and voice cloning so you can use your real voice in content creation.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "green-text-gradient" },
    ],
    image: "https://ik.imagekit.io/sco75u7ale/Screenshot%202026-04-14%20005408.png",
    source_code_link: "#",
    live_site: "https://munai.dev",
  },
  {
    name: "Sprks — Diamond & Atelier ERP",
    description:
      "Enterprise SaaS ERP for a Belgian diamond trading and atelier jewellery business. AI document import pipeline (PDFs/images/Excel → ERP records) and an internal Copilot with 38+ tools for natural-language platform control. Modules: Carats, Jewels, Desk (multi-channel CRM), and full accounting.",
    tags: [
      { name: "NestJS", color: "blue-text-gradient" },
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Claude API", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
    ],
    image: "https://ik.imagekit.io/sco75u7ale/Screenshot%202026-04-14%20004507.png",
    source_code_link: "#",
    live_site: "https://sprks.net",
  },
  {
    name: "OnlyJewels e-store",
    description:
      "Premium jewellery e-commerce platform in Antwerp, Belgium. Page load time cut from 120s to under 3s. Real-time inventory, Stripe payments, advanced SEO, and a custom admin dashboard — live in production.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "NestJS", color: "blue-text-gradient" },
      { name: "MongoDB", color: "green-text-gradient" },
      { name: "Stripe", color: "pink-text-gradient" },
    ],
    image: "https://ik.imagekit.io/ifeobi/details.0_pAhQg5Qq5e.webp",
    source_code_link: "#",
    live_site: "https://www.onlyjewels.com",
  },
];

export { services, technologies, experiences, projects };
