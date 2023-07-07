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
      TailwindIconType.ENVELOPE,
      TailwindIconType.IMAGE,
      TailwindIconType.DOCUMENT,
      TailwindIconType.GLOBE,
      TailwindIconType.PEOPLE,
      TailwindIconType.SHARE,
      TailwindIconType.BELL_ALERT,
      TailwindIconType.EXCLAMATION_TRIANGLE,
      TailwindIconType.COMPASS,
      TailwindIconType.CHECK_CIRCLE,
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
      case 10:
        return this.icons.get(TailwindIconType.ENVELOPE);
      case 11:
        return this.icons.get(TailwindIconType.IMAGE);
      case 12:
        return this.icons.get(TailwindIconType.DOCUMENT);
      case 13:
        return this.icons.get(TailwindIconType.GLOBE);
      case 14:
        return this.icons.get(TailwindIconType.PEOPLE);
      case 15:
        return this.icons.get(TailwindIconType.SHARE);
      case 16:
        return this.icons.get(TailwindIconType.BELL_ALERT);
      case 17:
        return this.icons.get(TailwindIconType.EXCLAMATION_TRIANGLE);
      case 18:
        return this.icons.get(TailwindIconType.COMPASS);
      case 19:
        return this.icons.get(TailwindIconType.CHECK_CIRCLE);
      default:
        return '';
    }
  }
}
