"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface ScrollTabletProps {
  children: ReactNode
  background?: ReactNode
  className?: string
}

export function ScrollTablet({ children, background, className }: ScrollTabletProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })
  const rotateX = useTransform(scrollYProgress, [0, 1], [34, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0.35, 1])

  return (
    <div ref={ref} className={cn("relative", className)} style={{ perspective: "1200px" }}>
      <motion.div
        style={reduceMotion ? undefined : { rotateX, scale, opacity }}
        className="origin-bottom rounded-[22px] border border-white/10 bg-white/[0.04] p-2 shadow-2xl backdrop-blur-sm"
      >
        <div className="relative overflow-hidden rounded-[16px] border border-white/[0.06] bg-[#0a0a0a]">
          {background && <div className="absolute inset-0">{background}</div>}
          <div className="relative z-10">{children}</div>
        </div>
      </motion.div>
    </div>
  )
}
