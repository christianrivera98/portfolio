export type TechItem = {
  name: string
  logo?: string
}

// Layer `id` maps to a translated label in messages (Technologies.layers.*)
export type TechLayer = {
  id: string
  items: TechItem[]
}

export const TECH_LAYERS: TechLayer[] = [
  {
    id: "frontend",
    items: [
      { name: "React", logo: "/logos/react.svg" },
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "JavaScript", logo: "/logos/javascript.svg" },
    ],
  },
  {
    id: "styling",
    items: [
      { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
      { name: "Radix / shadcn", logo: "/logos/shadcn-ui.svg" },
      { name: "SASS" },
      { name: "Framer Motion" },
      { name: "GSAP" },
    ],
  },
  {
    id: "state-data",
    items: [
      { name: "TanStack Query", logo: "/logos/tanstack.svg" },
      { name: "TanStack Table" },
      { name: "Redux Toolkit" },
      { name: "React Hook Form" },
      { name: "Zod", logo: "/logos/zod.svg" },
    ],
  },
  {
    id: "integrations",
    items: [
      { name: "Plaid" },
      { name: "Stripe" },
      { name: "AWS Cognito" },
      { name: "NextAuth" },
      { name: "Socket.io" },
      { name: "RNDC" },
    ],
  },
  {
    id: "quality",
    items: [
      { name: "Vitest" },
      { name: "Playwright" },
      { name: "Testing Library" },
      { name: "Docker" },
      { name: "Git", logo: "/logos/github_light.svg" },
      { name: "AWS S3" },
    ],
  },
]
