import { NextResponse } from "next/server";
import { githubUsername } from "@/content/site";

// Cache the upstream calls for an hour (GitHub unauthenticated limit is low).
export const revalidate = 3600;

interface Contribution {
  date: string;
  count: number;
  level: number;
}

export async function GET() {
  const user = githubUsername;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tushar-portfolio",
  };

  try {
    const [profileRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${user}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const profile = profileRes.ok ? await profileRes.json() : null;
    const repos = reposRes.ok ? await reposRes.json() : [];
    const contrib = contribRes.ok
      ? await contribRes.json()
      : { contributions: [] };

    const stars = Array.isArray(repos)
      ? repos.reduce(
          (sum: number, r: { stargazers_count?: number }) =>
            sum + (r.stargazers_count ?? 0),
          0,
        )
      : 0;

    const contributions: Contribution[] = contrib.contributions ?? [];
    const totalContributions = contributions.reduce(
      (sum, c) => sum + (c.count ?? 0),
      0,
    );

    return NextResponse.json({
      ok: true,
      login: user,
      followers: profile?.followers ?? null,
      following: profile?.following ?? null,
      publicRepos: profile?.public_repos ?? null,
      stars,
      totalContributions,
      contributions,
    });
  } catch {
    return NextResponse.json({ ok: false, contributions: [] }, { status: 200 });
  }
}
