/**
 * Absolute origin for canonical links, sitemap and OG tags. Read-order matters:
 * `NEXT_PUBLIC_SITE_URL` is the custom domain once you attach one;
 * `VERCEL_PROJECT_PRODUCTION_URL` is the stable *.vercel.app name (VERCEL_URL is
 * the per-deployment hash, which must never end up in a canonical tag).
 * Only consumed server-side (robots.ts, sitemap.ts, lib/seo.ts).
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")

export const SITE_CONFIG = {
  name: "Christian Lamadrid",
  url: siteUrl,
  email: "riveralamadridchristian@gmail.com",
  social: {
    github: "https://github.com/christianrivera98",
    linkedin: "https://linkedin.com/in/christianrivera-ingeniero",
  },
} as const
