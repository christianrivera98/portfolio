import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Renderer } from "./stack-render"

/**
 * The rings' own clock, running only while Technologies is on screen.
 *
 * A heartbeat rather than a tween: at 60 Hz the turn cost more per tick than
 * the whole section costs to scroll. A full turn takes 40 s, so twelve updates
 * a second is plenty — the same pattern the hero room uses for its idle loop.
 */
const FPS = 12
const SECONDS_PER_TURN = 40
const STEP = (Math.PI * 2) / (SECONDS_PER_TURN * FPS)

export function createSpin(renderer: Renderer) {
  let beat = 0

  const stop = () => {
    window.clearInterval(beat)
    beat = 0
  }

  const start = () => {
    if (beat) return
    beat = window.setInterval(() => {
      renderer.state.spin += STEP
      renderer.request()
    }, 1000 / FPS)
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
