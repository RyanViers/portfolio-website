import { Injectable } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { TailwindIconType, TailwindIcon } from '../tailwind-icons';

@Injectable({
  providedIn: 'root',
})
export class TailwindIconsService {
  icons: Map<TailwindIconType, SafeHtml> = TailwindIcon.getTailwindIconSvgs(
    [
      TailwindIconType.X_MARK,
      TailwindIconType.QUESTION_MARK_CIRCLE,
      TailwindIconType.CART,
      TailwindIconType.MENU,
      TailwindIconType.BELL,
      TailwindIconType.SEARCH,
      TailwindIconType.ARROW_RIGHT,
      TailwindIconType.ARROW_LEFT,
      TailwindIconType.BARS,
    ],
    this.sanitizer
  );
  constructor(private sanitizer: DomSanitizer) {}

  getIcon(num: number): SafeHtml | undefined {
    switch (num) {
      case 1:
        return this.icons.get(TailwindIconType.X_MARK);
      case 2:
        return this.icons.get(TailwindIconType.QUESTION_MARK_CIRCLE);
      case 3:
        return this.icons.get(TailwindIconType.CART);
      case 4:
        return this.icons.get(TailwindIconType.MENU);
      case 5:
        return this.icons.get(TailwindIconType.BELL);
      case 6:
        return this.icons.get(TailwindIconType.SEARCH);
      case 7:
        return this.icons.get(TailwindIconType.ARROW_RIGHT);
      case 8:
        return this.icons.get(TailwindIconType.ARROW_LEFT);
      case 9:
        return this.icons.get(TailwindIconType.BARS);
      default:
        return '';
    }
  }
}
