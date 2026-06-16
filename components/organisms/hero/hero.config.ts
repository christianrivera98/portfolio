import { SITE_CONFIG } from "@/lib/site.config"

// Display name and photo are language-neutral; copy lives in messages (Hero.*)
export const HERO_PROFILE = {
  name: "CHRISTIAN LAMADRID",
  photo: "/images/profile.png",
} as const

// Brand names — not translated
export const TECH_STACK_TAGS = [
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "nodejs", label: "Node.js" },
  { id: "tailwind", label: "Tailwind" },
] as const

export type HeroCta = {
  id: string
  href: string
  variant: "primary" | "outline"
  external: boolean
  // Brand label (GitHub/LinkedIn); when omitted the label is translated via Hero.ctaWork
  label?: string
}

export const HERO_CTAS: HeroCta[] = [
  { id: "work", href: "#projects", variant: "primary", external: false },
  {
    id: "github",
    label: "GitHub",
    href: SITE_CONFIG.social.github,
    variant: "outline",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
    variant: "outline",
    external: true,
  },
]
