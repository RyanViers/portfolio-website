import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  template: `<div class="flex flex-col w-full h-full">
    <app-header></app-header>
    <router-outlet></router-outlet>
    <p>check works!</p>
  </div>`,
})
export class CheckComponent {}
