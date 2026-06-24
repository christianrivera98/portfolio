export type ExperienceEntry = {
  id: string
  company: string
  type: "fulltime" | "freelance"
  location?: string
  // Set when this job shipped a project to MVP/production. Maps to PROJECTS[id]
  // and unlocks the "view project details" action beside the title.
  projectId?: string
  // Short brand shown inside the project CTA ("Conoce un poco a {ctaLabel}").
  // Decoupled from the project name used in the Projects section.
  ctaLabel?: string
}

// Language-neutral data only; role / period / highlights live in messages (Experience.items.*)
export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  { id: "toolbooks", company: "ToolBooks", type: "freelance", location: "US", projectId: "toolbooks", ctaLabel: "ToolBooks" },
  { id: "precision-logistica", company: "Precisión Logística", type: "fulltime", projectId: "qper", ctaLabel: "Qper" },
  { id: "geeks5g", company: "Geeks5G Agency", type: "fulltime", projectId: "geeks5g", ctaLabel: "GetService" },
  { id: "bancolombia", company: "Bancolombia", type: "fulltime" },
  { id: "dicosoft", company: "DicoSoft", type: "freelance" },
  { id: "radkiddo", company: "Rad Kiddo", type: "freelance" },
]
