import type { ComponentRegistry } from './types.js';

export const componentRegistry: ComponentRegistry = {
  badge: {
    id: "badge",
    name: "Badge",
    description: "A small badge component for displaying labels or status.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Badge",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["label","status","tag"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic HTML","Use with proper context"]},
    examples: [
    {
        "title": "Basic Badge",
        "description": "A simple badge with default styling. Use this to display labels, tags, or status indicators in your interface.",
        "code": "import React from 'react';\nimport { Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Badge>New</Badge>;\n}"
    }
],
  },

  breadcrumbs: {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    description: "A navigation component that displays the current page in a hierarchy and allows users to navigate to parent pages.",
    category: "navigation",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Breadcrumbs",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["navigation","breadcrumb","hierarchy","parent-pages"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses nav element with landmark role","Semantic ordered list structure","Current page marked with aria-current","Full keyboard navigation support","Screen reader friendly labels"]},
    examples: [
    {
        "title": "Basic Breadcrumbs",
        "description": "A simple breadcrumb navigation showing the current page location. Use this to help users understand their position in the site hierarchy.",
        "code": "import { Breadcrumbs, Breadcrumb } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Breadcrumbs>\n      <Breadcrumb href=\"/\">Home</Breadcrumb>\n      <Breadcrumb href=\"/products\">Products</Breadcrumb>\n      <Breadcrumb href=\"/products/electronics\">Electronics</Breadcrumb>\n      <Breadcrumb>Laptop</Breadcrumb>\n    </Breadcrumbs>\n  );\n}"
    }
],
  },

  button: {
    id: "button",
    name: "Button",
    description: "A clickable element that triggers an action.",
    category: "action",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Button",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["group"],
    tags: ["cta","interactive","primary-action"],
    accessibility: {"hasAriaSupport":true,"notes":["Supports keyboard navigation","Screen reader friendly"]},
    examples: [
    {
        "title": "Basic Button",
        "description": "A simple primary button with default styling. Use this as the standard action button in your interface.",
        "code": "import React from 'react';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Button>Click me</Button>;\n}"
    },
    {
        "title": "Secondary Button",
        "description": "Secondary action button. Use for supplementary actions.",
        "code": "import React from 'react';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Button variant=\"secondary\">Secondary Button</Button>;\n}"
    },
    {
        "title": "Outline Button",
        "description": "Outlined button with border. Use for tertiary actions.",
        "code": "import React from 'react';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Button variant=\"outline\">Outline Button</Button>;\n}"
    },
    {
        "title": "Ghost Button",
        "description": "Minimal ghost button. Use for low-priority actions.",
        "code": "import React from 'react';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Button variant=\"ghost\">Ghost Button</Button>;\n}"
    }
],
  },

  card: {
    id: "card",
    name: "Card",
    description: "A card component for grouping related content.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Card",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["modal","divider"],
    tags: ["container","grouping","layout"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic HTML structure","Proper heading hierarchy"]},
    examples: [
    {
        "title": "Basic Card",
        "description": "A simple card container with header, body, and footer sections. Use this to group related content in your interface.",
        "code": "import { Card } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Card>\n      <Card.Header>\n        <h3>Card Title</h3>\n      </Card.Header>\n      <Card.Body>\n        <p>This is the card content area where you can place any information or components.</p>\n      </Card.Body>\n      <Card.Footer>\n        <p>Footer content</p>\n      </Card.Footer>\n    </Card>\n  );\n}"
    }
],
  },

  checkbox: {
    id: "checkbox",
    name: "Checkbox",
    description: "A checkbox input for selecting one or multiple options.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Checkbox",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["radio","switch","label"],
    tags: ["form","selection","boolean"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","Visual focus indicator","Works with labels"]},
    examples: [
    {
        "title": "Basic Checkbox",
        "description": "A simple checkbox with a label. Use this as the standard checkbox input in your forms.",
        "code": "import React from 'react';\nimport { Checkbox } from 'ui-lab-components';\n\nexport default function Example() {\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Checkbox\n      checked={checked}\n      onChange={(e) => setChecked(e.target.checked)}\n      label=\"Accept terms and conditions\"\n    />\n  );\n}"
    }
],
  },

  "command-palette": {
    id: "command-palette",
    name: "Command",
    description: "A searchable command palette for quick access to actions.",
    category: "action",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "CommandPalette",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["modal","input"],
    tags: ["search","command","navigation"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard shortcuts","Search support","Focus management"]},
    examples: [
    {
        "title": "Basic Command Palette",
        "description": "A searchable command palette with keyboard shortcuts. Use this for quick access to application actions.",
        "code": "import React from 'react';\nimport { CommandPalette, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [open, setOpen] = React.useState(false);\n\n  const commands = [\n    {\n      id: 'search',\n      label: 'Search',\n      description: 'Search documents',\n      shortcut: '⌘F',\n      action: () => console.log('Search'),\n    },\n    {\n      id: 'create',\n      label: 'Create new',\n      description: 'Create a new document',\n      shortcut: '⌘N',\n      action: () => console.log('Create'),\n    },\n    {\n      id: 'settings',\n      label: 'Settings',\n      description: 'Open application settings',\n      shortcut: '⌘,',\n      action: () => console.log('Settings'),\n    },\n  ];\n\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>\n        Open Palette (⌘K)\n      </Button>\n      <CommandPalette\n        open={open}\n        onOpenChange={setOpen}\n        commands={commands}\n      />\n    </>\n  );\n}"
    }
],
  },

  confirm: {
    id: "confirm",
    name: "Confirm",
    description: "A confirm dialog for critical user actions.",
    category: "action",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Confirm",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["modal","button","card"],
    tags: ["dialog","confirm","safety"],
    accessibility: {"hasAriaSupport":true,"notes":["Focus management","Clear action buttons","Alert dialog role"]},
    examples: [
    {
        "title": "Basic Confirm",
        "description": "A confirmation dialog for critical actions. Use this to prevent accidental deletions or destructive operations.",
        "code": "import { Confirmation } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Confirmation\n      triggerLabel=\"Delete Account\"\n      title=\"Are you sure?\"\n      description=\"This action cannot be undone. All your data will be permanently deleted.\"\n      confirmLabel=\"Delete\"\n      cancelLabel=\"Cancel\"\n      onConfirm={() => console.log('Account deleted')}\n      onCancel={() => console.log('Cancelled')}\n    />\n  );\n}"
    }
],
  },

  divider: {
    id: "divider",
    name: "Divider",
    description: "A horizontal or vertical divider for separating content.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Divider",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","modal"],
    tags: ["separator","layout","visual"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic divider element","Visual separator only"]},
    examples: [
    {
        "title": "Basic Divider",
        "description": "A simple horizontal divider separating content sections. Use this to create visual separation between different areas of your interface.",
        "code": "import React from 'react';\nimport { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"space-y-4\">\n      <div className=\"text-foreground-300\">Content above</div>\n      <Divider />\n      <div className=\"text-foreground-300\">Content below</div>\n    </div>\n  );\n}"
    }
],
  },

  flex: {
    id: "flex",
    name: "Flex",
    description: "A flexible layout component with container query support for responsive flex layouts.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Flex",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","group","divider"],
    tags: ["layout","flex","container-queries","responsive"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic div element with flexbox layout","No built-in ARIA roles - use for layout purposes","Compose with accessible child components"]},
    examples: [
    {
        "title": "Basic Flex",
        "description": "A simple flex layout arranging items in a row. Use this component to easily create flexible layouts with consistent spacing.",
        "code": "import React from 'react';\nimport { Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"md\">\n      <div className=\"h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center\">1</div>\n      <div className=\"h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center\">2</div>\n      <div className=\"h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center\">3</div>\n    </Flex>\n  );\n}"
    }
],
  },

  fold: {
    id: "fold",
    name: "Fold",
    description: "A collapsible disclosure component for expanding and collapsing content sections.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Fold",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","modal"],
    tags: ["disclosure","accordion","collapsible","expandable"],
    accessibility: {"hasAriaSupport":true,"notes":["Full ARIA disclosure pattern support","Keyboard navigation with Tab and Enter/Space","Proper button and panel roles","Screen reader friendly"]},
    examples: [
    {
        "title": "Basic Fold",
        "description": "An expandable/collapsible disclosure component. Use this to show and hide content sections while maintaining accessibility and keyboard support.",
        "code": "import React from 'react';\nimport { Fold } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Fold title=\"What is a Fold component?\">\n      <p className=\"text-foreground-300\">\n        A Fold component is a disclosure widget that expands and collapses content.\n        It's built with React Aria for full accessibility support.\n      </p>\n    </Fold>\n  );\n}"
    }
],
  },

  form: {
    id: "form",
    name: "Form",
    description: "A Form component for organizing form elements.",
    category: "composition",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Form",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","button","label"],
    tags: ["form","composition","layout"],
    accessibility: {"hasAriaSupport":true,"notes":["Semantic form structure","Proper grouping of elements"]},
    examples: [
    {
        "title": "Basic Form",
        "description": "A simple form with input fields and submit button. Use this as the standard form container in your interface.",
        "code": "import React from 'react';\nimport { Form, FormField } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Form\n      initialValues={{ name: '', email: '' }}\n      onSubmit={(values) => {\n        console.log('Form submitted:', values);\n      }}\n    >\n      <FormField name=\"name\" label=\"Name\" required>\n        {(context) => (\n          <input\n            type=\"text\"\n            value={context.values.name || ''}\n            onChange={(e) => context.setFieldValue('name', e.target.value)}\n            onBlur={() => context.setFieldTouched('name')}\n          />\n        )}\n      </FormField>\n      <FormField name=\"email\" label=\"Email\" required>\n        {(context) => (\n          <input\n            type=\"email\"\n            value={context.values.email || ''}\n            onChange={(e) => context.setFieldValue('email', e.target.value)}\n            onBlur={() => context.setFieldTouched('email')}\n          />\n        )}\n      </FormField>\n      <button type=\"submit\">Submit</button>\n    </Form>\n  );\n}"
    }
],
  },

  gallery: {
    id: "gallery",
    name: "Gallery",
    description: "A responsive grid layout component for displaying media content like images, videos, and product cards.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Gallery",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","grid"],
    tags: ["gallery","grid","media","images","video","responsive"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses React Aria useFocusRing for keyboard focus indication","Supports both link and button interaction modes","Proper focus order through natural DOM order","Hover and focus states for visual feedback"]},
    examples: [
    {
        "title": "Basic Gallery",
        "description": "A simple gallery with multiple items in a grid layout. Use this for displaying collections of images or content.",
        "code": "import { Gallery } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Gallery columns={3} gap=\"md\">\n      <Gallery.Item>\n        <Gallery.View aspectRatio=\"1/1\">\n          <div style={{ background: '#e0e0e0', width: '100%', height: '100%' }} />\n        </Gallery.View>\n      </Gallery.Item>\n      <Gallery.Item>\n        <Gallery.View aspectRatio=\"1/1\">\n          <div style={{ background: '#d0d0d0', width: '100%', height: '100%' }} />\n        </Gallery.View>\n      </Gallery.Item>\n      <Gallery.Item>\n        <Gallery.View aspectRatio=\"1/1\">\n          <div style={{ background: '#c0c0c0', width: '100%', height: '100%' }} />\n        </Gallery.View>\n      </Gallery.Item>\n    </Gallery>\n  );\n}"
    },
    {
        "title": "Masonry Layout",
        "description": "A masonry layout that packs items efficiently based on their height. Ideal for mixed aspect ratio content.",
        "code": "import { Gallery } from 'ui-lab-components';\n\nconst items = [\n  { id: 1, height: 300, color: '#e0e0e0' },\n  { id: 2, height: 400, color: '#d0d0d0' },\n  { id: 3, height: 250, color: '#c0c0c0' },\n  { id: 4, height: 350, color: '#b0b0b0' },\n  { id: 5, height: 200, color: '#a0a0a0' },\n  { id: 6, height: 450, color: '#909090' },\n];\n\nexport default function Example() {\n  return (\n    <Gallery layout=\"masonry\" columns={3} gap=\"md\">\n      {items.map((item) => (\n        <Gallery.Item key={item.id}>\n           <div style={{\n              backgroundColor: item.color,\n              height: item.height,\n              width: '100%',\n              borderRadius: 8\n            }} />\n        </Gallery.Item>\n      ))}\n    </Gallery>\n  );\n}"
    },
    {
        "title": "Spanning Grid Layout",
        "description": "A mosaic grid layout with items spanning multiple columns and rows.",
        "code": "import { Gallery } from 'ui-lab-components';\n\nconst items = [\n  { id: 1, colSpan: 2, rowSpan: 2, color: '#e0e0e0', title: 'Main Feature' },\n  { id: 2, colSpan: 1, rowSpan: 1, color: '#d0d0d0', title: 'Item 2' },\n  { id: 3, colSpan: 1, rowSpan: 1, color: '#c0c0c0', title: 'Item 3' },\n  { id: 4, colSpan: 1, rowSpan: 2, color: '#b0b0b0', title: 'Tall Item' },\n  { id: 5, colSpan: 2, rowSpan: 1, color: '#a0a0a0', title: 'Wide Item' },\n  { id: 6, colSpan: 1, rowSpan: 1, color: '#909090', title: 'Item 6' },\n];\n\nexport default function Example() {\n  return (\n    <Gallery columns={4} gap=\"md\" style={{ gridAutoRows: '200px' }}>\n      {items.map((item) => (\n        <Gallery.Item\n          key={item.id}\n          columnSpan={item.colSpan}\n          rowSpan={item.rowSpan}\n        >\n          <div\n            style={{\n              backgroundColor: item.color,\n              width: '100%',\n              height: '100%',\n              borderRadius: '8px',\n              display: 'flex',\n              alignItems: 'center',\n              justifyContent: 'center',\n              color: '#333',\n              fontWeight: 'bold'\n            }}\n          >\n            {item.title}\n          </div>\n        </Gallery.Item>\n      ))}\n    </Gallery>\n  );\n}"
    }
],
  },

  grid: {
    id: "grid",
    name: "Grid",
    description: "A powerful grid layout component with container query support for responsive grid layouts.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Grid",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["flex","card","divider"],
    tags: ["layout","grid","container-queries","responsive","columns"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic div element with grid layout","No built-in ARIA roles - use for layout purposes","Compose with accessible child components"]},
    examples: [
    {
        "title": "Basic Grid",
        "description": "A simple grid layout with multiple cells. Use this for organizing content in a responsive grid structure.",
        "code": "import React from 'react';\nimport { Grid } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Grid columns=\"3\" gap=\"md\">\n      <div style={{ padding: '1rem', background: '#e0e0e0' }}>Cell 1</div>\n      <div style={{ padding: '1rem', background: '#d0d0d0' }}>Cell 2</div>\n      <div style={{ padding: '1rem', background: '#c0c0c0' }}>Cell 3</div>\n      <div style={{ padding: '1rem', background: '#b0b0b0' }}>Cell 4</div>\n      <div style={{ padding: '1rem', background: '#a0a0a0' }}>Cell 5</div>\n      <div style={{ padding: '1rem', background: '#909090' }}>Cell 6</div>\n    </Grid>\n  );\n}"
    }
],
  },

  group: {
    id: "group",
    name: "Group",
    description: "A flexible container for grouping Button, Input, and Select components with unified styling.",
    category: "composition",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Group",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["button","input","select"],
    tags: ["composition","grouped","compound","form"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses role=\"group\" for semantic grouping","Propagates disabled state to children","Maintains keyboard navigation for all child components"]},
    examples: [
    {
        "title": "Basic Group",
        "description": "A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.",
        "code": "import React from 'react';\nimport { Group, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Group>\n      <Button>First</Button>\n      <Button>Second</Button>\n      <Button>Third</Button>\n    </Group>\n  );\n}"
    }
],
  },

  input: {
    id: "input",
    name: "Input",
    description: "Text input field for capturing user data.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Input",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["label","form","group"],
    tags: ["form","text","user-input"],
    accessibility: {"hasAriaSupport":true,"notes":["Works with label elements","Supports placeholder text","Keyboard accessible"]},
    examples: [
    {
        "title": "Basic Input",
        "description": "A simple text input field with default styling. Use this as the standard input element for collecting user text input.",
        "code": "import React from 'react';\nimport { Input } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Input placeholder=\"Enter text...\" />;\n}"
    }
],
  },

  label: {
    id: "label",
    name: "Label",
    description: "Text label for form elements.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Label",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","checkbox","radio","switch"],
    tags: ["form","text","accessibility"],
    accessibility: {"hasAriaSupport":true,"notes":["Associates with form controls","Improves accessibility"]},
    examples: [
    {
        "title": "Basic Label",
        "description": "A simple label component associated with a form input. Use this to provide accessible labels for form elements.",
        "code": "import React from 'react';\nimport { Label, Input } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div>\n      <Label htmlFor=\"name\">Name</Label>\n      <Input id=\"name\" placeholder=\"Enter your name\" />\n    </div>\n  );\n}"
    }
],
  },

  menu: {
    id: "menu",
    name: "Menu",
    description: "A context menu for right-click actions.",
    category: "navigation",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Menu",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["popover"],
    tags: ["menu","right-click","actions"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","Menu role","Focus management"]},
    examples: [
    {
        "title": "Basic Menu",
        "description": "A simple context menu triggered by right-click. Use this to provide quick access to common actions and context-specific commands.",
        "code": "import React from 'react';\nimport { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>Copy</Menu.Item>\n        <Menu.Item>Paste</Menu.Item>\n        <Menu.Item disabled>Cut</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    }
],
  },

  modal: {
    id: "modal",
    name: "Modal",
    description: "A modal dialog for focusing user attention on important content.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Modal",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["button","card"],
    tags: ["dialog","overlay","container"],
    accessibility: {"hasAriaSupport":true,"notes":["Focus trap","Backdrop focus","Keyboard dismissal","ARIA dialog role"]},
    examples: [
    {
        "title": "Basic Modal",
        "description": "A simple modal dialog with a trigger button. Use this for important user interactions that require focused attention.",
        "code": "import React from 'react';\nimport { Modal, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>\n        <Modal.Header>Modal Title</Modal.Header>\n        <Modal.Body>This is the modal content. It displays important information or actions.</Modal.Body>\n      </Modal>\n    </>\n  );\n}"
    }
],
  },

  popover: {
    id: "popover",
    name: "Popover",
    description: "A popover component for displaying content on demand.",
    category: "feedback",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Popover",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["tooltip","modal"],
    tags: ["overlay","content","information"],
    accessibility: {"hasAriaSupport":true,"notes":["Focus management","Dismissible","Keyboard support"]},
    examples: [
    {
        "title": "Basic Popover",
        "description": "A simple popover with a trigger button. Use this to display contextual content or actions.",
        "code": "import React from 'react';\nimport { Popover, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Popover content={<p className=\"text-sm\">This is popover content. It appears when you click the button.</p>}>\n      <Button>Click me</Button>\n    </Popover>\n  );\n}"
    }
],
  },

  progress: {
    id: "progress",
    name: "Progress",
    description: "A progress bar component for showing completion status.",
    category: "feedback",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Progress",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["slider"],
    tags: ["feedback","status","progress"],
    accessibility: {"hasAriaSupport":true,"notes":["ARIA progressbar role","aria-valuenow","aria-valuemin","aria-valuemax"]},
    examples: [
    {
        "title": "Basic Progress",
        "description": "A simple progress bar showing completion at 65%. Use this to display task or loading progress in your interface.",
        "code": "import React from 'react';\nimport { Progress } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Progress value={65} />;\n}"
    }
],
  },

  radio: {
    id: "radio",
    name: "Radio",
    description: "A radio button for selecting one option from a group.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Radio",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["checkbox","switch","label"],
    tags: ["form","selection","single-choice"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","Radio group support","Arrow key navigation"]},
    examples: [
    {
        "title": "Basic Radio",
        "description": "A simple radio button option with a label. Use this for single-choice selection in forms and settings.",
        "code": "import React from 'react';\nimport { Radio } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Radio value=\"option1\" label=\"Select this option\" />\n  );\n}"
    }
],
  },

  scrollarea: {
    id: "scrollarea",
    name: "ScrollArea",
    description: "A scroll area component with custom scrollbars for overflowing content.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "ScrollArea",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["scroll","overflow","layout","scrollbar"],
    accessibility: {"hasAriaSupport":false,"notes":["Custom scrollbar implementation for visual consistency"]},
    examples: [
    {
        "title": "Basic ScrollArea",
        "description": "A simple scrollable container with fixed height. Use this to display overflow content in a constrained space.",
        "code": "import { ScrollArea } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <ScrollArea style={{ height: '200px', width: '300px' }}>\n      <div>\n        <p>This is scrollable content.</p>\n        <p>Add more content here to see scrolling in action.</p>\n        <p>The ScrollArea component manages overflow elegantly.</p>\n        <p>You can scroll through all of this content.</p>\n        <p>Perfect for constrained layouts.</p>\n      </div>\n    </ScrollArea>\n  );\n}"
    }
],
  },

  select: {
    id: "select",
    name: "Select",
    description: "Dropdown select component for choosing from multiple options.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Select",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","label","form","group"],
    tags: ["form","dropdown","selection"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","Screen reader friendly","ARIA roles included"]},
    examples: [
    {
        "title": "Basic Select",
        "description": "A simple dropdown select component with options. Use this for form inputs and user choices.",
        "code": "import React from 'react';\nimport { Select, SelectListBox } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Select>\n      <Select.Trigger>\n        <Select.Value placeholder=\"Select an option\" />\n      </Select.Trigger>\n      <Select.Content>\n        <SelectListBox>\n          <Select.Item value=\"option1\">Option 1</Select.Item>\n          <Select.Item value=\"option2\">Option 2</Select.Item>\n          <Select.Item value=\"option3\">Option 3</Select.Item>\n        </SelectListBox>\n      </Select.Content>\n    </Select>\n  );\n}"
    }
],
  },

  slider: {
    id: "slider",
    name: "Slider",
    description: "A slider component for selecting a value from a range.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Slider",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","label"],
    tags: ["form","range","numeric"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","ARIA range role","Arrow key support"]},
    examples: [
    {
        "title": "Basic Slider",
        "description": "A simple range slider with a default value. Perfect for adjusting values within a range like volume or brightness.",
        "code": "import React from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Slider.Root min={0} max={100} defaultValue={[50]} />;\n}"
    }
],
  },

  switch: {
    id: "switch",
    name: "Switch",
    description: "A toggle switch for boolean input.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Switch",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["checkbox","radio","label"],
    tags: ["form","boolean","toggle"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","ARIA switch role","Visual state indication"]},
    examples: [
    {
        "title": "Basic Switch",
        "description": "A simple toggle switch component. Use for binary on/off states like enabling features or toggling settings.",
        "code": "import React from 'react';\nimport { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Switch />;\n}"
    }
],
  },

  table: {
    id: "table",
    name: "Table",
    description: "A table component for displaying and organizing tabular data.",
    category: "data",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Table",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card"],
    tags: ["data","table","display"],
    accessibility: {"hasAriaSupport":true,"notes":["Table role","Header associations","Keyboard navigation"]},
    examples: [
    {
        "title": "Basic Table",
        "description": "A simple data table displaying structured information with columns and rows. Use this for displaying tabular data in your application.",
        "code": "import React from 'react';\nimport { Table } from 'ui-lab-components';\n\nexport default function Example() {\n  const data = [\n    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },\n    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' },\n    { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'Active' }\n  ];\n\n  return (\n    <Table\n      data={data}\n      columns={[\n        { key: 'id', label: 'ID' },\n        { key: 'name', label: 'Name' },\n        { key: 'email', label: 'Email' },\n        { key: 'status', label: 'Status' }\n      ]}\n    />\n  );\n}"
    }
],
  },

  tabs: {
    id: "tabs",
    name: "Tabs",
    description: "A tabbed interface for organizing content into sections.",
    category: "navigation",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Tabs",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card"],
    tags: ["navigation","organization","content-switching"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard navigation","ARIA tab roles","Focus management"]},
    examples: [
    {
        "title": "Basic Tabs",
        "description": "A simple tabbed interface with content switching. Use this to organize related content into separate views.",
        "code": "import React from 'react';\nimport { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tabs defaultValue=\"overview\">\n      <TabsList aria-label=\"Content sections\">\n        <TabsTrigger value=\"overview\">Overview</TabsTrigger>\n        <TabsTrigger value=\"details\">Details</TabsTrigger>\n        <TabsTrigger value=\"settings\">Settings</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\">\n        <p>Overview content goes here.</p>\n      </TabsContent>\n      <TabsContent value=\"details\">\n        <p>Details content goes here.</p>\n      </TabsContent>\n      <TabsContent value=\"settings\">\n        <p>Settings content goes here.</p>\n      </TabsContent>\n    </Tabs>\n  );\n}"
    }
],
  },

  textarea: {
    id: "textarea",
    name: "Textarea",
    description: "Multi-line text input field for longer user input.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "TextArea",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","label","form"],
    tags: ["form","text","multi-line"],
    accessibility: {"hasAriaSupport":true,"notes":["Works with label elements","Resizable option available"]},
    examples: [
    {
        "title": "Basic TextArea",
        "description": "A simple multi-line text input field. Use this for collecting longer text input like comments or descriptions.",
        "code": "import React from 'react';\nimport { TextArea } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <TextArea\n      placeholder=\"Enter your comments here...\"\n      rows={4}\n    />\n  );\n}"
    }
],
  },

  toast: {
    id: "toast",
    name: "Toast",
    description: "A notification component for displaying temporary messages.",
    category: "experimental",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Toast",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["notification","feedback","temporary"],
    accessibility: {"hasAriaSupport":true,"notes":["ARIA live regions","Role=\"status\"","Auto-dismiss support"]},
    examples: [
    {
        "title": "Basic Toast",
        "description": "A simple toast notification. Click the button to trigger a toast message with default styling.",
        "code": "import React from 'react';\nimport { toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <button onClick={() => toast({ title: 'Notification', description: 'This is a toast message' })}>\n        Show Toast\n      </button>\n      <Toaster />\n    </>\n  );\n}"
    },
    {
        "title": "Success Toast",
        "description": "Toast notification for successful operations.",
        "code": "import React from 'react';\nimport { toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <button\n        onClick={() =>\n          toast({\n            title: 'Success',\n            description: 'Operation completed successfully',\n            variant: 'success',\n          })\n        }\n        className=\"px-4 py-2 bg-accent-500 text-white rounded\"\n      >\n        Show Success\n      </button>\n      <Toaster />\n    </>\n  );\n}"
    },
    {
        "title": "Destructive Toast",
        "description": "Toast notification for errors or destructive operations.",
        "code": "import React from 'react';\nimport { toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <button\n        onClick={() =>\n          toast({\n            title: 'Error',\n            description: 'Something went wrong',\n            variant: 'destructive',\n          })\n        }\n        className=\"px-4 py-2 bg-accent-500 text-white rounded\"\n      >\n        Show Error\n      </button>\n      <Toaster />\n    </>\n  );\n}"
    },
    {
        "title": "Info Toast",
        "description": "Toast notification for informational messages.",
        "code": "import React from 'react';\nimport { toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <button\n        onClick={() =>\n          toast({\n            title: 'Info',\n            description: 'Here is some useful information',\n            variant: 'info',\n          })\n        }\n        className=\"px-4 py-2 bg-accent-500 text-white rounded\"\n      >\n        Show Info\n      </button>\n      <Toaster />\n    </>\n  );\n}"
    },
    {
        "title": "Warning Toast",
        "description": "Toast notification for warnings.",
        "code": "import React from 'react';\nimport { toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <button\n        onClick={() =>\n          toast({\n            title: 'Warning',\n            description: 'Please be careful',\n            variant: 'warning',\n          })\n        }\n        className=\"px-4 py-2 bg-accent-500 text-white rounded\"\n      >\n        Show Warning\n      </button>\n      <Toaster />\n    </>\n  );\n}"
    }
],
  },

  tooltip: {
    id: "tooltip",
    name: "Tooltip",
    description: "Displays additional information on hover or focus.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Tooltip",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["popover"],
    tags: ["information","hover","help-text"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","ARIA labels","Focus management"]},
    examples: [
    {
        "title": "Basic Tooltip",
        "description": "A simple tooltip that appears on hover. Hover over the button to see the tooltip with helpful information.",
        "code": "import React from 'react';\nimport { Tooltip } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tooltip content=\"This is a helpful tooltip\">\n      <button>Hover me</button>\n    </Tooltip>\n  );\n}"
    }
],
  },
};

export const componentMetadata = Object.values(componentRegistry).map(comp => ({
  id: comp.id,
  name: comp.name,
  description: comp.description,
  category: comp.category,
  tags: comp.tags || []
}));
