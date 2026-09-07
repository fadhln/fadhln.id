export type Tool = {
  name: string;
  category: string;
  shortCode: string;
  url: string;
  howIUseIt: string;
};

export const EXPERIENCES = [
  {
    role: "Full-stack Engineer",
    company: "Product Studio",
    location: "Jakarta, Indonesia",
    period: "2023 — Present",
    description:
      "Led frontend development for web dashboards and client applications using Next.js, TypeScript, and Tailwind CSS. Built shared UI component libraries, cut page load times, and improved core workflow responsiveness.",
  },
  {
    role: "Frontend Engineer",
    company: "SaaS Platform",
    location: "Remote",
    period: "2021 — 2023",
    description:
      "Engineered data-dense interfaces and interactive forms. Integrated REST/GraphQL endpoints, introduced automated linting pipelines, and collaborated with designers to ship accessible design system primitives.",
  },
  {
    role: "Junior Web Developer",
    company: "Software House",
    location: "Indonesia",
    period: "2020 — 2021",
    description:
      "Built responsive client portals and marketing sites. Translated Figma designs into clean semantic markup and maintained backend API integrations with Node.js.",
  },
];

export const TOOLS: Tool[] = [
  {
    name: "TypeScript",
    category: "Language",
    shortCode: "TS",
    url: "https://www.typescriptlang.org",
    howIUseIt:
      "Default for every project. I use strict type checking for API contracts, database schemas, and component props to catch regressions before runtime.",
  },
  {
    name: "React",
    category: "Library",
    shortCode: "RE",
    url: "https://react.dev",
    howIUseIt:
      "Primary UI foundation. I lean on component composition, controlled/uncontrolled state patterns, and minimal re-render boundaries without heavy third-party stores.",
  },
  {
    name: "Next.js",
    category: "Framework",
    shortCode: "NX",
    url: "https://nextjs.org",
    howIUseIt:
      "My go-to framework for production apps. I use App Router for server components, route handlers, and streaming, paired with MDX for content-driven systems.",
  },
  {
    name: "Go",
    category: "Backend",
    shortCode: "GO",
    url: "https://go.dev",
    howIUseIt:
      "Backend services and concurrent data processing. I use Go for building lightweight REST APIs, CLI utilities, and high-throughput background sync jobs.",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    shortCode: "TW",
    url: "https://tailwindcss.com",
    howIUseIt:
      "Token-driven utility styling. I configure custom semantic tokens for dark mode and spacing, avoiding arbitrary inline values in favor of a cohesive design system.",
  },
  {
    name: "Node.js",
    category: "Runtime",
    shortCode: "NO",
    url: "https://nodejs.org",
    howIUseIt:
      "Used for build tooling scripts, automation pipelines (like ffmpeg media placeholder generators), and backend API route handlers.",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    shortCode: "PG",
    url: "https://www.postgresql.org",
    howIUseIt:
      "Relational persistence for applications requiring transactional safety and relational integrity, such as transaction logs and SPBU fuel reconciliation data.",
  },
  {
    name: "Git",
    category: "Version Control",
    shortCode: "GI",
    url: "https://git-scm.com",
    howIUseIt:
      "Trunk-based workflow with atomic, conventional commits. I treat git history and clean diffs as living documentation for future maintainers.",
  },
  {
    name: "Motion",
    category: "Animation",
    shortCode: "MO",
    url: "https://motion.dev",
    howIUseIt:
      "Physics-based spring animations for layout morphs, interactive sidebar transitions, and subtle UI cues that feel responsive rather than decorative.",
  },
  {
    name: "Biome",
    category: "Tooling",
    shortCode: "BI",
    url: "https://biomejs.dev",
    howIUseIt:
      "Unified, sub-millisecond linter and formatter that replaces slow multi-tool ESLint setups across my Next.js and TypeScript repositories.",
  },
  {
    name: "Three.js / WebGL",
    category: "Graphics",
    shortCode: "3D",
    url: "https://threejs.org",
    howIUseIt:
      "Interactive canvas experiments, custom post-processing shaders, and dither animations (like the live cover header on this site) via React Three Fiber.",
  },
  {
    name: "Figma",
    category: "Design",
    shortCode: "FI",
    url: "https://www.figma.com",
    howIUseIt:
      "Where interfaces start. I design layouts, test responsive scales, and map design tokens before writing a single line of component code.",
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Computer Science (S.Kom.)",
    institution: "State University",
    location: "Indonesia",
    period: "2017 — 2021",
    description:
      "Major in Computer Science. Coursework in software engineering, algorithms, database systems, and human-computer interaction.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    year: "2023",
  },
  {
    title: "Responsive Web Design Certification",
    issuer: "freeCodeCamp",
    year: "2021",
  },
];
