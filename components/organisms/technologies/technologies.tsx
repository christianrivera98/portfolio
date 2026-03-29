"use client"

import { useRef } from "react"
import { useTechnologiesAnimations } from "@/hooks/useTechnologiesAnimations"
import { TechLayerRow } from "./tech-layer"
import { TECH_LAYERS, TECHNOLOGIES_SECTION } from "./technologies.config"

export function Technologies() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useTechnologiesAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="technologies"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full bg-[hsl(356,96%,22%)] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span
            className="tech-label inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-4"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {TECHNOLOGIES_SECTION.label}
          </span>
          <h2
            ref={titleRef}
            className="font-serif-display text-4xl md:text-6xl lg:text-7xl text-white tracking-tight"
            style={{ perspective: "500px" }}
          >
            {TECHNOLOGIES_SECTION.title}
          </h2>
          <p className="tech-subtitle mt-4 text-base md:text-lg text-white/35 max-w-md">
            {TECHNOLOGIES_SECTION.subtitle}
          </p>
          <div className="tech-accent-line h-[2px] w-16 bg-[hsl(356,96%,32%)] mt-6 scale-x-0 origin-left" />
        </div>

        {/* Stack Layers */}
        <div className="tech-layers">
          {TECH_LAYERS.map((layer, index) => (
            <TechLayerRow
              key={layer.id}
              layer={layer}
              index={index}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
