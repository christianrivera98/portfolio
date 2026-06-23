"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { useCoverScale } from "@/hooks/useCoverScale"

interface ProjectMarqueeProps {
  images?: string[]
  fallback: string
  fallbackSize?: string
}

const MIN_TILES = 20
// Known-good showcase proportions (matches the original demo width so the inner
// 3D grid stays centered), then scaled to cover the card container.
const STAGE_W = 1280
const STAGE_H = 600

// Repeat the (often few) project shots so the 3D grid keeps all 4 columns filled.
function padTiles(images: string[]): string[] {
  if (images.length >= MIN_TILES) return images
  return Array.from({ length: MIN_TILES }, (_, i) => images[i % images.length])
}

export function ProjectMarquee({ images, fallback, fallbackSize }: ProjectMarqueeProps) {
  const { ref, scale } = useCoverScale(STAGE_W, STAGE_H)

  if (!images?.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-serif-display text-white/10 ${fallbackSize ?? "text-3xl"}`}>
          {fallback}
        </span>
      </div>
    )
  }

  return (
    <div ref={ref} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="shrink-0 origin-center"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        <ThreeDMarquee
          images={padTiles(images)}
          className="h-[600px] w-full rounded-none"
          scaleClassName="scale-100"
        />
      </div>
    </div>
  )
}
