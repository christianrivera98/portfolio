"use client"

import type { RoomTheme } from "./room.config"

const BOOK_COLORS = ["#b5483a", "#cf8a3c", "#3f6f8c", "#d8c27a", "#7a5a8c"]

export function Shelf({ theme }: { theme: RoomTheme }) {
  return (
    <group position={[0, 3.35, -2.86]}>
      {[0, 0.9].map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.08, 0.5]} />
          <meshStandardMaterial color={theme.shelf} roughness={0.7} />
        </mesh>
      ))}
      {BOOK_COLORS.map((c, i) => (
        <mesh key={c} position={[-1.6 + i * 0.16, 0.32, 0.05]} rotation={[0, 0, 0.05 * i]} castShadow>
          <boxGeometry args={[0.1, 0.55, 0.4]} />
          <meshStandardMaterial color={c} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[1.4, 0.22, 0.05]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.3, 14]} />
        <meshStandardMaterial color="#c9a36b" roughness={0.8} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[1.4 + (i - 1) * 0.1, 0.55, 0.05]} rotation={[0.2, i, 0.3]} castShadow>
          <coneGeometry args={[0.08, 0.5, 6]} />
          <meshStandardMaterial color="#3a6e44" roughness={0.85} />
        </mesh>
      ))}
      <mesh position={[0.4, 1.16, 0.05]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.3]} />
        <meshStandardMaterial color="#15151a" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  )
}
