import {
  FiCode,
  FiDatabase,
  FiCloud,
  FiTool,
  FiLayers,
  FiBookOpen,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skillGroups, coursework } from "@/content/resume";

const GROUP_ICON: Record<string, IconType> = {
  Languages: FiCode,
  Databases: FiDatabase,
  "Cloud & AWS": FiCloud,
  "Tools & Infra": FiTool,
  Frameworks: FiLayers,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        index="04"
        title="Skills"
        kicker="// pacman -Q | the stack"
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {skillGroups.map((group, i) => {
          const Icon = GROUP_ICON[group.label] ?? FiCode;
          const isWide = i === skillGroups.length - 1 && skillGroups.length % 2 !== 0;
          return (
            <Reveal
              key={group.label}
              delay={i * 0.05}
              className={isWide ? "md:col-span-2" : undefined}
            >
              <div className="brutal-card brutal-card-hover h-full p-6">
                <div className="flex items-center gap-3 border-b border-concrete-700 pb-4">
                  <span className="grid h-9 w-9 place-items-center border border-concrete-600 text-neon">
                    <Icon size={16} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-chalk">
                      {group.label}
                    </h3>
                    <p className="font-mono text-[11px] text-ash">
                      $ {group.command}
                    </p>
                  </div>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-cursor="hover"
                      className="border border-concrete-700 px-3 py-1.5 font-mono text-xs text-bone transition-colors hover:border-neon hover:bg-neon/5 hover:text-neon"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Coursework */}
      <Reveal className="mt-8">
        <div className="brutal-card p-6">
          <div className="mb-4 flex items-center gap-3">
            <FiBookOpen className="text-cyan" />
            <span className="font-mono text-xs uppercase tracking-widest text-ash">
              // coursework
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {coursework.map((c) => (
              <li key={c} className="font-mono text-sm text-bone">
                <span className="text-cyan">›</span> {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
