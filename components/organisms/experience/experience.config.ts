export type ExperienceEntry = {
  id: string
  company: string
  type: "fulltime" | "freelance"
  location?: string
  // Set when this job shipped a project to MVP/production. Maps to PROJECTS[id]
  // and unlocks the "view project details" action beside the title.
  projectId?: string
}

// Language-neutral data only; role / period / highlights live in messages (Experience.items.*)
export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  { id: "toolbooks", company: "ToolBooks", type: "freelance", location: "US", projectId: "toolbooks" },
  { id: "precision-logistica", company: "Precisión Logística", type: "fulltime", projectId: "qper" },
  { id: "geeks5g", company: "Geeks5G Agency", type: "fulltime", projectId: "geeks5g" },
  { id: "bancolombia", company: "Bancolombia", type: "fulltime" },
  { id: "dicosoft", company: "DicoSoft", type: "freelance" },
  { id: "radkiddo", company: "Rad Kiddo", type: "freelance", projectId: "radkiddo" },
]
