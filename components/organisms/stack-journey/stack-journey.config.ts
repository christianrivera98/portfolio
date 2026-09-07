export type Pose = { x: number; y: number }

export type Viewport = {
  width: number
  height: number
  mobile: boolean
  ctaBottom?: number
  rightLimit?: number
}

export const LOGO_SIZE = { min: 20, max: 66 } as const

export const ROW_LENGTH = 12

const ROW_MARGIN = 10

export const ICON_VIEWBOX = 24

export const EXTRUDE = {
  depth: 2.4,
  bevelEnabled: true,
  bevelThickness: 0.14,
  bevelSize: 0.1,
  bevelSegments: 2,
  curveSegments: 24,
} as const

export const MATERIAL = { face: "#ffffff", edge: "#c8c8ce" } as const

const heroInset = (vw: number) => (vw >= 1024 ? 112 : vw >= 768 ? 48 : 24)

function rowMetrics(vp: Viewport) {
  const inset = heroInset(vp.width)
  const available = (vp.rightLimit ?? vp.width - inset) - inset
  const gap = vp.mobile ? 6 : 14
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

export function heroRowPose(index: number, vp: Viewport): Pose {
  const { inset, gap, size } = rowMetrics(vp)
  const top = vp.ctaBottom ?? vp.height - 100
  const band = vp.height - top

  const lift = vp.mobile ? 4 : 30
  const half = size / 2
  const room = Math.max(ROW_MARGIN + half, band - ROW_MARGIN - half)

  return {
    x: inset + index * (size + gap) + size / 2,
    y: top + Math.min(room, Math.max(ROW_MARGIN + half, band / 2 - lift)),
  }
}

export function heroLogoSize(vp: Viewport) {
  return rowMetrics(vp).size
}

export function heroEntryPose(index: number, vp: Viewport): Pose {
  const landed = heroRowPose(index, vp)
  return { x: -0.25 * vp.width, y: landed.y + 30 }
}

export function toWorld(pose: Pose, vp: Viewport) {
  return { x: pose.x - vp.width / 2, y: vp.height / 2 - pose.y }
}
