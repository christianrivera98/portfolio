import type { CSSProperties, ReactNode } from "react"

/** Order in which the pixels of the grid resolve during a swap. */
export type PixelSwapPattern =
  | "random"
  | "center"
  | "edges"
  | "left-to-right"
  | "right-to-left"
  | "top-to-bottom"
  | "bottom-to-top"
  | "diagonal"
  | "spiral"

export type PixelSwapEasing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | (string & {})

export type PixelSwapProps = {
  firstContent: ReactNode
  secondContent: ReactNode
  /** Pixel side in px. Grows automatically if the grid would exceed 220 cells. */
  pixelSize?: number
  gap?: number
  /** 0–50, as a percentage of the pixel side. */
  pixelRadius?: number
  pixelSpin?: number
  /** 0.05–1: how small each pixel starts before covering its cell. */
  pixelScale?: number
  fade?: boolean
  /** Total swap length in ms; the stagger is duration - pixelDuration. */
  duration?: number
  pixelDuration?: number
  pattern?: PixelSwapPattern
  /** 0–1 blend between the pattern order and per-pixel noise. */
  randomness?: number
  easing?: PixelSwapEasing
  /** Leave unset for a fully controlled swap driven by `active`. */
  trigger?: "hover" | "click" | "none"
  initialActive?: boolean
  active?: boolean
  onActiveChange?: (active: boolean) => void
  onComplete?: (active: boolean) => void
  aspectRatio?: CSSProperties["aspectRatio"]
  className?: string
  style?: CSSProperties
}

declare function PixelSwap(props: PixelSwapProps): React.JSX.Element

export default PixelSwap
