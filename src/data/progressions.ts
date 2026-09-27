import { ChordProgressionPattern } from '../types/guitar';

export const COMMON_PROGRESSIONS: ChordProgressionPattern[] = [
  {
    id: 'four-chord-wonder',
    name: 'The 4-Chord Hit',
    roman: ['I', 'V', 'vi', 'IV'],
    description: 'The most popular harmonic sequence in contemporary music. Drives hundreds of classic acoustic and pop songs.',
    genre: 'Pop / Acoustic Rock',
    famousFor: 'Timeless anthem ballad structure',
    defaultKey: 'G'
  },
  {
    id: 'folk-rock-trio',
    name: 'Folk & Rock Classic',
    roman: ['I', 'IV', 'V'],
    description: 'The cornerstone of guitar music from roots acoustic to classic campfire anthems. Resolves naturally.',
    genre: 'Folk / Roots / Country',
    famousFor: 'Fundamental 3-chord acoustic rhythm',
    defaultKey: 'G'
  },
  {
    id: 'doo-wop-ballad',
    name: 'Classic 50s Ballad',
    roman: ['I', 'vi', 'IV', 'V'],
    description: 'Warm, nostalgic, and harmonically rich. Popularized in golden-era rock and acoustic love songs.',
    genre: 'Classic Pop / Ballad',
    famousFor: 'Stand By Me, vintage ballads',
    defaultKey: 'C'
  },
  {
    id: 'emotional-minor',
    name: 'Emotional Minor Lift',
    roman: ['vi', 'IV', 'I', 'V'],
    description: 'Starts introspective and melancholic before rising into optimistic hopefulness.',
    genre: 'Indie / Cinematic Acoustic',
    famousFor: 'Moody modern acoustic themes',
    defaultKey: 'G'
  },
  {
    id: 'jazz-neo-soul',
    name: 'Smooth Turnaround',
    roman: ['ii', 'V', 'I'],
    description: 'The foundation of jazz, neo-soul, and polished bossa guitar. Sophisticated resolution.',
    genre: 'Jazz / Neo-Soul / Bossa',
    famousFor: 'Smooth acoustic jazz standards',
    defaultKey: 'C'
  },
  {
    id: 'blues-shuffle',
    name: '12-Bar Blues Loop',
    roman: ['I', 'IV', 'I', 'V', 'IV', 'I'],
    description: 'The foundation of American guitar music. Perfect for practicing rhythmic shuffles and pentatonic fills.',
    genre: 'Blues / Rockabilly',
    famousFor: 'Delta blues & rock foundations',
    defaultKey: 'A'
  }
];

export const SCALE_DEGREES_BY_KEY: Record<string, Record<string, string>> = {
  G: {
    'I': 'G',
    'ii': 'Am',
    'iii': 'Bm',
    'IV': 'C',
    'V': 'D',
    'vi': 'Em',
    'vii°': 'F#dim'
  },
  C: {
    'I': 'C',
    'ii': 'Dm',
    'iii': 'Em',
    'IV': 'F',
    'V': 'G',
    'vi': 'Am',
    'vii°': 'Bdim'
  },
  D: {
    'I': 'D',
    'ii': 'Em',
    'iii': 'F#m',
    'IV': 'G',
    'V': 'A',
    'vi': 'Bm',
    'vii°': 'C#dim'
  },
  A: {
    'I': 'A',
    'ii': 'Bm',
    'iii': 'C#m',
    'IV': 'D',
    'V': 'E',
    'vi': 'F#m',
    'vii°': 'G#dim'
  },
  E: {
    'I': 'E',
    'ii': 'F#m',
    'iii': 'G#m',
    'IV': 'A',
    'V': 'B7',
    'vi': 'C#m',
    'vii°': 'D#dim'
  },
  F: {
    'I': 'F',
    'ii': 'Gm',
    'iii': 'Am',
    'IV': 'Bb',
    'V': 'C',
    'vi': 'Dm',
    'vii°': 'Edim'
  }
};

export const AVAILABLE_KEYS = ['G', 'C', 'D', 'A', 'E', 'F'];
