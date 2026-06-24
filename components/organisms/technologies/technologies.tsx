"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useTechnologiesAnimations } from "@/hooks/useTechnologiesAnimations"
import { ProcessCard } from "./process-card"
import { SkillsGrid } from "./skills-grid"
import { PROCESS_CARDS } from "./technologies.config"

export function Technologies() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const t = useTranslations("Technologies")

  useTechnologiesAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="technologies"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(356,96%,22%)] opacity-[0.02] blur-[120px] pointer-events-none" />

      {/* Header — keeps the left position used across sections */}
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 lg:pl-28 lg:pr-0">
        <div className="mb-16 md:mb-24">
          <span
            className="tech-label inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-4"
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
          <div className="tech-accent-line h-[2px] w-16 bg-[hsl(356,96%,32%)] mt-6 scale-x-0 origin-left" />
        </div>
      </div>

      {/* Content — centered */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="tech-bento grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {PROCESS_CARDS.map((card) => (
            <ProcessCard key={card.id} id={card.id} />
          ))}
        </div>

        <p className="tech-skills-label mt-16 mb-6 text-[11px] font-mono uppercase tracking-[0.3em] text-white/35">
          {t("skillsLabel")}
        </p>
        <SkillsGrid />
      </div>
    </section>
  )
}
