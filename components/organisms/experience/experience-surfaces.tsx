"use client"

import { ScrollInvite } from "@/components/organisms/transition/scroll-invite"
import { LaptopTablet } from "./detail/laptop-tablet"
import { DetailTabletOverlay } from "./detail/detail-tablet-overlay"

/**
 * Both experience surfaces behind ONE module, so the deferred chunk carries a
 * single copy of motion/react. Splitting them into separate dynamic imports
 * duplicated it once per chunk (+131 KB gzip over the wire).
 */
export function ExperienceSurfaces({ part }: { readonly part: "sticky" | "overlay" }) {
  if (part === "overlay") return <DetailTabletOverlay />
  return (
    <>
      <ScrollInvite />
      <LaptopTablet />
    </>
  )
}
