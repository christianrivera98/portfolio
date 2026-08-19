"use client"

import { Canvas } from "@react-three/fiber"
import { StackLogos } from "./stack-logos"

/**
 * The stack scene. Orthographic with zoom 1, so one world unit is one CSS pixel
 * and the choreography can be authored straight in viewport coordinates.
 *
 * `frameloop="never"` keeps it silent: the journey's renderer draws when
 * something actually changed, so a still page costs nothing. No shadows, no post-processing — one
 * key light and a fill are enough to read the extruded rim.
 */
export function StackCanvas() {
  return (
    <Canvas
      // The layer schedules its own frames and calls `gl.render` itself, so
      // R3F must not run a loop of its own: with `demand` the invalidate
      // landed on R3F's next frame, which halved the ring's frame rate and is
      // what made it look laggy.
      frameloop="never"
      orthographic
      // Follows the screen up to 2x. Pinned at 1x the canvas was upscaled by the
      // compositor on any dense display, which is what made the logos look
      // pixelated — and these are twelve flat shapes, so the extra pixels are
      // fill, not geometry.
      dpr={[1, 2]}
      camera={{ position: [0, 0, 600], zoom: 1, near: 1, far: 2000 }}
      // No MSAA: a full-screen buffer with multisampling is the single most
      // expensive thing about this scene, and these are flat white silhouettes.
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
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
