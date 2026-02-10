"use client"

import { useState, useEffect } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setPrefersReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return prefersReduced
}
