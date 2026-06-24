"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouch } from "@/lib/hooks";
import { useRecruiter } from "@/components/providers/recruiter-mode";
import { useSound } from "@/components/providers/sound";

/** A sci-fi reticle cursor that grows over interactive elements. */
export function CustomCursor() {
  const isTouch = useIsTouch();
  const { recruiter } = useRecruiter();
  const { play } = useSound();
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.55 });

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
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", press);
    window.addEventListener("mouseup", release);
    document.addEventListener("mouseleave", leave);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
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
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.svg
            width={64}
            height={64}
            viewBox="0 0 64 64"
            fill="none"
            stroke="#f5f5f5"
            strokeWidth={2}
            strokeLinecap="square"
            animate={{
              rotate: hovering ? 45 : 0,
              scale: hovering ? (down ? 0.85 : 1) : down ? 0.5 : 0.6,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ transformOrigin: "32px 32px" }}
          >
            <path d="M16 26 V16 H26" />
            <path d="M38 16 H48 V26" />
            <path d="M48 38 V48 H38" />
            <path d="M26 48 H16 V38" />
            <path d="M32 7 V13" strokeWidth={1.5} />
            <path d="M32 51 V57" strokeWidth={1.5} />
            <path d="M7 32 H13" strokeWidth={1.5} />
            <path d="M51 32 H57" strokeWidth={1.5} />
            <motion.circle
              cx={32}
              cy={32}
              r={19}
              strokeWidth={1}
              animate={{ opacity: hovering ? 0.9 : 0, scale: hovering ? 1 : 0.5 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          </motion.svg>
        </div>
      </motion.div>

      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <div className="h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
    </div>
  );
}
