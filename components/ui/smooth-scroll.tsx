"use client"

import { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"
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

/**
 * One loop for the page. Lenis ran its own requestAnimationFrame while GSAP ran
 * the ticker, so the scroll position and everything animating against it
 * advanced on two different clocks. Driving `raf` from the ticker puts them on
 * the same one — the integration Lenis documents for GSAP.
 *
 * It hangs off `useLenis` and not off the provider's ref: the ref is still
 * empty when the provider's own effect runs, so with `autoRaf: false` nothing
 * would ever drive Lenis and the wheel would stop scrolling the page outright.
 */
function GsapTicker() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on("scroll", ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    // Lag smoothing would let GSAP fake elapsed time after a stall, which with
    // the scroll on this same ticker reads as the page jumping.
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off("scroll", ScrollTrigger.update)
      gsap.ticker.remove(update)
    }
  }, [lenis])

  return null
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
        // The GSAP ticker drives `raf`; a second loop here would double-step it.
        autoRaf: false,
      }}
    >
      <GsapTicker />
      <PreloaderScrollLock />
      {children}
    </ReactLenis>
  )
}
