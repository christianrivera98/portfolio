import gsap from "gsap"
import type * as THREE from "three"

/**
 * The phone version: no field, no parallax. The row fades out with the hero,
 * which is one tween instead of a scrubbed journey.
 */
export function createExitPhase({
  logos,
  invalidate,
}: {
  logos: THREE.Mesh[]
  invalidate: () => void
}) {
  const material = logos[0].material as THREE.Material
  material.transparent = true

  return gsap.to(material, {
    opacity: 0,
    ease: "none",
    onUpdate: invalidate,
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })
}
