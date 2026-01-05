import type { ComponentAPI, ComponentStyles, ComponentSourceCode, ComponentDeps, PackageMetadata } from './types';

export const generatedAPI: Record<string, ComponentAPI> = {
  "anchor": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Anchor",
        "description": "A simple anchor component with custom underline. Hover to see the popover preview.",
        "code": "import React from 'react';\nimport { Anchor } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Anchor>\n      Learn more about this topic\n      <Anchor.Preview>\n        <div className=\"text-sm\">Preview content</div>\n      </Anchor.Preview>\n    </Anchor>\n  );\n}"
      },
      {
        "title": "Anchor with Rich Preview",
        "description": "Anchor component displaying a richer preview content on hover.",
        "code": "import React from 'react';\nimport { Anchor } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"space-y-4\">\n      <p>\n        This is a paragraph with an{' '}\n        <Anchor>\n          React documentation\n          <Anchor.Preview>\n            <div className=\"space-y-2 max-w-xs\">\n              <div className=\"font-semibold\">React Documentation</div>\n              <p className=\"text-xs opacity-90\">\n                Learn about React's component model and hooks for building interactive user interfaces.\n              </p>\n            </div>\n          </Anchor.Preview>\n        </Anchor>\n        {' '}link embedded in the text.\n      </p>\n    </div>\n  );\n}"
      },
      {
        "title": "Anchor Underline Variations",
        "description": "Customizing the anchor underline style using the Anchor.Underline compound component.",
        "code": "import React from 'react';\nimport { Anchor } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-6 items-start\">\n      <div className=\"space-y-2\">\n        <h4 className=\"text-sm font-medium text-foreground-300\">Solid (Default)</h4>\n        <Anchor>\n          Solid Underline\n          <Anchor.Underline variant=\"solid\" />\n          <Anchor.Preview>\n            <div className=\"text-sm\">Default solid underline</div>\n          </Anchor.Preview>\n        </Anchor>\n      </div>\n\n      <div className=\"space-y-2\">\n        <h4 className=\"text-sm font-medium text-foreground-300\">Dashed</h4>\n        <Anchor>\n          Dashed Underline\n          <Anchor.Underline variant=\"dashed\" />\n          <Anchor.Preview>\n            <div className=\"text-sm\">Dashed underline variant</div>\n          </Anchor.Preview>\n        </Anchor>\n      </div>\n\n      <div className=\"space-y-2\">\n        <h4 className=\"text-sm font-medium text-foreground-300\">Dotted</h4>\n        <Anchor>\n          Dotted Underline\n          <Anchor.Underline variant=\"dotted\" />\n          <Anchor.Preview>\n            <div className=\"text-sm\">Dotted underline variant</div>\n          </Anchor.Preview>\n        </Anchor>\n      </div>\n      \n       <div className=\"space-y-2\">\n        <h4 className=\"text-sm font-medium text-foreground-300\">Custom Color</h4>\n        <Anchor>\n          Colored Underline\n          <Anchor.Underline style={{ background: '#3b82f6' }} />\n          <Anchor.Preview>\n            <div className=\"text-sm\">Underline with custom inline style</div>\n          </Anchor.Preview>\n        </Anchor>\n      </div>\n    </div>\n  );\n}"
      }
    ]
  },
  "badge": {
    "props": [
      {
        "name": "variant",
        "type": "default | success | warning | danger | info",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "success",
          "warning",
          "danger",
          "info"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onDismiss",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "pill",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Badge",
        "description": "A simple badge with default styling. Use this to display labels, tags, or status indicators in your interface.",
        "code": "import React from 'react';\nimport { Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Badge>New</Badge>;\n}"
      }
    ]
  },
  "breadcrumbs": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "separator",
        "type": "ReactNode",
        "required": false
      }
    ],
    "subComponents": {
      "Breadcrumb": [
        {
          "name": "href",
          "type": "string",
          "required": false
        },
        {
          "name": "onPress",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "isCurrent",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "isDisabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ]
    },
    "examples": [
      {
        "title": "Basic Breadcrumbs",
        "description": "A simple breadcrumb navigation showing the current page location. Use this to help users understand their position in the site hierarchy.",
        "code": "import { Breadcrumbs, Breadcrumb } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Breadcrumbs>\n      <Breadcrumb href=\"/\">Home</Breadcrumb>\n      <Breadcrumb href=\"/products\">Products</Breadcrumb>\n      <Breadcrumb href=\"/products/electronics\">Electronics</Breadcrumb>\n      <Breadcrumb>Laptop</Breadcrumb>\n    </Breadcrumbs>\n  );\n}"
      }
    ]
  },
  "button": {
    "props": [
      {
        "name": "variant",
        "type": "primary | secondary | outline | ghost",
        "required": false,
        "defaultValue": "primary",
        "enumValues": [
          "primary",
          "secondary",
          "outline",
          "ghost"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onPress",
        "type": "((e: { target: EventTarget | null; }) => void)",
        "required": false
      }
    ],
    "examples": [
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
    ]
  },
  "card": {
    "props": [],
    "subComponents": {
      "Card.Header": [],
      "Card.Body": [],
      "Card.Footer": []
    },
    "examples": [
      {
        "title": "Basic Card",
        "description": "A simple card container with header, body, and footer sections. Use this to group related content in your interface.",
        "code": "import { Card } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Card>\n      <Card.Header>\n        <h3>Card Title</h3>\n      </Card.Header>\n      <Card.Body>\n        <p>This is the card content area where you can place any information or components.</p>\n      </Card.Body>\n      <Card.Footer>\n        <p>Footer content</p>\n      </Card.Footer>\n    </Card>\n  );\n}"
      }
    ]
  },
  "checkbox": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "isIndeterminate",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Checkbox",
        "description": "A simple checkbox with a label. Use this as the standard checkbox input in your forms.",
        "code": "import React from 'react';\nimport { Checkbox } from 'ui-lab-components';\n\nexport default function Example() {\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Checkbox\n      checked={checked}\n      onChange={(e) => setChecked(e.target.checked)}\n      label=\"Accept terms and conditions\"\n    />\n  );\n}"
      }
    ]
  },
  "command": {
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onOpenChange",
        "type": "((open: boolean) => void)",
        "required": false
      },
      {
        "name": "commands",
        "type": "Command[]",
        "required": false,
        "defaultValue": "[]"
      },
      {
        "name": "onCommandExecute",
        "type": "((command: Command) => void)",
        "required": false
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "defaultValue": "Type a command or search..."
      },
      {
        "name": "emptyStateMessage",
        "type": "string",
        "required": false,
        "defaultValue": "No commands found."
      },
      {
        "name": "showCategories",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "closeOnExecute",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "overlayClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "enableSmartSearch",
        "type": "boolean",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Command Palette",
        "description": "A searchable command palette with keyboard shortcuts. Use this for quick access to application actions.",
        "code": "import React from 'react';\nimport { CommandPalette, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [open, setOpen] = React.useState(false);\n\n  const commands = [\n    {\n      id: 'search',\n      label: 'Search',\n      description: 'Search documents',\n      shortcut: '⌘F',\n      action: () => console.log('Search'),\n    },\n    {\n      id: 'create',\n      label: 'Create new',\n      description: 'Create a new document',\n      shortcut: '⌘N',\n      action: () => console.log('Create'),\n    },\n    {\n      id: 'settings',\n      label: 'Settings',\n      description: 'Open application settings',\n      shortcut: '⌘,',\n      action: () => console.log('Settings'),\n    },\n  ];\n\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>\n        Open Palette (⌘K)\n      </Button>\n      <CommandPalette\n        open={open}\n        onOpenChange={setOpen}\n        commands={commands}\n      />\n    </>\n  );\n}"
      }
    ]
  },
  "confirmation": {
    "props": [
      {
        "name": "mode",
        "type": "inline | dialog | auto",
        "required": false,
        "defaultValue": "auto",
        "enumValues": [
          "inline",
          "dialog",
          "auto"
        ]
      },
      {
        "name": "severity",
        "type": "low | medium | high | critical",
        "required": false,
        "defaultValue": "medium",
        "enumValues": [
          "low",
          "medium",
          "high",
          "critical"
        ]
      },
      {
        "name": "onConfirm",
        "type": "() => void | Promise<void>",
        "required": true
      },
      {
        "name": "onCancel",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "required": true
      },
      {
        "name": "confirmLabel",
        "type": "string",
        "required": false,
        "defaultValue": "Confirm"
      },
      {
        "name": "cancelLabel",
        "type": "string",
        "required": false,
        "defaultValue": "Cancel"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "title",
        "type": "string",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "destructiveActionWarning",
        "type": "string",
        "required": false
      },
      {
        "name": "countdownSeconds",
        "type": "number",
        "required": false
      },
      {
        "name": "requiresReason",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "confirmationText",
        "type": "string",
        "required": false
      },
      {
        "name": "autoResetAfter",
        "type": "number",
        "required": false
      }
    ]
  },
  "divider": {
    "props": [
      {
        "name": "variant",
        "type": "solid | dashed | dotted",
        "required": false,
        "defaultValue": "solid",
        "enumValues": [
          "solid",
          "dashed",
          "dotted"
        ]
      },
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "spacing",
        "type": "sm | md | lg | none",
        "required": false,
        "enumValues": [
          "sm",
          "md",
          "lg",
          "none"
        ]
      }
    ],
    "examples": [
      {
        "title": "Basic Divider",
        "description": "A simple horizontal divider separating content sections. Use this to create visual separation between different areas of your interface.",
        "code": "import React from 'react';\nimport { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"space-y-4\">\n      <div className=\"text-foreground-300\">Content above</div>\n      <Divider />\n      <div className=\"text-foreground-300\">Content below</div>\n    </div>\n  );\n}"
      },
      {
        "title": "Pattern Variants",
        "description": "Dividers support three distinct pattern styles: solid for continuous lines, dashed for rectangular segments, and dotted for circular dots.",
        "code": "import React from 'react';\nimport { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"space-y-6 w-full\">\n      <div className=\"space-y-2\">\n        <span className=\"text-xs text-foreground-400\">Solid</span>\n        <Divider variant=\"solid\" />\n      </div>\n      <div className=\"space-y-2\">\n        <span className=\"text-xs text-foreground-400\">Dashed</span>\n        <Divider variant=\"dashed\" />\n      </div>\n      <div className=\"space-y-2\">\n        <span className=\"text-xs text-foreground-400\">Dotted</span>\n        <Divider variant=\"dotted\" />\n      </div>\n    </div>\n  );\n}"
      },
      {
        "title": "Vertical Orientation",
        "description": "Vertical dividers separate side-by-side content. All pattern variants work in both horizontal and vertical orientations.",
        "code": "import React from 'react';\nimport { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center gap-4 h-16\">\n      <span className=\"text-foreground-300\">First</span>\n      <Divider orientation=\"vertical\" variant=\"solid\" spacing=\"none\" />\n      <span className=\"text-foreground-300\">Second</span>\n      <Divider orientation=\"vertical\" variant=\"dashed\" spacing=\"none\" />\n      <span className=\"text-foreground-300\">Third</span>\n      <Divider orientation=\"vertical\" variant=\"dotted\" spacing=\"none\" />\n      <span className=\"text-foreground-300\">Fourth</span>\n    </div>\n  );\n}"
      }
    ]
  },
  "easing-preview": {
    "props": [
      {
        "name": "easing",
        "type": "smoothSettle | snappyPop | gentleEase",
        "required": true,
        "enumValues": [
          "smoothSettle",
          "snappyPop",
          "gentleEase"
        ]
      },
      {
        "name": "size",
        "type": "sm | md",
        "required": false,
        "defaultValue": "sm",
        "enumValues": [
          "sm",
          "md"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "defaultValue": ""
      }
    ]
  },
  "flex": {
    "props": [
      {
        "name": "direction",
        "type": "row | column",
        "required": false,
        "defaultValue": "row",
        "enumValues": [
          "row",
          "column"
        ]
      },
      {
        "name": "wrap",
        "type": "wrap | nowrap",
        "required": false,
        "defaultValue": "nowrap",
        "enumValues": [
          "wrap",
          "nowrap"
        ]
      },
      {
        "name": "gap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "justify",
        "type": "flex-start | flex-end | center | space-between | space-around | space-evenly",
        "required": false,
        "defaultValue": "flex-start",
        "enumValues": [
          "flex-start",
          "flex-end",
          "center",
          "space-between",
          "space-around",
          "space-evenly"
        ]
      },
      {
        "name": "align",
        "type": "flex-start | flex-end | center | stretch | baseline",
        "required": false,
        "defaultValue": "stretch",
        "enumValues": [
          "flex-start",
          "flex-end",
          "center",
          "stretch",
          "baseline"
        ]
      },
      {
        "name": "containerQueryResponsive",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Flex",
        "description": "A simple flex layout arranging items in a row. Use this component to easily create flexible layouts with consistent spacing.",
        "code": "import React from 'react';\nimport { Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"md\">\n      <div className=\"h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center\">1</div>\n      <div className=\"h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center\">2</div>\n      <div className=\"h-16 w-20 bg-background-800 rounded border border-accent-500/50 flex items-center justify-center\">3</div>\n    </Flex>\n  );\n}"
      }
    ]
  },
  "fold": {
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "isExpanded",
        "type": "boolean",
        "required": false
      },
      {
        "name": "defaultExpanded",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onExpandedChange",
        "type": "((isExpanded: boolean) => void)",
        "required": false
      },
      {
        "name": "onChange",
        "type": "((isExpanded: boolean) => void)",
        "required": false
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "triggerClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Fold",
        "description": "An expandable/collapsible disclosure component. Use this to show and hide content sections while maintaining accessibility and keyboard support.",
        "code": "import React from 'react';\nimport { Fold } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Fold title=\"What is a Fold component?\">\n      <p className=\"text-foreground-300\">\n        A Fold component is a disclosure widget that expands and collapses content.\n        It's built with React Aria for full accessibility support.\n      </p>\n    </Fold>\n  );\n}"
      }
    ]
  },
  "gallery": {
    "props": [
      {
        "name": "columns",
        "type": "number | ResponsiveColumns",
        "required": false,
        "defaultValue": "3"
      },
      {
        "name": "gap",
        "type": "string | number",
        "required": false
      },
      {
        "name": "layout",
        "type": "grid",
        "required": false,
        "defaultValue": "grid",
        "enumValues": [
          "grid"
        ]
      },
      {
        "name": "columnWidth",
        "type": "string | number",
        "required": false
      }
    ],
    "subComponents": {
      "Gallery.Item": [
        {
          "name": "href",
          "type": "string",
          "required": false
        },
        {
          "name": "onPress",
          "type": "((href?: string) => void)",
          "required": false
        },
        {
          "name": "columnSpan",
          "type": "number",
          "required": false
        },
        {
          "name": "rowSpan",
          "type": "number",
          "required": false
        },
        {
          "name": "orientation",
          "type": "vertical | horizontal",
          "required": false,
          "defaultValue": "vertical",
          "enumValues": [
            "vertical",
            "horizontal"
          ]
        }
      ],
      "Gallery.View": [
        {
          "name": "aspectRatio",
          "type": "string",
          "required": false,
          "defaultValue": "16/9"
        }
      ],
      "Gallery.Body": []
    },
    "examples": [
      {
        "title": "Basic Gallery",
        "description": "A simple gallery with multiple items in a grid layout. Use this for displaying collections of images or content.",
        "code": "import { Gallery } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Gallery columns={3} gap=\"md\">\n      <Gallery.Item>\n        <Gallery.View aspectRatio=\"1/1\">\n          <div style={{ background: '#e0e0e0', width: '100%', height: '100%' }} />\n        </Gallery.View>\n      </Gallery.Item>\n      <Gallery.Item>\n        <Gallery.View aspectRatio=\"1/1\">\n          <div style={{ background: '#d0d0d0', width: '100%', height: '100%' }} />\n        </Gallery.View>\n      </Gallery.Item>\n      <Gallery.Item>\n        <Gallery.View aspectRatio=\"1/1\">\n          <div style={{ background: '#c0c0c0', width: '100%', height: '100%' }} />\n        </Gallery.View>\n      </Gallery.Item>\n    </Gallery>\n  );\n}"
      }
    ]
  },
  "grid": {
    "props": [
      {
        "name": "columns",
        "type": "1 | 2 | 3 | 4 | 5 | 6 | auto-fit | auto-fill",
        "required": false,
        "defaultValue": "3",
        "enumValues": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "auto-fit",
          "auto-fill"
        ]
      },
      {
        "name": "rows",
        "type": "1 | 2 | 3 | 4 | 5 | 6 | auto",
        "required": false,
        "defaultValue": "auto",
        "enumValues": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "auto"
        ]
      },
      {
        "name": "gap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "rowGap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "columnGap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "enumValues": [
          "xs",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "justifyItems",
        "type": "start | end | center | stretch",
        "required": false,
        "defaultValue": "stretch",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch"
        ]
      },
      {
        "name": "alignItems",
        "type": "start | end | center | stretch | baseline",
        "required": false,
        "defaultValue": "stretch",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch",
          "baseline"
        ]
      },
      {
        "name": "justifyContent",
        "type": "start | end | center | stretch | space-between | space-around | space-evenly",
        "required": false,
        "defaultValue": "start",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch",
          "space-between",
          "space-around",
          "space-evenly"
        ]
      },
      {
        "name": "alignContent",
        "type": "start | end | center | stretch | space-between | space-around | space-evenly",
        "required": false,
        "defaultValue": "start",
        "enumValues": [
          "start",
          "end",
          "center",
          "stretch",
          "space-between",
          "space-around",
          "space-evenly"
        ]
      },
      {
        "name": "autoFlow",
        "type": "row | column | row-dense | column-dense",
        "required": false,
        "defaultValue": "row",
        "enumValues": [
          "row",
          "column",
          "row-dense",
          "column-dense"
        ]
      },
      {
        "name": "containerQueryResponsive",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Grid",
        "description": "A simple grid layout with multiple cells. Use this for organizing content in a responsive grid structure.",
        "code": "import React from 'react';\nimport { Grid } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Grid columns=\"3\" gap=\"md\">\n      <div style={{ padding: '1rem', background: '#e0e0e0' }}>Cell 1</div>\n      <div style={{ padding: '1rem', background: '#d0d0d0' }}>Cell 2</div>\n      <div style={{ padding: '1rem', background: '#c0c0c0' }}>Cell 3</div>\n      <div style={{ padding: '1rem', background: '#b0b0b0' }}>Cell 4</div>\n      <div style={{ padding: '1rem', background: '#a0a0a0' }}>Cell 5</div>\n      <div style={{ padding: '1rem', background: '#909090' }}>Cell 6</div>\n    </Grid>\n  );\n}"
      }
    ]
  },
  "group": {
    "props": [
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "spacing",
        "type": "tight | normal | relaxed",
        "required": false,
        "defaultValue": "normal",
        "enumValues": [
          "tight",
          "normal",
          "relaxed"
        ]
      },
      {
        "name": "variant",
        "type": "primary | secondary | outline | ghost",
        "required": false,
        "defaultValue": "primary",
        "enumValues": [
          "primary",
          "secondary",
          "outline",
          "ghost"
        ]
      },
      {
        "name": "showDividers",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Group",
        "description": "A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.",
        "code": "import React from 'react';\nimport { Group, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Group>\n      <Button>First</Button>\n      <Button>Second</Button>\n      <Button>Third</Button>\n    </Group>\n  );\n}"
      }
    ]
  },
  "input": {
    "props": [
      {
        "name": "variant",
        "type": "default | ghost",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "ghost"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "prefixIcon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "suffixIcon",
        "type": "ReactNode",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Input",
        "description": "A simple text input field with default styling. Use this as the standard input element for collecting user text input.",
        "code": "import React from 'react';\nimport { Input } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Input placeholder=\"Enter text...\" />;\n}"
      }
    ]
  },
  "label": {
    "props": [
      {
        "name": "required",
        "type": "boolean",
        "required": false
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\" | null",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean | null",
        "required": false
      },
      {
        "name": "error",
        "type": "boolean | null",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Label",
        "description": "A simple label component associated with a form input. Use this to provide accessible labels for form elements.",
        "code": "import React from 'react';\nimport { Label, Input } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div>\n      <Label htmlFor=\"name\">Name</Label>\n      <Input id=\"name\" placeholder=\"Enter your name\" />\n    </div>\n  );\n}"
      }
    ]
  },
  "list": {
    "props": [
      {
        "name": "ariaLabel",
        "type": "string",
        "required": true
      },
      {
        "name": "variant",
        "type": "default | feed",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "feed"
        ]
      },
      {
        "name": "onSelect",
        "type": "((id: string | number) => void)",
        "required": false
      }
    ],
    "subComponents": {
      "List.Container": [
        {
          "name": "ariaLabel",
          "type": "string",
          "required": true
        },
        {
          "name": "variant",
          "type": "default | feed",
          "required": false,
          "defaultValue": "default",
          "enumValues": [
            "default",
            "feed"
          ]
        },
        {
          "name": "onSelect",
          "type": "((id: string | number) => void)",
          "required": false
        }
      ],
      "List.Header": [
        {
          "name": "sticky",
          "type": "boolean",
          "required": false
        }
      ],
      "List.Item": [
        {
          "name": "selected",
          "type": "boolean",
          "required": false
        },
        {
          "name": "interactive",
          "type": "boolean",
          "required": false
        },
        {
          "name": "onClick",
          "type": "((e: MouseEvent<Element, MouseEvent>) => void)",
          "required": false
        }
      ],
      "List.ActionGroup": [
        {
          "name": "justify",
          "type": "flex-start | space-between | flex-end",
          "required": false,
          "defaultValue": "flex-start",
          "enumValues": [
            "flex-start",
            "space-between",
            "flex-end"
          ]
        }
      ],
      "List.Divider": [],
      "List.Footer": [
        {
          "name": "align",
          "type": "flex-start | flex-end | center",
          "required": false,
          "defaultValue": "center",
          "enumValues": [
            "flex-start",
            "flex-end",
            "center"
          ]
        }
      ]
    },
    "examples": [
      {
        "title": "Basic List",
        "description": "A simple list displaying basic items with selection and interaction support.",
        "code": "import { List } from 'ui-lab-components';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <List ariaLabel=\"Basic List Example\">\n      <List.Header>\n        <h2>Items</h2>\n      </List.Header>\n      <List.Item interactive>Item One</List.Item>\n      <List.Item interactive>Item Two</List.Item>\n      <List.Item interactive>Item Three</List.Item>\n      <List.Footer align=\"center\">\n        <Button variant=\"primary\" size=\"sm\">\n          Load More\n        </Button>\n      </List.Footer>\n    </List>\n  );\n}"
      }
    ]
  },
  "menu": {
    "props": [
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "asChild",
        "type": "boolean",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "MenuContent": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "onCloseAutoFocus",
          "type": "((event: Event) => void)",
          "required": false
        },
        {
          "name": "onEscapeKeyDown",
          "type": "((event: KeyboardEvent) => void)",
          "required": false
        },
        {
          "name": "onPointerDownOutside",
          "type": "((event: PointerEvent) => void)",
          "required": false
        },
        {
          "name": "alignOffset",
          "type": "number",
          "required": false
        },
        {
          "name": "sideOffset",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        }
      ],
      "MenuGroup": [],
      "MenuRadioGroup": [
        {
          "name": "value",
          "type": "string",
          "required": false
        },
        {
          "name": "onValueChange",
          "type": "((value: string) => void)",
          "required": false
        }
      ],
      "MenuLabel": [
        {
          "name": "inset",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "MenuSeparator": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "MenuShortcut": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "MenuItem": [
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onSelect",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "inset",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        },
        {
          "name": "_isInSubmenu",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuCheckboxItem": [
        {
          "name": "checked",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onCheckedChange",
          "type": "((checked: boolean) => void)",
          "required": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onSelect",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        },
        {
          "name": "_isInSubmenu",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuRadioItem": [
        {
          "name": "value",
          "type": "string",
          "required": true
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onSelect",
          "type": "(() => void)",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        },
        {
          "name": "_isInSubmenu",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuSub": [
        {
          "name": "open",
          "type": "boolean",
          "required": false
        },
        {
          "name": "defaultOpen",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "onOpenChange",
          "type": "((open: boolean) => void)",
          "required": false
        }
      ],
      "MenuSubTrigger": [
        {
          "name": "disabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "inset",
          "type": "boolean",
          "required": false
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "_index",
          "type": "number",
          "required": false,
          "defaultValue": "0"
        },
        {
          "name": "_isHighlighted",
          "type": "boolean",
          "required": false
        }
      ],
      "MenuSubContent": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "sideOffset",
          "type": "number",
          "required": false,
          "defaultValue": "2"
        },
        {
          "name": "alignOffset",
          "type": "number",
          "required": false,
          "defaultValue": "-4"
        }
      ],
      "MenuContext": [],
      "MenuSubmenuContext": [],
      "RadioGroupContext": [],
      "Menu": [
        {
          "name": "selectionMode",
          "type": "none | single | multiple",
          "required": false,
          "defaultValue": "none",
          "enumValues": [
            "none",
            "single",
            "multiple"
          ]
        },
        {
          "name": "selectedKeys",
          "type": "Set<Key>",
          "required": false
        },
        {
          "name": "defaultSelectedKeys",
          "type": "Set<Key>",
          "required": false
        },
        {
          "name": "onSelectionChange",
          "type": "((keys: Set<Key>) => void)",
          "required": false
        }
      ],
      "MenuPortal": [
        {
          "name": "container",
          "type": "HTMLElement",
          "required": false
        }
      ]
    },
    "examples": [
      {
        "title": "Basic Menu",
        "description": "A simple context menu triggered by right-click. Use this to provide quick access to common actions and context-specific commands.",
        "code": "import React from 'react';\nimport { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-lg border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>Copy</Menu.Item>\n        <Menu.Item>Paste</Menu.Item>\n        <Menu.Item disabled>Cut</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
      }
    ]
  },
  "modal": {
    "props": [],
    "subComponents": {
      "Modal.Body": [],
      "Modal.Footer": []
    },
    "examples": [
      {
        "title": "Basic Modal",
        "description": "A simple modal dialog with a trigger button. Use this for important user interactions that require focused attention.",
        "code": "import React from 'react';\nimport { Modal, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>\n        <Modal.Header>Modal Title</Modal.Header>\n        <Modal.Body>This is the modal content. It displays important information or actions.</Modal.Body>\n      </Modal>\n    </>\n  );\n}"
      }
    ]
  },
  "popover": {
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "position",
        "type": "top | right | bottom | left",
        "required": false,
        "defaultValue": "bottom",
        "enumValues": [
          "top",
          "right",
          "bottom",
          "left"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Popover",
        "description": "A simple popover with a trigger button. Use this to display contextual content or actions.",
        "code": "import React from 'react';\nimport { Popover, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Popover content={<p className=\"text-sm\">This is popover content. It appears when you click the button.</p>}>\n      <Button>Click me</Button>\n    </Popover>\n  );\n}"
      }
    ]
  },
  "progress": {
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "defaultValue": "0"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "defaultValue": "100"
      },
      {
        "name": "variant",
        "type": "default | success | warning | error",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "success",
          "warning",
          "error"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "animated",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Progress",
        "description": "A simple progress bar showing completion at 65%. Use this to display task or loading progress in your interface.",
        "code": "import React from 'react';\nimport { Progress } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Progress value={65} />;\n}"
      }
    ]
  },
  "radio": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Radio",
        "description": "A simple radio button option with a label. Use this for single-choice selection in forms and settings.",
        "code": "import React from 'react';\nimport { Radio } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Radio value=\"option1\" label=\"Select this option\" />\n  );\n}"
      }
    ]
  },
  "scroll-area": {
    "props": [
      {
        "name": "maxHeight",
        "type": "string",
        "required": false,
        "defaultValue": "100%"
      },
      {
        "name": "maxWidth",
        "type": "string",
        "required": false,
        "defaultValue": "100%"
      },
      {
        "name": "direction",
        "type": "vertical | horizontal",
        "required": false,
        "defaultValue": "vertical",
        "enumValues": [
          "vertical",
          "horizontal"
        ]
      }
    ]
  },
  "select": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "SearchableContent": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "searchPlaceholder",
          "type": "string",
          "required": false,
          "defaultValue": "Search items..."
        },
        {
          "name": "onSearch",
          "type": "((value: string) => void)",
          "required": false
        }
      ],
      "SelectSeparator": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "SelectScrollUpButton": [],
      "SelectScrollDownButton": [],
      "SelectItem": [
        {
          "name": "value",
          "type": "Key",
          "required": true
        },
        {
          "name": "textValue",
          "type": "string",
          "required": false
        },
        {
          "name": "isDisabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "icon",
          "type": "ReactNode",
          "required": false
        },
        {
          "name": "_focusedKey",
          "type": "Key | null",
          "required": false
        }
      ],
      "SelectGroup": [
        {
          "name": "key",
          "type": "string",
          "required": false
        },
        {
          "name": "title",
          "type": "string",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "SelectValue": [
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "defaultValue": "Select an option"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "icon",
          "type": "ReactNode",
          "required": false
        }
      ],
      "SelectTrigger": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "chevron",
          "type": "ReactNode",
          "required": false
        }
      ],
      "SearchableTrigger": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "placeholder",
          "type": "string",
          "required": false,
          "defaultValue": "Search..."
        }
      ],
      "Select": [
        {
          "name": "items",
          "type": "any[]",
          "required": false,
          "defaultValue": "[]"
        },
        {
          "name": "selectedKey",
          "type": "Key | null",
          "required": false
        },
        {
          "name": "defaultSelectedKey",
          "type": "Key | null",
          "required": false
        },
        {
          "name": "defaultValue",
          "type": "string | null",
          "required": false
        },
        {
          "name": "onSelectionChange",
          "type": "((key: Key | null) => void)",
          "required": false
        },
        {
          "name": "isDisabled",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "autoFocus",
          "type": "boolean",
          "required": false,
          "defaultValue": "false"
        },
        {
          "name": "maxItems",
          "type": "number",
          "required": false,
          "defaultValue": "6"
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "trigger",
          "type": "click | hover",
          "required": false,
          "defaultValue": "click",
          "enumValues": [
            "click",
            "hover"
          ]
        }
      ],
      "SelectListBox": [
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ]
    },
    "examples": [
      {
        "title": "Basic Select",
        "description": "A simple dropdown select component with options. Use this for form inputs and user choices.",
        "code": "import React from 'react';\nimport { Select, SelectListBox } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Select>\n      <Select.Trigger>\n        <Select.Value placeholder=\"Select an option\" />\n      </Select.Trigger>\n      <Select.Content>\n        <SelectListBox>\n          <Select.Item value=\"option1\">Option 1</Select.Item>\n          <Select.Item value=\"option2\">Option 2</Select.Item>\n          <Select.Item value=\"option3\">Option 3</Select.Item>\n        </SelectListBox>\n      </Select.Content>\n    </Select>\n  );\n}"
      }
    ]
  },
  "slider": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "defaultValue": "0"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "defaultValue": "100"
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "defaultValue": "1"
      },
      {
        "name": "defaultValue",
        "type": "number | number[]",
        "required": false
      },
      {
        "name": "value",
        "type": "number | number[]",
        "required": false
      },
      {
        "name": "onValueChange",
        "type": "((value: number[]) => void)",
        "required": false
      },
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Slider",
        "description": "A simple range slider with a default value. Perfect for adjusting values within a range like volume or brightness.",
        "code": "import React from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Slider.Root min={0} max={100} defaultValue={[50]} />;\n}"
      }
    ]
  },
  "switch": {
    "props": [
      {
        "name": "isSelected",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onChange",
        "type": "((isSelected: boolean) => void)",
        "required": false
      },
      {
        "name": "defaultSelected",
        "type": "boolean",
        "required": false
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "pill",
        "type": "boolean",
        "required": false
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Switch",
        "description": "A simple toggle switch component. Use for binary on/off states like enabling features or toggling settings.",
        "code": "import React from 'react';\nimport { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Switch />;\n}"
      }
    ]
  },
  "table": {
    "props": [
      {
        "name": "data",
        "type": "T[]",
        "required": true
      },
      {
        "name": "columns",
        "type": "Column<T>[]",
        "required": true
      },
      {
        "name": "showFilters",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "onRowClick",
        "type": "((row: T) => void)",
        "required": false
      },
      {
        "name": "onFilterChange",
        "type": "((filters: Record<string, string>) => void)",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Table",
        "description": "A simple data table displaying structured information with columns and rows. Use this for displaying tabular data in your application.",
        "code": "import React from 'react';\nimport { Table } from 'ui-lab-components';\n\nexport default function Example() {\n  const data = [\n    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },\n    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' },\n    { id: 3, name: 'Carol White', email: 'carol@example.com', status: 'Active' }\n  ];\n\n  return (\n    <Table\n      data={data}\n      columns={[\n        { key: 'id', label: 'ID' },\n        { key: 'name', label: 'Name' },\n        { key: 'email', label: 'Email' },\n        { key: 'status', label: 'Status' }\n      ]}\n    />\n  );\n}"
      }
    ]
  },
  "tabs": {
    "props": [
      {
        "name": "variant",
        "type": "default | underline",
        "required": false,
        "defaultValue": "default",
        "enumValues": [
          "default",
          "underline"
        ]
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false
      },
      {
        "name": "value",
        "type": "string",
        "required": false
      },
      {
        "name": "onValueChange",
        "type": "((value: string) => void)",
        "required": false
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      }
    ],
    "subComponents": {
      "TabsList": [
        {
          "name": "className",
          "type": "string",
          "required": false
        },
        {
          "name": "aria-label",
          "type": "string",
          "required": false
        }
      ],
      "TabsTrigger": [
        {
          "name": "value",
          "type": "string",
          "required": true
        },
        {
          "name": "icon",
          "type": "ReactNode",
          "required": false
        },
        {
          "name": "disabled",
          "type": "boolean",
          "required": false
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ],
      "TabsContent": [
        {
          "name": "value",
          "type": "string",
          "required": true
        },
        {
          "name": "className",
          "type": "string",
          "required": false
        }
      ]
    },
    "examples": [
      {
        "title": "Basic Tabs",
        "description": "A simple tabbed interface with content switching. Use this to organize related content into separate views.",
        "code": "import React from 'react';\nimport { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tabs defaultValue=\"overview\">\n      <TabsList aria-label=\"Content sections\">\n        <TabsTrigger value=\"overview\">Overview</TabsTrigger>\n        <TabsTrigger value=\"details\">Details</TabsTrigger>\n        <TabsTrigger value=\"settings\">Settings</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\">\n        <p>Overview content goes here.</p>\n      </TabsContent>\n      <TabsContent value=\"details\">\n        <p>Details content goes here.</p>\n      </TabsContent>\n      <TabsContent value=\"settings\">\n        <p>Settings content goes here.</p>\n      </TabsContent>\n    </Tabs>\n  );\n}"
      }
    ]
  },
  "textarea": {
    "props": [
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "resizable",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "showCharacterCount",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "maxCharacters",
        "type": "number",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic TextArea",
        "description": "A simple multi-line text input field. Use this for collecting longer text input like comments or descriptions.",
        "code": "import React from 'react';\nimport { TextArea } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <TextArea\n      placeholder=\"Enter your comments here...\"\n      rows={4}\n    />\n  );\n}"
      }
    ]
  },
  "toast": {
    "props": [
      {
        "name": "toast",
        "type": "ToastProps",
        "required": true
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "pauseOnFocus",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
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
    ]
  },
  "tooltip": {
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "position",
        "type": "top | right | bottom | left",
        "required": false,
        "defaultValue": "top",
        "enumValues": [
          "top",
          "right",
          "bottom",
          "left"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false
      },
      {
        "name": "delay",
        "type": "number",
        "required": false,
        "defaultValue": "200"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
    "examples": [
      {
        "title": "Basic Tooltip",
        "description": "A simple tooltip that appears on hover. Hover over the button to see the tooltip with helpful information.",
        "code": "import React from 'react';\nimport { Tooltip } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tooltip content=\"This is a helpful tooltip\">\n      <button>Hover me</button>\n    </Tooltip>\n  );\n}"
      }
    ]
  }
};

export const generatedStyles: Record<string, ComponentStyles> = {
  "anchor": "@reference \"tailwindcss\";\n\n@layer components {\n  .anchor {\n    display: inline;\n  }\n\n  .preview {\n    display: inline;\n  }\n\n  .trigger {\n    --underline-background: var(--background-600);\n\n    display: inline;\n    position: relative;\n    color: var(--foreground-200);\n    text-decoration: none;\n    cursor: pointer;\n    transition: color 150ms var(--ease-gentle-ease);\n\n    /* Underline animation on hover */\n    @media (hover: hover) {\n      &:hover {\n        color: var(--foreground-0);\n      }\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--color-background-600);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: -2px;\n    height: 1px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 150ms var(--ease-gentle-ease);\n    pointer-events: none;\n  }\n\n  @media (hover: hover) {\n    .trigger:hover .underline {\n      transform: scaleX(1);\n    }\n  }\n}\n",
  "badge": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    --background: var(--background-800);\n    --foreground: var(--background-300);\n    --border: var(--background-600);\n\n    @apply px-2 py-1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-weight: 500;\n    font-size: var(--text-sm);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n  }\n}\n\n.badge.default {\n  --background: var(--background-800);\n  --foreground: var(--background-300);\n  --border: var(--background-600);\n}\n\n.badge.success {\n  --background: var(--success-100);\n  --foreground: var(--success-800);\n  --border: var(--success-300);\n}\n\n.badge.warning {\n  --background: var(--warning-100);\n  --foreground: var(--warning-800);\n  --border: var(--warning-300);\n}\n\n.badge.danger {\n  --background: var(--danger-100);\n  --foreground: var(--danger-800);\n  --border: var(--danger-300);\n}\n\n.badge.info {\n  --background: var(--info-100);\n  --foreground: var(--info-800);\n  --border: var(--info-300);\n}\n\n.badge.sm {\n  @apply px-1 py-0.5;\n  font-size: var(--text-sm);\n}\n\n.badge.md {\n  @apply px-1.5 py-1;\n  font-size: var(--text-sm);\n}\n\n.badge.lg {\n  @apply px-2 py-2.5;\n  font-size: var(--text-sm);\n}\n\n.pill {\n  border-radius: 9999px;\n}\n\n.iconWrapper {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.dismissButton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 0.25rem;\n  padding: 0.125rem;\n  border-radius: var(--radius-md);\n  background: transparent;\n  border: none;\n  color: currentColor;\n  cursor: pointer;\n  transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  outline: none;\n}\n\n.dismissButton[data-hovered=\"true\"] {\n  opacity: 0.7;\n}\n\n.dismissButton[data-pressed=\"true\"] {\n  opacity: 0.5;\n  transform: scale(0.95);\n}\n\n.dismissButton[data-focus-visible=\"true\"] {\n  outline: 2px solid currentColor;\n  outline-offset: 1px;\n}\n",
  "breadcrumbs": "@layer components {\n  .breadcrumbs {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --font-size: var(--text-sm);\n\n    display: block;\n  }\n\n  .breadcrumbsList {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n  .breadcrumbsList.withCustomSeparator .breadcrumb:not(:last-child)::after {\n    content: none;\n  }\n\n  .breadcrumb {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* Separator after each item except the last */\n  .breadcrumb:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    display: flex;\n    align-items: center;\n    margin: 0;\n    padding: 0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .breadcrumbLink {\n    color: var(--foreground);\n    text-decoration: none;\n    padding: 0.25rem 0.5rem;\n    border-radius: 0.375rem;\n    cursor: pointer;\n    font-size: var(--font-size);\n    line-height: 1.5;\n    position: relative;\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: 500;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: 0.6;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
  "button": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply px-3 py-1.5;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-family: inherit;\n    font-weight: 500;\n    font-size: var(--text-md);\n    line-height: var(--leading-snug);\n    user-select: none;\n    cursor: pointer;\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius-md);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out;\n    filter: brightness(100%);\n\n    &:focus-visible {\n      outline: 2px solid var(--blue);\n      outline-offset: 2px;\n    }\n\n    &:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    &:active:not(:disabled) {\n      transform: scale(0.97);\n    }\n  }\n}\n\n.button.primary {\n  background-color: var(--accent-500);\n  color: var(--color-white);\n  border-color: var(--accent-500);\n\n  &:hover:not(:disabled) {\n    filter: brightness(106%);\n    transition: filter 0.20s var(--ease-gentle-ease);\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--accent-500);\n    transition: background-color 0.20s var(--ease-gentle-ease);\n  }\n}\n\n.button.secondary {\n  background-color: var(--background-800);\n  color: var(--foreground-50);\n  border-color: var(--background-700);\n\n  &:hover:not(:disabled) {\n    filter: brightness(104%);\n    transition: filter 0.20s var(--ease-gentle-ease);\n    border-color: var(--background-700);\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--background-800);\n    transition: background-color 0.20s var(--ease-gentle-ease);\n    border-color: var(--background-600);\n  }\n}\n\n.button.outline {\n  --border-hover: var(--background-700);\n  outline: 1px solid var(--background-700);\n  background-color: transparent;\n  color: var(--foreground-50);\n\n  &:hover:not(:disabled) {\n    background-color: var(--background-800);\n    border-color: var(--background-700);\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--background-700);\n    border-color: var(--background-600);\n  }\n}\n\n.button.ghost {\n  background-color: transparent;\n  color: var(--foreground-50);\n  border-color: transparent;\n\n  @media (hover: hover) {\n    &:hover:not(:disabled) {\n      background-color: var(--background-800);\n      border-color: transparent;\n    }\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--background-700);\n    border-color: transparent;\n  }\n}\n\n.button.sm {\n  @apply px-2.5 py-1 text-sm;\n  font-size: var(--text-sm);\n}\n\n.button.md {\n  @apply px-3 py-1.5;\n  font-size: var(--text-md);\n}\n\n.button.lg {\n  @apply px-4 py-2 text-lg;\n  font-size: var(--text-lg);\n}\n",
  "card": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    --background: var(--background-800);\n    --border: var(--background-700);\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-lg);\n    overflow: hidden;\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring, #0066cc);\n    outline-offset: 2px;\n  }\n\n  .header {\n    --border: var(--background-700);\n\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    --background: color-mix(in srgb, var(--background-900) 50%, transparent);\n    --border: var(--background-700);\n\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
  "checkbox": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  /* Visual checkbox container */\n  .base {\n    --background: var(--background-800);\n    --foreground: var(--accent-50);\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n\n    @apply w-5 h-5 cursor-pointer flex-shrink-0;\n    appearance: none;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    outline: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    position: relative;\n  }\n\n  .base:focus-visible {\n    outline: 2px solid transparent;\n    box-shadow: 0 0 0 3px var(--ring-color);\n  }\n\n  .base[data-pressed=\"true\"] {\n    transform: scale(0.92);\n  }\n\n  .base[data-selected=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .base[data-selected=\"true\"]::after {\n    content: \"✓\";\n    color: var(--foreground);\n    font-size: 0.75rem;\n    font-weight: 700;\n    line-height: 1;\n  }\n\n  .base[data-indeterminate=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .base[data-indeterminate=\"true\"]::after {\n    content: \"−\";\n    color: var(--foreground);\n    font-size: 0.875rem;\n    font-weight: 700;\n    line-height: 1;\n  }\n\n  .base[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  .size-sm {\n    @apply w-4 h-4;\n  }\n\n  .size-sm[data-selected=\"true\"]::after {\n    font-size: 0.625rem;\n  }\n\n  .size-sm[data-indeterminate=\"true\"]::after {\n    font-size: 0.625rem;\n  }\n\n  .size-md {\n    @apply w-5 h-5;\n  }\n\n  .size-md[data-selected=\"true\"]::after {\n    font-size: 0.75rem;\n  }\n\n  .size-md[data-indeterminate=\"true\"]::after {\n    font-size: 0.875rem;\n  }\n\n  .size-lg {\n    @apply w-6 h-6;\n  }\n\n  .size-lg[data-selected=\"true\"]::after {\n    font-size: 0.875rem;\n  }\n\n  .size-lg[data-indeterminate=\"true\"]::after {\n    font-size: 1rem;\n  }\n\n  .label {\n    @apply cursor-pointer select-none pt-1;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-sm);\n  }\n\n  .label-md {\n    font-size: var(--text-md);\n  }\n\n  .label-lg {\n    font-size: var(--text-lg);\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm mt-2 ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal {\n    color: inherit;\n  }\n\n  .helper-text-error {\n    color: var(--danger-600);\n  }\n\n  .indeterminate {\n  }\n}\n",
  "command": "@reference \"tailwindcss\";\n\n@layer components {\n  .palette {\n    --bg-default: var(--background-950);\n    --bg-hover: var(--background-800);\n    --bg-selected: var(--background-800);\n    --border-default: var(--background-700);\n    --fg-default: var(--foreground-50);\n    --fg-muted: var(--foreground-500);\n    --fg-icon: var(--foreground-400);\n    --overlay: rgb(0 0 0 / 0.2);\n    --list-background: var(--background-950);\n    --footer-background: var(--background-800);\n  }\n\n  /* Overlay Container */\n  .overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 999;\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    overflow: hidden;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: blur(4px);\n  }\n\n  /* Content */\n  .content {\n    position: relative;\n    @apply m-2;\n    background-color: var(--bg-default);\n    border-radius: var(--radius-lg);\n    width: 100%;\n    margin-inline: 1rem;\n    max-width: 28rem;\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);\n    animation: fadeInZoomIn 0.2s ease-out;\n  }\n\n  .inner {\n    @apply px-2;\n    overflow: hidden;\n  }\n\n  /* Search Section */\n  .search {\n    display: flex;\n    border-bottom: var(--border-width-base) solid var(--border-default);\n    @apply p-2;\n  }\n\n  .search-container {\n    position: relative;\n    width: 100%;\n  }\n\n  .search-icon {\n    position: absolute;\n    left: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 1rem;\n    height: 1rem;\n    display: flex;\n    align-items: center;\n    color: var(--fg-muted);\n    pointer-events: none;\n  }\n\n  .search-input {\n    width: 100%;\n    background-color: transparent;\n    border: none;\n    color: var(--fg-default);\n    padding-left: 2rem;\n    padding-block: 0.5rem;\n    font-size: 0.875rem;\n    font-family: inherit;\n  }\n\n  .search-input::placeholder {\n    color: var(--fg-muted);\n  }\n\n  .search-input:focus {\n    outline: none;\n  }\n\n  .search-clear {\n    position: absolute;\n    right: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 0.25rem;\n    border-radius: var(--radius-lg);\n    background-color: transparent;\n    color: var(--fg-muted);\n    border: none;\n    cursor: pointer;\n    transition:\n      background-color 0.15s,\n      color 0.15s;\n  }\n\n  .search-clear:hover {\n    background-color: var(--bg-hover);\n    color: var(--fg-icon);\n  }\n\n  /* List Section */\n  .list {\n    @apply p-0.5 space-y-2;\n    background-color: var(--list-background);\n    height: 44dvh;\n    overflow-y: auto;\n  }\n\n  .item {\n    display: flex;\n    @apply px-2 py-0.5;\n    border-radius: 0.375rem;\n    align-items: center;\n    justify-content: space-between;\n    cursor: pointer;\n    transition: background-color 0.15s;\n  }\n\n  .item:hover {\n    background-color: var(--bg-hover);\n  }\n\n  .item[aria-selected=\"true\"] {\n    background-color: var(--bg-selected);\n  }\n\n  .item-content {\n    display: flex;\n    align-items: center;\n    gap: 0.625rem;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    color: var(--fg-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-label {\n    font-size: 0.875rem;\n    color: var(--fg-default);\n    font-weight: 500;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    color: var(--fg-muted);\n    font-size: 0.875rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: var(--fg-muted);\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--fg-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply px-1.5 py-2 gap-2;\n    width: 100%;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    display: flex;\n    align-items: center;\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fadeInZoomIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n}\n",
  "flex": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n    width: 100%;\n  }\n\n  /* Direction variants */\n  .flex.row {\n    flex-direction: row;\n  }\n\n  .flex.column {\n    flex-direction: column;\n  }\n\n  /* Wrap variants */\n  .flex.wrap {\n    flex-wrap: wrap;\n  }\n\n  .flex.nowrap {\n    flex-wrap: nowrap;\n  }\n\n  /* Gap variants */\n  .flex.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .flex.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .flex.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .flex.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .flex.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start {\n    justify-content: flex-start;\n  }\n\n  .flex.justify-flex-end {\n    justify-content: flex-end;\n  }\n\n  .flex.justify-center {\n    justify-content: center;\n  }\n\n  .flex.justify-space-between {\n    justify-content: space-between;\n  }\n\n  .flex.justify-space-around {\n    justify-content: space-around;\n  }\n\n  .flex.justify-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align-items variants */\n  .flex.align-flex-start {\n    align-items: flex-start;\n  }\n\n  .flex.align-flex-end {\n    align-items: flex-end;\n  }\n\n  .flex.align-center {\n    align-items: center;\n  }\n\n  .flex.align-stretch {\n    align-items: stretch;\n  }\n\n  .flex.align-baseline {\n    align-items: baseline;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
  "fold": "@reference \"tailwindcss\";\n\n@layer components {\n  .fold {\n    --fold-trigger-background: transparent;\n    --fold-trigger-background-hover: var(--background-800);\n    --fold-trigger-foreground: var(--foreground-50);\n    --fold-content-background: transparent;\n    --fold-content-foreground: var(--foreground-300);\n\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fold[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n\n  /* Focus styling */\n  .trigger:focus-visible,\n  .trigger[data-focused=\"true\"] {\n    background-color: var(--background-800);\n    box-shadow: 0 0 0 2px var(--border-background-600);\n  }\n\n  .trigger {\n    @apply px-3 py-2 text-left cursor-pointer;\n    display: flex;\n    align-items: center;\n    justify-content: between;\n    gap: 0.75rem;\n    width: 100%;\n    font-family: inherit;\n    font-weight: 500;\n    font-size: var(--text-md);\n    line-height: var(--leading-snug);\n    color: var(--fold-trigger-foreground);\n    background-color: var(--fold-trigger-background);\n    border: none;\n    border-radius: var(--radius-md);\n    transition: all 150ms var(--ease-gentle-ease), transform 150ms var(--ease-snappy-pop);\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        background-color: var(--fold-trigger-background-hover);\n      }\n    }\n\n    &:active:not([data-disabled]) {\n      background-color: var(--fold-trigger-background-hover);\n      transform: scale(0.98);\n    }\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.25rem;\n    height: 1.25rem;\n    flex-shrink: 0;\n    color: inherit;\n    transition: transform 200ms var(--ease-gentle-ease);\n\n    .trigger[data-expanded=\"true\"] & {\n      transform: rotate(180deg);\n    }\n  }\n\n  .title {\n    flex: 1;\n    font-weight: 500;\n  }\n\n  .content {\n    overflow: hidden;\n    max-height: 0;\n    opacity: 0;\n    transition: max-height 300ms var(--ease-smooth-settle),\n                opacity 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      max-height: 2000px;\n      opacity: 1;\n    }\n  }\n\n  .contentInner {\n    color: var(--fold-content-foreground);\n    background-color: var(--fold-content-background);\n    @apply p-2\n  }\n\n  .fold:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
  "gallery": "@reference \"tailwindcss\";\n\n@layer components {\n  .gallery {\n    --gap: var(--gallery-gap, 1rem);\n  }\n\n  .gallery[data-layout=\"grid\"] {\n    --columns: var(--gallery-columns, 3);\n\n    display: grid;\n    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));\n    gap: var(--gap);\n  }\n\n  .gallery[data-layout=\"masonry\"] {\n    --column-width: var(--gallery-column-width, 280px);\n\n      width: 100%;\n    column-width: var(--column-width);\n    column-gap: var(--gap);\n  }\n      \n  .gallery[data-layout=\"masonry\"] .item {\n    break-inside: avoid;\n    margin-bottom: var(--gap);\n  }\n\n  @media (min-width: 640px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-sm, var(--gallery-columns, 3));\n    }\n  }\n\n  @media (min-width: 768px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-md, var(--gallery-columns-sm, var(--gallery-columns, 3)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-lg, var(--gallery-columns-md, var(--gallery-columns-sm, var(--gallery-columns, 3))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-xl, var(--gallery-columns-lg, var(--gallery-columns-md, var(--gallery-columns-sm, var(--gallery-columns, 3)))));\n    }\n  }\n\n  .item {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --border-focus: var(--accent-500);\n\n    display: flex;\n    flex-direction: column;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-lg);\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    cursor: pointer;\n    transition: border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    flex-direction: row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n    --background: var(--background-950);\n\n    position: relative;\n    aspect-ratio: var(--aspect-ratio);\n    background-color: var(--background);\n    overflow: hidden;\n  }\n\n  .view > img,\n  .view > video {\n      width: 100%;\n      height: 100%;\n    object-fit: cover;\n  }\n\n  .body {\n      display: flex;\n      flex-direction: column;\n    gap: 0.25rem;\n    padding: 0.75rem;\n    align-self: flex-start;\n  }\n\n  .body > :first-child {\n    font-weight: 500;\n    color: var(--foreground-50);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n}\n",
  "grid": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Base Grid Styles */\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: auto;\n    gap: var(--spacing-md);\n    justify-items: stretch;\n    align-items: stretch;\n    justify-content: start;\n    align-content: start;\n    grid-auto-flow: row;\n    width: 100%;\n  }\n\n  /* Column Variants */\n  .grid.columns-1 {\n    grid-template-columns: repeat(1, 1fr);\n  }\n\n  .grid.columns-2 {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .grid.columns-3 {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  .grid.columns-4 {\n    grid-template-columns: repeat(4, 1fr);\n  }\n\n  .grid.columns-5 {\n    grid-template-columns: repeat(5, 1fr);\n  }\n\n  .grid.columns-6 {\n    grid-template-columns: repeat(6, 1fr);\n  }\n\n  .grid.columns-auto-fit {\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  }\n\n  .grid.columns-auto-fill {\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  }\n\n  /* Row Variants */\n  .grid.rows-1 {\n    grid-template-rows: repeat(1, auto);\n  }\n\n  .grid.rows-2 {\n    grid-template-rows: repeat(2, auto);\n  }\n\n  .grid.rows-3 {\n    grid-template-rows: repeat(3, auto);\n  }\n\n  .grid.rows-4 {\n    grid-template-rows: repeat(4, auto);\n  }\n\n  .grid.rows-5 {\n    grid-template-rows: repeat(5, auto);\n  }\n\n  .grid.rows-6 {\n    grid-template-rows: repeat(6, auto);\n  }\n\n  .grid.rows-auto {\n    grid-template-rows: auto;\n  }\n\n  /* Gap Variants */\n  .grid.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .grid.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .grid.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .grid.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .grid.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Row Gap Variants */\n  .grid.row-gap-xs {\n    row-gap: var(--spacing-xs);\n  }\n\n  .grid.row-gap-sm {\n    row-gap: var(--spacing-sm);\n  }\n\n  .grid.row-gap-md {\n    row-gap: var(--spacing-md);\n  }\n\n  .grid.row-gap-lg {\n    row-gap: var(--spacing-lg);\n  }\n\n  .grid.row-gap-xl {\n    row-gap: var(--spacing-xl);\n  }\n\n  /* Column Gap Variants */\n  .grid.column-gap-xs {\n    column-gap: var(--spacing-xs);\n  }\n\n  .grid.column-gap-sm {\n    column-gap: var(--spacing-sm);\n  }\n\n  .grid.column-gap-md {\n    column-gap: var(--spacing-md);\n  }\n\n  .grid.column-gap-lg {\n    column-gap: var(--spacing-lg);\n  }\n\n  .grid.column-gap-xl {\n    column-gap: var(--spacing-xl);\n  }\n\n  /* Justify Items Variants */\n  .grid.justify-items-start {\n    justify-items: start;\n  }\n\n  .grid.justify-items-end {\n    justify-items: end;\n  }\n\n  .grid.justify-items-center {\n    justify-items: center;\n  }\n\n  .grid.justify-items-stretch {\n    justify-items: stretch;\n  }\n\n  /* Align Items Variants */\n  .grid.align-items-start {\n    align-items: start;\n  }\n\n  .grid.align-items-end {\n    align-items: end;\n  }\n\n  .grid.align-items-center {\n    align-items: center;\n  }\n\n  .grid.align-items-stretch {\n    align-items: stretch;\n  }\n\n  .grid.align-items-baseline {\n    align-items: baseline;\n  }\n\n  /* Justify Content Variants */\n  .grid.justify-content-start {\n    justify-content: start;\n  }\n\n  .grid.justify-content-end {\n    justify-content: end;\n  }\n\n  .grid.justify-content-center {\n    justify-content: center;\n  }\n\n  .grid.justify-content-stretch {\n    justify-content: stretch;\n  }\n\n  .grid.justify-content-space-between {\n    justify-content: space-between;\n  }\n\n  .grid.justify-content-space-around {\n    justify-content: space-around;\n  }\n\n  .grid.justify-content-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align Content Variants */\n  .grid.align-content-start {\n    align-content: start;\n  }\n\n  .grid.align-content-end {\n    align-content: end;\n  }\n\n  .grid.align-content-center {\n    align-content: center;\n  }\n\n  .grid.align-content-stretch {\n    align-content: stretch;\n  }\n\n  .grid.align-content-space-between {\n    align-content: space-between;\n  }\n\n  .grid.align-content-space-around {\n    align-content: space-around;\n  }\n\n  .grid.align-content-space-evenly {\n    align-content: space-evenly;\n  }\n\n  /* Auto Flow Variants */\n  .grid.auto-flow-row {\n    grid-auto-flow: row;\n  }\n\n  .grid.auto-flow-column {\n    grid-auto-flow: column;\n  }\n\n  .grid.auto-flow-row-dense {\n    grid-auto-flow: row dense;\n  }\n\n  .grid.auto-flow-column-dense {\n    grid-auto-flow: column dense;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: grid-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior */\n  @container grid-parent (width < 400px) {\n    .grid.container-responsive {\n      grid-template-columns: 1fr;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container grid-parent (400px <= width < 600px) {\n    .grid.container-responsive {\n      grid-template-columns: repeat(2, 1fr);\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container grid-parent (600px <= width < 900px) {\n    .grid.container-responsive {\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container grid-parent (width >= 900px) {\n    .grid.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
  "group": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Container */\n  .group {\n    --background: var(--background-950);\n    --border: var(--background-700);\n\n    display: flex;\n    width: fit-content;\n    align-items: center;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-lg);\n    overflow: hidden;\n  }\n\n  /* Orientations */\n  .group.horizontal {\n    flex-direction: row;\n  }\n\n  .group.vertical {\n    flex-direction: column;\n  }\n\n  /* Spacing */\n  .group.tight {\n    gap: 0;\n  }\n\n  .group.normal {\n    gap: var(--spacing-1);\n  }\n\n  .group.relaxed {\n    gap: var(--spacing-2);\n  }\n\n  /* Variants */\n  .group.ghost {\n    --background: transparent;\n    --border: transparent;\n    background-color: transparent;\n    border-color: transparent;\n  }\n\n  /* Item wrapper - manages position-based border-radius */\n  .itemWrapper {\n    /* Spacing is handled by group's gap property */\n  }\n\n  /* Override child component styles when in group */\n  /* Remove all borders and rounded corners for seamless group appearance */\n  .itemWrapper .groupItem,\n  .groupInputWrapper input,\n  .groupSelectWrapper button {\n    border-radius: 0;\n    border: none;\n    outline: none;\n  }\n}\n",
  "input": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-500);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    @apply px-3 py-2;\n    transition: transform 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop);\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring-color) 20%, transparent)\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-500);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--danger-600) 25%, transparent);\n      }\n    }\n  }\n\n  .input[data-variant=\"ghost\"] {\n    --background: transparent;\n    --border: transparent;\n    --background-hover: transparent;\n    --border-hover: transparent;\n\n    &[data-focus-visible] {\n      box-shadow: none;\n    }\n  }\n\n  .input[data-size=\"sm\"] {\n    height: 2rem;\n    font-size: var(--text-sm);\n    @apply px-2 py-1;\n  }\n\n  .input[data-size=\"md\"] {\n    height: 2.5rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .input[data-size=\"lg\"] {\n    height: 3rem;\n    font-size: var(--text-base);\n    @apply px-4 py-3;\n  }\n\n  .iconWrapper {\n    position: absolute;\n    top: 50%;\n    display: flex;\n    align-items: center;\n    color: var(--foreground-500);\n    pointer-events: none;\n    transform: translateY(-50%);\n  }\n\n  .prefixIcon {\n    left: 1.00rem;\n  }\n\n  .suffixIcon {\n    right: 1.00rem;\n  }\n\n  .container {\n    position: relative;\n    width: 100%;\n  }\n}\n",
  "list": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --foreground: var(--foreground-50);\n\n    max-width: 28rem;\n    margin-left: auto;\n    margin-right: auto;\n    background-color: var(--background);\n    border-left: var(--border-width-base) solid var(--border);\n    border-right: var(--border-width-base) solid var(--border);\n    font-family: system-ui, -apple-system, sans-serif;\n    color: var(--foreground);\n  }\n\n  .header {\n    --background: var(--background-900);\n    --border: var(--background-700);\n\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    background-color: var(--background);\n    backdrop-filter: blur(12px);\n    border-bottom: var(--border-width-base) solid var(--border);\n    z-index: 10;\n  }\n\n  .header.sticky {\n    position: sticky;\n    top: 0;\n  }\n\n  .header > :first-child {\n    font-weight: 600;\n    font-size: 1.125rem;\n    color: var(--foreground-50);\n  }\n\n  .header > :last-child {\n    color: var(--foreground-400);\n  }\n\n  .item {\n    --background: var(--background-950);\n    --background-hover: var(--background-900);\n    --background-selected: var(--background-900);\n    --border: var(--background-800);\n\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    padding: 1rem;\n    border-bottom: var(--border-width-base) solid var(--border);\n    transition: background-color 300ms var(--ease-snappy-pop);\n    background-color: var(--background);\n  }\n\n  .item[data-interactive=\"true\"] {\n    cursor: pointer;\n  }\n\n  .item[data-interactive=\"true\"]:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-selected=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .actionGroup {\n    display: flex;\n    align-items: center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .actionGroup[data-justify=\"space-between\"] {\n    justify-content: space-between;\n  }\n\n  .actionGroup[data-justify=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .actionGroup[data-justify=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .divider {\n    --border: var(--background-700);\n\n    border-top: var(--border-width-base) solid var(--border);\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n  }\n\n  .footer {\n    padding: 1.5rem;\n    padding-bottom: 3rem;\n    display: flex;\n  }\n\n  .footer[data-align=\"center\"] {\n    justify-content: center;\n  }\n\n  .footer[data-align=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .footer[data-align=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n}\n",
  "menu": "@reference \"tailwindcss\";\n\n@layer components {\n  .content {\n    position: absolute;\n    z-index: 50;\n    min-width: 8rem;\n    overflow: hidden;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius-lg);\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n    animation: contextMenuFadeIn 0.15s var(--ease-snappy-pop);\n\n    &[data-state=\"closed\"] {\n      animation: contextMenuFadeOut 0.1s var(--ease-snappy-pop);\n    }\n  }\n\n  .viewport {\n    @apply p-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item {\n    position: relative;\n    @apply flex items-center px-3 py-2;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n    transition: transform 150ms var(--ease-snappy-pop);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-highlighted]:active {\n      transform: scale(0.96);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      @apply pl-8;\n    }\n  }\n\n  .checkboxItem {\n    position: relative;\n    @apply flex items-center py-2 pl-8 pr-3;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .radioItem {\n    position: relative;\n    @apply flex items-center py-2 pl-8 pr-3;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .itemIndicator {\n    position: absolute;\n    left: 0.75rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subTrigger {\n    position: relative;\n    @apply flex items-center px-3 py-2;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: var(--background-800);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      @apply pl-8;\n    }\n  }\n\n  .subTriggerChevron {\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subContent {\n    position: absolute;\n    z-index: 50;\n    min-width: 8rem;\n    overflow: hidden;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius-lg);\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n    animation: contextMenuFadeIn 0.15s var(--ease-snappy-pop);\n\n    &[data-state=\"closed\"] {\n      animation: contextMenuFadeOut 0.1s var(--ease-snappy-pop);\n    }\n  }\n\n  .label {\n    @apply px-3 py-2;\n    font-size: var(--text-xs);\n    font-weight: 500;\n    color: var(--foreground-400);\n\n    &[data-inset] {\n      @apply pl-8;\n    }\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    font-size: var(--text-xs);\n    letter-spacing: 0.1em;\n    color: var(--foreground-500);\n  }\n\n  @keyframes contextMenuFadeIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  @keyframes contextMenuFadeOut {\n    from {\n      opacity: 1;\n      transform: scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n  }\n}\n",
  "modal": ".overlay {\n  --modal-bg: var(--color-background-900, #0f0f0f);\n  --modal-border: var(--color-background-700, #1a1a1a);\n  --modal-title-color: var(--color-foreground-100, #f5f5f5);\n  --modal-close-color: var(--color-foreground-500, #8b8b8b);\n  --modal-close-hover: var(--color-foreground-200, #e5e5e5);\n}\n\n.backdrop {\n  position: absolute;\n  inset: 0;\n  background-color: rgb(0 0 0 / 0.5);\n  backdrop-filter: blur(4px);\n  transition: opacity 200ms var(--ease-gentle-ease);\n  cursor: pointer;\n}\n\n.modal {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin: 1rem;\n  background-color: var(--modal-bg);\n  border: 1px solid var(--modal-border);\n  border-radius: var(--radius-md);\n  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);\n  animation: modalIn 200ms var(--ease-snappy-pop);\n  pointer-events: auto;\n}\n\n@keyframes modalIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid var(--modal-border);\n  padding: 1rem;\n}\n\n.title {\n  margin: 0;\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 600;\n  color: var(--modal-title-color);\n}\n\n.spacer {\n  flex: 1;\n}\n\n.closeButton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: auto;\n  padding: 0.25rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--modal-close-color);\n  transition: color 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n}\n\n.closeButton:hover {\n  color: var(--modal-close-hover);\n}\n\n.closeButton:active {\n  transform: scale(0.92);\n}\n\n.closeButton:focus {\n  outline: 2px solid var(--modal-close-hover);\n  outline-offset: 2px;\n  border-radius: 0.25rem;\n}\n\n.closeIcon {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n\n.content {\n  flex: 1;\n  padding: 1rem;\n  overflow-y: auto;\n  max-height: calc(100vh - 12rem);\n}\n\n.content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.content::-webkit-scrollbar-thumb {\n  background: var(--modal-border);\n  border-radius: 3px;\n}\n\n.content::-webkit-scrollbar-thumb:hover {\n  background: var(--modal-close-color);\n}\n\n.footer {\n  border-top: 1px solid var(--modal-border);\n  padding: 0.5rem;\n}\n\n/* Size variants */\n.size-sm {\n  max-width: 24rem; /* 384px */\n}\n\n.size-md {\n  max-width: 28rem; /* 448px */\n}\n\n.size-lg {\n  max-width: 32rem; /* 512px */\n}\n\n.size-xl {\n  max-width: 42rem; /* 672px */\n}\n\n/* Media queries for smaller screens */\n@media (max-width: 640px) {\n  .modal {\n    margin: 1rem;\n  }\n\n  .content {\n    max-height: calc(100vh - 10rem);\n  }\n}\n",
  "progress": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    --track-background: var(--background-700);\n    --fill-background: var(--accent-500);\n\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm {\n    height: 0.25rem;\n  }\n\n  .progress.md {\n    height: 0.5rem;\n  }\n\n  .progress.lg {\n    height: 0.75rem;\n  }\n\n  .fill {\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.default {\n    --fill-background: var(--accent-500);\n  }\n\n  .fill.success {\n    --fill-background: var(--success-500);\n  }\n\n  .fill.warning {\n    --fill-background: var(--warning-500);\n  }\n\n  .fill.error {\n    --fill-background: var(--danger-500);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    width: 100%;\n  }\n\n  .wrapper.hasLabel {\n    @apply space-y-1;\n  }\n\n  .labelRow {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% {\n      transform: translateX(-100%);\n    }\n    100% {\n      transform: translateX(400%);\n    }\n  }\n}\n",
  "radio": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .radio-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .radio-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .radio {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n    --radio-dot-unchecked: transparent;\n    --radio-dot-checked: var(--accent-50);\n    --radio-hover-background: var(--accent-500);\n    --radio-hover-border: var(--background-500);\n    --radio-error-border: var(--danger-500);\n\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1.25rem;\n    height: 1.25rem;\n    cursor: pointer;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: 0.6;\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: rgb(59, 130, 246);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    font-weight: 500;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground, var(--foreground-300));\n    font-size: inherit;\n    line-height: inherit;\n    cursor: pointer;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled, var(--foreground-500));\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper, var(--foreground-500));\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error, var(--danger-500));\n  }\n  /* Size variants */\n  .radio.sm {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n\n  /* Variants */\n  .radio.primary[data-checked=\"true\"] {\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n  }\n\n  .radio.secondary {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline {\n    --radio-background-unchecked: transparent;\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline[data-checked=\"true\"] {\n    --radio-background-unchecked: color-mix(in srgb, var(--accent-500) 15%, transparent);\n    --radio-border-unchecked: var(--accent-500);\n    --radio-dot-unchecked: var(--accent-500);\n  }\n}\n",
  "scroll-area": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    position: relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n  }\n\n  .horizontal {\n    --scrollbar-height: 12px;\n  }\n\n  .content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-right: 12px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 12px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .track {\n    position: absolute;\n    z-index: 10;\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 0;\n    top: 0;\n    width: 12px;\n    height: 100%;\n    background-color: transparent;\n  }\n\n  .horizontal .track {\n    bottom: 0;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: transparent;\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: var(--radius-md);\n    background-color: var(--background-700);\n    transition-property: background-color;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover {\n    background-color: var(--background-600);\n  }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--background-600);\n  }\n\n  .vertical .thumb {\n    width: 8px;\n    margin-left: 2px;\n  }\n\n  .horizontal .thumb {\n    height: 8px;\n    margin-top: 2px;\n  }\n}\n",
  "select": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    position: relative;\n    display: inline-block;\n    width: 100%;\n  }\n\n  .trigger {\n    --background: var(--background-800);\n    --foreground: var(--foreground-50);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-700);\n    --background-active: var(--background-600);\n    --border-active: var(--background-600);\n\n    @apply flex h-9 px-3 py-2;\n    display: inline-flex;\n    align-items: center;\n    justify-content: space-between;\n    font-size: var(--text-sm);\n    width: 100%;\n    background-color: color-mix(in srgb, var(--background-800) 50%, transparent);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    cursor: pointer;\n    user-select: none;\n    transition: transform 150ms var(--ease-snappy-pop);\n\n    &[aria-expanded=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 80%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        border-color: var(--border-hover);\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: color-mix(in srgb, var(--background-600) 50%, transparent);\n      border-color: var(--border-active)\n    }\n\n    & > span {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      flex: 1;\n    }\n  }\n\n  .icon {\n    flex-shrink: 0;\n    width: 0.625rem;\n    height: 0.625rem;\n    margin-left: 0.5rem;\n    opacity: 0.7;\n  }\n\n  .value {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    overflow: hidden;\n  }\n\n  .valueIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-50);\n  }\n\n  .valueText {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .content {\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    border-radius: var(--radius-md);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n\n    &[data-state=\"open\"][data-placement=\"bottom\"] {\n      animation: slideInFromTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"open\"][data-placement=\"top\"] {\n      animation: slideInFromBottom 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"bottom\"] {\n      animation: slideOutToTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"top\"] {\n      animation: slideOutToBottom 0.15s var(--ease-snappy-pop);\n    }\n  }\n\n  .viewport {\n    padding: 0.25rem;\n    max-height: 24rem;\n    overflow-y: auto;\n    overflow-x: hidden;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    border-radius: var(--radius-md);\n    padding: 0.375rem 0.5rem;\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-50);\n\n    &[data-selected=\"true\"] {\n      background-color: var(--background-700);\n      color: var(--foreground-50);\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &[data-focus-visible] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-hovered] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .itemIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-50);\n  }\n\n  .itemIndicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-500);\n    margin-left: auto;\n  }\n\n  .itemText {\n    flex: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .scrollButton {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0.25rem;\n    cursor: default;\n    color: var(--foreground-50);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideInFromBottom {\n    from {\n      opacity: 0;\n      translate: 0 2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n\n  @keyframes slideOutToBottom {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 2px;\n    }\n  }\n}\n",
  "slider": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] {\n    @apply h-6;\n  }\n\n  .slider[data-size=\"md\"] {\n    @apply h-8;\n  }\n\n  .slider[data-size=\"lg\"] {\n    @apply h-10;\n  }\n\n  .slider[data-disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n    --background: var(--background-600);\n    --background-disabled: var(--background-500);\n\n    position: relative;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: 9999px;\n    background-color: var(--background);\n    display: flex;\n    align-items: center;\n  }\n\n  .slider[data-disabled] .track {\n    background-color: var(--background-disabled);\n  }\n\n  .slider[data-size=\"sm\"] .track {\n    height: var(--track-height-sm);\n  }\n\n  .slider[data-size=\"md\"] .track {\n    height: var(--track-height-md);\n  }\n\n  .slider[data-size=\"lg\"] .track {\n    height: var(--track-height-lg);\n  }\n\n  .range {\n    --background: var(--accent-500);\n    --background-disabled: var(--background-600);\n\n    position: absolute;\n    height: 100%;\n    background-color: var(--background);\n    transition: background-color 200ms var(--ease-snappy-pop);\n  }\n\n  .slider[data-disabled] .range {\n    background-color: var(--background-disabled);\n  }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n    --background: var(--accent-500);\n    --background-focus: var(--accent-400);\n\n    display: block;\n    background-color: var(--background);\n    border-radius: 9999px;\n    cursor: grab;\n    outline: none;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--background-focus);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
  "switch": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --track-background-unchecked: var(--background-700);\n    --track-background-checked: var(--accent-500);\n    --track-background-hover: var(--accent-600);\n    --track-background-active: var(--accent-700);\n    --track-background-disabled: var(--background-800);\n    --thumb-background-unchecked: var(--background-500);\n    --thumb-background-checked: var(--accent-50);\n    --border: var(--background-700);\n    --border-hover: var(--accent-500);\n    --border-active: var(--accent-600);\n\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .switch-track {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--radius-md);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--accent-500);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n}\n\n.sm {\n  width: 2.5rem;\n  height: 1.5rem;\n}\n\n.sm .switch-thumb {\n  width: 1rem;\n  height: 1rem;\n}\n\n.md {\n  width: 3rem;\n  height: 1.75rem;\n}\n\n.md .switch-thumb {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n\n.lg {\n  width: 3.5rem;\n  height: 2rem;\n}\n\n.lg .switch-thumb {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.pill {\n  border-radius: 9999px;\n}\n\n.pill .switch-track {\n  border-radius: 9999px;\n}\n\n.pill .switch-thumb {\n  border-radius: 9999px;\n}\n\n.round {\n  border-radius: 0.375rem;\n}\n\n.round .switch-track {\n  border-radius: 0.375rem;\n}\n\n.round .switch-thumb {\n  border-radius: 0.375rem;\n}\n\n.switch[data-focus-visible] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-500) 40%, transparent);\n}\n",
  "tabs": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .tabsList {\n    --background: var(--background-800);\n    --border: var(--background-700);\n    --indicator-background: var(--background-700);\n\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    overflow: hidden;\n    text-decoration: none !important;\n    @apply p-1;\n\n    &[data-variant=\"default\"] {\n      background-color: var(--background);\n      border: var(--border-width-base) solid var(--border);\n      border-radius: var(--radius-lg);\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border: none;\n      padding: 0;\n    }\n  }\n\n  .indicator {\n    position: absolute;\n    pointer-events: none;\n    transition: all 300ms var(--ease-gentle-ease);\n    background-color: var(--indicator-background);\n  }\n\n  .indicatorDefault {\n    border-radius: var(--radius-md);\n  }\n\n  .indicatorUnderline {\n    --indicator-background: var(--accent-500);\n\n    bottom: 0;\n    height: 0.125rem;\n  }\n\n  .tabsTrigger {\n    --foreground: var(--foreground-400);\n    --foreground-hover: var(--foreground-200);\n    --foreground-active: var(--foreground-50);\n\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    z-index: 10;\n    font-family: inherit;\n    font-weight: 500;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    @apply gap-2 px-3 py-1.5 whitespace-nowrap;\n\n    color: var(--foreground);\n    user-select: none;\n    cursor: pointer;\n    background: transparent;\n    border: 1px solid transparent;\n    border-radius: var(--radius-md);\n    transition: transform 150ms var(--ease-snappy-pop);\n\n    &[data-focus-visible] {\n      border-radius: 0px;\n      outline: 1px solid var(--accent-500);\n      outline-offset: 0px;\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        color: var(--foreground-hover);\n      }\n    }\n\n    &:active:not([data-disabled]) {\n      color: var(--foreground-active)\n    }\n\n    &[data-selected] {\n      color: var(--foreground-active);\n    }\n  }\n\n  .triggerIcon {\n    display: flex;\n    align-items: center;\n  }\n\n  .tabsContent {\n    margin-top: 0.5rem;\n    outline: none;\n\n    &[data-focus-visible] {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n}\n",
  "textarea": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-500);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    resize: vertical;\n    @apply px-3 py-2;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        border-color: var(--border-hover);\n      }\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring-color) 15%, transparent);\n      transform: scale(1.01);\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-500);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--danger-600) 25%, transparent);\n      }\n    }\n\n    &[data-resizable=\"false\"] {\n      resize: none;\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    font-size: var(--text-xs);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    font-size: var(--text-base);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    width: 100%;\n  }\n\n  .characterCount {\n    font-size: var(--text-xs);\n    color: var(--foreground-500);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .characterCount[data-over-limit] {\n    color: var(--danger-600);\n  }\n}\n"
};

export const generatedSourceCode: Record<string, ComponentSourceCode> = {
  "anchor": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport { Popover } from \"@/components/Popover\";\nimport styles from \"./Anchor.module.css\";\n\n// --- Utils from Divider ---\n\ntype Orientation = \"horizontal\" | \"vertical\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nconst DASHED_DIMENSIONS = {\n  sm: { thickness: 1, dashLength: 8, gapLength: 4 },\n  md: { thickness: 2, dashLength: 8, gapLength: 4 },\n  lg: { thickness: 4, dashLength: 10, gapLength: 6 },\n} as const;\n\nconst DOTTED_DIMENSIONS = {\n  sm: { thickness: 1, radius: 0.5, spacing: 6 },\n  md: { thickness: 2, radius: 1, spacing: 8 },\n  lg: { thickness: 4, radius: 2, spacing: 12 },\n} as const;\n\nfunction getDashedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];\n  const totalLength = dashLength + gapLength;\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\nfunction getDottedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\n// --- Sub-components ---\n\nexport interface AnchorPreviewProps\n  extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n}\n\nconst AnchorPreview = React.forwardRef<HTMLDivElement, AnchorPreviewProps>(\n  ({ children }, ref) => {\n    // This component just holds the preview content\n    // It renders nothing itself\n    return <div ref={ref} style={{ display: \"none\" }}>{children}</div>;\n  },\n);\nAnchorPreview.displayName = \"Anchor.Preview\";\n\nexport interface AnchorUnderlineProps extends React.HTMLAttributes<HTMLDivElement> {\n  variant?: \"solid\" | \"dashed\" | \"dotted\";\n}\n\nconst AnchorUnderline = React.forwardRef<HTMLDivElement, AnchorUnderlineProps>(\n  ({ className, variant = \"solid\", style, ...props }, ref) => {\n    const getMaskStyles = (): React.CSSProperties => {\n      if (variant === \"solid\") {\n        return {};\n      }\n\n      // Hardcoded to horizontal sm (1px) for underline\n      const orientation = \"horizontal\";\n      const size = \"sm\";\n\n      const svgDataUri =\n        variant === \"dashed\"\n          ? getDashedMaskSvg(orientation, size)\n          : getDottedMaskSvg(orientation, size);\n\n      const maskRepeat = \"repeat-x\";\n      const encodedSvg = `url(\"data:image/svg+xml,${svgDataUri}\")`;\n\n      return {\n        WebkitMaskImage: encodedSvg,\n        maskImage: encodedSvg,\n        WebkitMaskRepeat: maskRepeat,\n        maskRepeat: maskRepeat,\n      } as React.CSSProperties;\n    };\n\n    return (\n      <span\n        ref={ref}\n        className={cn(styles.underline, className)}\n        style={{ ...getMaskStyles(), ...style }}\n        {...props}\n      />\n    );\n  }\n);\nAnchorUnderline.displayName = \"Anchor.Underline\";\n\n// --- Main Anchor Component ---\n\nexport interface AnchorProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onChange\"> {\n  children?: React.ReactNode;\n  className?: string;\n}\n\nconst AnchorRoot = React.forwardRef<HTMLDivElement, AnchorProps>(\n  ({ className, children, ...props }, ref) => {\n    const [isOpen, setIsOpen] = React.useState(false);\n    const triggerRef = React.useRef<HTMLDivElement>(null);\n    let previewContent: React.ReactNode = null;\n    let hasUnderline = false;\n    \n    const childrenArray = React.Children.toArray(children);\n\n    // Extract preview content and filter it out from rendered children\n    const filteredChildren = childrenArray.filter((child) => {\n      if (React.isValidElement(child)) {\n        if (child.type === AnchorPreview) {\n          previewContent = (child.props as any).children;\n          return false;\n        }\n        if (child.type === AnchorUnderline) {\n          hasUnderline = true;\n        }\n      }\n      return true;\n    });\n\n    // Inject default underline if none provided\n    if (!hasUnderline) {\n      filteredChildren.push(<AnchorUnderline key=\"__default_underline\" />);\n    }\n\n    return (\n      <Popover\n        ref={ref || triggerRef}\n        content={previewContent}\n        isOpen={isOpen}\n        onOpenChange={setIsOpen}\n        position=\"bottom\"\n        className={cn('preview', styles.preview, className)}\n        {...props}\n      >\n        <span className={cn('trigger', styles.trigger)}>{filteredChildren}</span>\n      </Popover>\n    );\n  },\n);\nAnchorRoot.displayName = \"Anchor\";\n\n// Compound component with attached sub-components\nconst Anchor = React.forwardRef<HTMLDivElement, AnchorProps & { Preview: typeof AnchorPreview; Underline: typeof AnchorUnderline }>((props, ref) => {\n  return <AnchorRoot ref={ref} {...props} />;\n}) as React.ForwardRefExoticComponent<AnchorProps & React.RefAttributes<HTMLDivElement>> & { Preview: typeof AnchorPreview; Underline: typeof AnchorUnderline };\n\nAnchor.displayName = \"Anchor\";\nAnchor.Preview = AnchorPreview;\nAnchor.Underline = AnchorUnderline;\n\nexport { Anchor };",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .anchor {\n    display: inline;\n  }\n\n  .preview {\n    display: inline;\n  }\n\n  .trigger {\n    --underline-background: var(--background-600);\n\n    display: inline;\n    position: relative;\n    color: var(--foreground-200);\n    text-decoration: none;\n    cursor: pointer;\n    transition: color 150ms var(--ease-gentle-ease);\n\n    /* Underline animation on hover */\n    @media (hover: hover) {\n      &:hover {\n        color: var(--foreground-0);\n      }\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--color-background-600);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: -2px;\n    height: 1px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 150ms var(--ease-gentle-ease);\n    pointer-events: none;\n  }\n\n  @media (hover: hover) {\n    .trigger:hover .underline {\n      transform: scaleX(1);\n    }\n  }\n}\n",
    "cssTypes": "export const anchor: string;\nexport const preview: string;\nexport const trigger: string;\nexport const underline: string;"
  },
  "badge": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useButton, useFocusRing, useHover, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Badge.module.css\";\n\ntype BadgeVariant = \"default\" | \"success\" | \"warning\" | \"danger\" | \"info\";\ntype BadgeSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {\n  variant?: BadgeVariant;\n  size?: BadgeSize;\n  icon?: React.ReactNode;\n  dismissible?: boolean;\n  onDismiss?: () => void;\n  pill?: boolean;\n}\n\nconst variantMap = {\n  default: styles[\"default\"],\n  success: styles[\"success\"],\n  warning: styles[\"warning\"],\n  danger: styles[\"danger\"],\n  info: styles[\"info\"],\n} as const;\n\nconst sizeMap = {\n  sm: styles[\"sm\"],\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n} as const;\n\ninterface DismissButtonProps {\n  onDismiss?: () => void;\n  size: BadgeSize;\n}\n\nfunction DismissButton({ onDismiss, size }: DismissButtonProps) {\n  const buttonRef = React.useRef<HTMLButtonElement>(null);\n\n  const { buttonProps, isPressed } = useButton(\n    {\n      \"aria-label\": \"Dismiss\",\n      onPress: onDismiss,\n    },\n    buttonRef\n  );\n\n  const { focusProps, isFocusVisible } = useFocusRing();\n  const { hoverProps, isHovered } = useHover({});\n\n  const iconSize = size === \"sm\" ? \"w-3 h-3\" : size === \"lg\" ? \"w-5 h-5\" : \"w-4 h-4\";\n\n  return (\n    <button\n      {...mergeProps(buttonProps, focusProps, hoverProps)}\n      ref={buttonRef}\n      type=\"button\"\n      className={styles.dismissButton}\n      data-pressed={isPressed || undefined}\n      data-hovered={isHovered || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n    >\n      <svg\n        className={iconSize}\n        fill=\"none\"\n        stroke=\"currentColor\"\n        viewBox=\"0 0 24 24\"\n        aria-hidden=\"true\"\n      >\n        <path\n          strokeLinecap=\"round\"\n          strokeLinejoin=\"round\"\n          strokeWidth={2}\n          d=\"M6 18L18 6M6 6l12 12\"\n        />\n      </svg>\n    </button>\n  );\n}\n\nconst Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(\n  (\n    {\n      variant = \"default\",\n      size = \"md\",\n      icon,\n      dismissible = false,\n      onDismiss,\n      pill = false,\n      children,\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    return (\n      <span\n        ref={ref}\n        className={cn(\n          \"badge\",\n          variant,\n          size,\n          styles.badge,\n          variantMap[variant],\n          sizeMap[size],\n          pill && styles.pill,\n          className\n        )}\n        data-variant={variant}\n        data-size={size}\n        data-pill={pill ? \"true\" : undefined}\n        {...props}\n      >\n        {icon && (\n          <span className={styles.iconWrapper} aria-hidden=\"true\">\n            {icon}\n          </span>\n        )}\n        <span>{children}</span>\n        {dismissible && <DismissButton onDismiss={onDismiss} size={size} />}\n      </span>\n    );\n  }\n);\n\nBadge.displayName = \"Badge\";\n\nexport { Badge };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    --background: var(--background-800);\n    --foreground: var(--background-300);\n    --border: var(--background-600);\n\n    @apply px-2 py-1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-weight: 500;\n    font-size: var(--text-sm);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n  }\n}\n\n.badge.default {\n  --background: var(--background-800);\n  --foreground: var(--background-300);\n  --border: var(--background-600);\n}\n\n.badge.success {\n  --background: var(--success-100);\n  --foreground: var(--success-800);\n  --border: var(--success-300);\n}\n\n.badge.warning {\n  --background: var(--warning-100);\n  --foreground: var(--warning-800);\n  --border: var(--warning-300);\n}\n\n.badge.danger {\n  --background: var(--danger-100);\n  --foreground: var(--danger-800);\n  --border: var(--danger-300);\n}\n\n.badge.info {\n  --background: var(--info-100);\n  --foreground: var(--info-800);\n  --border: var(--info-300);\n}\n\n.badge.sm {\n  @apply px-1 py-0.5;\n  font-size: var(--text-sm);\n}\n\n.badge.md {\n  @apply px-1.5 py-1;\n  font-size: var(--text-sm);\n}\n\n.badge.lg {\n  @apply px-2 py-2.5;\n  font-size: var(--text-sm);\n}\n\n.pill {\n  border-radius: 9999px;\n}\n\n.iconWrapper {\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n}\n\n.dismissButton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: 0.25rem;\n  padding: 0.125rem;\n  border-radius: var(--radius-md);\n  background: transparent;\n  border: none;\n  color: currentColor;\n  cursor: pointer;\n  transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  outline: none;\n}\n\n.dismissButton[data-hovered=\"true\"] {\n  opacity: 0.7;\n}\n\n.dismissButton[data-pressed=\"true\"] {\n  opacity: 0.5;\n  transform: scale(0.95);\n}\n\n.dismissButton[data-focus-visible=\"true\"] {\n  outline: 2px solid currentColor;\n  outline-offset: 1px;\n}\n",
    "cssTypes": "export interface Styles {\n  badge: string;\n  \"default\": string;\n  \"success\": string;\n  \"warning\": string;\n  \"danger\": string;\n  \"info\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n  pill: string;\n  iconWrapper: string;\n  dismissButton: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "breadcrumbs": {
    "tsx": "'use client';\n\nimport React, { ReactNode, forwardRef } from 'react';\nimport styles from \"./Breadcrumbs.module.css\";\n\nexport interface BreadcrumbItemProps {\n  href?: string;\n  onPress?: () => void;\n  children: ReactNode;\n  isCurrent?: boolean;\n  isDisabled?: boolean;\n  className?: string;\n}\n\nexport interface BreadcrumbsProps {\n  children: ReactNode;\n  className?: string;\n  separator?: ReactNode;\n}\n\nconst Breadcrumb = forwardRef<HTMLLIElement, BreadcrumbItemProps>(\n  ({ href, onPress, children, isCurrent = false, isDisabled = false, className }, ref) => {\n    const isInteractive = !isCurrent && !isDisabled && (href || onPress);\n\n    return (\n      <li ref={ref} className={styles.breadcrumb}>\n        {isInteractive ? (\n          <a\n            href={href}\n            className={`${styles.breadcrumbLink} ${className || ''}`}\n            data-disabled={isDisabled || undefined}\n            data-current={isCurrent || undefined}\n            aria-current={isCurrent ? 'page' : undefined}\n            onClick={(e) => {\n              if (onPress) {\n                e.preventDefault();\n                onPress();\n              }\n            }}\n          >\n            {children}\n          </a>\n        ) : (\n          <span\n            className={`${styles.breadcrumbLink} ${className || ''}`}\n            data-disabled={isDisabled || undefined}\n            data-current={isCurrent || undefined}\n            aria-current={isCurrent ? 'page' : undefined}\n          >\n            {children}\n          </span>\n        )}\n      </li>\n    );\n  }\n);\n\nBreadcrumb.displayName = 'Breadcrumb';\n\nconst Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(\n  ({ children, className, separator }, ref) => {\n    const childArray = React.Children.toArray(children);\n    const childCount = childArray.length;\n\n    return (\n      <nav\n        ref={ref}\n        className={`${styles.breadcrumbs} ${className || ''}`}\n        aria-label=\"Breadcrumb\"\n      >\n        <ol className={`${styles.breadcrumbsList} ${separator ? styles.withCustomSeparator : ''}`}>\n          {React.Children.map(childArray, (child, index) => {\n            const isLastChild = index === childCount - 1;\n            if (React.isValidElement(child)) {\n              const element = React.cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {\n                isCurrent: isLastChild,\n              });\n\n              // Add separator after each item except the last\n              if (separator && !isLastChild) {\n                return (\n                  <React.Fragment key={index}>\n                    {element}\n                    <li className={styles.separator} aria-hidden=\"true\">\n                      {separator}\n                    </li>\n                  </React.Fragment>\n                );\n              }\n              return element;\n            }\n            return child;\n          })}\n        </ol>\n      </nav>\n    );\n  }\n);\n\nBreadcrumbs.displayName = 'Breadcrumbs';\n\nexport { Breadcrumbs, Breadcrumb };\n",
    "css": "@layer components {\n  .breadcrumbs {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --font-size: var(--text-sm);\n\n    display: block;\n  }\n\n  .breadcrumbsList {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n  .breadcrumbsList.withCustomSeparator .breadcrumb:not(:last-child)::after {\n    content: none;\n  }\n\n  .breadcrumb {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* Separator after each item except the last */\n  .breadcrumb:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    display: flex;\n    align-items: center;\n    margin: 0;\n    padding: 0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .breadcrumbLink {\n    color: var(--foreground);\n    text-decoration: none;\n    padding: 0.25rem 0.5rem;\n    border-radius: 0.375rem;\n    cursor: pointer;\n    font-size: var(--font-size);\n    line-height: 1.5;\n    position: relative;\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: 500;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: 0.6;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  \"breadcrumbs\": string;\n  \"breadcrumbsList\": string;\n  \"withCustomSeparator\": string;\n  \"breadcrumb\": string;\n  \"separator\": string;\n  \"breadcrumbLink\": string;\n}\n\nexport const styles: Styles;\nexport default styles;\n"
  },
  "button": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useButton, useFocusRing, useHover, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Button.module.css\";\n\ntype ButtonVariant = \"primary\" | \"secondary\" | \"outline\" | \"ghost\";\ntype ButtonSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  variant?: ButtonVariant;\n  size?: ButtonSize;\n  isDisabled?: boolean;\n  onPress?: (e: { target: EventTarget | null }) => void;\n}\n\nconst variantMap = {\n  primary: styles[\"primary\"],\n  secondary: styles[\"secondary\"],\n  outline: styles[\"outline\"],\n  ghost: styles[\"ghost\"],\n} as const;\n\nconst sizeMap = {\n  sm: styles[\"sm\"],\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n} as const;\n\nconst Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ className, variant = \"primary\", size = \"md\", children, onClick, onPress, isDisabled, disabled, ...props }, ref) => {\n    const buttonRef = React.useRef<HTMLButtonElement>(null);\n    const mergedRef = useMergedRef(ref, buttonRef);\n    const isButtonDisabled = isDisabled ?? disabled ?? false;\n    const [isPressed, setIsPressed] = React.useState(false);\n\n    const handlePress = React.useCallback((e: any) => {\n      if (onPress) onPress({ target: e.target });\n      if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);\n    }, [onPress, onClick]);\n\n    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {\n      if (!isButtonDisabled) {\n        setIsPressed(true);\n      }\n      props.onMouseDown?.(e);\n    }, [isButtonDisabled, props]);\n\n    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {\n      setIsPressed(false);\n      props.onMouseUp?.(e);\n    }, [props]);\n\n    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {\n      setIsPressed(false);\n      props.onMouseLeave?.(e);\n    }, [props]);\n\n    const { buttonProps } = useButton({\n      isDisabled: isButtonDisabled,\n      onPress: handlePress,\n    }, buttonRef);\n\n    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });\n    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });\n\n    return (\n      <button\n        {...mergeProps(buttonProps, focusProps, hoverProps, props)}\n        ref={mergedRef}\n        onMouseDown={handleMouseDown}\n        onMouseUp={handleMouseUp}\n        onMouseLeave={handleMouseLeave}\n        className={cn(\"button\", variant, size, styles.button, variantMap[variant], sizeMap[size], className)}\n        data-variant={variant}\n        data-size={size}\n        data-disabled={isButtonDisabled ? \"true\" : undefined}\n        data-pressed={isPressed ? \"true\" : \"false\"}\n        data-hovered={isHovered ? \"true\" : \"false\"}\n        data-focused={isFocused ? \"true\" : \"false\"}\n        data-focus-visible={isFocusVisible ? \"true\" : \"false\"}\n      >\n        {children}\n      </button>\n    );\n  }\n);\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return (value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nButton.displayName = \"Button\";\n\nexport { Button };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply px-3 py-1.5;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-family: inherit;\n    font-weight: 500;\n    font-size: var(--text-md);\n    line-height: var(--leading-snug);\n    user-select: none;\n    cursor: pointer;\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius-md);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out;\n    filter: brightness(100%);\n\n    &:focus-visible {\n      outline: 2px solid var(--blue);\n      outline-offset: 2px;\n    }\n\n    &:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    &:active:not(:disabled) {\n      transform: scale(0.97);\n    }\n  }\n}\n\n.button.primary {\n  background-color: var(--accent-500);\n  color: var(--color-white);\n  border-color: var(--accent-500);\n\n  &:hover:not(:disabled) {\n    filter: brightness(106%);\n    transition: filter 0.20s var(--ease-gentle-ease);\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--accent-500);\n    transition: background-color 0.20s var(--ease-gentle-ease);\n  }\n}\n\n.button.secondary {\n  background-color: var(--background-800);\n  color: var(--foreground-50);\n  border-color: var(--background-700);\n\n  &:hover:not(:disabled) {\n    filter: brightness(104%);\n    transition: filter 0.20s var(--ease-gentle-ease);\n    border-color: var(--background-700);\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--background-800);\n    transition: background-color 0.20s var(--ease-gentle-ease);\n    border-color: var(--background-600);\n  }\n}\n\n.button.outline {\n  --border-hover: var(--background-700);\n  outline: 1px solid var(--background-700);\n  background-color: transparent;\n  color: var(--foreground-50);\n\n  &:hover:not(:disabled) {\n    background-color: var(--background-800);\n    border-color: var(--background-700);\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--background-700);\n    border-color: var(--background-600);\n  }\n}\n\n.button.ghost {\n  background-color: transparent;\n  color: var(--foreground-50);\n  border-color: transparent;\n\n  @media (hover: hover) {\n    &:hover:not(:disabled) {\n      background-color: var(--background-800);\n      border-color: transparent;\n    }\n  }\n\n  &:active:not(:disabled) {\n    background-color: var(--background-700);\n    border-color: transparent;\n  }\n}\n\n.button.sm {\n  @apply px-2.5 py-1 text-sm;\n  font-size: var(--text-sm);\n}\n\n.button.md {\n  @apply px-3 py-1.5;\n  font-size: var(--text-md);\n}\n\n.button.lg {\n  @apply px-4 py-2 text-lg;\n  font-size: var(--text-lg);\n}\n",
    "cssTypes": "export interface Styles {\n  button: string;\n  \"primary\": string;\n  \"secondary\": string;\n  \"outline\": string;\n  \"ghost\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "card": {
    "tsx": "\"use client\"\n\nimport React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Card.module.css\";\n\ninterface CardProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }\n\nconst CardRoot = React.forwardRef<HTMLDivElement, CardProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.card, className)}\n      {...props}\n    />\n  )\n);\nCardRoot.displayName = \"Card\";\n\nconst CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.header, className)}\n      {...props}\n    />\n  )\n);\nCardHeader.displayName = \"Card.Header\";\n\nconst CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.body, className)}\n      {...props}\n    />\n  )\n);\nCardBody.displayName = \"Card.Body\";\n\nconst CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.footer, className)}\n      {...props}\n    />\n  )\n);\nCardFooter.displayName = \"Card.Footer\";\n\n// Compound component\nconst Card = Object.assign(CardRoot, {\n  Header: CardHeader,\n  Body: CardBody,\n  Footer: CardFooter,\n});\n\nexport { Card, CardHeader, CardBody, CardFooter };\nexport type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    --background: var(--background-800);\n    --border: var(--background-700);\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-lg);\n    overflow: hidden;\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring, #0066cc);\n    outline-offset: 2px;\n  }\n\n  .header {\n    --border: var(--background-700);\n\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    --background: color-mix(in srgb, var(--background-900) 50%, transparent);\n    --border: var(--background-700);\n\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  card: string;\n  header: string;\n  body: string;\n  footer: string;\n};\n\nexport default styles;\n"
  },
  "checkbox": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useState } from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Checkbox.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nexport interface CheckboxProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"size\"> {\n  size?: Size;\n  label?: React.ReactNode;\n  helperText?: React.ReactNode;\n  helperTextError?: boolean;\n  isIndeterminate?: boolean;\n}\n\nconst sizeMap: Record<Size, string> = {\n  sm: styles[\"size-sm\"],\n  md: styles[\"size-md\"],\n  lg: styles[\"size-lg\"],\n};\n\nconst labelSizeMap: Record<Size, string> = {\n  sm: styles[\"label-sm\"],\n  md: styles[\"label-md\"],\n  lg: styles[\"label-lg\"],\n};\n\nexport const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      label,\n      helperText,\n      helperTextError = false,\n      id,\n      disabled = false,\n      checked,\n      defaultChecked,\n      onChange,\n      isIndeterminate = false,\n      ...props\n    },\n    ref\n  ) => {\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const [isFocused, setIsFocused] = useState(false);\n    // Track pressed state for tactile feedback animation (data-pressed attribute)\n    const [isPressed, setIsPressed] = useState(false);\n    const [internalChecked, setInternalChecked] = useState(() =>\n      checked !== undefined ? checked : (defaultChecked ?? false)\n    );\n\n    const handleFocus = () => setIsFocused(true);\n    const handleBlur = () => setIsFocused(false);\n\n    // React Aria press state handlers for tactile scale animation (mouse)\n    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      if (!disabled) {\n        setIsPressed(true);\n      }\n      props.onMouseDown?.(e);\n    }, [disabled, props]);\n\n    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      setIsPressed(false);\n      props.onMouseUp?.(e);\n    }, [props]);\n\n    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      setIsPressed(false);\n      props.onMouseLeave?.(e);\n    }, [props]);\n\n    // React Aria press state handlers for keyboard interactions (Space/Enter)\n    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {\n      if (!disabled && (e.key === \" \" || e.key === \"Enter\")) {\n        setIsPressed(true);\n      }\n      props.onKeyDown?.(e);\n    }, [disabled, props]);\n\n    const handleKeyUp = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {\n      if (e.key === \" \" || e.key === \"Enter\") {\n        setIsPressed(false);\n      }\n      props.onKeyUp?.(e);\n    }, [props]);\n\n    React.useEffect(() => {\n      if (checked !== undefined) {\n        setInternalChecked(checked);\n      }\n    }, [checked]);\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      // Update internal state (needed for uncontrolled mode)\n      setInternalChecked(e.target.checked);\n      // Call parent handler if provided\n      onChange?.(e);\n    };\n\n    // Filter out boolean props to avoid DOM attribute warnings\n    const domProps = Object.fromEntries(\n      Object.entries(props).filter(([, value]) => typeof value !== 'boolean')\n    );\n\n    // Determine if this is a controlled component\n    const isControlled = checked !== undefined;\n    const displayChecked = isControlled ? checked : internalChecked;\n\n    return (\n      <div className=\"w-full\" ref={ref}>\n        <div className=\"flex items-start gap-3\">\n          <input\n            ref={inputRef}\n            type=\"checkbox\"\n            id={id}\n            disabled={disabled}\n            {...(isControlled ? { checked } : { defaultChecked: internalChecked })}\n            onChange={handleChange}\n            onFocus={handleFocus}\n            onBlur={handleBlur}\n            onMouseDown={handleMouseDown}\n            onMouseUp={handleMouseUp}\n            onMouseLeave={handleMouseLeave}\n            onKeyDown={handleKeyDown}\n            onKeyUp={handleKeyUp}\n            className={cn(\n              styles.base,\n              sizeMap[size],\n              isIndeterminate && styles.indeterminate,\n              className\n            )}\n            data-size={size}\n            data-selected={displayChecked ? \"true\" : undefined}\n            data-disabled={disabled ? \"true\" : undefined}\n            data-indeterminate={isIndeterminate ? \"true\" : undefined}\n            data-focused={isFocused ? \"true\" : undefined}\n            data-pressed={isPressed ? \"true\" : undefined}\n            {...domProps}\n          />\n          {label && (\n            <label\n              htmlFor={id}\n              className={cn(\n                styles.label,\n                labelSizeMap[size],\n                disabled && styles[\"label-disabled\"]\n              )}\n            >\n              {label}\n            </label>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              styles[\"helper-text\"],\n              helperTextError\n                ? styles[\"helper-text-error\"]\n                : styles[\"helper-text-normal\"]\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nCheckbox.displayName = \"Checkbox\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  /* Visual checkbox container */\n  .base {\n    --background: var(--background-800);\n    --foreground: var(--accent-50);\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n\n    @apply w-5 h-5 cursor-pointer flex-shrink-0;\n    appearance: none;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    outline: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    position: relative;\n  }\n\n  .base:focus-visible {\n    outline: 2px solid transparent;\n    box-shadow: 0 0 0 3px var(--ring-color);\n  }\n\n  .base[data-pressed=\"true\"] {\n    transform: scale(0.92);\n  }\n\n  .base[data-selected=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .base[data-selected=\"true\"]::after {\n    content: \"✓\";\n    color: var(--foreground);\n    font-size: 0.75rem;\n    font-weight: 700;\n    line-height: 1;\n  }\n\n  .base[data-indeterminate=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .base[data-indeterminate=\"true\"]::after {\n    content: \"−\";\n    color: var(--foreground);\n    font-size: 0.875rem;\n    font-weight: 700;\n    line-height: 1;\n  }\n\n  .base[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  .size-sm {\n    @apply w-4 h-4;\n  }\n\n  .size-sm[data-selected=\"true\"]::after {\n    font-size: 0.625rem;\n  }\n\n  .size-sm[data-indeterminate=\"true\"]::after {\n    font-size: 0.625rem;\n  }\n\n  .size-md {\n    @apply w-5 h-5;\n  }\n\n  .size-md[data-selected=\"true\"]::after {\n    font-size: 0.75rem;\n  }\n\n  .size-md[data-indeterminate=\"true\"]::after {\n    font-size: 0.875rem;\n  }\n\n  .size-lg {\n    @apply w-6 h-6;\n  }\n\n  .size-lg[data-selected=\"true\"]::after {\n    font-size: 0.875rem;\n  }\n\n  .size-lg[data-indeterminate=\"true\"]::after {\n    font-size: 1rem;\n  }\n\n  .label {\n    @apply cursor-pointer select-none pt-1;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-sm);\n  }\n\n  .label-md {\n    font-size: var(--text-md);\n  }\n\n  .label-lg {\n    font-size: var(--text-lg);\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm mt-2 ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal {\n    color: inherit;\n  }\n\n  .helper-text-error {\n    color: var(--danger-600);\n  }\n\n  .indeterminate {\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  base: string;\n  \"size-sm\": string;\n  \"size-md\": string;\n  \"size-lg\": string;\n  indeterminate: string;\n  label: string;\n  \"label-sm\": string;\n  \"label-md\": string;\n  \"label-lg\": string;\n  \"label-disabled\": string;\n  \"helper-text\": string;\n  \"helper-text-normal\": string;\n  \"helper-text-error\": string;\n};\n\nexport default styles;\n"
  },
  "command": {
    "tsx": "\"use client\";\n\nimport React, {\n  useState,\n  useEffect,\n  useRef,\n  useMemo,\n  useCallback,\n} from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useOverlayTriggerState } from \"@react-stately/overlays\";\nimport { useDialog } from \"@react-aria/dialog\";\nimport { useSearchField } from \"@react-aria/searchfield\";\nimport { useSearchFieldState } from \"@react-stately/searchfield\";\nimport { FocusScope } from \"@react-aria/focus\";\nimport { filterDOMProps } from \"@react-aria/utils\";\nimport { cn } from \"./utils\";\nimport { FaMagnifyingGlass } from \"react-icons/fa6\";\nimport { Card } from \"../Card\";\nimport { Badge } from \"../Badge\";\nimport styles from \"./Command.module.css\";\n\nexport interface Command {\n  id: string;\n  label: string;\n  description?: string;\n  category?: string;\n  shortcut?: string;\n  icon?: React.ReactNode;\n  keywords?: string[];\n  action: () => void | Promise<void>;\n}\n\nexport interface CommandPaletteProps {\n  open?: boolean;\n  onOpenChange?: (open: boolean) => void;\n  commands?: Command[];\n  onCommandExecute?: (command: Command) => void;\n  placeholder?: string;\n  emptyStateMessage?: string;\n  showCategories?: boolean;\n  closeOnExecute?: boolean;\n  className?: string;\n  contentClassName?: string;\n  overlayClassName?: string;\n  enableSmartSearch?: boolean;\n}\n\n/**\n * Search ranking utility: Scores command relevance to query\n */\nfunction scoreCommandRelevance(command: Command, query: string): number {\n  const label = command.label.toLowerCase();\n  const description = (command.description || \"\").toLowerCase();\n  const id = command.id.toLowerCase();\n\n  // Exact match on label (highest priority - 1000)\n  if (label === query) {\n    return 1000;\n  }\n  // Label starts with query (900)\n  if (label.startsWith(query)) {\n    return 900;\n  }\n  // Exact word match in label (800)\n  if (label.split(/\\s+/).some((word: string) => word === query)) {\n    return 800;\n  }\n  // Partial match in label, earlier is better (700-710)\n  if (label.includes(query)) {\n    const index = label.indexOf(query);\n    return 710 - Math.min(index, 10);\n  }\n  // Exact word match in description (300)\n  if (description.split(/\\s+/).some((word: string) => word === query)) {\n    return 300;\n  }\n  // Partial match in description (200)\n  if (description.includes(query)) {\n    return 200;\n  }\n  // Partial match in ID (100)\n  if (id.includes(query)) {\n    return 100;\n  }\n\n  return 0;\n}\n\n/**\n * Search Field component using react-aria useSearchField\n */\nfunction PaletteSearchInput({\n  searchValue,\n  onSearchChange,\n  placeholder,\n  inputRef,\n}: {\n  searchValue: string;\n  onSearchChange: (value: string) => void;\n  placeholder: string;\n  inputRef: React.RefObject<HTMLInputElement | null>;\n}) {\n  const state = useSearchFieldState({\n    value: searchValue,\n    onChange: onSearchChange,\n  });\n\n  const { inputProps, clearButtonProps } = useSearchField(\n    {\n      \"aria-label\": \"Search commands\",\n      value: state.value,\n      onClear: () => {\n        onSearchChange(\"\");\n      },\n      placeholder,\n    },\n    state,\n    inputRef,\n  );\n\n  // Handle input change directly to ensure filtering works\n  const handleInputChange = useCallback(\n    (e: React.ChangeEvent<HTMLInputElement>) => {\n      const value = e.currentTarget.value;\n      onSearchChange(value);\n    },\n    [onSearchChange],\n  );\n\n  return (\n    <div className={styles[\"search-container\"]}>\n      <div className={styles[\"search-icon\"]}>\n        <FaMagnifyingGlass className=\"w-4 h-4\" />\n      </div>\n      <input\n        {...filterDOMProps(inputProps)}\n        ref={inputRef}\n        value={searchValue}\n        onChange={handleInputChange}\n        className={styles[\"search-input\"]}\n      />\n      <button\n        {...filterDOMProps(clearButtonProps)}\n        aria-label=\"Clear search\"\n        className={styles[\"search-clear\"]}\n      >\n        ✕\n      </button>\n    </div>\n  );\n}\n\n/**\n * Command List Item component\n */\nfunction CommandListItemSimple({\n  command,\n  isSelected,\n  onSelect,\n}: {\n  command: Command;\n  isSelected: boolean;\n  onSelect: (command: Command) => void;\n}) {\n  return (\n    <div\n      onClick={() => onSelect(command)}\n      onKeyDown={(e) => {\n        if (e.key === \"Enter\") {\n          e.preventDefault();\n          onSelect(command);\n        }\n      }}\n      role=\"option\"\n      aria-selected={isSelected ? \"true\" : \"false\"}\n      tabIndex={isSelected ? 0 : -1}\n      className={cn(\"item\", styles[\"item\"])}\n    >\n      <div className={cn(\"item-content\", styles[\"item-content\"])}>\n        {command.icon && (\n          <div className={styles[\"item-icon\"]}>{command.icon}</div>\n        )}\n        <div className={styles[\"item-labels\"]}>\n          <div className={styles[\"item-label\"]}>{command.label}</div>\n          {command.description && (\n            <div className={styles[\"item-description\"]}>\n              {command.description}\n            </div>\n          )}\n        </div>\n      </div>\n      {command.shortcut && (\n        <Badge\n          size=\"sm\"\n          variant=\"default\"\n          className=\"ml-3 flex-shrink-0 font-mono\"\n        >\n          {command.shortcut}\n        </Badge>\n      )}\n    </div>\n  );\n}\n\n/**\n * Command List component - renders filtered commands\n */\nfunction CommandList({\n  commands,\n  selectedIndex,\n  onSelect,\n  loading,\n  emptyMessage,\n  showCategories,\n}: {\n  commands: Command[];\n  selectedIndex: number;\n  onSelect: (command: Command) => void;\n  loading: boolean;\n  emptyMessage: string;\n  showCategories?: boolean;\n}) {\n  const listRef = useRef<HTMLDivElement>(null);\n\n  // Scroll selected item into view\n  useEffect(() => {\n    if (listRef.current) {\n      // We need to account for category headers which are also children\n      // The logic below assumes children are only items.\n      // With category headers, we can't just use index.\n      // Better approach: querySelector for the selected item?\n      const selectedItem = listRef.current.querySelector(\n        '[aria-selected=\"true\"]',\n      );\n      if (selectedItem) {\n        (selectedItem as HTMLElement).scrollIntoView({\n          block: \"nearest\",\n        });\n      }\n    }\n  }, [selectedIndex, commands]); // Added commands dependency\n\n  return (\n    <div\n      ref={listRef}\n      className={cn(\"list\", styles[\"list\"])}\n      role=\"listbox\"\n      aria-label=\"Commands\"\n    >\n      {commands.length === 0 ? (\n        <div className={styles[\"empty\"]}>{emptyMessage}</div>\n      ) : (\n        commands.map((command, idx) => {\n          const prev = commands[idx - 1];\n          const showHeader =\n            showCategories &&\n            command.category &&\n            (!prev || prev.category !== command.category);\n\n          return (\n            <React.Fragment key={command.id}>\n              {showHeader && (\n                <div className={styles[\"category-header\"]}>\n                  {command.category}\n                </div>\n              )}\n              <CommandListItemSimple\n                command={command}\n                isSelected={idx === selectedIndex}\n                onSelect={onSelect}\n              />\n            </React.Fragment>\n          );\n        })\n      )}\n    </div>\n  );\n}\n\n/**\n * Command component that provides keyboard-accessible command execution\n * with search, categories, and keyboard navigation using react-aria hooks.\n */\nconst Command = React.forwardRef<HTMLDivElement, CommandPaletteProps>(\n  (\n    {\n      open = false,\n      onOpenChange,\n      commands = [],\n      onCommandExecute,\n      placeholder = \"Type a command or search...\",\n      emptyStateMessage = \"No commands found.\",\n      showCategories = true,\n      closeOnExecute = true,\n      className,\n      contentClassName,\n      overlayClassName,\n    },\n    ref,\n  ) => {\n    const [mounted, setMounted] = useState(false);\n    const [loading, setLoading] = useState(false);\n    const [searchQuery, setSearchQuery] = useState(\"\");\n\n    // Modal state management\n    const overlayState = useOverlayTriggerState({\n      isOpen: open,\n      onOpenChange: (newOpen) => {\n        if (!newOpen) {\n          setSearchQuery(\"\");\n        }\n        onOpenChange?.(newOpen);\n      },\n    });\n\n    const modalRef = useRef<HTMLDivElement>(null);\n    const inputRef = useRef<HTMLInputElement>(null);\n    const paletteRef = useRef<HTMLDivElement>(null);\n\n    // Use combined refs\n    React.useImperativeHandle(ref, () => paletteRef.current as HTMLDivElement);\n\n    // Handle mount to prevent hydration issues\n    useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    // Global keyboard shortcut listener (Cmd+K / Ctrl+K)\n    useEffect(() => {\n      const handleKeyDown = (event: KeyboardEvent) => {\n        const isMac =\n          navigator.platform.toUpperCase().indexOf(\"MAC\") >= 0 ||\n          navigator.userAgent.indexOf(\"Mac\") !== -1;\n        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;\n\n        if (isCommandKey && event.key === \"k\") {\n          event.preventDefault();\n          overlayState.open();\n        }\n      };\n\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => {\n        document.removeEventListener(\"keydown\", handleKeyDown);\n      };\n    }, [overlayState]);\n\n    // Handle command execution\n    const handleExecuteCommand = useCallback(\n      async (command: Command) => {\n        try {\n          setLoading(true);\n          onCommandExecute?.(command);\n          await command.action();\n          if (closeOnExecute) {\n            overlayState.close();\n          }\n        } catch (error) {\n          console.error(`Error executing command ${command.id}:`, error);\n        } finally {\n          setLoading(false);\n        }\n      },\n      [closeOnExecute, onCommandExecute, overlayState],\n    );\n\n    // Determine category order based on original commands array\n    const categoryOrder = useMemo(() => {\n      const order = new Map<string, number>();\n      let idx = 0;\n      commands.forEach((c) => {\n        if (c.category && !order.has(c.category)) {\n          order.set(c.category, idx++);\n        }\n      });\n      return order;\n    }, [commands]);\n\n    // Filter and sort commands based on search query\n    const filteredCommands = useMemo(() => {\n      const query = searchQuery.toLowerCase().trim();\n\n      if (!query) {\n        return commands;\n      }\n\n      const results = commands\n        .map((command) => ({\n          command,\n          score: scoreCommandRelevance(command, query),\n        }))\n        .filter(({ score }) => score > 0);\n\n      if (showCategories) {\n        results.sort((a, b) => {\n          // Sort by category first\n          const catA = a.command.category;\n          const catB = b.command.category;\n\n          if (catA !== catB) {\n            if (!catA) return 1; // No category goes last\n            if (!catB) return -1;\n\n            const orderA = categoryOrder.get(catA) ?? Infinity;\n            const orderB = categoryOrder.get(catB) ?? Infinity;\n            return orderA - orderB;\n          }\n\n          // Then by score\n          return b.score - a.score;\n        });\n      } else {\n        results.sort((a, b) => b.score - a.score);\n      }\n\n      return results.map(({ command }) => command);\n    }, [commands, searchQuery, showCategories, categoryOrder]);\n\n    // Manage keyboard navigation state manually\n    const [selectedIndex, setSelectedIndex] = useState(0);\n\n    // Handle keyboard navigation\n    useEffect(() => {\n      const handleKeyDown = (event: KeyboardEvent) => {\n        if (!overlayState.isOpen) return;\n\n        switch (event.key) {\n          case \"ArrowDown\":\n            event.preventDefault();\n            setSelectedIndex((prev) =>\n              prev < filteredCommands.length - 1 ? prev + 1 : 0,\n            );\n            break;\n          case \"ArrowUp\":\n            event.preventDefault();\n            setSelectedIndex((prev) =>\n              prev > 0 ? prev - 1 : filteredCommands.length - 1,\n            );\n            break;\n          case \"Enter\":\n            event.preventDefault();\n            if (filteredCommands[selectedIndex]) {\n              handleExecuteCommand(filteredCommands[selectedIndex]);\n            }\n            break;\n          case \"Escape\":\n            event.preventDefault();\n            overlayState.close();\n            break;\n        }\n      };\n\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => document.removeEventListener(\"keydown\", handleKeyDown);\n    }, [\n      overlayState.isOpen,\n      filteredCommands,\n      selectedIndex,\n      handleExecuteCommand,\n      overlayState,\n    ]);\n\n    // Reset selection when search changes\n    useEffect(() => {\n      setSelectedIndex(0);\n    }, [searchQuery]);\n\n    // Auto-focus the search input when palette opens\n    useEffect(() => {\n      if (overlayState.isOpen && inputRef.current) {\n        inputRef.current.focus();\n      }\n    }, [overlayState.isOpen]);\n\n    // Dialog behavior for accessibility\n    const { dialogProps } = useDialog(\n      { \"aria-label\": \"Command palette\" },\n      modalRef,\n    );\n\n    // Handle click outside to dismiss (without scroll locking)\n    const handleOverlayClick = useCallback(\n      (e: React.MouseEvent) => {\n        // Only close if clicking directly on the overlay, not on children\n        if (e.target === e.currentTarget) {\n          overlayState.close();\n        }\n      },\n      [overlayState],\n    );\n\n    if (!mounted || !overlayState.isOpen) {\n      return null;\n    }\n\n    return createPortal(\n      <FocusScope contain restoreFocus>\n        <div\n          className={cn(styles[\"palette\"], styles[\"overlay\"], overlayClassName)}\n          onClick={handleOverlayClick}\n        >\n          {/* Command Palette content */}\n          <Card\n            {...filterDOMProps(dialogProps)}\n            ref={modalRef}\n            className={cn(\"content\", styles[\"content\"], className)}\n            role=\"dialog\"\n            aria-modal=\"true\"\n          >\n            <Card.Header className={styles[\"search\"]}>\n              {/* Search Input */}\n              <PaletteSearchInput\n                searchValue={searchQuery}\n                onSearchChange={setSearchQuery}\n                placeholder={placeholder}\n                inputRef={inputRef}\n              />\n            </Card.Header>\n\n            <div className={cn(styles[\"inner\"], contentClassName)}>\n              {/* Results List */}\n              <CommandList\n                commands={filteredCommands}\n                selectedIndex={selectedIndex}\n                onSelect={handleExecuteCommand}\n                loading={loading}\n                emptyMessage={emptyStateMessage}\n                showCategories={showCategories}\n              />\n            </div>\n            <Card.Footer className={styles[\"footer\"]}>\n              {/* Footer hint */}\n              {commands.length > 0 && (\n                <>\n                  <Badge variant=\"default\">\n                    <span className=\"pr-2\">↑↓</span>Navigate\n                  </Badge>\n                  <Badge variant=\"default\">\n                    <span className=\"pr-2\">↵</span> Select\n                  </Badge>\n                  <Badge className=\"ml-auto\" variant=\"default\">\n                    <span className=\"pr-2\">Esc</span> Close\n                  </Badge>\n                </>\n              )}\n            </Card.Footer>\n          </Card>\n        </div>\n      </FocusScope>,\n      document.body,\n    );\n  },\n);\n\nCommand.displayName = \"Command\";\n\nexport { Command };\nexport { Command as CommandPalette };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .palette {\n    --bg-default: var(--background-950);\n    --bg-hover: var(--background-800);\n    --bg-selected: var(--background-800);\n    --border-default: var(--background-700);\n    --fg-default: var(--foreground-50);\n    --fg-muted: var(--foreground-500);\n    --fg-icon: var(--foreground-400);\n    --overlay: rgb(0 0 0 / 0.2);\n    --list-background: var(--background-950);\n    --footer-background: var(--background-800);\n  }\n\n  /* Overlay Container */\n  .overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 999;\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    overflow: hidden;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: blur(4px);\n  }\n\n  /* Content */\n  .content {\n    position: relative;\n    @apply m-2;\n    background-color: var(--bg-default);\n    border-radius: var(--radius-lg);\n    width: 100%;\n    margin-inline: 1rem;\n    max-width: 28rem;\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);\n    animation: fadeInZoomIn 0.2s ease-out;\n  }\n\n  .inner {\n    @apply px-2;\n    overflow: hidden;\n  }\n\n  /* Search Section */\n  .search {\n    display: flex;\n    border-bottom: var(--border-width-base) solid var(--border-default);\n    @apply p-2;\n  }\n\n  .search-container {\n    position: relative;\n    width: 100%;\n  }\n\n  .search-icon {\n    position: absolute;\n    left: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 1rem;\n    height: 1rem;\n    display: flex;\n    align-items: center;\n    color: var(--fg-muted);\n    pointer-events: none;\n  }\n\n  .search-input {\n    width: 100%;\n    background-color: transparent;\n    border: none;\n    color: var(--fg-default);\n    padding-left: 2rem;\n    padding-block: 0.5rem;\n    font-size: 0.875rem;\n    font-family: inherit;\n  }\n\n  .search-input::placeholder {\n    color: var(--fg-muted);\n  }\n\n  .search-input:focus {\n    outline: none;\n  }\n\n  .search-clear {\n    position: absolute;\n    right: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 0.25rem;\n    border-radius: var(--radius-lg);\n    background-color: transparent;\n    color: var(--fg-muted);\n    border: none;\n    cursor: pointer;\n    transition:\n      background-color 0.15s,\n      color 0.15s;\n  }\n\n  .search-clear:hover {\n    background-color: var(--bg-hover);\n    color: var(--fg-icon);\n  }\n\n  /* List Section */\n  .list {\n    @apply p-0.5 space-y-2;\n    background-color: var(--list-background);\n    height: 44dvh;\n    overflow-y: auto;\n  }\n\n  .item {\n    display: flex;\n    @apply px-2 py-0.5;\n    border-radius: 0.375rem;\n    align-items: center;\n    justify-content: space-between;\n    cursor: pointer;\n    transition: background-color 0.15s;\n  }\n\n  .item:hover {\n    background-color: var(--bg-hover);\n  }\n\n  .item[aria-selected=\"true\"] {\n    background-color: var(--bg-selected);\n  }\n\n  .item-content {\n    display: flex;\n    align-items: center;\n    gap: 0.625rem;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    color: var(--fg-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-label {\n    font-size: 0.875rem;\n    color: var(--fg-default);\n    font-weight: 500;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    color: var(--fg-muted);\n    font-size: 0.875rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: var(--fg-muted);\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--fg-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply px-1.5 py-2 gap-2;\n    width: 100%;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    display: flex;\n    align-items: center;\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fadeInZoomIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  palette: string;\n  overlay: string;\n  backdrop: string;\n  content: string;\n  inner: string;\n  search: string;\n  \"search-container\": string;\n  \"search-icon\": string;\n  \"search-input\": string;\n  \"search-clear\": string;\n  list: string;\n  item: string;\n  \"item-content\": string;\n  \"item-icon\": string;\n  \"item-labels\": string;\n  \"item-label\": string;\n  \"item-description\": string;\n  \"category-header\": string;\n  empty: string;\n  footer: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "confirmation": {
    "tsx": "\"use client\"\n\nimport React, { useState, useEffect } from \"react\"\nimport { cn } from \"./utils\"\nimport { Button } from \"../Button\"\nimport { Card } from \"../Card\"\nimport { HiExclamationCircle, HiExclamation, HiInformationCircle, HiCheckCircle } from \"react-icons/hi\"\n\nexport interface ConfirmationProps {\n  mode?: \"inline\" | \"dialog\" | \"auto\"\n  severity?: \"low\" | \"medium\" | \"high\" | \"critical\"\n  onConfirm: () => void | Promise<void>\n  onCancel?: () => void\n  triggerLabel: string\n  confirmLabel?: string\n  cancelLabel?: string\n  disabled?: boolean\n  title?: string\n  description?: string\n  icon?: React.ReactNode\n  destructiveActionWarning?: string\n  countdownSeconds?: number\n  requiresReason?: boolean\n  confirmationText?: string\n  autoResetAfter?: number\n}\n\nconst severityConfig = {\n  low: {\n    icon: <HiInformationCircle className=\"w-5 h-5 text-blue-500\" />,\n    color: \"bg-blue-500/20 border-blue-500/30\",\n    buttonVariant: \"primary\",\n  },\n  medium: {\n    icon: <HiExclamation className=\"w-5 h-5 text-yellow-500\" />,\n    color: \"bg-yellow-500/20 border-yellow-500/30\",\n    buttonVariant: \"secondary\",\n  },\n  high: {\n    icon: <HiExclamationCircle className=\"w-5 h-5 text-orange-500\" />,\n    color: \"bg-orange-500/20 border-orange-500/30\",\n    buttonVariant: \"secondary\",\n  },\n  critical: {\n    icon: <HiExclamationCircle className=\"w-5 h-5 text-red-500\" />,\n    color: \"bg-red-500/20 border-red-500/30\",\n    buttonVariant: \"secondary\",\n  },\n}\n\n/**\n * Confirmation component for destructive or important actions\n */\nconst Confirmation = React.forwardRef<HTMLDivElement, ConfirmationProps>(\n  (\n    {\n      mode = \"auto\",\n      severity = \"medium\",\n      onConfirm,\n      onCancel,\n      triggerLabel,\n      confirmLabel = \"Confirm\",\n      cancelLabel = \"Cancel\",\n      disabled = false,\n      title,\n      description,\n      icon,\n      destructiveActionWarning,\n      countdownSeconds,\n      requiresReason = false,\n      confirmationText,\n      autoResetAfter,\n    },\n    ref\n  ) => {\n    const [isConfirming, setIsConfirming] = useState(false)\n    const [isLoading, setIsLoading] = useState(false)\n    const [error, setError] = useState<string | null>(null)\n    const [countdown, setCountdown] = useState(countdownSeconds || 0)\n    const [inputValue, setInputValue] = useState(\"\")\n    const [showDialogMode, setShowDialogMode] = useState(false)\n\n    // Determine actual mode\n    const effectiveMode = mode === \"auto\"\n      ? (severity === \"low\" || severity === \"medium\") ? \"inline\" : \"dialog\"\n      : mode\n\n    // Handle countdown timer\n    useEffect(() => {\n      if (!isConfirming || countdown <= 0) return\n\n      const timer = setTimeout(() => {\n        setCountdown(countdown - 1)\n      }, 1000)\n\n      return () => clearTimeout(timer)\n    }, [isConfirming, countdown])\n\n    // Auto-reset inline confirmations\n    useEffect(() => {\n      if (!isConfirming || !autoResetAfter) return\n\n      const timer = setTimeout(() => {\n        resetConfirmation()\n      }, autoResetAfter)\n\n      return () => clearTimeout(timer)\n    }, [isConfirming, autoResetAfter])\n\n    const resetConfirmation = () => {\n      setIsConfirming(false)\n      setError(null)\n      setCountdown(countdownSeconds || 0)\n      setInputValue(\"\")\n      setShowDialogMode(false)\n    }\n\n    const handleTrigger = () => {\n      if (effectiveMode === \"dialog\") {\n        setShowDialogMode(true)\n        setIsConfirming(true)\n      } else {\n        setIsConfirming(true)\n      }\n      setCountdown(countdownSeconds || 0)\n    }\n\n    const handleConfirm = async () => {\n      if (requiresReason && inputValue !== confirmationText) {\n        setError(`Please type \"${confirmationText}\" to confirm`)\n        return\n      }\n\n      if (countdownSeconds && countdown > 0) {\n        setError(`Please wait ${countdown} seconds before confirming`)\n        return\n      }\n\n      setIsLoading(true)\n      setError(null)\n\n      try {\n        await Promise.resolve(onConfirm())\n        resetConfirmation()\n      } catch (err) {\n        setError(err instanceof Error ? err.message : \"An error occurred\")\n        setIsLoading(false)\n      }\n    }\n\n    const handleCancel = () => {\n      onCancel?.()\n      resetConfirmation()\n    }\n\n    const config = severityConfig[severity]\n    const canConfirm = !countdownSeconds || countdown === 0\n    const confirmationValid = !requiresReason || inputValue === confirmationText\n\n    if (effectiveMode === \"inline\" && !showDialogMode) {\n      return (\n        <div ref={ref}>\n          {!isConfirming ? (\n            <Button\n              onClick={handleTrigger}\n              isDisabled={disabled || isLoading}\n              variant={config.buttonVariant as any}\n            >\n              {triggerLabel}\n            </Button>\n          ) : (\n            <Card className=\"max-w-sm\">\n              <Card.Body className=\"space-y-3\">\n                {description && (\n                  <p className=\"text-sm text-foreground-300\">{description}</p>\n                )}\n                {error && (\n                  <p className=\"text-sm text-red-400\">{error}</p>\n                )}\n                <div className=\"flex gap-2\">\n                  <Button\n                    size=\"sm\"\n                    variant=\"primary\"\n                    onClick={handleConfirm}\n                    isDisabled={!canConfirm || !confirmationValid || isLoading}\n                  >\n                    {isLoading ? \"...\" : confirmLabel}\n                  </Button>\n                  <Button\n                    size=\"sm\"\n                    variant=\"outline\"\n                    onClick={handleCancel}\n                    isDisabled={isLoading}\n                  >\n                    {cancelLabel}\n                  </Button>\n                </div>\n              </Card.Body>\n            </Card>\n          )}\n        </div>\n      )\n    }\n\n    // Dialog mode\n    if (showDialogMode) {\n      return (\n        <div ref={ref}>\n          {isConfirming && (\n            <div className=\"fixed inset-0 z-50 flex items-center justify-center bg-black/50\">\n              <Card className=\"max-w-md mx-4\">\n                <Card.Header className=\"space-y-2\">\n                  <div className=\"flex items-start gap-3\">\n                    {icon || config.icon}\n                    <div className=\"flex-1\">\n                      <h4 className=\"font-semibold text-foreground-100\">\n                        {title || triggerLabel}\n                      </h4>\n                    </div>\n                  </div>\n                </Card.Header>\n                <Card.Body className=\"space-y-4\">\n                  {description && (\n                    <p className=\"text-sm text-foreground-300\">{description}</p>\n                  )}\n                  {destructiveActionWarning && (\n                    <div className={cn(\n                      \"p-3 rounded-lg border text-sm\",\n                      config.color\n                    )}>\n                      {destructiveActionWarning}\n                    </div>\n                  )}\n                  {countdownSeconds && countdown > 0 && (\n                    <div className=\"text-sm text-foreground-400\">\n                      Please wait {countdown}s before confirming\n                    </div>\n                  )}\n                  {requiresReason && (\n                    <div>\n                      <label className=\"text-sm ml-1 text-foreground-300\">\n                        Type \"{confirmationText}\" to confirm:\n                      </label>\n                      <input\n                        type=\"text\"\n                        value={inputValue}\n                        onChange={(e) => {\n                          setInputValue(e.target.value)\n                          setError(null)\n                        }}\n                        placeholder={confirmationText}\n                        className=\"w-full mt-2 px-3 py-2 rounded-lg bg-background-800 border border-background-700 text-foreground-100 text-sm\"\n                      />\n                    </div>\n                  )}\n                  {error && (\n                    <p className=\"text-sm text-red-400\">{error}</p>\n                  )}\n                </Card.Body>\n                <Card.Footer className=\"flex gap-2 justify-end\">\n                  <Button\n                    size=\"sm\"\n                    variant=\"outline\"\n                    onClick={handleCancel}\n                    isDisabled={isLoading}\n                  >\n                    {cancelLabel}\n                  </Button>\n                  <Button\n                    size=\"sm\"\n                    variant=\"primary\"\n                    onClick={handleConfirm}\n                    isDisabled={!canConfirm || !confirmationValid || isLoading}\n                  >\n                    {isLoading ? \"...\" : confirmLabel}\n                  </Button>\n                </Card.Footer>\n              </Card>\n            </div>\n          )}\n        </div>\n      )\n    }\n\n    return (\n      <div ref={ref}>\n        <Button\n          onClick={handleTrigger}\n          isDisabled={disabled || isLoading}\n          variant={config.buttonVariant as any}\n        >\n          {triggerLabel}\n        </Button>\n      </div>\n    )\n  }\n)\n\nConfirmation.displayName = \"Confirmation\"\n\nexport { Confirmation }\n",
    "css": "",
    "cssTypes": ""
  },
  "divider": {
    "tsx": "import { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn } from \"./utils\";\nimport React from \"react\";\n\ntype Orientation = \"horizontal\" | \"vertical\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nconst DASHED_DIMENSIONS = {\n  sm: { thickness: 1, dashLength: 8, gapLength: 4 },\n  md: { thickness: 2, dashLength: 8, gapLength: 4 },\n  lg: { thickness: 4, dashLength: 10, gapLength: 6 },\n} as const;\n\nconst DOTTED_DIMENSIONS = {\n  sm: { thickness: 1, radius: 0.5, spacing: 6 },\n  md: { thickness: 2, radius: 1, spacing: 8 },\n  lg: { thickness: 4, radius: 2, spacing: 12 },\n} as const;\n\nfunction getDashedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];\n  const totalLength = dashLength + gapLength;\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\nfunction getDottedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\n// --- CVA Variants ---\n\nconst dividerVariants = cva(\"shrink-0\", {\n  variants: {\n    variant: {\n      solid: \"\",\n      dashed: \"\",\n      dotted: \"\",\n    },\n    orientation: {\n      horizontal: \"w-full\",\n      vertical: \"self-stretch\",\n    },\n    size: {\n      sm: \"\",\n      md: \"\",\n      lg: \"\",\n    },\n    spacing: {\n      none: \"\",\n      sm: \"\",\n      md: \"\",\n      lg: \"\",\n    },\n  },\n  compoundVariants: [\n    // Size + Orientation → dimensions\n    { orientation: \"horizontal\", size: \"sm\", class: \"h-px\" },\n    { orientation: \"vertical\", size: \"sm\", class: \"w-px\" },\n    { orientation: \"horizontal\", size: \"md\", class: \"h-0.5\" },\n    { orientation: \"vertical\", size: \"md\", class: \"w-0.5\" },\n    { orientation: \"horizontal\", size: \"lg\", class: \"h-1\" },\n    { orientation: \"vertical\", size: \"lg\", class: \"w-1\" },\n    // Spacing + Orientation → margins\n    { orientation: \"horizontal\", spacing: \"none\", class: \"my-0\" },\n    { orientation: \"vertical\", spacing: \"none\", class: \"mx-0\" },\n    { orientation: \"horizontal\", spacing: \"sm\", class: \"my-1\" },\n    { orientation: \"vertical\", spacing: \"sm\", class: \"mx-1\" },\n    { orientation: \"horizontal\", spacing: \"md\", class: \"my-2\" },\n    { orientation: \"vertical\", spacing: \"md\", class: \"mx-2\" },\n    { orientation: \"horizontal\", spacing: \"lg\", class: \"my-4\" },\n    { orientation: \"vertical\", spacing: \"lg\", class: \"mx-4\" },\n  ],\n  defaultVariants: {\n    variant: \"solid\",\n    orientation: \"horizontal\",\n    size: \"md\",\n    spacing: \"md\",\n  },\n});\n\nexport interface DividerProps\n  extends React.HTMLAttributes<HTMLDivElement>,\n  VariantProps<typeof dividerVariants> {\n  variant?: \"solid\" | \"dashed\" | \"dotted\";\n  orientation?: \"horizontal\" | \"vertical\";\n  size?: \"sm\" | \"md\" | \"lg\";\n  spacing?: \"none\" | \"sm\" | \"md\" | \"lg\";\n}\n\nconst Divider = React.forwardRef<HTMLDivElement, DividerProps>(\n  (\n    {\n      className,\n      variant = \"solid\",\n      orientation = \"horizontal\",\n      size = \"md\",\n      spacing,\n      style,\n      ...props\n    },\n    ref,\n  ) => {\n    const getMaskStyles = (): React.CSSProperties => {\n      const baseStyles: React.CSSProperties = {\n        backgroundColor: \"var(--color-background-700)\",\n      };\n\n      if (variant === \"solid\") {\n        return baseStyles;\n      }\n\n      const svgDataUri =\n        variant === \"dashed\"\n          ? getDashedMaskSvg(orientation, size)\n          : getDottedMaskSvg(orientation, size);\n\n      const maskRepeat = orientation === \"horizontal\" ? \"repeat-x\" : \"repeat-y\";\n      const encodedSvg = `url(\"data:image/svg+xml,${svgDataUri}\")`;\n\n      return {\n        ...baseStyles,\n        WebkitMaskImage: encodedSvg,\n        maskImage: encodedSvg,\n        WebkitMaskRepeat: maskRepeat,\n        maskRepeat: maskRepeat,\n      } as React.CSSProperties;\n    };\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          dividerVariants({ variant, orientation, size, spacing }),\n          className,\n        )}\n        style={{ ...getMaskStyles(), ...style }}\n        role=\"separator\"\n        aria-orientation={orientation}\n        {...props}\n      />\n    );\n  },\n);\n\nDivider.displayName = \"Divider\";\n\nexport { Divider, dividerVariants };\n",
    "css": "",
    "cssTypes": ""
  },
  "easing-preview": {
    "tsx": "import React from \"react\";\nimport type { EasingKey } from \"../../utils/easing\";\nimport { EASING_FUNCTIONS } from \"../../utils/easing\";\n\nexport interface EasingPreviewProps {\n  easing: EasingKey;\n  size?: \"sm\" | \"md\";\n  className?: string;\n}\n\nexport const EasingPreview = React.forwardRef<SVGSVGElement, EasingPreviewProps>(\n  ({ easing, size = \"sm\", className = \"\" }, ref) => {\n    const easingData = EASING_FUNCTIONS[easing];\n    const match = easingData.bezier.match(\n      /cubic-bezier\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)\\)/\n    );\n\n    if (!match) {\n      return null;\n    }\n\n    const [, x1Str, y1Str, x2Str, y2Str] = match;\n    const x1 = parseFloat(x1Str);\n    const y1 = parseFloat(y1Str);\n    const x2 = parseFloat(x2Str);\n    const y2 = parseFloat(y2Str);\n\n    const svgSize = size === \"sm\" ? 24 : 32;\n    const padding = 2;\n    const graphWidth = svgSize - padding * 2;\n    const graphHeight = svgSize - padding * 2;\n\n    const startX = padding;\n    const startY = padding + graphHeight;\n    const endX = padding + graphWidth;\n    const endY = padding;\n\n    const cp1X = startX + x1 * graphWidth;\n    const cp1Y = startY - y1 * graphHeight;\n    const cp2X = startX + x2 * graphWidth;\n    const cp2Y = startY - y2 * graphHeight;\n\n    const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;\n\n    return (\n      <svg\n        ref={ref}\n        width={svgSize}\n        height={svgSize}\n        viewBox={`0 0 ${svgSize} ${svgSize}`}\n        className={className}\n        style={{\n          display: \"inline-block\",\n        }}\n        aria-label={`${easingData.name} easing curve`}\n      >\n        <g>\n          <rect\n            x={padding}\n            y={padding}\n            width={graphWidth}\n            height={graphHeight}\n            fill=\"none\"\n            stroke=\"currentColor\"\n            strokeWidth=\"0.5\"\n            opacity=\"0.2\"\n          />\n          <path\n            d={pathData}\n            fill=\"none\"\n            stroke=\"currentColor\"\n            strokeWidth=\"1.2\"\n            vectorEffect=\"non-scaling-stroke\"\n          />\n          <circle\n            cx={startX}\n            cy={startY}\n            r=\"0.8\"\n            fill=\"currentColor\"\n            opacity=\"0.6\"\n          />\n          <circle\n            cx={endX}\n            cy={endY}\n            r=\"0.8\"\n            fill=\"currentColor\"\n            opacity=\"0.6\"\n          />\n        </g>\n      </svg>\n    );\n  }\n);\n\nEasingPreview.displayName = \"EasingPreview\";\n",
    "css": "",
    "cssTypes": ""
  },
  "flex": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Flex.module.css\";\n\ntype FlexDirection = \"row\" | \"column\";\ntype FlexWrap = \"wrap\" | \"nowrap\";\ntype FlexJustify =\n  | \"flex-start\"\n  | \"flex-end\"\n  | \"center\"\n  | \"space-between\"\n  | \"space-around\"\n  | \"space-evenly\";\ntype FlexAlign =\n  | \"flex-start\"\n  | \"flex-end\"\n  | \"center\"\n  | \"stretch\"\n  | \"baseline\";\ntype FlexGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\n\nexport interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {\n  direction?: FlexDirection;\n  wrap?: FlexWrap;\n  gap?: FlexGap;\n  justify?: FlexJustify;\n  align?: FlexAlign;\n  containerQueryResponsive?: boolean;\n}\n\nconst directionMap = {\n  row: styles[\"row\"],\n  column: styles[\"column\"],\n} as const;\n\nconst wrapMap = {\n  wrap: styles[\"wrap\"],\n  nowrap: styles[\"nowrap\"],\n} as const;\n\nconst justifyMap = {\n  \"flex-start\": styles[\"justify-flex-start\"],\n  \"flex-end\": styles[\"justify-flex-end\"],\n  center: styles[\"justify-center\"],\n  \"space-between\": styles[\"justify-space-between\"],\n  \"space-around\": styles[\"justify-space-around\"],\n  \"space-evenly\": styles[\"justify-space-evenly\"],\n} as const;\n\nconst alignMap = {\n  \"flex-start\": styles[\"align-flex-start\"],\n  \"flex-end\": styles[\"align-flex-end\"],\n  center: styles[\"align-center\"],\n  stretch: styles[\"align-stretch\"],\n  baseline: styles[\"align-baseline\"],\n} as const;\n\nconst gapMap = {\n  xs: styles[\"gap-xs\"],\n  sm: styles[\"gap-sm\"],\n  md: styles[\"gap-md\"],\n  lg: styles[\"gap-lg\"],\n  xl: styles[\"gap-xl\"],\n} as const;\n\nconst Flex = React.forwardRef<HTMLDivElement, FlexProps>(\n  (\n    {\n      className,\n      direction = \"row\",\n      wrap = \"nowrap\",\n      gap = \"md\",\n      justify = \"flex-start\",\n      align = \"stretch\",\n      containerQueryResponsive = false,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    if (containerQueryResponsive) {\n      return (\n        <div\n          ref={ref}\n          className={cn(styles[\"container-query-parent\"], className)}\n          data-container-responsive=\"true\"\n          {...props}\n        >\n          <div\n            className={cn(\n              styles.flex,\n              directionMap[direction],\n              wrapMap[wrap],\n              gapMap[gap],\n              justifyMap[justify],\n              alignMap[align],\n              styles[\"container-responsive\"]\n            )}\n            data-direction={direction}\n            data-wrap={wrap}\n            data-gap={gap}\n            data-justify={justify}\n            data-align={align}\n          >\n            {children}\n          </div>\n        </div>\n      );\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          styles.flex,\n          directionMap[direction],\n          wrapMap[wrap],\n          gapMap[gap],\n          justifyMap[justify],\n          alignMap[align],\n          className\n        )}\n        data-direction={direction}\n        data-wrap={wrap}\n        data-gap={gap}\n        data-justify={justify}\n        data-align={align}\n        data-container-responsive={containerQueryResponsive || undefined}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nFlex.displayName = \"Flex\";\n\nexport { Flex };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n    width: 100%;\n  }\n\n  /* Direction variants */\n  .flex.row {\n    flex-direction: row;\n  }\n\n  .flex.column {\n    flex-direction: column;\n  }\n\n  /* Wrap variants */\n  .flex.wrap {\n    flex-wrap: wrap;\n  }\n\n  .flex.nowrap {\n    flex-wrap: nowrap;\n  }\n\n  /* Gap variants */\n  .flex.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .flex.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .flex.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .flex.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .flex.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start {\n    justify-content: flex-start;\n  }\n\n  .flex.justify-flex-end {\n    justify-content: flex-end;\n  }\n\n  .flex.justify-center {\n    justify-content: center;\n  }\n\n  .flex.justify-space-between {\n    justify-content: space-between;\n  }\n\n  .flex.justify-space-around {\n    justify-content: space-around;\n  }\n\n  .flex.justify-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align-items variants */\n  .flex.align-flex-start {\n    align-items: flex-start;\n  }\n\n  .flex.align-flex-end {\n    align-items: flex-end;\n  }\n\n  .flex.align-center {\n    align-items: center;\n  }\n\n  .flex.align-stretch {\n    align-items: stretch;\n  }\n\n  .flex.align-baseline {\n    align-items: baseline;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  flex: string;\n  row: string;\n  column: string;\n  wrap: string;\n  nowrap: string;\n  \"gap-xs\": string;\n  \"gap-sm\": string;\n  \"gap-md\": string;\n  \"gap-lg\": string;\n  \"gap-xl\": string;\n  \"justify-flex-start\": string;\n  \"justify-flex-end\": string;\n  \"justify-center\": string;\n  \"justify-space-between\": string;\n  \"justify-space-around\": string;\n  \"justify-space-evenly\": string;\n  \"align-flex-start\": string;\n  \"align-flex-end\": string;\n  \"align-center\": string;\n  \"align-stretch\": string;\n  \"align-baseline\": string;\n  \"container-query-parent\": string;\n  \"container-responsive\": string;\n};\n\nexport default styles;\n"
  },
  "fold": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useToggleState, ToggleState } from \"react-stately\";\nimport { useButton, useFocusRing, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport { Divider, DividerProps } from \"@/components/Divider\";\nimport styles from \"./Fold.module.css\";\n\n// Context to share state\ninterface FoldContextValue {\n  state: ToggleState;\n  isDisabled: boolean;\n}\n\nconst FoldContext = React.createContext<FoldContextValue | null>(null);\n\nconst useFoldContext = () => {\n  const context = React.useContext(FoldContext);\n  if (!context) {\n    throw new Error(\n      \"Fold compound components must be used within a Fold component\",\n    );\n  }\n  return context;\n};\n\n// --- Sub-components ---\n\nexport interface FoldTriggerProps\n  extends React.ButtonHTMLAttributes<HTMLButtonElement> {\n  children: React.ReactNode;\n}\n\nconst FoldTrigger = React.forwardRef<HTMLButtonElement, FoldTriggerProps>(\n  ({ children, className, ...props }, ref) => {\n    const { state, isDisabled } = useFoldContext();\n    const triggerRef = React.useRef<HTMLButtonElement>(null);\n    React.useImperativeHandle(\n      ref,\n      () => triggerRef.current as HTMLButtonElement,\n    );\n\n    const { buttonProps, isPressed } = useButton(\n      {\n        isDisabled,\n        onPress: () => state.toggle(),\n        // Filter out form-related props that useButton doesn't support\n        ...Object.fromEntries(\n          Object.entries(props).filter(\n            ([key]) =>\n              ![\n                \"formAction\",\n                \"formEncType\",\n                \"formMethod\",\n                \"formNoValidate\",\n                \"formTarget\",\n              ].includes(key),\n          ),\n        ),\n      },\n      triggerRef,\n    );\n\n    const { focusProps, isFocused, isFocusVisible } = useFocusRing();\n\n    return (\n      <button\n        ref={triggerRef}\n        {...mergeProps(buttonProps, focusProps)}\n        className={cn(styles.trigger, className)}\n        aria-expanded={state.isSelected}\n        data-expanded={state.isSelected || undefined}\n        data-disabled={isDisabled || undefined}\n        data-focused={isFocused || undefined}\n        data-focus-visible={isFocusVisible || undefined}\n        data-pressed={isPressed || undefined}\n      >\n        <span className={styles.title}>{children}</span>\n        <span className={styles.icon}>\n          <svg viewBox=\"0 0 16 16\" width=\"16\" height=\"16\" fill=\"currentColor\">\n            <path d=\"M4.47 6.47a.75.75 0 000 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8 9.44 5.53 6.97a.75.75 0 00-1.06 0z\" />\n          </svg>\n        </span>\n      </button>\n    );\n  },\n);\nFoldTrigger.displayName = \"Fold.Trigger\";\n\nexport interface FoldContentProps extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n}\n\nconst FoldContent = React.forwardRef<HTMLDivElement, FoldContentProps>(\n  ({ children, className, ...props }, ref) => {\n    const { state } = useFoldContext();\n\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.content, className)}\n        data-expanded={state.isSelected || undefined}\n        aria-hidden={!state.isSelected}\n        {...props}\n      >\n        <div className={styles.contentInner}>{children}</div>\n      </div>\n    );\n  },\n);\nFoldContent.displayName = \"Fold.Content\";\n\n// Updated FoldDivider to allow customization\nconst FoldDivider = React.forwardRef<HTMLDivElement, DividerProps>(\n  ({ className, spacing = \"none\", ...props }, ref) => {\n    return (\n      <Divider\n        ref={ref}\n        className={cn(\"mt-2\", className)}\n        spacing={spacing}\n        {...props}\n      />\n    );\n  },\n);\nFoldDivider.displayName = \"Fold.Divider\";\n\n// --- Main Fold Component ---\n\nexport interface FoldProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"title\" | \"onChange\"> {\n  title?: React.ReactNode; // Made optional for compound usage\n  isExpanded?: boolean;\n  defaultExpanded?: boolean;\n  onExpandedChange?: (isExpanded: boolean) => void;\n  onChange?: (isExpanded: boolean) => void;\n  isDisabled?: boolean;\n  children?: React.ReactNode;\n  triggerClassName?: string;\n  contentClassName?: string;\n}\n\nconst FoldRoot = React.forwardRef<HTMLDivElement, FoldProps>(\n  (\n    {\n      isExpanded,\n      defaultExpanded = false,\n      onExpandedChange,\n      onChange,\n      isDisabled = false,\n      className,\n      children,\n      ...props\n    },\n    ref,\n  ) => {\n    const state = useToggleState({\n      isSelected: isExpanded,\n      defaultSelected: defaultExpanded,\n      onChange: onExpandedChange || onChange,\n    });\n\n    const { title, ...divProps } = props;\n\n    return (\n      <FoldContext.Provider value={{ state, isDisabled }}>\n        <div\n          ref={ref}\n          className={cn(\"fold\", styles.fold, className)}\n          data-disabled={isDisabled || undefined}\n          {...divProps}\n        >\n          {children}\n        </div>\n      </FoldContext.Provider>\n    );\n  },\n);\nFoldRoot.displayName = \"Fold\";\n\n// Compatibility wrapper to support both old API and new Compound API\nconst Fold = React.forwardRef<\n  HTMLDivElement,\n  FoldProps & {\n    Trigger?: typeof FoldTrigger;\n    Content?: typeof FoldContent;\n    Divider?: typeof FoldDivider;\n  }\n>((props, ref) => {\n  const { title, children, triggerClassName, contentClassName, ...rootProps } =\n    props;\n\n  // If title is provided, use the \"Preset\" structure (Backward Compatibility)\n  if (title !== undefined) {\n    const childrenArray = React.Children.toArray(children);\n    const customDivider = childrenArray.find(\n      (child) => React.isValidElement(child) && child.type === FoldDivider,\n    );\n    const filteredChildren = childrenArray.filter(\n      (child) => !(React.isValidElement(child) && child.type === FoldDivider),\n    );\n\n    return (\n      <FoldRoot ref={ref} {...rootProps}>\n        <FoldTrigger className={triggerClassName}>{title}</FoldTrigger>\n        {customDivider || <FoldDivider />}\n        <FoldContent className={contentClassName}>\n          {filteredChildren}\n        </FoldContent>\n      </FoldRoot>\n    );\n  }\n\n  // Otherwise, use Compound structure (children are expected to include Trigger/Content/Divider)\n  return (\n    <FoldRoot ref={ref} {...rootProps}>\n      {children}\n    </FoldRoot>\n  );\n}) as React.ForwardRefExoticComponent<\n  FoldProps & React.RefAttributes<HTMLDivElement>\n> & {\n  Trigger: typeof FoldTrigger;\n  Content: typeof FoldContent;\n  Divider: typeof FoldDivider;\n};\n\nFold.displayName = \"Fold\";\n\n// Attach sub-components\nFold.Trigger = FoldTrigger;\nFold.Content = FoldContent;\nFold.Divider = FoldDivider;\n\nexport { Fold };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .fold {\n    --fold-trigger-background: transparent;\n    --fold-trigger-background-hover: var(--background-800);\n    --fold-trigger-foreground: var(--foreground-50);\n    --fold-content-background: transparent;\n    --fold-content-foreground: var(--foreground-300);\n\n    display: flex;\n    flex-direction: column;\n  }\n\n  .fold[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n\n  /* Focus styling */\n  .trigger:focus-visible,\n  .trigger[data-focused=\"true\"] {\n    background-color: var(--background-800);\n    box-shadow: 0 0 0 2px var(--border-background-600);\n  }\n\n  .trigger {\n    @apply px-3 py-2 text-left cursor-pointer;\n    display: flex;\n    align-items: center;\n    justify-content: between;\n    gap: 0.75rem;\n    width: 100%;\n    font-family: inherit;\n    font-weight: 500;\n    font-size: var(--text-md);\n    line-height: var(--leading-snug);\n    color: var(--fold-trigger-foreground);\n    background-color: var(--fold-trigger-background);\n    border: none;\n    border-radius: var(--radius-md);\n    transition: all 150ms var(--ease-gentle-ease), transform 150ms var(--ease-snappy-pop);\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        background-color: var(--fold-trigger-background-hover);\n      }\n    }\n\n    &:active:not([data-disabled]) {\n      background-color: var(--fold-trigger-background-hover);\n      transform: scale(0.98);\n    }\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1.25rem;\n    height: 1.25rem;\n    flex-shrink: 0;\n    color: inherit;\n    transition: transform 200ms var(--ease-gentle-ease);\n\n    .trigger[data-expanded=\"true\"] & {\n      transform: rotate(180deg);\n    }\n  }\n\n  .title {\n    flex: 1;\n    font-weight: 500;\n  }\n\n  .content {\n    overflow: hidden;\n    max-height: 0;\n    opacity: 0;\n    transition: max-height 300ms var(--ease-smooth-settle),\n                opacity 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      max-height: 2000px;\n      opacity: 1;\n    }\n  }\n\n  .contentInner {\n    color: var(--fold-content-foreground);\n    background-color: var(--fold-content-background);\n    @apply p-2\n  }\n\n  .fold:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
    "cssTypes": "export const fold: string;\nexport const trigger: string;\nexport const icon: string;\nexport const title: string;\nexport const content: string;\nexport const contentInner: string;\n"
  },
  "gallery": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing, useHover, usePress, mergeProps } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport styles from \"./Gallery.module.css\"\n\n// Types\ntype ResponsiveColumns = {\n  base?: number\n  sm?: number\n  md?: number\n  lg?: number\n  xl?: number\n}\n\ntype LayoutType = \"grid\"\n\ninterface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {\n  columns?: number | ResponsiveColumns\n  gap?: number | string\n  layout?: LayoutType\n  columnWidth?: number | string\n}\n\ninterface GalleryItemProps extends React.HTMLAttributes<HTMLElement> {\n  href?: string\n  onPress?: (href?: string) => void\n  columnSpan?: number\n  rowSpan?: number\n  orientation?: \"vertical\" | \"horizontal\"\n}\n\ninterface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {\n  aspectRatio?: string\n}\n\ninterface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> { }\n\n// Gallery Root Component\nconst GalleryRoot = React.forwardRef<HTMLDivElement, GalleryProps>(\n  ({ columns = 3, gap, layout = \"grid\", columnWidth, className, style, children, ...props }, ref) => {\n    const columnValue = typeof columns === \"number\" ? columns : columns.base ?? 3\n    const responsiveColumns = typeof columns === \"object\" ? columns : {}\n    const gapValue = typeof gap === \"number\" ? `${gap / 16}rem` : gap\n    const columnWidthValue = typeof columnWidth === \"number\" ? `${columnWidth}px` : columnWidth\n\n    const cssVariables = {\n      \"--gallery-columns\": columnValue,\n      \"--gallery-columns-sm\": responsiveColumns.sm,\n      \"--gallery-columns-md\": responsiveColumns.md,\n      \"--gallery-columns-lg\": responsiveColumns.lg,\n      \"--gallery-columns-xl\": responsiveColumns.xl,\n      \"--gallery-gap\": gapValue,\n      \"--gallery-column-width\": columnWidthValue,\n    } as React.CSSProperties\n\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.gallery, className)}\n        style={{ ...cssVariables, ...style }}\n        data-layout={layout}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryRoot.displayName = \"Gallery\"\n\n// Gallery Item Component\nconst GalleryItem = React.forwardRef<HTMLElement, GalleryItemProps>(\n  ({ href, onPress, columnSpan, rowSpan, orientation = \"vertical\", className, style, children, ...props }, ref) => {\n    const elementRef = React.useRef<HTMLElement>(null)\n    const combinedRef = (node: HTMLElement | null) => {\n      (elementRef as React.MutableRefObject<HTMLElement | null>).current = node\n      if (typeof ref === \"function\") {\n        ref(node)\n      } else if (ref) {\n        ref.current = node\n      }\n    }\n\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered } = useHover({})\n\n    // Use usePress for button interaction\n    const { pressProps, isPressed } = usePress({\n      onPress: () => onPress?.(href),\n    })\n\n    const spanStyles: React.CSSProperties = {\n      ...(columnSpan && { gridColumn: `span ${columnSpan}` }),\n      ...(rowSpan && { gridRow: `span ${rowSpan}` }),\n      ...style,\n    }\n\n    // Ensure accessible name: aria-label, aria-labelledby, or text content\n    const ariaLabel = props[\"aria-label\"] || props[\"aria-labelledby\"]\n    const hasAccessibleName = ariaLabel || React.Children.count(children) > 0\n\n    const commonProps = mergeProps(\n      focusProps,\n      hoverProps,\n      pressProps,\n      {\n        className: cn(styles.item, className),\n        style: spanStyles,\n        \"data-focus-visible\": isFocusVisible || undefined,\n        \"data-hovered\": isHovered || undefined,\n        \"data-pressed\": isPressed || undefined,\n        \"data-orientation\": orientation,\n        ...(!hasAccessibleName && { \"aria-label\": \"Gallery item\" }),\n        ...props,\n      }\n    )\n\n    return (\n      <div\n        ref={combinedRef as React.Ref<HTMLDivElement>}\n        role=\"button\"\n        tabIndex={0}\n        {...commonProps}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryItem.displayName = \"Gallery.Item\"\n\n// Gallery View Component\nconst GalleryView = React.forwardRef<HTMLDivElement, GalleryViewProps>(\n  ({ aspectRatio = \"16/9\", className, style, children, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.view, className)}\n        style={{\n          \"--gallery-aspect-ratio\": aspectRatio,\n          ...style\n        } as React.CSSProperties}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryView.displayName = \"Gallery.View\"\n\n// Gallery Body Component\nconst GalleryBody = React.forwardRef<HTMLDivElement, GalleryBodyProps>(\n  ({ className, children, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.body, className)}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryBody.displayName = \"Gallery.Body\"\n\n// Compound Component\nconst Gallery = Object.assign(GalleryRoot, {\n  Item: GalleryItem,\n  View: GalleryView,\n  Body: GalleryBody,\n})\n\nexport { Gallery, GalleryItem, GalleryView, GalleryBody }\nexport type { GalleryProps, GalleryItemProps, GalleryViewProps, GalleryBodyProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .gallery {\n    --gap: var(--gallery-gap, 1rem);\n  }\n\n  .gallery[data-layout=\"grid\"] {\n    --columns: var(--gallery-columns, 3);\n\n    display: grid;\n    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));\n    gap: var(--gap);\n  }\n\n  .gallery[data-layout=\"masonry\"] {\n    --column-width: var(--gallery-column-width, 280px);\n\n      width: 100%;\n    column-width: var(--column-width);\n    column-gap: var(--gap);\n  }\n      \n  .gallery[data-layout=\"masonry\"] .item {\n    break-inside: avoid;\n    margin-bottom: var(--gap);\n  }\n\n  @media (min-width: 640px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-sm, var(--gallery-columns, 3));\n    }\n  }\n\n  @media (min-width: 768px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-md, var(--gallery-columns-sm, var(--gallery-columns, 3)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-lg, var(--gallery-columns-md, var(--gallery-columns-sm, var(--gallery-columns, 3))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .gallery[data-layout=\"grid\"] {\n      --columns: var(--gallery-columns-xl, var(--gallery-columns-lg, var(--gallery-columns-md, var(--gallery-columns-sm, var(--gallery-columns, 3)))));\n    }\n  }\n\n  .item {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --border-focus: var(--accent-500);\n\n    display: flex;\n    flex-direction: column;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-lg);\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    cursor: pointer;\n    transition: border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    flex-direction: row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n    --background: var(--background-950);\n\n    position: relative;\n    aspect-ratio: var(--aspect-ratio);\n    background-color: var(--background);\n    overflow: hidden;\n  }\n\n  .view > img,\n  .view > video {\n      width: 100%;\n      height: 100%;\n    object-fit: cover;\n  }\n\n  .body {\n      display: flex;\n      flex-direction: column;\n    gap: 0.25rem;\n    padding: 0.75rem;\n    align-self: flex-start;\n  }\n\n  .body > :first-child {\n    font-weight: 500;\n    color: var(--foreground-50);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly gallery: string;\n  readonly item: string;\n  readonly view: string;\n  readonly body: string;\n};\n\nexport default styles;\n"
  },
  "grid": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Grid.module.css\";\n\ntype GridColumns = \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto-fit\" | \"auto-fill\";\ntype GridRows = \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto\";\ntype GridGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\ntype GridGapAxis = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\ntype GridJustifyItems = \"start\" | \"end\" | \"center\" | \"stretch\";\ntype GridAlignItems = \"start\" | \"end\" | \"center\" | \"stretch\" | \"baseline\";\ntype GridJustifyContent = \"start\" | \"end\" | \"center\" | \"stretch\" | \"space-between\" | \"space-around\" | \"space-evenly\";\ntype GridAlignContent = \"start\" | \"end\" | \"center\" | \"stretch\" | \"space-between\" | \"space-around\" | \"space-evenly\";\ntype GridAutoFlow = \"row\" | \"column\" | \"row-dense\" | \"column-dense\";\n\nexport interface GridProps extends React.HTMLAttributes<HTMLDivElement> {\n  columns?: GridColumns;\n  rows?: GridRows;\n  gap?: GridGap;\n  rowGap?: GridGapAxis;\n  columnGap?: GridGapAxis;\n  justifyItems?: GridJustifyItems;\n  alignItems?: GridAlignItems;\n  justifyContent?: GridJustifyContent;\n  alignContent?: GridAlignContent;\n  autoFlow?: GridAutoFlow;\n  containerQueryResponsive?: boolean;\n}\n\nconst columnsMap = {\n  \"1\": styles[\"columns-1\"],\n  \"2\": styles[\"columns-2\"],\n  \"3\": styles[\"columns-3\"],\n  \"4\": styles[\"columns-4\"],\n  \"5\": styles[\"columns-5\"],\n  \"6\": styles[\"columns-6\"],\n  \"auto-fit\": styles[\"columns-auto-fit\"],\n  \"auto-fill\": styles[\"columns-auto-fill\"],\n} as const;\n\nconst rowsMap = {\n  \"1\": styles[\"rows-1\"],\n  \"2\": styles[\"rows-2\"],\n  \"3\": styles[\"rows-3\"],\n  \"4\": styles[\"rows-4\"],\n  \"5\": styles[\"rows-5\"],\n  \"6\": styles[\"rows-6\"],\n  auto: styles[\"rows-auto\"],\n} as const;\n\nconst gapMap = {\n  xs: styles[\"gap-xs\"],\n  sm: styles[\"gap-sm\"],\n  md: styles[\"gap-md\"],\n  lg: styles[\"gap-lg\"],\n  xl: styles[\"gap-xl\"],\n} as const;\n\nconst rowGapMap = {\n  xs: styles[\"row-gap-xs\"],\n  sm: styles[\"row-gap-sm\"],\n  md: styles[\"row-gap-md\"],\n  lg: styles[\"row-gap-lg\"],\n  xl: styles[\"row-gap-xl\"],\n} as const;\n\nconst columnGapMap = {\n  xs: styles[\"column-gap-xs\"],\n  sm: styles[\"column-gap-sm\"],\n  md: styles[\"column-gap-md\"],\n  lg: styles[\"column-gap-lg\"],\n  xl: styles[\"column-gap-xl\"],\n} as const;\n\nconst justifyItemsMap = {\n  start: styles[\"justify-items-start\"],\n  end: styles[\"justify-items-end\"],\n  center: styles[\"justify-items-center\"],\n  stretch: styles[\"justify-items-stretch\"],\n} as const;\n\nconst alignItemsMap = {\n  start: styles[\"align-items-start\"],\n  end: styles[\"align-items-end\"],\n  center: styles[\"align-items-center\"],\n  stretch: styles[\"align-items-stretch\"],\n  baseline: styles[\"align-items-baseline\"],\n} as const;\n\nconst justifyContentMap = {\n  start: styles[\"justify-content-start\"],\n  end: styles[\"justify-content-end\"],\n  center: styles[\"justify-content-center\"],\n  stretch: styles[\"justify-content-stretch\"],\n  \"space-between\": styles[\"justify-content-space-between\"],\n  \"space-around\": styles[\"justify-content-space-around\"],\n  \"space-evenly\": styles[\"justify-content-space-evenly\"],\n} as const;\n\nconst alignContentMap = {\n  start: styles[\"align-content-start\"],\n  end: styles[\"align-content-end\"],\n  center: styles[\"align-content-center\"],\n  stretch: styles[\"align-content-stretch\"],\n  \"space-between\": styles[\"align-content-space-between\"],\n  \"space-around\": styles[\"align-content-space-around\"],\n  \"space-evenly\": styles[\"align-content-space-evenly\"],\n} as const;\n\nconst autoFlowMap = {\n  row: styles[\"auto-flow-row\"],\n  column: styles[\"auto-flow-column\"],\n  \"row-dense\": styles[\"auto-flow-row-dense\"],\n  \"column-dense\": styles[\"auto-flow-column-dense\"],\n} as const;\n\nconst Grid = React.forwardRef<HTMLDivElement, GridProps>(\n  (\n    {\n      className,\n      columns = \"3\",\n      rows = \"auto\",\n      gap = \"md\",\n      rowGap,\n      columnGap,\n      justifyItems = \"stretch\",\n      alignItems = \"stretch\",\n      justifyContent = \"start\",\n      alignContent = \"start\",\n      autoFlow = \"row\",\n      containerQueryResponsive = false,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    if (containerQueryResponsive) {\n      return (\n        <div\n          ref={ref}\n          className={cn(styles[\"container-query-parent\"], className)}\n          data-container-responsive=\"true\"\n          {...props}\n        >\n          <div\n            className={cn(\n              styles.grid,\n              columnsMap[columns],\n              rowsMap[rows],\n              gapMap[gap],\n              rowGap && rowGapMap[rowGap],\n              columnGap && columnGapMap[columnGap],\n              justifyItemsMap[justifyItems],\n              alignItemsMap[alignItems],\n              justifyContentMap[justifyContent],\n              alignContentMap[alignContent],\n              autoFlowMap[autoFlow],\n              styles[\"container-responsive\"]\n            )}\n            data-columns={columns}\n            data-rows={rows}\n            data-gap={gap}\n            data-row-gap={rowGap}\n            data-column-gap={columnGap}\n            data-justify-items={justifyItems}\n            data-align-items={alignItems}\n            data-justify-content={justifyContent}\n            data-align-content={alignContent}\n            data-auto-flow={autoFlow}\n          >\n            {children}\n          </div>\n        </div>\n      );\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          styles.grid,\n          columnsMap[columns],\n          rowsMap[rows],\n          gapMap[gap],\n          rowGap && rowGapMap[rowGap],\n          columnGap && columnGapMap[columnGap],\n          justifyItemsMap[justifyItems],\n          alignItemsMap[alignItems],\n          justifyContentMap[justifyContent],\n          alignContentMap[alignContent],\n          autoFlowMap[autoFlow],\n          className\n        )}\n        data-columns={columns}\n        data-rows={rows}\n        data-gap={gap}\n        data-row-gap={rowGap}\n        data-column-gap={columnGap}\n        data-justify-items={justifyItems}\n        data-align-items={alignItems}\n        data-justify-content={justifyContent}\n        data-align-content={alignContent}\n        data-auto-flow={autoFlow}\n        data-container-responsive={containerQueryResponsive || undefined}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nGrid.displayName = \"Grid\";\n\nexport { Grid };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Base Grid Styles */\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    grid-template-rows: auto;\n    gap: var(--spacing-md);\n    justify-items: stretch;\n    align-items: stretch;\n    justify-content: start;\n    align-content: start;\n    grid-auto-flow: row;\n    width: 100%;\n  }\n\n  /* Column Variants */\n  .grid.columns-1 {\n    grid-template-columns: repeat(1, 1fr);\n  }\n\n  .grid.columns-2 {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .grid.columns-3 {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  .grid.columns-4 {\n    grid-template-columns: repeat(4, 1fr);\n  }\n\n  .grid.columns-5 {\n    grid-template-columns: repeat(5, 1fr);\n  }\n\n  .grid.columns-6 {\n    grid-template-columns: repeat(6, 1fr);\n  }\n\n  .grid.columns-auto-fit {\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  }\n\n  .grid.columns-auto-fill {\n    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  }\n\n  /* Row Variants */\n  .grid.rows-1 {\n    grid-template-rows: repeat(1, auto);\n  }\n\n  .grid.rows-2 {\n    grid-template-rows: repeat(2, auto);\n  }\n\n  .grid.rows-3 {\n    grid-template-rows: repeat(3, auto);\n  }\n\n  .grid.rows-4 {\n    grid-template-rows: repeat(4, auto);\n  }\n\n  .grid.rows-5 {\n    grid-template-rows: repeat(5, auto);\n  }\n\n  .grid.rows-6 {\n    grid-template-rows: repeat(6, auto);\n  }\n\n  .grid.rows-auto {\n    grid-template-rows: auto;\n  }\n\n  /* Gap Variants */\n  .grid.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .grid.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .grid.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .grid.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .grid.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Row Gap Variants */\n  .grid.row-gap-xs {\n    row-gap: var(--spacing-xs);\n  }\n\n  .grid.row-gap-sm {\n    row-gap: var(--spacing-sm);\n  }\n\n  .grid.row-gap-md {\n    row-gap: var(--spacing-md);\n  }\n\n  .grid.row-gap-lg {\n    row-gap: var(--spacing-lg);\n  }\n\n  .grid.row-gap-xl {\n    row-gap: var(--spacing-xl);\n  }\n\n  /* Column Gap Variants */\n  .grid.column-gap-xs {\n    column-gap: var(--spacing-xs);\n  }\n\n  .grid.column-gap-sm {\n    column-gap: var(--spacing-sm);\n  }\n\n  .grid.column-gap-md {\n    column-gap: var(--spacing-md);\n  }\n\n  .grid.column-gap-lg {\n    column-gap: var(--spacing-lg);\n  }\n\n  .grid.column-gap-xl {\n    column-gap: var(--spacing-xl);\n  }\n\n  /* Justify Items Variants */\n  .grid.justify-items-start {\n    justify-items: start;\n  }\n\n  .grid.justify-items-end {\n    justify-items: end;\n  }\n\n  .grid.justify-items-center {\n    justify-items: center;\n  }\n\n  .grid.justify-items-stretch {\n    justify-items: stretch;\n  }\n\n  /* Align Items Variants */\n  .grid.align-items-start {\n    align-items: start;\n  }\n\n  .grid.align-items-end {\n    align-items: end;\n  }\n\n  .grid.align-items-center {\n    align-items: center;\n  }\n\n  .grid.align-items-stretch {\n    align-items: stretch;\n  }\n\n  .grid.align-items-baseline {\n    align-items: baseline;\n  }\n\n  /* Justify Content Variants */\n  .grid.justify-content-start {\n    justify-content: start;\n  }\n\n  .grid.justify-content-end {\n    justify-content: end;\n  }\n\n  .grid.justify-content-center {\n    justify-content: center;\n  }\n\n  .grid.justify-content-stretch {\n    justify-content: stretch;\n  }\n\n  .grid.justify-content-space-between {\n    justify-content: space-between;\n  }\n\n  .grid.justify-content-space-around {\n    justify-content: space-around;\n  }\n\n  .grid.justify-content-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align Content Variants */\n  .grid.align-content-start {\n    align-content: start;\n  }\n\n  .grid.align-content-end {\n    align-content: end;\n  }\n\n  .grid.align-content-center {\n    align-content: center;\n  }\n\n  .grid.align-content-stretch {\n    align-content: stretch;\n  }\n\n  .grid.align-content-space-between {\n    align-content: space-between;\n  }\n\n  .grid.align-content-space-around {\n    align-content: space-around;\n  }\n\n  .grid.align-content-space-evenly {\n    align-content: space-evenly;\n  }\n\n  /* Auto Flow Variants */\n  .grid.auto-flow-row {\n    grid-auto-flow: row;\n  }\n\n  .grid.auto-flow-column {\n    grid-auto-flow: column;\n  }\n\n  .grid.auto-flow-row-dense {\n    grid-auto-flow: row dense;\n  }\n\n  .grid.auto-flow-column-dense {\n    grid-auto-flow: column dense;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: grid-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior */\n  @container grid-parent (width < 400px) {\n    .grid.container-responsive {\n      grid-template-columns: 1fr;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container grid-parent (400px <= width < 600px) {\n    .grid.container-responsive {\n      grid-template-columns: repeat(2, 1fr);\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container grid-parent (600px <= width < 900px) {\n    .grid.container-responsive {\n      grid-template-columns: repeat(3, 1fr);\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container grid-parent (width >= 900px) {\n    .grid.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly grid: string;\n  readonly \"columns-1\": string;\n  readonly \"columns-2\": string;\n  readonly \"columns-3\": string;\n  readonly \"columns-4\": string;\n  readonly \"columns-5\": string;\n  readonly \"columns-6\": string;\n  readonly \"columns-auto-fit\": string;\n  readonly \"columns-auto-fill\": string;\n  readonly \"rows-1\": string;\n  readonly \"rows-2\": string;\n  readonly \"rows-3\": string;\n  readonly \"rows-4\": string;\n  readonly \"rows-5\": string;\n  readonly \"rows-6\": string;\n  readonly \"rows-auto\": string;\n  readonly \"gap-xs\": string;\n  readonly \"gap-sm\": string;\n  readonly \"gap-md\": string;\n  readonly \"gap-lg\": string;\n  readonly \"gap-xl\": string;\n  readonly \"row-gap-xs\": string;\n  readonly \"row-gap-sm\": string;\n  readonly \"row-gap-md\": string;\n  readonly \"row-gap-lg\": string;\n  readonly \"row-gap-xl\": string;\n  readonly \"column-gap-xs\": string;\n  readonly \"column-gap-sm\": string;\n  readonly \"column-gap-md\": string;\n  readonly \"column-gap-lg\": string;\n  readonly \"column-gap-xl\": string;\n  readonly \"justify-items-start\": string;\n  readonly \"justify-items-end\": string;\n  readonly \"justify-items-center\": string;\n  readonly \"justify-items-stretch\": string;\n  readonly \"align-items-start\": string;\n  readonly \"align-items-end\": string;\n  readonly \"align-items-center\": string;\n  readonly \"align-items-stretch\": string;\n  readonly \"align-items-baseline\": string;\n  readonly \"justify-content-start\": string;\n  readonly \"justify-content-end\": string;\n  readonly \"justify-content-center\": string;\n  readonly \"justify-content-stretch\": string;\n  readonly \"justify-content-space-between\": string;\n  readonly \"justify-content-space-around\": string;\n  readonly \"justify-content-space-evenly\": string;\n  readonly \"align-content-start\": string;\n  readonly \"align-content-end\": string;\n  readonly \"align-content-center\": string;\n  readonly \"align-content-stretch\": string;\n  readonly \"align-content-space-between\": string;\n  readonly \"align-content-space-around\": string;\n  readonly \"align-content-space-evenly\": string;\n  readonly \"auto-flow-row\": string;\n  readonly \"auto-flow-column\": string;\n  readonly \"auto-flow-row-dense\": string;\n  readonly \"auto-flow-column-dense\": string;\n  readonly \"container-query-parent\": string;\n  readonly \"container-responsive\": string;\n};\n\nexport default styles;\n"
  },
  "group": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { cn } from \"./utils\"\nimport { Button, type ButtonProps } from \"../Button\"\nimport { Input, type InputProps } from \"../Input\"\nimport { Select, type SelectProps } from \"../Select\"\nimport { Divider } from \"../Divider\"\nimport styles from \"./Group.module.css\"\n\ntype Orientation = \"horizontal\" | \"vertical\"\ntype Spacing = \"tight\" | \"normal\" | \"relaxed\"\ntype Variant = \"primary\" | \"secondary\" | \"outline\" | \"ghost\"\n\ninterface GroupProps extends React.HTMLAttributes<HTMLDivElement> {\n  orientation?: Orientation\n  spacing?: Spacing\n  variant?: Variant\n  showDividers?: boolean\n  isDisabled?: boolean\n}\n\ninterface GroupContextValue {\n  isInGroup: boolean\n  groupVariant: Variant\n  groupOrientation: Orientation\n  groupSpacing: Spacing\n  groupIsDisabled: boolean\n}\n\n// Context\nconst GroupContext = React.createContext<GroupContextValue | null>(null)\n\nfunction useGroupContext() {\n  const context = React.useContext(GroupContext)\n  if (!context) {\n    throw new Error(\"Group sub-components must be used within Group\")\n  }\n  return context\n}\n\n// Variant and orientation maps\nconst orientationMap: Record<Orientation, string> = {\n  horizontal: styles.horizontal,\n  vertical: styles.vertical,\n}\n\nconst spacingMap: Record<Spacing, string> = {\n  tight: styles.tight,\n  normal: styles.normal,\n  relaxed: styles.relaxed,\n}\n\nconst variantMap: Record<Variant, string | undefined> = {\n  primary: undefined,\n  secondary: undefined,\n  outline: undefined,\n  ghost: styles.ghost,\n}\n\n// Root component\nconst GroupRoot = React.forwardRef<HTMLDivElement, GroupProps>(\n  (\n    {\n      className,\n      orientation = \"horizontal\",\n      spacing = \"normal\",\n      variant = \"primary\",\n      children,\n      showDividers = false,\n      isDisabled = false,\n      ...props\n    },\n    ref\n  ) => {\n    const isVertical = orientation === \"vertical\"\n\n    const childrenArray = React.Children.toArray(children).filter(\n      (child) => child !== null && child !== undefined\n    )\n\n    const contextValue: GroupContextValue = {\n      isInGroup: true,\n      groupVariant: variant,\n      groupOrientation: orientation,\n      groupSpacing: spacing,\n      groupIsDisabled: isDisabled,\n    }\n\n    return (\n      <GroupContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          className={cn(\n            styles.group,\n            orientationMap[orientation],\n            spacingMap[spacing],\n            variantMap[variant],\n            className\n          )}\n          role=\"group\"\n          aria-disabled={isDisabled || undefined}\n          {...props}\n        >\n          {childrenArray.map((child, index) => {\n            const isFirst = index === 0\n            const isLast = index === childrenArray.length - 1\n\n            return (\n              <React.Fragment key={index}>\n                <div\n                  className={cn(\n                    styles.itemWrapper,\n                    isVertical ? styles.vertical : styles.horizontal,\n                    isFirst && styles.first,\n                    isLast && styles.last\n                  )}\n                >\n                  {child}\n                </div>\n                {showDividers && index < childrenArray.length - 1 && (\n                  <Divider\n                    orientation={isVertical ? \"horizontal\" : \"vertical\"}\n                    spacing=\"none\"\n                    size=\"sm\"\n                  />\n                )}\n              </React.Fragment>\n            )\n          })}\n        </div>\n      </GroupContext.Provider>\n    )\n  }\n)\nGroupRoot.displayName = \"Group\"\n\n// Group.Button component\ninterface GroupButtonProps extends ButtonProps { }\n\nconst GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(\n  (props, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const isDisabled = props.isDisabled ?? context.groupIsDisabled\n\n    return (\n      <Button\n        ref={ref}\n        {...props}\n        isDisabled={isDisabled}\n        className={cn(styles.groupItem, props.className)}\n      />\n    )\n  }\n)\nGroupButton.displayName = \"Group.Button\"\n\n// Group.Input component\ninterface GroupInputProps extends InputProps { }\n\nconst GroupInput = React.forwardRef<HTMLInputElement, GroupInputProps>(\n  (props, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const disabled = props.disabled ?? context.groupIsDisabled\n\n    return (\n      <div className={styles.groupInputWrapper}>\n        <Input\n          ref={ref}\n          {...props}\n          disabled={disabled}\n          className={props.className}\n        />\n      </div>\n    )\n  }\n)\nGroupInput.displayName = \"Group.Input\"\n\n// Group.Select component\ninterface GroupSelectProps extends SelectProps<any> { }\n\nconst GroupSelect = React.forwardRef<HTMLDivElement, GroupSelectProps>(\n  ({ className, isDisabled, ...props }, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const disabled = isDisabled ?? context.groupIsDisabled\n\n    return (\n      <div className={styles.groupSelectWrapper}>\n        <Select\n          ref={ref}\n          {...props}\n          isDisabled={disabled}\n          className={className}\n        />\n      </div>\n    )\n  }\n)\nGroupSelect.displayName = \"Group.Select\"\n\n// Assemble compound component\nconst Group = Object.assign(GroupRoot, {\n  Button: GroupButton,\n  Input: GroupInput,\n  Select: GroupSelect,\n})\n\nexport { Group }\nexport type { GroupProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Container */\n  .group {\n    --background: var(--background-950);\n    --border: var(--background-700);\n\n    display: flex;\n    width: fit-content;\n    align-items: center;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-lg);\n    overflow: hidden;\n  }\n\n  /* Orientations */\n  .group.horizontal {\n    flex-direction: row;\n  }\n\n  .group.vertical {\n    flex-direction: column;\n  }\n\n  /* Spacing */\n  .group.tight {\n    gap: 0;\n  }\n\n  .group.normal {\n    gap: var(--spacing-1);\n  }\n\n  .group.relaxed {\n    gap: var(--spacing-2);\n  }\n\n  /* Variants */\n  .group.ghost {\n    --background: transparent;\n    --border: transparent;\n    background-color: transparent;\n    border-color: transparent;\n  }\n\n  /* Item wrapper - manages position-based border-radius */\n  .itemWrapper {\n    /* Spacing is handled by group's gap property */\n  }\n\n  /* Override child component styles when in group */\n  /* Remove all borders and rounded corners for seamless group appearance */\n  .itemWrapper .groupItem,\n  .groupInputWrapper input,\n  .groupSelectWrapper button {\n    border-radius: 0;\n    border: none;\n    outline: none;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  group: string;\n  horizontal: string;\n  vertical: string;\n  tight: string;\n  normal: string;\n  relaxed: string;\n  ghost: string;\n  itemWrapper: string;\n  first: string;\n  last: string;\n  groupItem: string;\n  groupInputWrapper: string;\n  groupSelectWrapper: string;\n};\n\nexport default styles;\n"
  },
  "input": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, type ComponentPropsWithoutRef } from \"react\";\nimport { useFocusRing, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Input.module.css\";\n\ntype Variant = \"default\" | \"ghost\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nexport interface InputProps extends Omit<ComponentPropsWithoutRef<\"input\">, \"size\"> {\n  variant?: Variant;\n  size?: Size;\n  error?: boolean;\n  prefixIcon?: React.ReactNode;\n  suffixIcon?: React.ReactNode;\n}\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return React.useCallback((value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  }, refs);\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  (\n    {\n      className,\n      variant = \"default\",\n      size = \"md\",\n      error = false,\n      disabled,\n      prefixIcon,\n      suffixIcon,\n      type = \"text\",\n      ...props\n    },\n    ref\n  ) => {\n    const hasPrefix = !!prefixIcon;\n    const hasSuffix = !!suffixIcon;\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const mergedRef = useMergedRef(ref, inputRef);\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    return (\n      <div className={styles.container}>\n        {hasPrefix && (\n          <div className={cn(styles.iconWrapper, styles.prefixIcon)}>\n            {prefixIcon}\n          </div>\n        )}\n        <input\n          ref={mergedRef}\n          type={type}\n          disabled={disabled}\n          // Apply data-focus-visible only when keyboard-focused\n          data-focus-visible={isFocusVisible ? \"true\" : undefined}\n          data-disabled={disabled || undefined}\n          data-error={error ? \"true\" : undefined}\n          data-variant={variant}\n          data-size={size}\n          className={cn(\n            styles.input,\n            hasPrefix && \"pl-10\",\n            hasSuffix && \"pr-10\",\n            className\n          )}\n          // Merge React Aria focus props + user props\n          {...mergeProps(focusProps, props)}\n        />\n        {hasSuffix && (\n          <div className={cn(styles.iconWrapper, styles.suffixIcon)}>\n            {suffixIcon}\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nInput.displayName = \"Input\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-500);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    @apply px-3 py-2;\n    transition: transform 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop);\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring-color) 20%, transparent)\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-500);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--danger-600) 25%, transparent);\n      }\n    }\n  }\n\n  .input[data-variant=\"ghost\"] {\n    --background: transparent;\n    --border: transparent;\n    --background-hover: transparent;\n    --border-hover: transparent;\n\n    &[data-focus-visible] {\n      box-shadow: none;\n    }\n  }\n\n  .input[data-size=\"sm\"] {\n    height: 2rem;\n    font-size: var(--text-sm);\n    @apply px-2 py-1;\n  }\n\n  .input[data-size=\"md\"] {\n    height: 2.5rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .input[data-size=\"lg\"] {\n    height: 3rem;\n    font-size: var(--text-base);\n    @apply px-4 py-3;\n  }\n\n  .iconWrapper {\n    position: absolute;\n    top: 50%;\n    display: flex;\n    align-items: center;\n    color: var(--foreground-500);\n    pointer-events: none;\n    transform: translateY(-50%);\n  }\n\n  .prefixIcon {\n    left: 1.00rem;\n  }\n\n  .suffixIcon {\n    right: 1.00rem;\n  }\n\n  .container {\n    position: relative;\n    width: 100%;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  input: string;\n  iconWrapper: string;\n  prefixIcon: string;\n  suffixIcon: string;\n  container: string;\n};\n\nexport default styles;\n"
  },
  "label": {
    "tsx": "import { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn } from \"./utils\";\n\nconst labelVariants = cva(\n  \"block text-foreground-300 transition-colors\",\n  {\n    variants: {\n      size: {\n        sm: \"text-xs\",\n        md: \"text-sm\",\n        lg: \"text-base\",\n      },\n      disabled: {\n        true: \"text-foreground-500 opacity-60 cursor-not-allowed\",\n        false: \"\",\n      },\n      error: {\n        true: \"text-danger-600\",\n        false: \"\",\n      },\n    },\n    defaultVariants: {\n      size: \"md\",\n      disabled: false,\n      error: false,\n    },\n  }\n);\n\nexport interface LabelProps\n  extends React.LabelHTMLAttributes<HTMLLabelElement>,\n  VariantProps<typeof labelVariants> {\n  required?: boolean;\n  helperText?: React.ReactNode;\n  helperTextError?: boolean;\n}\n\nconst Label = ({\n  className,\n  size,\n  disabled,\n  error,\n  required,\n  helperText,\n  helperTextError,\n  children,\n  ...props\n}: LabelProps) => {\n  return (\n    <div className=\"w-full\">\n      <label\n        className={cn(\n          labelVariants({ size, disabled, error, className })\n        )}\n        {...props}\n      >\n        {children}\n        {required && (\n          <span className=\"text-danger-600 ml-1\" aria-label=\"required\">\n            *\n          </span>\n        )}\n      </label>\n      {helperText && (\n        <p className={cn(\n          \"text-xs mt-1 transition-colors\",\n          helperTextError ? \"text-danger-600\" : \"text-foreground-500\"\n        )}>\n          {helperText}\n        </p>\n      )}\n    </div>\n  );\n};\n\nLabel.displayName = \"Label\";\n\nexport { Label, labelVariants };\n",
    "css": "",
    "cssTypes": ""
  },
  "list": {
    "tsx": "'use client';\n\nimport React from 'react';\nimport { cn } from \"./utils\";\nimport styles from './List.module.css';\nimport {\n  ListContainerProps,\n  ListHeaderProps,\n  ListItemProps,\n  ListActionGroupProps,\n  ListDividerProps,\n  ListFooterProps,\n} from './list.types';\n\nconst Container = React.forwardRef<HTMLDivElement, ListContainerProps>(\n  ({ ariaLabel, variant = 'default', children, className, onSelect, ...props }, ref) => (\n    <div\n      ref={ref}\n      role=\"list\"\n      aria-label={ariaLabel}\n      className={cn(styles.container, className)}\n      data-variant={variant}\n      {...(props as React.HTMLAttributes<HTMLDivElement>)}\n    >\n      {children}\n    </div>\n  )\n);\nContainer.displayName = 'List.Container';\n\nconst Header = React.forwardRef<HTMLElement, ListHeaderProps>(\n  ({ sticky, children, className, ...props }, ref) => (\n    <header\n      ref={ref}\n      className={cn(styles.header, sticky && styles.sticky, className)}\n      {...props}\n    >\n      {children}\n    </header>\n  )\n);\nHeader.displayName = 'List.Header';\n\nconst Item = React.forwardRef<HTMLElement, ListItemProps>(\n  ({ selected, interactive, onClick, children, className, ...props }, ref) => (\n    <article\n      ref={ref}\n      className={cn(styles.item, className)}\n      data-interactive={interactive ? 'true' : 'false'}\n      data-selected={selected ? 'true' : 'false'}\n      onClick={onClick}\n      {...props}\n    >\n      {children}\n    </article>\n  )\n);\nItem.displayName = 'List.Item';\n\nconst ActionGroup = React.forwardRef<HTMLDivElement, ListActionGroupProps>(\n  ({ justify = 'flex-start', children, className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.actionGroup, className)}\n      data-justify={justify}\n      {...props}\n    >\n      {children}\n    </div>\n  )\n);\nActionGroup.displayName = 'List.ActionGroup';\n\nconst Divider = React.forwardRef<HTMLHRElement, ListDividerProps>(\n  ({ className, ...props }, ref) => (\n    <hr\n      ref={ref}\n      className={cn(styles.divider, className)}\n      aria-hidden=\"true\"\n      {...props}\n    />\n  )\n);\nDivider.displayName = 'List.Divider';\n\nconst Footer = React.forwardRef<HTMLElement, ListFooterProps>(\n  ({ align = 'center', children, className, ...props }, ref) => (\n    <footer\n      ref={ref}\n      className={cn(styles.footer, className)}\n      data-align={align}\n      {...props}\n    >\n      {children}\n    </footer>\n  )\n);\nFooter.displayName = 'List.Footer';\n\n// Compound component\nconst List = Object.assign(Container, {\n  Header,\n  Item,\n  ActionGroup,\n  Divider,\n  Footer,\n});\n\nexport { List, Container, Header, Item, ActionGroup, Divider, Footer };\nexport type {\n  ListContainerProps,\n  ListHeaderProps,\n  ListItemProps,\n  ListActionGroupProps,\n  ListDividerProps,\n  ListFooterProps,\n};\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --foreground: var(--foreground-50);\n\n    max-width: 28rem;\n    margin-left: auto;\n    margin-right: auto;\n    background-color: var(--background);\n    border-left: var(--border-width-base) solid var(--border);\n    border-right: var(--border-width-base) solid var(--border);\n    font-family: system-ui, -apple-system, sans-serif;\n    color: var(--foreground);\n  }\n\n  .header {\n    --background: var(--background-900);\n    --border: var(--background-700);\n\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    background-color: var(--background);\n    backdrop-filter: blur(12px);\n    border-bottom: var(--border-width-base) solid var(--border);\n    z-index: 10;\n  }\n\n  .header.sticky {\n    position: sticky;\n    top: 0;\n  }\n\n  .header > :first-child {\n    font-weight: 600;\n    font-size: 1.125rem;\n    color: var(--foreground-50);\n  }\n\n  .header > :last-child {\n    color: var(--foreground-400);\n  }\n\n  .item {\n    --background: var(--background-950);\n    --background-hover: var(--background-900);\n    --background-selected: var(--background-900);\n    --border: var(--background-800);\n\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    padding: 1rem;\n    border-bottom: var(--border-width-base) solid var(--border);\n    transition: background-color 300ms var(--ease-snappy-pop);\n    background-color: var(--background);\n  }\n\n  .item[data-interactive=\"true\"] {\n    cursor: pointer;\n  }\n\n  .item[data-interactive=\"true\"]:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-selected=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .actionGroup {\n    display: flex;\n    align-items: center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .actionGroup[data-justify=\"space-between\"] {\n    justify-content: space-between;\n  }\n\n  .actionGroup[data-justify=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .actionGroup[data-justify=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .divider {\n    --border: var(--background-700);\n\n    border-top: var(--border-width-base) solid var(--border);\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n  }\n\n  .footer {\n    padding: 1.5rem;\n    padding-bottom: 3rem;\n    display: flex;\n  }\n\n  .footer[data-align=\"center\"] {\n    justify-content: center;\n  }\n\n  .footer[data-align=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .footer[data-align=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly container: string;\n  readonly header: string;\n  readonly sticky: string;\n  readonly item: string;\n  readonly actionGroup: string;\n  readonly divider: string;\n  readonly footer: string;\n};\n\nexport default styles;\n"
  },
  "menu": {
    "tsx": "import * as React from \"react\"\nimport type { Key } from \"react-aria\"\n\nexport type SelectionMode = \"none\" | \"single\" | \"multiple\"\n\nexport interface Position {\n  x: number\n  y: number\n}\n\nexport interface ItemData {\n  key: Key\n  textValue: string\n  isDisabled?: boolean\n  onSelect?: () => void\n  isSubmenuTrigger?: boolean\n}\n\nexport interface MenuContextValue {\n  isOpen: boolean\n  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>\n  position: Position\n  setPosition: React.Dispatch<React.SetStateAction<Position>>\n  close: () => void\n  selectionMode: SelectionMode\n  selectedKeys: Set<Key>\n  onSelectionChange: (keys: Set<Key>) => void\n  toggleSelection: (key: Key) => void\n  highlightedIndex: number\n  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>\n  items: ItemData[]\n  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void\n  unregisterItem: (key: Key) => void\n  radioGroups: Map<string, Key | null>\n  setRadioGroupValue: (groupName: string, value: Key | null) => void\n  getRadioGroupValue: (groupName: string) => Key | null\n  triggerRef: React.MutableRefObject<HTMLDivElement | null>\n}\n\nexport interface MenuSubmenuContextValue {\n  isOpen: boolean\n  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>\n  triggerRef: React.MutableRefObject<HTMLDivElement | null>\n  parentMenuRef: React.MutableRefObject<HTMLDivElement | null>\n  submenuLevel: number\n  items: ItemData[]\n  highlightedIndex: number\n  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>\n  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void) => void\n  unregisterItem: (key: Key) => void\n  contentRef: React.MutableRefObject<HTMLDivElement | null>\n  closeTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>\n}\n\nexport interface RadioGroupContextValue {\n  name: string\n  value: Key | null\n  onValueChange: (value: Key) => void\n}\n\nexport interface MenuProps extends React.PropsWithChildren {\n  selectionMode?: SelectionMode\n  selectedKeys?: Set<Key>\n  defaultSelectedKeys?: Set<Key>\n  onSelectionChange?: (keys: Set<Key>) => void\n}\n\nexport interface MenuTriggerProps extends React.PropsWithChildren {\n  disabled?: boolean\n  asChild?: boolean\n  className?: string\n}\n\nexport interface MenuPortalProps extends React.PropsWithChildren {\n  container?: HTMLElement\n}\n\nexport interface MenuContentProps extends React.PropsWithChildren {\n  className?: string\n  onCloseAutoFocus?: (event: Event) => void\n  onEscapeKeyDown?: (event: KeyboardEvent) => void\n  onPointerDownOutside?: (event: PointerEvent) => void\n  alignOffset?: number\n  sideOffset?: number\n}\n\nexport interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> { }\n\nexport interface MenuItemProps extends React.PropsWithChildren {\n  disabled?: boolean\n  onSelect?: () => void\n  textValue?: string\n  inset?: boolean\n  className?: string\n  _index?: number\n  _isHighlighted?: boolean\n  _isInSubmenu?: boolean\n}\n\nexport interface MenuCheckboxItemProps extends React.PropsWithChildren {\n  checked?: boolean\n  onCheckedChange?: (checked: boolean) => void\n  disabled?: boolean\n  onSelect?: () => void\n  textValue?: string\n  className?: string\n  _index?: number\n  _isHighlighted?: boolean\n  _isInSubmenu?: boolean\n}\n\nexport interface MenuRadioGroupProps extends React.PropsWithChildren {\n  value?: string\n  onValueChange?: (value: string) => void\n}\n\nexport interface MenuRadioItemProps extends React.PropsWithChildren {\n  value: string\n  disabled?: boolean\n  onSelect?: () => void\n  textValue?: string\n  className?: string\n  _index?: number\n  _isHighlighted?: boolean\n  _isInSubmenu?: boolean\n}\n\nexport interface MenuLabelProps extends React.PropsWithChildren {\n  inset?: boolean\n  className?: string\n}\n\nexport interface MenuSeparatorProps {\n  className?: string\n}\n\nexport interface MenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {\n  className?: string\n}\n\nexport interface MenuSubProps extends React.PropsWithChildren {\n  open?: boolean\n  defaultOpen?: boolean\n  onOpenChange?: (open: boolean) => void\n}\n\nexport interface MenuSubTriggerProps extends React.PropsWithChildren {\n  disabled?: boolean\n  inset?: boolean\n  textValue?: string\n  className?: string\n  _index?: number\n  _isHighlighted?: boolean\n}\n\nexport interface MenuSubContentProps extends React.PropsWithChildren {\n  className?: string\n  sideOffset?: number\n  alignOffset?: number\n}\n\nexport const MenuContext = React.createContext<MenuContextValue | null>(null)\n\nexport function useMenuContext() {\n  const context = React.useContext(MenuContext)\n  if (!context) {\n    throw new Error(\"Menu component must be used within Menu root\")\n  }\n  return context\n}\n\nexport const MenuSubmenuContext = React.createContext<MenuSubmenuContextValue | null>(null)\n\nexport function useMenuSubmenuContext() {\n  return React.useContext(MenuSubmenuContext)\n}\n\nexport const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)\n\nexport function useRadioGroupContext() {\n  return React.useContext(RadioGroupContext)\n}\n\nconst MenuPortal = ({ children }: MenuPortalProps) => {\n  return <>{children}</>\n}\nMenuPortal.displayName = \"MenuPortal\"\n\nconst Menu = ({\n  children,\n  selectionMode = \"none\",\n  selectedKeys: controlledSelectedKeys,\n  defaultSelectedKeys,\n  onSelectionChange,\n}: MenuProps) => {\n  const [isOpen, setIsOpen] = React.useState(false)\n  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 })\n  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(\n    defaultSelectedKeys ?? new Set()\n  )\n  const [highlightedIndex, setHighlightedIndex] = React.useState(0)\n  const [radioGroups, setRadioGroups] = React.useState<Map<string, Key | null>>(new Map())\n\n  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : uncontrolledSelectedKeys\n\n  const registeredItemsRef = React.useRef<Map<Key, ItemData>>(new Map())\n  const [registeredItems, setRegisteredItems] = React.useState<ItemData[]>([])\n\n  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {\n    registeredItemsRef.current.set(key, { key, textValue, isDisabled, onSelect, isSubmenuTrigger })\n    setRegisteredItems(Array.from(registeredItemsRef.current.values()))\n  }, [])\n\n  const unregisterItem = React.useCallback((key: Key) => {\n    registeredItemsRef.current.delete(key)\n    setRegisteredItems(Array.from(registeredItemsRef.current.values()))\n  }, [])\n\n  const handleSelectionChange = React.useCallback((keys: Set<Key>) => {\n    if (controlledSelectedKeys === undefined) {\n      setUncontrolledSelectedKeys(keys)\n    }\n    onSelectionChange?.(keys)\n  }, [controlledSelectedKeys, onSelectionChange])\n\n  const toggleSelection = React.useCallback((key: Key) => {\n    const newKeys = new Set(selectedKeys)\n    if (selectionMode === \"single\") {\n      newKeys.clear()\n      newKeys.add(key)\n    } else if (selectionMode === \"multiple\") {\n      if (newKeys.has(key)) {\n        newKeys.delete(key)\n      } else {\n        newKeys.add(key)\n      }\n    }\n    handleSelectionChange(newKeys)\n  }, [selectedKeys, selectionMode, handleSelectionChange])\n\n  const close = React.useCallback(() => {\n    setIsOpen(false)\n    setHighlightedIndex(0)\n  }, [])\n\n  const setRadioGroupValue = React.useCallback((groupName: string, value: Key | null) => {\n    setRadioGroups(prev => {\n      const next = new Map(prev)\n      next.set(groupName, value)\n      return next\n    })\n  }, [])\n\n  const getRadioGroupValue = React.useCallback((groupName: string) => {\n    return radioGroups.get(groupName) ?? null\n  }, [radioGroups])\n\n  const triggerRef = React.useRef<HTMLDivElement | null>(null)\n\n  const contextValue = React.useMemo(() => (\n    {\n      isOpen,\n      setIsOpen,\n      position,\n      setPosition,\n      close,\n      selectionMode,\n      selectedKeys,\n      onSelectionChange: handleSelectionChange,\n      toggleSelection,\n      highlightedIndex,\n      setHighlightedIndex,\n      items: registeredItems,\n      registerItem,\n      unregisterItem,\n      radioGroups,\n      setRadioGroupValue,\n      getRadioGroupValue,\n      triggerRef,\n    } satisfies MenuContextValue\n  ), [\n    isOpen,\n    setIsOpen,\n    position,\n    setPosition,\n    close,\n    selectionMode,\n    selectedKeys,\n    handleSelectionChange,\n    toggleSelection,\n    highlightedIndex,\n    setHighlightedIndex,\n    registeredItems,\n    registerItem,\n    unregisterItem,\n    radioGroups,\n    setRadioGroupValue,\n    getRadioGroupValue,\n  ])\n\n  return (\n    <MenuContext.Provider value={contextValue}>\n      {children}\n    </MenuContext.Provider>\n  )\n}\nMenu.displayName = \"Menu\"\n\nexport { Menu, MenuPortal }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .content {\n    position: absolute;\n    z-index: 50;\n    min-width: 8rem;\n    overflow: hidden;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius-lg);\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n    animation: contextMenuFadeIn 0.15s var(--ease-snappy-pop);\n\n    &[data-state=\"closed\"] {\n      animation: contextMenuFadeOut 0.1s var(--ease-snappy-pop);\n    }\n  }\n\n  .viewport {\n    @apply p-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item {\n    position: relative;\n    @apply flex items-center px-3 py-2;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n    transition: transform 150ms var(--ease-snappy-pop);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-highlighted]:active {\n      transform: scale(0.96);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      @apply pl-8;\n    }\n  }\n\n  .checkboxItem {\n    position: relative;\n    @apply flex items-center py-2 pl-8 pr-3;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .radioItem {\n    position: relative;\n    @apply flex items-center py-2 pl-8 pr-3;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .itemIndicator {\n    position: absolute;\n    left: 0.75rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subTrigger {\n    position: relative;\n    @apply flex items-center px-3 py-2;\n    font-size: var(--text-sm);\n    color: var(--foreground-50);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    border-radius: var(--radius-md);\n\n    &[data-highlighted] {\n      background-color: var(--background-800);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: var(--background-800);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      @apply pl-8;\n    }\n  }\n\n  .subTriggerChevron {\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subContent {\n    position: absolute;\n    z-index: 50;\n    min-width: 8rem;\n    overflow: hidden;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius-lg);\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n    animation: contextMenuFadeIn 0.15s var(--ease-snappy-pop);\n\n    &[data-state=\"closed\"] {\n      animation: contextMenuFadeOut 0.1s var(--ease-snappy-pop);\n    }\n  }\n\n  .label {\n    @apply px-3 py-2;\n    font-size: var(--text-xs);\n    font-weight: 500;\n    color: var(--foreground-400);\n\n    &[data-inset] {\n      @apply pl-8;\n    }\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    font-size: var(--text-xs);\n    letter-spacing: 0.1em;\n    color: var(--foreground-500);\n  }\n\n  @keyframes contextMenuFadeIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  @keyframes contextMenuFadeOut {\n    from {\n      opacity: 1;\n      transform: scale(1);\n    }\n    to {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  content: string\n  viewport: string\n  item: string\n  checkboxItem: string\n  radioItem: string\n  itemIndicator: string\n  subTrigger: string\n  subTriggerChevron: string\n  subContent: string\n  label: string\n  separator: string\n  shortcut: string\n}\n\nexport default styles\n"
  },
  "modal": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useDialog, useModalOverlay, mergeProps } from \"react-aria\";\nimport { useOverlayTriggerState } from \"react-stately\";\nimport { cn } from \"./utils\";\nimport { HiX } from \"react-icons/hi\";\nimport styles from \"./Modal.module.css\";\n\nconst useModalKeyboard = (\n  ref: React.RefObject<HTMLDivElement | null>,\n  isOpen: boolean,\n  isDismissable: boolean,\n  isKeyboardDismissDisabled: boolean,\n  onClose: () => void\n) => {\n  React.useEffect(() => {\n    if (!isOpen || !ref.current) return;\n\n    ref.current.focus();\n\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\" && isDismissable && !isKeyboardDismissDisabled) {\n        e.preventDefault();\n        onClose();\n      }\n    };\n\n    ref.current.addEventListener(\"keydown\", handleKeyDown);\n    return () => ref.current?.removeEventListener(\"keydown\", handleKeyDown);\n  }, [isOpen, isDismissable, isKeyboardDismissDisabled, onClose]);\n};\n\nexport interface ModalProps {\n  isOpen?: boolean;\n  onOpenChange?: (isOpen: boolean) => void;\n  title?: React.ReactNode;\n  children: React.ReactNode;\n  footer?: React.ReactNode;\n  closeButton?: boolean;\n  size?: \"sm\" | \"md\" | \"lg\" | \"xl\";\n  isDismissable?: boolean;\n  isKeyboardDismissDisabled?: boolean;\n  className?: string;\n  contentClassName?: string;\n  overlayClassName?: string;\n}\n\nconst sizeClasses: Record<string, string> = {\n  sm: styles[\"size-sm\"],\n  md: styles[\"size-md\"],\n  lg: styles[\"size-lg\"],\n  xl: styles[\"size-xl\"],\n};\n\n/**\n * Modal component that displays content in a centered dialog with a backdrop overlay.\n * Built with React Aria for full accessibility support including focus management,\n * keyboard handling, and screen reader announcements.\n */\nconst ModalBase = React.forwardRef<HTMLDivElement, ModalProps>(\n  (\n    {\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      title,\n      children,\n      footer,\n      closeButton = true,\n      size = \"md\",\n      isDismissable = true,\n      isKeyboardDismissDisabled = false,\n      className,\n      contentClassName,\n      overlayClassName,\n    },\n    ref\n  ) => {\n    const modalRef = React.useRef<HTMLDivElement>(null);\n    const [mounted, setMounted] = React.useState(false);\n\n    // Use uncontrolled state management via useOverlayTriggerState\n    const state = useOverlayTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange: onOpenChange,\n    });\n\n    // Handle mount to prevent hydration issues\n    React.useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    // Use forwardRef callback to expose modalRef\n    React.useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);\n\n    // Handle keyboard events and auto-focus\n    useModalKeyboard(\n      modalRef,\n      state.isOpen,\n      isDismissable,\n      isKeyboardDismissDisabled,\n      () => state.close()\n    );\n\n    // useDialog hook provides accessibility attributes and title handling\n    const { dialogProps, titleProps } = useDialog({}, modalRef);\n\n    // useModalOverlay handles focus management, scroll prevention, and backdrop interaction\n    const { modalProps, underlayProps } = useModalOverlay(\n      {\n        isDismissable: isDismissable,\n        isKeyboardDismissDisabled: isKeyboardDismissDisabled,\n      },\n      state,\n      modalRef\n    );\n\n    if (!mounted || !state.isOpen) {\n      return null;\n    }\n\n    const handleClose = () => {\n      state.close();\n    };\n\n    return createPortal(\n      <div\n        className={cn(\n          \"fixed inset-0 z-9999 flex items-center justify-center\",\n          styles.overlay,\n          overlayClassName\n        )}\n      >\n        {/* Backdrop overlay - underlayProps handles click outside and escape key */}\n        <div\n          {...underlayProps}\n          className={cn(styles.backdrop)}\n        />\n\n        {/* Modal content */}\n        <div\n          {...mergeProps(dialogProps, modalProps)}\n          ref={modalRef}\n          className={cn(\n            styles.modal,\n            sizeClasses[size],\n            className\n          )}\n          onClick={(e) => e.stopPropagation()}\n          tabIndex={-1}\n          data-open={state.isOpen || undefined}\n        >\n          {/* Header */}\n          {(title || closeButton) && (\n            <div className={styles.header}>\n              {title && (\n                <h4 {...titleProps} className={styles.title}>\n                  {title}\n                </h4>\n              )}\n              {!title && closeButton && <div className={styles.spacer} />}\n              {closeButton && (\n                <button\n                  onClick={handleClose}\n                  className={styles.closeButton}\n                  aria-label=\"Close modal\"\n                >\n                  <HiX className={styles.closeIcon} />\n                </button>\n              )}\n            </div>\n          )}\n\n          {/* Body */}\n          <div className={cn(styles.content, contentClassName)}>\n            {children}\n          </div>\n\n          {/* Footer */}\n          {footer && (\n            <div className={styles.footer}>\n              {footer}\n            </div>\n          )}\n        </div>\n      </div>,\n      document.body\n    );\n  }\n);\n\nModalBase.displayName = \"Modal\";\n\n/**\n * ModalHeader component for use with compound Modal pattern\n */\nconst ModalHeader = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={styles.header} {...props}>\n    {children}\n  </div>\n));\n\nModalHeader.displayName = \"Modal.Header\";\n\n/**\n * ModalBody component for use with compound Modal pattern\n */\nconst ModalBody = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={styles.content} {...props}>\n    {children}\n  </div>\n));\n\nModalBody.displayName = \"Modal.Body\";\n\n/**\n * ModalFooter component for use with compound Modal pattern\n */\nconst ModalFooter = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={styles.footer} {...props}>\n    {children}\n  </div>\n));\n\nModalFooter.displayName = \"Modal.Footer\";\n\n/**\n * Modal with compound components\n */\ninterface ModalComponent extends React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>> {\n  Header: typeof ModalHeader;\n  Body: typeof ModalBody;\n  Footer: typeof ModalFooter;\n}\n\nconst Modal = ModalBase as ModalComponent;\nModal.Header = ModalHeader;\nModal.Body = ModalBody;\nModal.Footer = ModalFooter;\n\nexport { Modal, ModalHeader, ModalBody, ModalFooter };\n",
    "css": ".overlay {\n  --modal-bg: var(--color-background-900, #0f0f0f);\n  --modal-border: var(--color-background-700, #1a1a1a);\n  --modal-title-color: var(--color-foreground-100, #f5f5f5);\n  --modal-close-color: var(--color-foreground-500, #8b8b8b);\n  --modal-close-hover: var(--color-foreground-200, #e5e5e5);\n}\n\n.backdrop {\n  position: absolute;\n  inset: 0;\n  background-color: rgb(0 0 0 / 0.5);\n  backdrop-filter: blur(4px);\n  transition: opacity 200ms var(--ease-gentle-ease);\n  cursor: pointer;\n}\n\n.modal {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  margin: 1rem;\n  background-color: var(--modal-bg);\n  border: 1px solid var(--modal-border);\n  border-radius: var(--radius-md);\n  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);\n  animation: modalIn 200ms var(--ease-snappy-pop);\n  pointer-events: auto;\n}\n\n@keyframes modalIn {\n  from {\n    opacity: 0;\n    transform: scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  border-bottom: 1px solid var(--modal-border);\n  padding: 1rem;\n}\n\n.title {\n  margin: 0;\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n  font-weight: 600;\n  color: var(--modal-title-color);\n}\n\n.spacer {\n  flex: 1;\n}\n\n.closeButton {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: auto;\n  padding: 0.25rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: var(--modal-close-color);\n  transition: color 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n}\n\n.closeButton:hover {\n  color: var(--modal-close-hover);\n}\n\n.closeButton:active {\n  transform: scale(0.92);\n}\n\n.closeButton:focus {\n  outline: 2px solid var(--modal-close-hover);\n  outline-offset: 2px;\n  border-radius: 0.25rem;\n}\n\n.closeIcon {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n\n.content {\n  flex: 1;\n  padding: 1rem;\n  overflow-y: auto;\n  max-height: calc(100vh - 12rem);\n}\n\n.content::-webkit-scrollbar {\n  width: 6px;\n}\n\n.content::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.content::-webkit-scrollbar-thumb {\n  background: var(--modal-border);\n  border-radius: 3px;\n}\n\n.content::-webkit-scrollbar-thumb:hover {\n  background: var(--modal-close-color);\n}\n\n.footer {\n  border-top: 1px solid var(--modal-border);\n  padding: 0.5rem;\n}\n\n/* Size variants */\n.size-sm {\n  max-width: 24rem; /* 384px */\n}\n\n.size-md {\n  max-width: 28rem; /* 448px */\n}\n\n.size-lg {\n  max-width: 32rem; /* 512px */\n}\n\n.size-xl {\n  max-width: 42rem; /* 672px */\n}\n\n/* Media queries for smaller screens */\n@media (max-width: 640px) {\n  .modal {\n    margin: 1rem;\n  }\n\n  .content {\n    max-height: calc(100vh - 10rem);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  overlay: string;\n  backdrop: string;\n  modal: string;\n  header: string;\n  title: string;\n  spacer: string;\n  closeButton: string;\n  closeIcon: string;\n  content: string;\n  footer: string;\n  \"size-sm\": string;\n  \"size-md\": string;\n  \"size-lg\": string;\n  \"size-xl\": string;\n};\n\nexport default styles;\n"
  },
  "popover": {
    "tsx": "\"use client\"\n\nimport React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useOverlayTrigger, useDialog, mergeProps } from \"react-aria\";\nimport { useOverlayTriggerState } from \"react-stately\";\nimport { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';\nimport { cn } from \"./utils\";\n\nconst ARROW_SIZE = 12;\nconst ARROW_MASK_THICKNESS = 2;\nconst POPOVER_GAP = 8;\nconst ARROW_POSITIONING_SIZE = 6;\n\ntype PopoverPosition = \"top\" | \"right\" | \"bottom\" | \"left\";\n\nexport interface PopoverProps {\n  children: React.ReactNode;\n  content: React.ReactNode;\n  position?: PopoverPosition;\n  className?: string;\n  contentClassName?: string;\n  isOpen?: boolean;\n  onOpenChange?: (isOpen: boolean) => void;\n  showArrow?: boolean;\n}\n\ninterface ArrowLineSegment {\n  x1: number;\n  y1: number;\n  x2: number;\n  y2: number;\n}\n\ninterface PopoverArrowProps {\n  position: PopoverPosition;\n}\n\nconst PopoverArrow = ({ position }: PopoverArrowProps) => {\n  const [borderWidth, setBorderWidth] = React.useState(1);\n\n  React.useEffect(() => {\n    const root = document.documentElement;\n    const borderWidthStr = getComputedStyle(root).getPropertyValue(\"--border-width-base\").trim();\n    const width = parseFloat(borderWidthStr) || 1;\n    setBorderWidth(width);\n  }, []);\n\n  const getArrowPoints = (): string => {\n    const halfSize = ARROW_SIZE / 2;\n    switch (position) {\n      case \"top\":\n        return `${halfSize},${ARROW_SIZE} 0,0 ${ARROW_SIZE},0`;\n      case \"bottom\":\n        return `${halfSize},0 0,${ARROW_SIZE} ${ARROW_SIZE},${ARROW_SIZE}`;\n      case \"left\":\n        return `${ARROW_SIZE},${halfSize} 0,0 0,${ARROW_SIZE}`;\n      case \"right\":\n        return `0,${halfSize} ${ARROW_SIZE},0 ${ARROW_SIZE},${ARROW_SIZE}`;\n    }\n  };\n\n  const getBorderLines = (): ArrowLineSegment[] => {\n    const halfSize = ARROW_SIZE / 2;\n    switch (position) {\n      case \"top\":\n        return [\n          { x1: halfSize, y1: ARROW_SIZE, x2: 0, y2: 0 },\n          { x1: halfSize, y1: ARROW_SIZE, x2: ARROW_SIZE, y2: 0 },\n        ];\n      case \"bottom\":\n        return [\n          { x1: halfSize, y1: 0, x2: 0, y2: ARROW_SIZE },\n          { x1: halfSize, y1: 0, x2: ARROW_SIZE, y2: ARROW_SIZE },\n        ];\n      case \"left\":\n        return [\n          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: 0 },\n          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: ARROW_SIZE },\n        ];\n      case \"right\":\n        return [\n          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: 0 },\n          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: ARROW_SIZE },\n        ];\n    }\n  };\n\n  const getArrowStyles = (): React.CSSProperties => {\n    const borderOffset = borderWidth / 2;\n    switch (position) {\n      case \"top\":\n        return {\n          top: `calc(100% + ${borderOffset}px)`,\n          left: \"50%\",\n          transform: `translateX(-50%) translateY(-${borderOffset}px)`,\n        };\n      case \"bottom\":\n        return {\n          bottom: `calc(100% + ${borderOffset}px)`,\n          left: \"50%\",\n          transform: `translateX(-50%) translateY(${borderOffset}px)`,\n        };\n      case \"left\":\n        return {\n          left: `calc(100% + ${borderOffset}px)`,\n          top: \"50%\",\n          transform: `translateY(-50%) translateX(-${borderOffset}px)`,\n        };\n      case \"right\":\n        return {\n          right: `calc(100% + ${borderOffset}px)`,\n          top: \"50%\",\n          transform: `translateY(-50%) translateX(${borderOffset}px)`,\n        };\n    }\n  };\n\n  const getMaskRect = (): React.ReactNode => {\n    switch (position) {\n      case \"top\":\n        return <rect x=\"0\" y={ARROW_SIZE - ARROW_MASK_THICKNESS} width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill=\"black\" />;\n      case \"bottom\":\n        return <rect x=\"0\" y=\"0\" width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill=\"black\" />;\n      case \"left\":\n        return <rect x={ARROW_SIZE - ARROW_MASK_THICKNESS} y=\"0\" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill=\"black\" />;\n      case \"right\":\n        return <rect x=\"0\" y=\"0\" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill=\"black\" />;\n    }\n  };\n\n  return (\n    <svg\n      width={ARROW_SIZE}\n      height={ARROW_SIZE}\n      viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`}\n      className=\"absolute pointer-events-none\"\n      style={getArrowStyles()}\n    >\n      <defs>\n        <mask id={`popover-arrow-mask-${position}`}>\n          <rect width={ARROW_SIZE} height={ARROW_SIZE} fill=\"white\" />\n          {getMaskRect()}\n        </mask>\n      </defs>\n      <polygon\n        points={getArrowPoints()}\n        fill=\"var(--color-background-900)\"\n        mask={`url(#popover-arrow-mask-${position})`}\n      />\n      {getBorderLines().map((line, idx) => (\n        <line\n          key={idx}\n          x1={line.x1}\n          y1={line.y1}\n          x2={line.x2}\n          y2={line.y2}\n          stroke=\"var(--color-background-700)\"\n          strokeWidth={borderWidth}\n          strokeLinecap=\"round\"\n        />\n      ))}\n    </svg>\n  );\n};\n\nconst Popover = React.forwardRef<HTMLDivElement, PopoverProps>(\n  ({ children, content, position = \"bottom\", className, contentClassName, isOpen: controlledIsOpen, onOpenChange, showArrow = false }, ref) => {\n    const triggerRef = React.useRef<HTMLDivElement>(null);\n    const popoverContentRef = React.useRef<HTMLDivElement>(null);\n    const [mounted, setMounted] = React.useState(false);\n    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);\n\n    const state = useOverlayTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange,\n    });\n\n    React.useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    const { triggerProps, overlayProps } = useOverlayTrigger({ type: \"dialog\" }, state, triggerRef);\n    const { dialogProps } = useDialog({}, popoverContentRef);\n\n    const placementMap: Record<PopoverPosition, \"top\" | \"bottom\" | \"left\" | \"right\"> = {\n      top: \"top\",\n      bottom: \"bottom\",\n      left: \"left\",\n      right: \"right\",\n    };\n\n    const { refs, floatingStyles, placement } = useFloating({\n      placement: placementMap[position],\n      whileElementsMounted: autoUpdate,\n      middleware: [\n        offset(POPOVER_GAP + ARROW_POSITIONING_SIZE),\n        flip(),\n        shift({ padding: 8 }),\n      ],\n    });\n\n    const isPositioned = floatingStyles.transform !== undefined;\n\n    React.useLayoutEffect(() => {\n      refs.setReference(triggerRef.current);\n    }, [refs]);\n\n    React.useEffect(() => {\n      if (typeof document === 'undefined') return;\n      const container = document.createElement('div');\n      container.setAttribute('data-popover-portal', '');\n      container.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 500;';\n      document.body.appendChild(container);\n      setPortalContainer(container);\n      return () => {\n        document.body.removeChild(container);\n      };\n    }, []);\n\n    React.useEffect(() => {\n      if (!state.isOpen) return;\n      const handleClickOutside = (e: MouseEvent) => {\n        const target = e.target as Node;\n        if (\n          triggerRef.current &&\n          !triggerRef.current.contains(target) &&\n          popoverContentRef.current &&\n          !popoverContentRef.current.contains(target)\n        ) {\n          state.close();\n        }\n      };\n      document.addEventListener(\"click\", handleClickOutside);\n      return () => document.removeEventListener(\"click\", handleClickOutside);\n    }, [state.isOpen, state]);\n\n    React.useEffect(() => {\n      if (!state.isOpen) return;\n      const handleKeyDown = (event: KeyboardEvent) => {\n        if (event.key === \"Escape\") state.close();\n      };\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => document.removeEventListener(\"keydown\", handleKeyDown);\n    }, [state.isOpen, state]);\n\n    const mergedTriggerRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;\n        refs.setReference(el);\n        if (typeof ref === \"function\") ref(el);\n        else if (ref) ref.current = el;\n      },\n      [refs, ref]\n    );\n\n    const mergedContentRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        (popoverContentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;\n        refs.setFloating(el);\n      },\n      [refs]\n    );\n\n    // Convert React Aria's onPress to onClick for native HTML elements\n    const nativeProps = React.useMemo(() => {\n      const props: any = { ...triggerProps };\n      if (props.onPress && typeof props.onPress === 'function') {\n        const onPress = props.onPress;\n        props.onClick = (e: React.MouseEvent) => {\n          onPress({ target: e.currentTarget, type: 'press', pointerType: 'mouse', ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey });\n        };\n        delete props.onPress;\n      }\n      return props;\n    }, [triggerProps]);\n\n    const triggerElement = React.isValidElement(children)\n      ? React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement | HTMLDivElement> }>, {\n        ...nativeProps,\n        className: cn((children as React.ReactElement<{ className?: string }>).props.className, className),\n        ref: mergedTriggerRef,\n      })\n      : (\n        <div ref={mergedTriggerRef} {...nativeProps} className={cn(\"inline-block\", className)}>\n          {children}\n        </div>\n      );\n\n    if (!mounted || !portalContainer) {\n      return triggerElement;\n    }\n\n    return (\n      <>\n        {triggerElement}\n        {state.isOpen &&\n          createPortal(\n            <div\n              {...mergeProps(overlayProps, dialogProps)}\n              ref={mergedContentRef}\n              role=\"dialog\"\n              className={cn(\"relative pointer-events-auto bg-background-900 text-foreground-50 text-sm p-3 rounded-lg shadow-lg border border-background-700\", contentClassName)}\n              style={{\n                ...floatingStyles,\n                visibility: isPositioned ? 'visible' : 'hidden',\n                minWidth: '200px',\n                maxWidth: '400px',\n                width: 'max-content',\n              }}\n            >\n              {content}\n              {showArrow && <PopoverArrow position={position as PopoverPosition} />}\n            </div>,\n            portalContainer!\n          )}\n      </>\n    );\n  }\n);\n\nPopover.displayName = \"Popover\";\n\nexport { Popover };\n",
    "css": "",
    "cssTypes": ""
  },
  "progress": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Progress.module.css\";\n\ntype ProgressVariant = \"default\" | \"success\" | \"warning\" | \"error\";\ntype ProgressSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {\n  value?: number;\n  max?: number;\n  variant?: ProgressVariant;\n  size?: ProgressSize;\n  indeterminate?: boolean;\n  label?: string;\n  showValue?: boolean;\n  animated?: boolean;\n}\n\nconst sizeMap = {\n  sm: styles.sm,\n  md: styles.md,\n  lg: styles.lg,\n} as const;\n\nconst variantMap = {\n  default: styles.default,\n  success: styles.success,\n  warning: styles.warning,\n  error: styles.error,\n} as const;\n\nconst Progress = React.forwardRef<HTMLDivElement, ProgressProps>(\n  (\n    {\n      className,\n      value = 0,\n      max = 100,\n      variant = \"default\",\n      size = \"md\",\n      indeterminate = false,\n      label,\n      showValue = false,\n      animated = false,\n      ...props\n    },\n    ref\n  ) => {\n    const clampedValue = Math.min(Math.max(value, 0), max);\n    const percentage = (clampedValue / max) * 100;\n    const hasLabelContent = label || showValue;\n\n    return (\n      <div\n        className={cn(styles.wrapper, hasLabelContent && styles.hasLabel)}\n      >\n        {hasLabelContent && (\n          <div className={styles.labelRow}>\n            {label && (\n              <span className={styles.label}>\n                {label}\n              </span>\n            )}\n            {showValue && !indeterminate && (\n              <span className={styles.value}>{Math.round(percentage)}%</span>\n            )}\n          </div>\n        )}\n        <div\n          ref={ref}\n          role=\"progressbar\"\n          aria-valuenow={indeterminate ? undefined : clampedValue}\n          aria-valuemin={0}\n          aria-valuemax={max}\n          aria-label={label}\n          className={cn(styles.progress, sizeMap[size], className)}\n          data-variant={variant}\n          data-size={size}\n          data-indeterminate={indeterminate || undefined}\n          {...props}\n        >\n          <div\n            className={cn(\n              styles.fill,\n              variantMap[variant],\n              (animated || indeterminate) && styles.animated,\n              indeterminate && styles.indeterminate\n            )}\n            style={indeterminate ? undefined : { width: `${percentage}%` }}\n          />\n        </div>\n      </div>\n    );\n  }\n);\n\nProgress.displayName = \"Progress\";\n\nexport { Progress };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    --track-background: var(--background-700);\n    --fill-background: var(--accent-500);\n\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm {\n    height: 0.25rem;\n  }\n\n  .progress.md {\n    height: 0.5rem;\n  }\n\n  .progress.lg {\n    height: 0.75rem;\n  }\n\n  .fill {\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.default {\n    --fill-background: var(--accent-500);\n  }\n\n  .fill.success {\n    --fill-background: var(--success-500);\n  }\n\n  .fill.warning {\n    --fill-background: var(--warning-500);\n  }\n\n  .fill.error {\n    --fill-background: var(--danger-500);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    width: 100%;\n  }\n\n  .wrapper.hasLabel {\n    @apply space-y-1;\n  }\n\n  .labelRow {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% {\n      transform: translateX(-100%);\n    }\n    100% {\n      transform: translateX(400%);\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  progress: string;\n  sm: string;\n  md: string;\n  lg: string;\n  fill: string;\n  default: string;\n  success: string;\n  warning: string;\n  error: string;\n  animated: string;\n  indeterminate: string;\n  wrapper: string;\n  hasLabel: string;\n  labelRow: string;\n  label: string;\n  value: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "radio": {
    "tsx": "\"use client\";\n\nimport React, { useId, createContext, useContext } from \"react\";\nimport { useRadioGroupState } from \"react-stately\";\nimport {\n  useRadioGroup,\n  useRadio,\n  useFocusRing,\n  mergeProps,\n} from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Radio.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\n// Context for Radio.Group\ninterface RadioGroupContextType {\n  state?: ReturnType<typeof useRadioGroupState>;\n  disabled?: boolean;\n  size?: Size;\n}\n\nconst RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);\n\nconst useRadioGroupContext = () => {\n  const context = useContext(RadioGroupContext);\n  return context;\n};\n\n// Radio.Group Component\nexport interface RadioGroupProps {\n  value?: string;\n  defaultValue?: string;\n  onValueChange?: (value: string) => void;\n  disabled?: boolean;\n  size?: Size;\n  children: React.ReactNode;\n  className?: string;\n  label?: string;\n  description?: string;\n}\n\nconst RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(\n  ({\n    value: controlledValue,\n    defaultValue,\n    onValueChange,\n    disabled = false,\n    size = \"md\",\n    children,\n    className,\n    label,\n    description,\n  }, ref) => {\n    const state = useRadioGroupState({\n      value: controlledValue,\n      defaultValue,\n      onChange: onValueChange,\n      isDisabled: disabled,\n    });\n\n    useRadioGroup(\n      {\n        isDisabled: disabled,\n        label,\n        description,\n      },\n      state\n    );\n\n    return (\n      <RadioGroupContext.Provider\n        value={{ state, disabled, size }}\n      >\n        <div\n          ref={ref}\n          className={className}\n          role=\"group\"\n        >\n          {label && (\n            <label\n              className={cn(\n                styles[\"radio-label\"],\n                disabled && styles[\"radio-label-disabled\"]\n              )}\n            >\n              {label}\n            </label>\n          )}\n          {description && (\n            <p className=\"text-sm text-foreground-500\">\n              {description}\n            </p>\n          )}\n          <div className={styles[\"radio-group\"]}>\n            {children}\n          </div>\n        </div>\n      </RadioGroupContext.Provider>\n    );\n  }\n);\n\nRadioGroup.displayName = \"RadioGroup\";\n\n// Radio.Item Component\nexport interface RadioItemProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\"> {\n  size?: Size;\n  label?: React.ReactNode;\n  description?: React.ReactNode;\n  helperText?: React.ReactNode;\n  helperTextError?: boolean;\n  error?: boolean;\n  value: string;\n}\n\nconst RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(\n  ({\n    className,\n    size: sizeProp,\n    disabled: disabledProp = false,\n    error = false,\n    label,\n    description,\n    helperText,\n    helperTextError = false,\n    value,\n    id,\n    ...props\n  }, ref) => {\n    const radioGroupContext = useRadioGroupContext();\n    const generatedId = useId();\n    const radioId = id || `radio-${generatedId}`;\n\n    if (!radioGroupContext?.state) {\n      throw new Error(\"RadioItem must be used within a Radio.Group\");\n    }\n\n    const { state } = radioGroupContext;\n    const size = sizeProp || radioGroupContext?.size || \"md\";\n    const disabled = disabledProp ?? radioGroupContext?.disabled ?? false;\n    const isSelected = state.selectedValue === value;\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    // Extract aria-label from props if provided, fallback to label if it's a string\n    const ariaLabelFromProps = props[\"aria-label\"];\n    const ariaLabelValue =\n      ariaLabelFromProps ||\n      (typeof label === \"string\" ? label : undefined);\n\n    const { inputProps } = useRadio(\n      {\n        value,\n        isDisabled: disabled,\n        ...(ariaLabelValue && { \"aria-label\": ariaLabelValue }),\n      },\n      state,\n      inputRef\n    );\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    return (\n      <div className=\"w-full\">\n        <div\n          className={styles[\"radio-item\"]}\n          data-disabled={disabled || undefined}\n        >\n          <div className=\"relative\">\n            <div\n              className={cn(\n                styles.radio,\n                styles[size],\n                className\n              )}\n              data-checked={isSelected || undefined}\n              data-disabled={disabled || undefined}\n              data-error={error ? \"true\" : undefined}\n              data-focus-visible={isFocusVisible || undefined}\n              role=\"presentation\"\n            >\n              {isSelected && (\n                <div className={cn(styles[\"radio-dot\"], styles[size])} />\n              )}\n            </div>\n            <input\n              {...mergeProps(inputProps, focusProps)}\n              ref={ref || inputRef}\n              type=\"radio\"\n              id={radioId}\n              className={styles[\"radio-input\"]}\n              suppressHydrationWarning\n              {...props}\n            />\n          </div>\n          {(label || description) && (\n            <div className=\"flex flex-col gap-1\">\n              {label && (\n                <label\n                  htmlFor={radioId}\n                  className={cn(\n                    styles[\"radio-label\"],\n                    disabled && styles[\"radio-label-disabled\"]\n                  )}\n                  suppressHydrationWarning\n                >\n                  {label}\n                </label>\n              )}\n              {description && (\n                <p\n                  className={cn(\n                    styles[\"radio-description\"],\n                    error && styles[\"radio-description-error\"]\n                  )}\n                >\n                  {description}\n                </p>\n              )}\n            </div>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              \"text-xs mt-2 ml-8 transition-colors\",\n              helperTextError ? \"text-danger-600\" : \"text-foreground-500\"\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nRadioItem.displayName = \"RadioItem\";\n\n// Standalone Radio component for backward compatibility\nexport interface RadioProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\"> {\n  size?: Size;\n  label?: React.ReactNode;\n  description?: React.ReactNode;\n  helperText?: React.ReactNode;\n  helperTextError?: boolean;\n  error?: boolean;\n}\n\nconst RadioBase = React.forwardRef<HTMLInputElement, RadioProps>(\n  ({\n    className,\n    size = \"md\",\n    disabled = false,\n    error = false,\n    label,\n    description,\n    helperText,\n    helperTextError = false,\n    checked: checkedProp,\n    defaultChecked,\n    onChange,\n    id,\n    ...props\n  }, ref) => {\n    const [internalChecked, setInternalChecked] = React.useState(checkedProp ?? defaultChecked ?? false);\n    const generatedId = useId();\n\n    const isControlled = checkedProp !== undefined;\n    const checked = isControlled ? checkedProp : internalChecked;\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      if (!isControlled) {\n        setInternalChecked(e.target.checked);\n      }\n      onChange?.(e);\n    };\n\n    const radioId = id || `radio-${generatedId}`;\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    return (\n      <div className=\"w-full\">\n        <div\n          className={styles[\"radio-item\"]}\n          data-disabled={disabled || undefined}\n        >\n          <div className=\"relative\">\n            <div\n              className={cn(\n                styles.radio,\n                styles[size],\n                className\n              )}\n              data-checked={checked || undefined}\n              data-disabled={disabled || undefined}\n              data-error={error ? \"true\" : undefined}\n              data-focus-visible={isFocusVisible || undefined}\n              role=\"presentation\"\n            >\n              {checked && (\n                <div className={cn(styles[\"radio-dot\"], styles[size])} />\n              )}\n            </div>\n            <input\n              {...focusProps}\n              ref={inputRef}\n              type=\"radio\"\n              id={radioId}\n              checked={checked}\n              onChange={handleChange}\n              disabled={disabled ?? false}\n              className={styles[\"radio-input\"]}\n              aria-label={typeof label === \"string\" ? label : undefined}\n              suppressHydrationWarning\n              {...props}\n            />\n          </div>\n          {(label || description) && (\n            <div className=\"flex flex-col gap-1\">\n              {label && (\n                <label\n                  htmlFor={radioId}\n                  className={cn(\n                    styles[\"radio-label\"],\n                    disabled && styles[\"radio-label-disabled\"]\n                  )}\n                  suppressHydrationWarning\n                >\n                  {label}\n                </label>\n              )}\n              {description && (\n                <p\n                  className={cn(\n                    styles[\"radio-description\"],\n                    error && styles[\"radio-description-error\"]\n                  )}\n                >\n                  {description}\n                </p>\n              )}\n            </div>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              \"text-xs mt-2 ml-8 transition-colors\",\n              helperTextError ? \"text-danger-600\" : \"text-foreground-500\"\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nRadioBase.displayName = \"Radio\";\n\n// Compound component\nconst Radio = Object.assign(RadioBase, {\n  Group: RadioGroup,\n  Item: RadioItem,\n});\n\nexport { Radio };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .radio-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .radio-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .radio {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n    --radio-dot-unchecked: transparent;\n    --radio-dot-checked: var(--accent-50);\n    --radio-hover-background: var(--accent-500);\n    --radio-hover-border: var(--background-500);\n    --radio-error-border: var(--danger-500);\n\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1.25rem;\n    height: 1.25rem;\n    cursor: pointer;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: 0.6;\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: rgb(59, 130, 246);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    font-weight: 500;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground, var(--foreground-300));\n    font-size: inherit;\n    line-height: inherit;\n    cursor: pointer;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled, var(--foreground-500));\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper, var(--foreground-500));\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error, var(--danger-500));\n  }\n  /* Size variants */\n  .radio.sm {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n\n  /* Variants */\n  .radio.primary[data-checked=\"true\"] {\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n  }\n\n  .radio.secondary {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline {\n    --radio-background-unchecked: transparent;\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline[data-checked=\"true\"] {\n    --radio-background-unchecked: color-mix(in srgb, var(--accent-500) 15%, transparent);\n    --radio-border-unchecked: var(--accent-500);\n    --radio-dot-unchecked: var(--accent-500);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  \"radio-group\": string;\n  \"radio-item\": string;\n  \"radio-input\": string;\n  radio: string;\n  \"radio-dot\": string;\n  sm: string;\n  md: string;\n  lg: string;\n  \"radio-label\": string;\n  \"radio-label-disabled\": string;\n  \"radio-description\": string;\n  \"radio-description-error\": string;\n};\n\nexport default styles;\n"
  },
  "scroll-area": {
    "tsx": "\"use client\";\n\nimport React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./ScrollArea.module.css\";\n\nexport interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n  maxHeight?: string;\n  maxWidth?: string;\n  direction?: \"vertical\" | \"horizontal\";\n}\n\nconst ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(\n  (\n    {\n      children,\n      className,\n      maxHeight = \"100%\",\n      maxWidth = \"100%\",\n      direction = \"vertical\",\n      ...props\n    },\n    ref\n  ) => {\n    const containerRef = useRef<HTMLDivElement>(null);\n    const internalContentRef = useRef<HTMLDivElement>(null);\n    const contentRef = internalContentRef;\n    const thumbRef = useRef<HTMLDivElement>(null);\n    const childrenRef = useRef(children);\n    const mergedRef = useMergedRef(ref, containerRef);\n\n    const [needsScrollbar, setNeedsScrollbar] = useState(false);\n    const [isHoveredRight, setIsHoveredRight] = useState(false);\n    const [thumbSize, setThumbSize] = useState(0);\n    const [thumbPosition, setThumbPosition] = useState(0);\n    const [isDragging, setIsDragging] = useState(false);\n    const [dragStart, setDragStart] = useState({ origin: 0, scrollOrigin: 0 });\n    const [isScrolling, setIsScrolling] = useState(false);\n    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);\n\n    const updateScrollbar = useCallback(() => {\n      if (!containerRef.current || !contentRef.current) return;\n\n      const container = containerRef.current;\n      const content = contentRef.current;\n\n      if (direction === \"horizontal\") {\n        const containerWidth = container.clientWidth;\n        const contentWidth = content.scrollWidth;\n        const scrollLeft = content.scrollLeft;\n\n        const needs = contentWidth > containerWidth;\n        setNeedsScrollbar(needs);\n\n        if (needs) {\n          const scrollRatio = containerWidth / contentWidth;\n          const newThumbWidth = Math.max(20, containerWidth * scrollRatio);\n          const scrollProgress = scrollLeft / (contentWidth - containerWidth);\n          const maxThumbLeft = containerWidth - newThumbWidth;\n          const newThumbLeft = scrollProgress * maxThumbLeft;\n\n          setThumbSize(newThumbWidth);\n          setThumbPosition(newThumbLeft);\n        }\n      } else {\n        const containerHeight = container.clientHeight;\n        const contentHeight = content.scrollHeight;\n        const scrollTop = content.scrollTop;\n\n        const needs = contentHeight > containerHeight;\n        setNeedsScrollbar(needs);\n\n        if (needs) {\n          const scrollRatio = containerHeight / contentHeight;\n          const newThumbHeight = Math.max(20, containerHeight * scrollRatio);\n          const scrollProgress = scrollTop / (contentHeight - containerHeight);\n          const maxThumbTop = containerHeight - newThumbHeight;\n          const newThumbTop = scrollProgress * maxThumbTop;\n\n          setThumbSize(newThumbHeight);\n          setThumbPosition(newThumbTop);\n        }\n      }\n    }, [contentRef, direction]);\n\n    const handleScroll = useCallback(() => {\n      updateScrollbar();\n      setIsScrolling(true);\n      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);\n      scrollTimeoutRef.current = setTimeout(() => {\n        setIsScrolling(false);\n      }, 1500);\n    }, [updateScrollbar]);\n\n    const handleContainerMouseMove = useCallback(\n      (e: React.MouseEvent<HTMLDivElement>) => {\n        if (!containerRef.current) return;\n\n        const rect = containerRef.current.getBoundingClientRect();\n        let newIsHovered = false;\n\n        if (direction === \"horizontal\") {\n          const mouseY = e.clientY - rect.top;\n          const hoverZone = 20;\n          newIsHovered = mouseY > rect.height - hoverZone;\n        } else {\n          const mouseX = e.clientX - rect.left;\n          const hoverZone = 20;\n          newIsHovered = mouseX > rect.width - hoverZone;\n        }\n\n        if (newIsHovered !== isHoveredRight) {\n          setIsHoveredRight(newIsHovered);\n        }\n      },\n      [isHoveredRight, direction]\n    );\n\n    const handleContainerMouseLeave = useCallback(() => {\n      setIsHoveredRight(false);\n    }, []);\n\n    const handleMouseDown = useCallback(\n      (e: React.MouseEvent) => {\n        if (!contentRef.current) return;\n        e.preventDefault();\n        setIsDragging(true);\n        if (direction === \"horizontal\") {\n          setDragStart({\n            origin: e.clientX,\n            scrollOrigin: contentRef.current.scrollLeft,\n          });\n        } else {\n          setDragStart({\n            origin: e.clientY,\n            scrollOrigin: contentRef.current.scrollTop,\n          });\n        }\n      },\n      [contentRef, direction]\n    );\n\n    const handleMouseMove = useCallback(\n      (e: MouseEvent) => {\n        if (!isDragging || !contentRef.current || !containerRef.current) return;\n\n        const container = containerRef.current;\n        const content = contentRef.current;\n\n        if (direction === \"horizontal\") {\n          const deltaX = e.clientX - dragStart.origin;\n          const containerWidth = container.clientWidth;\n          const contentWidth = content.scrollWidth;\n          const maxScroll = contentWidth - containerWidth;\n          const scrollRatio = maxScroll / (containerWidth - thumbSize);\n          const newScrollLeft = Math.max(\n            0,\n            Math.min(\n              maxScroll,\n              dragStart.scrollOrigin + deltaX * scrollRatio\n            )\n          );\n\n          content.scrollLeft = newScrollLeft;\n        } else {\n          const deltaY = e.clientY - dragStart.origin;\n          const containerHeight = container.clientHeight;\n          const contentHeight = content.scrollHeight;\n          const maxScroll = contentHeight - containerHeight;\n          const scrollRatio = maxScroll / (containerHeight - thumbSize);\n          const newScrollTop = Math.max(\n            0,\n            Math.min(\n              maxScroll,\n              dragStart.scrollOrigin + deltaY * scrollRatio\n            )\n          );\n\n          content.scrollTop = newScrollTop;\n        }\n      },\n      [isDragging, dragStart, thumbSize, contentRef, direction]\n    );\n\n    const handleMouseUp = useCallback(() => {\n      setIsDragging(false);\n    }, []);\n\n    const handleTrackClick = useCallback(\n      (e: React.MouseEvent) => {\n        if (\n          !containerRef.current ||\n          !contentRef.current ||\n          !thumbRef.current\n        )\n          return;\n\n        const container = containerRef.current;\n        const content = contentRef.current;\n        const rect = container.getBoundingClientRect();\n        const thumbRect = thumbRef.current.getBoundingClientRect();\n\n        if (direction === \"horizontal\") {\n          const clickX = e.clientX - rect.left;\n          const relativeThumbLeft = thumbRect.left - rect.left;\n          const relativeThumbRight = thumbRect.right - rect.left;\n\n          if (clickX >= relativeThumbLeft && clickX <= relativeThumbRight)\n            return;\n\n          const containerWidth = container.clientWidth;\n          const contentWidth = content.scrollWidth;\n          const maxScroll = contentWidth - containerWidth;\n\n          const newThumbWidth = Math.max(\n            20,\n            containerWidth * (containerWidth / contentWidth)\n          );\n          const targetThumbCenter = clickX;\n          const targetThumbLeft = targetThumbCenter - newThumbWidth / 2;\n          const maxThumbLeft = containerWidth - newThumbWidth;\n          const clampedThumbLeft = Math.max(\n            0,\n            Math.min(maxThumbLeft, targetThumbLeft)\n          );\n\n          const scrollProgress = clampedThumbLeft / maxThumbLeft;\n          const targetScrollLeft = scrollProgress * maxScroll;\n\n          content.scrollLeft = Math.max(\n            0,\n            Math.min(maxScroll, targetScrollLeft)\n          );\n\n          setIsDragging(true);\n          setDragStart({\n            origin: e.clientX,\n            scrollOrigin: content.scrollLeft,\n          });\n        } else {\n          const clickY = e.clientY - rect.top;\n          const relativeThumbTop = thumbRect.top - rect.top;\n          const relativeThumbBottom = thumbRect.bottom - rect.top;\n\n          if (clickY >= relativeThumbTop && clickY <= relativeThumbBottom)\n            return;\n\n          const containerHeight = container.clientHeight;\n          const contentHeight = content.scrollHeight;\n          const maxScroll = contentHeight - containerHeight;\n\n          const newThumbHeight = Math.max(\n            20,\n            containerHeight * (containerHeight / contentHeight)\n          );\n          const targetThumbCenter = clickY;\n          const targetThumbTop = targetThumbCenter - newThumbHeight / 2;\n          const maxThumbTop = containerHeight - newThumbHeight;\n          const clampedThumbTop = Math.max(\n            0,\n            Math.min(maxThumbTop, targetThumbTop)\n          );\n\n          const scrollProgress = clampedThumbTop / maxThumbTop;\n          const targetScrollTop = scrollProgress * maxScroll;\n\n          content.scrollTop = Math.max(\n            0,\n            Math.min(maxScroll, targetScrollTop)\n          );\n\n          setIsDragging(true);\n          setDragStart({\n            origin: e.clientY,\n            scrollOrigin: content.scrollTop,\n          });\n        }\n      },\n      [contentRef, direction]\n    );\n\n    const handleWheel = useCallback(\n      (e: React.WheelEvent) => {\n        if (!contentRef.current) return;\n        if (direction !== \"horizontal\") return;\n\n        e.preventDefault();\n        const scrollAmount = e.deltaY || e.deltaX;\n        const content = contentRef.current;\n        const containerWidth = content.clientWidth;\n        const contentWidth = content.scrollWidth;\n        const maxScroll = contentWidth - containerWidth;\n\n        const newScrollLeft = Math.max(\n          0,\n          Math.min(maxScroll, content.scrollLeft + scrollAmount)\n        );\n        content.scrollLeft = newScrollLeft;\n      },\n      [contentRef, direction]\n    );\n\n    useLayoutEffect(() => {\n      updateScrollbar();\n\n      const resizeObserver = new ResizeObserver(() => {\n        requestAnimationFrame(updateScrollbar);\n      });\n\n      const mutationObserver = new MutationObserver(() => {\n        requestAnimationFrame(updateScrollbar);\n      });\n\n      if (containerRef.current) {\n        resizeObserver.observe(containerRef.current);\n      }\n\n      if (contentRef.current) {\n        resizeObserver.observe(contentRef.current);\n        mutationObserver.observe(contentRef.current, {\n          childList: true,\n          subtree: true,\n        });\n      }\n\n      return () => {\n        resizeObserver.disconnect();\n        mutationObserver.disconnect();\n      };\n    }, [updateScrollbar, contentRef]);\n\n    useEffect(() => {\n      if (childrenRef.current !== children) {\n        childrenRef.current = children;\n        const timeoutId = setTimeout(() => {\n          updateScrollbar();\n        }, 0);\n        return () => clearTimeout(timeoutId);\n      }\n    }, [children, updateScrollbar]);\n\n    useEffect(() => {\n      if (isDragging) {\n        document.addEventListener(\"mousemove\", handleMouseMove);\n        document.addEventListener(\"mouseup\", handleMouseUp);\n        document.body.style.userSelect = \"none\";\n        return () => {\n          document.removeEventListener(\"mousemove\", handleMouseMove);\n          document.removeEventListener(\"mouseup\", handleMouseUp);\n          document.body.style.userSelect = \"\";\n        };\n      }\n    }, [isDragging, handleMouseMove, handleMouseUp]);\n\n    useEffect(() => {\n      return () => {\n        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);\n      };\n    }, []);\n\n    const showOpacity = needsScrollbar && (isHoveredRight || isDragging || isScrolling) ? 1 : 0;\n\n    if (direction === \"horizontal\") {\n      const { style: propsStyle, ...restProps } = props;\n      return (\n        <div\n          ref={mergedRef}\n          className={cn(styles.root, styles.horizontal, className)}\n          style={{\n            maxWidth,\n            ...propsStyle,\n          }}\n          onMouseMove={handleContainerMouseMove}\n          onMouseLeave={handleContainerMouseLeave}\n          data-dragging={isDragging ? \"true\" : \"false\"}\n          {...restProps}\n        >\n          <div\n            ref={contentRef}\n            className={styles.content}\n            onScroll={handleScroll}\n            onWheel={handleWheel}\n            style={{\n              maxWidth: \"inherit\",\n            }}\n          >\n            {children}\n          </div>\n\n          <div\n            className={styles.track}\n            style={{\n              opacity: showOpacity,\n              pointerEvents: needsScrollbar ? \"auto\" : \"none\",\n            }}\n            onMouseDown={handleTrackClick}\n          >\n            {needsScrollbar && (\n              <div\n                ref={thumbRef}\n                className={styles.thumb}\n                style={{\n                  width: `${thumbSize}px`,\n                  left: `${thumbPosition}px`,\n                }}\n                onMouseDown={handleMouseDown}\n              />\n            )}\n          </div>\n        </div>\n      );\n    }\n\n    const { style: propsStyle, ...restProps } = props;\n    return (\n      <div\n        ref={mergedRef}\n        className={cn(styles.root, styles.vertical, className)}\n        style={{\n          maxHeight,\n          ...propsStyle,\n        }}\n        onMouseMove={handleContainerMouseMove}\n        onMouseLeave={handleContainerMouseLeave}\n        data-dragging={isDragging ? \"true\" : \"false\"}\n        {...restProps}\n      >\n        <div\n          ref={contentRef}\n          className={styles.content}\n          onScroll={handleScroll}\n          style={{\n            maxHeight: \"inherit\",\n          }}\n        >\n          {children}\n        </div>\n\n        <div\n          className={styles.track}\n          style={{\n            opacity: showOpacity,\n            pointerEvents: needsScrollbar ? \"auto\" : \"none\",\n          }}\n          onMouseDown={handleTrackClick}\n        >\n          {needsScrollbar && (\n            <div\n              ref={thumbRef}\n              className={styles.thumb}\n              style={{\n                height: `${thumbSize}px`,\n                top: `${thumbPosition}px`,\n              }}\n              onMouseDown={handleMouseDown}\n            />\n          )}\n        </div>\n      </div>\n    );\n  }\n);\n\nScrollArea.displayName = \"ScrollArea\";\n\nfunction useMergedRef<T>(\n  ...refs: (React.Ref<T> | undefined)[]\n): React.RefCallback<T> {\n  return (value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\")\n        (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nexport { ScrollArea };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    position: relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n  }\n\n  .horizontal {\n    --scrollbar-height: 12px;\n  }\n\n  .content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-right: 12px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 12px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .track {\n    position: absolute;\n    z-index: 10;\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 0;\n    top: 0;\n    width: 12px;\n    height: 100%;\n    background-color: transparent;\n  }\n\n  .horizontal .track {\n    bottom: 0;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: transparent;\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: var(--radius-md);\n    background-color: var(--background-700);\n    transition-property: background-color;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover {\n    background-color: var(--background-600);\n  }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--background-600);\n  }\n\n  .vertical .thumb {\n    width: 8px;\n    margin-left: 2px;\n  }\n\n  .horizontal .thumb {\n    height: 8px;\n    margin-top: 2px;\n  }\n}\n",
    "cssTypes": "export const root: string;\nexport const vertical: string;\nexport const horizontal: string;\nexport const content: string;\nexport const track: string;\nexport const thumb: string;\n"
  },
  "select": {
    "tsx": "import * as React from \"react\"\nimport { useButton, useFocusRing, useHover, mergeProps, useFilter, type Key } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport styles from \"./Select.module.css\"\n\nexport interface SelectItemData {\n  key: Key\n  textValue: string\n  isDisabled?: boolean\n}\n\nexport type SelectTriggerMode = \"click\" | \"hover\"\n\nexport interface SelectContextValue {\n  isOpen: boolean\n  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>\n  selectedKey: Key | null\n  selectedTextValue: string\n  onSelect: (key: Key) => void\n  triggerRef: React.MutableRefObject<HTMLElement | null>\n  triggerProps: any\n  isFocusVisible: boolean\n  isPressed: boolean\n  isHovered: boolean\n  isDisabled: boolean\n  items: SelectItemData[]\n  registerItem: (key: Key, textValue: string, isDisabled?: boolean) => void\n  unregisterItem: (key: Key) => void\n  searchValue: string\n  setSearchValue: React.Dispatch<React.SetStateAction<string>>\n  filteredItems: SelectItemData[]\n  visibleKeys: Set<Key>\n  focusedKey: Key | null\n  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>\n  navigateToNextItem: () => void\n  navigateToPrevItem: () => void\n  selectFocusedItem: () => void\n  maxItems: number\n  triggerMode: SelectTriggerMode\n  handleHoverIntent: (isHovering: boolean) => void\n}\n\nconst SelectContext = React.createContext<SelectContextValue | null>(null)\n\nexport function useSelectContext() {\n  const context = React.useContext(SelectContext)\n  if (!context) {\n    throw new Error(\"Select component must be used within Select root\")\n  }\n  return context\n}\n\nexport interface SelectProps<T> extends React.PropsWithChildren {\n  items?: Array<T>\n  selectedKey?: Key | null\n  defaultSelectedKey?: Key | null\n  defaultValue?: string | null\n  onSelectionChange?: (key: Key | null) => void\n  isDisabled?: boolean\n  autoFocus?: boolean\n  maxItems?: number\n  className?: string\n  trigger?: SelectTriggerMode\n}\n\nconst Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(\n  (\n    {\n      items: propItems = [],\n      selectedKey: controlledSelectedKey,\n      defaultSelectedKey,\n      defaultValue,\n      onSelectionChange,\n      isDisabled = false,\n      autoFocus = false,\n      maxItems = 6,\n      children,\n      className,\n      trigger: triggerMode = \"click\",\n    },\n    ref\n  ) => {\n    const triggerRef = React.useRef<HTMLElement>(null)\n    const [isOpen, setIsOpen] = React.useState(false)\n    const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)\n\n    // Handle hover intent for trigger=\"hover\" mode\n    // Uses a timeout to allow mouse to move between trigger and content\n    const handleHoverIntent = React.useCallback((isHovering: boolean) => {\n      if (triggerMode !== \"hover\" || isDisabled) return\n\n      if (hoverTimeoutRef.current) {\n        clearTimeout(hoverTimeoutRef.current)\n        hoverTimeoutRef.current = null\n      }\n\n      if (isHovering) {\n        setIsOpen(true)\n      } else {\n        hoverTimeoutRef.current = setTimeout(() => {\n          setIsOpen(false)\n        }, 100)\n      }\n    }, [triggerMode, isDisabled])\n\n    React.useEffect(() => {\n      return () => {\n        if (hoverTimeoutRef.current) {\n          clearTimeout(hoverTimeoutRef.current)\n        }\n      }\n    }, [])\n    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState<Key | null>(\n      defaultSelectedKey ?? null\n    )\n    const [searchValue, setSearchValue] = React.useState(\"\")\n    const [focusedKey, setFocusedKey] = React.useState<Key | null>(null)\n    const [selectedTextValue, setSelectedTextValue] = React.useState(defaultValue ?? \"\")\n    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey\n    const registeredItemsRef = React.useRef<Map<Key, SelectItemData>>(new Map())\n    const [registeredItems, setRegisteredItems] = React.useState<SelectItemData[]>([])\n\n    // Use React Aria's useFilter for locale-aware filtering\n    const { contains } = useFilter({ sensitivity: 'base' })\n\n    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean) => {\n      registeredItemsRef.current.set(key, { key, textValue, isDisabled })\n      setRegisteredItems(Array.from(registeredItemsRef.current.values()))\n    }, [])\n\n    const unregisterItem = React.useCallback((key: Key) => {\n      registeredItemsRef.current.delete(key)\n      setRegisteredItems(Array.from(registeredItemsRef.current.values()))\n    }, [])\n\n    const items = propItems.length > 0 ? propItems : registeredItems\n\n    // Filter items using React Aria's useFilter for locale-aware matching\n    const filteredItems = React.useMemo(() => {\n      if (!searchValue.trim()) return items\n      return items.filter(item => contains(item.textValue, searchValue))\n    }, [items, searchValue, contains])\n\n    // Create a Set of visible keys for O(1) lookup\n    const visibleKeys = React.useMemo(() => {\n      return new Set(filteredItems.map(item => item.key))\n    }, [filteredItems])\n\n    // Get enabled (navigable) items from filtered items\n    const enabledFilteredItems = React.useMemo(() => {\n      return filteredItems.filter(item => !item.isDisabled)\n    }, [filteredItems])\n\n    const onSelect = React.useCallback((key: Key) => {\n      const item = items.find(i => i.key === key)\n      if (item) {\n        setSelectedTextValue(item.textValue)\n      }\n      if (controlledSelectedKey === undefined) {\n        setUncontrolledSelectedKey(key)\n      }\n      onSelectionChange?.(key)\n      setIsOpen(false)\n      setSearchValue(\"\")\n    }, [controlledSelectedKey, onSelectionChange, items])\n\n    // Navigate to next enabled item\n    const navigateToNextItem = React.useCallback(() => {\n      if (enabledFilteredItems.length === 0) return\n\n      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : -1\n      const nextIndex = currentIndex < enabledFilteredItems.length - 1 ? currentIndex + 1 : 0\n\n      setFocusedKey(enabledFilteredItems[nextIndex].key)\n    }, [enabledFilteredItems, focusedKey])\n\n    // Navigate to previous enabled item\n    const navigateToPrevItem = React.useCallback(() => {\n      if (enabledFilteredItems.length === 0) return\n\n      const currentIndex = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : 0\n      const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledFilteredItems.length - 1\n\n      setFocusedKey(enabledFilteredItems[prevIndex].key)\n    }, [enabledFilteredItems, focusedKey])\n\n    // Select the currently focused item\n    const selectFocusedItem = React.useCallback(() => {\n      if (focusedKey !== null) {\n        const item = enabledFilteredItems.find(item => item.key === focusedKey)\n        if (item && !item.isDisabled) {\n          onSelect(focusedKey)\n        }\n      }\n    }, [focusedKey, enabledFilteredItems, onSelect])\n\n    // Reset focused key when dropdown opens or filter changes\n    React.useEffect(() => {\n      if (isOpen) {\n        // Try to focus selected item, or first enabled item\n        if (selectedKey !== null && visibleKeys.has(selectedKey)) {\n          const selectedItem = filteredItems.find(item => item.key === selectedKey)\n          if (selectedItem && !selectedItem.isDisabled) {\n            setFocusedKey(selectedKey)\n            return\n          }\n        }\n        // Fall back to first enabled item\n        if (enabledFilteredItems.length > 0) {\n          setFocusedKey(enabledFilteredItems[0].key)\n        } else {\n          setFocusedKey(null)\n        }\n      }\n    }, [isOpen, selectedKey, visibleKeys, enabledFilteredItems, filteredItems])\n\n    // Update focused key when filter changes to ensure it's still visible\n    React.useEffect(() => {\n      if (focusedKey !== null && !visibleKeys.has(focusedKey)) {\n        // Current focused key is no longer visible, reset to first enabled item\n        if (enabledFilteredItems.length > 0) {\n          setFocusedKey(enabledFilteredItems[0].key)\n        } else {\n          setFocusedKey(null)\n        }\n      }\n    }, [visibleKeys, enabledFilteredItems, focusedKey])\n\n    const { buttonProps, isPressed } = useButton({\n      isDisabled,\n      onPress: () => !isDisabled && setIsOpen(prev => !prev),\n    }, triggerRef)\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered } = useHover({ isDisabled })\n\n    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {\n      'aria-haspopup': 'listbox' as const,\n      'aria-expanded': isOpen,\n    })\n\n    React.useEffect(() => {\n      if (autoFocus && triggerRef.current) {\n        triggerRef.current.focus({ preventScroll: true })\n      }\n    }, [autoFocus])\n\n    // Clear search when dropdown closes\n    React.useEffect(() => {\n      if (!isOpen) {\n        setSearchValue(\"\")\n      }\n    }, [isOpen])\n\n    // Sync selectedTextValue with selectedKey\n    React.useEffect(() => {\n      if (selectedKey === null) {\n        setSelectedTextValue(\"\")\n      } else {\n        const selectedItem = items.find(item => item.key === selectedKey)\n        if (selectedItem) {\n          setSelectedTextValue(selectedItem.textValue)\n        }\n      }\n    }, [selectedKey, items])\n\n    return (\n      <SelectContext.Provider\n        value={{\n          isOpen,\n          setIsOpen,\n          selectedKey,\n          selectedTextValue,\n          onSelect,\n          triggerRef,\n          triggerProps,\n          isFocusVisible,\n          isPressed,\n          isHovered,\n          isDisabled,\n          items,\n          registerItem,\n          unregisterItem,\n          searchValue,\n          setSearchValue,\n          filteredItems,\n          visibleKeys,\n          focusedKey,\n          setFocusedKey,\n          navigateToNextItem,\n          navigateToPrevItem,\n          selectFocusedItem,\n          maxItems,\n          triggerMode,\n          handleHoverIntent,\n        }}\n      >\n        <div ref={ref} className={cn(styles.select, className)}>\n          {children}\n        </div>\n      </SelectContext.Provider>\n    )\n  }\n)\nSelect.displayName = \"Select\"\n\ninterface SelectListBoxProps extends React.PropsWithChildren {\n  className?: string\n}\n\nconst SelectListBox = React.forwardRef<HTMLUListElement, SelectListBoxProps>(\n  ({ children, className }, forwardedRef) => {\n    const {\n      setIsOpen,\n      isOpen,\n      focusedKey,\n      navigateToNextItem,\n      navigateToPrevItem,\n      selectFocusedItem,\n      filteredItems,\n      setFocusedKey,\n    } = useSelectContext()\n    const listBoxRef = React.useRef<HTMLUListElement>(null)\n\n    const mergedRef = React.useCallback(\n      (el: HTMLUListElement | null) => {\n        (listBoxRef as React.MutableRefObject<HTMLUListElement | null>).current = el\n        if (typeof forwardedRef === \"function\") forwardedRef(el)\n        else if (forwardedRef) forwardedRef.current = el\n      },\n      [forwardedRef]\n    )\n\n    const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {\n      if (!isOpen) return\n      switch (e.key) {\n        case 'ArrowDown':\n          e.preventDefault()\n          navigateToNextItem()\n          break\n        case 'ArrowUp':\n          e.preventDefault()\n          navigateToPrevItem()\n          break\n        case 'Home':\n          e.preventDefault()\n          if (filteredItems.length > 0) {\n            const firstEnabled = filteredItems.find(item => !item.isDisabled)\n            if (firstEnabled) setFocusedKey(firstEnabled.key)\n          }\n          break\n        case 'End':\n          e.preventDefault()\n          if (filteredItems.length > 0) {\n            const lastEnabled = [...filteredItems].reverse().find(item => !item.isDisabled)\n            if (lastEnabled) setFocusedKey(lastEnabled.key)\n          }\n          break\n        case 'Enter':\n          e.preventDefault()\n          selectFocusedItem()\n          break\n        case ' ':\n          if (document.activeElement?.tagName !== 'INPUT') {\n            e.preventDefault()\n            selectFocusedItem()\n          }\n          break\n        case 'Escape':\n          e.preventDefault()\n          setIsOpen(false)\n          break\n      }\n    }, [isOpen, navigateToNextItem, navigateToPrevItem, selectFocusedItem, setIsOpen, filteredItems, setFocusedKey])\n\n    React.useEffect(() => {\n      if (isOpen) {\n        if (document.activeElement?.tagName !== 'INPUT') {\n          requestAnimationFrame(() => {\n            listBoxRef.current?.focus({ preventScroll: true })\n          })\n        }\n      }\n    }, [isOpen])\n\n    return (\n      <ul\n        ref={mergedRef}\n        role=\"listbox\"\n        tabIndex={isOpen ? 0 : -1}\n        className={className}\n        onKeyDown={handleKeyDown}\n        style={{ outline: 'none' }}\n      >\n        {React.Children.map(children, (child) => {\n          if (React.isValidElement(child)) {\n            // Pass focusedKey to children so they can check if they're focused\n            return React.cloneElement(child as React.ReactElement<any>, { _focusedKey: focusedKey })\n          }\n          return child\n        })}\n      </ul>\n    )\n  }\n)\nSelectListBox.displayName = \"SelectListBox\"\n\nexport { Select, SelectListBox, SelectContext }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    position: relative;\n    display: inline-block;\n    width: 100%;\n  }\n\n  .trigger {\n    --background: var(--background-800);\n    --foreground: var(--foreground-50);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-700);\n    --background-active: var(--background-600);\n    --border-active: var(--background-600);\n\n    @apply flex h-9 px-3 py-2;\n    display: inline-flex;\n    align-items: center;\n    justify-content: space-between;\n    font-size: var(--text-sm);\n    width: 100%;\n    background-color: color-mix(in srgb, var(--background-800) 50%, transparent);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    cursor: pointer;\n    user-select: none;\n    transition: transform 150ms var(--ease-snappy-pop);\n\n    &[aria-expanded=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 80%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        border-color: var(--border-hover);\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: color-mix(in srgb, var(--background-600) 50%, transparent);\n      border-color: var(--border-active)\n    }\n\n    & > span {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      flex: 1;\n    }\n  }\n\n  .icon {\n    flex-shrink: 0;\n    width: 0.625rem;\n    height: 0.625rem;\n    margin-left: 0.5rem;\n    opacity: 0.7;\n  }\n\n  .value {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    overflow: hidden;\n  }\n\n  .valueIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-50);\n  }\n\n  .valueText {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .content {\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    border-radius: var(--radius-md);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n    box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);\n\n    &[data-state=\"open\"][data-placement=\"bottom\"] {\n      animation: slideInFromTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"open\"][data-placement=\"top\"] {\n      animation: slideInFromBottom 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"bottom\"] {\n      animation: slideOutToTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"top\"] {\n      animation: slideOutToBottom 0.15s var(--ease-snappy-pop);\n    }\n  }\n\n  .viewport {\n    padding: 0.25rem;\n    max-height: 24rem;\n    overflow-y: auto;\n    overflow-x: hidden;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    border-radius: var(--radius-md);\n    padding: 0.375rem 0.5rem;\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-50);\n\n    &[data-selected=\"true\"] {\n      background-color: var(--background-700);\n      color: var(--foreground-50);\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &[data-focus-visible] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-hovered] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .itemIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-50);\n  }\n\n  .itemIndicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-500);\n    margin-left: auto;\n  }\n\n  .itemText {\n    flex: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .scrollButton {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 0.25rem;\n    cursor: default;\n    color: var(--foreground-50);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideInFromBottom {\n    from {\n      opacity: 0;\n      translate: 0 2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n\n  @keyframes slideOutToBottom {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 2px;\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  select: string;\n  trigger: string;\n  icon: string;\n  value: string;\n  valueIcon: string;\n  valueText: string;\n  content: string;\n  viewport: string;\n  item: string;\n  itemIcon: string;\n  itemIndicator: string;\n  itemText: string;\n  separator: string;\n  scrollButton: string;\n};\n\nexport default styles;\n"
  },
  "slider": {
    "tsx": "\"use client\"\n\nimport * as React from 'react';\nimport { useFocusRing } from 'react-aria';\nimport { cn } from \"./utils\";\nimport styles from \"./Slider.module.css\";\n\ntype SliderSize = 'sm' | 'md' | 'lg';\n\ninterface SliderRootProps {\n  size?: SliderSize;\n  disabled?: boolean;\n  className?: string;\n  style?: React.CSSProperties;\n  min?: number;\n  max?: number;\n  step?: number;\n  defaultValue?: number | number[];\n  value?: number | number[];\n  onValueChange?: (value: number[]) => void;\n  orientation?: 'horizontal' | 'vertical';\n  'aria-label'?: string;\n  'aria-labelledby'?: string;\n}\n\nconst SliderContext = React.createContext<{\n  size: SliderSize;\n  disabled?: boolean;\n} | null>(null);\n\nfunction clamp(value: number, min: number, max: number): number {\n  return Math.min(Math.max(value, min), max);\n}\n\nfunction snapToStep(value: number, min: number, max: number, step: number): number {\n  const snapped = Math.round((value - min) / step) * step + min;\n  return clamp(snapped, min, max);\n}\n\ninterface ThumbProps {\n  index: number;\n  value: number;\n  min: number;\n  max: number;\n  step: number;\n  disabled?: boolean;\n  trackRef: React.RefObject<HTMLDivElement | null>;\n  onValueChange: (index: number, value: number) => void;\n  'aria-label'?: string;\n  'aria-labelledby'?: string;\n}\n\nfunction SliderThumbInternal({\n  index,\n  value,\n  min,\n  max,\n  step,\n  disabled,\n  trackRef,\n  onValueChange,\n  'aria-label': ariaLabel,\n  'aria-labelledby': ariaLabelledBy,\n}: ThumbProps) {\n  const thumbRef = React.useRef<HTMLDivElement>(null);\n  const [isDragging, setIsDragging] = React.useState(false);\n  const { focusProps, isFocusVisible } = useFocusRing();\n\n  const percent = ((value - min) / (max - min)) * 100;\n\n  const getValueFromPointer = React.useCallback((clientX: number) => {\n    const track = trackRef.current;\n    if (!track) return value;\n\n    const rect = track.getBoundingClientRect();\n    const percent = clamp((clientX - rect.left) / rect.width, 0, 1);\n    const rawValue = percent * (max - min) + min;\n    return snapToStep(rawValue, min, max, step);\n  }, [trackRef, min, max, step, value]);\n\n  const handlePointerDown = (e: React.PointerEvent) => {\n    if (disabled) return;\n    e.preventDefault();\n    setIsDragging(true);\n    thumbRef.current?.setPointerCapture(e.pointerId);\n    thumbRef.current?.focus();\n  };\n\n  const handlePointerMove = (e: React.PointerEvent) => {\n    if (!isDragging || disabled) return;\n    const newValue = getValueFromPointer(e.clientX);\n    if (newValue !== value) {\n      onValueChange(index, newValue);\n    }\n  };\n\n  const handlePointerUp = (e: React.PointerEvent) => {\n    if (isDragging) {\n      setIsDragging(false);\n      thumbRef.current?.releasePointerCapture(e.pointerId);\n    }\n  };\n\n  const handleKeyDown = (e: React.KeyboardEvent) => {\n    if (disabled) return;\n\n    let newValue = value;\n    const largeStep = step * 10;\n\n    switch (e.key) {\n      case 'ArrowRight':\n      case 'ArrowUp':\n        newValue = clamp(value + step, min, max);\n        break;\n      case 'ArrowLeft':\n      case 'ArrowDown':\n        newValue = clamp(value - step, min, max);\n        break;\n      case 'PageUp':\n        newValue = clamp(value + largeStep, min, max);\n        break;\n      case 'PageDown':\n        newValue = clamp(value - largeStep, min, max);\n        break;\n      case 'Home':\n        newValue = min;\n        break;\n      case 'End':\n        newValue = max;\n        break;\n      default:\n        return;\n    }\n\n    e.preventDefault();\n    if (newValue !== value) {\n      onValueChange(index, newValue);\n    }\n  };\n\n  return (\n    <div\n      ref={thumbRef}\n      role=\"slider\"\n      tabIndex={disabled ? -1 : 0}\n      aria-valuemin={min}\n      aria-valuemax={max}\n      aria-valuenow={value}\n      aria-disabled={disabled || undefined}\n      aria-label={ariaLabel}\n      aria-labelledby={ariaLabelledBy}\n      className={cn('slider thumb', styles.thumb)}\n      style={{ left: `${percent}%` }}\n      data-dragging={isDragging || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n      onPointerDown={handlePointerDown}\n      onPointerMove={handlePointerMove}\n      onPointerUp={handlePointerUp}\n      onPointerCancel={handlePointerUp}\n      onKeyDown={handleKeyDown}\n      {...focusProps}\n    />\n  );\n}\n\nconst Root = React.forwardRef<HTMLDivElement, SliderRootProps>(\n  (\n    {\n      className,\n      size = 'md',\n      disabled,\n      style,\n      defaultValue,\n      value: controlledValue,\n      onValueChange,\n      min = 0,\n      max = 100,\n      step = 1,\n      orientation = 'horizontal',\n      'aria-label': ariaLabel,\n      'aria-labelledby': ariaLabelledBy,\n      ...props\n    },\n    ref\n  ) => {\n    const trackRef = React.useRef<HTMLDivElement>(null);\n\n    // Normalize to arrays\n    const normalizeValue = (v: number | number[] | undefined): number[] | undefined => {\n      if (v === undefined) return undefined;\n      return Array.isArray(v) ? v : [v];\n    };\n\n    const [internalValues, setInternalValues] = React.useState<number[]>(() => {\n      return normalizeValue(defaultValue) ?? normalizeValue(controlledValue) ?? [min];\n    });\n\n    const isControlled = controlledValue !== undefined;\n    const values = isControlled ? normalizeValue(controlledValue)! : internalValues;\n\n    const handleValueChange = React.useCallback((index: number, newValue: number) => {\n      const newValues = [...values];\n      newValues[index] = newValue;\n\n      if (!isControlled) {\n        setInternalValues(newValues);\n      }\n      onValueChange?.(newValues);\n    }, [values, isControlled, onValueChange]);\n\n    const handleTrackClick = (e: React.PointerEvent) => {\n      if (disabled) return;\n      // Only handle clicks directly on the track, not on thumbs\n      if (e.target !== trackRef.current) return;\n\n      const track = trackRef.current;\n      if (!track) return;\n\n      const rect = track.getBoundingClientRect();\n      const percent = clamp((e.clientX - rect.left) / rect.width, 0, 1);\n      const rawValue = percent * (max - min) + min;\n      const newValue = snapToStep(rawValue, min, max, step);\n\n      // Find the closest thumb and update it\n      let closestIndex = 0;\n      let closestDistance = Math.abs(values[0] - newValue);\n      for (let i = 1; i < values.length; i++) {\n        const distance = Math.abs(values[i] - newValue);\n        if (distance < closestDistance) {\n          closestDistance = distance;\n          closestIndex = i;\n        }\n      }\n\n      handleValueChange(closestIndex, newValue);\n    };\n\n    return (\n      <SliderContext.Provider value={{ size, disabled }}>\n        <div\n          ref={ref}\n          data-size={size}\n          data-disabled={disabled || undefined}\n          data-orientation={orientation}\n          style={style}\n          className={cn('slider', styles.slider, className)}\n          {...props}\n        >\n          <div\n            ref={trackRef}\n            className={cn('slider track', styles.track)}\n            onPointerDown={handleTrackClick}\n          >\n            <div\n              className={cn('slider range', styles.range)}\n              style={{\n                left: `${values.length === 1 ? 0 : ((values[0] - min) / (max - min)) * 100}%`,\n                right: `${values.length === 1 ? 100 - ((values[0] - min) / (max - min)) * 100 : 100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,\n              }}\n            />\n            {values.map((value, index) => (\n              <SliderThumbInternal\n                key={index}\n                index={index}\n                value={value}\n                min={min}\n                max={max}\n                step={step}\n                disabled={disabled}\n                trackRef={trackRef}\n                onValueChange={handleValueChange}\n                aria-label={ariaLabel}\n                aria-labelledby={ariaLabelledBy}\n              />\n            ))}\n          </div>\n        </div>\n      </SliderContext.Provider>\n    );\n  }\n);\nRoot.displayName = 'SliderRoot';\n\nexport { Root };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] {\n    @apply h-6;\n  }\n\n  .slider[data-size=\"md\"] {\n    @apply h-8;\n  }\n\n  .slider[data-size=\"lg\"] {\n    @apply h-10;\n  }\n\n  .slider[data-disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n    --background: var(--background-600);\n    --background-disabled: var(--background-500);\n\n    position: relative;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: 9999px;\n    background-color: var(--background);\n    display: flex;\n    align-items: center;\n  }\n\n  .slider[data-disabled] .track {\n    background-color: var(--background-disabled);\n  }\n\n  .slider[data-size=\"sm\"] .track {\n    height: var(--track-height-sm);\n  }\n\n  .slider[data-size=\"md\"] .track {\n    height: var(--track-height-md);\n  }\n\n  .slider[data-size=\"lg\"] .track {\n    height: var(--track-height-lg);\n  }\n\n  .range {\n    --background: var(--accent-500);\n    --background-disabled: var(--background-600);\n\n    position: absolute;\n    height: 100%;\n    background-color: var(--background);\n    transition: background-color 200ms var(--ease-snappy-pop);\n  }\n\n  .slider[data-disabled] .range {\n    background-color: var(--background-disabled);\n  }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n    --background: var(--accent-500);\n    --background-focus: var(--accent-400);\n\n    display: block;\n    background-color: var(--background);\n    border-radius: 9999px;\n    cursor: grab;\n    outline: none;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--background-focus);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly slider: string;\n  readonly track: string;\n  readonly range: string;\n  readonly thumb: string;\n};\n\nexport default styles;\n"
  },
  "switch": {
    "tsx": "\"use client\";\n\nimport React from \"react\";\nimport { useSwitch, useFocusRing, useHover, mergeProps } from \"react-aria\";\nimport { useToggleState } from \"react-stately\";\nimport { cn } from \"./utils\";\n\nimport styles from \"./Switch.module.css\";\n\nconst sizeMap = {\n  sm: styles[\"sm\"],\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n};\n\nconst shapeMap = {\n  pill: styles[\"pill\"],\n  round: styles[\"round\"],\n};\n\nconst thumbPositions = {\n  sm: { unchecked: 0.25, checked: 1.25 },\n  md: { unchecked: 0.25, checked: 1.5 },\n  lg: { unchecked: 0.25, checked: 1.75 },\n};\n\nexport interface SwitchProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\" | \"onChange\" | \"checked\" | \"defaultChecked\"> {\n  isSelected?: boolean;\n  onChange?: (isSelected: boolean) => void;\n  defaultSelected?: boolean;\n  size?: \"sm\" | \"md\" | \"lg\";\n  pill?: boolean;\n  isDisabled?: boolean;\n}\n\nconst Switch = React.forwardRef<HTMLInputElement, SwitchProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      isDisabled = false,\n      isSelected: controlledSelected,\n      onChange,\n      defaultSelected,\n      pill,\n      ...props\n    },\n    ref\n  ) => {\n    const state = useToggleState({\n      isSelected: controlledSelected,\n      defaultSelected: defaultSelected ?? false,\n      onChange,\n    });\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    // Extract aria-label from props if provided\n    const { \"aria-label\": ariaLabel, \"aria-labelledby\": ariaLabelledby, ...otherProps } = props;\n\n    const { inputProps, isSelected } = useSwitch(\n      {\n        isDisabled,\n        ...(ariaLabel && { \"aria-label\": ariaLabel }),\n        ...(ariaLabelledby && { \"aria-labelledby\": ariaLabelledby }),\n      },\n      state,\n      inputRef\n    );\n    const { focusProps, isFocusVisible } = useFocusRing();\n    const { hoverProps, isHovered } = useHover({ isDisabled });\n\n    const isPill = pill === true;\n    const shapeClass = isPill ? shapeMap.pill : shapeMap.round;\n    const position = thumbPositions[size];\n    const thumbLeft = isSelected ? position.checked : position.unchecked;\n\n    React.useImperativeHandle(ref, () => inputRef.current!);\n\n    return (\n      <div\n        className={cn(\n          'switch',\n          styles.switch,\n          sizeMap[size],\n          shapeClass,\n          className\n        )}\n        data-selected={isSelected || undefined}\n        data-disabled={isDisabled || undefined}\n        data-focus-visible={isFocusVisible || undefined}\n        data-hovered={isHovered || undefined}\n      >\n        <div\n          className={cn(\n            'switch-track',\n            styles[\"switch-track\"],\n            shapeClass\n          )}\n        />\n        <div\n          className={cn(\n            'switch-thumb',\n            styles[\"switch-thumb\"],\n            sizeMap[size],\n            shapeClass\n          )}\n          style={{\n            left: `${thumbLeft}rem`,\n          }}\n        />\n        <input\n          ref={inputRef}\n          type=\"checkbox\"\n          className=\"absolute inset-0 w-full h-full opacity-0 cursor-pointer\"\n          {...mergeProps(inputProps, focusProps, hoverProps)}\n          {...otherProps}\n        />\n      </div>\n    );\n  }\n);\n\nSwitch.displayName = \"Switch\";\n\nexport { Switch };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --track-background-unchecked: var(--background-700);\n    --track-background-checked: var(--accent-500);\n    --track-background-hover: var(--accent-600);\n    --track-background-active: var(--accent-700);\n    --track-background-disabled: var(--background-800);\n    --thumb-background-unchecked: var(--background-500);\n    --thumb-background-checked: var(--accent-50);\n    --border: var(--background-700);\n    --border-hover: var(--accent-500);\n    --border-active: var(--accent-600);\n\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .switch-track {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--radius-md);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--accent-500);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n}\n\n.sm {\n  width: 2.5rem;\n  height: 1.5rem;\n}\n\n.sm .switch-thumb {\n  width: 1rem;\n  height: 1rem;\n}\n\n.md {\n  width: 3rem;\n  height: 1.75rem;\n}\n\n.md .switch-thumb {\n  width: 1.25rem;\n  height: 1.25rem;\n}\n\n.lg {\n  width: 3.5rem;\n  height: 2rem;\n}\n\n.lg .switch-thumb {\n  width: 1.5rem;\n  height: 1.5rem;\n}\n\n.pill {\n  border-radius: 9999px;\n}\n\n.pill .switch-track {\n  border-radius: 9999px;\n}\n\n.pill .switch-thumb {\n  border-radius: 9999px;\n}\n\n.round {\n  border-radius: 0.375rem;\n}\n\n.round .switch-track {\n  border-radius: 0.375rem;\n}\n\n.round .switch-thumb {\n  border-radius: 0.375rem;\n}\n\n.switch[data-focus-visible] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-500) 40%, transparent);\n}\n",
    "cssTypes": "export interface Styles {\n  switch: string;\n  \"switch-track\": string;\n  \"switch-thumb\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n  \"pill\": string;\n  \"round\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "table": {
    "tsx": "\"use client\";\n\nimport { useState } from \"react\";\nimport { cn } from \"./utils\";\n\nexport interface Column<T> {\n  key: keyof T;\n  label: string;\n  sortable?: boolean;\n  filterable?: boolean;\n  render?: (value: any, row: T) => React.ReactNode;\n}\n\nexport interface TableProps<T> {\n  data: T[];\n  columns: Column<T>[];\n  showFilters?: boolean;\n  onRowClick?: (row: T) => void;\n  onFilterChange?: (filters: Record<string, string>) => void;\n}\n\nexport function Table<T extends Record<string, any>>({\n  data,\n  columns,\n  showFilters = false,\n  onRowClick,\n  onFilterChange,\n}: TableProps<T>) {\n  const [filters, setFilters] = useState<Record<string, string>>({});\n\n  const filterableColumns = columns.filter((col) => col.filterable);\n\n  const handleFilterChange = (columnKey: string, value: string) => {\n    const newFilters = { ...filters, [columnKey]: value };\n    setFilters(newFilters);\n    onFilterChange?.(newFilters);\n  };\n\n  const filteredData = data.filter((row) =>\n    Object.entries(filters).every(([key, filterValue]) => {\n      if (!filterValue) return true;\n      const cellValue = String(row[key]).toLowerCase();\n      return cellValue.includes(filterValue.toLowerCase());\n    })\n  );\n\n  return (\n    <div className=\"w-full\">\n      {showFilters && filterableColumns.length > 0 && (\n        <div className=\"mb-4 p-4 bg-background-900 rounded-lg border border-background-800\">\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">\n            {filterableColumns.map((col) => (\n              <div key={String(col.key)}>\n                <label className=\"block text-sm font-medium text-foreground-300 mb-2\">\n                  {col.label}\n                </label>\n                <input\n                  type=\"text\"\n                  value={filters[String(col.key)] || \"\"}\n                  onChange={(e) =>\n                    handleFilterChange(String(col.key), e.target.value)\n                  }\n                  placeholder={`Filter by ${col.label.toLowerCase()}`}\n                  className=\"w-full px-3 py-2 rounded-md border border-background-700 bg-background-950 text-foreground-50 placeholder-foreground-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all\"\n                />\n              </div>\n            ))}\n          </div>\n        </div>\n      )}\n\n      <div className=\"overflow-x-auto border border-background-800 rounded-lg\">\n        <table className=\"w-full text-sm\">\n          <thead>\n            <tr className=\"border-b border-background-800 bg-background-900\">\n              {columns.map((col) => (\n                <th\n                  key={String(col.key)}\n                  className=\"px-4 py-3 text-left font-semibold text-foreground-200\"\n                >\n                  {col.label}\n                </th>\n              ))}\n            </tr>\n          </thead>\n          <tbody>\n            {filteredData.length > 0 ? (\n              filteredData.map((row, idx) => (\n                <tr\n                  key={idx}\n                  onClick={() => onRowClick?.(row)}\n                  className={cn(\n                    \"border-b border-background-800 last:border-b-0\",\n                    onRowClick\n                      ? \"cursor-pointer hover:bg-background-900 transition-colors\"\n                      : \"\"\n                  )}\n                >\n                  {columns.map((col) => (\n                    <td\n                      key={String(col.key)}\n                      className=\"px-4 py-3 text-foreground-300\"\n                    >\n                      {col.render ? (\n                        col.render(row[col.key], row)\n                      ) : (\n                        String(row[col.key])\n                      )}\n                    </td>\n                  ))}\n                </tr>\n              ))\n            ) : (\n              <tr>\n                <td\n                  colSpan={columns.length}\n                  className=\"px-4 py-8 text-center text-foreground-400\"\n                >\n                  No data available\n                </td>\n              </tr>\n            )}\n          </tbody>\n        </table>\n      </div>\n    </div>\n  );\n}\n",
    "css": "",
    "cssTypes": ""
  },
  "tabs": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport styles from \"./Tabs.module.css\"\n\ntype TabsVariant = \"default\" | \"underline\"\n\ninterface TabsContextValue {\n  selectedValue: string\n  setSelectedValue: (value: string) => void\n  variant: TabsVariant\n  listRef: React.RefObject<HTMLDivElement | null>\n  registerTab: (value: string) => void\n  tabIds: Map<string, string>\n  panelIds: Map<string, string>\n}\n\nconst TabsContext = React.createContext<TabsContextValue | null>(null)\n\nfunction useTabsContext() {\n  const context = React.useContext(TabsContext)\n  if (!context) {\n    throw new Error(\"Tabs components must be used within a Tabs provider\")\n  }\n  return context\n}\n\ninterface TabsProps {\n  variant?: TabsVariant\n  defaultValue?: string\n  value?: string\n  onValueChange?: (value: string) => void\n  className?: string\n  children?: React.ReactNode\n}\n\nfunction Tabs({\n  variant = \"default\",\n  defaultValue,\n  value,\n  onValueChange,\n  className,\n  children,\n}: TabsProps) {\n  const listRef = React.useRef<HTMLDivElement>(null)\n  const [internalValue, setInternalValue] = React.useState(defaultValue ?? \"\")\n  const [tabIds] = React.useState(() => new Map<string, string>())\n  const [panelIds] = React.useState(() => new Map<string, string>())\n\n  const isControlled = value !== undefined\n  const selectedValue = isControlled ? value : internalValue\n\n  const setSelectedValue = React.useCallback(\n    (newValue: string) => {\n      if (!isControlled) {\n        setInternalValue(newValue)\n      }\n      onValueChange?.(newValue)\n    },\n    [isControlled, onValueChange]\n  )\n\n  const registerTab = React.useCallback(\n    (tabValue: string) => {\n      if (!tabIds.has(tabValue)) {\n        const tabId = `tab-${tabValue}-${Math.random().toString(36).slice(2, 9)}`\n        const panelId = `panel-${tabValue}-${Math.random().toString(36).slice(2, 9)}`\n        tabIds.set(tabValue, tabId)\n        panelIds.set(tabValue, panelId)\n      }\n    },\n    [tabIds, panelIds]\n  )\n\n  return (\n    <TabsContext.Provider\n      value={{\n        selectedValue,\n        setSelectedValue,\n        variant,\n        listRef,\n        registerTab,\n        tabIds,\n        panelIds,\n      }}\n    >\n      <div className={cn(styles.tabs, className)} data-variant={variant}>\n        {children}\n      </div>\n    </TabsContext.Provider>\n  )\n}\n\ninterface TabsListProps {\n  className?: string\n  children?: React.ReactNode\n  \"aria-label\"?: string\n}\n\nfunction TabsList({ className, children, \"aria-label\": ariaLabel }: TabsListProps) {\n  const { variant, listRef } = useTabsContext()\n\n  const [indicator, setIndicator] = React.useState<{\n    left: number\n    width: number\n    height: number\n  }>({ left: 0, width: 0, height: 0 })\n\n  const updateIndicator = React.useCallback(() => {\n    if (!listRef.current) return\n\n    const activeTrigger = listRef.current.querySelector(\n      '[data-selected=\"true\"]'\n    ) as HTMLElement | null\n\n    if (activeTrigger) {\n      setIndicator({\n        left: activeTrigger.offsetLeft,\n        width: activeTrigger.offsetWidth,\n        height: activeTrigger.offsetHeight,\n      })\n    } else {\n      setIndicator({ left: 0, width: 0, height: 0 })\n    }\n  }, [listRef])\n\n  React.useEffect(() => {\n    updateIndicator()\n\n    const observer = new MutationObserver(updateIndicator)\n    const resizeObserver = new ResizeObserver(updateIndicator)\n\n    if (listRef.current) {\n      observer.observe(listRef.current, {\n        attributes: true,\n        attributeFilter: [\"data-selected\"],\n        subtree: true,\n      })\n      resizeObserver.observe(listRef.current)\n    }\n\n    window.addEventListener(\"resize\", updateIndicator)\n\n    return () => {\n      observer.disconnect()\n      resizeObserver.disconnect()\n      window.removeEventListener(\"resize\", updateIndicator)\n    }\n  }, [updateIndicator, listRef])\n\n  return (\n    <div\n      role=\"tablist\"\n      aria-label={ariaLabel}\n      ref={listRef}\n      className={cn(\"tabs\", variant, styles.tabsList, className)}\n      data-variant={variant}\n    >\n      {children}\n      {indicator.width > 0 && (\n        <div\n          className={cn(\n            styles.indicator,\n            variant === \"default\" && styles.indicatorDefault,\n            variant === \"underline\" && styles.indicatorUnderline\n          )}\n          style={{\n            left: variant === \"underline\" ? 0 : indicator.left,\n            width: indicator.width,\n            height: variant === \"default\" ? indicator.height : undefined,\n            transform:\n              variant === \"underline\"\n                ? `translateX(${indicator.left}px)`\n                : undefined,\n          }}\n        />\n      )}\n    </div>\n  )\n}\n\ninterface TabsTriggerProps {\n  value: string\n  icon?: React.ReactNode\n  disabled?: boolean\n  className?: string\n  children?: React.ReactNode\n}\n\nfunction TabsTrigger({\n  value,\n  icon,\n  disabled,\n  className,\n  children,\n}: TabsTriggerProps) {\n  const { selectedValue, setSelectedValue, registerTab, tabIds, panelIds } =\n    useTabsContext()\n  const triggerRef = React.useRef<HTMLButtonElement>(null)\n\n  React.useEffect(() => {\n    registerTab(value)\n  }, [value, registerTab])\n\n  const isSelected = selectedValue === value\n  const { focusProps, isFocusVisible } = useFocusRing()\n\n  const handleClick = () => {\n    if (!disabled) {\n      setSelectedValue(value)\n    }\n  }\n\n  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {\n    const tabList = triggerRef.current?.closest('[role=\"tablist\"]')\n    if (!tabList) return\n\n    const tabs = Array.from(\n      tabList.querySelectorAll('[role=\"tab\"]:not([disabled])')\n    ) as HTMLButtonElement[]\n    const currentIndex = tabs.indexOf(triggerRef.current!)\n\n    let nextIndex: number | null = null\n\n    switch (e.key) {\n      case \"ArrowRight\":\n        nextIndex = (currentIndex + 1) % tabs.length\n        break\n      case \"ArrowLeft\":\n        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length\n        break\n      case \"Home\":\n        nextIndex = 0\n        break\n      case \"End\":\n        nextIndex = tabs.length - 1\n        break\n    }\n\n    if (nextIndex !== null) {\n      e.preventDefault()\n      tabs[nextIndex].focus()\n      tabs[nextIndex].click()\n    }\n  }\n\n  return (\n    <button\n      {...focusProps}\n      ref={triggerRef}\n      role=\"tab\"\n      id={tabIds.get(value)}\n      aria-selected={isSelected}\n      aria-controls={panelIds.get(value)}\n      tabIndex={isSelected ? 0 : -1}\n      disabled={disabled}\n      onClick={handleClick}\n      onKeyDown={handleKeyDown}\n      className={cn(styles.tabsTrigger, className)}\n      data-selected={isSelected || undefined}\n      data-disabled={disabled || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n    >\n      {icon && <span className={styles.triggerIcon}>{icon}</span>}\n      <span>{children}</span>\n    </button>\n  )\n}\n\ninterface TabsContentProps {\n  value: string\n  className?: string\n  children?: React.ReactNode\n}\n\nfunction TabsContent({ value, className, children }: TabsContentProps) {\n  const { selectedValue, tabIds, panelIds, registerTab } = useTabsContext()\n  const panelRef = React.useRef<HTMLDivElement>(null)\n  const { focusProps, isFocusVisible } = useFocusRing()\n\n  React.useEffect(() => {\n    registerTab(value)\n  }, [value, registerTab])\n\n  const isSelected = selectedValue === value\n\n  if (!isSelected) {\n    return null\n  }\n\n  return (\n    <div\n      {...focusProps}\n      ref={panelRef}\n      role=\"tabpanel\"\n      id={panelIds.get(value)}\n      aria-labelledby={tabIds.get(value)}\n      tabIndex={0}\n      className={cn(styles.tabsContent, className)}\n      data-focus-visible={isFocusVisible || undefined}\n    >\n      {children}\n    </div>\n  )\n}\n\nexport { Tabs, TabsList, TabsTrigger, TabsContent }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .tabsList {\n    --background: var(--background-800);\n    --border: var(--background-700);\n    --indicator-background: var(--background-700);\n\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    overflow: hidden;\n    text-decoration: none !important;\n    @apply p-1;\n\n    &[data-variant=\"default\"] {\n      background-color: var(--background);\n      border: var(--border-width-base) solid var(--border);\n      border-radius: var(--radius-lg);\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border: none;\n      padding: 0;\n    }\n  }\n\n  .indicator {\n    position: absolute;\n    pointer-events: none;\n    transition: all 300ms var(--ease-gentle-ease);\n    background-color: var(--indicator-background);\n  }\n\n  .indicatorDefault {\n    border-radius: var(--radius-md);\n  }\n\n  .indicatorUnderline {\n    --indicator-background: var(--accent-500);\n\n    bottom: 0;\n    height: 0.125rem;\n  }\n\n  .tabsTrigger {\n    --foreground: var(--foreground-400);\n    --foreground-hover: var(--foreground-200);\n    --foreground-active: var(--foreground-50);\n\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    z-index: 10;\n    font-family: inherit;\n    font-weight: 500;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    @apply gap-2 px-3 py-1.5 whitespace-nowrap;\n\n    color: var(--foreground);\n    user-select: none;\n    cursor: pointer;\n    background: transparent;\n    border: 1px solid transparent;\n    border-radius: var(--radius-md);\n    transition: transform 150ms var(--ease-snappy-pop);\n\n    &[data-focus-visible] {\n      border-radius: 0px;\n      outline: 1px solid var(--accent-500);\n      outline-offset: 0px;\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        color: var(--foreground-hover);\n      }\n    }\n\n    &:active:not([data-disabled]) {\n      color: var(--foreground-active)\n    }\n\n    &[data-selected] {\n      color: var(--foreground-active);\n    }\n  }\n\n  .triggerIcon {\n    display: flex;\n    align-items: center;\n  }\n\n  .tabsContent {\n    margin-top: 0.5rem;\n    outline: none;\n\n    &[data-focus-visible] {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  tabs: string;\n  tabsList: string;\n  indicator: string;\n  indicatorDefault: string;\n  indicatorUnderline: string;\n  tabsTrigger: string;\n  triggerIcon: string;\n  tabsContent: string;\n  default: string;\n  underline: string;\n};\n\nexport default styles;\n"
  },
  "textarea": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useState, type ComponentPropsWithoutRef } from \"react\";\nimport { useFocusRing, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Textarea.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nexport interface TextAreaProps extends Omit<ComponentPropsWithoutRef<\"textarea\">, \"size\"> {\n  size?: Size;\n  error?: boolean;\n  resizable?: boolean;\n  showCharacterCount?: boolean;\n  maxCharacters?: number;\n}\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return React.useCallback((value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  }, refs);\n}\n\nexport const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      error = false,\n      disabled,\n      resizable = true,\n      showCharacterCount = false,\n      maxCharacters,\n      value: controlledValue,\n      defaultValue,\n      onChange,\n      ...props\n    },\n    ref\n  ) => {\n    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? \"\");\n\n    const textareaRef = React.useRef<HTMLTextAreaElement>(null);\n    const mergedRef = useMergedRef(ref, textareaRef);\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;\n    const charCount = typeof currentValue === \"string\" ? currentValue.length : 0;\n    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;\n\n    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {\n      const newValue = e.target.value;\n\n      if (maxCharacters && newValue.length > maxCharacters) {\n        const truncated = newValue.slice(0, maxCharacters);\n        if (controlledValue === undefined) {\n          setInternalValue(truncated);\n        }\n        onChange?.({\n          ...e,\n          target: { ...e.target, value: truncated },\n        } as React.ChangeEvent<HTMLTextAreaElement>);\n      } else {\n        if (controlledValue === undefined) {\n          setInternalValue(newValue);\n        }\n        onChange?.(e);\n      }\n    };\n\n    return (\n      <div className={styles.container}>\n        <textarea\n          ref={mergedRef}\n          disabled={disabled}\n          data-focus-visible={isFocusVisible || undefined}\n          data-disabled={disabled || undefined}\n          data-error={error || isOverLimit ? \"true\" : undefined}\n          data-size={size}\n          data-resizable={resizable ? undefined : \"false\"}\n          className={cn(styles.textarea, className)}\n          value={currentValue}\n          {...mergeProps(focusProps, { onChange: handleChange, ...props })}\n        />\n        {showCharacterCount && (\n          <div\n            className={styles.characterCount}\n            data-over-limit={isOverLimit || undefined}\n          >\n            {charCount}{maxCharacters ? ` / ${maxCharacters}` : \"\"} characters\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nTextArea.displayName = \"TextArea\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-500);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md);\n    resize: vertical;\n    @apply px-3 py-2;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        border-color: var(--border-hover);\n      }\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring-color) 15%, transparent);\n      transform: scale(1.01);\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-500);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--danger-600) 25%, transparent);\n      }\n    }\n\n    &[data-resizable=\"false\"] {\n      resize: none;\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    font-size: var(--text-xs);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    font-size: var(--text-base);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    width: 100%;\n  }\n\n  .characterCount {\n    font-size: var(--text-xs);\n    color: var(--foreground-500);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .characterCount[data-over-limit] {\n    color: var(--danger-600);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  textarea: string;\n  container: string;\n  characterCount: string;\n};\n\nexport default styles;\n"
  },
  "toast": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';\nimport gsap from 'gsap';\nimport { cva } from 'class-variance-authority';\nimport { cn } from \"./utils\";\nimport { ToastProps as ToastData } from \"./Toast.Store\";\nimport { dispatch } from \"./Toast.Store\";\nimport { FaCircleExclamation, FaCircleCheck, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6';\nimport { HiX } from 'react-icons/hi';\n\nconst toastVariants = cva(\n  'w-full max-w-sm border rounded-lg shadow-lg flex items-start gap-3 pointer-events-auto p-3',\n  {\n    variants: {\n      variant: {\n        default: 'bg-background-900 border-background-600 text-foreground-200',\n        destructive: 'bg-danger-50 border-danger-500/50 text-danger-900',\n        success: 'bg-success-50 border-success-500/50 text-success-900',\n        info: 'bg-info-50 border-info-500/50 text-info-900',\n        warning: 'bg-warning-50 border-warning-500/50 text-warning-900',\n      },\n    },\n    defaultVariants: { variant: 'default' },\n  }\n);\n\nconst titleVariants = cva('font-semibold text-lg', {\n  variants: {\n    variant: {\n      default: 'text-foreground-50',\n      destructive: 'text-danger-950',\n      success: 'text-success-950',\n      info: 'text-info-950',\n      warning: 'text-warning-950',\n    },\n  },\n  defaultVariants: { variant: 'default' },\n});\n\nconst descriptionVariants = cva('text-sm opacity-90 mt-1', {\n  variants: {\n    variant: {\n      default: 'text-foreground-300',\n      destructive: 'text-danger-950',\n      success: 'text-success-950',\n      info: 'text-info-950',\n      warning: 'text-warning-950',\n    },\n  },\n  defaultVariants: { variant: 'default' },\n});\n\nconst closeButtonVariants = cva(\n  'ml-3 p-2 -mr-2 -mt-2 rounded-lg opacity-60 hover:opacity-100 transition-opacity',\n  {\n    variants: {\n      variant: {\n        default: 'hover:bg-white/10',\n        destructive: 'hover:bg-danger-500/20',\n        success: 'hover:bg-success-500/20',\n        info: 'hover:bg-info-500/20',\n        warning: 'hover:bg-warning-500/20',\n      },\n    },\n    defaultVariants: { variant: 'default' },\n  }\n);\n\nconst toastIcons = {\n  destructive: <FaCircleExclamation className=\"w-5 h-5 mt-0.5\" />,\n  success: <FaCircleCheck className=\"w-5 h-5 mt-0.5\" />,\n  info: <FaCircleInfo className=\"w-5 h-5 mt-0.5\" />,\n  warning: <FaTriangleExclamation className=\"w-5 h-5 mt-0.5\" />,\n  default: null,\n};\n\ninterface ToastComponentProps {\n  toast: ToastData;\n  pauseOnHover?: boolean;\n  pauseOnFocus?: boolean;\n}\n\nexport const Toast = forwardRef<HTMLDivElement, ToastComponentProps>(function Toast(\n  { toast, pauseOnHover = false, pauseOnFocus = false },\n  ref\n) {\n  const innerRef = useRef<HTMLDivElement>(null);\n  useImperativeHandle(ref, () => innerRef.current!);\n\n  const {\n    id,\n    title,\n    description,\n    jsx,\n    variant = 'default',\n    duration = 5000,\n    createdAt = Date.now(),\n    onDismiss,\n    position = 'bottom-right',\n    _isExpanded = false,\n  } = toast;\n\n  const isTop = position.startsWith('top');\n  const timerRef = useRef<NodeJS.Timeout | null>(null);\n  const pausedAt = useRef<number | null>(null);\n\n  // Clear any existing timer\n  const clearTimer = () => {\n    if (timerRef.current) {\n      clearTimeout(timerRef.current);\n      timerRef.current = null;\n    }\n  };\n\n  const handleDismiss = useCallback(() => {\n    if (!innerRef.current) return;\n\n    clearTimer();\n\n    gsap.to(innerRef.current, {\n      y: isTop ? -60 : 60,\n      opacity: 0,\n      scale: 0.85,\n      height: 0,\n      marginTop: 0,\n      marginBottom: 0,\n      paddingTop: 0,\n      paddingBottom: 0,\n      duration: 0.4,\n      ease: 'back.in(1.6)',\n      onComplete: () => {\n        onDismiss?.();\n        dispatch({ type: 'DISMISS_TOAST', toastId: id });\n      },\n    });\n  }, [id, isTop, onDismiss]);\n\n  // Calculate current remaining time based on creation timestamp\n  const calculateRemaining = useCallback(() => {\n    if (duration === Infinity) return Infinity;\n    if (pausedAt.current !== null) {\n      return pausedAt.current;\n    }\n    const elapsed = Date.now() - createdAt;\n    return Math.max(0, duration - elapsed);\n  }, [duration, createdAt]);\n\n  // Main auto-dismiss logic\n  useEffect(() => {\n    if (duration === Infinity || duration <= 0) return;\n\n    // When pausing, save the current remaining time\n    if (pauseOnHover || pauseOnFocus) {\n      clearTimer();\n      pausedAt.current = calculateRemaining();\n      return;\n    }\n\n    // When resuming from pause, calculate remaining based on what we had paused at\n    const remaining = pausedAt.current !== null ? pausedAt.current : calculateRemaining();\n    pausedAt.current = null;\n\n    if (remaining <= 0) {\n      handleDismiss();\n      return;\n    }\n\n    clearTimer();\n    timerRef.current = setTimeout(() => {\n      handleDismiss();\n    }, remaining);\n\n    return () => clearTimer();\n  }, [pauseOnHover, pauseOnFocus, duration, createdAt, handleDismiss, calculateRemaining]);\n\n  // Optional: visual scale on individual hover\n  const handleMouseEnter = () => {\n    gsap.to(innerRef.current, { scale: 1.025, duration: 0.4, ease: 'back.out(2.5)' });\n  };\n\n  const handleMouseLeave = () => {\n    gsap.to(innerRef.current, { scale: 1, duration: 0.5, ease: 'elastic.out(1.3, 0.3)' });\n  };\n\n  const icon = toastIcons[variant as keyof typeof toastIcons];\n\n  return (\n    <div\n      ref={innerRef}\n      className={cn(toastVariants({ variant }), 'origin-center', _isExpanded && 'shadow-2xl')}\n      style={{\n        willChange: 'transform, opacity, filter',\n        filter: _isExpanded ? 'drop-shadow(0 20px 25px rgba(0,0,0,0.3))' : 'none',\n        transition: 'brightness 0.3s ease-out'\n      }}\n      onMouseEnter={handleMouseEnter}\n      onMouseLeave={handleMouseLeave}\n    >\n      {icon && <div className=\"flex-shrink-0\">{icon}</div>}\n      <div className=\"flex-1 min-w-0\">\n        {jsx || (\n          <>\n            {title && <h4 className={titleVariants({ variant })}>{title}</h4>}\n            {description && <p className={descriptionVariants({ variant })}>{description}</p>}\n          </>\n        )}\n        {toast.action}\n      </div>\n      <button\n        onClick={handleDismiss}\n        className={cn(closeButtonVariants({ variant }))}\n        aria-label=\"Close\"\n      >\n        <HiX className=\"w-5 h-5\" />\n      </button>\n    </div>\n  );\n});\n",
    "css": "",
    "cssTypes": ""
  },
  "tooltip": {
    "tsx": "\"use client\";\n\nimport React, { useRef, useEffect } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useTooltipTrigger, useTooltip, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport { useTooltipTriggerState } from \"react-stately\";\n\nconst ARROW_SIZE = 12;\nconst ARROW_MASK_THICKNESS = 2;\nconst TOOLTIP_GAP = 8;\nconst ARROW_POSITIONING_SIZE = 6;\nconst DEFAULT_SHOW_DELAY_MS = 200;\n\ntype TooltipPosition = \"top\" | \"right\" | \"bottom\" | \"left\";\n\nexport interface TooltipProps {\n  children: React.ReactNode;\n  content: React.ReactNode;\n  position?: TooltipPosition;\n  className?: string;\n  contentClassName?: string;\n  delay?: number;\n  isDisabled?: boolean;\n  isOpen?: boolean;\n  onOpenChange?: (isOpen: boolean) => void;\n  showArrow?: boolean;\n}\n\ninterface ArrowLineSegment {\n  x1: number;\n  y1: number;\n  x2: number;\n  y2: number;\n}\n\ninterface TooltipArrowProps {\n  position: TooltipPosition;\n}\n\nconst TooltipArrow = ({ position }: TooltipArrowProps) => {\n  const [borderWidth, setBorderWidth] = React.useState(1);\n\n  React.useEffect(() => {\n    const root = document.documentElement;\n    const borderWidthStr = getComputedStyle(root).getPropertyValue(\"--border-width-base\").trim();\n    const width = parseFloat(borderWidthStr) || 1;\n    setBorderWidth(width);\n  }, []);\n\n  /**\n   * Calculate SVG polygon points for the arrow triangle.\n   * Creates a triangle pointing in the specified direction.\n   */\n  const getArrowPoints = (): string => {\n    const halfSize = ARROW_SIZE / 2;\n\n    switch (position) {\n      case \"top\":\n        return `${halfSize},${ARROW_SIZE} 0,0 ${ARROW_SIZE},0`;\n      case \"bottom\":\n        return `${halfSize},0 0,${ARROW_SIZE} ${ARROW_SIZE},${ARROW_SIZE}`;\n      case \"left\":\n        return `${ARROW_SIZE},${halfSize} 0,0 0,${ARROW_SIZE}`;\n      case \"right\":\n        return `0,${halfSize} ${ARROW_SIZE},0 ${ARROW_SIZE},${ARROW_SIZE}`;\n    }\n  };\n\n  /**\n   * Calculate border lines for the arrow.\n   * Excludes the edge that connects to the tooltip to avoid double borders.\n   */\n  const getBorderLines = (): ArrowLineSegment[] => {\n    const halfSize = ARROW_SIZE / 2;\n\n    switch (position) {\n      case \"top\":\n        return [\n          { x1: halfSize, y1: ARROW_SIZE, x2: 0, y2: 0 },\n          { x1: halfSize, y1: ARROW_SIZE, x2: ARROW_SIZE, y2: 0 },\n        ];\n      case \"bottom\":\n        return [\n          { x1: halfSize, y1: 0, x2: 0, y2: ARROW_SIZE },\n          { x1: halfSize, y1: 0, x2: ARROW_SIZE, y2: ARROW_SIZE },\n        ];\n      case \"left\":\n        return [\n          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: 0 },\n          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: ARROW_SIZE },\n        ];\n      case \"right\":\n        return [\n          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: 0 },\n          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: ARROW_SIZE },\n        ];\n    }\n  };\n\n  /**\n   * Calculate positioning styles for the arrow relative to the tooltip.\n   * Accounts for border width and positions the arrow at the tooltip edge.\n   */\n  const getArrowStyles = (): React.CSSProperties => {\n    const borderOffset = borderWidth / 2;\n\n    switch (position) {\n      case \"top\":\n        return {\n          top: `calc(100% + ${borderOffset}px)`,\n          left: \"50%\",\n          transform: `translateX(-50%) translateY(-${borderOffset}px)`,\n        };\n      case \"bottom\":\n        return {\n          bottom: `calc(100% + ${borderOffset}px)`,\n          left: \"50%\",\n          transform: `translateX(-50%) translateY(${borderOffset}px)`,\n        };\n      case \"left\":\n        return {\n          left: `calc(100% + ${borderOffset}px)`,\n          top: \"50%\",\n          transform: `translateY(-50%) translateX(-${borderOffset}px)`,\n        };\n      case \"right\":\n        return {\n          right: `calc(100% + ${borderOffset}px)`,\n          top: \"50%\",\n          transform: `translateY(-50%) translateX(${borderOffset}px)`,\n        };\n    }\n  };\n\n  /**\n   * Get the connecting edge mask based on arrow position.\n   * This hides the tooltip border at the arrow connection point.\n   */\n  const getMaskRect = (): React.ReactNode => {\n    switch (position) {\n      case \"top\":\n        return (\n          <rect x=\"0\" y={ARROW_SIZE - ARROW_MASK_THICKNESS} width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill=\"black\" />\n        );\n      case \"bottom\":\n        return <rect x=\"0\" y=\"0\" width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill=\"black\" />;\n      case \"left\":\n        return (\n          <rect x={ARROW_SIZE - ARROW_MASK_THICKNESS} y=\"0\" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill=\"black\" />\n        );\n      case \"right\":\n        return <rect x=\"0\" y=\"0\" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill=\"black\" />;\n    }\n  };\n\n  return (\n    <svg\n      width={ARROW_SIZE}\n      height={ARROW_SIZE}\n      viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`}\n      className=\"absolute pointer-events-none\"\n      style={getArrowStyles()}\n    >\n      <defs>\n        <mask id={`arrow-mask-${position}`}>\n          {/* White base covers entire SVG */}\n          <rect width={ARROW_SIZE} height={ARROW_SIZE} fill=\"white\" />\n          {/* Black area reveals the tooltip beneath the connecting edge */}\n          {getMaskRect()}\n        </mask>\n      </defs>\n\n      {/* Arrow fill with mask applied */}\n      <polygon\n        points={getArrowPoints()}\n        fill=\"var(--color-background-900)\"\n        mask={`url(#arrow-mask-${position})`}\n      />\n\n      {/* Border lines on outer edges only */}\n      {getBorderLines().map((line, idx) => (\n        <line\n          key={idx}\n          x1={line.x1}\n          y1={line.y1}\n          x2={line.x2}\n          y2={line.y2}\n          stroke=\"var(--color-background-700)\"\n          strokeWidth={borderWidth}\n          strokeLinecap=\"round\"\n        />\n      ))}\n    </svg>\n  );\n};\n\ninterface TooltipCoordinates {\n  top: number;\n  left: number;\n}\n\n/**\n * Tooltip component that displays additional information on hover or focus.\n * Uses React Aria hooks for accessibility with custom positioning and styling.\n * Supports positioning in four directions with smooth animations.\n */\nconst Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(\n  (\n    {\n      children,\n      content,\n      position = \"top\",\n      className,\n      contentClassName,\n      delay = DEFAULT_SHOW_DELAY_MS,\n      isDisabled = false,\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      showArrow = false,\n    },\n    _ref\n  ) => {\n    const triggerRef = useRef<HTMLDivElement>(null);\n    const tooltipRef = useRef<HTMLDivElement>(null);\n\n    // Create state using React Aria's state management\n    const state = useTooltipTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      delay,\n      isDisabled,\n    });\n\n    // Get props from React Aria hooks\n    const { triggerProps, tooltipProps } = useTooltipTrigger(\n      { isDisabled },\n      state,\n      triggerRef\n    );\n    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);\n\n    // Track tooltip position for custom positioning logic\n    const [tooltipPosition, setTooltipPosition] = React.useState<TooltipCoordinates>({\n      top: 0,\n      left: 0,\n    });\n\n    /**\n     * Calculate tooltip position based on trigger element and position preference.\n     * Positions the tooltip with appropriate spacing and arrow alignment.\n     */\n    useEffect(() => {\n      if (!state.isOpen || !triggerRef.current) return;\n\n      const triggerRect = triggerRef.current.getBoundingClientRect();\n      let top = 0;\n      let left = 0;\n\n      switch (position) {\n        case \"top\":\n          top = triggerRect.top + window.scrollY - TOOLTIP_GAP - ARROW_POSITIONING_SIZE;\n          left = triggerRect.left + window.scrollX + triggerRect.width / 2;\n          break;\n        case \"bottom\":\n          top = triggerRect.bottom + window.scrollY + TOOLTIP_GAP + ARROW_POSITIONING_SIZE;\n          left = triggerRect.left + window.scrollX + triggerRect.width / 2;\n          break;\n        case \"left\":\n          top = triggerRect.top + window.scrollY + triggerRect.height / 2;\n          left = triggerRect.left + window.scrollX - TOOLTIP_GAP - ARROW_POSITIONING_SIZE;\n          break;\n        case \"right\":\n          top = triggerRect.top + window.scrollY + triggerRect.height / 2;\n          left = triggerRect.right + window.scrollX + TOOLTIP_GAP + ARROW_POSITIONING_SIZE;\n          break;\n      }\n\n      setTooltipPosition({ top, left });\n    }, [state.isOpen, position]);\n\n    /**\n     * CSS classes for positioning the tooltip container based on direction.\n     * Applies negative transforms to properly center the tooltip relative to trigger.\n     */\n    const positionClasses: Record<TooltipPosition, string> = {\n      top: \"-translate-x-1/2 -translate-y-full\",\n      bottom: \"-translate-x-1/2 translate-y-0\",\n      left: \"-translate-y-1/2 -translate-x-full\",\n      right: \"-translate-y-1/2 translate-x-0\",\n    };\n\n    return (\n      <>\n        <div\n          ref={triggerRef}\n          {...mergeProps(triggerProps)}\n          className={cn(\"inline-block\", className)}\n        >\n          {children}\n        </div>\n\n        {state.isOpen &&\n          createPortal(\n            <div\n              ref={tooltipRef}\n              {...mergeProps(tooltipProps, ariaTooltipProps)}\n              className={cn(\"absolute pointer-events-none z-50 transition-opacity\", positionClasses[position], {\n                \"opacity-100\": state.isOpen,\n              })}\n              style={{\n                top: `${tooltipPosition.top}px`,\n                left: `${tooltipPosition.left}px`,\n              }}\n            >\n              <div\n                className={cn(\n                  \"relative bg-background-900 text-foreground-50 text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-background-700\",\n                  contentClassName\n                )}\n              >\n                {content}\n                {showArrow && <TooltipArrow position={position} />}\n              </div>\n            </div>,\n            document.body\n          )}\n      </>\n    );\n  }\n);\n\nTooltip.displayName = \"Tooltip\";\n\nexport { Tooltip };\n",
    "css": "",
    "cssTypes": ""
  }
};

export const reactAriaUrls: Record<string, string> = {
  "anchor": "",
  "badge": "",
  "breadcrumbs": "https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html",
  "button": "https://react-spectrum.adobe.com/react-aria/useButton.html",
  "card": "",
  "checkbox": "https://react-spectrum.adobe.com/react-aria/useCheckbox.html",
  "command": "",
  "confirmation": "",
  "divider": "",
  "easing-preview": "",
  "flex": "",
  "fold": "",
  "gallery": "",
  "grid": "",
  "group": "",
  "input": "https://react-spectrum.adobe.com/react-aria/useTextField.html",
  "label": "https://react-spectrum.adobe.com/react-aria/useLabel.html",
  "list": "",
  "menu": "https://react-spectrum.adobe.com/react-aria/useMenu.html",
  "modal": "https://react-spectrum.adobe.com/react-aria/useDialog.html",
  "popover": "https://react-spectrum.adobe.com/react-aria/usePopover.html",
  "progress": "https://react-spectrum.adobe.com/react-aria/useProgressBar.html",
  "radio": "https://react-spectrum.adobe.com/react-aria/useRadioGroup.html",
  "scroll-area": "",
  "select": "https://react-spectrum.adobe.com/react-aria/useSelect.html",
  "slider": "https://react-spectrum.adobe.com/react-aria/useSlider.html",
  "switch": "https://react-spectrum.adobe.com/react-aria/useSwitch.html",
  "table": "https://react-spectrum.adobe.com/react-aria/useTable.html",
  "tabs": "https://react-spectrum.adobe.com/react-aria/useTabs.html",
  "textarea": "https://react-spectrum.adobe.com/react-aria/useTextField.html",
  "toast": "",
  "tooltip": "https://react-spectrum.adobe.com/react-aria/useTooltip.html"
};

export const generatedComponentDependencies: Record<string, ComponentDeps> = {
  "badge": {
    "npm": [],
    "internal": []
  },
  "breadcrumbs": {
    "npm": [],
    "internal": []
  },
  "button": {
    "npm": [],
    "internal": []
  },
  "card": {
    "npm": [],
    "internal": []
  },
  "checkbox": {
    "npm": [],
    "internal": [
      "label"
    ]
  },
  "command": {
    "npm": [
      "cmdk"
    ],
    "internal": [
      "card",
      "badge",
      "divider"
    ]
  },
  "confirm": {
    "npm": [],
    "internal": [
      "modal",
      "button",
      "card"
    ]
  },
  "divider": {
    "npm": [],
    "internal": []
  },
  "flex": {
    "npm": [],
    "internal": []
  },
  "fold": {
    "npm": [
      "gsap",
      "@gsap/react"
    ],
    "internal": []
  },
  "form": {
    "npm": [],
    "internal": [
      "input",
      "label"
    ]
  },
  "gallery": {
    "npm": [],
    "internal": [
      "card"
    ]
  },
  "grid": {
    "npm": [],
    "internal": []
  },
  "group": {
    "npm": [],
    "internal": [
      "button",
      "input",
      "select"
    ]
  },
  "input": {
    "npm": [],
    "internal": [
      "label"
    ]
  },
  "label": {
    "npm": [],
    "internal": []
  },
  "menu": {
    "npm": [
      "@floating-ui/react-dom"
    ],
    "internal": []
  },
  "modal": {
    "npm": [],
    "internal": [
      "card",
      "button"
    ]
  },
  "popover": {
    "npm": [
      "@floating-ui/react-dom"
    ],
    "internal": []
  },
  "progress": {
    "npm": [],
    "internal": []
  },
  "radio": {
    "npm": [],
    "internal": [
      "label"
    ]
  },
  "select": {
    "npm": [
      "@floating-ui/react-dom"
    ],
    "internal": []
  },
  "slider": {
    "npm": [
      "@react-stately/slider"
    ],
    "internal": []
  },
  "switch": {
    "npm": [
      "@react-stately/toggle"
    ],
    "internal": []
  },
  "table": {
    "npm": [],
    "internal": [
      "card"
    ]
  },
  "tabs": {
    "npm": [],
    "internal": []
  },
  "textarea": {
    "npm": [],
    "internal": [
      "label"
    ]
  },
  "toast": {
    "npm": [],
    "internal": []
  },
  "tooltip": {
    "npm": [
      "@floating-ui/react-dom"
    ],
    "internal": []
  },
  "scrollarea": {
    "npm": [],
    "internal": []
  }
};

export const generatedCoreNpmDependencies = [
  "react-aria",
  "clsx",
  "class-variance-authority"
];

export const generatedCorePeerDependencies = [
  "react",
  "react-dom"
];

export const packageMetadata: PackageMetadata = {
  "version": "0.1.6"
};
