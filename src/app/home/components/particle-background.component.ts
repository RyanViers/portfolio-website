import {
  Component,
  ElementRef,
  viewChild,
  afterNextRender,
  OnDestroy,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

@Component({
  selector: 'app-particle-background',
  standalone: true,
  template: `
    <canvas
      #canvas
      class="absolute inset-0 w-full h-full"
    ></canvas>
  `,
})
export class ParticleBackgroundComponent implements OnDestroy {
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId = 0;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    afterNextRender(() => this.init());
  }

  private init() {
    const el = this.canvas().nativeElement;
    this.ctx = el.getContext('2d');
    if (!this.ctx) return;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(el.parentElement!);
    this.resize();
    this.animate();
  }

  private resize() {
    const el = this.canvas().nativeElement;
    const parent = el.parentElement!;
    el.width = parent.clientWidth;
    el.height = parent.clientHeight;
    this.initParticles();
  }

  private initParticles() {
    const el = this.canvas().nativeElement;
    const count = Math.floor((el.width * el.height) / 12000);
    this.particles = Array.from({ length: Math.min(count, 120) }, () => ({
      x: Math.random() * el.width,
      y: Math.random() * el.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }

  private animate() {
    if (!this.ctx) return;
    const el = this.canvas().nativeElement;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, el.width, el.height);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = el.width;
      if (p.x > el.width) p.x = 0;
      if (p.y < 0) p.y = el.height;
      if (p.y > el.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
      ctx.fill();
    }

    // Draw connections
    const maxDist = 120;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.resizeObserver?.disconnect();
  }
}
