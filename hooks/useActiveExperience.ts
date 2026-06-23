"use client"

import { useEffect, useState } from "react"

/**
 * Tracks which experience period is closest to the viewport center while
 * scrolling, so the sticky tablet can mirror it. Reads `[data-exp-entry]`
 * indices stamped on each entry. rAF-throttled scroll listener.
 */
export function useActiveExperience(count: number) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-exp-entry]"))
    if (!els.length) return

    let raf = 0
    const update = () => {
      raf = 0
      const mid = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = Number(el.dataset.expEntry)
        }
      })
      setActive(best)
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
  }, [count])

  return active
}
