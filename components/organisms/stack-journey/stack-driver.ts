import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type * as THREE from "three"
import { createArrival } from "./stack-arrival"
import { createRenderer, type Renderer } from "./stack-render"
import { createSpin } from "./stack-spin"
import { readStops } from "./stack-stops"
import { readViewport } from "./stack-viewport"

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
      onUpdate: (self) => {
        renderer.state.anchor = self.scroll()
        renderer.request()
      },
    },
  })

  const resync = () => {
    const y = window.scrollY
    renderer.state.anchor = y
    renderer.state.scroll = Math.min(y, stops.ringEnd)
    drive.progress = stops.ringEnd ? renderer.state.scroll / stops.ringEnd : 0
    renderer.request()
  }
  ScrollTrigger.addEventListener("refresh", resync)

  const stopSpin = mobile ? null : createSpin(renderer)

  renderer.state.anchor = window.scrollY
  renderer.state.scroll = window.scrollY
  const stopArrival = createArrival(renderer, vp.height, setLive, hasLanded, onLanded)

  renderer.draw()

  return {
    renderer,
    destroy: () => {
      ScrollTrigger.removeEventListener("refresh", resync)
      stopArrival()
      stopSpin?.()
      journey.scrollTrigger?.kill()
      journey.kill()
      renderer.dispose()
    },
  }
}
