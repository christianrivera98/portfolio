/**
 * Poses for the twelve stack logos as they travel across the page: the row they
 * land on in the hero, and (later phases) the drift and the orbit.
 *
 * Every pose is computed from the viewport, never hard-coded in px, and is
 * recomputed on every ScrollTrigger refresh.
 */

export type Pose = { x: number; y: number; scale: number; opacity: number }

export type Viewport = { width: number; height: number; mobile: boolean }

/** Logo box, in px. Kept in sync with `--logo-size` in globals.css. */
export const LOGO_SIZE = { desktop: 30, mobile: 18 } as const

/**
 * Slab of layers that gives each logo its thickness. `z` is the offset along
 * the card's own axis; the front face is white, the body reads as crimson metal
 * and the back is a dim grey, so a half turn never looks flat.
 */
export const DEPTH_LAYERS: { z: number; tone: string }[] = [
  { z: 3, tone: "#ffffff" },
  { z: 1.5, tone: "hsl(356 45% 40%)" },
  { z: 0, tone: "hsl(356 40% 28%)" },
  { z: -1.5, tone: "hsl(356 32% 20%)" },
  { z: -3, tone: "#3f3f45" },
]

/** Left padding of the hero copy: `lg:pl-28` = 112px, `px-6` = 24px below lg. */
const heroInset = (vw: number) => (vw >= 1024 ? 112 : vw >= 768 ? 48 : 24)

/**
 * The row the logos settle into at the foot of the hero, under the CTAs: in the
 * dark band at the bottom, short enough to clear the centred scroll indicator.
 * On phones the copy stacks and eats the height, so the logos shrink to fit the
 * same single row.
 */
export function heroRowPose(index: number, vp: Viewport): Pose {
  const size = vp.mobile ? LOGO_SIZE.mobile : LOGO_SIZE.desktop
  const gap = vp.mobile ? 6 : 14

  return {
    x: heroInset(vp.width) + index * (size + gap),
    y: vp.height - (vp.mobile ? 52 : 78),
    scale: 1,
    opacity: 1,
  }
}

/** Where the row comes in from: off the left edge, slightly lower. */
export function heroEntryPose(index: number, vp: Viewport): Pose {
  const landed = heroRowPose(index, vp)
  return { ...landed, x: -0.22 * vp.width, y: landed.y + 18, opacity: 0 }
}
