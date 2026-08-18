"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  heroEntryPose,
  heroRowPose,
  type Viewport,
} from "@/components/organisms/stack-journey/stack-journey.config";
import { usePreloader } from "./usePreloader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SPIN_BASE = 13;

/**
 * Choreography of the stack logos across the page. Phase 0: they fly in from
 * the left edge, land in a row at the foot of the hero and keep turning slowly
 * on their own axis.
 *
 * The row is measured from the viewport on every ScrollTrigger refresh, so a
 * resize re-places the logos instead of leaving them where the old layout put
 * them. Turning stops while the hero is off screen.
 */
export function useStackJourney(
  layerRef: React.RefObject<HTMLDivElement | null>,
  reduced: boolean,
) {
  const { isComplete } = usePreloader();
  const landed = useRef(false);

  useGSAP(
    () => {
      const layer = layerRef.current;
      if (reduced || !layer || !isComplete) return;

      const logos = Array.from(
        layer.querySelectorAll<HTMLElement>(".stack-logo"),
      );
      if (!logos.length) return;

      const mm = gsap.matchMedia();

      // Both conditions are declared so one of them always matches — with a
      // single query the handler would simply never run on desktop.
      mm.add(
        { isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" },
        (context) => {
          const mobile = !!context.conditions?.isMobile;
          const viewport = (): Viewport => ({
            width: window.innerWidth,
            height: window.innerHeight,
            mobile,
          });

          const place = () => {
            const vp = viewport();
            logos.forEach((logo, i) => {
              const pose = heroRowPose(i, vp);
              gsap.set(logo, { x: pose.x, y: pose.y });
            });
          };

          const spins = logos.map((logo, i) =>
            gsap.to(logo, {
              rotationY: "+=360",
              duration: SPIN_BASE + i * 0.6,
              ease: "none",
              repeat: -1,
              paused: true,
            }),
          );

          // Entry: off the left edge, into the row, one after another.
          const vp = viewport();
          logos.forEach((logo, i) => gsap.set(logo, heroEntryPose(i, vp)));
          layer.dataset.ready = "true";

          gsap.to(logos, {
            x: (i: number) => heroRowPose(i, viewport()).x,
            y: (i: number) => heroRowPose(i, viewport()).y,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.07,
            onComplete: () => {
              landed.current = true;
              spins.forEach((spin) => spin.play());
            },
          });

          // Placeholder until the drift phase lands: fade the layer out with the
          // hero and stop the turning once it is gone.
          const trigger = ScrollTrigger.create({
            trigger: "#home",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            animation: gsap.to(layer, { opacity: 0.25, ease: "none" }),
            onLeave: () => spins.forEach((spin) => spin.pause()),
            onEnterBack: () => {
              if (landed.current) spins.forEach((spin) => spin.play());
            },
          });

          const reposition = () => {
            if (landed.current) place();
          };
          ScrollTrigger.addEventListener("refreshInit", reposition);

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", reposition);
            trigger.kill();
            spins.forEach((spin) => spin.kill());
          };
        },
      );

      return () => mm.revert();
    },
    { scope: layerRef, dependencies: [reduced, isComplete] },
  );
}
