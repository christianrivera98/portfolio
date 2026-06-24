"use client"

import { useCallback, type MouseEvent } from "react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

/**
 * Smooth-scrolls to an in-page anchor (#id) via GSAP, matching the navbar menu
 * so footer links and nav feel identical. Pass "#top" to return to the top.
 */
export function useScrollToSection() {
  return useCallback((e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, hash: string) => {
    const target = hash === "#top" ? 0 : document.querySelector(hash) ? hash : null
    if (target === null) return
    e.preventDefault()
    gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.2, ease: "power3.inOut" })
  }, [])
}
