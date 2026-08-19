import gsap from "gsap"
import type * as THREE from "three"
import { DRIFT, driftPose } from "./stack-drift.config"
import { heroLogoSize, heroRowPose, toWorld } from "./stack-journey.config"
import { lerp, throttled, type PhaseArgs } from "./stack-phase-utils"

/**
 * Hero → scatter. As the hero leaves, the row breaks: each logo travels out to
 * its spot in the field, eases towards its depth and the whole field dims to
 * ambience. No turning: a logo mid-rotation shows its back face, which at this
 * size reads as a mirrored icon rather than as depth.
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

