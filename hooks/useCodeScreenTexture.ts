import { useMemo } from "react"
import * as THREE from "three"
import { SCREEN, CODE_LINES } from "@/components/organisms/hero/hero-laptop/code-screen.constants"

const TOTAL_CHARS = CODE_LINES.reduce(
  (sum, line) => sum + line.reduce((s, t) => s + t.text.length, 0),
  0
)
const CYCLE_MS = TOTAL_CHARS * SCREEN.typeMs + SCREEN.holdMs

/** Builds a CanvasTexture and returns a draw(elapsedMs) that types code, loops, and blinks a cursor. */
export function useCodeScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = SCREEN.width
    canvas.height = SCREEN.height
    const ctx = canvas.getContext("2d")!
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 16

    const draw = (elapsedMs: number) => {
      const phase = elapsedMs % CYCLE_MS
      const revealed = Math.min(TOTAL_CHARS, Math.floor(phase / SCREEN.typeMs))

      ctx.fillStyle = SCREEN.bg
      ctx.fillRect(0, 0, SCREEN.width, SCREEN.height)
      ctx.fillStyle = SCREEN.bar
      ctx.fillRect(0, 0, SCREEN.width, 36)
      const dots = ["#e85d6a", "#e0b341", "#5fb878"]
      dots.forEach((c, i) => {
        ctx.fillStyle = c
        ctx.beginPath()
        ctx.arc(24 + i * 22, 18, 6, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.font = SCREEN.font
      ctx.textBaseline = "top"
      let remaining = revealed
      let cursorX: number = SCREEN.padX
      let cursorY: number = SCREEN.padTop
      for (let row = 0; row < CODE_LINES.length; row++) {
        const y = SCREEN.padTop + row * SCREEN.lineHeight
        ctx.fillStyle = SCREEN.gutter
        ctx.fillText(String(row + 1).padStart(2, " "), 6, y)
        let x = SCREEN.padX
        for (const token of CODE_LINES[row]) {
          const take = Math.max(0, Math.min(token.text.length, remaining))
          if (take > 0) {
            ctx.fillStyle = token.color
            const slice = token.text.slice(0, take)
            ctx.fillText(slice, x, y)
            x += ctx.measureText(slice).width
          }
          remaining -= token.text.length
          if (remaining <= 0) break
        }
        cursorX = x
        cursorY = y
        if (remaining <= 0) break
      }

      if (Math.floor(elapsedMs / 530) % 2 === 0) {
        ctx.fillStyle = SCREEN.cursor
        ctx.fillRect(cursorX + 2, cursorY, 13, SCREEN.lineHeight - 8)
      }
      texture.needsUpdate = true
    }

    return { texture, draw }
  }, [])
}
