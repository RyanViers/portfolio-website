import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component'),
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects.component'),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', 
  },
];
