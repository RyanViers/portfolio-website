import { HeaderComponent } from '../components/header/header.component';
import { HomeInfoCardsComponent } from './components/home-info-cards.component';
import { BackgroundActionComponent } from './components/background-action.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeHeroComponent } from './components/home-hero.component';
import { Component, inject } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  providers: [HomeService],
  imports: [
    HomeHeroComponent,
    HeaderComponent,
    FooterComponent,
    BackgroundActionComponent,
    HomeInfoCardsComponent,
  ],
  standalone: true,
  template: `
    <div class="bg-white">
    
      <!-- Header -->
      <app-header />

      <main class="mb-8">
        <!-- Hero Section -->
        <app-home-hero class="mb-8 md:mb-0" />

        <!-- Featured section -->
        <app-background-action class="mt-6" [options]="service.backgroundActionOptions" />

        <!-- Collection section -->
        <app-home-info-cards />

        <!-- Featured section -->
        <app-background-action [options]="service.backgroundActionOptions2" />
      </main>

      <app-footer />
    </div> 
    `,
})
export default class HomeComponent {
  public service = inject(HomeService);
}
