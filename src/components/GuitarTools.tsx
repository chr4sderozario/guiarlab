import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Plus, Minus, RotateCcw, Radio, Sparkles, Sliders, Music, Info } from 'lucide-react';
import { audioManager, OPEN_STRING_FREQUENCIES, STRING_NAMES } from '../utils/audio';

interface GuitarToolsProps {
  onOpenChordFinder: () => void;
  onOpenPractice: () => void;
}

export const GuitarTools: React.FC<GuitarToolsProps> = ({
  onOpenChordFinder,
  onOpenPractice
}) => {
  // Metronome State
  const [bpm, setBpm] = useState<number>(100);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState<boolean>(false);
  const [timeSignature, setTimeSignature] = useState<number>(4);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [tapTimes, setTapTimes] = useState<number[]>([]);
  const [isMetronomeMuted, setIsMetronomeMuted] = useState<boolean>(false);

  // Tuner State
  const [selectedStringIndex, setSelectedStringIndex] = useState<number>(0); // 0 = Low E (E2)
  const [isPlayingReferenceTone, setIsPlayingReferenceTone] = useState<boolean>(false);
  const [continuousTone, setContinuousTone] = useState<boolean>(false);
  const [virtualCentOffset, setVirtualCentOffset] = useState<number>(0); // -50 to +50

  const metronomeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Metronome Loop
  useEffect(() => {
    if (!isPlayingMetronome) {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
      setCurrentBeat(0);
      return;
    }

    const intervalMs = (60 / bpm) * 1000;
    let count = 0;

    metronomeTimerRef.current = setInterval(() => {
      const isAccent = count % timeSignature === 0;
      if (!isMetronomeMuted) {
        audioManager.playMetronomeClick(isAccent);
      }
      setCurrentBeat(count % timeSignature);
      count++;
    }, intervalMs);

    return () => {
      if (metronomeTimerRef.current) clearInterval(metronomeTimerRef.current);
    };
  }, [isPlayingMetronome, bpm, timeSignature, isMetronomeMuted]);

  // Clean up continuous tone on unmount
  useEffect(() => {
    return () => {
      audioManager.stopContinuousTone();
    };
  }, []);

  // Tap Tempo calculation
  const handleTapTempo = () => {
    const now = Date.now();
    const updated = [...tapTimes.slice(-4), now];
    setTapTimes(updated);

    if (updated.length >= 2) {
      const intervals = [];
      for (let i = 1; i < updated.length; i++) {
        intervals.push(updated[i] - updated[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgInterval > 250 && avgInterval < 3000) {
        const calculatedBpm = Math.round(60000 / avgInterval);
        setBpm(Math.min(240, Math.max(40, calculatedBpm)));
      }
    }
  };

  // Play string reference pitch
  const handleSelectStringAndPlay = (index: number) => {
    setSelectedStringIndex(index);
    setVirtualCentOffset(0);
    audioManager.playTuningReference(index, continuousTone);
    setIsPlayingReferenceTone(true);
  };

  const toggleContinuousReference = () => {
    const nextState = !continuousTone;
    setContinuousTone(nextState);
    if (nextState) {
      audioManager.playTuningReference(selectedStringIndex, true);
      setIsPlayingReferenceTone(true);
    } else {
      audioManager.stopContinuousTone();
      setIsPlayingReferenceTone(false);
    }
  };

  const stringLabels = [
    { name: '6th E', note: 'E2', hz: 82.41, desc: 'Thickest string' },
    { name: '5th A', note: 'A2', hz: 110.00, desc: 'Bass A' },
    { name: '4th D', note: 'D3', hz: 146.83, desc: 'Middle D' },
    { name: '3rd G', note: 'G3', hz: 196.00, desc: 'Treble G' },
    { name: '2nd B', note: 'B3', hz: 246.94, desc: 'Plain B' },
    { name: '1st e', note: 'E4', hz: 329.63, desc: 'Thinnest string' },
  ];

  return (
    <section id="tools" className="py-16 sm:py-24 border-b border-neutral-800/70 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-500 font-mono mb-2">
            Essential Utility Bench
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Guitarist Tools
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            High-precision tools engineered for daily practice: tactile metronome, reference ear tuner, and quick lookups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tool 1: Full Standalone Metronome (Left 6 Cols) */}
          <div className="lg:col-span-6 bg-[#12141d] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 font-mono">
                  Precision Metronome
                </span>
                <h3 className="text-xl font-bold text-neutral-100 font-display mt-0.5">
                  Audio Rhythm Engine
                </h3>
              </div>

              {/* Time signature pills */}
              <div className="flex items-center gap-1 bg-[#181a26] border border-neutral-800 p-1 rounded-lg">
                {[4, 3, 2, 6].map((sig) => (
                  <button
                    key={sig}
                    onClick={() => setTimeSignature(sig)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded ${
                      timeSignature === sig
                        ? 'bg-amber-500 text-neutral-950'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {sig}/4
                  </button>
                ))}
              </div>
            </div>

            {/* Huge BPM Display for mobile & desktop */}
            <div className="text-center py-4 bg-[#0d0e15] border border-neutral-800/80 rounded-2xl">
              <div className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tight text-neutral-100 tabular-nums">
                {bpm}
              </div>
              <span className="text-xs uppercase tracking-widest text-amber-500 font-mono font-bold mt-1 block">
                Beats Per Minute
              </span>

              {/* Visual Beat Indicator Dots */}
              <div className="flex items-center justify-center gap-4 mt-6">
                {Array.from({ length: timeSignature }).map((_, i) => {
                  const isActive = isPlayingMetronome && currentBeat === i;
                  const isAccent = i === 0;
                  return (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-all duration-75 ${
                        isActive
                          ? isAccent
                            ? 'bg-amber-400 scale-140 shadow-lg shadow-amber-400 ring-2 ring-amber-200'
                            : 'bg-amber-500 scale-120 shadow-md shadow-amber-500'
                          : 'bg-neutral-800 border border-neutral-700'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Slider & Increment Controls */}
            <div className="space-y-3">
              <input
                type="range"
                min="40"
                max="240"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setBpm(Math.max(40, bpm - 5))}
                  className="px-3 py-2 bg-[#181a26] hover:bg-[#202334] text-neutral-200 rounded-xl text-xs font-mono font-bold border border-neutral-800 transition-colors"
                >
                  -5
                </button>
                <button
                  onClick={() => setBpm(Math.max(40, bpm - 1))}
                  className="px-3 py-2 bg-[#181a26] hover:bg-[#202334] text-neutral-200 rounded-xl text-xs font-mono font-bold border border-neutral-800 transition-colors"
                >
                  -1
                </button>

                <button
                  onClick={handleTapTempo}
                  className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-amber-400 font-bold rounded-xl text-xs uppercase tracking-wider font-mono border border-neutral-700 transition-all"
                >
                  Tap Tempo
                </button>

                <button
                  onClick={() => setBpm(Math.min(240, bpm + 1))}
                  className="px-3 py-2 bg-[#181a26] hover:bg-[#202334] text-neutral-200 rounded-xl text-xs font-mono font-bold border border-neutral-800 transition-colors"
                >
                  +1
                </button>
                <button
                  onClick={() => setBpm(Math.min(240, bpm + 5))}
                  className="px-3 py-2 bg-[#181a26] hover:bg-[#202334] text-neutral-200 rounded-xl text-xs font-mono font-bold border border-neutral-800 transition-colors"
                >
                  +5
                </button>
              </div>
            </div>

            {/* Play Button & Sound Toggle */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
                className={`flex-1 py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isPlayingMetronome
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                    : 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-lg shadow-amber-500/25'
                }`}
              >
                {isPlayingMetronome ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Stop Metronome</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Metronome ({bpm} BPM)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsMetronomeMuted(!isMetronomeMuted)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isMetronomeMuted
                    ? 'bg-red-950/30 border-red-800/60 text-red-400'
                    : 'bg-[#181a26] border-neutral-800 text-neutral-300 hover:text-white'
                }`}
                title={isMetronomeMuted ? 'Unmute' : 'Mute Click'}
              >
                {isMetronomeMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Tool 2: Guitar Tuner Interface (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-[#12141d] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 font-mono">
                  Standard 440Hz Tuner
                </span>
                <h3 className="text-xl font-bold text-neutral-100 font-display mt-0.5">
                  Ear Reference & Tuning Dial
                </h3>
              </div>

              {/* Tone mode toggle */}
              <button
                onClick={toggleContinuousReference}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                  continuousTone
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                    : 'bg-[#181a26] text-neutral-300 border-neutral-800 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{continuousTone ? 'Continuous: ON' : 'Continuous: OFF'}</span>
              </button>
            </div>

            {/* Visual Analog Needle Meter Display */}
            <div className="relative bg-[#0d0e15] border border-neutral-800/80 rounded-2xl p-6 text-center overflow-hidden">
              
              {/* String & Frequency readout */}
              <div className="text-4xl font-extrabold text-neutral-100 font-display">
                {stringLabels[selectedStringIndex].note}
              </div>
              <div className="text-xs text-amber-500 font-mono font-semibold mt-0.5">
                {stringLabels[selectedStringIndex].hz.toFixed(2)} Hz · Standard Concert Pitch
              </div>

              {/* Cent Dial Gauge */}
              <div className="relative mt-8 mb-4 max-w-xs mx-auto">
                {/* Arc gauge track */}
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden flex">
                  <div className="w-1/2 bg-gradient-to-r from-red-500/40 via-amber-500/40 to-emerald-500/80" />
                  <div className="w-1/2 bg-gradient-to-r from-emerald-500/80 via-amber-500/40 to-red-500/40" />
                </div>

                {/* Center In-Tune Needle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400" />

                {/* Gauge numbers */}
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-2">
                  <span>-50 Flat</span>
                  <span className="text-emerald-400 font-bold">0 In Tune</span>
                  <span>+50 Sharp</span>
                </div>
              </div>

              <div className="mt-2 text-xs text-neutral-400">
                Listening to string: <strong className="text-neutral-200">{stringLabels[selectedStringIndex].name}</strong> ({stringLabels[selectedStringIndex].desc})
              </div>
            </div>

            {/* String Selector Pegs (6 Strings: Low E to High E) */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-mono">
                Select String to Sound Reference Pitch
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {stringLabels.map((str, idx) => {
                  const isSelected = selectedStringIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectStringAndPlay(idx)}
                      className={`py-3 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md font-bold'
                          : 'bg-[#181a26] text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      <span className="text-sm font-bold block">{str.note}</span>
                      <span className="text-[10px] opacity-80 font-mono block mt-0.5">{str.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ear-Tuning Advice Box */}
            <div className="p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-xl flex items-start gap-3 text-xs text-neutral-400 leading-relaxed">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-200">How to tune by ear:</strong> Sound the reference tone above, pluck your matching guitar string, and turn the tuning peg until the vibrating waves slow down and match the pitch with no audible "beating" pulses.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
