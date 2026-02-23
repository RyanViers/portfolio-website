import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderService } from '../header.service';
import { TailwindIcon, TailwindIconType } from '../../../utils/tailwind-icons';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header-top',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="relative flex h-16 items-center justify-between">
      <a routerLink="/" class="flex items-center gap-2">
        <span class="text-xl font-bold font-mono text-cyan-400">RV</span>
        <span class="hidden sm:inline text-sm text-gray-400 font-mono">~/ryan.viers</span>
      </a>

      <div class="relative z-10 flex items-center lg:hidden">
        <button
          type="button"
          (click)="service.$menuToggle.set(!service.$menuToggle())"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-400"
        >
          @if (!service.$menuToggle()) {
            <span class="w-6 h-6" [innerHTML]="bars"></span>
          }
          @if (service.$menuToggle()) {
            <span class="w-6 h-6" [innerHTML]="x"></span>
          }
        </button>
      </div>
    </div>
  `,
})
export class HeaderTopComponent {
  service = inject(HeaderService);
  private sanitizer = inject(DomSanitizer);

  bars = TailwindIcon.getTailwindIconSvg(TailwindIconType.BARS, this.sanitizer);
  x = TailwindIcon.getTailwindIconSvg(TailwindIconType.X_MARK, this.sanitizer);
}
