import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Links, headerLinks } from '../models';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [RouterModule],
  template: ` 
  <nav class="lg:hidden absolute z-50 w-full bg-gray-800">
    <div class="space-y-1 px-2 pb-3 pt-2">
      
      @for (link of links; track link.id) {
        <button
          [routerLink]="link.url"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md py-2 px-3 text-base font-medium"
        >
          {{ link.name }}
        </button>
      }
    </div>
  </nav>`,
})
export class HeaderMobileComponent {
  links: Links[] = headerLinks;

  constructor() {}

}
