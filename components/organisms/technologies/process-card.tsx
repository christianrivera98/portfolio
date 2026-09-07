"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import PixelSwap from "@/components/ui/pixel-swap"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { ProcessCardFace } from "./process-card-face"
import { CardVisual } from "./visuals/card-visual"

export type CardVariant = "wide" | "std" | "tall"

const ASPECT: Record<CardVariant, string> = {
  wide: "[--card-aspect:29/26] sm:[--card-aspect:24/7]",
  std: "[--card-aspect:29/26] sm:[--card-aspect:11/9]",
  tall: "[--card-aspect:29/26] sm:h-full sm:[--card-aspect:auto]",
}

export function ProcessCard({
  id,
  index,
  variant,
}: {
  id: string
  index: number
  variant: CardVariant
}) {
  const t = useTranslations("Technologies")
  const cardRef = useRef<HTMLDivElement>(null)
  const coarse = useMediaQuery("(pointer: coarse)")
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(false)

  usePointerSpotlight(cardRef, !coarse && !reduced)

  const step = String(index + 1).padStart(2, "0")

  return (
    <div
      ref={cardRef}
      data-active={active}
      className={`process-card group relative overflow-hidden rounded-2xl ${ASPECT[variant]}`}
    >
      <CardVisual id={id} />

      <div className="process-card-spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <PixelSwap
        trigger={coarse ? "click" : "hover"}
        onActiveChange={setActive}
        style={{ aspectRatio: "var(--card-aspect)" }}
        className="h-full focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
        pixelSize={56}
        gap={2}
        pixelScale={0.35}
        pattern="random"
        randomness={0.35}
        duration={520}
        pixelDuration={240}
        firstContent={
          <ProcessCardFace
            step={step}
            title={t(`process.${id}.title`)}
            hint={coarse ? t("tapHint") : t("hoverHint")}
          />
        }
        secondContent={<ProcessCardFace step={step} body={t(`process.${id}.desc`)} />}
      />
    </div>
  )
}
