"use client"

import Link from "next/link"
import { useHeroHumanRotator } from "@/hooks/useHeroHumanRotator"
import { HeroBentoStack } from "./bento/stack/heroBentoStack"
import { HeroBentoHuman } from "./bento/human/heroBentoHuman"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Hero() {
  const activeIndex = useHeroHumanRotator()

  return (
    <section id="home" className="relative min-h-screen items-center flex bg-[hsl(var(--foreground))] ">
      <div className="mx-auto max-w-7xl px-6 py-36 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 lg:gap-28">
          <div className="flex flex-col justify-center gap-6 md:gap-8">
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-6xl text-balance text-[hsl(var(--background))]">
              Frontend Developer building scalable,
              <br className="hidden sm:block" />
              product-focused web experiences.
            </h1>

            <p className="max-w-xl text-base leading-relaxed tracking-normal text-[hsl(var(--background))]/85 md:text-lg md:leading-relaxed">
              I see the frontend as part of a larger system—creating user-centered interfaces aligned with real business
              goals.
            </p>
          </div>

          <Card className="justify-center items-center border-0 rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_10px_20px_-2px_rgba(0,0,0,0.1),0_20px_40px_-4px_rgba(0,0,0,0.08)] bg-[hsl(var(--background))] backdrop-blur-sm">
            <CardContent className="p-2">
              <HeroBentoStack />
            </CardContent>
          </Card>
        </div>

        <div className="flex w-full h-full gap-5 mt-10 md:mt-12">
          <HeroBentoHuman activeIndex={activeIndex} />

          <div className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-5">
              <Card className="border-0 rounded-2xl shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.08),0_8px_16px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_8px_-2px_rgba(0,0,0,0.1),0_8px_16px_-2px_rgba(0,0,0,0.12),0_16px_32px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out bg-[hsl(var(--background))]">
                <CardContent className="p-5 md:p-6">
                  <span className="text-xs tracking-wide uppercase text-[hsl(var(--muted))]/80">Focus</span>
                  <p className="mt-2.5 text-lg font-semibold tracking-tight leading-tight">Product & UX</p>
                </CardContent>
              </Card>

              <Card className="border-0 rounded-2xl shadow-[0_2px_4px_-1px_rgba(0,0,0,0.06),0_4px_8px_-1px_rgba(0,0,0,0.08),0_8px_16px_-2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_8px_-2px_rgba(0,0,0,0.1),0_8px_16px_-2px_rgba(0,0,0,0.12),0_16px_32px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out bg-[hsl(var(--background))]">
                <CardContent className="p-5 md:p-6">
                  <span className="text-xs tracking-wide uppercase text-[hsl(var(--muted))]/80">Experience</span>
                  <p className="mt-2.5 text-lg font-semibold tracking-tight leading-tight">5+ years</p>
                </CardContent>
              </Card>
            </div>

            <Button
              asChild
              size="lg"
              className="h-14 rounded-xl text-base font-semibold tracking-tight shadow-[0_4px_12px_-2px_hsl(var(--primary)/0.4),0_8px_20px_-4px_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_16px_-2px_hsl(var(--primary)/0.5),0_12px_28px_-4px_hsl(var(--primary)/0.35)] bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-foreground))] text-white hover:text-[hsl(var(--primary))] transition-all duration-300 ease-out active:scale-[0.98]"
            >
              <Link href="#projects">View projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
