export type ExperienceEntry = {
  id: string
  company: string
  type: "fulltime" | "freelance"
  location?: string
}

// Language-neutral data only; role / period / highlights live in messages (Experience.items.*)
export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  { id: "toolbooks", company: "ToolBooks", type: "freelance", location: "US" },
  { id: "precision-logistica", company: "Precisión Logística", type: "fulltime" },
  { id: "geeks5g", company: "Geeks5G Agency", type: "fulltime" },
  { id: "bancolombia", company: "Bancolombia", type: "fulltime" },
  { id: "dicosoft", company: "DicoSoft", type: "freelance" },
  { id: "radkiddo", company: "Rad Kiddo", type: "freelance" },
]
