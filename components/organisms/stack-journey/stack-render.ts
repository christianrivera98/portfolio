import type * as THREE from "three"
import { heroEntryPose, toWorld, type Viewport } from "./stack-journey.config"
import { logoPose, onScreen } from "./stack-pose"
import type { Stops } from "./stack-stops"

export type Offset = { dx: number; dy: number; rx: number; ry: number; lift: number }

export type JourneyState = {
  scroll: number
  anchor: number
  spin: number
  entry: number
}

export type Layout = { vp: Viewport; stops: Stops }

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

      Object.assign(logo.userData, { screenX: pose.x, screenY: pose.y, size: pose.scale })
    })

    if (!visible && !painted) return
    painted = visible

    const { opacity } = logoPose(0, state.scroll, state.spin, stops, vp, state.anchor)
    material.opacity = opacity * (state.entry < 1 ? easeOut(state.entry) : 1)
    render()
  }

  const request = () => {
    if (queued) return
    queued = requestAnimationFrame(draw)
  }

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
