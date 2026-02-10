"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

gsap.registerPlugin(useGSAP)

export function usePreloaderAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onComplete: () => void,
  onUnmount: () => void
) {
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (!containerRef.current) return

      if (prefersReduced) {
        onComplete()
        onUnmount()
        return
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete()
          gsap.delayedCall(0.1, () => onUnmount())
        },
      })

      tl.fromTo(
        ".preloader-initials",
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 0.8, ease: "power4.out" }
      )

      tl.fromTo(
        ".preloader-line",
        { strokeDashoffset: 200 },
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
        "-=0.3"
      )

      tl.to(".preloader-initials", {
        scale: 1.02,
        duration: 0.3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })

      tl.to([".preloader-initials", ".preloader-line-container"], {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power2.in",
      })

      tl.to(
        ".preloader-top",
        { yPercent: -100, duration: 0.8, ease: "power3.inOut" },
        "-=0.1"
      )

      tl.to(
        ".preloader-bottom",
        { yPercent: 100, duration: 0.8, ease: "power3.inOut" },
        "<"
      )
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )
}
