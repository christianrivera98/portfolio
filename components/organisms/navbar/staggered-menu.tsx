"use client"

import { useRef, useCallback } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { useMenuAnimations } from "@/hooks/useMenuAnimations"
import { useScrollLock } from "@/hooks/useScrollLock"
import { MenuPreview } from "./menu-preview"
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
  const activePreviewRef = useRef<string | undefined>(NAV_ITEMS[0]?.previewImage)
  const previewStateRef = useRef<((src: string | undefined) => void) | undefined>(undefined)

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
      <aside className={`absolute inset-y-0 right-0 w-full md:w-[50vw] lg:w-[42vw] bg-[#0a0a0a] border-l border-white/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex h-full">
          <div className="hidden md:block w-1/2">
            <MenuPreview src={activePreviewRef.current} onSrcChange={previewStateRef} />
          </div>
          <div className="flex w-full md:w-1/2 flex-col justify-center px-8 md:px-12">
            <ul ref={listRef} className="flex flex-col gap-5">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    aria-label={t(`${item.id}Aria`)}
                    onClick={(e) => handleNavClick(e, item.link)}
                    onMouseEnter={() => { activePreviewRef.current = item.previewImage; previewStateRef.current?.(item.previewImage) }}
                    onFocus={() => { activePreviewRef.current = item.previewImage; previewStateRef.current?.(item.previewImage) }}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="text-xs font-mono text-white/20 group-hover:text-[hsl(356,96%,32%)] transition-colors duration-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl md:text-4xl font-semibold uppercase tracking-tight text-white/90 group-hover:text-white transition-colors duration-200 group-hover:translate-x-2 inline-block transform-gpu">
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
        </div>
      </aside>
    </div>
  )
}
