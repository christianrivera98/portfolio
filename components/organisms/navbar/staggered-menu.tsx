"use client"

import { useRef, useCallback } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useMenuAnimations } from "@/hooks/useMenuAnimations"
import { useScrollLock } from "@/hooks/useScrollLock"
import { NAV_ITEMS, SOCIAL_ITEMS } from "./nav.config"

gsap.registerPlugin(ScrollToPlugin)

interface StaggeredMenuProps {
  open: boolean
  onClose: () => void
}

export function StaggeredMenu({ open, onClose }: StaggeredMenuProps) {
  const t = useTranslations("Nav")
  const listRef = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useMenuAnimations(open, listRef)
  useScrollLock(open)

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      e.preventDefault()
      onClose()
      gsap.delayedCall(0.35, () => {
        gsap.to(window, { scrollTo: { y: link, offsetY: 0 }, duration: 1.2, ease: "power3.inOut" })
      })
    },
    [onClose]
  )

  return (
    <div ref={overlayRef} className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <aside className={`absolute inset-y-0 right-0 w-full md:w-[42vw] lg:w-[27vw] bg-[#0a0a0a] border-l border-white/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-full w-full flex-col justify-center px-8 md:px-10 lg:px-12">
          <ul ref={listRef} className="flex flex-col gap-5">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  aria-label={t(`${item.id}Aria`)}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className="menu-link flex w-fit items-baseline gap-4 py-1 outline-none focus-visible:ring-2 focus-visible:ring-[hsl(356,96%,32%)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0a] rounded-sm"
                >
                  <span className="menu-link-index text-xs font-mono text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="menu-link-label text-3xl md:text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold uppercase tracking-tight">
                    {t(item.id)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <footer className="mt-16 pt-8 border-t border-white/[0.06]">
            <ul className="flex gap-6">
              {SOCIAL_ITEMS.map((social) => (
                <li key={social.label}>
                  <a href={social.link} target="_blank" rel="noopener noreferrer" className="menu-social-link text-sm font-mono text-white/40 hover:text-[hsl(356,96%,32%)] transition-colors duration-200">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </aside>
    </div>
  )
}
