import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { addMotifTimeline } from "./journey-motifs"
import type { InterestMotif } from "./about.config"

const DIM = 0.32
export function addPanelAnimations(tween: gsap.core.Tween, panel: HTMLElement) {
  const clip = panel.querySelector<HTMLElement>("video")
  const copy = panel.querySelector<HTMLElement>(".chapter-copy")
  if (!clip || !copy) return
  const rides = { containerAnimation: tween, trigger: panel }

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

  const cross = gsap.timeline({
    scrollTrigger: { ...rides, start: "left right", end: "right left", scrub: true },
  })
  cross
    .fromTo(panel, { opacity: DIM }, { opacity: 1, ease: "none", duration: 1 }, 0)
    .to(panel, { opacity: DIM, ease: "none", duration: 1 }, 1)
  addMotifTimeline(cross, panel, panel.dataset.motif as InterestMotif, 0, 2)
}

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
