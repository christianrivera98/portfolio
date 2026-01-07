"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HUMAN_ITEMS } from "../hero-bento.config";

interface HeroBentoHumanProps {
  activeIndex: number;
}

export function HeroBentoHuman({ activeIndex }: HeroBentoHumanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const currentItem = HUMAN_ITEMS[activeIndex];
  const nextItem = HUMAN_ITEMS[(activeIndex + 1) % HUMAN_ITEMS.length];

  useEffect(() => {
    if (!currentRef.current || !nextRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(nextRef.current, { opacity: 0 });

      gsap
        .timeline()
        .to(currentRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to(
          nextRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            onStart: () => {
              const video = nextRef.current?.querySelector("video");
              video?.play();
            },
          },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-xl border border-[hsl(var(--border))]"
    >
      {/* Current */}
      <div ref={currentRef} className="absolute inset-0">
        <video
          src={currentItem.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center p-8">
          <p className="text-center text-2xl font-medium text-white md:text-3xl">
            {currentItem.title}
          </p>
        </div>
      </div>

      {/* Next */}
      <div ref={nextRef} className="absolute inset-0">
        <video
          src={nextItem.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-center justify-center p-8">
          <p className="text-center text-2xl font-medium text-white md:text-3xl">
            {nextItem.title}
          </p>
        </div>
      </div>
    </div>
  );
}
