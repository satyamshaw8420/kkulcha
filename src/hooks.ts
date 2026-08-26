import { useEffect, useMemo, useRef, useState } from "react";
import { INFO } from "./data";

/* ---------- prefers-reduced-motion ---------- */

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------- in-view (once) ---------- */

export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

/* ---------- scramble-decode ---------- */

const GLYPHS = "▓▒░<>/\\#%&@*+=~";

export function useScramble(text: string, active: boolean, speed = 28): string {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!active) return;
    let frame = 0;
    const total = text.length;
    const id = window.setInterval(() => {
      frame += 1;
      const solved = Math.floor(frame / 2.2);
      let s = "";
      for (let i = 0; i < total; i++) {
        const ch = text[i];
        if (ch === " ") {
          s += " ";
        } else if (i < solved) {
          s += ch;
        } else {
          s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setOut(s);
      if (solved >= total) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, reduced, speed]);
  return out || (reduced ? text : "\u00A0");
}

/* ---------- typewriter ---------- */

export function useTypewriter(text: string, active: boolean, speed = 55): string {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (reduced) {
      setOut(text);
      return;
    }
    if (!active) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, active, reduced, speed]);
  return out;
}

/* ---------- ticking clock ---------- */

export function useNow(intervalMs = 30000): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

/* ---------- live open/closed status ---------- */

export function useOpenStatus() {
  const now = useNow(30000);
  return useMemo(() => {
    const mins = now.getHours() * 60 + now.getMinutes();
    const open = mins >= INFO.openMin && mins < INFO.closeMin;
    return {
      open,
      label: open ? "Open now · closes 11:30 pm" : "Closed · opens 11 am",
      short: open ? "OPEN NOW" : "CLOSED",
    };
  }, [now]);
}

/* ---------- ember particle field ---------- */

export type EmberSpec = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
};

export function useEmbers(count = 14): EmberSpec[] {
  return useMemo(() => {
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    return Array.from({ length: count }, () => ({
      left: rnd(2, 98),
      size: rnd(3, 7),
      delay: rnd(0, 12),
      duration: rnd(7, 15),
      drift: rnd(-40, 40),
      opacity: rnd(0.35, 0.9),
    }));
  }, [count]);
}
