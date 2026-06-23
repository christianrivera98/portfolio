"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Scales a fixed-size stage to fully cover its container (object-fit: cover),
 * measuring the container with a ResizeObserver. Returns the ref to attach to
 * the container and the computed cover scale factor.
 */
export function useCoverScale(stageWidth: number, stageHeight: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setScale(Math.max(width / stageWidth, height / stageHeight))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [stageWidth, stageHeight])

  return { ref, scale }
}
