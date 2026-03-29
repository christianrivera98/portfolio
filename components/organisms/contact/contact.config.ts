import { SITE_CONFIG } from "@/lib/site.config"

export type ContactLink = {
  id: string
  label: string
  display: string
  href: string
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    label: "Email",
    display: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    display: "/in/christianrivera-ingeniero",
    href: SITE_CONFIG.social.linkedin,
  },
  {
    id: "github",
    label: "GitHub",
    display: "/christianrivera98",
    href: SITE_CONFIG.social.github,
  },
]

export const CONTACT_SECTION = {
  title: "Let's build\nsomething.",
  status: "Currently open to new opportunities.",
} as const
