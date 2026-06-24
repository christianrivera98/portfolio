"use client"

import { useTranslations } from "next-intl"
import { Mail, ArrowUpRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site.config"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"
import { NAV_ITEMS } from "@/components/organisms/navbar/nav.config"
import { useScrollToSection } from "@/hooks/useScrollToSection"

const CONNECT = [
  { label: "GitHub", href: SITE_CONFIG.social.github, icon: GithubIcon, ariaKey: "githubAria" },
  { label: "LinkedIn", href: SITE_CONFIG.social.linkedin, icon: LinkedinIcon, ariaKey: "linkedinAria" },
  { label: "email", href: `mailto:${SITE_CONFIG.email}`, icon: Mail, ariaKey: "emailAria" },
] as const

const colTitle = "font-mono text-[10px] uppercase tracking-[0.3em] text-white/35"
const rowLink =
  "group/link flex items-center gap-2 text-sm text-white/55 transition-colors duration-300 hover:text-white"

export function FooterLinks() {
  const t = useTranslations("Footer")
  const tn = useTranslations("Nav")
  const scrollTo = useScrollToSection()

  return (
    <div className="grid grid-cols-2 gap-8 sm:gap-12">
      <nav className="flex flex-col gap-4" aria-label={t("navTitle")}>
        <span className={colTitle}>{t("navTitle")}</span>
        <ul className="flex flex-col gap-2.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a href={item.link} onClick={(e) => scrollTo(e, item.link)} className={rowLink}>
                {tn(item.id)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-4">
        <span className={colTitle}>{t("connectTitle")}</span>
        <ul className="flex flex-col gap-2.5">
          {CONNECT.map(({ label, href, icon: Icon, ariaKey }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={t(ariaKey)}
                className={rowLink}
              >
                <Icon className="size-4 text-white/35 transition-colors group-hover/link:text-[hsl(var(--primary))]" />
                {label === "email" ? t("email") : label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover/link:opacity-60" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
