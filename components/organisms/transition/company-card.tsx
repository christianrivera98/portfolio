"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { COMPANIES } from "./companies.config"

/**
 * Company info shown inside the sticky tablet. Driven by `index` (the
 * experience period currently in view). Crossfades logo + copy + tech stack.
 */
export function CompanyCard({ index }: { index: number }) {
  const t = useTranslations("Experience")
  const reduce = useReducedMotion()
  const company = COMPANIES[index] ?? COMPANIES[0]
  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }

  return (
    <div className="flex h-[360px] flex-col p-6">
      <AnimatePresence mode="wait">
        <motion.div key={company.id} {...fade} transition={{ duration: 0.35, ease: "easeOut" }}>
          <div className="flex h-10 items-center">
            <Image
              src={company.logo}
              alt={company.title}
              width={150}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </div>

          <h3 className="mt-5 font-serif-display text-xl text-white">{company.title}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
            {t(`items.${company.id}.role`)} · {t(`items.${company.id}.period`)}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/55 line-clamp-5">
            {t(`items.${company.id}.description`)}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {company.stack.map((logo) => (
              <span
                key={logo}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-white/90 p-1"
              >
                <Image src={logo} alt="" width={20} height={20} className="h-full w-full object-contain" />
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
