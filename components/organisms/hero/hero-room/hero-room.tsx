"use client"

import { Suspense, useEffect, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import * as THREE from "three"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { Laptop } from "../hero-laptop/laptop"
import type { SocialKey } from "../hero.config"
import { ROOM_DARK, ROOM_LIGHT } from "./room.config"
import { RoomShell } from "./room-shell"
import { Desk } from "./desk"
import { Person } from "./person"
import { Monitor } from "./monitor"
import { StaticShadows } from "./static-shadows"
import { Shelf } from "./shelf"
import { Decor } from "./decor"

const PAN = -1.05

const IDLE_FPS = 15

function CameraRig({ reduced }: { reduced: boolean }) {
  const target = useRef(new THREE.Vector3(PAN, 1.6, -0.5))
  useFrame((state, delta) => {
    if (reduced) return
    const cam = state.camera
    const px = state.pointer.x * 0.4
    const py = state.pointer.y * 0.3
    cam.position.x = THREE.MathUtils.damp(cam.position.x, PAN + px, 3, delta)
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 2.0 + py, 3, delta)
    cam.lookAt(target.current)
  })
  return null
}

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

export function HeroRoom({ social, active }: { social: SocialKey | null; active: boolean }) {
  const reduced = usePrefersReducedMotion()
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme === "light" ? ROOM_LIGHT : ROOM_DARK

  return (
    <Canvas
      shadows
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [-1.05, 2.0, 5.2], fov: 40 }}
      gl={{ antialias: true, toneMappingExposure: 1.35 }}
    >
      <FrameDriver active={active} />
      <StaticShadows refresh={`${resolvedTheme}-${active}`} />
      <color attach="background" args={[theme.fog]} />
      <fog attach="fog" args={[theme.fog, 8, 18]} />
      <ambientLight intensity={theme.ambient + 0.12} color={theme.fill} />
      <directionalLight position={[2, 6, 3]} intensity={theme.ambient * 0.8} color={theme.fill} />
      <spotLight position={[1.5, 3.2, 3.2]} angle={0.7} penumbra={0.8} intensity={30} color={theme.lampColor} target-position={[0, 1.3, 0]} castShadow />
      <pointLight position={[0, 1.95, 0.3]} color="#8aa0ff" intensity={10} distance={4.5} decay={2} />
      <CameraRig reduced={reduced} />
      <Suspense fallback={null}>
        <RoomShell theme={theme} />
        <Shelf theme={theme} />
        <Decor theme={theme} />
        <Desk theme={theme} />
        <Person theme={theme} />
        <Monitor />
        <group position={[1.5, 1.1, -0.1]} rotation={[0, -0.55, 0]} scale={0.4}>
          <Laptop reduced={reduced} social={social} interactive={false} />
        </group>
      </Suspense>
    </Canvas>
  )
}
