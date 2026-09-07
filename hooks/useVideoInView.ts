"use client"

import { useEffect, useRef } from "react"

const VISIBLE_RATIO = 0.5

export function useVideoInView(enabled: boolean) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (!enabled) {
      video.pause()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: VISIBLE_RATIO }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [enabled])

  return ref
}
