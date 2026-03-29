"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"
import {
  animateExperienceCards,
  animateTimelineSvg,
  animateTimelineDots,
} from "./useExperienceCardAnimations"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function useExperienceAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLHeadingElement | null>
) {
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return
      // Section label: clip-path reveal
      gsap.fromTo(
        ".experience-label",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".experience-label", start: "top 90%", toggleActions: "play none none reverse" },
        }
      )

      // Section title: SplitText character reveal
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "chars" })
        gsap.from(split.chars, {
          y: 80, opacity: 0, rotateX: -90, stagger: 0.04, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", end: "top 50%", toggleActions: "play none none reverse" },
        })
      }

      // Subtitle reveal
      gsap.from(".experience-subtitle", {
        y: 25, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".experience-subtitle", start: "top 88%", toggleActions: "play none none reverse" },
      })

      // Accent line draw
      gsap.fromTo(
        ".experience-accent-line",
        { scaleX: 0 },
        {
          scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut",
          scrollTrigger: { trigger: ".experience-accent-line", start: "top 88%", toggleActions: "play none none reverse" },
        }
      )

      // Timeline + cards + dots (extracted)
      animateTimelineSvg(containerRef)
      animateExperienceCards()
      animateTimelineDots()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )
}
