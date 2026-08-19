"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollLock } from "@/hooks/useScrollLock"
import { useExperienceDetail } from "../experience-detail.context"
import { TabletShell } from "./tablet-shell"
import { DetailSlider } from "./detail-slider"

/**
 * Mobile/tablet (<lg) detail surface: a centered tablet that fades in over a
 * dimmed backdrop, renders the slider and hides with a fluid spring on close.
 */
export function DetailTabletOverlay() {
  const { detail, close } = useExperienceDetail()
  const tt = useTranslations("Transition")
  const reduce = useReducedMotion()
  // This overlay is the modal only below xl. On laptop/desktop the tablet is
  // inline/sticky, so the page must keep scrolling — lock only on mobile/tablet.
  const [isOverlay, setIsOverlay] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1279px)")
    const apply = () => setIsOverlay(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  useScrollLock(!!detail && isOverlay)

  useEffect(() => {
    if (!detail) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [detail, close])

  const pop = reduce
    ? {}
    : { initial: { opacity: 0, scale: 0.92, y: 16 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 16 } }

  return (
    <AnimatePresence>
      {detail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 xl:hidden"
        >
          <div
            aria-hidden
            onClick={close}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            {...pop}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[min(620px,92vw)]"
          >
            <TabletShell>
              <DetailSlider />
            </TabletShell>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={tt("hide")}
              onClick={close}
              className="absolute -right-2 -top-2 rounded-full border border-white/15 bg-[#0a0a0a] text-white/70 shadow-lg hover:bg-[#161616] hover:text-white"
            >
              <X />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
