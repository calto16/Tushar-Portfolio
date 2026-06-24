import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { ScrambleText } from "./scramble-text";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

/** Standard section wrapper with consistent vertical rhythm + scroll anchor. */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-[1280px] scroll-mt-24 px-5 py-24 sm:px-8 md:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  index: string;
  title: string;
  kicker?: string;
  className?: string;
}

/** Brutalist section header: big index number + title + hairline rule. */
export function SectionHeader({
  index,
  title,
  kicker,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-14 md:mb-20", className)}>
      <div className="flex items-end justify-between gap-6 border-b border-concrete-700 pb-5">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="font-mono text-sm text-neon">{index}</span>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-chalk sm:text-5xl md:text-6xl">
            <ScrambleText text={title} />
          </h2>
        </div>
        {kicker ? (
          <span className="hidden max-w-[16rem] text-right font-mono text-xs uppercase leading-relaxed tracking-widest text-ash md:block">
            {kicker}
          </span>
        ) : null}
      </div>
    </Reveal>
  );
}
