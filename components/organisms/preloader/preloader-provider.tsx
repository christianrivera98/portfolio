"use client"

import { useState, useCallback } from "react"
import { PreloaderContext } from "@/hooks/usePreloader"
import { Preloader } from "./preloader"

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false)

  const handleComplete = useCallback(() => {
    setIsComplete(true)
  }, [])

  return (
    <PreloaderContext.Provider value={{ isComplete, setComplete: handleComplete }}>
      <Preloader onComplete={handleComplete} />
      {children}
    </PreloaderContext.Provider>
  )
}
