import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  host: {
    class: 'animate-enter:fade-in animate-leave:fade-out',
  },
  template: `
    <nav class="lg:hidden absolute z-50 w-full bg-gray-950/95 backdrop-blur-sm border-t border-gray-800">
      <div class="space-y-1 px-4 pb-4 pt-2">
        @for (item of service.navItems; track item.label) {
          @if (item.external) {
            <a
              [href]="item.href"
              target="_blank"
              rel="noopener noreferrer"
              (click)="service.$menuToggle.set(false)"
              class="block rounded-md py-2 px-3 text-base font-mono text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors"
            >
              {{ item.label }}
            </a>
          } @else {
            <a
              [routerLink]="item.route"
              routerLinkActive="text-cyan-400"
              [routerLinkActiveOptions]="{ exact: item.route === '/' }"
              (click)="service.$menuToggle.set(false)"
              class="block rounded-md py-2 px-3 text-base font-mono text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 transition-colors"
            >
              {{ item.label }}
            </a>
          }
        }
      </div>
    </nav>
  `,
})
export class HeaderMobileComponent {
  service = inject(HeaderService);
}
