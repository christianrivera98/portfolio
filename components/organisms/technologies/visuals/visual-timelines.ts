const typeLines = (tl: gsap.core.Timeline, target: string, steps: number, stagger: number) =>
  tl.to(target, { clipPath: "inset(0 0% 0 0)", duration: 0.8, stagger, ease: `steps(${steps})` })

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
