"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
// Icon components
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}
import { useHeroIntroAnimation } from "@/hooks/useHeroIntroAnimation"
import { HeroNav } from "@/components/organisms/navbar/hero-nav"
import { Button } from "@/components/ui/button"
import Silk from "@/components/ui/backgrounds/silk"
import { HERO_PROFILE, TECH_STACK_TAGS, HERO_CTAS } from "./bento/hero-bento.config"

function ProfileImage({
  src,
  alt,
  name,
}: {
  src: string
  alt: string
  name: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    // Fallback: Stylized initials
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
        <span className="font-serif-display text-8xl text-white/20">{initials}</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
      priority
      onError={() => setHasError(true)}
    />
  )
}

export function Hero() {
  const animations = useHeroIntroAnimation(100)

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Silk speed={0.5} color="#0a0a0a" noiseIntensity={0.3} rotation={0} />
      </div>

      {/* Navigation */}
      <header className="relative z-20 w-full px-8 md:px-16 py-6">
        <HeroNav />
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column - Content */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Name */}
              <h1
                className={`font-serif-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-white transition-all duration-700 ease-out ${
                  animations.frontendCard
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                {HERO_PROFILE.name}
              </h1>

              {/* Title & Subtitle */}
              <div
                className={`flex flex-col gap-1 transition-all duration-700 ease-out delay-100 ${
                  animations.frontendCard
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white/90">
                  {HERO_PROFILE.title}
                </h2>
                <p className="text-base md:text-lg text-white/50">
                  {HERO_PROFILE.subtitle}
                </p>
              </div>

              {/* Bio */}
              <p
                className={`max-w-md text-base md:text-lg leading-relaxed text-white/80 transition-all duration-700 ease-out delay-200 ${
                  animations.stackCard
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                {HERO_PROFILE.bio}
              </p>

              {/* Credentials */}
              <p
                className={`text-sm text-white/40 transition-all duration-700 ease-out delay-300 ${
                  animations.stackCard
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                {HERO_PROFILE.credentials}
              </p>

              {/* CTAs */}
              <div
                className={`flex flex-wrap gap-3 mt-2 transition-all duration-700 ease-out delay-[400ms] ${
                  animations.humanCard
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                {HERO_CTAS.map((cta) => (
                  <Button
                    key={cta.id}
                    asChild
                    variant={cta.variant === "primary" ? "default" : "outline"}
                    size="lg"
                    className={
                      cta.variant === "primary"
                        ? "h-12 px-6 rounded-full bg-white text-black hover:bg-white/90 font-medium"
                        : "h-12 px-6 rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 font-medium"
                    }
                  >
                    {"external" in cta && cta.external ? (
                      <a
                        href={cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        {cta.label}
                        <ExternalLinkIcon className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link href={cta.href} className="inline-flex items-center gap-2">
                        {cta.label}
                        <ArrowRightIcon className="w-4 h-4" />
                      </Link>
                    )}
                  </Button>
                ))}
              </div>

              {/* Tech Stack Tags */}
              <div
                className={`flex flex-wrap gap-2 mt-4 transition-all duration-700 ease-out delay-500 ${
                  animations.bottomCards
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
              >
                {TECH_STACK_TAGS.map((tech) => (
                  <span
                    key={tech.id}
                    className="px-4 py-2 text-sm font-mono text-white/70 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white/90 transition-colors duration-200"
                  >
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Photo */}
            <div
              className={`hidden lg:flex justify-center lg:justify-end transition-all duration-700 ease-out delay-300 ${
                animations.stackCard
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <div className="relative w-[400px] h-[500px]">
                {/* Photo container with gradient fade */}
                <div className="relative w-full h-full overflow-hidden">
                  <ProfileImage
                    src={HERO_PROFILE.photo}
                    alt={`${HERO_PROFILE.name} - ${HERO_PROFILE.title}`}
                    name={HERO_PROFILE.name}
                  />
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                  {/* Right gradient fade */}
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
