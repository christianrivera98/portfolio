"use client"

import { useState, useCallback } from "react"
import { PreloaderContext } from "@/hooks/usePreloader"
import { usePreloaderSkipped } from "@/hooks/usePreloaderGate"
import { Preloader } from "./preloader"

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const skipped = usePreloaderSkipped()
  const [played, setPlayed] = useState(false)

  const handleComplete = useCallback(() => {
    setPlayed(true)
  }, [])

  // A skipped visit is complete from the start: nothing locks the scroll.
  const isComplete = skipped || played

  return (
    <PreloaderContext.Provider value={{ isComplete, setComplete: handleComplete }}>
      {!skipped && <Preloader onComplete={handleComplete} />}
      {children}
    </PreloaderContext.Provider>
  )
}
