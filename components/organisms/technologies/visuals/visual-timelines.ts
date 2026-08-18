import gsap from "gsap"

/**
 * Looping timelines for the card visuals. Each one ends its reveal on a
 * `settled` label: that frame is what reduced motion freezes on, so nobody ever
 * lands on a half-typed line.
 *
 * Everything animates clip-path, opacity or transform — no layout, and no text
 * repainted on every frame. Typing is a stepped clip-path wipe, which is why
 * the visuals are set in a mono font.
 */

const typeLines = (tl: gsap.core.Timeline, target: string, steps: number, stagger: number) =>
  tl.to(target, { clipPath: "inset(0 0% 0 0)", duration: 0.8, stagger, ease: `steps(${steps})` })

/**
 * The caret blinks a fixed number of times instead of forever: an endless child
 * would make the parent timeline infinite and it would never loop again. Added
 * last, at position 0, because inserting it earlier moves the timeline's end
 * and would push the typing that follows it to the back of the blink.
 */
const blinkCaret = (tl: gsap.core.Timeline, times: number) =>
  tl.to(".visual-caret", { opacity: 0.1, duration: 0.55, repeat: times, yoyo: true }, 0)

export function buildTerminalTimeline(tl: gsap.core.Timeline) {
  tl.set(".visual-line", { clipPath: "inset(0 100% 0 0)", opacity: 1 })
  typeLines(tl, ".visual-line", 24, 1.15)
    .addLabel("settled")
    .to(".visual-line", { opacity: 0, duration: 0.6, stagger: 0.06 }, "+=2.6")
  blinkCaret(tl, 12)
}

export function buildTreeTimeline(tl: gsap.core.Timeline) {
  tl.set(".visual-row", { opacity: 0, x: -8 })
    .to(".visual-row", { opacity: 1, x: 0, duration: 0.4, stagger: 0.16, ease: "power2.out" })
    .addLabel("settled")
    .to(".visual-row", { opacity: 0, duration: 0.5, stagger: 0.05 }, "+=2.8")
}

export function buildEditorTimeline(tl: gsap.core.Timeline) {
  tl.set(".visual-code-line", { clipPath: "inset(0 100% 0 0)", opacity: 1 })
  typeLines(tl, ".visual-code-line", 30, 0.75)
    .addLabel("settled")
    .to(".visual-code-line", { opacity: 0, duration: 0.5, stagger: 0.05 }, "+=2.4")
  blinkCaret(tl, 14)
}

export function buildPipelineTimeline(tl: gsap.core.Timeline) {
  tl.set(".visual-check", { scale: 0, opacity: 0 })
    .set(".visual-step", { opacity: 0.3 })
    .set(".visual-bar", { scaleX: 0 })
    .to(".visual-bar", { scaleX: 1, duration: 3.2, ease: "none" }, 0)
    .to(".visual-step", { opacity: 1, duration: 0.25, stagger: 0.8 }, 0)
    .to(
      ".visual-check",
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.2)", stagger: 0.8 },
      0.45
    )
    .addLabel("settled")
    .to([".visual-step", ".visual-check", ".visual-bar"], { opacity: 0, duration: 0.5 }, "+=2.6")
}
