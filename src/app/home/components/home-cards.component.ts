import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<section
    aria-labelledby="category-heading"
    class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
  >
    <div
      class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0"
    >
      <h2
        id="category-heading"
        class="text-2xl font-bold tracking-tight text-gray-900"
      >
        Shop by Category
      </h2>
      <a
        href="#"
        class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
      >
        Browse all categories
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>

    <div class="flow-root mt-4">
      <div class="-my-2">
        <div
          class="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible"
        >
          <div
            class="absolute flex px-4 space-x-8 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0"
          >
            <a
              href="#"
              class="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
            >
              <span aria-hidden="true" class="absolute inset-0">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-01.jpg"
                  alt=""
                  class="object-cover object-center w-full h-full"
                />
              </span>
              <span
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
              ></span>
              <span
                class="relative mt-auto text-xl font-bold text-center text-white"
                >New Arrivals</span
              >
            </a>
            <a
              href="#"
              class="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
            >
              <span aria-hidden="true" class="absolute inset-0">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-02.jpg"
                  alt=""
                  class="object-cover object-center w-full h-full"
                />
              </span>
              <span
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
              ></span>
              <span
                class="relative mt-auto text-xl font-bold text-center text-white"
                >Productivity</span
              >
            </a>
            <a
              href="#"
              class="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
            >
              <span aria-hidden="true" class="absolute inset-0">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-04.jpg"
                  alt=""
                  class="object-cover object-center w-full h-full"
                />
              </span>
              <span
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
              ></span>
              <span
                class="relative mt-auto text-xl font-bold text-center text-white"
                >Workspace</span
              >
            </a>
            <a
              href="#"
              class="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
            >
              <span aria-hidden="true" class="absolute inset-0">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-05.jpg"
                  alt=""
                  class="object-cover object-center w-full h-full"
                />
              </span>
              <span
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
              ></span>
              <span
                class="relative mt-auto text-xl font-bold text-center text-white"
                >Accessories</span
              >
            </a>
            <a
              href="#"
              class="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
            >
              <span aria-hidden="true" class="absolute inset-0">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/home-page-01-category-03.jpg"
                  alt=""
                  class="object-cover object-center w-full h-full"
                />
              </span>
              <span
                aria-hidden="true"
                class="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
              ></span>
              <span
                class="relative mt-auto text-xl font-bold text-center text-white"
                >Sale</span
              >
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 mt-6 sm:hidden">
      <a
        href="#"
        class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Browse all categories
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  </section>`,
})
export class HomeCardsComponent {}
