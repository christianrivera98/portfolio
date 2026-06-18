import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/icons"
import { HERO_CTAS, TECH_STACK_TAGS } from "./hero.config"

const BASE = "h-8 rounded-full px-4 text-[11px] font-medium"
const PRIMARY = `${BASE} bg-white text-black hover:bg-white/90`
const OUTLINE = `${BASE} border-white/15 bg-transparent text-white hover:bg-white/[0.06]`

export function HeroScreenCTAs() {
  const t = useTranslations("Hero")
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {HERO_CTAS.map((cta) => (
        <Button
          key={cta.id}
          asChild
          variant={cta.variant === "primary" ? "default" : "outline"}
          size="sm"
          className={cta.variant === "primary" ? PRIMARY : OUTLINE}
        >
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5"
            >
              {cta.label ?? t("ctaWork")}
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          ) : (
            <Link href={cta.href} className="inline-flex items-center gap-1.5">
              {cta.label ?? t("ctaWork")}
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          )}
        </Button>
      ))}
    </div>
  )
}

export function HeroScreenTags() {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {TECH_STACK_TAGS.map((tech) => (
        <span
          key={tech.id}
          className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] text-white/60"
        >
          {tech.label}
        </span>
      ))}
    </div>
  )
}
