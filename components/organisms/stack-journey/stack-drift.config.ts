import type { Pose, Viewport } from "./stack-journey.config"

/**
 * Where each logo drifts to once the hero is gone: scattered over the margins
 * of the page, in fractions of the viewport, well away from the column the
 * copy occupies. `depth` scales it down — the further back, the smaller — and
 * `parallax` is how much of a viewport height it travels while the visitor
 * scrolls through Experience, which is what makes the field feel deep.
 *
 * Authored by hand rather than randomised so the composition is stable between
 * loads, same as the old constellation, and kept out of the 0.2–0.55 band where
 * the body copy of Experience sits.
 */
export type Drift = { x: number; y: number; depth: number; parallax: number }

export const DRIFT: Drift[] = [
  { x: 0.06, y: 0.2, depth: 0.72, parallax: -0.42 },
  { x: 0.9, y: 0.12, depth: 0.6, parallax: -0.3 },
  { x: 0.13, y: 0.66, depth: 0.85, parallax: -0.55 },
  { x: 0.79, y: 0.52, depth: 0.78, parallax: -0.48 },
  { x: 0.04, y: 0.88, depth: 0.54, parallax: -0.26 },
  { x: 0.95, y: 0.78, depth: 0.66, parallax: -0.36 },
  { x: 0.66, y: 0.06, depth: 0.5, parallax: -0.2 },
  { x: 0.72, y: 0.94, depth: 0.62, parallax: -0.5 },
  { x: 0.1, y: 0.42, depth: 0.8, parallax: -0.6 },
  { x: 0.86, y: 0.32, depth: 0.52, parallax: -0.24 },
  { x: 0.62, y: 0.72, depth: 0.56, parallax: -0.34 },
  { x: 0.16, y: 0.04, depth: 0.46, parallax: -0.18 },
]

export function driftPose(index: number, vp: Viewport): Pose {
  const spot = DRIFT[index % DRIFT.length]
  return { x: spot.x * vp.width, y: spot.y * vp.height }
}
