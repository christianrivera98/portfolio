// `id` maps to a translated title/description in messages (Technologies.process.*)
export type ProcessCard = { id: string }

export const PROCESS_CARDS: ProcessCard[] = [
  { id: "understand" },
  { id: "architecture" },
  { id: "build" },
  { id: "quality" },
]

// Brand logos — language-neutral. The 12 tools I lean on most (6×2 grid).
// Rendered monochrome and brightened on hover. Files in /projects/logos_stacks.
export type SkillLogo = { file: string; label: string }

const LOGO_DIR = "/projects/logos_stacks"

export const SKILL_LOGOS: SkillLogo[] = [
  { file: `${LOGO_DIR}/typescript.svg`, label: "TypeScript" },
  { file: `${LOGO_DIR}/react.svg`, label: "React" },
  { file: `${LOGO_DIR}/nextdotjs.svg`, label: "Next.js" },
  { file: `${LOGO_DIR}/tailwindcss.svg`, label: "Tailwind CSS" },
  { file: `${LOGO_DIR}/tanstack.svg`, label: "TanStack Query" },
  { file: `${LOGO_DIR}/shadcnui.svg`, label: "shadcn/ui" },
  { file: `${LOGO_DIR}/redux.svg`, label: "Redux" },
  { file: `${LOGO_DIR}/zod.svg`, label: "Zod" },
  { file: `${LOGO_DIR}/vitest.svg`, label: "Vitest" },
  { file: `${LOGO_DIR}/nestjs.svg`, label: "NestJS" },
  { file: `${LOGO_DIR}/postgresql.svg`, label: "PostgreSQL" },
  { file: `${LOGO_DIR}/socketdotio.svg`, label: "Socket.io" },
]
