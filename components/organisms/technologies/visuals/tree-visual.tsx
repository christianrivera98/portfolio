"use client"

import { useTranslations } from "next-intl"
import { useCardVisual } from "@/hooks/useCardVisual"
import { buildTreeTimeline } from "./visual-timelines"
import { TREE_ROWS } from "./visuals.config"

/** 02 — a domain-sliced file tree unfolding row by row. */
export function TreeVisual() {
  const t = useTranslations("Technologies.visuals.tree")
  const ref = useCardVisual(buildTreeTimeline)

  return (
    <div
      ref={ref}
      className="visual-mono visual-sheet flex flex-col justify-start gap-[7px] px-7 pt-14 text-[10px] leading-none text-foreground/70 md:px-9"
    >
      {TREE_ROWS.map((row) => (
        <p key={row.text} className="visual-row flex items-baseline gap-2 whitespace-nowrap">
          <span>{row.text}</span>
          {row.note ? (
            <span className="text-[hsl(var(--accent))]/70">{t(row.note)}</span>
          ) : null}
        </p>
      ))}
    </div>
  )
}
