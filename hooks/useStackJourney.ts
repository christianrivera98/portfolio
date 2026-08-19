"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import type * as THREE from "three"
import type { Viewport } from "@/components/organisms/stack-journey/stack-journey.config"
import { createEntry, placeRow } from "@/components/organisms/stack-journey/stack-phases"
import { createExitPhase } from "@/components/organisms/stack-journey/stack-exit-phase"
import { createDriftPhase } from "@/components/organisms/stack-journey/stack-drift-phase"
import { createScatterPhase } from "@/components/organisms/stack-journey/stack-scatter-phase"
import { createOrbitPhase } from "@/components/organisms/stack-journey/stack-orbit-phase"
import { readViewport } from "@/components/organisms/stack-journey/stack-viewport"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** How far down the page the hero still counts as "parked at the top". */
const GATE_PX = 40

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
          // Gated on absolute scroll rather than on a trigger element: with
          // `trigger: "#home"` the active range works out to negative scroll, so
          // the gate never opened and both the entry and the magnet were
          // silently dead. The magnet only runs with the hero parked at the top,
          // which is also where the scatter has not started yet.
          const atTop = () => window.scrollY < GATE_PX
          const gate = ScrollTrigger.create({
            start: 0,
            end: GATE_PX,
            onToggle: (self) => setLive(self.isActive && landed.current),
          })

          const land = () => {
            landed.current = true
            placeRow(phase)
            setLive(atTop())
          }

          // Flying in is only worth it with the hero on screen; mounting with
          // the page already scrolled past it just places the row.
          let entry: gsap.core.Tween | null = null
          if (window.scrollY < window.innerHeight) entry = createEntry(phase, land)
          else land()

          // Phones keep the landing but not the journey: the scrubbed phases
          // doubled the long frames on the 360/CPU-4x profile, and that device
          // is already the tightest one on the page.
          // Chained so each phase can hand the meshes back to the previous one
          // when it winds down; see createScatterPhase for why.
          const scatter = mobile ? null : createScatterPhase(phase)
          const drift = scatter ? createDriftPhase(phase, scatter.apply) : null
          // Phones keep the accessible grid in the bento instead of a ring.
          const orbit = drift ? createOrbitPhase(phase, drift.apply) : null

          const phases = mobile
            ? [createExitPhase(phase)]
            : [scatter!.tween, drift!.tween]

          const reposition = () => {
            if (landed.current) placeRow(phase)
          }
          ScrollTrigger.addEventListener("refreshInit", reposition)

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", reposition)
            setLive(false)
            gate.kill()
            entry?.kill()
            orbit?.kill()
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
