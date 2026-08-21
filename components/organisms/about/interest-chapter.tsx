"use client"

import { useTranslations } from "next-intl"
import { useVideoInView } from "@/hooks/useVideoInView"
import { InterestMotifLayer } from "./interest-motifs"
import type { Interest } from "./about.config"

type Props = {
  interest: Interest
  index: number
  /**
   * Whether this chapter is allowed to own a `src` yet. On the pinned theatre
   * only the focused chapter and the next one qualify, so four clips never
   * download for a visitor who scrolls past.
   */
  loadable: boolean
  /** Whether the clip may run once it is on screen. */
  playable: boolean
}

export function InterestChapter({ interest, index, loadable, playable }: Readonly<Props>) {
  const t = useTranslations("About")
  const videoRef = useVideoInView(loadable && playable)

  return (
    <article className="chapter" data-chapter={index} data-motif={interest.motif}>
      <div className="chapter-media relative aspect-video w-full overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.02]">
        <video
          ref={videoRef}
          src={loadable ? interest.video : undefined}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        <InterestMotifLayer motif={interest.motif} />
      </div>

      <div className="chapter-copy mt-6 max-w-[46ch]">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--accent))]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-serif-display text-3xl text-white md:text-4xl">
          {t(`interests.${interest.id}`)}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-white/70">
          {t(`interestsBody.${interest.id}`)}
        </p>
      </div>
    </article>
  )
}
