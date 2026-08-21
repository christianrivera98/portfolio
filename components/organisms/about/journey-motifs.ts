import gsap from "gsap"
import type { InterestMotif } from "./about.config"

/**
 * The motif each chapter plays while it holds the stage. Every one of these is
 * a transform — the ink brush is a scaleX sweep over a finished path rather
 * than a stroke-dashoffset draw, so nothing here repaints per frame.
 *
 * `at` is the chapter's own position on the master timeline and `span` its
 * length, both in timeline units, so the motif advances with the scrub.
 */
export function addMotifTimeline(
  tl: gsap.core.Timeline,
  chapter: HTMLElement,
  motif: InterestMotif,
  at: number,
  span: number
) {
  const q = gsap.utils.selector(chapter)
  const linear = { ease: "none", duration: span } as const

  if (motif === "compass") {
    tl.fromTo(
      q(".motif-spin"),
      { rotate: -40 },
      { rotate: 150, transformOrigin: "50% 50%", ...linear },
      at
    )
    return
  }

  if (motif === "waveform") {
    tl.fromTo(
      q(".motif-bar"),
      { scaleY: 0.15 },
      { scaleY: 1, transformOrigin: "50% 100%", stagger: { each: 0.03, from: "center" }, ...linear },
      at
    )
    return
  }

  if (motif === "ink") {
    // The signature moment: the brush opens the circle, the bamboo drifts.
    tl.fromTo(
      q(".motif-ink"),
      { scaleX: 0, opacity: 0.2 },
      { scaleX: 1, opacity: 1, transformOrigin: "0% 50%", ease: "power2.out", duration: span * 0.6 },
      at
    ).fromTo(
      q(".motif-bamboo"),
      { yPercent: 8 },
      { yPercent: -8, ...linear },
      at
    )
    return
  }

  if (motif === "paw") {
    tl.fromTo(
      q(".motif-pad"),
      { scale: 0.4, opacity: 0 },
      { scale: 1, opacity: 1, transformOrigin: "50% 50%", stagger: 0.06, ease: "power2.out", duration: span * 0.7 },
      at
    )
    return
  }

  tl.fromTo(
    q(".motif-gear"),
    { rotate: 0 },
    { rotate: (i: number) => (i === 0 ? 140 : -180), transformOrigin: "50% 50%", ...linear },
    at
  )
}
