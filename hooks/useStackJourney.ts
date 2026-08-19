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

/** Resting pose: a slight lean plus an alternating quarter turn, so the slabs
 *  read as solids even while nothing is moving. */
const REST_TILT = -0.16
const REST_TURN = 0.46

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
  ready: boolean,
  setLive: (live: boolean) => void
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
              const pose = heroRowPose(i, vp)
              const { x, y } = toWorld(pose, vp)
              logo.position.set(x, y, 0)
              anchor(logo, i, pose.x, pose.y, x, y)
            })
            invalidate()
          }

          // Where the magnet pulls from and back to: the landing spot in screen
          // pixels, the same point in world units, and the resting rotation.
          const anchor = (
            logo: THREE.Mesh,
            index: number,
            screenX: number,
            screenY: number,
            worldX: number,
            worldY: number
          ) => {
            logo.userData.screenX = screenX
            logo.userData.screenY = screenY
            logo.userData.worldX = worldX
            logo.userData.worldY = worldY
            logo.userData.size = logo.scale.x
            logo.userData.tilt = REST_TILT
            logo.userData.turn = index % 2 ? REST_TURN : -REST_TURN
            logo.rotation.set(REST_TILT, logo.userData.turn, 0)
          }

          // The magnet only listens while the hero is on screen. A toggle and
          // not an onLeave/onEnterBack pair on purpose: the layer mounts after
          // the preloader, so on a page that is already scrolled down those two
          // never fire and the scene would keep working for nothing.
          const gate = ScrollTrigger.create({
            trigger: "#home",
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => setLive(self.isActive && landed.current),
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
                  place()
                  setLive(gate.isActive)
                },
              }
            )
          } else {
            landed.current = true
            place()
            setLive(gate.isActive)
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
            setLive(false)
            gate.kill()
            trigger.kill()
            entry?.kill()
          }
        }
      )

      return () => mm.revert()
    },
    { dependencies: [ready, invalidate, setLive, stageRef, meshesRef] }
  )
}
