import { Route } from '@angular/router';

export const APP_ROUTE: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((c) => c.ContactComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./projects/projects.component').then((c) => c.ProjectsComponent),
  },
  {
    path: `**`,
    redirectTo: '',
    pathMatch: 'full',
  },
];
