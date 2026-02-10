"use client"

import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

export function animateExperienceCards() {
  const cards = gsap.utils.toArray<HTMLElement>(".experience-card")
  cards.forEach((card) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "top 60%",
        toggleActions: "play none none reverse",
      },
    })

    tl.from(card, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" })

    const companyEl = card.querySelector(".experience-company")
    if (companyEl) {
      const companySplit = SplitText.create(companyEl, { type: "chars" })
      tl.from(
        companySplit.chars,
        { y: 25, opacity: 0, stagger: 0.02, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
    }

    tl.from(
      card.querySelector(".experience-role"),
      { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" },
      "-=0.4"
    )

    tl.from(
      card.querySelectorAll(".experience-highlight"),
      { y: 15, opacity: 0, stagger: 0.07, duration: 0.5, ease: "power3.out" },
      "-=0.3"
    )

    const meta = card.querySelector(".experience-meta")
    if (meta) {
      tl.from(
        meta,
        { x: -25, opacity: 0, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      )
    }

    const nextEl = card.parentElement?.querySelector(
      `[data-divider="${card.getAttribute("data-index")}"]`
    )
    if (nextEl) {
      tl.fromTo(
        nextEl,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
    }
  })
}

export function animateTimelineSvg(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const timelineSvg = containerRef.current?.querySelector(
    ".experience-timeline-svg"
  ) as SVGLineElement | null
  if (timelineSvg) {
    const lineLength = timelineSvg.getTotalLength?.() || 800
    gsap.set(timelineSvg, { strokeDasharray: lineLength, strokeDashoffset: lineLength })
    gsap.to(timelineSvg, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: { trigger: ".experience-entries", start: "top 80%", end: "bottom 20%", scrub: 1 },
    })
  }
}

export function animateTimelineDots() {
  gsap.utils.toArray<HTMLElement>(".experience-dot").forEach((dot) => {
    gsap.from(dot, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "back.out(2)",
      scrollTrigger: { trigger: dot, start: "top 82%", toggleActions: "play none none reverse" },
    })
  })
}
