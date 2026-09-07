"use client"

import { useTranslations } from "next-intl"
import { useCardVisual } from "@/hooks/useCardVisual"
import { buildTerminalTimeline } from "./visual-timelines"
import { TERMINAL_KEYS } from "./visuals.config"

export function TerminalVisual() {
  const t = useTranslations("Technologies.visuals.terminal")
  const ref = useCardVisual(buildTerminalTimeline)

  return (
    <div
      ref={ref}
      className="visual-mono visual-corner visual-tilt-a flex w-[92%] flex-col gap-[6px] px-5 pt-8 text-[10px] leading-relaxed text-foreground/75"
    >
      {TERMINAL_KEYS.map((key) => (
        <p key={key} className="visual-line overflow-hidden whitespace-nowrap">
          <span className="text-[hsl(var(--accent))]">$ </span>
          {t(key)}
        </p>
      ))}
      <span className="visual-caret mt-1 h-[11px] w-[6px] bg-[hsl(var(--accent))]" />
    </div>
  )
}
