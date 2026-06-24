import { useTranslations } from "next-intl"

/**
 * One bento card describing how I work: a gradient orb, a title and a short
 * description. Hover lifts the card, lights a crimson edge glow and grows the
 * orb — bold but controlled.
 */
export function ProcessCard({ id }: { id: string }) {
  const t = useTranslations("Technologies")

  return (
    <div className="process-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[hsl(var(--primary))]/40 hover:bg-white/[0.04] md:p-9">
      {/* crimson glow that blooms from the top-left on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--primary)/0.18),transparent_55%)]" />

      <div className="relative">
        <div className="mb-6 size-12 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffffff,#9a9a9a_38%,#0d0d0d_100%)] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6" />

        <h3 className="font-serif-display text-xl font-bold text-white sm:text-2xl">
          {t(`process.${id}.title`)}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/70">
          {t(`process.${id}.desc`)}
        </p>
      </div>
    </div>
  )
}
