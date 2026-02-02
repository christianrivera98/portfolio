"use client";

import { HUMAN_ITEMS } from "@/components/organisms/hero/bento/hero-bento.config";
import { useEffect, useState } from "react";

const ROTATION_INTERVAL = 3000;

export function useHeroHumanRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HUMAN_ITEMS.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return activeIndex;
}
