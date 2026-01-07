"use client"
import Link from "next/link";
import { HeroBentoHuman } from "./bento/human/heroBentoHuman";
import { useHeroHumanRotator } from "@/hooks/useHeroHumanRotator";
import { HeroBentoStack } from "./bento/stack/heroBentoStack";

export function Hero() {
    const activeIndex = useHeroHumanRotator();
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center border-b border-[hsl(var(--border))]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-6 py-32 md:grid-cols-2 md:gap-24">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Frontend Developer building scalable,
            <br className="hidden sm:block" />
            product-focused web experiences.
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-[hsl(var(--muted))] md:text-lg">
            I see the frontend as part of a larger system—creating user-centered
            interfaces aligned with real business goals.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-md bg-[hsl(var(--foreground))] px-6 text-sm font-medium text-[hsl(var(--background))] transition-colors hover:opacity-90"
            >
              View projects
            </Link>

            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-[hsl(var(--border))] px-6 text-sm font-medium transition-colors hover:bg-[hsl(var(--foreground)/0.05)]"
            >
              Contact me
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <HeroBentoStack />

          <div className="rounded-xl border border-[hsl(var(--border))] p-6">
            <span className="text-sm text-[hsl(var(--muted))]">Focus</span>
            <p className="mt-2 text-lg font-medium">Product & UX</p>
          </div>

          <div className="col-span-2 rounded-xl border border-[hsl(var(--border))]">
            <HeroBentoHuman activeIndex={activeIndex} />
          </div>
        </div>
      </div>
    </section>
  );
}
