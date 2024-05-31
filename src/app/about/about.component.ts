import { AboutBottomComponent } from './components/about-bottom.component';
import { AboutContentComponent } from './components/about-content.component';
import { AboutHeaderComponent } from './components/about-header.component';
import { FooterComponent } from './../components/footer/footer.component';
import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  standalone: true,
  providers: [AboutService],
  imports: [
    HeaderComponent,
    FooterComponent,
    AboutHeaderComponent,
    AboutContentComponent,
    AboutBottomComponent,
  ],
  template: `
    <app-header class="relative z-50"/>
    
    <div class="bg-gray-900">
      <main >

        <!-- Header section -->
        <app-about-header />

        <!-- Content section -->
        <app-about-content />

        <!-- Bottom section -->
        <app-about-bottom />
      </main>
    </div>

    <app-footer class="relative" />`,
})
export default class AboutComponent {}
