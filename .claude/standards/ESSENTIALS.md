# Essential Angular Standards - Always Read First

> **Purpose:** Single source of truth for all Angular development. Read this file for EVERY Angular task.

---

## 🚨 CRITICAL ANTI-PATTERNS (Prevent These!)

### 1. Custom CSS Instead of Tailwind ⚠️ MOST COMMON MISTAKE
```typescript
// ❌ WRONG - Adding custom CSS for simple styling
styles: [`
  .my-container {
    padding: 1rem;
    background: #031440;
    border-radius: 0.5rem;
  }
`]

// ✅ CORRECT - Use Tailwind utilities
template: `<div class="p-4 bg-primary rounded-lg">`
```

**Rule:** Tailwind-first philosophy. Custom CSS ONLY for complex multi-property effects (like existing `.media-shadow`).

### 2. Functions Called in Templates (Especially Loops) 🚨 CRITICAL
```html
<!-- ❌ WRONG - Called on EVERY change detection! -->
@for (item of items(); track item.id) {
  <div [class.active]="isActive(item)">{{ formatName(item) }}</div>
}

<!-- ✅ CORRECT - Enrich data with computed -->
@for (item of enrichedItems(); track item.id) {
  <div [class.active]="item.isActive()">{{ item.displayName() }}</div>
}
```

```typescript
// ✅ Enrich pattern
enrichedItems = computed(() => {
  return this.items().map(item => ({
    ...item,
    isActive: computed(() => this.selectedId() === item.id),
    displayName: computed(() => `${item.firstName} ${item.lastName}`)
  }));
});
```

**Rule:** NEVER call functions in templates. Use computed signals for derived values.

### 3. Creating New Files Instead of Editing
❌ Don't create new components/files unless explicitly required
✅ ALWAYS prefer editing existing files
❌ NEVER create documentation files unless explicitly requested

### 4. Using ngClass/ngStyle
```html
<!-- ❌ WRONG -->
<div [ngClass]="{'active': isActive, 'disabled': isDisabled}">

<!-- ✅ CORRECT -->
<div [class.active]="isActive" [class.disabled]="isDisabled">
```

### 5. Component/Service Suffixes (Angular 20)
```typescript
// ❌ WRONG
export class UserProfileComponent {}  // user-profile.component.ts

// ✅ CORRECT
export class UserProfile {}  // user-profile.ts
export class AuthStore {}    // auth-store.ts (not AuthService)
```

### 6. Effects Outside Constructor
```typescript
// ❌ WRONG - Effect as class property
private myEffect = effect(() => {
  console.log(this.signal());
});

// ✅ CORRECT - Effect in constructor
constructor() {
  effect(() => {
    console.log(this.signal());
  });
}
```

**Rule:** ALWAYS create effects inside the constructor, never as class properties. This ensures proper lifecycle management and makes dependencies explicit.

---

## 🎯 QUICK DECISIONS

### Styling
- **Need to style element?** → Tailwind utility classes
- **Complex multi-property effect?** → Custom CSS (like `.media-shadow`)
- **Responsive layout?** → Tailwind breakpoints (`lg:`, `md:`)
- **BreakpointService?** → ❌ Deprecated, use Tailwind classes

### State Management
- **Need reactive state?** → `signal<T>(initialValue)`
- **Need derived state?** → `computed(() => ...)`
- **Need side effects?** → `effect(() => ...)` in constructor only
- **Need async data?** → `httpResource()` (auto-starting)

### Templates
- **Show/hide content?** → `@if (condition) { }`
- **Loop over array?** → `@for (item of items; track item.id) { }`
- **Multiple conditions?** → `@switch (value) { @case ('x') { } }`
- **Call function for display?** → ❌ NEVER! Use computed signal
- **Lazy load?** → `@defer (on viewport) { }`

### Components
- **New component?** → Always standalone, no NgModules
- **Inject service?** → `private service = inject(ServiceName)`
- **Event handling?** → `host: { '(click)': 'method()' }`
- **Lifecycle?** → `ngOnInit()`, `ngOnDestroy()`

### Forms
- **Form state?** → Reactive forms with `FormBuilder`
- **Validation?** → `Validators.required`, `Validators.email`
- **Input styling?** → Use `getInputClasses()` helper

---

## 📋 ESSENTIAL PATTERNS

### Component Structure
```typescript
@Component({
  selector: 'app-feature',
  imports: [CommonModule, RouterLink],
  host: {
    class: 'block relative',
    '(window:scroll)': 'onScroll()'
  },
  template: `...`
})
export class Feature {  // ✅ No "Component" suffix
  // Services
  private service = inject(FeatureService);

  // Signals
  $isLoading = signal<boolean>(false);
  $data = signal<Item[]>([]);

  // Computed
  $hasData = computed(() => this.$data().length > 0);

  constructor() {
    // Effects here only
    effect(() => {
      // Side effects
    });
  }
}
```

### Service Organization Order 🚨 CRITICAL
```typescript
@Injectable()
export class FeatureService {
  // 1. Injected services
  private http = inject(HttpClient);
  private zendesk = inject(ZendeskService);

  // 2. Route params (if needed)
  private $routeParams = toSignal(this.route.paramMap);

  // 3. Regular signals
  private $cursor = signal<string>(undefined);
  public $data = signal<Item[]>([]);

  // 4. Resources (data loading)
  private dataResource = httpResource({
    loader: () => this.http.get<Item[]>('/api/items')
  });

  // 5. Computed signals (derived from resources/signals)
  public $isLoading = computed(() => this.dataResource.isLoading());
  public $items = computed(() => this.dataResource.value() ?? []);

  // 6. Component configs (UI objects)
  readonly footer: Footer = new Footer({ /* config */ });

  // 7. Constructor (effects only)
  constructor() {
    effect(() => { /* coordination */ });
  }

  // 8. Public methods
  async updateItem(item: Item) { }

  // 9. Private helpers
  private transform(data: any) { }
}
```

**❌ NEVER mix sections or place resources after component configs!**

### Signal Patterns
```typescript
// State
$isLoading = signal<boolean>(false);
$items = signal<Item[]>([]);
$error = signal<string | null>(null);

// Computed (derived)
$hasItems = computed(() => this.$items().length > 0);
$firstItem = computed(() => this.$items()[0]);

// Updates
this.$isLoading.set(true);
this.$items.update(items => [...items, newItem]);
```

### Template Control Flow
```html
<!-- Conditional -->
@if ($isLoading()) {
  <div>Loading...</div>
} @else if ($error()) {
  <div>Error: {{ $error() }}</div>
} @else {
  <div>Content</div>
}

<!-- Loop (track REQUIRED) -->
@for (item of $items(); track item.id) {
  <div>{{ item.name }}</div>
}

<!-- Switch -->
@switch ($status()) {
  @case ('loading') { <spinner /> }
  @case ('error') { <error /> }
  @default { <content /> }
}
```

### Form Validation Helper
```typescript
formGroup = this.builder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
});

getInputClasses(fieldName: string): string {
  const field = this.formGroup.get(fieldName);
  if (!field?.touched) return 'focus:ring-primary';
  return field.valid ? 'focus:ring-success' : 'focus:ring-danger';
}
```

### Input Template
```html
<input
  formControlName="email"
  [class]="getInputClasses('email')"
  class="block w-full rounded-xl border-0 px-4 py-3.5
         text-dark bg-light ring-1 ring-medium
         placeholder:text-medium focus:ring-2 focus:bg-white
         transition-all duration-200"
  placeholder="Enter email">
```

### Animation Usage
```html
<!-- Simple fade -->
<div animate.enter="fade-in" animate.leave="fade-out">Content</div>

<!-- With @if -->
@if ($show()) {
  <div animate.enter="slide-in-right" animate.leave="slide-out-left">
    Content
  </div>
}

<!-- CRITICAL: Parent needs overflow-hidden -->
<div class="relative overflow-hidden">
  <div animate.enter="slide-in-right">Animated content</div>
</div>
```

---

## 🎨 CHEAT SHEETS

### Colors (HeadCount System)

**Backgrounds:**
- `bg-primary` / `bg-primary-tint` / `bg-primary-shade` - Brand blue
- `bg-secondary` / `bg-secondary-tint` / `bg-secondary-shade` - Brand red
- `bg-success` / `bg-warning` / `bg-danger` - Status colors
- `bg-light` / `bg-medium` / `bg-dark` - Neutrals (auto-switch dark mode)
- `bg-white` - White background

**Text:**
- `text-primary` / `text-secondary` - Brand colors
- `text-dark` - Main text (auto-switches in dark mode)
- `text-medium` - Secondary text
- `text-success` / `text-warning` / `text-danger` - Status

**Borders/Rings:**
- `ring-primary` / `border-primary` - Brand accents
- `ring-success` / `ring-danger` - Validation states
- `ring-medium` / `border-light` - Neutral borders

**🚨 CRITICAL:**
- ✅ Use `var(--color-primary)` in CSS
- ❌ NEVER use `var(--ion-color-*)` (deprecated)
- ✅ Standard Tailwind colors OK for charts/data viz
- ❌ Don't use standard colors for basic UI elements

### Common Animations

| Class | Use Case | Duration |
|-------|----------|----------|
| `fade-in` / `fade-out` | Simple show/hide | 150ms / 100ms |
| `slide-in-right` / `slide-out-left` | Carousels, switching | 600ms |
| `fade-scale-in` / `fade-scale-out` | Cards, modals | 500ms / 250ms |
| `scale-in` / `scale-out` | Modals | 200ms / 150ms |

**Adding animations:** Add `@keyframes` in `styles.css` `@theme` block, then create CSS class.

### Tailwind Breakpoints
- `sm:` - 640px+ (tablets)
- `md:` - 768px+ (tablets)
- `lg:` - 1024px+ (desktops) **← Most common**
- `xl:` - 1280px+ (large desktops)
- `2xl:` - 1536px+ (extra large)

**Mobile-first approach:**
```html
<div class="grid-cols-1 lg:grid-cols-2">
  <!-- 1 column mobile, 2 columns desktop -->
</div>
```

### Common Component Imports
```typescript
// Basic
import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Forms
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Common services
import { BreakpointService } from 'src/app/utils/breakpoint.service';
import { NavigationService } from 'src/app/utils/navigation.service';
```

---

## 📖 Deep Dive References (Read When Needed)

**For specific scenarios, consult:**
- `template-performance.md` - Complete guide on data enrichment pattern
- `animations.md` - Full animation system documentation
- `tailwind-config.md` - Tailwind 4 CSS configuration details
- `troubleshooting/styling-issues.md` - Color/CSS debugging
- `examples/components/` - Full working component examples
- `frameworks/angular.md` - Comprehensive Angular 20 guide

**For architecture:**
- `architecture/component-architecture.md` - Component design patterns
- `architecture/service-architecture.md` - Service patterns
- `integration/angular-tailwind.md` - How styling integrates

---

## ✅ Pre-Flight Checklist

Before completing any Angular task, verify:
- [ ] Using Tailwind utilities (not custom CSS for simple styles)
- [ ] No functions called in templates (especially loops)
- [ ] All `@for` loops have `track` expressions
- [ ] Using signals (`signal()`, `computed()`)
- [ ] No Component/Service suffixes in class names
- [ ] Using `[class]` binding (not `ngClass`)
- [ ] Effects only in constructor (if needed)
- [ ] Service organization follows correct order
- [ ] Standalone components (no NgModules)
- [ ] Using HeadCount color system (`bg-primary`, `text-dark`)

---

**Last Updated:** 2025-11-11
**Version:** 1.0
**Token Count:** ~4,000
