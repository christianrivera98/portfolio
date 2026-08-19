"use client"

import { useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SECTIONS = ["home", "experience", "technologies", "about", "contact"]

export function useSectionIndicator() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    SECTIONS.forEach((id, index) => {
      const el = document.getElementById(id)
      if (!el) return

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        })
      )
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return {
    current: activeIndex + 1,
    total: SECTIONS.length,
    label: String(activeIndex + 1).padStart(2, "0"),
    totalLabel: String(SECTIONS.length).padStart(2, "0"),
  }
}
