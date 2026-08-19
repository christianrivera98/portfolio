/**
 * Content for the ambient visuals behind each process card. Structure and
 * decoration live here; every human-readable label is an i18n key resolved
 * under `Technologies.visuals.*`.
 */

/** Same palette as the hero screens, so the fake source reads as one product. */
const KW = "#e85d6a"
const FN = "#d4d4d8"
const STR = "#7aa2a8"
const MUT = "#5a5a63"

export type CodeToken = { text: string; color: string }

/** 03 — the snippet that types itself in the mini editor. Deliberately neutral. */
export const EDITOR_LINES: CodeToken[][] = [
  [
    { text: "export function ", color: KW },
    { text: "useCheckout", color: FN },
    { text: "(id: string) {", color: MUT },
  ],
  [{ text: "  return ", color: KW }, { text: "useQuery", color: FN }, { text: "({", color: MUT }],
  [
    { text: "    queryKey: ", color: FN },
    { text: '["checkout", id]', color: STR },
    { text: ",", color: MUT },
  ],
  [
    { text: "    queryFn: ", color: FN },
    { text: "() => api.checkout(id)", color: MUT },
    { text: ",", color: MUT },
  ],
  [{ text: "    staleTime: ", color: FN }, { text: "30_000", color: STR }, { text: ",", color: MUT }],
  [{ text: "  })", color: MUT }],
  [{ text: "}", color: MUT }],
]

/**
 * 02 — Domain Driven Feature Architecture: every feature owns its four layers,
 * with `shared/`, `core/` and `app/` around them. `note` is an i18n key; the
 * layer list on the collapsed features is language-neutral on purpose.
 */
export type TreeRow = { text: string; note?: string }

export const TREE_ROWS: TreeRow[] = [
  { text: "src/" },
  { text: "├─ app/", note: "app" },
  { text: "├─ core/", note: "core" },
  { text: "├─ features/", note: "features" },
  { text: "│  ├─ payments/" },
  { text: "│  │  ├─ domain/", note: "domain" },
  { text: "│  │  ├─ application/", note: "application" },
  { text: "│  │  ├─ infrastructure/", note: "infrastructure" },
  { text: "│  │  └─ ui/", note: "ui" },
  { text: "│  ├─ orders/", note: "layers" },
  { text: "│  └─ auth/", note: "layers" },
  { text: "└─ shared/", note: "shared" },
]

/** 01 — discovery questions typed into the mini terminal. */
export const TERMINAL_KEYS = ["q1", "q2", "q3", "q4"] as const

/** 04 — the production build as VS Code's integrated terminal prints it. Console
 *  output is language-neutral, so it stays here instead of in the messages. */
export const BUILD_COMMAND = "npm run build"

export const BUILD_OUTPUT: string[] = [
  "",
  "   ▲ Next.js 16.1.1",
  "",
  "   Creating an optimized production build ...",
  " ✓ Compiled successfully in 7.1s",
  " ✓ Running TypeScript ...",
  " ✓ Generating static pages (7/7)",
  "",
  "Route (app)                    Size",
  "┌ ● /[locale]                 1.2 kB",
  "│   ├ /es",
  "│   └ /en",
  "└ ○ /sitemap.xml                 0 B",
  "",
  "Done in 7.1s",
]
