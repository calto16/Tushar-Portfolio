import type Lenis from "lenis";

declare global {
  interface Window {
    /** Active Lenis smooth-scroll instance (undefined in recruiter/reduced-motion mode). */
    __lenis?: Lenis;
  }
}

export {};
