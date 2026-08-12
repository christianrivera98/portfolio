"use client"

import { useSyncExternalStore } from "react"

// The attribute is stamped once, before hydration, and never re-stamped from
// outside React — so there is nothing to subscribe to.
const subscribe = () => () => {}
const getSnapshot = () => document.documentElement.dataset.preloader === "seen"
// False on the server and on the hydration render: the markup must match what
// the server sent, or React warns. The real value lands on the render right
// after, while CSS keeps the overlay invisible in the meantime.
const getServerSnapshot = () => false

/** True when this visit must skip the preloader entirely. */
export function usePreloaderSkipped(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
