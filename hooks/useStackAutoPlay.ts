"use client";

import { useEffect, useState } from "react";

export function useStackAutoplay(length: number, delay = 3500) {
  const [order, setOrder] = useState<number[]>(
    Array.from({ length }, (_, i) => i)
  );

  useEffect(() => {
    if (length <= 1) return;

    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const first = next.shift();
        if (first !== undefined) next.push(first);
        return next;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [length, delay]);

  return order;
}
