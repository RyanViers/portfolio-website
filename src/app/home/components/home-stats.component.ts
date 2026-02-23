import {
  Component,
  ElementRef,
  signal,
  viewChild,
  afterNextRender,
  OnDestroy,
} from '@angular/core';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

@Component({
  selector: 'app-home-stats',
  standalone: true,
  template: `
    <section #section class="py-20 bg-gray-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          @for (stat of stats; track stat.label; let i = $index) {
            <div class="rounded-xl bg-gray-900 border border-gray-800 p-6 sm:p-8 text-center">
              <div class="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono text-cyan-400 mb-2 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                {{ displayValues()[i] }}{{ stat.suffix }}
              </div>
              <div class="text-sm sm:text-base text-gray-500 font-mono">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomeStatsComponent implements OnDestroy {
  private section = viewChild.required<ElementRef<HTMLElement>>('section');
  private observer: IntersectionObserver | null = null;
  private animationId = 0;
  private hasAnimated = false;

  readonly stats: Stat[] = [
    { value: 7, suffix: '+', label: 'Projects' },
    { value: 8, suffix: '+', label: 'Technologies' },
    { value: 4, suffix: '+', label: 'Years Coding' },
    { value: 3, suffix: '', label: 'Frameworks' },
  ];

  displayValues = signal<number[]>(this.stats.map(() => 0));

  constructor() {
    afterNextRender(() => this.init());
  }

  private init() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCountUp();
        }
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.section().nativeElement);
  }

  private animateCountUp() {
    const duration = 1500;
    const start = performance.now();
    const targets = this.stats.map(s => s.value);

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      this.displayValues.set(
        targets.map(t => Math.round(eased * t)),
      );

      if (progress < 1) {
        this.animationId = requestAnimationFrame(tick);
      }
    };

    this.animationId = requestAnimationFrame(tick);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.observer?.disconnect();
  }
}
