import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { routing, type Locale } from "@/i18n/routing"
import { SITE_CONFIG } from "@/lib/site.config"
import { SITE_URL } from "@/lib/site-url"

const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
}

export async function buildMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Meta" })
  const languages = {
    ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    "x-default": `/${routing.defaultLocale}`,
  }

  return {
    metadataBase: new URL(SITE_URL),
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
      locale: OG_LOCALES[locale],
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
    manifest: "/manifest.json",
  }
}
