"use client"

import { Terminal } from "@/components/ui/terminal"
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"
import { BUILD_COMMAND, BUILD_OUTPUT } from "./visuals.config"

const TABS = ["problems", "output", "terminal"]

/**
 * 04 — VS Code's integrated terminal running the production build. Reuses the
 * preloader's Terminal for the typing and the syntax colours; `chrome="none"`
 * swaps its macOS title bar for the editor's panel tabs.
 */
export function ConsoleVisual() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="visual-mono visual-corner visual-corner-wide visual-tilt-a w-[78%] pr-2 pt-5 md:w-[62%]">
      <div className="overflow-hidden rounded-md bg-[#16161c] ring-1 ring-white/[0.06] shadow-[0_10px_28px_-10px_hsl(0_0%_0%/0.7)]">
        <div className="flex gap-3 px-3 pt-2 text-[8px] uppercase tracking-[0.18em] text-foreground/35">
          {TABS.map((tab) => (
            <span
              key={tab}
              className={
                tab === "terminal"
                  ? "border-b border-[hsl(var(--accent))] pb-1 text-foreground/75"
                  : "pb-1"
              }
            >
              {tab}
            </span>
          ))}
        </div>

        {reduced ? (
          <div className="space-y-[3px] p-3 text-[9px] leading-relaxed text-foreground/60">
            <p className="text-foreground/80">$ {BUILD_COMMAND}</p>
            {BUILD_OUTPUT.map((line, i) => (
              <p key={i} className="whitespace-pre">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <Terminal
            commands={[BUILD_COMMAND]}
            outputs={{ 0: BUILD_OUTPUT }}
            username="portfolio"
            chrome="none"
            enableSound={false}
            typingSpeed={22}
            initialDelay={300}
            delayBetweenCommands={200}
            className="max-w-none px-0 text-[10px] [&_span]:text-neutral-300"
            contentClassName="h-[128px] p-3"
          />
        )}
      </div>
    </div>
  )
}
