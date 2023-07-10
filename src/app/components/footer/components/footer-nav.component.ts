import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: `<div class="grid grid-cols-2 gap-8 xl:col-span-2">
  <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
    <div>
      <a
        routerLink="/home"
        class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >Home</a
      >
    </div>
    <div>
      <a
        routerLink="/about"
        class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >About</a
      >
    </div>
  </div>
  <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
    <div>
      <a
        routerLink="/projects"
        class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >Projects</a
      >
    </div>
    <div>
      <a
        routerLink="/contact"
        class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >Contact</a
      >
    </div>
  </div>
</div>`,
})
export class FooterNavComponent {

}
