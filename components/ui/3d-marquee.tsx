"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface ThreeDMarqueeProps {
  images: string[]
  className?: string
  /** Overrides the responsive scale of the inner 3D stage (e.g. for compact card sizes). */
  scaleClassName?: string
}

const COLUMNS = 4
const DEFAULT_SCALE = "scale-50 sm:scale-75 lg:scale-100"

export function ThreeDMarquee({ images, className, scaleClassName }: ThreeDMarqueeProps) {
  const reduceMotion = useReducedMotion()
  const chunkSize = Math.ceil(images.length / COLUMNS)
  const chunks = Array.from({ length: COLUMNS }, (_, col) =>
    images.slice(col * chunkSize, col * chunkSize + chunkSize),
  )

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className={cn("size-[1720px] shrink-0", scaleClassName ?? DEFAULT_SCALE)}>
          <div
            style={{ transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)" }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {chunks.map((chunk, col) => (
              <motion.div
                key={`col-${col}`}
                animate={reduceMotion ? undefined : { y: col % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: col % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-start gap-8"
              >
                {chunk.map((image, i) => (
                  <motion.div
                    key={`${col}-${i}-${image}`}
                    whileHover={reduceMotion ? undefined : { y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative aspect-[470/600] w-[400px] shrink-0"
                  >
                    <Image
                      src={image}
                      alt={`Showcase ${i + 1}`}
                      fill
                      sizes="370px"
                      className="rounded-lg object-cover ring ring-white/10 transition-shadow hover:shadow-2xl"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
