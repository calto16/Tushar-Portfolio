"use client";

import { motion } from "framer-motion";
import { useRecruiter } from "@/components/providers/recruiter-mode";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Fade/slide-in on scroll into view. Renders statically in recruiter mode. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const { animationsEnabled } = useRecruiter();

  if (!animationsEnabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
