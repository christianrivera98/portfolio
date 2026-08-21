"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useAboutAnimations } from "@/hooks/useAboutAnimations"
import { AboutJourney } from "./about-journey"

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const t = useTranslations("About")

  useAboutAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-[hsl(356,96%,22%)] opacity-[0.02] blur-[120px]" />

      {/* Header and run are one stage: above `lg` the pin takes the whole
          stage, so the title stays put while the run is scrubbed. */}
      <div className="about-stage relative z-10">
        {/* Header — keeps the left position used across sections */}
        <div className="w-full max-w-6xl px-6 md:px-12 lg:pl-28 lg:pr-0">
          <div className="about-header mb-16 md:mb-24">
            <span
              className="about-label mb-4 inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-white/35"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              {t("label")}
            </span>
            <h2
              ref={titleRef}
              className="font-serif-display text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ perspective: "500px" }}
            >
              {t("title")}
            </h2>
          </div>
        </div>

        {/* One run: the editorial intro, then the five interests */}
        <div className="journey-rail mx-auto w-full max-w-6xl px-6 md:px-12">
          <AboutJourney />
        </div>
      </div>
    </section>
  )
}
