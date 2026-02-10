export function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\d+\.?\d*%)/g)
  return (
    <>
      {parts.map((part, i) =>
        /^\d+\.?\d*%$/.test(part) ? (
          <mark
            key={i}
            className="bg-transparent text-[hsl(356,96%,45%)] font-semibold"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}
