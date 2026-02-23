# Service Architecture Patterns

## Feature Service Pattern

### Basic Feature Service Template
```typescript
import { Injectable, signal, computed } from '@angular/core';

@Injectable()
export class FeatureService {
  // State signals
  $isLoading = signal<boolean>(false);
  $data = signal<any[]>([]);
  $error = signal<string | null>(null);
  $selectedId = signal<string | null>(null);

  // Computed state
  $hasData = computed(() => this.$data().length > 0);
  $selectedItem = computed(() => {
    const id = this.$selectedId();
    return id ? this.$data().find(item => item.id === id) : null;
  });

  // Configuration
  readonly config = {
    // Service configuration options
  };

  // Lifecycle methods
  init(): void {
    // Initialization logic
  }

  destroy(): void {
    // Cleanup logic
    this.$isLoading.set(false);
    this.$data.set([]);
    this.$error.set(null);
    this.$selectedId.set(null);
  }

  // Public methods
  async loadData(): Promise<void> {
    this.$isLoading.set(true);
    this.$error.set(null);

    try {
      // Load data logic
      const data = await this.fetchData();
      this.$data.set(data);
    } catch (error) {
      this.$error.set('Failed to load data');
    } finally {
      this.$isLoading.set(false);
    }
  }

  // Private methods
  private async fetchData(): Promise<any[]> {
    // Implementation
    return [];
  }
}
```

## State Management Patterns

### Loading State Management
```typescript
export class LoadingStateService {
  $isLoading = signal<boolean>(false);
  $loadingMessage = signal<string>('Loading...');

  startLoading(message?: string): void {
    this.$isLoading.set(true);
    if (message) {
      this.$loadingMessage.set(message);
    }
  }

  stopLoading(): void {
    this.$isLoading.set(false);
    this.$loadingMessage.set('Loading...');
  }

  async withLoading<T>(
    operation: () => Promise<T>,
    message?: string
  ): Promise<T> {
    this.startLoading(message);
    try {
      return await operation();
    } finally {
      this.stopLoading();
    }
  }
}
```

### Error State Management
```typescript
export class ErrorStateService {
  $error = signal<string | null>(null);
  $hasError = computed(() => this.$error() !== null);

  setError(error: string | Error): void {
    const message = error instanceof Error ? error.message : error;
    this.$error.set(message);
  }

  clearError(): void {
    this.$error.set(null);
  }

  handleError(error: unknown, defaultMessage = 'An error occurred'): void {
    console.error('Service error:', error);
    const message = error instanceof Error ? error.message : defaultMessage;
    this.setError(message);
  }
}
```

## Modal/Toast Service Pattern

### Modal Service
```typescript
export class ModalService {
  // Modal state
  $showModal = signal<boolean>(false);
  $modalTitle = signal<string>('');
  $modalMessage = signal<string>('');
  $modalType = signal<'info' | 'warning' | 'danger'>('info');

  // Confirmation state
  $showConfirmation = signal<boolean>(false);
  $confirmationResolver?: (result: boolean) => void;

  showModal(title: string, message: string, type: 'info' | 'warning' | 'danger' = 'info'): void {
    this.$modalTitle.set(title);
    this.$modalMessage.set(message);
    this.$modalType.set(type);
    this.$showModal.set(true);
  }

  hideModal(): void {
    this.$showModal.set(false);
  }

  async showConfirmation(title: string, message: string): Promise<boolean> {
    this.$modalTitle.set(title);
    this.$modalMessage.set(message);
    this.$showConfirmation.set(true);

    return new Promise<boolean>((resolve) => {
      this.$confirmationResolver = resolve;
    });
  }

  onConfirmationResult(result: boolean): void {
    this.$showConfirmation.set(false);
    if (this.$confirmationResolver) {
      this.$confirmationResolver(result);
      this.$confirmationResolver = undefined;
    }
  }
}
```

### Toast Service
```typescript
export class ToastService {
  $toasts = signal<Toast[]>([]);

  success(title: string, message?: string): string {
    return this.addToast({ type: 'success', title, message });
  }

  error(title: string, message?: string): string {
    return this.addToast({ type: 'error', title, message });
  }

  warning(title: string, message?: string): string {
    return this.addToast({ type: 'warning', title, message });
  }

  info(title: string, message?: string): string {
    return this.addToast({ type: 'info', title, message });
  }

  private addToast(toast: Omit<Toast, 'id'>): string {
    const id = this.generateId();
    const newToast: Toast = { ...toast, id, duration: 5000 };

    this.$toasts.update(toasts => [...toasts, newToast]);

    // Auto-remove
    setTimeout(() => this.removeToast(id), newToast.duration);

    return id;
  }

  removeToast(id: string): void {
    this.$toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration: number;
}
```

## HTTP Service Patterns

### API Service Base Class
```typescript
export abstract class BaseApiService {
  protected http = inject(HttpClient);

  protected async get<T>(url: string): Promise<T> {
    try {
      return await lastValueFrom(this.http.get<T>(url));
    } catch (error) {
      this.handleHttpError(error);
      throw error;
    }
  }

  protected async post<T>(url: string, body: any): Promise<T> {
    try {
      return await lastValueFrom(this.http.post<T>(url, body));
    } catch (error) {
      this.handleHttpError(error);
      throw error;
    }
  }

  protected async put<T>(url: string, body: any): Promise<T> {
    try {
      return await lastValueFrom(this.http.put<T>(url, body));
    } catch (error) {
      this.handleHttpError(error);
      throw error;
    }
  }

  protected async delete<T>(url: string): Promise<T> {
    try {
      return await lastValueFrom(this.http.delete<T>(url));
    } catch (error) {
      this.handleHttpError(error);
      throw error;
    }
  }

  private handleHttpError(error: any): void {
    console.error('HTTP Error:', error);
    // Additional error handling logic
  }
}
```

### Feature API Service
```typescript
export class FeatureApiService extends BaseApiService {
  private readonly baseUrl = '/api/feature';

  async getItems(): Promise<Item[]> {
    return this.get<Item[]>(`${this.baseUrl}/items`);
  }

  async getItem(id: string): Promise<Item> {
    return this.get<Item>(`${this.baseUrl}/items/${id}`);
  }

  async createItem(item: CreateItemRequest): Promise<Item> {
    return this.post<Item>(`${this.baseUrl}/items`, item);
  }

  async updateItem(id: string, item: UpdateItemRequest): Promise<Item> {
    return this.put<Item>(`${this.baseUrl}/items/${id}`, item);
  }

  async deleteItem(id: string): Promise<void> {
    return this.delete<void>(`${this.baseUrl}/items/${id}`);
  }
}
```

## Configuration Service Pattern

### App Configuration Service
```typescript
@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config = signal<AppConfig | null>(null);

  $config = this.config.asReadonly();
  $isLoaded = computed(() => this.config() !== null);

  async loadConfig(): Promise<void> {
    try {
      const config = await this.fetchConfig();
      this.config.set(config);
    } catch (error) {
      console.error('Failed to load config:', error);
      throw error;
    }
  }

  private async fetchConfig(): Promise<AppConfig> {
    // Load from API or environment
    return {
      apiUrl: environment.apiUrl,
      features: {
        enableFeatureX: true,
        enableFeatureY: false
      }
    };
  }

  getFeatureFlag(feature: string): boolean {
    const config = this.config();
    return config?.features?.[feature] ?? false;
  }
}
```

## Authentication Service Pattern

### Auth Service
```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal<boolean>(false);

  $currentUser = this.currentUser.asReadonly();
  $isAuthenticated = this.isAuthenticated.asReadonly();
  $isAdmin = computed(() => this.currentUser()?.role === 'admin');

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.authenticate(email, password);
      this.setUser(user);
      return true;
    } catch (error) {
      console.error('Sign in failed:', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.logout();
    } finally {
      this.clearUser();
    }
  }

  private setUser(user: User): void {
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
  }

  private clearUser(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  private async authenticate(email: string, password: string): Promise<User> {
    // Authentication logic
    throw new Error('Not implemented');
  }

  private async logout(): Promise<void> {
    // Logout logic
  }
}
```

## Service Provider Patterns

### Feature-Scoped Service
```typescript
// Provided at component level
@Component({
  providers: [FeatureService], // New instance per component
  // ...
})
export class FeatureComponent {
  private featureService = inject(FeatureService);
}
```

### Application-Wide Service
```typescript
// Provided at root level
@Injectable({ providedIn: 'root' })
export class GlobalService {
  // Singleton across entire app
}
```

### Lazy-Loaded Service
```typescript
// Provided at route level
const routes: Routes = [
  {
    path: 'feature',
    loadComponent: () => import('./feature.component'),
    providers: [FeatureService] // New instance per route
  }
];
```

## Service Communication Patterns

### Service-to-Service Communication
```typescript
export class FeatureService {
  private authService = inject(AuthService);
  private configService = inject(ConfigService);

  async loadUserData(): Promise<void> {
    const user = this.authService.$currentUser();
    const config = this.configService.$config();

    if (user && config) {
      // Load user-specific data
    }
  }
}
```

### Event-Based Communication
```typescript
export class EventService {
  private eventSubject = new Subject<AppEvent>();

  $events = this.eventSubject.asObservable();

  emit(event: AppEvent): void {
    this.eventSubject.next(event);
  }
}

// Usage in services
export class FeatureService {
  private eventService = inject(EventService);

  performAction(): void {
    // Do something
    this.eventService.emit({
      type: 'FEATURE_ACTION_COMPLETED',
      payload: { /* data */ }
    });
  }
}
```