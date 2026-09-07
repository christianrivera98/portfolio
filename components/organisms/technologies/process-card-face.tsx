import { PlusIcon } from "@/components/ui/icons"

interface ProcessCardFaceProps {
  step: string
  title?: string
  body?: string
  hint?: string
}

export function ProcessCardFace({ step, title, body, hint }: ProcessCardFaceProps) {
  return (
    <div className="process-card-face flex h-full flex-col p-7 text-left md:p-9">
      <span className="font-mono text-[10px] tracking-[0.3em] text-foreground/60">{step}</span>

      {title ? (
        <h3 className="mt-auto font-serif-display text-lg font-bold leading-snug text-foreground sm:text-xl lg:text-2xl">
          {title}
        </h3>
      ) : (
        <p className="mt-auto text-[13px] leading-relaxed text-foreground/75">{body}</p>
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
