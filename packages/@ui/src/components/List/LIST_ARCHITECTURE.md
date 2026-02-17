# List Compound Component Architecture

## Overview

List has been refactored from a simple presentational component into a fully composable compound component that serves as the foundation for all list-based UI patterns (Select, MultiSelect, Menu, Combobox).

## Architecture

### Core Principles

1. **Compound Pattern**: List exposes sub-components (Item, Checkbox, Media, Desc) for composition without prop drilling
2. **Highlight State Management**: List manages keyboard navigation highlight state internally
3. **Context-based Communication**: Sub-components read state from List context
4. **Consumer Responsibility**: List does NOT handle keyboard listeners—consumers (Select, MultiSelect) wire keyboard events
5. **Selection Logic Decoupling**: List only manages highlight state; consumers implement selection logic

## Components

### List (Root Container)

The root component that manages highlight state and provides context to sub-components.

**Props:**
```typescript
interface ListContainerProps {
  items: unknown[];  // Array for keyboard nav reference (length used for bounds checking)
  variant?: 'default' | 'feed';
  spacing?: 'default' | 'sm';
  onNavigate?: {
    up?: () => void;
    down?: () => void;
    enter?: () => void;
    escape?: () => void;
  };
  children: React.ReactNode;
}
```

**Ref API** (`ListRef`):
```typescript
{
  focusNext: () => void;         // Move highlight down
  focusPrev: () => void;         // Move highlight up
  focusFirst: () => void;        // Jump to first item
  focusLast: () => void;         // Jump to last item
  selectHighlighted: () => void; // Trigger enter callback
  clearHighlight: () => void;    // Remove highlight
  getHighlightedIndex: () => number | null; // Get current highlight
}
```

**Behavior:**
- Maintains highlight state (which item is keyboard-focused)
- Scrolls highlighted item into view automatically
- Calls onNavigate callbacks when methods are invoked
- Does NOT attach keyboard handlers—consumers must wire events

### List.Item

Wrapper for each list row. Renders children and applies highlight/selection styling.

**Props:**
```typescript
interface ListItemProps {
  value: string;  // Unique identifier for the item
  children: React.ReactNode;
}
```

**Attributes:**
- `data-highlighted="true"` when this item's index matches highlighted index
- `data-value={value}` for easy DOM querying

**Behavior:**
- Auto-registers with parent List on mount
- Applies highlight styles based on context
- Highlights on mouse enter (optional)
- Children can include sub-components (Checkbox, Media, Desc)

### List.Checkbox

Optional slot for a checkbox or selection indicator within an item.

**Props:**
```typescript
interface ListCheckboxProps {
  checked?: boolean;  // Visual state
  children?: React.ReactNode;
}
```

**Styling:**
- Fixed flex container with centered alignment
- Typically wraps a native `<input type="checkbox">` or custom checkbox component

### List.Media

Optional slot for an icon, avatar, or image within an item.

**Props:**
```typescript
interface ListMediaProps {
  children: React.ReactNode;
}
```

**Styling:**
- Fixed 2rem × 2rem container
- Centered alignment
- Prevents layout shift when items have different content

### List.Desc

Optional slot for secondary/description text within an item.

**Props:**
```typescript
interface ListDescProps {
  children: React.ReactNode;
}
```

**Styling:**
- Smaller font size (0.875rem)
- Muted color (--foreground-400)
- Single-line truncation with ellipsis

### List.Header

Optional sticky header above items.

**Props:**
```typescript
interface ListHeaderProps {
  sticky?: boolean;  // Position: sticky when true
  children: React.ReactNode;
}
```

### List.Footer

Optional footer below items (typically for action buttons).

**Props:**
```typescript
interface ListFooterProps {
  align?: 'center' | 'flex-start' | 'flex-end';
  children: React.ReactNode;
}
```

## Usage Example

```tsx
import { List, ListRef } from 'ui-lab-components';
import { useRef, useState } from 'react';

const items = [
  { id: '1', title: 'Item 1', desc: 'Description' },
  { id: '2', title: 'Item 2', desc: 'Description' },
];

export function MyList() {
  const listRef = useRef<ListRef>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!listRef.current) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        listRef.current.focusNext();
        break;
      case 'ArrowUp':
        e.preventDefault();
        listRef.current.focusPrev();
        break;
      case 'Enter':
        e.preventDefault();
        listRef.current.selectHighlighted();
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <List
        ref={listRef}
        items={items}
        onNavigate={{
          down: () => console.log('User pressed down'),
          up: () => console.log('User pressed up'),
          enter: () => {
            const idx = listRef.current?.getHighlightedIndex();
            if (idx !== null) {
              setSelectedId(items[idx]?.id || null);
            }
          },
        }}
      >
        <List.Header sticky>
          <span>Items</span>
        </List.Header>

        {items.map((item) => (
          <List.Item
            key={item.id}
            value={item.id}
            onClick={() => setSelectedId(item.id)}
          >
            <List.Media>🎯</List.Media>
            <div style={{ flex: 1 }}>
              <div>{item.title}</div>
              <List.Desc>{item.desc}</List.Desc>
            </div>
            <List.Checkbox checked={selectedId === item.id} />
          </List.Item>
        ))}

        <List.Footer align="center">
          <button onClick={() => listRef.current?.focusFirst()}>First</button>
          <button onClick={() => listRef.current?.focusNext()}>Next</button>
        </List.Footer>
      </List>
    </div>
  );
}
```

## Context

List provides context to all sub-components:

```typescript
interface ListContextValue {
  highlightedIndex: number | null;  // Current keyboard focus
  focusItem: (index: number) => void; // Highlight an item by index
  registerItem: (ref: HTMLElement | null) => number; // Register item on mount
  itemRefs: MutableRefObject<(HTMLElement | null)[]>; // Array of item refs
}
```

Sub-components can access this via `useListContext()`.

## Integration with Select/MultiSelect

Select and MultiSelect will build on List:

```tsx
// Select example
<List ref={selectListRef} items={items}>
  {items.map((item, index) => (
    <List.Item
      key={item.id}
      value={item.id}
      onClick={() => setSelected(item.id)}
    >
      <div>{item.title}</div>
      <List.Checkbox checked={selected === item.id} />
    </List.Item>
  ))}
</List>

// MultiSelect example (with Set-based selection)
<List ref={multiSelectListRef} items={items}>
  {items.map((item) => (
    <List.Item
      key={item.id}
      value={item.id}
      onClick={() => toggleSelection(item.id)}
    >
      <div>{item.title}</div>
      <List.Checkbox checked={selectedSet.has(item.id)} />
    </List.Item>
  ))}
</List>
```

## CSS Styling

List provides data attributes for styling:

```css
/* Highlight active keyboard focus */
[data-highlighted="true"] {
  background-color: var(--background-highlighted);
}

/* Media slot sizing */
.media {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

/* Description text */
.desc {
  font-size: 0.875rem;
  color: var(--foreground-400);
}
```

## Migration Path

For existing consumers of the old List:
- Old List.Item (with `selected` prop) → now use composition with List.Checkbox
- Old `onSelect` prop → now wire keyboard listeners + use ref methods
- Old `interactive` prop → now built-in (all items are interactive)

## Key Design Decisions

1. **No keyboard handler in List**: Allows consumers full control over keyboard binding context (e.g., global shortcuts, command palette, etc.)

2. **Index-based highlight, not value-based**: Items are identified by insertion order for simplicity. This matches how consumers render `items.map()`.

3. **Context over prop drilling**: Sub-components read from context to avoid deeply nested prop chains.

4. **Highlight ≠ Selection**: List manages highlight (UI focus state); consumers implement selection logic. This enables flexible selection patterns (single, multi, toggle, etc.).

5. **Auto-registration of items**: Items register themselves on mount, maintaining insertion order for correct indexing.
