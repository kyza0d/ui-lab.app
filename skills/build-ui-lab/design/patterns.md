# UI Patterns

Reusable patterns for common UI scenarios using UI Lab components.

---

## Layout Patterns

### Page Layout with Header

```tsx
import { Flex } from 'ui-lab-components';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-950">
      <header className="h-[var(--header-height)] border-b border-background-700 bg-background-900">
        <Flex align="center" justify="space-between" className="h-full px-6">
          <Logo />
          <Navigation />
          <UserMenu />
        </Flex>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
```

### Two-Column Layout

```tsx
import { Grid } from 'ui-lab-components';

<Grid columns="2" gap="lg">
  <aside className="bg-background-900 p-4 rounded-lg">
    <Sidebar />
  </aside>
  <main>
    <Content />
  </main>
</Grid>
```

### Responsive Card Grid

```tsx
import { Grid, Card } from 'ui-lab-components';

<Grid columns="auto-fit" gap="md">
  {items.map(item => (
    <Card key={item.id}>
      <Card.Header>
        <h3 className="font-semibold text-foreground-100">{item.title}</h3>
      </Card.Header>
      <Card.Body>
        <p className="text-foreground-400">{item.description}</p>
      </Card.Body>
    </Card>
  ))}
</Grid>
```

### Container Query Responsive

```tsx
import { Flex, Grid } from 'ui-lab-components';

// Flex that stacks on narrow containers
<Flex direction="row" gap="md" containerQueryResponsive>
  <Card>Left</Card>
  <Card>Right</Card>
</Flex>

// Grid that adapts columns based on container width
<Grid columns="3" gap="md" containerQueryResponsive>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>
```

---

## Content Card Patterns

### Basic Card

```tsx
import { Card } from 'ui-lab-components';

<Card>
  <Card.Header>
    <h3 className="font-semibold text-foreground-100">Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p className="text-foreground-300">Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <p className="text-sm text-foreground-500">Footer text</p>
  </Card.Footer>
</Card>
```

### Card with Status

```tsx
import { Card, Badge, Flex } from 'ui-lab-components';

<Card>
  <Card.Header>
    <Flex align="center" justify="space-between">
      <h3 className="font-semibold text-foreground-100">User Profile</h3>
      <Badge variant="success">Active</Badge>
    </Flex>
  </Card.Header>
  <Card.Body>
    <p className="text-foreground-300">Profile content...</p>
  </Card.Body>
</Card>
```

### Card with Actions

```tsx
import { Card, Group } from 'ui-lab-components';

<Card>
  <Card.Header>
    <h3 className="font-semibold text-foreground-100">Settings</h3>
  </Card.Header>
  <Card.Body>
    <p className="text-foreground-300">Configure your preferences.</p>
  </Card.Body>
  <Card.Footer className="border-t border-background-700 pt-4">
    <Group>
      <Group.Button variant="ghost">Cancel</Group.Button>
      <Group.Button variant="primary">Save Changes</Group.Button>
    </Group>
  </Card.Footer>
</Card>
```

### Stats Card

```tsx
import { Card, Badge, Flex } from 'ui-lab-components';
import { TrendingUp } from 'lucide-react';

<Card>
  <Card.Header>
    <Flex align="center" justify="space-between">
      <span className="text-foreground-400 text-sm">Revenue</span>
      <Badge variant="success" size="sm">+12%</Badge>
    </Flex>
  </Card.Header>
  <Card.Body>
    <p className="text-3xl font-bold text-foreground-100">$24,580</p>
    <Flex align="center" gap="xs" className="mt-2">
      <TrendingUp className="w-4 h-4 text-success-500" />
      <span className="text-sm text-foreground-400">vs last month</span>
    </Flex>
  </Card.Body>
</Card>
```

---

## Form Patterns

### Basic Form

```tsx
import { Input, Label, Button, Textarea } from 'ui-lab-components';

<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>

  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" placeholder="Your message..." />
  </div>

  <Button variant="primary" type="submit">Submit</Button>
</form>
```

### Form with Validation

```tsx
import { Input, Label, Button, Banner } from 'ui-lab-components';

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {errors.form && (
        <Banner variant="danger">
          <Banner.Body>{errors.form}</Banner.Body>
        </Banner>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          error={!!errors.email}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-danger-500">{errors.email}</p>
        )}
      </div>

      <Button variant="primary" type="submit">Submit</Button>
    </form>
  );
}
```

### Form with Checkbox/Toggle

```tsx
import { Input, Label, Button, Checkbox, Switch, Flex } from 'ui-lab-components';

<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" />
  </div>

  <Checkbox
    checked={newsletter}
    onChange={(e) => setNewsletter(e.target.checked)}
    label="Subscribe to newsletter"
  />

  <Flex align="center" justify="space-between">
    <Label htmlFor="notifications">Enable notifications</Label>
    <Switch
      checked={notifications}
      onChange={setNotifications}
    />
  </Flex>

  <Button variant="primary" type="submit">Save Preferences</Button>
</form>
```

### Search Input

```tsx
import { Input } from 'ui-lab-components';
import { Search } from 'lucide-react';

<Input
  type="text"
  placeholder="Search..."
  prefixIcon={<Search className="w-4 h-4 text-foreground-500" />}
/>
```

---

## Modal Patterns

### Confirmation Modal

```tsx
import { Modal, Button, Flex } from 'ui-lab-components';

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title="Delete Item"
      size="sm"
    >
      <p className="text-foreground-300">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <Modal.Footer>
        <Flex gap="sm" justify="flex-end">
          <Button variant="ghost" onPress={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onPress={onConfirm}>
            Delete
          </Button>
        </Flex>
      </Modal.Footer>
    </Modal>
  );
}
```

### Form Modal

```tsx
import { Modal, Input, Label, Button, Flex } from 'ui-lab-components';

function CreateItemModal({ isOpen, onClose, onSubmit }) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      title="Create New Item"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter title" />
        </div>

        <Modal.Footer>
          <Flex gap="sm" justify="flex-end">
            <Button variant="ghost" onPress={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Flex>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
```

---

## Notification Patterns

### Banner Notifications

```tsx
import { Banner } from 'ui-lab-components';

// Success banner
<Banner variant="success" isDismissible onDismiss={handleDismiss}>
  <Banner.Title>Success!</Banner.Title>
  <Banner.Body>Your changes have been saved successfully.</Banner.Body>
</Banner>

// Warning banner
<Banner variant="warning">
  <Banner.Title>Warning</Banner.Title>
  <Banner.Body>Please review your input before continuing.</Banner.Body>
</Banner>

// Info banner (note style)
<Banner variant="note">
  <Banner.Body>This is a general information message.</Banner.Body>
</Banner>

// Error banner
<Banner variant="danger">
  <Banner.Title>Error</Banner.Title>
  <Banner.Body>Something went wrong. Please try again.</Banner.Body>
</Banner>
```

### Toast Notifications

```tsx
import { toast, Toaster } from 'ui-lab-components';

// In your layout
<Toaster />

// Trigger toasts
function handleSave() {
  try {
    await saveData();
    toast.success("Changes saved successfully");
  } catch (error) {
    toast.error("Failed to save changes");
  }
}

// All toast variants
toast.success("Operation completed");
toast.error("Something went wrong");
toast.warning("Please check your input");
toast.info("New update available");
```

---

## Navigation Patterns

### Tab Navigation

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui-lab-components';

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
    <TabsTrigger value="members">Members</TabsTrigger>
  </TabsList>

  <TabsContent value="overview">
    <OverviewPanel />
  </TabsContent>
  <TabsContent value="settings">
    <SettingsPanel />
  </TabsContent>
  <TabsContent value="members">
    <MembersPanel />
  </TabsContent>
</Tabs>
```

### Breadcrumb Navigation

```tsx
import { Breadcrumbs, Breadcrumb } from 'ui-lab-components';

<Breadcrumbs>
  <Breadcrumb href="/">Home</Breadcrumb>
  <Breadcrumb href="/products">Products</Breadcrumb>
  <Breadcrumb href="/products/electronics">Electronics</Breadcrumb>
  <Breadcrumb>Laptop Pro</Breadcrumb>
</Breadcrumbs>
```

### Dropdown Menu

```tsx
import { Menu, Button } from 'ui-lab-components';

<Menu>
  <Menu.Trigger asChild>
    <Button variant="outline">Options</Button>
  </Menu.Trigger>
  <Menu.Portal>
    <Menu.Content>
      <Menu.Item onSelect={() => handleEdit()}>Edit</Menu.Item>
      <Menu.Item onSelect={() => handleDuplicate()}>Duplicate</Menu.Item>
      <Menu.Separator />
      <Menu.Item onSelect={() => handleDelete()}>Delete</Menu.Item>
    </Menu.Content>
  </Menu.Portal>
</Menu>
```

---

## Button Group Patterns

### Action Group

```tsx
import { Group } from 'ui-lab-components';

<Group>
  <Group.Button variant="ghost">Cancel</Group.Button>
  <Group.Button variant="primary">Save</Group.Button>
</Group>
```

### Destructive Action Group

```tsx
import { Group, Flex, Button } from 'ui-lab-components';

<Flex justify="space-between">
  <Button variant="danger">Delete</Button>
  <Group>
    <Group.Button variant="ghost">Cancel</Group.Button>
    <Group.Button variant="primary">Save</Group.Button>
  </Group>
</Flex>
```

### Icon Button Row

```tsx
import { Button, Flex } from 'ui-lab-components';
import { Edit, Trash, Copy } from 'lucide-react';

<Flex gap="xs">
  <Button variant="ghost" size="sm" icon={{ left: <Edit className="w-4 h-4" /> }} />
  <Button variant="ghost" size="sm" icon={{ left: <Copy className="w-4 h-4" /> }} />
  <Button variant="ghost" size="sm" icon={{ left: <Trash className="w-4 h-4" /> }} />
</Flex>
```

---

## List Patterns

### Simple List

```tsx
import { List, Badge } from 'ui-lab-components';

<List.Container>
  <List.Header>
    <h3>Team Members</h3>
  </List.Header>
  {members.map((member, index) => (
    <React.Fragment key={member.id}>
      <List.Item>
        <span>{member.name}</span>
        <Badge variant={member.active ? "success" : "default"}>
          {member.role}
        </Badge>
      </List.Item>
      {index < members.length - 1 && <List.Divider />}
    </React.Fragment>
  ))}
</List.Container>
```

### Actionable List

```tsx
import { List, Button, Flex } from 'ui-lab-components';

<List.Container>
  {items.map(item => (
    <List.Item key={item.id}>
      <Flex align="center" justify="space-between" className="w-full">
        <span>{item.name}</span>
        <List.ActionGroup>
          <Button variant="ghost" size="sm">Edit</Button>
          <Button variant="ghost" size="sm">Delete</Button>
        </List.ActionGroup>
      </Flex>
    </List.Item>
  ))}
</List.Container>
```

---

## Data Display Patterns

### Progress Indicator

```tsx
import { Progress, Card } from 'ui-lab-components';

<Card>
  <Card.Header>
    <h3 className="font-semibold text-foreground-100">Upload Progress</h3>
  </Card.Header>
  <Card.Body>
    <Progress
      value={uploadProgress}
      max={100}
      label="Uploading..."
      showValue
      size="md"
    />
  </Card.Body>
</Card>
```

### Status Badges

```tsx
import { Badge, Flex } from 'ui-lab-components';

<Flex gap="sm">
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="danger">Error</Badge>
  <Badge variant="info">New</Badge>
  <Badge variant="default">Draft</Badge>
</Flex>
```

### Data Table

```tsx
import { Table } from 'ui-lab-components';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'status', header: 'Status' },
];

<Table columns={columns} data={users} />
```

---

## Empty State Pattern

```tsx
import { Card, Button, Flex } from 'ui-lab-components';
import { Plus, Folder } from 'lucide-react';

<Card className="text-center py-12">
  <Card.Body>
    <div className="text-foreground-500 mb-4">
      <Folder className="w-12 h-12 mx-auto" />
    </div>
    <h3 className="text-lg font-semibold text-foreground-200 mb-2">
      No items yet
    </h3>
    <p className="text-foreground-400 mb-6">
      Get started by creating your first item.
    </p>
    <Button variant="primary" icon={{ left: <Plus className="w-4 h-4" /> }}>
      Create Item
    </Button>
  </Card.Body>
</Card>
```

---

## Loading State Pattern

```tsx
import { Progress, Card, Flex } from 'ui-lab-components';

// Indeterminate loading
<Card>
  <Card.Body>
    <Flex direction="column" align="center" gap="md" className="py-8">
      <div className="animate-spin w-8 h-8 border-2 border-foreground-500 border-t-transparent rounded-full" />
      <p className="text-foreground-400">Loading...</p>
    </Flex>
  </Card.Body>
</Card>

// Determinate progress
<Progress value={progress} max={100} showValue label="Loading data..." />
```

---

## Skeleton Pattern

```tsx
import { Card } from 'ui-lab-components';

// Skeleton card while loading
<Card>
  <Card.Header>
    <div className="h-6 w-1/3 bg-background-700 rounded animate-pulse" />
  </Card.Header>
  <Card.Body className="space-y-3">
    <div className="h-4 w-full bg-background-700 rounded animate-pulse" />
    <div className="h-4 w-2/3 bg-background-700 rounded animate-pulse" />
  </Card.Body>
</Card>
```

---

## Integration Notes

### Using These Patterns

1. Copy the pattern code into your project
2. Import components from `ui-lab-components`
3. Use semantic color tokens (e.g., `text-foreground-300`, `bg-background-900`)
4. Use component variants rather than CSS overrides
5. Use compound component patterns (Card.Header, Modal.Footer, etc.)

### Key Points

- Always use `isDisabled` for React Aria components (not `disabled`)
- Use `onPress` for Button handlers (also supports `onClick`)
- Modal uses `isOpen`/`onOpenChange` pattern
- Banner uses compound children (Banner.Title, Banner.Body)
- Card uses compound children (Card.Header, Card.Body, Card.Footer)
- Use semantic gap tokens for Flex/Grid (`xs`, `sm`, `md`, `lg`, `xl`)

### Related Files

- See **components.md** for full component API reference
- See **tokens.md** for color and spacing tokens
- See **guidelines.md** for design philosophy
