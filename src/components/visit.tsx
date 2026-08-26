import { INFO, NEARBY, SERVICES } from "../data";
import { useOpenStatus } from "../hooks";
import { ArrowUpRight, PinIcon, PhoneIcon, Reveal, SectionHead, Stars } from "./chrome";

/* ================= nearby — straight from the map results ================= */

export function NearbySection() {
  return (
    <section id="nearby" className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.3em] text-dune uppercase">Around the maidan — if you must</p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-dune/70 uppercase">also within ~1.8 km of your search</p>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {NEARBY.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 120}>
              <div className="h-full rounded-xl border border-cream/10 bg-coal/60 p-6 transition-colors duration-300 hover:border-cream/25">
                <p className="font-display text-lg font-bold text-cream">{group.label}</p>
                <ul className="mt-4 divide-y divide-cream/8">
                  {group.places.map((p) => (
                    <li key={p.name} className="group flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-parch/85 transition-colors group-hover:text-saffron">{p.name}</p>
                        <p className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-dune">
                          <span className="flex items-center gap-1 text-parch/70">
                            {p.rating}
                            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-saffron" fill="currentColor" aria-hidden>
                              <path d="M12 2.4l2.9 6.1 6.7.7-5 4.5 1.4 6.6L12 17l-6 3.3 1.4-6.6-5-4.5 6.7-.7L12 2.4z" />
                            </svg>
                          </span>
                          ({p.reviews}) · {p.price}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-cream/12 px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] text-dune">{p.dist}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-8 text-center">
          <p className="font-display text-xl font-bold text-parch/80">
            No offence to any of them. But you already found <em className="italic text-saffron">the Hhouse.</em>
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
