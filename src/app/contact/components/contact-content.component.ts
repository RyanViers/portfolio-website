import { TailwindIconsService } from './../../utils/services/icons.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactList, contactList } from '../models';

@Component({
  selector: 'app-contact-content',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [],
  template: `<div class="isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
        Let's Connect!
      </h2>
      <p class="mt-2 text-lg leading-8 text-gray-400">
        Reach out for project inquiries, to discuss my work, or simply to learn
        more about my journey
      </p>
    </div>
    <div class="mx-auto mt-20 max-w-lg space-y-16">
      <div *ngFor="let c of contactList" class="flex gap-x-6">
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500"
        >
          <span class="text-white w-6 h-6" [innerHTML]="getIcon(c.icon)"></span>
        </div>
        <div>
          <h3 class="text-base font-semibold leading-7 text-zinc-100 ">
            {{ c.title }}
          </h3>
          <p class="mt-2 leading-7 text-gray-400">
            {{ c.description }}
          </p>
          <p class="mt-4">
            <a
              *ngIf="c.emailLink"
              [href]="c.emailLink"
              class="text-sm font-semibold leading-6 text-indigo-500"
              >{{ c.linkText }} <span aria-hidden="true">&rarr;</span></a
            >
            <a
              *ngIf="c.link"
              [routerLink]="c.link"
              class="text-sm font-semibold leading-6 text-indigo-500"
              >{{ c.linkText }} <span aria-hidden="true">&rarr;</span></a
            >
          </p>
        </div>
      </div>
    </div>
  </div> `,
})
export class ContactContentComponent {
  contactList: ContactList[] = contactList;
  constructor(private icons: TailwindIconsService) {}

  getIcon(num: number) {
    return this.icons.getIcon(num);
  }
}
