"use client"

import { useRef } from "react"
import { SKILL_LOGOS } from "@/components/organisms/technologies/technologies.config"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { useStackJourney } from "@/hooks/useStackJourney"
import { StackLogo } from "./stack-logo"

/**
 * The twelve stack logos as a single layer that spans the whole page: they land
 * in the hero, drift across the sections behind the content and end up orbiting
 * the bento in Technologies.
 *
 * It lives outside <main> because every section is `overflow-hidden`, and sits
 * at z-6: above the section backgrounds and the hero scrims, below every
 * section's own content (z-10) — which is what keeps it from ever covering the
 * bento. Decorative: the accessible copy of these names is in Technologies.
 */
export function StackJourney() {
  const layerRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useStackJourney(layerRef, reduced)

  if (reduced) return null

  return (
    <div ref={layerRef} aria-hidden className="stack-journey" data-ready="false">
      {SKILL_LOGOS.map((logo, index) => (
        <StackLogo key={logo.label} src={logo.file} index={index} />
      ))}
    </div>
  )
}
