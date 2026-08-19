import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Renderer } from "./stack-render"

/**
 * The rings' own clock, running only while Technologies is on screen.
 *
 * It turns per frame and by elapsed time, not on a fixed heartbeat: a ring
 * stepping twelve times a second reads as stuttering however slow the turn is,
 * because the eye tracks each logo along a smooth arc. Frame-rate independent,
 * so a slow device turns the ring slower per frame rather than skipping it.
 *
 * The renderer coalesces everything into one draw per frame, so a frame that
 * also has scroll in it still costs a single pass.
 */
const SECONDS_PER_TURN = 40
const TURN_PER_MS = (Math.PI * 2) / (SECONDS_PER_TURN * 1000)
/** A tab left in the background can hand back a huge delta on its first frame. */
const MAX_STEP_MS = 100

export function createSpin(renderer: Renderer) {
  let frame = 0
  let last = 0

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick)
    const elapsed = Math.min(now - last, MAX_STEP_MS)
    last = now
    renderer.state.spin += elapsed * TURN_PER_MS
    // Already inside a frame, so draw into this one.
    renderer.drawNow()
  }

  const stop = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
  }

  const start = () => {
    if (frame) return
    last = performance.now()
    frame = requestAnimationFrame(tick)
  }

  // This trigger spans the whole section, so it also owns the anchor: the
  // journey's own trigger ends when the rings are formed, and past that point
  // its onUpdate stops firing — a stale anchor left the rings hanging in the
  // viewport while the page scrolled on, which reads as them sliding down into
  // the next section instead of orbiting the bento.
  const trigger = ScrollTrigger.create({
    trigger: "#technologies",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? start() : stop()),
    onUpdate: (self) => {
      renderer.state.anchor = self.scroll()
      renderer.request()
    },
  })

  return () => {
    stop()
    trigger.kill()
  }
}
