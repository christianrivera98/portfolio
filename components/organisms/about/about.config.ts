export type InterestMotif = "compass" | "waveform" | "ink" | "paw" | "gears"

export type Interest = {
  id: string
  video: string
  motif: InterestMotif
}

export const ABOUT_PROFILE = {
  photo: "/images/profile.png",
  interests: [
    { id: "travel", video: "/videos/travel.mp4", motif: "compass" },
    { id: "hiphop", video: "/videos/hiphop.mp4", motif: "waveform" },
    { id: "kungfu", video: "/videos/kungfu.mp4", motif: "ink" },
    { id: "animals", video: "/videos/animals.mp4", motif: "paw" },
    { id: "mechatronics", video: "/videos/mechatronics.mp4", motif: "gears" },
  ] satisfies Interest[],
} as const

export const ABOUT_FACT_KEYS = [
  "location",
  "languages",
  "current",
  "education",
] as const
