import { cn } from "@/lib/utils";

/** Infinite horizontal marquee strip (brutalist ticker). */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "flex overflow-hidden border-y border-concrete-700 bg-concrete-900 py-4",
        className,
      )}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-3 flex items-center font-display text-lg font-medium uppercase tracking-wide text-bone sm:text-xl"
          >
            {item}
            <span className="ml-6 text-neon">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
