import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Links, headerLinks } from '../models';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
  <nav class="hidden lg:flex lg:space-x-8 lg:py-2">
    @for (link of links; track link.id) {
      <button
        [routerLink]="link.url"
        class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
      >
        {{ link.name }}
      </button>
    }
  </nav>`,
})
export class HeaderNavbarComponent {
  links: Links[] = headerLinks;

  constructor() {}

}
