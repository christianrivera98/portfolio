import gsap from "gsap"
import { DRIFT, driftPose } from "./stack-drift.config"
import { toWorld } from "./stack-journey.config"
import { throttled, type PhaseArgs } from "./stack-phase-utils"

/**
 * The long middle stretch: the field drifts upwards at different rates while
 * Experience scrolls past, so the logos read as sitting at different depths
 * behind the content.
 */
export function createDriftPhase({ logos, viewport, invalidate }: PhaseArgs) {
  const draw = throttled(invalidate)
  const state = { progress: 0 }
  let vp = viewport()
  let live = false

  const apply = () => {
    // Silent until the phase is really running. ScrollTrigger applies progress 0
    // on every refresh, and at progress 0 this phase writes the drift pose — so
    // without this guard the logos sat scattered while still in the hero.
    if (!live && state.progress === 0) return
    const t = state.progress

    logos.forEach((logo, i) => {
      const spot = DRIFT[i % DRIFT.length]
      const base = toWorld(driftPose(i, vp), vp)

      logo.position.y = base.y - spot.parallax * vp.height * t
      logo.position.x = base.x + ((i % 3) - 1) * 40 * t
    })

    draw()
  }

  return gsap.to(state, {
    progress: 1,
    ease: "none",
    onUpdate: apply,
    scrollTrigger: {
      trigger: "#experience",
      start: "top bottom",
      endTrigger: "#technologies",
      end: "top center",
      scrub: 1.2,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        live = self.isActive
      },
      onRefresh: (self) => {
        vp = viewport()
        live = self.isActive
      },
    },
  })
}
