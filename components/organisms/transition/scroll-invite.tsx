"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"
import { ScrollTablet } from "@/components/ui/scroll-tablet"
import { Button } from "@/components/ui/button"
import { useActiveExperience } from "@/hooks/useActiveExperience"
import { useExperienceDetail } from "@/components/organisms/experience/experience-detail.context"
import { ProjectSlides } from "@/components/organisms/experience/detail/project-slides"
import { CompanyCard } from "./company-card"
import { COMPANIES } from "./companies.config"

const TabletBackground = dynamic(
  () => import("./tablet-background").then((m) => m.TabletBackground),
  { ssr: false }
)

/**
 * Desktop sticky tablet. By default it mirrors the company whose period is
 * beside it (scroll-synced). When a project CTA is clicked it renders that
 * project's screenshot slider instead, with a hide button to return to sync.
 */
export function ScrollInvite() {
  const tabletRef = useRef<HTMLDivElement>(null)
  const active = useActiveExperience(COMPANIES.length, tabletRef)
  const { detail, close } = useExperienceDetail()
  const tt = useTranslations("Transition")
  const project = detail?.kind === "project" ? detail.projectId : null

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden 2xl:block">
      <div className="sticky top-[12vh] flex justify-end pr-[5%]">
        <div ref={tabletRef} className="pointer-events-auto relative w-115 xl:w-145">
          <ScrollTablet background={<TabletBackground />}>
            {project ? <ProjectSlides projectId={project} /> : <CompanyCard index={active} />}
          </ScrollTablet>
          {project && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={tt("hide")}
              onClick={close}
              className="absolute -right-2 -top-2 rounded-full border border-white/15 bg-[#0a0a0a] text-white/70 shadow-lg hover:bg-[#161616] hover:text-white"
            >
              <X />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
