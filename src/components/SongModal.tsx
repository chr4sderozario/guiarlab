import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Volume2, ArrowDown, ArrowUp, Minus, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { Song, ChordPosition } from '../types/guitar';
import { CHORD_DATABASE } from '../data/chords';
import { ChordDiagram } from './ChordDiagram';
import { audioManager } from '../utils/audio';

interface SongModalProps {
  song: Song | null;
  onClose: () => void;
  onPracticeSong: (song: Song) => void;
}

export const SongModal: React.FC<SongModalProps> = ({
  song,
  onClose,
  onPracticeSong
}) => {
  const [selectedChordName, setSelectedChordName] = useState<string | null>(null);
  const [transposeOffset, setTransposeOffset] = useState<number>(0);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState<number>(0); // 0 = off, 1 = slow, 2 = med, 3 = fast
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset transpose and scroll when song changes
    setTransposeOffset(0);
    setAutoScrollSpeed(0);
    if (song && song.chords.length > 0) {
      setSelectedChordName(song.chords[0]);
    }
  }, [song]);

  // Auto-scroll loop
  useEffect(() => {
    if (autoScrollSpeed === 0 || !contentRef.current) return;
    const interval = setInterval(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop += autoScrollSpeed * 0.8;
      }
    }, 40);
    return () => clearInterval(interval);
  }, [autoScrollSpeed]);

  if (!song) return null;

  // Find chord data helper
  const getChordData = (name: string) => {
    const clean = name.trim();
    return CHORD_DATABASE.find(c => c.name.toLowerCase() === clean.toLowerCase()) || CHORD_DATABASE[0];
  };

  const activeChordData = selectedChordName ? getChordData(selectedChordName) : getChordData(song.chords[0]);

  // Transpose note helper
  const semitones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const transposeChord = (chord: string, offset: number): string => {
    if (offset === 0) return chord;
    // Extract root
    const match = chord.match(/^([A-G][#b]?)(.*)$/);
    if (!match) return chord;
    let root = match[1];
    const modifier = match[2];

    if (root === 'Bb') root = 'A#';
    if (root === 'Eb') root = 'D#';
    if (root === 'Ab') root = 'G#';
    if (root === 'Db') root = 'C#';

    const index = semitones.indexOf(root);
    if (index === -1) return chord;
    const newIndex = (index + offset + 24) % 12;
    return semitones[newIndex] + modifier;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#11131c] border border-neutral-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-[#151722]/80">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100" style={{ fontFamily: 'var(--font-display)' }}>
                {song.title}
              </h2>
              <span className={`text-xs px-2.5 py-0.5 rounded font-medium ${
                song.difficulty === 'Beginner'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  : 'bg-amber-950 text-amber-400 border border-amber-800/60'
              }`}>
                {song.difficulty}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              by <span className="text-neutral-300 font-medium">{song.artist}</span>
              <span className="mx-2">·</span>
              Key: <span className="text-amber-400 font-semibold">{transposeChord(song.key, transposeOffset)}</span>
              <span className="mx-2">·</span>
              Tuning: {song.tuning}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onPracticeSong(song)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Practice Mode</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close song"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Controls Toolbar (Transpose, Auto-scroll, Capo) */}
        <div className="px-6 py-2.5 bg-[#0e1017] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
          
          {/* Capo & Tempo Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500 font-medium">Capo:</span>
              <span className="font-semibold text-neutral-200">
                {song.capo === 0 ? 'No Capo (Open)' : `Fret ${song.capo}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500 font-medium">Tempo:</span>
              <span className="font-semibold text-neutral-200 font-mono">{song.bpm} BPM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500 font-medium">Meter:</span>
              <span className="font-semibold text-neutral-200">{song.timeSignature}</span>
            </div>
          </div>

          {/* Action controls: Transpose & Autoscroll */}
          <div className="flex items-center gap-4">
            
            {/* Transpose */}
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1">
              <span className="text-neutral-400">Transpose:</span>
              <button
                onClick={() => setTransposeOffset(prev => prev - 1)}
                className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded"
                title="Pitch down 1 semitone"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono font-semibold text-amber-400 px-1">
                {transposeOffset > 0 ? `+${transposeOffset}` : transposeOffset}
              </span>
              <button
                onClick={() => setTransposeOffset(prev => prev + 1)}
                className="w-5 h-5 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 rounded"
                title="Pitch up 1 semitone"
              >
                +
              </button>
              {transposeOffset !== 0 && (
                <button
                  onClick={() => setTransposeOffset(0)}
                  className="ml-1 text-[10px] text-neutral-500 hover:text-neutral-300"
                  title="Reset transpose"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Auto-scroll */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1">
              <span className="text-neutral-400">Auto-Scroll:</span>
              {[0, 1, 2, 3].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setAutoScrollSpeed(speed)}
                  className={`px-1.5 py-0.5 rounded font-mono text-[11px] ${
                    autoScrollSpeed === speed
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {speed === 0 ? 'Off' : `${speed}x`}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Modal Body: Left: Chords & Strumming, Right: Song Chart */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Interactive Chord Inspector & Strumming Pattern */}
          <div className="md:col-span-5 border-r border-neutral-800 bg-[#0f111a] p-5 overflow-y-auto space-y-6">
            
            {/* Chords Used in this song */}
            <div>
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 font-mono">
                Song Chords (Click to Inspect & Strum)
              </div>
              <div className="flex flex-wrap gap-2">
                {song.chords.map((chord) => {
                  const transposed = transposeChord(chord, transposeOffset);
                  const isSelected = selectedChordName === chord;
                  return (
                    <button
                      key={chord}
                      onClick={() => {
                        setSelectedChordName(chord);
                        const cData = getChordData(chord);
                        if (cData.positions[0]) {
                          audioManager.strumChord(cData.positions[0].frets);
                        }
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm'
                          : 'bg-[#181a24] text-neutral-200 border-neutral-800 hover:border-neutral-700 hover:text-white'
                      }`}
                    >
                      {transposed}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Chord Diagram */}
            {activeChordData && activeChordData.positions[0] && (
              <div className="bg-[#141620] border border-neutral-800/80 rounded-xl p-4 flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-base font-bold text-neutral-100">
                    {transposeChord(activeChordData.name, transposeOffset)} Chord
                  </span>
                  <span className="text-[11px] text-amber-500 font-mono">
                    {activeChordData.notes.join(' · ')}
                  </span>
                </div>

                <ChordDiagram
                  chordName={activeChordData.name}
                  position={activeChordData.positions[0]}
                  size="md"
                  showSoundButton={true}
                />

                {activeChordData.tip && (
                  <p className="mt-3 text-[11px] text-neutral-400 text-center leading-normal italic bg-neutral-900/60 p-2 rounded border border-neutral-800/60">
                    Tip: {activeChordData.tip}
                  </p>
                )}
              </div>
            )}

            {/* Strumming Pattern Card */}
            <div className="bg-[#141620] border border-neutral-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-300">
                  Strumming: {song.strumming.name}
                </span>
                <span className="text-[11px] font-mono text-amber-400 font-bold">
                  {song.strumming.notation}
                </span>
              </div>

              {/* Stroke direction visual arrows */}
              <div className="flex items-center gap-1.5 pt-1">
                {song.strumming.strokes.map((stroke, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 flex flex-col items-center py-2 px-1 rounded border text-xs font-bold ${
                      stroke === 'D'
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                        : stroke === 'U'
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-600'
                    }`}
                  >
                    {stroke === 'D' ? (
                      <>
                        <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="text-[10px] mt-0.5">DOWN</span>
                      </>
                    ) : stroke === 'U' ? (
                      <>
                        <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span className="text-[10px] mt-0.5">UP</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm leading-none">—</span>
                        <span className="text-[10px] mt-0.5">REST</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {song.strumming.description && (
                <p className="text-[11px] text-neutral-400 pt-1 leading-relaxed">
                  {song.strumming.description}
                </p>
              )}
            </div>

            {/* Main Chord Progression */}
            <div className="bg-[#141620] border border-neutral-800/80 rounded-xl p-3">
              <span className="text-xs font-semibold text-neutral-400 block mb-2">
                Main Chord Progression:
              </span>
              <div className="flex items-center gap-2">
                {song.progression.map((chord, i) => (
                  <React.Fragment key={i}>
                    <span className="px-2.5 py-1 text-xs font-mono font-bold text-amber-300 bg-neutral-900 rounded border border-neutral-800">
                      {transposeChord(chord, transposeOffset)}
                    </span>
                    {i < song.progression.length - 1 && (
                      <span className="text-neutral-500 text-xs">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Song Lyric & Chord Sheet */}
          <div
            ref={contentRef}
            className="md:col-span-7 p-6 sm:p-8 overflow-y-auto space-y-6 max-h-[70vh] bg-[#0c0d13]"
          >
            {song.notes && (
              <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-lg text-xs text-amber-200/90 leading-relaxed">
                <strong>Guitarist Note:</strong> {song.notes}
              </div>
            )}

            <div className="space-y-6 font-mono text-sm">
              {song.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500 border-b border-neutral-800 pb-1 font-sans">
                    <span>{section.title || section.type}</span>
                  </div>

                  <div className="space-y-4 pl-1 sm:pl-2">
                    {section.lines.map((line, lIdx) => (
                      <div key={lIdx} className="space-y-1">
                        {/* Chord Line */}
                        <div className="text-amber-400 font-bold text-xs sm:text-sm tracking-wide h-4 flex gap-6">
                          {line.chords.map((c, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => {
                                setSelectedChordName(c.chord);
                                const cData = getChordData(c.chord);
                                if (cData.positions[0]) {
                                  audioManager.strumChord(cData.positions[0].frets);
                                }
                              }}
                              className="hover:underline hover:text-amber-300 transition-colors text-left"
                            >
                              [{transposeChord(c.chord, transposeOffset)}]
                            </button>
                          ))}
                        </div>

                        {/* Lyrics Line */}
                        <div className="text-neutral-200 text-sm sm:text-base font-sans tracking-normal leading-relaxed">
                          {line.lyrics}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-neutral-800 text-center">
              <button
                onClick={() => onPracticeSong(song)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Open in Practice Mode</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
