"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { useDeferredMount } from "@/hooks/useDeferredMount"
import { useInViewport } from "@/hooks/useInViewport"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { SkillsGrid } from "./skills-grid"

const ConstellationCanvas = dynamic(
  () => import("./constellation/constellation-canvas").then((m) => m.ConstellationCanvas),
  { ssr: false }
)

/**
 * The "stack" half of the section. On a roomy pointer-driven screen it becomes
 * a 3D constellation; everywhere else it stays the DOM grid, which is also the
 * reduced-motion fallback. The grid is rendered either way — under the canvas
 * it is the accessible copy of the same twelve names.
 */
export function StackSignature() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("Technologies")
  const reduced = usePrefersReducedMotion()
  // No WebGL loop goes to phones: the gate needs room *and* a fine pointer.
  const roomy = useMediaQuery("(min-width: 1024px) and (pointer: fine)")
  const canRender3D = roomy && !reduced

  // Two viewports of slack, then the canvas unmounts entirely rather than
  // sitting idle holding a WebGL context.
  const nearby = useInViewport(containerRef, { rootMargin: "100%" })
  const onScreen = useInViewport(containerRef, { rootMargin: "150px" })
  const mounted = useDeferredMount(canRender3D) && nearby

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <p className="tech-skills-label relative z-10 mb-8 font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/60">
        {t("skillsLabel")}
      </p>

      {/* Kept mounted under the canvas: same twelve names, readable by assistive
          tech and by anyone the 3D gate turns away. */}
      <div className={mounted ? "pointer-events-none opacity-0" : undefined}>
        <SkillsGrid />
      </div>

      {mounted && (
        <div className="absolute inset-x-0 bottom-0 top-10">
          <ConstellationCanvas active={onScreen} />
        </div>
      )}
    </div>
  )
}
