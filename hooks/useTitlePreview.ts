"use client"

import { type MouseEvent } from "react"
import { useExperienceDetail } from "@/components/organisms/experience/experience-detail.context"

/**
 * Hover handlers for an experience title: preview the company on the laptop
 * tablet, but only while that experience is beside the tablet (its bounds cross
 * the tablet's vertical center). Laptop+ only so touch taps never fire it.
 */
export function useTitlePreview(index: number) {
  const { previewCompany, endPreview } = useExperienceDetail()
  const isLaptop = () => window.matchMedia("(min-width: 1280px)").matches

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
