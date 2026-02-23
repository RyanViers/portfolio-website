import { Component, inject } from '@angular/core';
import { HeaderService } from './header.service';
import { HeaderTopComponent } from './components/header-top.component';
import { HeaderNavbarComponent } from './components/header-navbar.component';
import { HeaderMobileComponent } from './components/header-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [HeaderService],
  imports: [HeaderTopComponent, HeaderNavbarComponent, HeaderMobileComponent],
  template: `
    <header class="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <app-header-top class="flex-1" />
        <app-header-navbar />
      </div>

      @if (service.$menuToggle()) {
        <app-header-mobile />
      }
    </header>
  `,
})
export class HeaderComponent {
  service = inject(HeaderService);
}
