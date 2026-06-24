"use client";

import { useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { projects, type Project } from "@/content/resume";
import { useRecruiter } from "@/components/providers/recruiter-mode";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, string> = {
  green: "text-neon",
  cyan: "text-cyan",
  magenta: "text-magenta",
};

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { animationsEnabled } = useRecruiter();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const accent = ACCENT[project.accent];

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animationsEnabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 8 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      data-cursor="hover"
      className="brutal-card group relative h-full overflow-hidden p-7 transition-[border-color] duration-300 hover:border-concrete-500 sm:p-9"
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--color-neon)] opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-10" />

      <div className="flex items-start justify-between">
        <span className={cn("font-mono text-xs tracking-widest", accent)}>
          {project.codename}
        </span>
        <span className="text-right">
          <span className={cn("block font-display text-3xl font-bold", accent)}>
            {project.metric.value}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
            {project.metric.label}
          </span>
        </span>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold text-chalk sm:text-3xl">
        {project.name}
      </h3>
      <p className={cn("mt-1 font-mono text-sm", accent)}>{project.tagline}</p>
      <p className="mt-4 text-sm leading-relaxed text-bone">
        {project.description}
      </p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-ash">
            <span className={cn("mt-1.5 shrink-0", accent)}>▹</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-concrete-700 pt-5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-concrete-700 px-2.5 py-1 font-mono text-[11px] text-bone"
          >
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        index="03"
        title="Projects"
        kicker="// systems I've architected"
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <Reveal key={p.name} className="h-full">
            <TiltCard project={p} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8">
        <a
          href="https://github.com/calto16"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="group inline-flex items-center gap-2 border border-concrete-600 px-5 py-3 font-mono text-xs uppercase tracking-wider text-chalk transition-colors hover:border-neon hover:text-neon"
        >
          More on GitHub
          <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </Reveal>
    </Section>
  );
}
