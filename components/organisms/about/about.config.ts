/** Which original vector motif backs each interest — see `about.motifs.ts`. */
export type InterestMotif = "compass" | "waveform" | "ink" | "paw" | "gears"

export type Interest = {
  id: string
  video: string
  motif: InterestMotif
}

// Language-neutral data only; quote / bio / facts / interest labels and bodies
// live in messages (About.*)
export const ABOUT_PROFILE = {
  photo: "/images/profile.png",
  // Order is the reading order of the theatre: chapter 01 is the first entry.
  interests: [
    { id: "travel", video: "/videos/travel.mp4", motif: "compass" },
    { id: "hiphop", video: "/videos/hiphop.mp4", motif: "waveform" },
    { id: "kungfu", video: "/videos/kungfu.mp4", motif: "ink" },
    { id: "animals", video: "/videos/animals.mp4", motif: "paw" },
    { id: "mechatronics", video: "/videos/mechatronics.mp4", motif: "gears" },
  ] satisfies Interest[],
} as const

// Keys into About.facts.* — each maps to a `${key}` label and `${key}Value` value
export const ABOUT_FACT_KEYS = [
  "location",
  "languages",
  "current",
  "education",
] as const
