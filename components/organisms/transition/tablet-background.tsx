"use client"

import { useState } from "react"
import { useReducedMotion } from "motion/react"
import Grainient from "@/components/Grainient"

const SHADER_VARS = ["--shader-color-1", "--shader-color-2", "--shader-color-3"] as const

function toHex6(value: string): string {
  const ctx = document.createElement("canvas").getContext("2d")
  if (!ctx) return value
  ctx.fillStyle = "#000000"
  ctx.fillStyle = value
  return ctx.fillStyle
}

export function TabletBackground() {
  const reduce = useReducedMotion()
  const [[color1, color2, color3]] = useState(() => {
    const style = getComputedStyle(document.documentElement)
    return SHADER_VARS.map((name) => toHex6(style.getPropertyValue(name).trim()))
  })

  return (
    <Grainient
      className="h-full w-full"
      color1={color1}
      color2={color2}
      color3={color3}
      timeSpeed={reduce ? 0 : 0.25}
      colorBalance={0}
      warpStrength={1}
      warpFrequency={5}
      warpSpeed={2}
      warpAmplitude={50}
      blendAngle={0}
      blendSoftness={0.05}
      rotationAmount={500}
      noiseScale={2}
      grainAmount={0.1}
      grainScale={2}
      grainAnimated={false}
      contrast={1.5}
      gamma={1}
      saturation={1}
      centerX={0}
      centerY={0}
      zoom={0.9}
    />
  )
}
