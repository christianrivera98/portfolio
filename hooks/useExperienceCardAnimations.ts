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
  })
}

export function animateTimelinePaint(
  containerRef: React.RefObject<HTMLElement | null>
) {
  const container = containerRef.current
  const entries = container?.querySelector(".experience-entries") as HTMLElement | null
  const line = container?.querySelector(".experience-timeline-svg") as SVGLineElement | null
  if (!container || !entries || !line) return

  const len = line.getTotalLength?.() || 800
  gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })

  const eTop = entries.getBoundingClientRect().top + window.scrollY
  const eH = entries.getBoundingClientRect().height || 1
  const frac = (el: Element) => {
    const r = el.getBoundingClientRect()
    return gsap.utils.clamp(0, 0.95, (r.top + window.scrollY + r.height / 2 - eTop) / eH)
  }

  const tl = gsap.timeline({
    scrollTrigger: { trigger: entries, start: "top 80%", end: "bottom 20%", scrub: 1 },
  })
  tl.fromTo(line, { strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)

  container.querySelectorAll(".experience-badge").forEach((b) =>
    tl.to(b, { borderColor: "hsl(356, 96%, 32%)", ease: "none", duration: 0.05 }, frac(b))
  )
  container.querySelectorAll(".experience-divider").forEach((d) => {
    gsap.set(d, { scaleX: 0, transformOrigin: "left center" })
    tl.to(d, { scaleX: 1, ease: "none", duration: 0.08 }, frac(d))
  })
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
