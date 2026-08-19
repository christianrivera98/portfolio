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

  const trigger = ScrollTrigger.create({
    trigger: "#technologies",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? start() : stop()),
  })

  return () => {
    stop()
    trigger.kill()
  }
}
