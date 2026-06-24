"use client"

import { useTranslations } from "next-intl"
import { ArrowUp } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site.config"
import { useScrollToSection } from "@/hooks/useScrollToSection"

export function FooterBottom({ year }: { year: number }) {
  const t = useTranslations("Footer")
  const scrollTo = useScrollToSection()

  return (
    <div className="flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1 font-mono text-[11px] text-white/30">
        <span>
          &copy; {year} {SITE_CONFIG.name} — {t("rights")}
        </span>
        <span className="text-white/20">
          {t("designedBy", { name: SITE_CONFIG.name })} {t("builtWith")}
        </span>
      </div>

      <button
        type="button"
        onClick={(e) => scrollTo(e, "#top")}
        aria-label={t("backToTop")}
        className="group/top inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/60 transition-colors duration-300 hover:border-white/25 hover:text-white"
      >
        {t("backToTop")}
        <ArrowUp className="size-3.5 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
      </button>
    </div>
  )
}
