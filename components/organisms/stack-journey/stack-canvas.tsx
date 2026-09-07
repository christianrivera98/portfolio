"use client"

import { Canvas } from "@react-three/fiber"
import { StackLogos } from "./stack-logos"

export function StackCanvas() {
  return (
    <Canvas
      frameloop="never"
      orthographic
      dpr={[1, 2]}
      camera={{ position: [0, 0, 600], zoom: 1, near: 1, far: 2000 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[-120, 260, 900]} intensity={2.8} />
      <directionalLight position={[320, -260, 180]} intensity={0.9} />
      <StackLogos />
    </Canvas>
  )
}
