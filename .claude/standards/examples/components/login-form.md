# Login Form Component Example

Complete example of a login form component following our standards.

## File Location
```
src/app/pages/sign-in/components/login/login.component.ts
```

## Component Code

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WebPage } from 'src/app/utils/models/navigation';
import { AuthService } from 'src/app/utils/services/auth.service';
import { BreakpointService } from 'src/app/utils/services/breakpoint.service';
import { NavigationService } from 'src/app/utils/services/navigation.service';
import { SignInService } from '../../services/sign-in.service';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-login',
  host: { class: 'block relative w-full' },
  template: `
    <div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">

        <!-- Header -->
        <div class="text-center">
          <h2 class="text-3xl font-bold tracking-tight text-dark mb-2">Welcome</h2>
          <p class="text-sm text-medium">Sign in to your HeadCount account</p>
        </div>

        <!-- Login Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div class="px-8 py-10">
            <form class="space-y-6" [formGroup]="formGroup" (ngSubmit)="signIn()">

              <!-- Email Field -->
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-dark">
                  Email address
                </label>
                <div class="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    formControlName="email"
                    placeholder="Enter your email"
                    [class]="getInputClasses('email')"
                    class="block w-full rounded-xl border-0 px-4 py-3.5
                           text-dark bg-light ring-1 ring-inset ring-medium
                           placeholder:text-medium focus:ring-2 focus:ring-inset focus:bg-white
                           transition-all duration-200">

                  <!-- Validation Icon -->
                  @if (formGroup.get('email')?.touched) {
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      @if (formGroup.get('email')?.valid) {
                        <svg class="h-5 w-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      } @else {
                        <svg class="h-5 w-5 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      }
                    </div>
                  }
                </div>

                <!-- Error Message -->
                @if (formGroup.get('email')?.touched && formGroup.get('email')?.errors) {
                  <p class="text-sm text-danger mt-1 animate-in slide-in-from-top-1 duration-200">
                    @if (formGroup.get('email')?.errors?.['required']) {
                      Email is required
                    }
                    @if (formGroup.get('email')?.errors?.['email']) {
                      Please enter a valid email
                    }
                  </p>
                }
              </div>

              <!-- Password Field -->
              <div class="space-y-2">
                <label for="password" class="block text-sm font-medium text-dark">
                  Password
                </label>
                <div class="relative">
                  <input
                    id="password"
                    name="password"
                    [type]="showPassword ? 'text' : 'password'"
                    formControlName="password"
                    autocomplete="current-password"
                    placeholder="Enter your password"
                    [class]="getInputClasses('password')"
                    class="block w-full rounded-xl border-0 px-4 py-3.5 pr-12
                           text-dark bg-light ring-1 ring-inset ring-medium
                           placeholder:text-medium focus:ring-2 focus:ring-inset focus:bg-white
                           transition-all duration-200">

                  <!-- Password Toggle -->
                  <button
                    type="button"
                    (click)="togglePasswordVisibility()"
                    class="absolute inset-y-0 right-0 flex items-center pr-3
                           text-medium hover:text-dark focus:outline-none
                           transition-colors duration-200">
                    @if (showPassword) {
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                      </svg>
                    } @else {
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    }
                  </button>
                </div>

                <!-- Password Error -->
                @if (formGroup.get('password')?.touched && formGroup.get('password')?.errors) {
                  <p class="text-sm text-danger mt-1 animate-in slide-in-from-top-1 duration-200">
                    @if (formGroup.get('password')?.errors?.['required']) {
                      Password is required
                    }
                  </p>
                }
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button
                  type="submit"
                  [disabled]="!formGroup.valid || signInFormProcessing"
                  class="group relative w-full flex justify-center py-3.5 px-4
                         border border-transparent text-sm font-semibold rounded-xl
                         text-dark bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                         shadow-lg hover:shadow-xl">

                  @if (signInFormProcessing) {
                    <div class="flex items-center space-x-2">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-dark">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span class="text-dark">Signing in...</span>
                    </div>
                  } @else {
                    <span class="text-dark">Sign in</span>
                    <svg class="ml-2 h-4 w-4 text-dark transition-transform duration-200 group-hover:translate-x-0.5"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Footer -->
        <div class="text-center">
          <p class="text-xs text-medium">
            By signing in, you agree to our
            <a href="/terms" class="text-primary hover:text-primary-tint transition-colors duration-200">Terms of Service</a>
            and
            <a href="/privacy" class="text-primary hover:text-primary-tint transition-colors duration-200">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  // Services
  private auth = inject(AuthService);
  private builder = inject(FormBuilder);
  private nav = inject(NavigationService);
  private breakpoint = inject(BreakpointService);
  protected signInService = inject(SignInService);

  formGroup: FormGroup;
  showPassword: boolean = false;

  // Use the service's loading state
  get signInFormProcessing(): boolean {
    return this.signInService.$isLoading();
  }

  ngOnInit() {
    this.formGroup = this.builder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  /**
   * Get input CSS classes based on validation state
   */
  getInputClasses(fieldName: string): string {
    const field = this.formGroup.get(fieldName);
    if (!field?.touched) {
      return 'focus:ring-primary';
    }
    return field.valid
      ? 'focus:ring-success ring-success'
      : 'focus:ring-danger ring-danger';
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle sign in form submission
   */
  async signIn(): Promise<void> {
    if (!this.signInFormProcessing && this.formGroup.valid) {
      this.signInService.startLogin();

      try {
        const success = await this.handleSignIn(
          this.formGroup.get('email')?.value,
          this.formGroup.get('password')?.value
        );

        if (success) {
          const toastId = this.signInService.success("Welcome!", "You have been successfully signed in");
          this.signInService.trackToast(toastId);

          // Navigate after successful login
          setTimeout(() => {
            if (this.auth.getRouteAfterLogin()?.page) {
              this.nav.routeToPage(this.auth.getRouteAfterLogin().page, this.auth.getRouteAfterLogin().params);
            } else {
              this.nav.routeToPage(WebPage.HOME);
            }
          }, 1000);
        }
      } catch (error) {
        console.debug('Sign in error:', error);
        const toastId = this.signInService.error("Sign In Failed", "An unexpected error occurred. Please try again.");
        this.signInService.trackToast(toastId);
      }

      this.auth.setRouteAfterLogin(null, null);
    }
  }

  /**
   * Handle the sign in process
   */
  private async handleSignIn(username: string, password: string): Promise<boolean> {
    try {
      const success = await this.auth.signIn(username, password);

      if (!success) {
        const toastId = this.signInService.error("Authentication Failed", "Invalid email or password. Please check your credentials and try again.");
        this.signInService.trackToast(toastId);
        return false;
      }

      return true;
    } catch (error) {
      const toastId = this.signInService.error("Connection Error", "Unable to connect to authentication service. Please check your internet connection and try again.");
      this.signInService.trackToast(toastId);
      return false;
    }
  }
}
```

## Key Patterns Demonstrated

### 🎯 Our Standards Used
- **Color System**: `bg-light`, `text-dark`, `text-medium`, `ring-medium`
- **Signals**: `$isLoading()` from service
- **Service Injection**: `inject()` pattern
- **Form Validation**: Reactive forms with dynamic classes
- **Control Flow**: Angular 17+ `@if`, `@else` syntax
- **Toast Integration**: Service-based notifications

### 🏗️ Component Architecture
- **Standalone Component**: No module dependencies
- **Service Providers**: Feature-scoped `SignInService`
- **Host Classes**: Layout styling on component host
- **Reactive Forms**: FormBuilder with validation

### 🎨 Styling Patterns
- **Input States**: Dynamic classes based on validation
- **Loading States**: Button disabled with spinner
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first approach

### 🔧 Service Integration
- **State Management**: Centralized in `SignInService`
- **Toast Tracking**: Loading state tied to toast lifecycle
- **Navigation**: Route handling after authentication
- **Error Handling**: Comprehensive error states