# Common UI Patterns

Proven, reusable UI patterns composed with UI Lab components. Use these as blueprints for your own UIs.

---

## Pattern 1: Success Alert (Dismissible)

**When to use**: Confirm successful user actions (form submission, payment, account creation, etc.)

**Semantic Intent**: Communicate positive outcome

**Component Composition**:
- Alert (variant="success")
- Icon (checkmark)
- Title
- Message
- Close button

**Design Rationale**:
- Alert component handles success styling (--success-50 background, --success-300 border, --success-900 text)
- Checkmark icon reinforces visual meaning (color coded)
- Close button allows dismissal
- Light background (50) creates visual separation

**Code Example**:
```tsx
import { Alert } from '@ui-lab/react';
import { XIcon, CheckIcon } from 'lucide-react';

export function SuccessAlert({ title, message, onDismiss }) {
  return (
    <Alert
      variant="success"
      title={title}
      className="flex items-start gap-4 justify-between"
    >
      <div className="flex items-start gap-3">
        <CheckIcon className="w-5 h-5 text-[var(--success-600)] flex-shrink-0 mt-0.5" />
        <p className="text-[var(--success-900)]">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-[var(--success-600)] hover:text-[var(--success-700)] flex-shrink-0"
        aria-label="Dismiss alert"
      >
        <XIcon className="w-5 h-5" />
      </button>
    </Alert>
  );
}
```

**Usage**:
```tsx
<SuccessAlert
  title="Payment Processed"
  message="Your payment of $99.99 has been successfully processed."
  onDismiss={() => setShowAlert(false)}
/>
```

---

## Pattern 2: Form Field with Error State

**When to use**: Validate user input in real-time and show error messages

**Semantic Intent**: Communicate validation error, guide user to correction

**Component Composition**:
- Label
- Input (with error visual state)
- Error message

**Design Rationale**:
- Dark red border (--danger-500) signals problem without relying on color alone
- Error text in danger family matches visual context
- Input state managed via error prop (component handles styling)
- Helper text provides actionable guidance

**Code Example**:
```tsx
import { Input, Label } from '@ui-lab/react';

export function FormFieldWithError({ error, label, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[var(--foreground-900)] font-medium">
        {label}
      </Label>
      <Input
        {...props}
        className={error ? 'border-[var(--danger-500)]' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.name}-error` : undefined}
      />
      {error && (
        <p
          id={`${props.name}-error`}
          className="text-sm text-[var(--danger-700)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}
```

**Usage**:
```tsx
const [error, setError] = useState('');

<FormFieldWithError
  label="Email"
  name="email"
  type="email"
  placeholder="you@example.com"
  error={error || undefined}
  onChange={(e) => {
    setError(!e.target.value.includes('@') ? 'Please enter a valid email' : '');
  }}
/>
```

---

## Pattern 3: Card with Title & Action

**When to use**: Group related content with optional action (edit, delete, etc.)

**Semantic Intent**: Present cohesive content unit with potential action

**Component Composition**:
- Card container
- Header (title + optional action button)
- Content area
- Optional footer

**Design Rationale**:
- Card component handles background (--background-50), border (--foreground-200)
- Action button in secondary variant (low visual emphasis)
- Title uses h3 level typography
- Consistent spacing throughout

**Code Example**:
```tsx
import { Card, Button } from '@ui-lab/react';
import { EditIcon, TrashIcon } from 'lucide-react';

export function ActionCard({ title, description, onEdit, onDelete }) {
  return (
    <Card title={title} className="flex flex-col gap-4">
      <p className="text-[var(--foreground-700)]">{description}</p>

      <div className="flex gap-2 mt-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onEdit}
          className="flex items-center gap-2"
        >
          <EditIcon className="w-4 h-4" />
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          className="flex items-center gap-2"
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </Card>
  );
}
```

**Usage**:
```tsx
<ActionCard
  title="Team Settings"
  description="Manage team members, roles, and permissions."
  onEdit={() => navigate('/team/settings')}
  onDelete={() => handleDeleteTeam()}
/>
```

---

## Pattern 4: Modal Dialog with Form

**When to use**: Collect user input without leaving current page context (confirmation, settings, etc.)

**Semantic Intent**: Focus user attention on single task, request explicit confirmation

**Component Composition**:
- Dialog overlay
- Dialog header (title + close button)
- Dialog content (form fields)
- Dialog footer (action buttons)

**Design Rationale**:
- Dialog creates modal context (overlays with backdrop)
- Form fields use consistent spacing and error handling
- Action buttons aligned to right (cancel, confirm order)
- Semantic button colors (secondary for cancel, primary for confirm)

**Code Example**:
```tsx
import { Dialog, Button, Input, Label, Textarea } from '@ui-lab/react';
import { XIcon } from 'lucide-react';

export function FeedbackModal({ open, onClose, onSubmit }) {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--foreground-200)]">
          <h2 className="text-xl font-semibold text-[var(--foreground-950)]">
            Send Feedback
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--foreground-500)] hover:text-[var(--foreground-700)]"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form
          className="flex flex-col gap-4 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ feedback, email });
            onClose();
          }}
        >
          <div className="flex flex-col gap-2">
            <Label className="text-[var(--foreground-900)]">Email</Label>
            <Input
              type="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-[var(--foreground-900)]">Feedback</Label>
            <Textarea
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 justify-end mt-2">
            <Button
              variant="secondary"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Feedback
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
```

**Usage**:
```tsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Send Feedback</Button>
  <FeedbackModal
    open={open}
    onClose={() => setOpen(false)}
    onSubmit={(data) => {
      console.log('Feedback submitted:', data);
    }}
  />
</>
```

---

## Pattern 5: Status Badge (Inline)

**When to use**: Show status or category inline within lists or tables (pending, active, completed, etc.)

**Semantic Intent**: Quickly communicate status at a glance

**Component Composition**:
- Badge component with semantic variant
- Icon (optional)
- Status text

**Design Rationale**:
- Badge component handles semantic styling
- Variant determines color family (success=green, danger=red, warning=orange, info=blue)
- Icon reinforces meaning without relying on color alone
- Badge is self-contained and space-efficient

**Code Example**:
```tsx
import { Badge } from '@ui-lab/react';
import { CheckCircleIcon, ClockIcon, XCircleIcon, AlertCircleIcon } from 'lucide-react';

const statusConfig = {
  completed: {
    variant: 'success',
    icon: CheckCircleIcon,
    label: 'Completed',
  },
  pending: {
    variant: 'warning',
    icon: ClockIcon,
    label: 'Pending',
  },
  failed: {
    variant: 'danger',
    icon: XCircleIcon,
    label: 'Failed',
  },
  warning: {
    variant: 'warning',
    icon: AlertCircleIcon,
    label: 'Warning',
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
```

**Usage**:
```tsx
<div className="flex gap-2">
  <StatusBadge status="completed" />
  <StatusBadge status="pending" />
  <StatusBadge status="failed" />
</div>
```

---

## Pattern 6: Confirmation Dialog (Delete)

**When to use**: Ask for explicit confirmation before destructive action

**Semantic Intent**: Protect against accidental data loss

**Component Composition**:
- Dialog with prominent warning styling
- Warning icon or message
- Item being deleted (shown for context)
- Cancel and delete buttons (danger button on right)

**Design Rationale**:
- Danger styling (red) signals destructive action
- Icon + text reinforces severity
- Item preview prevents confusion ("Delete which item?")
- Cancel button on left (safe default), delete on right
- Delete button uses danger variant (visually distinct)

**Code Example**:
```tsx
import { Dialog, Button, Alert } from '@ui-lab/react';
import { TrashIcon } from 'lucide-react';

export function DeleteConfirmation({ item, open, onCancel, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <div className="w-full max-w-sm">
        <div className="p-6 flex flex-col gap-4">
          {/* Warning */}
          <Alert variant="danger">
            <div className="flex items-start gap-3">
              <TrashIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[var(--danger-900)]">
                  Delete this item?
                </p>
                <p className="text-sm text-[var(--danger-800)] mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </Alert>

          {/* Item Preview */}
          <div className="bg-[var(--background-100)] p-4 rounded">
            <p className="text-sm text-[var(--foreground-600)]">Item to delete:</p>
            <p className="font-medium text-[var(--foreground-950)]">{item.name}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end mt-4">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={onConfirm}
              className="flex items-center gap-2"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
```

**Usage**:
```tsx
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [itemToDelete, setItemToDelete] = useState(null);

const handleDelete = (item) => {
  setItemToDelete(item);
  setDeleteDialogOpen(true);
};

<>
  <DeleteConfirmation
    item={itemToDelete}
    open={deleteDialogOpen}
    onCancel={() => setDeleteDialogOpen(false)}
    onConfirm={() => {
      // Perform deletion
      setDeleteDialogOpen(false);
    }}
  />
</>
```

---

## Pattern 7: Loading State / Skeleton

**When to use**: Show placeholder while loading content (especially in cards, lists, grids)

**Semantic Intent**: Indicate loading progress without blocking UI

**Component Composition**:
- Card or container
- Skeleton elements (shimmer effect)
- Optional loading text

**Design Rationale**:
- Skeleton mimics real content shape (heading, body, button)
- Subtle animation indicates loading (not stuck)
- Light colors (background-200) distinguish from real content
- Maintains layout (prevents layout shift when real content loads)

**Code Example**:
```tsx
import { Card } from '@ui-lab/react';

export function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      {/* Title skeleton */}
      <div className="h-6 bg-[var(--background-300)] rounded w-3/4 mb-4" />

      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-[var(--background-300)] rounded" />
        <div className="h-4 bg-[var(--background-300)] rounded w-5/6" />
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-[var(--background-300)] rounded mt-4 w-20" />
    </Card>
  );
}

// Or as a full list
export function SkeletonList({ count = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
```

**Usage**:
```tsx
{loading ? (
  <SkeletonList count={3} />
) : (
  <div>
    {items.map(item => <ItemCard key={item.id} item={item} />)}
  </div>
)}
```

---

## Pattern 8: Tabs with Content Panels

**When to use**: Organize content into sections without page navigation (settings tabs, product details tabs, etc.)

**Semantic Intent**: Allow user to switch between related content sections

**Component Composition**:
- Tabs component
- Tab list (tab buttons)
- Tab indicators (active state)
- Tab panels (content)

**Design Rationale**:
- Tabs component manages state and a11y (keyboard navigation, ARIA)
- Active indicator uses accent color (brand identity)
- Content updates without page reload
- Keyboard navigation for accessibility

**Code Example**:
```tsx
import { Tabs } from '@ui-lab/react';

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: UserIcon },
    { id: 'security', label: 'Security', icon: ShieldIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      {/* Tab List */}
      <div className="flex border-b border-[var(--foreground-200)]">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                isActive
                  ? 'text-[var(--accent-600)] border-b-2 border-[var(--accent-600)]'
                  : 'text-[var(--foreground-600)] hover:text-[var(--foreground-900)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'account' && <AccountSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
      </div>
    </Tabs>
  );
}
```

---

## Pattern 9: Button Group / Split Button

**When to use**: Group related actions together (primary action + dropdown options)

**Semantic Intent**: Present related actions while maintaining visual clarity

**Component Composition**:
- Primary button
- Split divider (optional)
- Dropdown trigger button
- Dropdown menu

**Design Rationale**:
- Primary button handles main action (prominent)
- Secondary button handles alternatives (less prominent)
- Consistent spacing and sizing
- Dropdown menu appears on demand (doesn't clutter UI)

**Code Example**:
```tsx
import { Button, Menu, MenuItem } from '@ui-lab/react';
import { ChevronDownIcon } from 'lucide-react';

export function ActionButtonGroup({ onSave, onSaveDraft, onCancel }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex gap-2">
      {/* Primary action */}
      <Button variant="primary" onClick={onSave}>
        Save Changes
      </Button>

      {/* Dropdown alternatives */}
      <Menu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <button
          className="px-3 py-2 text-[var(--accent-600)] hover:bg-[var(--background-100)] rounded"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <ChevronDownIcon className="w-4 h-4" />
        </button>

        <div className="absolute mt-2">
          <MenuItem onClick={onSaveDraft}>Save as Draft</MenuItem>
          <MenuItem onClick={onCancel}>Cancel</MenuItem>
        </div>
      </Menu>
    </div>
  );
}
```

---

## Pattern 10: Empty State

**When to use**: Show meaningful message when list/grid is empty

**Semantic Intent**: Provide context and next steps instead of blank screen

**Component Composition**:
- Illustration or icon
- Heading
- Description
- Call-to-action button

**Design Rationale**:
- Icon/illustration explains state visually
- Heading communicates what's missing
- Description provides context ("No results found", "Start by creating...")
- CTA button guides user to next action
- Uses accent color for button (encourage action)

**Code Example**:
```tsx
import { Button } from '@ui-lab/react';
import { PlusIcon, InboxIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon = InboxIcon,
  title,
  description,
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon */}
      <div className="mb-4">
        <Icon
          className="w-16 h-16 text-[var(--foreground-400)]"
          strokeWidth={1.5}
        />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-[var(--foreground-900)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--foreground-600)] text-center max-w-sm mb-6">
        {description}
      </p>

      {/* Action */}
      {onAction && (
        <Button
          variant="primary"
          onClick={onAction}
          className="flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
```

**Usage**:
```tsx
{items.length === 0 ? (
  <EmptyState
    icon={DocumentIcon}
    title="No Documents"
    description="Create your first document to get started."
    actionLabel="Create Document"
    onAction={() => navigate('/create')}
  />
) : (
  <DocumentList items={items} />
)}
```

---

## Integration Notes

### Using These Patterns

1. Copy the pattern code into your project
2. Update imports to match your component library
3. Customize colors using design/tokens.md reference
4. Ensure all colors use semantic CSS variables
5. Test in both light and dark modes

### Extending Patterns

When creating new patterns:

1. **Start with semantic intent** - What does this UI communicate?
2. **Choose UI Lab components** - Which components fit?
3. **Apply design tokens** - Use colors from tokens.md
4. **Test accessibility** - Verify contrast and keyboard navigation
5. **Document reasoning** - Why these choices?

### Related Files

- See **design/guidelines.md** for design philosophy
- See **design/tokens.md** for color and spacing reference
- See **references/component-apis.md** for component details
- See **design/component-selection.md** for choosing components
