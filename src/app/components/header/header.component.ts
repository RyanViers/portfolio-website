import { HeaderTopComponent } from './components/header-top.component';
import { HeaderNavbarComponent } from './components/header-navbar.component';
import { TailwindIconsService } from './../../utils/services/icons.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderMobileComponent } from './components/header-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderMobileComponent,
    HeaderNavbarComponent,
    HeaderTopComponent,
  ],
  styles: [``],
  template: `<header class="bg-gray-800">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8"
    >
      <app-header-top [mobileDropdown]="mobileDropdown"></app-header-top>
      <app-header-navbar></app-header-navbar>
    </div>

    <app-header-mobile
      *ngIf="mobileDropdown"
      [mobileDropdown]="mobileDropdown"
    ></app-header-mobile>
  </header>`,
})
export class HeaderComponent {
  mobileDropdown = false;

  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}