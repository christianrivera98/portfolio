"use client";

import { useStackAutoplay } from "@/hooks/useStackAutoPlay";
import { STACK_ITEMS } from "../hero-bento.config";
import { StackCard } from "../../../../molecules/stackCard";


export function HeroBentoStack() {
  const order = useStackAutoplay(STACK_ITEMS.length, 4000);

  return (
    <div
      className="relative h-full w-full rounded-xl border border-[hsl(var(--border))]"
      style={{ perspective: 800 }}
    >

      <div className="relative  h-full w-full">
        {order.map((itemIndex, stackIndex) => {
          const item = STACK_ITEMS[itemIndex];
          return (
            <StackCard
              key={item.id}
              src={item.logo}
              alt={item.name}
              index={stackIndex}
              total={order.length}
            />
          );
        })}
      </div>
    </div>
  );
}
