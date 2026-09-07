export type ExperienceEntry = {
  id: string
  company: string
  type: "fulltime" | "freelance"
  location?: string
  projectId?: string
  ctaLabel?: string
}

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  { id: "toolbooks", company: "ToolBooks", type: "freelance", location: "US", projectId: "toolbooks", ctaLabel: "ToolBooks" },
  { id: "precision-logistica", company: "Precisión Logística", type: "fulltime", projectId: "qper", ctaLabel: "Qper" },
  { id: "geeks5g", company: "Geeks5G Agency", type: "fulltime", projectId: "geeks5g", ctaLabel: "GetService" },
  { id: "bancolombia", company: "Bancolombia", type: "fulltime" },
  { id: "dicosoft", company: "DicoSoft", type: "freelance" },
  { id: "radkiddo", company: "Rad Kiddo", type: "freelance" },
]
