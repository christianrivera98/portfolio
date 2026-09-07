import Image from "next/image"

export function RoomPoster() {
  return (
    <Image
      src="/hero/room-poster.webp"
      alt=""
      aria-hidden="true"
      fill
      sizes="100vw"
      loading="eager"
      className="object-cover"
    />
  )
}
