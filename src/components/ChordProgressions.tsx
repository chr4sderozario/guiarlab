import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import { COMMON_PROGRESSIONS, SCALE_DEGREES_BY_KEY, AVAILABLE_KEYS } from '../data/progressions';
import { CHORD_DATABASE } from '../data/chords';
import { ChordDiagram } from './ChordDiagram';
import { audioManager } from '../utils/audio';

interface ChordProgressionsProps {
  onPracticeProgression?: (progression: { name: string; key: string; chords: string[] }) => void;
}

export const ChordProgressions: React.FC<ChordProgressionsProps> = ({
  onPracticeProgression
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('G');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(COMMON_PROGRESSIONS[0].id);
  const [isPlayingProgression, setIsPlayingProgression] = useState<boolean>(false);
  const [activePlayingIndex, setActivePlayingIndex] = useState<number>(-1);
  const [tempo, setTempo] = useState<number>(80);

  const activePattern = COMMON_PROGRESSIONS.find(p => p.id === selectedPatternId) || COMMON_PROGRESSIONS[0];

  // Calculate actual chords for active progression pattern in selected key
  const keyScaleDegrees = SCALE_DEGREES_BY_KEY[selectedKey] || SCALE_DEGREES_BY_KEY['G'];
  const progressionChords = activePattern.roman.map(romanNumeral => keyScaleDegrees[romanNumeral] || romanNumeral);

  // Helper to find chord data for diagrams
  const getChordData = (name: string) => {
    return CHORD_DATABASE.find(c => c.name.toLowerCase() === name.toLowerCase()) || CHORD_DATABASE[0];
  };

  // Play progression loop with Web Audio
  useEffect(() => {
    if (!isPlayingProgression) {
      setActivePlayingIndex(-1);
      return;
    }

    let currentIndex = 0;
    const intervalMs = (60 / tempo) * 1000 * 2; // 2 beats per chord

    const playChordStep = (idx: number) => {
      setActivePlayingIndex(idx);
      const chordName = progressionChords[idx];
      const chordData = getChordData(chordName);
      if (chordData && chordData.positions[0]) {
        audioManager.strumChord(chordData.positions[0].frets, 'down', 0.038);
      }
    };

    // Play first step immediately
    playChordStep(0);

    const timer = setInterval(() => {
      currentIndex = (currentIndex + 1) % progressionChords.length;
      playChordStep(currentIndex);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlayingProgression, progressionChords, tempo]);

  const togglePlayback = () => {
    setIsPlayingProgression(prev => !prev);
  };

  return (
    <section id="progressions" className="py-16 sm:py-24 border-b border-neutral-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-500 font-mono mb-2">
            Harmonic Roadmaps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Chord Progression Explorer
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            The secret to learning thousands of songs: mastering the core chord movement formulas. Transpose to any key instantly.
          </p>
        </div>

        {/* Top Control Bar: Key Selector & Pattern Selector */}
        <div className="bg-[#12141c] border border-neutral-800 rounded-2xl p-6 mb-8 shadow-lg space-y-6">
          
          {/* Key Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                Select Key (Root Tonic)
              </label>
              <span className="text-xs text-amber-400 font-mono">
                Current Key: <strong className="text-base text-white">{selectedKey}</strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {AVAILABLE_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedKey(key);
                    setIsPlayingProgression(false);
                  }}
                  className={`px-4 py-2 rounded-xl font-mono text-sm font-bold transition-all cursor-pointer ${
                    selectedKey === key
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                      : 'bg-[#181a24] text-neutral-300 hover:text-white hover:bg-[#222533] border border-neutral-800'
                  }`}
                >
                  Key of {key}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern Presets */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5 font-mono">
              Select Progression Pattern
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COMMON_PROGRESSIONS.map((pat) => {
                const isSelected = selectedPatternId === pat.id;
                return (
                  <button
                    key={pat.id}
                    onClick={() => {
                      setSelectedPatternId(pat.id);
                      setIsPlayingProgression(false);
                    }}
                    className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/70 text-neutral-100 shadow-sm'
                        : 'bg-[#161824] border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-neutral-100">
                        {pat.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {pat.roman.join(' - ')}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {pat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Active Progression Display & Playback Strip */}
        <div className="bg-[#141622] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <span>{activePattern.genre}</span>
                <span aria-hidden="true">·</span>
                <span>{activePattern.famousFor}</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-100 mt-1 font-display">
                {activePattern.name} in Key of {selectedKey}
              </h3>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg text-xs">
                <span className="text-neutral-400">Tempo:</span>
                <span className="font-mono font-bold text-amber-400">{tempo} BPM</span>
                <input
                  type="range"
                  min="50"
                  max="140"
                  value={tempo}
                  onChange={(e) => setTempo(Number(e.target.value))}
                  className="w-20 accent-amber-500"
                />
              </div>

              <button
                onClick={togglePlayback}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isPlayingProgression
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/30'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700'
                }`}
              >
                {isPlayingProgression ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Playback</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>Play Progression</span>
                  </>
                )}
              </button>

              {onPracticeProgression && (
                <button
                  onClick={() => onPracticeProgression({
                    name: `${activePattern.name} (Key of ${selectedKey})`,
                    key: selectedKey,
                    chords: progressionChords
                  })}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  Practice This Routine
                </button>
              )}
            </div>
          </div>

          {/* Roman Numerals & Chords Flow */}
          <div className="py-6">
            <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-6">
              {activePattern.roman.map((roman, idx) => {
                const chordName = progressionChords[idx];
                const isCurrentlyPlaying = activePlayingIndex === idx;

                return (
                  <React.Fragment key={idx}>
                    <div
                      className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-200 min-w-[90px] sm:min-w-[120px] ${
                        isCurrentlyPlaying
                          ? 'bg-amber-500/20 border-amber-500 scale-105 shadow-lg shadow-amber-500/20'
                          : 'bg-[#181a26] border-neutral-800'
                      }`}
                    >
                      <span className="text-xs font-mono text-neutral-400 font-semibold mb-1">
                        Step {idx + 1} ({roman})
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-neutral-100 font-display">
                        {chordName}
                      </span>
                      <button
                        onClick={() => {
                          const cData = getChordData(chordName);
                          if (cData.positions[0]) {
                            audioManager.strumChord(cData.positions[0].frets);
                          }
                        }}
                        className="mt-2 text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Strum</span>
                      </button>
                    </div>

                    {idx < activePattern.roman.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-neutral-600 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Chord Diagrams Row */}
          <div className="pt-6 border-t border-neutral-800/80">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono block mb-4 text-center">
              Fingering Diagrams for this Progression
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
              {progressionChords.map((chordName, idx) => {
                const cData = getChordData(chordName);
                if (!cData || !cData.positions[0]) return null;
                const isCurrentlyPlaying = activePlayingIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`bg-[#12141e] border rounded-xl p-3 flex flex-col items-center transition-all ${
                      isCurrentlyPlaying ? 'border-amber-500/80 bg-amber-500/5' : 'border-neutral-800'
                    }`}
                  >
                    <span className="text-sm font-bold text-neutral-200 mb-1">{chordName}</span>
                    <ChordDiagram
                      chordName={chordName}
                      position={cData.positions[0]}
                      size="sm"
                      showSoundButton={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
