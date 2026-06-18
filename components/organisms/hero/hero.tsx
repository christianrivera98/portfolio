"use client"

import { useTranslations } from "next-intl"
import Silk from "@/components/ui/backgrounds/silk"
import { MacbookScroll } from "@/components/ui/macbook-scroll"
import { HeroScreen } from "./hero-screen"

function HeroTitle({ welcome, scroll }: { welcome: string; scroll: string }) {
  return (
    <span className="flex flex-col items-center gap-7">
      <span className="font-serif-display text-3xl font-bold text-white md:text-5xl">
        {welcome}
      </span>
      <span className="flex flex-col items-center gap-2 text-white/40">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          {scroll}
        </span>
        <svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          className="animate-bounce text-white/30 motion-reduce:animate-none"
          aria-hidden="true"
        >
          <path
            d="M7 1v16m0 0l-5-5m5 5l5-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  )
}

export function Hero() {
  const t = useTranslations("Hero")
  const tCommon = useTranslations("Common")

  return (
    <section id="home" className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Silk speed={0.5} color="#0a0a0a" noiseIntensity={0.3} rotation={0} />
      </div>

      <div className="relative z-10">
        <MacbookScroll
          title={<HeroTitle welcome={t("welcome")} scroll={tCommon("scroll")} />}
        >
          <HeroScreen />
        </MacbookScroll>
      </div>
    </section>
  )
}
