import {
  Component,
  ElementRef,
  signal,
  viewChild,
  afterNextRender,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-home-activity-grid',
  standalone: true,
  template: `
    <section #section class="py-20 bg-gray-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-100 mb-2">Commit to the Craft</h2>
        <p class="text-gray-500 mb-8">Always building something.</p>

        <div class="overflow-x-auto pb-4">
          <div class="grid grid-flow-col gap-[3px]" style="grid-template-rows: repeat(7, 1fr); width: max-content;">
            @for (cell of cells; track $index) {
              <div
                class="w-[13px] h-[13px] rounded-sm transition-all duration-300"
                [style.background-color]="visibleCount() > $index ? colors[cell] : 'rgb(17, 24, 39)'"
                [style.opacity]="visibleCount() > $index ? 1 : 0.3"
              ></div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HomeActivityGridComponent implements OnDestroy {
  private section = viewChild.required<ElementRef<HTMLElement>>('section');
  private observer: IntersectionObserver | null = null;
  private animationId = 0;
  private hasAnimated = false;

  readonly colors: Record<number, string> = {
    0: 'rgb(17, 24, 39)',
    1: 'rgba(6, 182, 212, 0.2)',
    2: 'rgba(6, 182, 212, 0.45)',
    3: 'rgba(6, 182, 212, 0.7)',
    4: 'rgb(6, 182, 212)',
  };

  // 52 columns × 7 rows = 364 cells
  readonly cells: number[] = this.generateCells();
  visibleCount = signal(0);

  constructor() {
    afterNextRender(() => this.init());
  }

  private generateCells(): number[] {
    const total = 52 * 7;
    return Array.from({ length: total }, () => {
      const r = Math.random();
      if (r < 0.3) return 0;
      if (r < 0.55) return 1;
      if (r < 0.75) return 2;
      if (r < 0.9) return 3;
      return 4;
    });
  }

  private init() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateWave();
        }
      },
      { threshold: 0.2 },
    );
    this.observer.observe(this.section().nativeElement);
  }

  private animateWave() {
    const total = this.cells.length;
    // Reveal cells in batches for a wave effect (~column at a time)
    const batchSize = 7;
    const intervalMs = 18;
    let revealed = 0;

    const step = () => {
      revealed += batchSize;
      if (revealed > total) revealed = total;
      this.visibleCount.set(revealed);

      if (revealed < total) {
        this.animationId = requestAnimationFrame(() => {
          setTimeout(step, intervalMs);
        });
      }
    };

    step();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.observer?.disconnect();
  }
}
