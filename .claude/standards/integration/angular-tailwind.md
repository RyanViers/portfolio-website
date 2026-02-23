# Angular + Tailwind Integration Patterns

## Component Styling with Custom Colors

### Form Component Example
```typescript
@Component({
  template: `
    <form [formGroup]="form" class="space-y-6">
      <!-- Input with our color system -->
      <input
        formControlName="email"
        class="block w-full rounded-xl border-0 px-4 py-3.5
               text-dark bg-light ring-1 ring-medium
               placeholder:text-medium focus:ring-primary focus:bg-white
               transition-all duration-200"
        [class]="getInputClasses('email')">

      <!-- Error message -->
      @if (emailField?.touched && emailField?.errors) {
        <p class="text-sm text-danger mt-1">{{ getErrorMessage('email') }}</p>
      }
    </form>
  `
})
```

### Dynamic Classes with Signals
```typescript
export class MyComponent {
  $isActive = signal<boolean>(false);
  $variant = signal<'primary' | 'secondary'>('primary');

  // Computed classes based on state
  $buttonClasses = computed(() => {
    const base = 'px-4 py-2 rounded-xl transition-all duration-200';
    const variant = this.$variant() === 'primary'
      ? 'bg-primary text-white hover:bg-primary-tint'
      : 'bg-secondary text-white hover:bg-secondary-tint';
    const state = this.$isActive() ? 'ring-2 ring-primary' : '';

    return `${base} ${variant} ${state}`;
  });
}
```

### Conditional Styling
```html
<div [class]="$containerClasses()">
  <button
    [class]="$buttonClasses()"
    [disabled]="$isLoading()"
    class="disabled:opacity-50 disabled:cursor-not-allowed">
    @if ($isLoading()) {
      <span class="text-dark">Loading...</span>
    } @else {
      <span class="text-dark">Submit</span>
    }
  </button>
</div>
```

## Service-Driven Styling

### Theme-Aware Component
```typescript
@Component({
  template: `
    <div [class]="containerClasses">
      <h1 class="text-dark text-3xl font-bold">{{ title }}</h1>
      <p class="text-medium">{{ description }}</p>
    </div>
  `
})
export class ThemedComponent {
  private themeService = inject(ThemeService);

  get containerClasses(): string {
    return 'p-6 rounded-xl bg-light border border-medium';
  }
}
```

## Responsive Patterns

### Mobile-First with Signals
```typescript
export class ResponsiveComponent {
  private breakpoint = inject(BreakpointService);

  $isMobile = computed(() => !this.breakpoint.isDesktop());
  $containerClasses = computed(() =>
    this.$isMobile()
      ? 'p-4 space-y-4'
      : 'p-8 space-y-6'
  );
}
```

### Responsive Template
```html
<div [class]="$containerClasses()">
  <!-- Mobile layout -->
  @if ($isMobile()) {
    <div class="flex flex-col space-y-4">
      <div class="bg-light p-4 rounded-xl">Mobile content</div>
    </div>
  } @else {
    <!-- Desktop layout -->
    <div class="grid grid-cols-2 gap-8">
      <div class="bg-light p-6 rounded-xl">Desktop content</div>
    </div>
  }
</div>
```

## Animation Integration

### Loading States
```html
<button
  [disabled]="$isLoading()"
  class="bg-primary text-dark px-4 py-2 rounded-xl
         transition-all duration-200 transform
         hover:scale-105 active:scale-95
         disabled:opacity-50 disabled:cursor-not-allowed
         disabled:hover:scale-100">

  @if ($isLoading()) {
    <div class="flex items-center space-x-2">
      <svg class="animate-spin h-4 w-4 text-dark"><!-- spinner --></svg>
      <span>Loading...</span>
    </div>
  } @else {
    <span>Submit</span>
  }
</button>
```

### Transition Classes
```css
/* In component or global styles */
.slide-in-from-top {
  animation: slideInFromTop 200ms ease-out;
}

@keyframes slideInFromTop {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## Form Validation Integration

### Validation Classes Helper
```typescript
getInputClasses(fieldName: string): string {
  const field = this.formGroup.get(fieldName);
  const base = 'block w-full rounded-xl border-0 px-4 py-3.5 text-dark bg-light ring-1 transition-all duration-200';

  if (!field?.touched) {
    return `${base} ring-medium focus:ring-primary focus:bg-white`;
  }

  return field.valid
    ? `${base} ring-success focus:ring-success focus:bg-white`
    : `${base} ring-danger focus:ring-danger focus:bg-white`;
}
```

## Host Class Binding

### Component Host Styling
```typescript
@Component({
  selector: 'app-card',
  host: {
    class: 'block bg-white rounded-xl shadow-lg border border-light',
    '[class.active]': '$isActive()'
  },
  template: `<ng-content></ng-content>`
})
export class CardComponent {
  $isActive = signal<boolean>(false);
}
```

### Dynamic Host Classes
```typescript
@Component({
  host: {
    '[class]': 'hostClasses'
  }
})
export class DynamicComponent {
  $size = signal<'sm' | 'md' | 'lg'>('md');

  get hostClasses(): string {
    const base = 'block bg-light rounded-xl';
    const size = {
      sm: 'p-4 text-sm',
      md: 'p-6 text-base',
      lg: 'p-8 text-lg'
    }[this.$size()];

    return `${base} ${size}`;
  }
}
```