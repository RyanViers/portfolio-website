import { Route } from '@angular/router';

export default [
  {
    path: 'first',
    loadComponent: () =>
      import('./components/first/first.component').then(
        (c) => c.FirstComponent
      ),
  },
  {
    path: 'second',
    loadComponent: () =>
      import('./components/second/second.component').then(
        (c) => c.SecondComponent
      ),
  },
  {
    path: 'third',
    loadComponent: () =>
      import('./components/third/third.component').then(
        (c) => c.ThirdComponent
      ),
  },
] as Route[];
