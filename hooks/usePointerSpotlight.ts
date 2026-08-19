"use client"

import { useEffect, type RefObject } from "react"

const MAX_TILT_DEG = 5

/**
 * Publishes the pointer position on the element as custom properties: `--mx` /
 * `--my` in pixels for a spotlight, and `--rx` / `--ry` in degrees for a tilt.
 *
 * Pixels, not percentages, so the spotlight can be moved with a transform
 * instead of repainting a gradient every frame. Writes are coalesced into one
 * rAF, since pointermove fires far more often than the display refreshes.
 */
export function usePointerSpotlight(
  ref: RefObject<HTMLElement | null>,
  enabled = true
): void {
  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    let frame = 0
    let pending: { x: number; y: number; rx: number; ry: number } | null = null

    const flush = () => {
      frame = 0
      if (!pending) return
      element.style.setProperty("--mx", `${pending.x}px`)
      element.style.setProperty("--my", `${pending.y}px`)
      element.style.setProperty("--rx", `${pending.rx}deg`)
      element.style.setProperty("--ry", `${pending.ry}deg`)
      pending = null
    }

    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect()
      const x = event.clientX - box.left
      const y = event.clientY - box.top
      pending = {
        x,
        y,
        rx: (0.5 - y / box.height) * 2 * MAX_TILT_DEG,
        ry: (x / box.width - 0.5) * 2 * MAX_TILT_DEG,
      }
      if (!frame) frame = requestAnimationFrame(flush)
    }

    const onLeave = () => {
      element.style.setProperty("--rx", "0deg")
      element.style.setProperty("--ry", "0deg")
    }

    element.addEventListener("pointermove", onMove, { passive: true })
    element.addEventListener("pointerleave", onLeave)
    return () => {
      element.removeEventListener("pointermove", onMove)
      element.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, enabled])
}
