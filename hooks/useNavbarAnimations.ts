"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"
import { getScrollHold } from "@/lib/scroll-hold"

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

  // Scroll progress bar. A pinned run (About) eats page scroll without moving
  // the reader through content, so that stretch is discounted: the bar holds
  // while the run is being scrubbed and carries on once it is done.
  useGSAP(() => {
    const bar = progressRef.current
    if (!bar) return
    gsap.set(bar, { transformOrigin: "left center", scaleX: 0 })
    const to = gsap.quickTo(bar, "scaleX", { duration: 0.3, ease: "none" })

    // `max` arrives from the trigger instead of being measured here: reading
    // the document size on every scroll event forces a reflow per frame, which
    // is worth ~700ms frames on a throttled phone.
    const paint = (max: number) => {
      const hold = getScrollHold()
      const y = window.scrollY
      const span = hold ? Math.max(0, hold.end - hold.start) : 0
      const eaten = hold ? gsap.utils.clamp(0, span, y - hold.start) : 0
      const scrollable = max - span
      to(scrollable > 0 ? gsap.utils.clamp(0, 1, (y - eaten) / scrollable) : 0)
    }

    // No trigger element: a pinned run elsewhere resizes the page under it, and
    // a document-bound trigger stops updating once its own end goes stale.
    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      // Last to refresh, so the page size it reads already includes the space
      // any pinned run added.
      refreshPriority: -1,
      onUpdate: (self) => paint(self.end),
      onRefresh: (self) => paint(self.end),
    })

    return () => trigger.kill()
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
