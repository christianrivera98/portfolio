"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function SectionDivider() {
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!lineRef.current) return
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    )
  })

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 md:px-16 py-2">
      <div
        ref={lineRef}
        className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[hsl(356,96%,32%)]/20 to-transparent scale-x-0"
      />
    </div>
  )
}
