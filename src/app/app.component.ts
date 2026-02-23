import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  host: {
    class: 'block w-full min-h-screen',
  },
  template: `
    <div class="block w-full min-h-screen bg-gray-950">
      <router-outlet />
    </div>
  `,
})
export default class AppComponent {}
