"use client"

import Image from "next/image"
import { useState } from "react"
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/icons"
import { type Project } from "./projects.config"

export function FeaturedProject({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="featured-project group relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 p-6 md:p-10 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
      {/* Image */}
      <div className="featured-image relative aspect-[16/10] overflow-hidden rounded-sm bg-white/[0.03]">
        {!imgError && project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif-display text-4xl text-white/10">{project.name[0]}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[hsl(356,96%,45%)]">
          Featured Project
        </span>
        <h3 className="font-serif-display text-3xl md:text-4xl text-white tracking-tight">
          {project.name}
        </h3>
        <p className="text-base leading-relaxed text-white/50">
          {project.longDescription || project.description}
        </p>
        {project.metrics && (
          <span className="text-sm font-mono text-[hsl(356,96%,45%)]">{project.metrics}</span>
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tech.map((t) => (
            <span key={t} className="px-3 py-1 text-[11px] font-mono text-white/50 border border-white/[0.08] rounded-full">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              View Live <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              Source <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
