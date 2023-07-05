import { HeaderComponent } from './../components/header/header.component';
import { HomeInfoCardsComponent } from './components/home-info-cards.component';
import { BackgroundActionComponent } from './components/background-action.component';
import { FooterComponent } from './../components/footer/footer.component';
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
    <app-header></app-header>

    <main class="mb-8">
      <!-- Hero Section -->
      <app-home-hero></app-home-hero>

      <!-- Featured section -->
      <app-background-action
        [options]="backgroundActionOptions"
      ></app-background-action>

      <!-- Collection section -->
      <app-home-info-cards></app-home-info-cards>

      <!-- Featured section -->
      <app-background-action
        [options]="backgroundActionOptions2"
      ></app-background-action>
    </main>

    <app-footer></app-footer>
  </div> `,
})
export default class HomeComponent {
  backgroundActionOptions: BackgroundAction = {
    title: 'Projects',
    description: 'Check out the work I have done so far!',
    image: 'assets/content/code-1.webp',
    link: '/projects',
  };
  backgroundActionOptions2: BackgroundAction = {
    title: 'This is a test',
    description: 'Lets see if this works',
    image:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg',
    link: '/contact',
  };
  constructor() {}
}
