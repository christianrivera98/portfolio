"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import type * as THREE from "three"
import type { Viewport } from "@/components/organisms/stack-journey/stack-journey.config"
import { createEntry, placeRow } from "@/components/organisms/stack-journey/stack-phases"
import {
  createDriftPhase,
  createExitPhase,
  createScatterPhase,
} from "@/components/organisms/stack-journey/stack-scroll-phases"
import { readViewport } from "@/components/organisms/stack-journey/stack-viewport"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Orchestrates the stack logos across the page: they land in a row in the hero,
 * the row breaks as it leaves, and the field drifts up behind Experience.
 *
 * The row hangs off the live layout rather than off magic numbers — it centres
 * in the band under the lowest CTA and stops short of the scroll invite — so a
 * resize or a copy change re-places it on the next ScrollTrigger refresh.
 */
export function useStackJourney(
  meshesRef: React.RefObject<(THREE.Mesh | null)[]>,
  invalidate: () => void,
  ready: boolean,
  setLive: (live: boolean) => void
) {
  const landed = useRef(false)

  useGSAP(
    () => {
      const logos = (meshesRef.current ?? []).filter(Boolean) as THREE.Mesh[]
      if (!ready || !logos.length) return

      const mm = gsap.matchMedia()

      // Both conditions are declared so one of them always matches — with a
      // single query the handler would never run on the other side of it.
      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (context) => {
          const mobile = !!context.conditions?.isMobile
          const viewport = (): Viewport => readViewport(mobile)

          const phase = { logos, viewport, invalidate }

          // The magnet only listens while the hero is parked at the top. It ends
          // where the scatter begins so the two never fight over the same
          // meshes. A toggle and not an onLeave/onEnterBack pair on purpose: the
          // layer mounts after the preloader, so on a page that is already
          // scrolled down those two never fire and the scene would keep working
          // for nothing.
          const gate = ScrollTrigger.create({
            trigger: "#home",
            start: "top bottom",
            end: "top top",
            onToggle: (self) => setLive(self.isActive && landed.current),
          })

          const land = () => {
            landed.current = true
            placeRow(phase)
            setLive(gate.isActive)
          }

          // Flying in is only worth it with the hero on screen; mounting with
          // the page already scrolled past it just places the row.
          let entry: gsap.core.Tween | null = null
          if (gate.isActive) entry = createEntry(phase, land)
          else land()

          // Phones keep the landing but not the journey: the scrubbed phases
          // doubled the long frames on the 360/CPU-4x profile, and that device
          // is already the tightest one on the page.
          const phases = mobile
            ? [createExitPhase(phase)]
            : [createScatterPhase(phase), createDriftPhase(phase)]

          const reposition = () => {
            if (landed.current) placeRow(phase)
          }
          ScrollTrigger.addEventListener("refreshInit", reposition)

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", reposition)
            setLive(false)
            gate.kill()
            entry?.kill()
            phases.forEach((tween) => {
              tween.scrollTrigger?.kill()
              tween.kill()
            })
          }
        }
      )

      return () => mm.revert()
    },
    { dependencies: [ready, invalidate, setLive, meshesRef] }
  )
}
