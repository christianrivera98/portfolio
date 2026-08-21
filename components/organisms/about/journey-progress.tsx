/**
 * One of the two bars that bracket the horizontal run. Both are driven by the
 * same class, so a single `gsap.set` moves them together.
 */
export function JourneyProgress() {
  return (
    <div className="journey-progress h-px w-full bg-white/10">
      <div className="journey-progress-fill h-full w-full origin-left scale-x-0 bg-[hsl(var(--accent))]" />
    </div>
  )
}
