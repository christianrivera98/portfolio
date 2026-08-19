import Image from "next/image"

/**
 * Static frame of the 3D room (7 KB webp). It holds the hero's visual weight from
 * the first paint and stays underneath the canvas, so deferring the scene costs no
 * blank area and no layout shift. Under prefers-reduced-motion it is the final state.
 *
 * Eager but not `priority`: it must not preempt the hero copy, which is the LCP.
 */
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
