import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-form',
  standalone: true,
  imports: [CommonModule],
  styles: [``],
  template: `<div class="mt-12 md:mt-16 xl:mt-0">
  <h3 class="text-sm font-medium text-white">
    Send your email to receive updates
  </h3>
  <p class="mt-6 text-sm text-gray-300">
    Send me your email to receive updates on projects and new blog
    posts.
  </p>
  <form class="flex mt-2 sm:max-w-md">
    <input
      id="email-address"
      type="text"
      autocomplete="email"
      required
      class="w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-white rounded-md shadow-sm appearance-none focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
    />
    <div class="flex-shrink-0 ml-4">
      <button
        type="submit"
        class="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Sign up
      </button>
    </div>
  </form>
</div>`,
})
export class FooterFormComponent {

}
