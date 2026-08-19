"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

/**
 * The room never moves: same geometry, same lights, frame after frame. Only the
 * camera drifts with the pointer and two screens repaint their textures — none
 * of which changes where a shadow falls.
 *
 * Three re-rendered every shadow map on every frame anyway: one pass for the
 * spot and six more for the shelf lamp's cube map, over every caster in the
 * room. That is most of what the hero costs while the visitor is just reading
 * it. Here the maps are drawn for the first few frames — long enough for the
 * suspended parts of the room to land — and then frozen.
 *
 * `refresh` re-arms them: pass anything that changes the lighting or brings the
 * scene back, such as the theme or the hero coming into view again.
 *
 * The renderer is reached through the frame state rather than `useThree`
 * because the shadow map is mutated, and a value handed back by a hook is not
 * ours to write to.
 */
const WARMUP_FRAMES = 45

export function StaticShadows({ refresh }: { refresh?: string }) {
  const left = useRef(WARMUP_FRAMES)
  const armed = useRef<string | undefined>(undefined)

  // Runs before the render, so the flag applies to the frame about to be drawn.
  useFrame((state) => {
    const shadows = state.gl.shadowMap

    if (armed.current !== refresh) {
      armed.current = refresh
      left.current = WARMUP_FRAMES
      shadows.autoUpdate = false
    }

    if (left.current <= 0) return
    left.current -= 1
    shadows.needsUpdate = true
  })

  return null
}
