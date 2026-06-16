import { gsap } from "gsap"
import { Vector2D, Vector3D, ease, map, constrain } from "./math-utils"
import { spiralPath, rotate } from "./spiral-path"
import { Star } from "./star"
import {
  CAMERA_Z, CAMERA_TRAVEL_DISTANCE, START_DOT_Y_OFFSET,
  VIEW_ZOOM, NUM_STARS, TRAIL_LENGTH, CHANGE_EVENT_TIME,
} from "./constants"

export interface ControllerConfig {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  dpr: number
  size: number
  duration?: number
  onComplete?: () => void
}

export class AnimationController {
  private timeline: gsap.core.Timeline
  private time = 0
  private ctx: CanvasRenderingContext2D
  private size: number
  private stars: Star[] = []
  private boundShowDot: (pos: Vector3D, size: number) => void

  constructor(config: ControllerConfig) {
    this.ctx = config.ctx
    this.size = config.size
    this.boundShowDot = this.showProjectedDot.bind(this)
    this.createStars()

    this.timeline = gsap.timeline()
    this.timeline.to(this, {
      time: 1,
      duration: config.duration ?? 6,
      ease: "none",
      onUpdate: () => this.render(),
      onComplete: () => config.onComplete?.(),
    })
  }

  private createStars() {
    const original = Math.random
    let seed = 1234
    Math.random = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    for (let i = 0; i < NUM_STARS; i++) this.stars.push(new Star())
    Math.random = original
  }

  private showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = constrain(map(this.time, CHANGE_EVENT_TIME, 1, 0, 1), 0, 1)
    const camZ = CAMERA_Z + ease(Math.pow(t2, 1.2), 1.8) * CAMERA_TRAVEL_DISTANCE
    if (position.z <= camZ) return

    const depth = position.z - camZ
    this.ctx.lineWidth = 400 * sizeFactor / depth
    this.ctx.beginPath()
    this.ctx.arc(
      VIEW_ZOOM * position.x / depth,
      VIEW_ZOOM * position.y / depth,
      0.5, 0, Math.PI * 2
    )
    this.ctx.fill()
  }

  private render() {
    const { ctx, size } = this
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, size, size)
    ctx.save()
    ctx.translate(size / 2, size / 2)

    const t1 = constrain(map(this.time, 0, CHANGE_EVENT_TIME + 0.25, 0, 1), 0, 1)
    const t2 = constrain(map(this.time, CHANGE_EVENT_TIME, 1, 0, 1), 0, 1)
    ctx.rotate(-Math.PI * ease(t2, 2.7))

    this.drawTrail(t1)

    ctx.fillStyle = "white"
    for (const star of this.stars) star.render(t1, this.boundShowDot)

    if (this.time > CHANGE_EVENT_TIME) {
      const dy = CAMERA_Z * START_DOT_Y_OFFSET / VIEW_ZOOM
      this.showProjectedDot(new Vector3D(0, dy, CAMERA_TRAVEL_DISTANCE), 2.5)
    }
    ctx.restore()
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const f = map(i, 0, TRAIL_LENGTH, 1.1, 0.1)
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
      this.ctx.fillStyle = "white"
      this.ctx.lineWidth = sw
      const pos = spiralPath(t1 - 0.00015 * i)
      const off = new Vector2D(pos.x + 5, pos.y + 5)
      const rot = rotate(pos, off, Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, i % 2 === 0)
      this.ctx.beginPath()
      this.ctx.arc(rot.x, rot.y, sw / 2, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  destroy() { this.timeline.kill() }
}
