"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials, navItems } from "@/content/site";
import { neofetch, experience, projects, skillGroups } from "@/content/resume";
import { scrollToSection } from "@/lib/scroll";
import { useSound } from "@/components/providers/sound";

type Line = { id: number; node: React.ReactNode };
let uid = 0;
const mk = (node: React.ReactNode): Line => ({ id: uid++, node });

const Prompt = () => (
  <span className="select-none">
    <span className="text-neon">tushar@archlinux</span>
    <span className="text-bone">:</span>
    <span className="text-cyan">~</span>
    <span className="text-bone">$ </span>
  </span>
);

const COMMANDS = [
  "help",
  "whoami",
  "about",
  "ls",
  "projects",
  "experience",
  "skills",
  "neofetch",
  "socials",
  "resume",
  "goto",
  "clear",
  "uname",
  "sudo",
  "date",
];

const ARCH = `      /\\
     /  \\
    /\\   \\
   /  ..  \\
  /  '  '  \\
 / .-'  '-. \\
/.'        '.\\`;

function resolveSection(arg: string): string | null {
  const a = arg.toLowerCase();
  const map: Record<string, string> = {
    work: "experience",
    awards: "achievements",
    activity: "github",
    home: "hero",
  };
  const id = map[a] ?? a;
  return navItems.some((n) => n.id === id) ? id : null;
}

export function Terminal() {
  const { play } = useSound();
  const [lines, setLines] = useState<Line[]>(() => [
    mk(
      <span className="text-bone">
        Booting <span className="text-neon">portfolio.sh</span> — type{" "}
        <span className="text-cyan">help</span> to begin. Try{" "}
        <span className="text-magenta">neofetch</span> or{" "}
        <span className="text-magenta">sudo pacman -S hire-me</span>.
      </span>,
    ),
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const push = (...nodes: React.ReactNode[]) =>
    setLines((prev) => [...prev, ...nodes.map(mk)]);

  function execute(raw: string) {
    const trimmed = raw.trim();
    push(
      <span>
        <Prompt />
        <span className="text-chalk">{raw}</span>
      </span>,
    );
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        push(
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {[
              ["whoami", "who is this guy"],
              ["about", "the full story"],
              ["ls", "list sections"],
              ["projects", "what I've built"],
              ["experience", "work history"],
              ["skills", "my stack"],
              ["neofetch", "system info"],
              ["socials", "find me online"],
              ["resume", "download CV"],
              ["goto <id>", "jump to section"],
              ["sudo", "do you dare"],
              ["clear", "wipe screen"],
            ].map(([c, d]) => (
              <span key={c} className="text-bone">
                <span className="text-neon">{c}</span>
                <span className="text-ash"> — {d}</span>
              </span>
            ))}
          </div>,
        );
        break;

      case "whoami":
        push(
          <span className="text-bone">
            <span className="text-chalk">{profile.fullName}</span> ·{" "}
            {profile.roleLine}. {profile.tagline}
          </span>,
        );
        break;

      case "about":
        push(
          <span className="text-bone">
            Software Engineer @ Wayfair building multi-agent GenAI data tooling
            &amp; resilient distributed systems. Arch Linux die-hard, gaming
            addict, sci-fi nerd, and a sucker for brutalist architecture.
          </span>,
          <span className="text-ash">
            run <span className="text-cyan">goto about</span> for the full
            section ↓
          </span>,
        );
        break;

      case "ls":
        push(
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {navItems.map((n) => (
              <span key={n.id} className="text-cyan">
                {n.id}/
              </span>
            ))}
          </div>,
        );
        break;

      case "projects":
        projects.forEach((p) =>
          push(
            <span className="text-bone">
              <span className="text-neon">▹ {p.name}</span> — {p.tagline}{" "}
              <span className="text-magenta">[{p.metric.value}]</span>
            </span>,
          ),
        );
        push(
          <span className="text-ash">
            run <span className="text-cyan">goto projects</span> for details ↓
          </span>,
        );
        break;

      case "experience":
      case "work":
        experience.forEach((e) =>
          push(
            <span className="text-bone">
              <span className="text-cyan">{e.period}</span> ·{" "}
              <span className="text-chalk">{e.role}</span> @ {e.company}
            </span>,
          ),
        );
        break;

      case "skills":
        skillGroups.forEach((g) =>
          push(
            <span className="text-bone">
              <span className="text-neon">{g.label.padEnd(12)}</span>
              {g.items.join(" · ")}
            </span>,
          ),
        );
        break;

      case "neofetch":
        push(
          <div className="flex gap-4">
            <pre className="text-neon text-glow-neon">{ARCH}</pre>
            <div className="flex flex-col">
              {neofetch.map((f) => (
                <span key={f.key} className="text-bone">
                  <span className="text-cyan">{f.key}</span>
                  <span className="text-ash">: </span>
                  {f.value}
                </span>
              ))}
            </div>
          </div>,
        );
        break;

      case "socials":
      case "contact":
        socials.forEach((s) =>
          push(
            <span className="text-bone">
              <span className="text-neon">{s.label.padEnd(10)}</span>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan underline-offset-2 hover:underline"
              >
                {s.href.replace("mailto:", "")}
              </a>
            </span>,
          ),
        );
        break;

      case "resume":
        push(<span className="text-neon">→ opening resume.pdf…</span>);
        window.open(profile.resumeUrl, "_blank");
        break;

      case "goto": {
        const id = resolveSection(arg);
        if (!id) {
          push(
            <span className="text-magenta">
              goto: unknown section &apos;{arg}&apos;. try: {navItems
                .map((n) => n.id)
                .join(", ")}
            </span>,
          );
        } else {
          push(<span className="text-neon">→ navigating to /{id}…</span>);
          setTimeout(() => scrollToSection(id), 250);
        }
        break;
      }

      case "uname":
        push(
          <span className="text-bone">
            Linux archlinux 6.x-zen #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux{" "}
            <span className="text-neon">(btw)</span>
          </span>,
        );
        break;

      case "date":
        push(<span className="text-bone">{new Date().toString()}</span>);
        break;

      case "pwd":
        push(<span className="text-bone">/home/tushar/portfolio</span>);
        break;

      case "echo":
        push(<span className="text-bone">{arg}</span>);
        break;

      case "sudo":
        if (arg.includes("hire-me") || arg.includes("hire me")) {
          push(
            <span className="text-neon text-glow-neon">
              resolving dependencies… installing hire-me ✓ — let&apos;s talk:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-cyan hover:underline"
              >
                {profile.email}
              </a>
            </span>,
          );
        } else {
          push(
            <span className="text-magenta">
              [sudo] password for tushar: nice try 😏 — permission denied.
            </span>,
          );
        }
        break;

      case "clear":
        setLines([]);
        return;

      case "exit":
        push(
          <span className="text-ash">
            there is no escape. you&apos;re hired here forever.
          </span>,
        );
        break;

      default:
        push(
          <span className="text-magenta">
            command not found: {cmd}. type{" "}
            <span className="text-cyan">help</span>.
          </span>,
        );
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      play("click");
      execute(input);
      if (input.trim()) {
        setHistory((h) => [input, ...h]);
      }
      setHistIdx(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.min(i + 1, history.length - 1);
        if (history[next] !== undefined) setInput(history[next]);
        return next;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx((i) => {
        const next = Math.max(i - 1, -1);
        setInput(next === -1 ? "" : history[next] ?? "");
        return next;
      });
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    } else {
      play("type");
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="brutal-card hud-corner scanlines flex h-[420px] flex-col overflow-hidden bg-concrete-900/80 backdrop-blur-sm"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-concrete-700 bg-concrete-850 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 border border-magenta bg-magenta/30" />
          <span className="h-3 w-3 border border-amber bg-amber/30" />
          <span className="h-3 w-3 border border-neon bg-neon/30" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-ash">
          tushar@archlinux — zsh
        </span>
        <span className="font-mono text-[11px] text-ash">80×24</span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-1 overflow-y-auto p-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
      >
        {lines.map((l) => (
          <div key={l.id} className="whitespace-pre-wrap break-words">
            {l.node}
          </div>
        ))}

        {/* Live input line */}
        <div className="flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-chalk caret-neon outline-none"
          />
        </div>
      </div>
    </div>
  );
}
