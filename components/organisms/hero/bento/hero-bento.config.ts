// Type for stack items (used by TechOrbitItem)
export type StackItem = {
  logo: string
  name: string
  color: string
}

// Hero Profile Configuration
export const HERO_PROFILE = {
  name: "CHRISTIAN LAMADRID",
  title: "Frontend Engineer",
  subtitle: "Fintech · Production Systems",
  bio: "5+ years building interfaces for systems that process real transactions.",
  credentials: "Ex-Bancolombia · TypeScript strict mode · React + Next.js",
  photo: "/images/profile.png", // Add your professional photo here
} as const

// Tech Stack Tags - shown at the bottom of hero
export const TECH_STACK_TAGS = [
  { id: "react", label: "React" },
  { id: "nextjs", label: "Next.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "nodejs", label: "Node.js" },
  { id: "tailwind", label: "Tailwind" },
] as const

// Call to Action Buttons
export const HERO_CTAS = [
  {
    id: "work",
    label: "View Work",
    href: "#work",
    variant: "primary" as const,
    icon: "arrow",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/yourusername",
    variant: "outline" as const,
    icon: "external",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    variant: "outline" as const,
    icon: "external",
    external: true,
  },
] as const

// Social Links (for other uses)
export const SOCIAL_LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "hello@christianlamadrid.com",
} as const

// Legacy: Stack Layers (kept for potential future use)
export const STACK_LAYERS = [
  {
    id: "ui",
    title: "UI Layer",
    color: "#5227FF",
    items: [
      { src: "/logos/css.svg", alt: "CSS" },
      { src: "/logos/shadcn-ui.svg", alt: "ShadCN UI" },
      { src: "/logos/tailwindcss.svg", alt: "Tailwind CSS" }
    ],
  },
  {
    id: "app",
    title: "Application",
    color: "#16A34A",
    items: [
      { src: "/logos/nextjs.svg", alt: "Next.js" },
      { src: "/logos/nodejs.svg", alt: "TANStack" },
      { src: "/logos/react.svg", alt: "React" },
    ],
  },
  {
    id: "safety",
    title: "Type Safety",
    color: "#2563EB",
    items: [
      { src: "/logos/tanstack.svg", alt: "Tanstack Query" },
      { src: "/logos/zod.svg", alt: "Zod" },
      { src: "/logos/typescript.svg", alt: "TypeScript" }
    ],
  },
  {
    id: "ci/cd",
    title: "CI/CD",
    color: "#0F172A",
    items: [
      { src: "/logos/vercel.svg", alt: "Vercel" },
      { src: "/logos/gitlab.svg", alt: "Git Lab" },
      { src: "/logos/github_light.svg", alt: "CI/CD" }
    ],
  },
] as const

// Legacy: Focus Items (kept for potential future use)
export const FOCUS_ITEMS = [
  {
    id: "product",
    label: "Product-driven frontend development",
  },
  {
    id: "ux",
    label: "User-centered interfaces",
  },
  {
    id: "systems",
    label: "Scalable and maintainable systems",
  },
  {
    id: "performance",
    label: "Performance-first mindset",
  },
];

// Legacy: Human Items (kept for potential future use, removed from hero per plan)
export const HUMAN_ITEMS = [
  {
    id: "mechatronics",
    title: "I'm a Mechatronics Engineer",
    description: "Engineering mindset beyond software.",
    video: "/videos/mechatronics.mp4",
  },
];
