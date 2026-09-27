import React, { useState } from 'react';
import { audioManager, OPEN_STRING_FREQUENCIES } from '../utils/audio';

interface ElectricGuitarBackgroundProps {
  className?: string;
  opacity?: number;
}

export const ElectricGuitarBackground: React.FC<ElectricGuitarBackgroundProps> = ({
  className = '',
  opacity = 0.45
}) => {
  const [activePluckedString, setActivePluckedString] = useState<number | null>(null);

  const handleStringClick = (strIdx: number) => {
    setActivePluckedString(strIdx);
    const freq = OPEN_STRING_FREQUENCIES[strIdx];
    audioManager.pluckString(freq, 2.5, undefined, 0.4);
    setTimeout(() => {
      setActivePluckedString(null);
    }, 400);
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none flex items-center justify-end ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Dramatic Stage Lighting Spotlight */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-l from-amber-500/15 via-amber-700/5 to-transparent blur-[140px] rounded-full pointer-events-none" />

      {/* Electric Guitar Art Canvas */}
      <svg
        viewBox="0 0 900 650"
        className="w-full max-w-4xl h-auto pointer-events-auto transform translate-x-12 sm:translate-x-20 rotate-[-12deg] drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Body Finish: Deep Obsidian to Warm Amber Sunburst */}
          <radialGradient id="electricBodyGrad" cx="60%" cy="50%" r="55%" fx="65%" fy="45%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="35%" stopColor="#451a03" />
            <stop offset="70%" stopColor="#1c1917" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>

          {/* Chrome Metallic Gradient */}
          <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="25%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Gold Brass Accent */}
          <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Pickguard Dark Pearl */}
          <linearGradient id="pickguardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="50%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="stringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Stage Rim Glow Outline behind guitar */}
        <path
          d="M 520,100 C 650,80 780,140 820,240 C 860,330 830,450 750,520 C 660,600 520,620 420,580 C 340,540 310,460 300,380 C 290,320 240,280 200,280 C 160,280 140,240 180,210 C 230,170 300,210 350,190 C 400,170 450,110 520,100 Z"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="8"
          strokeOpacity="0.25"
          filter="url(#stringGlow)"
        />

        {/* MAIN SOLID BODY OF ELECTRIC GUITAR */}
        <path
          d="M 520,100 C 650,80 780,140 820,240 C 860,330 830,450 750,520 C 660,600 520,620 420,580 C 340,540 310,460 300,380 C 290,320 240,280 200,280 C 160,280 140,240 180,210 C 230,170 300,210 350,190 C 400,170 450,110 520,100 Z"
          fill="url(#electricBodyGrad)"
          stroke="#3f3f46"
          strokeWidth="3"
        />

        {/* Outer Body Highlight Bevel */}
        <path
          d="M 540,115 C 650,100 760,150 795,245 C 830,325 805,430 735,495 C 650,570 530,590 435,555 C 360,520 330,450 320,380 C 310,300 240,260 210,250 C 230,220 290,230 335,215 C 380,195 440,125 540,115 Z"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeOpacity="0.35"
        />

        {/* Pickguard (3-ply vintage black) */}
        <path
          d="M 460,210 C 530,190 600,220 630,270 C 660,320 650,400 600,440 C 550,470 490,470 460,430 C 430,390 430,300 420,260 Z"
          fill="url(#pickguardGrad)"
          stroke="#52525b"
          strokeWidth="2"
        />

        {/* NECK (Extending towards left) */}
        <polygon
          points="0,225 380,245 380,285 0,265"
          fill="#1c1917"
          stroke="#44403c"
          strokeWidth="1.5"
        />
        {/* Rosewood Fretboard Layer */}
        <polygon
          points="0,227 380,247 380,283 0,263"
          fill="#292524"
        />

        {/* Frets along the neck */}
        {[30, 65, 105, 145, 185, 225, 265, 305, 345].map((fretX, idx) => (
          <line
            key={`fret-${idx}`}
            x1={fretX}
            y1={227 + (fretX / 380) * 20}
            x2={fretX + 2}
            y2={263 + (fretX / 380) * 20}
            stroke="#94a3b8"
            strokeWidth="1.8"
          />
        ))}

        {/* Pearl Inlay Dots on Frets */}
        {[65, 145, 225, 305].map((dotX, idx) => (
          <circle
            key={`dot-${idx}`}
            cx={dotX + 18}
            cy={246 + (dotX / 380) * 20}
            r="3.5"
            fill="#e2e8f0"
            opacity="0.85"
          />
        ))}

        {/* PICKUP 1 (Neck Humbucker / Single Coil) */}
        <g transform="translate(420, 245) rotate(5)">
          <rect x="0" y="0" width="34" height="60" rx="4" fill="#09090b" stroke="url(#chromeMetal)" strokeWidth="2" />
          {/* Pole Pieces */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx="17" cy={6 + i * 9.5} r="3" fill="url(#chromeMetal)" />
          ))}
        </g>

        {/* PICKUP 2 (Bridge Humbucker with High Output Pole Pieces) */}
        <g transform="translate(520, 255) rotate(5)">
          <rect x="0" y="0" width="38" height="64" rx="4" fill="#09090b" stroke="url(#chromeMetal)" strokeWidth="2" />
          {/* Double row pole pieces */}
          {Array.from({ length: 6 }).map((_, i) => (
            <g key={i}>
              <circle cx="11" cy={7 + i * 10} r="2.8" fill="url(#chromeMetal)" />
              <circle cx="27" cy={7 + i * 10} r="2.8" fill="url(#chromeMetal)" />
            </g>
          ))}
        </g>

        {/* CHROME TREMOLO BRIDGE & SADDLES */}
        <g transform="translate(610, 260) rotate(5)">
          <rect x="0" y="0" width="55" height="70" rx="4" fill="url(#chromeMetal)" stroke="#334155" strokeWidth="2" />
          {/* 6 Individual Chrome String Saddles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect
              key={i}
              x="12"
              y={6 + i * 10}
              width="24"
              height="7"
              rx="1.5"
              fill="#0f172a"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          ))}
          {/* Whammy / Tremolo Bar Base */}
          <circle cx="44" cy="58" r="4.5" fill="#f8fafc" stroke="#475569" />
          <path d="M 44,58 L 70,85 L 120,95" stroke="url(#chromeMetal)" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        {/* VOLUME & TONE CONTROLS (Knurled Chrome / Amber Knobs) */}
        <g transform="translate(620, 390)">
          <circle cx="0" cy="0" r="16" fill="url(#goldAccent)" stroke="#18181b" strokeWidth="3" />
          <circle cx="0" cy="0" r="11" fill="#18181b" />
          <line x1="0" y1="-10" x2="0" y2="-4" stroke="#f59e0b" strokeWidth="2" />
        </g>
        <g transform="translate(670, 360)">
          <circle cx="0" cy="0" r="16" fill="url(#goldAccent)" stroke="#18181b" strokeWidth="3" />
          <circle cx="0" cy="0" r="11" fill="#18181b" />
          <line x1="0" y1="-10" x2="0" y2="-4" stroke="#f59e0b" strokeWidth="2" />
        </g>
        <g transform="translate(710, 320)">
          <circle cx="0" cy="0" r="15" fill="url(#goldAccent)" stroke="#18181b" strokeWidth="3" />
          <circle cx="0" cy="0" r="10" fill="#18181b" />
          <line x1="0" y1="-9" x2="0" y2="-3" stroke="#f59e0b" strokeWidth="2" />
        </g>

        {/* 5-WAY PICKUP SELECTOR SWITCH */}
        <g transform="translate(540, 410) rotate(-35)">
          <rect x="-3" y="-12" width="6" height="24" rx="2" fill="#27272a" stroke="#52525b" />
          <circle cx="0" cy="-14" r="5" fill="#f8fafc" stroke="#94a3b8" />
        </g>

        {/* 1/4" CHROME OUTPUT JACK PLATE */}
        <g transform="translate(740, 450) rotate(45)">
          <ellipse cx="0" cy="0" rx="14" ry="24" fill="url(#chromeMetal)" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="6" fill="#09090b" stroke="#64748b" strokeWidth="2" />
        </g>

        {/* 6 ELECTRIC GUITAR STRINGS (Pluckable interactive elements!) */}
        {Array.from({ length: 6 }).map((_, i) => {
          const yStart = 230 + i * 5.6;
          const yEnd = 267 + i * 9.8;
          const strokeWidth = 2.4 - i * 0.28; // Low E thicker, High E thinner
          const isPlucked = activePluckedString === i;

          return (
            <g key={`string-${i}`} className="cursor-pointer" onClick={() => handleStringClick(i)}>
              {/* Invisible touch/click hit area */}
              <line
                x1="0"
                y1={yStart}
                x2="630"
                y2={yEnd}
                stroke="transparent"
                strokeWidth="14"
              />
              {/* Visible string */}
              <line
                x1="0"
                y1={yStart}
                x2="630"
                y2={yEnd}
                stroke={isPlucked ? '#fbbf24' : '#e2e8f0'}
                strokeWidth={isPlucked ? strokeWidth * 1.8 : strokeWidth}
                strokeOpacity={isPlucked ? 1 : 0.75}
                filter={isPlucked ? 'url(#stringGlow)' : undefined}
                className="transition-all duration-75 hover:stroke-amber-400 hover:opacity-100"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
