"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"
import { ScrollTablet } from "@/components/ui/scroll-tablet"
import { useActiveExperience } from "@/hooks/useActiveExperience"
import { CompanyCard } from "./company-card"
import { COMPANIES } from "./companies.config"

const TabletBackground = dynamic(
  () => import("./tablet-background").then((m) => m.TabletBackground),
  { ssr: false }
)

/**
 * Right-edge rail that overlays the Experience region. Only the tablet is
 * sticky: as each experience period scrolls past the viewport center, the card
 * mirrors that company's logo + info. The invite text lives in the Hero.
 * Desktop-only.
 */
export function ScrollInvite() {
  const tabletRef = useRef<HTMLDivElement>(null)
  const active = useActiveExperience(COMPANIES.length, tabletRef)

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      <div className="sticky top-[12vh] flex justify-end pr-[5%]">
        <div ref={tabletRef} className="pointer-events-auto w-115 xl:w-145">
          <ScrollTablet background={<TabletBackground />}>
            <CompanyCard index={active} />
          </ScrollTablet>
        </div>
      </div>
    </div>
  )
}
