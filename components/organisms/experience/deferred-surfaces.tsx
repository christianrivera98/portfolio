"use client"

import dynamic from "next/dynamic"
import { useDeferredMount } from "@/hooks/useDeferredMount"

/**
 * The experience surfaces (sticky tablet, laptop tablet, mobile overlay) are
 * interaction-driven and live below the fold, but they pulled motion/react, the
 * sliders and their media into the initial chunk. One client-only chunk, mounted
 * on idle: by the time a visitor scrolls down they are already there.
 */
const ExperienceSurfaces = dynamic(
  () => import("./experience-surfaces").then((m) => m.ExperienceSurfaces),
  { ssr: false }
)

export function ExperienceStickySurfaces() {
  const mounted = useDeferredMount()
  return mounted ? <ExperienceSurfaces part="sticky" /> : null
}

export function ExperienceDetailOverlay() {
  const mounted = useDeferredMount()
  return mounted ? <ExperienceSurfaces part="overlay" /> : null
}
