import React, { useState } from 'react';
import { Menu, X, Play, Music, Radio } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPractice: () => void;
  onToggleTuner: () => void;
  isTunerOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPractice,
  onToggleTuner,
  isTunerOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'tuner-action', label: 'Tuner', isTuner: true },
    { id: 'songs', label: 'Songs' },
    { id: 'chords', label: 'Chord Finder' },
    { id: 'progressions', label: 'Progressions' },
    { id: 'practice', label: 'Practice' },
    { id: 'tools', label: 'Tools' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (id: string, isTuner?: boolean) => {
    if (isTuner) {
      onToggleTuner();
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d12]/95 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-bold tracking-tight text-neutral-100 hover:text-amber-400 transition-colors whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          GUITAR LAB
        </a>

        {/* Zone 2: 4–6 nav links, 1–2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.isTuner)}
              className={`text-sm font-medium transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                item.isTuner && isTunerOpen
                  ? 'text-amber-400 font-semibold'
                  : activeTab === item.id
                  ? 'text-amber-400 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-100'
              }`}
            >
              {item.label}
              {((activeTab === item.id && !item.isTuner) || (item.isTuner && isTunerOpen)) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1–2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Direct Top Tuner Trigger Button */}
          <button
            onClick={onToggleTuner}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
              isTunerOpen
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-300'
                : 'bg-[#151824] hover:bg-[#1d2130] text-neutral-200 border-neutral-800 hover:text-white'
            }`}
            title="Open Quick Tuner at top"
          >
            <Radio className="w-3.5 h-3.5 text-amber-500" />
            <span>{isTunerOpen ? 'Tuning Active' : 'Tune Guitar'}</span>
          </button>

          <button
            onClick={onOpenPractice}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 active:scale-95 transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Playing</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-neutral-100 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0f111a] px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.isTuner)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                (item.isTuner && isTunerOpen) || activeTab === item.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold'
                  : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

