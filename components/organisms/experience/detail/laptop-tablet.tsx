"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useExperienceDetail } from "../experience-detail.context"
import { TabletShell } from "./tablet-shell"
import { DetailSlider } from "./detail-slider"

/**
 * Laptop (lg–xl) detail surface: a sticky tablet that starts folded edge-on
 * (only its border showing) and unfolds with a fluid Y-axis rotation when an
 * experience option is clicked. The hide button folds it back; reopening is
 * only via the title icons / project CTA.
 */
export function LaptopTablet() {
  const { detail, close } = useExperienceDetail()
  const tt = useTranslations("Transition")
  const reduce = useReducedMotion()
  const open = detail !== null
  const tabletRef = useRef<HTMLDivElement>(null)

  // Click outside the tablet closes it (the page stays interactive otherwise).
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!tabletRef.current?.contains(e.target as Node)) close()
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [open, close])

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 hidden xl:block 2xl:hidden",
        // Open → above the text; folded → behind it (but above the section bg).
        open ? "z-30" : "z-0"
      )}
    >
      <div className="sticky top-[12vh] flex justify-end pr-[5%]" style={{ perspective: "1600px" }}>
        <motion.div
          ref={tabletRef}
          data-laptop-tablet
          className="relative w-[26rem] origin-right xl:w-[30rem]"
          style={{ transformStyle: "preserve-3d", pointerEvents: open ? "auto" : "none" }}
          animate={{ rotateY: open ? 0 : -88, opacity: open ? 1 : 0.7 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }}
        >
          <TabletShell>
            {/* Fixed height so the folded state shows a tall side-on edge
                (the tablet's height profile), not a short empty sliver. */}
            <div className="flex min-h-[24rem] flex-col justify-center">
              <DetailSlider />
            </div>
          </TabletShell>
          {open && (
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
          )}
        </motion.div>
      </div>
    </div>
  )
}
