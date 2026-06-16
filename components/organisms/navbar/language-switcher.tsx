"use client"

import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

export function LanguageSwitcher({ menuOpen }: { menuOpen: boolean }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("Nav")

  const next = locale === "en" ? "es" : "en"
  const switchLanguage = () => router.replace(pathname, { locale: next })

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={t("switchLanguage")}
      className={`flex h-10 items-center px-2 text-[11px] font-mono uppercase tracking-wider transition-opacity duration-200 ${
        menuOpen
          ? "opacity-0 pointer-events-none"
          : "text-white/40 hover:text-white"
      }`}
    >
      {locale === "en" ? "ES" : "EN"}
    </button>
  )
}
