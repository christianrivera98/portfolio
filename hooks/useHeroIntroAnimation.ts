"use client"

import { useState, useEffect } from "react"

interface AnimationStates {
  frontendCard: boolean
  stackCard: boolean
  humanCard: boolean
  bottomCards: boolean
  button: boolean
}

export function useHeroIntroAnimation(delay = 100): AnimationStates {
  const [states, setStates] = useState<AnimationStates>({
    frontendCard: false,
    stackCard: false,
    humanCard: false,
    bottomCards: false,
    button: false,
  })

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // Card "Frontend Developer" - entra desde la izquierda (primero)
    timers.push(
      setTimeout(() => {
        setStates((prev) => ({ ...prev, frontendCard: true }))
      }, delay),
    )

    // Card "HeroBentoStack" - entra desde la derecha (segundo)
    timers.push(
      setTimeout(() => {
        setStates((prev) => ({ ...prev, stackCard: true }))
      }, delay + 200),
    )

    // Card "HeroBentoHuman" + Cards "Focus" y "Experience" - entran desde abajo (tercero)
    timers.push(
      setTimeout(() => {
        setStates((prev) => ({ ...prev, humanCard: true, bottomCards: true }))
      }, delay + 400),
    )

    // Button "View Projects" - aparece suavemente (último)
    timers.push(
      setTimeout(() => {
        setStates((prev) => ({ ...prev, button: true }))
      }, delay + 700),
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [delay])

  return states
}
