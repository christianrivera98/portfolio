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
  curveSegments: 8,
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
  const available = (vp.rightLimit ?? vp.width) - inset
  const gap = vp.mobile ? 6 : 14
  const size = Math.max(
    LOGO_SIZE.min,
    Math.min(LOGO_SIZE.max, (available - (ROW_LENGTH - 1) * gap) / ROW_LENGTH)
  )
  return { inset, gap, size }
}

/**
 * Where the logos settle in the hero: one row of twelve under the CTAs, sitting
 * in the middle of the band left between them and the bottom of the hero.
 */
export function heroRowPose(index: number, vp: Viewport): Pose {
  const { inset, gap, size } = rowMetrics(vp)
  const band = vp.ctaBottom ?? vp.height - 100

  // Centred in the band under the CTAs, nudged up so it reads as sitting
  // between them and the scroll invite rather than at the very bottom.
  const lift = vp.mobile ? 4 : 30

  return {
    x: inset + index * (size + gap) + size / 2,
    y: band + (vp.height - band) / 2 - lift,
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
