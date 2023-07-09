import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  $menuToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setMenuToggle() {
    this.$menuToggle.next(!this.$menuToggle.value);
  }

  constructor() {}
}
