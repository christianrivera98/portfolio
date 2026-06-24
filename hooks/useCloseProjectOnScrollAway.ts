"use client"

import { useEffect, useRef } from "react"
import { EXPERIENCE_ENTRIES } from "@/components/organisms/experience/experience.config"
import { useExperienceDetail } from "@/components/organisms/experience/experience-detail.context"

/**
 * While a project is pinned open, watch the scroll-synced active experience
 * (`active` = data-exp-entry index beside the tablet). Once the project's own
 * experience has been beside the tablet (armed), scrolling onto a *different*
 * experience closes the project — so the surface reverts to that experience:
 * desktop shows its company card, laptop folds the tablet away.
 */
export function useCloseProjectOnScrollAway(active: number | null) {
  const { detail, close } = useExperienceDetail()
  const armed = useRef(false)

  useEffect(() => {
    if (detail?.kind !== "project") {
      armed.current = false
      return
    }
    const idx = EXPERIENCE_ENTRIES.findIndex((e) => e.projectId === detail.projectId)
    if (idx === -1) return
    if (active === idx) armed.current = true
    else if (armed.current && active !== null) close()
  }, [active, detail, close])
}
