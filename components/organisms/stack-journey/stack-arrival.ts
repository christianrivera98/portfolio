import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { Renderer } from "./stack-render"

/** How far down the page the hero still counts as "parked at the top". */
export const GATE_PX = 40
const ENTRY_SECONDS = 1.5

/**
 * The landing, and the gate that decides when the pointer magnet may listen.
 *
 * The gate is a toggle and not an onLeave/onEnterBack pair on purpose: the
 * layer mounts after the preloader, so on a page that is already scrolled down
 * those two would never fire and the magnet would stay wired for nothing.
 */
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

  // Flying in is only worth it with the hero on screen; mounting further down
  // just places the row where the journey says it goes.
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
