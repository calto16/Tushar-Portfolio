"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiVolume2,
  FiVolumeX,
  FiFileText,
  FiBriefcase,
} from "react-icons/fi";
import { navItems, profile } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";
import { useRecruiter } from "@/components/providers/recruiter-mode";
import { useSound } from "@/components/providers/sound";
import { cn } from "@/lib/utils";

function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    navItems.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { recruiter, toggle } = useRecruiter();
  const { enabled: soundOn, toggle: toggleSound, play } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    play("click");
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-colors duration-300",
        scrolled
          ? "border-b border-concrete-700 bg-concrete-950/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        {/* Brand */}
        <button
          onClick={() => go("hero")}
          data-cursor="hover"
          className="group flex items-center gap-2 font-mono text-sm"
        >
          <span className="grid h-8 w-8 place-items-center border border-neon text-neon transition-colors group-hover:bg-neon group-hover:text-void">
            TR
          </span>
          <span className="hidden text-bone sm:inline">
            {profile.shell}
            <span className="cursor-blink text-neon">_</span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.id)}
                data-cursor="hover"
                className={cn(
                  "group flex items-center gap-1.5 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                  active === item.id
                    ? "text-neon"
                    : "text-ash hover:text-chalk",
                )}
              >
                <span className="text-[10px] opacity-60">{item.index}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              play("toggle");
              toggleSound();
            }}
            data-cursor="hover"
            aria-label={soundOn ? "Mute sound" : "Enable sound"}
            className="grid h-9 w-9 place-items-center border border-concrete-600 text-ash transition-colors hover:border-neon hover:text-neon"
          >
            {soundOn ? <FiVolume2 size={15} /> : <FiVolumeX size={15} />}
          </button>

          <button
            onClick={() => {
              play("toggle");
              toggle();
            }}
            data-cursor="hover"
            className={cn(
              "hidden items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors sm:flex",
              recruiter
                ? "border-neon bg-neon text-void"
                : "border-concrete-600 text-ash hover:border-neon hover:text-neon",
            )}
          >
            <FiBriefcase size={13} />
            Recruiter
          </button>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="hidden items-center gap-2 border border-concrete-600 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-chalk transition-colors hover:border-cyan hover:text-cyan md:flex"
          >
            <FiFileText size={13} />
            Resume
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor="hover"
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center border border-concrete-600 text-chalk lg:hidden"
          >
            {open ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-concrete-700 bg-concrete-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="flex w-full items-center gap-3 border-b border-concrete-800 py-3 font-mono text-sm uppercase tracking-wider text-bone"
                  >
                    <span className="text-xs text-neon">{item.index}</span>
                    {item.label}
                  </button>
                </li>
              ))}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    play("toggle");
                    toggle();
                  }}
                  className={cn(
                    "flex-1 border px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider",
                    recruiter
                      ? "border-neon bg-neon text-void"
                      : "border-concrete-600 text-ash",
                  )}
                >
                  Recruiter Mode
                </button>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-concrete-600 px-3 py-2.5 text-center font-mono text-[11px] uppercase tracking-wider text-cyan"
                >
                  Resume
                </a>
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
