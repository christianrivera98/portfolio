import { SITE_CONFIG } from "@/lib/site.config"

export type NavItem = {
  id: string
  link: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", link: "#home" },
  { id: "experience", link: "#experience" },
  { id: "technologies", link: "#technologies" },
  { id: "about", link: "#about" },
  { id: "contact", link: "#contact" },
]

export const SOCIAL_ITEMS = [
  { label: "GitHub", link: SITE_CONFIG.social.github },
  { label: "LinkedIn", link: SITE_CONFIG.social.linkedin },
] as const
