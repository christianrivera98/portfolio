"use client"

import { useCallback, useEffect } from "react"
import gsap from "gsap"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

const HOLD_AFTER_DONE = 0.5
const FADE_DURATION = 0.6

interface PreloaderExit {
  prefersReduced: boolean
  onTerminalComplete: () => void
}

export function usePreloaderExit(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onComplete: () => void,
  onUnmount: () => void
): PreloaderExit {
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!prefersReduced) return
    onComplete()
    onUnmount()
  }, [prefersReduced, onComplete, onUnmount])

  const onTerminalComplete = useCallback(() => {
    gsap.delayedCall(HOLD_AFTER_DONE, () => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: FADE_DURATION,
        ease: "power2.inOut",
        onComplete: () => {
          onComplete()
          gsap.delayedCall(0.1, onUnmount)
        },
      })
    })
  }, [containerRef, onComplete, onUnmount])

  return { prefersReduced, onTerminalComplete }
}
