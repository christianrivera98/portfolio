type Range = { start: number; end: number }

/**
 * The stretch of page scroll that a pinned run consumes without the page
 * actually advancing through content. The navbar's progress bar discounts it,
 * so the bar holds while a run is being scrubbed and picks up where it left off
 * once the run is done — otherwise it would race ahead while the reader is
 * still on the same section.
 */
let held: Range | null = null

export function setScrollHold(range: Range | null) {
  held = range
}

export function getScrollHold(): Range | null {
  return held
}
