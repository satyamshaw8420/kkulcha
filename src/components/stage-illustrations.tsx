import { useEffect, useState } from "react";

/* ================= 01. ANIMATED DOUGH (2D KNEADING & FLOUR) ================= */

export function AnimatedDough() {
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      top: 10 + Math.random() * 40,
      size: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 60,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.5,
    }))
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#221810] via-[#1a120b] to-[#120c07] flex items-center justify-center select-none">
      {/* Subtle wood cutting board / marble bench texture at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bark/70 to-transparent border-b-4 border-soot" />
      <div className="absolute inset-x-6 bottom-7 h-[2px] bg-cream/10 rounded-full blur-[0.5px]" />

      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-saffron/10 blur-[60px] pointer-events-none" />

      {/* Floating Flour Dust Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cream pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `flourDrift ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            // @ts-ignore
            "--flour-drift": `${p.drift}px`,
          }}
        />
      ))}

      {/* Stage Badge in top corner */}
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-cream/10 bg-coal/80 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-parch/70 uppercase backdrop-blur-md z-10">
        <span className="h-1.5 w-1.5 rounded-full bg-haldi animate-pulse" />
        HYDRATION 72% · RESTED
      </div>

      {/* Interactive / Main 2D Dough Stage */}
      <div className="relative flex flex-col items-center justify-center z-10 pt-4">
        {/* Animated Rolling Pin hovering / rolling */}
        <div
          className="absolute top-0 left-1/2 pointer-events-none z-20"
          style={{
            animation: "pinRoll 5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
          }}
        >
          {/* Stylized Wooden Rolling Pin */}
          <div className="relative w-44 h-7 rounded-full bg-gradient-to-r from-[#5a3a1f] via-[#916238] to-[#5a3a1f] shadow-2xl border border-[#b5834f]/30 flex items-center justify-center">
            {/* Handles */}
            <div className="absolute -left-6 w-7 h-3 rounded-l-md bg-[#422915] border-y border-l border-[#82542a]/40" />
            <div className="absolute -right-6 w-7 h-3 rounded-r-md bg-[#422915] border-y border-r border-[#82542a]/40" />
            {/* Wood Grain Lines */}
            <div className="w-3/4 h-[1px] bg-white/20 rounded-full" />
            <div className="absolute bottom-1 w-2/3 h-[1px] bg-black/30 rounded-full" />
            {/* Flour dusting on pin */}
            <div className="absolute top-1 right-8 w-8 h-2 bg-cream/30 rounded-full blur-[1px]" />
          </div>
        </div>

        {/* Soft Organic Dough Ball */}
        <div className="relative mt-8 group cursor-pointer">
          {/* Dough Shadow on Bench */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-8 rounded-full bg-black/60 blur-md pointer-events-none"
            style={{ animation: "doughShadow 4s ease-in-out infinite" }}
          />

          {/* Kneading / Breathing Dough Body */}
          <div
            className="relative w-40 h-32 bg-gradient-to-b from-[#fff2db] via-[#f3dfb9] to-[#d8be92] shadow-[inset_0_-8px_16px_rgba(163,124,76,0.35),inset_0_4px_10px_rgba(255,255,255,0.8),0_12px_24px_rgba(0,0,0,0.4)] border border-[#e8d5b5]/60 transition-transform duration-300 group-hover:scale-105"
            style={{
              borderRadius: "48% 52% 50% 50% / 54% 50% 50% 46%",
              animation: "doughBreathe 4s ease-in-out infinite",
            }}
          >
            {/* Organic surface folds / creases */}
            <div className="absolute top-6 left-8 w-16 h-4 border-b-2 border-[#caa475]/40 rounded-full transform -rotate-12 blur-[0.4px]" />
            <div className="absolute top-12 right-6 w-14 h-3 border-b-2 border-[#caa475]/30 rounded-full transform rotate-6 blur-[0.4px]" />
            <div className="absolute bottom-6 left-12 w-20 h-5 border-t-2 border-[#be9461]/40 rounded-full blur-[0.4px]" />

            {/* Glossy / Soft Flour highlights */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 rounded-full blur-sm" />
            <div className="absolute top-4 left-10 w-6 h-3 bg-white/60 rounded-full blur-[1px]" />

            {/* Flour dusting patches */}
            <div className="absolute top-8 right-8 w-8 h-8 rounded-full bg-cream/40 blur-[3px]" />
            <div className="absolute bottom-4 right-10 w-10 h-5 rounded-full bg-cream/50 blur-[2px]" />

            {/* Micro flour sprinkles on dough */}
            <div className="absolute top-7 left-14 w-1.5 h-1.5 rounded-full bg-white/80" />
            <div className="absolute top-14 left-20 w-1 h-1 rounded-full bg-white/70" />
            <div className="absolute top-10 right-14 w-1.5 h-1.5 rounded-full bg-white/80" />
            <div className="absolute bottom-8 left-16 w-1 h-1 rounded-full bg-white/60" />
          </div>
        </div>

        {/* Flour sprinkled on board */}
        <div className="mt-3 flex items-center justify-center gap-6 opacity-60">
          <div className="w-12 h-1 bg-cream/20 rounded-full blur-[1px]" />
          <div className="w-16 h-1 bg-cream/30 rounded-full blur-[1px]" />
          <div className="w-8 h-1 bg-cream/20 rounded-full blur-[1px]" />
        </div>
      </div>

      {/* Bottom Subtitle / Craft detail */}
      <div className="absolute bottom-3 inset-x-0 text-center font-mono text-[10px] tracking-[0.25em] text-parch/50 uppercase">
        Hand-kneaded at 5:00 AM · Fermenting
      </div>
    </div>
  );
}

/* ================= 03. ANIMATED BLAZE (2D COAL TANDOOR FIRE) ================= */

export function AnimatedBlaze() {
  const [sparks] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: 20 + Math.random() * 60,
      bottom: 25 + Math.random() * 20,
      size: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 80,
      delay: Math.random() * 3,
      duration: 1.8 + Math.random() * 2.2,
      color: i % 3 === 0 ? "#ffd98c" : i % 3 === 1 ? "#f5c876" : "#e07a2f",
    }))
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#190d07] via-[#241006] to-[#0c0502] flex items-center justify-center select-none">
      {/* Intense Ambient Radial Heat Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(232,163,61,0.25),rgba(210,88,46,0.15)_40%,transparent_75%)] pointer-events-none"
        style={{ animation: "heatWave 3s ease-in-out infinite" }}
      />

      {/* Tandoor Clay Wall Curve Outline in background */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none opacity-20"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q200,60 400,0 L400,300 L0,300 Z"
          fill="none"
          stroke="#d2582e"
          strokeWidth="3"
        />
        {/* Clay oven crack patterns */}
        <path d="M70,80 Q100,120 85,160 T110,210" stroke="#f5c876" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M330,70 Q300,110 320,150 T290,200" stroke="#f5c876" strokeWidth="1" fill="none" opacity="0.6" />
      </svg>

      {/* Rising Hot Sparks & Embers */}
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full pointer-events-none shadow-[0_0_8px_currentColor]"
          style={{
            left: `${s.left}%`,
            bottom: `${s.bottom}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            color: s.color,
            animation: `sparkRise ${s.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
            animationDelay: `${s.delay}s`,
            // @ts-ignore
            "--spark-drift": `${s.drift}px`,
          }}
        />
      ))}

      {/* Temperature HUD in top corner */}
      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-flame/40 bg-char/90 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-haldi uppercase backdrop-blur-md z-20 shadow-[0_0_15px_rgba(210,88,46,0.3)]">
        <span className="h-2 w-2 rounded-full bg-flame animate-ping" />
        <span className="font-bold text-cream">300°C</span> · COAL-FIRED BLAZE
      </div>

      {/* Main 2D Fire Flame Assembly */}
      <div className="relative flex flex-col items-center justify-end h-full pb-8 z-10 w-full max-w-[280px]">
        {/* 2D Multi-Layered Animated SVG Flames */}
        <div className="relative w-48 h-56 flex items-center justify-center">
          
          {/* Layer 1: Deep Outer Flame (Crimson / Ember) */}
          <svg
            viewBox="0 0 200 240"
            className="absolute inset-0 w-full h-full text-ember/90 drop-shadow-[0_0_25px_rgba(166,61,30,0.8)]"
            style={{
              animation: "flameTongue1 3.2s ease-in-out infinite",
              transformOrigin: "bottom center",
            }}
          >
            <path
              d="M100,10 C130,50 175,90 175,160 C175,210 140,235 100,235 C60,235 25,210 25,160 C25,100 70,55 100,10 Z"
              fill="currentColor"
            />
          </svg>

          {/* Layer 2: Main Middle Flame (Flame / Saffron) */}
          <svg
            viewBox="0 0 200 240"
            className="absolute inset-0 w-full h-full text-flame drop-shadow-[0_0_30px_rgba(210,88,46,0.9)]"
            style={{
              animation: "flameTongue2 2.4s ease-in-out infinite",
              transformOrigin: "bottom center",
            }}
          >
            <path
              d="M100,35 C125,75 160,110 160,170 C160,215 130,235 100,235 C70,235 40,215 40,170 C40,115 75,80 100,35 Z"
              fill="currentColor"
            />
          </svg>

          {/* Layer 3: Vibrant Inner Flame (Haldi / Bright Yellow) */}
          <svg
            viewBox="0 0 200 240"
            className="absolute inset-0 w-full h-full text-haldi drop-shadow-[0_0_20px_rgba(245,200,118,0.9)]"
            style={{
              animation: "flameTongue3 1.8s ease-in-out infinite",
              transformOrigin: "bottom center",
            }}
          >
            <path
              d="M100,70 C120,105 145,135 145,180 C145,215 125,230 100,230 C75,230 55,215 55,180 C55,135 80,110 100,70 Z"
              fill="currentColor"
            />
          </svg>

          {/* Layer 4: White-Hot Core */}
          <svg
            viewBox="0 0 200 240"
            className="absolute inset-0 w-full h-full text-[#fff6e0] drop-shadow-[0_0_15px_#ffffff]"
            style={{
              animation: "flameTongue1 1.4s ease-in-out infinite",
              transformOrigin: "bottom center",
            }}
          >
            <path
              d="M100,120 C112,145 128,165 128,195 C128,220 115,228 100,228 C85,228 72,220 72,195 C72,165 88,145 100,120 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Glowing Red-Hot Charcoal Bed at the bottom */}
        <div
          className="relative w-full -mt-8 flex items-center justify-center gap-2 px-4 z-20"
          style={{ animation: "coalGlow 2.5s ease-in-out infinite" }}
        >
          {/* Coal 1 */}
          <div className="w-12 h-7 rounded-2xl bg-gradient-to-tr from-[#170a04] via-[#75260f] to-[#e8662c] shadow-[0_0_15px_#d2582e] border border-[#f5c876]/40 transform -rotate-6" />
          {/* Coal 2 (Center Large) */}
          <div className="w-16 h-9 rounded-2xl bg-gradient-to-t from-[#200d05] via-[#a63d1e] to-[#f5c876] shadow-[0_0_25px_#e8a33d] border border-[#ffd98c]/60 transform scale-110 z-10" />
          {/* Coal 3 */}
          <div className="w-14 h-8 rounded-2xl bg-gradient-to-tl from-[#170a04] via-[#872d12] to-[#e8662c] shadow-[0_0_15px_#d2582e] border border-[#f5c876]/40 transform rotate-8" />
          {/* Coal 4 */}
          <div className="w-10 h-6 rounded-2xl bg-gradient-to-tr from-[#120703] via-[#611d09] to-[#d2582e] shadow-[0_0_10px_#a63d1e] border border-[#e8a33d]/30 transform -rotate-12" />
        </div>
      </div>

      {/* Bottom Subtitle / Stage detail */}
      <div className="absolute bottom-3 inset-x-0 text-center font-mono text-[10px] tracking-[0.25em] text-haldi/70 uppercase z-20">
        Blistering Clay Wall · 90-Second Flash
      </div>
    </div>
  );
}
