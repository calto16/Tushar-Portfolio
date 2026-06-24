"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { profile, socials } from "@/content/site";
import { useRecruiter } from "@/components/providers/recruiter-mode";
import { useMounted } from "@/lib/hooks";
import { Terminal } from "@/components/terminal/terminal";
import { Magnetic } from "@/components/ui/magnetic";
import { SocialIcon } from "@/components/ui/social-icon";
import { scrollToSection } from "@/lib/scroll";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false },
);

const ROLES = [
  "distributed systems",
  "multi-agent GenAI",
  "resilient microservices",
  "data tooling @ scale",
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.1em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "-110%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-glow-neon whitespace-nowrap text-neon"
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { animationsEnabled } = useRecruiter();
  const mounted = useMounted();
  const show3D = mounted && animationsEnabled;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* 3D / fallback background */}
      <div className="absolute inset-0 -z-[1]">
        {show3D ? (
          <HeroScene />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,color-mix(in_srgb,var(--color-neon)_8%,transparent),transparent)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-concrete-950/30 via-transparent to-concrete-950" />
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: identity */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ash"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display font-bold uppercase leading-[0.82] tracking-tighter"
          >
            <span className="block text-[clamp(2.75rem,9vw,7rem)] text-chalk">
              Tushar
            </span>
            <span className="block text-[clamp(2.75rem,9vw,7rem)] text-outline">
              Rathod
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl font-mono text-sm text-bone sm:text-base"
          >
            <span className="text-chalk">{profile.roleLine}</span>. I engineer{" "}
            <RotatingWord />.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button
                onClick={() => scrollToSection("projects")}
                data-cursor="hover"
                className="group flex items-center gap-2 border border-neon bg-neon px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-void transition-shadow hover:shadow-[0_0_24px_-4px_var(--color-neon)]"
              >
                View Work
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollToSection("contact")}
                data-cursor="hover"
                className="border border-concrete-600 px-5 py-3 font-mono text-xs uppercase tracking-wider text-chalk transition-colors hover:border-cyan hover:text-cyan"
              >
                Get in touch
              </button>
            </Magnetic>

            <div className="ml-1 flex items-center gap-1">
              {socials.slice(0, 4).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="grid h-10 w-10 place-items-center border border-concrete-700 text-ash transition-colors hover:border-neon hover:text-neon"
                >
                  <SocialIcon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToSection("about")}
        className="recruiter-hide absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ash transition-colors hover:text-neon"
      >
        Scroll
        <FiArrowDown className="animate-bounce" />
      </button>
    </section>
  );
}
