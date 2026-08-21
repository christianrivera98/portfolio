"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useAboutJourney } from "@/hooks/useAboutJourney"
import { ABOUT_PROFILE } from "./about.config"
import { AboutIntro } from "./about-intro"
import { InterestPanel } from "./interest-panel"
import { JourneyJumps } from "./journey-jumps"
import { JourneyProgress } from "./journey-progress"

/**
 * The section as one run: the editorial intro, then the five interests, all at
 * the intro grid's height. Above `lg` the run is horizontal and the scroll
 * drives it, bracketed by the two progress bars; below that, and for anyone
 * asking for reduced motion, the same markup stacks and reads top to bottom.
 */
export function AboutJourney() {
  const rootRef = useRef<HTMLDivElement>(null)
  const t = useTranslations("About")
  const [active, setActive] = useState(-1)
  const [horizontal, setHorizontal] = useState(false)
  const interests = ABOUT_PROFILE.interests

  const seek = useAboutJourney(rootRef, {
    onChapter: setActive,
    onHorizontal: setHorizontal,
  })

  return (
    <div ref={rootRef} className="journey relative">
      <JourneyProgress />

      <div className="journey-viewport">
        <JourneyJumps
          labels={interests.map((interest) => t(`interests.${interest.id}`))}
          active={active}
          onSelect={seek}
        />

        <div className="journey-track">
          <AboutIntro />

          {interests.map((interest, i) => (
            <InterestPanel
              key={interest.id}
              interest={interest}
              index={i}
              // Only the panel on centre and the one arriving earn a src, so
              // crossing the run never costs five downloads at once.
              loadable={!horizontal || i <= active + 1}
              playable={!horizontal || i === active || i === active + 1}
            />
          ))}
        </div>
      </div>

      <JourneyProgress />
    </div>
  )
}
