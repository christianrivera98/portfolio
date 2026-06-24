"use client"

import { useTranslations } from "next-intl"
import { Info, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useExperienceDetail } from "./experience-detail.context"

/**
 * Company affordance beside a title. Mobile/tablet (<xl): a tappable info icon
 * that opens the detail overlay. Laptop (xl+): a non-interactive hint that
 * brightens on title hover, signalling "hover to see this company".
 */
export function CompanyInfoButton({ index }: { index: number }) {
  const t = useTranslations("Experience")
  const { openCompany } = useExperienceDetail()

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={t("viewCompany")}
        onClick={() => openCompany(index)}
        className="text-white/25 hover:bg-white/5 hover:text-white/70 xl:hidden"
      >
        <Info />
      </Button>

      <span className="hidden items-center gap-1.5 text-white/25 transition-colors duration-300 group-hover/title:text-[hsl(var(--primary))] xl:inline-flex">
        <Info className="size-4" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          {t("companyHint")}
        </span>
      </span>
    </>
  )
}

/**
 * Charismatic text CTA below a title — only when the job shipped a project.
 * Invites the visitor to browse the interfaces/experiences built there.
 */
export function ProjectDetailsCta({ projectId }: { projectId: string }) {
  const t = useTranslations("Experience")
  const tp = useTranslations("Projects")
  const { openProject } = useExperienceDetail()

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => openProject(projectId)}
      className="shader-cta group/cta h-auto w-fit max-w-full cursor-pointer gap-2 whitespace-normal rounded-2xl border border-white/10 px-5 py-2.5 text-left text-sm font-medium text-white shadow-xl shadow-black/40 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:text-white hover:shadow-[0_8px_30px_-4px_hsl(var(--primary)/0.45)] active:scale-[0.98] sm:rounded-full"
    >
      {t("viewProject", { project: tp(`items.${projectId}.name`) })}
      <ArrowUpRight className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
    </Button>
  )
}
