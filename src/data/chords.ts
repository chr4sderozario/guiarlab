import { ChordData } from '../types/guitar';

// frets array order: [String 6 (Low E), String 5 (A), String 4 (D), String 3 (G), String 2 (B), String 1 (High E)]
// -1 = muted (X), 0 = open (O), 1..n = fret number
// fingers array: 1 = index, 2 = middle, 3 = ring, 4 = pinky, 0 = none

export const CHORD_DATABASE: ChordData[] = [
  {
    id: 'c-major',
    name: 'C',
    root: 'C',
    suffix: 'Major',
    difficulty: 'Beginner',
    notes: ['C', 'E', 'G'],
    tip: 'Keep your thumb behind the neck at fret 2 and curl your 3rd finger so it doesn\'t mute string 1.',
    positions: [
      {
        variationName: 'Open Position (Standard)',
        frets: [-1, 3, 2, 0, 1, 0],
        fingers: [0, 3, 2, 0, 1, 0],
        baseFret: 1
      },
      {
        variationName: 'A-Shape Barre (3rd Fret)',
        frets: [-1, 3, 5, 5, 5, 3],
        fingers: [0, 1, 3, 3, 3, 1],
        baseFret: 3,
        barres: [3]
      }
    ]
  },
  {
    id: 'g-major',
    name: 'G',
    root: 'G',
    suffix: 'Major',
    difficulty: 'Beginner',
    notes: ['G', 'B', 'D'],
    tip: 'The 4-finger rock variation sounds fuller on acoustic guitar and makes switching to Cadd9 effortless.',
    positions: [
      {
        variationName: 'Open 4-Finger (Rock & Folk)',
        frets: [3, 2, 0, 0, 3, 3],
        fingers: [2, 1, 0, 0, 3, 4],
        baseFret: 1
      },
      {
        variationName: 'Classic 3-Finger',
        frets: [3, 2, 0, 0, 0, 3],
        fingers: [3, 2, 0, 0, 0, 4],
        baseFret: 1
      },
      {
        variationName: 'E-Shape Barre (3rd Fret)',
        frets: [3, 5, 5, 4, 3, 3],
        fingers: [1, 3, 4, 2, 1, 1],
        baseFret: 3,
        barres: [3]
      }
    ]
  },
  {
    id: 'd-major',
    name: 'D',
    root: 'D',
    suffix: 'Major',
    difficulty: 'Beginner',
    notes: ['D', 'F#', 'A'],
    tip: 'Only strum from the 4th string (open D) down. Try to lightly mute the 5th and 6th strings.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, -1, 0, 2, 3, 2],
        fingers: [0, 0, 0, 1, 3, 2],
        baseFret: 1
      },
      {
        variationName: 'With Thumb Bass (D/F#)',
        frets: [2, 0, 0, 2, 3, 2],
        fingers: [1, 0, 0, 2, 4, 3],
        baseFret: 1
      }
    ]
  },
  {
    id: 'e-minor',
    name: 'Em',
    root: 'E',
    suffix: 'Minor',
    difficulty: 'Beginner',
    notes: ['E', 'G', 'B'],
    tip: 'One of the easiest chords on guitar. All 6 strings ring out. Press down right behind the 2nd fret wire.',
    positions: [
      {
        variationName: 'Standard 2-Finger',
        frets: [0, 2, 2, 0, 0, 0],
        fingers: [0, 2, 3, 0, 0, 0],
        baseFret: 1
      },
      {
        variationName: 'Index & Middle Alternative',
        frets: [0, 2, 2, 0, 0, 0],
        fingers: [0, 1, 2, 0, 0, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'a-minor',
    name: 'Am',
    root: 'A',
    suffix: 'Minor',
    difficulty: 'Beginner',
    notes: ['A', 'C', 'E'],
    tip: 'Am has the exact same finger shape as E Major, just shifted down one string! Strum from string 5.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, 0, 2, 2, 1, 0],
        fingers: [0, 0, 2, 3, 1, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'e-major',
    name: 'E',
    root: 'E',
    suffix: 'Major',
    difficulty: 'Beginner',
    notes: ['E', 'G#', 'B'],
    tip: 'Make sure your index finger stands upright on the 1st fret of string 3 so open strings 1 and 2 ring cleanly.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [0, 2, 2, 1, 0, 0],
        fingers: [0, 2, 3, 1, 0, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'a-major',
    name: 'A',
    root: 'A',
    suffix: 'Major',
    difficulty: 'Beginner',
    notes: ['A', 'C#', 'E'],
    tip: 'Fitting 3 fingers in fret 2 can feel tight. You can also barre fret 2 with your index finger for rock songs.',
    positions: [
      {
        variationName: 'Standard 3-Finger',
        frets: [-1, 0, 2, 2, 2, 0],
        fingers: [0, 0, 1, 2, 3, 0],
        baseFret: 1
      },
      {
        variationName: 'Rock 1-Finger Barre',
        frets: [-1, 0, 2, 2, 2, 0],
        fingers: [0, 0, 1, 1, 1, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'd-minor',
    name: 'Dm',
    root: 'D',
    suffix: 'Minor',
    difficulty: 'Beginner',
    notes: ['D', 'F', 'A'],
    tip: 'Strum from string 4. Stretch finger 3 comfortably to fret 3 of string 2.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, -1, 0, 2, 3, 1],
        fingers: [0, 0, 0, 2, 3, 1],
        baseFret: 1
      }
    ]
  },
  {
    id: 'f-major',
    name: 'F',
    root: 'F',
    suffix: 'Major',
    difficulty: 'Intermediate',
    notes: ['F', 'A', 'C'],
    tip: 'Try the Beginner 4-string shape first before tackling the full 6-string barre chord.',
    positions: [
      {
        variationName: 'Beginner Friendly (4 Strings)',
        frets: [-1, -1, 3, 2, 1, 1],
        fingers: [0, 0, 3, 2, 1, 1],
        baseFret: 1,
        barres: [1]
      },
      {
        variationName: 'Full Barre Chord (1st Fret)',
        frets: [1, 3, 3, 2, 1, 1],
        fingers: [1, 3, 4, 2, 1, 1],
        baseFret: 1,
        barres: [1]
      }
    ]
  },
  {
    id: 'b-minor',
    name: 'Bm',
    root: 'B',
    suffix: 'Minor',
    difficulty: 'Intermediate',
    notes: ['B', 'D', 'F#'],
    tip: 'Barre from string 5 down on fret 2. Keep index finger slightly rotated on its side for easier pressure.',
    positions: [
      {
        variationName: 'A-Minor Shape Barre (2nd Fret)',
        frets: [-1, 2, 4, 4, 3, 2],
        fingers: [0, 1, 3, 4, 2, 1],
        baseFret: 2,
        barres: [2]
      },
      {
        variationName: 'Easy Open Voicing (Bm7/no barre)',
        frets: [-1, 2, 0, 2, 0, 2],
        fingers: [0, 1, 0, 2, 0, 3],
        baseFret: 1
      }
    ]
  },
  {
    id: 'c-add9',
    name: 'Cadd9',
    root: 'C',
    suffix: 'add9',
    difficulty: 'Beginner',
    notes: ['C', 'E', 'G', 'D'],
    tip: 'The quintessential modern acoustic chord. Leave fingers 3 and 4 anchored when switching from G!',
    positions: [
      {
        variationName: 'Open Position (Acoustic Staple)',
        frets: [-1, 3, 2, 0, 3, 3],
        fingers: [0, 2, 1, 0, 3, 4],
        baseFret: 1
      }
    ]
  },
  {
    id: 'a-sus2',
    name: 'Asus2',
    root: 'A',
    suffix: 'sus2',
    difficulty: 'Beginner',
    notes: ['A', 'B', 'E'],
    tip: 'Just two fingers on the 2nd fret. Leaves a lush, airy, open acoustic sound.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, 0, 2, 2, 0, 0],
        fingers: [0, 0, 1, 2, 0, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'd-sus4',
    name: 'Dsus4',
    root: 'D',
    suffix: 'sus4',
    difficulty: 'Beginner',
    notes: ['D', 'G', 'A'],
    tip: 'Add your pinky on fret 3 of string 1 over a standard D chord, then lift it off for melodic movement.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, -1, 0, 2, 3, 3],
        fingers: [0, 0, 0, 1, 2, 4],
        baseFret: 1
      }
    ]
  },
  {
    id: 'b7',
    name: 'B7',
    root: 'B',
    suffix: '7',
    difficulty: 'Beginner',
    notes: ['B', 'D#', 'F#', 'A'],
    tip: 'Great open chord that resolves powerfully to E or Em. Strum 5 strings.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, 2, 1, 2, 0, 2],
        fingers: [0, 2, 1, 3, 0, 4],
        baseFret: 1
      }
    ]
  },
  {
    id: 'e7',
    name: 'E7',
    root: 'E',
    suffix: '7',
    difficulty: 'Beginner',
    notes: ['E', 'G#', 'B', 'D'],
    tip: 'A staple blues and acoustic chord. Only needs 1 or 2 fingers to play.',
    positions: [
      {
        variationName: 'Open 2-Finger',
        frets: [0, 2, 0, 1, 0, 0],
        fingers: [0, 2, 0, 1, 0, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'a7',
    name: 'A7',
    root: 'A',
    suffix: '7',
    difficulty: 'Beginner',
    notes: ['A', 'C#', 'E', 'G'],
    tip: 'Just 2 fingers on fret 2 with open string 3 ringing in the middle.',
    positions: [
      {
        variationName: 'Open Position',
        frets: [-1, 0, 2, 0, 2, 0],
        fingers: [0, 0, 1, 0, 2, 0],
        baseFret: 1
      }
    ]
  },
  {
    id: 'f-maj7',
    name: 'Fmaj7',
    root: 'F',
    suffix: 'maj7',
    difficulty: 'Beginner',
    notes: ['F', 'A', 'C', 'E'],
    tip: 'Dreamy alternative to F. Let string 1 ring open for a beautiful indie/folk shimmer.',
    positions: [
      {
        variationName: 'Open Dreamy Voicing',
        frets: [-1, -1, 3, 2, 1, 0],
        fingers: [0, 0, 3, 2, 1, 0],
        baseFret: 1
      }
    ]
  }
];

export const ROOT_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CHORD_SUFFIXES = ['Major', 'Minor', '7', 'maj7', 'm7', 'sus4', 'add9'];
