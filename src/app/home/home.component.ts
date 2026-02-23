import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeHeroComponent } from './components/home-hero.component';
import { HomeStatsComponent } from './components/home-stats.component';
import { SkillRadarComponent } from './components/skill-radar.component';
import { HomeAppsPreviewComponent } from './components/home-apps-preview.component';
import { HomeActivityGridComponent } from './components/home-activity-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HomeHeroComponent,
    HomeStatsComponent,
    SkillRadarComponent,
    HomeAppsPreviewComponent,
    HomeActivityGridComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-950 flex flex-col">
      <app-header />

      <main class="flex-1">
        <app-home-hero />
        <app-home-stats />
        <app-skill-radar />
        <app-home-apps-preview />
        <app-home-activity-grid />
      </main>

      <app-footer />
    </div>
  `,
})
export default class HomeComponent {}
