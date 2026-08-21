"use client"

type Props = {
  labels: string[]
  active: number
  onSelect: (index: number) => void
}

const COLUMN = "flex w-[84px] flex-col items-center gap-2"
const FRAME = "aspect-video w-16 rounded-[2px] border"
const CAPTION = "font-mono text-[10px] tracking-[0.18em]"

const index = (i: number) => String(i + 1).padStart(2, "0")

/**
 * The rail rides over the run, inside the same box as the clips. Its slots are
 * the keyboard route through the interests, since the panels themselves hold
 * nothing focusable.
 *
 * Three layers on purpose. The `.rail-slot` boxes are pure geometry and never
 * move, so the marker Flip always fits onto the row's real coordinates; the
 * marker is the single travelling highlight; the buttons on top are what the
 * entry Flip animates and what takes the clicks.
 */
export function InterestRail({ labels, active, onSelect }: Readonly<Props>) {
  return (
    <div className="journey-rail is-deck">
      <div className="rail-row relative">
        <div className="pointer-events-none flex gap-4 opacity-0" aria-hidden="true">
          {labels.map((label, i) => (
            <div key={label} className={COLUMN}>
              <span className={`rail-slot ${FRAME} border-transparent`} />
              <span className={CAPTION}>{index(i)}</span>
            </div>
          ))}
        </div>

        <span
          aria-hidden="true"
          className="rail-marker pointer-events-none absolute left-0 top-0 h-9 w-16 rounded-[2px] border border-[hsl(var(--accent))] opacity-0"
        />

        <div className="absolute inset-0 flex gap-4">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(i)}
              aria-current={i === active}
              aria-label={label}
              className={`rail-item ${COLUMN} rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))]`}
            >
              <span
                aria-hidden="true"
                className={`${FRAME} bg-[#0a0a0a]/70 transition-colors duration-300 ${
                  i === active ? "border-transparent" : "border-white/15 hover:border-white/40"
                }`}
              />
              <span
                className={`${CAPTION} transition-colors duration-300 ${
                  i === active ? "text-white/90" : "text-white/40"
                }`}
              >
                {index(i)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rail-track h-px w-[320px] max-w-[70vw] bg-white/10">
        <div className="rail-progress h-full w-full origin-left scale-x-0 bg-[hsl(var(--accent))]" />
      </div>
    </div>
  )
}
