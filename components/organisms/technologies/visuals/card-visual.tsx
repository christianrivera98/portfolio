"use client"

import { ConsoleVisual } from "./console-visual"
import { EditorVisual } from "./editor-visual"
import { TerminalVisual } from "./terminal-visual"
import { TreeVisual } from "./tree-visual"

const VISUALS: Record<string, () => React.ReactElement> = {
  understand: TerminalVisual,
  architecture: TreeVisual,
  build: EditorVisual,
  quality: ConsoleVisual,
}

export function CardVisual({ id }: { id: string }) {
  const Visual = VISUALS[id]
  if (!Visual) return null

  return (
    <div aria-hidden className="card-visual pointer-events-none absolute inset-0 overflow-hidden">
      <Visual />
    </div>
  )
}
