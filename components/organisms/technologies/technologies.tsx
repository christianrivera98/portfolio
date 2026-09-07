"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { useTechnologiesAnimations } from "@/hooks/useTechnologiesAnimations"
import { ProcessCard } from "./process-card"
import { SkillsGrid } from "./skills-grid"
import type { CardVariant } from "./process-card"
import { PROCESS_CARDS, SKILL_LOGOS } from "./technologies.config"

const CELLS: { variant: CardVariant; place: string }[] = [
  { variant: "std", place: "sm:col-start-1 sm:row-start-1" },
  { variant: "tall", place: "sm:col-start-2 sm:row-start-1 sm:row-span-2" },
  { variant: "std", place: "sm:col-start-1 sm:row-start-2" },
  { variant: "wide", place: "sm:col-start-1 sm:col-span-2 sm:row-start-3" },
]

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
      <div className="absolute bottom-1/4 left-0 size-[500px] rounded-full bg-[hsl(var(--primary))] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 lg:pl-28 lg:pr-0">
        <div className="mb-16">
          <span className="tech-label inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/60">
            {t("label")}
          </span>
          <h2
            ref={titleRef}
            className="mt-4 max-w-4xl font-serif-display text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl"
            style={{ perspective: "500px" }}
          >
            {t("title")}
          </h2>
          <div className="tech-accent-line mt-6 h-[2px] w-16 origin-left bg-[hsl(var(--primary))]" />
          <p className="tech-subtitle mt-6 max-w-2xl text-base leading-relaxed text-foreground/70">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="tech-bento mx-auto grid w-full max-w-[800px] grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {PROCESS_CARDS.map((card, index) => (
            <div key={card.id} className={CELLS[index].place}>
              <ProcessCard id={card.id} index={index} variant={CELLS[index].variant} />
            </div>
          ))}
        </div>

        <ul className="sr-only">
          {SKILL_LOGOS.map((logo) => (
            <li key={logo.label}>{logo.label}</li>
          ))}
        </ul>
        <div className="tech-fallback mx-auto mt-16 w-full max-w-[800px]" aria-hidden>
          <SkillsGrid />
        </div>

      </div>
    </section>
  )
}
