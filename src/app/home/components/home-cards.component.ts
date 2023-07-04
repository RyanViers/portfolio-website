import { TailwindIconsService } from './../../utils/services/icons.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Projects } from '../models';

@Component({
  selector: 'app-home-cards',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<section class="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8">
    <div
      class="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0"
    >
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Projects</h2>
      <a
        href="#"
        class="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
      >
        Browse all Projects
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>

    <ul
      role="list"
      class="mx-10 grid max-w-max grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-2 lg:grid-cols-4 lg:max-w-none lg:gap-x-8 "
    >
      <li *ngFor="let p of projects">
        <img
          class="aspect-[3/2] w-full rounded-2xl object-cover"
          [src]="p.image"
        />
        <h3 class="mt-6 text-lg font-semibold leading-8 text-gray-900">
          {{ p.title }}
        </h3>
        <p class="text-base leading-7 text-blue-600">{{ p.technologies }}</p>
        <p class="mt-4 text-base leading-7 text-gray-600">
          {{ p.description }}
        </p>

        <ul role="list" class="mt-6 flex gap-x-6">
          <li>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Twitter</span>
              <img
                class="w-8 h-8"
                src="assets/social-icons/icons8-github.svg"
                a
              />
            </a>
          </li>
          <li>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="w-8 h-8" [innerHTML]="getIcon(7)">LinkedIn</span>
             
            </a>
          </li>
        </ul>
      </li>
    </ul>

    <div class="px-4 mt-6 sm:hidden">
      <a
        href="#"
        class="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Browse all Projects
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </div>
  </section>`,
})
export class HomeCardsComponent {
  projects: Projects[] = [
    {
      image: 'assets/projects/myFlix-React-pic.PNG',
      title: 'myFlix React',
      description:
        'This project is the client-side version of a myFlix application built using React. It uses a MongoDB database to store data about registered users and movies. It uses a RESTful API to communicate with the the database and the client.',
      technologies: 'React, Redux, React-Bootstrap, Axios, Parcel',
    },
    {
      image: 'assets/projects/angular-profile-pic.PNG',
      title: 'myFlix Angular',
      description:
        'This project is the client-side version of a myFlix application built using Angular. It uses a MongoDB database to store data about registered users and movies. It uses a RESTful API to communicate with the the database and the client.',
      technologies: 'Angular, Angular Material',
    },
    {
      image: 'assets/projects/pokedex-app-pic.PNG',
      title: 'Pokedex',
      description:
        'This is a small application made with HTML, CSS, and JavaScript. The Pokémon are loaded from an external API. The user can then search for a Pokémon by name and see its details.',
      technologies: 'HTML, CSS, JavaScript, jQuery, Bootstrap',
    },
    {
      image: 'assets/projects/pizza-pic.PNG',
      title: 'Pizza App',
      description:
        'This is an application for a pizza resturant that allows users to build their own pizza and place an order. Users can also buy specialty pizzas and manage their profiles.',
      technologies:
        'Angular, Ionic, Tailwind, AWS, Amplify, AppSync, DynamoDB, Cognito, S3, Lambda, CloudFormation',
    },
  ];

  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}
