"use client"

import { useCallback, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { EasePack } from "gsap/EasePack"
import { useGSAP } from "@gsap/react"
import {
  addPanelAnimations,
  addRailEntry,
  addStackedReveals,
  panelScrollY,
} from "@/components/organisms/about/journey-stage"

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
        const viewport = root.querySelector<HTMLElement>(".journey-viewport")
        const track = root.querySelector<HTMLElement>(".journey-track")
        const rail = root.querySelector<HTMLElement>(".journey-rail")
        const progress = root.querySelector<HTMLElement>(".rail-progress")
        const panels = gsap.utils.toArray<HTMLElement>(".journey-panel", root)
        if (!viewport || !track || !rail || !panels.length) return

        // Pinned once, then the whole run is one horizontal tween the scrollbar
        // scrubs; every panel hangs its own triggers off it.
        const travel = () => track.scrollWidth - viewport.clientWidth
        let current = -2
        const tween = gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "center center",
            end: () => `+=${travel()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleX: self.progress })
              const centre = self.progress * travel() + viewport.clientWidth / 2
              const at = panels.findIndex((p) => centre < p.offsetLeft + p.offsetWidth)
              // Panel 0 is the intro, so -1 means "no interest is on centre".
              const index = gsap.utils.clamp(-1, panels.length - 2, at - 1)
              if (index === current) return
              current = index
              report.onChapter(index)
            },
          },
        })

        const stopEntry = addRailEntry(root, rail, viewport)

        gsap.utils
          .toArray<HTMLElement>(".chapter", root)
          .forEach((panel) => addPanelAnimations(tween, panel))

        seekRef.current = (index) => {
          const y = panelScrollY(tween, panels[index + 1], viewport)
          if (y !== null) gsap.to(window, { scrollTo: { y }, duration: 1.1, ease: "power3.inOut" })
        }
        report.onHorizontal(true)

        return () => {
          stopEntry()
          rail.classList.add("is-deck")
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
