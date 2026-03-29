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
      // Section label clip-path reveal
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

      // Title SplitText reveal
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "chars" })
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

      // Subtitle reveal
      gsap.from(".tech-subtitle", {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".tech-subtitle",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      })

      // Accent line draw
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

      // Layers build-up stagger
      gsap.utils.toArray<HTMLElement>(".tech-layer").forEach((layer, i) => {
        gsap.from(layer, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: layer,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })

        // Items within each layer
        const items = layer.querySelectorAll(".tech-item")
        gsap.from(items, {
          y: 20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
          delay: i * 0.08 + 0.2,
          scrollTrigger: {
            trigger: layer,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        })
      })
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )
}
