import { useEffect, useState, type ReactNode } from "react";
import { INFO, TICKER } from "../data";
import { useEmbers, useInView } from "../hooks";

/* ================= custom inline icons ================= */

export const Spark = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 1.5 14.4 9.6 22.5 12 14.4 14.4 12 22.5 9.6 14.4 1.5 12 9.6 9.6Z" />
  </svg>
);

export const Flame = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 22c-4.4 0-7.5-3-7.5-7.2 0-2.7 1.4-4.8 2.8-6.6 1.2-1.6 2.4-3.1 2.6-5.2 0-.6.7-.9 1.1-.5 2.1 1.9 3.6 4.1 4 6.6.2-.4.4-.9.5-1.4.1-.6.9-.8 1.3-.3 1.6 2 2.7 4.4 2.7 6.8C19.5 19 16.4 22 12 22Zm-.1-3.2c1.9 0 3.4-1.5 3.4-3.4 0-1.5-.9-2.6-1.8-3.7-.6-.8-1.3-1.6-1.6-2.5-.9 1-1.6 1.9-2.2 2.8-.8 1.1-1.2 2.1-1.2 3.2 0 2 1.5 3.6 3.4 3.6Z" />
  </svg>
);

export const Smoke = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <path d="M6 20c3-1.5 3-4 0-5.5S3 10.5 6 9" />
    <path d="M12 20c3-1.5 3-4 0-5.5S9 10.5 12 9" />
    <path d="M18 20c3-1.5 3-4 0-5.5S15 10.5 18 9" />
    <path d="M8 5c2.5 0 5.5 0 8 0M9 3.5h6" />
  </svg>
);

export const Plate = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2" strokeLinecap="round" />
  </svg>
);

export const VegMark = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="none" stroke="#93a56b" strokeWidth="2.2" />
    <circle cx="12" cy="12" r="4.6" fill="#93a56b" />
  </svg>
);

export const ArrowUpRight = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </svg>
);

export const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 4h4l1.5 4.5-2.2 1.6a12 12 0 0 0 5.6 5.6l1.6-2.2L20 15v4a1.5 1.5 0 0 1-1.6 1.5C10.5 20 4 13.5 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  </svg>
);

export const PinIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10Z" />
    <circle cx="12" cy="11" r="2.3" />
  </svg>
);

export const StarIcon = ({ size = 16, filled = false }: { size?: number; filled?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, flex: "none" }}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.6}
    aria-hidden
  >
    <path d="M12 2.4l2.9 6.1 6.7.7-5 4.5 1.4 6.6L12 17l-6 3.3 1.4-6.6-5-4.5 6.7-.7L12 2.4z" strokeLinejoin="round" />
  </svg>
);

export function Stars({ value, size = 15, className = "" }: { value: number; size?: number; className?: string }) {
  const pct = (value / 5) * 100;
  const row = (filled: boolean) => (
    <span className="flex gap-[2px]" style={{ width: size * 5 + 8 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} size={size} filled={filled} />
      ))}
    </span>
  );
  return (
    <span className={`relative inline-block align-middle ${className}`} aria-label={`${value} out of 5 stars`}>
      <span className="text-cream/25">{row(false)}</span>
      <span className="absolute inset-0 overflow-hidden text-saffron" style={{ width: `${(pct / 100) * (size * 5 + 8)}px` }}>
        {row(true)}
      </span>
    </span>
  );
}

/* ================= primitives ================= */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function MaskLines({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`${inView ? "masks-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span style={{ transitionDelay: `${i * 110}ms` }}>{line}</span>
        </span>
      ))}
    </div>
  );
}

export function SectionHead({
  no,
  kicker,
  lines,
  className = "",
}: {
  no: string;
  kicker: string;
  lines: ReactNode[];
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-saffron">{no}</span>
        <span className="h-px w-12 bg-saffron/40" />
        <span className="font-mono text-xs tracking-[0.3em] text-dune uppercase">{kicker}</span>
      </Reveal>
      <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tight text-cream sm:text-5xl lg:text-6xl">
        <MaskLines lines={lines} />
      </h2>
    </div>
  );
}

/* ================= ticker ================= */

export function Ticker({ items = TICKER }: { items?: string[] }) {
  const half = (key: string) => (
    <div key={key} className="flex items-center" aria-hidden={key === "b"}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-7 font-mono text-[11px] tracking-[0.28em] text-parch/75">{t}</span>
          <Spark className="h-2.5 w-2.5 text-saffron" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y border-cream/10 bg-coal py-3.5">
      <div className="marquee-track">
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}

/* ================= embers + grain ================= */

export function Embers({ count = 14 }: { count?: number }) {
  const embers = useEmbers(count);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
            opacity: e.opacity,
            ["--drift" as string]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

export const Grain = () => <div className="noise-overlay" aria-hidden />;

/* ================= header ================= */

const NAV = [
  { id: "house", label: "The House" },
  { id: "tandoor", label: "The Fire" },
  { id: "menu", label: "The Menu" },
  { id: "word", label: "The Word" },
  { id: "lounge", label: "The Lounge" },
  { id: "rush", label: "The Rush" },
  { id: "visit", label: "Visit" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[70] h-[3px] w-full bg-cream/5">
        <div
          className="h-full bg-gradient-to-r from-saffron via-flame to-saffron"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${scrolled ? "border-b border-cream/10 bg-char/85 py-3 backdrop-blur-md" : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="h-9 w-9 transition-transform duration-500 group-hover:rotate-12" aria-hidden>
              <circle cx="20" cy="22" r="14" fill="#e8a33d" />
              <circle cx="14" cy="18" r="2.2" fill="#8a5a1e" />
              <circle cx="25" cy="21" r="1.8" fill="#8a5a1e" />
              <circle cx="18" cy="27" r="2.4" fill="#8a5a1e" />
              <path d="M14 8c1.5-1.5 1.5-3 0-4.5M20 8c1.5-1.5 1.5-3 0-4.5M26 8c1.5-1.5 1.5-3 0-4.5" stroke="#f2e7d3" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.7" />
            </svg>
            <span className="leading-none">
              <span className="block font-display text-sm font-black tracking-wide text-cream">THE KKULCHA HHOUSE</span>
              <span className="mt-1 block font-mono text-[9px] tracking-[0.32em] text-dune">CAFE® · DOBSON RD · HOWRAH</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="group relative font-mono text-[11px] tracking-[0.22em] text-parch/80 uppercase transition-colors hover:text-saffron"
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={INFO.phoneHref}
              className="ml-2 rounded-full bg-saffron px-5 py-2.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-char uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-haldi hover:shadow-[0_8px_30px_-8px_rgba(232,163,61,0.55)]"
            >
              Reserve
            </a>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-cream/15 lg:hidden"
            aria-label="Toggle menu"
          >
            <span className={`h-px w-4 bg-cream transition-all duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-cream transition-all duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col justify-center bg-char/97 px-8 backdrop-blur-sm transition-all duration-500 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        {NAV.map((n, i) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            onClick={() => setOpen(false)}
            className={`border-b border-cream/10 py-4 font-display text-3xl font-black text-cream transition-all duration-500 hover:pl-3 hover:text-saffron ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="mr-4 font-mono text-xs text-saffron">0{i + 1}</span>
            {n.label}
          </a>
        ))}
        <a href={INFO.phoneHref} className="mt-8 inline-block w-fit rounded-full bg-saffron px-8 py-3.5 font-mono text-xs font-semibold tracking-[0.2em] text-char uppercase">
          Reserve · {INFO.phoneDisplay}
        </a>
      </div>
    </>
  );
}

/* ================= footer ================= */

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-saffron/10 bg-gradient-to-b from-char to-coal">
      {/* Ambient glowing orb in the background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-saffron/5 blur-[120px] pointer-events-none" />

      {/* Background KKULCHA text with enhanced styling */}
      <div className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[12vw] font-black leading-none tracking-tight outline-word lg:text-[8vw] opacity-30 blur-[2px] transition-all duration-1000" aria-hidden>
        KKULCHA
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-10 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          
          {/* Main Info Column */}
          <div className="md:col-span-5 md:pr-8">
            <p className="font-display text-3xl font-black bg-gradient-to-r from-cream to-parch bg-clip-text text-transparent drop-shadow-sm">
              THE KKULCHA HHOUSE CAFE<span className="text-saffron">®</span>
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-parch/70 selection:bg-saffron selection:text-coal">
              A 100% pure-veg kulcha house & hookah lounge on Dobson Road, Howrah — rated{" "}
              <span className="text-saffron font-bold drop-shadow-[0_0_8px_rgba(232,163,61,0.4)]">4.5★</span> by 1,108 hungry Googlers. Kulchas first, questions later.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-saffron/20 bg-saffron/5 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-dune uppercase backdrop-blur-sm shadow-[0_0_15px_rgba(232,163,61,0.05)]">
              <VegMark className="h-4 w-4" /> 
              <span>Pure veg · FSSAI · makkhan</span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-2 md:border-l md:border-cream/5 md:pl-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-saffron uppercase font-semibold">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="group flex items-center text-sm text-parch/80 transition-all duration-300 hover:text-saffron hover:translate-x-1.5">
                    <span className="mr-2 h-[1px] w-0 bg-saffron transition-all duration-300 group-hover:w-3"></span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Us */}
          <div className="md:col-span-3 md:border-l md:border-cream/5 md:pl-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-saffron uppercase font-semibold">Find us</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-parch/80">
              {INFO.addressLines.map((l) => (
                <p key={l} className="leading-relaxed">{l}</p>
              ))}
              <p className="pt-2">
                <a href={INFO.phoneHref} className="inline-flex items-center gap-2 text-saffron hover:text-haldi transition-colors duration-300 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {INFO.phoneDisplay}
                </a>
              </p>
              <p className="font-mono text-[11px] text-dune mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse"></span>
                Open daily · {INFO.hours}
              </p>
            </address>
          </div>

          {/* Elsewhere Links */}
          <div className="md:col-span-2 md:border-l md:border-cream/5 md:pl-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-saffron uppercase font-semibold">Elsewhere</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href={INFO.siteUrl} target="_blank" rel="noreferrer" className="group flex w-fit items-center gap-2 text-parch/80 transition-all duration-300 hover:text-saffron hover:translate-x-1.5">Official site <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></li>
              <li><a href={INFO.zomatoUrl} target="_blank" rel="noreferrer" className="group flex w-fit items-center gap-2 text-parch/80 transition-all duration-300 hover:text-saffron hover:translate-x-1.5">Zomato <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></li>
              <li><a href={INFO.fbUrl} target="_blank" rel="noreferrer" className="group flex w-fit items-center gap-2 text-parch/80 transition-all duration-300 hover:text-saffron hover:translate-x-1.5">Facebook <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></li>
              <li><a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="group flex w-fit items-center gap-2 text-parch/80 transition-all duration-300 hover:text-saffron hover:translate-x-1.5">Google Maps <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-2xl border border-cream/5 bg-coal/40 p-6 backdrop-blur-md sm:flex-row sm:px-8">
          <p className="text-center font-mono text-[10px] tracking-[0.2em] text-dune/80 uppercase sm:text-left">
            Fan-made tribute built from the public Google listing <span className="hidden sm:inline">·</span><br className="sm:hidden" /> not the official site
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-saffron/10 px-5 py-2.5 font-mono text-[10px] tracking-[0.25em] text-saffron uppercase transition-all duration-300 hover:bg-saffron hover:text-coal hover:shadow-[0_0_20px_rgba(232,163,61,0.3)]"
          >
            <span className="relative z-10">Back to the tandoor</span>
            <svg viewBox="0 0 24 24" className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
