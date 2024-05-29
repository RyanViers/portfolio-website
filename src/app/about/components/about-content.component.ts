import { Component, inject } from '@angular/core';
import { LazyLoadDirective } from 'src/app/utils/directives/lazy-load.directive';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-about-content',
  standalone: true,
  imports: [LazyLoadDirective],
  template: `<!-- Image section -->
    <div class="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
      <img
        [appLazyLoad]="service.aboutPicture"
        loading="lazy"
        class="aspect-[9/4] w-full object-cover xl:rounded-3xl"
      />
    </div>

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
        @for(a of service.aboutList; track a) {
          <div class="relative pl-9">
            <dt class="inline font-semibold text-white">
              <span
                class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                [innerHTML]="a.icon"
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

  public service = inject(AboutService);
  
}
