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
      // 1x everywhere: the buffer is the expensive part of a full-screen canvas
      // and these are flat white shapes, so the extra pixels bought nothing but
      // long frames. Antialiasing keeps the edges clean.
      dpr={1}
      camera={{ position: [0, 0, 600], zoom: 1, near: 1, far: 2000 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.2} />
      {/* Key light almost head-on so the white face reads against the dark hero,
          plus a dim rim from below: the shading is what separates face from
          edge now that both are white. */}
      <directionalLight position={[-120, 260, 900]} intensity={2.8} />
      <directionalLight position={[320, -260, 180]} intensity={0.9} />
      <StackLogos />
    </Canvas>
  )
}
