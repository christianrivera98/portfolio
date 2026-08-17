// Node layout for the stack constellation. Authored by hand rather than
// randomised so the shape is stable between renders and reads as a deliberate
// composition: frontend up top, backend and infra sinking towards the bottom.
//
// The cell is tall and narrow, so the cloud is laid out tall and narrow too —
// roughly x within [-1.1, 1.1] and y within [-2.4, 2.4]. Widen this and the
// nodes will clip against the sides of the canvas.
export type ConstellationNode = { x: number; y: number; z: number; scale: number }

export const NODES: ConstellationNode[] = [
  { x: -0.72, y: 2.15, z: 0.3, scale: 0.72 }, // TypeScript
  { x: 0.55, y: 1.72, z: -0.35, scale: 0.66 }, // React
  { x: -0.35, y: 1.15, z: 0.5, scale: 0.7 }, // Next.js
  { x: 0.95, y: 0.62, z: -0.15, scale: 0.58 }, // Tailwind
  { x: -0.98, y: 0.35, z: -0.4, scale: 0.6 }, // TanStack
  { x: 0.15, y: -0.05, z: 0.45, scale: 0.64 }, // shadcn/ui
  { x: 1.02, y: -0.72, z: 0.2, scale: 0.56 }, // Redux
  { x: -0.85, y: -0.95, z: 0.35, scale: 0.54 }, // Zod
  { x: 0.32, y: -1.35, z: -0.3, scale: 0.66 }, // NestJS
  { x: -0.62, y: -1.92, z: 0.15, scale: 0.6 }, // PostgreSQL
  { x: 0.88, y: 1.05, z: 0.55, scale: 0.5 }, // Socket.io
  { x: 0.62, y: -2.28, z: -0.1, scale: 0.58 }, // Docker
]

// Which nodes are wired together. Kept sparse on purpose: a full mesh turns
// into visual noise and multiplies the line count for nothing.
export const EDGES: [number, number][] = [
  [0, 1], [1, 2], [0, 4], [1, 10], [2, 3], [2, 5],
  [3, 5], [4, 7], [5, 6], [5, 8], [7, 9], [8, 9],
  [8, 11], [9, 11], [6, 8],
]

// Pulled far enough back that the whole cloud clears the frame even when the
// cell is at its narrowest (~1024px viewport).
export const CAMERA_Z = 8
export const ORBIT_SPEED = 0.06
export const POINTER_TILT = 0.22
