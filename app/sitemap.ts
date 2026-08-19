import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { SITE_CONFIG } from "@/lib/site.config"

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${SITE_CONFIG.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_CONFIG.url}/${l}`])
      ),
    },
  }))
}
