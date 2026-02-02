import Image from "next/image"

interface LogoItemProps {
  src: string
  alt: string
}

export function LogoItem({ src, alt }: LogoItemProps) {
  return (
    <div className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-out hover:scale-105">
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={32}
        height={32}
        className="object-contain drop-shadow-sm transition-opacity duration-200 hover:opacity-90"
        draggable={false}
      />
    </div>
  )
}

interface TechLogoProps {
  src: string
  name: string
  color: string
  active: boolean
}

export function TechLogo({ src, name, color, active }: TechLogoProps) {
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
        active ? "scale-110" : "scale-100"
      }`}
      style={{
        backgroundColor: active ? color : "transparent",
        boxShadow: active ? `0 0 20px ${color}40` : "none",
      }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={name}
        width={28}
        height={28}
        className="object-contain"
        draggable={false}
      />
    </div>
  )
}
