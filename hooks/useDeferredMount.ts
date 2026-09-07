"use client"

import { useEffect, useState } from "react"

const IDLE_TIMEOUT_MS = 2000

export function useDeferredMount(enabled = true): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const mount = () => setMounted(true)
    if (!window.requestIdleCallback) {
      const timer = window.setTimeout(mount, IDLE_TIMEOUT_MS)
      return () => window.clearTimeout(timer)
    }
    const id = window.requestIdleCallback(mount, { timeout: IDLE_TIMEOUT_MS })
    return () => window.cancelIdleCallback(id)
  }, [enabled])

  return mounted && enabled
}
