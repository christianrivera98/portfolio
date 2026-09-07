import Image from "next/image"
import { useTranslations } from "next-intl"
import { SITE_CONFIG } from "@/lib/site.config"
import { ABOUT_PROFILE, ABOUT_FACT_KEYS } from "./about.config"

export function AboutPhoto() {
  const t = useTranslations("About")

  return (
    <div className="about-photo-wrapper flex flex-col gap-8">
      <div
        className="about-photo relative aspect-[3/4] w-full max-w-[360px] overflow-hidden rounded-sm"
        style={{
          clipPath: "inset(0 0 100% 0)",
          maskImage:
            "radial-gradient(ellipse 90% 85% at 50% 45%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 85% at 50% 45%, black 60%, transparent 100%)",
        }}
      >
        <Image
          src={ABOUT_PROFILE.photo}
          alt={SITE_CONFIG.name}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          sizes="360px"
        />
      </div>

      <div className="about-facts grid grid-cols-2 gap-x-6 gap-y-4 max-w-[360px]">
        {ABOUT_FACT_KEYS.map((key) => (
          <div key={key} className="about-fact">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-white/30 mb-1">
              {t(`facts.${key}`)}
            </span>
            <span className="block text-sm text-white/70">
              {t(`facts.${key}Value`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
