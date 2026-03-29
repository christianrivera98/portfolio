export type Interest = {
  id: string
  label: string
  video: string
}

export type QuickFact = {
  label: string
  value: string
}

export const ABOUT_PROFILE = {
  photo: "/images/profile.png",
  quote: "I see the frontend as part of a larger system.",
  bio: [
    "I trained as a mechatronics engineer before falling in love with the web. That background taught me to think in systems — sensors, actuators, control loops — and I bring that same mindset to every interface I build.",
    "Today I specialize in React, Next.js, and TypeScript, building production interfaces for fintech and scalable SaaS platforms. I care deeply about performance, accessibility, and the small details that make a product feel alive.",
    "I'm currently looking for my next challenge — a team that values craft, ships fast, and builds things that matter.",
  ],
  quickFacts: [
    { label: "Location", value: "Colombia" },
    { label: "Languages", value: "ES / EN" },
    { label: "Current", value: "Frontend Engineer" },
    { label: "Education", value: "Mechatronics Eng." },
  ] satisfies QuickFact[],
  interests: [
    { id: "travel", label: "Travel", video: "/videos/travel.mp4" },
    { id: "hiphop", label: "Hip Hop", video: "/videos/hiphop.mp4" },
    { id: "kungfu", label: "Kung Fu", video: "/videos/kungfu.mp4" },
    { id: "animals", label: "Animals", video: "/videos/animals.mp4" },
    { id: "mechatronics", label: "Mechatronics", video: "/videos/mechatronics.mp4" },
  ] satisfies Interest[],
} as const

export const ABOUT_SECTION = {
  label: "About",
  title: "Beyond the Code",
} as const
