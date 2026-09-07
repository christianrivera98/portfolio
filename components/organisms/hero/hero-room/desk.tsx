"use client"

import { RoundedBox } from "@react-three/drei"
import type { RoomTheme } from "./room.config"

const TOP_Y = 1.0
const W = 5.4
const D = 1.7
const Z = -0.5

export function Desk({ theme }: { theme: RoomTheme }) {
  const legX = W / 2 - 0.18
  return (
    <group>
      <RoundedBox args={[W, 0.08, D]} radius={0.02} smoothness={3} position={[0, TOP_Y, Z]} castShadow receiveShadow>
        <meshStandardMaterial color={theme.desk} roughness={0.6} metalness={0.05} />
      </RoundedBox>
      {[-legX, legX].map((x) => (
        <mesh key={x} position={[x, TOP_Y / 2, Z]} castShadow>
          <boxGeometry args={[0.08, TOP_Y, D - 0.2]} />
          <meshStandardMaterial color={theme.deskLeg} roughness={0.5} metalness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, TOP_Y + 0.045, Z + 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 1.0]} />
        <meshStandardMaterial color="#1b1b1f" roughness={0.85} />
      </mesh>
      <RoundedBox args={[0.7, 0.12, 0.7]} radius={0.03} smoothness={3} position={[-1.7, TOP_Y + 0.105, Z - 0.1]} castShadow>
        <meshStandardMaterial color="#caccd0" roughness={0.4} metalness={0.5} />
      </RoundedBox>
    </group>
  )
}
