"use client"

import { useTranslations } from "next-intl"
import { ScrollMouse } from "@/components/ui/scroll-mouse"

export function HeroScrollInvite() {
  const t = useTranslations("Transition")
  const [firstWord, ...rest] = t("title").split(" ")

  return (
    <div className="hero-scroll-invite pointer-events-none absolute bottom-10 right-[6%] z-10 hidden flex-col items-end opacity-0 lg:flex">
      <h2 className="text-right font-serif-display text-2xl tracking-tight text-white xl:text-3xl">
        <span className="inline-flex items-center">
          {firstWord}
          <ScrollMouse className="mx-3" />
        </span>{" "}
        {rest.join(" ")}
      </h2>
      <p className="mt-2 max-w-xs text-right text-base text-white/40">{t("subtitle")}</p>
    </div>
  )
}
