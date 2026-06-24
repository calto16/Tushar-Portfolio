"use client";

import { useEffect, useState } from "react";
import { FiGithub, FiStar, FiUsers, FiGitBranch, FiActivity } from "react-icons/fi";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/content/site";

interface Contribution {
  date: string;
  count: number;
  level: number;
}
interface GithubData {
  ok: boolean;
  followers: number | null;
  publicRepos: number | null;
  stars: number;
  totalContributions: number;
  contributions: Contribution[];
}

const LEVEL_BG = [
  "bg-concrete-800",
  "bg-neon/25",
  "bg-neon/45",
  "bg-neon/70",
  "bg-neon",
];

function Heatmap({ contributions }: { contributions: Contribution[] }) {
  if (!contributions.length) return null;
  const firstDay = new Date(contributions[0].date).getDay();
  const pad = Array.from({ length: firstDay });

  return (
    <div className="overflow-x-auto pb-2">
      <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
        {pad.map((_, i) => (
          <span key={`pad-${i}`} className="h-[11px] w-[11px]" />
        ))}
        {contributions.map((c) => (
          <span
            key={c.date}
            title={`${c.count} contributions on ${c.date}`}
            className={`h-[11px] w-[11px] ${LEVEL_BG[c.level] ?? LEVEL_BG[0]}`}
          />
        ))}
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="brutal-card flex items-center gap-4 p-5">
      <span className="grid h-10 w-10 place-items-center border border-concrete-600 text-neon">
        {icon}
      </span>
      <div>
        <p className="font-display text-2xl font-bold text-chalk">{value}</p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-ash">
          {label}
        </p>
      </div>
    </div>
  );
}

export function Github() {
  const [data, setData] = useState<GithubData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d: GithubData) => {
        if (d.ok) setData(d);
        else setFailed(true);
      })
      .catch(() => setFailed(true));
  }, []);

  return (
    <Section id="github">
      <SectionHeader
        index="06"
        title="Activity"
        kicker="// git log --oneline --all"
      />

      <Reveal>
        <div className="brutal-card p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <a
              href={`https://github.com/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 font-mono text-sm text-chalk transition-colors hover:text-neon"
            >
              <FiGithub /> @{profile.username}
            </a>
            {data && (
              <span className="font-mono text-xs text-ash">
                <span className="text-neon">{data.totalContributions}</span>{" "}
                contributions in the last year
              </span>
            )}
          </div>

          {failed ? (
            <p className="font-mono text-sm text-ash">
              Couldn&apos;t load live stats right now —{" "}
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon hover:underline"
              >
                view on GitHub →
              </a>
            </p>
          ) : !data ? (
            <div className="grid h-32 place-items-center font-mono text-sm text-ash">
              <span className="animate-pulse">fetching git history…</span>
            </div>
          ) : (
            <>
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Stat
                  icon={<FiGitBranch size={16} />}
                  value={String(data.publicRepos ?? "—")}
                  label="Repos"
                />
                <Stat
                  icon={<FiStar size={16} />}
                  value={String(data.stars)}
                  label="Stars"
                />
                <Stat
                  icon={<FiUsers size={16} />}
                  value={String(data.followers ?? "—")}
                  label="Followers"
                />
                <Stat
                  icon={<FiActivity size={16} />}
                  value={String(data.totalContributions)}
                  label="Commits/yr"
                />
              </div>
              <Heatmap contributions={data.contributions} />
              <div className="mt-3 flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-ash">
                less
                {LEVEL_BG.map((bg, i) => (
                  <span key={i} className={`h-[11px] w-[11px] ${bg}`} />
                ))}
                more
              </div>
            </>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
