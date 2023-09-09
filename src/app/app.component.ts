import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  signals: true,
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
    `,
  ],
  template: `
    <div class="block w-full h-full">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'portfolio-website';
}
