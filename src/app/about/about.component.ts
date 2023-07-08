import { AboutBottomComponent } from './components/about-bottom.component';
import { AboutContentComponent } from './components/about-content.component';
import { AboutHeaderComponent } from './components/about-header.component';
import { FooterComponent } from './../components/footer/footer.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    AboutHeaderComponent,
    AboutContentComponent,
    AboutBottomComponent
  ],
  styles: [],
  template: `<app-header></app-header>
    <div class="bg-gray-900">
      <main class="relative isolate">
        <!-- Background -->
        <div
          class="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
          ></div>
        </div>

        <!-- Header section -->
        <app-about-header></app-about-header>

        <!-- Content section -->
        <app-about-content></app-about-content>

        <!-- Bottom section -->
        <app-about-bottom></app-about-bottom>
        
      </main>
    </div>

    <app-footer class="relative"></app-footer>`,
})
export default class AboutComponent {}