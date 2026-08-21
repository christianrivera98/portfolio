"use client"

type Props = {
  labels: string[]
  active: number
  onSelect: (index: number) => void
}

/**
 * The keyboard route through the run. The panels hold nothing focusable of
 * their own and the visible chrome is now just the two progress bars, so these
 * buttons stay out of the way until they are tabbed to.
 */
export function JourneyJumps({ labels, active, onSelect }: Readonly<Props>) {
  return (
    <div className="journey-jumps absolute left-0 top-2 z-10 flex gap-2">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(i)}
          aria-current={i === active}
          className="sr-only rounded-sm border border-[hsl(var(--accent))] bg-[#0a0a0a] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white focus:not-sr-only focus:relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))]"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
