import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-first',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<div class="flex w-full h-full bg-red-400">
    <p>first works!</p>
  </div> `,
})
export class FirstComponent {}
