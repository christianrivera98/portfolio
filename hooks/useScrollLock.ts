import { useEffect } from "react"
import { useLenis } from "lenis/react"

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
