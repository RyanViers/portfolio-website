import { AfterViewInit, Directive, ElementRef, Input, inject, input } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true,
})
export class LazyLoadDirective implements AfterViewInit {

  el = inject(ElementRef);

  appLazyLoad = input<string>();

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = this.el.nativeElement;
          const src = this.appLazyLoad();
          if (src) {
            img.src = src;
          }
          observer.unobserve(img);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}
