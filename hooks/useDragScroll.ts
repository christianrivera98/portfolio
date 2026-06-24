"use client"

import { useRef, useCallback, type PointerEvent, type MouseEvent } from "react"

/**
 * Click-and-drag horizontal scrolling for pointer devices (mouse/pen). Touch is
 * left to native overflow-x scrolling so vertical page gestures keep working.
 * No pointer capture — a click without movement passes through to children;
 * only a real drag suppresses the trailing click. Bind ref + spread handlers.
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const state = useRef({ down: false, moved: false, startX: 0, scroll: 0 })

  const onPointerDown = useCallback((e: PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType === "touch") return
    state.current = { down: true, moved: false, startX: e.clientX, scroll: el.scrollLeft }
  }, [])

  const onPointerMove = useCallback((e: PointerEvent) => {
    const el = ref.current
    if (!el || !state.current.down) return
    const dx = e.clientX - state.current.startX
    if (Math.abs(dx) > 4) state.current.moved = true
    el.scrollLeft = state.current.scroll - dx
  }, [])

  const onPointerUp = useCallback(() => {
    state.current.down = false
  }, [])

  // Swallow the click that closes a drag so it doesn't trigger child buttons.
  const onClickCapture = useCallback((e: MouseEvent) => {
    if (state.current.moved) {
      e.stopPropagation()
      e.preventDefault()
      state.current.moved = false
    }
  }, [])

  return {
    ref,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp, onClickCapture },
  }
}
