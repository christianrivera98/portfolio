/**
 * Poses and look for the twelve stack logos as they travel across the page.
 *
 * The scene is orthographic with zoom 1, so one world unit is one CSS pixel and
 * every pose can be authored in viewport coordinates (origin at the top-left of
 * the screen, y growing downwards) and converted in a single place.
 */

export type Pose = { x: number; y: number }

export type Viewport = {
  width: number
  height: number
  mobile: boolean
  /** Bottom of the hero CTAs, measured live: the row hangs below it. */
  ctaBottom?: number
  /** Left edge of the scroll invite, so the row never runs under it. */
  rightLimit?: number
}

/** Bounds for the single row: it shrinks to fit, never past these. */
export const LOGO_SIZE = { min: 20, max: 66 } as const

export const ROW_LENGTH = 12

/** Breathing room the row keeps from the CTAs above and the hero's bottom edge. */
const ROW_MARGIN = 10

/** SVG viewBox of every simple-icons file, used to normalise the shapes. */
export const ICON_VIEWBOX = 24

/**
 * Extrusion settings, in viewBox units. Deliberately low on curve and bevel
 * segments: these are twelve meshes built at runtime, not a hero asset.
 */
export const EXTRUDE = {
  depth: 2.4,
  bevelEnabled: true,
  bevelThickness: 0.14,
  bevelSize: 0.1,
  bevelSegments: 2,
  // Eight per curve drew the round marks as polygons at the size the hero row
  // uses. Built once at load, so the extra triangles are paid on the way in.
  curveSegments: 24,
} as const

/**
 * White on white: the face is plain, the rim a shade darker so the light alone
 * separates them. No brand colour on the logos themselves.
 */
export const MATERIAL = { face: "#ffffff", edge: "#c8c8ce" } as const

/** Left padding of the hero copy: `lg:pl-28` = 112px, `px-6` = 24px below lg. */
const heroInset = (vw: number) => (vw >= 1024 ? 112 : vw >= 768 ? 48 : 24)

/** Room the row is allowed to take before it would run into the scroll invite. */
function rowMetrics(vp: Viewport) {
  const inset = heroInset(vp.width)
  // Without the scroll invite to stop at — it is desktop-only — the row still
  // owes the right edge the same margin the copy keeps on the left, or the last
  // logo hangs half off the screen.
  const available = (vp.rightLimit ?? vp.width - inset) - inset
  const gap = vp.mobile ? 6 : 14
  // The band under the CTAs is the tighter limit on a short viewport such as
  // 1024x768: sized off the width alone, the row lands on the buttons.
  const band = vp.height - (vp.ctaBottom ?? vp.height - 100)
  const size = Math.max(
    LOGO_SIZE.min,
    Math.min(
      LOGO_SIZE.max,
      (available - (ROW_LENGTH - 1) * gap) / ROW_LENGTH,
      band - ROW_MARGIN * 2
    )
  )
  return { inset, gap, size }
}

/** Where the logos settle: a row of twelve in the band under the CTAs. */
export function heroRowPose(index: number, vp: Viewport): Pose {
  const { inset, gap, size } = rowMetrics(vp)
  const top = vp.ctaBottom ?? vp.height - 100
  const band = vp.height - top

  // Centred in the band under the CTAs and nudged up, but never far enough to
  // touch the buttons or to run off the bottom of the hero.
  const lift = vp.mobile ? 4 : 30
  const half = size / 2
  const room = Math.max(ROW_MARGIN + half, band - ROW_MARGIN - half)

  return {
    x: inset + index * (size + gap) + size / 2,
    y: top + Math.min(room, Math.max(ROW_MARGIN + half, band / 2 - lift)),
  }
}

/** Logo box for the current viewport, so the mesh scale matches the layout. */
export function heroLogoSize(vp: Viewport) {
  return rowMetrics(vp).size
}

/** Where the row comes in from: off the left edge, slightly lower. */
export function heroEntryPose(index: number, vp: Viewport): Pose {
  const landed = heroRowPose(index, vp)
  return { x: -0.25 * vp.width, y: landed.y + 30 }
}

/** Viewport pixels (origin top-left) to orthographic world units (origin centre). */
export function toWorld(pose: Pose, vp: Viewport) {
  return { x: pose.x - vp.width / 2, y: vp.height / 2 - pose.y }
}
