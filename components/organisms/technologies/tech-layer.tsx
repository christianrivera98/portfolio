import Image from "next/image"
import { useTranslations } from "next-intl"
import type { TechLayer } from "./technologies.config"

type Props = {
  layer: TechLayer
  index: number
  isFirst: boolean
}

export function TechLayerRow({ layer, index, isFirst }: Props) {
  const t = useTranslations("Technologies")
  return (
    <div
      className={`tech-layer relative ${
        isFirst ? "" : "border-t border-white/[0.06]"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 md:py-8">
        {/* Layer number + label */}
        <div className="flex items-center gap-3 md:w-[180px] shrink-0">
          <span className="text-[11px] font-mono text-white/20">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`text-sm font-mono uppercase tracking-wider ${
              isFirst ? "text-[hsl(356,96%,32%)]" : "text-white/50"
            }`}
          >
            {t(`layers.${layer.id}`)}
          </span>
        </div>

        {/* Tech items */}
        <div className="flex flex-wrap gap-3">
          {layer.items.map((item) => (
            <div
              key={item.name}
              className="tech-item flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-[hsl(356,96%,32%)]/30 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
            >
              {item.logo && (
                <Image
                  src={item.logo}
                  alt=""
                  width={16}
                  height={16}
                  className="opacity-60"
                />
              )}
              <span className="text-sm text-white/70">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
