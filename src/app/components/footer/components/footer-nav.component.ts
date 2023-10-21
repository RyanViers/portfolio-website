import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Links } from '../models/models';

@Component({
  selector: 'app-footer-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: `<div class="grid grid-cols-2 gap-8 xl:col-span-2">
    <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
      <div *ngFor="let link of links">
        
          <a
            routerLink="{{ link.url }}"
            class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
            >{{ link.name }}</a>
        
      </div> 
    </div>
  </div>`,
})
export class FooterNavComponent {
  links: Links[] = [
    { name: 'Home', url: '/home' },
    { name: 'About', url: '/about' },
    { name: 'Projects', url: '/projects' },
    { name: 'Contact', url: '/contact' },
  ];
  constructor() {}
}
