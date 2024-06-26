import { TailwindIcon, TailwindIconType } from './../../../utils/tailwind-icons';
import { HeaderService } from './../header.service';
import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header-top',
  standalone: true,
  template: `<div class="relative flex h-16 justify-between">
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
                <span class="w-6 h-6 text-gray-400" [innerHTML]="search"></span>
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
            (click)="service.$menuToggle.set(!service.$menuToggle())"
            class="relative z-10 flex items-center lg:hidden"
            >
            <!-- Mobile menu button -->
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              >
    
              @if (!(service.$menuToggle())) {
                <span
                  class="w-6 h-6"
                  [innerHTML]="bars"
                  >Open menu</span
                  >
              }
              @if (service.$menuToggle()) {
                <span
                  class="w-6 h-6"
                  [innerHTML]="x"
                  >Open menu</span
                  >
                }
              </button>
            </div>
          </div>`,
})
export class HeaderTopComponent {
  public service = inject(HeaderService);
  private sanitizer = inject(DomSanitizer);

  bars = TailwindIcon.getTailwindIconSvg(TailwindIconType.BARS, this.sanitizer)
  x = TailwindIcon.getTailwindIconSvg(TailwindIconType.X_MARK, this.sanitizer)
  search = TailwindIcon.getTailwindIconSvg(TailwindIconType.SEARCH, this.sanitizer)
}
