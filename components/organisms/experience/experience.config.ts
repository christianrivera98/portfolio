export type ExperienceEntry = {
  id: string
  company: string
  role: string
  type: "fulltime" | "freelance"
  location?: string
  period: string
  highlights: string[]
}

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    id: "toolbooks",
    company: "ToolBooks",
    role: "Software Engineer Frontend",
    type: "fulltime",
    location: "USA",
    period: "Jan 2025 — Present",
    highlights: [
      "Lead the frontend evolution by proposing UX improvements that simplified ML models, reducing user operational load by 50%.",
      "Make critical architecture decisions for Fintech integrations (Stripe/Plaid), ensuring 99.9% data accuracy.",
      "Accelerated feature delivery by 25% using Docker and Plesk, projecting 30% improvement in load performance.",
    ],
  },
  {
    id: "geeks5g",
    company: "Geeks5G Agency",
    role: "Web Developer — Full Stack",
    type: "fulltime",
    period: "May 2025 — Jan 2026",
    highlights: [
      "Maintained and scaled SaaS codebases, identifying bottlenecks and proposing structural improvements that increased capacity by 40%.",
      "Developed reusable component libraries with Shadcn UI and SASS, eliminating 99% of data errors.",
      "Implemented WebSockets for real-time features and optimized SSR/data-fetching patterns in Next.js.",
    ],
  },
  {
    id: "bancolombia",
    company: "Bancolombia",
    role: "Software Engineer Junior",
    type: "fulltime",
    period: "Feb 2024 — Aug 2024",
    highlights: [
      "Developed an internal monitoring interface that allowed the team to resolve technical bugs 40% faster.",
      "Contributed to complex multi-repo migrations and improved deployment reliability by 25% through Jest unit testing.",
    ],
  },
  {
    id: "dicosoft",
    company: "DicoSoft Digital",
    role: "Web Developer Freelance",
    type: "freelance",
    period: "Dec 2024 — May 2025",
    highlights: [
      "Built responsive e-commerce platforms using React and SASS, improving client conversion rates by 25%.",
      "Managed VTEX-like workflows and integrations for retail clients, optimizing checkout and payment security.",
    ],
  },
  {
    id: "radkiddo",
    company: "Rad Kiddo",
    role: "Web Developer — E-commerce",
    type: "freelance",
    period: "Nov 2023 — Feb 2024",
    highlights: [
      "Designed and developed an e-commerce platform using React + WordPress/WooCommerce, increasing conversion by 25%.",
      "Implemented secure payment gateways (MercadoPago) and dynamic geolocation systems, improving performance by 30%.",
    ],
  },
] as const

export const EXPERIENCE_SECTION = {
  label: "Work",
  title: "Experience",
  subtitle: "Where I've shipped production code.",
} as const
