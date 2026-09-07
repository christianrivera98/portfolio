import { useTranslations } from "next-intl"
import { ArrowUpRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/site.config"
import { FooterLinks } from "./footer-links"
import { FooterBottom } from "./footer-bottom"

export function Footer() {
  const t = useTranslations("Footer")
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(356,96%,32%)]/40 to-transparent" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[hsl(356,96%,22%)] opacity-[0.06] blur-[120px]" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-12 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex max-w-md flex-col gap-5">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
                {t("available")}
              </span>
            </span>

            <h2 className="font-serif-display text-4xl font-bold text-white md:text-5xl">
              {SITE_CONFIG.name}
            </h2>
            <p className="text-sm leading-relaxed text-white/45">{t("tagline")}</p>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="group/cta mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t("ctaLabel")}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </a>
          </div>

          <FooterLinks />
        </div>

        <div className="mt-16">
          <FooterBottom year={year} />
        </div>
      </div>
    </footer>
  )
}
