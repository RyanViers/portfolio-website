import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [],
  template: ` <div class="relative bg-gray-900">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <img
        src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
        class="object-cover object-center w-full h-full"
      />
    </div>
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>

    <div
      class="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0"
    >
      <h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">
        Ryan Viers: Portfolio Website
      </h1>
      <p class="mt-4 text-xl text-white">
        Full Stack Web Developer. Angular, Ionic, Tailwind, and more.
      </p>
      <a
        [routerLink]="['check']"
        class="inline-block px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100"
        >Projects</a
      >
    </div>
  </div>`,
})
export class HomeHeroComponent {}
