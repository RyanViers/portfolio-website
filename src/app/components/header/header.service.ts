import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TailwindIcon, TailwindIconType } from 'src/app/utils/tailwind-icons';
import { Links } from './models';

@Injectable()
export class HeaderService {
  private sanitizer = inject(DomSanitizer);

  $menuToggle: WritableSignal<boolean> = signal(false);

  setMenuToggle() {
    this.$menuToggle.set(!this.$menuToggle());
  }

  readonly x = TailwindIcon.getTailwindIconSvg(TailwindIconType.X_MARK, this.sanitizer);
  readonly bars = TailwindIcon.getTailwindIconSvg(TailwindIconType.BARS, this.sanitizer);
  readonly search = TailwindIcon.getTailwindIconSvg(TailwindIconType.SEARCH, this.sanitizer);

  readonly headerLinks: Links[] = [
    { id: 1, name: 'Home', url: '/home' },
    { id: 2, name: 'About', url: '/about' },
    { id: 3,  name: 'Projects', url: '/projects' },
    { id: 4,  name: 'Contact', url: '/contact' },
  ];
}
