# Development Standards

Streamlined documentation system optimized for consistent, efficient development.

## 🚨 START HERE

### **`ESSENTIALS.md`** - Single Source of Truth
**Read this file for EVERY Angular task (~4,000 tokens)**

Contains:
- Critical anti-patterns to avoid
- Quick decision tree
- Essential code patterns
- Color & animation cheat sheets
- Pre-flight checklist

**This is your only mandatory read. Everything else is optional deep-dive material.**

---

## 📚 Deep Dive References (Read as Needed)

### `quick-reference/`
**Detailed guides for specific topics:**
- `template-performance.md` - Complete guide on data enrichment pattern
- `animations.md` - Full animation system documentation
- `styles-organization.md` - Guidelines for editing styles.css

### `troubleshooting/`
**Problem solving when things break:**
- `styling-issues.md` - Color/CSS debugging
- `gradient-animations.md` - Animation issues
- `loading-states.md` - Loading state problems
- `post-migration-cleanup.md` - Migration guide

### `examples/`
**Complete working code:**
- `components/login-form.md` - Full login component
- `services/angular-signals-service.md` - Service with signals

### `frameworks/`
**Comprehensive technology guides:**
- `angular-20-comprehensive-guide.md` - Deep Angular 20 patterns
- `tailwind.md` - Tailwind v4 with custom colors

### `architecture/`
**Code organization patterns:**
- `component-patterns.md` - Component structure
- `service-patterns.md` - Service architecture
- `routing-patterns.md` - Navigation patterns

### `integration/`
**How technologies work together:**
- `angular-tailwind.md` - Styling Angular components

### `workflows/`
**Operational processes:**
- `production-deployment.md` - Deploy to production

---

## 🎯 Common Scenarios

### Creating a component?
1. Read `ESSENTIALS.md` (if not already loaded)
2. Reference `examples/components/` for patterns
3. Check `architecture/component-patterns.md` for deep dive

### Styling issues?
1. Verify against `ESSENTIALS.md` color cheat sheet
2. Consult `troubleshooting/styling-issues.md`

### Performance problems?
1. Check for template function calls in `ESSENTIALS.md` anti-patterns
2. Read `quick-reference/template-performance.md` for full guide

### Animation not working?
1. Verify syntax in `ESSENTIALS.md` animation cheat sheet
2. Check `troubleshooting/gradient-animations.md` for common issues

---

## 📁 Directory Structure

```
.claude/standards/
├── ESSENTIALS.md                    🚨 START HERE - Always read first
├── README.md                        This file
├── quick-reference/                 Deep-dive guides (3 files)
├── troubleshooting/                 Problem solving (4 files)
├── examples/                        Working code samples
├── frameworks/                      Technology deep dives
├── architecture/                    Design patterns
├── integration/                     Cross-technology guides
└── workflows/                       Operational processes
```

---

## 💡 Usage Philosophy

**80%** of your needs → `ESSENTIALS.md`
**15%** of your needs → `troubleshooting/` + `examples/`
**5%** of your needs → `frameworks/` + `architecture/`

**Start with ESSENTIALS.md. Always.**

---

## 🔑 Key Reminders

1. **One mandatory file**: `ESSENTIALS.md`
2. **Tailwind-first**: Custom CSS only when needed
3. **No function calls in templates**: Use computed signals
4. **Signals over observables**: Modern Angular 20 patterns
5. **Edit, don't create**: Prefer editing existing files

---

*For project overview and setup, see [CLAUDE.md](../../CLAUDE.md)*
