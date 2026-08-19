import type * as THREE from "three"
import type { Viewport } from "./stack-journey.config"

export type PhaseArgs = {
  logos: THREE.Mesh[]
  viewport: () => Viewport
  invalidate: () => void
}

/**
 * Both scroll phases are a *single* tween over a progress value, with the
 * twelve meshes updated in a loop. One tween per logo per property looked
 * tidier, but thirty-seven scrubbed tweens cost more in GSAP bookkeeping than
 * the whole scene costs to draw: on the desktop profile that shape doubled the
 * long frames.
 *
 * The layout is read on refresh and cached, never per tick: `readViewport`
 * measures live DOM, and doing that inside a scrubbed update forces a reflow on
 * every frame of the scroll.
 */

export const lerp = (from: number, to: number, t: number) => from + (to - from) * t

/** Ambience does not need 60 fps. Capping the scene halves the renders a scrub
 *  or a loop asks for, and at this size nobody can tell. */
export const throttled = (invalidate: () => void, ms = 32) => {
  let last = 0
  return () => {
    const now = performance.now()
    if (now - last < ms) return
    last = now
    invalidate()
  }
}
