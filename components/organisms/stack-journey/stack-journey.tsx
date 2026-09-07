"use client"

import dynamic from "next/dynamic"
import { useDeferredMount } from "@/hooks/useDeferredMount"
import { usePreloader } from "@/hooks/usePreloader"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

const StackCanvas = dynamic(
  () => import("./stack-canvas").then((m) => m.StackCanvas),
  { ssr: false }
)

export function StackJourney() {
  const reduced = usePrefersReducedMotion()
  const { isComplete } = usePreloader()
  const mounted = useDeferredMount(!reduced && isComplete)

  if (reduced || !mounted) return null

  return (
    <div aria-hidden className="stack-journey">
      <StackCanvas />
    </div>
  )
}
