"use client"

import { useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { ConstellationScene } from "./constellation-scene"
import { CAMERA_Z } from "./constellation.config"

// Slow heartbeat for the orbit; pointer moves buy extra frames on top.
const IDLE_FPS = 20

/** Requests frames for a `demand` canvas, and only while it is on screen. */
function FrameDriver({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    if (!active) return
    const beat = window.setInterval(invalidate, 1000 / IDLE_FPS)
    const onPointerMove = () => invalidate()
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => {
      window.clearInterval(beat)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [active, invalidate])

  return null
}

/**
 * The section's single canvas. Decorative: the readable list of the stack stays
 * in the DOM next to it, so this is hidden from assistive tech.
 */
export function ConstellationCanvas({ active }: { active: boolean }) {
  const reduced = usePrefersReducedMotion()

  return (
    <Canvas
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.5]}
      shadows={false}
      camera={{ position: [0, 0, CAMERA_Z], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <FrameDriver active={active} />
      <ConstellationScene reduced={reduced} />
    </Canvas>
  )
}
