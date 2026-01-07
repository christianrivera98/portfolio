"use client"

import Image from "next/image"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"

interface MenuPreviewProps {
  src?: string
}

export function MenuPreview({ src }: MenuPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    )
  }, [src])

  return (
    <div
      ref={containerRef}
      className="relative hidden h-full w-full items-center justify-center overflow-hidden bg-[hsl(var(--primary))] md:flex"
    >
      {src ? (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="text-sm text-[hsl(var(--muted))]">
          Hover a section
        </div>
      )}
    </div>
  )
}
