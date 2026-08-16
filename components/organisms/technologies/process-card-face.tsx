import { ArrowRightIcon } from "@/components/ui/icons"

interface ProcessCardFaceProps {
  /** Step number, kept on both faces so the swap has a fixed anchor. */
  step: string
  /** Serif heading on the front, mono eyebrow on the back. */
  heading: string
  body: string
  hint: string
  variant: "front" | "back"
}

/**
 * One side of a process card. Both faces share the same padding and grid so
 * the pixel swap lands on identical geometry and nothing appears to shift.
 */
export function ProcessCardFace({ step, heading, body, hint, variant }: ProcessCardFaceProps) {
  const isBack = variant === "back"

  return (
    <div className="flex h-full flex-col p-7 text-left md:p-9">
      <span className="font-mono text-[11px] tracking-[0.3em] text-foreground/60">{step}</span>

      {isBack ? (
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--accent))]">
          {heading}
        </p>
      ) : (
        <h3 className="mt-5 font-serif-display text-xl font-bold text-foreground sm:text-2xl">
          {heading}
        </h3>
      )}

      <p className="mt-3 text-sm leading-relaxed text-foreground/70">{body}</p>

      <span className="mt-auto pt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
        {hint}
        <ArrowRightIcon
          className={`size-3 transition-transform duration-300 ${isBack ? "-rotate-180" : ""}`}
        />
      </span>
    </div>
  )
}
