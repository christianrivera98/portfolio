"use client"

import { useTranslations } from "next-intl"
import { ScrollTablet } from "@/components/ui/scroll-tablet"
import { ScrollMouse } from "@/components/ui/scroll-mouse"
import { useActiveExperience } from "@/hooks/useActiveExperience"
import { CompanyCard } from "./company-card"
import { COMPANIES } from "./companies.config"

/**
 * Right-edge rail that overlays the Experience region. The tablet is sticky:
 * as each experience period scrolls past the viewport center, the card mirrors
 * that company's logo + info. Desktop-only.
 */
export function ScrollInvite() {
  const t = useTranslations("Transition")
  const active = useActiveExperience(COMPANIES.length)
  const [firstWord, ...rest] = t("title").split(" ")

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      <div className="sticky top-[12vh] flex justify-end pr-[6%]">
        <div className="w-[380px] xl:w-[420px]">
          {/* Invite title */}
          <div className="mb-5 flex flex-col items-end">
            <h2 className="text-right font-serif-display text-2xl tracking-tight text-white xl:text-3xl">
              <span className="inline-flex items-center">
                {firstWord}
                <ScrollMouse className="mx-3" />
              </span>{" "}
              {rest.join(" ")}
            </h2>
            <p className="mt-2 max-w-xs text-right text-base text-white/40">{t("subtitle")}</p>
          </div>

          {/* Tablet — mirrors the active experience period */}
          <div className="pointer-events-auto">
            <ScrollTablet>
              <CompanyCard index={active} />
            </ScrollTablet>
          </div>
        </div>
      </div>
    </div>
  )
}
