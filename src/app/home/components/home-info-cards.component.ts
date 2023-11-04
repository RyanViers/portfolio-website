import { LazyLoadDirective } from './../../utils/directives/lazy-load.directive';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { InfoCard, infoCards } from 'src/app/utils/models';
import { fader, opacityScale } from 'src/app/utils/animations';

@Component({
  selector: 'app-home-info-cards',
  standalone: true,
  imports: [RouterModule, LazyLoadDirective],
  styles: [],
  animations: [opacityScale, fader],
  template: `<section
    class="max-w-xl px-4 pt-24 mx-auto sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
  >
    <h2 class="text-2xl font-bold tracking-tight text-gray-900">
      Key Expertise
    </h2>
    <p class="mt-4 text-base text-gray-500">
      Explore the power and potential that I bring to every project through my
      primary tools: Angular, React, and Tailwind CSS. These technologies
      empower me to deliver robust, performant, and visually striking web
      applications.
    </p>

    <div
      class="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0"
    >
      @for (card of infoCards; track card.technology) {
        <a
          routerLink="/projects"
          class="block group"
        >
          <h1 class="mt-4 text-base font-semibold text-gray-900">
            {{ card?.technology }}
          </h1>
          <div
            class="overflow-hidden rounded-lg aspect-h-2 aspect-w-3 lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
          >
            <img
              @fader
              [appLazyLoad]="card?.image"
              class="object-cover object-center w-full h-full"
            />
          </div>
          <h3 class="mt-4 text-base font-semibold text-gray-900">
            {{ card?.title }}
          </h3>
          <p class="mt-2 text-sm text-gray-500">
            {{ card?.description }}
          </p>
        </a>
      }
    </div>
  </section>`,
})
export class HomeInfoCardsComponent {
  infoCards: InfoCard[] = infoCards;
  constructor() {}
}
