"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { HUMAN_ITEMS } from "../hero-bento.config"
import { Card, CardContent } from "@/components/ui/card"

interface HeroBentoHumanProps {
  activeIndex: number
  className?: string
}

export function HeroBentoHuman({ activeIndex, className }: HeroBentoHumanProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const currentItem = HUMAN_ITEMS[activeIndex]
  const nextItem = HUMAN_ITEMS[(activeIndex + 1) % HUMAN_ITEMS.length]

  useEffect(() => {
    if (!currentRef.current || !nextRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(nextRef.current, { opacity: 0 })

      gsap
        .timeline()
        .to(currentRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          nextRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onStart: () => {
              const video = nextRef.current?.querySelector("video")
              video?.play()
            },
          },
          "<",
        )
    }, containerRef)

    return () => ctx.revert()
  }, [activeIndex])

  return (
    <Card
      ref={containerRef}
      className={`relative w-[160%] overflow-hidden rounded-2xl border-0 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.1),0_20px_40px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_12px_-2px_rgba(0,0,0,0.15),0_20px_40px_-4px_rgba(0,0,0,0.2),0_30px_60px_-8px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out ${className}`}
    >
      {/* Current */}
      <CardContent ref={currentRef} className="absolute inset-0">
        <video
          src={currentItem.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-black/30" />
        <div className="relative z-10 flex h-full items-center justify-center p-10">
          <p className="text-center text-2xl font-semibold leading-snug tracking-tight text-white drop-shadow-lg md:text-3xl lg:text-4xl">
            {currentItem.title}
          </p>
        </div>
      </CardContent>

      {/* Next */}
      <div ref={nextRef} className="absolute inset-0">
        <video
          src={nextItem.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/40 to-black/30" />
        <div className="relative z-10 flex h-full items-center justify-center p-10">
          <p className="text-center text-2xl font-semibold leading-snug tracking-tight text-white drop-shadow-lg md:text-3xl lg:text-4xl">
            {nextItem.title}
          </p>
        </div>
      </div>
    </Card>
  )
}
