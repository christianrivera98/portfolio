"use client"

import dynamic from "next/dynamic"
import { useDeferredMount } from "@/hooks/useDeferredMount"
import { usePreloader } from "@/hooks/usePreloader"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

const StackCanvas = dynamic(
  () => import("./stack-canvas").then((m) => m.StackCanvas),
  { ssr: false }
)

/**
 * The twelve stack logos as a single layer spanning the whole page: they land
 * in the hero, drift across the sections behind the content and end up orbiting
 * the bento in Technologies.
 *
 * It lives outside <main> because every section is `overflow-hidden`, and sits
 * at z-6: above the section backgrounds and the hero scrims, below every
 * section's content (z-10) — which is what keeps it from ever covering the
 * bento. Decorative: the accessible copy of these names is in Technologies.
 */
export function StackJourney() {
  const reduced = usePrefersReducedMotion()
  const { isComplete } = usePreloader()
  // Same gate the hero room uses: the scene waits for an idle slot rather than
  // competing with the intro for the main thread.
  const mounted = useDeferredMount(!reduced && isComplete)

  if (reduced || !mounted) return null

  return (
    <div aria-hidden className="stack-journey">
      <StackCanvas />
    </div>
  )
}
