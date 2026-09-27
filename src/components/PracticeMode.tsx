import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Plus, Minus, ArrowRight, CheckCircle2, Maximize2, Minimize2, Sparkles, BookOpen } from 'lucide-react';
import { Song } from '../types/guitar';
import { DEMO_SONGS } from '../data/songs';
import { CHORD_DATABASE } from '../data/chords';
import { ChordDiagram } from './ChordDiagram';
import { audioManager } from '../utils/audio';

interface PracticeModeProps {
  initialSong?: Song | null;
  initialProgression?: { name: string; key: string; chords: string[] } | null;
  onClose?: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  initialSong = null,
  initialProgression = null,
  onClose
}) => {
  // Practice Type: 'song' | 'progression' | 'switching'
  const [practiceType, setPracticeType] = useState<'song' | 'progression' | 'switching'>('song');
  const [selectedSong, setSelectedSong] = useState<Song>(initialSong || DEMO_SONGS[0]);
  const [activeProgression, setActiveProgression] = useState<{ name: string; chords: string[] }>(
    initialProgression
      ? { name: initialProgression.name, chords: initialProgression.chords }
      : { name: '4-Chord Classic', chords: ['G', 'D', 'Em', 'C'] }
  );

  // Switching drill pair
  const [drillChords, setDrillChords] = useState<[string, string]>(['G', 'C']);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(300); // 5 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [initialDuration, setInitialDuration] = useState<number>(300);

  // Metronome state
  const [bpm, setBpm] = useState<number>(selectedSong.bpm || 80);
  const [isMetronomePlaying, setIsMetronomePlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [timeSignature, setTimeSignature] = useState<number>(4); // 4/4 or 3/4
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // Active flashcard chord in rotation
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);

  // Metronome Interval Ref
  const metronomeRef = useRef<NodeJS.Timeout | null>(null);

  // Update when initial props change
  useEffect(() => {
    if (initialSong) {
      setSelectedSong(initialSong);
      setBpm(initialSong.bpm);
      setPracticeType('song');
    } else if (initialProgression) {
      setActiveProgression({ name: initialProgression.name, chords: initialProgression.chords });
      setPracticeType('progression');
    }
  }, [initialSong, initialProgression]);

  // Metronome Sound & Pulse Loop
  useEffect(() => {
    if (!isMetronomePlaying) {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
      setCurrentBeat(0);
      return;
    }

    const intervalMs = (60 / bpm) * 1000;
    let beatCount = 0;

    metronomeRef.current = setInterval(() => {
      const isAccent = beatCount % timeSignature === 0;
      if (!isSoundMuted) {
        audioManager.playMetronomeClick(isAccent);
      }
      setCurrentBeat(beatCount % timeSignature);
      beatCount++;
    }, intervalMs);

    return () => {
      if (metronomeRef.current) clearInterval(metronomeRef.current);
    };
  }, [isMetronomePlaying, bpm, timeSignature, isSoundMuted]);

  // Practice Timer Countdown Loop
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          setIsMetronomePlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    // Auto-sync metronome with timer start
    if (!isTimerRunning && !isMetronomePlaying) {
      setIsMetronomePlaying(true);
    }
  };

  const resetTimer = (newDuration?: number) => {
    setIsTimerRunning(false);
    const dur = newDuration !== undefined ? newDuration : initialDuration;
    setTimerSeconds(dur);
    if (newDuration !== undefined) {
      setInitialDuration(newDuration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper to find chord data
  const getChordData = (name: string) => {
    return CHORD_DATABASE.find(c => c.name.toLowerCase() === name.toLowerCase()) || CHORD_DATABASE[0];
  };

  // Current list of practice chords
  const practiceChords = practiceType === 'song'
    ? selectedSong.chords
    : practiceType === 'progression'
    ? activeProgression.chords
    : [drillChords[0], drillChords[1]];

  const currentChordName = practiceChords[activeFlashcardIndex % practiceChords.length] || 'G';
  const currentChordData = getChordData(currentChordName);

  return (
    <section id="practice" className={`py-16 sm:py-24 border-b border-neutral-800/70 transition-all ${
      isZenMode ? 'fixed inset-0 z-50 bg-[#090a0f] py-6 sm:py-8 overflow-y-auto' : 'bg-[#0b0c12]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Practice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-amber-500 font-mono mb-1">
              <span>Distraction-Free Guitar Suite</span>
              <span aria-hidden="true">·</span>
              <span>Calm Focus</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Practice Mode
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsZenMode(!isZenMode)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {isZenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isZenMode ? 'Exit Zen Mode' : 'Focus Mode'}</span>
            </button>

            {isZenMode && onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg"
              >
                Close
              </button>
            )}
          </div>
        </div>

        {/* Practice Routine Selector Tabs (Allowed Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1 bg-[#12141d] border border-neutral-800 rounded-xl w-fit">
          <button
            onClick={() => {
              setPracticeType('song');
              setActiveFlashcardIndex(0);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              practiceType === 'song'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Song Repertoire
          </button>
          <button
            onClick={() => {
              setPracticeType('progression');
              setActiveFlashcardIndex(0);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              practiceType === 'progression'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Progression Loop
          </button>
          <button
            onClick={() => {
              setPracticeType('switching');
              setActiveFlashcardIndex(0);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              practiceType === 'switching'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            1-Min Chord Switch Drill
          </button>
        </div>

        {/* Practice Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Flashcard & Chord View (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#131522] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[460px]">
            
            {/* Top routine context */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs text-neutral-400 font-mono">
                  {practiceType === 'song' ? `Song: ${selectedSong.title}` : practiceType === 'progression' ? activeProgression.name : 'Quick Transition Switch'}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="text-xl font-bold text-neutral-100 font-display">
                    Target Chord: <span className="text-amber-400">{currentChordName}</span>
                  </h3>
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-1.5">
                {practiceChords.map((chord, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFlashcardIndex(idx)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                      activeFlashcardIndex % practiceChords.length === idx
                        ? 'bg-amber-500 text-neutral-950 scale-105'
                        : 'bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {chord}
                  </button>
                ))}
              </div>
            </div>

            {/* Fretboard Diagram Center */}
            <div className="py-6 flex flex-col items-center">
              {currentChordData && currentChordData.positions[0] && (
                <ChordDiagram
                  chordName={currentChordName}
                  position={currentChordData.positions[0]}
                  size="lg"
                  showSoundButton={true}
                />
              )}
            </div>

            {/* Next / Previous Chord Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80">
              <button
                onClick={() => setActiveFlashcardIndex(prev => (prev > 0 ? prev - 1 : practiceChords.length - 1))}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                ← Previous Chord
              </button>

              <span className="text-xs text-neutral-500 font-mono">
                {((activeFlashcardIndex % practiceChords.length) + 1)} of {practiceChords.length}
              </span>

              <button
                onClick={() => setActiveFlashcardIndex(prev => prev + 1)}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors font-bold"
              >
                Next Chord →
              </button>
            </div>

          </div>

          {/* Controls: Timer & Metronome (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Practice Timer Card */}
            <div className="bg-[#131522] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 font-mono">
                  Practice Timer
                </span>
                <div className="flex items-center gap-1.5">
                  {[300, 600, 900, 1200].map((dur) => (
                    <button
                      key={dur}
                      onClick={() => resetTimer(dur)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded ${
                        initialDuration === dur
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {dur / 60}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Digital Clock Display */}
              <div className="text-center py-2">
                <div className="text-5xl sm:text-6xl font-extrabold font-mono tracking-tight text-neutral-100 tabular-nums">
                  {formatTime(timerSeconds)}
                </div>
                <span className="text-xs text-neutral-500 mt-1 block">
                  {isTimerRunning ? 'Session active · stay in the pocket' : 'Paused · ready when you are'}
                </span>
              </div>

              {/* Timer Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTimer}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/60 hover:bg-amber-500/30'
                      : 'bg-amber-500 text-neutral-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Session</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Start Practice</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => resetTimer()}
                  className="p-3 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-xl hover:bg-neutral-800 transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Integrated Metronome Card */}
            <div className="bg-[#131522] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400 font-mono">
                  Integrated Metronome
                </span>
                
                {/* Sound mute toggle */}
                <button
                  onClick={() => setIsSoundMuted(!isSoundMuted)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    isSoundMuted
                      ? 'bg-red-950/40 border-red-800/60 text-red-400'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                  title={isSoundMuted ? 'Unmute Metronome' : 'Mute Click Sound'}
                >
                  {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* BPM readout & slider */}
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-neutral-100 font-mono tabular-nums">{bpm}</span>
                  <span className="text-xs text-neutral-400 font-medium">BPM</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setBpm(Math.max(40, bpm - 5))}
                    className="p-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setBpm(Math.min(220, bpm + 5))}
                    className="p-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="40"
                max="220"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />

              {/* Visual Beat Indicator Dots */}
              <div className="flex items-center justify-center gap-3 pt-2">
                {Array.from({ length: timeSignature }).map((_, i) => {
                  const isActive = isMetronomePlaying && currentBeat === i;
                  const isAccent = i === 0;
                  return (
                    <div
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-100 ${
                        isActive
                          ? isAccent
                            ? 'bg-amber-400 scale-135 shadow-md shadow-amber-400/80 ring-2 ring-amber-300'
                            : 'bg-amber-500 scale-120 shadow-md shadow-amber-500/60'
                          : 'bg-neutral-800 border border-neutral-700'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Metronome Play/Stop Button */}
              <button
                onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isMetronomePlaying
                    ? 'bg-neutral-800 text-amber-400 border border-amber-500/40 hover:bg-neutral-700'
                    : 'bg-neutral-900 text-neutral-200 border border-neutral-800 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                {isMetronomePlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Click</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-amber-500" />
                    <span>Start Click ({bpm} BPM)</span>
                  </>
                )}
              </button>
            </div>

            {/* Practice Step Guide Instructions */}
            <div className="bg-[#131522] border border-neutral-800 rounded-2xl p-5 text-xs space-y-3">
              <span className="font-semibold text-neutral-300 block font-mono uppercase tracking-wider text-[11px]">
                Recommended 4-Step Routine:
              </span>
              <ul className="space-y-2 text-neutral-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">1.</span>
                  <span><strong>Shape Memory:</strong> Place fingers down together at once rather than one-by-one.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">2.</span>
                  <span><strong>Clarity Test:</strong> Pluck each string individually to verify no buzzing or muted notes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">3.</span>
                  <span><strong>Slow Sync:</strong> Start with the metronome at 60 BPM and switch on beat 1.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">4.</span>
                  <span><strong>Rhythm Lock:</strong> Gradually increase tempo by 5 BPM once transitions feel effortless.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
