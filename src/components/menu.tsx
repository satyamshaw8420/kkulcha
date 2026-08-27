import { useMemo, useState } from "react";
import { CATS, DISHES, INFO, type CatId, type Dish } from "../data";
import { ArrowUpRight, Reveal, SectionHead, Spark, Stars, VegMark, Plate } from "./chrome";
import { FullMenuModal } from "./FullMenuModal";

/* ---------- monogram tile for dishes without a photo ---------- */

function MonogramTile({ dish }: { dish: Dish }) {
  return (
    <div className="dot-grid relative flex h-44 items-center justify-center overflow-hidden bg-soot">
      <span className="select-none font-display text-4xl font-black text-saffron/75 transition-transform duration-500 group-hover:scale-110" aria-hidden>
        {dish.hindi}
      </span>
      <svg viewBox="0 0 24 24" className="absolute right-3 top-3 h-5 w-5 text-cream/20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
        <path d="M8 20c2.5-1.4 2.5-3.6 0-5s-2.5-3.6 0-5M15 20c2.5-1.4 2.5-3.6 0-5s-2.5-3.6 0-5" />
      </svg>
      <span className="absolute bottom-2 left-3 font-mono text-[8px] tracking-[0.3em] text-dune/70 uppercase">from the tandoor</span>
    </div>
  );
}

/* ---------- dish card ---------- */

function DishCard({ dish, i }: { dish: Dish; i: number }) {
  return (
    <article
      className="group animate-fade-up overflow-hidden rounded-xl border border-cream/10 bg-coal/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-saffron/45 hover:shadow-[0_24px_50px_-20px_rgba(210,88,46,0.35)]"
      style={{ animationDelay: `${Math.min(i * 55, 440)}ms` }}
    >
      <div className="relative overflow-hidden">
        {dish.img ? (
          <img src={dish.img} alt={dish.name} className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" />
        ) : (
          <MonogramTile dish={dish} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-char/60 via-transparent to-transparent" aria-hidden />
        {dish.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-saffron px-3 py-1 font-mono text-[9px] font-semibold tracking-[0.18em] text-char uppercase">
            {dish.tag}
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded-md border border-cream/20 bg-char/80 px-2.5 py-1 font-mono text-xs font-semibold text-haldi backdrop-blur-sm">
          ₹{dish.price}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-snug text-cream transition-colors duration-300 group-hover:text-saffron">{dish.name}</h3>
          <VegMark className="mt-1 h-3.5 w-3.5 shrink-0" />
        </div>
        <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-dune">{dish.hindi}</p>
        <p className="mt-3 text-sm leading-relaxed text-parch/65">{dish.desc}</p>
      </div>
    </article>
  );
}

/* ---------- menu section ---------- */

type Tab = "all" | CatId;

export default function MenuSection() {
  const [tab, setTab] = useState<Tab>("all");
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  const filtered = useMemo(() => (tab === "all" ? DISHES : DISHES.filter((d) => d.cat === tab)), [tab]);
  const highlights = useMemo(() => DISHES.filter((d) => d.img), []);
  const countFor = (t: Tab) => (t === "all" ? DISHES.length : DISHES.filter((d) => d.cat === t).length);

  return (
    <section id="menu" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-24 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(210,88,46,0.08),transparent_65%)]" aria-hidden />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            no="03"
            kicker="The Menu"
            lines={[
              <span key="1">Twenty-one reasons</span>,
              <span key="2">
                to close the map & <em className="font-light italic text-saffron">just walk in.</em>
              </span>,
            ]}
          />
          <div className="flex flex-col items-start sm:items-end gap-3">
            <Reveal className="max-w-xs pb-2">
              <p className="border-l border-saffron/40 pl-4 font-mono text-[11px] leading-relaxed tracking-wide text-dune">
                HIGHLIGHTS AS SPOTTED ON THE GOOGLE LISTING. OVER 150+ DISHES CRAFTED IN HOUSE.
              </p>
            </Reveal>
            <button
              type="button"
              onClick={() => setIsFullMenuOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-saffron/60 bg-saffron/10 px-5 py-2.5 font-mono text-[11px] font-bold tracking-wider text-saffron uppercase transition-all duration-300 hover:bg-saffron hover:text-char hover:shadow-[0_0_20px_rgba(232,163,61,0.4)] cursor-pointer"
            >
              <Plate className="h-3.5 w-3.5" />
              <span>Explore Complete Menu (168 Items)</span>
            </button>
          </div>
        </div>

        {/* google highlights rail */}
        <Reveal className="mt-14">
          <div className="mb-4 flex items-center justify-between">
            <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-saffron uppercase">
              <Spark className="h-3 w-3" /> The Google highlights
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-dune uppercase">drag / scroll →</p>
          </div>
          <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 lg:-mx-8 lg:px-8" style={{ scrollbarWidth: "thin" }}>
            {highlights.map((d) => (
              <a
                key={d.id}
                href={`#dish-${d.id}`}
                className="group w-64 shrink-0 snap-start overflow-hidden rounded-xl border border-cream/10 bg-coal transition-colors duration-300 hover:border-saffron/50 sm:w-72"
              >
                <div className="kenburns h-44">
                  <img src={d.img} alt={d.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-display text-sm font-bold text-cream group-hover:text-saffron">{d.name}</p>
                    <p className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-dune uppercase">{d.tag ?? "Menu highlight"}</p>
                  </div>
                  <span className="font-mono text-sm font-semibold text-haldi">₹{d.price}</span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        {/* tabs */}
        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2.5">
            {([{ id: "all" as Tab, label: "Featured", hindi: "सब" }, ...CATS] as { id: Tab; label: string; hindi: string }[]).map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.id)}
                className={`group relative rounded-full px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer ${
                  tab === c.id
                    ? "bg-saffron font-semibold text-char shadow-[0_10px_30px_-10px_rgba(232,163,61,0.6)]"
                    : "border border-cream/15 text-parch/75 hover:border-saffron/50 hover:text-saffron"
                }`}
              >
                {c.label}
                <span className={`ml-2 text-[9px] ${tab === c.id ? "text-char/60" : "text-dune"}`}>{countFor(c.id)}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsFullMenuOpen(true)}
            className="font-mono text-[11px] tracking-wider text-saffron uppercase hover:text-haldi underline underline-offset-4 cursor-pointer"
          >
            Browse all 23 categories →
          </button>
        </Reveal>

        {/* grid */}
        <div key={tab} className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((d, i) => (
            <div key={d.id} id={`dish-${d.id}`}>
              <DishCard dish={d} i={i} />
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <Reveal className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-saffron/30 bg-gradient-to-r from-coal via-soot to-coal px-8 py-8 sm:flex-row shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center gap-3">
              <Stars value={4.5} size={14} />
              <p className="font-display text-lg font-bold text-cream">168 Authentic Pure-Veg Delicacies & Lounge Specials</p>
            </div>
            <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-dune uppercase">Full multi-cuisine menu · Soups · Tandoor · Mains · Pasta · Desserts · Hookah</p>
          </div>
          <button
            type="button"
            onClick={() => setIsFullMenuOpen(true)}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-saffron px-8 py-4 font-mono text-xs font-bold tracking-[0.18em] text-char uppercase transition-all duration-300 hover:bg-haldi hover:shadow-[0_0_35px_rgba(232,163,61,0.6)] hover:scale-105 cursor-pointer"
          >
            <span>Full Menu</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-char/20 text-char text-xs transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </Reveal>
      </div>

      {/* Complete Full Menu Interactive Modal */}
      <FullMenuModal
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
      />
    </section>
  );
}

