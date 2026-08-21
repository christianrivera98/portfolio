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
        // The stage is header + run: pinning it is what keeps the title in
        // place instead of letting it scroll off while the run is scrubbed.
        const stage = root.closest<HTMLElement>(".about-stage") ?? root
        const viewport = root.querySelector<HTMLElement>(".journey-viewport")
        const track = root.querySelector<HTMLElement>(".journey-track")
        const bars = gsap.utils.toArray<HTMLElement>(".journey-progress-fill", root)
        const panels = gsap.utils.toArray<HTMLElement>(".journey-panel", root)
        if (!viewport || !track || !panels.length) return

        // Pinned once, then the whole run is one horizontal tween the scrollbar
        // scrubs; every panel hangs its own triggers off it.
        //
        // Layout is read on refresh and cached: measuring live DOM inside a
        // scrubbed update forces a reflow on every frame.
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
            // The stage is what gets pinned, not the viewport: the header and
            // the two progress bars bracket the run and travel with it.
            trigger: stage,
            // The stage lands just under the fixed navbar and stays there for
            // the whole run, so nothing sits behind the bar while it is pinned.
            start: "top top+=88",
            end: () => `+=${travel()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // The navbar's bar holds while this run is being scrubbed, so it
            // only moves again once both of these bars are full.
            onRefresh: (self) => {
              measure()
              setScrollHold({ start: self.start, end: self.end })
            },
            onUpdate: (self) => {
              gsap.set(bars, { scaleX: self.progress })
              const centre = self.progress * travelPx + centreLine
              const at = edges.findIndex((edge) => centre < edge)
              // Panel 0 is the intro, so -1 means "no interest is on centre".
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
