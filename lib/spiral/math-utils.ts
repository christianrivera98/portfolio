export class Vector2D {
  constructor(public x: number, public y: number) {}

  static random(min: number, max: number): number {
    return min + Math.random() * (max - min)
  }
}

export class Vector3D {
  constructor(public x: number, public y: number, public z: number) {}
}

export function ease(p: number, g: number): number {
  return p < 0.5
    ? 0.5 * Math.pow(2 * p, g)
    : 1 - 0.5 * Math.pow(2 * (1 - p), g)
}

export function easeOutElastic(x: number): number {
  const c4 = (2 * Math.PI) / 4.5
  if (x <= 0) return 0
  if (x >= 1) return 1
  return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
}

export function map(
  value: number, start1: number, stop1: number,
  start2: number, stop2: number
): number {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
}

export function constrain(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t
}
