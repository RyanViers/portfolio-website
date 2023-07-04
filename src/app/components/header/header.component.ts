import { TailwindIconsService } from './../../utils/services/icons.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: `<header class="bg-gray-800">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="block h-8 w-auto"
              src="assets/icon.png"
              alt="Your Company"
            />
          </div>
        </div>
        <div
          class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"
        >
          <div class="w-full sm:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <span
                  class="w-6 h-6 text-gray-400"
                  [innerHTML]="getIcon(6)"
                ></span>
              </div>
              <input
                id="search"
                name="search"
                class="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div
          (click)="mobileDropdown = !mobileDropdown"
          class="relative z-10 flex items-center lg:hidden"
        >
          <!-- Mobile menu button -->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span
              *ngIf="!mobileDropdown"
              class="w-6 h-6"
              [innerHTML]="getIcon(9)"
              >Open menu</span
            >
            <span
              *ngIf="mobileDropdown"
              class="w-6 h-6"
              [innerHTML]="getIcon(1)"
              >Open menu</span
            >
          </button>
        </div>
      </div>
      <nav class="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <button
          [routerLink]="['']"
          class="bg-gray-900 text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >
          Home
        </button>
        <button
          [routerLink]="['about']"
          class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >
          About
        </button>
        <button
          [routerLink]="['projects']"
          class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >
          Projects
        </button>
        <button
          [routerLink]="['contact']"
          class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
        >
          Contact
        </button>
      </nav>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <nav
      *ngIf="mobileDropdown"
      class="lg:hidden absolute z-50 w-full bg-gray-800"
    >
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <button
          [routerLink]="['']"
          class="bg-gray-900 text-white block rounded-md py-2 px-3 text-base font-medium"
        >
          Home
        </button>
        <button
          [routerLink]="['about']"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
        >
          About
        </button>
        <button
          [routerLink]="['projects']"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
        >
          Projects
        </button>
        <button
          [routerLink]="['contact']"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
        >
          Contact
        </button>
      </div>
    </nav>
  </header>`,
})
export class HeaderComponent {
  mobileDropdown = false;

  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}
