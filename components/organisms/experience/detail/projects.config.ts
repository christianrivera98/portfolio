import { SITE_CONFIG } from "@/lib/site.config"

export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string }

export type Project = {
  id: string
  tech: string[]
  media?: MediaItem[]
  images?: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  hasLongDescription?: boolean
}

const TB = "/projects/toolbooks/media"
const QP = "/projects/qper/media"
const G5 = "/projects/geeks5g/media"

export const PROJECTS: Project[] = [
  {
    id: "toolbooks",
    tech: ["Next.js", "TypeScript", "Plaid", "Stripe", "AWS Cognito", "TanStack Query"],
    media: [
      { type: "video", src: `${TB}/clip-1.mp4` },
      { type: "video", src: `${TB}/clip-2.mp4` },
      { type: "video", src: `${TB}/clip-3.mp4` },
      { type: "image", src: `${TB}/shot-1.png` },
      { type: "image", src: `${TB}/shot-2.png` },
    ],
    images: [`${TB}/shot-1.png`, `${TB}/shot-2.png`],
    featured: true,
    hasLongDescription: true,
  },
  {
    id: "geeks5g",
    tech: ["Next.js", "TanStack Query", "Redux", "Google Maps", "Twilio"],
    media: [
      { type: "video", src: `${G5}/clip-1.mp4` },
      { type: "image", src: `${G5}/admin-dashboard.jpg` },
      { type: "video", src: `${G5}/clip-2.mp4` },
      { type: "image", src: `${G5}/shot-2.png` },
    ],
    images: [`${G5}/admin-dashboard.jpg`, `${G5}/shot-2.png`],
    liveUrl: "https://www.getservice.ai/",
  },
  {
    id: "qper",
    tech: ["Next.js", "TypeScript", "Feature-Sliced Design", "RNDC", "Vitest", "Playwright"],
    media: [
      { type: "video", src: `${QP}/clip-1.mp4` },
      { type: "video", src: `${QP}/clip-2.mp4` },
      { type: "image", src: `${QP}/view-vehiculos.png` },
      { type: "image", src: `${QP}/view-notificaciones.png` },
      { type: "image", src: `${QP}/view-tour.png` },
    ],
    images: [`${QP}/view-vehiculos.png`, `${QP}/view-notificaciones.png`, `${QP}/view-tour.png`],
    liveUrl: "https://app.precisionlogistica.co/",
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
