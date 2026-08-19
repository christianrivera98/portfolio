"use client"

import { Canvas } from "@react-three/fiber"
import { StackLogos } from "./stack-logos"

/**
 * The stack scene. Orthographic with zoom 1, so one world unit is one CSS pixel
 * and the choreography can be authored straight in viewport coordinates.
 *
 * `frameloop="demand"` keeps it silent: frames are only drawn while a tween is
 * running, so a still page costs nothing. No shadows, no post-processing — one
 * key light and a fill are enough to read the extruded rim.
 */
export function StackCanvas() {
  return (
    <Canvas
      frameloop="demand"
      orthographic
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 600], zoom: 1, near: 1, far: 2000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.6} />
      {/* Key light almost head-on so the white face reads against the dark hero */}
      <directionalLight position={[-120, 260, 900]} intensity={3.2} />
      <directionalLight position={[340, -200, 240]} intensity={1.1} color="#ff5566" />
      <StackLogos />
    </Canvas>
  )
}
