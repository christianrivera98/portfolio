import type * as THREE from "three"
import { heroEntryPose, toWorld, type Viewport } from "./stack-journey.config"
import { logoPose, onScreen } from "./stack-pose"
import type { Stops } from "./stack-stops"

/**
 * The single writer. Scroll, the ring's clock, the magnet and the arrival feed
 * values into `state`, and one pass turns those into poses. With a tween per
 * stretch the meshes belonged to whichever ScrollTrigger settled last, and a
 * logo could sit in the hero row while its neighbours were already scattered.
 */

/** The pointer magnet's contribution, in screen pixels and radians. */
export type Offset = { dx: number; dy: number; rx: number; ry: number; lift: number }

export type JourneyState = {
  /** Smoothed scroll: what the journey is drawn against. */
  scroll: number
  /** Raw scroll, so the rings stay glued to the bento. */
  anchor: number
  spin: number
  /** 0 → 1 arrival of the row; 1 once it has landed. */
  entry: number
}

export type Layout = { vp: Viewport; stops: Stops }

/** Per-logo delay of the arrival, as a fraction of the tween. */
const ENTRY_STAGGER = 0.05
const easeOut = (t: number) => 1 - (1 - t) ** 3
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)

export function createRenderer(
  logos: THREE.Mesh[],
  material: THREE.Material,
  render: () => void,
  layout: () => Layout
) {
  const offsets: Offset[] = logos.map(() => ({ dx: 0, dy: 0, rx: 0, ry: 0, lift: 0 }))
  const state: JourneyState = { scroll: 0, anchor: 0, spin: 0, entry: 1 }
  const span = 1 - (logos.length - 1) * ENTRY_STAGGER
  let queued = 0
  // Whether the last pass put anything on the buffer, so an empty one clears
  // it once and is then skipped.
  let painted = false

  const draw = () => {
    queued = 0
    const { vp, stops } = layout()

    let visible = false
    logos.forEach((logo, index) => {
      const pose = logoPose(index, state.scroll, state.spin, stops, vp, state.anchor)
      if (onScreen(pose, vp)) visible = true
      const offset = offsets[index]
      let { x, y } = pose

      if (state.entry < 1) {
        const arrival = easeOut(clamp01((state.entry - index * ENTRY_STAGGER) / span))
        const from = heroEntryPose(index, vp)
        x = from.x + (x - from.x) * arrival
        y = from.y + (y - from.y) * arrival
      }

      const world = toWorld({ x: x + offset.dx, y: y + offset.dy }, vp)
      logo.position.set(world.x, world.y, 0)
      logo.scale.setScalar(pose.scale * (1 + offset.lift))
      logo.rotation.set(pose.tilt + offset.rx, pose.turn + offset.ry, 0)

      // What the magnet measures against: where this logo is on screen, before
      // the magnet's own contribution.
      Object.assign(logo.userData, { screenX: pose.x, screenY: pose.y, size: pose.scale })
    })

    // The ring turns on after the bento has left while the section is still on
    // screen: without this the layer cleared a full-screen buffer sixty times a
    // second to draw nothing.
    if (!visible && !painted) return
    painted = visible

    // Opacity is the same for every logo, so it is read once rather than
    // written twelve times onto a shared material.
    const { opacity } = logoPose(0, state.scroll, state.spin, stops, vp, state.anchor)
    material.opacity = opacity * (state.entry < 1 ? easeOut(state.entry) : 1)
    render()
  }

  /** Coalesces every source of change into one pass per frame. */
  const request = () => {
    if (queued) return
    queued = requestAnimationFrame(draw)
  }

  /** For callers already inside a frame: asking for the *next* one would draw
   *  the ring every other frame, which is what made it look like it stuttered. */
  const drawNow = () => {
    if (queued) cancelAnimationFrame(queued)
    queued = 0
    draw()
  }

  const dispose = () => {
    if (queued) cancelAnimationFrame(queued)
    queued = 0
  }

  return { logos, state, offsets, request, drawNow, draw, dispose }
}

export type Renderer = ReturnType<typeof createRenderer>
