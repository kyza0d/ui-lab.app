# Group Input Focus Ring — Design Proposal

## Root Cause

When an Input with a prefix icon is rendered inside a Group, the DOM structure is:

```
div.group-input-wrapper              ← Group's layout wrapper
  div.container[data-focus-visible]  ← Input's root container (has border-radius, border)
    div.start-adornments             ← prefix icon lives here
    input[data-focus-visible]        ← text input element
    div.end-adornments               ← suffix if any
```

The current focus ring rule in `Group.module.css` (line 232) targets `.group-input-wrapper input:focus-visible`, applying `box-shadow: inset 0 0 0 1px` directly on the `<input>` element. Since the `<input>` is a flex sibling of `.start-adornments` (which holds the prefix icon), it only occupies the space to the right of the icon. The inset shadow renders inside the `<input>`'s box — shifted right, not encompassing the prefix icon area.

The offset is proportional to the prefix icon width because `box-shadow: inset` is relative to the element's own border-box.

## Proposed Solution

**Target the Input container `<div>` instead of the `<input>` element for the focus ring.**

The Input container (`div.container`) is the direct and only child of `.group-input-wrapper`. It already:

- Receives `data-focus-visible` attribute from React's `useFocusRing()` hook (keyboard focus only)
- Has correct `border-radius` via the `--input-border-radius` CSS variable (already controlled by Group)
- Encompasses the full visible input area: prefix icons, text input, suffix icons, actions
- Has its own border/shadow suppressed in Group context via `--input-border-color: transparent` / `--input-active-box-shadow: none`

**Selector:** Replace `.group-input-wrapper input:focus-visible` with `.group-input-wrapper > [data-focus-visible]`

This matches the container div (only direct child of the wrapper) when the keyboard focus attribute is present. No `:global()` needed — `[data-focus-visible]` is a plain attribute selector.

### Non-ghost variant

```css
.group:not(.ghost) .group-input-wrapper > [data-focus-visible] {
  outline: none;
  box-shadow: inset 0 0 0 1px var(--focus-ring-color);
  position: relative;
  z-index: 1;
}
```

### Ghost variant

```css
.group.ghost .group-input-wrapper > [data-focus-visible] {
  outline: none;
  box-shadow: 0 0 0 1px var(--focus-ring-color);
  position: relative;
  z-index: 1;
}
```

### `none` spacing — first/last item border-radius

The container's `border-radius` is already set to `0` for `none` spacing via `--input-border-radius: 0`. For first/last items, specific corners need rounding. The existing rules (lines 124–142) set these corners on the `<input>` element, but they now need to target the container instead.

Replace each `.group-input-wrapper input` rule with `.group-input-wrapper > *`:

```css
.group.none.horizontal:not(.ghost) .item:first-child .group-input-wrapper > * {
  border-top-left-radius: var(--inner-radius);
  border-bottom-left-radius: var(--inner-radius);
}
/* ... and so on for last-child, vertical, etc. */
```

Using `> *` works because `.group-input-wrapper` has exactly one child (the Input container). This is equivalent to `> :first-child` but shorter.

Alternatively, the existing `input` radius rules can be left in place (they don't cause harm) and duplicate rules added for the container. Removing them is cleaner.

## Required Changes

### `packages/@ui/src/components/Group/Group.module.css`

1. **Focus ring rules (lines 230–237):** Remove `input:focus-visible` from the non-ghost selector group. Add two new rules:
   - `.group:not(.ghost) .group-input-wrapper > [data-focus-visible]` — inset ring
   - `.group.ghost .group-input-wrapper > [data-focus-visible]` — outer ring

2. **`none` spacing first/last border-radius (lines 124–142):** Change selectors from `.group-input-wrapper input` to `.group-input-wrapper > *` to target the container instead of the input element.

### No changes needed

- **`Input.tsx`** — The container already emits `data-focus-visible`. No JS/React changes required.
- **`Input.module.css`** — The container's `[data-active]` box-shadow is already suppressed by Group via `--input-active-box-shadow: none`. No new CSS variables needed.

## Trade-offs

1. **`> [data-focus-visible]` is attribute-based, not class-based.** It relies on Input continuing to set `data-focus-visible` on its container. This is already an established pattern in the codebase (Input.tsx line 192), so the coupling is low-risk.

2. **`> *` selector for first/last radius** depends on `.group-input-wrapper` having exactly one child. This is structurally guaranteed by `GroupInput` rendering a single `<Input>` child, but a future change adding siblings would break it. `> :first-child` is slightly more defensive but semantically equivalent here.

3. **Container has `overflow: hidden`** — this does not affect `inset` box-shadow (rendered inside the border-box), so no issue for non-ghost. For ghost's outer shadow, the shadow is on the container which has `overflow: hidden` — outer box-shadow is painted outside the element and not clipped by the element's own overflow. This is per CSS spec: `overflow` clips content and scrollable areas, not outset decorations like box-shadow and outline. No issue.

4. **`data-active` vs `data-focus-visible`** — The Input container also receives `data-active` on any focus (mouse or keyboard). The Group's focus ring intentionally uses `data-focus-visible` (keyboard only), matching the `:focus-visible` behavior of other Group items (buttons, triggers). This is correct — mouse focus within a Group should not show item-level rings.

## Alternative Approaches Considered

### 1. `:has(input:focus-visible)` on `.group-input-wrapper`

```css
.group-input-wrapper:has(input:focus-visible) { box-shadow: ... }
```

Puts the ring on the wrapper instead of the container. Would work but the wrapper has no `border-radius` set — it would need its own radius rules mirroring the container's. The container already has correct radius via `--input-border-radius`, making it the better target. Also, `:has()` has slightly less browser support than attribute selectors (though both are well-supported now).

### 2. New CSS variable `--input-focus-visible-box-shadow`

Add a new variable consumed in `Input.module.css` under `[data-focus-visible]`, then set it from Group. This follows the existing variable pattern more literally but requires changes to `Input.module.css` (adding a new rule and variable) for something that's purely a Group concern. Over-engineering.

### 3. JavaScript: set `data-group-focus` on wrapper

Add focus/blur handlers in `GroupInput` to set a data attribute on the wrapper, then style the wrapper. Requires JS changes and adds React state management for something achievable in pure CSS. Rejected.

### 4. `:focus-within` on `.group-input-wrapper`

Would match on any child focus (including action buttons within the Input). Too broad — would trigger the ring when clicking an inline action button, not just when the text input has focus.
