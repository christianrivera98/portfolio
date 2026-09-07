"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
import { usePreloader } from "@/hooks/usePreloader"
import { useNavbarAnimations } from "@/hooks/useNavbarAnimations"
import { useSectionIndicator } from "@/hooks/useSectionIndicator"
import { LanguageSwitcher } from "./language-switcher"

interface NavbarProps {
  menuOpen: boolean
  onToggleMenu: () => void
}

export function Navbar({ menuOpen, onToggleMenu }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const topLineRef = useRef<HTMLSpanElement>(null)
  const bottomLineRef = useRef<HTMLSpanElement>(null)
  const { isComplete } = usePreloader()
  const { label, totalLabel } = useSectionIndicator()
  const t = useTranslations("Nav")

  const scrolled = useNavbarAnimations(navRef, progressRef, topLineRef, bottomLineRef, isComplete, menuOpen)

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 opacity-0 transition-colors duration-300 ${
        scrolled && !menuOpen ? "bg-black/60 backdrop-blur-md" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5">
        <a
          href="#home"
          className="font-serif-display text-xl text-white/80 hover:text-white transition-colors duration-200"
          aria-label={t("goToTop")}
        >
          CL
        </a>

        <span
          className={`hidden md:block text-[11px] font-mono tracking-wider transition-opacity duration-300 ${
            menuOpen ? "opacity-0" : "text-white/30"
          }`}
          aria-live="polite"
        >
          {label}
          <span className="text-white/15"> / {totalLabel}</span>
        </span>

        <div className="flex items-center gap-2">
          <LanguageSwitcher menuOpen={menuOpen} />
          <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          className="menu-toggle relative flex flex-col items-center justify-center w-10 h-10 gap-[7px]"
        >
          <span ref={topLineRef} className="menu-toggle-line block w-6 h-[1.5px]" />
          <span ref={bottomLineRef} className="menu-toggle-line block w-6 h-[1.5px]" />
          </button>
        </div>
      </div>

      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[hsl(356,96%,32%)] scale-x-0 origin-left"
      />
    </nav>
  )
}
