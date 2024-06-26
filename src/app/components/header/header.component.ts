import { HeaderService } from './header.service';
import { HeaderTopComponent } from './components/header-top.component';
import { HeaderNavbarComponent } from './components/header-navbar.component';
import { Component, inject } from '@angular/core';
import { HeaderMobileComponent } from './components/header-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [HeaderService],
  imports: [
    HeaderMobileComponent,
    HeaderNavbarComponent,
    HeaderTopComponent,
  ],
  template: `
    <header class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
        <app-header-top />
        <app-header-navbar />
      </div>

      @if(service.$menuToggle()) {
        <app-header-mobile />
      }
    </header>`,
})
export class HeaderComponent {
  public service = inject(HeaderService);
}
