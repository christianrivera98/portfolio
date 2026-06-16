import { SITE_CONFIG } from "@/lib/site.config"

// `id` maps to label + aria text in messages (Nav.*); link + preview are neutral
export type NavItem = {
  id: string
  link: string
  previewImage: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", link: "#home", previewImage: "/previews/home.png" },
  { id: "experience", link: "#experience", previewImage: "/previews/experience.png" },
  { id: "projects", link: "#projects", previewImage: "/previews/projects.png" },
  { id: "technologies", link: "#technologies", previewImage: "/previews/technologies.png" },
  { id: "about", link: "#about", previewImage: "/previews/about.png" },
  { id: "contact", link: "#contact", previewImage: "/previews/contact.png" },
]

// Brand labels — not translated
export const SOCIAL_ITEMS = [
  { label: "GitHub", link: SITE_CONFIG.social.github },
  { label: "LinkedIn", link: SITE_CONFIG.social.linkedin },
] as const
