"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { AnimationController } from "@/lib/spiral/animation-controller"

gsap.registerPlugin(useGSAP)

const TEXT_DELAY = 0.8
const TEXT_FADE_IN = 1
const SPIRAL_DURATION = 10

export function usePreloaderAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  textRef: React.RefObject<HTMLDivElement | null>,
  onComplete: () => void,
  onUnmount: () => void
): { showText: boolean } {
  const prefersReduced = usePrefersReducedMotion()
  const controllerRef = useRef<AnimationController | null>(null)
  const [showText, setShowText] = useState(false)

  useGSAP(
    () => {
      if (!containerRef.current || !canvasRef.current) return

      if (prefersReduced) {
        onComplete()
        onUnmount()
        return
      }

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      setupCanvas(canvas, ctx)

      gsap.delayedCall(TEXT_DELAY, () => {
        setShowText(true)
        gsap.delayedCall(0.05, () => {
          if (textRef.current) {
            gsap.fromTo(textRef.current,
              { opacity: 0, scale: 0.3 },
              { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
            )
          }
        })
      })

      gsap.delayedCall(TEXT_DELAY + TEXT_FADE_IN + 0.5, () => {
        if (!textRef.current) return
        gsap.to(textRef.current, {
          opacity: 0.3,
          duration: 0.7,
          repeat: 3,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      controllerRef.current = new AnimationController({
        canvas,
        ctx,
        dpr: window.devicePixelRatio || 1,
        size: Math.max(window.innerWidth, window.innerHeight),
        duration: SPIRAL_DURATION,
        onComplete: () => {
          gsap.delayedCall(1.5, () =>
            runExitAnimation(containerRef.current, onComplete, onUnmount)
          )
        },
      })

      return () => {
        controllerRef.current?.destroy()
        controllerRef.current = null
      }
    },
    { scope: containerRef, dependencies: [prefersReduced] }
  )

  return { showText }
}

function setupCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const dpr = window.devicePixelRatio || 1
  const size = Math.max(window.innerWidth, window.innerHeight)
  canvas.width = size * dpr
  canvas.height = size * dpr
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  ctx.scale(dpr, dpr)
}

function runExitAnimation(
  container: HTMLDivElement | null, onComplete: () => void, onUnmount: () => void
) {
  gsap.to(container, {
    opacity: 0, duration: 0.8, ease: "power2.inOut",
    onComplete: () => { onComplete(); gsap.delayedCall(0.1, onUnmount) },
  })
}
