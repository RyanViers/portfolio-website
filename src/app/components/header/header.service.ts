import { Injectable, WritableSignal, signal } from '@angular/core';
import { NavButton } from './models';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  $menuToggle: WritableSignal<boolean> = signal(false);

  navButtons: NavButton[] = [
    { label: 'Home', route: '/home' },
    { label: 'About', route: '/about' },
    { label: 'Projects', route: '/projects' },
    { label: 'Contact', route: '/contact' },
  ];
}
