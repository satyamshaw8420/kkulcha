import React, { useState, useEffect } from "react";
import { useReservation } from "../context/ReservationContext";
import { INFO } from "../data";
import { Flame, Spark, VegMark, Plate, Smoke } from "./chrome";

const SECTIONS = [
  {
    id: "main",
    title: "Main Dining Hall",
    subtitle: "100% Pure Veg · Family Friendly",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    tag: "Fast Tandoor",
  },
  {
    id: "lounge",
    title: "The Hookah Lounge",
    subtitle: "Ambient Mood · Soft Beats · Terrace",
    icon: <Smoke className="w-5 h-5 text-saffron" />,
    tag: "Popular",
  },
  {
    id: "booth",
    title: "Private Corner Booth",
    subtitle: "Intimate seating for groups & celebrations",
    icon: <Spark className="w-5 h-5 text-saffron" />,
    tag: "Limited",
  },
];

const OCCASIONS = [
  "Casual Dining",
  "Birthday Celebration",
  "Family Gathering",
  "Jain Special (No Onion / Garlic)",
  "Lounge & Hookah Experience",
  "Extra Crispy Tandoor Request",
];

const TIME_SLOTS = [
  { time: "12:30 PM", period: "Lunch", badge: "Available" },
  { time: "01:30 PM", period: "Lunch", badge: "Fast Filling" },
  { time: "02:30 PM", period: "Lunch", badge: "Available" },
  { time: "07:00 PM", period: "Dinner", badge: "Popular" },
  { time: "08:00 PM", period: "Dinner", badge: "Peak Hours" },
  { time: "09:00 PM", period: "Dinner", badge: "Peak Hours" },
  { time: "10:00 PM", period: "Dinner", badge: "Late Dining" },
];

export function ReservationModal() {
  const { isOpen, closeReservation } = useReservation();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [guests, setGuests] = useState<number>(2);
  const [section, setSection] = useState<string>("main");
  const [date, setDate] = useState<string>("Today");
  const [time, setTime] = useState<string>("08:00 PM");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("Casual Dining");
  const [specialNote, setSpecialNote] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Reset step after closing
      setTimeout(() => {
        setStep(1);
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const randomCode = `KK-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingId(randomCode);
    setStep(4);
  };

  const getWhatsAppMessage = () => {
    const sectionTitle = SECTIONS.find((s) => s.id === section)?.title || "Main Dining Hall";
    const textLines = [
      "*TABLE RESERVATION REQUEST*",
      "──────────────────────",
      "*THE KKULCHA HHOUSE CAFE*",
      "28/3 Dobson Road, Howrah",
      "",
      `*Booking Ref:* ${bookingId}`,
      `*Guest Name:* ${name}`,
      `*Party Size:* ${guests} ${guests === 1 ? "Guest" : "Guests"}`,
      `*Date:* ${date}`,
      `*Time Slot:* ${time}`,
      `*Seating Area:* ${sectionTitle}`,
      `*Occasion / Preference:* ${occasion}`,
      specialNote ? `*Special Request:* ${specialNote}` : "",
      "──────────────────────",
      "Kindly confirm availability and reserve our table. Thank you.",
    ];

    return `https://wa.me/917003180160?text=${encodeURIComponent(textLines.filter(Boolean).join("\n"))}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark Ambient Backdrop */}
      <div
        className="fixed inset-0 bg-char/90 backdrop-blur-md transition-opacity duration-300"
        onClick={closeReservation}
      />

      {/* Main Reservation Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-saffron/25 bg-gradient-to-b from-[#24180f] via-[#1c120a] to-[#140c06] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(232,163,61,0.15)] text-cream z-10 my-auto animate-fade-up">
        {/* Glow ambient spots */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-80 rounded-full bg-saffron/15 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-40 w-40 rounded-full bg-flame/15 blur-[60px]" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between border-b border-cream/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-saffron/10 border border-saffron/30 text-saffron">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-black tracking-wide text-cream">
                Table Reservation
              </h2>
              <p className="font-mono text-[10px] tracking-[0.2em] text-dune uppercase">
                THE KKULCHA HHOUSE CAFE · DOBSON ROAD
              </p>
            </div>
          </div>

          <button
            onClick={closeReservation}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 bg-coal text-parch/70 transition-colors hover:border-saffron hover:text-saffron hover:bg-saffron/10 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Multi-Step Progress Tracker (if not confirmed) */}
        {step < 4 && (
          <div className="border-b border-cream/5 bg-char/40 px-6 py-3 sm:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-[10px] font-bold text-char font-mono">
                {step}
              </span>
              <span className="font-mono text-[11px] tracking-wider text-parch/90 uppercase">
                {step === 1 && "Select Party & Section"}
                {step === 2 && "Choose Date & Time"}
                {step === 3 && "Guest Details"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step
                      ? "w-7 bg-saffron"
                      : s < step
                      ? "w-4 bg-saffron/50"
                      : "w-2.5 bg-cream/15"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: PARTY SIZE & SEATING SECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[11px] tracking-[0.25em] text-saffron uppercase font-semibold">
                  Select Number of Guests
                </label>
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex flex-col items-center justify-center py-3 rounded-xl font-mono text-sm font-bold transition-all duration-200 border cursor-pointer ${
                        guests === num
                          ? "bg-saffron text-char border-saffron shadow-[0_0_15px_rgba(232,163,61,0.4)] scale-105"
                          : "bg-coal/70 text-parch/80 border-cream/10 hover:border-saffron/40 hover:text-cream"
                      }`}
                    >
                      <span>{num}</span>
                      <span className="text-[9px] font-normal opacity-75">
                        {num === 1 ? "Person" : num === 8 ? "8+ Guests" : "Guests"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] tracking-[0.25em] text-saffron uppercase font-semibold">
                  Select Seating Area
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {SECTIONS.map((sec) => (
                    <div
                      key={sec.id}
                      onClick={() => setSection(sec.id)}
                      className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                        section === sec.id
                          ? "border-saffron bg-saffron/10 shadow-[0_0_20px_rgba(232,163,61,0.15)] ring-1 ring-saffron"
                          : "border-cream/10 bg-coal/50 hover:border-cream/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-saffron/10 text-saffron">
                          {sec.icon}
                        </div>
                        <span className="rounded-full bg-cream/10 px-2 py-0.5 font-mono text-[9px] text-dune uppercase">
                          {sec.tag}
                        </span>
                      </div>
                      <h4 className="mt-3 font-display font-bold text-cream text-sm">
                        {sec.title}
                      </h4>
                      <p className="mt-1 text-xs text-parch/60 leading-snug">
                        {sec.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto rounded-full bg-saffron px-8 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-char uppercase transition-all duration-300 hover:bg-haldi hover:shadow-[0_0_25px_rgba(232,163,61,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue to Date & Time →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME SLOT */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block font-mono text-[11px] tracking-[0.25em] text-saffron uppercase font-semibold">
                  Choose Reservation Date
                </label>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {["Today", "Tomorrow", "This Friday", "This Saturday"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDate(d)}
                      className={`py-3 px-4 rounded-xl border text-center font-mono text-xs font-semibold uppercase transition-all duration-200 cursor-pointer ${
                        date === d
                          ? "bg-saffron text-char border-saffron shadow-[0_0_15px_rgba(232,163,61,0.4)]"
                          : "bg-coal/70 text-parch/80 border-cream/10 hover:border-saffron/40"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[11px] tracking-[0.25em] text-saffron uppercase font-semibold">
                    Select Time Slot
                  </label>
                  <span className="font-mono text-[10px] text-dune">
                    Kitchen Hours: 11:00 AM – 11:00 PM
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setTime(slot.time)}
                      className={`relative flex flex-col items-center p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                        time === slot.time
                          ? "bg-saffron text-char border-saffron shadow-[0_0_15px_rgba(232,163,61,0.4)]"
                          : "bg-coal/70 text-parch/80 border-cream/10 hover:border-saffron/40"
                      }`}
                    >
                      <span className="font-mono text-sm font-bold">{slot.time}</span>
                      <span
                        className={`mt-1 font-mono text-[8px] tracking-wider uppercase ${
                          time === slot.time
                            ? "text-char/80 font-bold"
                            : slot.badge === "Peak Hours"
                            ? "text-flame font-semibold"
                            : "text-dune"
                        }`}
                      >
                        {slot.badge}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-full border border-cream/15 px-6 py-3 font-mono text-xs text-parch hover:border-cream/40 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-full bg-saffron px-8 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-char uppercase transition-all duration-300 hover:bg-haldi hover:shadow-[0_0_25px_rgba(232,163,61,0.5)] cursor-pointer"
                >
                  Guest Info →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS & CONFIRM */}
          {step === 3 && (
            <form onSubmit={handleConfirm} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] text-saffron uppercase font-semibold mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-cream/15 bg-char/80 px-4 py-3 text-sm text-cream placeholder:text-parch/30 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] text-saffron uppercase font-semibold mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-cream/15 bg-char/80 px-4 py-3 text-sm text-cream placeholder:text-parch/30 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] text-saffron uppercase font-semibold mb-1.5">
                  Dining Preference / Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setOccasion(occ)}
                      className={`rounded-full border px-3.5 py-1.5 font-mono text-[10px] tracking-wide transition-all cursor-pointer ${
                        occasion === occ
                          ? "border-saffron bg-saffron/20 text-saffron font-bold"
                          : "border-cream/10 bg-coal/50 text-parch/70 hover:border-cream/30"
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] text-dune uppercase mb-1.5">
                  Special Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any dietary preferences or specific requests..."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full rounded-xl border border-cream/15 bg-char/80 px-4 py-2.5 text-sm text-cream placeholder:text-parch/30 focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron resize-none"
                />
              </div>

              {/* Summary pill before confirm */}
              <div className="rounded-2xl border border-saffron/20 bg-saffron/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-saffron/10 border border-saffron/30 text-saffron">
                    <Plate className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-cream">
                      {guests} Guests · {date} at {time}
                    </p>
                    <p className="font-mono text-[10px] text-dune">
                      {SECTIONS.find((s) => s.id === section)?.title}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] tracking-wider text-sage uppercase flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Free Reservation
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-cream/15 px-6 py-3 font-mono text-xs text-parch hover:border-cream/40 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-saffron px-8 py-3.5 font-mono text-xs font-bold tracking-[0.2em] text-char uppercase transition-all duration-300 hover:bg-haldi hover:shadow-[0_0_30px_rgba(232,163,61,0.6)] flex items-center gap-2 cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: DIGITAL LUXURY RESERVATION PASS (CONFIRMATION) */}
          {step === 4 && (
            <div className="space-y-6 text-center py-2 animate-fade-up">
              {/* Animated checkmark badge */}
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 border-2 border-sage text-sage shadow-[0_0_30px_rgba(147,165,107,0.3)]">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-saffron uppercase font-bold">
                  Reservation Confirmed
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-black text-cream">
                  We look forward to hosting you, {name}!
                </h3>
                <p className="mt-2 text-sm text-parch/70 max-w-md mx-auto">
                  Your table is held at The Kkulcha Hhouse Cafe. Tables are held for 15 minutes past the reservation time.
                </p>
              </div>

              {/* The Boarding Pass / Golden Ticket */}
              <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl border border-saffron/40 bg-gradient-to-br from-[#281c12] via-[#1f150e] to-[#140c06] p-6 shadow-2xl text-left">
                {/* Perforated edge effect */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-char border-r border-saffron/30" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-char border-l border-saffron/30" />

                <div className="flex items-center justify-between border-b border-dashed border-cream/15 pb-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.25em] text-dune uppercase">Official Reservation Pass</p>
                    <p className="font-display text-lg font-black text-cream">THE KKULCHA HHOUSE CAFE</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-saffron bg-saffron/10 border border-saffron/30 px-2.5 py-1 rounded-md">
                      {bookingId}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-dashed border-cream/15 font-mono text-xs">
                  <div>
                    <p className="text-[9px] tracking-wider text-dune uppercase">Date</p>
                    <p className="font-bold text-cream mt-0.5">{date}</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider text-dune uppercase">Time</p>
                    <p className="font-bold text-saffron mt-0.5">{time}</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider text-dune uppercase">Party</p>
                    <p className="font-bold text-cream mt-0.5">{guests} Guests</p>
                  </div>
                  <div>
                    <p className="text-[9px] tracking-wider text-dune uppercase">Section</p>
                    <p className="font-bold text-cream mt-0.5 truncate">{SECTIONS.find((s) => s.id === section)?.title.split(" ")[0]}</p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs text-parch/70">
                  <div className="flex items-center gap-2">
                    <VegMark className="h-3.5 w-3.5" />
                    <span>28/3 Dobson Rd, Howrah</span>
                  </div>
                  <span className="font-mono text-[10px] text-sage">Status: Confirmed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-mono text-xs font-bold text-black uppercase transition-all duration-300 hover:opacity-90 shadow-lg cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 2.029.816 2.802.816 3.177 0 5.765-2.587 5.766-5.766.002-3.181-2.585-5.768-5.766-5.768zm0 10.355c-.707 0-1.401-.189-2.007-.547l-.144-.085-1.491.391.398-1.453-.093-.148c-.392-.624-.599-1.348-.599-2.091 0-2.203 1.792-3.995 3.997-3.995 2.203 0 3.995 1.792 3.996 3.995 0 2.203-1.793 3.993-3.998 3.993z" />
                  </svg>
                  Receive WhatsApp Confirmation
                </a>
                <button
                  type="button"
                  onClick={closeReservation}
                  className="w-full sm:w-auto rounded-full border border-cream/20 bg-char/80 px-6 py-3.5 font-mono text-xs text-cream uppercase transition-colors hover:border-saffron hover:text-saffron cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
