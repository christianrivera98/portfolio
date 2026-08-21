"use client"

import { useRef } from "react"
import { ABOUT_PROFILE } from "./about.config"
import { InterestChapter } from "./interest-chapter"

/**
 * The five interests as a scrolled narrative. Below `md`, and whenever the
 * visitor asks for reduced motion, this is a plain stack of chapters that reads
 * top to bottom; the pinned theatre layout is opted into by a media query in
 * `globals.css` so there is no layout flash before the JS decides.
 */
export function InterestsTheatre() {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={rootRef} className="theatre relative">
      <div className="theatre-viewport">
        <div className="theatre-chapters flex flex-col gap-20 md:gap-28">
          {ABOUT_PROFILE.interests.map((interest, i) => (
            <InterestChapter key={interest.id} interest={interest} index={i} loadable />
          ))}
        </div>
      </div>
    </div>
  )
}
