import { SITE_CONFIG } from "@/lib/site.config"

// Language-neutral data only; name / description / longDescription / metrics
// live in messages (Projects.items.*)
export type Project = {
  id: string
  tech: string[]
  image: string
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
    image: "/projects/featured/toolbooks.png",
    featured: true,
    hasLongDescription: true,
  },
  {
    id: "geeks5g",
    tech: ["Next.js", "TanStack Query", "Redux", "Google Maps", "Twilio"],
    image: "/projects/proyecto-2.png",
    liveUrl: "https://getservice.ai",
  },
  {
    id: "qper",
    tech: ["Next.js", "TypeScript", "Feature-Sliced Design", "RNDC", "Vitest", "Playwright"],
    image: "/projects/proyecto-3.png",
  },
  {
    id: "radkiddo",
    tech: ["React", "WordPress", "WooCommerce", "Cloudinary"],
    image: "/projects/proyecto-4.png",
  },
  {
    id: "portfolio",
    tech: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
    image: "/projects/proyecto-5.png",
    githubUrl: SITE_CONFIG.social.github,
  },
]
