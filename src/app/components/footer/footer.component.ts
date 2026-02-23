import { Component } from '@angular/core';
import { FooterNavComponent } from './components/footer-nav.component';
import { FooterService } from './footer.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  providers: [FooterService],
  imports: [FooterNavComponent],
  template: `
    <footer class="border-t border-gray-800/50 bg-gray-950">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-sm text-gray-600 font-mono">
            &copy; {{ year }} Ryan Viers
          </p>
          <app-footer-nav />
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
