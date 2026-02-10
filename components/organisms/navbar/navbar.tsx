"use client"

import { useRef } from "react"
import { usePreloader } from "@/hooks/usePreloader"
import { useNavbarAnimations } from "@/hooks/useNavbarAnimations"

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
          aria-label="Go to top"
        >
          CL
        </a>

        <button
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative flex flex-col items-center justify-center w-10 h-10 gap-[7px] group"
        >
          <span
            ref={topLineRef}
            className={`block w-6 h-[1.5px] transition-colors duration-200 ${
              menuOpen ? "bg-white" : "bg-white/70 group-hover:bg-white"
            }`}
          />
          <span
            ref={bottomLineRef}
            className={`block w-6 h-[1.5px] transition-colors duration-200 ${
              menuOpen ? "bg-white" : "bg-white/70 group-hover:bg-white"
            }`}
          />
        </button>
      </div>

      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[hsl(356,96%,32%)] scale-x-0 origin-left"
      />
    </nav>
  )
}
