import React, { useState, useMemo, useEffect } from "react";
import { COMPLETE_MENU, type MenuCategory, type MenuItem } from "../menuData";
import { Flame, Spark, VegMark, Plate } from "./chrome";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullMenuModal({ isOpen, onClose }: FullMenuModalProps) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearch("");
      setSelectedCat("all");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPLETE_MENU.map((cat) => {
      if (selectedCat !== "all" && cat.id !== selectedCat) {
        return null;
      }
      if (!q) {
        return cat;
      }
      const matchingItems = cat.items.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
      if (matchingItems.length === 0 && !cat.title.toLowerCase().includes(q)) {
        return null;
      }
      return {
        ...cat,
        items: matchingItems.length > 0 ? matchingItems : cat.items,
      };
    }).filter(Boolean) as MenuCategory[];
  }, [selectedCat, search]);

  const totalItemsCount = useMemo(() => {
    return COMPLETE_MENU.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-char/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container */}
      <div className="relative flex flex-col h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-saffron/30 bg-gradient-to-b from-[#22170f] via-[#1a1109] to-[#120a05] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(232,163,61,0.15)] text-cream z-10 animate-fade-up">
        {/* Glow ambients */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-saffron/15 blur-[100px]" />

        {/* Modal Header */}
        <div className="relative shrink-0 border-b border-cream/10 bg-char/80 px-6 py-5 sm:px-8 backdrop-blur-md z-20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron/10 border border-saffron/30 text-saffron">
                <Plate className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-cream">
                    Complete Food & Lounge Menu
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-saffron/30 bg-saffron/10 px-2.5 py-0.5 font-mono text-[9px] text-saffron uppercase font-bold">
                    {totalItemsCount}+ Items
                  </span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-dune uppercase mt-0.5">
                  THE KKULCHA HHOUSE CAFE · DOBSON ROAD, HOWRAH · 100% PURE VEG
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 bg-coal text-parch/80 transition-all hover:border-saffron hover:text-saffron hover:bg-saffron/10 hover:scale-105 cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search any dish, kulcha, paneer, pasta, shakes, hookah..."
                className="w-full rounded-2xl border border-cream/15 bg-char/90 px-4 py-2.5 pl-10 text-sm text-cream placeholder:text-parch/40 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
              />
              <svg
                className="absolute left-3.5 top-3 h-4 w-4 text-parch/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-2.5 text-xs text-parch/50 hover:text-cream"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-dune uppercase bg-coal/70 border border-cream/10 px-3 py-2 rounded-xl">
              <VegMark className="h-3.5 w-3.5" />
              <span>Pure Veg Kitchen</span>
            </div>
          </div>

          {/* Category Horizontal Quick-Filter Bar */}
          <div className="mt-3.5 -mx-6 sm:-mx-8 px-6 sm:px-8 flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => setSelectedCat("all")}
              className={`shrink-0 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                selectedCat === "all"
                  ? "bg-saffron font-bold text-char shadow-[0_0_15px_rgba(232,163,61,0.5)]"
                  : "border border-cream/15 bg-coal/60 text-parch/70 hover:border-saffron/40 hover:text-cream"
              }`}
            >
              All Categories ({COMPLETE_MENU.length})
            </button>
            {COMPLETE_MENU.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-saffron font-bold text-char shadow-[0_0_15px_rgba(232,163,61,0.5)]"
                    : "border border-cream/15 bg-coal/60 text-parch/70 hover:border-saffron/40 hover:text-cream"
                }`}
              >
                {cat.title} ({cat.items.length})
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-2xl mb-4">
                🔍
              </div>
              <h3 className="font-display text-xl font-bold text-cream">
                No items found for "{search}"
              </h3>
              <p className="mt-2 text-sm text-parch/60 max-w-sm">
                Try searching for something else like "Kulcha", "Paneer", "Soup", "Brownie" or reset category filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCat("all");
                }}
                className="mt-5 rounded-full bg-saffron/20 border border-saffron px-6 py-2 font-mono text-xs text-saffron uppercase hover:bg-saffron hover:text-char"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-cream/10 pb-2.5 sticky top-0 bg-[#1b1209]/95 backdrop-blur-md z-10 py-1">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-saffron" />
                    <h3 className="font-display text-lg sm:text-xl font-black text-cream">
                      {cat.title}
                    </h3>
                    {cat.hindiTitle && (
                      <span className="font-mono text-xs text-dune">
                        ({cat.hindiTitle})
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider text-saffron bg-saffron/10 border border-saffron/20 px-2.5 py-0.5 rounded-full uppercase">
                    {cat.items.length} {cat.items.length === 1 ? "Item" : "Items"}
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative flex items-center justify-between rounded-2xl border border-cream/10 bg-coal/60 p-4 transition-all duration-300 hover:border-saffron/45 hover:bg-coal/90 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex items-start gap-3 flex-1 pr-3">
                        <div className="mt-1">
                          <VegMark className="h-3.5 w-3.5 shrink-0" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-display text-sm font-bold text-cream group-hover:text-saffron transition-colors">
                              {item.name}
                            </h4>
                            {item.isChefSpecial && (
                              <span className="rounded bg-saffron/20 border border-saffron/40 px-1.5 py-0.2 font-mono text-[8px] text-saffron uppercase font-bold">
                                Special
                              </span>
                            )}
                            {item.isPopular && (
                              <span className="rounded bg-haldi/20 border border-haldi/40 px-1.5 py-0.2 font-mono text-[8px] text-haldi uppercase font-bold">
                                Popular
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="rounded bg-flame/20 border border-flame/40 px-1.5 py-0.2 font-mono text-[8px] text-flame uppercase font-bold">
                                Spicy
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className="mt-1 text-xs text-parch/60 leading-snug">
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="font-mono text-sm font-bold text-haldi bg-char/90 border border-cream/10 px-2.5 py-1 rounded-lg">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Bottom Sticky Footer */}
        <div className="relative shrink-0 border-t border-cream/10 bg-char/90 px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="font-mono text-[10px] tracking-wider text-dune uppercase text-center sm:text-left">
            Prices inclusive of taxes · Handcrafted fresh daily in clay tandoor
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-parch/80">
              Dobson Road, Howrah
            </span>
            <button
              onClick={onClose}
              className="rounded-full bg-saffron px-6 py-2 font-mono text-xs font-bold text-char uppercase transition-all hover:bg-haldi hover:shadow-[0_0_20px_rgba(232,163,61,0.4)] cursor-pointer"
            >
              Close Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
