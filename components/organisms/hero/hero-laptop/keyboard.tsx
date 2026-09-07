"use client"

import { useLayoutEffect, useMemo, useRef } from "react"
import * as THREE from "three"

const KEY_COLOR = "#1c1c21"
const PITCH = 0.176
const KEY_W = 0.15
const KEY_D = 0.14
const KEY_H = 0.035
const COLS = 13
const Y = 0.035

interface Key {
  x: number
  z: number
  w: number
}

function buildKeys(): Key[] {
  const keys: Key[] = []
  const x0 = -((COLS - 1) * PITCH) / 2
  const z0 = -0.46
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < COLS; c++) keys.push({ x: x0 + c * PITCH, z: z0 + r * PITCH, w: KEY_W })
  }
  const zr = z0 + 4 * PITCH
  for (const c of [0, 1, 2]) keys.push({ x: x0 + c * PITCH, z: zr, w: KEY_W })
  keys.push({ x: 0, z: zr, w: KEY_W * 6 })
  for (const c of [10, 11, 12]) keys.push({ x: x0 + c * PITCH, z: zr, w: KEY_W })
  return keys
}

export function Keyboard() {
  const ref = useRef<THREE.InstancedMesh>(null)
  const keys = useMemo(() => buildKeys(), [])

  useLayoutEffect(() => {
    const inst = ref.current
    if (!inst) return
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const s = new THREE.Vector3()
    const p = new THREE.Vector3()
    keys.forEach((k, i) => {
      p.set(k.x, Y, k.z)
      s.set(k.w, KEY_H, KEY_D)
      inst.setMatrixAt(i, m.compose(p, q, s))
    })
    inst.instanceMatrix.needsUpdate = true
  }, [keys])

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, keys.length]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={KEY_COLOR} metalness={0.45} roughness={0.5} />
    </instancedMesh>
  )
}
