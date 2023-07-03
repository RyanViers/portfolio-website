import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [``],
  template: `<div class="flex w-full h-full bg-gray-500">
    <div class="grid grid-cols-3">
      <button [routerLink]="['first']">first</button>
      <button [routerLink]="['second']">second</button>
      <button [routerLink]="['third']">third</button>
    </div>
  </div> `,
})
export class HeaderComponent {}
