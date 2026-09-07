"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"
import { getScrollHold } from "@/lib/scroll-hold"

gsap.registerPlugin(useGSAP, ScrollTrigger)

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

  useGSAP(() => {
    if (!isComplete || !navRef.current) return
    if (prefersReduced) { gsap.set(navRef.current, { opacity: 1 }); return }
    gsap.fromTo(navRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.3 })
  }, { dependencies: [isComplete, prefersReduced] })

  useGSAP(() => {
    const bar = progressRef.current
    if (!bar) return
    gsap.set(bar, { transformOrigin: "left center", scaleX: 0 })
    const to = gsap.quickTo(bar, "scaleX", { duration: 0.3, ease: "none" })

    const paint = (max: number) => {
      const hold = getScrollHold()
      const y = window.scrollY
      const span = hold ? Math.max(0, hold.end - hold.start) : 0
      const eaten = hold ? gsap.utils.clamp(0, span, y - hold.start) : 0
      const scrollable = max - span
      to(scrollable > 0 ? gsap.utils.clamp(0, 1, (y - eaten) / scrollable) : 0)
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      refreshPriority: -1,
      onUpdate: (self) => paint(self.end),
      onRefresh: (self) => paint(self.end),
    })

    return () => trigger.kill()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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
