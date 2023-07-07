import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LazyLoadDirective } from 'src/app/utils/directives/lazy-load.directive';
import { fader, opacityScaleDelayLong } from 'src/app/utils/animations';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, LazyLoadDirective],
  styles: [],
  animations: [fader, opacityScaleDelayLong],
  template: ` <div
    class="bg-white relative px-4 pt-24 mx-auto max-w-7xl sm:px-6  lg:px-8"
  >
    <div class="relative">
      <div class="mx-auto max-w-7xl">
        <div class="relative z-10  lg:w-full lg:max-w-2xl">
          <svg
            class="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div class="relative px-6 py-10  lg:px-8  lg:pr-0">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div class="hidden sm:mb-10 sm:flex">
                <div
                  class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                >
                  Reach Out and Say Hello
                  <a
                    routerLink="/contact"
                    class="whitespace-nowrap font-semibold text-indigo-600"
                    ><span class="absolute inset-0" aria-hidden="true"></span
                    >Contact Me <span aria-hidden="true">&rarr;</span></a
                  >
                </div>
              </div>
              <h1
                class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Ryan Viers - Full Stack Web Developer
              </h1>
              <p class="mt-6 text-sm sm:text-lg leading-8 text-gray-600">
                I'm a Full Stack Developer, skilled in using a multitude of
                technologies including Angular, Ionic, and React. I focus on
                building efficient, scalable web applications backed by robust
                cloud services like AWS and Firebase. My aim is to create
                solutions that truly meet user needs and business goals. Explore
                my portfolio to see how I turn concepts into reality.
              </p>
              <div class="mt-10 flex items-center gap-x-6">
                <a
                  href="https://github.com/RyanViers"
                  class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >GitHub Profile</a
                >
                <a
                  routerLink="/projects"
                  class="text-sm font-semibold leading-6 text-gray-900"
                  >Explore Projects <span aria-hidden="true">→</span></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          @fader
          class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          [appLazyLoad]="heroPicture"
        />
      </div>
    </div>
  </div>`,
})
export class HomeHeroComponent {
  heroPicture: string =
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80';
  constructor() {}
}
