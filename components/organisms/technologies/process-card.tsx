"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import PixelSwap from "@/components/ui/pixel-swap"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { ProcessCardFace } from "./process-card-face"

/**
 * One bento card: the step title swaps into its description.
 *
 * PixelSwap owns the interaction rather than a wrapper button — in `click` mode
 * it already exposes role="button", tabIndex and Enter/Space, and in `hover`
 * mode it wires focus/blur, so wrapping it would nest two focusable controls.
 */
export function ProcessCard({ id, index }: { id: string; index: number }) {
  const t = useTranslations("Technologies")
  const coarse = useMediaQuery("(pointer: coarse)")
  const [active, setActive] = useState(false)

  const step = String(index + 1).padStart(2, "0")

  return (
    <div
      data-active={active}
      // One fixed ratio per breakpoint, identical for all four cards: the swap
      // crops to its box, and the column goes from ~312px to ~518px wide, so a
      // single global ratio would either clip on mobile or tower on desktop.
      className="process-card group relative overflow-hidden rounded-2xl border border-foreground/[0.08] transition-colors duration-500 ease-out [--card-aspect:29/26] hover:border-[hsl(var(--primary))]/40 focus-within:border-[hsl(var(--primary))]/40 data-[active=true]:border-[hsl(var(--primary))]/40 sm:[--card-aspect:16/9] md:[--card-aspect:29/26] lg:[--card-aspect:12/5]"
    >
      {/* crimson glow that blooms from the top-left on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.18),transparent_55%)]" />

      <PixelSwap
        trigger={coarse ? "click" : "hover"}
        onActiveChange={setActive}
        style={{ aspectRatio: "var(--card-aspect)" }}
        className="focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
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
            hint={coarse ? t("tapHint") : undefined}
          />
        }
        secondContent={<ProcessCardFace step={step} body={t(`process.${id}.desc`)} />}
      />
    </div>
  )
}
