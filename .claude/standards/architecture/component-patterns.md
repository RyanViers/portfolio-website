# Component Architecture Patterns

## Standalone Component Structure

### Basic Component Template
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example',
  imports: [CommonModule],
  host: { class: 'block relative w-full' },
  template: `
    <div class="bg-light p-4">
      Component content
    </div>
  `
})
export class ExampleComponent {
  // Component implementation
}
```

### Feature Component with Service
```typescript
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureService } from './services/feature.service';

@Component({
  selector: 'app-feature',
  imports: [CommonModule],
  providers: [FeatureService], // Feature-scoped service
  host: {
    class: 'block relative w-full',
    '[class.loading]': '$isLoading()'
  },
  template: `...`
})
export class FeatureComponent implements OnInit, OnDestroy {
  private featureService = inject(FeatureService);

  ngOnInit(): void {
    this.featureService.init();
  }

  ngOnDestroy(): void {
    this.featureService.destroy();
  }
}
```

## Service Injection Patterns

### Modern Injection (Preferred)
```typescript
export class MyComponent {
  // Services
  private auth = inject(AuthService);
  private http = inject(HttpClient);
  protected breakpoint = inject(BreakpointService);

  // Use protected for template access
  protected signInService = inject(SignInService);
}
```

### Constructor Injection (When Needed)
```typescript
export class MyComponent {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  // Can mix with inject() for newer services
  private newService = inject(NewService);
}
```

## Signal-Based State Management

### Component State Signals
```typescript
export class ComponentWithState {
  // State signals
  $isLoading = signal<boolean>(false);
  $data = signal<Item[]>([]);
  $error = signal<string | null>(null);
  $selectedId = signal<string | null>(null);

  // Computed signals
  $hasData = computed(() => this.$data().length > 0);
  $selectedItem = computed(() => {
    const id = this.$selectedId();
    return id ? this.$data().find(item => item.id === id) : null;
  });

  // Derived UI state
  $isReady = computed(() => !this.$isLoading() && this.$hasData());
}
```

### Signal Updates
```typescript
// Setting values
this.$isLoading.set(true);
this.$data.set(newData);

// Updating arrays
this.$data.update(items => [...items, newItem]);
this.$data.update(items => items.filter(item => item.id !== targetId));

// Conditional updates
if (this.$selectedId() !== newId) {
  this.$selectedId.set(newId);
}
```

## Template Patterns

### Control Flow (Angular 17+)
```html
<!-- Loading state -->
@if ($isLoading()) {
  <div class="bg-light p-4 rounded-xl">
    <div class="animate-pulse">Loading...</div>
  </div>
} @else if ($error()) {
  <div class="bg-danger text-white p-4 rounded-xl">
    Error: {{ $error() }}
  </div>
} @else {
  <!-- Main content -->
  <div class="bg-light p-4 rounded-xl">
    @for (item of $data(); track item.id) {
      <div class="p-2 border-b border-medium">
        {{ item.name }}
      </div>
    }
  </div>
}
```

### Responsive Templates
```html
<!-- Responsive layout -->
@if (isDesktop()) {
  <!-- Desktop layout -->
  <div class="grid grid-cols-3 gap-6">
    <div class="bg-light p-6 rounded-xl">Content</div>
  </div>
} @else {
  <!-- Mobile layout -->
  <div class="flex flex-col space-y-4">
    <div class="bg-light p-4 rounded-xl">Content</div>
  </div>
}
```

## Form Component Patterns

### Reactive Form Setup
```typescript
export class FormComponent implements OnInit {
  private builder = inject(FormBuilder);

  formGroup: FormGroup;
  $isSubmitting = signal<boolean>(false);

  ngOnInit() {
    this.formGroup = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getInputClasses(fieldName: string): string {
    const field = this.formGroup.get(fieldName);
    if (!field?.touched) return 'focus:ring-primary';
    return field.valid ? 'focus:ring-success' : 'focus:ring-danger';
  }

  async onSubmit(): Promise<void> {
    if (this.formGroup.valid && !this.$isSubmitting()) {
      this.$isSubmitting.set(true);

      try {
        const formData = this.formGroup.value;
        await this.handleSubmit(formData);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.$isSubmitting.set(false);
      }
    }
  }
}
```

### Form Template
```html
<form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="space-y-6">
  <!-- Input field -->
  <div class="space-y-2">
    <label class="block text-sm font-medium text-dark">Email</label>
    <input
      formControlName="email"
      [class]="getInputClasses('email')"
      class="block w-full rounded-xl border-0 px-4 py-3.5
             text-dark bg-light ring-1 ring-medium
             placeholder:text-medium focus:ring-2 focus:bg-white
             transition-all duration-200">

    <!-- Error message -->
    @if (formGroup.get('email')?.touched && formGroup.get('email')?.errors) {
      <p class="text-sm text-danger">Email is required</p>
    }
  </div>

  <!-- Submit button -->
  <button
    type="submit"
    [disabled]="!formGroup.valid || $isSubmitting()"
    class="w-full bg-primary text-white py-3 rounded-xl
           hover:bg-primary-tint disabled:opacity-50
           transition-all duration-200">

    @if ($isSubmitting()) {
      <span>Submitting...</span>
    } @else {
      <span>Submit</span>
    }
  </button>
</form>
```

## Component Communication

### Parent-Child with Signals
```typescript
// Parent Component
export class ParentComponent {
  $selectedItem = signal<Item | null>(null);

  onItemSelected(item: Item): void {
    this.$selectedItem.set(item);
  }
}

// Child Component
export class ChildComponent {
  @Input() item: Item;
  @Output() selected = new EventEmitter<Item>();

  onClick(): void {
    this.selected.emit(this.item);
  }
}
```

### Service-Based Communication
```typescript
// Shared between components via service
export class FeatureService {
  $selectedItem = signal<Item | null>(null);

  selectItem(item: Item): void {
    this.$selectedItem.set(item);
  }
}

// Components inject service and react to signals
export class ComponentA {
  private featureService = inject(FeatureService);

  $selectedItem = this.featureService.$selectedItem;
}
```

## Host Class Patterns

### Static Host Classes
```typescript
@Component({
  host: {
    class: 'block relative w-full bg-light rounded-xl p-4'
  }
})
```

### Dynamic Host Classes
```typescript
@Component({
  host: {
    class: 'block relative w-full',
    '[class.active]': '$isActive()',
    '[class.loading]': '$isLoading()',
    '[attr.aria-expanded]': '$isExpanded()'
  }
})
export class DynamicComponent {
  $isActive = signal<boolean>(false);
  $isLoading = signal<boolean>(false);
  $isExpanded = signal<boolean>(false);
}
```

### Computed Host Classes
```typescript
@Component({
  host: {
    '[class]': 'hostClasses'
  }
})
export class ComputedHostComponent {
  $size = signal<'sm' | 'md' | 'lg'>('md');
  $variant = signal<'primary' | 'secondary'>('primary');

  get hostClasses(): string {
    const base = 'block relative rounded-xl transition-all duration-200';
    const size = {
      sm: 'p-2 text-sm',
      md: 'p-4 text-base',
      lg: 'p-6 text-lg'
    }[this.$size()];

    const variant = {
      primary: 'bg-primary text-white',
      secondary: 'bg-secondary text-white'
    }[this.$variant()];

    return `${base} ${size} ${variant}`;
  }
}
```

## Lifecycle Management

### Standard Lifecycle
```typescript
export class LifecycleComponent implements OnInit, OnDestroy {
  private service = inject(MyService);

  ngOnInit(): void {
    this.service.init();
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.service.destroy();
    this.cleanup();
  }

  private setupSubscriptions(): void {
    // Setup any subscriptions
  }

  private cleanup(): void {
    // Cleanup logic
  }
}
```

### Service Integration
```typescript
export class ServiceIntegratedComponent implements OnInit, OnDestroy {
  protected featureService = inject(FeatureService);

  ngOnInit(): void {
    // Let service handle its own initialization
    this.featureService.init();
  }

  ngOnDestroy(): void {
    // Let service handle its own cleanup
    this.featureService.destroy();
  }
}
```