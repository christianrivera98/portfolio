import { SITE_CONFIG } from "@/lib/site.config"

export type Project = {
  id: string
  name: string
  description: string
  longDescription?: string
  tech: string[]
  metrics?: string
  image: string
  video?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: "toolbooks",
    name: "ToolBooks Platform",
    description: "Fintech SaaS integrating Stripe & Plaid for ML-powered financial tooling.",
    longDescription:
      "Led the frontend evolution proposing UX improvements that simplified ML models. Built critical Fintech integrations with Stripe and Plaid ensuring 99.9% data accuracy.",
    tech: ["Next.js", "TypeScript", "Stripe", "Plaid", "Docker"],
    metrics: "50% less operational load",
    image: "/projects/featured/toolbooks.png",
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
  },
  {
    id: "geeks5g",
    name: "Geeks5G SaaS",
    description: "Scaled SaaS codebases with real-time WebSocket features and SSR optimization.",
    tech: ["Next.js", "WebSockets", "Shadcn UI", "SASS"],
    metrics: "40% capacity increase",
    image: "/projects/proyecto-2.png",
    githubUrl: undefined,
  },
  {
    id: "bancolombia-monitor",
    name: "Bancolombia Monitor",
    description: "Internal monitoring interface for resolving technical bugs 40% faster.",
    tech: ["React", "TypeScript", "Jest", "Micro-frontends"],
    metrics: "40% faster bug resolution",
    image: "/projects/proyecto-3.png",
  },
  {
    id: "radkiddo",
    name: "Rad Kiddo E-commerce",
    description: "E-commerce platform with secure payment gateways and geolocation systems.",
    tech: ["React", "WordPress", "WooCommerce", "MercadoPago"],
    metrics: "25% conversion increase",
    image: "/projects/proyecto-4.png",
    liveUrl: undefined,
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    description: "Immersive portfolio with GSAP cinematics, Three.js shaders, and scroll-driven animations.",
    tech: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
    image: "/projects/proyecto-5.png",
    githubUrl: SITE_CONFIG.social.github,
  },
]

export const PROJECTS_SECTION = {
  label: "Selected Work",
  title: "Projects",
  subtitle: "What I've built and shipped.",
} as const
