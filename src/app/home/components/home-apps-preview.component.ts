import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppsData } from '../../apps/apps.data';
import { App } from '../../utils/models';

@Component({
  selector: 'app-home-apps-preview',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="py-24 bg-gray-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-100 mb-2">Featured Apps</h2>
            <p class="text-gray-500">Things I've built that you can try out.</p>
          </div>
          <a
            routerLink="/apps"
            class="hidden sm:inline-flex items-center gap-1 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all <span>&rarr;</span>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (app of featuredApps; track app.id) {
            <div class="group rounded-xl bg-gray-900 border border-gray-800 overflow-hidden hover:glow-card-hover transition-all duration-300 glow-card">
              <div class="aspect-video bg-gray-800 overflow-hidden">
                <img
                  [src]="app.image"
                  [alt]="app.title"
                  class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-100 mb-2">{{ app.title }}</h3>
                <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ app.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  @for (tech of app.technologies; track tech) {
                    <span class="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {{ tech }}
                    </span>
                  }
                </div>
                <div class="flex items-center gap-3">
                  @if (app.github) {
                    <a
                      [href]="app.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      GitHub
                    </a>
                  }
                  @if (app.demo) {
                    <a
                      [href]="app.demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Live Demo &rarr;
                    </a>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <div class="mt-8 text-center sm:hidden">
          <a
            routerLink="/apps"
            class="inline-flex items-center gap-1 text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all apps <span>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HomeAppsPreviewComponent {
  featuredApps: App[] = AppsData.filter(a => a.featured).slice(0, 3);
}
