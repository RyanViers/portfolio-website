# Angular Signal Forms Quick Reference

**Status:** Experimental (Angular 21+)
**Use Case:** Signal-based form management with automatic sync between model and UI

## Overview

Signal Forms provide automatic synchronization between data models and UI using Angular signals, eliminating manual subscriptions and reactive form complexity.

## Critical: DO NOT Use `<form>` Tag

**The `[field]` directive conflicts with native `<form>` submission behavior.** Using `<form>` causes form values to be submitted as URL query parameters instead of calling your handler.

**DO NOT:**
```html
<form (submit)="onSubmit($event)">
  <input [field]="loginForm.email" />
  <button type="submit">Submit</button>
</form>
```

**DO:**
```html
<div>
  <input [field]="loginForm.email" />
  <button type="button" (click)="onSubmit()">Submit</button>
</div>
```

## Basic Setup

### 1. Create Signal Model

```typescript
$loginData = signal({ email: '', password: '' });
```

### 2. Generate Field Tree with Validation

```typescript
import { form, Field, required, minLength, validate } from '@angular/forms/signals';

loginForm = form(this.$loginData, (schema) => {
  required(schema.email, { message: 'Email is required' });
  minLength(schema.email, 4, { message: 'Email must be at least 4 characters' });
  required(schema.password, { message: 'Password is required' });
});
```

### 3. Template Binding

```typescript
@Component({
  selector: 'app-login',
  imports: [Field],
  template: `
    <div class="space-y-6">
      <!-- Email Field -->
      <div>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          autocomplete="email"
          [field]="loginForm.email"
          [class.ring-danger]="loginForm.email().touched() && loginForm.email().invalid()"
          class="input-styles">
        @if (loginForm.email().touched() && loginForm.email().invalid()) {
          <p class="text-danger">{{ loginForm.email().errors()[0].message }}</p>
        }
      </div>

      <!-- Password Field -->
      <div>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          autocomplete="current-password"
          [field]="loginForm.password"
          class="input-styles">
        @if (loginForm.password().touched() && loginForm.password().invalid()) {
          <p class="text-danger">{{ loginForm.password().errors()[0].message }}</p>
        }
      </div>

      <!-- Submit Button - MUST be type="button" with (click) -->
      <button
        type="button"
        (click)="onSubmit()"
        [disabled]="loginForm().invalid()">
        Submit
      </button>
    </div>
  `
})
export class LoginComponent {
  $loginData = signal({ email: '', password: '' });

  loginForm = form(this.$loginData, (schema) => {
    required(schema.email, { message: 'Email is required' });
    required(schema.password, { message: 'Password is required' });
  });

  onSubmit(): void {
    if (this.loginForm().valid()) {
      const { email, password } = this.$loginData();
      // Handle submission
    }
  }
}
```

## Field State Signals

Every field provides reactive state signals:

| Signal | Type | Purpose |
|--------|------|---------|
| `value()` | `Signal<T>` | Current field value |
| `valid()` | `Signal<boolean>` | Validation pass/fail status |
| `invalid()` | `Signal<boolean>` | Inverse of valid |
| `touched()` | `Signal<boolean>` | User has focused and blurred |
| `dirty()` | `Signal<boolean>` | User has modified value |
| `disabled()` | `Signal<boolean>` | Field is disabled |
| `readonly()` | `Signal<boolean>` | Field is read-only |
| `pending()` | `Signal<boolean>` | Async validation in progress |
| `errors()` | `Signal<Error[]>` | Array of validation errors |

## `[field]` Directive Restrictions

The `[field]` directive does NOT allow:
- `name` attribute - will error
- `[type]` dynamic binding - use static `type="password"` instead

```html
<!-- WRONG -->
<input name="email" [field]="form.email" />
<input [type]="showPassword ? 'text' : 'password'" [field]="form.password" />

<!-- CORRECT -->
<input [field]="form.email" />
<input type="password" [field]="form.password" />
```

## Validation

### Built-in Validators

```typescript
import {
  required,
  email,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  validate
} from '@angular/forms/signals';

const registrationForm = form(registrationModel, (schemaPath) => {
  // Required fields
  required(schemaPath.username, {message: 'Username is required'});

  // Email validation
  email(schemaPath.email, {message: 'Must be valid email'});

  // Length validation
  minLength(schemaPath.password, 8, {message: 'At least 8 characters'});
  maxLength(schemaPath.bio, 500, {message: 'Max 500 characters'});

  // Number range
  min(schemaPath.age, 18, {message: 'Must be 18 or older'});
  max(schemaPath.age, 120, {message: 'Must be 120 or younger'});

  // Pattern matching
  pattern(schemaPath.phone, /^\d{3}-\d{3}-\d{4}$/, {
    message: 'Format: 123-456-7890'
  });

  // Custom validation with validate()
  validate(schemaPath.password, ({ value }) => {
    const pw = value() as string;
    const valid = pw.length >= 8 && /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
    return valid ? null : { kind: 'weak', message: 'Password must be 8+ chars with upper, lower, and number' };
  });
});
```

### Error Handling Pattern

```typescript
@if (field().touched() && field().invalid()) {
  <ul class="text-red-600 text-sm mt-1">
    @for (error of field().errors(); track error.kind) {
      <li>{{ error.message }}</li>
    }
  </ul>
}
```

## Input Type Support

### Text Inputs
```html
<input type="text" [field]="form.name" />
<input type="email" [field]="form.email" />
<input type="password" [field]="form.password" />
<textarea [field]="form.bio"></textarea>
```

### Number Inputs
```html
<!-- Automatic string-to-number conversion -->
<input type="number" [field]="form.age" />
```

### Date/Time Inputs
```html
<!-- ISO format strings: YYYY-MM-DD -->
<input type="date" [field]="form.birthdate" />

<!-- ISO format strings: HH:mm -->
<input type="time" [field]="form.appointmentTime" />
```

### Checkboxes
```html
<!-- Boolean value binding -->
<input type="checkbox" [field]="form.agreeToTerms" />
```

### Radio Buttons
```html
<!-- Automatic name attribute synchronization -->
<label>
  <input type="radio" [field]="form.plan" value="basic" />
  Basic
</label>
<label>
  <input type="radio" [field]="form.plan" value="pro" />
  Pro
</label>
```

### Select Dropdowns
```html
<!-- Static options -->
<select [field]="form.country">
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="mx">Mexico</option>
</select>

<!-- Dynamic options -->
<select [field]="form.category">
  @for (category of categories(); track category.id) {
    <option [value]="category.id">{{ category.name }}</option>
  }
</select>
```

**Note:** Multiple select (`<select multiple>`) is not currently supported.

## Programmatic Updates

### Setting Values
```typescript
// Update single field (updates both field and model)
loginForm.email().value.set('alice@example.com');

// Update entire model (updates all fields)
loginModel.set({
  email: 'alice@example.com',
  password: 'newpassword123'
});
```

### Reading Values
```typescript
// Read field value
const email = loginForm.email().value();

// Read entire model
const formData = loginModel();
```

### Checking State
```typescript
// Check if form is valid
if (loginForm().valid()) {
  submitForm(loginModel());
}

// Check specific field
if (loginForm.email().touched() && loginForm.email().invalid()) {
  showEmailError();
}
```

## Nested Objects

Signal Forms support nested object structures:

```typescript
interface Address {
  street: string;
  city: string;
  zip: string;
}

interface UserProfile {
  name: string;
  address: Address;
}

const profileModel = signal<UserProfile>({
  name: '',
  address: {
    street: '',
    city: '',
    zip: ''
  }
});

const profileForm = form(profileModel, (schemaPath) => {
  required(schemaPath.name);
  required(schemaPath.address.street);
  required(schemaPath.address.city);
  pattern(schemaPath.address.zip, /^\d{5}$/);
});
```

```html
<input [field]="profileForm.name" />
<input [field]="profileForm.address.street" />
<input [field]="profileForm.address.city" />
<input [field]="profileForm.address.zip" />
```

## Arrays

Signal Forms support array structures:

```typescript
interface Task {
  title: string;
  completed: boolean;
}

const tasksModel = signal<Task[]>([]);

const tasksForm = form(tasksModel, (schemaPath) => {
  // Validation can be applied to array items
});

// Access array items by index
@for (task of tasksForm(); track $index) {
  <input [field]="tasksForm[$index].title" />
  <input type="checkbox" [field]="tasksForm[$index].completed" />
}
```

## Comparison with Reactive Forms

| Feature | Signal Forms | Reactive Forms |
|---------|-------------|----------------|
| Boilerplate | Minimal | High (FormBuilder, FormGroup) |
| Type Safety | Full (dot notation) | Limited (string keys) |
| Synchronization | Automatic | Manual subscriptions |
| State Signals | Built-in | Manual tracking |
| Learning Curve | Low | Medium-high |
| Status | Experimental | Stable |
| Production Ready | Evaluate risk | Yes |

## When to Use Signal Forms

✅ **Use when:**
- Building new forms in Angular 21+
- Working in signal-based architecture
- Want simpler form management
- Okay with experimental API

❌ **Avoid when:**
- Need multiple select support
- Require 100% API stability
- Using Angular < 21
- Complex custom validators (use reactive forms)

## Important Limitations

- **Experimental Status:** API may change in future releases
- **No Multiple Select:** `<select multiple>` not supported
- **Date Handling:** Returns ISO strings, not Date objects
- **Migration Path:** No automatic migration from reactive forms

## Integration with This Project

Signal Forms align perfectly with our signal-first architecture:

```typescript
// Follows ESSENTIALS.md patterns
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // Required
  imports: [Field], // Standalone component
})
export class MyFormComponent {
  // Signal-based state management
  formModel = signal<MyData>({...});
  myForm = form(this.formModel, (schema) => {
    // Validation
  });

  // Computed signals
  isSubmitEnabled = computed(() => this.myForm().valid());

  // Effect for side effects
  constructor() {
    effect(() => {
      console.log('Form changed:', this.formModel());
    });
  }
}
```

---

**Last Updated:** November 2024
**Angular Version:** 21+
**Official Docs:** https://angular.dev/essentials/signal-forms
