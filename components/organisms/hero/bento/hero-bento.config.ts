export const STACK_LAYERS = [
  {
    id: "ui",
    title: "UI Layer",
    color: "#5227FF",
    items: [
      { src: "/logos/css.svg", alt: "CSS" },
      { src: "/logos/tailwind.svg", alt: "Tailwind CSS" },
      { src: "/logos/shadcn-ui.svg", alt: "ShadCN UI" }
    ],
  },
  {
    id: "app",
    title: "Application",
    color: "#16A34A",
    items: [
      { src: "/logos/react.svg", alt: "React" },
      { src: "/logos/nextjs.svg", alt: "Next.js" },
      { src: "/logos/tanstack.svg", alt: "TANStack" },
    ],
  },
  {
    id: "safety",
    title: "Type Safety",
    color: "#2563EB",
    items: [
      { src: "/logos/typescript.svg", alt: "TypeScript" },
      { src: "/logos/zod.svg", alt: "Zod" },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    color: "#0F172A",
    items: [
      { src: "/logos/vercel.svg", alt: "Vercel" },
      { src: "/logos/github_light.svg", alt: "CI/CD" },
    ],
  },
] as const

export const HUMAN_ITEMS = [
  {
    id: "mechatronics",
    title: "I'm a Mechatronics Engineer",
    description: "Engineering mindset beyond software.",
    video: "/videos/mechatronics.mp4",
  },
  {
    id: "hiphop",
    title: "I'm a hip-hop lover",
    description: "Creativity, rhythm, and culture shape how I think.",
    video: "/videos/hiphop.mp4",
  },
  {
    id: "animals",
    title: "I love animals",
    description: "Empathy matters — in life and in products.",
    video: "/videos/animals.mp4",
  },
  {
    id: "travel",
    title: "I love traveling",
    description: "New places, new perspectives.",
    video: "/videos/travel.mp4",
  },
  {
    id: "kungfu",
    title: "My favorite movie is Kung Fu Panda",
    description: "Balance, discipline, and humor — always.",
    video: "/videos/kungfu.mp4",
  },
];

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
