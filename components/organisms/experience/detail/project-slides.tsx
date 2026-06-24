"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useReducedMotion, type Transition } from "motion/react"
import { ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PROJECTS } from "@/components/organisms/projects/projects.config"
import { useDragScroll } from "@/hooks/useDragScroll"

/**
 * Horizontal screenshot slider for a project. Native touch scroll (Lenis is
 * told to ignore the track) + pointer drag; tapping a shot morphs it to fill
 * the tablet screen via a shared-layout (layoutId) spring. Empty-state fallback.
 */
export function ProjectSlides({ projectId }: { projectId: string }) {
  const t = useTranslations("Projects")
  const name = t(`items.${projectId}.name`)
  const images = PROJECTS.find((p) => p.id === projectId)?.images ?? []
  const { ref, handlers } = useDragScroll<HTMLDivElement>()
  const [expanded, setExpanded] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const spring: Transition = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 32, mass: 0.8 }

  return (
    <div className="relative flex flex-col">
      <div className="px-5 pt-5">
        <h3 className="font-serif-display text-xl font-bold text-white sm:text-2xl">{name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white/55">
          {t(`items.${projectId}.description`)}
        </p>
      </div>

      {images.length === 0 ? (
        <div className="flex h-[40vh] flex-col items-center justify-center gap-3 text-white/35">
          <ImageOff className="size-7" />
          <span className="text-sm">{t("noShots")}</span>
        </div>
      ) : (
        <div
          ref={ref}
          {...handlers}
          data-lenis-prevent
          className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto p-5 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          style={{ touchAction: "pan-x" }}
        >
          {images.map((src, i) => (
            <Button
              key={src}
              type="button"
              variant="ghost"
              aria-label={`${t("expand")} — ${name} ${i + 1}`}
              onClick={() => setExpanded(src)}
              className="relative aspect-[16/10] h-auto w-[80%] shrink-0 cursor-zoom-in snap-center overflow-hidden rounded-xl border border-white/10 bg-black/40 p-0 hover:bg-black/40 sm:w-[68%]"
            >
              {expanded !== src && (
                <motion.img
                  layoutId={src}
                  src={src}
                  alt={`${name} — ${i + 1}`}
                  draggable={false}
                  transition={spring}
                  className="absolute inset-0 size-full object-cover"
                />
              )}
            </Button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,1)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <Button
              type="button"
              variant="ghost"
              aria-label={t("collapse")}
              onClick={() => setExpanded(null)}
              className="absolute inset-0 size-full cursor-zoom-out rounded-none p-0 hover:bg-transparent"
            >
              <motion.img
                layoutId={expanded}
                src={expanded}
                alt={name}
                draggable={false}
                transition={spring}
                className="size-full object-contain"
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
