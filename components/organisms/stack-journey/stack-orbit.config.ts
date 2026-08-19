import type { Pose, Viewport } from "./stack-journey.config"

/**
 * The rings the logos settle into around the bento: seven on the outer ring,
 * five on the inner one, turning in opposite directions. Both are ellipses
 * flattened to read as rings seen almost edge-on, Saturn style.
 *
 * The layer sits below the section content, so the front arc always passes
 * behind the bento — no masking involved.
 */
export const RINGS = [
  { count: 7, margin: 210, flatten: 0.34, direction: 1, seconds: 42 },
  { count: 5, margin: 96, flatten: 0.26, direction: -1, seconds: 31 },
] as const

export function ringOf(index: number) {
  return index < RINGS[0].count ? 0 : 1
}

/** Even spacing within each ring, offset so the two never line up. */
export function ringAngle(index: number) {
  const ring = ringOf(index)
  const slot = ring === 0 ? index : index - RINGS[0].count
  return (slot / RINGS[ring].count) * Math.PI * 2 + (ring === 0 ? 0 : Math.PI / 5)
}

export type OrbitGeometry = { centreX: number; centreY: number; halfWidth: number }

/**
 * Position on the ellipse plus the depth cue. With an orthographic camera
 * nothing shrinks by moving away, so the far half of the ring is sold with
 * scale and opacity instead.
 */
export function orbitPose(
  index: number,
  spin: number,
  geometry: OrbitGeometry,
  vp: Viewport
): Pose & { depth: number } {
  const ring = RINGS[ringOf(index)]
  const angle = ringAngle(index) + spin * ring.direction
  const radiusX = Math.min(geometry.halfWidth + ring.margin, vp.width / 2 - 24)

  return {
    x: geometry.centreX + radiusX * Math.cos(angle),
    y: geometry.centreY + radiusX * ring.flatten * Math.sin(angle),
    // 0 at the back of the ring, 1 at the front.
    depth: (Math.sin(angle) + 1) / 2,
  }
}
