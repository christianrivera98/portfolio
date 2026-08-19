import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/icons"
import { HERO_CTAS, SOCIAL_PREVIEWS, type SocialKey } from "./hero.config"

interface HeroCTAsProps {
  onSocialHover?: (social: SocialKey | null) => void
}

export function HeroCTAs({ onSocialHover }: HeroCTAsProps) {
  const t = useTranslations("Hero")
  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {HERO_CTAS.map((cta) => {
        const label = cta.label ?? t("ctaWork")
        const social = cta.id in SOCIAL_PREVIEWS ? (cta.id as SocialKey) : null
        const hoverProps = social
          ? {
              onMouseEnter: () => onSocialHover?.(social),
              onMouseLeave: () => onSocialHover?.(null),
              onFocus: () => onSocialHover?.(social),
              onBlur: () => onSocialHover?.(null),
            }
          : {}
        return (
        <div key={cta.id} className="hero-cta" {...hoverProps}>
          <Button
            asChild
            variant={cta.variant === "primary" ? "default" : "outline"}
            size="lg"
            className={
              cta.variant === "primary"
                ? "h-12 px-7 rounded-full bg-white text-black hover:bg-white/90 font-medium transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                : "h-12 px-7 rounded-full border-white/15 bg-transparent text-white hover:bg-white/[0.06] font-medium transition-all duration-200"
            }
          >
            {"external" in cta && cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                {label}
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            ) : (
              <Link href={cta.href} className="inline-flex items-center gap-2">
                {label}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </Button>
        </div>
        )
      })}
    </div>
  )
}
