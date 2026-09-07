import gsap from "gsap"
import type { InterestMotif } from "./about.config"

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
