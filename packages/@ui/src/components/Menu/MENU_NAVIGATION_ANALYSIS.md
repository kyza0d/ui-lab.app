# Menu Arrow Key Navigation Bug: Analysis

## Bug Summary

When a submenu opens, the parent menu's `SubTrigger` item silently moves to the **end** of the internal items array. This means arrow key navigation after opening/closing a submenu follows a wrong order — items that should appear before/after the submenu trigger end up in incorrect positions. The corruption is permanent for the lifetime of the menu: once any submenu opens, the parent's navigation order is broken.

## Root Cause

The bug is a **cascading dependency instability** in `MenuSub.setIsOpen` → `SubTrigger.handleSelect` → SubTrigger's registration `useEffect`.

### The chain:

**1. `MenuSub.setIsOpen` depends on `isOpen`** (`Menu.Submenu.tsx:38-47`):

```ts
const setIsOpen = React.useCallback((open) => {
  const newValue = typeof open === "function" ? open(isOpen) : open
  // ...
}, [controlledOpen, isOpen, onOpenChange, nav.setFocusedKey])
//                  ^^^^^^ changes every open/close
```

When the submenu opens, `isOpen` flips → `setIsOpen` gets a new reference.

**2. SubTrigger's `handleSelect` depends on `setSubmenuOpen`** (`Menu.Submenu.tsx:116-119`):

```ts
const setSubmenuOpen = submenuContext?.setIsOpen  // unstable
const handleSelect = React.useCallback(() => {
  if (disabled) return
  setSubmenuOpen?.(true)
}, [disabled, setSubmenuOpen])  // new ref when setIsOpen changes
```

**3. SubTrigger's registration effect includes `handleSelect` in deps** (`Menu.Submenu.tsx:121-124`):

```ts
React.useEffect(() => {
  registerItem(key, finalTextValue, disabled, handleSelect, true)
  return () => unregisterItem(key)
}, [key, finalTextValue, disabled, handleSelect, registerItem, unregisterItem])
//                                 ^^^^^^^^^^^^^ unstable
```

When `handleSelect` changes:
1. **Cleanup runs first**: `unregisterItem(key)` → `Map.delete(key)` — key removed from Map
2. **Effect re-runs**: `registerItem(key, ...)` → `Map.set(key, ...)` — key added at **end** of Map

JavaScript Maps preserve insertion order. Deleting then re-setting a key moves it to the last position.

### Concrete example:

```
Initial registration order: [Cut, Copy, More▸, Paste]
User opens submenu "More▸":
  → setIsOpen changes → handleSelect changes → effect re-runs
  → unregisterItem("More") → registerItem("More")
  → Map order: [Cut, Copy, Paste, More▸]  ← BROKEN

Arrow navigation now thinks "More▸" is after "Paste" instead of after "Copy".
```

### Why it's permanent:

When the submenu closes, `isOpen` changes again → `setIsOpen` gets another new reference → SubTrigger re-registers again → moves to end again. The item never returns to its original position.

## Complexity Analysis

Current unnecessary complexity that contributes to the bug:

- **`handleSelect` in registration deps**: `registerItem` already stores `onSelect` in `itemExtrasRef` (a ref, not state). Re-calling `nav.registerItem(key, textValue, isDisabled)` with the same key/text/disabled is pure overhead — it just re-sets the same Map entry. But because it's in a useEffect with cleanup, it triggers delete+re-add.

- **`setIsOpen` depends on `isOpen`**: Used only for the function-updater form `open(isOpen)`. This is solvable with a ref, avoiding the dependency entirely.

- **Redundant close derivation** (`Menu.Items.tsx:20`):
  ```ts
  const close = isInSubmenu ? parentContext.close : parentContext.close
  ```
  Both branches are identical. Dead code that adds confusion.

- **MenuItem's dynamic context switching** (`Menu.Items.tsx:13-14`):
  ```ts
  const isInSubmenu = submenuContext?.isOpen ?? false
  const ctx = isInSubmenu && submenuContext ? submenuContext : parentContext
  ```
  The registration target changes based on `submenuContext.isOpen`. For items inside SubContent (which only mount when open), this always resolves to the submenu context. But it creates an implicit coupling between "which context am I in?" and "is the submenu open?".

- **Dual tracking**: `useListNavigation` tracks `(key, textValue, isDisabled)` in a Map. Menu's wrapper also tracks `(onSelect, isSubmenuTrigger)` in a separate ref-based Map. These two registrations are coupled in the same useEffect, so a change to extras (onSelect) forces re-registration of navigation data.

## Simplified Approach

### Strategy: Stabilize `handleSelect` via ref pattern

The fix is to ensure `handleSelect` callbacks never trigger re-registration. Since `onSelect` is already stored in a mutable ref (`itemExtrasRef`) at the Menu level, changes to the callback should not cause items to unregister/re-register.

**Pattern** (apply to SubTrigger, MenuItem, MenuCheckboxItem, MenuRadioItem):

```tsx
// Before (unstable):
const handleSelect = React.useCallback(() => {
  if (disabled) return
  setSubmenuOpen?.(true)
}, [disabled, setSubmenuOpen])

React.useEffect(() => {
  registerItem(key, finalTextValue, disabled, handleSelect, true)
  return () => unregisterItem(key)
}, [key, finalTextValue, disabled, handleSelect, registerItem, unregisterItem])

// After (stable):
const handleSelectRef = React.useRef<() => void>(null)
handleSelectRef.current = () => {
  if (disabled) return
  setSubmenuOpen?.(true)
}

React.useEffect(() => {
  registerItem(key, finalTextValue, disabled, () => handleSelectRef.current?.(), true)
  return () => unregisterItem(key)
}, [key, finalTextValue, disabled, registerItem, unregisterItem])
```

**What this eliminates:**
- `handleSelect` is no longer a useCallback (or its instability doesn't matter)
- Registration effect deps shrink — only `key`, `finalTextValue`, `disabled` trigger re-registration
- SubTrigger no longer re-registers when submenu opens/closes
- No new state, no new complexity

### Secondary cleanup (optional):

1. **Fix `setIsOpen` in MenuSub** — use a ref for `isOpen` to remove it from deps:
   ```tsx
   const isOpenRef = React.useRef(isOpen)
   isOpenRef.current = isOpen
   // Now setIsOpen doesn't depend on isOpen
   ```

2. **Remove dead code**: `const close = isInSubmenu ? parentContext.close : parentContext.close`

## Side-by-Side Comparison

### Current (broken):

```
SubTrigger mounts → registerItem("More") → Map: [..., More, ...]
                                                        ↓
User opens submenu → isOpen changes
                   → setIsOpen gets new ref
                   → handleSelect gets new ref
                   → useEffect cleanup: unregisterItem("More") → Map.delete
                   → useEffect setup:   registerItem("More")   → Map.set at END
                                                        ↓
                                              Map: [..., ..., More]  ← WRONG ORDER
```

### Simplified (fixed):

```
SubTrigger mounts → registerItem("More") → Map: [..., More, ...]
                                                        ↓
User opens submenu → isOpen changes
                   → setIsOpen gets new ref
                   → handleSelectRef.current updated (no effect re-run)
                   → Registration effect: deps unchanged, does NOT re-run
                                                        ↓
                                              Map: [..., More, ...]  ← ORDER PRESERVED
```

### Why this eliminates the bug:

The registration effect only re-runs when the item's identity changes (`key`, `textValue`, `disabled`). Behavioral changes (`onSelect`) update through the ref, bypassing the React effect system entirely. Since `registerItem` stores `onSelect` in `itemExtrasRef` (already a ref), the latest callback is always used when the item is selected — no stale closure issue.

### Nested submenus:

Same fix applies. Each SubTrigger's registration is stable regardless of how many submenu levels open/close. The ref pattern works identically at all nesting depths.

## Next Steps

**Files to modify:**

1. **`Menu.Submenu.tsx`** — SubTrigger: stabilize `handleSelect` with ref (~5 lines changed)
2. **`Menu.Items.tsx`** — MenuItem, MenuCheckboxItem, MenuRadioItem: same pattern (~5 lines each, ~15 total)

**Optional cleanup (same PR):**

3. **`Menu.Submenu.tsx`** — MenuSub: stabilize `setIsOpen` by using ref for `isOpen` (~4 lines)
4. **`Menu.Items.tsx`** — Remove redundant `const close = isInSubmenu ? parentContext.close : parentContext.close` (1 line)

**Scope**: 2 files, ~20-25 lines changed. No new files, no new state, no architectural changes.

**Risk**: Low. The ref pattern is a standard React optimization. The fix narrows the conditions under which items re-register, which can only improve stability. All existing behavior (mouse hover, keyboard navigation, submenu open/close, nested submenus) continues to work because `onSelect` is already stored in a ref at the Menu level.
