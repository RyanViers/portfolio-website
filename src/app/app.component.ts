import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  host: {
    class: 'flex w-screen h-screen bg-gray-100 justify-center items-center',
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
