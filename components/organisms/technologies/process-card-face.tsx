import { PlusIcon } from "@/components/ui/icons"

interface ProcessCardFaceProps {
  /** Step number, kept on both faces so the swap has a fixed anchor. */
  step: string
  /** Front face: the step title. */
  title?: string
  /** Back face: the description. */
  body?: string
  /** Touch-only affordance — without hover nothing hints the card opens. */
  hint?: string
}

/**
 * One side of a process card. Both faces share padding, surface and step
 * number, so the pixel grid resolves onto identical geometry.
 *
 * The surface is a scrim over the card visual rather than a flat fill, and it
 * goes fully opaque while the pixel grid runs (see `.process-card-face` in
 * globals.css): the outgoing face stays on screen under the grid, so a
 * translucent one would show both texts at once mid-swap.
 */
export function ProcessCardFace({ step, title, body, hint }: ProcessCardFaceProps) {
  return (
    <div className="process-card-face flex h-full flex-col p-7 text-left md:p-9">
      <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/60">{step}</span>

      {title ? (
        <h3 className="mt-auto font-serif-display text-lg font-bold leading-snug text-foreground sm:text-xl lg:text-2xl">
          {title}
        </h3>
      ) : (
        <p className="mt-5 text-[13px] leading-relaxed text-foreground/75">{body}</p>
      )}

      {hint ? (
        <span className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60">
          <PlusIcon className="size-3" />
          {hint}
        </span>
      ) : null}
    </div>
  )
}
