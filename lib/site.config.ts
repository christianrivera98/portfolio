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
