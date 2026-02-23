# Template Performance Patterns

## 🚨 CRITICAL: Template Function Binding Anti-Pattern

**This is one of the most common and dangerous performance issues in Angular applications.**

### ❌ THE ANTI-PATTERN: Template-Bound Functions

```typescript
@Component({
  template: `
    @for (item of items(); track item.id) {
      <div
        [class.selected]="isSelected(item)"
        [style.background]="getBackground(item)">
        {{ formatName(item) }}
      </div>
    }
  `
})
export class BadComponent {
  items = signal<Item[]>([]);

  // ❌ PROBLEM: Called on EVERY change detection
  isSelected(item: Item): boolean {
    return this.selectedItem()?.id === item.id;
  }

  // ❌ PROBLEM: Called on EVERY change detection
  getBackground(item: Item): string {
    return item.isActive ? 'blue' : 'gray';
  }

  // ❌ PROBLEM: Called on EVERY change detection
  formatName(item: Item): string {
    return `${item.firstName} ${item.lastName}`;
  }
}
```

**Why This Is Catastrophic:**

With 100 items in the list:
- **Every change detection cycle** runs `isSelected()` 100 times
- **Every change detection cycle** runs `getBackground()` 100 times
- **Every change detection cycle** runs `formatName()` 100 times
- **Total:** 300 function calls per change detection!

In a zoneless application or with frequent updates, this creates:
- Visible lag and jank
- Poor user experience
- Battery drain on mobile devices
- Scalability problems as data grows

### ✅ THE SOLUTION: Computed Signals

```typescript
@Component({
  template: `
    @for (item of enrichedItems(); track item.id) {
      <div
        [class.selected]="item.isSelected()"
        [style.background]="item.background()">
        {{ item.displayName() }}
      </div>
    }
  `
})
export class GoodComponent {
  items = signal<Item[]>([]);
  selectedItem = signal<Item | null>(null);

  // ✅ SOLUTION: Enrich data with computed signals
  enrichedItems = computed(() => {
    const items = this.items();
    const selected = this.selectedItem();

    return items.map(item => ({
      ...item,
      // Each computed only recalculates when dependencies change
      isSelected: computed(() => selected?.id === item.id),
      background: computed(() => item.isActive ? 'blue' : 'gray'),
      displayName: computed(() => `${item.firstName} ${item.lastName}`)
    }));
  });
}
```

**Why This Works:**

With 100 items:
- Computed signals are **memoized** - they only recalculate when dependencies change
- If `selectedItem` changes: only `isSelected()` computeds recalculate (100 calls, once)
- If nothing changes: **zero** function calls during change detection
- **Massive** performance improvement

## Real-World Example: Form Grid Selector

### ❌ Before (Anti-Pattern)

```typescript
@Component({
  template: `
    @for (form of filteredForms(); track form.id) {
      <div
        [class.ring-2]="isSelected(form)"
        [class.shadow-xl]="isSelected(form)"
        [lazyload]="{url: getFormUrl(form)}">
        {{ form.name }}
      </div>
    }
  `
})
export class FormGridSelectorComponent {
  forms = input<Form[]>([]);
  selectedForm = input<Form>(null);

  filteredForms = computed(() => {
    const forms = this.forms() || [];
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return forms;
    return forms.filter(f => f?.name?.toLowerCase().includes(term));
  });

  // ❌ Called multiple times per form per change detection
  isSelected(form: Form): boolean {
    const selected = this.selectedForm();
    if (!selected || !form) return false;
    return selected.id === form.id && selected.last_edit === form.last_edit;
  }

  // ❌ Called once per form per change detection
  getFormUrl(form: Form): string {
    const organization = form?.organization_name || '';
    const templateId = form?.id || '';
    const versionId = form?.last_edit;
    return this.image.getImage(`${organization}/${templateId}/${versionId}/thumbnail.jpeg`);
  }
}
```

**Problem Scale:**
- 50 forms displayed
- `isSelected()` called **150 times** per change detection (3 bindings × 50 forms)
- `getFormUrl()` called **50 times** per change detection
- **200 function calls** on every change detection!

### ✅ After (Computed Pattern)

```typescript
@Component({
  template: `
    @for (form of filteredForms(); track form.id) {
      <div
        [class.ring-2]="form.isSelected()"
        [class.shadow-xl]="form.isSelected()"
        [lazyload]="{url: form.formUrl()}">
        {{ form.name }}
      </div>
    }
  `
})
export class FormGridSelectorComponent {
  forms = input<Form[]>([]);
  selectedForm = input<Form>(null);

  // ✅ Enrich forms with computed properties once
  filteredForms = computed(() => {
    const forms = (this.forms() || []).map(form => ({
      ...form,
      // These computeds only recalculate when their dependencies change
      isSelected: computed(() => this.isSelected(form)),
      formUrl: computed(() => this.getFormUrl(form))
    }));

    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return forms;
    return forms.filter(f => f?.name?.toLowerCase().includes(term));
  });

  // ✅ Now private - only called by computed signals
  private isSelected(form: Form): boolean {
    const selected = this.selectedForm();
    if (!selected || !form) return false;
    return selected.id === form.id && selected.last_edit === form.last_edit;
  }

  // ✅ Now private - only called by computed signals
  private getFormUrl(form: Form): string {
    const organization = form?.organization_name || '';
    const templateId = form?.id || '';
    const versionId = form?.last_edit;
    return this.image.getImage(`${organization}/${templateId}/${versionId}/thumbnail.jpeg`);
  }
}
```

**Performance Gain:**
- 50 forms displayed
- When `selectedForm` changes: `isSelected()` computeds recalculate (50 calls, once)
- When nothing changes: **0 function calls** during change detection
- **10-100x performance improvement** depending on change frequency

## Pattern Checklist

### When You See This:
```html
<div [class.active]="isActive(item)">
<img [src]="getImageUrl(item)">
{{ formatData(item) }}
```

### Ask Yourself:
1. ❓ Is this function called with data from a loop?
2. ❓ Is this function doing any computation or comparison?
3. ❓ Could this function be called multiple times per item?

**If YES to any: Use computed signals instead!**

### Refactoring Steps:

1. **Create enriched data computed:**
   ```typescript
   enrichedData = computed(() => {
     return this.rawData().map(item => ({
       ...item,
       // Add computed properties here
     }));
   });
   ```

2. **Add computed properties:**
   ```typescript
   enrichedData = computed(() => {
     return this.rawData().map(item => ({
       ...item,
       isActive: computed(() => this.isActive(item)),
       imageUrl: computed(() => this.getImageUrl(item)),
       displayName: computed(() => this.formatData(item))
     }));
   });
   ```

3. **Make original methods private:**
   ```typescript
   private isActive(item: Item): boolean { /* ... */ }
   private getImageUrl(item: Item): string { /* ... */ }
   private formatData(item: Item): string { /* ... */ }
   ```

4. **Update template:**
   ```html
   @for (item of enrichedData(); track item.id) {
     <div [class.active]="item.isActive()">
       <img [src]="item.imageUrl()">
       {{ item.displayName() }}
     </div>
   }
   ```

## When Template Functions Are OK

### ✅ Acceptable Use Cases:

1. **Event handlers (always fine):**
   ```html
   <button (click)="handleClick($event)">Click</button>
   ```

2. **One-time computed outside loops:**
   ```html
   <div class="header">
     <h1>{{ getPageTitle() }}</h1>  <!-- Called once per render -->
   </div>
   ```

3. **Simple property access (not computation):**
   ```html
   <div>{{ user.getFullName() }}</div>  <!-- If getFullName is a getter -->
   ```

### ❌ Never Acceptable:

1. **Functions in loops:**
   ```html
   @for (item of items(); track item.id) {
     <div>{{ formatItem(item) }}</div>  <!-- ❌ NEVER -->
   }
   ```

2. **Functions in repeated bindings:**
   ```html
   <div
     [class.active]="isActive(item)"    <!-- ❌ NEVER -->
     [class.selected]="isSelected(item)"> <!-- ❌ NEVER -->
   ```

3. **Computational functions anywhere they'll be called frequently:**
   ```html
   <div [style.color]="calculateColor()">  <!-- ❌ NEVER -->
   ```

## Performance Impact

### Real Metrics (from form-grid-selector refactor):

**Before (Template Functions):**
- 50 forms displayed
- ~200 function calls per change detection
- Visible lag when typing in search
- Poor performance on mobile

**After (Computed Signals):**
- 50 forms displayed
- 0-50 function calls (only when dependencies change)
- Instant, smooth interactions
- Excellent mobile performance

### Zoneless Angular Context

In Angular's upcoming zoneless change detection:
- Change detection runs **more frequently**
- Template function anti-pattern becomes **even worse**
- Computed signals become **absolutely critical**

## Summary

### The Rule:
**NEVER call functions with parameters in templates, especially in loops or repeated bindings.**

### The Solution:
**Enrich your data with computed signals that memoize the results.**

### The Impact:
**10-100x performance improvement** in real-world scenarios.

### Remember:
This pattern is **critical** for:
- ✅ Zoneless Angular applications
- ✅ Large data sets
- ✅ Frequently updating UIs
- ✅ Mobile performance
- ✅ Scalable applications
