# Post-Migration Cleanup Checklist

*Essential steps after completing RxJS to Signals migrations*

## 🧹 Code Cleanup Checklist

### Remove Unused RxJS Code
- [ ] Remove unused `BehaviorSubject`, `Observable`, `Subject` declarations
- [ ] Remove empty or obsolete `.pipe()` chains
- [ ] Remove subscription variables (`subs`, `routeSubs`, etc.)
- [ ] Remove `unsubscribe()` calls in destroy methods
- [ ] Remove unused RxJS operators (`map`, `tap`, `shareReplay`, etc.)

### Clean Up Imports
- [ ] Remove unused RxJS imports (`BehaviorSubject`, `Observable`, etc.)
- [ ] Remove unused operator imports (`map`, `tap`, `first`, etc.)
- [ ] Remove unused lifecycle imports (`OnDestroy`, etc.)
- [ ] Keep only necessary RxJS imports (`fromEvent` for event streams)

### Update Service Methods
- [ ] Remove empty `setObservables()` methods
- [ ] Remove obsolete `subscribe()` methods
- [ ] Remove manual observable initialization code
- [ ] Simplify `destroy()` methods (only signal resets, no unsubscribe)
- [ ] Remove unused getter/setter methods

### Template & Component Updates
- [ ] Remove unused `AsyncPipe` imports from components
- [ ] Remove `AsyncPipe` from component imports arrays
- [ ] Verify all `| async` pipes are replaced with signal calls `()`
- [ ] Update component interfaces if needed

### Verification Steps
- [ ] Build passes without warnings about unused imports
- [ ] No TypeScript errors about missing properties
- [ ] No runtime errors in browser console
- [ ] All functionality works as expected
- [ ] Performance is maintained or improved

## ⚠️ Common Cleanup Mistakes

### Don't Remove These
- `fromEvent` - Still needed for DOM event streams
- `effect()` - Needed for side effects with signals
- Signal declarations - These replace the old observables
- Resource declarations - These handle async data loading

### Watch Out For
- Dead code that looks like it might be needed
- Commented code that should be removed
- Empty methods that serve no purpose
- Unused interfaces that were RxJS-specific

## 🎯 Success Criteria

**Clean migration is complete when:**
1. ✅ Build completes without unused import warnings
2. ✅ No RxJS observables remain for state management
3. ✅ All async pipes replaced with signal calls
4. ✅ Service file is significantly smaller and cleaner
5. ✅ Application functionality is preserved
6. ✅ Performance is maintained or improved

---

*Always test thoroughly after cleanup to ensure no functionality was accidentally removed.*