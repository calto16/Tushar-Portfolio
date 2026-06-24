"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecruiter } from "@/components/providers/recruiter-mode";
import { useSound } from "@/components/providers/sound";

const BOOT_LINES = [
  "[ OK ] Reached target Local File Systems",
  "[ OK ] Started Arch Linux (btw)",
  "[ OK ] Mounting /home/tushar",
  "[ OK ] Loading modules: distributed-systems genai k8s",
  "[ OK ] Spawning WebGL renderer",
  "tushar@archlinux:~$ ./portfolio --launch",
];

export function Preloader() {
  const { recruiter } = useRecruiter();
  const { play } = useSound();
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (recruiter) {
      setDone(true);
      return;
    }
    play("boot");
    const stepper = setInterval(() => {
      setCount((c) => {
        if (c >= BOOT_LINES.length) {
          clearInterval(stepper);
          return c;
        }
        return c + 1;
      });
    }, 220);
    const finish = setTimeout(() => setDone(true), 1900);
    return () => {
      clearInterval(stepper);
      clearTimeout(finish);
    };
  }, [recruiter, play]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setDone(true)}
        >
          <div className="w-[min(90vw,560px)] font-mono text-[13px] leading-relaxed">
            {BOOT_LINES.slice(0, count).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  line.startsWith("[ OK ]")
                    ? "text-bone"
                    : "mt-2 text-neon text-glow-neon"
                }
              >
                {line.startsWith("[ OK ]") ? (
                  <>
                    <span className="text-neon">[ OK ]</span>
                    {line.slice(6)}
                  </>
                ) : (
                  line
                )}
              </motion.p>
            ))}
            <motion.div
              className="mt-6 h-[2px] w-full origin-left bg-neon"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: "easeInOut" }}
            />
            <p className="mt-3 text-right text-[10px] uppercase tracking-widest text-ash">
              click to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
