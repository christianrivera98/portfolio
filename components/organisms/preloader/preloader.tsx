"use client"

import { useRef, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { usePreloaderAnimation } from "@/hooks/usePreloaderAnimation"
import VaporizeTextCycle, { Tag } from "@/components/vapour-text-effect"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const t = useTranslations("Preloader")
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [unmounted, setUnmounted] = useState(false)
  const handleUnmount = useCallback(() => setUnmounted(true), [])

  const { showText } = usePreloaderAnimation(
    containerRef, canvasRef, textRef, onComplete, handleUnmount
  )

  if (unmounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="preloader-canvas absolute inset-0 w-full h-full"
      />

      {showText && (
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="w-[90vw] h-64">
            <VaporizeTextCycle
              texts={[t("loading"), t("welcome")]}
              font={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "44px",
                fontWeight: 300,
              }}
              color="rgb(255, 255, 255)"
              spread={5}
              density={5}
              animation={{
                fadeInDuration: 1,
                waitDuration: 3,
                vaporizeDuration: 1.5,
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.P}
            />
          </div>
        </div>
      )}
    </div>
  )
}
