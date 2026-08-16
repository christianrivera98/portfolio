"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import PixelSwap from "@/components/ui/pixel-swap/pixel-swap"
import { ProcessCardFace } from "./process-card-face"

/**
 * One bento card describing how I work. The front states what I do; the back
 * answers what the client gets out of it, and the two swap through PixelSwap.
 *
 * Controlled on purpose: PixelSwap's own `hover` trigger drops a tabIndex on a
 * plain div, so the button below owns the interaction instead — mouse via
 * pointer events, keyboard via focus and Enter/Space.
 */
export function ProcessCard({ id, index }: { id: string; index: number }) {
  const t = useTranslations("Technologies")
  const [active, setActive] = useState(false)

  const step = String(index + 1).padStart(2, "0")
  const hover = (next: boolean) => (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") setActive(next)
  }

  return (
    <button
      type="button"
      aria-expanded={active}
      onPointerEnter={hover(true)}
      onPointerLeave={hover(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((current) => !current)}
      className="process-card group relative overflow-hidden rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] text-left transition-colors duration-500 ease-out hover:border-[hsl(var(--primary))]/40 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] aria-expanded:border-[hsl(var(--primary))]/40"
    >
      {/* crimson glow that blooms from the top-left on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.18),transparent_55%)]" />

      <PixelSwap
        active={active}
        trigger="none"
        aspectRatio="auto"
        className="h-[19.5rem] sm:h-[17.5rem] md:h-[19rem] lg:h-[17rem]"
        pixelSize={104}
        gap={2}
        pattern="left-to-right"
        randomness={0.35}
        duration={760}
        pixelDuration={320}
        firstContent={
          <ProcessCardFace
            variant="front"
            step={step}
            heading={t(`process.${id}.title`)}
            body={t(`process.${id}.desc`)}
            hint={t("whyLabel")}
          />
        }
        secondContent={
          <ProcessCardFace
            variant="back"
            step={step}
            heading={t("whyLabel")}
            body={t(`process.${id}.why`)}
            hint={t("backLabel")}
          />
        }
      />
    </button>
  )
}
