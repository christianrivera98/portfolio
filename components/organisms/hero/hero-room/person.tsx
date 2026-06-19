"use client"

import { RoundedBox } from "@react-three/drei"
import type { RoomTheme } from "./room.config"

const Z = 0.55
const HAIR = "#171210" // dark brown/black hair

/** Stylized person seen from behind, sitting in an office chair. */
export function Person({ theme }: { theme: RoomTheme }) {
  return (
    <group position={[0, 0, Z]}>
      {/* chair backrest */}
      <RoundedBox args={[1.25, 1.25, 0.16]} radius={0.1} smoothness={3} position={[0, 1.12, 0.34]} castShadow>
        <meshStandardMaterial color={theme.chair} roughness={0.7} />
      </RoundedBox>
      <mesh position={[0, 0.5, 0.3]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.5, 12]} />
        <meshStandardMaterial color={theme.chair} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* torso / shoulders */}
      <RoundedBox args={[1.05, 0.95, 0.5]} radius={0.18} smoothness={4} position={[0, 1.18, 0]} castShadow>
        <meshStandardMaterial color={theme.shirt} roughness={0.85} />
      </RoundedBox>
      {/* neck */}
      <mesh position={[0, 1.68, -0.02]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.2, 16]} />
        <meshStandardMaterial color={theme.skin} roughness={0.6} />
      </mesh>
      {/* head (skin, slightly oval) */}
      <mesh position={[0, 1.9, -0.02]} scale={[1, 1.12, 1.02]} castShadow>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={theme.skin} roughness={0.55} />
      </mesh>
      {/* ears */}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, 1.9, -0.05]} scale={[0.6, 1, 1]} castShadow>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={theme.skin} roughness={0.6} />
        </mesh>
      ))}
      {/* hair: dome over top/back/sides */}
      <mesh position={[0, 1.93, 0.0]} scale={[1.04, 1.08, 1.06]} castShadow>
        <sphereGeometry args={[0.255, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.82]} />
        <meshStandardMaterial color={HAIR} roughness={0.92} />
      </mesh>
      {/* nape hair */}
      <mesh position={[0, 1.74, 0.12]} scale={[1, 0.7, 0.6]} castShadow>
        <sphereGeometry args={[0.2, 24, 24, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5]} />
        <meshStandardMaterial color={HAIR} roughness={0.92} />
      </mesh>
    </group>
  )
}
