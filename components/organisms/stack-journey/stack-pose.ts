import { DRIFT, driftPose } from "./stack-drift.config"
import { heroLogoSize, heroRowPose, type Pose, type Viewport } from "./stack-journey.config"
import { orbitPose } from "./stack-orbit.config"
import { RING_BLEND_PX, type Stops } from "./stack-stops"

export const REST_TILT = -0.16
export const REST_TURN = 0.46

const FIELD_OPACITY = 0.45
const RING_OPACITY = 0.85
const RING_MIN = 52
const RING_MAX = 74
const DRIFT_SPREAD = 40

export type LogoPose = { x: number; y: number; scale: number; opacity: number; tilt: number; turn: number }

const lerp = (from: number, to: number, t: number) => from + (to - from) * t
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
const smooth = (t: number) => t * t * (3 - 2 * t)

function fieldPose(index: number, vp: Viewport, t: number): Pose {
  const spot = DRIFT[index % DRIFT.length]
  const base = driftPose(index, vp)

  return {
    x: base.x + ((index % 3) - 1) * DRIFT_SPREAD * t,
    y: base.y + spot.parallax * vp.height * t,
  }
}

export function onScreen({ x, y, scale }: LogoPose, vp: Viewport) {
  return x > -scale && x < vp.width + scale && y > -scale && y < vp.height + scale
}

export function logoPose(
  index: number,
  scroll: number,
  spin: number,
  stops: Stops,
  vp: Viewport,
  anchor: number
): LogoPose {
  const size = heroLogoSize(vp)
  const spot = DRIFT[index % DRIFT.length]
  const row = heroRowPose(index, vp)
  const turn = index % 2 ? REST_TURN : -REST_TURN
  const rest = { tilt: REST_TILT, turn }

  if (vp.mobile) {
    const t = clamp01(scroll / stops.scatterEnd)
    return { ...row, scale: size, opacity: 1 - t, ...rest }
  }

  if (scroll <= stops.scatterEnd) {
    const t = smooth(clamp01(scroll / stops.scatterEnd))
    const to = fieldPose(index, vp, 0)

    return {
      x: lerp(row.x, to.x, t),
      y: lerp(row.y, to.y, t),
      scale: lerp(size, size * spot.depth, t),
      opacity: lerp(1, FIELD_OPACITY, t),
      ...rest,
    }
  }

  const fieldScale = size * spot.depth

  if (scroll <= stops.driftEnd) {
    const span = stops.driftEnd - stops.scatterEnd
    const drifted = fieldPose(index, vp, clamp01((scroll - stops.scatterEnd) / span))

    return { ...drifted, scale: fieldScale, opacity: FIELD_OPACITY, ...rest }
  }

  const blend = smooth(clamp01((scroll - stops.driftEnd) / RING_BLEND_PX))
  const from = fieldPose(index, vp, 1)
  const ring = orbitPose(index, spin, {
    centreX: vp.width / 2,
    centreY: stops.bentoMid - anchor,
    halfWidth: Math.min(vp.width, 800) / 2,
  }, vp)

  return {
    x: lerp(from.x, ring.x, blend),
    y: lerp(from.y, ring.y, blend),
    scale: lerp(fieldScale, RING_MIN + (RING_MAX - RING_MIN) * ring.depth, blend),
    opacity: lerp(FIELD_OPACITY, RING_OPACITY, blend),
    tilt: REST_TILT * (1 - blend),
    turn: turn * (1 - blend),
  }
}
