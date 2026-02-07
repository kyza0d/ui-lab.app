# UI Patterns

Reusable patterns for common UI scenarios using UI Lab components.

---

## Layout

**Page with header:**
```tsx
<div className="min-h-screen bg-background-950">
  <header className="border-b border-background-700">
    <Flex align="center" justify="space-between" className="px-6 h-16">
      <Logo /> <Navigation /> <UserMenu />
    </Flex>
  </header>
  <main className="p-6">{children}</main>
</div>
```

**Two-column layout:**
```tsx
<Grid columns="2" gap="lg">
  <aside><Sidebar /></aside>
  <main><Content /></main>
</Grid>
```

**Responsive grid:**
```tsx
<Grid columns={{ sm: "1", md: "2", lg: "3" }} gap="md">
  {items.map(item => <Card key={item.id}>{item.title}</Card>)}
</Grid>
```

---

## Cards

**Basic card with actions:**
```tsx
<Card>
  <Card.Header><h3>Title</h3></Card.Header>
  <Card.Body>Content...</Card.Body>
  <Card.Footer className="border-t border-background-700 pt-4">
    <Group>
      <Group.Button variant="ghost">Cancel</Group.Button>
      <Group.Button variant="primary">Save</Group.Button>
    </Group>
  </Card.Footer>
</Card>
```

**Card with status:**
```tsx
<Card>
  <Card.Header>
    <Flex align="center" justify="space-between">
      <h3>User Profile</h3>
      <Badge variant="success">Active</Badge>
    </Flex>
  </Card.Header>
  <Card.Body>Content...</Card.Body>
</Card>
```

**Stats card:**
```tsx
<Card>
  <Card.Body>
    <p className="text-3xl font-bold text-foreground-100">$24,580</p>
    <p className="text-sm text-foreground-400 mt-2">+12% vs last month</p>
  </Card.Body>
</Card>
```

---

## Forms

**Basic form:**
```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
  <Button variant="primary" type="submit">Submit</Button>
</form>
```

**With validation:**
```tsx
<form className="space-y-4">
  {errors.form && <Banner variant="danger"><Banner.Body>{errors.form}</Banner.Body></Banner>}
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" error={!!errors.email} />
    {errors.email && <p className="text-sm text-danger-500">{errors.email}</p>}
  </div>
  <Button variant="primary" type="submit">Submit</Button>
</form>
```

**With checkbox/switch:**
```tsx
<form className="space-y-4">
  <Checkbox label="Subscribe to newsletter" />
  <Flex align="center" justify="space-between">
    <Label>Enable notifications</Label>
    <Switch />
  </Flex>
  <Button variant="primary" type="submit">Save</Button>
</form>
```

---

## Modals

**Confirmation modal:**
```tsx
<Modal isOpen={isOpen} onOpenChange={setIsOpen} title="Delete Item?" size="sm">
  <p className="text-foreground-300">This action cannot be undone.</p>
  <Modal.Footer>
    <Flex gap="sm" justify="flex-end">
      <Button variant="ghost" onPress={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="danger" onPress={handleDelete}>Delete</Button>
    </Flex>
  </Modal.Footer>
</Modal>
```

**Form modal:**
```tsx
<Modal isOpen={isOpen} onOpenChange={setIsOpen} title="Create Item" size="md">
  <form className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="title">Title</Label>
      <Input id="title" />
    </div>
    <Modal.Footer>
      <Flex gap="sm" justify="flex-end">
        <Button variant="ghost" onPress={() => setIsOpen(false)}>Cancel</Button>
        <Button variant="primary" type="submit">Create</Button>
      </Flex>
    </Modal.Footer>
  </form>
</Modal>
```

---

## Notifications

**Banners:**
```tsx
<Banner variant="success" isDismissible>
  <Banner.Title>Success!</Banner.Title>
  <Banner.Body>Your changes have been saved.</Banner.Body>
</Banner>

<Banner variant="danger">
  <Banner.Title>Error</Banner.Title>
  <Banner.Body>Something went wrong.</Banner.Body>
</Banner>
```

**Toasts:**
```tsx
<Toaster />

toast.success("Saved successfully");
toast.error("Failed to save");
toast.warning("Please review input");
toast.info("New update available");
```

---

## Navigation

**Tabs:**
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview"><OverviewPanel /></TabsContent>
  <TabsContent value="settings"><SettingsPanel /></TabsContent>
</Tabs>
```

**Breadcrumbs:**
```tsx
<Breadcrumbs>
  <Breadcrumb href="/">Home</Breadcrumb>
  <Breadcrumb href="/products">Products</Breadcrumb>
  <Breadcrumb>Current</Breadcrumb>
</Breadcrumbs>
```

**Dropdown menu:**
```tsx
<Menu>
  <Menu.Trigger asChild>
    <Button variant="outline">Options</Button>
  </Menu.Trigger>
  <Menu.Portal>
    <Menu.Content>
      <Menu.Item onSelect={handleEdit}>Edit</Menu.Item>
      <Menu.Item onSelect={handleDelete}>Delete</Menu.Item>
    </Menu.Content>
  </Menu.Portal>
</Menu>
```

---

## Button Groups

```tsx
<Group>
  <Group.Button variant="ghost">Cancel</Group.Button>
  <Group.Button variant="primary">Save</Group.Button>
</Group>

<Flex justify="space-between">
  <Button variant="danger">Delete</Button>
  <Group>
    <Group.Button variant="ghost">Cancel</Group.Button>
    <Group.Button variant="primary">Save</Group.Button>
  </Group>
</Flex>
```

---

## Lists

```tsx
<List.Container>
  <List.Header><h3>Team</h3></List.Header>
  {members.map((member, i) => (
    <React.Fragment key={member.id}>
      <List.Item>
        <Flex align="center" justify="space-between" className="w-full">
          <span>{member.name}</span>
          <Badge variant="success">{member.role}</Badge>
        </Flex>
      </List.Item>
      {i < members.length - 1 && <List.Divider />}
    </React.Fragment>
  ))}
</List.Container>
```

---

## Data Display

**Progress:**
```tsx
<Card>
  <Card.Header><h3>Upload Progress</h3></Card.Header>
  <Card.Body>
    <Progress value={progress} max={100} showValue label="Uploading..." />
  </Card.Body>
</Card>
```

**Status badges:**
```tsx
<Flex gap="sm">
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="danger">Error</Badge>
</Flex>
```

**Table:**
```tsx
<Table
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status' },
  ]}
  data={users}
/>
```

---

## Empty States & Loading

**Empty state:**
```tsx
<Card className="text-center py-12">
  <Card.Body>
    <Folder className="w-12 h-12 mx-auto text-foreground-500 mb-4" />
    <h3 className="text-lg font-semibold text-foreground-200 mb-2">No items yet</h3>
    <p className="text-foreground-400 mb-6">Get started by creating your first item.</p>
    <Button variant="primary">Create Item</Button>
  </Card.Body>
</Card>
```

**Loading skeleton:**
```tsx
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

## Quick Reference

| Use Case | Component | Pattern |
|----------|-----------|---------|
| Two-column layout | `Grid columns="2"` | Left sidebar + content |
| Form labels & inputs | `<Label>` + `<Input>` | Wrap in `space-y-2` div |
| Action buttons | `<Group>` | Multiple buttons in footer |
| Persistent messages | `<Banner>` | At top of section |
| Temporary messages | `<toast>` | Fire & forget |
| Complex navigation | `<Tabs>` | Multiple panels |
| Inline options | `<Menu>` | Dropdown from button |
| Loading state | `animate-pulse` | Skeleton shapes |
| Error feedback | `<Input error={true}>` | Red input + error text |
| Success feedback | `<Banner variant="success">` | Green banner with title |

---

## Key Patterns

- **Cards for content**: Always use `Card.Header`, `Card.Body`, `Card.Footer` compound pattern
- **Forms**: Wrap label+input in `space-y-2` div, wrap form in `space-y-4`
- **Actions**: Use `<Group>` for button collections, `<Flex>` for mixed layouts
- **Feedback**: Banners for persistent, toasts for temporary
- **Lists**: Always include `List.Divider` between items
- **Modals**: Use `Modal.Footer` with `Flex justify="flex-end"` for buttons
