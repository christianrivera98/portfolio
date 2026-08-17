"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"

const SIZE = 128

/**
 * Rasterizes brand SVGs into textures.
 *
 * TextureLoader can't take these directly: they are simple-icons glyphs with a
 * `viewBox` but no intrinsic width/height, and they inherit their colour from
 * CSS (the DOM grid paints them white with a brightness/invert filter, which a
 * texture can't use). So each file is fetched as text, given explicit
 * dimensions and a white fill, and drawn once into a canvas.
 */
export function useLogoTextures(files: string[]): THREE.CanvasTexture[] | null {
  const [textures, setTextures] = useState<THREE.CanvasTexture[] | null>(null)

  useEffect(() => {
    let cancelled = false
    const made: THREE.CanvasTexture[] = []

    const build = async () => {
      const drawn = await Promise.all(files.map((file) => rasterize(file)))
      if (cancelled) return
      for (const canvas of drawn) {
        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 2
        made.push(texture)
      }
      setTextures(made)
    }

    build()
    return () => {
      cancelled = true
      made.forEach((texture) => texture.dispose())
    }
  }, [files])

  return textures
}

async function rasterize(file: string): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas")
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext("2d")
  if (!ctx) return canvas

  try {
    const markup = await fetch(file).then((response) => response.text())
    const sized = markup
      .replace("<svg", `<svg width="${SIZE}" height="${SIZE}" fill="#ffffff"`)
      .replace(/<title>.*?<\/title>/, "")

    const blob = new Blob([sized], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const image = new Image()
    image.decoding = "async"

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error(`logo failed: ${file}`))
      image.src = url
    })

    ctx.drawImage(image, 0, 0, SIZE, SIZE)
    URL.revokeObjectURL(url)
  } catch {
    // A missing glyph degrades to an empty node rather than tearing the scene down.
  }

  return canvas
}
