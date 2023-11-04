import { TailwindIconsService } from './../../utils/services/icons.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyLoadDirective } from 'src/app/utils/directives/lazy-load.directive';
import { AboutList, aboutList } from '../models';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [RouterModule, LazyLoadDirective],
  styles: [],
  template: `<!-- Image section -->
    <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
      <img
        [appLazyLoad]="aboutPicture"
        loading="lazy"
        class="aspect-[9/4] w-full object-cover xl:rounded-3xl"
      />
    </div>

    <!-- Values section -->
    <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Values: The Pillars of My Approach
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Anchoring every project with a strong set of core principles
        </p>
      </div>
      <dl
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16"
      >
        @for (a of aboutList; track a.icon) {
          <div class="relative pl-9">
            <dt class="inline font-semibold text-white">
              <span
                class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                [innerHTML]="getIcon(a.icon)"
              ></span>
              {{ a.title }}
            </dt>
            <dd class="inline">{{ a.description }}&#125;</dd>
          </div>
        }
      </dl>
    </div>`,
})
export class AboutContentComponent {
  aboutList: AboutList[] = aboutList;
  aboutPicture: string =
    'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80';

  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}
