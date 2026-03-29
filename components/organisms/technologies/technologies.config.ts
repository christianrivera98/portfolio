export type TechItem = {
  name: string
  logo?: string
}

export type TechLayer = {
  id: string
  label: string
  items: TechItem[]
}

export const TECH_LAYERS: TechLayer[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", logo: "/logos/react.svg" },
      { name: "Next.js", logo: "/logos/nextjs.svg" },
      { name: "TypeScript", logo: "/logos/typescript.svg" },
      { name: "JavaScript", logo: "/logos/javascript.svg" },
    ],
  },
  {
    id: "styling",
    label: "Styling",
    items: [
      { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
      { name: "Shadcn/ui", logo: "/logos/shadcn-ui.svg" },
      { name: "CSS", logo: "/logos/css.svg" },
      { name: "SASS" },
    ],
  },
  {
    id: "state-data",
    label: "State & Data",
    items: [
      { name: "TanStack Query", logo: "/logos/tanstack.svg" },
      { name: "Zustand" },
      { name: "Zod", logo: "/logos/zod.svg" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", logo: "/logos/nodejs.svg" },
      { name: "Express" },
      { name: "REST APIs" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    items: [
      { name: "Vercel", logo: "/logos/vercel.svg" },
      { name: "Docker" },
      { name: "GitHub", logo: "/logos/github_light.svg" },
      { name: "GitLab", logo: "/logos/gitlab.svg" },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    items: [
      { name: "Jest" },
      { name: "Playwright" },
      { name: "React Testing Library" },
    ],
  },
]

export const TECHNOLOGIES_SECTION = {
  label: "Stack",
  title: "Technologies",
  subtitle: "Tools I ship with.",
} as const
