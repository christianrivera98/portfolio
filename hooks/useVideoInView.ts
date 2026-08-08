"use client"

import { useEffect, useRef } from "react"

// Half the slide visible before it earns the download.
const VISIBLE_RATIO = 0.5

/**
 * Plays a muted clip only while it is on screen. Paired with `preload="none"`
 * this is what keeps a project's other slides from downloading: `autoPlay`
 * overrides the preload hint and pulls every clip in the track at once.
 */
export function useVideoInView(enabled: boolean) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video || !enabled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // play() rejects when the element is detached mid-scroll; nothing to do.
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
