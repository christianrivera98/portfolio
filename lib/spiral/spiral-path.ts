import { Vector2D, ease, constrain, easeOutElastic } from "./math-utils"
import { START_DOT_Y_OFFSET, SPIRAL_TURNS } from "./constants"

export function spiralPath(p: number): Vector2D {
  p = constrain(1.2 * p, 0, 1)
  p = ease(p, 1.8)
  const theta = 2 * Math.PI * SPIRAL_TURNS * Math.sqrt(p)
  const r = 170 * Math.sqrt(p)
  return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + START_DOT_Y_OFFSET)
}

export function rotate(
  v1: Vector2D, v2: Vector2D, p: number, orientation: boolean
): Vector2D {
  const mx = (v1.x + v2.x) / 2
  const my = (v1.y + v2.y) / 2
  const dx = v1.x - mx
  const dy = v1.y - my
  const angle = Math.atan2(dy, dx)
  const o = orientation ? -1 : 1
  const r = Math.sqrt(dx * dx + dy * dy)
  const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
  return new Vector2D(
    mx + r * (1 + bounce) * Math.cos(angle + o * Math.PI * easeOutElastic(p)),
    my + r * (1 + bounce) * Math.sin(angle + o * Math.PI * easeOutElastic(p))
  )
}
