"use client"

import { useEffect, useState } from "react"

const IDLE_TIMEOUT_MS = 2000

/**
 * Delays mounting a heavy subtree until the browser goes idle, so its chunk stops
 * competing with the first useful paint. `enabled: false` never mounts it at all.
 */
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
