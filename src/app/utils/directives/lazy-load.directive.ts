import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLazyLoad]',
  standalone: true,
})
export class LazyLoadDirective implements AfterViewInit {
  @Input('appLazyLoad') src: string | undefined;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = this.el.nativeElement;
          const src = this.src;
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
