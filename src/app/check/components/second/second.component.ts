import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<div class="flex w-full h-full bg-green-500">
    <p>second works!</p>
  </div>`,
})
export class SecondComponent {}
