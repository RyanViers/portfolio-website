# Routing Architecture Patterns

## Lazy Loading Patterns

### Basic Lazy Loading
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'feature',
    loadComponent: () => import('./pages/feature/feature.component')
      .then(m => m.FeatureComponent)
  }
];
```

### Feature Module with Multiple Routes
```typescript
// Feature routes with children
{
  path: 'training',
  loadComponent: () => import('./pages/training/training.component')
    .then(m => m.TrainingComponent),
  children: [
    {
      path: '',
      redirectTo: 'overview',
      pathMatch: 'full'
    },
    {
      path: 'overview',
      loadComponent: () => import('./pages/training/overview/overview.component')
        .then(m => m.OverviewComponent)
    },
    {
      path: 'videos',
      loadComponent: () => import('./pages/training/videos/videos.component')
        .then(m => m.VideosComponent)
    },
    {
      path: 'guides',
      loadComponent: () => import('./pages/training/guides/guides.component')
        .then(m => m.GuidesComponent)
    }
  ]
}
```

## Route Protection Patterns

### Auth Guard
```typescript
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.$isAuthenticated()) {
    return true;
  }

  // Redirect to sign-in
  return router.createUrlTree(['/sign-in']);
};
```

### Role-Based Guard
```typescript
export const roleGuard = (allowedRoles: string[]) => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const user = auth.$currentUser();
    if (!user) {
      return router.createUrlTree(['/sign-in']);
    }

    if (allowedRoles.includes(user.role)) {
      return true;
    }

    return router.createUrlTree(['/unauthorized']);
  };
};
```

### Feature Flag Guard
```typescript
export const featureGuard = (featureName: string) => {
  return () => {
    const config = inject(ConfigService);

    if (config.getFeatureFlag(featureName)) {
      return true;
    }

    return inject(Router).createUrlTree(['/not-found']);
  };
};
```

## Protected Route Examples

### Authentication Required
```typescript
{
  path: 'dashboard',
  loadComponent: () => import('./pages/dashboard/dashboard.component')
    .then(m => m.DashboardComponent),
  canActivate: [authGuard]
}
```

### Role-Based Access
```typescript
{
  path: 'admin',
  loadComponent: () => import('./pages/admin/admin.component')
    .then(m => m.AdminComponent),
  canActivate: [authGuard, roleGuard(['admin', 'moderator'])]
}
```

### Feature Flag Protection
```typescript
{
  path: 'beta-feature',
  loadComponent: () => import('./pages/beta/beta.component')
    .then(m => m.BetaComponent),
  canActivate: [featureGuard('enableBetaFeature')]
}
```

## Route Parameters

### Static Parameters
```typescript
{
  path: 'user/:id',
  loadComponent: () => import('./pages/user/user.component')
    .then(m => m.UserComponent)
}

// In component
export class UserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userId = signal<string>('');

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId.set(params['id']);
    });
  }
}
```

### Signal-Based Parameter Handling
```typescript
export class UserComponent {
  private route = inject(ActivatedRoute);

  // Convert route params to signals
  $userId = toSignal(
    this.route.params.pipe(map(params => params['id'])),
    { initialValue: '' }
  );

  // Computed based on route
  $user = computed(async () => {
    const id = this.$userId();
    if (id) {
      return await this.userService.getUser(id);
    }
    return null;
  });
}
```

### Multiple Parameters
```typescript
{
  path: 'category/:categoryId/item/:itemId',
  loadComponent: () => import('./pages/item/item.component')
    .then(m => m.ItemComponent)
}

// In component
export class ItemComponent {
  private route = inject(ActivatedRoute);

  $routeParams = toSignal(this.route.params, { initialValue: {} });
  $categoryId = computed(() => this.$routeParams()['categoryId']);
  $itemId = computed(() => this.$routeParams()['itemId']);
}
```

## Query Parameters

### Query Parameter Handling
```typescript
export class SearchComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  $queryParams = toSignal(this.route.queryParams, { initialValue: {} });
  $searchTerm = computed(() => this.$queryParams()['q'] || '');
  $page = computed(() => Number(this.$queryParams()['page']) || 1);

  updateSearch(term: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: term, page: 1 },
      queryParamsHandling: 'merge'
    });
  }

  updatePage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
```

## Navigation Service Pattern

### Navigation Service
```typescript
@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  // Define page enum
  routeToPage(page: WebPage, params?: any): void {
    switch (page) {
      case WebPage.HOME:
        this.router.navigate(['/']);
        break;
      case WebPage.DASHBOARD:
        this.router.navigate(['/dashboard']);
        break;
      case WebPage.USER_PROFILE:
        this.router.navigate(['/user', params?.id || 'me']);
        break;
      case WebPage.SIGN_IN:
        this.router.navigate(['/sign-in']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  // Navigate with query parameters
  routeWithQuery(path: string[], queryParams: any): void {
    this.router.navigate(path, { queryParams });
  }

  // Navigate and replace current URL
  replaceUrl(path: string[]): void {
    this.router.navigate(path, { replaceUrl: true });
  }

  // Get current route
  getCurrentRoute(): string {
    return this.router.url;
  }

  // Check if current route matches
  isCurrentRoute(path: string): boolean {
    return this.router.url === path;
  }
}
```

### Page Enum
```typescript
export enum WebPage {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  USER_PROFILE = 'USER_PROFILE',
  SIGN_IN = 'SIGN_IN',
  TRAINING = 'TRAINING',
  PRICING = 'PRICING'
}
```

## Route Resolvers

### Data Resolver
```typescript
export const userResolver = (route: ActivatedRouteSnapshot) => {
  const userService = inject(UserService);
  const userId = route.params['id'];

  return userService.getUser(userId);
};

// Route configuration
{
  path: 'user/:id',
  loadComponent: () => import('./pages/user/user.component')
    .then(m => m.UserComponent),
  resolve: {
    user: userResolver
  }
}

// In component
export class UserComponent {
  private route = inject(ActivatedRoute);

  $user = toSignal(
    this.route.data.pipe(map(data => data['user'])),
    { initialValue: null }
  );
}
```

## Route Animation

### Route Transition Setup
```typescript
// In app.component.ts
@Component({
  template: `
    <div [@routeAnimation]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  animations: [routeAnimation]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

// Route with animation data
{
  path: 'feature',
  loadComponent: () => import('./pages/feature/feature.component')
    .then(m => m.FeatureComponent),
  data: { animation: 'FeaturePage' }
}
```

## Route Preloading

### Custom Preloading Strategy
```typescript
@Injectable({ providedIn: 'root' })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Only preload routes marked for preloading
    if (route.data?.['preload']) {
      return load();
    }
    return of(null);
  }
}

// Bootstrap configuration
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withPreloading(CustomPreloadingStrategy)
    )
  ]
});

// Route with preloading
{
  path: 'important-feature',
  loadComponent: () => import('./pages/important/important.component')
    .then(m => m.ImportantComponent),
  data: { preload: true }
}
```

## Error Handling

### Route Error Component
```typescript
{
  path: '404',
  loadComponent: () => import('./pages/not-found/not-found.component')
    .then(m => m.NotFoundComponent)
},
{
  path: '**',
  redirectTo: '/404'
}
```

### Global Error Handler
```typescript
@Injectable({ providedIn: 'root' })
export class RouteErrorHandler {
  private router = inject(Router);

  handleRouteError(error: any): void {
    console.error('Route error:', error);

    if (error.status === 404) {
      this.router.navigate(['/404']);
    } else if (error.status === 401) {
      this.router.navigate(['/sign-in']);
    } else {
      this.router.navigate(['/error']);
    }
  }
}
```