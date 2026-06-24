import { FiAward } from "react-icons/fi";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { achievements } from "@/content/resume";
import { cn } from "@/lib/utils";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeader
        index="05"
        title="Awards"
        kicker="// trophies & ratings"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <article
              className={cn(
                "brutal-card brutal-card-hover group flex h-full items-start gap-5 p-6",
                a.highlight && "border-concrete-500",
              )}
            >
              <span
                className={cn(
                  "grid h-14 w-14 shrink-0 place-items-center border font-display text-xl font-bold",
                  a.highlight
                    ? "border-neon text-neon text-glow-neon"
                    : "border-concrete-600 text-bone",
                )}
              >
                {a.rank}
              </span>
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-semibold leading-tight text-chalk">
                  {a.highlight && (
                    <FiAward className="shrink-0 text-neon" size={16} />
                  )}
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {a.detail}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
