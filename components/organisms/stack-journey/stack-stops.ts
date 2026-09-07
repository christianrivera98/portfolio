import type { Viewport } from "./stack-journey.config"

export type Stops = {
  scatterEnd: number
  driftEnd: number
  ringEnd: number
  bentoMid: number
}

export const RING_BLEND_PX = 900

const top = (selector: string) => {
  const el = document.querySelector(selector)
  if (!el) return null
  const box = el.getBoundingClientRect()
  return { top: box.top + window.scrollY, height: box.height }
}

export function readStops(vp: Viewport): Stops {
  const hero = top("#home")
  const tech = top("#technologies")
  const bento = top(".tech-bento")

  const scatterEnd = hero?.height ?? vp.height
  const techTop = tech?.top ?? scatterEnd + vp.height
  const driftEnd = Math.max(scatterEnd + 1, techTop - vp.height * 0.5)
  const techHeight = tech?.height ?? vp.height

  return {
    scatterEnd,
    driftEnd,
    ringEnd: Math.max(driftEnd + RING_BLEND_PX, techTop + techHeight - vp.height),
    bentoMid: bento ? bento.top + bento.height / 2 : techTop + techHeight / 2,
  }
}
