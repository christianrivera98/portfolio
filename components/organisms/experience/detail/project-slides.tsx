"use client"

import { useTranslations } from "next-intl"
import { ImageOff, ArrowUpRight } from "lucide-react"
import { PROJECTS } from "@/components/organisms/projects/projects.config"
import { useTrackScroll } from "@/hooks/useTrackScroll"
import { SlideMedia } from "./slide-media"

/**
 * Horizontal media slider for a project. Mobile: drag (native pan-x).
 * Laptop/desktop: mouse drag + wheel mapped to X. Slides are static (clips
 * autoplay as moving images, no tap-to-expand) so a click never collapses the
 * tablet. Empty-state fallback.
 */
export function ProjectSlides({ projectId }: { projectId: string }) {
  const t = useTranslations("Projects")
  const name = t(`items.${projectId}.name`)
  const project = PROJECTS.find((p) => p.id === projectId)
  const media = project?.media ?? []
  const liveUrl = project?.liveUrl
  const { ref, handlers } = useTrackScroll<HTMLDivElement>()

  return (
    <div className="relative flex flex-col">
      <div className="px-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif-display text-xl font-bold text-white sm:text-2xl">{name}</h3>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/65 transition-colors hover:border-white/20 hover:text-white"
            >
              {t("viewLive")}
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/55">
          {t(`items.${projectId}.description`)}
        </p>
      </div>

      {media.length === 0 ? (
        <div className="flex h-[40vh] flex-col items-center justify-center gap-3 text-white/35">
          <ImageOff className="size-7" />
          <span className="text-sm">{t("noShots")}</span>
        </div>
      ) : (
        <div
          ref={ref}
          {...handlers}
          data-lenis-prevent
          className="flex cursor-grab snap-x snap-proximity gap-4 overflow-x-auto p-5 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-x" }}
        >
          {media.map((item, i) => (
            <SlideMedia
              key={item.src}
              item={item}
              alt={`${name} — ${i + 1}`}
              sizes="(min-width: 1280px) 30rem, 80vw"
            />
          ))}
        </div>
      )}
    </div>
  )
}
