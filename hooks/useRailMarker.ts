"use client"

import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, Flip)

/**
 * The active slot is marked by a single element that Flip fits onto whichever
 * slot the run is on, so the marker travels the rail instead of blinking from
 * one border to the next.
 */
export function useRailMarker(
  rootRef: React.RefObject<HTMLDivElement | null>,
  active: number
) {
  useGSAP(
    () => {
      const root = rootRef.current
      const marker = root?.querySelector<HTMLElement>(".rail-marker")
      if (!marker) return
      const slot = root?.querySelectorAll<HTMLElement>(".rail-slot")[active]
      if (!slot) {
        gsap.to(marker, { autoAlpha: 0, duration: 0.2 })
        return
      }
      gsap.to(marker, { autoAlpha: 1, duration: 0.2 })
      Flip.fit(marker, slot, { duration: 0.45, ease: "power3.out" })
    },
    { dependencies: [active], scope: rootRef }
  )
}
