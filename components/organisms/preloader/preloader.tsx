"use client"

import { useRef, useState, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Terminal } from "@/components/ui/terminal"
import { usePreloaderExit } from "@/hooks/usePreloaderExit"

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const t = useTranslations("Preloader")
  const containerRef = useRef<HTMLDivElement>(null)
  const [unmounted, setUnmounted] = useState(false)
  const handleUnmount = useCallback(() => setUnmounted(true), [])

  const { prefersReduced, onTerminalComplete } = usePreloaderExit(
    containerRef, onComplete, handleUnmount
  )

  if (unmounted || prefersReduced) return null

  const commands = t.raw("commands") as string[]
  const outputs = t.raw("outputs") as Record<number, string[]>

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black"
      aria-hidden="true"
    >
      <h2 className="animate-pulse font-mono text-sm tracking-widest text-neutral-400 uppercase">
        {t("title")}
      </h2>
      <Terminal
        commands={commands}
        outputs={outputs}
        username={t("username")}
        typingSpeed={22}
        delayBetweenCommands={300}
        initialDelay={250}
        enableSound={false}
        onComplete={onTerminalComplete}
      />
    </div>
  )
}
