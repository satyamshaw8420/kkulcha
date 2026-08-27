import { IMG, INFO, RATING } from "../data";
import { useOpenStatus, useReducedMotion, useScramble, useTypewriter } from "../hooks";
import { useReservation } from "../context/ReservationContext";
import { Embers, Flame, MaskLines, Reveal, Smoke, Spark, Stars, VegMark } from "./chrome";

function SearchPill() {
  const reduced = useReducedMotion();
  const typed = useTypewriter("restaurant in howrah", true, 60);
  return (
    <Reveal>
      <div className="inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-cream/15 bg-coal/70 px-5 py-2.5 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-saffron" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <span className="font-mono text-[11px] tracking-wide text-dune">you searched</span>
        <span className="font-mono text-[11px] tracking-wide text-cream">
          “{typed}
          {!reduced && <span className="cursor-blink text-saffron">▌</span>}”
        </span>
        <span className="hidden font-mono text-[11px] tracking-wide text-dune sm:inline">· within 1.6 km · top rated</span>
      </div>
    </Reveal>
  );
}

function Stamp() {
  return (
    <div className="absolute -left-8 top-14 z-20 hidden h-32 w-32 sm:block lg:-left-14 lg:h-36 lg:w-36">
      <svg viewBox="0 0 120 120" className="stamp-spin h-full w-full" aria-hidden>
        <defs>
          <path id="stamp-circ" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#1f1710" stroke="rgba(232,163,61,0.4)" strokeWidth="1" />
        <text fill="#e8a33d" fontSize="9.2" letterSpacing="2.6" fontFamily="IBM Plex Mono, monospace">
          <textPath href="#stamp-circ">100% PURE VEG • TANDOOR FIRED • DOBSON ROAD •</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Flame className="h-8 w-8 text-flame" />
      </div>
    </div>
  );
}

export default function Hero() {
  const status = useOpenStatus();
  const reduced = useReducedMotion();
  const line1 = useScramble("KKULCHA", true, 30);
  const line2 = useScramble("HHOUSE", true, 34);
  const { openReservation } = useReservation();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-14 lg:pt-40">
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(210,88,46,0.16),transparent_65%)]" />
        <div className="absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.1),transparent_65%)]" />
        <div className="absolute right-[6%] top-24 hidden select-none font-display text-[240px] font-black leading-none text-cream/[0.035] xl:block" style={{ writingMode: "vertical-rl" }}>
          कुल्चा
        </div>
        <Embers count={16} />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* ------- left : the claim ------- */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <SearchPill />

          <p className="mt-8 font-mono text-[11px] tracking-[0.34em] text-saffron uppercase">
            <Reveal>Est. Dobson Road — Howrah · North Indian · Pure Veg</Reveal>
          </p>

          <h1 className="mt-4 font-display font-black leading-[0.86] tracking-tight text-cream">
            <span className="block text-[clamp(1.6rem,3vw,2.4rem)] font-light italic text-parch/90">THE</span>
            <span className="block whitespace-nowrap text-[clamp(3.1rem,10.5vw,8.2rem)]">{line1}</span>
            <span className="block whitespace-nowrap text-[clamp(3.1rem,10.5vw,8.2rem)]">
              {line2}
              <span className="align-super text-[0.22em] font-medium text-saffron">®</span>
              <span className="ml-3 hidden align-middle font-mono text-[11px] font-normal tracking-[0.3em] text-dune md:inline-block">
                CAFE
              </span>
            </span>
          </h1>

          <MaskLines
            className="mt-8 max-w-xl text-base leading-relaxed text-parch/75 sm:text-lg"
            lines={[
              <span key="a">A kulcha house hiding in Ajmer Mansion, where the tandoor</span>,
              <span key="b">
                breathes from 11 in the morning and the hookah smoke curls over{" "}
                <em className="font-display text-saffron">makkhan-soaked</em> everything.
              </span>,
            ]}
          />

          <Reveal delay={150} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="flex items-center gap-2.5">
              <Stars value={RATING.avg} size={16} />
              <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="font-mono text-xs text-parch/85 underline decoration-saffron/50 underline-offset-4 transition-colors hover:text-saffron">
                4.5 · 1,108 Google reviews
              </a>
            </span>
            <span className="font-mono text-xs text-dune">₹200–1,200 for one</span>
            <span className="flex items-center gap-2 rounded-full border border-cream/15 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase">
              <span className="relative flex h-2 w-2">
                <span className={`pin-ring absolute inline-flex h-full w-full rounded-full ${status.open ? "bg-sage" : "bg-flame"}`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${status.open ? "bg-sage" : "bg-flame"}`} />
              </span>
              <span className={status.open ? "text-sage" : "text-flame"}>{status.label}</span>
            </span>
          </Reveal>

          <Reveal delay={280} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={openReservation}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-saffron px-8 py-4 font-mono text-xs font-semibold tracking-[0.2em] text-char uppercase transition-transform duration-300 hover:-translate-y-1 cursor-pointer shadow-[0_10px_30px_-10px_rgba(232,163,61,0.6)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-haldi transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Reserve a table</span>
              <svg viewBox="0 0 24 24" className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M4 12h16m-6-6 6 6-6 6" />
              </svg>
            </button>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-4 font-mono text-xs tracking-[0.2em] text-cream uppercase transition-all duration-300 hover:border-saffron/60 hover:text-saffron"
            >
              Browse the menu
            </a>
            <span className="font-mono text-[11px] text-dune">
              or call <a href={INFO.phoneHref} className="text-parch/85 hover:text-saffron">{INFO.phoneDisplay}</a>
            </span>
          </Reveal>

          <Reveal delay={400} className="mt-10 flex flex-wrap gap-2.5">
            {[
              { icon: <VegMark className="h-3.5 w-3.5" />, label: "100% Pure Veg" },
              { icon: <Smoke className="h-3.5 w-3.5" />, label: "Hookah lounge" },
              { icon: <Flame className="h-3.5 w-3.5" />, label: "Clay tandoor" },
              { icon: <Spark className="h-3.5 w-3.5" />, label: "Kids' menu" },
            ].map((b) => {
              const cls = "flex items-center gap-2 rounded-full border border-cream/12 bg-coal/60 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-parch/75 uppercase transition-colors duration-300 hover:border-saffron/50 hover:text-saffron";
              const inner = (
                <>
                  {b.icon}
                  {b.label}
                </>
              );
              return b.label === "Hookah lounge" ? (
                <a key={b.label} href="#lounge" className={cls}>
                  {inner}
                </a>
              ) : (
                <span key={b.label} className={cls}>
                  {inner}
                </span>
              );
            })}
          </Reveal>
        </div>

        {/* ------- right : the evidence ------- */}
        <div className="relative lg:col-span-5">
          <Reveal delay={200} className="relative mx-auto max-w-[430px]">
            <Stamp />
            <div className="rounded-t-[999px] rounded-b-[26px] border border-cream/15 bg-coal/60 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
              <div className="kenburns rounded-t-[999px] rounded-b-[18px]">
                <img
                  src={IMG.hero}
                  alt="Amritsari kulcha with melting butter, straight off the tandoor"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* polaroid : the lounge */}
            <figure className={`absolute -bottom-10 -left-6 w-36 rotate-[-8deg] bg-cream p-1.5 pb-5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:rotate-[-3deg] hover:scale-[1.04] sm:-left-14 sm:w-40 ${reduced ? "" : "float-y"}`}>
              <img src={IMG.hookah} alt="Hookah lounge corner at the cafe" className="h-32 w-full object-cover sm:h-36" loading="lazy" />
              <figcaption className="pt-1.5 text-center font-mono text-[9px] tracking-[0.2em] text-char/70 uppercase">the lounge · 8 pm</figcaption>
            </figure>

            {/* polaroid : the sizzle */}
            <figure className={`absolute -right-4 top-24 w-32 rotate-[6deg] bg-cream p-1.5 pb-5 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:rotate-[2deg] hover:scale-[1.04] sm:-right-10 sm:w-36 ${reduced ? "" : "float-y"}`} style={{ animationDelay: "1.4s" }}>
              <img src={IMG.brownie} alt="Sizzling hot brownie with ice cream" className="h-28 w-full object-cover sm:h-32" loading="lazy" />
              <figcaption className="pt-1.5 text-center font-mono text-[9px] tracking-[0.2em] text-char/70 uppercase">arrives hissing</figcaption>
            </figure>

            {/* live chip */}
            <div className="absolute -bottom-4 right-2 rounded-lg border border-cream/15 bg-char/90 px-4 py-3 backdrop-blur-sm sm:-right-6">
              <p className="font-mono text-[9px] tracking-[0.25em] text-dune uppercase">Google says</p>
              <p className="mt-1 font-display text-sm font-bold text-saffron">8 pm · Usually busy</p>
              <div className="mt-2 flex items-end gap-[3px]" aria-hidden>
                {[30, 45, 62, 80, 100, 72, 40].map((h, i) => (
                  <span key={i} className={`w-[5px] rounded-sm ${i === 4 ? "bg-flame" : "bg-saffron/50"}`} style={{ height: h / 6 }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative mx-auto mt-20 flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#house" className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-dune uppercase transition-colors hover:text-saffron">
          <span className="relative block h-10 w-px overflow-hidden bg-cream/15">
            <span className="absolute left-0 top-0 h-4 w-px animate-[emberRise_2s_linear_infinite] bg-saffron" style={{ opacity: 1 }} />
          </span>
          Scroll — the full story
        </a>
        <p className="hidden font-mono text-[10px] tracking-[0.3em] text-dune uppercase sm:block">
          28/3 DOBSON RD · BABUDANGA · 711101
        </p>
      </div>
    </section>
  );
}
