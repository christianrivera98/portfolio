"use client"

import { useSyncExternalStore } from "react"

const subscribe = () => () => {}
const getSnapshot = () => document.documentElement.dataset.preloader === "seen"
const getServerSnapshot = () => false

export function usePreloaderSkipped(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
