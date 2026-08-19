"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import {
  EXTRUDE,
  ICON_VIEWBOX,
} from "@/components/organisms/stack-journey/stack-journey.config"

/**
 * Turns the monochrome stack SVGs into extruded geometries — the same icons the
 * skills grid draws flat, but with real thickness and an edge that catches the
 * light when they turn.
 *
 * Each file is fetched once, parsed with SVGLoader and centred, then normalised
 * so one unit of the 24×24 viewBox maps to 1/24 of the logo box. The SVG y axis
 * points down, hence the flip.
 */
export function useExtrudedLogos(files: string[]): THREE.ExtrudeGeometry[] | null {
  const [geometries, setGeometries] = useState<THREE.ExtrudeGeometry[] | null>(null)

  useEffect(() => {
    let cancelled = false
    const loader = new SVGLoader()

    const build = async () => {
      const built = await Promise.all(
        files.map(async (file) => {
          const markup = await fetch(file).then((res) => res.text())
          const shapes = loader
            .parse(markup)
            .paths.flatMap((path) => SVGLoader.createShapes(path))
          const geometry = new THREE.ExtrudeGeometry(shapes, EXTRUDE)
          geometry.center()
          geometry.scale(1 / ICON_VIEWBOX, -1 / ICON_VIEWBOX, 1 / ICON_VIEWBOX)
          geometry.computeVertexNormals()
          return geometry
        })
      )
      if (cancelled) built.forEach((geometry) => geometry.dispose())
      else setGeometries(built)
    }

    void build()
    return () => {
      cancelled = true
    }
  }, [files])

  useEffect(
    () => () => geometries?.forEach((geometry) => geometry.dispose()),
    [geometries]
  )

  return geometries
}
