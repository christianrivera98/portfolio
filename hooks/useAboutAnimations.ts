"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function useAboutAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLHeadingElement | null>
) {
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return
      const trigger = (el: string | Element, start = "top 88%") => ({
        trigger: el,
        start,
        toggleActions: "play none none reverse" as const,
      })

      // Section label clip-path reveal
      gsap.fromTo(
        ".about-label",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out", scrollTrigger: trigger(".about-label", "top 90%") }
      )

      // Title SplitText reveal
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "chars" })
        gsap.from(split.chars, {
          y: 80, opacity: 0, rotateX: -90, stagger: 0.04, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        })
      }

      // Accent line
      gsap.fromTo(
        ".about-accent-line",
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut", scrollTrigger: trigger(".about-accent-line") }
      )

      // Photo mask reveal (clip-path from top)
      gsap.to(".about-photo", {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: trigger(".about-photo", "top 80%"),
      })

      // Pull quote — SplitText words
      const quoteEl = containerRef.current?.querySelector(".about-quote")
      if (quoteEl) {
        const split = SplitText.create(quoteEl, { type: "words" })
        gsap.from(split.words, {
          y: 30, opacity: 0, stagger: 0.03, duration: 0.8, ease: "power3.out",
          scrollTrigger: trigger(quoteEl),
        })
      }

      // Bio paragraphs stagger
      gsap.utils.toArray<HTMLElement>(".about-bio-p").forEach((p, i) => {
        gsap.from(p, {
          y: 25, opacity: 0, duration: 0.7, ease: "power3.out", delay: i * 0.12,
          scrollTrigger: trigger(p),
        })
      })

      // Quick facts stagger
      gsap.utils.toArray<HTMLElement>(".about-fact").forEach((fact, i) => {
        gsap.from(fact, {
          x: -20, opacity: 0, duration: 0.5, ease: "power3.out", delay: i * 0.08,
          scrollTrigger: trigger(fact),
        })
      })

      // Interest cards stagger
      gsap.utils.toArray<HTMLElement>(".interest-card").forEach((card, i) => {
        gsap.from(card, {
          y: 30, opacity: 0, duration: 0.6, ease: "power3.out", delay: i * 0.08,
          scrollTrigger: trigger(card, "top 90%"),
        })
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )
}
