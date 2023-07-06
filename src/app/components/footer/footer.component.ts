import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: `<footer aria-labelledby="footer-heading" class="bg-gray-900">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div>
              <a
                routerLink="/home"
                class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
                >Home</a
              >
            </div>
            <div>
              <a
                routerLink="/about"
                class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
                >About</a
              >
            </div>
          </div>
          <div class="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div>
              <a
                routerLink="/projects"
                class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
                >Projects</a
              >
            </div>
            <div>
              <a
                routerLink="/contact"
                class="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
                >Contact</a
              >
            </div>
          </div>
        </div>
        <div class="mt-12 md:mt-16 xl:mt-0">
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
        </div>
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
