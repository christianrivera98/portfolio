"use client"

import { useCallback, useRef } from "react"
import gsap from "gsap"
import { Flip } from "gsap/Flip"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { EasePack } from "gsap/EasePack"
import { useGSAP } from "@gsap/react"
import { addMotifTimeline } from "@/components/organisms/about/theatre-motifs"
import type { InterestMotif } from "@/components/organisms/about/about.config"
import {
  addChapterTimeline,
  addStackedReveals,
  measureRailVars,
  seekChapter,
} from "@/components/organisms/about/theatre-stage"

gsap.registerPlugin(useGSAP, Flip, ScrollTrigger, ScrollToPlugin, EasePack)

/** One timeline unit per chapter, plus the deck-to-rail entry ahead of them. */
const ENTRY = 0.6
const SPAN = 1
const THEATRE = "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
const STACKED = "(max-width: 767px) and (prefers-reduced-motion: no-preference)"

type Report = { onChapter: (index: number) => void; onTheatre: (on: boolean) => void }

export function useInterestsTheatre(
  rootRef: React.RefObject<HTMLDivElement | null>,
  count: number,
  report: Report
) {
  const seekRef = useRef<((index: number) => void) | null>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return
      const mm = gsap.matchMedia()
      const total = ENTRY + count * SPAN

      mm.add(THEATRE, () => {
        const viewport = root.querySelector<HTMLElement>(".theatre-viewport")
        const rail = root.querySelector<HTMLElement>(".theatre-rail")
        const chapters = gsap.utils.toArray<HTMLElement>(".chapter", root)
        if (!viewport || !rail || !chapters.length) return

        // Deck → rail: capture the stacked deck, drop the class, and let Flip
        // play the row it becomes. The slots are measured afterwards so every
        // per-chapter fit lands on the row's real geometry.
        const deck = Flip.getState(gsap.utils.toArray(".rail-item", root), { props: "opacity" })
        rail.classList.remove("is-deck")
        const railVars = measureRailVars(root, chapters)

        let current = -1
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: viewport,
            start: "top top",
            end: () => `+=${window.innerHeight * 4.4}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = gsap.utils.clamp(0, count - 1, Math.floor((self.progress * total - ENTRY) / SPAN))
              if (i === current) return
              current = i
              report.onChapter(i)
            },
          },
        })

        tl.add(Flip.from(deck, { duration: ENTRY, ease: "power2.inOut", absolute: true, stagger: 0.05 }), 0)
          .to(".rail-progress", { scaleX: 1, ease: "none", duration: total }, 0)

        chapters.forEach((chapter, i) => {
          const at = ENTRY + i * SPAN
          addChapterTimeline(tl, chapter, railVars, i, at, SPAN)
          addMotifTimeline(tl, chapter, chapter.dataset.motif as InterestMotif, at, SPAN)
        })

        const st = tl.scrollTrigger
        if (st) seekRef.current = (i) => seekChapter(st, i, ENTRY, SPAN, total)
        const remeasure = () => {
          measureRailVars(root, chapters, railVars)
        }
        ScrollTrigger.addEventListener("refreshInit", remeasure)
        report.onTheatre(true)

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", remeasure)
          rail.classList.add("is-deck")
          seekRef.current = null
          report.onTheatre(false)
        }
      })

      mm.add(STACKED, () => addStackedReveals(root))

      return () => mm.revert()
    },
    { scope: rootRef }
  )

  return useCallback((index: number) => seekRef.current?.(index), [])
}
