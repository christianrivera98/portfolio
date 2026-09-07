import type { Viewport } from "./stack-journey.config"

export function readViewport(mobile: boolean): Viewport {
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
