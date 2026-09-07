"use client"

import { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { usePreloader } from "@/hooks/usePreloader"

gsap.registerPlugin(ScrollTrigger)

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

function GsapTicker() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on("scroll", ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
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
        autoRaf: false,
      }}
    >
      <GsapTicker />
      <PreloaderScrollLock />
      {children}
    </ReactLenis>
  )
}
