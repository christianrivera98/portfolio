"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useExtrudedLogos } from "@/hooks/useExtrudedLogos"
import { useLogoMagnet } from "@/hooks/useLogoMagnet"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useStackJourney } from "@/hooks/useStackJourney"
import { SKILL_LOGOS } from "../technologies/technologies.config"
import { MATERIAL } from "./stack-journey.config"
import type { Renderer } from "./stack-render"

const FILES = SKILL_LOGOS.map((logo) => logo.file)

/**
 * The twelve extruded logos and their choreography. One mesh per icon, two
 * materials: the flat caps in matte white, the extruded rim in crimson — that
 * pairing is what reads as thickness when a logo turns.
 */
export function StackLogos() {
  const stage = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  // The single writer, shared with the magnet so both speak through it.
  const renderer = useRef<Renderer | null>(null)
  const invalidate = useThree((state) => state.invalidate)
  const geometries = useExtrudedLogos(FILES)
  // Hover has no meaning on a touch screen, and the listener would fire on every
  // drag: the magnet is for fine pointers only.
  const finePointer = useMediaQuery("(pointer: fine)")
  const [live, setLive] = useState(false)
  const setLiveStable = useCallback((next: boolean) => setLive(next), [])

  // One material for caps and rim alike: two would double the draw calls for a
  // difference the lighting already makes on its own.
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: MATERIAL.face,
        roughness: 0.48,
        metalness: 0.12,
        transparent: true,
      }),
    []
  )

  useStackJourney(meshes, invalidate, !!geometries, setLiveStable, renderer)
  useLogoMagnet(renderer, live && finePointer)

  if (!geometries) return null

  return (
    <group ref={stage}>
      {geometries.map((geometry, index) => (
        <mesh
          key={SKILL_LOGOS[index].label}
          ref={(mesh) => {
            meshes.current[index] = mesh
          }}
          geometry={geometry}
          material={material}
        />
      ))}
    </group>
  )
}
