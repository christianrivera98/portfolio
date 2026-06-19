"use client"

import { useEffect, useRef } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import type { LenisRef } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePreloader } from "@/hooks/usePreloader"

gsap.registerPlugin(ScrollTrigger)

/**
 * Locks scroll while the preloader is on screen. lenis.stop() freezes the
 * scroll position; overflow:hidden hides the native scrollbar. On completion
 * Lenis resumes and ScrollTrigger refreshes against the settled layout so
 * reveals fire at the correct scroll offsets.
 */
function PreloaderScrollLock() {
  const lenis = useLenis()
  const { isComplete } = usePreloader()

  // DOM lock applies immediately (before lenis is ready) so there is no
  // unlocked gap while the preloader is on screen; lenis.stop()/start()
  // run once the instance exists.
  useEffect(() => {
    const root = document.documentElement
    const { body } = document
    if (isComplete) {
      root.style.removeProperty("overflow")
      body.style.removeProperty("overflow")
      body.style.removeProperty("position")
      body.style.removeProperty("width")
      lenis?.start()
      ScrollTrigger.refresh()
    } else {
      root.style.overflow = "hidden"
      body.style.overflow = "hidden"
      body.style.position = "fixed"
      body.style.width = "100%"
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
