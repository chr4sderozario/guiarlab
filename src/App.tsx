/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TopTunerBar } from './components/TopTunerBar';
import { Hero } from './components/Hero';
import { SongLibrary } from './components/SongLibrary';
import { ChordFinder } from './components/ChordFinder';
import { ChordProgressions } from './components/ChordProgressions';
import { PracticeMode } from './components/PracticeMode';
import { GuitarTools } from './components/GuitarTools';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SongModal } from './components/SongModal';
import { Song } from './types/guitar';
import { DEMO_SONGS } from './data/songs';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSongForModal, setSelectedSongForModal] = useState<Song | null>(null);
  const [isTopTunerOpen, setIsTopTunerOpen] = useState<boolean>(true);
  
  // State for preloading Practice Mode
  const [practiceTargetSong, setPracticeTargetSong] = useState<Song | null>(null);
  const [practiceTargetProgression, setPracticeTargetProgression] = useState<{
    name: string;
    key: string;
    chords: string[];
  } | null>(null);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartPlaying = () => {
    // Open the quintessential first song for players
    setSelectedSongForModal(DEMO_SONGS[0]);
  };

  const handlePracticeSong = (song: Song) => {
    setSelectedSongForModal(null);
    setPracticeTargetSong(song);
    setPracticeTargetProgression(null);
    scrollToSection('practice');
  };

  const handlePracticeProgression = (prog: { name: string; key: string; chords: string[] }) => {
    setPracticeTargetProgression(prog);
    setPracticeTargetSong(null);
    scrollToSection('practice');
  };

  const toggleTopTuner = () => {
    setIsTopTunerOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c12] text-[#e5e2dc] selection:bg-amber-500 selection:text-neutral-950">
      {/* 3-Zone Clean Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPractice={() => scrollToSection('practice')}
        onToggleTuner={toggleTopTuner}
        isTunerOpen={isTopTunerOpen}
      />

      {/* Persistent Quick Tuner at Top */}
      <TopTunerBar
        isOpen={isTopTunerOpen}
        onToggle={toggleTopTuner}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onStartPlaying={handleStartPlaying}
          onExploreSongs={() => scrollToSection('songs')}
          onExploreChords={() => scrollToSection('chords')}
          onExploreTools={() => scrollToSection('tools')}
          onOpenTuner={() => setIsTopTunerOpen(true)}
        />

        {/* 2. Song Library */}
        <SongLibrary
          onSelectSong={(song) => setSelectedSongForModal(song)}
          onPracticeSong={handlePracticeSong}
        />

        {/* 3. Chord Finder */}
        <ChordFinder />

        {/* 4. Chord Progression Explorer */}
        <ChordProgressions
          onPracticeProgression={handlePracticeProgression}
        />

        {/* 5. Practice Mode */}
        <PracticeMode
          initialSong={practiceTargetSong}
          initialProgression={practiceTargetProgression}
        />

        {/* 6. Guitarist Tools (Metronome & Tuner) */}
        <GuitarTools
          onOpenChordFinder={() => scrollToSection('chords')}
          onOpenPractice={() => scrollToSection('practice')}
        />

        {/* 7. Subtle About Section */}
        <AboutSection />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Song Modal (Opens when user browses/clicks a song) */}
      <SongModal
        song={selectedSongForModal}
        onClose={() => setSelectedSongForModal(null)}
        onPracticeSong={handlePracticeSong}
      />
    </div>
  );
}
