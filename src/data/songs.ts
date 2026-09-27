import { Song } from '../types/guitar';

export const DEMO_SONGS: Song[] = [
  {
    id: 'campfire-horizon',
    title: 'Campfire Horizon',
    artist: 'The Strummers (Original)',
    difficulty: 'Beginner',
    key: 'G',
    capo: 0,
    tuning: 'Standard (E A D G B E)',
    bpm: 86,
    timeSignature: '4/4',
    strumming: {
      name: 'Classic Island / Folk Strum',
      notation: 'D - D U - U D U',
      strokes: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'],
      timeSignature: '4/4',
      description: 'The golden acoustic pattern. Down on 1, down-up on 2-and, miss on 3, up-down-up on and-4-and.'
    },
    chords: ['G', 'Em', 'C', 'D'],
    progression: ['G', 'Em', 'C', 'D'],
    notes: 'Keep your pinky and ring finger anchored on strings 1 & 2 for easier chord transitions.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'Em', position: 24 }],
            lyrics: 'Pack the wood and spark the flame, watching shadows drift away'
          },
          {
            chords: [{ chord: 'C', position: 0 }, { chord: 'D', position: 24 }],
            lyrics: 'Sparks are dancing in the night, everything is feeling right'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 22 }],
            lyrics: 'Oh the campfire burns so bright, through the quiet desert night'
          },
          {
            chords: [{ chord: 'Em', position: 0 }, { chord: 'C', position: 22 }],
            lyrics: 'Six steel strings and open skies, beneath the mountain sunrise'
          }
        ]
      },
      {
        type: 'Verse',
        title: 'Verse 2',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'Em', position: 24 }],
            lyrics: 'Coffee brewing in the pot, grateful for the road we got'
          },
          {
            chords: [{ chord: 'C', position: 0 }, { chord: 'D', position: 24 }],
            lyrics: 'Singing songs we used to know, everywhere the pine trees grow'
          }
        ]
      },
      {
        type: 'Outro',
        title: 'Outro',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 16 }, { chord: 'G', position: 32 }],
            lyrics: 'Let the final ember glow... let the gentle rhythm flow'
          }
        ]
      }
    ]
  },
  {
    id: 'midnight-river-walk',
    title: 'Midnight River Walk',
    artist: 'Blue Ridge Echoes (Original)',
    difficulty: 'Beginner',
    key: 'C',
    capo: 2,
    tuning: 'Standard (E A D G B E)',
    bpm: 74,
    timeSignature: '4/4',
    strumming: {
      name: 'Gentle Steady Strum',
      notation: 'D - D - D U D U',
      strokes: ['D', '-', 'D', '-', 'D', 'U', 'D', 'U'],
      timeSignature: '4/4',
      description: 'Accents on beats 2 and 4. Relax your wrist for warm acoustic dynamics.'
    },
    chords: ['C', 'Am', 'Fmaj7', 'G'],
    progression: ['C', 'Am', 'Fmaj7', 'G'],
    notes: 'Uses Fmaj7 instead of full barre F chord, making it sweet, lush, and beginner-friendly.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'C', position: 0 }, { chord: 'Am', position: 26 }],
            lyrics: 'Walking slow along the river, moonlight ripples on the water'
          },
          {
            chords: [{ chord: 'Fmaj7', position: 0 }, { chord: 'G', position: 26 }],
            lyrics: 'Hear the crickets in the grass, watching weary hours pass'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'C', position: 0 }, { chord: 'G', position: 20 }],
            lyrics: 'Hold this moment in your hand, footprints left upon the sand'
          },
          {
            chords: [{ chord: 'Am', position: 0 }, { chord: 'Fmaj7', position: 20 }],
            lyrics: 'River takes away the pain, washing clean like summer rain'
          }
        ]
      },
      {
        type: 'Outro',
        title: 'Outro',
        lines: [
          {
            chords: [{ chord: 'C', position: 0 }, { chord: 'Am', position: 18 }, { chord: 'C', position: 34 }],
            lyrics: 'Drift away into the blue... moonlight shining down on you'
          }
        ]
      }
    ]
  },
  {
    id: 'desert-highway-66',
    title: 'Desert Highway 66',
    artist: 'Coyote Canyon (Original)',
    difficulty: 'Intermediate',
    key: 'D',
    capo: 0,
    tuning: 'Standard (E A D G B E)',
    bpm: 112,
    timeSignature: '4/4',
    strumming: {
      name: 'Driving Heartbeat Strum',
      notation: 'D D U U D U',
      strokes: ['D', '-', 'D', 'U', '-', 'U', 'D', 'U'],
      timeSignature: '4/4',
      description: 'Energetic forward momentum. Emphasize the second downstroke.'
    },
    chords: ['D', 'A', 'Bm', 'G'],
    progression: ['D', 'A', 'Bm', 'G'],
    notes: 'Practice switching between A Major and B Minor cleanly at a slower tempo before speeding up.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 22 }],
            lyrics: 'Windows down and radio high, dust kicking toward the sky'
          },
          {
            chords: [{ chord: 'Bm', position: 0 }, { chord: 'G', position: 22 }],
            lyrics: 'Tumbleweeds across the lane, leaving behind the city rain'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'D', position: 0 }, { chord: 'A', position: 24 }],
            lyrics: 'Running down this desert highway, doing things the open sky way'
          },
          {
            chords: [{ chord: 'Bm', position: 0 }, { chord: 'G', position: 24 }],
            lyrics: 'Nothing but miles of yellow line, everything will turn out fine'
          }
        ]
      },
      {
        type: 'Bridge',
        title: 'Bridge',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 36 }],
            lyrics: 'Red rock canyons standing tall, answering the highway call'
          }
        ]
      }
    ]
  },
  {
    id: 'golden-hour-acoustic',
    title: 'Golden Hour Reverie',
    artist: 'Isla Wren (Original)',
    difficulty: 'Beginner',
    key: 'E',
    capo: 0,
    tuning: 'Standard (E A D G B E)',
    bpm: 68,
    timeSignature: '4/4',
    strumming: {
      name: 'Slow Ambient Pluck & Strum',
      notation: 'D - - U D - - U',
      strokes: ['D', '-', '-', 'U', 'D', '-', '-', 'U'],
      timeSignature: '4/4',
      description: 'Airy, breathing rhythm. Let each chord ring with warm resonance.'
    },
    chords: ['E', 'A', 'B7', 'Asus2'],
    progression: ['E', 'Asus2', 'E', 'B7'],
    notes: 'Switching between E and Asus2 creates a natural acoustic chime with minimal hand movement.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'E', position: 0 }, { chord: 'Asus2', position: 22 }],
            lyrics: 'Sunlight slanting through the blinds, peaceful thoughts inside our minds'
          },
          {
            chords: [{ chord: 'E', position: 0 }, { chord: 'B7', position: 22 }],
            lyrics: 'Golden dust upon the floor, nothing wanted anymore'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'A', position: 0 }, { chord: 'B7', position: 20 }, { chord: 'E', position: 36 }],
            lyrics: 'Golden hour, hold the light... before the evening meets the night'
          },
          {
            chords: [{ chord: 'A', position: 0 }, { chord: 'B7', position: 20 }, { chord: 'E', position: 36 }],
            lyrics: 'Softly breathing, calm and slow... letting all our worries go'
          }
        ]
      }
    ]
  },
  {
    id: 'autumn-leaves-rain',
    title: 'Autumn Leaves & Rain',
    artist: 'Timberline (Original)',
    difficulty: 'Intermediate',
    key: 'Am',
    capo: 3,
    tuning: 'Standard (E A D G B E)',
    bpm: 90,
    timeSignature: '3/4',
    strumming: {
      name: 'Waltz Folk Strum (3/4)',
      notation: 'D - D U D U',
      strokes: ['D', '-', 'D', 'U', 'D', 'U'],
      timeSignature: '3/4',
      description: 'Classic 3/4 waltz rhythm: Bass downstroke on 1, light strums on 2 and 3.'
    },
    chords: ['Am', 'C', 'G', 'Dm', 'Fmaj7'],
    progression: ['Am', 'C', 'G', 'Dm'],
    notes: 'Capo 3 brings out the bright bell-like timbre of your guitar. Perfect 3/4 waltz practice.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'Am', position: 0 }, { chord: 'C', position: 20 }],
            lyrics: 'Leaves are turning amber gold, story that the seasons told'
          },
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'Dm', position: 20 }],
            lyrics: 'Rain drops tapping on the pane, autumn whispering again'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'Fmaj7', position: 0 }, { chord: 'C', position: 20 }],
            lyrics: 'Dance with me across the floor, cold winds knock upon the door'
          },
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'Am', position: 20 }],
            lyrics: 'Warm by the fireside glow, watching maple branches bow'
          }
        ]
      }
    ]
  },
  {
    id: 'ramblers-train',
    title: "Rambler's Train",
    artist: 'Dusty Boots Band (Original)',
    difficulty: 'Beginner',
    key: 'G',
    capo: 0,
    tuning: 'Standard (E A D G B E)',
    bpm: 124,
    timeSignature: '4/4',
    strumming: {
      name: 'Boom-Chick Country Strum',
      notation: 'D - D U D - D U',
      strokes: ['D', '-', 'D', 'U', 'D', '-', 'D', 'U'],
      timeSignature: '4/4',
      description: 'Hit the root bass note on 1 and 3, strum high treble strings on 2 and 4.'
    },
    chords: ['G', 'C', 'D'],
    progression: ['G', 'C', 'G', 'D'],
    notes: 'The essential three-chord song! Alternate bass strings (6th then 5th on G; 5th then 4th on C).',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 24 }],
            lyrics: 'Hear the whistle down the line, rolling on past midnight time'
          },
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'D', position: 24 }],
            lyrics: 'Boxcar wheels upon the track, going where there\'s no looking back'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'G', position: 0 }, { chord: 'C', position: 20 }, { chord: 'G', position: 36 }],
            lyrics: 'Oh rambler train, roll on through the rain'
          },
          {
            chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 24 }],
            lyrics: 'Taking all my heavy heart away, to a brand new sunny day'
          }
        ]
      }
    ]
  },
  {
    id: 'neon-coffee-shop',
    title: 'Neon Coffee Shop',
    artist: 'Luna & The Strings (Original)',
    difficulty: 'Intermediate',
    key: 'A',
    capo: 0,
    tuning: 'Standard (E A D G B E)',
    bpm: 98,
    timeSignature: '4/4',
    strumming: {
      name: 'Syncopated Groove Strum',
      notation: 'D - - U - U D U',
      strokes: ['D', '-', '-', 'U', '-', 'U', 'D', 'U'],
      timeSignature: '4/4',
      description: 'Keep the right-hand wrist loose for that snappy acoustic coffeehouse feel.'
    },
    chords: ['A', 'Fmaj7', 'D', 'E'],
    progression: ['A', 'D', 'Fmaj7', 'E'],
    notes: 'The Fmaj7 adds a surprising, stylish modal twist to the progression.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 22 }],
            lyrics: 'Steam rising from an espresso cup, 2 AM and still we\'re up'
          },
          {
            chords: [{ chord: 'Fmaj7', position: 0 }, { chord: 'E', position: 22 }],
            lyrics: 'Neon sign buzzing through the glass, watching rainy taxis pass'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'A', position: 0 }, { chord: 'D', position: 20 }],
            lyrics: 'Write your thoughts on napkins white, underneath the neon light'
          },
          {
            chords: [{ chord: 'Fmaj7', position: 0 }, { chord: 'E', position: 20 }],
            lyrics: 'Strings will chime and voices blend, till the night comes to an end'
          }
        ]
      }
    ]
  },
  {
    id: 'starlight-lullaby',
    title: 'Starlight Lullaby',
    artist: 'Oliver Chen (Original)',
    difficulty: 'Beginner',
    key: 'D',
    capo: 4,
    tuning: 'Standard (E A D G B E)',
    bpm: 62,
    timeSignature: '4/4',
    strumming: {
      name: 'Slow Thumb Downstrokes',
      notation: 'D - D - D - D -',
      strokes: ['D', '-', 'D', '-', 'D', '-', 'D', '-'],
      timeSignature: '4/4',
      description: 'Gentle, meditative thumb downstrokes. Play with low volume and round tone.'
    },
    chords: ['D', 'G', 'A', 'Em'],
    progression: ['D', 'G', 'Em', 'A'],
    notes: 'High capo position gives a harp/mandolin-like sparkling tone. Ideal evening cooldown practice.',
    sections: [
      {
        type: 'Verse',
        title: 'Verse 1',
        lines: [
          {
            chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 24 }],
            lyrics: 'Close your eyes and drift away, put to rest the busy day'
          },
          {
            chords: [{ chord: 'Em', position: 0 }, { chord: 'A', position: 24 }],
            lyrics: 'Silver stars begin to gleam, sailing on a gentle dream'
          }
        ]
      },
      {
        type: 'Chorus',
        title: 'Chorus',
        lines: [
          {
            chords: [{ chord: 'D', position: 0 }, { chord: 'G', position: 20 }],
            lyrics: 'Sleep now till the morning sun, another peaceful night begun'
          },
          {
            chords: [{ chord: 'Em', position: 0 }, { chord: 'A', position: 20 }, { chord: 'D', position: 36 }],
            lyrics: 'Let the quiet melody... set your weary spirit free'
          }
        ]
      }
    ]
  }
];
