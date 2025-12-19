import { NextRequest, NextResponse } from 'next/server';
import { packageMetadata } from 'ui-lab-registry';

export async function GET(request: NextRequest) {
  const llmsText = generateLLMsText();

  return new NextResponse(llmsText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function generateLLMsText(): string {
  return `# UI Lab Components

**Version:** ${packageMetadata.version}
**Last Updated:** ${new Date().toISOString().split('T')[0]}
**Package:** ui-lab-components
**Repository:** https://github.com/kyza0d/ui-lab
**Documentation:** https://ui-lab.app

Complete reference for all UI Lab components with their props,
variants, usage guidelines, and examples.

---

## Button
**Category:** action
**Status:** stable

Primary action component for user interactions. Use for buttons
that trigger actions, submit forms, or allow users to make choices.

### Import
\`\`\`typescript
import { Button } from 'ui-lab-components'
\`\`\`

### Props
- children: React.ReactNode
  - Button content (text, icons, etc.)
  - Can contain text, icons, or other elements
  - required

- variant: "primary" | "secondary" | "outline" | "ghost"
  - Visual style of the button
  - primary: Main call-to-action, use for recommended action
  - secondary: Alternative action, use for less important choices
  - outline: Secondary with less emphasis, use with secondary
  - ghost: Tertiary or subtle action, use for help or ancillary
  - default: "primary"

- size: "sm" | "md" | "lg"
  - Button size/padding
  - sm: Small button for compact layouts
  - md: Standard button size
  - lg: Large button for prominent placement
  - default: "md"

- disabled: boolean
  - Whether the button is disabled
  - Prevents user interaction
  - Shows disabled visual state
  - default: false

- onClick: (event: React.MouseEvent) => void
  - Callback function when button is clicked
  - Receives React mouse event
  - optional

- type: "button" | "submit" | "reset"
  - HTML button type
  - Use "submit" for form submission
  - default: "button"

- aria-label: string
  - Accessible label for screen readers
  - Required if button only contains an icon
  - optional

### Variants

- **primary** (default)
  Visual style: Full color, most prominent
  Usage: Main call-to-action, recommended action
  Example: <Button variant="primary">Save</Button>

- **secondary**
  Visual style: Lighter color, less prominent than primary
  Usage: Alternative actions, secondary choices
  Example: <Button variant="secondary">Cancel</Button>

- **outline**
  Visual style: Border with transparent background
  Usage: Secondary actions, multiple equal alternatives
  Example: <Button variant="outline">Download</Button>

- **ghost**
  Visual style: No background or border, text-only
  Usage: Tertiary actions, help, information
  Example: <Button variant="ghost">Help</Button>

### Examples

Basic button:
\`\`\`jsx
<Button>Click me</Button>
\`\`\`

Primary action:
\`\`\`jsx
<Button variant="primary" onClick={handleSave}>
  Save Changes
</Button>
\`\`\`

Disabled button:
\`\`\`jsx
<Button disabled>Not available</Button>
\`\`\`

Icon button (requires aria-label):
\`\`\`jsx
<Button variant="ghost" aria-label="Close">
  ×
</Button>
\`\`\`

### Accessibility

- All buttons have visible focus rings for keyboard navigation
- Keyboard support: Tab to focus, Space or Enter to activate
- Icon-only buttons must have aria-label attribute
- Disabled state is conveyed visually and programmatically
- Works with screen readers (NVDA, JAWS, VoiceOver)
- WCAG AA compliant

### Composition

Can contain: Icon, text, or combination
Can be contained by: Group, Card, Modal, Form
Related components: Link (for navigation), ButtonGroup
Common patterns:
  - Button groups for related actions
  - Icon button with aria-label
  - Form submission with disabled state

---

## Input
**Category:** input
**Status:** stable

Text input component for user data entry. Use for forms where users
need to enter text, email, password, or other single-line input.

### Import
\`\`\`typescript
import { Input } from 'ui-lab-components'
\`\`\`

### Props
- type: "text" | "email" | "password" | "number" | "url" | "tel"
  - HTML input type
  - Determines keyboard and validation behavior
  - default: "text"

- placeholder: string
  - Placeholder text shown when input is empty
  - optional

- value: string
  - Current input value (for controlled components)
  - optional

- onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  - Callback when input value changes
  - optional

- disabled: boolean
  - Whether the input is disabled
  - default: false

- readOnly: boolean
  - Whether the input is read-only
  - default: false

- required: boolean
  - Whether the input is required
  - default: false

- aria-label: string
  - Accessible label for screen readers
  - Use when no associated label element
  - optional

- aria-describedby: string
  - ID of element describing the input
  - Use for error messages or hints
  - optional

### Variants

- **default**
  Visual style: Standard input with border
  Usage: Normal form inputs
  Example: <Input placeholder="Enter name" />

- **error**
  Visual style: Red border and error styling
  Usage: Show validation errors
  Example: <Input aria-describedby="error-msg" />

### Examples

Basic input:
\`\`\`jsx
<Input placeholder="Enter your name" />
\`\`\`

Email input:
\`\`\`jsx
<Input type="email" placeholder="your@email.com" />
\`\`\`

Password input:
\`\`\`jsx
<Input type="password" placeholder="Enter password" />
\`\`\`

With label (Form integration):
\`\`\`jsx
<label htmlFor="name">Name</label>
<Input id="name" placeholder="Enter name" />
\`\`\`

Disabled input:
\`\`\`jsx
<Input disabled value="Not editable" readOnly />
\`\`\`

### Accessibility

- Inputs must be associated with labels via htmlFor/id
- Keyboard support: Tab to focus, arrow keys to edit
- Error messages associated via aria-describedby
- Clear focus indicators for keyboard navigation
- Works with screen readers (NVDA, JAWS, VoiceOver)
- WCAG AA compliant

### Composition

Can be contained by: Form, FormField, InputGroup
Related components: Textarea (for multiline), InputGroup
Common patterns:
  - Form field with label and error message
  - Input group with prefix/suffix icons
  - Validation feedback on blur/change

---

## Card
**Category:** layout
**Status:** stable

Container component for grouping related content. Use for displaying
sections of content with consistent styling and spacing.

### Import
\`\`\`typescript
import { Card, CardHeader, CardBody, CardFooter } from 'ui-lab-components'
\`\`\`

### Props
- children: React.ReactNode
  - Card content
  - Can contain any elements
  - required

- className: string
  - Additional CSS classes
  - optional

- variant: "default" | "elevated" | "outlined"
  - Card visual style
  - default: Full color with shadow
  - elevated: Higher shadow for emphasis
  - outlined: Border only, minimal shadow
  - default: "default"

### Sub-components

**CardHeader**
- Title section of the card
- Use for card headings and metadata
- Example: <CardHeader>Title</CardHeader>

**CardBody**
- Main content area of the card
- Use for primary content
- Example: <CardBody>Content here</CardBody>

**CardFooter**
- Footer section of the card
- Use for actions or metadata
- Example: <CardFooter>Footer content</CardFooter>

### Examples

Basic card:
\`\`\`jsx
<Card>
  <CardHeader>Card Title</CardHeader>
  <CardBody>Card content goes here</CardBody>
</Card>
\`\`\`

Card with footer:
\`\`\`jsx
<Card>
  <CardHeader>Settings</CardHeader>
  <CardBody>Configure your preferences</CardBody>
  <CardFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </CardFooter>
</Card>
\`\`\`

Elevated card:
\`\`\`jsx
<Card variant="elevated">
  <CardHeader>Important</CardHeader>
  <CardBody>This card has more prominence</CardBody>
</Card>
\`\`\`

### Accessibility

- Card is a semantic container, not interactive by default
- Use interactive elements (buttons, links) inside for actions
- Proper heading hierarchy for CardHeader content
- Works with screen readers
- WCAG AA compliant

### Composition

Can contain: Button, Input, other components
Related components: Modal (for overlay), Flex, Grid
Common patterns:
  - Card with header, body, and footer
  - Card with action buttons
  - Card grid layouts

---

## Design System

All components use semantic design tokens for consistent theming:

- **Colors**: Primary, secondary, accent colors with dark mode support
- **Typography**: Font sizes, weights, and line heights
- **Spacing**: Consistent padding, margin, and gap values
- **Shadows**: Elevation system for depth
- **Radius**: Border radius for consistency
- **Transitions**: Animation timing and easing

All components automatically support light and dark modes.

---

**LLMs.txt: Reliable component documentation for AI systems.**

Generated at: ${new Date().toISOString()}
`;
}
