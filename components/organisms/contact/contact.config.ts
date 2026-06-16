import { SITE_CONFIG } from "@/lib/site.config"

// `id` maps to a translated label in messages (Contact.links.*); display + href
// are language-neutral
export type ContactLink = {
  id: string
  display: string
  href: string
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    display: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    id: "linkedin",
    display: "/in/christianrivera-ingeniero",
    href: SITE_CONFIG.social.linkedin,
  },
  {
    id: "github",
    display: "/christianrivera98",
    href: SITE_CONFIG.social.github,
  },
]
