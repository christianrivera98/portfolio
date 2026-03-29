import { Hero } from "@/components/organisms/hero/hero"
import { Experience } from "@/components/organisms/experience/experience"
import { Projects } from "@/components/organisms/projects/projects"
import { Technologies } from "@/components/organisms/technologies/technologies"
import { About } from "@/components/organisms/about/about"
import { Contact } from "@/components/organisms/contact/contact"
import { SectionDivider } from "@/components/ui/section-divider"

export default function Home() {
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
