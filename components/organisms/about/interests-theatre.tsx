"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useInterestsTheatre } from "@/hooks/useInterestsTheatre"
import { ABOUT_PROFILE } from "./about.config"
import { InterestChapter } from "./interest-chapter"
import { InterestRail } from "./interest-rail"

/**
 * The five interests as a scrolled narrative. On a pinned viewport each one
 * zooms out of the rail, holds the stage with its copy and motif, and parks
 * back. Below `md`, and whenever the visitor asks for reduced motion, the same
 * markup is a plain stack of chapters — that layout is CSS, not JS, so nothing
 * flashes before hydration.
 */
export function InterestsTheatre() {
  const rootRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("About")
  const [active, setActive] = useState(0)
  const [theatre, setTheatre] = useState(false)
  const interests = ABOUT_PROFILE.interests

  const seek = useInterestsTheatre(rootRef, interests.length, {
    onChapter: setActive,
    onTheatre: setTheatre,
  })

  return (
    <div ref={rootRef} className="theatre relative">
      <div className="theatre-viewport">
        <div className="theatre-chapters flex flex-col gap-20 md:gap-28">
          {interests.map((interest, i) => (
            <InterestChapter
              key={interest.id}
              interest={interest}
              index={i}
              // In the theatre only the chapter on stage and the next one earn
              // a src, so scrolling past never costs five downloads.
              loadable={!theatre || i <= active + 1}
              playable={!theatre || i === active}
            />
          ))}
        </div>
        <InterestRail
          labels={interests.map((interest) => t(`interests.${interest.id}`))}
          active={active}
          onSelect={seek}
        />
      </div>
    </div>
  )
}
