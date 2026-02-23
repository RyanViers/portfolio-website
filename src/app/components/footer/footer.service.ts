import { Injectable } from '@angular/core';
import { FooterLink } from './models';

@Injectable()
export class FooterService {
  links: FooterLink[] = [
    { label: 'Home', route: '/' },
    { label: 'Apps', route: '/apps' },
    { label: 'GitHub', href: 'https://github.com/RyanViers', external: true },
  ];
}
