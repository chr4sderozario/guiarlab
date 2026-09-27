import React, { useState } from 'react';
import { Play, BookOpen, Search, Gauge, Compass, Sliders, Volume2 } from 'lucide-react';
import { ElectricGuitarBackground } from './ElectricGuitarBackground';

interface HeroProps {
  onStartPlaying: () => void;
  onExploreSongs: () => void;
  onExploreChords: () => void;
  onExploreTools: () => void;
  onOpenTuner?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartPlaying,
  onExploreSongs,
  onExploreChords,
  onExploreTools,
  onOpenTuner
}) => {
  const [bgIntensity, setBgIntensity] = useState<'subtle' | 'rich' | 'vivid'>('rich');

  const opacityMap = {
    subtle: 0.28,
    rich: 0.55,
    vivid: 0.85
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-neutral-800/60 min-h-[580px] flex items-center">
      {/* 1. Electric Guitar Background Picture Canvas */}
      <ElectricGuitarBackground opacity={opacityMap[bgIntensity]} />

      {/* 2. Measured Contrast Scrims for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c12] via-[#0b0c12]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-transparent to-[#0b0c12]/50 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-amber-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy (Left / Top) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Clean subtle category indicator (no pill clutter) */}
            <div className="flex items-center gap-2 text-xs tracking-wider uppercase font-semibold text-amber-500/90 font-mono">
              <span>Modern Guitar Companion</span>
              <span aria-hidden="true">·</span>
              <span>All Levels Welcomed</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 leading-[1.12]"
              style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
            >
              Your guitar. Your songs. <span className="text-amber-400">Your progress.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl font-normal leading-relaxed">
              A simple place to learn songs, discover chords, practice, and become a better guitarist.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartPlaying}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 active:scale-95 rounded-xl transition-all shadow-lg shadow-amber-500/25 whitespace-nowrap cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Playing</span>
              </button>

              {onOpenTuner && (
                <button
                  onClick={onOpenTuner}
                  className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>Tune Guitar (Top)</span>
                </button>
              )}

              <button
                onClick={onExploreSongs}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800/80 border border-neutral-800 rounded-xl transition-all whitespace-nowrap cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Browse Song Library</span>
              </button>
            </div>

            {/* Quiet feature jump links */}
            <div className="pt-6 border-t border-neutral-800/60 flex flex-wrap items-center gap-6 text-xs text-neutral-400">
              <button
                onClick={onExploreChords}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-amber-500" />
                <span>Interactive Chord Finder</span>
              </button>
              <button
                onClick={onExploreTools}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Gauge className="w-3.5 h-3.5 text-amber-500" />
                <span>Metronome & Tuner</span>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('progressions');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-500" />
                <span>Chord Progressions</span>
              </button>
            </div>

            {/* Electric Guitar Backdrop Indicator & Intensity Selector */}
            <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <span className="text-[11px] font-mono text-amber-400/90 font-semibold flex items-center gap-1">
                <span>⚡ Electric Guitar Background:</span>
              </span>
              <div className="flex items-center gap-1 p-0.5 bg-neutral-900/90 border border-neutral-800 rounded-lg">
                {(['subtle', 'rich', 'vivid'] as const).map((intensity) => (
                  <button
                    key={intensity}
                    onClick={() => setBgIntensity(intensity)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-all cursor-pointer ${
                      bgIntensity === intensity
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {intensity}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-neutral-500 italic hidden sm:inline">
                (Click the background strings to pluck tone!)
              </span>
            </div>

          </div>

          {/* Interactive Acoustic Guitar Art Card (Right / Visual Anchor) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#161822] to-[#0f1118] border border-neutral-800 rounded-2xl p-6 shadow-2xl overflow-hidden group">
              
              {/* Radial soundhole rosette graphic motif */}
              <div className="relative flex flex-col items-center py-4">
                <div className="relative w-44 h-44 rounded-full border-4 border-amber-600/30 flex items-center justify-center shadow-inner bg-[#0a0b0e]">
                  {/* Outer herringbone rosette ring */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-amber-500/40" />
                  <div className="absolute inset-4 rounded-full border-2 border-amber-700/30" />
                  
                  {/* Guitar strings spanning soundhole */}
                  <div className="absolute inset-0 flex justify-evenly items-stretch pointer-events-none py-2 px-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-full bg-gradient-to-b from-neutral-400 via-amber-200 to-neutral-400 shadow-sm opacity-80"
                        style={{ width: `${2.6 - i * 0.3}px` }}
                      />
                    ))}
                  </div>

                  {/* Soundhole dark center */}
                  <div className="w-20 h-20 rounded-full bg-[#050608] border border-neutral-900 shadow-2xl flex items-center justify-center">
                    <span className="text-amber-500/80 font-mono text-xs font-bold">440 Hz</span>
                  </div>
                </div>

                {/* Quick Interactive Strum Test Card */}
                <div className="mt-6 w-full bg-[#11131c] border border-neutral-800/80 rounded-xl p-4">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-medium">
                    <span>Quick Strum Demo</span>
                    <span className="text-amber-400 font-mono font-semibold">G · Em · C · D</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={onStartPlaying}
                      className="w-full py-2 px-3 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-amber-400 rounded-lg border border-neutral-700/60 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>Launch Practice Routine</span>
                    </button>
                  </div>
                </div>

                {/* Quiet attribution specs */}
                <div className="mt-3 flex items-center justify-between w-full text-[11px] text-neutral-500">
                  <span>Acoustic & Electric Ready</span>
                  <span className="text-amber-500/70 font-mono">Standard 440Hz EADGBE</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
