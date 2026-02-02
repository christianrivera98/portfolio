import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] mt-32">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            Christian Rivera
          </span>
          <span className="text-sm text-[hsl(var(--muted))]">
            Frontend Developer · React · Next.js
          </span>
        </div>

        <div className="text-sm text-[hsl(var(--muted))]">
          <Link
            href="mailto:riveralamadridchristian@gmail.com"
            className="hover:text-[hsl(var(--primary))] transition-colors"
          >
            riveralamadridchristian@gmail.com
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://github.com/christianrivera98"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--primary))] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/christianrivera-ingeniero/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[hsl(var(--primary))] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="px-6 pb-6 text-center text-xs text-[hsl(var(--muted))]">
        © {new Date().getFullYear()} Christian Rivera. All rights reserved.
      </div>
    </footer>
  );
}
