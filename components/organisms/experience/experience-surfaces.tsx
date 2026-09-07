"use client"

import { ScrollInvite } from "@/components/organisms/transition/scroll-invite"
import { LaptopTablet } from "./detail/laptop-tablet"
import { DetailTabletOverlay } from "./detail/detail-tablet-overlay"

export function ExperienceSurfaces({ part }: { readonly part: "sticky" | "overlay" }) {
  if (part === "overlay") return <DetailTabletOverlay />
  return (
    <>
      <ScrollInvite />
      <LaptopTablet />
    </>
  )
}
