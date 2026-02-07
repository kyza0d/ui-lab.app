# Component Registry

Complete inventory of UI Lab components organized by category. All components use React Aria for accessibility and CSS Modules for styling.

**Import pattern:**
```tsx
import { ComponentName } from 'ui-lab-components';
```

---

## Categories

| Category | Description |
|----------|-------------|
| **Layout** | Components for arranging and structuring content (Flex, Grid, Frame, Divider) |
| **Composition** | Higher-level components combining primitives (Group) |
| **Action** | Interactive elements triggering actions (Button) |
| **Input** | Form elements for user input (Input, Textarea, Select, Checkbox, Radio, Switch, Slider) |
| **Information** | Read-only display components (Badge, Banner, Label, Tooltip, Anchor) |
| **Feedback** | Status and notification components (Toast, Progress, Confirmation) |
| **Navigation** | Navigation elements (Menu, Tabs, Breadcrumbs, Command) |
| **Container** | Content grouping components (Card, Modal, Popover, Fold, List) |
| **Data** | Data display components (Table, Scroll, Gallery) |

---

## Layout Components

### Flex

Flexbox layout container with semantic gap and alignment props.

```tsx
interface FlexProps {
  direction?: "row" | "column";
  wrap?: "wrap" | "nowrap";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  containerQueryResponsive?: boolean;
}
```

**Usage:**
```tsx
<Flex direction="row" gap="md" align="center" justify="space-between">
  <Button>Left</Button>
  <Button>Right</Button>
</Flex>
```

### Grid

CSS Grid layout container with column/row configuration.

```tsx
interface GridProps {
  columns?: "1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill";
  rows?: "1" | "2" | "3" | "4" | "5" | "6" | "auto";
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  rowGap?: "xs" | "sm" | "md" | "lg" | "xl";
  columnGap?: "xs" | "sm" | "md" | "lg" | "xl";
  justifyItems?: "start" | "end" | "center" | "stretch";
  alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
  justifyContent?: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
  alignContent?: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
  autoFlow?: "row" | "column" | "row-dense" | "column-dense";
  containerQueryResponsive?: boolean;
}
```

**Usage:**
```tsx
<Grid columns="3" gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

### Frame

Container component for framing content with consistent styling.

### Divider

Visual separator between content sections.

```tsx
interface DividerProps {
  orientation?: "horizontal" | "vertical";
}
```

**Usage:**
```tsx
<Divider />
<Divider orientation="vertical" />
```

---

## Composition Components

### Group

Button grouping component for related actions.

```tsx
interface GroupProps {
  variant?: "default" | "ghost";
  spacing?: "compact" | "normal" | "loose";
}

// Compound pattern
Group.Button  // Button within group
```

**Usage:**
```tsx
<Group variant="ghost" spacing="sm">
  <Group.Button variant="outline">Cancel</Group.Button>
  <Group.Button variant="primary">Save</Group.Button>
</Group>
```

---

## Action Components

### Button

Interactive button with variants and sizes. Built with React Aria.

```tsx
interface ButtonProps {
  variant?: "primary" | "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isDisabled?: boolean;
  onPress?: (e: { target: EventTarget | null }) => void;
  icon?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
}
```

**Usage:**
```tsx
<Button variant="primary" size="md">Submit</Button>
<Button variant="danger" isDisabled>Delete</Button>
<Button icon={{ left: <Icon /> }}>With Icon</Button>
```

---

## Input Components

### Input

Text input field with variants and icon support.

```tsx
interface InputProps {
  variant?: "default" | "ghost";
  error?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}
```

**Usage:**
```tsx
<Input type="email" placeholder="Email" />
<Input error prefixIcon={<SearchIcon />} />
```

### Textarea

Multi-line text input.

```tsx
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Standard textarea props
}
```

### Select

Dropdown selection component.

```tsx
// Exports: Select, Searchable, useSelectContext
```

### Checkbox

Boolean toggle or multiple selection.

```tsx
interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}
```

**Usage:**
```tsx
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  label="Accept terms"
/>
```

### Radio

Single selection from a group.

```tsx
interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface RadioItemProps {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
}
```

### Switch

Toggle switch component.

```tsx
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
```

### Slider

Range slider input.

```tsx
// Namespace export: Slider.*
```

### Label

Form field label with variants.

```tsx
interface LabelProps {
  // Standard label props
}
// Also exports: labelVariants
```

---

## Information Components

### Badge

Compact status indicator or tag.

```tsx
interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  pill?: boolean;
  count?: number;
}
```

**Usage:**
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="danger" dismissible onDismiss={handleDismiss}>Error</Badge>
<Badge pill count={5} />
```

### Banner

Full-width notification banner with semantic variants. **Compound component**.

```tsx
interface BannerProps {
  variant?: "note" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  isDismissible?: boolean;
  onDismiss?: () => void;
}

// Compound pattern
Banner.Title  // Banner heading
Banner.Body   // Banner content
```

**Usage:**
```tsx
<Banner variant="success" isDismissible onDismiss={handleDismiss}>
  <Banner.Title>Success!</Banner.Title>
  <Banner.Body>Your changes have been saved.</Banner.Body>
</Banner>
```

### Tooltip

Hover tooltip for additional information.

```tsx
interface TooltipProps {
  content: React.ReactNode;
  // Position, delay, etc.
}
```

### Anchor

Styled link with optional popover preview.

```tsx
interface AnchorProps {
  href?: string;
  // Link props
}

// Compound pattern
Anchor.Preview  // Hover preview content
```

**Usage:**
```tsx
<Anchor href="/docs">
  Learn more
  <Anchor.Preview>
    <p>Preview content shown on hover</p>
  </Anchor.Preview>
</Anchor>
```

---

## Feedback Components

### Toast

Temporary notification messages.

```tsx
// Exports: Toaster, toast, useToastStore

interface ToastProps {
  variant?: ToastVariant;
  position?: ToastPosition;
}

// Imperative API
toast.success("Saved!");
toast.error("Failed to save");
toast.warning("Check your input");
toast.info("New update available");
```

**Usage:**
```tsx
// In layout
<Toaster />

// Trigger toast
toast.success("Changes saved successfully");
```

### Progress

Progress indicator bar.

```tsx
interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
}
```

**Usage:**
```tsx
<Progress value={65} max={100} label="Progress" showValue size="sm" />
```

### Confirmation

Confirmation dialog for destructive actions.

```tsx
interface ConfirmationProps {
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}
```

---

## Navigation Components

### Menu

Dropdown menu with items, groups, and nested submenus.

```tsx
// Compound pattern exports
Menu.Trigger
Menu.Portal
Menu.Content
Menu.Group
Menu.Item
Menu.CheckboxItem
Menu.RadioGroup
Menu.RadioItem
Menu.Label
Menu.Separator
Menu.Shortcut
Menu.Sub
Menu.SubTrigger
Menu.SubContent
```

### Tabs

Tab interface for content sections.

```tsx
// Exports: Tabs, TabsList, TabsTrigger, TabsContent

interface TabsProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}
```

**Usage:**
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Breadcrumbs

Navigation breadcrumb trail.

```tsx
// Exports: Breadcrumbs, Breadcrumb

interface BreadcrumbsProps {
  // Container props
}

interface BreadcrumbItemProps {
  href?: string;
}
```

**Usage:**
```tsx
<Breadcrumbs>
  <Breadcrumb href="/">Home</Breadcrumb>
  <Breadcrumb href="/products">Products</Breadcrumb>
  <Breadcrumb>Current Page</Breadcrumb>
</Breadcrumbs>
```

### Command

Command palette / search interface.

```tsx
// Also exported as CommandPalette

interface CommandPaletteProps {
  // Command palette configuration
}
```

---

## Container Components

### Card

Content container with header, body, footer. **Compound component**.

```tsx
interface CardProps extends HTMLAttributes<HTMLDivElement> {}

// Compound pattern
Card.Header  // Card header section
Card.Body    // Card content section
Card.Footer  // Card footer section
```

**Usage:**
```tsx
<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Modal

Modal dialog overlay. **Compound component**.

```tsx
interface ModalProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  closeButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

// Compound pattern
Modal.Header  // Modal header
Modal.Body    // Modal content
Modal.Footer  // Modal footer/actions
```

**Usage:**
```tsx
<Modal isOpen={isOpen} onOpenChange={setIsOpen} title="Confirm Action" size="md">
  <p>Are you sure you want to proceed?</p>
  <Modal.Footer>
    <Button variant="ghost" onPress={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary" onPress={handleConfirm}>Confirm</Button>
  </Modal.Footer>
</Modal>
```

### Popover

Floating content panel triggered by interaction.

```tsx
interface PopoverProps {
  // Trigger, content, positioning
}
```

### Fold

Collapsible/expandable content section.

```tsx
interface FoldProps {
  // Fold configuration
}
```

### List

Structured list container with items and actions.

```tsx
// Compound pattern
List.Container
List.Header
List.Item
List.ActionGroup
List.Divider
List.Footer
```

---

## Data Components

### Table

Data table with columns and rows.

```tsx
interface TableProps {
  columns: Column[];
  data: any[];
}

interface Column {
  key: string;
  header: string;
  // Additional column config
}
```

### Scroll

Custom scrollable container.

```tsx
interface ScrollProps {
  // Scroll configuration
}
```

### Gallery

Image/media gallery with viewer.

```tsx
// Exports: Gallery, GalleryItem, GalleryView, GalleryBody
```

### Date

Date display and picker components.

```tsx
// Exports: Date, DateHeader, DateGrid, DateDay
```

### Color

Color display/picker component.

```tsx
interface ColorProps {
  // Color configuration
}
```

### Mask

Content masking component.

```tsx
interface MaskProps {
  // Mask configuration
}
```

---

## Utility Components

### EasingPreview

Animation easing visualization.

```tsx
interface EasingPreviewProps {
  // Easing preview configuration
}
```

---

## Provider Components

### ThemeProvider

Theme context provider for the application.

```tsx
import { ThemeProvider, useThemeVariables } from 'ui-lab-components';

<ThemeProvider>
  <App />
</ThemeProvider>
```

### ThemeScriptInjector

SSR-safe theme script injection.

---

## Component Selection Guide

| Need | Component | Notes |
|------|-----------|-------|
| Primary action | `Button variant="primary"` | Main CTAs |
| Secondary action | `Button variant="secondary"` | Less prominent actions |
| Destructive action | `Button variant="danger"` | Delete, remove operations |
| Text input | `Input` | Single-line text |
| Multi-line text | `Textarea` | Long-form text |
| Boolean toggle | `Checkbox` or `Switch` | On/off states |
| Single selection (few) | `Radio` | 2-5 options |
| Single selection (many) | `Select` | Dropdown for many options |
| Status indicator | `Badge` | Inline status labels |
| Notification message | `Banner` | Full-width messages |
| Toast notification | `Toast` | Temporary alerts |
| Modal dialog | `Modal` | Focused interactions |
| Confirmation | `Confirmation` | Destructive action confirmation |
| Content grouping | `Card` | Related content container |
| Flexbox layout | `Flex` | Row/column layouts |
| Grid layout | `Grid` | Multi-column layouts |
| Button group | `Group` | Related button actions |
| Navigation menu | `Menu` | Dropdown menus |
| Tab interface | `Tabs` | Content sections |
| Breadcrumb nav | `Breadcrumbs` | Location hierarchy |
| Data table | `Table` | Structured data |
| Progress | `Progress` | Loading/completion state |
