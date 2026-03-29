"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * All navbar animations: fade-in, scroll progress, scroll detection, hamburger transform.
 *
 * @returns scrolled - Boolean indicating if user has scrolled past threshold
 */
export function useNavbarAnimations(
  navRef: React.RefObject<HTMLElement | null>,
  progressRef: React.RefObject<HTMLDivElement | null>,
  topLineRef: React.RefObject<HTMLSpanElement | null>,
  bottomLineRef: React.RefObject<HTMLSpanElement | null>,
  isComplete: boolean,
  menuOpen: boolean
) {
  const [scrolled, setScrolled] = useState(false)
  const prefersReduced = usePrefersReducedMotion()

  // Navbar fade-in after preloader
  useGSAP(() => {
    if (!isComplete || !navRef.current) return
    if (prefersReduced) { gsap.set(navRef.current, { opacity: 1 }); return }
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 })
  }, { dependencies: [isComplete, prefersReduced] })

  // Scroll progress bar
  useGSAP(() => {
    if (!progressRef.current) return
    gsap.to(progressRef.current, {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
    })
  }, [])

  // Detect scroll for backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Hamburger → X animation
  useGSAP(() => {
    if (!topLineRef.current || !bottomLineRef.current) return
    if (menuOpen) {
      gsap.to(topLineRef.current, { rotation: 45, y: 4, duration: 0.3, ease: "power2.inOut" })
      gsap.to(bottomLineRef.current, { rotation: -45, y: -4, duration: 0.3, ease: "power2.inOut" })
    } else {
      gsap.to(topLineRef.current, { rotation: 0, y: 0, duration: 0.3, ease: "power2.inOut" })
      gsap.to(bottomLineRef.current, { rotation: 0, y: 0, duration: 0.3, ease: "power2.inOut" })
    }
  }, { dependencies: [menuOpen] })

  return scrolled
}
