"use client"

import { createContext, useContext } from "react"

interface PreloaderContextValue {
  isComplete: boolean
  setComplete: () => void
}

export const PreloaderContext = createContext<PreloaderContextValue>({
  isComplete: false,
  setComplete: () => {},
})

export function usePreloader() {
  return useContext(PreloaderContext)
}
