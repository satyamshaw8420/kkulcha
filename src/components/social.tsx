import { useState } from "react";
import { busyLabel, DAYS, HOUR_LABELS, IMG, INFO, POPULAR_TIMES, RATING, REVIEWS, SUMMARY, type Review } from "../data";
import { useInView } from "../hooks";
import { ArrowUpRight, Reveal, SectionHead, Spark, Stars } from "./chrome";

/* ================= 04 — The Word (reviews) ================= */

function Breakdown() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-8 space-y-2.5">
      {RATING.dist.map((pct, i) => (
        <div key={i} className="group flex items-center gap-3">
          <span className="flex w-8 items-center gap-1 font-mono text-xs text-parch/80">
            {5 - i}
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-saffron" fill="currentColor" aria-hidden>
              <path d="M12 2.4l2.9 6.1 6.7.7-5 4.5 1.4 6.6L12 17l-6 3.3 1.4-6.6-5-4.5 6.7-.7L12 2.4z" />
            </svg>
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-cream/8">
            <div
              className={`bar-grow h-full rounded-full ${i === 0 ? "bg-gradient-to-r from-saffron to-flame" : "bg-saffron/55"}`}
              style={{ width: inView ? `${pct}%` : "0%", transitionDelay: `${i * 120}ms` }}
            />
          </div>
          <span className="w-10 text-right font-mono text-[10px] text-dune">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

function QuoteCard({ r, i }: { r: Review; i: number }) {
  const tilt = i % 3 === 0 ? "-rotate-[1.4deg]" : i % 3 === 1 ? "rotate-[1deg]" : "-rotate-[0.5deg]";
  const hue = i % 2 === 0 ? "bg-flame" : "bg-saffron";
  return (
    <Reveal delay={(i % 2) * 120}>
      <figure className={`group relative h-full rounded-xl border border-cream/10 bg-coal p-6 transition-all duration-500 hover:rotate-0 hover:border-saffron/40 ${tilt}`}>
        <span className="absolute -top-4 left-5 font-display text-6xl font-black text-saffron/30" aria-hidden>
          “
        </span>
        <blockquote className="pt-3 text-[15px] leading-relaxed text-parch/85">{r.quote}</blockquote>
        <figcaption className="mt-5 flex items-center gap-3 border-t border-cream/8 pt-4">
          <span className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-black text-char ${hue}`}>
            {r.name.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-cream">{r.name}</span>
            <span className="block font-mono text-[9px] tracking-[0.18em] text-dune uppercase">{r.when}</span>
          </span>
          <span className="ml-auto">
            <Stars value={r.stars} size={11} />
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function ReviewsSection() {
  return (
    <section id="word" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.07),transparent_65%)]" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        {/* sticky verdict */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              no="04"
              kicker="The Word"
              lines={[
                <span key="1">1,108 opinions.</span>,
                <span key="2">
                  One verdict: <em className="font-light italic text-saffron">come hungry.</em>
                </span>,
              ]}
            />
            <Reveal delay={150} className="mt-10 rounded-2xl border border-cream/10 bg-coal p-7">
              <div className="flex items-end gap-4">
                <span className="font-display text-8xl font-black leading-none text-cream">4.5</span>
                <div className="pb-2">
                  <Stars value={RATING.avg} size={18} />
                  <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-parch/75 underline decoration-saffron/50 underline-offset-4 hover:text-saffron">
                    {RATING.count.toLocaleString("en-IN")} Google reviews <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <Breakdown />
              <p className="mt-6 border-t border-cream/8 pt-4 font-mono text-[10px] leading-relaxed tracking-[0.15em] text-dune uppercase">
                Rated in the top tier of “restaurant in howrah” · 1.6 km search
              </p>
            </Reveal>
          </div>
        </div>

        {/* summary + quotes */}
        <div className="space-y-8 lg:col-span-7">
          <Reveal>
            <div className="rounded-2xl border border-saffron/25 bg-gradient-to-br from-soot to-coal p-7 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2.5 font-display text-lg font-bold text-cream">
                  <Spark className="h-4 w-4 text-saffron" /> Google review summary
                </p>
                <span className="rounded-full border border-saffron/40 px-3 py-1 font-mono text-[9px] tracking-[0.22em] text-saffron uppercase">Summarised by AI</span>
              </div>
              <p className="mt-5 leading-relaxed text-parch/80">“{SUMMARY}”</p>
              <p className="mt-5 font-mono text-[10px] tracking-[0.25em] text-dune uppercase">+171 more review themes on Google</p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {REVIEWS.map((r, i) => (
              <QuoteCard key={r.name + i} r={r} i={i} />
            ))}
          </div>

          <Reveal className="pt-2 text-center sm:text-left">
            <a
              href={INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] text-saffron uppercase transition-colors hover:text-haldi"
            >
              Read every single review on Google
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= 05 — The Mood (gallery) ================= */

const GALLERY: { src: string; cap: string; cls: string }[] = [
  { src: IMG.tandoor, cap: "the slap · stage 02", cls: "h-80" },
  { src: IMG.thali, cap: "cheese kulcha × PBM", cls: "h-64" },
  { src: IMG.hookah, cap: "the lounge, after dark", cls: "h-96" },
  { src: IMG.kofta, cap: "malai kofta, google's favourite", cls: "h-72" },
  { src: IMG.interior, cap: "string lights, warm corners", cls: "h-80" },
  { src: IMG.mojito, cap: "blue berry mojito", cls: "h-96" },
  { src: IMG.babycorn, cap: "crispy chilli baby corn", cls: "h-64" },
  { src: IMG.roll, cap: "malai chaap kathi roll", cls: "h-80" },
  { src: IMG.brownie, cap: "the sizzling entrance", cls: "h-72" },
  { src: IMG.hero, cap: "amritsari, makkhan hour", cls: "h-96" },
];

export function GallerySection() {
  return (
    <section id="mood" className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          no="05"
          kicker="The Mood"
          lines={[
            <span key="1">Steam, smoke &</span>,
            <span key="2">
              <em className="font-light italic text-saffron">string lights.</em>
            </span>,
          ]}
        />
        <div className="mt-14 columns-2 gap-4 md:columns-3 lg:gap-5 [&>figure]:mb-4 lg:[&>figure]:mb-5">
          {GALLERY.map((g, i) => (
            <figure key={i} className="group relative break-inside-avoid overflow-hidden rounded-xl border border-cream/10">
              <img src={g.src} alt={g.cap} className={`${g.cls} w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110`} loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-char via-char/80 to-transparent px-4 pb-3.5 pt-10 font-mono text-[9px] tracking-[0.25em] text-saffron uppercase transition-transform duration-500 group-hover:translate-y-0">
                {g.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= interlude — The Lounge (hookah) ================= */

function SmokeWisp({ className, delay }: { className: string; delay: string }) {
  return (
    <svg viewBox="0 0 60 160" className={`smoke pointer-events-none absolute ${className}`} style={{ animationDelay: delay }} aria-hidden>
      <path
        d="M30 155c-14-18 16-30 2-52s-18-30-4-50 18-28 4-46"
        fill="none"
        stroke="rgba(216,198,168,0.5)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const LOUNGE_VIBES = ["Rooftop evenings", "Watch the match", "Chilled corners", "Flavours rotate — ask the lounge"];

export function LoungeSection() {
  return (
    <section id="lounge" className="relative overflow-hidden border-y border-cream/8 bg-[#130f0a] py-24 lg:py-32">
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.09),transparent_65%)]" />
        <div className="absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(210,88,46,0.1),transparent_65%)]" />
        <span className="absolute left-1/2 top-8 -translate-x-1/2 select-none font-display text-[170px] font-black leading-none text-cream/[0.03]">
          हुक्का
        </span>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-12 lg:px-8">
        {/* image with drifting smoke */}
        <div className="relative lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="kenburns overflow-hidden rounded-[22px] border border-cream/12 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
                <img src={IMG.hookah} alt="Ornate hookah with smoke curling in the warm lounge light" className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
              <SmokeWisp className="left-1/2 top-6 h-28 w-10 -translate-x-1/2" delay="0s" />
              <SmokeWisp className="left-[38%] top-12 h-20 w-8" delay="2.6s" />
              <SmokeWisp className="left-[58%] top-2 h-24 w-9" delay="5s" />
              <span className="absolute -bottom-4 left-5 rounded-full bg-saffron px-4 py-1.5 font-mono text-[9px] font-semibold tracking-[0.22em] text-char uppercase">
                after dark · the lounge
              </span>
            </div>
          </Reveal>
        </div>

        {/* copy + combo */}
        <div className="lg:col-span-7">
          <SectionHead
            no="✳"
            kicker="The Lounge · हुक्का"
            lines={[
              <span key="1">The kulcha ends.</span>,
              <span key="2">
                The evening <em className="font-light italic text-saffron">doesn't.</em>
              </span>,
            ]}
          />
          <Reveal delay={150} className="mt-8 max-w-2xl space-y-5">
            <p className="text-lg leading-relaxed text-parch/80">
              Google's own summary says it plainly — diners <span className="text-saffron">"also enjoy the hookah."</span>{" "}
              Once the thalis clear, the lounge takes over: amber light, slow smoke, the match on the screen, and
              enough chatter to outlast the coals.
            </p>
            <p className="leading-relaxed text-parch/60">
              Their Facebook keeps teasing the move everyone makes — the{" "}
              <span className="text-parch/85">₹900 table combo: hookah + drink + snacks</span>. Dine, chill, watch the
              match. Reviewers add the rooftop to the list of reasons to stay past dessert.
            </p>
          </Reveal>

          {/* the combo card */}
          <Reveal delay={220} className="mt-9 max-w-2xl">
            <div className="group relative overflow-hidden rounded-2xl border border-saffron/35 bg-gradient-to-br from-soot via-coal to-char p-7 transition-all duration-500 hover:-translate-y-1 hover:border-saffron/70 hover:shadow-[0_24px_60px_-20px_rgba(232,163,61,0.35)] sm:p-8">
              <span className="absolute right-5 top-5 rounded-full border border-cream/15 px-3 py-1 font-mono text-[8px] tracking-[0.25em] text-dune uppercase">
                via their Facebook
              </span>
              <p className="font-mono text-[10px] tracking-[0.32em] text-saffron uppercase">Table combo</p>
              <div className="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
                <span className="font-display text-6xl font-black leading-none text-cream">₹900</span>
                <span className="pb-1.5 font-mono text-[11px] tracking-[0.2em] text-parch/70 uppercase">per table</span>
              </div>
              <p className="mt-4 font-display text-2xl font-bold text-haldi">Hookah + Drink + Snacks</p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.22em] text-dune uppercase">Dine · Chill · Watch the match · Dobson Rd</p>
            </div>
          </Reveal>

          {/* vibes */}
          <Reveal delay={280} className="mt-7 flex max-w-2xl flex-wrap gap-2.5">
            {LOUNGE_VIBES.map((v) => (
              <span key={v} className="flex items-center gap-2 rounded-full border border-cream/12 bg-coal/60 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-parch/75 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/50 hover:text-saffron">
                <svg viewBox="0 0 24 24" className="h-3 w-3 text-saffron/70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M8 20c2.5-1.4 2.5-3.6 0-5s-2.5-3.6 0-5M15 20c2.5-1.4 2.5-3.6 0-5s-2.5-3.6 0-5" />
                </svg>
                {v}
              </span>
            ))}
          </Reveal>

          <Reveal delay={340} className="mt-8 max-w-2xl border-l-2 border-saffron/50 pl-5">
            <p className="font-display text-lg font-bold italic text-parch/90">"Super best hookah and food. Awesome ambience. Best staff and service."</p>
            <p className="mt-2 font-mono text-[9px] tracking-[0.25em] text-dune uppercase">— rama kanth · Google review</p>
          </Reveal>

          <Reveal delay={380} className="mt-6">
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.18em] text-dune/80 uppercase">
              18+ · designated lounge area · smoke responsibly — the kulcha still comes first
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= 06 — The Rush (popular times) ================= */

export function RushSection() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon = 0
  const [day, setDay] = useState(todayIdx);
  const [ref, inView] = useInView<HTMLDivElement>();
  const values = POPULAR_TIMES[day] ?? POPULAR_TIMES[0];
  const peakIdx = values.indexOf(Math.max(...values));

  return (
    <section id="rush" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 bottom-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(210,88,46,0.08),transparent_65%)]" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            no="06"
            kicker="The Rush"
            lines={[
              <span key="1">Plan around</span>,
              <span key="2">
                the <em className="font-light italic text-saffron">8 pm wave.</em>
              </span>,
            ]}
          />
          <Reveal className="max-w-xs pb-2">
            <p className="border-l border-saffron/40 pl-4 font-mono text-[11px] leading-relaxed tracking-wide text-dune">
              GOOGLE'S POPULAR-TIMES PATTERN, REBUILT. FRIDAYS & SATURDAYS PEAK HARDEST.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-wrap gap-2">
          {DAYS.map((d, i) => (
            <button
              key={d}
              onClick={() => setDay(i)}
              className={`rounded-full px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                day === i ? "bg-flame font-semibold text-cream shadow-[0_10px_30px_-10px_rgba(210,88,46,0.7)]" : "border border-cream/15 text-parch/70 hover:border-flame/60 hover:text-flame"
              }`}
            >
              {d}
              {i === todayIdx && <span className="ml-2 text-[8px] opacity-70">·today</span>}
            </button>
          ))}
        </Reveal>

        <div ref={ref} className="mt-10 rounded-2xl border border-cream/10 bg-coal/70 p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <p className="font-display text-xl font-bold text-cream">{DAYS[day]}day at the Hhouse</p>
            <p className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] text-dune uppercase">
              <span className="relative flex h-2 w-2">
                <span className="pin-ring absolute h-full w-full rounded-full bg-flame" />
                <span className="relative h-2 w-2 rounded-full bg-flame" />
              </span>
              peak · 8 pm
            </p>
          </div>

          <div className="mt-8 flex h-52 items-end gap-1.5 sm:gap-2.5">
            {values.map((v, i) => (
              <div key={i} className="group relative flex h-full flex-1 items-end">
                <div className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-cream/15 bg-char px-2.5 py-1.5 font-mono text-[9px] tracking-wide text-parch opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-[calc(100%+6px)] group-hover:opacity-100">
                  {HOUR_LABELS[i]} · {busyLabel(v)}
                </div>
                <div
                  className={`bar-grow w-full rounded-t-[4px] ${i === peakIdx ? "bg-gradient-to-t from-ember via-flame to-saffron" : "bg-gradient-to-t from-saffron/25 to-saffron/70"} transition-colors duration-300 group-hover:to-haldi`}
                  style={{ height: inView ? `${Math.max(v, 4)}%` : "4%", transitionDelay: `${i * 45}ms` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-1.5 sm:gap-2.5">
            {HOUR_LABELS.map((h, i) => (
              <span key={h} className={`flex-1 text-center font-mono text-[9px] ${i % 2 === 0 ? "text-dune" : "text-transparent"}`}>
                {h}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 border-t border-cream/8 pt-6 sm:grid-cols-3">
            {[
              ["8 pm", "Usually busy — up to 30 mins wait"],
              ["10 min – 1 hr", "typical time spent here, per Google"],
              ["11 am – 11:30 pm", "open daily · delivery from 11:30 am"],
            ].map(([big, small]) => (
              <div key={big} className="group rounded-lg border border-cream/10 p-4 transition-colors duration-300 hover:border-saffron/40">
                <p className="font-display text-lg font-bold text-saffron">{big}</p>
                <p className="mt-1 font-mono text-[10px] leading-relaxed tracking-[0.12em] text-dune uppercase">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
