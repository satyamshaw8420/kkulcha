import React, { useState, useMemo, useEffect, useRef } from "react";
import { COMPLETE_MENU, type MenuCategory, type MenuItem } from "../menuData";
import { Flame, Spark, VegMark, Plate } from "./chrome";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullMenuModal({ isOpen, onClose }: FullMenuModalProps) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(checkScroll, 100);
    } else {
      document.body.style.overflow = "unset";
      setSearch("");
      setSelectedCat("all");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    checkScroll();
  }, [selectedCat]);

  const handleScroll = (dir: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = dir === "left" ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 350);
    }
  };

  const handleCatClick = (catId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedCat(catId);
    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPLETE_MENU.map((cat) => {
      if (selectedCat !== "all" && cat.id !== selectedCat) {
        return null;
      }
      if (!q) {
        return cat;
      }
      // Split search query into individual words for flexible matching
      // If ANY word from the query matches any part of item name, it's a match
      const searchWords = q.split(/\s+/).filter((w) => w.length > 0);
      const matchingItems = cat.items.filter((item) => {
        const itemName = item.name.toLowerCase();
        const itemDesc = (item.desc || "").toLowerCase();
        return searchWords.some(
          (word) => itemName.includes(word) || itemDesc.includes(word)
        );
      });
      const catTitleLower = cat.title.toLowerCase();
      const catHindiLower = (cat.hindiTitle || "").toLowerCase();
      const catMatches = searchWords.some(
        (word) => catTitleLower.includes(word) || catHindiLower.includes(word)
      );
      if (matchingItems.length === 0 && !catMatches) {
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
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-[#0c0805]/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Container - Solid Dark Frame */}
      <div className="relative flex flex-col h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-saffron/30 bg-[#160e07] shadow-[0_25px_80px_rgba(0,0,0,0.98),0_0_50px_rgba(232,163,61,0.12)] text-cream z-10 animate-fade-up">
        
        {/* Modal Header - 100% Solid & Opaque to prevent any background floating/bleeding */}
        <div className="relative shrink-0 border-b border-cream/10 bg-[#1f140b] px-6 py-5 sm:px-8 z-30 shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
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
                className="w-full rounded-2xl border border-cream/15 bg-[#140c06] px-4 py-2.5 pl-10 text-sm text-cream placeholder:text-parch/40 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
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
                  className="absolute right-3 top-2.5 text-xs text-parch/50 hover:text-cream cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-dune uppercase bg-[#140c06] border border-cream/10 px-3 py-2 rounded-xl">
              <VegMark className="h-3.5 w-3.5" />
              <span>Pure Veg Kitchen</span>
            </div>
          </div>

          {/* Category Horizontal Slider Bar with Prev/Next Navigation Controls */}
          <div className="relative mt-3.5 flex items-center">
            {/* Left Scroll Button */}
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-0 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-saffron/40 bg-[#1f140b]/95 text-saffron shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer ${
                canScrollLeft
                  ? "opacity-100 hover:bg-saffron hover:text-char hover:scale-110 shadow-[0_0_12px_rgba(232,163,61,0.4)]"
                  : "opacity-20 cursor-not-allowed border-cream/10 text-cream/20"
              }`}
              aria-label="Scroll categories left"
            >
              ‹
            </button>

            {/* Slider Track */}
            <div
              ref={sliderRef}
              onScroll={checkScroll}
              className="flex items-center gap-2 overflow-x-auto px-9 py-1.5 scroll-smooth select-none w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <button
                onClick={(e) => handleCatClick("all", e)}
                className={`shrink-0 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  selectedCat === "all"
                    ? "bg-saffron font-bold text-char shadow-[0_0_15px_rgba(232,163,61,0.6)] scale-105"
                    : "border border-cream/15 bg-[#140c06] text-parch/70 hover:border-saffron/50 hover:text-cream"
                }`}
              >
                All Categories ({COMPLETE_MENU.length})
              </button>
              {COMPLETE_MENU.map((cat) => (
                <button
                  key={cat.id}
                  onClick={(e) => handleCatClick(cat.id, e)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 font-mono text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    selectedCat === cat.id
                      ? "bg-saffron font-bold text-char shadow-[0_0_15px_rgba(232,163,61,0.6)] scale-105"
                      : "border border-cream/15 bg-[#140c06] text-parch/70 hover:border-saffron/50 hover:text-cream"
                  }`}
                >
                  {cat.title} ({cat.items.length})
                </button>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-0 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-saffron/40 bg-[#1f140b]/95 text-saffron shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer ${
                canScrollRight
                  ? "opacity-100 hover:bg-saffron hover:text-char hover:scale-110 shadow-[0_0_12px_rgba(232,163,61,0.4)]"
                  : "opacity-20 cursor-not-allowed border-cream/10 text-cream/20"
              }`}
              aria-label="Scroll categories right"
            >
              ›
            </button>
          </div>
        </div>

        {/* Scrollable Body - Solid Dark Background */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-8 bg-[#160e07]">
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
                className="mt-5 rounded-full bg-saffron/20 border border-saffron px-6 py-2 font-mono text-xs text-saffron uppercase hover:bg-saffron hover:text-char cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between border-b border-cream/10 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-saffron shadow-[0_0_8px_rgba(232,163,61,0.8)]" />
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
                      className="group relative flex items-center justify-between rounded-2xl border border-cream/10 bg-[#1e140b] p-4 transition-all duration-200 hover:border-saffron/50 hover:bg-[#25190e] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
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
                        <span className="font-mono text-sm font-bold text-haldi bg-[#140c06] border border-cream/15 px-2.5 py-1 rounded-lg">
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

        {/* Modal Bottom Solid Footer */}
        <div className="relative shrink-0 border-t border-cream/10 bg-[#1f140b] px-6 py-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-30 shadow-[0_-12px_24px_rgba(0,0,0,0.5)]">
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
