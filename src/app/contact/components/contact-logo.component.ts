import { LazyLoadDirective } from 'src/app/utils/directives/lazy-load.directive';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-logo',
  standalone: true,
  imports: [LazyLoadDirective],
  template: `<div
      class="flex justify-center items-center w-full h-full bg-gray-900 py-24 sm:py-32"
      >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3"
          >
          @for (i of images; track i) {
            <div class="bg-white/5 p-8 sm:p-10">
              <img
                class="max-h-12 w-full object-contain"
                [appLazyLoad]="i"
                width="158"
                height="48"
                />
              </div>
            }
          </div>
        </div>
      </div>`,
})
export class ContactLogoComponent {
  images: string[] = [
    'assets/technology/angular-bw.png',
    'assets/technology/react-bw.png',
    'assets/technology/tailwind-bw.jpeg',
    'assets/technology/ionic-black.png',
    'assets/technology/js-ts.jpeg',
    'assets/technology/aws-bw.png',
  ];
}
