"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function useContactAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLHeadingElement | null>
) {
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return
      // Title — SplitText words with slow stagger
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "words" })
        gsap.from(split.words, {
          y: 60,
          opacity: 0,
          rotateX: -40,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      // Status text fade-in
      gsap.from(".contact-status", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-status",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      })

      // Contact links stagger reveal
      gsap.utils.toArray<HTMLElement>(".contact-link").forEach((link, i) => {
        gsap.from(link, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: link,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        })
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )
}
