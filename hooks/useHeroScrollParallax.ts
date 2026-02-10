"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * GSAP scroll parallax effects for hero section.
 * Animates content, photo, and scroll indicator on scroll.
 *
 * @param scope - Ref to the hero <section>
 * @param prefersReduced - Whether user prefers reduced motion
 */
export function useHeroScrollParallax(
  scope: React.RefObject<HTMLElement | null>,
  prefersReduced: boolean
) {
  useEffect(() => {
    if (!scope.current || prefersReduced) return

    const ctx = gsap.context(() => {
      // Hero content parallax — moves up at 0.5x speed on scroll out
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

      // Photo parallax — moves slightly slower
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

      // Scroll indicator — disappears quickly
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
