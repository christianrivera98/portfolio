"use client"

import { useTranslations } from "next-intl"
import { useVideoInView } from "@/hooks/useVideoInView"
import { InterestMotifLayer } from "./interest-motifs"
import type { Interest } from "./about.config"

type Props = {
  interest: Interest
  index: number
  /** Whether this panel is allowed to own a `src` yet. */
  loadable: boolean
  /** Whether its clip may run once it is on screen. */
  playable: boolean
}

export function InterestPanel({ interest, index, loadable, playable }: Readonly<Props>) {
  const t = useTranslations("About")
  const videoRef = useVideoInView(loadable && playable)

  return (
    <article
      className="journey-panel journey-panel--chapter chapter"
      data-motif={interest.motif}
    >
      <div className="chapter-media relative w-full overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.02]">
        <video
          ref={videoRef}
          src={loadable ? interest.video : undefined}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <InterestMotifLayer motif={interest.motif} />

        {/* Title and copy live inside the clip's own box. The scrim under them
            never drops below 92% of the surface, which is what keeps the text
            legible whatever frame the clip happens to be on. */}
        <div className="chapter-copy absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/92 to-transparent px-6 pb-6 pt-14 lg:pb-10 lg:pt-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--accent))]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-serif-display text-3xl text-white">
            {t(`interests.${interest.id}`)}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-white/70">
            {t(`interestsBody.${interest.id}`)}
          </p>
        </div>
      </div>
    </article>
  )
}
