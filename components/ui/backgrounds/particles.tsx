/* eslint-disable react/no-unknown-property */
"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, BufferAttribute } from "three"

function FloatingParticles({ count = 400 }) {
  const pointsRef = useRef<Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [count])

  const speeds = useMemo(() => {
    return Array.from({ length: count }, () => 0.002 + Math.random() * 0.004)
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as BufferAttribute
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 4) arr[i * 3 + 1] = -4
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#5c1010"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

export function ParticlesBackground() {
  const reducedMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (reducedMotion) return null

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 50 }} frameloop="always">
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
