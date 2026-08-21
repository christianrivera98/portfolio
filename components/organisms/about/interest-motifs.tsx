import type { InterestMotif } from "./about.config"
import { MotifInkBamboo } from "./motif-ink-bamboo"
import { PAW_SHAPES, WAVE_BARS, gearPath } from "./about.motifs"

const SVG = "absolute inset-0 h-full w-full"
const STROKE = "stroke-[hsl(var(--accent))]"

/** Compass rose — travel. The needle is what the timeline spins. */
function Compass() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={SVG} aria-hidden="true">
      <g className={STROKE} strokeWidth="1.5" opacity="0.55">
        <circle cx="60" cy="60" r="44" />
        <ellipse cx="60" cy="60" rx="18" ry="44" />
        <path d="M16 60h88M60 16v88" opacity="0.4" />
      </g>
      <path
        className="motif-spin fill-[hsl(var(--accent))]"
        d="M60 26 68 60 60 94 52 60Z"
        opacity="0.8"
      />
    </svg>
  )
}

/** Waveform — hip hop. Each bar scales on its own baseline. */
function Waveform() {
  return (
    <svg viewBox="0 0 120 120" className={SVG} aria-hidden="true">
      {WAVE_BARS.map((h, i) => (
        <rect
          key={i}
          className="motif-bar fill-[hsl(var(--accent))]"
          x={8 + i * 9}
          y={110 - h * 84}
          width="4"
          height={h * 84}
          rx="2"
          opacity="0.7"
        />
      ))}
    </svg>
  )
}

/** Paw — animals. */
function Paw() {
  return (
    <svg viewBox="0 0 120 120" className={SVG} aria-hidden="true">
      {PAW_SHAPES.map(([cx, cy, rx, ry]) => (
        <ellipse
          key={`${cx}-${cy}`}
          className="motif-pad fill-[hsl(var(--accent))]"
          cx={cx}
          cy={cy}
          rx={rx}
          ry={ry}
          opacity="0.65"
        />
      ))}
    </svg>
  )
}

/** Counter-rotating gears over a grid — mechatronics. */
function Gears() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={SVG} aria-hidden="true">
      <path
        d="M0 30h120M0 60h120M0 90h120M30 0v120M60 0v120M90 0v120"
        className={STROKE}
        strokeWidth="0.6"
        opacity="0.25"
      />
      <g className={STROKE} strokeWidth="1.6" opacity="0.7">
        <path className="motif-gear" d={gearPath(10, 26, 7)} transform="translate(44 52)" />
        <path className="motif-gear" d={gearPath(8, 17, 5)} transform="translate(84 82)" />
      </g>
    </svg>
  )
}

const MOTIFS: Record<InterestMotif, () => React.JSX.Element> = {
  compass: Compass,
  waveform: Waveform,
  ink: () => <MotifInkBamboo className={SVG} />,
  paw: Paw,
  gears: Gears,
}

export function InterestMotifLayer({ motif }: { motif: InterestMotif }) {
  const Motif = MOTIFS[motif]
  return (
    <div className="motif pointer-events-none absolute inset-0 grid place-items-center opacity-45">
      <div className="aspect-square h-[52%]">
        <Motif />
      </div>
    </div>
  )
}
