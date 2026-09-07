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

export function StackLogos() {
  const stage = useRef<THREE.Group>(null)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const renderer = useRef<Renderer | null>(null)
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)
  const camera = useThree((state) => state.camera)
  const render = useCallback(() => gl.render(scene, camera), [gl, scene, camera])
  const geometries = useExtrudedLogos(FILES)
  const finePointer = useMediaQuery("(pointer: fine)")
  const [live, setLive] = useState(false)
  const setLiveStable = useCallback((next: boolean) => setLive(next), [])

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

  useStackJourney(meshes, render, !!geometries, setLiveStable, renderer)
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
