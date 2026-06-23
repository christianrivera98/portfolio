"use client"

import { useTranslations } from "next-intl"
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/ui/icons"
import { ProjectMarquee } from "./project-marquee"
import { type Project } from "./projects.config"

export function FeaturedProject({ project }: { project: Project }) {
  const t = useTranslations("Projects")
  const name = t(`items.${project.id}.name`)
  const description = project.hasLongDescription
    ? t(`items.${project.id}.longDescription`)
    : t(`items.${project.id}.description`)
  const hasMetrics = t.has(`items.${project.id}.metrics`)

  return (
    <div className="featured-project group relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 p-6 md:p-10 rounded-sm border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
      {/* Image — 3D marquee of project shots */}
      <div className="featured-image relative aspect-[16/10] overflow-hidden rounded-sm bg-white/[0.03]">
        <ProjectMarquee images={project.images} fallback={name[0]} fallbackSize="text-4xl" />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-4">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[hsl(356,96%,45%)]">
          {t("featured")}
        </span>
        <h3 className="font-serif-display font-bold text-3xl md:text-4xl text-white tracking-tight">
          {name}
        </h3>
        <p className="text-base leading-relaxed text-white/50">{description}</p>
        {hasMetrics && (
          <span className="text-sm font-mono text-[hsl(356,96%,45%)]">
            {t(`items.${project.id}.metrics`)}
          </span>
        )}
        <div className="flex flex-wrap gap-2 mt-1">
          {project.tech.map((tech) => (
            <span key={tech} className="px-3 py-1 text-[11px] font-mono text-white/50 border border-white/[0.08] rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              {t("viewLive")} <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              {t("source")} <ArrowRightIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
