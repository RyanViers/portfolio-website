import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterService } from '../footer.service';

@Component({
  selector: 'app-footer-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="grid grid-cols-2 gap-8 xl:col-span-2">
      <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
          
        @for(button of service.navButtons; track button){
          <a [routerLink]="button.route" class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium">
            {{ button.label }}
          </a>
        }
      </div>
    </div>
  `,
})
export class FooterNavComponent {
  public service = inject(FooterService);
}
