"use client"

import Folder from "@/components/ui/folder"
import { STACK_LAYERS } from "../hero-bento.config"
import { LogoItem } from "@/components/atoms/logoItem"

export function HeroBentoStack() {
  return (
    <div className="grid h-full w-full grid-cols-2 place-items-center gap-12 md:gap-16 p-4">
      {STACK_LAYERS.map((layer) => (
        <div
          key={layer.id}
          className="flex flex-col items-center gap-3 transition-transform duration-300 ease-out hover:scale-[1.02]"
        >
          <Folder
            color={layer.color}
            size={0.9}
            items={layer.items.map((item) => <LogoItem key={item.alt} src={item.src} alt={item.alt} />)}
          />
          <span className="text-xs font-medium tracking-wide text-[hsl(var(--muted))]/90">{layer.title}</span>
        </div>
      ))}
    </div>
  )
}
