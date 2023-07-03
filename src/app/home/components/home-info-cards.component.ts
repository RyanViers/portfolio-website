import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-info-cards',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<section
    aria-labelledby="collection-heading"
    class="max-w-xl px-4 pt-24 mx-auto sm:px-6 sm:pt-32 lg:max-w-7xl lg:px-8"
  >
    <h2
      id="collection-heading"
      class="text-2xl font-bold tracking-tight text-gray-900"
    >
      Shop by Collection
    </h2>
    <p class="mt-4 text-base text-gray-500">
      Each season, we collaborate with world-class designers to create a
      collection inspired by the natural world.
    </p>

    <div
      class="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0"
    >
      <a href="#" class="block group">
        <div
          aria-hidden="true"
          class="overflow-hidden rounded-lg aspect-h-2 aspect-w-3 lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg"
            alt="Brown leather key ring with brass metal loops and rivets on wood table."
            class="object-cover object-center w-full h-full"
          />
        </div>
        <h3 class="mt-4 text-base font-semibold text-gray-900">
          Handcrafted Collection
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          Keep your phone, keys, and wallet together, so you can lose everything
          at once.
        </p>
      </a>
      <a href="#" class="block group">
        <div
          aria-hidden="true"
          class="overflow-hidden rounded-lg aspect-h-2 aspect-w-3 lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg"
            alt="Natural leather mouse pad on white desk next to porcelain mug and keyboard."
            class="object-cover object-center w-full h-full"
          />
        </div>
        <h3 class="mt-4 text-base font-semibold text-gray-900">
          Organized Desk Collection
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          The rest of the house will still be a mess, but your desk will look
          great.
        </p>
      </a>
      <a href="#" class="block group">
        <div
          aria-hidden="true"
          class="overflow-hidden rounded-lg aspect-h-2 aspect-w-3 lg:aspect-h-6 lg:aspect-w-5 group-hover:opacity-75"
        >
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg"
            alt="Person placing task list card into walnut card holder next to felt carrying case on leather desk pad."
            class="object-cover object-center w-full h-full"
          />
        </div>
        <h3 class="mt-4 text-base font-semibold text-gray-900">
          Focus Collection
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          Be more productive than enterprise project managers with a single
          piece of paper.
        </p>
      </a>
    </div>
  </section>`,
})
export class HomeInfoCardsComponent {}
