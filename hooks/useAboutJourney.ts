"use client"

import { useCallback, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { EasePack } from "gsap/EasePack"
import { useGSAP } from "@gsap/react"
import {
  addPanelAnimations,
  addStackedReveals,
  panelScrollY,
} from "@/components/organisms/about/journey-stage"
import { setScrollHold } from "@/lib/scroll-hold"

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, EasePack)

const HORIZONTAL = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
const STACKED = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)"

type Report = { onChapter: (index: number) => void; onHorizontal: (on: boolean) => void }

export function useAboutJourney(
  rootRef: React.RefObject<HTMLDivElement | null>,
  report: Report
) {
  const seekRef = useRef<((index: number) => void) | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const mm = gsap.matchMedia()

      mm.add(HORIZONTAL, () => {
        const stage = root.closest<HTMLElement>(".about-stage") ?? root
        const viewport = root.querySelector<HTMLElement>(".journey-viewport")
        const track = root.querySelector<HTMLElement>(".journey-track")
        const bars = gsap.utils.toArray<HTMLElement>(".journey-progress-fill", root)
        const panels = gsap.utils.toArray<HTMLElement>(".journey-panel", root)
        if (!viewport || !track || !panels.length) return

        let travelPx = 0
        let centreLine = 0
        const edges: number[] = []
        const measure = () => {
          travelPx = track.scrollWidth - viewport.clientWidth
          centreLine = viewport.clientWidth / 2
          edges.length = 0
          panels.forEach((p) => edges.push(p.offsetLeft + p.offsetWidth))
        }
        measure()
        const travel = () => travelPx

        let current = -2
        const tween = gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top+=88",
            end: () => `+=${travel()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              measure()
              setScrollHold({ start: self.start, end: self.end })
            },
            onUpdate: (self) => {
              gsap.set(bars, { scaleX: self.progress })
              const centre = self.progress * travelPx + centreLine
              const at = edges.findIndex((edge) => centre < edge)
              const index = gsap.utils.clamp(-1, panels.length - 2, at - 1)
              if (index === current) return
              current = index
              report.onChapter(index)
            },
          },
        })

        gsap.utils
          .toArray<HTMLElement>(".chapter", root)
          .forEach((panel) => addPanelAnimations(tween, panel))

        seekRef.current = (index) => {
          const y = panelScrollY(tween, panels[index + 1], viewport)
          if (y !== null) gsap.to(window, { scrollTo: { y }, duration: 1.1, ease: "power3.inOut" })
        }
        report.onHorizontal(true)

        return () => {
          setScrollHold(null)
          seekRef.current = null
          report.onHorizontal(false)
        }
      })

      mm.add(STACKED, () => addStackedReveals(root))

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return useCallback((index: number) => seekRef.current?.(index), [])
}
