"use client"

import { type ReactNode } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

const TabletBackground = dynamic(
  () => import("@/components/organisms/transition/tablet-background").then((m) => m.TabletBackground),
  { ssr: false }
)

export function TabletShell({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[26px] border border-white/12 bg-white/[0.04] p-2.5 shadow-2xl backdrop-blur-md",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <TabletBackground />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
