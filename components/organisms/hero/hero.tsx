"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useHeroIntroAnimation } from "@/hooks/useHeroIntroAnimation"
import { usePreloader } from "@/hooks/usePreloader"
import { useDeferredMount } from "@/hooks/useDeferredMount"
import { useInViewport } from "@/hooks/useInViewport"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { ScrollIndicator } from "./scroll-indicator"
import { HeroScrollInvite } from "./hero-scroll-invite"
import { HeroCTAs } from "./hero-actions"
import { RoomPoster } from "./hero-room/room-poster"
import { HERO_PROFILE, type SocialKey } from "./hero.config"

const HeroRoom = dynamic(
  () => import("./hero-room/hero-room").then((m) => m.HeroRoom),
  { ssr: false }
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isComplete } = usePreloader()
  const [social, setSocial] = useState<SocialKey | null>(null)
  const t = useTranslations("Hero")
  const prefersReduced = usePrefersReducedMotion()
  const show3D = useDeferredMount(!prefersReduced)
  const roomActive = useInViewport(sectionRef)

  useHeroIntroAnimation(isComplete, sectionRef)

  const nameParts = HERO_PROFILE.name.split(" ")
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(" ")

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden "
    >
      <div
        className="absolute inset-0 z-0"
        role="img"
        aria-label={`Escena 3D: ${HERO_PROFILE.name} en su escritorio con monitor y laptop`}
      >
        <RoomPoster />
        {show3D && (
          <div className="absolute inset-0 hero-room-fade">
            <HeroRoom social={social} active={roomActive} />
          </div>
        )}
      </div>
      <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-r from-[#0a0a0a] from-5% via-[#0a0a0a]/60 via-35% to-transparent to-60%" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] z-[5] pointer-events-none bg-[#0a0a0a]" />
      <div className="absolute inset-x-0 bottom-[26%] h-[14%] z-[5] pointer-events-none bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <div className="hero-content relative z-10 flex-1 flex items-center py-24 md:py-20 pointer-events-none">
        <div className="w-full px-6 md:px-12 lg:pl-28 lg:pr-0">
          <span className="hero-label block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-6">
            {t("title")} &middot; {t("subtitle")}
          </span>

          <h1
            className="font-serif-display font-extrabold tracking-tight text-white mb-4 md:mb-6"
            style={{ perspective: "600px" }}
          >
            <span className="hero-name-1 block text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
              {firstName}
            </span>
            <span className="hero-name-2 block text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
              {lastName}
            </span>
          </h1>

          <div className="hero-accent-line h-0.5 w-24 bg-[hsl(356,96%,32%)] mb-10 md:mb-14 origin-left" />

          <div className="flex flex-col gap-5 max-w-xl pointer-events-auto">
            <div className="hero-title flex flex-col gap-1">
              <h2 className="text-lg md:text-xl font-semibold text-white/90">
                {t("title")}
              </h2>
              <p className="text-base text-white/60">{t("subtitle")}</p>
            </div>

            <p className="hero-bio text-base md:text-lg leading-relaxed text-white/60">
              {t("bio")}
            </p>
            <p className="hero-credentials text-sm text-white/35 font-mono">
              {t("credentials")}
            </p>

            <HeroCTAs onSocialHover={setSocial} />
          </div>
        </div>
      </div>

      <ScrollIndicator />
      <HeroScrollInvite />
    </section>
  )
}
