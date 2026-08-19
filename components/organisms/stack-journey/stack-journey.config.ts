/**
 * Poses and look for the twelve stack logos as they travel across the page.
 *
 * The scene is orthographic with zoom 1, so one world unit is one CSS pixel and
 * every pose can be authored in viewport coordinates (origin at the top-left of
 * the screen, y growing downwards) and converted in a single place.
 */

export type Pose = { x: number; y: number }

export type Viewport = { width: number; height: number; mobile: boolean }

/** Logo box, in px. Two rows of six under the hero CTAs. */
export const LOGO_SIZE = { desktop: 88, mobile: 40 } as const

export const ROW_LENGTH = 6

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

/** Matte white face, crimson edge — the site's own palette. */
export const MATERIAL = { face: "#f4f4f5", edge: "#8f0714" } as const

/** Left padding of the hero copy: `lg:pl-28` = 112px, `px-6` = 24px below lg. */
const heroInset = (vw: number) => (vw >= 1024 ? 112 : vw >= 768 ? 48 : 24)

/**
 * Where the logos settle in the hero: a block of two rows of six filling the
 * bottom-left quadrant, under the CTAs.
 */
export function heroRowPose(index: number, vp: Viewport): Pose {
  const size = vp.mobile ? LOGO_SIZE.mobile : LOGO_SIZE.desktop
  const gap = vp.mobile ? 8 : 16
  const column = index % ROW_LENGTH
  const row = Math.floor(index / ROW_LENGTH)
  const block = 2 * size + gap

  return {
    x: heroInset(vp.width) + column * (size + gap) + size / 2,
    y: vp.height - block - (vp.mobile ? 20 : 12) + row * (size + gap) + size / 2,
  }
}

/** Where the block comes in from: off the left edge, slightly lower. */
export function heroEntryPose(index: number, vp: Viewport): Pose {
  const landed = heroRowPose(index, vp)
  return { x: -0.25 * vp.width, y: landed.y + 30 }
}

/** Viewport pixels (origin top-left) to orthographic world units (origin centre). */
export function toWorld(pose: Pose, vp: Viewport) {
  return { x: pose.x - vp.width / 2, y: vp.height / 2 - pose.y }
}
