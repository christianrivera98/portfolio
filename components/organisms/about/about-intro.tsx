"use client"

import { useTranslations } from "next-intl"
import { AboutPhoto } from "./about-photo"

/**
 * The panel the run opens on: the same editorial grid the section always had —
 * photo, quick facts, pull quote and bio. Its intrinsic height is what sets the
 * height of every interest panel that follows it.
 */
export function AboutIntro() {
  const t = useTranslations("About")
  const bio = t.raw("bio") as string[]

  return (
    <div className="journey-panel journey-panel--intro grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
      <AboutPhoto />

      <div className="flex flex-col gap-6">
        <blockquote className="about-quote font-serif-display text-2xl italic leading-snug text-white/80 md:text-3xl">
          &ldquo;{t("quote")}&rdquo;
        </blockquote>

        {bio.map((paragraph, i) => (
          <p key={i} className="about-bio-p text-base leading-relaxed text-white/60 md:text-lg">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
