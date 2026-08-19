import gsap from "gsap"
import type * as THREE from "three"
import { createArrival } from "./stack-arrival"
import { createRenderer, type Renderer } from "./stack-render"
import { createSpin } from "./stack-spin"
import { readStops } from "./stack-stops"
import { readViewport } from "./stack-viewport"

/** How long the scrubbed journey takes to catch up with the scrollbar. */
const SCRUB = 0.55

type DriverArgs = {
  logos: THREE.Mesh[]
  material: THREE.Material
  render: () => void
  mobile: boolean
  setLive: (live: boolean) => void
  onLanded: () => void
  hasLanded: () => boolean
}

/**
 * Everything the journey needs for one breakpoint: one ScrollTrigger that moves
 * a number, one renderer that turns it into poses, and the ring's clock.
 */
export function createDriver({
  logos,
  material,
  render,
  mobile,
  setLive,
  onLanded,
  hasLanded,
}: DriverArgs): { renderer: Renderer; destroy: () => void } {
  let vp = readViewport(mobile)
  let stops = readStops(vp)
  const renderer = createRenderer(logos, material, render, () => ({ vp, stops }))

  // Layout is read on refresh and cached: measuring live DOM inside a scrubbed
  // update reflows on every frame of the scroll.
  const measure = () => {
    vp = readViewport(mobile)
    stops = readStops(vp)
    renderer.request()
  }

  const drive = { progress: 0 }
  const journey = gsap.to(drive, {
    progress: 1,
    ease: "none",
    onUpdate: () => {
      renderer.state.scroll = drive.progress * stops.ringEnd
      renderer.request()
    },
    scrollTrigger: {
      start: 0,
      end: () => stops.ringEnd,
      scrub: SCRUB,
      invalidateOnRefresh: true,
      onRefresh: measure,
      // The smoothed progress lags the scrollbar on purpose; the rings still
      // have to sit on the bento, so they follow the raw offset instead.
      onUpdate: (self) => {
        renderer.state.anchor = self.scroll()
        renderer.request()
      },
    },
  })

  const stopSpin = mobile ? null : createSpin(renderer)

  renderer.state.anchor = window.scrollY
  renderer.state.scroll = window.scrollY
  const stopArrival = createArrival(renderer, vp.height, setLive, hasLanded, onLanded)

  renderer.draw()

  return {
    renderer,
    destroy: () => {
      stopArrival()
      stopSpin?.()
      journey.scrollTrigger?.kill()
      journey.kill()
      renderer.dispose()
    },
  }
}
