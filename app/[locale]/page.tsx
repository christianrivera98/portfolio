import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/organisms/hero/hero"
import { Experience } from "@/components/organisms/experience/experience"
import { ExperienceDetailProvider } from "@/components/organisms/experience/experience-detail.context"
import {
  ExperienceDetailOverlay,
  ExperienceStickySurfaces,
} from "@/components/organisms/experience/deferred-surfaces"
import { Technologies } from "@/components/organisms/technologies/technologies"
import { About } from "@/components/organisms/about/about"
import { Contact } from "@/components/organisms/contact/contact"

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
          <ExperienceStickySurfaces />
        </div>
        <ExperienceDetailOverlay />
      </ExperienceDetailProvider>
      <Technologies />
      <About />
      <Contact />
    </>
  )
}
