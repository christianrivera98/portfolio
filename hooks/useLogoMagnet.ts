"use client"

import { useEffect } from "react"
import gsap from "gsap"
import type { Renderer } from "@/components/organisms/stack-journey/stack-render"

/** How close the pointer has to get, in px, before a logo reacts at all. */
const RADIUS = 240
/** Peak pull and tilt: small on purpose — enough to show the slab has sides. */
const PULL = 24
const TILT = 0.62
const LIFT = 0.1

type Setter = (value: number) => void

/**
 * Magnetic hover for the stack logos: the ones near the pointer lean towards it
 * and drift a few pixels, so the extruded edge catches the light.
 *
 * It tweens *offsets*, never the meshes. The renderer adds them on top of
 * whatever the journey says, so the magnet can ease back at its own pace while
 * the scroll keeps moving the same logos — the earlier version animated the
 * meshes directly and kept dragging them back to the hero row for half a second
 * after the journey had already started.
 *
 * Distances are measured in viewport pixels against the pose the renderer
 * recorded, so the effect never needs a raycast and the layer can stay
 * `pointer-events: none` — the hero underneath keeps all of its clicks.
 */
export function useLogoMagnet(rendererRef: React.RefObject<Renderer | null>, enabled: boolean) {
  useEffect(() => {
    const renderer = rendererRef.current
    if (!enabled || !renderer) return

    const ease = { duration: 0.55, ease: "power3.out", onUpdate: renderer.request }
    const setters = renderer.offsets.map((offset) => ({
      dx: gsap.quickTo(offset, "dx", ease) as Setter,
      dy: gsap.quickTo(offset, "dy", ease) as Setter,
      rx: gsap.quickTo(offset, "rx", ease) as Setter,
      ry: gsap.quickTo(offset, "ry", ease) as Setter,
      lift: gsap.quickTo(offset, "lift", ease) as Setter,
    }))

    // True while at least one logo is off its resting pose. Without it, every
    // pointer move anywhere on the page would re-target all twelve logos and
    // redraw frames in which nothing actually changes.
    let disturbed = false

    const apply = (pointerX: number, pointerY: number) => {
      let anyPull = false

      setters.forEach((set, index) => {
        const { screenX, screenY } = renderer.logos[index].userData
        if (screenX === undefined) return

        const dx = pointerX - screenX
        const dy = pointerY - screenY
        const distance = Math.hypot(dx, dy)
        // Squared falloff: the pull collapses quickly outside the near field.
        const strength = distance > RADIUS ? 0 : (1 - distance / RADIUS) ** 2
        if (strength > 0) anyPull = true
        if (strength === 0 && !disturbed) return

        set.dx((dx / RADIUS) * PULL * strength)
        set.dy((dy / RADIUS) * PULL * strength)
        set.ry(-(dx / RADIUS) * TILT * strength)
        set.rx(-(dy / RADIUS) * TILT * strength)
        // The nearest logo grows a touch: with an orthographic camera nothing
        // gets bigger by moving towards it, so the lift has to be a scale.
        set.lift(LIFT * strength)
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
      // Offsets are plain objects, so clearing them can never strand a mesh
      // half way to the pointer the way killing mesh tweens would.
      renderer.offsets.forEach((offset) => {
        gsap.killTweensOf(offset)
        Object.assign(offset, { dx: 0, dy: 0, rx: 0, ry: 0, lift: 0 })
      })
      renderer.request()
    }
  }, [enabled, rendererRef])
}
