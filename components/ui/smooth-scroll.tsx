"use client"

import { useEffect, useRef } from "react"
import { ReactLenis } from "lenis/react"
import type { LenisRef } from "lenis/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
      {children}
    </ReactLenis>
  )
}
