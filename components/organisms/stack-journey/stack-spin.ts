import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Renderer } from "./stack-render"

const SECONDS_PER_TURN = 40
const TURN_PER_MS = (Math.PI * 2) / (SECONDS_PER_TURN * 1000)
const MAX_STEP_MS = 100

export function createSpin(renderer: Renderer) {
  let frame = 0
  let last = 0

  const tick = (now: number) => {
    frame = requestAnimationFrame(tick)
    const elapsed = Math.min(now - last, MAX_STEP_MS)
    last = now
    renderer.state.spin += elapsed * TURN_PER_MS
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
