"use client"

import type { RoomTheme } from "./room.config"

/** Floor lamp (the warm key light) on the right and a leafy plant on the left. */
export function Decor({ theme }: { theme: RoomTheme }) {
  return (
    <group>
      {/* floor lamp, right */}
      <group position={[4.4, 0, -0.4]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 3, 10]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
        </mesh>
        {[-0.35, 0.35].map((x, i) => (
          <mesh key={x} position={[x, 0.55, i === 0 ? 0.3 : -0.3]} rotation={[0, 0, x > 0 ? 0.22 : -0.22]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, 3.0, 0]}>
          <cylinderGeometry args={[0.32, 0.42, 0.5, 20, 1, true]} />
          <meshStandardMaterial color={theme.lampColor} emissive={theme.lampColor} emissiveIntensity={0.6} side={2} roughness={0.7} />
        </mesh>
        <pointLight position={[0, 2.9, 0.2]} color={theme.lampColor} intensity={theme.lampIntensity} distance={11} decay={2} castShadow />
      </group>

      {/* plant, left */}
      <group position={[-4.6, 0, 0.3]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.28, 0.8, 16]} />
          <meshStandardMaterial color="#b8b0a4" roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[Math.cos(i) * 0.18, 1.3 + (i % 3) * 0.35, Math.sin(i) * 0.18]} rotation={[0.3, i, i * 0.4]} castShadow>
            <coneGeometry args={[0.16, 1.5, 6]} />
            <meshStandardMaterial color={i % 2 ? "#2f5e3a" : "#3a6e44"} roughness={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
