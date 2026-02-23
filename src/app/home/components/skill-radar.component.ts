import {
  Component,
  ElementRef,
  viewChild,
  afterNextRender,
  OnDestroy,
} from '@angular/core';

interface Skill {
  label: string;
  value: number; // 0-1
}

@Component({
  selector: 'app-skill-radar',
  standalone: true,
  template: `
    <section #section class="pb-20 bg-gray-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-100 mb-2 text-center">Core Skills</h2>
        <p class="text-gray-500 text-center mb-12">Technologies I work with most.</p>
        <div class="flex justify-center">
          <canvas
            #canvas
            class="max-w-full"
            style="width: 420px; height: 420px;"
          ></canvas>
        </div>
      </div>
    </section>
  `,
})
export class SkillRadarComponent implements OnDestroy {
  private section = viewChild.required<ElementRef<HTMLElement>>('section');
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private observer: IntersectionObserver | null = null;
  private animationId = 0;
  private hasAnimated = false;

  private readonly skills: Skill[] = [
    { label: 'Angular', value: 0.95 },
    { label: 'React', value: 0.75 },
    { label: 'TypeScript', value: 0.9 },
    { label: 'AWS', value: 0.8 },
    { label: 'Node.js', value: 0.7 },
    { label: 'Tailwind', value: 0.85 },
  ];

  constructor() {
    afterNextRender(() => this.init());
  }

  private init() {
    const el = this.canvas().nativeElement;
    const dpr = window.devicePixelRatio || 1;
    el.width = 420 * dpr;
    el.height = 420 * dpr;
    const ctx = el.getContext('2d')!;
    ctx.scale(dpr, dpr);

    // Draw static grid immediately
    this.drawGrid(ctx);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateDraw(ctx);
        }
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.section().nativeElement);
  }

  private drawGrid(ctx: CanvasRenderingContext2D) {
    const cx = 210;
    const cy = 210;
    const maxR = 150;
    const count = this.skills.length;
    const levels = 5;

    ctx.clearRect(0, 0, 420, 420);

    // Grid rings
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (maxR / levels) * lvl;
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(75, 85, 99, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axis lines
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = 'rgba(75, 85, 99, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Labels
    ctx.font = '13px "JetBrains Mono", "Fira Code", monospace';
    ctx.fillStyle = 'rgb(156, 163, 175)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const labelR = maxR + 28;
      const x = cx + Math.cos(angle) * labelR;
      const y = cy + Math.sin(angle) * labelR;
      ctx.fillText(this.skills[i].label, x, y);
    }
  }

  private animateDraw(ctx: CanvasRenderingContext2D) {
    const duration = 1200;
    const start = performance.now();
    const cx = 210;
    const cy = 210;
    const maxR = 150;
    const count = this.skills.length;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      // Redraw grid
      this.drawGrid(ctx);

      // Data polygon
      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const idx = i % count;
        const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
        const r = this.skills[idx].value * maxR * eased;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vertex dots
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const r = this.skills[i].value * maxR * eased;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(6, 182, 212)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 6;
        ctx.stroke();
      }

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
