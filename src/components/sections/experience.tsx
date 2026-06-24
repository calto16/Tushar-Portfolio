import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/resume";
import { cn } from "@/lib/utils";

const ACCENT: Record<string, { text: string; dot: string; border: string }> = {
  green: { text: "text-neon", dot: "bg-neon", border: "hover:border-neon" },
  cyan: { text: "text-cyan", dot: "bg-cyan", border: "hover:border-cyan" },
  magenta: {
    text: "text-magenta",
    dot: "bg-magenta",
    border: "hover:border-magenta",
  },
  amber: { text: "text-amber", dot: "bg-amber", border: "hover:border-amber" },
};

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        index="02"
        title="Work"
        kicker="// shipping systems at scale"
      />

      <div className="relative">
        {/* vertical rail */}
        <div className="absolute left-0 top-2 hidden h-full w-px bg-concrete-700 md:block" />

        <div className="flex flex-col gap-5">
          {experience.map((job, i) => {
            const accent = ACCENT[job.accent];
            return (
              <Reveal key={`${job.company}-${i}`} delay={i * 0.05}>
                <div className="relative md:pl-12">
                  {/* node */}
                  <span
                    className={cn(
                      "absolute left-[-5px] top-6 hidden h-2.5 w-2.5 rounded-full md:block",
                      accent.dot,
                    )}
                  />
                  <article
                    className={cn(
                      "brutal-card brutal-card-hover group p-6 sm:p-8",
                      accent.border,
                    )}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-display text-xl font-semibold text-chalk sm:text-2xl">
                        {job.role}
                      </h3>
                      <span
                        className={cn(
                          "font-mono text-xs uppercase tracking-wider",
                          accent.text,
                        )}
                      >
                        {job.period}
                        {job.current ? " ●" : ""}
                      </span>
                    </div>
                    <p className={cn("mt-1 font-mono text-sm", accent.text)}>
                      @ {job.company}
                    </p>
                    <p className="mt-4 max-w-3xl text-bone">{job.summary}</p>

                    <ul className="mt-4 space-y-2">
                      {job.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex gap-3 text-sm leading-relaxed text-ash"
                        >
                          <span className={cn("mt-1.5 shrink-0", accent.text)}>
                            ▹
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <li
                          key={tech}
                          className="border border-concrete-700 px-2.5 py-1 font-mono text-[11px] text-bone"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
