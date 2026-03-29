"use client"

import { useRef } from "react"
import { useHeroIntroAnimation } from "@/hooks/useHeroIntroAnimation"
import { usePreloader } from "@/hooks/usePreloader"
import Silk from "@/components/ui/backgrounds/silk"
import { ProfileImage } from "./profile-image"
import { ScrollIndicator } from "./scroll-indicator"
import { HeroCTAs, TechStackTags } from "./hero-actions"
import { HERO_PROFILE } from "./hero.config"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isComplete } = usePreloader()

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
      <div className="absolute inset-0 z-0">
        <Silk speed={0.5} color="#0a0a0a" noiseIntensity={0.3} rotation={0} />
      </div>

      <div className="hero-content relative z-10 flex-1 flex items-center justify-center py-24 md:py-20">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16">
          <span
            className="hero-label block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-6"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {HERO_PROFILE.title} &mdash; {HERO_PROFILE.subtitle}
          </span>

          <h1
            className="font-serif-display tracking-tight text-white mb-4 md:mb-6"
            style={{ perspective: "600px" }}
          >
            <span className="hero-name-1 block text-[clamp(3rem,10vw,9rem)] leading-[0.9] opacity-0">
              {firstName}
            </span>
            <span className="hero-name-2 block text-[clamp(3rem,10vw,9rem)] leading-[0.9] opacity-0">
              {lastName}
            </span>
          </h1>

          <div className="hero-accent-line h-[2px] w-24 bg-[hsl(356,96%,32%)] mb-10 md:mb-14 scale-x-0 origin-left" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-12">
            <div className="flex flex-col gap-5 max-w-xl">
              <div className="hero-title flex flex-col gap-1 opacity-0">
                <h2 className="text-lg md:text-xl font-semibold text-white/90">
                  {HERO_PROFILE.title}
                </h2>
                <p className="text-base text-white/60">{HERO_PROFILE.subtitle}</p>
              </div>

              <p className="hero-bio text-base md:text-lg leading-relaxed text-white/60 opacity-0">
                {HERO_PROFILE.bio}
              </p>
              <p className="hero-credentials text-sm text-white/35 font-mono opacity-0">
                {HERO_PROFILE.credentials}
              </p>

              <HeroCTAs />
              <TechStackTags />
            </div>

            <div
              className="hero-photo hidden lg:block relative -top-80 -mb-80 w-[400px] xl:w-[440px] h-[500px] xl:h-[550px] rounded-sm opacity-0"
              style={{
                clipPath: "circle(0% at 50% 50%)",
                maskImage: "radial-gradient(ellipse 85% 90% at 50% 40%, black 60%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 85% 90% at 50% 40%, black 60%, transparent 100%)",
              }}
            >
              <ProfileImage
                src={HERO_PROFILE.photo}
                alt={`${HERO_PROFILE.name} - ${HERO_PROFILE.title}`}
                name={HERO_PROFILE.name}
              />
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
