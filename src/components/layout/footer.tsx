"use client";

import { FiArrowUp } from "react-icons/fi";
import { profile, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { scrollToSection } from "@/lib/scroll";
import { useSound } from "@/components/providers/sound";

export function Footer() {
  const { play } = useSound();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-concrete-700 bg-concrete-950">
      {/* Giant brutalist wordmark */}
      <div className="mx-auto max-w-[1280px] overflow-hidden px-5 pt-16 sm:px-8">
        <p className="select-none font-display text-[18vw] font-bold uppercase leading-[0.8] tracking-tighter text-outline">
          Tushar
        </p>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-ash">
            // let&apos;s build something
          </p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="mt-2 inline-block font-display text-2xl text-chalk transition-colors hover:text-neon sm:text-3xl"
          >
            {profile.email}
          </a>
          <p className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-bone">
            Designed &amp; engineered by Tushar — concrete, neon, and a terminal.
            Built with Next.js, R3F, GSAP &amp; Framer Motion.
            <span className="text-neon"> Arch, btw.</span>
          </p>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  data-cursor="hover"
                  className="grid h-11 w-11 place-items-center border border-concrete-600 text-bone transition-all hover:-translate-y-1 hover:border-neon hover:text-neon"
                >
                  <SocialIcon name={s.icon} />
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              play("click");
              scrollToSection("hero");
            }}
            data-cursor="hover"
            className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ash transition-colors hover:text-neon"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center border border-concrete-600 transition-transform group-hover:-translate-y-1 group-hover:border-neon">
              <FiArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col gap-2 border-t border-concrete-800 px-5 py-6 font-mono text-[11px] uppercase tracking-widest text-ash sm:flex-row sm:justify-between sm:px-8">
        <span>© {year} Tushar Rathod</span>
        <span>{profile.location} · {profile.timezone}</span>
        <span className="text-neon">EOF_</span>
      </div>
    </footer>
  );
}
