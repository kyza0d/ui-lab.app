# React-Aria Hooks for Command Palette Migration

## Overview

React Aria is a library of headless UI components and hooks that provides accessibility-first building blocks for creating custom user interfaces. Unlike `cmdk`, which is a feature-complete command palette library, React Aria provides granular, composable hooks that give developers complete control over the component structure, styling, and behavior while handling the complex accessibility requirements automatically.

The philosophy of React Aria is "behavior without the UI" - hooks manage keyboard interactions, focus management, ARIA attributes, and screen reader announcements, while developers maintain full control over DOM structure and styling. This approach is ideal for migrating from `cmdk` because it allows leveraging the CommandPalette's existing styling and layout while replacing the underlying behavior layer.

---

## 1. Core Hooks for Command Palette

### 1.1 useModalOverlay + useDialog

**Hook Names & Import Paths:**
- `useModalOverlay` from `@react-aria/overlays`
- `useDialog` from `@react-aria/dialog`

**Primary Purpose:**
- `useModalOverlay` - Provides modal behavior with focus trapping, scroll prevention, and click-outside dismissal
- `useDialog` - Provides semantic dialog structure with proper ARIA roles and labeling
- Together they create a fully accessible modal dialog experience

**Parameters:**

```typescript
// useModalOverlay
useModalOverlay(
  {
    isDismissable?: boolean,           // Can user close via interaction
    isKeyboardDismissDisabled?: boolean, // Prevent Escape key
    shouldCloseOnInteractOutside?: (element: Element) => boolean,
  },
  state: OverlayTriggerState,
  ref: RefObject<HTMLElement>
)

// useDialog
useDialog(
  {
    role?: 'dialog' | 'alertdialog',
    'aria-label'?: string,
    'aria-labelledby'?: string,
  },
  ref: RefObject<HTMLElement>
)
```

**Return Values:**

```typescript
// useModalOverlay returns:
{
  modalProps: DOMAttributes,      // Props for modal container
  underlayProps: DOMAttributes,   // Props for backdrop
}

// useDialog returns:
{
  dialogProps: DOMAttributes,     // Props for dialog container
  titleProps: DOMAttributes,      // Props for title element
}
```

**Accessibility Features Provided:**
- `role="dialog"` with proper `aria-modal="true"`
- `aria-labelledby` for dialog title association
- Focus trap: prevents tab focus from escaping modal
- Focus restoration: returns focus to trigger on close
- Screen reader announcements for modal state
- Automatic `aria-hidden="true"` for background content
- Escape key handling (unless disabled)
- Click-outside dismissal handling

**Example Use Case for Command Palette:**

```typescript
import { useModalOverlay } from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { useOverlayTriggerState } from '@react-stately/overlays';

function CommandPaletteModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const state = useOverlayTriggerState({ isOpen, onClose });

  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable: true },
    state,
    modalRef
  );

  const { dialogProps, titleProps } = useDialog({}, modalRef);

  return (
    <div {...underlayProps} className="backdrop">
      <div {...modalProps} {...dialogProps} ref={modalRef} role="dialog">
        <h2 {...titleProps} id="palette-title">Command Palette</h2>
        {children}
      </div>
    </div>
  );
}
```

---

### 1.2 useMenu + useMenuItem

**Hook Names & Import Paths:**
- `useMenu` from `@react-aria/menu`
- `useMenuItem` from `@react-aria/menu`

**Primary Purpose:**
- `useMenu` - Provides menu container behavior with keyboard navigation, selection, and ARIA semantics
- `useMenuItem` - Provides individual menu item behavior, handling focus, selection, and activation

**Parameters:**

```typescript
// useMenu
useMenu(
  {
    'aria-label'?: string,
    'aria-labelledby'?: string,
    autoFocus?: boolean,                 // Focus first item on open
    shouldFocusWrap?: boolean,           // Wrap focus at ends
    disabledKeys?: Iterable<Key>,
    onAction?: (key: Key) => void,
    onClose?: () => void,
  },
  state: TreeState<T>,
  ref: RefObject<HTMLElement>
)

// useMenuItem
useMenuItem(
  {
    key: Key,
    isDisabled?: boolean,
    onAction?: () => void,
    closeOnSelect?: boolean,
  },
  state: TreeState<T>,
  ref: RefObject<FocusableElement>
)
```

**Return Values:**

```typescript
// useMenu returns:
menuProps: DOMAttributes  // Props for menu container

// useMenuItem returns:
{
  menuItemProps: DOMAttributes,   // Props for item element
  isFocused: boolean,
  isSelected: boolean,
  isPressed: boolean,
  isDisabled: boolean,
}
```

**Accessibility Features Provided:**
- `role="menu"` for container, `role="menuitem"` for items
- `aria-label` and `aria-labelledby` support
- Full keyboard navigation:
  - Arrow Up/Down: move focus between items
  - Home/End: jump to first/last item
  - Enter/Space: activate item
  - Escape: close menu
  - Type-ahead: jump to items by first letter
- `aria-disabled` for disabled items
- Focus management with automatic first-item focus
- Selection state management

**Example Use Case for Command Palette:**

```typescript
import { useMenu, useMenuItem } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';

function CommandList({ commands, onSelectCommand }) {
  const state = useTreeState({
    items: commands,
    onSelectionChange: (keys) => {
      const key = [...keys][0];
      const cmd = commands.find(c => c.id === key);
      if (cmd) onSelectCommand(cmd);
    },
  });

  const menuRef = useRef(null);
  const { menuProps } = useMenu(
    { shouldFocusWrap: true },
    state,
    menuRef
  );

  return (
    <div {...menuProps} ref={menuRef} role="menu">
      {[...state.collection].map((item) => (
        <CommandItem key={item.key} item={item} state={state} />
      ))}
    </div>
  );
}

function CommandItem({ item, state }) {
  const itemRef = useRef(null);
  const { menuItemProps, isFocused, isSelected } = useMenuItem(
    { key: item.key },
    state,
    itemRef
  );

  return (
    <div
      {...menuItemProps}
      ref={itemRef}
      className={`command-item ${isFocused ? 'focused' : ''}`}
    >
      {item.label}
    </div>
  );
}
```

---

### 1.3 useSearchField

**Hook Name & Import Path:**
- `useSearchField` from `@react-aria/searchfield`

**Primary Purpose:**
Provides accessible search input field with clear button, submit functionality, and proper labeling for screen readers. Perfect for the search input at the top of a command palette.

**Parameters:**

```typescript
useSearchField(
  {
    'aria-label'?: string,
    'aria-labelledby'?: string,
    isDisabled?: boolean,
    isReadOnly?: boolean,
    onSubmit?: (value: string) => void,  // Enter key
    onClear?: () => void,                 // Escape key or clear button
    defaultValue?: string,
    value?: string,
  },
  state: SearchFieldState,
  inputRef: RefObject<HTMLInputElement>
)
```

**Return Values:**

```typescript
{
  labelProps: DOMAttributes,
  inputProps: InputHTMLAttributes,
  clearButtonProps: AriaButtonProps,
  descriptionProps: DOMAttributes,
  errorMessageProps: DOMAttributes,
}
```

**Accessibility Features Provided:**
- `role="searchbox"` on input element
- `aria-label` and `aria-labelledby` support
- `aria-invalid` for validation states
- `aria-describedby` for descriptions and error messages
- Proper clear button labeling (automatically says "Clear search")
- Auto-focus support
- Keyboard handling:
  - Enter: submit/search
  - Escape: clear field
  - Regular text input filtering

**Example Use Case for Command Palette:**

```typescript
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

function PaletteSearchInput({ onSearchChange }) {
  const state = useSearchFieldState({
    onClear: () => onSearchChange(''),
  });

  const inputRef = useRef(null);
  const { inputProps, clearButtonProps } = useSearchField(
    {
      'aria-label': 'Search commands',
      value: state.value,
      onClear: () => state.clear(),
    },
    state,
    inputRef
  );

  return (
    <div className="search-container">
      <input
        {...inputProps}
        ref={inputRef}
        placeholder="Type a command..."
        onChange={(e) => {
          state.setValue(e.target.value);
          onSearchChange(e.target.value);
        }}
      />
      <button {...clearButtonProps}>Clear</button>
    </div>
  );
}
```

---

### 1.4 useListBox + useListState + useOption

**Hook Names & Import Paths:**
- `useListBox` from `@react-aria/listbox`
- `useListState` from `@react-stately/list`
- `useOption` from `@react-aria/listbox`

**Primary Purpose:**
- `useListState` - State management for lists, building the collection interface
- `useListBox` - Provides accessible listbox semantics and keyboard navigation
- `useOption` - Provides individual option behavior

**Parameters:**

```typescript
// useListState (state management)
useListState({
  items?: Iterable<T>,
  children?: ReactNode | ((item: T) => ReactNode),
  disabledKeys?: Iterable<Key>,
  selectedKeys?: 'all' | Iterable<Key>,
  defaultSelectedKeys?: 'all' | Iterable<Key>,
  selectionMode?: 'none' | 'single' | 'multiple',
  disallowEmptySelection?: boolean,
  onSelectionChange?: (keys: Selection) => void,
  filter?: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>,
})

// useListBox
useListBox(
  {
    'aria-label'?: string,
    'aria-labelledby'?: string,
    autoFocus?: boolean,
    shouldFocusWrap?: boolean,
    shouldSelectOnPressUp?: boolean,
    shouldFocusOnHover?: boolean,
    isVirtualized?: boolean,
    disabledKeys?: Iterable<Key>,
    selectionMode?: 'none' | 'single' | 'multiple',
    onSelectionChange?: (keys: Selection) => void,
  },
  state: ListState<T>,
  ref: RefObject<HTMLElement>
)

// useOption
useOption(
  { key: Key, isDisabled?: boolean },
  state: ListState<T>,
  ref: RefObject<FocusableElement>
)
```

**Return Values:**

```typescript
// useListBox returns:
{
  listBoxProps: DOMAttributes,
  labelProps: DOMAttributes,
}

// useOption returns:
{
  optionProps: DOMAttributes,
  isFocused: boolean,
  isSelected: boolean,
  isDisabled: boolean,
}
```

**Accessibility Features Provided:**
- `role="listbox"` for container, `role="option"` for items
- `aria-multiselectable` when appropriate
- `aria-label` and `aria-labelledby` support
- Full keyboard navigation:
  - Arrow Up/Down: navigate items
  - Home/End: jump to boundaries
  - Page Up/Down: scroll navigation
  - Enter/Space: select item
  - Type-ahead: jump to items by first letter
- `aria-selected` state management
- `aria-disabled` for disabled items
- Focus management
- Virtualization support for large lists

**Example Use Case for Command Palette:**

```typescript
import { useListBox, useOption } from '@react-aria/listbox';
import { useListState } from '@react-stately/list';

function CommandResults({ commands, selectedId, onSelect }) {
  const state = useListState({
    items: commands,
    selectedKeys: [selectedId],
    onSelectionChange: (keys) => {
      const key = [...keys][0];
      const cmd = commands.find(c => c.id === key);
      if (cmd) onSelect(cmd);
    },
  });

  const listRef = useRef(null);
  const { listBoxProps } = useListBox(
    {
      'aria-label': 'Commands',
      shouldFocusWrap: true,
    },
    state,
    listRef
  );

  return (
    <div {...listBoxProps} ref={listRef} role="listbox">
      {[...state.collection].map((item) => (
        <CommandOption key={item.key} item={item} state={state} />
      ))}
    </div>
  );
}

function CommandOption({ item, state }) {
  const ref = useRef(null);
  const { optionProps, isFocused, isSelected } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <div
      {...optionProps}
      ref={ref}
      className={`option ${isFocused ? 'focused' : ''} ${isSelected ? 'selected' : ''}`}
    >
      {item.label}
    </div>
  );
}
```

---

### 1.5 useKeyboard

**Hook Name & Import Path:**
- `useKeyboard` from `@react-aria/interactions`

**Primary Purpose:**
Handles keyboard event interactions with improved event propagation control and automatic event handling.

**Parameters:**

```typescript
useKeyboard({
  isDisabled?: boolean,
  onKeyDown?: (e: KeyboardEvent) => void,
  onKeyUp?: (e: KeyboardEvent) => void,
})
```

**Return Values:**

```typescript
{
  keyboardProps: DOMAttributes<FocusableElement>,
}
```

**Accessibility Features Provided:**
- Proper keyboard event handling for accessibility
- Event propagation control (stops by default, call `e.continuePropagation()` to allow)
- Works with disabled state
- Integrates with other React Aria hooks

**Example Use Case for Command Palette:**

```typescript
import { useKeyboard } from '@react-aria/interactions';

function CommandPalette({ onOpenPalette, onClosePalette }) {
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      // Global Cmd+K / Ctrl+K shortcut
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCommand = isMac ? e.metaKey : e.ctrlKey;

      if (isCommand && e.key === 'k') {
        e.preventDefault();
        onOpenPalette();
      }
    },
  });

  return <div {...keyboardProps}>{/* Your palette content */}</div>;
}
```

---

### 1.6 useFocusRing + useFocusManager

**Hook Names & Import Paths:**
- `useFocusRing` from `@react-aria/focus`
- `useFocusManager` from `@react-aria/focus`

**Primary Purpose:**
- `useFocusRing` - Determines when to show keyboard focus indicators
- `useFocusManager` - Programmatically controls focus within a FocusScope

**Parameters:**

```typescript
// useFocusRing
useFocusRing({
  within?: boolean,        // Show ring when children focused
  isTextInput?: boolean,
  autoFocus?: boolean,
})

// useFocusManager (no parameters, called within FocusScope)
useFocusManager()
```

**Return Values:**

```typescript
// useFocusRing returns:
{
  isFocused: boolean,
  isFocusVisible: boolean,      // Only true for keyboard focus
  focusProps: DOMAttributes,
}

// useFocusManager returns:
{
  focusNext: (opts?: { wrap?: boolean }) => void,
  focusPrevious: (opts?: { wrap?: boolean }) => void,
  focusFirst: (opts?: { wrap?: boolean }) => void,
  focusLast: (opts?: { wrap?: boolean }) => void,
}
```

**Accessibility Features Provided:**
- Focus visibility management:
  - Shows focus ring only for keyboard navigation
  - Hides focus ring for mouse/touch interactions
  - Follows `:focus-visible` browser standard
- `aria-hidden` support for hidden content
- Focus scope containment
- Keyboard focus movement
- Platform-aware behavior

**Example Use Case for Command Palette:**

```typescript
import { useFocusRing } from '@react-aria/focus';
import { FocusScope } from '@react-aria/focus';

function CommandItem({ command, isFocused }) {
  const { isFocusVisible, focusProps } = useFocusRing({
    within: true,
  });

  return (
    <div
      {...focusProps}
      className={`command-item ${isFocusVisible ? 'focus-ring' : ''}`}
    >
      {command.label}
    </div>
  );
}

// Wrap palette in FocusScope for automatic focus management
function CommandPalette() {
  return (
    <FocusScope contain restoreFocus>
      {/* Palette content - focus is trapped and managed */}
    </FocusScope>
  );
}
```

---

## 2. State Management Patterns

### 2.1 Open/Closed State for Modal

**Using useOverlayTriggerState:**

```typescript
import { useOverlayTriggerState } from '@react-stately/overlays';

function CommandPalette() {
  // State hooks for opening/closing
  const state = useOverlayTriggerState({
    isOpen: controlledOpen,           // Optional controlled state
    onOpenChange: handleOpenChange,   // Callback on state change
    defaultOpen: false,               // Initial state if uncontrolled
  });

  // Use state.isOpen to conditionally render
  // state.open() to open
  // state.close() to close
  // state.toggle() to toggle

  return state.isOpen ? <Modal state={state} /> : null;
}
```

### 2.2 Selected Item State

**Using useListState or useTreeState:**

```typescript
const state = useListState({
  items: commands,
  selectedKeys: new Set([selectedCommandId]),
  onSelectionChange: (keys) => {
    const selected = commands.find(c => c.id === [...keys][0]);
    setSelectedCommand(selected);
  },
});
```

### 2.3 Search Query State

**Using useSearchFieldState:**

```typescript
import { useSearchFieldState } from '@react-stately/searchfield';

function PaletteSearch() {
  const searchState = useSearchFieldState({
    value: searchQuery,
    onChange: (value) => setSearchQuery(value),
  });

  // searchState.value - current search text
  // searchState.setValue() - update search
  // searchState.clear() - clear search
}
```

### 2.4 Filter and Grouping Logic

**Manual filtering pattern:**

```typescript
const filteredCommands = useMemo(() => {
  if (!searchQuery) {
    // Return commands grouped by category
    return groupByCategory(commands);
  }

  // Filter and rank commands
  const scored = commands
    .map(cmd => ({
      command: cmd,
      score: calculateRelevance(cmd, searchQuery),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ command }) => command);

  return groupByCategory(scored);
}, [commands, searchQuery]);
```

**React Aria useFilter utility:**

```typescript
import { useFilter } from '@react-aria/i18n';

function CommandPalette() {
  const { contains } = useFilter({
    sensitivity: 'base',  // Case and diacritic insensitive
  });

  const filtered = useMemo(() => {
    return commands.filter(cmd =>
      contains(cmd.label, searchQuery) ||
      contains(cmd.description || '', searchQuery)
    );
  }, [commands, searchQuery, contains]);
}
```

### 2.5 Loading States

**Handling async command execution:**

```typescript
const [isExecuting, setIsExecuting] = useState(false);

const executeCommand = useCallback(async (command) => {
  setIsExecuting(true);
  try {
    await command.action();
  } finally {
    setIsExecuting(false);
  }
}, []);
```

---

## 3. Keyboard Navigation and Interaction

### 3.1 Global Shortcuts

**Cmd+K / Ctrl+K to Open:**

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const isCommand = isMac ? e.metaKey : e.ctrlKey;

    if (isCommand && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 3.2 Within-Palette Navigation

**Arrow Key Navigation:**
Automatically handled by `useMenu` or `useListBox`:
- Arrow Up: move to previous command
- Arrow Down: move to next command
- Home: jump to first command
- End: jump to last command
- Page Up: jump up by page
- Page Down: jump down by page

**Selection and Activation:**
- Enter: execute selected command
- Space: also activates in menu mode
- Escape: close palette without selecting

**Type-Ahead Search:**
- Automatically handled by `useMenu` / `useListBox`
- Type first letter to jump to that command
- Multiple presses cycle through matches

### 3.3 Escape Key Handling

**Provided by useOverlay/useModalOverlay:**

```typescript
// Automatically enabled via useModalOverlay
// Can be disabled with:
useModalOverlay(
  { isKeyboardDismissDisabled: false },  // true to prevent Escape
  state,
  ref
)
```

### 3.4 Tab Behavior

**Default React Aria Behavior:**
- Tab stays within the modal (focus trap)
- Tab from search input → first command item
- Shift+Tab reverses navigation
- Cannot Tab outside modal while open

**Virtual Focus Model (with Autocomplete):**
```typescript
// When using Autocomplete component:
// - DOM focus stays on search input
// - Arrow keys move virtual focus through menu items
// - User can keep typing without losing context
// - aria-activedescendant points to currently focused item
```

---

## 4. Accessibility Features Provided

### 4.1 ARIA Roles and Attributes

**Modal Dialog Structure:**
```
div[role="dialog" aria-modal="true" aria-labelledby="title-id"]
  h2[id="title-id"] Command Palette
  input[role="searchbox"]
  div[role="menu" or "listbox"]
    div[role="menuitem" or "option" aria-selected="true"]
```

**Autocomplete Pattern:**
```
input[role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="menu-id" aria-activedescendant="item-1"]
div[id="menu-id" role="menu"]
  div[id="item-1" role="menuitem" aria-selected="true"]
```

### 4.2 Screen Reader Announcements

**Automatic Announcements via Live Regions:**

React Aria creates hidden `aria-live` regions that announce:

1. **When palette opens:**
   - "Command Palette dialog opened"
   - Number of available commands

2. **When user types:**
   - Command count updates
   - Current filter state

3. **When user navigates:**
   - Focused command name and description
   - Command index/total (e.g., "1 of 15")

4. **When user selects:**
   - Command execution confirmation

**Platform-Specific Behavior:**
- VoiceOver (macOS/iOS): Gets detailed announcements
- NVDA/JAWS (Windows): Gets essential information
- Prevents duplicate announcements across platforms

### 4.3 Semantic HTML Structure

**Benefits of React Aria structure:**
- Dialog is semantically marked as modal
- Search input has proper `role="searchbox"`
- Menu/list properly structured with roles
- Labels and descriptions properly associated
- Disabled states marked with `aria-disabled`

### 4.4 Keyboard Accessibility Standards

React Aria hooks implement WAI-ARIA Authoring Practices Guide (APG) standards:

**Dialog Pattern:**
- ✅ Opens with focus on first input
- ✅ Escape closes dialog
- ✅ Focus trapped within dialog
- ✅ Focus restored to trigger
- ✅ Click outside closes (if dismissable)

**Menu Pattern:**
- ✅ Arrow keys navigate
- ✅ Enter/Space activates
- ✅ Escape closes
- ✅ Home/End jump to boundaries
- ✅ Type-ahead search

**Autocomplete Pattern:**
- ✅ Input has role="combobox"
- ✅ aria-expanded indicates popup state
- ✅ aria-activedescendant shows focus
- ✅ Virtual focus model
- ✅ Filtering and selection

### 4.5 Focus Management Best Practices

**Automatic by React Aria:**
- Focus moves to first input when modal opens
- Focus contained within modal (tab trap)
- Focus restored to trigger when modal closes
- Visible focus indicator only for keyboard
- Respects system settings for prefers-reduced-motion

---

## 5. Comparison with Current cmdk Implementation

| Feature | Current cmdk | React-Aria Hook(s) | Implementation Notes |
|---------|-------------|-------------------|-------|
| **Modal Overlay** | createPortal + custom CSS | useModalOverlay + useDialog | React Aria handles focus trap, scroll prevention, aria-hidden |
| **Backdrop/Underlay** | Manual div styling | useOverlay (underlayProps) | React Aria provides proper structure |
| **Search Input** | Command.Input (filtered via cmdk) | useSearchField | React Aria provides accessibility, clear button handling |
| **Filtering/Ranking** | cmdk's built-in algorithm | Custom useMemo + useFilter | React Aria provides useFilter utility, but ranking is manual |
| **Menu Container** | Command.List (cmdk) | useListBox + useListState | React Aria provides full keyboard navigation |
| **Menu Items** | Command.Item (cmdk) | useOption or useMenuItem | React Aria handles selection, focus, disabled states |
| **Grouping/Sections** | Command.Group | useListState with sections | React Aria handles grouped rendering |
| **Keyboard Navigation** | Built into cmdk | useMenu / useListBox | React Aria provides arrow keys, type-ahead, Home/End |
| **Arrow Key Navigation** | Automatic in cmdk | Automatic in useMenu / useListBox | Same behavior as cmdk |
| **Enter to Execute** | Automatic in cmdk | Custom onAction handler | Need to implement execution logic |
| **Escape to Close** | Automatic in cmdk | Automatic in useModalOverlay | Same as cmdk |
| **Cmd+K Global Shortcut** | Manual useEffect | Manual useEffect | Same implementation needed |
| **Focus Trap** | Manual via event handling | Built into useModalOverlay | React Aria automatic |
| **Focus Restoration** | Manual tracking | Built into useModalOverlay | React Aria automatic |
| **Loading States** | Manual state management | Manual state management | Same approach needed |
| **Click Outside Close** | Manual event listener | useOverlay (isDismissable) | React Aria automatic |
| **Body Scroll Prevention** | document.body.style.overflow | Automatic in useModalOverlay | React Aria automatic |
| **ARIA Roles** | Manual (role="dialog") | Automatic via hooks | React Aria applies proper roles |
| **aria-label** | Manual | Automatic via hooks | React Aria applies from props |
| **aria-selected** | Manual className | Automatic via useOption/useMenuItem | React Aria state management |
| **aria-disabled** | Manual | Automatic for disabled items | React Aria applies automatically |
| **Live Regions** | Not included | Automatic in useComboBox/Menu | React Aria creates hidden live regions |
| **Type-Ahead Search** | Built into cmdk | Automatic in useMenu/useListBox | Same search behavior as cmdk |
| **Disabled Items** | Command.Item disabled prop | useOption/useMenuItem isDisabled | React Aria handles focus skipping |
| **Screen Reader Announcements** | Basic from HTML structure | Enhanced via live regions | React Aria provides detailed announcements |
| **Focus Indicators** | Manual :focus styles | useFocusRing (keyboard only) | React Aria provides intelligent focus visibility |
| **Icon Support** | Manual via React nodes | Manual via React nodes | Same custom implementation |
| **Description Text** | Manual via Command.Item children | Manual via component children | Same custom implementation |
| **Shortcuts/Badges** | Manual via React nodes | Manual via component children | Same custom implementation |
| **Categories** | Via Command.Group | Via ListBox sections or manual grouping | React Aria components handle structure |
| **Empty State** | Command.Empty component | Custom render logic | Manual implementation needed |
| **Performance** | Virtual scrolling possible | isVirtualized prop in useListBox | React Aria supports virtualization |

**Key Differences Summary:**

1. **Automatic vs Manual:** React Aria provides more automatic ARIA handling
2. **Focus Management:** React Aria eliminates manual focus event listeners
3. **State Management:** React Aria state hooks are separate from behavior hooks
4. **Styling:** React Aria provides no default styles (like cmdk), requiring custom CSS
5. **Live Regions:** React Aria automatically creates them; cmdk relies on HTML structure
6. **Breaking Changes:** Search ranking algorithm would need to be re-implemented

---

## 6. Implementation Considerations

### 6.1 Functionality Completeness

**What React Aria Provides (✅):**
- Modal dialog with proper ARIA semantics
- Focus trapping and restoration
- Keyboard navigation (arrow keys, type-ahead)
- List/menu selection patterns
- Search field with accessibility
- Proper screen reader announcements
- Escape key dismissal
- Click-outside dismissal
- Proper ARIA attributes on all elements
- Focus visibility management
- Disabled item handling

**What Requires Custom Implementation (⚠️):**
- Search ranking algorithm (the "smart search" from current implementation)
- Command execution logic
- Category grouping and sorting
- Loading state UI updates
- Custom styling and layout
- Shortcut display (badges)
- Icon rendering
- Description text rendering
- Command action callbacks
- Empty state UI

### 6.2 Bundle Size Implications

**Current Approach (cmdk):**
- cmdk: ~2-3KB (minified + gzipped)
- React Aria hooks (if only using core hooks):
  - @react-aria/dialog: ~2KB
  - @react-aria/overlays: ~3KB
  - @react-aria/listbox: ~3KB
  - @react-stately/list: ~2KB
  - @react-aria/interactions: ~1KB
  - **Total: ~10-12KB (if used modularly)**

**Important Note:** You likely won't need all React Aria packages. A command palette could be built with a subset. Additionally, if already using react-aria elsewhere, the marginal cost is minimal.

### 6.3 Learning Curve and Integration Effort

**React Aria Integration Difficulty: Medium**

**Why Medium?**
- Hooks are well-documented
- Clear separation of concerns (behavior vs styling)
- Required state management hooks from @react-stately
- Need to understand collection patterns
- Keyboard event handling is different from cmdk

**Integration Effort Estimate:**
- Reading documentation: 2-3 hours
- Understanding hook composition: 1-2 hours
- Initial implementation: 4-6 hours
- Testing accessibility: 2-3 hours
- Refinement and optimization: 2-3 hours
- **Total: 11-17 hours for full migration**

### 6.4 Complexity Trade-offs

**Advantages of React Aria:**
- ✅ Fine-grained control over every aspect
- ✅ Integrates with existing react-aria usage in project
- ✅ Automatically updated with React Aria improvements
- ✅ Better accessibility out of the box
- ✅ No breaking changes from library updates
- ✅ Can use react-aria-components for pre-built versions

**Disadvantages of React Aria:**
- ❌ More hooks to manage initially
- ❌ More state management code needed
- ❌ Styling is 100% custom (no default UI)
- ❌ Breaking changes to cmdk's search algorithm
- ❌ Requires understanding multiple state sources
- ❌ More verbose than cmdk's Command component approach

### 6.5 CSS-in-JS Integration

**Current Implementation:** Uses Tailwind CSS classes

**With React Aria:**
- Same Tailwind CSS approach works fine
- Hooks provide className hooks (e.g., from useFocusRing)
- Can use `isFocused`, `isSelected`, `isDisabled` for conditional classes
- No style injection needed

**Example:**
```typescript
const { isFocusVisible, focusProps } = useFocusRing();

return (
  <div
    {...focusProps}
    className={cn(
      'px-3 py-2.5 rounded-md transition-colors',
      isFocusVisible && 'ring-2 ring-primary',
      'hover:bg-gray-100'
    )}
  >
    {/* Content */}
  </div>
);
```

---

## 7. Example Hook Integration Patterns

### 7.1 Complete useDialog Integration Pattern

```typescript
import { useRef } from 'react';
import { useDialog } from '@react-aria/dialog';
import { useModalOverlay } from '@react-aria/overlays';
import { useOverlayTriggerState } from '@react-stately/overlays';

function CommandPaletteModal({ isOpen, onOpenChange, children }) {
  const modalRef = useRef(null);
  const state = useOverlayTriggerState({ isOpen, onOpenChange });

  // Combine dialog and modal overlay behavior
  const { dialogProps, titleProps } = useDialog({
    'aria-label': 'Command Palette',
  }, modalRef);

  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable: true },
    state,
    modalRef
  );

  if (!state.isOpen) return null;

  return (
    <div {...underlayProps} className="fixed inset-0 bg-black/50 flex items-start justify-center pt-[20vh]">
      <div
        {...modalProps}
        {...dialogProps}
        ref={modalRef}
        className="relative w-full max-w-xl rounded-lg shadow-2xl bg-white"
      >
        <h2 {...titleProps} className="sr-only">Command Palette</h2>
        {children}
      </div>
    </div>
  );
}

// ARIA Attributes Applied:
// - role="dialog" on modal
// - aria-modal="true" automatically
// - aria-hidden="true" on background
// - aria-labelledby="palette-title"
// - Focus trapped within modal
// - Escape key handled automatically
// - Click outside handled if isDismissable=true
```

### 7.2 useMenu + useMenuItem Integration Pattern

```typescript
import { useRef } from 'react';
import { useMenu, useMenuItem } from '@react-aria/menu';
import { useTreeState } from '@react-stately/tree';

function CommandList({ commands, onSelectCommand }) {
  const state = useTreeState({
    items: commands,
    onSelectionChange: (keys) => {
      const key = [...keys][0];
      const cmd = commands.find(c => c.id === key);
      if (cmd) onSelectCommand(cmd);
    },
  });

  const menuRef = useRef(null);
  const { menuProps } = useMenu(
    {
      'aria-label': 'Commands',
      shouldFocusWrap: true,
      autoFocus: true,
    },
    state,
    menuRef
  );

  return (
    <div {...menuProps} ref={menuRef} className="max-h-[44dvh] overflow-y-auto">
      {[...state.collection].map((item) => (
        <CommandMenuItem
          key={item.key}
          item={item}
          state={state}
        />
      ))}
    </div>
  );
}

function CommandMenuItem({ item, state }) {
  const itemRef = useRef(null);
  const { menuItemProps, isFocused, isSelected } = useMenuItem(
    { key: item.key },
    state,
    itemRef
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div
      {...mergeProps(menuItemProps, focusProps)}
      ref={itemRef}
      className={cn(
        'px-3 py-2.5 flex items-center justify-between cursor-pointer transition-colors',
        isFocused && 'bg-gray-100',
        isFocusVisible && 'ring-2 ring-primary',
        'hover:bg-gray-100',
      )}
    >
      <div className="flex items-center gap-2.5 flex-1">
        {item.icon && <span className="w-4 h-4">{item.icon}</span>}
        <div className="flex-1">
          <div className="text-sm font-medium">{item.label}</div>
          {item.description && (
            <div className="text-sm text-gray-500">{item.description}</div>
          )}
        </div>
      </div>
      {item.shortcut && <kbd className="text-xs">{item.shortcut}</kbd>}
    </div>
  );
}

// ARIA Attributes Applied:
// - role="menu" on container
// - role="menuitem" on items
// - aria-selected="true/false" on items
// - aria-label for menu identification
// - Keyboard navigation (arrow keys, type-ahead)
// - Focus management automatic
// - Selection state automatic
```

### 7.3 useSearchField Integration Pattern

```typescript
import { useRef } from 'react';
import { useSearchField } from '@react-aria/searchfield';
import { useSearchFieldState } from '@react-stately/searchfield';

function PaletteSearchInput({ value, onValueChange }) {
  const state = useSearchFieldState({
    value,
    onChange: onValueChange,
  });

  const inputRef = useRef(null);
  const { inputProps, clearButtonProps } = useSearchField(
    {
      'aria-label': 'Search commands',
      value: state.value,
      onClear: () => {
        state.clear();
        onValueChange('');
      },
    },
    state,
    inputRef
  );

  return (
    <div className="border-b border-gray-200 p-2">
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          {...inputProps}
          ref={inputRef}
          placeholder="Type a command..."
          className={cn(
            'w-full bg-transparent border-none text-gray-900 placeholder:text-gray-400',
            'focus:outline-none focus:ring-0',
            'pl-8 py-2 text-sm',
          )}
        />
        <button
          {...clearButtonProps}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
        >
          ClearIcon
        </button>
      </div>
    </div>
  );
}

// ARIA Attributes Applied:
// - role="searchbox" on input
// - aria-label for identification
// - aria-invalid for validation (if needed)
// - Clear button automatically labeled
// - Enter key handling (onSubmit)
// - Escape key clearing
```

---

## 8. Recommended Migration Path

### Phase 1: Foundation (Days 1-2)
**Objective:** Build modal and search infrastructure

1. **Replace Modal Structure**
   - Remove createPortal usage from current implementation
   - Implement useModalOverlay + useDialog
   - Implement useOverlayTriggerState for open/close
   - Keep existing styling and layout

2. **Replace Search Input**
   - Replace Command.Input with useSearchField
   - Keep existing filtering logic for now
   - Maintain onValueChange callbacks

3. **Validate Changes**
   - Modal opens/closes correctly
   - Search input works with filtering
   - Styling unchanged

### Phase 2: List Navigation (Days 3-4)
**Objective:** Replace cmdk menu with react-aria list

1. **Replace Command.List / Command.Item**
   - Implement useListState for state management
   - Implement useListBox for container
   - Implement useOption for individual items
   - Replace Command.Group with section rendering

2. **Preserve Existing Features**
   - Categories/grouping logic
   - Icon and description rendering
   - Shortcut display
   - Empty state handling

3. **Test Keyboard Navigation**
   - Arrow keys work
   - Enter executes command
   - Escape closes palette
   - Type-ahead search works

### Phase 3: Accessibility Refinement (Days 5-6)
**Objective:** Enhance accessibility beyond current implementation

1. **Add Focus Management**
   - Implement useFocusRing for focus indicators
   - Verify focus trap behavior
   - Test focus restoration

2. **Verify ARIA**
   - Check all roles and attributes in browser dev tools
   - Test with screen readers
   - Verify announcements

3. **Test Keyboard Shortcuts**
   - Cmd+K / Ctrl+K opens palette
   - Escape closes palette
   - All navigation works

### Phase 4: Remove cmdk Dependency (Days 7)
**Objective:** Complete migration

1. **Remove Command Components**
   - Delete imports of `cmdk`
   - Delete Command.* usages
   - Verify all functionality still works

2. **Update Types**
   - Remove cmdk type dependencies
   - Update CommandPaletteProps if needed

3. **Test Complete Flow**
   - Full user journey testing
   - Accessibility testing
   - Performance testing

### Phase 5: Optimization (Optional)
**Objective:** Performance and UX refinements

1. **Add Virtual Scrolling**
   - Use useListBox's `isVirtualized` option
   - For large command lists

2. **Improve Search Ranking**
   - Enhance intelligent ranking from Phase 1
   - Consider adding fuse.js if complex ranking needed

3. **Animation Refinement**
   - Adjust modal animations
   - Item transitions on focus/selection

### Rollback Plan

If issues arise:
1. React Aria and cmdk can coexist temporarily
2. Create feature flag to toggle between implementations
3. Gradual rollout to users
4. Monitor accessibility metrics

---

## 9. Gap Analysis

### Potential Gaps Between cmdk and React Aria

| Feature | Status | Solution |
|---------|--------|----------|
| **Search Ranking Algorithm** | ⚠️ Different implementation | Re-implement current scoring logic as custom hook |
| **Smart Search** | ⚠️ Requires custom logic | Keep existing filtering with useFilter utility |
| **Automatic Menu Item Wrapping** | ✅ Built-in | useMenu's shouldFocusWrap option |
| **Category Grouping** | ✅ Supported | Use section rendering with MenuSection or custom grouping |
| **Keyboard Shortcuts Display** | ✅ Manual render | Continue rendering shortcut badges as child content |
| **Empty State** | ⚠️ Manual implementation | Custom render when collection is empty |
| **Loading States** | ⚠️ Manual implementation | Use isDisabled on items during loading |
| **Typeahead Search** | ✅ Built-in | Automatic with useMenu / useListBox |
| **Mobile Friendly** | ⚠️ Requires consideration | useModalOverlay handles viewport, test on devices |
| **Icon Support** | ✅ Manual render | Continue as child content in items |
| **Descriptions** | ✅ Manual render | Continue as child content in items |

### Recommendations for Gaps

1. **Search Ranking:** Implement as custom `useCommandSearch` hook that matches current cmdk behavior
2. **Empty State:** Add conditional render when `state.collection.size === 0`
3. **Mobile:** Test on actual devices; add touch-friendly padding
4. **Loading:** Use disabled state and visual loading indicator

---

## 10. Success Criteria

### Functional Requirements Met

- [ ] Modal opens with Cmd+K / Ctrl+K
- [ ] Modal closes with Escape or click outside
- [ ] Search filters commands correctly
- [ ] Arrow keys navigate commands
- [ ] Enter executes selected command
- [ ] All categories display correctly
- [ ] Empty state shows appropriate message
- [ ] Loading state prevents execution
- [ ] Icons display in items
- [ ] Descriptions display in items
- [ ] Shortcuts display in items

### Accessibility Requirements Met

- [ ] Modal has role="dialog"
- [ ] Focus trapped in modal
- [ ] Focus restored to trigger
- [ ] All menu items are keyboard accessible
- [ ] Type-ahead search works
- [ ] Screen readers announce commands
- [ ] aria-selected states correct
- [ ] aria-disabled for disabled items
- [ ] Focus ring visible only for keyboard
- [ ] ARIA live regions announce state changes

### Performance Requirements Met

- [ ] No perceptible lag when typing
- [ ] Smooth scrolling with large lists
- [ ] Modal animation smooth
- [ ] Bundle size < 15KB (React Aria core hooks)
- [ ] No memory leaks on open/close

### Testing Requirements Met

- [ ] Unit tests for state management
- [ ] Component tests for keyboard navigation
- [ ] Accessibility audit passing
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Cross-browser testing (Safari, Chrome, Firefox)
- [ ] Mobile testing (iOS Safari, Android Chrome)

---

## 11. Additional Resources

### Official Documentation

- [React Aria Overview](https://react-spectrum.adobe.com/react-aria/)
- [useDialog Documentation](https://react-spectrum.adobe.com/react-aria/useDialog.html)
- [useOverlay Documentation](https://react-spectrum.adobe.com/react-aria/useOverlay.html)
- [useModalOverlay Documentation](https://react-spectrum.adobe.com/react-aria/useModalOverlay.html)
- [useMenu Documentation](https://react-spectrum.adobe.com/react-aria/useMenu.html)
- [useComboBox Documentation](https://react-spectrum.adobe.com/react-aria/useComboBox.html)
- [useSearchField Documentation](https://react-spectrum.adobe.com/react-aria/useSearchField.html)
- [useListBox Documentation](https://react-spectrum.adobe.com/react-aria/useListBox.html)
- [Command Palette Example](https://react-spectrum.adobe.com/react-aria/examples/command-palette.html)
- [Accessibility Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

### Blog Posts & Guides

- [Creating an Accessible Autocomplete Experience](https://react-spectrum.adobe.com/blog/building-a-combobox.html)
- [Building a Button Series](https://react-spectrum.adobe.com/blog/)
- [WAI-ARIA Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)
- [WAI-ARIA Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)
- [WAI-ARIA Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

### Related Libraries

- `@react-stately/*` - State management hooks companion to react-aria
- `react-aria-components` - Pre-built components using react-aria hooks
- `fuse.js` - For advanced fuzzy search ranking (if needed)

---

## Conclusion

React Aria provides a comprehensive, accessibility-first foundation for rebuilding the CommandPalette component. While it requires re-implementing some custom logic (search ranking, command execution), it offers automatic handling of complex accessibility features, focus management, and keyboard navigation that would otherwise require significant manual work.

The migration is feasible within a week's development effort and results in a more maintainable, accessible component that will benefit from React Aria's ongoing improvements and community support. The modular hook-based approach allows for incremental migration if needed, with both libraries coexisting during the transition period.

**Recommendation:** Proceed with phased migration starting with modal and search infrastructure, followed by menu navigation, then accessibility refinements. This approach minimizes risk while allowing continuous validation of functionality.
