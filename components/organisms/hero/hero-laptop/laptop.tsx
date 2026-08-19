"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useCodeScreenTexture } from "@/hooks/useCodeScreenTexture"
import { useSocialPreviews } from "@/hooks/useSocialPreviews"
import { type SocialKey } from "../hero.config"
import { Keyboard } from "./keyboard"

const BODY = "#16161a"
const EDGE = "#26262c"
const LID_OPEN = -0.38 // radians: screen reclines ~22° back from vertical
const SCREEN_TINT = new THREE.Color(1.28, 1.28, 1.28) // overbright lift for punchier previews

interface LaptopProps {
  reduced: boolean
  social: SocialKey | null
  interactive?: boolean
}

export function Laptop({ reduced, social, interactive = true }: Readonly<LaptopProps>) {
  const group = useRef<THREE.Group>(null)
  const overlay = useRef<THREE.Mesh>(null)
  const { texture, draw } = useCodeScreenTexture()
  const previews = useSocialPreviews(social)

  useFrame((state, delta) => {
    draw(reduced ? 1200 : state.clock.elapsedTime * 1000)
    const g = group.current
    if (g && interactive) {
      const tx = reduced ? 0 : state.pointer.x * 0.32
      const ty = reduced ? 0 : -state.pointer.y * 0.16
      g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tx, 4, delta)
      g.rotation.x = THREE.MathUtils.damp(g.rotation.x, ty, 4, delta)
    }
    const o = overlay.current
    if (o) {
      const mat = o.material as THREE.MeshBasicMaterial
      // Stays hidden until its texture lands, so a lazy load never flashes a blank plane.
      const preview = social ? previews[social] : undefined
      if (preview && mat.map !== preview) {
        mat.map = preview
        mat.needsUpdate = true
      }
      mat.opacity = THREE.MathUtils.damp(mat.opacity, preview ? 1 : 0, 9, delta)
    }
  })

  return (
    <group ref={group}>
      <RoundedBox args={[3, 0.12, 2]} radius={0.05} smoothness={4} position={[0, -0.06, 0]}>
        <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.005, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.7, 1.5]} />
        <meshStandardMaterial color="#0e0e11" metalness={0.5} roughness={0.6} />
      </mesh>
      <Keyboard />
      <mesh position={[0, 0.006, 0.66]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.0, 0.55]} />
        <meshStandardMaterial color={EDGE} metalness={0.4} roughness={0.5} />
      </mesh>

      {/* screen lid pivoting at the back hinge */}
      <group position={[0, 0, -1]} rotation={[LID_OPEN, 0, 0]}>
        <RoundedBox args={[3, 1.9, 0.08]} radius={0.05} smoothness={4} position={[0, 0.95, 0]}>
          <meshStandardMaterial color={BODY} metalness={0.7} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0.95, 0.045]}>
          <planeGeometry args={[2.78, 1.72]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* social preview, crossfaded on hover */}
        <mesh ref={overlay} position={[0, 0.95, 0.05]}>
          <planeGeometry args={[2.78, 1.72]} />
          <meshBasicMaterial transparent opacity={0} toneMapped={false} depthWrite={false} color={SCREEN_TINT} />
        </mesh>
      </group>
    </group>
  )
}
