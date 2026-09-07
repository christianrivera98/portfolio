"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useEditorScreenTexture } from "@/hooks/useEditorScreenTexture"

const Z = -0.85
const CY = 1.9
const SCREEN_TINT = new THREE.Color(1.4, 1.4, 1.4)

const TEXTURE_FPS = 15
const TEXTURE_INTERVAL_MS = 1000 / TEXTURE_FPS

export function Monitor() {
  const { texture, draw } = useEditorScreenTexture()
  const lastDrawMs = useRef(-Infinity)

  useFrame((state) => {
    const elapsedMs = state.clock.elapsedTime * 1000
    if (elapsedMs - lastDrawMs.current < TEXTURE_INTERVAL_MS) return
    lastDrawMs.current = elapsedMs
    draw(elapsedMs)
  })

  return (
    <group position={[0, 0, Z]}>
      <RoundedBox args={[2.15, 1.4, 0.07]} radius={0.035} smoothness={3} position={[0, CY, 0]} castShadow>
        <meshStandardMaterial color="#0c0c0e" roughness={0.5} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0, CY, 0.045]}>
        <planeGeometry args={[2.0, 1.25]} />
        <meshBasicMaterial map={texture} toneMapped={false} color={SCREEN_TINT} />
      </mesh>
      <mesh position={[0, CY - 0.85, 0.1]} castShadow>
        <boxGeometry args={[0.1, 0.45, 0.07]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, CY - 1.05, 0.22]} castShadow>
        <boxGeometry args={[0.6, 0.05, 0.4]} />
        <meshStandardMaterial color="#1a1a1d" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  )
}
