import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'apps',
    loadComponent: () => import('./apps/apps-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./apps/apps.component'),
      },
      {
        path: 'pokedex',
        loadComponent: () => import('./apps/pokedex/pokedex.component'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
