import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  standalone: true,
  styles: [``],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
