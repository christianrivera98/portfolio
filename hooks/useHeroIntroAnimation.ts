"use client"

import { useRef, useEffect, useLayoutEffect } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { useHeroScrollParallax } from "@/hooks/useHeroScrollParallax"

gsap.registerPlugin(SplitText)

const HIDDEN_UNTIL_INTRO =
  ".hero-name-1, .hero-name-2, .hero-title, .hero-bio, .hero-credentials, .hero-cta, .hero-photo, .hero-scroll-indicator, .hero-scroll-invite"

export function useHeroIntroAnimation(
  isReady: boolean,
  scope: React.RefObject<HTMLElement | null>
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const prefersReduced = usePrefersReducedMotion()

  useHeroScrollParallax(scope, prefersReduced)

  useLayoutEffect(() => {
    if (prefersReduced || isReady || !scope.current) return
    const q = (sel: string) => scope.current!.querySelectorAll(sel)
    gsap.set(q(HIDDEN_UNTIL_INTRO), { opacity: 0 })
    gsap.set(q(".hero-label"), { clipPath: "inset(0 100% 0 0)" })
    gsap.set(q(".hero-accent-line"), { scaleX: 0 })
  }, [prefersReduced, isReady, scope])

  useEffect(() => {
    if (!isReady || !scope.current) return

    if (prefersReduced) {
      const all = scope.current.querySelectorAll(
        ".hero-label, .hero-name-1, .hero-name-2, .hero-title, .hero-bio, .hero-credentials, .hero-cta, .hero-photo, .hero-scroll-indicator, .hero-scroll-invite, .hero-accent-line"
      )
      gsap.set(all, { opacity: 1, y: 0, clipPath: "none" })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tlRef.current = tl

      tl.fromTo(".hero-label", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7 }, 0)

      const name1El = scope.current!.querySelector(".hero-name-1")
      if (name1El) {
        gsap.set(name1El, { opacity: 1 })
        const split1 = SplitText.create(name1El, { type: "chars" })
        tl.from(split1.chars, { y: 80, rotateX: -90, opacity: 0, stagger: 0.025, duration: 0.9, ease: "power4.out" }, 0.15)
      }

      const name2El = scope.current!.querySelector(".hero-name-2")
      if (name2El) {
        gsap.set(name2El, { opacity: 1 })
        const split2 = SplitText.create(name2El, { type: "chars" })
        tl.from(split2.chars, { y: 80, rotateX: -90, opacity: 0, stagger: 0.025, duration: 0.9, ease: "power4.out" }, 0.3)
      }

      tl.fromTo(".hero-accent-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" }, 0.7)

      tl.fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.8)

      tl.fromTo(".hero-bio", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.95)

      tl.fromTo(".hero-credentials", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.05)

      tl.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 1.15)

      tl.fromTo(".hero-photo", { opacity: 0, scale: 0.9, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.6)

      tl.fromTo(".hero-scroll-indicator, .hero-scroll-invite", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.6)
    }, scope)

    return () => ctx.revert()
  }, [isReady, prefersReduced, scope])

  return tlRef
}
