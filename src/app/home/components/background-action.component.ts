import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackgroundAction } from '../models';

@Component({
  selector: 'app-background-action',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<section
    aria-labelledby="social-impact-heading"
    class="px-4 pt-24 mx-auto max-w-7xl sm:px-6 sm:pt-32 lg:px-8"
  >
    <div class="relative overflow-hidden rounded-lg">
      <div class="absolute inset-0">
        <img
          [src]="options?.image"
          alt=""
          class="object-cover object-center w-full h-full"
        />
      </div>
      <div
        class="relative px-6 py-32 bg-gray-900 bg-opacity-75 sm:px-12 sm:py-40 lg:px-16"
      >
        <div
          class="relative flex flex-col items-center max-w-3xl mx-auto text-center"
        >
          <h2
            id="social-impact-heading"
            class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            <span class="block sm:inline">{{ options?.title }}</span>
          </h2>
          <p class="mt-3 text-xl text-white">
            {{ options?.description }}
          </p>
          <button
            (click)="options?.action()"
            class="block w-full px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100 sm:w-auto"
          >
            Click Here
          </button>
        </div>
      </div>
    </div>
  </section>`,
})
export class BackgroundActionComponent {
  @Input() options: BackgroundAction | undefined;
  constructor() {
    console.log(this.options);
  }
}
