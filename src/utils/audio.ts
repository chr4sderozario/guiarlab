/**
 * Web Audio Engine for GUITAR LAB
 * Realistic acoustic guitar string synthesis, metronome clicks, and tuning pitch generator.
 */

// Guitar open string base frequencies in Hz (String 6 to String 1: E2, A2, D3, G3, B3, E4)
export const OPEN_STRING_FREQUENCIES = [
  82.41,  // String 6: Low E (E2)
  110.00, // String 5: A (A2)
  146.83, // String 4: D (D3)
  196.00, // String 3: G (G3)
  246.94, // String 2: B (B3)
  329.63  // String 1: High E (E4)
];

export const STRING_NAMES = ['E2 (6th)', 'A2 (5th)', 'D3 (4th)', 'G3 (3rd)', 'B3 (2nd)', 'E4 (1st)'];

class AudioManager {
  private ctx: AudioContext | null = null;
  private continuousOsc: OscillatorNode | null = null;
  private continuousGain: GainNode | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Synthesize a plucked acoustic guitar string note
   * @param freq Pitch in Hertz
   * @param duration Pluck sustain in seconds
   * @param startTime AudioContext start time
   * @param volume Pluck loudness (0.0 to 1.0)
   */
  public pluckString(freq: number, duration = 1.8, startTime?: number, volume = 0.35): void {
    try {
      const ctx = this.getContext();
      const start = startTime ?? ctx.currentTime;

      // Master gain for this note
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, start);
      // Fast attack (percussive pick strike)
      masterGain.gain.exponentialRampToValueAtTime(volume, start + 0.005);
      // Organic acoustic decay
      masterGain.gain.exponentialRampToValueAtTime(volume * 0.4, start + 0.15);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      // Low-pass filter to simulate wood soundboard damping
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(Math.min(freq * 8, 4800), start);
      filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 300), start + duration * 0.8);
      filter.Q.value = 2;

      // Harmonics synthesis: combination of fundamental and warm overtones
      const harmonics = [
        { ratio: 1.0, gain: 1.0 },
        { ratio: 2.0, gain: 0.65 },
        { ratio: 3.0, gain: 0.38 },
        { ratio: 4.0, gain: 0.18 },
        { ratio: 5.0, gain: 0.08 }
      ];

      harmonics.forEach(({ ratio, gain }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Slight detune for physical string realism
        const detune = (Math.random() - 0.5) * 4;
        osc.frequency.setValueAtTime(freq * ratio, start);
        osc.detune.setValueAtTime(detune, start);
        osc.type = ratio === 1.0 ? 'triangle' : 'sine';

        oscGain.gain.setValueAtTime(gain, start);

        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(start);
        osc.stop(start + duration + 0.05);
      });

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
    } catch {
      // Audio context might fail if user has not interacted yet
    }
  }

  /**
   * Play an entire chord with realistic strumming stagger
   * @param frets Array of 6 numbers (-1 for muted, 0 for open, 1+ for fret)
   * @param direction 'down' (low E to high E) or 'up' (high E to low E)
   * @param speed Delay between strings in seconds (default ~32ms)
   */
  public strumChord(frets: number[], direction: 'down' | 'up' = 'down', speed = 0.032): void {
    const ctx = this.getContext();
    const now = ctx.currentTime + 0.01;

    const stringIndices = direction === 'down' ? [0, 1, 2, 3, 4, 5] : [5, 4, 3, 2, 1, 0];
    let offsetCount = 0;

    stringIndices.forEach((strIdx) => {
      const fret = frets[strIdx];
      if (fret !== undefined && fret >= 0) {
        const baseFreq = OPEN_STRING_FREQUENCIES[strIdx];
        const noteFreq = baseFreq * Math.pow(2, fret / 12);
        const pluckTime = now + offsetCount * speed;
        // String loudness adjustment (lower strings slightly more body)
        const vol = 0.32 - (strIdx * 0.015);
        this.pluckString(noteFreq, 2.0, pluckTime, vol);
        offsetCount++;
      }
    });
  }

  /**
   * Metronome click sound
   * @param isAccent Whether this is the first beat of the measure
   */
  public playMetronomeClick(isAccent = false): void {
    try {
      const ctx = this.getContext();
      const start = ctx.currentTime;

      // Woodblock / rimshot pulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const baseFreq = isAccent ? 1600 : 980;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, start);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, start + 0.035);

      gain.gain.setValueAtTime(isAccent ? 0.6 : 0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq, start);
      filter.Q.value = 4;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.05);
    } catch {
      // Audio context might fail if not allowed
    }
  }

  /**
   * Play continuous or plucked reference tone for tuner
   */
  public playTuningReference(stringIndex: number, continuous = false): void {
    try {
      const ctx = this.getContext();
      const freq = OPEN_STRING_FREQUENCIES[stringIndex];

      this.stopContinuousTone();

      if (!continuous) {
        // Pluck realistic acoustic note
        this.pluckString(freq, 3.0, ctx.currentTime, 0.45);
        return;
      }

      // Continuous pitch generator for tuning by ear
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      this.continuousOsc = osc;
      this.continuousGain = gain;
    } catch {
      // Audio context fallback
    }
  }

  public stopContinuousTone(): void {
    if (this.continuousOsc && this.continuousGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.continuousGain.gain.setValueAtTime(this.continuousGain.gain.value, now);
        this.continuousGain.gain.linearRampToValueAtTime(0.0001, now + 0.05);
        this.continuousOsc.stop(now + 0.06);
      } catch {
        // Ignore stop error
      }
      this.continuousOsc = null;
      this.continuousGain = null;
    }
  }
}

export const audioManager = new AudioManager();
