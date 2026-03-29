import { SITE_CONFIG } from "@/lib/site.config"

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-16 py-12 md:py-16">
        {/* Top row: Initials + Social links */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex flex-col gap-1">
            <span className="font-serif-display text-2xl text-white/80">
              CL
            </span>
            <span className="text-xs font-mono text-white/30">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex flex-col items-end gap-2 text-sm">
            <a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-white/40 hover:text-[hsl(356,96%,32%)] transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-white/40 hover:text-[hsl(356,96%,32%)] transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Credit line */}
        <div className="text-xs font-mono text-white/20 leading-relaxed">
          <p>
            Designed &amp; built by {SITE_CONFIG.name}
          </p>
          <p>with Next.js, GSAP &amp; Three.js</p>
        </div>
      </div>
    </footer>
  )
}
