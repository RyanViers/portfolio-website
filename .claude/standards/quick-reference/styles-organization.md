# styles.css Organization - Quick Reference

## 📂 File Structure

The `styles.css` file follows a strict organization pattern for maintainability:

```css
@import statements
↓
@theme { design tokens }
↓
Tailwind utilities
↓
Dark mode (FIRST after utilities)
↓
Animation classes
↓
Utility classes
↓
Global element styles
↓
Media queries
```

## 🎨 @theme Block Rules

**What goes in @theme:**
- ✅ CSS custom properties (--color-*, --font-*, etc.)
- ✅ @keyframes definitions
- ✅ Design tokens
- ❌ NOT CSS classes (they must be outside)

**Why classes stay outside:**
- Angular's `animate.enter` needs actual CSS selectors
- `.fade-in` must be a real class, not inside @theme
- @theme is for tokens, not selectors

## 🌙 Dark Mode Organization

**Location**: Immediately after Tailwind utilities, before animation classes

**Structure**:
```css
.dark {
  /* Neutral Colors (inverted) - FIRST */
  --color-light: #252525;
  --color-dark: #f0f0ef;

  /* Brand Colors (same as light mode) */
  --color-primary: #041f64;

  /* UI Colors (same as light mode) */
  --color-success: #2dd36f;

  /* Layout tokens */
  --box-shadow-default: rgb(0 0 0 / 40%) 0px 7px 29px 0px;
}
```

**Rules**:
- ALL colors in @theme must have dark mode versions
- Neutral colors (light/medium/dark) are inverted
- Brand and UI colors stay consistent for branding
- Primary tint slightly brighter for better dark mode contrast

## 🎬 Animation Organization

**@keyframes (inside @theme)** - Grouped by type:
1. Background animations (gradient-x, wave)
2. Fade animations
3. Scale animations
4. Fade + Scale combined
5. Opacity + Scale
6. Simple opacity
7. Slide horizontal
8. Slide vertical
9. Slide + Fade combined
10. Component-specific

**CSS Classes (outside @theme)** - Mirror @keyframes order:
1. Fade animations
2. Scale animations
3. Fade + Scale
4. Slide horizontal
5. Slide vertical
6. Slide + Fade
7. Opacity + Scale
8. Simple opacity
9. Component-specific

## 📋 Section Headers

Use clear visual separators:

```css
/* ============================================
   SECTION NAME
   Optional description
   ============================================ */
```

**Main sections**:
1. Theme Configuration
2. Tailwind Utilities
3. Dark Mode
4. Angular 20 Animation Classes
5. Utility Classes
6. Global Element Styles
7. Media Queries

## ✅ Best Practices

1. **Group related styles** - All fade animations together, all slide animations together
2. **Consistent naming** - `fade-in` @keyframes → `.fade-in` class
3. **Comments** - Add context for non-obvious styles
4. **Dark mode completeness** - Every color needs dark mode version
5. **Order matters** - Dark mode FIRST after utilities for visibility
6. **No duplication** - If @keyframes exists in @theme, don't redefine it outside

## 🚫 Don't Do This

```css
/* ❌ BAD - @keyframes defined twice */
@theme {
  @keyframes fade-in { ... }
}

@keyframes fade-in { ... } /* Duplicate! */
```

```css
/* ❌ BAD - Missing dark mode colors */
@theme {
  --color-primary: #031440;
  --color-success: #2dd36f;
}

.dark {
  --color-primary: #041f64;
  /* Missing --color-success! */
}
```

```css
/* ❌ BAD - CSS class inside @theme */
@theme {
  .fade-in {
    animation: fade-in 150ms;
  }
}
```

## ✅ Do This Instead

```css
/* ✅ GOOD - @keyframes in @theme, class outside */
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

```css
/* ✅ GOOD - Complete dark mode */
@theme {
  --color-primary: #031440;
  --color-success: #2dd36f;
}

.dark {
  --color-primary: #041f64;
  --color-success: #2dd36f; /* Same for branding */
}
```

## 📝 Quick Checklist

When editing styles.css:

- [ ] New @keyframes go in @theme block
- [ ] New CSS classes go outside @theme
- [ ] New colors get dark mode versions
- [ ] Animations grouped by type
- [ ] Clear section headers used
- [ ] No duplicate definitions
- [ ] Dark mode is first after utilities
