import { useTranslations } from "next-intl"
import { Footer } from "../organisms/footer/footer"
import { StackJourney } from "../organisms/stack-journey/stack-journey"
import { Navigation } from "../organisms/navbar/navigation"
import { SmoothScrollProvider } from "../ui/smooth-scroll"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("Common")
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col">
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[hsl(356,96%,32%)] focus:text-white focus:rounded-sm focus:text-sm"
        >
          {t("skipToContent")}
        </a>
        <StackJourney />
        <Navigation />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}
