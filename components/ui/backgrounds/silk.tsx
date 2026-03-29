/* eslint-disable react/no-unknown-property */
import React, { forwardRef, useMemo, useRef, useLayoutEffect } from "react"
import { Canvas, useFrame, useThree, RootState } from "@react-three/fiber"
import { Color, Mesh, ShaderMaterial } from "three"
import {
  hexToNormalizedRGB,
  vertexShader,
  fragmentShader,
  type SilkUniforms,
} from "./silk-shaders"

interface SilkPlaneProps {
  uniforms: SilkUniforms
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree()

  useLayoutEffect(() => {
    const mesh = ref as React.MutableRefObject<Mesh | null>
    if (mesh.current) mesh.current.scale.set(viewport.width, viewport.height, 1)
  }, [ref, viewport])

  useFrame((_state: RootState, delta: number) => {
    const mesh = ref as React.MutableRefObject<Mesh | null>
    if (mesh.current) {
      const material = mesh.current.material as ShaderMaterial & { uniforms: SilkUniforms }
      material.uniforms.uTime.value += 0.1 * delta
    }
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  )
})
SilkPlane.displayName = "SilkPlane"

export interface SilkProps {
  speed?: number
  scale?: number
  color?: string
  noiseIntensity?: number
  rotation?: number
}

const Silk: React.FC<SilkProps> = ({ speed = 5, scale = 1, color = "#7B7481", noiseIntensity = 1.5, rotation = 0 }) => {
  const meshRef = useRef<Mesh>(null)
  const uniforms = useMemo<SilkUniforms>(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, noiseIntensity, color, rotation]
  )

  const reducedMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <Canvas dpr={[1, 1.5]} frameloop={reducedMotion ? "demand" : "always"}>
      <SilkPlane ref={meshRef} uniforms={uniforms} />
    </Canvas>
  )
}

export default Silk
