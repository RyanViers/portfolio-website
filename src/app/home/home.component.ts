import { HeaderComponent } from '../components/header/header.component';
import { HomeInfoCardsComponent } from './components/home-info-cards.component';
import { BackgroundActionComponent } from './components/background-action.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeHeroComponent } from './components/home-hero.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackgroundAction } from '../utils/models';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    HomeHeroComponent,
    HeaderComponent,
    FooterComponent,
    BackgroundActionComponent,
    HomeInfoCardsComponent,
  ],
  standalone: true,
  styles: [``],
  template: `<div class="bg-white">
  
    <!-- Header -->
    <app-header />

    <main class="mb-8">
      <!-- Hero Section -->
      <app-home-hero class="mb-8 md:mb-0" />

      <!-- Featured section -->
      <app-background-action
        class="mt-6"
        [options]="backgroundActionOptions"
      />

      <!-- Collection section -->
      <app-home-info-cards />

      <!-- Featured section -->
      <app-background-action
        [options]="backgroundActionOptions2"
      />
    </main>

    <app-footer />
  </div> `,
})
export default class HomeComponent {
  backgroundActionOptions: BackgroundAction = {
    title: 'Curious to Know More?',
    description: `Navigate to the 'About' section for a deeper dive into my journey, skills, and work ethic`,
    image: 'assets/content/code-1.webp',
    link: '/about',
  };
  backgroundActionOptions2: BackgroundAction = {
    title: 'Ready to Connect?',
    description: `Head to the 'Contact' section to get in touch and start discussing your project needs`,
    image: 'assets/content/code2.jpeg',
    link: '/contact',
  };
  constructor() {}
}
