import type { Viewport } from "./stack-journey.config"

/**
 * The journey in document coordinates: the scroll offsets where one stretch
 * hands over to the next, plus the anchor the rings turn around.
 *
 * Measured from the live layout on every ScrollTrigger refresh, never per
 * frame — reading the DOM inside a scrubbed update forces a reflow on every
 * frame of the scroll.
 */
export type Stops = {
  /** Hero gone: the row has finished breaking into the field. */
  scatterEnd: number
  /** The field stops drifting and starts folding into the rings. */
  driftEnd: number
  /** Past this the journey is over; nothing moves with scroll any more. */
  ringEnd: number
  /** Centre of the bento in document pixels: the planet the rings circle. */
  bentoMid: number
}

/**
 * How much scroll the fold from the field into the rings takes. Long on
 * purpose: a logo crosses up to ~1200px to reach its slot, so a short fold
 * makes it cover 90px in a frame the page only moved 10px — which reads as a
 * snap however smooth the easing is.
 */
export const RING_BLEND_PX = 900

const top = (selector: string) => {
  const el = document.querySelector(selector)
  if (!el) return null
  const box = el.getBoundingClientRect()
  return { top: box.top + window.scrollY, height: box.height }
}

/**
 * Falls back to a viewport-sized guess for anything missing so the journey
 * still runs (and stays ordered) on a page where a section has not rendered.
 */
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
