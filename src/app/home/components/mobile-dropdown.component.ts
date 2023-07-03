import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mobile-dropdown',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<div
    class="relative z-40 lg:hidden"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 bg-black bg-opacity-25"></div>

    <div class="fixed inset-0 z-40 flex">
      <div
        class="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl"
      >
        <div class="flex px-4 pt-5 pb-2">
          <button
            type="button"
            class="inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="px-4 py-6 space-y-6 border-t border-gray-200">
          <div class="flow-root">
            <a href="#" class="block p-2 -m-2 font-medium text-gray-900"
              >Company</a
            >
          </div>
          <div class="flow-root">
            <a href="#" class="block p-2 -m-2 font-medium text-gray-900"
              >Stores</a
            >
          </div>
        </div>

        <div class="px-4 py-6 space-y-6 border-t border-gray-200">
          <div class="flow-root">
            <a href="#" class="block p-2 -m-2 font-medium text-gray-900"
              >Create an account</a
            >
          </div>
          <div class="flow-root">
            <a href="#" class="block p-2 -m-2 font-medium text-gray-900"
              >Sign in</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class MobileDropdownComponent {}
