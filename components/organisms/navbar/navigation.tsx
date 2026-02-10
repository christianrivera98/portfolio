"use client"

import { useState, useCallback } from "react"
import { Navbar } from "./navbar"
import { StaggeredMenu } from "./staggered-menu"

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <Navbar menuOpen={menuOpen} onToggleMenu={toggleMenu} />
      <StaggeredMenu open={menuOpen} onClose={closeMenu} />
    </>
  )
}
