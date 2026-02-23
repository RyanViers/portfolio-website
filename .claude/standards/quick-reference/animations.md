# Angular 20 Animations - Quick Reference

## 🎯 The New Way (Angular 20+)

### Setup (One Time)

**1. App Config**
```typescript
// app.config.ts
import { withViewTransitions } from '@angular/router';

provideRouter(routes, withViewTransitions())
// DO NOT use provideAnimations() - deprecated!
```

**2. Define Animations (styles.css)**
```css
@theme {
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
}

.fade-in {
  animation: fade-in 150ms ease-out;
}
```

### Usage in Templates

```html
<!-- Simple fade in -->
<div animate.enter="fade-in">Content</div>

<!-- Enter + Leave -->
<div
  animate.enter="slide-in-right"
  animate.leave="slide-out-left">
  Content
</div>

<!-- With @if -->
@if(show) {
  <div animate.enter="fade-in" animate.leave="fade-out">
    Conditional content
  </div>
}

<!-- With @for -->
@for(item of items; track item.id) {
  <div animate.enter="slide-in-right" animate.leave="slide-out-left">
    {{ item.name }}
  </div>
}
```

## 🚨 Critical Pattern: Container Overflow

**Always use `overflow-hidden` on parent containers!**

```html
<!-- ✅ CORRECT -->
<div class="relative overflow-hidden">
  @for(option of options; track option.id; let idx = $index) {
    @if(idx === currentIndex) {
      <div
        animate.enter="slide-in-right"
        animate.leave="slide-out-left"
        class="absolute inset-0">
        {{ option.content }}
      </div>
    }
  }
</div>

<!-- ❌ WRONG - animations will spill outside container -->
<div class="relative">
  <!-- animations not contained -->
</div>
```

## 📋 Available Animations

| Class | Use | Duration |
|-------|-----|----------|
| `fade-in` / `fade-out` | Simple opacity | 150ms / 100ms |
| `fade-in-up` | Carousel text grid | 600ms |
| `slide-in-right` / `slide-out-left` | Carousel, switching | 600ms |
| `slide-fade-in-right` / `slide-fade-out-right` | Toasts | 300ms / 200ms |
| `scale-in` / `scale-out` | Modals | 200ms / 150ms |
| `fade-scale-in` / `fade-scale-out` | Cards, panels | 500ms / 250ms |
| `opacity-scale-in` / `opacity-scale-out` | Dropdowns | 100ms / 75ms |
| `opacity-in` / `opacity-out-instant` | Mobile menu | 200ms / 150ms |
| `training-menu-in` / `training-menu-out` | Training mobile menu | 200ms |
| `holo-fade-in` / `holo-fade-out` | Testimonial swiper | 600ms / 400ms |

## 🎨 Hybrid Approach

**animate.enter/leave** → DOM insertion/removal
**Tailwind transitions** → Property changes

```html
<div animate.enter="fade-in" animate.leave="fade-out">
  <button class="transition-all duration-300 hover:scale-105">
    Button
  </button>
</div>
```

## 🔄 Synchronized Animations

For carousel or multi-section animations, **use same timing**:

```css
/* Both must match for smooth sync */
.slide-in-right {
  animation: slide-in-right 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-out-left {
  animation: slide-out-left 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 📝 Creating New Animations

**1. Add @keyframes in styles.css @theme block**
```css
@theme {
  @keyframes my-animation {
    from { /* start state */ }
    to { /* end state */ }
  }
}
```

**2. Create CSS class**
```css
.my-animation {
  animation: my-animation 300ms ease-out;
}
```

**3. Use in template**
```html
<div animate.enter="my-animation">Content</div>
```

## ⚡ Timing Guidelines

- **Fast** (100-200ms): Dropdowns, tooltips
- **Medium** (250-400ms): Toasts, modals
- **Smooth** (500-700ms): Carousels, page transitions
- **Slow** (800ms+): Hero animations, special effects

## 🎯 Easing Curves

```css
/* Smooth and natural (recommended for most) */
cubic-bezier(0.4, 0, 0.2, 1)

/* Bouncy (use sparingly) */
cubic-bezier(0.34, 1.56, 0.64, 1)

/* Linear (progress bars) */
linear

/* Ease out (good for enter) */
ease-out

/* Ease in (good for leave) */
ease-in
```

## 🚫 Old Way (Deprecated)

```typescript
// ❌ DON'T USE THIS ANYMORE
import { trigger, animate } from '@angular/animations';

@Component({
  animations: [trigger(...)]
})
```

## 🚨 Common Issues & Fixes

### Flash on animation enter
**Problem**: Element flashes or shows background before animating
**Cause**: Animation has delay before starting (e.g., `150ms 150ms`)
**Fix**: Remove delay, use immediate start (e.g., `200ms ease-out`)

### Animation spills outside container
**Problem**: Sliding elements visible outside parent bounds
**Cause**: Missing `overflow-hidden` on parent
**Fix**: Add `overflow-hidden` to parent container with `relative` positioning

### Mobile header not sticky
**Problem**: Header scrolls with page instead of staying at top
**Cause**: Using `relative` positioning instead of `fixed`
**Fix**: Use `fixed top-0 left-0 right-0 z-[9999]` on mobile nav

## ✅ Migration Checklist

- [x] Remove `provideAnimations()` from app.config.ts
- [x] Add `withViewTransitions()` to router config
- [x] Define @keyframes in @theme block
- [x] Create CSS classes for each animation
- [x] Replace animation triggers with animate.enter/leave
- [x] Add overflow-hidden to parent containers
- [x] Delete deprecated animations.ts file
- [x] Test all animations render correctly
- [x] Verify no animations spill outside containers
- [x] Fix mobile menu flash issue
- [x] Fix mobile header sticky positioning
