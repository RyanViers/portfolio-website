# Styling Issues Troubleshooting

## Colors Not Working

### Problem: Colors appear wrong in dark/light mode
```html
<!-- ❌ Wrong: Using Tailwind dark mode -->
<div class="bg-white dark:bg-gray-800">

<!-- ✅ Fix: Use our color variables -->
<div class="bg-light">
```

**Why**: Our system uses CSS variables that auto-switch, not Tailwind's dark mode.

### Problem: Input fields too dark in light mode
```html
<!-- ❌ Wrong: Using gray backgrounds -->
<input class="bg-gray-50 dark:bg-gray-800">

<!-- ✅ Fix: Use our light variable -->
<input class="bg-light focus:bg-white">
```

**Debug**: Check `src/styles.css` - `--color-light` should be `#f0f0ef` in light mode.

### Problem: Text invisible on backgrounds
```html
<!-- ❌ Wrong: Fixed colors -->
<div class="bg-white text-black">

<!-- ✅ Fix: Use contrasting variables -->
<div class="bg-light text-dark">
```

## CSS Variables Not Loading

### Problem: Custom colors not defined
**Symptoms**: Browser shows `var(--color-light)` in computed styles

**Fix**: Ensure `src/styles.css` is properly imported:
```css
@import "tailwindcss";

@theme {
  --color-light: #f0f0ef;
  /* ... other variables */
}
```

### Problem: Dark mode not switching
**Check**: Verify `.dark` class is applied to body/html:
```typescript
// In theme service
document.body.classList.toggle('dark', isDarkMode);
```

## Tailwind Classes Not Working

### Problem: Custom color classes not recognized
**Symptoms**: `text-dark` has no styles applied

**Fix**: Verify color mapping in `@theme` block:
```css
@theme {
  --color-dark: #252525;  /* Must be defined here */
}
```

### Problem: Ring colors not working
```html
<!-- ❌ Might not work -->
<input class="ring-2 ring-dark">

<!-- ✅ Better -->
<input class="ring-2 ring-primary">
```

**Check**: Ensure ring colors are defined in theme variables.

## Build/Compilation Issues

### Problem: CSS not generating properly
**Error**: `Unknown color 'light'`

**Fix**: Check Tailwind 4 configuration in `styles.css`:
```css
/* Make sure this is at the top */
@import "tailwindcss";

@theme {
  /* Color definitions here */
}
```

**🚨 COMMON MISTAKE**: Don't create `tailwind.config.js` - Tailwind 4 uses CSS-only configuration!

### Problem: "Can't find tailwind.config.js"
**Error**: Build looking for JavaScript config file

**Fix**: Delete any `tailwind.config.js` or `tailwind.config.ts` files. Tailwind 4 doesn't use them!

```bash
# Remove these files if they exist
rm tailwind.config.js
rm tailwind.config.ts
rm postcss.config.js
```

### Problem: Styles work in dev but not production
**Check**:
1. All configuration is in `src/styles.css` using `@theme`
2. No JavaScript config files exist
3. Make sure all used classes are in templates (not just TypeScript)

## Angular Integration Issues

### Problem: Dynamic classes not applying
```typescript
// ❌ Might not work if classes aren't in template
getClasses(): string {
  return 'bg-primary text-white';
}
```

**Fix**: Ensure classes exist somewhere in template for Tailwind to detect:
```html
<!-- Hidden safelist for dynamic classes -->
<div class="hidden bg-primary bg-secondary text-white text-dark"></div>
```

### Problem: Host class binding not working
```typescript
@Component({
  host: {
    '[class]': 'dynamicClasses'  // Make sure this is a getter
  }
})
```

## Common Misconfigurations

### Wrong CSS Import Order
```css
/* ❌ Wrong order */
@theme { /* custom vars */ }
@import "tailwindcss";

/* ✅ Correct order */
@import "tailwindcss";
@theme { /* custom vars */ }
```

### Missing Color Definitions
```css
@theme {
  /* ❌ Incomplete - missing contrast/tint/shade */
  --color-primary: #031440;

  /* ✅ Complete definition */
  --color-primary: #031440;
  --color-primary-tint: #041f64;
  --color-primary-shade: #020f32;
}
```

## Debug Techniques

### 1. Browser DevTools
```css
/* Check computed styles for: */
background-color: var(--color-light);  /* Should resolve to actual hex */
```

### 2. CSS Variable Inspection
```javascript
// In console
getComputedStyle(document.documentElement).getPropertyValue('--color-light');
```

### 3. Theme Toggle Test
```typescript
// Verify theme switching
document.body.classList.add('dark');
// Check if colors change
document.body.classList.remove('dark');
```

### 4. Tailwind CSS IntelliSense
- Install VS Code extension
- Check if custom colors show up in autocomplete
- If not, theme variables might not be properly defined