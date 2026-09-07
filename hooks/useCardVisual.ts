"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useInViewport } from "./useInViewport"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(useGSAP)

export type VisualTimeline = (timeline: gsap.core.Timeline) => void

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
