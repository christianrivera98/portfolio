/** Tokenized fake source rendered onto the laptop screen (typed line by line). */
export interface CodeToken {
  text: string
  color: string
}

export const SCREEN = {
  width: 600,
  height: 375,
  bg: "#0b0b0d",
  bar: "#17171b",
  gutter: "#3a3a42",
  cursor: "#e11d2e",
  font: "23px ui-monospace, 'SF Mono', Menlo, monospace",
  lineHeight: 30,
  padX: 26,
  padTop: 62,
  typeMs: 26, // ms per character
  holdMs: 1400, // pause once fully typed before looping
} as const

const KW = "#e85d6a" // crimson keyword
const FN = "#d4d4d8" // function / ident
const STR = "#7aa2a8" // strings
const MUT = "#5a5a63" // comments / punctuation

export const CODE_LINES: CodeToken[][] = [
  [{ text: "const ", color: KW }, { text: "dev", color: FN }, { text: " = {", color: MUT }],
  [{ text: "  role: ", color: FN }, { text: "'Full-Stack'", color: STR }, { text: ",", color: MUT }],
  [{ text: "  stack: ", color: FN }, { text: "['next', 'nest']", color: STR }, { text: ",", color: MUT }],
  [{ text: "  ship: ", color: KW }, { text: "() => ", color: MUT }, { text: "true", color: KW }, { text: ",", color: MUT }],
  [{ text: "}", color: MUT }],
]
