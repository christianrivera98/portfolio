"use client"

import { useRef } from "react"
import { useProjectsAnimations } from "@/hooks/useProjectsAnimations"
import { FeaturedProject } from "./featured-project"
import { ProjectCard } from "./project-card"
import { PROJECTS, PROJECTS_SECTION } from "./projects.config"

export function Projects() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useProjectsAnimations(containerRef, titleRef)

  const featured = PROJECTS.find((p) => p.featured)
  const secondary = PROJECTS.filter((p) => !p.featured)

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-[hsl(356,96%,22%)] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span
            className="projects-label inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 mb-4"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {PROJECTS_SECTION.label}
          </span>
          <h2
            ref={titleRef}
            className="font-serif-display text-4xl md:text-6xl lg:text-7xl text-white tracking-tight"
            style={{ perspective: "500px" }}
          >
            {PROJECTS_SECTION.title}
          </h2>
          <p className="projects-subtitle mt-4 text-base md:text-lg text-white/35 max-w-md">
            {PROJECTS_SECTION.subtitle}
          </p>
          <div className="projects-accent-line h-[2px] w-16 bg-[hsl(356,96%,32%)] mt-6 scale-x-0 origin-left" />
        </div>

        {/* Featured Project */}
        {featured && (
          <div className="mb-16">
            <FeaturedProject project={featured} />
          </div>
        )}

        {/* Secondary Grid — staggered 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondary.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
