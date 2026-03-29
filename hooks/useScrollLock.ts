import { useEffect } from "react"
import { useLenis } from "lenis/react"

/**
 * Locks/unlocks Lenis scroll based on locked state.
 * Uses lenis.stop()/start() for proper integration.
 */
export function useScrollLock(locked: boolean) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    if (locked) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [locked, lenis])
}
