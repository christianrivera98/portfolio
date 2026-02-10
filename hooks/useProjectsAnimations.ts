"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

export function useProjectsAnimations(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLHeadingElement | null>
) {
  useGSAP(
    () => {
      // Section label clip-path reveal
      gsap.fromTo(
        ".projects-label",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-label", start: "top 90%", toggleActions: "play none none reverse" },
        }
      )

      // Title SplitText reveal
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, { type: "chars" })
        gsap.from(split.chars, {
          y: 80, opacity: 0, rotateX: -90, stagger: 0.04, duration: 1, ease: "power4.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", end: "top 50%", toggleActions: "play none none reverse" },
        })
      }

      // Subtitle reveal
      gsap.from(".projects-subtitle", {
        y: 25, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".projects-subtitle", start: "top 88%", toggleActions: "play none none reverse" },
      })

      // Accent line draw
      gsap.fromTo(
        ".projects-accent-line",
        { scaleX: 0 },
        {
          scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut",
          scrollTrigger: { trigger: ".projects-accent-line", start: "top 88%", toggleActions: "play none none reverse" },
        }
      )

      // Featured project reveal
      const featured = containerRef.current?.querySelector(".featured-project")
      if (featured) {
        gsap.from(featured, {
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: featured, start: "top 85%", toggleActions: "play none none reverse" },
        })
        // Parallax on featured image
        const img = featured.querySelector(".featured-image")
        if (img) {
          gsap.to(img, {
            yPercent: -8, ease: "none",
            scrollTrigger: { trigger: featured, start: "top bottom", end: "bottom top", scrub: true },
          })
        }
      }

      // Secondary cards stagger
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.from(card, {
          y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
        })
      })
    },
    { scope: containerRef }
  )
}
