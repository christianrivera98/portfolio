import Link from "next/link"
import { SITE_CONFIG } from "@/lib/site.config"

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] mt-32">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{SITE_CONFIG.name}</span>
          <span className="text-sm text-[hsl(var(--muted))]">
            {SITE_CONFIG.title} · React · Next.js
          </span>
        </div>

        <div className="text-sm text-[hsl(var(--muted))]">
          <Link
            href={`mailto:${SITE_CONFIG.email}`}
            className="hover:text-[hsl(var(--primary))] transition-colors"
          >
            {SITE_CONFIG.email}
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--primary))] transition-colors"
          >
            GitHub
          </a>
          <a
            href={SITE_CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--primary))] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="px-6 pb-6 text-center text-xs text-[hsl(var(--muted))]">
        &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
