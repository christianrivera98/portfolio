import { Vector2D, Vector3D, lerp, constrain, easeOutElastic } from "./math-utils"
import { spiralPath } from "./spiral-path"
import { CAMERA_Z, CAMERA_TRAVEL_DISTANCE, VIEW_ZOOM } from "./constants"

export class Star {
  private dx: number
  private dy: number
  private spiralLocation: number
  private strokeWeightFactor: number
  private z: number
  private angle: number
  private distance: number
  private rotationDirection: number
  private expansionRate: number
  private finalScale: number

  constructor() {
    this.angle = Math.random() * Math.PI * 2
    this.distance = 30 * Math.random() + 15
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1
    this.expansionRate = 1.2 + Math.random() * 0.8
    this.finalScale = 0.7 + Math.random() * 0.6
    this.dx = this.distance * Math.cos(this.angle)
    this.dy = this.distance * Math.sin(this.angle)
    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
    this.z = Vector2D.random(0.5 * CAMERA_Z, CAMERA_TRAVEL_DISTANCE + CAMERA_Z)
    this.z = lerp(this.z, CAMERA_TRAVEL_DISTANCE / 2, 0.3 * this.spiralLocation)
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
  }

  render(p: number, showDot: (pos: Vector3D, size: number) => void) {
    const sp = spiralPath(this.spiralLocation)
    const q = p - this.spiralLocation
    if (q <= 0) return

    const dp = constrain(4 * q, 0, 1)
    const linear = dp
    const elastic = easeOutElastic(dp)
    const power = dp * dp

    let easing: number
    if (dp < 0.3) easing = lerp(linear, power, dp / 0.3)
    else if (dp < 0.7) easing = lerp(power, elastic, (dp - 0.3) / 0.4)
    else easing = elastic

    const { x, y } = this.getPosition(dp, sp, easing)
    const depth = this.z - CAMERA_Z
    const position = new Vector3D(depth * x / VIEW_ZOOM, depth * y / VIEW_ZOOM, this.z)

    let sizeMul = 1.0
    if (dp < 0.6) sizeMul = 1.0 + dp * 0.2
    else {
      const t = (dp - 0.6) / 0.4
      sizeMul = 1.2 * (1 - t) + this.finalScale * t
    }

    showDot(position, 8.5 * this.strokeWeightFactor * sizeMul)
  }

  private getPosition(dp: number, sp: Vector2D, easing: number): { x: number; y: number } {
    if (dp < 0.3) {
      const t = easing / 0.3
      return {
        x: lerp(sp.x, sp.x + this.dx * 0.3, t),
        y: lerp(sp.y, sp.y + this.dy * 0.3, t),
      }
    }

    if (dp < 0.7) {
      const mid = (dp - 0.3) / 0.4
      const curve = Math.sin(mid * Math.PI) * this.rotationDirection * 1.5
      const bx = sp.x + this.dx * 0.3
      const by = sp.y + this.dy * 0.3
      return {
        x: lerp(bx, sp.x + this.dx * 0.7, mid) + (-this.dy * 0.4 * curve) * mid,
        y: lerp(by, sp.y + this.dy * 0.7, mid) + (this.dx * 0.4 * curve) * mid,
      }
    }

    const fin = (dp - 0.7) / 0.3
    const bx = sp.x + this.dx * 0.7
    const by = sp.y + this.dy * 0.7
    const dist = this.distance * this.expansionRate * 1.5
    const sa = this.angle + 1.2 * this.rotationDirection * fin * Math.PI
    return {
      x: lerp(bx, sp.x + dist * Math.cos(sa), fin),
      y: lerp(by, sp.y + dist * Math.sin(sa), fin),
    }
  }
}
