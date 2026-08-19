import { useCallback, useEffect, useRef, useState } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { SOCIAL_PREVIEWS, type SocialKey } from "@/components/organisms/hero/hero.config"

const loader = new THREE.TextureLoader()
const PREFETCH_TIMEOUT_MS = 4000

type PreviewTextures = Partial<Record<SocialKey, THREE.Texture>>

/**
 * Loads the laptop's social preview textures off the critical path: on the first
 * hover/focus of a social CTA, and — only on hover-capable devices — when the
 * browser goes idle. Unlike useTexture it never suspends, so the 3D scene paints
 * without these bytes competing with the LCP.
 */
export function useSocialPreviews(social: SocialKey | null): PreviewTextures {
  // Mutated in place instead of held in state: useFrame reads it every frame,
  // so a texture landing must not cost a React re-render.
  const [textures] = useState<PreviewTextures>(() => ({}))
  const requested = useRef(new Set<SocialKey>())
  const { gl } = useThree()

  const load = useCallback(
    (key: SocialKey) => {
      if (requested.current.has(key)) return
      requested.current.add(key)
      loader.load(SOCIAL_PREVIEWS[key], (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = gl.capabilities.getMaxAnisotropy()
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.generateMipmaps = true
        tex.needsUpdate = true
        textures[key] = tex
      })
    },
    [gl, textures]
  )

  useEffect(() => {
    if (social) load(social)
  }, [social, load])

  // Touch devices never hover a CTA, so they pay nothing for these textures.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return
    const keys = Object.keys(SOCIAL_PREVIEWS) as SocialKey[]
    const prefetch = () => keys.forEach(load)
    if (!window.requestIdleCallback) {
      const timer = window.setTimeout(prefetch, PREFETCH_TIMEOUT_MS)
      return () => window.clearTimeout(timer)
    }
    const id = window.requestIdleCallback(prefetch, { timeout: PREFETCH_TIMEOUT_MS })
    return () => window.cancelIdleCallback(id)
  }, [load])

  useEffect(
    () => () => {
      for (const tex of Object.values(textures)) tex?.dispose()
    },
    [textures]
  )

  return textures
}
