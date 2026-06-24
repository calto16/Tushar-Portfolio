"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRecruiter } from "./recruiter-mode";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays
 * perfectly in sync. Falls back to native scroll in recruiter/reduced-motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { animationsEnabled } = useRecruiter();

  useEffect(() => {
    if (!animationsEnabled) {
      window.__lenis = undefined;
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, [animationsEnabled]);

  return <>{children}</>;
}
