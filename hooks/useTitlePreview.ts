"use client"

import { type MouseEvent } from "react"
import { useExperienceDetail } from "@/components/organisms/experience/experience-detail.context"

export function useTitlePreview(index: number) {
  const { previewCompany, endPreview } = useExperienceDetail()
  const isLaptop = () => window.matchMedia("(min-width: 1280px) and (max-width: 1535px)").matches

  const onMouseEnter = (e: MouseEvent) => {
    if (!isLaptop()) return
    const tablet = document.querySelector("[data-laptop-tablet]")
    const card = (e.target as HTMLElement).closest("[data-exp-entry]")
    if (!tablet || !card) return
    const tr = tablet.getBoundingClientRect()
    const cr = card.getBoundingClientRect()
    const mid = (tr.top + tr.bottom) / 2
    if (cr.top <= mid && mid <= cr.bottom) previewCompany(index)
  }

  return {
    onMouseEnter,
    onMouseLeave: () => isLaptop() && endPreview(),
  }
}
