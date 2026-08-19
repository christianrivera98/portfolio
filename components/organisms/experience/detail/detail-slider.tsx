"use client"

import { CompanyCard } from "@/components/organisms/transition/company-card"
import { useExperienceDetail } from "../experience-detail.context"
import { ProjectSlides } from "./project-slides"

/**
 * Routes the shared detail surface to the right content: a single company card
 * or a project screenshot slider, based on the open detail in context.
 */
export function DetailSlider() {
  const { detail } = useExperienceDetail()

  if (!detail) return null
  if (detail.kind === "company") return <CompanyCard index={detail.index} />
  return <ProjectSlides projectId={detail.projectId} />
}
