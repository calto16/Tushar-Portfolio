"use client";

import { useState } from "react";
import { FiMapPin, FiSend, FiCheck, FiAlertTriangle } from "react-icons/fi";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { profile, socials } from "@/content/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { useSound } from "@/components/providers/sound";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { play } = useSound();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        play("click");
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else if (data.fallback) {
        mailtoFallback();
        setStatus("idle");
      } else {
        setStatus("error");
        setError(data.error ?? "Failed to send.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Try emailing me directly.");
    }
  }

  return (
    <Section id="contact">
      <SectionHeader
        index="07"
        title="Contact"
        kicker="// open a socket"
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Form */}
        <Reveal>
          <form
            onSubmit={onSubmit}
            className="brutal-card scanlines flex flex-col gap-5 p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-neon">
              $ ./send_message --to tushar
            </p>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ash">
                --name
              </span>
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Ada Lovelace"
                className="border border-concrete-600 bg-concrete-950 px-4 py-3 font-mono text-sm text-chalk caret-neon outline-none transition-colors focus:border-neon"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ash">
                --email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="ada@enigma.dev"
                className="border border-concrete-600 bg-concrete-950 px-4 py-3 font-mono text-sm text-chalk caret-neon outline-none transition-colors focus:border-neon"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-ash">
                --message
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={set("message")}
                placeholder="Let's build something brutal…"
                className="resize-none border border-concrete-600 bg-concrete-950 px-4 py-3 font-mono text-sm text-chalk caret-neon outline-none transition-colors focus:border-neon"
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              data-cursor="hover"
              className="group flex items-center justify-center gap-2 border border-neon bg-neon px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-void transition-all hover:shadow-[0_0_24px_-4px_var(--color-neon)] disabled:opacity-60"
            >
              {status === "sending" && "transmitting…"}
              {status === "sent" && (
                <>
                  <FiCheck /> message sent
                </>
              )}
              {(status === "idle" || status === "error") && (
                <>
                  <FiSend className="transition-transform group-hover:translate-x-1" />
                  execute
                </>
              )}
            </button>

            {status === "error" && (
              <p className="flex items-center gap-2 font-mono text-xs text-magenta">
                <FiAlertTriangle /> {error}
              </p>
            )}
            {status === "sent" && (
              <p className="font-mono text-xs text-neon">
                // ack received — I&apos;ll reply soon.
              </p>
            )}
          </form>
        </Reveal>

        {/* Direct links */}
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col gap-6">
            <div className="brutal-card p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-ash">
                // direct line
              </p>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="mt-2 block break-all font-display text-xl text-chalk transition-colors hover:text-neon"
              >
                {profile.email}
              </a>
              <p className="mt-4 flex items-center gap-2 font-mono text-sm text-bone">
                <FiMapPin className="text-neon" /> {profile.location} ·{" "}
                {profile.timezone}
              </p>
            </div>

            <div className="brutal-card grid flex-1 grid-cols-2 gap-px overflow-hidden bg-concrete-700">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group flex flex-col gap-2 bg-concrete-900 p-5 transition-colors hover:bg-concrete-850"
                >
                  <span className="text-bone transition-colors group-hover:text-neon">
                    <SocialIcon name={s.icon} size={20} />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-chalk">
                    {s.label}
                  </span>
                  <span className="font-mono text-[11px] text-ash">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
