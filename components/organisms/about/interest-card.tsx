"use client"

import { useRef } from "react"
import type { Interest } from "./about.config"

type Props = {
  interest: Interest
}

export function InterestCard({ interest }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => {
    videoRef.current?.play()
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      role="img"
      aria-label={`Interest: ${interest.label}`}
      className="interest-card group relative aspect-[4/3] rounded-sm overflow-hidden cursor-default border border-white/[0.06] bg-white/[0.02]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={interest.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-500"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-mono uppercase tracking-wider text-white/50 group-hover:text-white/80 transition-colors duration-300">
          {interest.label}
        </span>
      </div>
    </div>
  )
}
