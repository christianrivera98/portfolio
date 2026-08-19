import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"
import { driftPose } from "./stack-drift.config"
import { toWorld, type Viewport } from "./stack-journey.config"
import { orbitPose, type OrbitGeometry } from "./stack-orbit.config"

type OrbitArgs = {
  logos: THREE.Mesh[]
  viewport: () => Viewport
  invalidate: () => void
}

const BLEND = 0.28
const SPIN_FPS = 12
const ORBIT_SECONDS = 40
const LOGO_MIN = 52
const LOGO_MAX = 74

/**
 * Arrival and orbit. The first quarter of the section blends each logo from
 * wherever the drift left it into its slot on the ring; from there on it just
 * turns.
 *
 * The ring has to follow the bento while the section scrolls past, and the
 * layer is fixed, so the centre is derived from a cached document position and
 * the live scroll offset — never from a per-frame `getBoundingClientRect`.
 */
export function createOrbitPhase({ logos, viewport, invalidate }: OrbitArgs) {
  const state = { progress: 0, spin: 0 }
  const material = logos[0].material as THREE.Material
  let vp = viewport()
  let anchor = { topDoc: 0, height: 0 }
  // Cached on scroll rather than read per tick: the ring turns on its own clock
  // and would otherwise poll the scroll position sixty times a second.
  let scroll = 0
  let live = false
  // Once the blend is done the drift origin stops mattering, so the arrival
  // maths is skipped entirely for the rest of the section.
  let arrived = false

  const measure = () => {
    vp = viewport()
    const bento = document.querySelector(".tech-bento")?.getBoundingClientRect()
    if (!bento) return
    anchor = { topDoc: bento.top + window.scrollY, height: bento.height }
  }

  const apply = () => {
    if (!live && state.progress === 0) return
    const centreY = anchor.topDoc + anchor.height / 2 - scroll
    const geometry: OrbitGeometry = {
      centreX: vp.width / 2,
      centreY,
      halfWidth: Math.min(vp.width, 800) / 2,
    }
    const blend = Math.min(1, state.progress / BLEND)

    logos.forEach((logo, i) => {
      const pose = orbitPose(i, state.spin, geometry, vp)
      const target = toWorld(pose, vp)
      const size = LOGO_MIN + (LOGO_MAX - LOGO_MIN) * pose.depth

      if (arrived) {
        logo.position.x = target.x
        logo.position.y = target.y
        logo.scale.setScalar(size)
        return
      }

      const from = toWorld(driftPose(i, vp), vp)
      logo.position.x = from.x + (target.x - from.x) * blend
      logo.position.y = from.y + (target.y - from.y) * blend
      logo.scale.setScalar(size * (0.8 + 0.2 * blend))
      logo.rotation.set(0, logo.userData.turn * (1 - blend), 0)
    })

    if (!arrived) material.opacity = 0.45 + 0.4 * blend
    invalidate()
  }

  // A heartbeat rather than a tween: at 60 Hz the ring cost more in per-tick
  // work than the whole section did to scroll (62 long frames against 16). The
  // ring turns once every 40 s, so twelve updates a second is plenty, and it is
  // the same pattern the hero room uses for its idle loop.
  let beat = 0
  const startSpin = () => {
    if (beat) return
    beat = window.setInterval(() => {
      state.spin += (Math.PI * 2) / (ORBIT_SECONDS * SPIN_FPS)
      apply()
    }, 1000 / SPIN_FPS)
  }
  const stopSpin = () => {
    window.clearInterval(beat)
    beat = 0
  }

  const trigger = ScrollTrigger.create({
    trigger: "#technologies",
    start: "top bottom",
    end: "bottom top",
    invalidateOnRefresh: true,
    onRefresh: measure,
    onUpdate: (self) => {
      state.progress = self.progress
      scroll = self.scroll()
      arrived = self.progress >= BLEND
      apply()
    },
    onToggle: (self) => {
      live = self.isActive
      if (self.isActive) startSpin()
      else stopSpin()
    },
  })

  measure()
  return { trigger, kill: () => (stopSpin(), trigger.kill()) }
}
