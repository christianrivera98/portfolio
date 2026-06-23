import { SITE_CONFIG } from "@/lib/site.config"

// Language-neutral data only; name / description / longDescription / metrics
// live in messages (Projects.items.*)
export type Project = {
  id: string
  tech: string[]
  images?: string[]
  video?: string
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  hasLongDescription?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: "toolbooks",
    tech: ["Next.js", "TypeScript", "Plaid", "Stripe", "AWS Cognito", "TanStack Query"],
    images: ["/projects/toolbooks/shot-1.png", "/projects/toolbooks/shot-2.png"],
    featured: true,
    hasLongDescription: true,
  },
  {
    id: "geeks5g",
    tech: ["Next.js", "TanStack Query", "Redux", "Google Maps", "Twilio"],
    images: ["/projects/geeks5g/shot-1.png", "/projects/geeks5g/shot-2.png"],
    liveUrl: "https://getservice.ai",
  },
  {
    id: "qper",
    tech: ["Next.js", "TypeScript", "Feature-Sliced Design", "RNDC", "Vitest", "Playwright"],
    images: [
      "/projects/qper/shot-1.png",
      "/projects/qper/shot-2.png",
      "/projects/qper/shot-3.png",
      "/projects/qper/shot-4.png",
      "/projects/qper/shot-5.png",
      "/projects/qper/shot-6.png",
      "/projects/qper/shot-7.png",
    ],
  },
  {
    id: "radkiddo",
    tech: ["React", "WordPress", "WooCommerce", "Cloudinary"],
  },
  {
    id: "portfolio",
    tech: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
    githubUrl: SITE_CONFIG.social.github,
  },
]
