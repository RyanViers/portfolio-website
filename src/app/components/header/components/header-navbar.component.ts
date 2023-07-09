import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: `<nav
    class="hidden lg:flex lg:space-x-8 lg:py-2"
  >
    <button
      routerLink="/home"
      class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Home
    </button>
    <button
      routerLink="/about"
      class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      About
    </button>
    <button
      routerLink="/projects"
      class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Projects
    </button>
    <button
      routerLink="/contact"
      class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
    >
      Contact
    </button>
  </nav>`,
})
export class HeaderNavbarComponent {}
