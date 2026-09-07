import { useMemo } from "react"
import * as THREE from "three"
import { EDITOR as E, EXPLORER, EDITOR_CODE } from "@/components/organisms/hero/hero-room/editor-screen.constants"

const TOTAL = EDITOR_CODE.reduce((s, l) => s + l.reduce((a, t) => a + t.text.length, 0), 0)
const CYCLE = TOTAL * E.typeMs + E.holdMs
const EDX = E.act + E.side

function chrome(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = E.bg
  ctx.fillRect(0, 0, E.w, E.h)
  ctx.fillStyle = E.activity
  ctx.fillRect(0, 0, E.act, E.h)
  ;[0, 1, 2, 3].forEach((i) => {
    ctx.fillStyle = i === 0 ? E.accent : "#7a7a7a"
    ctx.fillRect((E.act - E.iconSize) / 2, 24 + i * 52, E.iconSize, E.iconSize)
  })
  ctx.fillStyle = E.sidebar
  ctx.fillRect(E.act, 0, E.side, E.h)
  ctx.font = E.uiFont
  ctx.fillStyle = "#9d9d9d"
  ctx.fillText("EXPLORER", E.act + E.uiPad, 20)
  EXPLORER.forEach((name, i) => {
    const y = 56 + i * E.rowH
    const active = name.trim() === "hero.tsx"
    if (active) {
      ctx.fillStyle = "#37373d"
      ctx.fillRect(E.act, y - 6, E.side, E.rowH)
    }
    ctx.fillStyle = active ? "#ffffff" : "#bdbdbd"
    ctx.fillText(name, E.act + E.uiPad, y + 14)
  })
  ctx.fillStyle = E.tabBar
  ctx.fillRect(EDX, 0, E.w - EDX, E.tabH)
  ctx.fillStyle = E.bg
  ctx.fillRect(EDX, 0, E.tabW, E.tabH)
  ctx.fillStyle = E.accent
  ctx.fillRect(EDX, 0, E.tabW, 3)
  ctx.fillStyle = "#d4d4d4"
  ctx.font = E.uiFont
  ctx.fillText("hero.tsx", EDX + E.uiPad, E.tabH / 2 + 6)
}

function statusBar(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = E.status
  ctx.fillRect(0, E.h - E.statusH, E.w, E.statusH)
  ctx.fillStyle = "#ffffff"
  ctx.font = E.uiFont
  ctx.fillText("⎇ main*    TypeScript    UTF-8    Ln 6", E.uiPad, E.h - 8)
}

export function useEditorScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = E.w
    canvas.height = E.h
    const ctx = canvas.getContext("2d")!
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16

    const top = E.tabH + 16
    const draw = (elapsedMs: number) => {
      const revealed = Math.min(TOTAL, Math.floor((elapsedMs % CYCLE) / E.typeMs))
      chrome(ctx)
      ctx.font = E.font
      ctx.textBaseline = "top"
      let left = revealed
      let cx = EDX + E.codeX
      let cy = top
      for (let r = 0; r < EDITOR_CODE.length; r++) {
        const y = top + r * E.lineH
        ctx.fillStyle = E.gutter
        ctx.fillText(String(r + 1).padStart(2, " "), EDX + 20, y)
        let x = EDX + E.codeX
        for (const tk of EDITOR_CODE[r]) {
          const take = Math.max(0, Math.min(tk.text.length, left))
          if (take > 0) {
            ctx.fillStyle = tk.color
            const s = tk.text.slice(0, take)
            ctx.fillText(s, x, y)
            x += ctx.measureText(s).width
          }
          left -= tk.text.length
          if (left <= 0) break
        }
        cx = x
        cy = y
        if (left <= 0) break
      }
      if (Math.floor(elapsedMs / 530) % 2 === 0) {
        ctx.fillStyle = "#aeafad"
        ctx.fillRect(cx + 2, cy, 13, E.lineH - 10)
      }
      statusBar(ctx)
      texture.needsUpdate = true
    }
    return { texture, draw }
  }, [])
}
