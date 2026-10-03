// Web Audio API Synthesizer - No external audio files needed!
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.ambientSource = null;
    this.ambientGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.muted;
  }

  // Stamp Thump Sound (Rasmiy muhr urish ovozi)
  playStamp() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);

    gain.gain.setValueAtTime(1, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  // Ka-Ching / Pul ovozi (Click / Payme to'lov va yutuqlar uchun)
  playCash() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.08);

      gain.gain.setValueAtTime(0.3, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.4);
    });
  }

  // Camera Shutter Snap (Story kartochka saqlanganda)
  playCamera() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.05);

    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Roast Buzzer / Shock (Kulgili shok tovushi)
  playShock() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.25);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Ambient Noise for Bahona Generator (Toshkent Probkasi, Yomg'ir, Shifoxona)
  startAmbient(type) {
    this.stopAmbient();
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.ambientGain.connect(this.ctx.destination);

    if (type === 'traffic') {
      // Toshkent tirbandligi: shovqin + davriy signal/klakson
      this.ambientLoop = setInterval(() => {
        if (Math.random() > 0.4 && this.ctx && !this.muted) {
          const t = this.ctx.currentTime;
          const horn = this.ctx.createOscillator();
          const hornGain = this.ctx.createGain();
          horn.type = 'triangle';
          const freqs = [440, 490, 520, 580];
          horn.frequency.setValueAtTime(freqs[Math.floor(Math.random() * freqs.length)], t);
          hornGain.gain.setValueAtTime(0.12, t);
          hornGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          horn.connect(hornGain);
          hornGain.connect(this.ctx.destination);
          horn.start(t);
          horn.stop(t + 0.35);
        }
      }, 600);
    } else if (type === 'hospital') {
      // Shifoxona monitori pish-pish ovozi
      this.ambientLoop = setInterval(() => {
        if (this.ctx && !this.muted) {
          const t = this.ctx.currentTime;
          const beep = this.ctx.createOscillator();
          const beepGain = this.ctx.createGain();
          beep.type = 'sine';
          beep.frequency.setValueAtTime(880, t);
          beepGain.gain.setValueAtTime(0.1, t);
          beepGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          beep.connect(beepGain);
          beepGain.connect(this.ctx.destination);
          beep.start(t);
          beep.stop(t + 0.15);
        }
      }, 1000);
    } else if (type === 'rain') {
      // Yomg'ir shovqini (White noise simulation)
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);
      whiteNoise.start();
      this.ambientSource = whiteNoise;
    }
  }

  stopAmbient() {
    if (this.ambientLoop) {
      clearInterval(this.ambientLoop);
      this.ambientLoop = null;
    }
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch (e) {
        // already stopped
      }
      this.ambientSource = null;
    }
  }
}

export const sounds = new SoundEffects();
