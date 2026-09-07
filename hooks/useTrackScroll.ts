"use client"

import { useRef, useEffect, useCallback, type PointerEvent } from "react"

export function useTrackScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const drag = useRef({ down: false, startX: 0, scroll: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const raw = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (raw === 0) return
      const max = el.scrollWidth - el.clientWidth
      if ((el.scrollLeft <= 0 && raw < 0) || (el.scrollLeft >= max && raw > 0)) return
      el.scrollLeft += raw * 2.2
      e.preventDefault()
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [])

  const onPointerDown = useCallback((e: PointerEvent<T>) => {
    const el = ref.current
    if (!el || e.pointerType === "touch") return
    drag.current = { down: true, startX: e.clientX, scroll: el.scrollLeft }
  }, [])

  const onPointerMove = useCallback((e: PointerEvent<T>) => {
    const el = ref.current
    if (!el || !drag.current.down) return
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX)
  }, [])

  const onPointerUp = useCallback(() => {
    drag.current.down = false
  }, [])

  return {
    ref,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp },
  }
}
