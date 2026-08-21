// Original vector motifs for the interests theatre. Nothing here traces a
// character, frame or logo: every path is authored for this site so the
// section can evoke a film or a discipline without borrowing its art.

/** Open ink circle drawn in one brush gesture — the Kung Fu Panda chapter. */
export const INK_ARC_D =
  "M22 62C22 30 52 12 82 16c30 4 46 30 42 58-4 26-30 42-58 38C40 108 24 92 22 68"

/** Three bamboo stalks: x offset, height factor and node positions (in %). */
export const BAMBOO_STALKS = [
  { x: 14, width: 7, nodes: [26, 54, 78] },
  { x: 32, width: 5, nodes: [18, 46, 72] },
  { x: 47, width: 6, nodes: [34, 62, 86] },
] as const

/** Waveform bars for the hip hop chapter, as height factors of the box. */
export const WAVE_BARS = [
  0.28, 0.62, 0.4, 0.86, 0.52, 1, 0.44, 0.74, 0.34, 0.58, 0.24, 0.46,
] as const

/** Paw: the pad plus four toes, as [cx, cy, rx, ry] in the 120x120 viewBox. */
export const PAW_SHAPES = [
  [60, 78, 26, 20],
  [30, 46, 9, 12],
  [48, 34, 9, 13],
  [72, 34, 9, 13],
  [90, 46, 9, 12],
] as const

/** Retro-futurist grid the gears turn against. */
export const GRID_D =
  "M0 30h120M0 60h120M0 90h120M30 0v120M60 0v120M90 0v120"

/**
 * Stylised gear outline for the mechatronics chapter. Alternating radii around
 * the circle give the teeth; the path is generated so the tooth count can
 * change without hand-editing coordinates.
 */
export function gearPath(teeth: number, radius: number, tooth: number): string {
  const step = Math.PI / teeth
  let d = ""
  for (let i = 0; i < teeth * 2; i += 1) {
    const r = i % 2 === 0 ? radius : radius - tooth
    const angle = i * step
    const x = (Math.cos(angle) * r).toFixed(2)
    const y = (Math.sin(angle) * r).toFixed(2)
    d += `${i === 0 ? "M" : "L"}${x},${y}`
  }
  return `${d}Z`
}
