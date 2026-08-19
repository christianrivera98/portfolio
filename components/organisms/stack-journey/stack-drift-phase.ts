import gsap from "gsap"
import { DRIFT, driftPose } from "./stack-drift.config"
import { toWorld } from "./stack-journey.config"
import { throttled, type PhaseArgs } from "./stack-phase-utils"

/**
 * The long middle stretch: the field drifts upwards at different rates while
 * Experience scrolls past, so the logos read as sitting at different depths
 * behind the content.
 */
export function createDriftPhase(
  { logos, viewport, invalidate }: PhaseArgs,
  handBack: () => void
) {
  const draw = throttled(invalidate)
  const state = { progress: 0 }
  let vp = viewport()
  let touched = false

  const apply = () => {
    // Never write at progress 0. This phase is created after the scatter, so it
    // runs after it in the same tick and would win: coming back up the page the
    // logos stayed scattered over the hero because this wrote the drift pose
    // while the scatter was busy rebuilding the row.
    if (state.progress === 0) {
      if (touched) {
        touched = false
        handBack()
      }
      return
    }
    touched = true
    const t = state.progress

    logos.forEach((logo, i) => {
      const spot = DRIFT[i % DRIFT.length]
      const base = toWorld(driftPose(i, vp), vp)

      logo.position.y = base.y - spot.parallax * vp.height * t
      logo.position.x = base.x + ((i % 3) - 1) * 40 * t
    })

    draw()
  }

  const tween = gsap.to(state, {
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
      onRefresh: () => {
        vp = viewport()
      },
    },
  })

  return { tween, apply }
}
