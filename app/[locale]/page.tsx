import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/organisms/hero/hero"
import { Experience } from "@/components/organisms/experience/experience"
import { ExperienceDetailProvider } from "@/components/organisms/experience/experience-detail.context"
import { DetailTabletOverlay } from "@/components/organisms/experience/detail/detail-tablet-overlay"
import { LaptopTablet } from "@/components/organisms/experience/detail/laptop-tablet"
import { Technologies } from "@/components/organisms/technologies/technologies"
import { About } from "@/components/organisms/about/about"
import { Contact } from "@/components/organisms/contact/contact"
import { ScrollInvite } from "@/components/organisms/transition/scroll-invite"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <ExperienceDetailProvider>
        <div className="relative">
          <Experience />
          <ScrollInvite />
          <LaptopTablet />
        </div>
        <DetailTabletOverlay />
      </ExperienceDetailProvider>
      <Technologies />
      <About />
      <Contact />
    </>
  )
}
