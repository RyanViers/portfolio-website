import { Injectable, signal } from '@angular/core';
import { NavItem } from './models';

@Injectable()
export class HeaderService {
  $menuToggle = signal(false);

  navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'Apps', route: '/apps' },
    { label: 'GitHub', href: 'https://github.com/RyanViers', external: true },
  ];
}
