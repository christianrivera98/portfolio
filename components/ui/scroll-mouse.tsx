"use client"

/**
 * Animated mouse hint that simulates a downward scroll gesture: a rounded
 * outline body with a wheel-dot that travels down on a loop. Decorative.
 */
export function ScrollMouse({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-flex h-9 w-[22px] items-start justify-center rounded-full border-2 border-white/40 p-1.5 ${className ?? ""}`}
    >
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/70" />
    </span>
  )
}
