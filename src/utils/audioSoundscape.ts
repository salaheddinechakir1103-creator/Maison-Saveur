/**
 * Procedural Web Audio Soundscape for Maison Saveur
 * Generates an ethereal, warm ambient harmonic pad without any external audio files.
 */

class SoundscapeManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 3);

      // Lowpass filter for warm, cozy acoustics
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);

      // Warm ambient pentatonic chords (D minor / oriental modal harmonics)
      // D3 (146.83 Hz), A3 (220.00 Hz), C4 (261.63 Hz), F4 (349.23 Hz), E4 (329.63 Hz)
      const freqs = [146.83, 220.0, 261.63, 329.63, 440.0];

      this.oscillators = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

        // Gentle subtle detune drift
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx!.currentTime);

        gain.gain.setValueAtTime(0.18 / (i + 1), this.ctx!.currentTime);
        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch (e) {
      console.warn('Web Audio Ambient initialization deferred', e);
    }
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    try {
      if (this.masterGain) {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          this.oscillators = [];
          if (this.ctx && this.ctx.state !== 'closed') {
            this.ctx.close();
          }
          this.isPlaying = false;
        }, 1300);
      } else {
        this.isPlaying = false;
      }
    } catch {
      this.isPlaying = false;
    }
  }
}

export const soundscape = new SoundscapeManager();
