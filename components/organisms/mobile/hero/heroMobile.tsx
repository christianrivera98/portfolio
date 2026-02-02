"use client"

import Link from "next/link"
import { useHeroHumanRotator } from "@/hooks/useHeroHumanRotator"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Silk from "@/components/ui/backgrounds/silk"
import { HeroBentoStack } from "../../hero/bento/stack/heroBentoStack"
import { HeroBentoHuman } from "../../hero/bento/human/heroBentoHuman"

export function HeroMobile() {
  const activeIndex = useHeroHumanRotator()
  const glassStyle = "bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"

  return (
    <section id="home" className="relative min-h-screen items-center flex bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Silk 
          speed={0.8} 
          color="#1a1a1a" 
          noiseIntensity={0.5}
          rotation={0} 
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-36 md:py-0">
        <div className="flex md:gap-2 lg:gap-4">
          <Card className={`flex flex-col max-w-3xl justify-center gap-6 md:gap-8 p-12 transition-all duration-300 hover:bg-white/20 ${glassStyle}`}>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-6xl text-balance text-white">
              Frontend Developer building scalable,
              <br className="hidden sm:block" />
              product-focused web experiences.
            </h1>

            <p className="max-w-xl text-base leading-relaxed tracking-normal text-white/70 md:text-lg md:leading-relaxed">
              I see the frontend as part of a larger system—creating user-centered interfaces aligned with real business goals.
            </p>
          </Card>

          <Card className={`justify-center items-center rounded-2xl p-10 transition-all duration-300 hover:bg-white/20 ${glassStyle}`}>
            <CardContent>
              <HeroBentoStack />
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full h-full gap-5 mt-10 md:mt-4">
          <HeroBentoHuman activeIndex={activeIndex} />

          <div className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <Card className={`rounded-2xl transition-all duration-300 hover:bg-white/20 ${glassStyle}`}>
                <CardContent className="p-5 md:p-6">
                  <span className="text-xs tracking-wide uppercase text-white/50">Focus</span>
                  <p className="mt-2.5 text-lg font-semibold tracking-tight leading-tight text-white">Product & UX</p>
                </CardContent>
              </Card>

              <Card className={`rounded-2xl transition-all duration-300 hover:bg-white/20 ${glassStyle}`}>
                <CardContent className="p-5 md:p-6">
                  <span className="text-xs tracking-wide uppercase text-white/50">Experience</span>
                  <p className="mt-2.5 text-lg font-semibold tracking-tight leading-tight text-white">5+ years</p>
                </CardContent>
              </Card>
            </div>

            <Button
              asChild
              size="lg"
              className="h-14 rounded-xl text-base font-semibold tracking-tight shadow-lg bg-white text-black hover:bg-white/90 transition-all duration-300 ease-out active:scale-[0.98]"
            >
              <Link href="#projects">View projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}