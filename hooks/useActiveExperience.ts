"use client"

import { useEffect, useState, type RefObject } from "react"

/**
 * Returns the experience period currently *beside* the sticky tablet, or null
 * when none is (idle state). Matches the entry whose vertical bounds contain
 * the tablet's center line — so the card only mirrors a company while that
 * company's period is actually next to the tablet. rAF-throttled.
 */
export function useActiveExperience(count: number, tabletRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-exp-entry]"))
    if (!els.length) return

    let raf = 0
    const update = () => {
      raf = 0
      const tablet = tabletRef.current
      if (!tablet) return
      const rect = tablet.getBoundingClientRect()
      const mid = (rect.top + rect.bottom) / 2
      let beside: number | null = null
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= mid && mid <= r.bottom) beside = Number(el.dataset.expEntry)
      })
      setActive(beside)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [count, tabletRef])

  return active
}
