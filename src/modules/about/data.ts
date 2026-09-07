export type Tool = {
  name: string;
  category: string;
  shortCode: string;
  icon: string;
  iconBackground: string;
  url: string;
  howIUseIt: string;
};

export type ExperienceRole = {
  role: string;
  period: string;
  description: string;
};

export type ExperienceGroup = {
  company: string;
  companyLogo: string;
  companyLogoBackground: string;
  companyUrl: string;
  location: string;
  roles: ExperienceRole[];
};

export const EXPERIENCES: ExperienceGroup[] = [
  {
    company: "Employment Hero",
    companyLogo: "/icons/eh.svg",
    companyLogoBackground: "#7622d7",
    companyUrl: "https://employmenthero.co.au/",
    location: "Sydney, New South Wales, Australia · Remote",
    roles: [
      {
        role: "Intermediate Full-stack Software Engineer",
        period: "Jan 2026 — Present",
        description:
          "Developed HeroForce, an Employer of Record service supporting workforces across 180+ countries. Built Global Employee Onboarding and Core HR features with React and Ruby on Rails, reducing onboarding time from one week to three business days.",
      },
    ],
  },
  {
    company: "Traveloka",
    companyLogo: "/icons/traveloka.svg",
    companyLogoBackground: "#1ba0e2",
    companyUrl: "https://www.traveloka.com/",
    location: "Kota Tangerang Selatan · On-site",
    roles: [
      {
        role: "Web Software Engineer",
        period: "Feb 2025 — Jan 2026",
        description:
          "Maintained accommodation services for Traveloka using TypeScript, React, and Next.js. Built commercial tools for hotel operations and led a migration to React Query for modern API fetching.",
      },
    ],
  },
  {
    company: "Shopee",
    companyLogo: "/icons/shopee.svg",
    companyLogoBackground: "#ee4d2d",
    companyUrl: "https://www.shopee.com/",
    location: "Jakarta, Indonesia · On-site",
    roles: [
      {
        role: "Engineer",
        period: "Mar 2023 — Jan 2025",
        description:
          "Owned frontend development for the Seller Order and Fulfillment portal, supporting more than five million monthly active sellers across Southeast Asia and Latin America. Built a Manifest V3 Chrome extension that removed repetitive environment setup for engineers, QA, and product managers.",
      },
      {
        role: "Junior Engineer",
        period: "Sep 2022 — Mar 2023",
        description:
          "Led frontend development for a six-person capstone team and built responsive user interfaces. Completed a software engineering program focused on React, Go, and modern product development practices.",
      },
    ],
  },
  {
    company: "Prosa.ai",
    companyLogo: "/icons/prosa.svg",
    companyLogoBackground: "#08b78d",
    companyUrl: "https://prosa.ai/",
    location: "Bandung · Remote",
    roles: [
      {
        role: "Front-end Engineer Intern",
        period: "Feb 2022 — Jul 2022",
        description:
          "Built frontend features with React and Next.js. Implemented a secure direct-to-cloud upload flow with presigned AWS S3 URLs and asynchronous polling.",
      },
    ],
  },
  {
    company: "XL Axiata (now XLSMART)",
    companyLogo: "/icons/xl.svg",
    companyLogoBackground: "#1a4ea1",
    companyUrl: "https://www.xlsmart.co.id/",
    location: "Jakarta, Indonesia · On-site",
    roles: [
      {
        role: "Technology Strategy & Assurance Intern (X-CAMP)",
        period: "Aug 2021 — Jan 2022",
        description:
          "Developed an AI and computer vision IoT solution for monitoring, reporting, and transparency. Built a full-stack IoT dashboard with Next.js and REST API principles.",
      },
    ],
  },
];

export const TOOLS: Tool[] = [
  {
    name: "TypeScript",
    category: "Language",
    shortCode: "TS",
    icon: "/icons/ts.svg",
    iconBackground: "#3178c6",
    url: "https://www.typescriptlang.org",
    howIUseIt:
      "Default for every project. I use strict type checking for API contracts, database schemas, and component props to catch regressions before runtime.",
  },
  {
    name: "React",
    category: "Library",
    shortCode: "RE",
    icon: "/icons/react.svg",
    iconBackground: "#149eca",
    url: "https://react.dev",
    howIUseIt:
      "Primary UI foundation. I lean on component composition, controlled/uncontrolled state patterns, and minimal re-render boundaries without heavy third-party stores.",
  },
  {
    name: "Next.js",
    category: "Framework",
    shortCode: "NX",
    icon: "/icons/next.svg",
    iconBackground: "#111111",
    url: "https://nextjs.org",
    howIUseIt:
      "My go-to framework for production apps. I use App Router for server components, route handlers, and streaming, paired with MDX for content-driven systems.",
  },
  {
    name: "Go",
    category: "Backend",
    shortCode: "GO",
    icon: "/icons/go.svg",
    iconBackground: "#00add8",
    url: "https://go.dev",
    howIUseIt:
      "Backend services and concurrent data processing. I use Go for building lightweight REST APIs, CLI utilities, and high-throughput background sync jobs.",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    shortCode: "TW",
    icon: "/icons/tailwind.svg",
    iconBackground: "#34afe6",
    url: "https://tailwindcss.com",
    howIUseIt:
      "Token-driven utility styling. I configure custom semantic tokens for dark mode and spacing, avoiding arbitrary inline values in favor of a cohesive design system.",
  },
  {
    name: "Node.js",
    category: "Runtime",
    shortCode: "NO",
    icon: "/icons/nodejs.svg",
    iconBackground: "#689f63",
    url: "https://nodejs.org",
    howIUseIt:
      "Used for build tooling scripts, automation pipelines (like ffmpeg media placeholder generators), and backend API route handlers.",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    shortCode: "PG",
    icon: "/icons/postgresql.svg",
    iconBackground: "#336791",
    url: "https://www.postgresql.org",
    howIUseIt:
      "Relational persistence for applications requiring transactional safety and relational integrity, such as transaction logs and SPBU fuel reconciliation data.",
  },
  {
    name: "Git",
    category: "Version Control",
    shortCode: "GI",
    icon: "/icons/github.svg",
    iconBackground: "#24292f",
    url: "https://github.com",
    howIUseIt:
      "Trunk-based workflow with atomic, conventional commits. I treat git history and clean diffs as living documentation for future maintainers.",
  },
  {
    name: "Motion",
    category: "Animation",
    shortCode: "MO",
    icon: "/icons/motion.svg",
    iconBackground: "#111111",
    url: "https://motion.dev",
    howIUseIt:
      "Physics-based spring animations for layout morphs, interactive sidebar transitions, and subtle UI cues that feel responsive rather than decorative.",
  },
  {
    name: "Biome",
    category: "Tooling",
    shortCode: "BI",
    icon: "/icons/biome.svg",
    iconBackground: "#4f8cff",
    url: "https://biomejs.dev",
    howIUseIt:
      "Unified, sub-millisecond linter and formatter that replaces slow multi-tool ESLint setups across my Next.js and TypeScript repositories.",
  },
  {
    name: "Three.js / WebGL",
    category: "Graphics",
    shortCode: "3D",
    icon: "/icons/threejs.svg",
    iconBackground: "#111111",
    url: "https://threejs.org",
    howIUseIt:
      "Interactive canvas experiments, custom post-processing shaders, and dither animations (like the live cover header on this site) via React Three Fiber.",
  },
  {
    name: "Figma",
    category: "Design",
    shortCode: "FI",
    icon: "/icons/figma.svg",
    iconBackground: "#f24f1e",
    url: "https://www.figma.com",
    howIUseIt:
      "Where interfaces start. I design layouts, test responsive scales, and map design tokens before writing a single line of component code.",
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Science (S.Si.)",
    institution: "Universitas Gadjah Mada",
    location: "Indonesia",
    period: "2018 — 2022",
    description:
      "Major in Electronics and Instrumentation. Coursework in smart systems, algorithms, computer vision, and human-computer interaction.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    year: "2026",
  },
  {
    title: "Advanced React Course",
    issuer: "Coursera",
    year: "2025",
  },
];
