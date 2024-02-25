import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Links } from '../models/models';

@Component({
  selector: 'app-footer-nav',
  standalone: true,
  imports: [RouterModule],
  template: `
  <div class="grid grid-cols-2 gap-8 xl:col-span-2">
    <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        @for (link of links; track link.id) {
          <a
            routerLink="{{ link.url }}"
            class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
            >{{ link.name }}</a>
        }  
    </div>
  </div>`,
})
export class FooterNavComponent {
  links: Links[] = [
    { id: 1, name: 'Home', url: '/home' },
    { id: 2, name: 'About', url: '/about' },
    { id: 3,  name: 'Projects', url: '/projects' },
    { id: 4,  name: 'Contact', url: '/contact' },
  ];
  constructor() {}
}
