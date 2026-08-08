"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { COMPANIES } from "./companies.config"

/**
 * Company info shown inside the sticky tablet. Driven by `index` (the
 * experience period beside the tablet) or null when idle. Crossfades logo +
 * copy + tech stack; shows an idle hint when no period is beside it.
 */
export function CompanyCard({ index }: { index: number | null }) {
  const t = useTranslations("Experience")
  const tt = useTranslations("Transition")
  const reduce = useReducedMotion()
  const company = index === null ? null : COMPANIES[index]
  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }

  if (!company) {
    return (
      <motion.div
        {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 } })}
        className="flex h-[380px] flex-col items-center justify-center gap-6 p-6 text-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/45">
          christian@portfolio
        </span>
        <p className="flex items-center font-serif-display text-3xl text-white">
          {tt("idle")}
          <span className="ml-1.5 h-7 w-[3px] animate-pulse bg-[hsl(var(--primary))]" />
        </p>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={company.id}
        {...fade}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col min-[575px]:h-[380px] min-[575px]:flex-row"
      >
        {/* Mobile: column (logo on top, info below). ≥575px: keep the original
            row layout. Transparent logos get a compact white panel; logos with
            their own background show as-is. */}
        <div className="flex w-full shrink-0 items-center justify-center p-4 min-[575px]:w-[42%]">
          <div
            className={cn(
              "w-full",
              company.transparentLogo && "rounded-xl bg-white p-3 shadow-lg ring-1 ring-black/5"
            )}
          >
            <Image
              src={company.logo}
              alt={company.title}
              width={240}
              height={120}
              className={cn(
                "object-contain",
                company.transparentLogo
                  ? "mx-auto max-h-[80px] w-auto max-w-full"
                  : "max-h-[110px] w-full rounded-xl"
              )}
            />
          </div>
        </div>

        {/* role, description, tech stack — right column ≥575px, stacked below on mobile */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 px-6 pb-6 min-[575px]:px-0 min-[575px]:py-6 min-[575px]:pr-6">
          <h3 className="font-serif-display text-2xl font-bold leading-tight text-white">
            {company.title}
          </h3>

          <p className="text-[13px] leading-relaxed text-white/65 line-clamp-4">
            {t(`items.${company.id}.description`)}
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
            {tt("stack")}
          </p>
          <div className="flex flex-wrap gap-2">
            {company.stack.map((logo) => (
              <span
                key={logo}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 ring-1 ring-white/10"
              >
                {/* These marks are SVG: the optimizer rejects that MIME type
                    (400) unless dangerouslyAllowSVG is on, and vectors gain
                    nothing from it anyway. */}
                <Image src={logo} alt="" width={18} height={18} unoptimized className="h-4 w-4 object-contain" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
