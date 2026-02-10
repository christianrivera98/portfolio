import { useEffect } from "react"

/**
 * Locks/unlocks body scroll based on locked state.
 * Useful for modals and full-screen menus.
 *
 * @param locked - Whether scroll should be locked
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [locked])
}
