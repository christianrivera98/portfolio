"use client"

import { useEffect, useRef } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import type { LenisRef } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePreloader } from "@/hooks/usePreloader"

gsap.registerPlugin(ScrollTrigger)

/**
 * Locks scroll while the preloader is on screen. The DOM lock itself is CSS
 * keyed off `data-preloader="run"`, which the gate script stamps before first
 * paint — React only releases it, so a skipped visit is never locked for even
 * one frame. lenis.stop() freezes the scroll position; on completion Lenis
 * resumes and ScrollTrigger refreshes against the settled layout so reveals
 * fire at the correct scroll offsets.
 */
function PreloaderScrollLock() {
  const lenis = useLenis()
  const { isComplete } = usePreloader()

  useEffect(() => {
    const root = document.documentElement
    if (isComplete) {
      if (root.dataset.preloader === "run") root.dataset.preloader = "done"
      lenis?.start()
      ScrollTrigger.refresh()
    } else {
      lenis?.stop()
    }
  }, [lenis, isComplete])

  return null
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      }}
    >
      <PreloaderScrollLock />
      {children}
    </ReactLenis>
  )
}
