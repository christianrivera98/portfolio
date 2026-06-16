import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/organisms/hero/hero"
import { Experience } from "@/components/organisms/experience/experience"
import { Projects } from "@/components/organisms/projects/projects"
import { Technologies } from "@/components/organisms/technologies/technologies"
import { About } from "@/components/organisms/about/about"
import { Contact } from "@/components/organisms/contact/contact"
import { SectionDivider } from "@/components/ui/section-divider"

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
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Technologies />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Contact />
    </>
  )
}
