"use client"

import Image from "next/image"
import { useState } from "react"

interface ProfileImageProps {
  src: string
  alt: string
  name: string
}

export function ProfileImage({ src, alt, name }: ProfileImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
        <span className="font-serif-display text-8xl text-white/20">
          {initials}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
      priority
      onError={() => setHasError(true)}
    />
  )
}
