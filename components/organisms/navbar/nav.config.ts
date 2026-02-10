export const NAV_ITEMS = [
  {
    label: "Home",
    ariaLabel: "Go to home section",
    link: "#home",
    previewImage: "/previews/home.png",
  },
  {
    label: "Experience",
    ariaLabel: "Go to experience section",
    link: "#experience",
    previewImage: "/previews/experience.png",
  },
  {
    label: "Projects",
    ariaLabel: "Go to projects section",
    link: "#projects",
    previewImage: "/previews/projects.png",
  },
  {
    label: "Technologies",
    ariaLabel: "Go to technologies section",
    link: "#technologies",
    previewImage: "/previews/technologies.png",
  },
  { label: "About", ariaLabel: "Go to about section", link: "#about", previewImage: "/previews/about.png" },
  { label: "Contact", ariaLabel: "Go to contact section", link: "#contact", previewImage: "/previews/contact.png" },
] as const;

import { SITE_CONFIG } from "@/lib/site.config"

export const SOCIAL_ITEMS = [
  { label: "GitHub", link: SITE_CONFIG.social.github },
  { label: "LinkedIn", link: SITE_CONFIG.social.linkedin },
] as const;
