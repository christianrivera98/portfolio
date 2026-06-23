"use client"

import { useTranslations } from "next-intl"
import { ExternalLinkIcon } from "@/components/ui/icons"
import { ProjectMarquee } from "./project-marquee"
import { type Project } from "./projects.config"

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations("Projects")
  const name = t(`items.${project.id}.name`)
  const description = t(`items.${project.id}.description`)
  const hasMetrics = t.has(`items.${project.id}.metrics`)

  return (
    <div className="project-card group relative overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
      {/* Image — 3D marquee of project shots */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.03]">
        <ProjectMarquee images={project.images} fallback={name[0]} fallbackSize="text-3xl" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-white/70 border border-white/20 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-mono text-white/15">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-serif-display text-xl text-white tracking-tight">
            {name}
          </h3>
        </div>
        <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
          {description}
        </p>
        {hasMetrics && (
          <span className="text-xs font-mono text-[hsl(356,96%,45%)]">
            {t(`items.${project.id}.metrics`)}
          </span>
        )}
        <div className="flex gap-3 mt-1">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              {t("live")} <ExternalLinkIcon className="w-3 h-3" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              {t("code")} <ExternalLinkIcon className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
