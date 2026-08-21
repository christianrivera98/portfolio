import { BAMBOO_STALKS, INK_ARC_D } from "./about.motifs"

/**
 * The Kung Fu Panda chapter's signature motif, in two layers: bamboo running
 * the full height of the stage and an open ink circle drawn in one gesture.
 * Both are original paths — the film is named in the copy, never drawn.
 */

/** Stalks tall enough to read as bamboo instead of three red bars. */
export function MotifBamboo() {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <g className="motif-bamboo stroke-[hsl(var(--accent))]" strokeWidth="1.1">
        {BAMBOO_STALKS.map((stalk) => (
          <g key={stalk.x}>
            <rect x={stalk.x} y="-10" width={stalk.width} height="140" rx="2" />
            {stalk.nodes.map((node) => (
              <path key={node} d={`M${stalk.x} ${node}h${stalk.width}`} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}

/**
 * `.motif-ink` is swept open by a scaleX tween, so the brush gesture stays a
 * transform instead of a stroke-dashoffset repaint.
 */
export function MotifInk() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full" aria-hidden="true">
      <path
        className="motif-ink stroke-white"
        d={INK_ARC_D}
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}
