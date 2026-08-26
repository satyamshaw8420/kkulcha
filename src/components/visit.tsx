import { DISHES, INFO, SERVICES } from "../data";
import { useOpenStatus } from "../hooks";
import { ArrowUpRight, Flame, PinIcon, PhoneIcon, Plate, Reveal, SectionHead, Smoke, Spark, Stars } from "./chrome";

/* ================= the shortcut — one address, three cravings ================= */
/* Google's map showed 3 category filters near this search. The Hhouse covers all three —
   so we answer them here instead of sending anyone anywhere else. */

const SMALL_PLATES = DISHES.filter((d) => d.cat === "starters" || d.cat === "fusion").slice(0, 6);

const GROUP_PROOF = [
  { icon: <Plate className="h-4 w-4" />, k: "All you can eat", v: "options on request" },
  { icon: <Spark className="h-4 w-4" />, k: "Kids' menu", v: "little kulcha fans welcome" },
  { icon: <Smoke className="h-4 w-4" />, k: "₹900 table combo", v: "hookah + drink + snacks" },
  { icon: <Stars value={4.5} size={11} />, k: "1,108 reviews", v: "mostly tables of friends" },
];

export function NearbySection() {
  return (
    <section id="shortcut" className="relative py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-16 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.07),transparent_65%)]" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.3em] text-dune uppercase">Around the maidan — no detours needed</p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-dune/70 uppercase">your search had 3 filters · one address answers all</p>
        </Reveal>

        <SectionHead
          no="✳"
          kicker="The Shortcut"
          lines={[
            <span key="1">Google gave you three</span>,
            <span key="2">
              categories. <em className="font-light italic text-saffron">Ek hi address.</em>
            </span>,
          ]}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* small plates — wide card */}
          <Reveal className="lg:col-span-3">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-cream/10 bg-coal/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-saffron/45 hover:shadow-[0_24px_60px_-24px_rgba(232,163,61,0.3)] sm:p-9">
              <span className="absolute right-6 top-6 font-mono text-[9px] tracking-[0.28em] text-dune uppercase">google filter ①</span>
              <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-flame uppercase">
                <Flame className="h-3.5 w-3.5" /> “Small plates”
              </p>
              <h3 className="mt-3 font-display text-2xl font-black text-cream sm:text-3xl">Choti plates? Poora tandoor.</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-parch/65">
                Starters aur street-style small plates ka poora lineup — tandoor se seedha, aadha bhi order karo, poora bhi.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {SMALL_PLATES.map((d) => (
                  <a
                    key={d.id}
                    href={`#dish-${d.id}`}
                    className="flex items-center gap-2 rounded-full border border-cream/12 bg-char/60 px-4 py-2 font-mono text-[10px] tracking-[0.12em] text-parch/80 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-saffron/60 hover:text-saffron"
                  >
                    {d.name}
                    <span className="text-saffron/80">₹{d.price}</span>
                  </a>
                ))}
              </div>
              <a href="#menu" className="group/link mt-7 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-saffron uppercase transition-colors hover:text-haldi">
                Full starters & fusion menu <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>

          {/* group-friendly + drive-thru — stacked */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Reveal delay={120} className="flex-1">
              <div className="group h-full rounded-2xl border border-cream/10 bg-gradient-to-br from-soot to-coal p-7 transition-all duration-500 hover:-translate-y-1 hover:border-saffron/45">
                <span className="font-mono text-[9px] tracking-[0.28em] text-dune uppercase">google filter ②</span>
                <p className="mt-3 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-flame uppercase">
                  <Plate className="h-3.5 w-3.5" /> “Group-friendly”
                </p>
                <h3 className="mt-3 font-display text-xl font-black text-cream">Jitne log, utna makkhan.</h3>
                <ul className="mt-5 space-y-3">
                  {GROUP_PROOF.map((g) => (
                    <li key={g.k} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-saffron/30 text-saffron">{g.icon}</span>
                      <span className="text-sm">
                        <span className="font-bold text-parch/90">{g.k}</span>
                        <span className="ml-2 font-mono text-[10px] tracking-wide text-dune">{g.v}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="group rounded-2xl border border-cream/10 bg-coal/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-saffron/45">
                <span className="font-mono text-[9px] tracking-[0.28em] text-dune uppercase">google filter ③</span>
                <p className="mt-3 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-flame uppercase">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                    <path d="M3 16c0-4 3-9 9-9s9 5 9 9" />
                    <path d="M7 16h10M12 16v4" />
                  </svg>
                  “Drive-thru option”
                </p>
                <h3 className="mt-3 font-display text-xl font-black text-cream">Gaadi se bhi, ghar tak bhi.</h3>
                <p className="mt-3 text-sm leading-relaxed text-parch/65">
                  Drive-through, takeaway aur no-contact delivery — <span className="font-mono text-xs text-parch/85">{INFO.delivery}</span>. Kulcha garam pahunchta hai; promise.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <p className="font-display text-xl font-bold text-parch/80">
            Search mein aur bhi naam aaye the. <em className="italic text-saffron">Makkhan sirf yahan milta hai.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= hand-drawn SVG map ================= */

function MapCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream/12 bg-coal shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
      <svg viewBox="0 0 520 560" className="w-full" role="img" aria-label="Stylised map showing The Kkulcha Hhouse Cafe at 28/3 Dobson Road, Howrah">
        <rect width="520" height="560" fill="#1c140d" />
        {/* river */}
        <rect x="0" y="0" width="86" height="560" fill="#16262b" />
        <path d="M20 20c14 30-14 60 0 90s-14 60 0 90-14 60 0 90-14 60 0 90-14 60 0 90" stroke="#24404a" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
        <path d="M56 10c14 30-14 60 0 90s-14 60 0 90-14 60 0 90-14 60 0 90-14 60 0 90 14 55 0 85" stroke="#24404a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.45" />
        <text x="40" y="290" fill="#4a6b76" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="4" transform="rotate(-90 40 290)">HOOGHLY RIVER</text>

        {/* roads */}
        <path d="M300 0V560" stroke="#3a2b1b" strokeWidth="30" />
        <path d="M300 0V560" stroke="#54402a" strokeWidth="1.5" strokeDasharray="10 12" opacity="0.6" />
        <path d="M86 262H520" stroke="#3a2b1b" strokeWidth="22" />
        <path d="M86 262H520" stroke="#54402a" strokeWidth="1.2" strokeDasharray="8 10" opacity="0.6" />
        <path d="M180 262V560" stroke="#2f2317" strokeWidth="12" />
        <path d="M86 420H520" stroke="#2f2317" strokeWidth="12" />
        <path d="M420 0V262" stroke="#2f2317" strokeWidth="10" />

        {/* road labels */}
        <text x="313" y="150" fill="#a08b6c" fontSize="12" fontFamily="IBM Plex Mono, monospace" letterSpacing="3" transform="rotate(90 313 150)">GRAND TRUNK RD</text>
        <text x="342" y="254" fill="#d8c6a8" fontSize="13" fontFamily="IBM Plex Mono, monospace" letterSpacing="4">DOBSON ROAD</text>
        <text x="118" y="412" fill="#7a6850" fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="2">FORESHORE RD →</text>

        {/* metro */}
        <circle cx="300" cy="470" r="16" fill="#17110c" stroke="#e8a33d" strokeWidth="2" />
        <text x="300" y="475.5" textAnchor="middle" fill="#e8a33d" fontSize="15" fontWeight="700" fontFamily="IBM Plex Mono, monospace">M</text>
        <text x="326" y="475" fill="#a08b6c" fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="1.5">HOWRAH MAIDAN METRO</text>

        {/* ajmer mansion block */}
        <rect x="330" y="196" width="86" height="52" rx="6" fill="#2b2015" stroke="#e8a33d" strokeWidth="1.2" strokeOpacity="0.5" />
        <text x="373" y="218" textAnchor="middle" fill="#d8c6a8" fontSize="9" fontFamily="IBM Plex Mono, monospace" letterSpacing="1.5">AJMER</text>
        <text x="373" y="232" textAnchor="middle" fill="#d8c6a8" fontSize="9" fontFamily="IBM Plex Mono, monospace" letterSpacing="1.5">MANSION</text>

        {/* the pin */}
        <circle cx="373" cy="262" r="30" fill="none" stroke="#d2582e" strokeWidth="2" className="pin-ring" style={{ transformOrigin: "373px 262px" }} />
        <circle cx="373" cy="262" r="13" fill="#d2582e" />
        <path d="M373 246c-6 0-10 4.5-10 10 0 7 10 17 10 17s10-10 10-17c0-5.5-4-10-10-10Z" fill="#f2e7d3" />
        <circle cx="373" cy="256" r="3.4" fill="#d2582e" />

        {/* label card */}
        <g>
          <rect x="150" y="64" width="238" height="66" rx="10" fill="#17110c" stroke="#e8a33d" strokeOpacity="0.55" strokeWidth="1.2" />
          <text x="168" y="90" fill="#f2e7d3" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" letterSpacing="1">THE KKULCHA HHOUSE CAFE</text>
          <text x="168" y="112" fill="#a08b6c" fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="1.5">28/3 DOBSON RD · GROUND FLOOR</text>
          <path d="M300 130 L340 200" stroke="#e8a33d" strokeWidth="1.2" strokeDasharray="4 5" opacity="0.7" />
        </g>

        {/* compass + scale */}
        <g transform="translate(466,52)">
          <circle r="20" fill="none" stroke="#a08b6c" strokeWidth="1" opacity="0.5" />
          <path d="M0 -13 L4 4 L0 0 L-4 4 Z" fill="#e8a33d" />
          <text y="-26" textAnchor="middle" fill="#d8c6a8" fontSize="11" fontFamily="IBM Plex Mono, monospace">N</text>
        </g>
        <g transform="translate(120,524)">
          <path d="M0 0H80" stroke="#a08b6c" strokeWidth="2" />
          <path d="M0 -4V4M80 -4V4" stroke="#a08b6c" strokeWidth="2" />
          <text x="40" y="-8" textAnchor="middle" fill="#a08b6c" fontSize="10" fontFamily="IBM Plex Mono, monospace" letterSpacing="2">200 M</text>
        </g>
      </svg>
      <div className="flex items-center justify-between border-t border-cream/10 px-5 py-3.5">
        <p className="font-mono text-[9px] tracking-[0.25em] text-dune uppercase">Stylised — trust the aroma, not the scale</p>
        <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-saffron uppercase hover:text-haldi">
          Open in Maps <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}

/* ================= 07 — Visit ================= */

export function VisitSection() {
  const status = useOpenStatus();
  return (
    <section id="visit" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,163,61,0.06),transparent_65%)]" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <SectionHead
            no="07"
            kicker="Visit"
            lines={[
              <span key="1">Ground floor, Ajmer</span>,
              <span key="2">
                Mansion — <em className="font-light italic text-saffron">follow the makkhan.</em>
              </span>,
            ]}
          />

          <div className="mt-12 space-y-7">
            <Reveal className="flex gap-5">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-saffron/40 text-saffron">
                <PinIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-dune uppercase">Address</p>
                <address className="mt-2 text-parch/85 not-italic leading-relaxed">
                  {INFO.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </address>
                <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="group mt-3 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-saffron uppercase hover:text-haldi">
                  Get directions <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={80} className="flex gap-5">
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-saffron/40 text-saffron">
                <PhoneIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-dune uppercase">Reservations</p>
                <a href={INFO.phoneHref} className="mt-2 block font-display text-2xl font-black text-cream transition-colors hover:text-saffron">{INFO.phoneDisplay}</a>
                <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-dune uppercase">Call ahead on weekends — the 8 pm wave is real</p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-xl border border-cream/10 bg-coal/70 p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-dune uppercase">Hours</p>
                  <span className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase ${status.open ? "text-sage" : "text-flame"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${status.open ? "bg-sage" : "bg-flame"}`} />
                    {status.short}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {["Monday – Sunday", "Delivery window"].map((row, i) => (
                    <div key={row} className="flex items-center justify-between border-b border-dashed border-cream/10 pb-2 text-sm">
                      <span className="text-parch/75">{row}</span>
                      <span className="font-mono text-xs text-cream">{i === 0 ? INFO.hours : INFO.delivery}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-1 text-sm">
                    <span className="text-parch/75">For one (296 reports)</span>
                    <span className="font-mono text-xs text-cream">₹200 – ₹1,200</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream/8">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-sage via-saffron to-flame opacity-80" />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <span key={s} className="rounded-full border border-cream/12 px-3 py-1 font-mono text-[9px] tracking-[0.15em] text-parch/70 uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200} className="flex flex-wrap gap-3.5 pt-1">
              <a href={INFO.phoneHref} className="rounded-full bg-saffron px-7 py-3.5 font-mono text-[11px] font-semibold tracking-[0.18em] text-char uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-haldi hover:shadow-[0_10px_30px_-10px_rgba(232,163,61,0.6)]">
                Call to reserve
              </a>
              <a href={INFO.mapsUrl} target="_blank" rel="noreferrer" className="rounded-full border border-cream/20 px-7 py-3.5 font-mono text-[11px] tracking-[0.18em] text-cream uppercase transition-all duration-300 hover:border-saffron/60 hover:text-saffron">
                Directions
              </a>
              <a href={INFO.siteUrl} target="_blank" rel="noreferrer" className="rounded-full border border-cream/20 px-7 py-3.5 font-mono text-[11px] tracking-[0.18em] text-cream uppercase transition-all duration-300 hover:border-saffron/60 hover:text-saffron">
                Official site
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={150} className="lg:sticky lg:top-28">
            <MapCard />
            <div className="mt-5 grid grid-cols-3 gap-4">
              {[
                { v: <Stars value={4.5} size={11} />, l: "4.5 · 1,108 reviews" },
                { v: <span className="font-display text-xl font-black text-saffron">1.6 km</span>, l: "from your search" },
                { v: <span className="font-display text-xl font-black text-saffron">100%</span>, l: "pure vegetarian" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-cream/10 bg-coal/60 p-4 text-center transition-colors duration-300 hover:border-saffron/40">
                  <div className="flex justify-center">{typeof s.v === "string" ? s.v : s.v}</div>
                  <p className="mt-2 font-mono text-[8px] tracking-[0.2em] text-dune uppercase">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
