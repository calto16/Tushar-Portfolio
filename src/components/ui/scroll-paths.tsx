"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRecruiter } from "@/components/providers/recruiter-mode";

/** Meandering circuit traces (viewBox 1440x1024, stretched to viewport). */
const PATHS = [
  "M 120 -40 C 170 180, 30 330, 180 480 C 320 620, 110 790, 230 1064",
  "M 520 -40 C 450 200, 630 350, 520 545 C 420 720, 590 870, 500 1064",
  "M 920 -40 C 1000 210, 815 365, 940 560 C 1050 745, 875 885, 985 1064",
  "M 1320 -40 C 1255 205, 1390 365, 1255 545 C 1150 730, 1325 885, 1235 1064",
];

/** Static PCB nodes placed along the traces. */
const NODES = [
  [180, 480],
  [230, 760],
  [520, 545],
  [500, 880],
  [940, 560],
  [985, 870],
  [1255, 545],
  [1235, 880],
];

export function ScrollPaths() {
  const { animationsEnabled } = useRecruiter();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.4,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[8] overflow-hidden"
    >
      {/* Ambient glow — blurred ONCE via CSS (static layer, never repaints on scroll) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="none"
        fill="none"
        style={{ filter: "blur(7px)", opacity: 0.16 }}
      >
        {PATHS.map((d, i) => (
          <path
            key={`glow-${i}`}
            d={d}
            stroke="var(--color-neon)"
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Static structure: faint lattice + PCB nodes (cached, no animation) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="none"
        fill="none"
      >
        {PATHS.map((d, i) => (
          <path
            key={`base-${i}`}
            d={d}
            stroke="var(--color-concrete-700)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={0.5}
          />
        ))}
        {NODES.map(([cx, cy], i) => (
          <rect
            key={`node-${i}`}
            x={cx - 4}
            y={cy - 4}
            width={8}
            height={8}
            transform={`rotate(45 ${cx} ${cy})`}
            stroke="var(--color-cyan)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            fill="var(--color-concrete-950)"
            opacity={0.55}
          />
        ))}
      </svg>

      {/* Scroll-drawn neon traces — filter-free, only repaints while scrolling */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="none"
        fill="none"
      >
        {PATHS.map((d, i) => (
          <motion.path
            key={`trace-${i}`}
            d={d}
            stroke="var(--color-neon)"
            strokeWidth={1.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: animationsEnabled ? progress : 1 }}
            opacity={0.6}
          />
        ))}
      </svg>

      {/* Traveling data pulses — tiny isolated layer, no filters */}
      {animationsEnabled && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 1024"
          preserveAspectRatio="none"
          fill="none"
        >
          {PATHS.map((d, i) => (
            <circle key={`pulse-${i}`} r={3} fill="var(--color-cyan)">
              <animateMotion
                dur={`${10 + i * 2}s`}
                begin={`${i * 1.8}s`}
                repeatCount="indefinite"
                path={d}
                calcMode="linear"
              />
            </circle>
          ))}
        </svg>
      )}
    </div>
  );
}
