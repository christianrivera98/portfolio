"use client"

import { useRef } from "react"
import { useExperienceAnimations } from "@/hooks/useExperienceAnimations"
import { ExperienceCard } from "./experience-card"
import { EXPERIENCE_ENTRIES, EXPERIENCE_SECTION } from "./experience.config"

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useExperienceAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(356,96%,22%)] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        <div className="mb-16 md:mb-24">
          <span
            className="experience-label inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-4"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {EXPERIENCE_SECTION.label}
          </span>
          <h2
            ref={titleRef}
            className="font-serif-display text-4xl md:text-6xl lg:text-7xl text-white tracking-tight"
            style={{ perspective: "500px" }}
          >
            {EXPERIENCE_SECTION.title}
          </h2>
          <p className="experience-subtitle mt-4 text-base md:text-lg text-white/35 max-w-md">
            {EXPERIENCE_SECTION.subtitle}
          </p>
          <div className="experience-accent-line h-[2px] w-16 bg-[hsl(356,96%,32%)] mt-6 scale-x-0 origin-left" />
        </div>

        <div className="experience-entries relative">
          <svg
            className="hidden md:block absolute left-[200px] top-0 bottom-0 w-px h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="1"
            />
            <line
              className="experience-timeline-svg"
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100%"
              stroke="hsl(356, 96%, 32%)"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
          </svg>

          {EXPERIENCE_ENTRIES.map((entry, index) => (
            <div key={entry.id} className="relative">
              <div className="experience-dot hidden md:flex absolute left-[194px] top-10 w-[13px] h-[13px] items-center justify-center z-10">
                <span className="block w-[7px] h-[7px] rounded-full bg-[hsl(356,96%,32%)] ring-[3px] ring-[#0a0a0a]" />
              </div>
              <ExperienceCard entry={entry} index={index} />
              {index < EXPERIENCE_ENTRIES.length - 1 && (
                <div
                  data-divider={index}
                  className="experience-divider h-px bg-gradient-to-r from-white/[0.04] via-white/[0.10] to-white/[0.04] md:ml-[220px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
