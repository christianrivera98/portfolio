import { BAMBOO_STALKS, INK_ARC_D } from "./about.motifs"

/**
 * The Kung Fu Panda chapter's signature motif: an open ink circle drawn over
 * three bamboo stalks. Both are original paths — the film is named in the copy,
 * never drawn. `.motif-ink` is swept open by a scaleX tween so the "brush"
 * gesture stays a transform instead of a stroke-dashoffset repaint.
 */
export function MotifInkBamboo({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <g className="motif-bamboo" opacity="0.45">
        {BAMBOO_STALKS.map((stalk) => (
          <g key={stalk.x} className="stroke-[hsl(var(--accent))]" strokeWidth="1.2">
            <rect x={stalk.x} y="0" width={stalk.width} height="120" rx="2" />
            {stalk.nodes.map((node) => (
              <path key={node} d={`M${stalk.x} ${node}h${stalk.width}`} />
            ))}
          </g>
        ))}
      </g>
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
