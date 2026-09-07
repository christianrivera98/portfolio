import type { Pose, Viewport } from "./stack-journey.config"

export const RINGS = [
  { count: 7, margin: 210, flatten: 0.34, direction: 1, seconds: 42 },
  { count: 5, margin: 96, flatten: 0.26, direction: -1, seconds: 31 },
] as const

export function ringOf(index: number) {
  return index < RINGS[0].count ? 0 : 1
}

export function ringAngle(index: number) {
  const ring = ringOf(index)
  const slot = ring === 0 ? index : index - RINGS[0].count
  return (slot / RINGS[ring].count) * Math.PI * 2 + (ring === 0 ? 0 : Math.PI / 5)
}

export type OrbitGeometry = { centreX: number; centreY: number; halfWidth: number }

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
    depth: (Math.sin(angle) + 1) / 2,
  }
}
