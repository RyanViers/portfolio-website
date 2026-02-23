import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="hidden lg:flex lg:items-center lg:gap-1">
      @for (item of service.navItems; track item.label) {
        @if (item.external) {
          <a
            [href]="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-cyan-400 px-3 py-2 text-sm font-mono transition-colors"
          >
            {{ item.label }}
          </a>
        } @else {
          <a
            [routerLink]="item.route"
            routerLinkActive="text-cyan-400"
            [routerLinkActiveOptions]="{ exact: item.route === '/' }"
            class="text-gray-400 hover:text-cyan-400 px-3 py-2 text-sm font-mono transition-colors"
          >
            {{ item.label }}
          </a>
        }
      }
    </nav>
  `,
})
export class HeaderNavbarComponent {
  service = inject(HeaderService);
}
