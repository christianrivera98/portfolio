"use client"

import { useEffect, useState } from "react"
import * as THREE from "three"
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js"
import {
  EXTRUDE,
  ICON_VIEWBOX,
} from "@/components/organisms/stack-journey/stack-journey.config"

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
