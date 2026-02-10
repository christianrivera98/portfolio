"use client"

import { useRef, useState, useCallback } from "react"
import { usePreloaderAnimation } from "@/hooks/usePreloaderAnimation"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [unmounted, setUnmounted] = useState(false)
  const handleUnmount = useCallback(() => setUnmounted(true), [])

  usePreloaderAnimation(containerRef, onComplete, handleUnmount)

  if (unmounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      aria-hidden="true"
    >
      <div className="preloader-top absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a]" />
      <div className="preloader-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span
          className="preloader-initials font-serif-display text-[18vw] md:text-[14vw] lg:text-[10vw] leading-none text-white/[0.08] select-none"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          CL
        </span>

        <div className="preloader-line-container">
          <svg width="120" height="2" viewBox="0 0 120 2" className="overflow-visible">
            <line
              className="preloader-line"
              x1="0"
              y1="1"
              x2="120"
              y2="1"
              stroke="hsl(356, 96%, 32%)"
              strokeWidth="2"
              strokeDasharray="200"
              strokeDashoffset="200"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
