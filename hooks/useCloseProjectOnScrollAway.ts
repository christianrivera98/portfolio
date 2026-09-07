"use client"

import { useEffect, useRef } from "react"
import { EXPERIENCE_ENTRIES } from "@/components/organisms/experience/experience.config"
import { useExperienceDetail } from "@/components/organisms/experience/experience-detail.context"

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
