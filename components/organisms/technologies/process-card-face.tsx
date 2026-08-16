interface ProcessCardFaceProps {
  /** Step number, kept on both faces so the swap has a fixed anchor. */
  step: string
  /** Only the front face carries a heading; the back is the reason alone. */
  title?: string
  body: string
}

/**
 * One side of a process card. Both faces share the same padding and step
 * number so the pixel swap lands on identical geometry, and the only thing
 * that visibly resolves is the copy itself.
 */
export function ProcessCardFace({ step, title, body }: ProcessCardFaceProps) {
  return (
    // Opaque on purpose: each revealed pixel has to cover the outgoing face,
    // otherwise both texts show through at once and the grid reads as a blur
    // instead of cells. #0d0d0d is the section surface plus the card's tint.
    <div className="flex h-full flex-col bg-[#0d0d0d] p-7 text-left md:p-9">
      <span className="font-mono text-[11px] tracking-[0.3em] text-foreground/60">{step}</span>

      {title ? (
        <>
          <h3 className="mt-5 font-serif-display text-xl font-bold text-foreground sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">{body}</p>
        </>
      ) : (
        <p className="my-auto text-base leading-relaxed text-foreground/80">{body}</p>
      )}
    </div>
  )
}
