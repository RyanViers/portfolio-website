import { ContactLogoComponent } from './components/contact-logo.component';
import { ContactContentComponent } from './components/contact-content.component';
import { FooterComponent } from './../components/footer/footer.component';
import { HeaderComponent } from './../components/header/header.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ContactContentComponent,
    ContactLogoComponent,
  ],
  styles: [],
  template: `<app-header></app-header>
    <div class="relative isolate bg-gray-900">
      <div class="mx-auto grid max-w-7xl grid-rows-1 lg:grid-cols-2">
        <app-contact-content />
        <app-contact-logo />
      </div>
    </div>
    <app-footer></app-footer>`,
})
export default class ContactComponent {}
