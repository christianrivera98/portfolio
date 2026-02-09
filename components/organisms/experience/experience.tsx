"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import {
  EXPERIENCE_ENTRIES,
  EXPERIENCE_SECTION,
  type ExperienceEntry,
} from "./experience.config"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

function ExperienceCard({
  entry,
  index,
}: {
  entry: ExperienceEntry
  index: number
}) {
  return (
    <div
      className="experience-card group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 md:py-14"
      data-index={index}
    >
      {/* Left: Period + Type badge */}
      <div className="experience-meta flex flex-col gap-2 md:text-right">
        <span className="text-sm font-mono tracking-wide text-white/40">
          {entry.period}
        </span>
        <span
          className={`inline-block w-fit md:ml-auto text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
            entry.type === "fulltime"
              ? "border-white/20 text-white/50"
              : "border-white/10 text-white/30"
          }`}
        >
          {entry.type === "fulltime" ? "Full-time" : "Freelance"}
        </span>
      </div>

      {/* Right: Content */}
      <div className="flex flex-col gap-4">
        {/* Company & Role */}
        <div className="flex flex-col gap-1">
          <h3 className="experience-company font-serif-display text-2xl md:text-3xl text-white tracking-tight">
            {entry.company}
            {entry.location && (
              <span className="text-white/30 text-lg ml-2 font-sans">
                {entry.location}
              </span>
            )}
          </h3>
          <p className="experience-role text-base md:text-lg text-white/60 font-medium">
            {entry.role}
          </p>
        </div>

        {/* Highlights */}
        <ul className="experience-highlights flex flex-col gap-3 mt-2">
          {entry.highlights.map((highlight, i) => (
            <li
              key={i}
              className="experience-highlight relative pl-5 text-sm md:text-[15px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors duration-300"
            >
              <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-[hsl(356_96%_32%)] opacity-60" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      // -- Section title: SplitText character reveal --
      if (titleRef.current) {
        const split = SplitText.create(titleRef.current, {
          type: "chars",
        })

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

      // -- Subtitle line reveal --
      gsap.from(".experience-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-subtitle",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })

      // -- Section label slide in --
      gsap.from(".experience-label", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-label",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })

      // -- Timeline line grows on scroll --
      gsap.from(".experience-timeline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-entries",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      })

      // -- Each card staggered reveal --
      const cards = gsap.utils.toArray<HTMLElement>(".experience-card")
      cards.forEach((card, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        })

        // Card slide up
        tl.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })

        // Company name split text
        const companyEl = card.querySelector(".experience-company")
        if (companyEl) {
          const companySplit = SplitText.create(companyEl, {
            type: "chars",
          })
          tl.from(
            companySplit.chars,
            {
              y: 30,
              opacity: 0,
              stagger: 0.02,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.5"
          )
        }

        // Role text
        tl.from(
          card.querySelector(".experience-role"),
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // Highlights stagger
        const highlights = card.querySelectorAll(".experience-highlight")
        tl.from(
          highlights,
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        )

        // Meta (period + badge)
        tl.from(
          card.querySelector(".experience-meta"),
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        )

        // Divider line draw in
        const divider = card.nextElementSibling
        if (divider?.classList.contains("experience-divider")) {
          tl.from(
            divider,
            {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.8,
              ease: "power2.inOut",
            },
            "-=0.3"
          )
        }
      })

      // -- Dot pulse on timeline --
      gsap.utils.toArray<HTMLElement>(".experience-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(356_96%_22%)] opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <span className="experience-label inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/30 mb-4">
            {EXPERIENCE_SECTION.label}
          </span>
          <h2
            ref={titleRef}
            className="font-serif-display text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
            style={{ perspective: "400px" }}
          >
            {EXPERIENCE_SECTION.title}
          </h2>
          <p className="experience-subtitle mt-4 text-base md:text-lg text-white/40 max-w-md">
            {EXPERIENCE_SECTION.subtitle}
          </p>
        </div>

        {/* Experience Entries with Timeline */}
        <div className="experience-entries relative">
          {/* Vertical timeline line (desktop only) */}
          <div className="experience-timeline-line hidden md:block absolute left-[200px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {EXPERIENCE_ENTRIES.map((entry, index) => (
            <div key={entry.id} className="relative">
              {/* Timeline dot (desktop only) */}
              <div className="experience-dot hidden md:block absolute left-[197px] top-12 w-[7px] h-[7px] rounded-full bg-white/30 ring-4 ring-black z-10" />

              <ExperienceCard entry={entry} index={index} />

              {/* Divider between entries */}
              {index < EXPERIENCE_ENTRIES.length - 1 && (
                <div className="experience-divider h-px bg-gradient-to-r from-white/[0.06] via-white/[0.12] to-white/[0.06]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
