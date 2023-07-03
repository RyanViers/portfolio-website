import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [],
  template: ` <!-- Hero section -->
    <div class="relative bg-gray-900">
      <!-- Decorative image and overlay -->
      <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
        <img
          src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
          alt=""
          class="object-cover object-center w-full h-full"
        />
      </div>
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-gray-900 opacity-50"
      ></div>

      <!-- Navigation -->
      <header class="relative z-10">
        <nav aria-label="Top">
          <!-- Top navigation -->
          <div class="bg-gray-900">
            <div
              class="flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
            >
              <div class="flex items-center space-x-6">
                <a
                  href="#"
                  class="text-sm font-medium text-white hover:text-gray-100"
                  >Sign in</a
                >
                <a
                  href="#"
                  class="text-sm font-medium text-white hover:text-gray-100"
                  >Create an account</a
                >
              </div>
            </div>
          </div>

          <!-- Secondary navigation -->
          <div class=" bg-white bg-opacity-10 backdrop-blur-md backdrop-filter">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div>
                <div class="flex items-center justify-between h-16">
                  <!-- Logo (lg+) -->
                  <div class="hidden lg:flex lg:flex-1 lg:items-center">
                    <a href="#">
                      <span class="sr-only">Your Company</span>
                      <img
                        class="w-auto h-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                        alt=""
                      />
                    </a>
                  </div>

                  <!-- Mobile menu and search (lg-) -->
                  <div class="hidden  items-center flex-1 lg:hidden">
                    <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. -->
                    <button type="button" class="p-2 -ml-2 text-white">
                      <span class="sr-only">Open menu</span>
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
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </button>

                    <!-- Search -->
                    <a href="#" class="p-2 ml-2 text-white">
                      <span class="sr-only">Search</span>
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
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </a>
                  </div>

                  <!-- Logo (lg-) -->
                  <a href="#" class="lg:hidden">
                    <span class="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=white"
                      alt=""
                      class="w-auto h-8"
                    />
                  </a>

                  <div class="flex items-center justify-end flex-1">
                    <a
                      href="#"
                      class="hidden text-sm font-medium text-white lg:block"
                      >Search</a
                    >

                    <div class="flex items-center lg:ml-8">
                      <!-- Help -->
                      <a href="#" class="p-2 text-white lg:hidden">
                        <span class="sr-only">Help</span>
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
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                          />
                        </svg>
                      </a>
                      <a
                        href="#"
                        class="hidden text-sm font-medium text-white lg:block"
                        >Help</a
                      >

                      <!-- Cart -->
                      <div class="flow-root ml-4 lg:ml-8">
                        <a href="#" class="flex items-center p-2 -m-2 group">
                          <svg
                            class="flex-shrink-0 w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          <span class="ml-2 text-sm font-medium text-white"
                            >0</span
                          >
                          <span class="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        class="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0"
      >
        <h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          New arrivals are here
        </h1>
        <p class="mt-4 text-xl text-white">
          The new arrivals have, well, newly arrived. Check out the latest
          options from our summer small-batch release while they're still in
          stock.
        </p>
        <a
          [routerLink]="['check']"
          class="inline-block px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100"
          >Shop New Arrivals</a
        >
      </div>
    </div>`,
})
export class HomeHeroComponent {}
