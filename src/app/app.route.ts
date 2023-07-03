import { Route } from '@angular/router';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'check',
    loadComponent: () =>
      import('./check/check.component').then((c) => c.CheckComponent),
    loadChildren: () => import('./check/check.route'),
  },
  {
    path: `**`,
    redirectTo: '',
    pathMatch: 'full',
  },
];
