import { TailwindIconsService } from './../../utils/services/icons.service';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadDirective } from 'src/app/utils/directives/lazy-load.directive';
import { AboutBottom, aboutBottom } from '../models';

@Component({
  selector: 'app-about-bottom',
  standalone: true,
  imports: [CommonModule, RouterModule, LazyLoadDirective],
  styles: [],
  template: `<!-- CTA section -->
    <div class="relative isolate -z-10 pb-8 mt-32 sm:mt-40">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20"
        >
          <img
            class="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
            [appLazyLoad]="pic"
          />
          <div class="w-full flex-auto">
            <h2
              class="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Assuring Your Success
            </h2>
            <p class="mt-6 text-lg leading-8 text-gray-300">
              Offering you a blend of professionalism, skill, and dedicated
              service
            </p>
            <ul
              role="list"
              class="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
            >
              <li *ngFor="let b of bottomList" class="flex gap-x-3">
                <span
                  class="w-6 h-6 text-green-500"
                  [innerHTML]="getIcon(b.icon)"
                ></span>
                {{ b.title }}
              </li>
            </ul>
            <div class="mt-10 flex">
              <a
                routerLink="/contact"
                class="text-sm font-semibold leading-6 text-indigo-400"
                >Contact Me <span>&rarr;</span></a
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      >
        <div
          class="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
          style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
        ></div>
      </div>
    </div>`,
})
export class AboutBottomComponent {
  bottomList: AboutBottom[] = aboutBottom;
  pic: string =
    'https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80';

  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}
