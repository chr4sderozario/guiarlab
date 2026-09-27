export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ChordPosition {
  frets: number[]; // 6 elements: [string 6, 5, 4, 3, 2, 1]. -1 means muted (x), 0 means open, 1+ is fret
  fingers: number[]; // 0 means no finger (open or muted), 1-4 is index, middle, ring, pinky
  baseFret?: number; // Starting fret if higher than 1 (e.g., 3 for barre at 3rd fret)
  barres?: number[]; // Fret numbers with barres
  variationName?: string;
}

export interface ChordData {
  id: string;
  name: string; // e.g. "C", "Em", "Gadd9"
  root: string; // "C", "D", "E", etc.
  suffix: string; // "Major", "Minor", "7", "m7", "maj7", "sus4", "add9"
  positions: ChordPosition[];
  difficulty: Difficulty;
  notes: string[]; // e.g. ["C", "E", "G"]
  tip?: string; // Practical tip for beginners
}

export interface StrummingPattern {
  name: string; // e.g., "Classic Pop Folk"
  notation: string; // e.g., "D - D U - U D U"
  strokes: ('D' | 'U' | '-')[]; // Down, Up, Miss/Rest
  timeSignature: string; // "4/4", "3/4", "6/8"
  description?: string;
}

export interface SongLine {
  chords: { chord: string; position: number }[];
  lyrics: string;
}

export interface SongSection {
  type: 'Verse' | 'Chorus' | 'Bridge' | 'Intro' | 'Outro';
  title?: string;
  lines: SongLine[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: Difficulty;
  key: string;
  capo: number; // 0 = No Capo
  tuning: string; // "Standard (E A D G B E)"
  bpm: number;
  timeSignature: string;
  strumming: StrummingPattern;
  chords: string[]; // List of chord names used in the song
  progression: string[]; // Main progression (e.g., ["G", "Em", "C", "D"])
  sections: SongSection[];
  notes?: string;
}

export interface ChordProgressionPattern {
  id: string;
  name: string;
  roman: string[]; // ["I", "V", "vi", "IV"]
  description: string;
  genre: string;
  famousFor: string;
  defaultKey: string;
}
