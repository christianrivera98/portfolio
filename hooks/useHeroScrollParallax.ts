"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useHeroScrollParallax(
  scope: React.RefObject<HTMLElement | null>,
  prefersReduced: boolean
) {
  useEffect(() => {
    if (!scope.current || prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.to(".hero-content", {
        yPercent: -15,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(".hero-photo", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(".hero-scroll-indicator", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#home",
          start: "5% top",
          end: "15% top",
          scrub: true,
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [scope, prefersReduced])
}
