
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  host: {
    class: 'block w-full h-full',
  },
  template: `
    <div class="block w-full h-full">
      <router-outlet />
    </div> 
  `,
})
export default class AppComponent {
  title = 'portfolio-website';
}
