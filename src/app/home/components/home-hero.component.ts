import { Component, signal, afterNextRender, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParticleBackgroundComponent } from './particle-background.component';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [RouterLink, ParticleBackgroundComponent],
  template: `
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <app-particle-background class="absolute inset-0 z-0" />

      <div class="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950 z-[1]"></div>

      <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <div class="max-w-3xl">
          <!-- Terminal prompt -->
          <div class="font-mono text-sm sm:text-base mb-6">
            <span class="text-gray-500">&gt; </span>
            <span class="text-emerald-400">{{ typedText() }}</span>
            <span class="inline-block w-2 h-5 ml-0.5 border-r-2 border-emerald-400 typing-cursor align-middle"></span>
          </div>

          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-100 mb-6">
            Ryan Viers
          </h1>

          <p class="text-lg sm:text-xl text-gray-400 max-w-2xl mb-4">
            Full Stack Developer
          </p>

          <p class="text-base text-gray-500 max-w-2xl mb-10 leading-relaxed">
            Building apps with Angular, React, and AWS. This site is a living platform
            to host, demo, and let you interact with things I've built.
          </p>

          <div class="flex flex-wrap items-center gap-4">
            <a
              routerLink="/apps"
              class="inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 text-sm font-mono text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all"
            >
              View Apps
              <span class="text-xs">&rarr;</span>
            </a>
            <a
              href="https://github.com/RyanViers"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 text-sm font-mono text-gray-400 hover:text-gray-200 hover:border-gray-500 transition-all"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeHeroComponent implements OnDestroy {
  typedText = signal('');
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  private readonly phrases = [
    'ryan.viers --init',
    'loading modules...',
    'ready.',
  ];

  constructor() {
    afterNextRender(() => this.startTyping());
  }

  private startTyping() {
    let delay = 500;
    let currentPhrase = 0;
    let currentChar = 0;

    const typeNext = () => {
      if (currentPhrase >= this.phrases.length) return;

      const phrase = this.phrases[currentPhrase];

      if (currentChar <= phrase.length) {
        this.typedText.set(phrase.slice(0, currentChar));
        currentChar++;
        const id = setTimeout(typeNext, 40 + Math.random() * 30);
        this.timeouts.push(id);
      } else {
        // Pause then move to next phrase
        currentPhrase++;
        currentChar = 0;
        if (currentPhrase < this.phrases.length) {
          const id = setTimeout(() => {
            this.typedText.set('');
            const id2 = setTimeout(typeNext, 200);
            this.timeouts.push(id2);
          }, 1000);
          this.timeouts.push(id);
        }
      }
    };

    const id = setTimeout(typeNext, delay);
    this.timeouts.push(id);
  }

  ngOnDestroy() {
    this.timeouts.forEach(clearTimeout);
  }
}
