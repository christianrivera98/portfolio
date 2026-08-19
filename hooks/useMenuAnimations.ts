"use client"

import { useLayoutEffect, useEffect } from "react"
import gsap from "gsap"
import { usePrefersReducedMotion } from "./usePrefersReducedMotion"

/**
 * Staggered animation for menu items and social links.
 * Animates on open, resets on close.
 */
export function useMenuAnimations(
  open: boolean,
  listRef: React.RefObject<HTMLUListElement | null>
) {
  const prefersReduced = usePrefersReducedMotion()

  // Stagger animation on open
  useLayoutEffect(() => {
    if (!open || !listRef.current) return

    if (prefersReduced) {
      gsap.set(listRef.current.children, { y: 0, opacity: 1 })
      gsap.set(".menu-social-link", { y: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current!.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.15 }
      )

      gsap.fromTo(
        ".menu-social-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.05, delay: 0.5 }
      )
    })

    return () => ctx.revert()
  }, [open, listRef, prefersReduced])

  // Reset items when closed
  useEffect(() => {
    if (open || !listRef.current) return
    gsap.set(listRef.current.children, { y: prefersReduced ? 0 : 40, opacity: 0 })
    gsap.set(".menu-social-link", { y: prefersReduced ? 0 : 20, opacity: 0 })
  }, [open, listRef, prefersReduced])
}
