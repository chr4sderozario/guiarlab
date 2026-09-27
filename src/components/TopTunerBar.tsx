import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, X, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface TopTunerBarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const TopTunerBar: React.FC<TopTunerBarProps> = ({ isOpen, onToggle }) => {
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null);
  const [continuousTone, setContinuousTone] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const strings = [
    { index: 0, label: '6th', note: 'E2', hz: 82.41, fullName: 'Low E' },
    { index: 1, label: '5th', note: 'A2', hz: 110.00, fullName: 'A' },
    { index: 2, label: '4th', note: 'D3', hz: 146.83, fullName: 'D' },
    { index: 3, label: '3rd', note: 'G3', hz: 196.00, fullName: 'G' },
    { index: 4, label: '2nd', note: 'B3', hz: 246.94, fullName: 'B' },
    { index: 5, label: '1st', note: 'E4', hz: 329.63, fullName: 'High E' },
  ];

  // Stop sound if unmounted
  useEffect(() => {
    return () => {
      audioManager.stopContinuousTone();
    };
  }, []);

  const playStringPitch = (idx: number) => {
    setActiveStringIndex(idx);
    setIsPlaying(true);
    audioManager.playTuningReference(idx, continuousTone);
    if (!continuousTone) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 2500);
    }
  };

  const handleToggleContinuous = () => {
    const nextState = !continuousTone;
    setContinuousTone(nextState);
    if (activeStringIndex !== null) {
      if (nextState) {
        audioManager.playTuningReference(activeStringIndex, true);
        setIsPlaying(true);
      } else {
        audioManager.stopContinuousTone();
        setIsPlaying(false);
      }
    }
  };

  const stopAllSound = () => {
    audioManager.stopContinuousTone();
    setIsPlaying(false);
    setActiveStringIndex(null);
  };

  return (
    <div className="w-full bg-[#0d0f17] border-b border-neutral-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Tuner Bar Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Music className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-neutral-100 font-display">
                Quick Guitar Tuner
              </span>
              <span className="hidden sm:inline text-[11px] text-neutral-400 font-mono">
                Standard E-A-D-G-B-E (440 Hz)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Continuous Hold Mode Toggle */}
            <button
              onClick={handleToggleContinuous}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                continuousTone
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                  : 'bg-[#151824] text-neutral-300 border-neutral-800 hover:text-white'
              }`}
              title="Hold reference tone continuously to keep hands free"
            >
              <Radio className="w-3 h-3" />
              <span className="whitespace-nowrap">{continuousTone ? 'Continuous: ON' : 'Continuous: OFF'}</span>
            </button>

            {/* Stop Audio Button if playing */}
            {isPlaying && (
              <button
                onClick={stopAllSound}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/50 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <VolumeX className="w-3 h-3" />
                <span className="hidden sm:inline">Mute</span>
              </button>
            )}

            {/* Collapse/Expand button */}
            <button
              onClick={onToggle}
              className="p-1 text-neutral-400 hover:text-neutral-100 rounded hover:bg-neutral-800 transition-colors ml-1 cursor-pointer"
              title={isOpen ? 'Minimize Tuner' : 'Expand Tuner'}
              aria-label="Toggle Tuner Bar"
            >
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 6 String Pegs (Visible when open) */}
        {isOpen && (
          <div className="mt-3 pt-3 border-t border-neutral-800/80">
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {strings.map((str) => {
                const isCurrentActive = activeStringIndex === str.index && isPlaying;
                return (
                  <button
                    key={str.index}
                    onClick={() => playStringPitch(str.index)}
                    className={`group relative py-2.5 px-1 sm:px-3 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center ${
                      isCurrentActive
                        ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/25 scale-[1.02]'
                        : 'bg-[#151824] text-neutral-200 border-neutral-800 hover:border-amber-500/40 hover:bg-[#1c2030]'
                    }`}
                  >
                    {/* String note label */}
                    <span className="text-base sm:text-lg font-extrabold font-display leading-tight">
                      {str.note}
                    </span>

                    {/* String number & Hz */}
                    <div className="flex items-center gap-1 text-[10px] sm:text-[11px] opacity-80 font-mono mt-0.5">
                      <span>{str.label}</span>
                      <span className="hidden md:inline">· {Math.round(str.hz)}Hz</span>
                    </div>

                    {/* Acoustic Sound Wave Pulse Indicator */}
                    {isCurrentActive && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick helper caption */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-400">
              <span>Click any string to sound reference pitch. Match your guitar string until pitch beating stops.</span>
              {activeStringIndex !== null && (
                <span className="text-amber-400 font-mono font-medium shrink-0">
                  Sounding {strings[activeStringIndex].fullName} ({strings[activeStringIndex].hz.toFixed(2)} Hz)
                </span>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
