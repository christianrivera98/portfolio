import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { SITE_CONFIG } from "@/lib/site.config"

export async function buildMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" })
  const ogLocale = locale === "es" ? "es_ES" : "en_US"
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  )

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}`, languages },
    keywords: [
      "Full-Stack Engineer",
      "Frontend Lead",
      "React",
      "Next.js",
      "Nest.js",
      "TypeScript",
      "Fintech",
      "Christian Lamadrid",
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: ogLocale,
      url: `${SITE_CONFIG.url}/${locale}`,
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      // `summary_large_image` without an image renders an empty card; upgrade it
      // the day an og-image exists.
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    // No `icons` key on purpose: setting it makes Next skip the file-based
    // convention, and app/favicon.ico is the only icon that actually exists.
    manifest: "/manifest.json",
  }
}
