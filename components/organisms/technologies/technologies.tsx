"use client"

import { useRef } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "@/components/ui/icons"
import { useTechnologiesAnimations } from "@/hooks/useTechnologiesAnimations"
import { ProcessCard } from "./process-card"
import { StackSignature } from "./stack-signature"
import { PROCESS_CARDS } from "./technologies.config"

export function Technologies() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const t = useTranslations("Technologies")

  useTechnologiesAnimations(containerRef, titleRef)

  return (
    <section
      ref={containerRef}
      id="technologies"
      className="relative bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute bottom-1/4 left-0 size-[500px] rounded-full bg-[hsl(var(--primary))] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-12">
        <div className="mb-16">
          {/* Hidden states live in the hook, not here: with reduced motion the
              hook bails out early and an inline clip-path would never reopen. */}
          <span className="tech-label inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/60">
            {t("label")}
          </span>
          <h2
            ref={titleRef}
            className="mt-4 max-w-4xl font-serif-display text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl"
            style={{ perspective: "500px" }}
          >
            {t("title")}
          </h2>
          <div className="tech-accent-line mt-6 h-[2px] w-16 origin-left bg-[hsl(var(--primary))]" />
          <p className="tech-subtitle mt-6 max-w-2xl text-base leading-relaxed text-foreground/70">
            {t("subtitle")}
          </p>
        </div>

        {/* Asymmetric bento: the four steps read as a column of uneven cells,
            with the stack constellation as the tall protagonist beside them. */}
        <div className="tech-bento grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {PROCESS_CARDS.map((card, index) => {
              const variant = index === 0 || index === 3 ? "wide" : "std"
              return (
                <div key={card.id} className={variant === "wide" ? "sm:col-span-2" : undefined}>
                  <ProcessCard id={card.id} index={index} variant={variant} />
                </div>
              )
            })}
          </div>

          <div className="tech-stack-cell lg:col-span-5">
            <StackSignature />
          </div>
        </div>

        <div className="tech-cta mt-24 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-7 font-medium text-black transition-transform duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="#contact" className="inline-flex items-center gap-2">
              {t("cta")}
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
