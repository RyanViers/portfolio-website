import { LazyLoadDirective } from 'src/app/utils/directives/lazy-load.directive';
import { TailwindIconsService } from '../utils/services/icons.service';
import { FooterComponent } from '../components/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';
import { Projects, projects } from '../utils/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, LazyLoadDirective],
  styles: [],
  template: `<app-header />
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-800 p-4"
    >
      
      <li
        *ngFor="let p of projects"
        class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-[#fefefe] text-center shadow"
      >
        <div class="flex flex-1 flex-col p-8">
          <img
            class="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            [appLazyLoad]="p.image"
          />
          <h3 class="mt-6 text-sm font-medium text-gray-900">{{ p.title }}</h3>
          <dl class="mt-1 flex flex-grow flex-col justify-between">
            <dd class="text-sm text-gray-500">{{ p.description }}</dd>

            <dd class="mt-3">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >{{ p.technologies }}</span
              >
            </dd>
          </dl>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="flex w-0 flex-1">
              <a
                href="{{ p.github }}"
                class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <img class="w-5 h-5" [appLazyLoad]="github" />
                GitHub
              </a>
            </div>
            <div class="-ml-px flex w-0 flex-1">
              <a
                href="{{ p.demo }}"
                class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <span class="w-5 h-5" [innerHTML]="getIcon(7)"></span>
                Check it out
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <app-footer /> `,
})
export default class ProjectsComponent {
  projects: Projects[] = projects;
  github: string = 'assets/social-icons/icons8-github.svg';

  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}
