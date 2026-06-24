"use client";

import { useEffect, useState } from "react";

/** Returns true after the component has mounted (avoids hydration mismatch). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Subscribe to a media query. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True if the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on touch/coarse-pointer devices (used to disable custom cursor). */
export function useIsTouch() {
  return useMediaQuery("(pointer: coarse)");
}
