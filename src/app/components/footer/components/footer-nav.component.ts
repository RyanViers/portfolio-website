import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterService } from '../footer.service';

@Component({
  selector: 'app-footer-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center gap-6">
      @for (link of service.links; track link.label) {
        @if (link.external) {
          <a
            [href]="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-mono text-gray-500 hover:text-cyan-400 transition-colors"
          >
            {{ link.label }}
          </a>
        } @else {
          <a
            [routerLink]="link.route"
            class="text-sm font-mono text-gray-500 hover:text-cyan-400 transition-colors"
          >
            {{ link.label }}
          </a>
        }
      }
    </div>
  `,
})
export class FooterNavComponent {
  service = inject(FooterService);
}
