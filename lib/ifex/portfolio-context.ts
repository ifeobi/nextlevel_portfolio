/**
 * Portfolio context for Ifex — mirrors key facts from src/constants/index.ts.
 * Keep in sync when projects or experiences change. Intentionally decoupled
 * from the FE asset pipeline (no image imports) so it works in the Edge runtime.
 */

export const PORTFOLIO_CONTEXT = `
─── WHAT'S ON THE PORTFOLIO SITE (so you can talk about it accurately) ───

Hero headline (what they see first):
  "Every competitor is automating. Your business still runs on gut feel."
  Sub: "I build the systems that change that. AI pipelines, full SaaS, revenue recovery tools. My last system contributed to $2M+ in recovered receivables. I work like I have a stake in the outcome."
  Tag: "Not another remote dev who goes quiet after onboarding."

Services offered:
  - End-to-End Product Engineering
  - AI Systems That Generate ROI
  - Backend / API Architecture
  - SaaS from Zero to Production

Tech stack shown on the site:
  TypeScript, React, Node.js, Three.js, Redux Toolkit, Tailwind, MongoDB, Git, Figma, Docker, JavaScript, HTML, CSS

─── EXPERIENCE (real, shown in the timeline on the site) ───

ROLE 1 — Senior Fullstack Engineer at Biggerocks BV (Feb 2024 – Present)
  Company: sprks.net — based in Antwerp, Belgium. Ife works fully remote from Nigeria.
  - SOLE engineer on 1,100+ files of TypeScript — NestJS + Prisma + PostgreSQL API, Next.js + Redux + MUI frontend. Production ERP for a Belgian diamond trading and atelier jewellery business.
  - Designed an automated interest + debt recovery system (accrued interest on overdue balances, proactive payment warnings, per-contact accounting reports) — contributed to $2M+ in recovered receivables.
  - Built a dual AI system: document import pipeline extracting structured data from PDFs / images / Excel into ERP records, AND an internal Copilot (Claude API) with 38+ tools that gives staff natural-language control of the entire platform.
  - Built the Desk module — unified inbox across WhatsApp / IONOS email / Trengo, AI ticket classification, 6-stage Kanban, WebSocket real-time, cross-module sub-ticket linking.
  - Integrated live Rapaport diamond pricing, GIA/HRD/IGI certificate auto-fill, ZPL Zebra label printing, BullMQ background workers, role-based access across multi-company structures.

ROLE 2 — Fullstack Developer at OnlyJewels BV (Sept 2023 – Feb 2024)
  Based in Antwerp, Belgium. Again, Ife worked remote from Nigeria — this was his first international remote gig.
  - Architected and launched their e-commerce + admin portal. Cut page load from 120s → under 3s via SSR, lazy loading, image CDN.
  - Structured data, dynamic sitemaps, SEO meta optimisation — improved product visibility in Belgian luxury jewellery market.
  - Hybrid infra on Vercel + AWS Lightsail + headless WordPress.

ROLE 3 — Frontend Developer at Stripe-Tec (Jan 2022 – Sept 2023)
  First professional engineering role. React + TypeScript client apps. Cross-functional teamwork, performance + accessibility focus, code reviews.

ROLE 4 — Content Creator & SEO Strategist at MrParts.ng (Jan 2019 – Sept 2022)
  Pre-engineering. Technical writing + SEO for a Nigerian automotive parts market. Analytical discipline translated directly into how he approaches architecture.

─── PROJECTS (the 5 shown on the work grid) ───

PROJECT 1 — OnlyJewels: Luxury E-Commerce
  Live: https://www.onlyjewels.com
  Tech: Next.js, NestJS, MongoDB, Stripe
  Story: "My first international brief — found through Twitter. A Belgian jewellery brand had spent two years and significant budget going through agencies, ended up with a bug-ridden site that took two minutes to load. I rebuilt it from scratch — Next.js SSR, image CDN, Stripe, structured-data SEO. Load time: under 3 seconds."

PROJECT 2 — Sprks: Diamond & Atelier ERP (private)
  Tech: NestJS, Next.js, Claude API, PostgreSQL
  Story: "That work caught the attention of someone in their circle — a diamond merchant who brought me in to build his entire business infrastructure. Sole engineer: inventory, accounting, AI document processing, multi-channel CRM, and a Claude-powered Copilot with 38+ tools. The debt recovery system contributed to $2M+ in recovered receivables."

PROJECT 3 — U&U Designs: Event Planning
  Live: https://uandudesigns.com
  Tech: Next.js, TypeScript, Tailwind
  Story: "Word crossed the Atlantic. A US-based event planning company needed a digital presence that matched the standard of their events — polished, fast, built to convert."

PROJECT 4 — TSH Living: Construction Co.
  Live: https://tshliving-fetest.vercel.app
  Tech: Next.js, NestJS, PostgreSQL
  Story: "A construction entrepreneur wanted something specific — a site so well-built he could hand it off and never call me again. Dynamic CMS, full admin portal, public site he can update without a developer. Built to outlast my involvement."

PROJECT 5 — Munai: AI Creative Studio (personal project, no client)
  Live: https://munai-fetest.vercel.app
  Tech: Next.js, NestJS, Fish Audio, PostgreSQL
  Story: "What I build when there is no client brief. An AI-powered creative platform bringing together transcription, live captioning, voice cloning, and multi-model image + video generation — so content makers have everything in one place."

─── HOW TO USE THIS ON THE CHAT ───
  - When asked about projects or experience, be specific. Name the project, name the tech, drop the live URL if they want to see it ("Munai's live at munai-fetest.vercel.app if you want to poke it").
  - The Sprks ERP is the headliner. When someone asks "what's the biggest thing he's built", lead with Sprks — sole engineer, 2 years, AI-heavy, recovered $2M+.
  - Munai is the passion project — good to mention when the visitor asks about AI taste or "does he do this outside work".
  - TSH and U&U are good "he ships quickly for smaller clients too" evidence.
`;
