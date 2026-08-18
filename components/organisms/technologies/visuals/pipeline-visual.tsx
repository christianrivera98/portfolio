"use client"

import { useTranslations } from "next-intl"
import { CheckIcon } from "@/components/ui/icons"
import { useCardVisual } from "@/hooks/useCardVisual"
import { buildPipelineTimeline } from "./visual-timelines"
import { PIPELINE_STEPS } from "./visuals.config"

/** 04 — CI checks going green one after another under a filling progress bar. */
export function PipelineVisual() {
  const t = useTranslations("Technologies.visuals.pipeline")
  const ref = useCardVisual(buildPipelineTimeline)

  return (
    <div
      ref={ref}
      className="visual-mono visual-corner visual-tilt-a flex w-[56%] flex-col justify-start gap-[6px] px-5 pt-7 text-[10px] leading-none text-foreground/75 md:w-[46%]"
    >
      <div className="mb-2 h-px w-full max-w-[220px] bg-foreground/10">
        <div className="visual-bar h-px w-full origin-left bg-[hsl(var(--accent))]/60" />
      </div>

      {PIPELINE_STEPS.map((step) => (
        <p key={step} className="visual-step flex items-center gap-2 whitespace-nowrap">
          <CheckIcon className="visual-check size-[10px] text-[hsl(var(--accent))]" />
          <span className="w-[62px]">{step}</span>
          <span className="text-foreground/35">{t(step)}</span>
        </p>
      ))}
    </div>
  )
}
