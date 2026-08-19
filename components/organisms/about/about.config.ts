export type Interest = {
  id: string
  video: string
}

// Language-neutral data only; quote / bio / facts / interest labels live
// in messages (About.*)
export const ABOUT_PROFILE = {
  photo: "/images/profile.png",
  interests: [
    { id: "travel", video: "/videos/travel.mp4" },
    { id: "hiphop", video: "/videos/hiphop.mp4" },
    { id: "kungfu", video: "/videos/kungfu.mp4" },
    { id: "animals", video: "/videos/animals.mp4" },
    { id: "mechatronics", video: "/videos/mechatronics.mp4" },
  ] satisfies Interest[],
} as const

// Keys into About.facts.* — each maps to a `${key}` label and `${key}Value` value
export const ABOUT_FACT_KEYS = [
  "location",
  "languages",
  "current",
  "education",
] as const
