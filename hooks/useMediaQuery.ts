"use client"

import { useCallback, useSyncExternalStore } from "react"

// Media queries are an external store, so subscribing beats an effect + setState:
// no cascading render and the server snapshot is explicit.
const getServerSnapshot = () => false

/**
 * Reports whether a media query currently matches.
 *
 * Use it to keep a heavy subtree from mounting at all — a Tailwind `hidden`
 * class only hides it, the component still mounts and runs.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener("change", onStoreChange)
      return () => mq.removeEventListener("change", onStoreChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
