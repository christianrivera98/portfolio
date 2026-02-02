"use client"

import Link from "next/link"

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

interface HeroNavProps {
  className?: string
}

export function HeroNav({ className }: HeroNavProps) {
  return (
    <nav
      className={`flex items-center gap-8 ${className ?? ""}`}
      aria-label="Main navigation"
    >
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
