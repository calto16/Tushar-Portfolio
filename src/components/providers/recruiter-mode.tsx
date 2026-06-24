"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface RecruiterContextValue {
  recruiter: boolean;
  toggle: () => void;
  setRecruiter: (value: boolean) => void;
  /** Animations should run only when not in recruiter mode and motion is allowed. */
  animationsEnabled: boolean;
}

const RecruiterContext = createContext<RecruiterContextValue | null>(null);

const STORAGE_KEY = "tushar.recruiter-mode";

export function RecruiterModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recruiter, setRecruiter] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    setRecruiter(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.recruiter = String(recruiter);
    localStorage.setItem(STORAGE_KEY, String(recruiter));
  }, [recruiter]);

  const toggle = useCallback(() => setRecruiter((v) => !v), []);

  return (
    <RecruiterContext.Provider
      value={{
        recruiter,
        toggle,
        setRecruiter,
        animationsEnabled: !recruiter && !prefersReduced,
      }}
    >
      {children}
    </RecruiterContext.Provider>
  );
}

export function useRecruiter() {
  const ctx = useContext(RecruiterContext);
  if (!ctx) {
    throw new Error("useRecruiter must be used within RecruiterModeProvider");
  }
  return ctx;
}
