import type { InterestMotif } from "./about.config"
import { MotifBamboo, MotifInk } from "./motif-ink-bamboo"
import { GRID_D, PAW_SHAPES, WAVE_BARS, gearPath } from "./about.motifs"

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
        <ellipse key={`${cx}-${cy}`} className="motif-pad fill-[hsl(var(--accent))]" cx={cx} cy={cy} rx={rx} ry={ry} opacity="0.65" />
      ))}
    </svg>
  )
}

/** Counter-rotating gears over a grid — mechatronics. */
function Gears() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={SVG} aria-hidden="true">
      <path d={GRID_D} className={STROKE} strokeWidth="0.6" opacity="0.25" />
      <g className={STROKE} strokeWidth="1.6" opacity="0.7">
        <path className="motif-gear" d={gearPath(12, 26, 5)} transform="translate(44 52)" />
        <circle cx="44" cy="52" r="8" />
        <path className="motif-gear" d={gearPath(9, 17, 4)} transform="translate(84 82)" />
        <circle cx="84" cy="82" r="5" />
      </g>
    </svg>
  )
}

const MOTIFS: Record<Exclude<InterestMotif, "ink">, () => React.JSX.Element> = {
  compass: Compass,
  waveform: Waveform,
  paw: Paw,
  gears: Gears,
}

const LAYER = "motif pointer-events-none absolute inset-0 opacity-40"
const CORNER = "absolute bottom-[4%] left-[4%] aspect-square h-[38%]"

export function InterestMotifLayer({ motif }: { motif: InterestMotif }) {
  if (motif === "ink") {
    return (
      <div className={LAYER}>
        <div className="absolute inset-y-0 left-[3%] w-[20%]">
          <MotifBamboo />
        </div>
        <div className={CORNER}>
          <MotifInk />
        </div>
      </div>
    )
  }

  const Motif = MOTIFS[motif]
  return (
    <div className={LAYER}>
      <div className={CORNER}>
        <Motif />
      </div>
    </div>
  )
}
