"use client"

import { useTranslations } from "next-intl"
import { ProfileImage } from "./profile-image"
import { HeroScreenCTAs, HeroScreenTags } from "./hero-screen-actions"
import { HERO_PROFILE } from "./hero.config"

export function HeroScreen() {
  const t = useTranslations("Hero")
  const [firstName, ...rest] = HERO_PROFILE.name.split(" ")
  const lastName = rest.join(" ")

  return (
    <div className="relative flex h-full w-full items-center bg-[#0a0a0a] px-8 py-6">
      <div className="grid w-full grid-cols-[1fr_auto] items-center gap-6">
        <div className="flex flex-col">
          <span className="mb-2 font-mono text-[9px] tracking-[0.3em] text-white/35 uppercase">
            {t("title")} &mdash; {t("subtitle")}
          </span>

          <h1 className="font-serif-display text-3xl leading-[0.9] font-extrabold tracking-tight text-white">
            <span className="block">{firstName}</span>
            <span className="block">{lastName}</span>
          </h1>

          <div className="my-3 h-0.5 w-16 bg-[hsl(356,96%,32%)]" />

          <p className="max-w-sm text-[11px] leading-relaxed text-white/55">
            {t("bio")}
          </p>

          <HeroScreenCTAs />
          <HeroScreenTags />
        </div>

        <div className="relative hidden h-44 w-36 overflow-hidden rounded-md ring-1 ring-white/10 sm:block">
          <ProfileImage
            src={HERO_PROFILE.photo}
            alt={`${HERO_PROFILE.name} — ${t("title")}`}
            name={HERO_PROFILE.name}
          />
        </div>
      </div>
    </div>
  )
}
