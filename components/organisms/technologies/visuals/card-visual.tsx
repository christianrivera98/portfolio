"use client"

import { EditorVisual } from "./editor-visual"
import { PipelineVisual } from "./pipeline-visual"
import { TerminalVisual } from "./terminal-visual"
import { TreeVisual } from "./tree-visual"

/** Keyed by the process card id, so a card without a visual simply renders none. */
const VISUALS: Record<string, () => React.ReactElement> = {
  understand: TerminalVisual,
  architecture: TreeVisual,
  build: EditorVisual,
  quality: PipelineVisual,
}

/**
 * Ambient background for a process card. It sits *under* the swap faces rather
 * than inside them: PixelSwap clones the incoming face once per pixel, so a
 * visual living in the face would be cloned a couple of hundred times mid-swap.
 *
 * Decorative by definition — the card's own text carries the meaning.
 */
export function CardVisual({ id }: { id: string }) {
  const Visual = VISUALS[id]
  if (!Visual) return null

  return (
    <div aria-hidden className="card-visual pointer-events-none absolute inset-0 overflow-hidden">
      <Visual />
    </div>
  )
}
