"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import type * as THREE from "three"
import {
  heroEntryPose,
  heroRowPose,
  toWorld,
  type Viewport,
} from "@/components/organisms/stack-journey/stack-journey.config"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const SPIN_BASE = 13

/**
 * Choreography of the stack logos across the page. Phase 0: they fly in from
 * the left edge, land in the block at the foot of the hero and keep turning
 * slowly on their own axis.
 *
 * The scene renders on demand, so every tween pokes `invalidate` — nothing is
 * drawn while nothing moves. Turning stops once the hero leaves the screen.
 */
export function useStackJourney(
  stageRef: React.RefObject<THREE.Group | null>,
  meshesRef: React.RefObject<(THREE.Mesh | null)[]>,
  invalidate: () => void,
  ready: boolean
) {
  const landed = useRef(false)

  useGSAP(
    () => {
      const stage = stageRef.current
      const logos = (meshesRef.current ?? []).filter(Boolean) as THREE.Mesh[]
      if (!ready || !stage || !logos.length) return

      const mm = gsap.matchMedia()

      // Both conditions are declared so one of them always matches — with a
      // single query the handler would never run on the other side of it.
      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (context) => {
          const mobile = !!context.conditions?.isMobile
          const viewport = (): Viewport => ({
            width: window.innerWidth,
            height: window.innerHeight,
            mobile,
          })

          const place = () => {
            const vp = viewport()
            logos.forEach((logo, i) => {
              const { x, y } = toWorld(heroRowPose(i, vp), vp)
              logo.position.set(x, y, 0)
            })
            invalidate()
          }

          // A touch of tilt so the slab reads as a solid rather than a card,
          // and an eased turn: it hurries through the edge-on quarter and dwells
          // on the faces, so the icon is legible most of the time.
          logos.forEach((logo) => logo.rotation.set(-0.12, 0, 0))

          const spins = logos.map((logo, i) =>
            gsap.to(logo.rotation, {
              y: `+=${Math.PI * 2}`,
              duration: SPIN_BASE + i * 0.9,
              ease: "power1.inOut",
              repeat: -1,
              paused: true,
              onUpdate: invalidate,
            })
          )

          // Turning only runs while the hero is on screen. A toggle and not an
          // onLeave/onEnterBack pair on purpose: the layer mounts after the
          // preloader, so on a page that is already scrolled down those two
          // never fire and the scene would render for ever at full rate.
          const gate = ScrollTrigger.create({
            trigger: "#home",
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive && landed.current) spins.forEach((spin) => spin.play())
              else spins.forEach((spin) => spin.pause())
            },
          })

          // Flying in is only worth it while the hero is on screen; mounting
          // with the page already scrolled past it just places the block.
          let entry: gsap.core.Tween | null = null
          if (gate.isActive) {
            const start = viewport()
            logos.forEach((logo, i) => {
              const from = toWorld(heroEntryPose(i, start), start)
              logo.position.set(from.x, from.y, 0)
            })
            entry = gsap.to(
              logos.map((logo) => logo.position),
              {
                x: (i: number) => toWorld(heroRowPose(i, viewport()), viewport()).x,
                y: (i: number) => toWorld(heroRowPose(i, viewport()), viewport()).y,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.08,
                onUpdate: invalidate,
                onComplete: () => {
                  landed.current = true
                  if (gate.isActive) spins.forEach((spin) => spin.play())
                },
              }
            )
          } else {
            landed.current = true
            place()
          }

          // Placeholder until the drift phase lands: the block rides up and off
          // with the hero.
          const trigger = ScrollTrigger.create({
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            animation: gsap.to(stage.position, {
              y: () => window.innerHeight * 0.6,
              ease: "none",
              onUpdate: invalidate,
            }),
          })

          const reposition = () => {
            if (landed.current) place()
          }
          ScrollTrigger.addEventListener("refreshInit", reposition)

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", reposition)
            gate.kill()
            trigger.kill()
            entry?.kill()
            spins.forEach((spin) => spin.kill())
          }
        }
      )

      return () => mm.revert()
    },
    { dependencies: [ready, invalidate, stageRef, meshesRef] }
  )
}
