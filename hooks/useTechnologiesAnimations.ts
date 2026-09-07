"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function useTechnologiesAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLHeadingElement | null>
) {
  const prefersReduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      if (prefersReduced) return
      gsap.set(".tech-accent-line", { scaleX: 0 })
      gsap.fromTo(
        ".tech-label",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-label",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )

      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "words,chars" })
        gsap.from(split.chars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.04,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        })
      }

      gsap.set(".tech-subtitle", { opacity: 0, y: 25 })
      ScrollTrigger.create({
        trigger: ".tech-subtitle",
        start: "top bottom-=40",
        once: true,
        onEnter: () =>
          gsap.to(".tech-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
      })

      gsap.fromTo(
        ".tech-accent-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".tech-accent-line",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.set(".process-card", { opacity: 0, y: 50 })
      ScrollTrigger.create({
        trigger: ".tech-bento",
        start: "top bottom-=80",
        once: true,
        onEnter: () =>
          gsap.to(".process-card", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          }),
      })

      ScrollTrigger.refresh()
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )
}
