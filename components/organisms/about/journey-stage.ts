import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { addMotifTimeline } from "./journey-motifs"
import type { InterestMotif } from "./about.config"

/** How far a panel that is not on centre falls back. */
const DIM = 0.32
/**
 * What one interest panel does while it crosses the viewport. Every trigger
 * rides `containerAnimation`, which is how ScrollTrigger reads horizontal
 * progress: "left right" means this panel's left edge meeting the viewport's
 * right edge, not a vertical offset.
 */
export function addPanelAnimations(tween: gsap.core.Tween, panel: HTMLElement) {
  const clip = panel.querySelector<HTMLElement>("video")
  const copy = panel.querySelector<HTMLElement>(".chapter-copy")
  if (!clip || !copy) return
  const rides = { containerAnimation: tween, trigger: panel }

  // ExpoScaleEase: the clip settles from 1.14 to 1 as the panel walks to the
  // centre, and a linear curve over a scale reads as accelerating.
  gsap.fromTo(
    clip,
    { scale: 1.14 },
    {
      scale: 1,
      ease: "expoScale(1.14, 1, power1.inOut)",
      scrollTrigger: { ...rides, start: "left right", end: "center center", scrub: true },
    }
  )

  gsap.from(copy, {
    yPercent: 22,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    scrollTrigger: { ...rides, start: "left 72%", toggleActions: "play none none reverse" },
  })

  // One timeline for the whole crossing: the panel lifts out of the dim as it
  // walks to the centre and drops back after it, and the motif runs alongside.
  const cross = gsap.timeline({
    scrollTrigger: { ...rides, start: "left right", end: "right left", scrub: true },
  })
  cross
    .fromTo(panel, { opacity: DIM }, { opacity: 1, ease: "none", duration: 1 }, 0)
    .to(panel, { opacity: DIM, ease: "none", duration: 1 }, 1)
  addMotifTimeline(cross, panel, panel.dataset.motif as InterestMotif, 0, 2)
}

/** Where the page has to be for `panel` to sit centred in the run. */
export function panelScrollY(
  tween: gsap.core.Tween,
  panel: HTMLElement | undefined,
  viewport: HTMLElement
): number | null {
  const st = tween.scrollTrigger as ScrollTrigger | undefined
  const track = panel?.parentElement
  if (!st || !panel || !track) return null
  const travel = track.scrollWidth - viewport.clientWidth
  if (travel <= 0) return st.start
  const target = gsap.utils.clamp(
    0,
    travel,
    panel.offsetLeft + panel.offsetWidth / 2 - viewport.clientWidth / 2
  )
  return st.start + (st.end - st.start) * (target / travel)
}

/** Stacked, the panels just read top to bottom, so they only need a reveal. */
export function addStackedReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(".chapter", root).forEach((panel) => {
    gsap.from(panel, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: panel, start: "top 88%", toggleActions: "play none none reverse" },
    })
  })
}

/**
 * Deck → row: the rail's slots arrive stacked and dimmed, Flip reads that
 * state, the class comes off, and the row they become is what plays once the
 * section reaches the viewport. Returns its own teardown.
 */
export function addRailEntry(root: HTMLElement, rail: HTMLElement, viewport: HTMLElement) {
  const deck = Flip.getState(gsap.utils.toArray(".rail-item", root), { props: "opacity" })
  rail.classList.remove("is-deck")
  const entry = Flip.from(deck, {
    duration: 0.7,
    ease: "power2.inOut",
    stagger: 0.05,
    absolute: true,
    paused: true,
  })
  const trigger = ScrollTrigger.create({
    trigger: viewport,
    start: "top 85%",
    once: true,
    onEnter: () => entry.play(),
  })

  return () => {
    trigger.kill()
    entry.kill()
  }
}
