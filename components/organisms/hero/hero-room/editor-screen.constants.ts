export interface EToken {
  text: string
  color: string
}

export const EDITOR = {
  w: 1000,
  h: 625,
  act: 60,
  side: 210,
  tabH: 42,
  statusH: 30,
  uiPad: 18,
  rowH: 34,
  iconSize: 22,
  tabW: 180,
  codeX: 72,
  bg: "#1e1e1e",
  sidebar: "#252526",
  activity: "#333333",
  tabBar: "#2d2d2d",
  status: "#a21d2b",
  gutter: "#6a6a6a",
  text: "#d4d4d4",
  accent: "#e11d2e",
  font: "27px ui-monospace, 'SF Mono', Menlo, monospace",
  uiFont: "19px ui-monospace, Menlo, monospace",
  lineH: 36,
  typeMs: 30,
  holdMs: 1800,
} as const

const KW = "#569cd6"
const PUR = "#c586c0"
const STR = "#ce9178"
const VAR = "#9cdcfe"
const TYP = "#4ec9b0"
const CMT = "#6a9955"
const P = "#d4d4d4"

export const EXPLORER = ["src", "  components", "    hero.tsx", "    navbar.tsx", "  app", "    page.tsx", "  lib"]

export const EDITOR_CODE: EToken[][] = [
  [{ text: "import", color: PUR }, { text: " { gsap } ", color: P }, { text: "from", color: PUR }, { text: " 'gsap'", color: STR }],
  [{ text: "", color: P }],
  [{ text: "export", color: PUR }, { text: " function ", color: KW }, { text: "Hero", color: TYP }, { text: "() {", color: P }],
  [{ text: "  const ", color: KW }, { text: "role", color: VAR }, { text: " = ", color: P }, { text: "'Full-Stack Engineer'", color: STR }],
  [{ text: "  // shape the system, then the parts", color: CMT }],
  [{ text: "  return ", color: PUR }, { text: "<", color: P }, { text: "Section", color: TYP }, { text: " />", color: P }],
  [{ text: "}", color: P }],
]
