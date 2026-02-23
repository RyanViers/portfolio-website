# Tailwind CSS Standards

## Framework Version
- **Tailwind CSS v4** - Latest major version with significant architectural changes
- **Documentation**: [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- **Migration Guide**: [v3 to v4 Migration](https://tailwindcss.com/docs/v4-beta)

## Configuration Architecture

### 🚨 CRITICAL: CSS-Only Configuration (Tailwind 4)
- **NO `tailwind.config.js` files** - This is Tailwind 3 only!
- **NO `postcss.config.js` files** - Not needed in Tailwind 4
- **ALL configuration in CSS** - Everything goes in `src/styles.css`
- **Primary config file**: `src/styles.css` using `@theme` directive
- **CSS Custom Properties**: Native CSS variables for theming

### Key Changes from v3 to v4
- **JavaScript config files REMOVED** - No more `tailwind.config.js`
- **CSS-only configuration** - Everything in `@theme` blocks
- **Built-in CSS processing** - No PostCSS setup required
- **Better CSS custom properties integration**
- **Automatic content detection** - No manual content/purge configuration
- **Zero-config setup** - Works out of the box

### 🛑 Files That DON'T Exist in Tailwind 4
```bash
# ❌ These are Tailwind 3 files - DELETE if they exist
tailwind.config.js
tailwind.config.ts
postcss.config.js
```

## Custom Color System

### Theme Variable Definition
```css
@theme {
  /* Custom color variables defined in styles.css */
  --color-primary: #031440;
  --color-secondary: #DD4A48;
  --color-light: #f0f0ef;
  --color-dark: #252525;
  --color-medium: #92949c;
}
```

## Custom Animations

### Animation Definition
All custom animations must be defined in the `@theme` block in `src/styles.css`:

```css
@theme {
  /* Other theme variables... */

  /* Custom animations - both variable AND keyframes in @theme */
  --animate-wiggle: wiggle 1s ease-in-out infinite;
  --animate-gradient-x: gradient-x 15s ease infinite;
  --animate-wave: wave 30s linear infinite;

  @keyframes wiggle {
    0%, 100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }

  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes wave {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-66.66%); }
  }
}
```

### Gradient Animation Requirements
Gradient animations need special utility classes with `background-size`:

```css
/* ANIMATION UTILITIES - outside @theme block */
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 15s ease infinite;
}
```

### Animation Usage
```html
<!-- Simple animations use utility classes directly -->
<div class="animate-wiggle">Wiggling element</div>
<div class="animate-wave">Wave animation</div>

<!-- Gradient animations need background + utility class -->
<div class="bg-gradient-to-r from-primary via-secondary to-tertiary animate-gradient-x">
  Morphing gradient background
</div>
```

### 🚨 Critical Animation Rules
1. **Both `--animate-*` AND `@keyframes` must be inside `@theme` block**
2. **Gradient animations require `background-size > 100%`** (typically `200% 200%`)
3. **Utility classes go outside `@theme` block** (not in `.dark` class)
4. **Animation variables use format**: `--animate-name: keyframe-name duration easing infinite`

### Dark Mode Implementation
- **NO `dark:` prefixes** - We use custom CSS variables that automatically switch
- **Automatic theme switching** via CSS variables
- **Light mode**: `--color-light: #f0f0ef`
- **Dark mode**: `--color-light: #252525` (values flip automatically)

### Color Usage Patterns
```html
<!-- ✅ CORRECT: Use our custom color variables -->
<div class="bg-light text-dark">Content</div>
<input class="bg-light border-medium text-dark">

<!-- ❌ INCORRECT: Don't use Tailwind dark: prefixes -->
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
```

## Component Styling Standards

### Input Fields
- **Background**: `bg-light` (auto-switching theme color)
- **Text**: `text-dark` (auto-switching contrast)
- **Borders**: `ring-medium` or `border-medium`
- **Focus states**: `focus:bg-white focus:ring-primary`
- **Placeholders**: `placeholder:text-medium`

### Typography
- **Headings**: `text-dark` for primary text
- **Body text**: `text-dark` for main content, `text-medium` for secondary
- **Links**: `text-primary hover:text-primary-tint`
- **Errors**: `text-danger`

### Layout Classes
- **Containers**: Custom max-width variables defined in theme
- **Spacing**: Standard Tailwind spacing scale
- **Responsive**: Use standard Tailwind breakpoints

## Best Practices

### 1. CSS Variable Usage
- Always prefer our custom color variables over Tailwind defaults
- Use semantic color names (`primary`, `secondary`, `light`, `dark`)
- Avoid hardcoded color values in components

### 2. Responsive Design
```html
<!-- Mobile-first approach -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### 3. State Management
- Use our color system for all interactive states
- Consistent hover/focus patterns across components
- Smooth transitions with `transition-all duration-200`

### 4. Component Composition
```html
<!-- Compose utilities for reusable patterns -->
<button class="
  px-4 py-2
  bg-primary hover:bg-primary-tint
  text-white
  rounded-xl
  transition-all duration-200
  disabled:opacity-50
">
  Submit
</button>
```

## File Organization

### Theme Configuration
- **Main config**: `src/styles.css` - All theme variables and custom CSS
- **Component styles**: Inline Tailwind classes in templates
- **Global styles**: Additional CSS in `src/styles.css` after `@import "tailwindcss"`

### Custom CSS Classes
```css
/* Custom utilities in styles.css */
.clip-path-triangle-tl {
  clip-path: polygon(0 0, 110% 0, 0 55%);
}
```

## Common Patterns

### Card Components
```html
<div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
  <div class="p-6">
    Card content
  </div>
</div>
```

### Form Elements
```html
<input class="
  block w-full rounded-xl border-0
  px-4 py-3.5
  text-dark bg-light
  ring-1 ring-inset ring-medium
  placeholder:text-medium
  focus:ring-2 focus:ring-primary focus:bg-white
  transition-all duration-200
">
```

### Navigation Elements
```html
<nav class="bg-white border-b border-light">
  <a class="text-dark hover:text-primary transition-colors">
    Link
  </a>
</nav>
```

## Tools and Resources

### Development
- **VS Code Extensions**: Tailwind CSS IntelliSense
- **Browser DevTools**: CSS Grid/Flexbox debugger
- **Documentation**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### Debugging
- Use browser devtools to inspect CSS custom properties
- Check `styles.css` for theme variable definitions
- Verify color values in both light and dark modes

## Migration Notes

### From Tailwind v3
- Remove `tailwind.config.js` if migrating
- Move theme configuration to CSS `@theme` blocks
- Replace `dark:` prefixes with our custom color system
- Update build process to use CSS-based configuration

### Color System Migration
- Replace `bg-gray-100 dark:bg-gray-800` with `bg-light`
- Replace `text-black dark:text-white` with `text-dark`
- Replace `text-gray-500 dark:text-gray-400` with `text-medium`