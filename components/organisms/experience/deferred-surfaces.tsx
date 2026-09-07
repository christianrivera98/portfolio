"use client"

import dynamic from "next/dynamic"
import { useDeferredMount } from "@/hooks/useDeferredMount"

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
