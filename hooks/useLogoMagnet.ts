"use client"

import { useEffect } from "react"
import gsap from "gsap"
import type { Renderer } from "@/components/organisms/stack-journey/stack-render"

const RADIUS = 240
const PULL = 24
const TILT = 0.62
const LIFT = 0.1

type Setter = (value: number) => void

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

    let disturbed = false

    const apply = (pointerX: number, pointerY: number) => {
      let anyPull = false

      setters.forEach((set, index) => {
        const { screenX, screenY } = renderer.logos[index].userData
        if (screenX === undefined) return

        const dx = pointerX - screenX
        const dy = pointerY - screenY
        const distance = Math.hypot(dx, dy)
        const strength = distance > RADIUS ? 0 : (1 - distance / RADIUS) ** 2
        if (strength > 0) anyPull = true
        if (strength === 0 && !disturbed) return

        set.dx((dx / RADIUS) * PULL * strength)
        set.dy((dy / RADIUS) * PULL * strength)
        set.ry(-(dx / RADIUS) * TILT * strength)
        set.rx(-(dy / RADIUS) * TILT * strength)
        set.lift(LIFT * strength)
      })

      disturbed = anyPull
    }

    const onMove = (event: PointerEvent) => apply(event.clientX, event.clientY)
    const onLeave = () => apply(-9999, -9999)

    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      renderer.offsets.forEach((offset) => {
        gsap.killTweensOf(offset)
        Object.assign(offset, { dx: 0, dy: 0, rx: 0, ry: 0, lift: 0 })
      })
      renderer.request()
    }
  }, [enabled, rendererRef])
}
