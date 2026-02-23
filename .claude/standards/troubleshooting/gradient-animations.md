# Gradient Animations in Tailwind v4

## Problem

Gradient background animations using `animate-gradient-x` class were not working after Tailwind v4 migration. The colors appeared static instead of morphing smoothly.

## Root Cause

In Tailwind v4, custom animations must be defined properly in the `@theme` block with both the animation variable and keyframes. Additionally, gradient position animations require `background-size` larger than 100% to be visible.

## Solution

### 1. Define Animation in @theme Block

```css
@theme {
  /* Other theme variables... */

  /* Animations */
  --animate-gradient-x: gradient-x 15s ease infinite;
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
}
```

### 2. Create Utility Class with Background Size

```css
/* ANIMATION UTILITIES */
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 15s ease infinite;
}
```

### 3. Usage in Components

```html
<div class="bg-gradient-to-r from-primary-tint via-secondary to-tertiary animate-gradient-x">
  <!-- Animated gradient background -->
</div>
```

## Key Points

1. **Keyframes in @theme**: Both `--animate-*` variables and `@keyframes` must be inside the `@theme` block in Tailwind v4
2. **Background Size**: Gradient position animations require `background-size: 200% 200%` (or larger) to be visible
3. **Animation Property**: The utility class needs both `background-size` and `animation` properties

## 🚨 CRITICAL LIMITATION: Tailwind v4 Animation Variables

**Why `--animate-gradient-x` doesn't work but `--animate-wave` does:**

- ✅ **Simple animations** (like `--animate-wave`) work perfectly with just `--animate-*` in `@theme` because they only need the `animation` property
- ❌ **Complex animations** (like `--animate-gradient-x`) don't work with just `--animate-*` because they need MULTIPLE properties (`animation` + `background-size`)

**The Limitation:**
- Tailwind's `--animate-*` variables only support the `animation` CSS property
- They cannot define additional properties like `background-size`, `transform-origin`, etc.

**Solutions for Multi-Property Animations:**

1. **Hybrid Approach** (recommended):
   ```css
   @theme {
     --animate-gradient-x: gradient-x 15s ease infinite;  // Animation only
     @keyframes gradient-x { /* keyframes */ }
   }

   .animate-gradient-x {
     background-size: 200% 200%;  // Additional property
   }
   ```

2. **@utility Approach** (alternative):
   ```css
   @theme {
     @keyframes gradient-x { /* keyframes */ }
   }

   @utility animate-gradient-x {
     background-size: 200% 200%;
     animation: gradient-x 15s ease infinite;
   }
   ```

**Rule of Thumb:**
- Single property animations → Use `--animate-*` in `@theme`
- Multi-property animations → Use hybrid approach or `@utility`

## Technical Details

- **Background Position**: Animates from `0% 50%` to `100% 50%` and back
- **Duration**: 15s for smooth, subtle movement
- **Easing**: `ease` for natural acceleration/deceleration
- **Background Size**: 200% allows the gradient to shift visibly during animation

## Testing

The animation should create a smooth morphing effect where colors flow from left to right across the element. If the gradient appears static, check:

1. Animation is defined in `@theme` block
2. Utility class includes `background-size: 200% 200%`
3. Element has a gradient background applied
4. Browser supports CSS animations

## Related Files

- `src/styles.css` - Contains the animation definition
- `src/app/pages/home/components/gradient-hero.component.ts` - Uses the animation
- `src/app/pages/pricing/pricing.component.ts` - Also uses gradient animations