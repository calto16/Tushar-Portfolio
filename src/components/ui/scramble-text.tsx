"use client";

import { useEffect, useRef, useState } from "react";
import { useRecruiter } from "@/components/providers/recruiter-mode";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms per reveal step */
  speed?: number;
}

/** Decodes text from random glyphs once it scrolls into view. */
export function ScrambleText({ text, className, speed = 30 }: ScrambleTextProps) {
  const { animationsEnabled } = useRecruiter();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(animationsEnabled ? "" : text);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!animationsEnabled) {
      setDisplay(text);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let frame = 0;
      const total = text.length;
      const interval = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / 2);
        setDisplay(
          text
            .split("")
            .map((ch, i) => {
              if (i < revealed || ch === " ") return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join(""),
        );
        if (revealed >= total) clearInterval(interval);
      }, speed);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [text, animationsEnabled, speed]);

  return (
    <span ref={ref} className={className}>
      {display || "\u00A0"}
    </span>
  );
}
