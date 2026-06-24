"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "@/lib/hooks";
import { useRecruiter } from "@/components/providers/recruiter-mode";
import { useSound } from "@/components/providers/sound";
import { cn } from "@/lib/utils";

/** A sci-fi reticle cursor that grows over interactive elements. */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const { recruiter } = useRecruiter();
  const { play } = useSound();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });

  const disabled = isTouch || recruiter;

  useEffect(() => {
    if (disabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest('a, button, [data-cursor="hover"]'));
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.body.style.cursor = "";
    };
  }, [disabled, x, y]);

  useEffect(() => {
    if (hovering) play("hover");
  }, [hovering, play]);

  if (disabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
      >
        <div
          className={cn(
            "-translate-x-1/2 -translate-y-1/2 rounded-full border border-neon transition-[width,height,background-color] duration-200",
            hovering ? "h-12 w-12 bg-neon/15" : "h-7 w-7",
          )}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div className="h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon" />
      </motion.div>
    </div>
  );
}
