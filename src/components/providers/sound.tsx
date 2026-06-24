"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SoundName = "hover" | "click" | "type" | "boot" | "toggle";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (name: SoundName) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

const STORAGE_KEY = "tushar.sound-enabled";

/** Synthesizes subtle sci-fi UI blips with the Web Audio API (no asset files). */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    setEnabled(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, [enabled]);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AC();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const presets: Record<
        SoundName,
        { type: OscillatorType; freq: number; to: number; dur: number; vol: number }
      > = {
        hover: { type: "sine", freq: 440, to: 660, dur: 0.06, vol: 0.025 },
        click: { type: "square", freq: 220, to: 880, dur: 0.09, vol: 0.04 },
        type: { type: "sine", freq: 900, to: 1200, dur: 0.03, vol: 0.015 },
        boot: { type: "sawtooth", freq: 110, to: 880, dur: 0.5, vol: 0.05 },
        toggle: { type: "triangle", freq: 660, to: 330, dur: 0.12, vol: 0.05 },
      };

      const p = presets[name];
      osc.type = p.type;
      osc.frequency.setValueAtTime(p.freq, now);
      osc.frequency.exponentialRampToValueAtTime(p.to, now + p.dur);
      gain.gain.setValueAtTime(p.vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur);
      osc.start(now);
      osc.stop(now + p.dur);
    },
    [enabled, getCtx],
  );

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      if (next) getCtx();
      return next;
    });
  }, [getCtx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within SoundProvider");
  return ctx;
}
