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
      "Frontend Lead",
      "Frontend Engineer",
      "React",
      "Next.js",
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
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: SITE_CONFIG.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: "/favicon.ico",
    },
    manifest: "/manifest.json",
  }
}
