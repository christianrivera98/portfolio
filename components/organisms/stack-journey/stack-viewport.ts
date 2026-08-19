import type { Viewport } from "./stack-journey.config"

/**
 * Reads the layout the row hangs off, live. Everything the poses need comes
 * from the page itself rather than from magic numbers, so a copy change or a
 * resize re-places the logos on the next refresh.
 */
export function readViewport(mobile: boolean): Viewport {
  // The lowest CTA, not the first: on narrow screens the buttons wrap and the
  // row has to clear the last line, not the top one.
  const ctaBottom = [...document.querySelectorAll(".hero-cta")].reduce(
    (lowest, el) => Math.max(lowest, el.getBoundingClientRect().bottom),
    0
  )
  const invite = document.querySelector(".hero-scroll-invite")?.getBoundingClientRect()

  return {
    width: window.innerWidth,
    height: window.innerHeight,
    mobile,
    ctaBottom: ctaBottom || undefined,
    rightLimit: invite?.width ? invite.left - 24 : undefined,
  }
}
