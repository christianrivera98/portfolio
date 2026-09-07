import type { Pose, Viewport } from "./stack-journey.config"

export type Drift = { x: number; y: number; depth: number; parallax: number }

export const DRIFT: Drift[] = [
  { x: 0.1, y: 0.24, depth: 0.95, parallax: -0.12 },
  { x: 0.84, y: 0.18, depth: 0.88, parallax: -0.09},
  { x: 0.14, y: 0.62, depth: 1, parallax: -0.15 },
  { x: 0.8, y: 0.56, depth: 0.96, parallax: -0.13 },
  { x: 0.08, y: 0.84, depth: 0.86, parallax: -0.08 },
  { x: 0.9, y: 0.78, depth: 0.92, parallax: -0.1 },
  { x: 0.68, y: 0.1, depth: 0.84, parallax: -0.07 },
  { x: 0.74, y: 0.9, depth: 0.9, parallax: -0.06},
  { x: 0.12, y: 0.42, depth: 0.98, parallax: -0.16 },
  { x: 0.88, y: 0.36, depth: 0.86, parallax: -0.08 },
  { x: 0.64, y: 0.72, depth: 0.88, parallax: -0.11 },
  { x: 0.2, y: 0.08, depth: 0.82, parallax: -0.06 },
]

export function driftPose(index: number, vp: Viewport): Pose {
  const spot = DRIFT[index % DRIFT.length]
  return { x: spot.x * vp.width, y: spot.y * vp.height }
}
