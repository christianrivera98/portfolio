import gsap from "gsap"
import type * as THREE from "three"
import {
  heroEntryPose,
  heroLogoSize,
  heroRowPose,
  toWorld,
  type Viewport,
} from "./stack-journey.config"

type PhaseArgs = {
  logos: THREE.Mesh[]
  viewport: () => Viewport
  invalidate: () => void
}

/**
 * The journey, phase by phase. Everything after the landing is scrubbed, so it
 * only draws while the visitor is actually scrolling — a still page costs
 * nothing.
 */

const REST_TILT = -0.16
const REST_TURN = 0.46

/**
 * Puts the row where the current layout says it goes and records what the
 * magnet needs: the landing spot in screen pixels, the same point in world
 * units, the box size and the resting rotation.
 */
export function placeRow({ logos, viewport, invalidate }: PhaseArgs) {
  const vp = viewport()
  const size = heroLogoSize(vp)

  logos.forEach((logo, i) => {
    const pose = heroRowPose(i, vp)
    const world = toWorld(pose, vp)
    const turn = i % 2 ? REST_TURN : -REST_TURN

    logo.position.set(world.x, world.y, 0)
    logo.scale.setScalar(size)
    logo.rotation.set(REST_TILT, turn, 0)
    Object.assign(logo.userData, {
      screenX: pose.x,
      screenY: pose.y,
      worldX: world.x,
      worldY: world.y,
      size,
      tilt: REST_TILT,
      turn,
    })
  })

  invalidate()
}

/** The arrival: the row flies in from off the left edge, one logo after another. */
export function createEntry({ logos, viewport, invalidate }: PhaseArgs, onLanded: () => void) {
  const vp = viewport()
  logos.forEach((logo, i) => {
    const from = toWorld(heroEntryPose(i, vp), vp)
    logo.position.set(from.x, from.y, 0)
  })

  return gsap.to(
    logos.map((logo) => logo.position),
    {
      x: (i: number) => toWorld(heroRowPose(i, viewport()), viewport()).x,
      y: (i: number) => toWorld(heroRowPose(i, viewport()), viewport()).y,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.08,
      onUpdate: invalidate,
      onComplete: onLanded,
    }
  )
}
