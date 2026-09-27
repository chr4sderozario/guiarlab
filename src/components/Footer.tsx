import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#08090d] border-t border-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand mark */}
          <div className="flex flex-col items-center sm:items-start">
            <span
              className="text-lg font-bold tracking-tight text-neutral-200"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              GUITAR LAB
            </span>
            <p className="text-xs text-neutral-500 mt-1">
              Your guitar. Your songs. Your progress.
            </p>
          </div>

          {/* Nav links mirror */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <a href="#songs" className="hover:text-amber-400 transition-colors">Songs</a>
            <a href="#chords" className="hover:text-amber-400 transition-colors">Chord Finder</a>
            <a href="#progressions" className="hover:text-amber-400 transition-colors">Progressions</a>
            <a href="#practice" className="hover:text-amber-400 transition-colors">Practice</a>
            <a href="#tools" className="hover:text-amber-400 transition-colors">Tools</a>
            <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          </div>

          {/* Exact required creator credit */}
          <div className="text-xs text-neutral-400 text-center sm:text-right font-medium">
            Made with 🎸 by John Christiano Rozario
          </div>

        </div>
      </div>
    </footer>
  );
};
