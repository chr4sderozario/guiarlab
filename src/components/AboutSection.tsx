import React from 'react';
import { Heart, Music, Compass, Clock, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-neutral-800/70 bg-[#0c0d13]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-wider font-semibold text-amber-500 font-mono mb-2">
            The Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            About GUITAR LAB
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Built from a passion for music to remove friction between picking up the guitar and actually playing songs.
          </p>
        </div>

        {/* 4 Pillars Grid (Anti-slop clean cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-[#131520] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-100 font-display">
              Welcoming to All Players
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Whether you held your first pick today, play around weekend campfires, or are sharpening transition speeds, GUITAR LAB is built to feel inviting and intuitive.
            </p>
          </div>

          <div className="bg-[#131520] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Music className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-100 font-display">
              Music-First, Zero Clutter
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              No bloated logins, no aggressive ad banners, and no paywalls. Just clean fret diagrams, audible strums, and practice tools you can use immediately.
            </p>
          </div>

          <div className="bg-[#131520] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-100 font-display">
              Harmonic Understanding
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Go beyond isolated finger shapes. Understand how chords connect in standard keys (I–V–vi–IV) so you can figure out songs by ear and jam with others.
            </p>
          </div>

          <div className="bg-[#131520] border border-neutral-800 rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-100 font-display">
              Focused Daily Practice
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Structured 5 to 20 minute practice sessions paired with a calibrated audio metronome turn chaotic noodling into real muscle memory and confidence.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
