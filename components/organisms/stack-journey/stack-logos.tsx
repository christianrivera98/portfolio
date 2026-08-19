"use client"

import { useMemo, useRef } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useExtrudedLogos } from "@/hooks/useExtrudedLogos"
import { useStackJourney } from "@/hooks/useStackJourney"
import { SKILL_LOGOS } from "../technologies/technologies.config"
import { LOGO_SIZE, MATERIAL } from "./stack-journey.config"

const FILES = SKILL_LOGOS.map((logo) => logo.file)

/**
 * The twelve extruded logos and their choreography. One mesh per icon, two
 * materials: the flat caps in matte white, the extruded rim in crimson — that
 * pairing is what reads as thickness when a logo turns.
 */
export function StackLogos() {
  const stage = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const invalidate = useThree((state) => state.invalidate)
  const mobile = useThree((state) => state.size.width) < 768
  const geometries = useExtrudedLogos(FILES)

  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({ color: MATERIAL.face, roughness: 0.55, metalness: 0.1 }),
      new THREE.MeshStandardMaterial({ color: MATERIAL.edge, roughness: 0.35, metalness: 0.4 }),
    ],
    []
  )

  useStackJourney(stage, meshes, invalidate, !!geometries)

  if (!geometries) return null
  const size = mobile ? LOGO_SIZE.mobile : LOGO_SIZE.desktop

  return (
    <group ref={stage}>
      {geometries.map((geometry, index) => (
        <mesh
          key={SKILL_LOGOS[index].label}
          ref={(mesh) => {
            meshes.current[index] = mesh
          }}
          geometry={geometry}
          material={materials}
          scale={size}
        />
      ))}
    </group>
  )
}
