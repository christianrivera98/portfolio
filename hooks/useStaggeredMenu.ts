"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV_ITEMS } from "@/components/organisms/navbar/nav.config";

export function useStaggeredMenu() {
  const [open, setOpen] = useState(false);
  const [activePreview, setActivePreview] = useState<string | undefined>(
    NAV_ITEMS[0]?.previewImage
  );

  const listRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => setOpen((prev) => !prev);

  useLayoutEffect(() => {
    if (!open || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        listRef.current!.children,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    });

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (open || !listRef.current) return;

    gsap.set(listRef.current.children, {
      y: 24,
      opacity: 0,
    });
  }, [open]);

  return {
    open,
    toggleMenu,
    activePreview,
    setActivePreview,
    listRef,
  };
}
