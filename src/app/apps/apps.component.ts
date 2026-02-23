import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AppsData } from './apps.data';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-950 flex flex-col">
      <app-header />

      <main class="flex-1">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div class="mb-12">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-100 mb-3">Apps</h1>
            <p class="text-gray-500 max-w-2xl">
              Projects I've built across different frameworks and platforms. Each one solves
              a real problem or explores a technology I wanted to learn.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (app of apps; track app.id) {
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
                  <p class="text-sm text-gray-400 mb-4 line-clamp-3">{{ app.description }}</p>
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
                    @if (app.hosted) {
                      <a
                        [routerLink]="['/apps', app.id]"
                        class="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Launch App &rarr;
                      </a>
                    } @else if (app.demo) {
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
        </div>
      </main>

      <app-footer />
    </div>
  `,
})
export default class AppsComponent {
  apps = AppsData;
}
