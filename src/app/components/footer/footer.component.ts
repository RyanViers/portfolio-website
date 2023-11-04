import { Component } from '@angular/core';
import { FooterFormComponent } from './components/footer-form.component';
import { FooterNavComponent } from './components/footer-nav.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterNavComponent, FooterFormComponent],
  styles: [``],
  template: ` <footer class="bg-gray-900">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
        <app-footer-nav />
        <app-footer-form />
      </div>

      <div class="py-10 border-t border-gray-800">
        <p class="text-sm text-gray-400">
          Copyright &copy; 2021 Ryan Viers, Inc.
        </p>
      </div>
    </div>
  </footer>`,
})
export class FooterComponent {}
