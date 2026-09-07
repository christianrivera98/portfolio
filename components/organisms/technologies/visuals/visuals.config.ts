const KW = "#e85d6a"
const FN = "#d4d4d8"
const STR = "#7aa2a8"
const MUT = "#5a5a63"

export type CodeToken = { text: string; color: string }

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

export const TERMINAL_KEYS = ["q1", "q2", "q3", "q4"] as const

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
