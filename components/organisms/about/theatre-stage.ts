import gsap from "gsap"
import { Flip } from "gsap/Flip"
import type { ScrollTrigger } from "gsap/ScrollTrigger"

export type RailVars = { x: number; y: number; scaleX: number; scaleY: number }

/**
 * Where each chapter's clip has to sit to land on its rail slot. Flip measures
 * from where the element stands, so the media is reset to its stage rest state
 * first; the array is mutated in place because the timeline reads it through
 * function-based values and re-reads it on every ScrollTrigger refresh.
 */
export function measureRailVars(
  root: HTMLElement,
  chapters: HTMLElement[],
  into: RailVars[] = []
): RailVars[] {
  const slots = gsap.utils.toArray<HTMLElement>(".rail-slot", root)
  chapters.forEach((chapter, i) => {
    const media = chapter.querySelector<HTMLElement>(".chapter-media")
    if (!media || !slots[i]) return
    gsap.set(media, { x: 0, y: 0, scale: 1, transformOrigin: "0px 0px" })
    into[i] = Flip.fit(media, slots[i], { scale: true, getVars: true }) as RailVars
  })
  return into
}

/** One chapter's turn on stage: clip zooms out of the rail, copy in, both out. */
export function addChapterTimeline(
  tl: gsap.core.Timeline,
  chapter: HTMLElement,
  railVars: RailVars[],
  index: number,
  at: number,
  span: number
) {
  const media = chapter.querySelector<HTMLElement>(".chapter-media")
  const copy = chapter.querySelector<HTMLElement>(".chapter-copy")
  if (!media || !copy) return

  const rail = () => railVars[index]
  const parked = {
    x: () => rail().x,
    y: () => rail().y,
    scaleX: () => rail().scaleX,
    scaleY: () => rail().scaleY,
  }
  // Perceived speed, not raw scale: ExpoScaleEase bends the curve so the clip
  // reads as growing at a constant rate while the scrollbar moves linearly.
  const from = railVars[index].scaleX.toFixed(4)

  tl.fromTo(media, parked,
    { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: span * 0.3, ease: `expoScale(${from}, 1, power1.inOut)` }, at)
    .fromTo(copy, { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: span * 0.2, ease: "power2.out" }, at + span * 0.24)
    .to(copy, { opacity: 0, y: -22, duration: span * 0.14, ease: "power2.in" }, at + span * 0.8)
    .to(media, { ...parked, duration: span * 0.3, ease: `expoScale(1, ${from}, power1.inOut)` }, at + span * 0.7)
}

/** Jumps the scroll to a chapter's midpoint — the rail's keyboard route in. */
export function seekChapter(
  st: ScrollTrigger,
  index: number,
  entry: number,
  span: number,
  total: number
) {
  const at = (entry + index * span + span / 2) / total
  gsap.to(window, {
    scrollTo: { y: st.start + (st.end - st.start) * at },
    duration: 1.1,
    ease: "power3.inOut",
  })
}

/** Below `md` the chapters just read top to bottom, so they only need a reveal. */
export function addStackedReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>(".chapter", root).forEach((chapter) => {
    gsap.from(chapter, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: chapter, start: "top 88%", toggleActions: "play none none reverse" },
    })
  })
}
