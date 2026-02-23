# Loading States Troubleshooting

## Issue: Conflicting Loading Systems

### Problem
When adding custom loading states to components that already use the `lazyload` directive, you may encounter conflicts where loaders don't appear or behave incorrectly.

### Root Cause
The `lazyload` directive (`src/app/utils/directives/lazyload.directive.ts`) has its own built-in loader system that conflicts with custom loading states.

### The Lazyload Directive's Built-in Features
- Has `[showLoader]="true"` input for built-in spinner
- Uses IntersectionObserver to trigger loading when element enters viewport
- Manages its own loading lifecycle (lines 70-79 in directive)
- Has built-in fade-in animations and opacity management

### Solution Pattern

**Don't mix loading systems** - use the appropriate one for each media type:

```typescript
// ✅ CORRECT: For images/videos (no lazyload directive)
<img
  [src]="card.media.src"
  (loadstart)="setLoading(i, true)"
  (load)="setLoading(i, false)"
  (error)="setLoading(i, false)">

// Custom loader
@if (loadingStates()[i] && card.media.kind !== 'iframe') {
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="spinner"></div>
  </div>
}

// ✅ CORRECT: For iframes (with lazyload directive)
<iframe
  [lazyload]="card.media.src"
  [showLoader]="true">
```

```typescript
// ✅ CORRECT: Initialize loading states
ngOnInit() {
  const initialStates: {[key: number]: boolean} = {};
  this.config().cards.forEach((card, index) => {
    // Only show custom loader for non-iframe media
    initialStates[index] = card.media.kind !== 'iframe';
  });
  this.loadingStates.set(initialStates);
}
```

### What NOT to Do

```typescript
// ❌ WRONG: Mixing both systems
<iframe
  [lazyload]="card.media.src"
  [showLoader]="true"
  (load)="setLoading(i, false)">  <!-- Conflicts with directive -->

// ❌ WRONG: Custom loader on lazyload elements
@if (loadingStates()[i]) {  <!-- Will conflict with directive's loader -->
  <div class="custom-loader"></div>
}
```

### Key Takeaways
1. **Understand existing systems** before adding new features
2. **Use lazyload directive's built-in loader** for elements that need lazy loading
3. **Use custom loading states** for elements that load immediately
4. **Never try to override directive behavior** with conflicting event handlers
5. **Check if a component already has loading management** before implementing your own

### Related Files
- `src/app/utils/directives/lazyload.directive.ts` - The lazyload directive implementation
- `src/app/shared/scroll-showcase/scroll-showcase.ts` - Example of proper loading state management