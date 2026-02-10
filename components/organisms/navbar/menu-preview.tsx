"use client"

import Image from "next/image"
import { useLayoutEffect, useRef, useState, useEffect } from "react"
import gsap from "gsap"

interface MenuPreviewProps {
  src?: string
  onSrcChange?: React.MutableRefObject<((src: string | undefined) => void) | undefined>
}

export function MenuPreview({ src: initialSrc, onSrcChange }: MenuPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSrc, setCurrentSrc] = useState(initialSrc)

  // Register the setter so parent can update without re-rendering
  useEffect(() => {
    if (onSrcChange) {
      onSrcChange.current = setCurrentSrc
    }
  }, [onSrcChange])

  // Animate on image change
  useLayoutEffect(() => {
    if (!containerRef.current || !currentSrc) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    )
  }, [currentSrc])

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full items-center justify-center overflow-hidden bg-[#0a0a0a] flex"
    >
      {currentSrc ? (
        <Image
          key={currentSrc}
          src={currentSrc}
          alt=""
          fill
          className="object-cover opacity-60"
          priority
        />
      ) : (
        <span className="text-xs font-mono text-white/20 uppercase tracking-widest">
          Hover a section
        </span>
      )}
    </div>
  )
}
