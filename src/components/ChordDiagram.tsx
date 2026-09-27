import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { ChordPosition } from '../types/guitar';
import { audioManager } from '../utils/audio';

interface ChordDiagramProps {
  chordName: string;
  position: ChordPosition;
  size?: 'sm' | 'md' | 'lg';
  showSoundButton?: boolean;
  className?: string;
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({
  chordName,
  position,
  size = 'md',
  showSoundButton = true,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const baseFret = position.baseFret || 1;
  const numFrets = 5;
  const numStrings = 6;
  const stringNames = ['E', 'A', 'D', 'G', 'B', 'e'];

  // Dimensions based on size
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1.0;
  const width = 160 * scale;
  const height = 180 * scale;

  const leftMargin = 30 * scale;
  const rightMargin = 22 * scale;
  const topMargin = 38 * scale;
  const bottomMargin = 24 * scale;

  const fretboardWidth = width - leftMargin - rightMargin;
  const fretboardHeight = height - topMargin - bottomMargin;

  const stringSpacing = fretboardWidth / (numStrings - 1);
  const fretSpacing = fretboardHeight / numFrets;

  const handleStrum = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlaying(true);
    audioManager.strumChord(position.frets);
    setTimeout(() => setIsPlaying(false), 800);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="relative group">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
        >
          {/* Top Nut or Fret Position Indicator */}
          {baseFret === 1 ? (
            <line
              x1={leftMargin}
              y1={topMargin}
              x2={leftMargin + fretboardWidth}
              y2={topMargin}
              stroke="#f59e0b"
              strokeWidth={5 * scale}
              strokeLinecap="round"
            />
          ) : (
            <text
              x={leftMargin - 8 * scale}
              y={topMargin + fretSpacing / 2 + 4 * scale}
              fill="#f59e0b"
              fontSize={11 * scale}
              fontWeight="700"
              fontFamily="var(--font-mono)"
              textAnchor="end"
            >
              {baseFret}fr
            </text>
          )}

          {/* Fretboard background */}
          <rect
            x={leftMargin}
            y={topMargin}
            width={fretboardWidth}
            height={fretboardHeight}
            fill="#12141c"
            rx={2}
          />

          {/* Horizontal Frets */}
          {Array.from({ length: numFrets + 1 }).map((_, i) => (
            <line
              key={`fret-${i}`}
              x1={leftMargin}
              y1={topMargin + i * fretSpacing}
              x2={leftMargin + fretboardWidth}
              y2={topMargin + i * fretSpacing}
              stroke="#2e3346"
              strokeWidth={i === 0 && baseFret === 1 ? 0 : 1.5 * scale}
            />
          ))}

          {/* Vertical Strings (low E to high E, with realistic gauge variations) */}
          {Array.from({ length: numStrings }).map((_, i) => {
            const x = leftMargin + i * stringSpacing;
            // String gauge: 6th string thicker (2.4px) down to 1st string (1.0px)
            const strokeWidth = (2.4 - i * 0.25) * scale;
            return (
              <line
                key={`string-${i}`}
                x1={x}
                y1={topMargin}
                x2={x}
                y2={topMargin + fretboardHeight}
                stroke="#64748b"
                strokeWidth={Math.max(1, strokeWidth)}
              />
            );
          })}

          {/* Muted (X) and Open (O) indicators above strings */}
          {position.frets.map((fret, stringIdx) => {
            const x = leftMargin + stringIdx * stringSpacing;
            const y = topMargin - 12 * scale;

            if (fret === -1) {
              return (
                <text
                  key={`marker-${stringIdx}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ef4444"
                  fontSize={12 * scale}
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  ✕
                </text>
              );
            }
            if (fret === 0) {
              return (
                <circle
                  key={`marker-${stringIdx}`}
                  cx={x}
                  cy={y}
                  r={4 * scale}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth={1.5 * scale}
                />
              );
            }
            return null;
          })}

          {/* Barre chords rendering */}
          {position.barres && position.barres.length > 0 && position.barres.map((barreFret, idx) => {
            const fretRelative = barreFret - baseFret + 1;
            if (fretRelative >= 1 && fretRelative <= numFrets) {
              const y = topMargin + (fretRelative - 0.5) * fretSpacing;
              return (
                <rect
                  key={`barre-${idx}`}
                  x={leftMargin}
                  y={y - 6 * scale}
                  width={fretboardWidth}
                  height={12 * scale}
                  rx={6 * scale}
                  fill="#f59e0b"
                  fillOpacity="0.85"
                />
              );
            }
            return null;
          })}

          {/* Finger dots on frets */}
          {position.frets.map((fret, stringIdx) => {
            if (fret <= 0) return null;
            const fretRelative = fret - baseFret + 1;
            if (fretRelative < 1 || fretRelative > numFrets) return null;

            const x = leftMargin + stringIdx * stringSpacing;
            const y = topMargin + (fretRelative - 0.5) * fretSpacing;
            const finger = position.fingers[stringIdx];

            return (
              <g key={`dot-${stringIdx}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={7 * scale}
                  fill="#f59e0b"
                  className="transition-transform duration-150 group-hover:scale-105"
                />
                {finger > 0 && (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#0f172a"
                    fontSize={9 * scale}
                    fontWeight="800"
                    fontFamily="sans-serif"
                  >
                    {finger}
                  </text>
                )}
              </g>
            );
          })}

          {/* String name labels below */}
          {stringNames.map((name, i) => (
            <text
              key={`name-${i}`}
              x={leftMargin + i * stringSpacing}
              y={height - 6 * scale}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={9 * scale}
              fontFamily="var(--font-mono)"
            >
              {name}
            </text>
          ))}
        </svg>
      </div>

      {/* Strum sound trigger */}
      {showSoundButton && (
        <button
          onClick={handleStrum}
          title={`Strum ${chordName}`}
          className={`mt-2 flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150 ${
            isPlaying
              ? 'bg-amber-500 text-neutral-950 scale-95 shadow-sm shadow-amber-500/30'
              : 'bg-[#181a24] text-neutral-300 hover:text-amber-400 hover:bg-[#202330] border border-neutral-800'
          }`}
        >
          <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse text-neutral-950' : 'text-amber-500'}`} />
          <span>{isPlaying ? 'Playing...' : 'Strum'}</span>
        </button>
      )}
    </div>
  );
};
