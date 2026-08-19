"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function ScrollIndicator() {
  const arrowRef = useRef<SVGSVGElement>(null)
  const t = useTranslations("Common")

  useGSAP(() => {
    if (!arrowRef.current) return
    gsap.to(arrowRef.current, {
      y: 8,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
        {t("scroll")}
      </span>
      <svg
        ref={arrowRef}
        width="14"
        height="22"
        viewBox="0 0 14 22"
        fill="none"
        className="text-white/25"
      >
        <path
          d="M7 1v16m0 0l-5-5m5 5l5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
