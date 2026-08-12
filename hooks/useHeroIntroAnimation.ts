"use client"

import { useRef, useEffect, useLayoutEffect } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { useHeroScrollParallax } from "@/hooks/useHeroScrollParallax"

gsap.registerPlugin(SplitText)

const HIDDEN_UNTIL_INTRO =
  ".hero-name-1, .hero-name-2, .hero-title, .hero-bio, .hero-credentials, .hero-cta, .hero-tag, .hero-photo, .hero-scroll-indicator, .hero-scroll-invite"

/**
 * GSAP-based hero intro animation with SplitText.
 *
 * @param isReady - When true, the intro timeline plays (after preloader)
 * @param scope - Ref to the hero <section> for GSAP context scoping
 */
export function useHeroIntroAnimation(
  isReady: boolean,
  scope: React.RefObject<HTMLElement | null>
) {
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const prefersReduced = usePrefersReducedMotion()

  // Call scroll parallax hook (separated concern)
  useHeroScrollParallax(scope, prefersReduced)

  // The intro's start state lives here, not in the markup: hero copy that ships as
  // opacity-0 HTML is not an LCP candidate, so the LCP waited for hydration. Applied
  // in a layout effect (before paint) and only when the intro will actually play, so
  // reduced-motion users get the text straight from the server HTML.
  useLayoutEffect(() => {
    if (prefersReduced || isReady || !scope.current) return
    const q = (sel: string) => scope.current!.querySelectorAll(sel)
    gsap.set(q(HIDDEN_UNTIL_INTRO), { opacity: 0 })
    gsap.set(q(".hero-label"), { clipPath: "inset(0 100% 0 0)" })
    gsap.set(q(".hero-accent-line"), { scaleX: 0 })
  }, [prefersReduced, isReady, scope])

  useEffect(() => {
    if (!isReady || !scope.current) return

    // Reduced motion: show everything immediately
    if (prefersReduced) {
      const all = scope.current.querySelectorAll(
        ".hero-label, .hero-name-1, .hero-name-2, .hero-title, .hero-bio, .hero-credentials, .hero-cta, .hero-photo, .hero-tag, .hero-scroll-indicator, .hero-scroll-invite, .hero-accent-line"
      )
      gsap.set(all, { opacity: 1, y: 0, clipPath: "none" })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tlRef.current = tl

      // 1. Label — clip reveal left to right
      tl.fromTo(".hero-label", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7 }, 0)

      // 2. Name line 1 — SplitText char reveal with rotateX
      const name1El = scope.current!.querySelector(".hero-name-1")
      if (name1El) {
        gsap.set(name1El, { opacity: 1 })
        const split1 = SplitText.create(name1El, { type: "chars" })
        tl.from(split1.chars, { y: 80, rotateX: -90, opacity: 0, stagger: 0.025, duration: 0.9, ease: "power4.out" }, 0.15)
      }

      // 3. Name line 2 — SplitText char reveal
      const name2El = scope.current!.querySelector(".hero-name-2")
      if (name2El) {
        gsap.set(name2El, { opacity: 1 })
        const split2 = SplitText.create(name2El, { type: "chars" })
        tl.from(split2.chars, { y: 80, rotateX: -90, opacity: 0, stagger: 0.025, duration: 0.9, ease: "power4.out" }, 0.3)
      }

      // 4. Red accent line — draw from left
      tl.fromTo(".hero-accent-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" }, 0.7)

      // 5. Title + subtitle — fade in
      tl.fromTo(".hero-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.8)

      // 6. Bio — fade in
      tl.fromTo(".hero-bio", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.95)

      // 7. Credentials
      tl.fromTo(".hero-credentials", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.05)

      // 8. CTAs — stagger
      tl.fromTo(".hero-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, 1.15)

      // 9. Laptop — fade + scale in
      tl.fromTo(".hero-photo", { opacity: 0, scale: 0.9, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.6)

      // 10. Tech tags — stagger fade
      tl.fromTo(".hero-tag", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 }, 1.3)

      // 11. Scroll indicator + invite — fade in
      tl.fromTo(".hero-scroll-indicator, .hero-scroll-invite", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.6)
    }, scope)

    return () => ctx.revert()
  }, [isReady, prefersReduced, scope])

  return tlRef
}
