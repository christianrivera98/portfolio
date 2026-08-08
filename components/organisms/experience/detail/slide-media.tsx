"use client"

import Image from "next/image"
import { useReducedMotion } from "motion/react"
import { type MediaItem } from "@/components/organisms/projects/projects.config"
import { useVideoInView } from "@/hooks/useVideoInView"

/**
 * One slide. Video clips play muted on loop with NO controls — they read as
 * moving images; reduced-motion users get the first frame held still. Only the
 * clip scrolled into view downloads and plays. Static shots use next/image.
 * The wrapper fixes the aspect so the track overflows.
 */
export function SlideMedia({ item, alt, sizes }: { item: MediaItem; alt: string; sizes: string }) {
  const reduce = useReducedMotion()
  const videoRef = useVideoInView(!reduce)

  return (
    <div className="relative aspect-[16/10] w-[80%] shrink-0 snap-center overflow-hidden rounded-xl border border-white/10 bg-black/40 sm:w-[68%]">
      {item.type === "video" ? (
        <video
          ref={videoRef}
          src={item.src}
          loop
          muted
          playsInline
          preload={reduce ? "metadata" : "none"}
          aria-label={alt}
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <Image src={item.src} alt={alt} fill draggable={false} sizes={sizes} className="object-cover" />
      )}
    </div>
  )
}
