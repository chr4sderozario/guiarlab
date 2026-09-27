import React, { useState, useMemo } from 'react';
import { Search, Play, BookOpen, Music2, Filter } from 'lucide-react';
import { Song, Difficulty } from '../types/guitar';
import { DEMO_SONGS } from '../data/songs';

interface SongLibraryProps {
  onSelectSong: (song: Song) => void;
  onPracticeSong: (song: Song) => void;
}

export const SongLibrary: React.FC<SongLibraryProps> = ({
  onSelectSong,
  onPracticeSong
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | Difficulty>('All');
  const [selectedKey, setSelectedKey] = useState<string>('All');

  const filteredSongs = useMemo(() => {
    return DEMO_SONGS.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.chords.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDiff = selectedDifficulty === 'All' || song.difficulty === selectedDifficulty;
      const matchesKey = selectedKey === 'All' || song.key === selectedKey;

      return matchesSearch && matchesDiff && matchesKey;
    });
  }, [searchQuery, selectedDifficulty, selectedKey]);

  const uniqueKeys = ['All', 'C', 'G', 'D', 'A', 'E', 'Am'];

  return (
    <section id="songs" className="py-16 sm:py-24 border-b border-neutral-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-500 font-mono mb-2">
              Original Chord & Lyrics Library
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Song Library
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-xl">
              Learn full arrangements with chords, strumming patterns, and capo placements. Ready for acoustic jam sessions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search title, artist, or chord..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#12141c] border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls (Segmented buttons - allowed per Skill 1.A) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-850">
          
          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#12141c] border border-neutral-800 rounded-xl">
            {(['All', 'Beginner', 'Intermediate'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Key Filter */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Filter className="w-3.5 h-3.5 text-neutral-500" />
            <span>Key:</span>
            <div className="flex items-center gap-1">
              {uniqueKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedKey(key)}
                  className={`px-2 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    selectedKey === key
                      ? 'bg-neutral-800 text-amber-400 font-bold border border-neutral-700'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Song Grid */}
        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                onClick={() => onSelectSong(song)}
                className="group relative bg-[#13151f] hover:bg-[#161824] border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-amber-500/5"
              >
                <div>
                  {/* Top metadata line (Unboxed text with dots per Skill 1.A) */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 font-mono">
                    <div className="flex items-center gap-2">
                      <span className={song.difficulty === 'Beginner' ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                        {song.difficulty}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Key {song.key}</span>
                      <span aria-hidden="true">·</span>
                      <span>{song.capo === 0 ? 'Capo 0' : `Capo ${song.capo}`}</span>
                    </div>
                    <span className="text-neutral-400">{song.bpm} BPM</span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors leading-snug">
                    {song.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {song.artist}
                  </p>

                  {/* Chord progression tags */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80">
                    <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-mono block mb-1.5">
                      Chords
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {song.chords.map((chord) => (
                        <span
                          key={chord}
                          className="px-2 py-0.5 text-xs font-mono font-bold bg-[#1b1e2b] text-neutral-200 rounded border border-neutral-750"
                        >
                          {chord}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strumming pattern preview */}
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                    <span className="truncate pr-2">Pattern: {song.strumming.name}</span>
                    <span className="font-mono text-amber-500 font-bold shrink-0">{song.strumming.notation}</span>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between gap-3">
                  <span className="text-xs text-amber-500/90 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Chord Chart</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPracticeSong(song);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#11131c] rounded-2xl border border-neutral-800">
            <Music2 className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-300 font-medium">No songs matched your search criteria.</p>
            <p className="text-xs text-neutral-500 mt-1">Try clearing filters or searching for common chords like G or C.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedKey('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-900 bg-amber-500 rounded-lg hover:bg-amber-400"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
