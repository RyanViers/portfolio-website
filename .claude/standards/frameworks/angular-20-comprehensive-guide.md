# Angular 20 Comprehensive Best Practices Guide

*Your definitive guide to building modern Angular applications with best practices, advanced patterns, and cutting-edge features.*

## 🎯 Quick Start Philosophy

**Key Principles:**
- Standalone components everywhere
- Signal-based reactive state
- Zoneless change detection
- TypeScript-first development
- Performance-optimized by default

---

## 🏗️ Project Architecture

### Directory Structure
```
src/app/
├── pages/           # Feature pages with lazy-loaded routes
├── shared/          # Reusable UI components & directives
├── utils/           # Services, guards, models, pipes
└── assets/          # Static assets & build scripts
```

### Angular 20 Naming Conventions (NEW)

**File Naming Changes:**
- **Components**: `user-profile.ts` (not `user-profile.component.ts`)
- **Services**: `auth-store.ts` or `user-api.ts` (not `auth.service.ts`)
- **Directives**: `highlight.ts` (not `highlight.directive.ts`)

**Class Naming Changes:**
- **Components**: `UserProfile` or `UserCard` (not `UserProfileComponent`)
- **Services**: `AuthStore` or `UserApi` (not `AuthService`)
- **Directives**: `Highlight` (not `HighlightDirective`)

**CLI Generation:**
```bash
ng g c user-profile    # Generates user-profile.ts with UserProfile class
ng g s auth-store      # Generates auth-store.ts with AuthStore class
ng g d highlight       # Generates highlight.ts with Highlight class

# To use old naming (if needed):
ng g c user-profile --type=component
```

### Modern Angular Features
- **Angular 20** with enhanced signals and resource API
- **Standalone Components** - No more NgModules
- **Zoneless Change Detection** - Better performance
- **Server-Side Rendering** - SEO optimized
- **Enhanced Signals** - Reactive state management

---

## 🧩 Component Architecture

### Standalone Component Template

```typescript
import { Component, inject, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feature',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FeatureService], // Feature-scoped services only
  host: {
    class: 'block relative w-full',
    '[class.active]': '$isActive()',
    '[style.background]': 'backgroundStyle()'
  },
  template: `
    <div class="feature-container">
      @if ($isLoading()) {
        <loading-spinner />
      } @else if ($hasError()) {
        <error-message [error]="$error()" />
      } @else {
        <feature-content [data]="$data()" />
      }
    </div>
  `
})
export class Feature {
  // Service injection (modern pattern)
  private featureService = inject(FeatureService);
  protected breakpoint = inject(BreakpointService);

  // Input signals (Angular 20+)
  data = input<FeatureData>();
  config = input.required<FeatureConfig>();

  // State signals
  $isLoading = signal<boolean>(false);
  $data = signal<FeatureData[]>([]);
  $error = signal<string | null>(null);

  // Computed signals
  $hasData = computed(() => this.$data().length > 0);
  $hasError = computed(() => this.$error() !== null);
  $isActive = computed(() => this.$hasData() && !this.$isLoading());

  // Computed styles
  backgroundStyle = computed(() =>
    this.breakpoint.isDesktop() ? 'var(--color-primary)' : 'var(--color-light)'
  );

  ngOnInit(): void {
    this.featureService.init();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.featureService.destroy();
  }

  private async loadInitialData(): Promise<void> {
    this.$isLoading.set(true);
    this.$error.set(null);

    try {
      const data = await this.featureService.fetchData();
      this.$data.set(data);
    } catch (error) {
      this.$error.set(error.message);
    } finally {
      this.$isLoading.set(false);
    }
  }
}
```

### Host Binding Patterns

**Modern Style & Class Binding (Preferred over NgClass/NgStyle):**

```typescript
@Component({
  host: {
    // Static classes
    class: 'flex flex-col size-full',

    // Direct class binding (preferred over ngClass)
    '[class.active]': '$isActive()',
    '[class.loading]': '$isLoading()',
    '[class.error]': '$hasError()',
    '[class]': 'computedClasses()', // Direct class object binding

    // Direct style binding (preferred over ngStyle)
    '[style.borderRadius]': 'Wrapper.getWrapperBorderRadius(breakpoint, wrapper())',
    '[style.background]': 'ResponsiveUnit.getResponsiveUnit(breakpoint, backgroundColor())',
    '[style.padding]': 'ResponsiveUnit.getResponsiveUnit(breakpoint, padding())',
    '[style]': 'computedStyles()', // Direct style object binding

    // Event listeners (preferred over @HostListener)
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeyDown($event)',
    '(window:resize)': 'onWindowResize($event)',
    '(document:click)': 'onDocumentClick($event)'
  }
})
export class ModernComponent {
  // Computed class objects
  computedClasses = computed(() => ({
    'bg-primary': this.$isActive(),
    'opacity-50': this.$isLoading(),
    'border-red-500': this.$hasError()
  }));

  // Computed style objects
  computedStyles = computed(() => ({
    '--custom-color': this.$themeColor(),
    transform: `scale(${this.$scale()})`,
    opacity: this.$isVisible() ? '1' : '0'
  }));

  // Event handlers
  onClick(event: MouseEvent): void {
    // Handle click
  }

  onKeyDown(event: KeyboardEvent): void {
    // Handle keyboard
  }

  onWindowResize(event: Event): void {
    // Handle window resize
  }
}
```

**NgClass/NgStyle Migration (Soft Deprecated as of Nov 2024):**

```typescript
// ❌ AVOID - NgClass/NgStyle (soft deprecated)
<div [ngClass]="{active: isActive, loading: isLoading}">
<div [ngStyle]="{color: textColor, fontSize: fontSize + 'px'}">

// ✅ PREFER - Direct class/style binding
<div [class]="{active: isActive, loading: isLoading}">
<div [style]="{color: textColor, 'font-size.px': fontSize}">

// ✅ PREFER - Individual bindings for better performance
<div [class.active]="isActive" [class.loading]="isLoading">
<div [style.color]="textColor" [style.font-size.px]="fontSize">
```

---

## 🔄 Signal-Based State Management

### Signal Patterns

```typescript
export class ComponentSignalPatterns {
  // Basic signals
  $isLoading = signal<boolean>(false);
  $data = signal<Item[]>([]);
  $error = signal<string | null>(null);
  $selectedId = signal<string | null>(null);

  // Computed signals
  $hasData = computed(() => this.$data().length > 0);
  $selectedItem = computed(() =>
    this.$data().find(item => item.id === this.$selectedId())
  );
  $filteredData = computed(() =>
    this.$data().filter(item => item.status === 'active')
  );

  // Signal updates
  updateData(newItem: Item): void {
    this.$data.update(items => [...items, newItem]);
  }

  removeItem(id: string): void {
    this.$data.update(items => items.filter(item => item.id !== id));
  }

  setLoading(loading: boolean): void {
    this.$isLoading.set(loading);
  }
}
```

### Signal Effects

```typescript
export class EffectPatterns {
  private authService = inject(AuthService);
  private router = inject(Router);

  $user = signal<User | null>(null);
  $isAuthenticated = computed(() => this.$user() !== null);

  constructor() {
    // Effect for navigation based on auth state
    effect(() => {
      if (!this.$isAuthenticated()) {
        this.router.navigate(['/login']);
      }
    });

    // Effect for logging
    effect(() => {
      console.log('User changed:', this.$user());
    });

    // Effect for local storage sync
    effect(() => {
      const user = this.$user();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }
}
```

---

## 🌐 Angular 20 Resource API for Data Fetching

### httpResource Pattern (New in Angular 20)

```typescript
import { httpResource } from '@angular/core';

export class DataFetchingComponent {
  // Input that triggers reactive updates
  userId = input.required<string>();

  // Simple httpResource usage
  user = httpResource(() => `/api/user/${this.userId()}`);

  // Advanced httpResource with options
  posts = httpResource({
    url: () => `/api/users/${this.userId()}/posts`,
    options: {
      headers: { 'Content-Type': 'application/json' },
      params: { limit: '10', sort: 'desc' }
    }
  });

  // Template usage
  template = `
    @if (user.hasValue()) {
      <user-details [user]="user.value()" />
    } @else if (user.error()) {
      <div class="error">Could not load user: {{ user.error() }}</div>
    } @else if (user.isLoading()) {
      <div class="loading">Loading user info...</div>
    }
  `;
}
```

### Custom Resource API

```typescript
export class CustomResourcePatterns {
  // Custom resource with complex logic
  searchResults = resource({
    params: () => ({
      query: this.searchQuery(),
      filters: this.activeFilters()
    }),
    loader: async ({ params, abortSignal }) => {
      const response = await fetch(`/api/search?q=${params.query}`, {
        signal: abortSignal
      });
      return response.json();
    }
  });

  // Resource with caching
  cachedData = resource({
    params: () => ({ id: this.dataId() }),
    loader: ({ params }) => this.dataService.fetchWithCache(params.id)
  });

  // Resource status patterns
  $isDataLoading = computed(() => this.searchResults.status() === 'loading');
  $hasSearchError = computed(() => this.searchResults.status() === 'error');
  $searchValue = computed(() => {
    if (this.searchResults.hasValue()) {
      return this.searchResults.value();
    }
    return [];
  });
}
```

---

## ⚡ Deferrable Views (@defer)

### Basic Defer Patterns

```typescript
@Component({
  template: `
    <!-- Defer on viewport entry -->
    @defer (on viewport) {
      <heavy-chart-component />
    }
    @placeholder {
      <div class="chart-placeholder">Chart loading...</div>
    }
    @loading {
      <chart-skeleton />
    }
    @error {
      <div class="error">Failed to load chart</div>
    }

    <!-- Defer on interaction -->
    @defer (on interaction) {
      <detailed-analytics />
    }
    @placeholder {
      <button class="btn-primary">Click to load analytics</button>
    }

    <!-- Defer with conditions -->
    @defer (when showAdvanced) {
      <advanced-settings />
    }
    @placeholder {
      <basic-settings />
    }

    <!-- Defer with prefetching -->
    @defer (on hover; prefetch on idle) {
      <user-profile-modal />
    }
    @placeholder {
      <user-avatar [user]="user()" />
    }
  `
})
```

### Advanced Defer Patterns

```typescript
@Component({
  template: `
    <!-- Multiple conditions -->
    @defer (on viewport; when isAuthenticated && hasPermission) {
      <admin-panel />
    }

    <!-- Timer-based defer -->
    @defer (on timer(3s)) {
      <promotional-content />
    }

    <!-- Defer with minimum display time -->
    @defer (on interaction) {
      <complex-form />
    }
    @placeholder (minimum 1s) {
      <form-skeleton />
    }

    <!-- Nested defer blocks with different triggers -->
    @defer (on viewport) {
      <main-content />

      @defer (on interaction) {
        <interactive-elements />
      }
      @placeholder {
        <static-elements />
      }
    }
  `
})
```

---

## 🎨 Template Control Flow

### Modern Template Syntax

```html
<!-- Conditional rendering -->
@if ($isLoading()) {
  <loading-spinner />
} @else if ($hasError()) {
  <error-message [error]="$error()" />
} @else if ($hasData()) {
  <data-list [items]="$data()" />
} @else {
  <empty-state />
}

<!-- Loops with mandatory tracking -->
@for (item of $items(); track item.id; let i = $index) {
  <item-card
    [item]="item"
    [index]="i"
    [isLast]="i === $items().length - 1" />
}

<!-- Track by index for static collections -->
@for (tab of tabs; track $index) {
  <tab-item [tab]="tab" />
}

<!-- Track by unique property for dynamic collections -->
@for (user of users; track user.uuid) {
  <user-card [user]="user" />
}

<!-- Switch statements -->
@switch ($status()) {
  @case ('loading') {
    <loading-indicator />
  }
  @case ('success') {
    <success-content />
  }
  @case ('error') {
    <error-content />
  }
  @default {
    <default-content />
  }
}

<!-- Defer blocks -->
@defer (on viewport) {
  <expensive-component />
}
@placeholder {
  <component-skeleton />
}
```

### @for Loop Tracking (Mandatory in Angular 17+)

**Key Change**: Track expressions are now **required** for all `@for` loops (compiler error if missing).

```html
<!-- ✅ REQUIRED - Track by unique identifier (best performance) -->
@for (user of users; track user.id) {
  <user-card [user]="user" />
}

<!-- ✅ REQUIRED - Track by index for static collections -->
@for (tab of staticTabs; track $index) {
  <tab-item [tab]="tab" />
}

<!-- ✅ REQUIRED - Track by multiple properties -->
@for (item of items; track item.category + item.id) {
  <item-display [item]="item" />
}

<!-- ❌ COMPILER ERROR - Missing track expression -->
@for (item of items) {
  <div>{{ item.name }}</div>
}
```

**Tracking Guidelines:**
- **Dynamic collections**: Use unique property (`track user.id`)
- **Static collections**: Use index (`track $index`)
- **When in doubt**: Use `track $index` as default
- **Performance**: Unique identifiers > index > identity function
- **Mandatory**: Angular compiler will error without track expression

---

## 🔧 Service Architecture

### Modern Service Pattern

```typescript
@Injectable()
export class FeatureService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);

  // Signal-based state
  $isLoading = signal<boolean>(false);
  $data = signal<FeatureData | null>(null);
  $error = signal<string | null>(null);

  // Configuration
  readonly config = {
    apiUrl: '/api/feature',
    cacheTimeout: 300000, // 5 minutes
    retryAttempts: 3
  };

  // Public computed signals
  $hasData = computed(() => this.$data() !== null);
  $isReady = computed(() => !this.$isLoading() && this.$hasData());

  // Lifecycle methods
  init(): void {
    this.loadInitialData();
  }

  destroy(): void {
    // Cleanup logic
    this.$data.set(null);
    this.$error.set(null);
  }

  // Public methods
  async fetchData(params?: FetchParams): Promise<FeatureData> {
    this.$isLoading.set(true);
    this.$error.set(null);

    try {
      const data = await this.http.get<FeatureData>(
        `${this.config.apiUrl}/data`,
        { params }
      ).toPromise();

      this.$data.set(data);
      return data;
    } catch (error) {
      this.$error.set(error.message);
      throw error;
    } finally {
      this.$isLoading.set(false);
    }
  }

  updateData(updates: Partial<FeatureData>): void {
    this.$data.update(current =>
      current ? { ...current, ...updates } : null
    );
  }

  private async loadInitialData(): Promise<void> {
    try {
      await this.fetchData();
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  }
}
```

### Service with httpResource

```typescript
@Injectable()
export class ModernDataService {
  private userId = signal<string>('');

  // Using httpResource for reactive data fetching
  userProfile = httpResource(() =>
    this.userId() ? `/api/users/${this.userId()}` : null
  );

  userPosts = httpResource({
    url: () => `/api/users/${this.userId()}/posts`,
    options: () => ({
      params: { limit: '20', sort: 'desc' }
    })
  });

  setUserId(id: string): void {
    this.userId.set(id);
    // httpResource automatically refetches when userId changes
  }

  // Computed values from resources
  $profileReady = computed(() =>
    this.userProfile.hasValue() && !this.userProfile.isLoading()
  );

  $combinedData = computed(() => {
    if (this.userProfile.hasValue() && this.userPosts.hasValue()) {
      return {
        profile: this.userProfile.value(),
        posts: this.userPosts.value()
      };
    }
    return null;
  });
}
```

---

## 📋 Form Patterns

### Reactive Forms with Signals

```typescript
export class FormComponent {
  private builder = inject(FormBuilder);

  // Form setup
  formGroup = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  // Form state signals
  $isSubmitting = signal<boolean>(false);
  $submitError = signal<string | null>(null);

  // Form validation computed
  $isFormValid = computed(() => this.formGroup.valid);
  $canSubmit = computed(() =>
    this.$isFormValid() && !this.$isSubmitting()
  );

  // Field validation helpers
  getInputClasses(fieldName: string): string {
    const field = this.formGroup.get(fieldName);
    if (!field?.touched) return 'focus:ring-primary';
    return field.valid ? 'focus:ring-success' : 'focus:ring-danger';
  }

  getFieldErrors(fieldName: string): string[] {
    const field = this.formGroup.get(fieldName);
    if (!field?.errors || !field.touched) return [];

    const errors: string[] = [];
    if (field.errors['required']) errors.push(`${fieldName} is required`);
    if (field.errors['email']) errors.push('Invalid email format');
    if (field.errors['minlength']) {
      errors.push(`${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`);
    }
    return errors;
  }

  async onSubmit(): Promise<void> {
    if (!this.$canSubmit()) return;

    this.$isSubmitting.set(true);
    this.$submitError.set(null);

    try {
      const formValue = this.formGroup.value;
      await this.submitForm(formValue);
      this.formGroup.reset();
    } catch (error) {
      this.$submitError.set(error.message);
    } finally {
      this.$isSubmitting.set(false);
    }
  }
}
```

### Form Template

```html
<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
  <div class="space-y-4">
    <!-- Email field -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        formControlName="email"
        [class]="getInputClasses('email')"
        class="block w-full rounded-xl border-0 px-4 py-3.5
               text-dark bg-light ring-1 ring-medium
               placeholder:text-medium focus:ring-2 focus:bg-white
               transition-all duration-200"
        placeholder="Enter your email">

      @for (error of getFieldErrors('email'); track error) {
        <p class="text-sm text-danger mt-1">{{ error }}</p>
      }
    </div>

    <!-- Submit button -->
    <button
      type="submit"
      [disabled]="!$canSubmit()"
      class="w-full bg-primary text-white px-4 py-3 rounded-xl
             hover:bg-primary-shade transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed">

      @if ($isSubmitting()) {
        <div class="flex items-center justify-center space-x-2">
          <svg class="animate-spin h-4 w-4"><!-- spinner --></svg>
          <span>Submitting...</span>
        </div>
      } @else {
        <span>Submit Form</span>
      }
    </button>

    @if ($submitError()) {
      <div class="text-danger text-sm mt-2">
        {{ $submitError() }}
      </div>
    }
  </div>
</form>
```

---

## 🗂️ Routing & Lazy Loading

### Modern Route Configuration

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features.component')
      .then(m => m.FeaturesComponent),
    children: [
      {
        path: 'detail/:id',
        loadComponent: () => import('./pages/features/detail/detail.component')
          .then(m => m.DetailComponent)
      }
    ]
  },
  {
    path: 'protected',
    loadComponent: () => import('./pages/protected/protected.component')
      .then(m => m.ProtectedComponent),
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard]
  }
];
```

### Route Guards with Signals

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.auth.$isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: any): boolean {
    if (component.$hasUnsavedChanges && component.$hasUnsavedChanges()) {
      return confirm('You have unsaved changes. Do you want to leave?');
    }
    return true;
  }
}
```

---

## 🎯 Performance Optimization

### Zoneless Change Detection Setup

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    // other providers
  ]
});
```

### OnPush Components with Signals

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Signals automatically trigger change detection -->
    <div>{{ $computedValue() }}</div>

    <!-- Manual change detection trigger when needed -->
    <button (click)="updateData()">Update</button>
  `
})
export class OptimizedComponent {
  private cdr = inject(ChangeDetectorRef);

  $data = signal<Data[]>([]);
  $computedValue = computed(() => this.$data().length);

  updateData(): void {
    // Signals automatically trigger change detection
    this.$data.update(data => [...data, newItem]);
  }

  // Manual trigger when using observables
  onObservableUpdate(): void {
    this.cdr.markForCheck();
  }
}
```

---

## 🧪 Testing Patterns

### Component Testing with Signals

```typescript
describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;
  let mockService: jasmine.SpyObj<FeatureService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('FeatureService', ['init', 'destroy', 'fetchData']);

    TestBed.configureTestingModule({
      imports: [FeatureComponent],
      providers: [
        { provide: FeatureService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(FeatureService) as jasmine.SpyObj<FeatureService>;
  });

  it('should update loading state', async () => {
    // Test signal updates
    expect(component.$isLoading()).toBeFalse();

    component.$isLoading.set(true);
    expect(component.$isLoading()).toBeTrue();

    // Test computed signals
    expect(component.$isActive()).toBeFalse();
  });

  it('should handle data loading', async () => {
    const testData = [{ id: '1', name: 'Test' }];
    mockService.fetchData.and.returnValue(Promise.resolve(testData));

    await component.loadInitialData();

    expect(component.$data()).toEqual(testData);
    expect(component.$hasData()).toBeTrue();
  });
});
```

---

## 📚 Advanced Patterns

### Custom Signal Operators

```typescript
// Signal utilities
export function createLoadingSignal<T>() {
  const $isLoading = signal(false);
  const $data = signal<T | null>(null);
  const $error = signal<string | null>(null);

  return {
    $isLoading: $isLoading.asReadonly(),
    $data: $data.asReadonly(),
    $error: $error.asReadonly(),
    $hasData: computed(() => $data() !== null),
    $hasError: computed(() => $error() !== null),

    setLoading: (loading: boolean) => $isLoading.set(loading),
    setData: (data: T | null) => $data.set(data),
    setError: (error: string | null) => $error.set(error),

    reset: () => {
      $isLoading.set(false);
      $data.set(null);
      $error.set(null);
    }
  };
}

// Usage
export class ComponentWithLoadingState {
  private loadingState = createLoadingSignal<User[]>();

  $users = this.loadingState.$data;
  $isLoading = this.loadingState.$isLoading;
  $hasUsers = this.loadingState.$hasData;

  async loadUsers(): Promise<void> {
    this.loadingState.setLoading(true);

    try {
      const users = await this.userService.getUsers();
      this.loadingState.setData(users);
    } catch (error) {
      this.loadingState.setError(error.message);
    } finally {
      this.loadingState.setLoading(false);
    }
  }
}
```

### Signal-Based State Management

```typescript
@Injectable({
  providedIn: 'root'
})
export class StateManagementService {
  // Global application state
  private $user = signal<User | null>(null);
  private $theme = signal<'light' | 'dark'>('light');
  private $notifications = signal<Notification[]>([]);

  // Public readonly signals
  readonly user = this.$user.asReadonly();
  readonly theme = this.$theme.asReadonly();
  readonly notifications = this.$notifications.asReadonly();

  // Computed state
  readonly $isAuthenticated = computed(() => this.$user() !== null);
  readonly $unreadCount = computed(() =>
    this.$notifications().filter(n => !n.read).length
  );

  // State mutations
  setUser(user: User | null): void {
    this.$user.set(user);
  }

  toggleTheme(): void {
    this.$theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  addNotification(notification: Notification): void {
    this.$notifications.update(current => [...current, notification]);
  }

  markNotificationAsRead(id: string): void {
    this.$notifications.update(current =>
      current.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }
}
```

---

## 🚀 Development Workflow

### Essential Commands

```bash
# Development
npm start                 # Development server (localhost:4200)
npm run serve            # Alternative dev command
npm run watch            # Build and watch

# Building
npm run build:dev        # Development build with source maps
npm run build:prod       # Production build with optimizations
npm run publish          # Build and deploy to AWS

# Testing
npm test                 # Unit tests via Karma
npm run e2e              # End-to-end tests

# Content Generation
npm run angularssg       # Generate static site content
npm run sitemap          # Generate sitemap.xml
npm run robots           # Generate robots.txt

# Code Quality
npm run lint             # ESLint checks
npm run lint:fix         # Fix linting issues
npm run typecheck        # TypeScript compilation check
```

### Angular CLI Patterns (Angular 20)

```bash
# Generate components (new naming convention)
ng g c pages/user-profile    # → user-profile.ts with UserProfile class
ng g c shared/modal         # → modal.ts with Modal class

# Generate services (domain-specific naming)
ng g s utils/auth-store     # → auth-store.ts with AuthStore class
ng g s utils/user-api       # → user-api.ts with UserApi class
ng g s utils/data-access    # → data-access.ts with DataAccess class

# Generate guards
ng g g utils/guards/auth    # → auth.ts with AuthGuard

# Generate directives
ng g d utils/highlight      # → highlight.ts with Highlight class

# Generate pipes
ng g p utils/pipes/format   # → format.ts with Format pipe

# Legacy naming (if needed)
ng g c user-profile --type=component  # → user-profile.component.ts
ng g s auth --type=service            # → auth.service.ts
```

---

## 🔧 Common Patterns & Utilities

### Breakpoint Service Usage

```typescript
export class ResponsiveComponent {
  protected breakpoint = inject(BreakpointService);

  // Computed responsive values
  $containerClasses = computed(() => {
    if (this.breakpoint.isMobile()) return 'px-4 py-2';
    if (this.breakpoint.isTablet()) return 'px-6 py-4';
    return 'px-8 py-6';
  });

  $isDesktop = computed(() =>
    this.breakpoint.isDesktop() || this.breakpoint.isXlDesktop()
  );

  // Template usage
  template = `
    <div [class]="$containerClasses()">
      @if ($isDesktop()) {
        <desktop-layout />
      } @else {
        <mobile-layout />
      }
    </div>
  `;
}
```

### Error Handling Patterns

```typescript
export class ErrorHandlingComponent {
  private signInService = inject(SignInService);

  async performAction(): Promise<void> {
    try {
      const result = await this.apiCall();

      // Success notification
      const toastId = this.signInService.success(
        "Success!",
        "Operation completed successfully"
      );
      this.signInService.trackToast(toastId);

      return result;
    } catch (error) {
      // Error notification
      const toastId = this.signInService.error(
        "Error",
        error.message || "Something went wrong"
      );
      this.signInService.trackToast(toastId);

      throw error;
    }
  }
}
```

### Loading States

```typescript
export class LoadingStatesComponent {
  private signInService = inject(SignInService);

  $isLoading = signal<boolean>(false);

  async performAsyncAction(): Promise<void> {
    // Start loading state
    this.signInService.startLogin();
    this.$isLoading.set(true);

    try {
      await this.longRunningOperation();
    } finally {
      // Loading stops automatically when toast is removed
      // Or manually: this.signInService.stopLogin();
      this.$isLoading.set(false);
    }
  }
}
```

---

## 📖 Best Practices Summary

### ✅ Do's

1. **Use Standalone Components** - Modern Angular architecture
2. **Embrace Signals** - Reactive state management without observables complexity
3. **Leverage httpResource** - For reactive HTTP data fetching
4. **Implement @defer** - For performance optimization and code splitting
5. **Use inject()** - Modern dependency injection pattern
6. **Follow Signal Naming** - Prefix signals with `$` for clarity
7. **Compute Derived State** - Use computed() for reactive calculations
8. **Host Binding** - Use host object for component styling
9. **Track Expressions** - Always specify track expressions in @for loops (now mandatory)
10. **Type Everything** - Strict TypeScript for better DX

### ❌ Don'ts

1. **Avoid NgModules** - Use standalone components instead
2. **Don't Use NgClass/NgStyle** - Soft deprecated as of Nov 2024, use direct [class]/[style] binding
3. **Don't Use @HostListener** - Use host event binding in @Component decorator instead
4. **Don't Use Component/Service Suffixes** - Follow Angular 20 naming conventions
5. **Don't Mix Patterns** - Choose between observables and signals consistently
6. **Avoid Effects for State** - Use computed() instead of effect() for state derivation
7. **Don't Defer Above Fold** - Avoid deferring critical initial content
8. **Avoid Manual Change Detection** - Let signals handle reactivity
9. **Don't Ignore Error States** - Always handle loading/error/success states
10. **Avoid Nested Subscriptions** - Use signals or async pipe instead
11. **Don't Skip Track Expressions** - Now mandatory in @for loops (compiler error if missing)
12. **Avoid Component Logic in Templates** - Keep templates declarative
13. **Don't Use httpResource for Mutations** - Use HttpClient for POST/PUT/DELETE

---

## 🎯 Key Takeaways

- **Angular 20** represents a major shift toward signals and zoneless change detection
- **Standalone components** eliminate the need for NgModules
- **httpResource** simplifies reactive data fetching patterns
- **@defer blocks** provide fine-grained control over code splitting
- **Signals** offer a simpler alternative to RxJS for many use cases
- **Host binding** keeps component styling declarative
- **Modern template syntax** (@if, @for, @switch) improves readability

This guide captures the essence of modern Angular development with your established patterns while incorporating the latest Angular 20 features for building scalable, performant applications.