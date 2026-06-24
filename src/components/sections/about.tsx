import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/content/site";
import {
  neofetch,
  aboutParagraphs,
  interests,
  education,
} from "@/content/resume";

const ARCH = `        /\\
       /  \\
      /\\   \\
     /      \\
    /   ,,   \\
   /   |  |   \\
  / .-'    '-. \\
 /.'          '.\\`;

export function About() {
  return (
    <Section id="about">
      <SectionHeader
        index="01"
        title="About"
        kicker="// the human behind the commits"
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left: photo + neofetch */}
        <div className="flex flex-col gap-6">
          <Reveal className="hud-corner relative aspect-[3/4] overflow-hidden border border-concrete-600">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-concrete-950 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-concrete-700 bg-concrete-950/80 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ash backdrop-blur-sm">
              <span>tushar.jpg</span>
              <span className="text-neon">● REC</span>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="brutal-card scanlines overflow-hidden p-4 font-mono text-[12px] leading-relaxed"
          >
            <div className="flex gap-3">
              <pre className="hidden text-neon text-glow-neon sm:block">
                {ARCH}
              </pre>
              <div className="flex flex-col">
                {neofetch.map((f) => (
                  <span key={f.key} className="text-bone">
                    <span className="text-cyan">{f.key}</span>
                    <span className="text-ash">: </span>
                    {f.value}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: prose */}
        <div className="flex flex-col">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-neon">
              $ cat about.txt
            </p>
          </Reveal>

          {aboutParagraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 * i}>
              <p className="mt-5 text-lg leading-relaxed text-bone">{p}</p>
            </Reveal>
          ))}

          <Reveal delay={0.1} className="mt-8">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ash">
              // obsessions
            </p>
            <ul className="flex flex-wrap gap-2">
              {interests.map((tag) => (
                <li
                  key={tag}
                  data-cursor="hover"
                  className="border border-concrete-600 px-3 py-1.5 font-mono text-xs text-bone transition-colors hover:border-neon hover:text-neon"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <div className="brutal-card flex flex-col gap-1 p-5">
              <span className="font-mono text-xs uppercase tracking-widest text-ash">
                // education
              </span>
              <span className="mt-1 font-display text-lg text-chalk">
                {education.degree}
              </span>
              <span className="text-sm text-bone">{education.school}</span>
              <span className="font-mono text-xs text-neon">
                {education.period} · CGPA {education.cgpa}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
