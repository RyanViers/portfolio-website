import { HeaderComponent } from './../components/header/header.component';
import { HomeInfoCardsComponent } from './components/home-info-cards.component';
import { HomeCardsComponent } from './components/home-cards.component';
import { BackgroundActionComponent } from './components/background-action.component';
import { FooterComponent } from './../components/footer/footer.component';
import { HomeHeroComponent } from './components/home-hero.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackgroundAction } from './models';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    HomeHeroComponent,
    HeaderComponent,
    FooterComponent,
    BackgroundActionComponent,
    HomeCardsComponent,
    HomeInfoCardsComponent,
  ],
  standalone: true,
  styles: [``],
  template: `<div class="bg-white">
    <!-- Header -->
    <app-header></app-header>

    <!-- Hero Section -->
    <app-home-hero></app-home-hero>

    <main class="mb-8">
      <!-- Cards Section -->
      <app-home-cards></app-home-cards>

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
export class HomeComponent {
  backgroundActionOptions: BackgroundAction = {
    title: 'Get Started',
    description: 'Start your journey with us',
    image:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-01.jpg',
    action: () => {
      console.log('clicked');
    },
  };
  backgroundActionOptions2: BackgroundAction = {
    title: 'This is a test',
    description: 'Lets see if this works',
    image:
      'https://tailwindui.com/img/ecommerce-images/home-page-01-feature-section-02.jpg',
    action: () => {
      console.log('clicked twice');
    },
  };
  constructor() {}
}
