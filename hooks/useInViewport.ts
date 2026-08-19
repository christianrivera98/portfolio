"use client"

import { useEffect, useState, type RefObject } from "react"

/**
 * Whether an element is worth rendering into right now: on screen *and* on a
 * visible tab. Written for WebGL canvases, which otherwise keep drawing at full
 * rate while the visitor reads a section far below them.
 *
 * `rootMargin` widens the band so a canvas wakes up slightly before it scrolls
 * into view instead of popping in.
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  { rootMargin = "200px" }: { rootMargin?: string } = {}
): boolean {
  const [onScreen, setOnScreen] = useState(false)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  useEffect(() => {
    const sync = () => setTabVisible(!document.hidden)
    sync()
    document.addEventListener("visibilitychange", sync)
    return () => document.removeEventListener("visibilitychange", sync)
  }, [])

  return onScreen && tabVisible
}
