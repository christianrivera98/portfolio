"use client"

import { motion } from "framer-motion"
import { StackItem } from "../organisms/hero/bento/hero-bento.config"
import { TechLogo } from "../atoms/logoItem"

type TechOrbitItemProps = {
  item: StackItem
  index: number
  total: number
  radius: number
  duration: number
  paused: boolean
  active: boolean
  onHover: () => void
  onLeave: () => void
}

export function TechOrbitItem({
  item,
  index,
  total,
  radius,
  duration,
  paused,
  active,
  onHover,
  onLeave,
}: TechOrbitItemProps) {
  const angle = (index / total) * 360

  return (
    <motion.div
      className="absolute"
      initial={{
        rotate: angle,
      }}
      animate={{
        rotate: paused ? angle : angle + 360,
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{
        transformOrigin: `0 ${radius}px`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="absolute"
        style={{
          transform: `translateY(-${radius}px)`,
        }}
        animate={{
          rotate: paused ? 0 : -360,
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <TechLogo src={item.logo} name={item.name} color={item.color} active={active} />
      </motion.div>
    </motion.div>
  )
}
