"use client";

import { RecruiterModeProvider } from "./recruiter-mode";
import { SoundProvider } from "./sound";
import { SmoothScroll } from "./smooth-scroll";

/** Composes all client-side providers in the correct order. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RecruiterModeProvider>
      <SoundProvider>
        <SmoothScroll>{children}</SmoothScroll>
      </SoundProvider>
    </RecruiterModeProvider>
  );
}
