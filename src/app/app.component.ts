import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [],
  template: `<div class="flex w-full h-full">
    <router-outlet></router-outlet>
  </div> `,
})
export class AppComponent {
  title = 'portfolio-website';
}
