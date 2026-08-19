import gsap from "gsap"
import type * as THREE from "three"
import { DRIFT, driftPose } from "./stack-drift.config"
import { heroLogoSize, heroRowPose, toWorld, type Viewport } from "./stack-journey.config"

type PhaseArgs = {
  logos: THREE.Mesh[]
  viewport: () => Viewport
  invalidate: () => void
}

/**
 * The scroll-driven half of the journey.
 *
 * Both phases are a *single* tween over a progress value, with the twelve
 * meshes updated in a loop. One tween per logo per property looked tidier, but
 * thirty-seven scrubbed tweens cost more in GSAP bookkeeping than the whole
 * scene costs to draw: on the desktop profile that shape doubled the long
 * frames.
 *
 * The layout is read on refresh and cached, never per tick: `readViewport`
 * measures live DOM, and doing that inside a scrubbed update forces a reflow on
 * every frame of the scroll.
 */

const lerp = (from: number, to: number, t: number) => from + (to - from) * t

/** Ambience does not need 60 fps. Capping the scene at ~30 halves the renders a
 *  scrub asks for, and at this size nobody can tell. */
const throttled = (invalidate: () => void) => {
  let last = 0
  return () => {
    const now = performance.now()
    if (now - last < 32) return
    last = now
    invalidate()
  }
}

/**
 * Hero → scatter. As the hero leaves, the row breaks: each logo travels out to
 * its spot in the field, shrinks with depth, turns a full turn so it lands
 * facing the visitor again, and the whole field dims to ambience.
 */
export function createScatterPhase({ logos, viewport, invalidate }: PhaseArgs) {
  const draw = throttled(invalidate)
  const state = { progress: 0 }
  const material = logos[0].material as THREE.Material
  material.transparent = true

  let vp = viewport()
  let size = heroLogoSize(vp)

  const apply = () => {
    const t = state.progress

    logos.forEach((logo, i) => {
      const spot = DRIFT[i % DRIFT.length]
      const from = toWorld(heroRowPose(i, vp), vp)
      const to = toWorld(driftPose(i, vp), vp)

      logo.position.x = lerp(from.x, to.x, t)
      logo.position.y = lerp(from.y, to.y, t)
      logo.scale.setScalar(lerp(size, size * spot.depth, t))
      logo.rotation.y = logo.userData.turn + Math.PI * 2 * t * (i % 2 ? 1 : -1)
    })

    material.opacity = lerp(1, 0.45, t)
    draw()
  }

  return gsap.to(state, {
    progress: 1,
    ease: "none",
    onUpdate: apply,
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
      onRefresh: () => {
        vp = viewport()
        size = heroLogoSize(vp)
      },
    },
  })
}

/**
 * The long middle stretch: the field drifts upwards at different rates while
 * Experience scrolls past, so the logos read as sitting at different depths
 * behind the content.
 */
export function createDriftPhase({ logos, viewport, invalidate }: PhaseArgs) {
  const draw = throttled(invalidate)
  const state = { progress: 0 }
  let vp = viewport()

  const apply = () => {
    const t = state.progress

    logos.forEach((logo, i) => {
      const spot = DRIFT[i % DRIFT.length]
      const base = toWorld(driftPose(i, vp), vp)

      logo.position.y = base.y - spot.parallax * vp.height * t
      logo.position.x = base.x + ((i % 3) - 1) * 40 * t
      logo.rotation.y = logo.userData.turn + Math.PI * 2 * t * (i % 2 ? -1 : 1)
    })

    draw()
  }

  return gsap.to(state, {
    progress: 1,
    ease: "none",
    onUpdate: apply,
    scrollTrigger: {
      trigger: "#experience",
      start: "top bottom",
      endTrigger: "#technologies",
      end: "top center",
      scrub: 1.2,
      invalidateOnRefresh: true,
      onRefresh: () => {
        vp = viewport()
      },
    },
  })
}

/**
 * The phone version: no field, no parallax. The row fades out with the hero,
 * which is one tween instead of a scrubbed journey.
 */
export function createExitPhase({ logos, invalidate }: PhaseArgs) {
  const material = logos[0].material as THREE.Material
  material.transparent = true

  return gsap.to(material, {
    opacity: 0,
    ease: "none",
    onUpdate: invalidate,
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })
}
