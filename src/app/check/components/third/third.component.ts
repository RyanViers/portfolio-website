import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-third',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  template: `<div class="flex w-full h-full bg-blue-400">
    <p>third works</p>
  </div>`,
})
export class ThirdComponent {}
