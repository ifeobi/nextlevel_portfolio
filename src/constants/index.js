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
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Technical Writer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Full stack Developer",
    company_name: "OnlyJewels",
    icon: onlyjewels,
    iconBg: "#E6DEDD",
    date: "Sept 2023 - Present",
    points: [
      "Architected and developed OnlyJewels' e-commerce platform and admin portal, reducing page load time from 120s to under 3s through advanced optimization techniques.",
      "Implemented comprehensive SEO strategies, significantly improving product visibility and Google search rankings.",
      "Engineered a cost-effective infrastructure using Vercel, AWS Lightsail, and WordPress, optimizing deployment costs while maintaining performance.",
      "Created seamless integration between product management, payment systems, and inventory tracking to enhance operational efficiency.",
    ],
  },
  {
    title: "Front-end Developer",
    company_name: "stripe-tec",
    icon: stripe,
    iconBg: "#383E56",
    date: "Jan 2022 - Sept 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Shopify E-commerce Developer",
    company_name: "Zam&Zom LLC",
    icon: shopify,
    iconBg: "#383E56",
    date: "June 2023 - Dec 2023",
    points: [
      "Orchestrated the creation and implementation of a fully functional Shopify-based e-commerce website to ensure a seamless online shopping experience for customers.",
      "Tailored Shopify themes and integrated essential apps to enhance site functionality, including payment gateways, inventory management, and SEO optimization.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Continuously monitor and maintain the website, optimizing performance, resolving technical issues, and implementing updates to keep the platform secure and up to date.",
    ],
  },
  {
    title: "Content Creator",
    company_name: "Mrparts ng",
    icon: mrparts,
    iconBg: "#E6DEDD",
    date: "Jan 2019 - Sept 2023",
    points: [
      "Generate captivating contents, including product descriptions and blog posts, to boost online visibility in the Nigerian space.",
      "Craft engaging social media posts and multimedia contents, driving increased customer engagement and brand recognition.",
      "Contributed to establishing MrParts.ng as a trusted source for automotive parts and information through compelling content creation.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "OnlyJewels e-store",
    description:
      "Premium jewelry e-commerce platform based in Antwerp, Belgium. Features include real-time inventory management, secure payment processing, advanced SEO optimization, and a custom admin dashboard for inventory and order management.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Nest.js",
        color: "blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "AWS Lightsail",
        color: "pink-text-gradient",
      },
      {
        name: "Stripe",
        color: "green-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "#",
    live_site: "https://onlyjewels.com",
  },
  {
    name: "Draftsman AI",
    description:
      "AI-powered legal document assistant that helps lawyers draft, review, and analyze legal documents. Features include document templates, AI-powered suggestions, and automated compliance checking.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "REST API",
        color: "green-text-gradient",
      },
      {
        name: "SCSS",
        color: "pink-text-gradient",
      },
      {
        name: "OpenAI",
        color: "green-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://draftsmanai.vercel.app/",
    live_site: "https://draftsmanai.vercel.app/",
  },
  {
    name: "AI Image Creator",
    description:
      "Web application that generates custom images using AI. Features include multiple style options, image manipulation tools, and a gallery of user-generated content.",
    tags: [
      {
        name: "Next.js",
        color: "blue-text-gradient",
      },
      {
        name: "Supabase",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind CSS",
        color: "pink-text-gradient",
      },
      {
        name: "DALL-E API",
        color: "green-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://dall-e-peach-kappa.vercel.app/",
    live_site: "https://dall-e-peach-kappa.vercel.app/",
  },
];

export { services, technologies, experiences, testimonials, projects };
