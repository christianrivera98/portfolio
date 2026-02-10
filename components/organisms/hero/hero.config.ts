import { SITE_CONFIG } from "@/lib/site.config"

export const HERO_PROFILE = {
  name: "CHRISTIAN LAMADRID",
  title: "Frontend Engineer",
  subtitle: "Fintech · Production Systems",
  bio: "5+ years building interfaces for systems that process real transactions.",
  credentials: "Ex-Bancolombia · TypeScript strict mode · React + Next.js",
  photo: "/images/profile.png",
} as const

export const TECH_STACK_TAGS = [
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "nodejs", label: "Node.js" },
  { id: "tailwind", label: "Tailwind" },
] as const

export const HERO_CTAS = [
  {
    id: "work",
    label: "View Work",
    href: "#projects",
    variant: "primary" as const,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    href: SITE_CONFIG.social.github,
    variant: "outline" as const,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
    variant: "outline" as const,
    external: true,
  },
] as const
