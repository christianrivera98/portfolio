"use client"

import { useTranslations } from "next-intl"
import { type ExperienceEntry } from "./experience.config"
import { HighlightText } from "./highlight-text"
import { CompanyInfoButton, ProjectDetailsCta } from "./experience-detail-actions"
import { useTitlePreview } from "@/hooks/useTitlePreview"

export function ExperienceCard({
  entry,
  index,
}: {
  entry: ExperienceEntry
  index: number
}) {
  const t = useTranslations("Experience")
  const role = t(`items.${entry.id}.role`)
  const period = t(`items.${entry.id}.period`)
  const typeLabel = t(entry.type)
  const highlights = t.raw(`items.${entry.id}.highlights`) as string[]
  const titleHover = useTitlePreview(index)

  return (
    <div
      className="experience-card group relative grid grid-cols-[4px_1fr] md:grid-cols-[200px_1fr] gap-5 md:gap-12 py-8 md:py-14 transition-colors duration-300"
      data-index={index}
    >
      <div className="md:hidden self-stretch rounded-full bg-gradient-to-b from-[hsl(356,96%,32%)] via-[hsl(356,96%,22%)] to-transparent opacity-40 group-hover:opacity-70 transition-opacity duration-300" />

      <div className="experience-meta hidden md:flex flex-col gap-2 md:text-right">
        <span className="text-sm font-mono tracking-wide text-white/35">
          {period}
        </span>
        <span
          className={`experience-badge inline-block w-fit md:ml-auto text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
            entry.type === "fulltime"
              ? "border-white/15 text-white/50 group-hover:text-white/70"
              : "border-white/10 text-white/35 group-hover:text-white/50"
          }`}
        >
          {typeLabel}
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="md:hidden text-xs font-mono tracking-wide text-white/35 mb-1">
            {period}
            <span
              className={`experience-badge ml-3 text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border ${
                entry.type === "fulltime"
                  ? "border-white/15 text-white/40"
                  : "border-white/10 text-white/30"
              }`}
            >
              {typeLabel}
            </span>
          </span>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="experience-number text-xs font-mono text-white/15 group-hover:text-[hsl(356,96%,32%)]/60 transition-colors duration-300 hidden md:inline">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="group/title inline-flex w-fit items-center gap-3 xl:cursor-pointer 2xl:cursor-default" {...titleHover}>
              <h3 className="experience-company font-serif-display font-bold text-2xl md:text-3xl text-white tracking-tight">
                {entry.company}
                {entry.location && (
                  <span className="text-white/25 text-base ml-2 font-sans font-normal">
                    {entry.location}
                  </span>
                )}
              </h3>
              <CompanyInfoButton index={index} />
            </div>
          </div>

          <p className="experience-role text-base md:text-lg text-white/60 font-medium md:pl-9">
            {role}
          </p>
        </div>

        <ul className="experience-highlights flex flex-col gap-3 mt-1 md:pl-9">
          {highlights.map((highlight, i) => (
            <li
              key={i}
              className="experience-highlight relative pl-5 text-sm md:text-[15px] leading-relaxed text-white/50 group-hover:text-white/65 transition-colors duration-300"
            >
              <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-[hsl(356,96%,32%)] opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <HighlightText text={highlight} />
            </li>
          ))}
        </ul>

        {entry.projectId && (
          <div className="mt-2 md:pl-9">
            <ProjectDetailsCta projectId={entry.projectId} label={entry.ctaLabel ?? entry.company} />
          </div>
        )}
      </div>
    </div>
  )
}
