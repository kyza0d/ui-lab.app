# Component Selection Guide

Systematic decision-making for choosing the right UI Lab component for any UI need.

## Decision Tree: "What Should I Use?"

Start at the top and follow the branches based on your UI need:

```
What do you need to build?
│
├─ Is it clickable?
│  ├─ Yes, main action → Button (variant="primary")
│  ├─ Yes, secondary action → Button (variant="secondary")
│  ├─ Yes, destructive action → Button (variant="danger")
│  ├─ Yes, subtle action → Button (variant="ghost")
│  ├─ Yes, text link → Button (variant="ghost") or Link
│  └─ No → Continue below
│
├─ Is it a form input?
│  ├─ Single line text → Input (type="text")
│  ├─ Email with validation → Input (type="email")
│  ├─ Password field → Input (type="password")
│  ├─ Number input → Input (type="number")
│  ├─ Multi-line text → Textarea
│  ├─ Choose one option → Radio or Select
│  ├─ Choose multiple → Checkbox (group)
│  ├─ Toggle on/off → Checkbox
│  ├─ Date picker → Input (type="date")
│  ├─ Time picker → Input (type="time")
│  └─ Search field → Input (type="search") or Search component
│
├─ Is it a message or feedback?
│  ├─ Success confirmation → Alert (variant="success")
│  ├─ Error message → Alert (variant="danger")
│  ├─ Warning caution → Alert (variant="warning")
│  ├─ Informational → Alert (variant="info") or Badge
│  ├─ Status indicator → Badge
│  └─ Temporary notification → Toast
│
├─ Is it a container or surface?
│  ├─ Card for grouped content → Card
│  ├─ Dialog/modal overlay → Dialog or Modal
│  ├─ Expandable section → Accordion
│  └─ Floating tooltip → Tooltip
│
├─ Is it a layout?
│  ├─ Flexible 1D layout → Flex
│  ├─ 2D grid layout → Grid
│  ├─ Navigation bar → Navigation
│  ├─ Sidebar → Sidebar or Flex
│  └─ List container → Flex (column)
│
├─ Is it navigation?
│  ├─ Horizontal tabs → Tabs
│  ├─ Dropdown menu → Menu
│  ├─ Navigation bar → Navigation
│  └─ Breadcrumb trail → Breadcrumb
│
└─ Is it complex/composite?
   ├─ Combo box (input + dropdown) → Combobox
   ├─ Date range picker → DateRangePicker
   ├─ Multi-select with search → MultiSelect
   └─ File upload → FileInput
```

## Component Quick Reference

Quick lookup table for common use cases. Find what you need, then check the detailed section below.

### Input Components

| Need | Use | Key Props | Best For |
|------|-----|-----------|----------|
| Text input | Input | type="text" | Names, general text |
| Email | Input | type="email" | Email validation |
| Password | Input | type="password" | Secure entry |
| Number | Input | type="number" | Quantities, ages |
| Telephone | Input | type="tel" | Phone numbers |
| URL | Input | type="url" | Websites |
| Search | Input | type="search" | Search fields |
| Multi-line | Textarea | rows, placeholder | Comments, descriptions |
| Single choice | Radio | name, value | Options (3-6 items) |
| Multiple choice | Checkbox | name, value | Preferences, filters |
| Many options | Select | options array | Dropdowns (6+ items) |
| Date | Input | type="date" | Date pickers |
| Date range | DateRangePicker | startDate, endDate | Date ranges |
| Time | Input | type="time" | Time selection |
| Toggle | Checkbox | - | On/off states |
| File upload | FileInput | multiple, accept | File selection |
| Search + filter | Combobox | options, filterable | Search with results |

### Button Components

| Need | Use | Variant | Color | When |
|------|-----|---------|-------|------|
| Primary action | Button | primary | accent-600 | Main CTA, first action |
| Secondary action | Button | secondary | background-600 | Alternative action |
| Destructive action | Button | danger | danger-700 | Delete, destructive ops |
| Ghost/link action | Button | ghost | transparent | Tertiary, low emphasis |
| Icon button | Button | ghost | varies | Compact, icon-only |
| Link appearance | Button | ghost | accent-600 | Inline links |
| Form submit | Button | primary | accent-600 | Form submission |
| Form cancel | Button | secondary | background-600 | Cancel/close |

### Feedback Components

| Need | Use | Variant | When |
|------|-----|---------|------|
| Success message | Alert | success | Operation succeeded |
| Error message | Alert | danger | Something failed |
| Warning message | Alert | warning | Caution needed |
| Info message | Alert | info | Helpful information |
| Status badge | Badge | varies | Inline status |
| Temporary notification | Toast | varies | Quick notifications |
| Loading indicator | Spinner | - | Processing |
| Progress indication | ProgressBar | - | Upload, download |

### Container Components

| Need | Use | Props | When |
|------|-----|-------|------|
| Grouped content | Card | title, variant | Content grouping |
| Modal dialog | Dialog | open, onOpenChange | Focus user attention |
| Expandable section | Accordion | items | Save space, organize |
| Tooltip | Tooltip | content | Contextual help |
| Popover | Popover | content | Floating content |
| Drawer | Drawer | open, onOpenChange | Side panel |

### Layout Components

| Need | Use | Props | When |
|------|-----|-------|------|
| Flexible layout | Flex | direction, gap, justify, align | Flexible arrangements |
| Grid layout | Grid | columns, gap | Fixed columns |
| Stack (vertical) | Flex | direction="column" | Vertical stacking |
| Stack (horizontal) | Flex | direction="row" | Horizontal stacking |
| Scrollable | Scroll | direction, size | Long content |
| Spacing container | - | padding, margin | Padding/margins |

### Navigation Components

| Need | Use | Props | When |
|------|-----|-------|------|
| Tabs | Tabs | value, onValueChange | Switch sections |
| Menu | Menu | items, onSelect | Dropdown actions |
| Navigation bar | Navigation | items, activeItem | Page navigation |
| Breadcrumb | Breadcrumb | items | Navigation history |
| Pagination | Pagination | total, current | Page navigation |

---

## Detailed Component Sections

### Button Variants & Semantic Meaning

#### Primary Button
**Variant**: `variant="primary"`
**Color**: `bg-[var(--accent-600)]` text: `text-[var(--foreground-50)]`
**When to use**: Main call-to-action, most important action on screen
**Example**: "Submit Form", "Save Changes", "Create New"

```tsx
<Button variant="primary" onClick={handleSubmit}>
  Submit Form
</Button>
```

#### Secondary Button
**Variant**: `variant="secondary"`
**Color**: `bg-[var(--background-600)]` text: `text-[var(--foreground-50)]`
**When to use**: Alternative action, less important than primary
**Example**: "Cancel", "Back", "Skip"

```tsx
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>
```

#### Danger Button
**Variant**: `variant="danger"`
**Color**: `bg-[var(--danger-700)]` text: `text-[var(--foreground-50)]`
**When to use**: Destructive actions, delete/remove operations
**Example**: "Delete Account", "Remove Item", "Clear All"

```tsx
<Button variant="danger" onClick={handleDelete}>
  Delete Account
</Button>
```

#### Ghost Button
**Variant**: `variant="ghost"`
**Color**: transparent with border or text color
**When to use**: Tertiary actions, low emphasis, links that look like buttons
**Example**: Close button, secondary options, icon buttons

```tsx
<Button variant="ghost" size="sm" onClick={handleClose}>
  Close
</Button>
```

---

### Alert Variants & Semantic Colors

#### Success Alert
**Variant**: `variant="success"`
**Colors**: Background `--success-50`, Text `--success-900`, Border `--success-300`
**When to use**: Successful operations, confirmations, approved states
**Pattern**: Use with checkmark icon

```tsx
<Alert variant="success" title="Success">
  Your changes have been saved successfully.
</Alert>
```

#### Danger Alert
**Variant**: `variant="danger"`
**Colors**: Background `--danger-50`, Text `--danger-900`, Border `--danger-300`
**When to use**: Errors, failed operations, problems
**Pattern**: Use with X or alert icon

```tsx
<Alert variant="danger" title="Error">
  Unable to process your request. Please try again.
</Alert>
```

#### Warning Alert
**Variant**: `variant="warning"`
**Colors**: Background `--warning-50`, Text `--warning-900`, Border `--warning-300`
**When to use**: Warnings, cautions, attention needed
**Pattern**: Use with warning triangle or exclamation icon

```tsx
<Alert variant="warning" title="Warning">
  This action cannot be undone. Please proceed with caution.
</Alert>
```

#### Info Alert
**Variant**: `variant="info"`
**Colors**: Background `--info-50`, Text `--info-900`, Border `--info-300`
**When to use**: Information, tips, help text
**Pattern**: Use with info circle or light bulb icon

```tsx
<Alert variant="info" title="Information">
  Tip: You can use keyboard shortcuts to speed up your workflow.
</Alert>
```

---

### Badge Variants

#### Default Badge
**Variant**: `variant="default"`
**When to use**: Neutral status, labels
**Colors**: Background `--background-200`, Text `--foreground-900`

```tsx
<Badge variant="default">In Progress</Badge>
```

#### Success Badge
**Variant**: `variant="success"`
**When to use**: Positive status, approved, completed
**Colors**: Background `--success-200`, Text `--success-900`

```tsx
<Badge variant="success">Completed</Badge>
```

#### Danger Badge
**Variant**: `variant="danger"`
**When to use**: Error status, failed, critical
**Colors**: Background `--danger-200`, Text `--danger-900`

```tsx
<Badge variant="danger">Failed</Badge>
```

#### Warning Badge
**Variant**: `variant="warning"`
**When to use**: Pending, caution, attention needed
**Colors**: Background `--warning-200`, Text `--warning-900`

```tsx
<Badge variant="warning">Pending</Badge>
```

#### Info Badge
**Variant**: `variant="info"`
**When to use**: Information, informational, neutral
**Colors**: Background `--info-200`, Text `--info-900`

```tsx
<Badge variant="info">New Feature</Badge>
```

---

### Card Component

**When to use**: Group related content, create visual boundaries, organize information

**Props**:
- `title` (string) - Card heading
- `variant` (enum) - 'default', 'elevated', 'outlined'
- `children` - Card content

**Variants**:
- `default` - Simple card with background
- `elevated` - Floating effect
- `outlined` - Border-only style

```tsx
// Simple card
<Card title="User Profile">
  <p>User information here</p>
</Card>

// Elevated card
<Card title="Featured Content" variant="elevated">
  <p>Important content</p>
</Card>

// Outlined card
<Card title="Information" variant="outlined">
  <p>Reference information</p>
</Card>
```

---

### Input Component

**Props**:
- `type` - 'text', 'email', 'password', 'number', 'tel', 'url', 'date', etc.
- `placeholder` - Placeholder text
- `value` - Current value
- `onChange` - Change handler
- `disabled` - Disabled state
- `error` - Error state (visual indicator)

**Best Practices**:
1. Always pair with `<label>` for accessibility
2. Provide meaningful placeholders
3. Use appropriate `type` for validation
4. Show error messages below the field

```tsx
// Basic text input
<Input type="text" placeholder="Enter your name" />

// Email with validation
<Input type="email" placeholder="your@example.com" />

// Number input
<Input type="number" placeholder="Quantity" min="1" max="100" />

// Error state
<Input
  type="email"
  error
  placeholder="your@example.com"
  aria-invalid="true"
/>
```

---

### Select Component

**When to use**: Choose one option from a list (6+ items recommended)

**Props**:
- `options` - Array of options
- `value` - Selected value
- `onChange` - Change handler
- `disabled` - Disabled state
- `placeholder` - Placeholder text

**Better than**: Radio if you have many options (saves space)

```tsx
const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
];

<Select
  options={options}
  value={country}
  onChange={setCountry}
  placeholder="Select a country"
/>
```

---

### Checkbox & Radio Components

#### Checkbox (Single)
**When to use**: Toggle on/off, opt-in/opt-out

```tsx
<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={setAgreed}
/>
```

#### Checkbox (Group)
**When to use**: Select multiple items from a list

```tsx
const [selected, setSelected] = useState([]);

const options = [
  { id: 'email', label: 'Email notifications' },
  { id: 'push', label: 'Push notifications' },
  { id: 'sms', label: 'SMS notifications' },
];

{options.map(option => (
  <Checkbox
    key={option.id}
    label={option.label}
    checked={selected.includes(option.id)}
    onChange={(checked) => {
      if (checked) {
        setSelected([...selected, option.id]);
      } else {
        setSelected(selected.filter(id => id !== option.id));
      }
    }}
  />
))}
```

#### Radio (Group)
**When to use**: Select one option from a list (3-6 items)

```tsx
const [selected, setSelected] = useState('option1');

const options = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' },
];

{options.map(option => (
  <Radio
    key={option.id}
    name="options"
    value={option.id}
    label={option.label}
    checked={selected === option.id}
    onChange={() => setSelected(option.id)}
  />
))}
```

---

### Tabs Component

**When to use**: Switch between related content sections

**Props**:
- `value` - Active tab ID
- `onValueChange` - Handler for tab change
- `tabs` - Array of tab definitions

```tsx
const [activeTab, setActiveTab] = useState('account');

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
];

<Tabs value={activeTab} onValueChange={setActiveTab}>
  {tabs.map(tab => (
    <TabButton key={tab.id} id={tab.id}>
      {tab.label}
    </TabButton>
  ))}
  {tabs.map(tab => (
    <TabPanel key={tab.id} id={tab.id}>
      {/* Content for this tab */}
    </TabPanel>
  ))}
</Tabs>
```

---

### Dialog Component

**When to use**: Modal overlay requiring user focus (confirmation, form, etc.)

**Props**:
- `open` - Dialog open state
- `onOpenChange` - Handler for open state
- `title` - Dialog title
- `children` - Dialog content

```tsx
const [open, setOpen] = useState(false);

<Dialog open={open} onOpenChange={setOpen}>
  <div className="p-6">
    <h2>Confirm Action</h2>
    <p>Are you sure you want to proceed?</p>
    <div className="flex gap-2 mt-4">
      <Button variant="secondary" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => {
        // Perform action
        setOpen(false);
      }}>
        Confirm
      </Button>
    </div>
  </div>
</Dialog>
```

---

## Selection Flowcharts by Context

### E-Commerce Product Form

```
Product name → Input (type="text")
Description → Textarea
Category → Select (many categories)
Price → Input (type="number")
In stock → Checkbox
Tags → Checkbox (group)
Status → Radio (draft/published/archived)
```

### Settings Page

```
Layout → Tabs (General, Security, Notifications)
Option groups → Card (one per section)
Toggle settings → Checkbox
Dropdown settings → Select
Action buttons → Button (Save, Reset, Delete)
```

### Data Table

```
Row selection → Checkbox (group)
Column headers → Text (no component)
Data cells → Text (no component)
Actions → Button (variant="ghost", size="sm")
Row status → Badge
Empty state → EmptyState component
Loading state → Skeleton components
```

### Form with Validation

```
Text fields → Input with Label + error message
Multi-select → Checkbox group
Single select → Radio group or Select
File upload → FileInput
Submit → Button (variant="primary")
Cancel → Button (variant="secondary")
Errors → Alert (variant="danger")
Success → Alert (variant="success")
```

---

## Common Mistakes to Avoid

### ❌ Don't: Use buttons for everything
```tsx
// WRONG - Using button for navigation
<Button onClick={() => navigate('/page')}>Go to Page</Button>

// RIGHT - Use Link or Button with Link behavior
<Link href="/page">Go to Page</Link>
```

### ❌ Don't: Use Select for fewer than 5 items
```tsx
// WRONG - Select for 3 items
<Select options={['Yes', 'No', 'Maybe']} />

// RIGHT - Use Radio
<Radio value="yes" label="Yes" />
<Radio value="no" label="No" />
<Radio value="maybe" label="Maybe" />
```

### ❌ Don't: Mix radio and checkbox
```tsx
// WRONG - Can select multiple with radio (confusing)
<Radio name="options" value="1" /> Selected
<Radio name="options" value="2" /> Also selected?

// RIGHT - Use Checkbox for multiple, Radio for single
<Checkbox label="Option 1" />
<Checkbox label="Option 2" />
```

### ❌ Don't: Use wrong button variant
```tsx
// WRONG - Secondary button for important action
<Button variant="secondary">Delete Account</Button>

// RIGHT - Use danger for destructive actions
<Button variant="danger">Delete Account</Button>
```

### ❌ Don't: Forget labels on inputs
```tsx
// WRONG - Input without label
<Input placeholder="Your name" />

// RIGHT - Always include label
<Label>Your Name</Label>
<Input placeholder="Enter your name" />
```

---

## Summary: Selection Priority

When choosing a component:

1. **Semantic intent first** - What does this communicate? (success/danger/warning/info)
2. **Interaction pattern second** - How will users interact? (select/input/action/feedback)
3. **Component API third** - Which component provides this?
4. **Design tokens last** - What colors and spacing?

This ensures consistent, accessible, semantically meaningful UI.
