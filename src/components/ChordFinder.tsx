import React, { useState } from 'react';
import { Volume2, Sparkles, Check, Info } from 'lucide-react';
import { CHORD_DATABASE, ROOT_NOTES, CHORD_SUFFIXES } from '../data/chords';
import { ChordDiagram } from './ChordDiagram';
import { audioManager } from '../utils/audio';

export const ChordFinder: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<string>('C');
  const [selectedSuffix, setSelectedSuffix] = useState<string>('Major');
  const [activeVariationIndex, setActiveVariationIndex] = useState<number>(0);

  // Match chord based on root and suffix
  const matchingChords = CHORD_DATABASE.filter(c => c.root === selectedRoot);
  
  // Try exact match with suffix, or fallback to first matching chord for this root
  const currentChord = matchingChords.find(c => c.suffix.toLowerCase() === selectedSuffix.toLowerCase())
    || matchingChords[0]
    || CHORD_DATABASE[0];

  const currentPosition = currentChord.positions[activeVariationIndex] || currentChord.positions[0];

  const handleRootChange = (root: string) => {
    setSelectedRoot(root);
    setActiveVariationIndex(0);
    // Find chord for new root and strum preview
    const found = CHORD_DATABASE.find(c => c.root === root && c.suffix.toLowerCase() === selectedSuffix.toLowerCase())
      || CHORD_DATABASE.find(c => c.root === root);
    if (found && found.positions[0]) {
      audioManager.strumChord(found.positions[0].frets);
    }
  };

  const handleSuffixChange = (suffix: string) => {
    setSelectedSuffix(suffix);
    setActiveVariationIndex(0);
    const found = CHORD_DATABASE.find(c => c.root === selectedRoot && c.suffix.toLowerCase() === suffix.toLowerCase());
    if (found && found.positions[0]) {
      audioManager.strumChord(found.positions[0].frets);
    }
  };

  const handleStrum = () => {
    if (currentPosition) {
      audioManager.strumChord(currentPosition.frets);
    }
  };

  return (
    <section id="chords" className="py-16 sm:py-24 border-b border-neutral-800/70 bg-[#0a0b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-500 font-mono mb-2">
            Fretboard Visualizer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Interactive Chord Finder
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-2">
            Explore fingering positions, finger numbers, muted vs open strings, and audible string strums.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Root & Quality Pickers) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Root Note Selector */}
            <div className="bg-[#12141d] border border-neutral-800 rounded-2xl p-6 shadow-md">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                1. Select Root Note
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {ROOT_NOTES.map((root) => {
                  const isAvailable = CHORD_DATABASE.some(c => c.root === root);
                  const isSelected = selectedRoot === root;
                  return (
                    <button
                      key={root}
                      onClick={() => handleRootChange(root)}
                      className={`h-11 rounded-xl font-mono text-sm font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 scale-102'
                          : isAvailable
                          ? 'bg-[#181b26] text-neutral-200 hover:bg-[#202433] hover:text-white border border-neutral-800'
                          : 'bg-[#14161f]/40 text-neutral-600 border border-neutral-850 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      {root}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chord Quality / Suffix Selector */}
            <div className="bg-[#12141d] border border-neutral-800 rounded-2xl p-6 shadow-md">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                2. Select Chord Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CHORD_SUFFIXES.map((suffix) => {
                  const existsForRoot = CHORD_DATABASE.some(
                    c => c.root === selectedRoot && c.suffix.toLowerCase() === suffix.toLowerCase()
                  );
                  const isSelected = selectedSuffix === suffix;
                  return (
                    <button
                      key={suffix}
                      onClick={() => handleSuffixChange(suffix)}
                      disabled={!existsForRoot}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 shadow-sm font-bold'
                          : existsForRoot
                          ? 'bg-[#181b26] text-neutral-300 hover:bg-[#202433] hover:text-white border border-neutral-800'
                          : 'bg-[#14161f]/30 text-neutral-600 border border-neutral-850 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      {suffix}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Variations Selector if available */}
            {currentChord.positions.length > 1 && (
              <div className="bg-[#12141d] border border-neutral-800 rounded-2xl p-6 shadow-md">
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3 font-mono">
                  3. Voicing / Variation ({currentChord.positions.length} Available)
                </label>
                <div className="space-y-2">
                  {currentChord.positions.map((pos, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveVariationIndex(idx);
                        audioManager.strumChord(pos.frets);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeVariationIndex === idx
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/50'
                          : 'bg-[#181b26] text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                      }`}
                    >
                      <span>{pos.variationName || `Voicing ${idx + 1}`}</span>
                      {activeVariationIndex === idx && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Chord Display Card (Right Column) */}
          <div className="lg:col-span-6 bg-[#131520] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            {/* Chord Header */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
              <div>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 font-display">
                    {currentChord.name}
                  </h3>
                  <span className="text-sm text-neutral-400 font-medium">
                    {currentChord.root} {currentChord.suffix}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1 font-mono">
                  <span>Notes: {currentChord.notes.join(' · ')}</span>
                  <span aria-hidden="true">·</span>
                  <span className={currentChord.difficulty === 'Beginner' ? 'text-emerald-400' : 'text-amber-400'}>
                    {currentChord.difficulty}
                  </span>
                </div>
              </div>

              {/* Large Strum Button */}
              <button
                onClick={handleStrum}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 fill-current" />
                <span>Hear Chord</span>
              </button>
            </div>

            {/* Diagram Center */}
            <div className="py-6 flex flex-col items-center">
              <ChordDiagram
                chordName={currentChord.name}
                position={currentPosition}
                size="lg"
                showSoundButton={false}
              />
            </div>

            {/* Legend / Reading Guide */}
            <div className="border-t border-neutral-800/80 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-neutral-400">
              <div className="bg-[#181a26] p-2 rounded-lg border border-neutral-800/60">
                <span className="text-red-400 font-bold block mb-0.5">✕</span>
                <span className="text-[11px] text-neutral-400">Muted String</span>
              </div>
              <div className="bg-[#181a26] p-2 rounded-lg border border-neutral-800/60">
                <span className="text-neutral-200 font-bold block mb-0.5">○</span>
                <span className="text-[11px] text-neutral-400">Open String</span>
              </div>
              <div className="bg-[#181a26] p-2 rounded-lg border border-neutral-800/60">
                <span className="text-amber-400 font-bold block mb-0.5">1 2 3 4</span>
                <span className="text-[11px] text-neutral-400">Finger Number</span>
              </div>
              <div className="bg-[#181a26] p-2 rounded-lg border border-neutral-800/60">
                <span className="text-amber-500 font-bold block mb-0.5">fr</span>
                <span className="text-[11px] text-neutral-400">Fret Number</span>
              </div>
            </div>

            {/* Pro Tip */}
            {currentChord.tip && (
              <div className="mt-5 p-3.5 bg-neutral-900/80 border border-neutral-800 rounded-xl flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-amber-400">Player Tip:</strong> {currentChord.tip}
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
