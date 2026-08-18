"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import PixelSwap from "@/components/ui/pixel-swap"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { usePointerSpotlight } from "@/hooks/usePointerSpotlight"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { ProcessCardFace } from "./process-card-face"

/**
 * WIDE cells span both sub-columns, STD cells sit one-up in the left column and
 * TALL spans two rows beside them, so each gets its own ratio.
 */
export type CardVariant = "wide" | "std" | "tall"

const ASPECT: Record<CardVariant, string> = {
  // One fixed ratio per variant per breakpoint — never derived from the copy.
  wide: "[--card-aspect:29/26] sm:[--card-aspect:24/7]",
  std: "[--card-aspect:29/26] sm:[--card-aspect:11/9]",
  // The tall cell has no ratio of its own: it stretches to 01 + 03 + the gap.
  // Below sm the grid is a single column, so it falls back to the shared ratio.
  tall: "[--card-aspect:29/26] sm:h-full sm:[--card-aspect:auto]",
}

/**
 * One bento card: the step title swaps into its description.
 *
 * PixelSwap owns the interaction rather than a wrapper button — in `click` mode
 * it already exposes role="button", tabIndex and Enter/Space, and in `hover`
 * mode it wires focus/blur, so wrapping it would nest two focusable controls.
 */
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
      className={`process-card group relative overflow-hidden rounded-2xl border border-foreground/[0.08] transition-colors duration-500 ease-out hover:border-[hsl(var(--primary))]/40 focus-within:border-[hsl(var(--primary))]/40 data-[active=true]:border-[hsl(var(--primary))]/40 ${ASPECT[variant]}`}
    >
      {/* spotlight tracking the pointer, parked centre-top until it moves */}
      <div className="process-card-spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <PixelSwap
        trigger={coarse ? "click" : "hover"}
        onActiveChange={setActive}
        style={{ aspectRatio: "var(--card-aspect)" }}
        className="h-full focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
        pixelSize={24}
        gap={2}
        pixelScale={0.35}
        pattern="random"
        randomness={0.35}
        duration={1200}
        pixelDuration={450}
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
