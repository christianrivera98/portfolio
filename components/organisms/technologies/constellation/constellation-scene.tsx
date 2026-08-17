"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Billboard } from "@react-three/drei"
import * as THREE from "three"
import { useLogoTextures } from "@/hooks/useLogoTextures"
import { SKILL_LOGOS } from "../technologies.config"
import { EDGES, NODES, ORBIT_SPEED, POINTER_TILT } from "./constellation.config"

const LINE_COLOR = new THREE.Color("#a0030e")

/**
 * The constellation itself: one plane per logo plus a single LineSegments for
 * every edge, so the whole thing is 13 draw calls with no lights and no shadows.
 * The group orbits slowly and leans towards the pointer.
 */
export function ConstellationScene({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const files = useMemo(() => SKILL_LOGOS.map((logo) => logo.file), [])
  const textures = useLogoTextures(files)

  const lineGeometry = useMemo(() => {
    const points = EDGES.flatMap(([from, to]) => {
      const a = NODES[from]
      const b = NODES[to]
      return [a.x, a.y, a.z, b.x, b.y, b.z]
    })
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3))
    return geometry
  }, [])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return
    if (!reduced) group.rotation.y += delta * ORBIT_SPEED
    // Lean towards the pointer instead of moving the camera: cheaper, and it
    // keeps the cell's framing fixed no matter where the cursor goes.
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -state.pointer.y * POINTER_TILT,
      4,
      delta
    )
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={LINE_COLOR} transparent opacity={0.45} />
      </lineSegments>

      {textures?.map((texture, index) => {
        const node = NODES[index]
        if (!node) return null
        return (
          // Billboard keeps each glyph facing the camera; without it the orbit
          // turns the planes edge-on and they vanish.
          <Billboard key={SKILL_LOGOS[index].label} position={[node.x, node.y, node.z]}>
            <mesh>
              <planeGeometry args={[node.scale, node.scale]} />
              <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.85}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          </Billboard>
        )
      })}
    </group>
  )
}
