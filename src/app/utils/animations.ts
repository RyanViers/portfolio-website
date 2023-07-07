import { animate, style, transition, trigger } from '@angular/animations';

export const opacityScale = trigger('opacityScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);

export const opacityScaleDelay = trigger('opacityScaleDelay', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate(
      '100ms 100ms ease-out',
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);

export const opacityScaleDelayLong = trigger('opacityScaleDelayLong', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate(
      '100ms 200ms ease-out',
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);

export const fader = trigger('fader', [
  transition(':enter', [
    style({
      position: 'absolute',
      width: '100%',
      left: 0,
      opacity: 0,
      transform: 'scale(0) translateY(100%)',
    }),
    animate(
      '600ms ease-out',
      style({ opacity: 1, transform: 'scale(1) translateY(0)' })
    ),
  ]),
  transition(':leave', [
    style({
      position: 'absolute',
      width: '100%',
      left: 0,
      opacity: 1,
      transform: 'scale(1) translateY(0)',
    }),
    animate(
      '600ms ease-in',
      style({ opacity: 0, transform: 'scale(0) translateY(100%)' })
    ),
  ]),
]);
