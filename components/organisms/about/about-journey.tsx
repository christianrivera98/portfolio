"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useAboutJourney } from "@/hooks/useAboutJourney"
import { ABOUT_PROFILE } from "./about.config"
import { AboutIntro } from "./about-intro"
import { InterestPanel } from "./interest-panel"
import { JourneyJumps } from "./journey-jumps"
import { JourneyProgress } from "./journey-progress"

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
