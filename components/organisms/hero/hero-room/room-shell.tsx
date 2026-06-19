"use client"

import type { RoomTheme } from "./room.config"

/** Back wall, floor and two side walls that frame the scene. */
export function RoomShell({ theme }: { theme: RoomTheme }) {
  return (
    <group>
      {/* back wall */}
      <mesh position={[0, 2, -3]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.95} />
      </mesh>
      {/* floor */}
      <mesh position={[0, 0, 0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color={theme.floor} roughness={0.9} />
      </mesh>
      {/* left wall */}
      <mesh position={[-7, 2, 0.5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.95} />
      </mesh>
      {/* right wall */}
      <mesh position={[7, 2, 0.5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.95} />
      </mesh>
    </group>
  )
}
