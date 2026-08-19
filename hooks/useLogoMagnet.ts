"use client"

import { useEffect } from "react"
import gsap from "gsap"
import type * as THREE from "three"

/** How close the pointer has to get, in px, before a logo reacts at all. */
const RADIUS = 240
/** Peak pull and tilt: small on purpose — enough to show the slab has sides. */
const PULL = 24
const TILT = 0.62

type Setter = (value: number) => void

/**
 * Magnetic hover for the stack logos: the ones near the pointer lean towards it
 * and drift a few pixels, so the extruded edge catches the light. Everything
 * eases back on its own once the pointer moves away.
 *
 * Distances are measured in viewport pixels against each logo's landing spot
 * (kept in `userData`), so the effect never needs a raycast and the layer can
 * stay `pointer-events: none` — the hero underneath keeps all of its clicks.
 */
export function useLogoMagnet(
  meshesRef: React.RefObject<(THREE.Mesh | null)[]>,
  invalidate: () => void,
  enabled: boolean
) {
  useEffect(() => {
    const logos = (meshesRef.current ?? []).filter(Boolean) as THREE.Mesh[]
    if (!enabled || !logos.length) return

    const ease = { duration: 0.55, ease: "power3.out", onUpdate: invalidate }
    const setters = logos.map((logo) => ({
      logo,
      x: gsap.quickTo(logo.position, "x", ease) as Setter,
      y: gsap.quickTo(logo.position, "y", ease) as Setter,
      rotX: gsap.quickTo(logo.rotation, "x", ease) as Setter,
      rotY: gsap.quickTo(logo.rotation, "y", ease) as Setter,
      scale: gsap.quickTo(logo.scale, "x", ease) as Setter,
      scaleY: gsap.quickTo(logo.scale, "y", ease) as Setter,
    }))

    // True while at least one logo is off its resting pose. Without it, every
    // pointer move anywhere on the page would re-target all twelve logos and
    // invalidate the scene, redrawing frames in which nothing actually changes.
    let disturbed = false

    const apply = (pointerX: number, pointerY: number) => {
      let anyPull = false
      setters.forEach(({ logo, x, y, rotX, rotY, scale, scaleY }) => {
        const { screenX, screenY, worldX, worldY, tilt, turn, size } = logo.userData
        if (screenX === undefined) return

        const dx = pointerX - screenX
        const dy = pointerY - screenY
        const distance = Math.hypot(dx, dy)
        // Squared falloff: the pull collapses quickly outside the near field.
        const strength = distance > RADIUS ? 0 : (1 - distance / RADIUS) ** 2
        if (strength > 0) anyPull = true
        if (strength === 0 && !disturbed) return

        x(worldX + (dx / RADIUS) * PULL * strength)
        y(worldY - (dy / RADIUS) * PULL * strength)
        rotY(turn - (dx / RADIUS) * TILT * strength)
        rotX(tilt - (dy / RADIUS) * TILT * strength)
        // The nearest logo grows a touch: with an orthographic camera nothing
        // gets bigger by moving towards it, so the lift has to be a scale.
        scale(size * (1 + 0.1 * strength))
        scaleY(size * (1 + 0.1 * strength))
      })
      disturbed = anyPull
    }

    const onMove = (event: PointerEvent) => apply(event.clientX, event.clientY)

    // Far enough away that every logo settles back to its resting pose.
    const onLeave = () => apply(-9999, -9999)

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      // The quickTo tweens are left to expire on their own: killing everything
      // on these objects would also take out the scrubbed journey phases that
      // own the same meshes once the hero is gone.
    }
  }, [enabled, invalidate, meshesRef])
}
