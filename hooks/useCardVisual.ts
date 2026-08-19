"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useInViewport } from "./useInViewport"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(useGSAP)

export type VisualTimeline = (timeline: gsap.core.Timeline) => void

/**
 * Drives the looping background animation of a bento card visual.
 *
 * Cheap as these are (DOM + transforms), they still stop dead while the card is
 * off screen or the tab is hidden, and under reduced motion they never run at
 * all: the timeline is parked on its `settled` frame, fully revealed.
 *
 * `build` must be a module-level function so the timeline is not rebuilt on
 * every render.
 */
export function useCardVisual(build: VisualTimeline) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const onScreen = useInViewport(ref, { rootMargin: "150px" })
  const timeline = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, paused: true })
      build(tl)
      timeline.current = tl
      if (reduced) tl.pause(tl.labels.settled ?? tl.duration())
    },
    { scope: ref, dependencies: [build, reduced] }
  )

  useEffect(() => {
    const tl = timeline.current
    if (!tl || reduced) return
    if (onScreen) tl.resume()
    else tl.pause()
  }, [onScreen, reduced])

  return ref
}
