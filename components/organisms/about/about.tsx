"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useAboutAnimations } from "@/hooks/useAboutAnimations"
import { AboutPhoto } from "./about-photo"
import { InterestCard } from "./interest-card"
import { ABOUT_PROFILE } from "./about.config"

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const t = useTranslations("About")
  const bio = t.raw("bio") as string[]

  useAboutAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(356,96%,22%)] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 lg:pl-28 lg:pr-0">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span
            className="about-label inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-4"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {t("label")}
          </span>
          <h2
            ref={titleRef}
            className="font-serif-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-white tracking-tight"
            style={{ perspective: "500px" }}
          >
            {t("title")}
          </h2>
          <div className="about-accent-line h-[2px] w-16 bg-[hsl(356,96%,32%)] mt-6 scale-x-0 origin-left" />
        </div>

        {/* Editorial Grid: Photo+Facts | Quote+Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-16 mb-20">
          <AboutPhoto />

          <div className="flex flex-col gap-6">
            <blockquote className="about-quote font-serif-display text-2xl md:text-3xl italic text-white/80 leading-snug">
              &ldquo;{t("quote")}&rdquo;
            </blockquote>

            {bio.map((paragraph, i) => (
              <p
                key={i}
                className="about-bio-p text-base md:text-lg leading-relaxed text-white/60"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ABOUT_PROFILE.interests.map((interest) => (
            <InterestCard
              key={interest.id}
              interest={interest}
              label={t(`interests.${interest.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
