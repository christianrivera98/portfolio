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
