"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import type * as THREE from "three"
import { GATE_PX } from "@/components/organisms/stack-journey/stack-arrival"
import { createDriver } from "@/components/organisms/stack-journey/stack-driver"
import type { Renderer } from "@/components/organisms/stack-journey/stack-render"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Drives the twelve stack logos from the hero to the rings around the bento.
 *
 * One ScrollTrigger, one writer: the trigger only moves a number and the
 * renderer turns that number into poses. Every stretch of the journey is a
 * function of that same number, so the path is continuous and coming back up
 * the page retraces it exactly.
 */
export function useStackJourney(
  meshesRef: React.RefObject<(THREE.Mesh | null)[]>,
  render: () => void,
  ready: boolean,
  setLive: (live: boolean) => void,
  rendererRef: React.RefObject<Renderer | null>
) {
  const landed = useRef(false)

  useGSAP(
    () => {
      const logos = (meshesRef.current ?? []).filter(Boolean) as THREE.Mesh[]
      if (!ready || !logos.length) return

      const material = logos[0].material as THREE.Material
      material.transparent = true
      const mm = gsap.matchMedia()

      // Both conditions are declared so one of them always matches — with a
      // single query the handler would never run on the other side of it.
      mm.add({ isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" }, (context) => {
        const { renderer, destroy } = createDriver({
          logos,
          material,
          render,
          mobile: !!context.conditions?.isMobile,
          setLive,
          hasLanded: () => landed.current,
          onLanded: () => {
            landed.current = true
            setLive(window.scrollY < GATE_PX)
          },
        })

        rendererRef.current = renderer

        return () => {
          setLive(false)
          destroy()
          rendererRef.current = null
        }
      })

      return () => mm.revert()
    },
    { dependencies: [ready, render, setLive, meshesRef, rendererRef] }
  )
}
