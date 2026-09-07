import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Renderer } from "./stack-render"

export const GATE_PX = 40
const ENTRY_SECONDS = 1.5

export function createArrival(
  renderer: Renderer,
  viewportHeight: number,
  setLive: (live: boolean) => void,
  hasLanded: () => boolean,
  onLanded: () => void
) {
  const gate = ScrollTrigger.create({
    start: 0,
    end: GATE_PX,
    onToggle: (self) => setLive(self.isActive && hasLanded()),
  })

  let entry: gsap.core.Tween | null = null
  if (window.scrollY < viewportHeight) {
    renderer.state.entry = 0
    entry = gsap.to(renderer.state, {
      entry: 1,
      duration: ENTRY_SECONDS,
      ease: "none",
      onUpdate: renderer.request,
      onComplete: onLanded,
    })
  } else onLanded()

  return () => {
    entry?.kill()
    gate.kill()
  }
}
