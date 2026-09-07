type Range = { start: number; end: number }

let held: Range | null = null

export function setScrollHold(range: Range | null) {
  held = range
}

export function getScrollHold(): Range | null {
  return held
}
