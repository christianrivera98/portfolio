"use client"

import { useCardVisual } from "@/hooks/useCardVisual"
import { buildEditorTimeline } from "./visual-timelines"
import { EDITOR_LINES } from "./visuals.config"

/** 03 — a mini editor typing highlighted source. Code needs no translation. */
export function EditorVisual() {
  const ref = useCardVisual(buildEditorTimeline)

  return (
    <div
      ref={ref}
      className="visual-mono absolute inset-0 flex flex-col gap-[5px] px-7 pt-14 text-[10px] leading-none md:px-9 md:text-[11px]"
    >
      {EDITOR_LINES.map((line, row) => (
        <p
          key={row}
          className="visual-code-line flex overflow-hidden whitespace-pre text-foreground/50"
        >
          <span className="mr-3 w-3 shrink-0 text-right text-foreground/25">{row + 1}</span>
          {line.map((token, i) => (
            <span key={i} style={{ color: token.color }}>
              {token.text}
            </span>
          ))}
        </p>
      ))}
      <span className="visual-caret mt-1 h-[11px] w-[6px] bg-[hsl(var(--accent))]" />
    </div>
  )
}
