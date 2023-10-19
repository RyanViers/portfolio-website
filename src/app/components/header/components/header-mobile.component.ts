import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: ` <nav class="lg:hidden absolute z-50 w-full bg-gray-800">
    <div class="space-y-1 px-2 pb-3 pt-2">
      
      <button
        routerLink="/home"
        class="bg-gray-900 text-white block rounded-md py-2 px-3 text-base font-medium"
      >
        Home
      </button>
      <button
        routerLink="/about"
        class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
      >
        About
      </button>
      <button
        routerLink="/projects"
        class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
      >
        Projects
      </button>
      <button
        routerLink="/contact"
        class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
      >
        Contact
      </button>
    </div>
  </nav>`,
})
export class HeaderMobileComponent {}
