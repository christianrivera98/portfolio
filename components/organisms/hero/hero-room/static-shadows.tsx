"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

const WARMUP_FRAMES = 45

export function StaticShadows({ refresh }: { refresh?: string }) {
  const left = useRef(WARMUP_FRAMES)
  const armed = useRef<string | undefined>(undefined)

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
