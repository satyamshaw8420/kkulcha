import type { ReactNode } from "react";
import { FEATURES, INFO, SERVICES, TANDOOR_STEPS } from "../data";
import { Flame, Plate, Reveal, SectionHead, Smoke, VegMark } from "./chrome";

/* ================= 01 — The House (sticky two-column) ================= */

const STATS = [
  { big: "4.5★", small: "Google rating" },
  { big: "1,108", small: "reviews & counting" },
  { big: "₹200–1.2K", small: "for one, per 296 diners" },
  { big: "100%", small: "vegetarian kitchen" },
];

const SERVICE_ICONS: Record<string, ReactNode> = {
  "Dine-in": <Plate className="h-3.5 w-3.5" />,
  "Drive-through": (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M3 16c0-4 3-9 9-9s9 5 9 9" />
      <path d="M7 16h10M12 16v4" />
    </svg>
  ),
  "No-contact delivery": (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h11v11H4zM15 12h4l2 3v5h-6" />
      <circle cx="8" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
    </svg>
  ),
  Takeaway: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M6 8h12l-1.2 12H7.2L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  ),
  Delivery: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
};

export function HouseSection() {
  return (
    <section id="house" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.07),transparent_65%)]" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-12 lg:px-8">
        {/* sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              no="01"
              kicker="The House"
              lines={[
                <span key="1">A little kulcha house</span>,
                <span key="2">
                  that <em className="font-light italic text-saffron">Howrah</em>
                </span>,
                <span key="3">keeps coming back to.</span>,
              ]}
            />
            <Reveal delay={200} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10">
              {STATS.map((s) => (
                <div key={s.small} className="group bg-coal p-5 transition-colors duration-300 hover:bg-soot">
                  <p className="font-display text-2xl font-black text-cream transition-colors duration-300 group-hover:text-saffron sm:text-3xl">{s.big}</p>
                  <p className="mt-1.5 font-mono text-[9px] tracking-[0.22em] text-dune uppercase">{s.small}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* scrolling copy */}
        <div className="space-y-8 lg:col-span-7">
          <Reveal>
            <p className="text-lg leading-relaxed text-parch/85 sm:text-xl">
              Google's own verdict, straight from 1,108 reviews: diners come for the{" "}
              <span className="text-saffron">delicious, fresh pure-veg food — especially the kulchas</span> — and stay
              for the hookah, the cozy corners and a staff that's polite, cooperative and quick on its feet.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="leading-relaxed text-parch/65">
              The address is easy, the aroma is easier: ground floor of Ajmer Mansion on Dobson Road, Babudanga — a
              short walk from the Howrah Maidan Metro crowd and a world away from it. North Indian gravies simmer all
              day, the tandoor never really cools down, and the continental and Indo-Chinese corners of the menu mean
              nobody in the group gets to say “nothing for me”.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="leading-relaxed text-parch/65">
              It runs the full spectrum of how Howrah eats: dine-in under warm string lights, drive-through for the
              impatient, takeaway for the homesick, and no-contact delivery between{" "}
              <span className="font-mono text-sm text-parch/85">{INFO.delivery}</span>. All-you-can-eat options, a
              kids' menu, and — per 296 diners — a bill that lands somewhere between ₹200 and ₹1,200 a head.
            </p>
          </Reveal>

          <Reveal delay={180} className="flex flex-wrap gap-2.5 pt-2">
            {SERVICES.map((s) => (
              <span key={s} className="flex items-center gap-2 rounded-full border border-cream/12 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-parch/75 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/50 hover:text-saffron">
                {SERVICE_ICONS[s]}
                {s}
              </span>
            ))}
            {FEATURES.map((f) => (
              <span key={f} className="flex items-center gap-2 rounded-full border border-sage/30 bg-sage/5 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-sage uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/60">
                {f.includes("Veg") ? <VegMark className="h-3.5 w-3.5" /> : f.includes("Hookah") ? <Smoke className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
                {f}
              </span>
            ))}
          </Reveal>

          {/* field notes */}
          <div className="grid gap-5 pt-4 sm:grid-cols-2">
            <Reveal delay={100}>
              <div className="relative h-full rotate-[-1deg] rounded-lg border border-dashed border-cream/25 bg-coal p-6 transition-transform duration-500 hover:rotate-0">
                <p className="absolute -top-2.5 left-5 bg-char px-2 font-mono text-[9px] tracking-[0.3em] text-saffron uppercase">Field note</p>
                <p className="font-display text-xl font-bold text-cream">Usually busy by 8 pm.</p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-dune">Up to a 30-minute wait when the wave hits. Book, or arrive hungry and early.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative h-full rotate-[1.2deg] rounded-lg border border-dashed border-cream/25 bg-coal p-6 transition-transform duration-500 hover:rotate-0">
                <p className="absolute -top-2.5 left-5 bg-char px-2 font-mono text-[9px] tracking-[0.3em] text-saffron uppercase">Field note</p>
                <p className="font-display text-xl font-bold text-cream">People spend 10 min – 1 hr here.</p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-dune">Google's math. Regulars' math is closer to “until the last kulcha arrives”.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= 02 — The Fire (stacked pinned cards) ================= */

export function TandoorSection() {
  return (
    <section id="tandoor" className="relative bg-char py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            no="02"
            kicker="The Fire"
            lines={[
              <span key="1">Four things happen</span>,
              <span key="2">
                between dough & <em className="font-light italic text-saffron">devotion.</em>
              </span>,
            ]}
          />
          <Reveal className="max-w-xs pb-2">
            <p className="border-l border-saffron/40 pl-4 font-mono text-[11px] leading-relaxed tracking-wide text-dune">
              THE TANDOOR NEVER REALLY SLEEPS. SCROLL — EACH CARD IS A STAGE OF THE KULCHA'S NINETY-SECOND LIFE.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {TANDOOR_STEPS.map((step, i) => (
            <article
              key={step.no}
              className="sticky mb-10 overflow-hidden rounded-[22px] border border-cream/10 bg-coal shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)]"
              style={{ top: `${104 + i * 26}px`, zIndex: i + 1 }}
            >
              <div className="grid md:grid-cols-2">
                <div className={`relative flex flex-col justify-center p-8 sm:p-12 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <span className="pointer-events-none absolute right-6 top-2 select-none font-display text-[110px] font-black leading-none text-cream/[0.05]" aria-hidden>
                    {step.no}
                  </span>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-flame uppercase">Stage {step.no} / 04</p>
                  <h3 className="mt-4 font-display text-3xl font-black text-cream sm:text-4xl">{step.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-parch/70">{step.body}</p>
                  <div className="mt-8 flex items-center gap-2">
                    {[0, 1, 2, 3].map((d) => (
                      <span key={d} className={`h-1 w-8 rounded-full ${d === i ? "bg-saffron" : "bg-cream/10"}`} />
                    ))}
                  </div>
                </div>
                <div className="kenburns relative min-h-[240px] md:min-h-[340px]">
                  {step.img ? (
                    <img src={step.img} alt={step.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="dot-grid absolute inset-0 flex items-center justify-center bg-soot">
                      <Flame className="h-16 w-16 text-flame/60" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/50 to-transparent" aria-hidden />
                </div>
              </div>
            </article>
          ))}

          {/* closing quote card */}
          <article
            className="sticky overflow-hidden rounded-[22px] border border-flame/40 bg-gradient-to-br from-flame to-ember p-8 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)] sm:p-14"
            style={{ top: `${104 + 4 * 26}px`, zIndex: 6 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] text-cream/60 uppercase">House rule №1</p>
            <blockquote className="mt-6 max-w-3xl font-display text-3xl font-black leading-tight text-cream sm:text-5xl">
              “Kulcha isn't bread.
              <br />
              It's a <em className="font-light italic text-haldi">small event.</em>”
            </blockquote>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-cream/60 uppercase">— every regular at the Hhouse, probably</p>
          </article>
        </div>
      </div>
    </section>
  );
}
