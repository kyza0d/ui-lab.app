import type { ComponentAPI, ComponentStyles, ComponentSourceCode, ComponentDeps, PackageMetadata } from './types';

export const generatedAPI: Record<string, ComponentAPI> = {
  "anchor": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the anchor element"
      },
      {
        "name": "href",
        "type": "string",
        "required": false,
        "description": "URL the anchor navigates to"
      },
      {
        "name": "target",
        "type": "string",
        "required": false,
        "defaultValue": "_blank",
        "description": "Browsing context for the link (e.g. \"_blank\")"
      }
    ],
    "examples": [
      {
        "title": "Basic Anchor",
        "description": "A simple anchor component with custom underline. Hover to see the popover preview.",
        "code": "import React from 'react';\nimport { Anchor } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Anchor>\n      Learn more about this topic\n      <Anchor.Preview>\n        <div className=\"text-sm\">Preview content</div>\n      </Anchor.Preview>\n    </Anchor>\n  );\n}"
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
        "description": "Visual color style of the badge",
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
        "description": "Size of the badge",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon element displayed before the badge label"
      },
      {
        "name": "dismissible",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to show a dismiss button"
      },
      {
        "name": "onDismiss",
        "type": "(() => void)",
        "required": false,
        "description": "Called when the dismiss button is clicked"
      },
      {
        "name": "pill",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to render with a fully rounded pill shape"
      },
      {
        "name": "count",
        "type": "number",
        "required": false,
        "description": "Numeric count to display; replaces children when provided"
      }
    ],
    "examples": [
      {
        "title": "Basic Badge",
        "description": "A simple badge with default styling. Use this to display labels, tags, or status indicators in your interface.",
        "code": "import React from 'react';\nimport { Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Badge>New</Badge>;\n}"
      },
      {
        "title": "Badge Variants and Sizes",
        "description": "Showcases all available badge variants (default, success, warning, danger, info) and sizes (sm, md, lg). Also demonstrates pill-shaped badges.",
        "code": "import React from 'react';\nimport { Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"p-4 space-y-8\">\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Variants</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge variant=\"default\">Default</Badge>\n          <Badge variant=\"success\">Success</Badge>\n          <Badge variant=\"warning\">Warning</Badge>\n          <Badge variant=\"danger\">Danger</Badge>\n          <Badge variant=\"info\">Info</Badge>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Sizes</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge size=\"sm\">Small</Badge>\n          <Badge size=\"md\">Medium</Badge>\n          <Badge size=\"lg\">Large</Badge>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Pill Shape</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge pill variant=\"default\">Default Pill</Badge>\n          <Badge pill variant=\"success\">Success Pill</Badge>\n          <Badge pill variant=\"warning\">Warning Pill</Badge>\n          <Badge pill variant=\"danger\">Danger Pill</Badge>\n          <Badge pill variant=\"info\">Info Pill</Badge>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Variants with Sizes</h3>\n        <div className=\"space-y-3\">\n          <div className=\"flex gap-2 flex-wrap items-center\">\n            <Badge variant=\"success\" size=\"sm\">Small Success</Badge>\n            <Badge variant=\"success\" size=\"md\">Medium Success</Badge>\n            <Badge variant=\"success\" size=\"lg\">Large Success</Badge>\n          </div>\n          <div className=\"flex gap-2 flex-wrap items-center\">\n            <Badge variant=\"danger\" size=\"sm\">Small Danger</Badge>\n            <Badge variant=\"danger\" size=\"md\">Medium Danger</Badge>\n            <Badge variant=\"danger\" size=\"lg\">Large Danger</Badge>\n          </div>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">With Count</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge variant=\"default\" count={5} />\n          <Badge variant=\"success\" count={12} />\n          <Badge variant=\"warning\" count={99} />\n          <Badge variant=\"danger\" count={3} pill />\n          <Badge variant=\"info\" count={42} pill />\n        </div>\n      </div>\n    </div>\n  );\n}"
      }
    ]
  },
  "banner": {
    "props": [
      {
        "name": "variant",
        "type": "note | info | success | warning | danger",
        "required": false,
        "defaultValue": "note",
        "description": "Visual style of the banner conveying its intent",
        "enumValues": [
          "note",
          "info",
          "success",
          "warning",
          "danger"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "description": "Controls the padding and font size of the banner",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "isDismissible",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "When true, renders a dismiss button that hides the banner on click"
      },
      {
        "name": "onDismiss",
        "type": "(() => void)",
        "required": false,
        "description": "Called when the dismiss button is clicked"
      }
    ],
    "subComponents": {
      "Banner.Title": {
        "description": "Heading text for the banner message",
        "props": []
      },
      "Banner.Body": {
        "description": "Body text content of the banner",
        "props": []
      }
    },
    "examples": [
      {
        "title": "Basic Banner",
        "description": "A neutral note banner using background shades instead of semantic colors. The default banner variant for general-purpose messaging.",
        "code": "import React from 'react';\nimport { Banner } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Banner variant=\"note\" size=\"md\">\n      This is a note banner. Use it for general-purpose messages and information without semantic intent.\n    </Banner>\n  );\n}"
      }
    ]
  },
  "breadcrumbs": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the breadcrumbs container"
      },
      {
        "name": "separator",
        "type": "ReactNode",
        "required": false,
        "description": "Custom separator element between breadcrumb items"
      }
    ],
    "subComponents": {
      "Breadcrumb": {
        "props": [
          {
            "name": "href",
            "type": "string",
            "required": false,
            "description": "URL this breadcrumb item links to"
          },
          {
            "name": "onPress",
            "type": "(() => void)",
            "required": false,
            "description": "Called when the breadcrumb item is pressed"
          },
          {
            "name": "isCurrent",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether this is the current/active page"
          },
          {
            "name": "isDisabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the item is non-interactive"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      }
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
        "type": "primary | default | secondary | outline | ghost | danger",
        "required": false,
        "defaultValue": "default",
        "description": "Visual style of the button",
        "enumValues": [
          "primary",
          "default",
          "secondary",
          "outline",
          "ghost",
          "danger"
        ]
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "description": "Size of the button",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "description": "Disables interaction and applies disabled styling"
      },
      {
        "name": "onPress",
        "type": "((e: { target: EventTarget | null; }) => void)",
        "required": false,
        "description": "React Aria press handler — preferred over onClick for accessibility"
      },
      {
        "name": "icon",
        "type": "{ left?: ReactNode; right?: ReactNode; }",
        "required": false,
        "description": "Icon slots rendered before (left) or after (right) the button label"
      },
      {
        "name": "href",
        "type": "string",
        "required": false,
        "description": "Renders the button as an anchor element when provided"
      }
    ],
    "examples": []
  },
  "card": {
    "props": [],
    "subComponents": {
      "Card.Header": {
        "description": "Top section of the card, typically containing a title or toolbar",
        "props": []
      },
      "Card.Body": {
        "description": "Main content area of the card",
        "props": []
      },
      "Card.Footer": {
        "description": "Bottom section of the card, typically containing actions",
        "props": []
      }
    },
    "examples": [
      {
        "title": "Basic Card",
        "description": "A simple card container with header, body, and footer sections. Use this to group related content in your interface.",
        "code": "import { Card } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Card>\n      <Card.Header>\n        <h3>Card Title</h3>\n      </Card.Header>\n      <Card.Body>\n        <p>This is the card content area where you can place any information or components.</p>\n      </Card.Body>\n      <Card.Footer>\n        <p>Footer content</p>\n      </Card.Footer>\n    </Card>\n  );\n}"
      },
      {
        "title": "User Profile Card",
        "description": "A practical user profile card combining header with avatar, status badge, content details, and action buttons. Demonstrates rich composition with user information display.",
        "code": "import { Card, Badge, Group } from 'ui-lab-components';\nimport { Mail, MapPin, MessageSquare } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-sm\">\n        {/* Header: Profile Section */}\n        <Card.Header className=\"flex items-start justify-between gap-4\">\n          <div className=\"flex items-start gap-3 flex-1\">\n            <div className=\"h-12 w-12 rounded-full bg-background-700 flex-shrink-0\" />\n            <div className=\"flex-1\">\n              <h3 className=\"font-semibold text-foreground-100\">Alex Johnson</h3>\n              <p className=\"text-sm text-foreground-400\">Product Designer</p>\n            </div>\n          </div>\n          <Badge variant=\"success\" size=\"sm\">Active</Badge>\n        </Card.Header>\n\n        {/* Body: Details */}\n        <Card.Body className=\"space-y-4\">\n          <div className=\"space-y-3\">\n            <div className=\"flex items-center gap-3 text-sm text-foreground-300\">\n              <Mail className=\"w-4 h-4 text-foreground-400\" />\n              <span>alex.johnson@company.com</span>\n            </div>\n            <div className=\"flex items-center gap-3 text-sm text-foreground-300\">\n              <MapPin className=\"w-4 h-4 text-foreground-400\" />\n              <span>San Francisco, CA</span>\n            </div>\n          </div>\n\n          <p className=\"text-sm text-foreground-300 leading-relaxed\">\n            Passionate about creating intuitive user experiences and mentoring design teams. Always exploring new design patterns.\n          </p>\n        </Card.Body>\n\n        {/* Footer: Actions */}\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group variant=\"ghost\" spacing=\"sm\">\n            <Group.Button variant=\"outline\" size=\"md\" className=\"flex-1\">\n              <MessageSquare className=\"w-4 h-4\" />\n              <span>Message</span>\n            </Group.Button>\n            <Group.Button variant=\"primary\" size=\"md\" className=\"flex-1\">\n              View Profile\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
      },
      {
        "title": "Settings Panel Card",
        "description": "A card-based settings panel with grouped toggle controls and action buttons. Shows how cards structure configuration options with clear labeling and actions.",
        "code": "'use client';\n\nimport React, { useState } from 'react';\nimport { Card, Button, Group, Badge, Checkbox } from 'ui-lab-components';\nimport { Bell, Eye, Lock } from 'lucide-react';\n\nexport default function Example() {\n  const [notificationsEnabled, setNotificationsEnabled] = useState(true);\n  const [previewMode, setPreviewMode] = useState(false);\n  const [privateMode, setPrivateMode] = useState(false);\n\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-md\">\n        <Card.Header className=\"flex items-center justify-between gap-3\">\n          <h3 className=\"font-semibold text-foreground-100\">Preferences</h3>\n          <Badge variant=\"info\" size=\"sm\">3 settings</Badge>\n        </Card.Header>\n\n        <Card.Body className=\"space-y-3\">\n          {/* Notification Setting */}\n          <div className=\"flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors\">\n            <Bell className=\"w-4 h-4 text-foreground-400 mt-1 flex-shrink-0\" />\n            <Checkbox\n              id=\"notifications\"\n              checked={notificationsEnabled}\n              onChange={(e) => setNotificationsEnabled(e.target.checked)}\n              label={\n                <div className=\"ml-1\">\n                  <p className=\"text-sm font-medium text-foreground-100\">Notifications</p>\n                  <p className=\"text-xs text-foreground-400\">Stay updated with alerts</p>\n                </div>\n              }\n              size=\"md\"\n            />\n          </div>\n\n          {/* Preview Mode Setting */}\n          <div className=\"flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors\">\n            <Eye className=\"w-4 h-4 text-foreground-400 mt-1 flex-shrink-0\" />\n            <Checkbox\n              id=\"preview\"\n              checked={previewMode}\n              onChange={(e) => setPreviewMode(e.target.checked)}\n              label={\n                <div className=\"ml-1\">\n                  <p className=\"text-sm font-medium text-foreground-100\">Preview Mode</p>\n                  <p className=\"text-xs text-foreground-400\">See changes in real-time</p>\n                </div>\n              }\n              size=\"md\"\n            />\n          </div>\n\n          {/* Privacy Mode Setting */}\n          <div className=\"flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors\">\n            <Lock className=\"w-4 h-4 text-foreground-400 mt-1 flex-shrink-0\" />\n            <Checkbox\n              id=\"privacy\"\n              checked={privateMode}\n              onChange={(e) => setPrivateMode(e.target.checked)}\n              label={\n                <div className=\"ml-1\">\n                  <p className=\"text-sm font-medium text-foreground-100\">Privacy Mode</p>\n                  <p className=\"text-xs text-foreground-400\">Hide sensitive data</p>\n                </div>\n              }\n              size=\"md\"\n            />\n          </div>\n        </Card.Body>\n\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group>\n            <Group.Button variant=\"ghost\" size=\"md\" className=\"flex-1\">\n              Reset to Defaults\n            </Group.Button>\n            <Group.Button variant=\"primary\" size=\"md\" className=\"flex-1\">\n              Save Changes\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
      },
      {
        "title": "Task Progress Card",
        "description": "A project task card with progress tracking, team assignments, due dates, and status. Shows how cards organize complex project information with clear visual hierarchy.",
        "code": "import { Card, Badge, Group, Progress } from 'ui-lab-components';\nimport { Calendar, CheckCircle2 } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-sm\">\n        {/* Header: Title and Status */}\n        <Card.Header className=\"flex items-start justify-between gap-3\">\n          <div className=\"flex-1 min-w-0\">\n            <h3 className=\"font-semibold text-foreground-100\">Design System Audit</h3>\n            <p className=\"text-xs text-foreground-400 mt-1\">Component documentation</p>\n          </div>\n          <Badge variant=\"info\" size=\"sm\">In Progress</Badge>\n        </Card.Header>\n\n        {/* Body: Task Details */}\n        <Card.Body className=\"space-y-4\">\n          {/* Description */}\n          <p className=\"text-sm text-foreground-300\">\n            Complete comprehensive audit of existing design system components and document best practices.\n          </p>\n\n          {/* Progress Bar using UI Lab Progress component */}\n          <Progress\n            value={65}\n            max={100}\n            label=\"Progress\"\n            showValue\n            size=\"sm\"\n            variant=\"default\"\n          />\n\n          {/* Team & Metadata */}\n          <div className=\"grid grid-cols-2 gap-3 pt-2 border-t border-background-800\">\n            <div>\n              <p className=\"text-xs text-foreground-400mb-2\">Assigned To</p>\n              <div className=\"flex -space-x-2\">\n                <div className=\"w-6 h-6 rounded-full bg-background-700 border border-background-800 flex items-center justify-center text-[10px] font-semibold text-foreground-300\">\n                  SA\n                </div>\n                <div className=\"w-6 h-6 rounded-full bg-background-700 border border-background-800 flex items-center justify-center text-[10px] font-semibold text-foreground-300\">\n                  JD\n                </div>\n              </div>\n            </div>\n            <div>\n              <p className=\"text-xs text-foreground-400mb-2\">Due Date</p>\n              <div className=\"flex items-center gap-1.5\">\n                <Calendar className=\"w-4 h-4 text-foreground-400\" />\n                <span className=\"text-sm font-medium text-foreground-300\">Mar 15</span>\n              </div>\n            </div>\n          </div>\n        </Card.Body>\n\n        {/* Footer: Actions */}\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group>\n            <Group.Button variant=\"ghost\" size=\"md\" className=\"flex-1\">\n              View Details\n            </Group.Button>\n            <Group.Button variant=\"primary\" size=\"md\" className=\"flex-1 gap-2\">\n              <CheckCircle2 className=\"w-4 h-4\" />\n              Complete\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
      },
      {
        "title": "Data Summary Card",
        "description": "A dashboard card displaying key metrics with header, summary values, and comparison info. Shows how cards present quantitative data with visual hierarchy.",
        "code": "import { Card, Badge, Group, Button } from 'ui-lab-components';\nimport { TrendingUp, MoreVertical } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-sm\">\n        {/* Header with Title and Actions */}\n        <Card.Header className=\"flex items-center justify-between\">\n          <div>\n            <h3 className=\"font-semibold text-foreground-100\">Revenue</h3>\n            <p className=\"text-xs text-foreground-400 mt-1\">Last 30 days</p>\n          </div>\n          <Button variant=\"ghost\" size=\"sm\" className=\"h-8 w-8 p-0\">\n            <MoreVertical className=\"w-4 h-4\" />\n          </Button>\n        </Card.Header>\n\n        {/* Body: Primary Metric */}\n        <Card.Body className=\"space-y-4\">\n          <div>\n            <p className=\"text-xs text-foreground-400mb-1\">Total Revenue</p>\n            <p className=\"text-3xl font-bold text-foreground-100\">$24,580</p>\n          </div>\n\n          {/* Secondary Metrics Grid */}\n          <div className=\"grid grid-cols-3 gap-3 pt-3 border-t border-background-700\">\n            <div>\n              <p className=\"text-xs text-foreground-400mb-2\">Orders</p>\n              <p className=\"text-lg font-semibold text-foreground-100\">342</p>\n            </div>\n            <div>\n              <p className=\"text-xs text-foreground-400mb-2\">Average</p>\n              <p className=\"text-lg font-semibold text-foreground-100\">$72</p>\n            </div>\n            <div>\n              <p className=\"text-xs text-foreground-400mb-2\">Growth</p>\n              <div className=\"flex items-center gap-1\">\n                <TrendingUp className=\"w-4 h-4 text-green-500\" />\n                <p className=\"text-lg font-semibold text-green-500\">12%</p>\n              </div>\n            </div>\n          </div>\n\n          {/* Status Badge */}\n          <div className=\"flex gap-2 flex-wrap pt-2\">\n            <Badge variant=\"success\" size=\"sm\">On Track</Badge>\n            <Badge variant=\"info\" size=\"sm\">Updated Today</Badge>\n          </div>\n        </Card.Body>\n\n        {/* Footer: Actions */}\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group>\n            <Group.Button variant=\"ghost\" size=\"md\" className=\"flex-1\">\n              Export\n            </Group.Button>\n            <Group.Button variant=\"outline\" size=\"md\" className=\"flex-1\">\n              View Details\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
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
        "description": "Size of the checkbox",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label text or element displayed next to the checkbox"
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false,
        "description": "Helper text shown below the checkbox"
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to style the helper text as an error"
      },
      {
        "name": "isIndeterminate",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to show an indeterminate (partial selection) state"
      }
    ],
    "examples": [
      {
        "title": "Basic Checkbox",
        "description": "A simple checkbox with a label. Use this as the standard checkbox input in your forms.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Checkbox } from 'ui-lab-components';\n\nexport default function Example() {\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Checkbox\n      checked={checked}\n      onChange={(e) => setChecked(e.target.checked)}\n      label=\"Accept terms and conditions\"\n    />\n  );\n}"
      },
      {
        "title": "Checkbox Group with Descriptions",
        "description": "Multiple checkboxes grouped together as a settings panel. Each checkbox includes a label and helper text for context.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Checkbox, Card, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [notifications, setNotifications] = React.useState({\n    email: true,\n    push: false,\n    sms: false,\n    marketing: false,\n  });\n\n  const handleChange = (key: keyof typeof notifications) => (e: React.ChangeEvent<HTMLInputElement>) => {\n    setNotifications(prev => ({ ...prev, [key]: e.target.checked }));\n  };\n\n  return (\n    <Card>\n      <Card.Header>\n        <h3 className=\"text-lg font-medium text-foreground-100\">Notification Preferences</h3>\n        <p className=\"text-sm text-foreground-400\">Choose how you want to be notified.</p>\n      </Card.Header>\n      <Card.Body>\n        <Flex direction=\"column\" gap=\"lg\">\n          <Checkbox\n            checked={notifications.email}\n            onChange={handleChange('email')}\n            label=\"Email notifications\"\n            helperText=\"Receive updates about your account activity via email.\"\n          />\n          <Checkbox\n            checked={notifications.push}\n            onChange={handleChange('push')}\n            label=\"Push notifications\"\n            helperText=\"Get instant alerts on your device for important updates.\"\n          />\n          <Checkbox\n            checked={notifications.sms}\n            onChange={handleChange('sms')}\n            label=\"SMS notifications\"\n            helperText=\"Receive text messages for critical alerts and reminders.\"\n          />\n          <Checkbox\n            checked={notifications.marketing}\n            onChange={handleChange('marketing')}\n            label=\"Marketing emails\"\n            helperText=\"Stay informed about new features, tips, and special offers.\"\n          />\n        </Flex>\n      </Card.Body>\n    </Card>\n  );\n}"
      }
    ]
  },
  "code": {
    "props": [
      {
        "name": "language",
        "type": "string",
        "required": false,
        "defaultValue": "ts",
        "description": "Programming language for syntax highlighting"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class names"
      },
      {
        "name": "filename",
        "type": "string",
        "required": false,
        "description": "Filename displayed in the header bar"
      },
      {
        "name": "heading",
        "type": "string",
        "required": false,
        "description": "Custom heading text displayed in the header bar instead of filename"
      },
      {
        "name": "theme",
        "type": "string | { light: string; dark: string; }",
        "required": false,
        "description": "Shiki theme name or separate light/dark theme names"
      },
      {
        "name": "colorScheme",
        "type": "light | dark | system",
        "required": false,
        "defaultValue": "system",
        "description": "Color scheme used for theme selection; 'system' follows the page data-theme attribute",
        "enumValues": [
          "light",
          "dark",
          "system"
        ]
      },
      {
        "name": "preHighlightedLight",
        "type": "string",
        "required": false,
        "description": "Pre-highlighted HTML string for light mode to skip client-side Shiki processing"
      },
      {
        "name": "preHighlightedDark",
        "type": "string",
        "required": false,
        "description": "Pre-highlighted HTML string for dark mode to skip client-side Shiki processing"
      }
    ],
    "examples": []
  },
  "color": {
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Controlled color value as a CSS color string"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "defaultValue": "#000000",
        "description": "Initial color value for uncontrolled usage"
      },
      {
        "name": "onChange",
        "type": "((color: string) => void)",
        "required": false,
        "description": "Called continuously while the user drags the color picker"
      },
      {
        "name": "onChangeComplete",
        "type": "((color: string) => void)",
        "required": false,
        "description": "Called once when the user finishes a drag interaction"
      },
      {
        "name": "showOpacity",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to show the opacity/alpha slider"
      },
      {
        "name": "showPreview",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to show a color preview swatch next to the input"
      },
      {
        "name": "format",
        "type": "hex | rgb",
        "required": false,
        "defaultValue": "hex",
        "description": "Output format of the color value string",
        "enumValues": [
          "hex",
          "rgb"
        ]
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the color picker is disabled"
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "description": "Size of the color picker",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the root element"
      }
    ],
    "subComponents": {
      "ColorCanvas": {
        "description": "2D saturation/lightness gradient canvas for picking color values",
        "props": [
          {
            "name": "hue",
            "type": "number",
            "required": true,
            "description": "Current hue value (0–360) used to tint the canvas gradient"
          },
          {
            "name": "saturation",
            "type": "number",
            "required": true,
            "description": "Current saturation value (0–100) determining the horizontal position of the pointer"
          },
          {
            "name": "brightness",
            "type": "number",
            "required": true,
            "description": "Current brightness value (0–100) determining the vertical position of the pointer"
          },
          {
            "name": "onChange",
            "type": "((saturation: number, brightness: number) => void)",
            "required": false,
            "description": "Called when the user drags the canvas pointer with updated saturation and brightness values"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "description": "Disables pointer interaction on the canvas"
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "defaultValue": "md",
            "description": "Size of the canvas",
            "enumValues": [
              "sm",
              "md",
              "lg"
            ]
          }
        ]
      },
      "ColorHueSlider": {
        "description": "Horizontal slider for selecting the hue component (0–360°)",
        "props": [
          {
            "name": "value",
            "type": "number",
            "required": true,
            "description": "Current hue value (0–360)"
          },
          {
            "name": "onChange",
            "type": "((hue: number) => void)",
            "required": false,
            "description": "Called when the user drags the hue slider with the new hue value"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "description": "Disables pointer interaction on the slider"
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "defaultValue": "md",
            "description": "Size of the hue slider",
            "enumValues": [
              "sm",
              "md",
              "lg"
            ]
          }
        ]
      },
      "ColorInput": {
        "description": "Text input for entering a color value directly",
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": true,
            "description": "Current color value string displayed in the text input"
          },
          {
            "name": "format",
            "type": "hex | rgb",
            "required": true,
            "description": "Active color format controlling the input placeholder and value representation",
            "enumValues": [
              "hex",
              "rgb"
            ]
          },
          {
            "name": "onFormatChange",
            "type": "((format: \"hex\" | \"rgb\") => void)",
            "required": false,
            "description": "Called when the user selects a different color format from the dropdown"
          },
          {
            "name": "onValueChange",
            "type": "((value: string) => void)",
            "required": false,
            "description": "Called when the user types a valid color string into the input"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "description": "Disables the text input and format selector"
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "defaultValue": "md",
            "description": "Size of the input group",
            "enumValues": [
              "sm",
              "md",
              "lg"
            ]
          },
          {
            "name": "showPreview",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether to show a color preview swatch beside the input"
          },
          {
            "name": "previewColor",
            "type": "string",
            "required": false,
            "description": "RGB color string used to fill the preview swatch"
          }
        ]
      },
      "ColorOpacitySlider": {
        "description": "Slider for adjusting the alpha/opacity of the selected color",
        "props": [
          {
            "name": "value",
            "type": "number",
            "required": true,
            "description": "Current opacity value (0–1)"
          },
          {
            "name": "color",
            "type": "string",
            "required": true,
            "description": "Base RGB color string used to render the transparency gradient on the slider track"
          },
          {
            "name": "onChange",
            "type": "((opacity: number) => void)",
            "required": false,
            "description": "Called when the user drags the opacity slider with the new opacity value (0–1)"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "description": "Disables pointer interaction on the slider"
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "defaultValue": "md",
            "description": "Size of the opacity slider",
            "enumValues": [
              "sm",
              "md",
              "lg"
            ]
          }
        ]
      },
      "ColorRecentColors": {
        "description": "Palette of recently used colors for quick re-selection",
        "props": [
          {
            "name": "onSelect",
            "type": "((color: string) => void)",
            "required": false,
            "description": "Called when the user clicks a recent color swatch"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "description": "Disables all swatch buttons"
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "defaultValue": "md",
            "description": "Size of the recent color swatches",
            "enumValues": [
              "sm",
              "md",
              "lg"
            ]
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Color",
        "description": "A simple color component with default configuration showing hex format.",
        "code": "import React, { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [color, setColor] = useState('#FF6B6B');\n\n  return (\n    <div className=\"p-4 space-y-4\">\n      <div>\n        <p className=\"text-sm text-foreground-300 mb-3\">Selected color: <code className=\"text-accent-500 font-mono\">{color}</code></p>\n        <Color\n          value={color}\n          onChange={setColor}\n          format=\"hex\"\n          defaultValue=\"#FF6B6B\"\n        />\n      </div>\n    </div>\n  );\n}"
      },
      {
        "title": "Opacity Slider",
        "description": "Color picker with opacity/alpha slider enabled for transparent color selection.",
        "code": "import React, { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [color, setColor] = useState('rgba(106, 90, 205, 0.75)');\n\n  return (\n    <div className=\"p-4 space-y-4\">\n      <div>\n        <p className=\"text-sm text-foreground-300 mb-3\">Selected color: <code className=\"text-accent-500 font-mono\">{color}</code></p>\n        <Color\n          value={color}\n          onChange={setColor}\n          showOpacity\n          format=\"rgb\"\n          defaultValue=\"rgba(106, 90, 205, 0.75)\"\n        />\n      </div>\n    </div>\n  );\n}"
      },
      {
        "title": "Format Switching",
        "description": "Color picker with format toggle between hex and RGB to copy colors in different formats.",
        "code": "import React, { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [color, setColor] = useState('#3B82F6');\n  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');\n\n  const handleFormatChange = () => {\n    setFormat(format === 'hex' ? 'rgb' : 'hex');\n  };\n\n  return (\n    <div className=\"p-4 space-y-4\">\n      <div>\n        <div className=\"flex items-center justify-between mb-3\">\n          <p className=\"text-sm text-foreground-300\">\n            Selected color: <code className=\"text-accent-500 font-mono\">{color}</code>\n          </p>\n          <button\n            onClick={handleFormatChange}\n            className=\"px-3 py-1 text-xs bg-foreground-400 hover:bg-foreground-400 text-foreground-100 rounded transition-colors\"\n          >\n            Format: {format.toUpperCase()}\n          </button>\n        </div>\n        <Color\n          value={color}\n          onChange={setColor}\n          format={format}\n          defaultValue=\"#3B82F6\"\n        />\n      </div>\n      <div className=\"mt-4 p-3 bg-foreground-400 rounded border border-foreground-400\">\n        <p className=\"text-xs text-foreground-300\">\n          <strong>Tip:</strong> Click the format button to switch between hex and RGB output formats.\n          This is useful when you need to copy colors in different formats for different contexts.\n        </p>\n      </div>\n    </div>\n  );\n}"
      }
    ]
  },
  "command": {
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Controlled search text value"
      },
      {
        "name": "onChange",
        "type": "((value: string) => void)",
        "required": false,
        "description": "Called when the search text changes"
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "defaultValue": "Search...",
        "description": "Placeholder text for the search input"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the search input"
      }
    ],
    "subComponents": {
      "Command.List": {
        "description": "Scrollable container that renders the filtered command items",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "description": "Child elements rendered inside the list"
          },
          {
            "name": "emptyMessage",
            "type": "string",
            "required": false,
            "defaultValue": "No items found.",
            "description": "Message shown when no items match the search"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the list container"
          }
        ]
      },
      "Command.Category": {
        "description": "Labeled section grouping related commands",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "description": "Child elements rendered inside the category header"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the category"
          }
        ]
      },
      "Command.Footer": {
        "description": "Fixed bottom bar in the command palette for hints or actions",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "description": "Child elements rendered inside the footer"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class applied to the footer"
          }
        ]
      },
      "Command.Groups": {
        "description": "Wrapper that renders multiple Command.Category sections",
        "props": [
          {
            "name": "renderCategory",
            "type": "((category: string) => ReactNode)",
            "required": false,
            "description": "Renders a category header for the given category name"
          },
          {
            "name": "renderItem",
            "type": "(command: CommandItem) => ReactNode",
            "required": true,
            "description": "Renders a single command item row"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the groups container"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Command Palette",
        "description": "A searchable command palette with keyboard shortcuts. Use Cmd+K (or Ctrl+K) to open.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Command, Button, Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  const [open, setOpen] = React.useState(false);\n\n  const commands = [\n    {\n      id: 'search',\n      label: 'Search',\n      description: 'Search documents',\n      shortcut: '⌘F',\n      action: () => console.log('Search'),\n    },\n    {\n      id: 'create',\n      label: 'Create new',\n      description: 'Create a new document',\n      shortcut: '⌘N',\n      action: () => console.log('Create'),\n    },\n    {\n      id: 'settings',\n      label: 'Settings',\n      description: 'Open application settings',\n      shortcut: '⌘,',\n      action: () => console.log('Settings'),\n    },\n  ];\n\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>\n        Open Palette (⌘K)\n      </Button>\n      <Command\n        open={open}\n        onOpenChange={setOpen}\n        items={commands}\n      >\n        <Command.SearchInput placeholder=\"Search commands...\" />\n        <Command.List>\n          <Command.Groups\n            renderCategory={(category) =>\n              category ? <Command.Category>{category}</Command.Category> : null\n            }\n            renderItem={(cmd) => (\n              <Command.Item\n                key={cmd.id}\n                value={cmd.id}\n                textValue={cmd.label}\n                action={cmd.action}\n              >\n                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>\n                  <div>\n                    <div style={{ fontWeight: 500 }}>{cmd.label}</div>\n                    {cmd.description && (\n                      <div style={{ fontSize: '0.875em', opacity: 0.7 }}>\n                        {cmd.description}\n                      </div>\n                    )}\n                  </div>\n                  {cmd.shortcut && (\n                    <Badge>{cmd.shortcut}</Badge>\n                  )}\n                </div>\n              </Command.Item>\n            )}\n          />\n        </Command.List>\n      </Command>\n    </>\n  );\n}"
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
        "description": "Display mode: inline expands in place, dialog shows a modal, auto chooses based on severity",
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
        "description": "Severity level that affects styling and default mode selection",
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
        "required": true,
        "description": "Called when the user confirms the action"
      },
      {
        "name": "onCancel",
        "type": "(() => void)",
        "required": false,
        "description": "Called when the user cancels the action"
      },
      {
        "name": "triggerLabel",
        "type": "string",
        "required": true,
        "description": "Label for the trigger button"
      },
      {
        "name": "confirmLabel",
        "type": "string",
        "required": false,
        "defaultValue": "Confirm",
        "description": "Label for the confirm button"
      },
      {
        "name": "cancelLabel",
        "type": "string",
        "required": false,
        "defaultValue": "Cancel",
        "description": "Label for the cancel button"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the trigger button is disabled"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title shown in dialog mode"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Description text shown during the confirmation step"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Custom icon shown in the confirmation header"
      },
      {
        "name": "destructiveActionWarning",
        "type": "string",
        "required": false,
        "description": "Warning message displayed in a colored box before confirming"
      },
      {
        "name": "countdownSeconds",
        "type": "number",
        "required": false,
        "description": "Seconds the user must wait before the confirm button becomes active"
      },
      {
        "name": "requiresReason",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the user must type confirmationText to enable the confirm button"
      },
      {
        "name": "confirmationText",
        "type": "string",
        "required": false,
        "description": "Text the user must type to confirm when requiresReason is true"
      },
      {
        "name": "autoResetAfter",
        "type": "number",
        "required": false,
        "description": "Milliseconds after which the inline confirmation auto-resets to idle state"
      }
    ]
  },
  "date": {
    "props": [
      {
        "name": "value",
        "type": "Date | null",
        "required": false,
        "description": "Controlled selected date"
      },
      {
        "name": "onChange",
        "type": "((date: Date) => void)",
        "required": false,
        "description": "Called when the user selects a date"
      },
      {
        "name": "disabled",
        "type": "((date: Date) => boolean)",
        "required": false,
        "defaultValue": "() => false",
        "description": "Function returning true for dates that should be unselectable"
      },
      {
        "name": "minDate",
        "type": "Date",
        "required": false,
        "description": "Earliest selectable date"
      },
      {
        "name": "maxDate",
        "type": "Date",
        "required": false,
        "description": "Latest selectable date"
      },
      {
        "name": "defaultMonth",
        "type": "Date",
        "required": false,
        "description": "Month shown initially when no date is selected"
      }
    ],
    "subComponents": {
      "Date.DayHeaders": {
        "description": "Row of weekday abbreviation labels above the calendar grid",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the day headers row"
          }
        ]
      },
      "Date.Header": {
        "description": "Navigation header with month/year display and prev/next controls",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the header"
          }
        ]
      },
      "Date.Grid": {
        "description": "The 7-column calendar grid containing date cells",
        "props": [
          {
            "name": "grid",
            "type": "Date[][]",
            "required": true,
            "description": "Calendar grid rows, each containing 7 Date objects"
          }
        ]
      },
      "Date.Day": {
        "description": "Individual date cell in the calendar grid",
        "props": [
          {
            "name": "date",
            "type": "Date",
            "required": true,
            "description": "The date this cell represents"
          }
        ]
      }
    },
    "examples": []
  },
  "divider": {
    "props": [
      {
        "name": "variant",
        "type": "solid | dashed | dotted",
        "required": false,
        "defaultValue": "solid",
        "description": "Controls the line style of the divider",
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
        "description": "Controls the axis the divider spans",
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
        "description": "Size of the divider thickness",
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
        "description": "Controls the margin around the divider",
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
        "code": "import { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"space-y-6 w-full\">\n      <div className=\"space-y-2\">\n        <span className=\"text-xs text-foreground-400\">Solid</span>\n        <Divider variant=\"solid\" />\n      </div>\n      <div className=\"space-y-2\">\n        <span className=\"text-xs text-foreground-400\">Dashed</span>\n        <Divider variant=\"dashed\" />\n      </div>\n      <div className=\"space-y-2\">\n        <span className=\"text-xs text-foreground-400\">Dotted</span>\n        <Divider variant=\"dotted\" />\n      </div>\n    </div>\n  );\n}"
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
        "description": "The easing function key to visualize",
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
        "description": "Size of the SVG preview graphic",
        "enumValues": [
          "sm",
          "md"
        ]
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "defaultValue": "",
        "description": "Additional CSS class names"
      }
    ]
  },
  "expand": {
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Header text or element for the trigger button in preset (non-compound) mode"
      },
      {
        "name": "isExpanded",
        "type": "boolean",
        "required": false,
        "description": "Controlled expanded state"
      },
      {
        "name": "defaultExpanded",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Initial expanded state for uncontrolled usage"
      },
      {
        "name": "onExpandedChange",
        "type": "((isExpanded: boolean) => void)",
        "required": false,
        "description": "Called when the expanded state changes"
      },
      {
        "name": "onChange",
        "type": "((isExpanded: boolean) => void)",
        "required": false,
        "description": "Alias for onExpandedChange"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the expand is disabled"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Compound sub-components or content nodes"
      },
      {
        "name": "triggerClassName",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the trigger button"
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the content area"
      }
    ],
    "subComponents": {
      "Expand.Icon": {
        "description": "Animated chevron icon that rotates when the section is open",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "description": "Custom icon element; defaults to a chevron"
          }
        ]
      },
      "Expand.Trigger": {
        "description": "Clickable button that toggles the expand/collapse state",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": false,
            "description": "Label or content of the trigger button"
          },
          {
            "name": "title",
            "type": "ReactNode",
            "required": false,
            "description": "ReactNode label rendered in the title span (overrides HTML title tooltip)"
          }
        ]
      },
      "Expand.Content": {
        "description": "Collapsible content area revealed when expanded",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": true,
            "description": "Content shown when the expand is open"
          },
          {
            "name": "from",
            "type": "below | above | left | right",
            "required": false,
            "description": "Direction the content reveals from the trigger",
            "enumValues": [
              "below",
              "above",
              "left",
              "right"
            ]
          }
        ]
      },
      "Expand.Divider": {
        "description": "Separator line between expand sections",
        "props": [
          {
            "name": "variant",
            "type": "solid | dashed | dotted",
            "required": false,
            "description": "Controls the line style of the divider",
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
            "description": "Controls the axis the divider spans",
            "enumValues": [
              "horizontal",
              "vertical"
            ]
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "description": "Size of the divider thickness",
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
            "defaultValue": "none",
            "description": "Controls the margin around the divider",
            "enumValues": [
              "sm",
              "md",
              "lg",
              "none"
            ]
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Expand",
        "description": "An expandable/collapsible disclosure component. Use this to show and hide content sections while maintaining accessibility and keyboard support.",
        "code": "import React from 'react';\nimport { Expand } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Expand title=\"What is an Expand component?\">\n      <p className=\"text-foreground-300\">\n        An Expand component is a disclosure widget that expands and collapses content.\n        It's built with React Aria for full accessibility support.\n      </p>\n    </Expand>\n  );\n}"
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
        "description": "Direction of the flex container",
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
        "description": "Whether items wrap to the next line when they overflow",
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
        "description": "Gap between flex items",
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
        "description": "Alignment of items along the main axis",
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
        "description": "Alignment of items along the cross axis",
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
        "defaultValue": "false",
        "description": "Wraps the flex container in a container query parent for breakpoint-aware responsiveness"
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
  "frame": {
    "props": [
      {
        "name": "path",
        "type": "string",
        "required": false,
        "description": "SVG path data for the notch or tab shape cut into the frame border"
      },
      {
        "name": "pathWidth",
        "type": "number",
        "required": false,
        "defaultValue": "0",
        "description": "Width of the path shape in pixels"
      },
      {
        "name": "side",
        "type": "top | bottom | left | right",
        "required": false,
        "defaultValue": "top",
        "description": "Which side of the frame the path shape appears on",
        "enumValues": [
          "top",
          "bottom",
          "left",
          "right"
        ]
      },
      {
        "name": "cornerRadius",
        "type": "number",
        "required": false,
        "defaultValue": "24",
        "description": "Corner radius of the frame border in pixels"
      },
      {
        "name": "fill",
        "type": "string",
        "required": false,
        "description": "Fill color applied behind the frame content area"
      },
      {
        "name": "shapeMode",
        "type": "indent | extend",
        "required": false,
        "defaultValue": "indent",
        "description": "Whether the path shape indents into the frame or extends out from it",
        "enumValues": [
          "indent",
          "extend"
        ]
      },
      {
        "name": "borderWidth",
        "type": "number",
        "required": false,
        "description": "Stroke width of the frame border in pixels"
      },
      {
        "name": "borderColor",
        "type": "string",
        "required": false,
        "defaultValue": "var(--background-700)",
        "description": "Color of the frame border stroke"
      },
      {
        "name": "variant",
        "type": "\"default\" | \"accent\" | null",
        "required": false,
        "description": "Visual color style of the frame"
      },
      {
        "name": "padding",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\" | null",
        "required": false,
        "description": "Internal padding preset"
      }
    ],
    "examples": [
      {
        "title": "Featured Card Frame",
        "description": "A card frame with a curved top cutout for featured images or hero content.",
        "code": "import { Frame } from 'ui-lab-components';\n\n// The SVG path definition for the curve\nconst LIQUID_WIDTH = 180;\nconst LIQUID_PATH = \"M 0 0 C 36 0 36 44 90 44 C 144 44 144 0 180 0\";\n\nconst DefaultFrame = () => {\n  return (\n    <div className=\"flex items-center justify-center min-h-[400px] bg-background-950\">\n      <div className=\"relative w-full max-w-sm group\">\n\n        {/* 1. The Frame Component with the Path Prop */}\n        <Frame\n          path={LIQUID_PATH}\n          pathWidth={LIQUID_WIDTH}\n          className=\"text-background-700  bg-background-700/20 shadow-2xl backdrop-blur-sm\"\n          style={{ color: \"var(--background-700)\" }}\n        >\n          {/* Minimal Content */}\n          <div className=\"w-100 h-50 flex flex-col h-full p-17 text-center\">\n          </div>\n        </Frame>\n      </div>\n    </div>\n  );\n};\n\nexport default DefaultFrame;"
      },
      {
        "title": "Tooltip Frame",
        "description": "A frame with a pointer tail on the bottom, typical for tooltips or popovers.",
        "code": "import { Frame } from 'ui-lab-components';\n\nconst TAIL_WIDTH = 48;\nconst TAIL_PATH = \"M 0 0 C 8 0 20 -16 24 -16 C 28 -16 36 0 48 0\";\n\nconst Example2 = () => {\n  return (\n    <div className=\"flex flex-col gap-12 p-12 items-center justify-center min-h-[400px] bg-background-950\">\n      <Frame\n        side=\"bottom\"\n        shapeMode=\"extend\"\n        path={TAIL_PATH}\n        pathWidth={TAIL_WIDTH}\n        fill=\"var(--color-background-900)\"\n        // style={{ color: \"var(--background-700)\" }}\n        className=\"max-w-sm border-background-700\"\n        padding=\"large\"\n      >\n        <div className=\"text-center\">\n          <h3 className=\"font-semibold text-lg mb-2 text-foreground-50\">Did you know?</h3>\n          <p className=\"text-foreground-400 text-sm leading-relaxed\">\n            You can customize the frame orientation using the <code className=\"bg-background-800 px-1 rounded\">side</code> prop.\n            This frame uses <code className=\"text-accent-500\">side=\"bottom\"</code> to create a tooltip tail.\n          </p>\n        </div>\n      </Frame>\n    </div>\n  );\n};\n\nexport default Example2;"
      },
      {
        "title": "Sidebar Tab Frame",
        "description": "A frame with a tab extending from the side, perfect for active navigation states.",
        "code": "import { Frame } from 'ui-lab-components';\n\nconst TAB_WIDTH = 120;\nconst TAB_PATH = \"M 0 0 C 20 0 20 -24 40 -24 L 80 -24 C 100 -24 100 0 120 0\";\n\nconst Example3 = () => {\n  return (\n    <div className=\"flex flex-row gap-0 p-12 items-center justify-center bg-background-950 min-h-[400px]\">\n      {/* Mock Sidebar */}\n      <div className=\"flex flex-col items-end justify-center space-y-8 pr-6 border-background-800/50 h-64\">\n        <div className=\"text-foreground-400 font-medium cursor-pointer hover:text-foreground-400 transition-colors\">Dashboard</div>\n        <div className=\"text-accent-500 font-bold cursor-default\">Settings</div>\n        <div className=\"text-foreground-400 font-medium cursor-pointer hover:text-foreground-400 transition-colors\">Profile</div>\n      </div>\n\n      {/* Frame content - visually connecting to \"Settings\" */}\n      <div className=\"-ml-[1.5px]\"> {/* Overlap border slightly to merge visual connection */}\n        <Frame\n          side=\"left\"\n          shapeMode=\"extend\"\n          path={TAB_PATH}\n          pathWidth={TAB_WIDTH}\n          fill=\"var(--color-background-900)\"\n          style={{ color: \"var(--background-700)\" }}\n          className=\"w-80 h-64\"\n          padding=\"large\"\n          cornerRadius={16}\n        >\n          <div className=\"h-full flex flex-col justify-center\">\n            <h2 className=\"text-2xl font-bold text-foreground-50 mb-4\">Settings</h2>\n            <div className=\"space-y-3\">\n              <div className=\"h-2 w-2/3 bg-background-800 rounded\"></div>\n              <div className=\"h-2 w-1/2 bg-background-800 rounded\"></div>\n              <div className=\"h-2 w-3/4 bg-background-800 rounded\"></div>\n            </div>\n          </div>\n        </Frame>\n      </div>\n    </div>\n  );\n};\n\nexport default Example3;"
      }
    ]
  },
  "gallery": {
    "props": [
      {
        "name": "columns",
        "type": "number | GridColumns | ResponsiveColumns",
        "required": false,
        "defaultValue": "3",
        "description": "Number of columns in the gallery grid"
      },
      {
        "name": "gap",
        "type": "string | number",
        "required": false,
        "defaultValue": "md",
        "description": "Gap between gallery items"
      },
      {
        "name": "rows",
        "type": "1 | 2 | 3 | 4 | 5 | 6 | auto",
        "required": false,
        "description": "Number of rows in the gallery grid",
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
        "name": "containerQueryResponsive",
        "type": "boolean",
        "required": false,
        "description": "Whether to enable container-query-based responsive columns"
      }
    ],
    "subComponents": {
      "Gallery.Item": {
        "description": "A single media or content tile in the gallery grid",
        "props": [
          {
            "name": "href",
            "type": "string",
            "required": false,
            "description": "URL the item links to"
          },
          {
            "name": "onPress",
            "type": "((href?: string) => void)",
            "required": false,
            "description": "Called when the item is pressed"
          },
          {
            "name": "columnSpan",
            "type": "number",
            "required": false,
            "description": "Number of columns this item spans"
          },
          {
            "name": "rowSpan",
            "type": "number",
            "required": false,
            "description": "Number of rows this item spans"
          },
          {
            "name": "orientation",
            "type": "vertical | horizontal",
            "required": false,
            "defaultValue": "vertical",
            "description": "Controls the item's layout orientation",
            "enumValues": [
              "vertical",
              "horizontal"
            ]
          }
        ]
      },
      "Gallery.View": {
        "description": "Expanded full-screen view overlay for a selected gallery item",
        "props": [
          {
            "name": "aspectRatio",
            "type": "string",
            "required": false,
            "defaultValue": "16/9",
            "description": "Aspect ratio of the view area (e.g. \"16/9\")"
          }
        ]
      },
      "Gallery.Body": {
        "description": "Container for the gallery item's visible content",
        "props": []
      }
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
        "type": "GridColumns | ResponsiveValue<GridColumns>",
        "required": false,
        "defaultValue": "3",
        "description": "Number of grid columns, or responsive object per breakpoint"
      },
      {
        "name": "rows",
        "type": "GridRows | ResponsiveValue<GridRows>",
        "required": false,
        "defaultValue": "auto",
        "description": "Number of grid rows, or responsive object per breakpoint"
      },
      {
        "name": "gap",
        "type": "GridGap | ResponsiveValue<GridGap>",
        "required": false,
        "defaultValue": "md",
        "description": "Gap between all grid cells, or responsive object per breakpoint"
      },
      {
        "name": "rowGap",
        "type": "xs | sm | md | lg | xl",
        "required": false,
        "description": "Override gap between rows only",
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
        "description": "Override gap between columns only",
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
        "description": "Horizontal alignment of items within their cells",
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
        "description": "Vertical alignment of items within their cells",
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
        "description": "Horizontal distribution of the grid within its container",
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
        "description": "Vertical distribution of the grid rows within its container",
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
        "description": "Direction items are auto-placed when no explicit placement is set",
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
        "defaultValue": "false",
        "description": "Wraps the grid in a container query parent for breakpoint-aware responsiveness"
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
        "description": "Controls the axis that children are arranged along",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "spacing",
        "type": "none | sm",
        "required": false,
        "defaultValue": "none",
        "description": "Controls the gap between group items",
        "enumValues": [
          "none",
          "sm"
        ]
      },
      {
        "name": "variant",
        "type": "primary | secondary | outline | ghost",
        "required": false,
        "defaultValue": "primary",
        "description": "Controls the shared visual style applied to group items",
        "enumValues": [
          "primary",
          "secondary",
          "outline",
          "ghost"
        ]
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether all items in the group are non-interactive"
      }
    ],
    "subComponents": {
      "Group.Button": {
        "description": "Button styled to merge seamlessly with adjacent group items",
        "props": [
          {
            "name": "active",
            "type": "boolean",
            "required": false,
            "description": "Whether this button is in an active/pressed state"
          },
          {
            "name": "variant",
            "type": "primary | secondary | outline | ghost | default | danger",
            "required": false,
            "defaultValue": "primary",
            "description": "Visual style of the button",
            "enumValues": [
              "primary",
              "secondary",
              "outline",
              "ghost",
              "default",
              "danger"
            ]
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "description": "Size of the button",
            "enumValues": [
              "sm",
              "md",
              "lg"
            ]
          },
          {
            "name": "isDisabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Disables interaction and applies disabled styling"
          },
          {
            "name": "onPress",
            "type": "((e: { target: EventTarget | null; }) => void)",
            "required": false,
            "description": "React Aria press handler — preferred over onClick for accessibility"
          },
          {
            "name": "icon",
            "type": "{ left?: ReactNode; right?: ReactNode; }",
            "required": false,
            "description": "Icon slots rendered before (left) or after (right) the button label"
          },
          {
            "name": "href",
            "type": "string",
            "required": false,
            "description": "Renders the button as an anchor element when provided"
          }
        ]
      },
      "Group.Input": {
        "description": "Input field integrated into the button group",
        "props": [
          {
            "name": "variant",
            "type": "ghost | default",
            "required": false,
            "defaultValue": "primary",
            "description": "Controls the visual style of the input",
            "enumValues": [
              "ghost",
              "default"
            ]
          },
          {
            "name": "error",
            "type": "boolean",
            "required": false,
            "description": "Whether the input is in an error state"
          },
          {
            "name": "prefixIcon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon displayed before the input value"
          },
          {
            "name": "suffixIcon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon displayed after the input value"
          }
        ]
      },
      "Group.InputWrapper": {
        "description": "Input variant that preserves Input styling within the group",
        "props": [
          {
            "name": "variant",
            "type": "ghost | default",
            "required": false,
            "defaultValue": "primary",
            "description": "Controls the visual style of the input",
            "enumValues": [
              "ghost",
              "default"
            ]
          },
          {
            "name": "error",
            "type": "boolean",
            "required": false,
            "description": "Whether the input is in an error state"
          },
          {
            "name": "prefixIcon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon displayed before the input value"
          },
          {
            "name": "suffixIcon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon displayed after the input value"
          }
        ]
      },
      "Group.Select": {
        "description": "Select dropdown integrated into the button group",
        "props": [
          {
            "name": "mode",
            "type": "multiple | single",
            "required": false,
            "description": "Selection mode: \"single\" for one item, \"multiple\" for multi-item selection",
            "enumValues": [
              "multiple",
              "single"
            ]
          },
          {
            "name": "items",
            "type": "any[]",
            "required": false,
            "description": "External items array — used when items are provided as data rather than JSX"
          },
          {
            "name": "selectedKey",
            "type": "Key | null",
            "required": false,
            "description": "Controlled selected key for single-select mode"
          },
          {
            "name": "defaultSelectedKey",
            "type": "Key | null",
            "required": false,
            "description": "Default selected key for uncontrolled single-select"
          },
          {
            "name": "selectedKeys",
            "type": "Key[]",
            "required": false,
            "description": "Controlled selected keys for multi-select mode"
          },
          {
            "name": "defaultSelectedKeys",
            "type": "Key[]",
            "required": false,
            "description": "Default selected keys for uncontrolled multi-select"
          },
          {
            "name": "defaultValue",
            "type": "string | null",
            "required": false,
            "description": "Default display text shown in the trigger when nothing is selected"
          },
          {
            "name": "onSelectionChange",
            "type": "((value: any) => void)",
            "required": false,
            "description": "Called when selection changes; receives a single key (single) or key array (multiple)"
          },
          {
            "name": "isDisabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Disables the entire select and prevents interaction"
          },
          {
            "name": "autoFocus",
            "type": "boolean",
            "required": false,
            "description": "Focuses the trigger automatically on mount"
          },
          {
            "name": "maxItems",
            "type": "number",
            "required": false,
            "description": "Maximum number of items visible before the dropdown scrolls"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the root wrapper"
          },
          {
            "name": "trigger",
            "type": "click | hover",
            "required": false,
            "description": "How the dropdown opens: \"click\" (default) or \"hover\"",
            "enumValues": [
              "click",
              "hover"
            ]
          },
          {
            "name": "filter",
            "type": "((item: any) => boolean)",
            "required": false,
            "description": "Custom filter predicate applied to the items array"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Group",
        "description": "A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.",
        "code": "import React from 'react';\nimport { Group, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Group>\n      <Button>First</Button>\n      <Button>Second</Button>\n      <Button>Third</Button>\n    </Group>\n  );\n}"
      },
      {
        "title": "Active Buttons",
        "description": "Ghost variant automatically applies default styling with full border radius to active buttons, while inactive buttons remain ghost. Perfect for tabs and pagination.",
        "code": "import React from 'react';\nimport { Group } from 'ui-lab-components';\n\nexport default function Example() {\n  const [activeTab, setActiveTab] = React.useState('overview');\n\n  return (\n    <div className=\"space-y-6\">\n      {/* Ghost variant with active state - tab-like interface */}\n      <div className=\"space-y-2\">\n        <label className=\"text-sm text-foreground-300\">Ghost variant (tabs & pagination)</label>\n        <Group variant=\"ghost\">\n          <Group.Button\n            active={activeTab === 'overview'}\n            onClick={() => setActiveTab('overview')}\n          >\n            Overview\n          </Group.Button>\n          <Group.Button\n            active={activeTab === 'details'}\n            onClick={() => setActiveTab('details')}\n          >\n            Details\n          </Group.Button>\n          <Group.Button\n            active={activeTab === 'settings'}\n            onClick={() => setActiveTab('settings')}\n          >\n            Settings\n          </Group.Button>\n        </Group>\n      </div>\n\n      {/* Ghost variant pagination style */}\n      <div className=\"space-y-2\">\n        <label className=\"text-sm text-foreground-300\">Ghost variant pagination</label>\n        <Group variant=\"ghost\" spacing=\"none\">\n          {[1, 2, 3, 4, 5].map((page) => (\n            <Group.Button\n              key={page}\n              active={page === 2}\n              onClick={() => {}}\n            >\n              {page}\n            </Group.Button>\n          ))}\n        </Group>\n      </div>\n\n      {/* Primary variant with active state */}\n      <div className=\"space-y-2\">\n        <label className=\"text-sm text-foreground-300\">Primary variant with active</label>\n        <Group variant=\"primary\">\n          <Group.Button active>Active</Group.Button>\n          <Group.Button>Inactive</Group.Button>\n          <Group.Button>Inactive</Group.Button>\n        </Group>\n      </div>\n    </div>\n  );\n}"
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
        "description": "Controls the visual style of the input",
        "enumValues": [
          "default",
          "ghost"
        ]
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the input is in an error state"
      },
      {
        "name": "prefixIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed before the input value"
      },
      {
        "name": "suffixIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed after the input value"
      }
    ],
    "examples": [
      {
        "title": "Basic Input",
        "description": "A simple text input field with default styling. Use this as the standard input element for collecting user text input.",
        "code": "import React from 'react';\nimport { Input } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Input placeholder=\"Enter text...\" />;\n}"
      },
      {
        "title": "Validation States",
        "description": "Input fields with error and success validation states, including helper text for user feedback.",
        "code": "import React from 'react';\nimport { Input, Label } from 'ui-lab-components';\nimport { FaCircleExclamation, FaCircleCheck } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-6 w-full max-w-sm\">\n      {/* Error State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label error helperText=\"Please enter a valid email address\" helperTextError>\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          error\n          defaultValue=\"invalid-email\"\n          suffixIcon={<FaCircleExclamation className=\"text-danger-600\" size={14} />}\n        />\n      </div>\n\n      {/* Success State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label helperText=\"Email address is available\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          defaultValue=\"user@example.com\"\n          suffixIcon={<FaCircleCheck className=\"text-success-600\" size={14} />}\n          className=\"border-success-600 focus:border-success-600\"\n        />\n      </div>\n\n      {/* Default State with Helper Text */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label required helperText=\"We'll never share your email with anyone else.\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n        />\n      </div>\n    </div>\n  );\n}"
      }
    ]
  },
  "label": {
    "props": [
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "description": "Whether to show a required asterisk indicator"
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false,
        "description": "Helper text shown below the label"
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "description": "Whether to style the helper text as an error"
      },
      {
        "name": "size",
        "type": "\"sm\" | \"md\" | \"lg\" | null",
        "required": false,
        "description": "Size of the label text"
      },
      {
        "name": "disabled",
        "type": "boolean | null",
        "required": false,
        "description": "Whether the label appears disabled"
      },
      {
        "name": "error",
        "type": "boolean | null",
        "required": false,
        "description": "Whether to apply error styling"
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
        "name": "items",
        "type": "unknown[]",
        "required": false,
        "defaultValue": "[]",
        "description": "Array of data items; length used for keyboard navigation bounds"
      },
      {
        "name": "variant",
        "type": "default | feed",
        "required": false,
        "defaultValue": "default",
        "description": "Controls the visual style of the list",
        "enumValues": [
          "default",
          "feed"
        ]
      },
      {
        "name": "spacing",
        "type": "default | sm",
        "required": false,
        "defaultValue": "default",
        "description": "Controls the spacing between list items",
        "enumValues": [
          "default",
          "sm"
        ]
      },
      {
        "name": "onNavigate",
        "type": "ListNavigateCallbacks",
        "required": false,
        "description": "Keyboard navigation event callbacks"
      }
    ],
    "subComponents": {
      "List.Header": {
        "description": "Sticky heading row above a section of list items",
        "props": [
          {
            "name": "sticky",
            "type": "boolean",
            "required": false,
            "description": "Whether the header sticks to the top while scrolling"
          }
        ]
      },
      "List.ActionGroup": {
        "description": "Row of action buttons aligned to the right of a list item",
        "props": [
          {
            "name": "justify",
            "type": "flex-start | space-between | flex-end",
            "required": false,
            "defaultValue": "flex-start",
            "description": "Controls the horizontal alignment of action group items",
            "enumValues": [
              "flex-start",
              "space-between",
              "flex-end"
            ]
          }
        ]
      },
      "List.Divider": {
        "description": "Horizontal separator between list sections",
        "props": [
          {
            "name": "variant",
            "type": "solid | dashed | dotted",
            "required": false,
            "defaultValue": "default",
            "description": "Controls the line style of the divider",
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
            "description": "Controls the axis the divider spans",
            "enumValues": [
              "horizontal",
              "vertical"
            ]
          },
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
            "description": "Size of the divider thickness",
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
            "defaultValue": "default",
            "description": "Controls the margin around the divider",
            "enumValues": [
              "sm",
              "md",
              "lg",
              "none"
            ]
          }
        ]
      },
      "List.Footer": {
        "description": "Fixed bottom row beneath the list body",
        "props": [
          {
            "name": "align",
            "type": "flex-start | flex-end | center",
            "required": false,
            "defaultValue": "center",
            "description": "Controls the horizontal alignment of footer content",
            "enumValues": [
              "flex-start",
              "flex-end",
              "center"
            ]
          }
        ]
      },
      "List.Checkbox": {
        "description": "Checkbox indicator inside a list item for multi-select",
        "props": [
          {
            "name": "checked",
            "type": "boolean",
            "required": false,
            "description": "Whether the checkbox is checked"
          }
        ]
      },
      "List.Desc": {
        "description": "Secondary description text below the list item label",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": true,
            "description": "Secondary description text content"
          }
        ]
      },
      "List.Item": {
        "description": "A single interactive row in the list",
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": false,
            "description": "Unique value identifier for this item"
          },
          {
            "name": "interactive",
            "type": "boolean",
            "required": false,
            "description": "Whether the item responds to hover and keyboard highlight"
          },
          {
            "name": "selected",
            "type": "boolean",
            "required": false,
            "description": "Whether the item is in a selected state"
          }
        ]
      },
      "List.Media": {
        "description": "Slot sub-component for media content in a list item",
        "props": [
          {
            "name": "children",
            "type": "ReactNode",
            "required": true,
            "description": "Child content for the media slot"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic List",
        "description": "A simple list displaying basic items with selection and interaction support.",
        "code": "import { List } from 'ui-lab-components';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <List aria-label=\"Basic List Example\">\n      <List.Header>\n        <h2>Items</h2>\n      </List.Header>\n      <List.Item interactive>Item One</List.Item>\n      <List.Item interactive>Item Two</List.Item>\n      <List.Item interactive>Item Three</List.Item>\n      <List.Footer align=\"center\">\n        <Button variant=\"primary\" size=\"sm\">\n          Load More\n        </Button>\n      </List.Footer>\n    </List>\n  );\n}"
      }
    ]
  },
  "mask": {
    "props": [],
    "examples": [
      {
        "title": "Mask - Read More Effect",
        "description": "Using the mask component to create a smooth fade effect on long text content.",
        "code": "import React from 'react';\nimport { Mask } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"max-w-md mx-auto p-4 border rounded-lg bg-background\">\n      <h3 className=\"text-lg font-semibold mb-2\">Terms of Service</h3>\n      <Mask className=\"h-48 bg-muted/30 rounded-md p-4\">\n        <Mask.Fade direction=\"top\" intensity={0.8} fixed />\n        <Mask.Fade direction=\"bottom\" intensity={0.8} fixed />\n        <div className=\"space-y-4 text-sm text-muted-foreground\">\n          <p>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n          </p>\n          <p>\n            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n          </p>\n          <p>\n            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n          </p>\n          <p>\n            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.\n          </p>\n        </div>\n      </Mask>\n    </div>\n  );\n}"
      },
      {
        "title": "Mask - Text Gradient",
        "description": "Using the mask component to create a generic gradient effect on text elements.",
        "code": "import React from 'react';\nimport { Mask } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full flex flex-col items-center justify-center space-y-8 p-8\">\n      <div className=\"w-full max-w-2xl\">\n        <Mask.Gradient gradient=\"linear-gradient(to right, var(--foreground-200), var(--accent-500))\">\n          <div className=\"whitespace-nowrap text-3xl text-center\">\n            Gradient\n          </div>\n        </Mask.Gradient>\n      </div>\n    </div>\n  );\n}"
      }
    ]
  },
  "menu": {
    "props": [
      {
        "name": "selectionMode",
        "type": "none | single | multiple",
        "required": false,
        "defaultValue": "none",
        "description": "Controls how many items can be selected at once",
        "enumValues": [
          "none",
          "single",
          "multiple"
        ]
      },
      {
        "name": "selectedKeys",
        "type": "Set<Key>",
        "required": false,
        "description": "Controlled set of selected item keys"
      },
      {
        "name": "defaultSelectedKeys",
        "type": "Set<Key>",
        "required": false,
        "description": "Initial selected keys for uncontrolled usage"
      },
      {
        "name": "onSelectionChange",
        "type": "((keys: Set<Key>) => void)",
        "required": false,
        "description": "Called when the selected keys change"
      }
    ],
    "subComponents": {
      "MenuContext": {
        "props": []
      },
      "MenuSubmenuContext": {
        "props": []
      },
      "RadioGroupContext": {
        "props": []
      },
      "MenuPortal": {
        "props": [
          {
            "name": "container",
            "type": "HTMLElement",
            "required": false,
            "description": "DOM element to portal the menu content into"
          }
        ]
      },
      "MenuTrigger": {
        "description": "Wrapper element that opens the context menu on right-click",
        "props": [
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the trigger is non-interactive"
          },
          {
            "name": "asChild",
            "type": "boolean",
            "required": false,
            "description": "Whether to render the trigger as its child element"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuContent": {
        "description": "Floating panel that contains the menu items, positioned relative to the click location",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "onCloseAutoFocus",
            "type": "((event: Event) => void)",
            "required": false,
            "description": "Called when focus returns to the trigger after close"
          },
          {
            "name": "onEscapeKeyDown",
            "type": "((event: KeyboardEvent) => void)",
            "required": false,
            "description": "Called when the Escape key is pressed"
          },
          {
            "name": "onPointerDownOutside",
            "type": "((event: PointerEvent) => void)",
            "required": false,
            "description": "Called when a pointer event occurs outside the menu"
          },
          {
            "name": "alignOffset",
            "type": "number",
            "required": false,
            "description": "Horizontal offset from the trigger alignment"
          },
          {
            "name": "sideOffset",
            "type": "number",
            "required": false,
            "defaultValue": "0",
            "description": "Vertical offset from the trigger element"
          }
        ]
      },
      "MenuGroup": {
        "description": "Logical grouping container for related menu items",
        "props": []
      },
      "MenuRadioGroup": {
        "description": "Group of mutually exclusive radio items sharing a single selected value",
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": false,
            "description": "Controlled value of the selected radio item"
          },
          {
            "name": "onValueChange",
            "type": "((value: string) => void)",
            "required": false,
            "description": "Called when the selected radio value changes"
          }
        ]
      },
      "MenuLabel": {
        "description": "Non-interactive label for a section of menu items",
        "props": [
          {
            "name": "inset",
            "type": "boolean",
            "required": false,
            "description": "Whether to add leading inset padding"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuSeparator": {
        "description": "Horizontal rule that visually divides sections of the menu",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuShortcut": {
        "description": "Keyboard shortcut hint aligned to the right side of a menu item",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuItem": {
        "description": "A clickable action item that closes the menu on selection",
        "props": [
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the item is non-interactive"
          },
          {
            "name": "onSelect",
            "type": "(() => void)",
            "required": false,
            "description": "Called when the item is selected"
          },
          {
            "name": "textValue",
            "type": "string",
            "required": false,
            "description": "Accessible text used for typeahead matching"
          },
          {
            "name": "inset",
            "type": "boolean",
            "required": false,
            "description": "Whether to add leading inset padding"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuCheckboxItem": {
        "description": "A menu item with a checkmark indicator for toggling a boolean state",
        "props": [
          {
            "name": "checked",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the checkbox item is checked"
          },
          {
            "name": "onCheckedChange",
            "type": "((checked: boolean) => void)",
            "required": false,
            "description": "Called when the checked state changes"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the item is non-interactive"
          },
          {
            "name": "onSelect",
            "type": "(() => void)",
            "required": false,
            "description": "Called when the item is selected"
          },
          {
            "name": "textValue",
            "type": "string",
            "required": false,
            "description": "Accessible text used for typeahead matching"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuRadioItem": {
        "description": "A mutually exclusive option within a MenuRadioGroup",
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": true,
            "description": "Value this radio item represents"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the item is non-interactive"
          },
          {
            "name": "onSelect",
            "type": "(() => void)",
            "required": false,
            "description": "Called when the item is selected"
          },
          {
            "name": "textValue",
            "type": "string",
            "required": false,
            "description": "Accessible text used for typeahead matching"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuSub": {
        "description": "Context provider that scopes a nested flyout submenu within the menu",
        "props": [
          {
            "name": "open",
            "type": "boolean",
            "required": false,
            "description": "Controlled open state of the submenu"
          },
          {
            "name": "defaultOpen",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Initial open state for uncontrolled usage"
          },
          {
            "name": "onOpenChange",
            "type": "((open: boolean) => void)",
            "required": false,
            "description": "Called when the submenu open state changes"
          }
        ]
      },
      "MenuSubTrigger": {
        "description": "Menu item that opens a nested submenu on hover or keyboard right-arrow",
        "props": [
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the trigger is non-interactive"
          },
          {
            "name": "inset",
            "type": "boolean",
            "required": false,
            "description": "Whether to add leading inset padding"
          },
          {
            "name": "textValue",
            "type": "string",
            "required": false,
            "description": "Accessible text used for typeahead matching"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "MenuSubContent": {
        "description": "Floating panel containing the items of a nested submenu",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "sideOffset",
            "type": "number",
            "required": false,
            "defaultValue": "8",
            "description": "Vertical offset from the trigger element"
          },
          {
            "name": "alignOffset",
            "type": "number",
            "required": false,
            "defaultValue": "0",
            "description": "Horizontal offset from the trigger alignment"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Menu",
        "description": "A simple context menu triggered by right-click. Use this to provide quick access to common actions and context-specific commands.",
        "code": "import React from 'react';\nimport { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>Copy</Menu.Item>\n        <Menu.Item>Paste</Menu.Item>\n        <Menu.Item disabled>Cut</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
      },
      {
        "title": "Nested Menu",
        "description": "Context menu with submenus for organizing related actions. Hover over items with arrows to reveal nested options.",
        "code": "import { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>New File</Menu.Item>\n        <Menu.Item>New Folder</Menu.Item>\n        <Menu.Separator />\n        <Menu.Sub>\n          <Menu.SubTrigger>Open with...</Menu.SubTrigger>\n          <Menu.SubContent>\n            <Menu.Item>VS Code</Menu.Item>\n            <Menu.Item>Sublime Text</Menu.Item>\n            <Menu.Item>Vim</Menu.Item>\n            <Menu.Separator />\n            <Menu.Item>Other Application...</Menu.Item>\n          </Menu.SubContent>\n        </Menu.Sub>\n        <Menu.Sub>\n          <Menu.SubTrigger>Share</Menu.SubTrigger>\n          <Menu.SubContent>\n            <Menu.Item>Copy Link</Menu.Item>\n            <Menu.Item>Email</Menu.Item>\n            <Menu.Sub>\n              <Menu.SubTrigger>Social Media</Menu.SubTrigger>\n              <Menu.SubContent>\n                <Menu.Item>Twitter</Menu.Item>\n                <Menu.Item>LinkedIn</Menu.Item>\n                <Menu.Item>Facebook</Menu.Item>\n              </Menu.SubContent>\n            </Menu.Sub>\n          </Menu.SubContent>\n        </Menu.Sub>\n        <Menu.Separator />\n        <Menu.Item>Rename</Menu.Item>\n        <Menu.Item disabled>Delete</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
      }
    ]
  },
  "modal": {
    "props": [
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false,
        "description": "Whether the modal is open"
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false,
        "description": "Callback when the open state changes"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Optional title rendered in the modal header bar"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Modal body content"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Optional footer content rendered below the body"
      },
      {
        "name": "closeButton",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Whether to show the X close button in the header"
      },
      {
        "name": "size",
        "type": "fit | auto",
        "required": false,
        "defaultValue": "auto",
        "description": "Controls modal width: \"fit\" adapts to content, \"auto\" uses default width",
        "enumValues": [
          "fit",
          "auto"
        ]
      },
      {
        "name": "isDismissable",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Whether clicking the backdrop dismisses the modal"
      },
      {
        "name": "isKeyboardDismissDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Prevents the Escape key from dismissing the modal"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class for the modal panel"
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false,
        "description": "Additional class for the inner content area"
      },
      {
        "name": "overlayClassName",
        "type": "string",
        "required": false,
        "description": "Additional class for the backdrop overlay"
      }
    ],
    "subComponents": {
      "Modal.Header": {
        "description": "ModalHeader component for use with compound Modal pattern",
        "props": []
      },
      "Modal.Body": {
        "description": "ModalBody component for use with compound Modal pattern",
        "props": []
      },
      "Modal.Footer": {
        "description": "ModalFooter component for use with compound Modal pattern",
        "props": []
      }
    },
    "examples": [
      {
        "title": "Basic Modal",
        "description": "A simple modal dialog with a trigger button. Use this for important user interactions that require focused attention.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Modal, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>\n        <Modal.Header>Modal Title</Modal.Header>\n        <Modal.Body>This is the modal content. It displays important information or actions.</Modal.Body>\n        <Modal.Footer>Modal Footer</Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
      },
      {
        "title": "Form Modal",
        "description": "A modal dialog containing a form for editing user profile settings. Demonstrates using form inputs, labels, and action buttons within a modal.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Modal, Button, Input, Label, TextArea, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n  const [formData, setFormData] = React.useState({\n    name: 'John Doe',\n    email: 'john.doe@example.com',\n    bio: 'Software developer passionate about building great user experiences.',\n  });\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    // Handle form submission\n    setIsOpen(false);\n  };\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size=\"auto\">\n        <Modal.Header>Edit Profile</Modal.Header>\n        <Modal.Body>\n          <form id=\"profile-form\" onSubmit={handleSubmit}>\n            <Flex direction=\"column\" gap=\"md\">\n              <div>\n                <Label htmlFor=\"name\" required>\n                  Full Name\n                </Label>\n                <Input\n                  id=\"name\"\n                  value={formData.name}\n                  onChange={(e) =>\n                    setFormData({ ...formData, name: e.target.value })\n                  }\n                  placeholder=\"Enter your name\"\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"email\" required>\n                  Email Address\n                </Label>\n                <Input\n                  id=\"email\"\n                  type=\"email\"\n                  value={formData.email}\n                  onChange={(e) =>\n                    setFormData({ ...formData, email: e.target.value })\n                  }\n                  placeholder=\"Enter your email\"\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"bio\">Bio</Label>\n                <TextArea\n                  id=\"bio\"\n                  value={formData.bio}\n                  onChange={(e) =>\n                    setFormData({ ...formData, bio: e.target.value })\n                  }\n                  placeholder=\"Tell us about yourself\"\n                  rows={3}\n                />\n              </div>\n            </Flex>\n          </form>\n        </Modal.Body>\n        <Modal.Footer>\n          <Flex gap=\"sm\" justify=\"flex-end\">\n            <Button variant=\"ghost\" onClick={() => setIsOpen(false)}>\n              Cancel\n            </Button>\n            <Button type=\"submit\" form=\"profile-form\">\n              Save Changes\n            </Button>\n          </Flex>\n        </Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
      }
    ]
  },
  "page": {
    "props": [
      {
        "name": "maxWidth",
        "type": "string | number",
        "required": false,
        "defaultValue": "1400px",
        "description": "Maximum width of the page content area"
      },
      {
        "name": "padding",
        "type": "none | sm | md | lg | xl",
        "required": false,
        "defaultValue": "md",
        "description": "Controls the internal padding of the page",
        "enumValues": [
          "none",
          "sm",
          "md",
          "lg",
          "xl"
        ]
      },
      {
        "name": "centered",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Whether the page content is horizontally centered"
      },
      {
        "name": "fullscreen",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the page expands to fill the full viewport"
      }
    ],
    "examples": []
  },
  "panel": {
    "props": [
      {
        "name": "spacing",
        "type": "none | sm | md | lg",
        "required": false,
        "defaultValue": "md",
        "description": "Controls the internal spacing between panel sections",
        "enumValues": [
          "none",
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "variant",
        "type": "default | compact",
        "required": false,
        "defaultValue": "default",
        "description": "Controls the visual density of the panel",
        "enumValues": [
          "default",
          "compact"
        ]
      }
    ],
    "subComponents": {
      "Panel.Header": {
        "description": "Top bar of the panel, typically for a title and actions",
        "props": [
          {
            "name": "sticky",
            "type": "boolean",
            "required": false,
            "defaultValue": "true",
            "description": "Whether the header sticks to the top while scrolling"
          }
        ]
      },
      "Panel.Content": {
        "description": "Main scrollable body area of the panel",
        "props": []
      },
      "Panel.Footer": {
        "description": "Bottom bar of the panel, typically for controls or status",
        "props": [
          {
            "name": "fixed",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the footer is fixed to the bottom of the panel"
          }
        ]
      },
      "Panel.Sidebar": {
        "description": "Collapsible side panel that slides in from left or right",
        "props": [
          {
            "name": "side",
            "type": "left | right",
            "required": false,
            "defaultValue": "left",
            "description": "Which side of the panel the sidebar appears on",
            "enumValues": [
              "left",
              "right"
            ]
          },
          {
            "name": "defaultOpen",
            "type": "boolean",
            "required": false,
            "defaultValue": "true",
            "description": "Whether the sidebar is open on initial render"
          },
          {
            "name": "width",
            "type": "string | number",
            "required": false,
            "defaultValue": "240px",
            "description": "Width of the sidebar when open"
          },
          {
            "name": "collapsedWidth",
            "type": "string | number",
            "required": false,
            "defaultValue": "0",
            "description": "Width of the sidebar when collapsed"
          }
        ]
      },
      "Panel.Toggle": {
        "description": "Button that shows/hides the Panel.Sidebar",
        "props": [
          {
            "name": "children",
            "type": "ReactElement<unknown, string | JSXElementConstructor<any>>",
            "required": true,
            "description": "Button element that triggers sidebar open/close"
          }
        ]
      },
      "Panel.Group": {
        "description": "Container that manages side-by-side resizable panel columns",
        "props": [
          {
            "name": "direction",
            "type": "horizontal | vertical",
            "required": false,
            "defaultValue": "horizontal",
            "description": "Controls the axis panels are arranged along",
            "enumValues": [
              "horizontal",
              "vertical"
            ]
          }
        ]
      },
      "Panel.Resize": {
        "description": "Drag handle between Panel.Group columns for resizing",
        "props": [
          {
            "name": "data-resize-index",
            "type": "number",
            "required": false
          }
        ]
      }
    },
    "examples": []
  },
  "popover": {
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": true,
        "description": "Content to display inside the popover panel"
      },
      {
        "name": "position",
        "type": "top | right | bottom | left",
        "required": false,
        "defaultValue": "bottom",
        "description": "Preferred side of the trigger where the popover appears",
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
        "required": false,
        "description": "Additional CSS class for the trigger element"
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the popover content panel"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state"
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false,
        "description": "Called when the popover opens or closes"
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to render a directional arrow pointing at the trigger"
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
        "defaultValue": "0",
        "description": "Current progress value"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "defaultValue": "100",
        "description": "Maximum value that represents 100%"
      },
      {
        "name": "variant",
        "type": "default | success | warning | error",
        "required": false,
        "defaultValue": "default",
        "description": "Visual color variant indicating progress state",
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
        "description": "Size of the progress bar",
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
        "defaultValue": "false",
        "description": "Whether to show an infinite loading animation instead of a fixed value"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Accessible label describing what is progressing"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to display the percentage value next to the label"
      },
      {
        "name": "animated",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to show a shimmer animation on the progress fill"
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
        "description": "Size of the radio button",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Label text or element displayed next to the radio"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Secondary description shown below the label"
      },
      {
        "name": "helperText",
        "type": "ReactNode",
        "required": false,
        "description": "Helper text shown below the radio item"
      },
      {
        "name": "helperTextError",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to style the helper text as an error"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to apply error styling"
      }
    ],
    "examples": [
      {
        "title": "Basic Radio",
        "description": "A simple radio button option with a label. Use this for single-choice selection in forms and settings.",
        "code": "import React from 'react';\nimport { Radio } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Radio value=\"option1\" label=\"Select this option\" />\n  );\n}"
      },
      {
        "title": "Radio with Descriptions",
        "description": "Radio buttons with titles and descriptive text. Useful for plan selection, settings, or any choice that benefits from additional context.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Radio } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Radio.Group defaultValue=\"pro\" className=\"w-full max-w-md\">\n      <Radio.Item\n        value=\"starter\"\n        label=\"Starter Plan\"\n        description=\"Perfect for individuals and small projects. Includes 5GB storage and basic support.\"\n      />\n      <Radio.Item\n        value=\"pro\"\n        label=\"Pro Plan\"\n        description=\"Ideal for growing teams. Includes 50GB storage, priority support, and advanced analytics.\"\n      />\n      <Radio.Item\n        value=\"enterprise\"\n        label=\"Enterprise Plan\"\n        description=\"For large organizations. Unlimited storage, dedicated support, and custom integrations.\"\n      />\n    </Radio.Group>\n  );\n}"
      }
    ]
  },
  "scroll": {
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Content to render inside the scroll container"
      },
      {
        "name": "maxHeight",
        "type": "string",
        "required": false,
        "defaultValue": "100%",
        "description": "Maximum height before scrolling becomes active"
      },
      {
        "name": "maxWidth",
        "type": "string",
        "required": false,
        "defaultValue": "100%",
        "description": "Maximum width before scrolling becomes active"
      },
      {
        "name": "direction",
        "type": "vertical | horizontal",
        "required": false,
        "defaultValue": "vertical",
        "description": "Scroll direction",
        "enumValues": [
          "vertical",
          "horizontal"
        ]
      },
      {
        "name": "paddingY",
        "type": "string | number",
        "required": false,
        "defaultValue": "4",
        "description": "Padding on the top and bottom of the scrollbar track in pixels"
      },
      {
        "name": "fadeY",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to apply a fade mask at the top and bottom scroll edges"
      },
      {
        "name": "fadeDistance",
        "type": "number",
        "required": false,
        "defaultValue": "5",
        "description": "Pixels scrolled before the fade mask begins to appear"
      },
      {
        "name": "fadeSize",
        "type": "number",
        "required": false,
        "defaultValue": "4",
        "description": "Percentage of container height used for the fade gradient"
      },
      {
        "name": "enabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Whether to render the custom scrollbar; when false, renders children without scroll"
      },
      {
        "name": "hide",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Whether to hide the scrollbar when not actively scrolling"
      }
    ],
    "examples": [
      {
        "title": "Basic Scroll",
        "description": "A simple scrollable container with fixed height. Use this to display overflow content in a constrained space.",
        "code": "import { Scroll } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className='overflow-hidden' style={{ height: '200px', width: '300px' }}>\n      <Scroll>\n        <div>\n          <p>This is scrollable content.</p>\n          <p>Add more content here to see scrolling in action.</p>\n          <p>The Scroll component manages overflow elegantly.</p>\n          <p>You can scroll through all of this content.</p>\n          <p>Perfect for constrained layouts.</p>\n        </div>\n      </Scroll>\n    </div>\n  );\n}"
      }
    ]
  },
  "select": {
    "props": [
      {
        "name": "mode",
        "type": "single | multiple",
        "required": false,
        "defaultValue": "single",
        "description": "Selection mode: \"single\" for one item, \"multiple\" for multi-item selection",
        "enumValues": [
          "single",
          "multiple"
        ]
      },
      {
        "name": "items",
        "type": "any[]",
        "required": false,
        "defaultValue": "[]",
        "description": "External items array — used when items are provided as data rather than JSX"
      },
      {
        "name": "selectedKey",
        "type": "Key | null",
        "required": false,
        "description": "Controlled selected key for single-select mode"
      },
      {
        "name": "defaultSelectedKey",
        "type": "Key | null",
        "required": false,
        "description": "Default selected key for uncontrolled single-select"
      },
      {
        "name": "selectedKeys",
        "type": "Key[]",
        "required": false,
        "description": "Controlled selected keys for multi-select mode"
      },
      {
        "name": "defaultSelectedKeys",
        "type": "Key[]",
        "required": false,
        "defaultValue": "[]",
        "description": "Default selected keys for uncontrolled multi-select"
      },
      {
        "name": "defaultValue",
        "type": "string | null",
        "required": false,
        "description": "Default display text shown in the trigger when nothing is selected"
      },
      {
        "name": "onSelectionChange",
        "type": "((value: any) => void)",
        "required": false,
        "description": "Called when selection changes; receives a single key (single) or key array (multiple)"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Disables the entire select and prevents interaction"
      },
      {
        "name": "autoFocus",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Focuses the trigger automatically on mount"
      },
      {
        "name": "maxItems",
        "type": "number",
        "required": false,
        "defaultValue": "6",
        "description": "Maximum number of items visible before the dropdown scrolls"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the root wrapper"
      },
      {
        "name": "trigger",
        "type": "click | hover",
        "required": false,
        "defaultValue": "click",
        "description": "How the dropdown opens: \"click\" (default) or \"hover\"",
        "enumValues": [
          "click",
          "hover"
        ]
      },
      {
        "name": "filter",
        "type": "((item: any) => boolean)",
        "required": false,
        "description": "Custom filter predicate applied to the items array"
      }
    ],
    "subComponents": {
      "SelectContent": {
        "description": "Floating panel that renders the list of selectable options",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "searchable",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Renders a search input inside the dropdown for filtering items"
          },
          {
            "name": "searchPlaceholder",
            "type": "string",
            "required": false,
            "defaultValue": "Search items...",
            "description": "Placeholder text for the search input when searchable is true"
          },
          {
            "name": "onSearch",
            "type": "((value: string) => void)",
            "required": false,
            "description": "Called when the search input value changes"
          }
        ]
      },
      "SearchableContent": {
        "description": "Dropdown panel with a built-in search input for filtering the option list",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "searchPlaceholder",
            "type": "string",
            "required": false,
            "defaultValue": "Search items...",
            "description": "Placeholder text for the search input when searchable is true"
          },
          {
            "name": "onSearch",
            "type": "((value: string) => void)",
            "required": false,
            "description": "Called when the search input value changes"
          }
        ]
      },
      "SelectSeparator": {
        "description": "Horizontal rule that visually separates groups of items in the dropdown",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "SelectGroup": {
        "description": "Named grouping of related items with an optional visible title label",
        "props": [
          {
            "name": "key",
            "type": "string",
            "required": false
          },
          {
            "name": "title",
            "type": "string",
            "required": false,
            "description": "Label displayed above the group of items"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      },
      "SelectValue": {
        "description": "Renders the selected item's label inside the trigger",
        "props": [
          {
            "name": "placeholder",
            "type": "string",
            "required": false,
            "defaultValue": "Select an option",
            "description": "Text shown in the trigger when no item is selected"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "icon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon displayed to the left of the selected value text"
          },
          {
            "name": "children",
            "type": "ReactNode | ((selectedItem: ItemData | null) => ReactNode)",
            "required": false,
            "description": "Custom render function receiving the selected item, or static content to display"
          }
        ]
      },
      "SelectItem": {
        "description": "A single selectable option in the dropdown list",
        "props": [
          {
            "name": "value",
            "type": "Key",
            "required": true,
            "description": "Unique key used to identify this item in the selection state"
          },
          {
            "name": "textValue",
            "type": "string",
            "required": false,
            "description": "Accessible text value used for search filtering and selection display; defaults to children string"
          },
          {
            "name": "isDisabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Prevents the item from being selected or keyboard-focused"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "icon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon displayed to the left of the item label"
          },
          {
            "name": "description",
            "type": "ReactNode",
            "required": false,
            "description": "Secondary descriptive text displayed below the item label"
          }
        ]
      },
      "SelectList": {
        "description": "Wrapper for a collection of SelectItem components",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "filter",
            "type": "((item: any) => boolean)",
            "required": false,
            "description": "Custom filter predicate applied to the items array"
          }
        ]
      },
      "SelectSub": {
        "description": "Context provider that scopes a nested flyout submenu within the dropdown",
        "props": [
          {
            "name": "open",
            "type": "boolean",
            "required": false,
            "description": "Controlled open state of the submenu"
          },
          {
            "name": "defaultOpen",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Initial open state for uncontrolled usage"
          },
          {
            "name": "onOpenChange",
            "type": "((open: boolean) => void)",
            "required": false,
            "description": "Called when the submenu open state changes"
          }
        ]
      },
      "SelectSubTrigger": {
        "description": "Item that opens a nested submenu on hover or keyboard right-arrow",
        "props": [
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Prevents the trigger from opening the submenu"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "textValue",
            "type": "string",
            "required": false,
            "description": "Accessible text value used for keyboard navigation registration; defaults to children string"
          }
        ]
      },
      "SelectSubContent": {
        "description": "Floating panel containing the items of a nested submenu",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "sideOffset",
            "type": "number",
            "required": false,
            "defaultValue": "8",
            "description": "Distance in pixels between the submenu panel and its trigger along the main axis"
          },
          {
            "name": "alignOffset",
            "type": "number",
            "required": false,
            "defaultValue": "0",
            "description": "Offset in pixels along the cross axis for submenu panel alignment"
          }
        ]
      },
      "SelectTriggerContext": {
        "props": []
      },
      "SelectTrigger": {
        "description": "Button that opens and closes the Select dropdown",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "chevron",
            "type": "ReactNode",
            "required": false,
            "description": "Custom chevron icon displayed on the right side of the trigger; defaults to FaChevronDown"
          },
          {
            "name": "icon",
            "type": "{ prefix?: ReactNode; chevron?: ReactNode; }",
            "required": false,
            "description": "Icon slot object for prefix and chevron overrides"
          },
          {
            "name": "variant",
            "type": "ghost",
            "required": false,
            "description": "Visual style variant; \"ghost\" removes the default button background",
            "enumValues": [
              "ghost"
            ]
          }
        ]
      },
      "SearchableTrigger": {
        "description": "Combobox-style input that opens the dropdown on focus and filters items as you type",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "placeholder",
            "type": "string",
            "required": false,
            "defaultValue": "Search...",
            "description": "Placeholder text shown when the input is empty"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Select",
        "description": "A simple dropdown select component with options. Use this for form inputs and user choices.",
        "code": "import React from 'react';\nimport { Select } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Select>\n      <Select.Trigger>\n        <Select.Value placeholder=\"Select an option\" />\n      </Select.Trigger>\n      <Select.Content>\n        <Select.Item value=\"option1\" textValue=\"Option 1\">Option 1</Select.Item>\n        <Select.Item value=\"option2\" textValue=\"Option 2\">Option 2</Select.Item>\n        <Select.Item value=\"option3\" textValue=\"Option 3\">Option 3</Select.Item>\n      </Select.Content>\n    </Select>\n  );\n}"
      },
      {
        "title": "Searchable Select",
        "description": "A filterable select component with search input. Type to filter through a large list of options.",
        "code": "import React from 'react';\nimport { Select, Searchable } from 'ui-lab-components';\n\nconst countries = [\n  { value: 'us', label: 'United States' },\n  { value: 'ca', label: 'Canada' },\n  { value: 'mx', label: 'Mexico' },\n  { value: 'br', label: 'Brazil' },\n  { value: 'ar', label: 'Argentina' },\n  { value: 'uk', label: 'United Kingdom' },\n  { value: 'fr', label: 'France' },\n  { value: 'de', label: 'Germany' },\n  { value: 'it', label: 'Italy' },\n  { value: 'es', label: 'Spain' },\n  { value: 'pt', label: 'Portugal' },\n  { value: 'nl', label: 'Netherlands' },\n  { value: 'be', label: 'Belgium' },\n  { value: 'ch', label: 'Switzerland' },\n  { value: 'at', label: 'Austria' },\n  { value: 'se', label: 'Sweden' },\n  { value: 'no', label: 'Norway' },\n  { value: 'dk', label: 'Denmark' },\n  { value: 'fi', label: 'Finland' },\n  { value: 'pl', label: 'Poland' },\n  { value: 'jp', label: 'Japan' },\n  { value: 'cn', label: 'China' },\n  { value: 'kr', label: 'South Korea' },\n  { value: 'in', label: 'India' },\n  { value: 'au', label: 'Australia' },\n  { value: 'nz', label: 'New Zealand' },\n];\n\nexport default function Example() {\n  return (\n    <Select>\n      <Searchable.Trigger placeholder=\"Search countries...\" />\n      <Searchable.Content searchPlaceholder=\"Type to filter...\">\n        {countries.map((country) => (\n          <Select.Item key={country.value} value={country.value} textValue={country.label}>\n            {country.label}\n          </Select.Item>\n        ))}\n      </Searchable.Content>\n    </Select>\n  );\n}"
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
        "description": "Size of the slider track and thumb",
        "enumValues": [
          "sm",
          "md",
          "lg"
        ]
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Whether the slider is disabled"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the slider container"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles for the slider container"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "defaultValue": "0",
        "description": "Minimum value of the slider range"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "defaultValue": "100",
        "description": "Maximum value of the slider range"
      },
      {
        "name": "step",
        "type": "number",
        "required": false,
        "defaultValue": "1",
        "description": "Step increment between values"
      },
      {
        "name": "defaultValue",
        "type": "number | number[]",
        "required": false,
        "description": "Initial value(s) for uncontrolled usage"
      },
      {
        "name": "value",
        "type": "number | number[]",
        "required": false,
        "description": "Controlled value(s) for the slider thumb(s)"
      },
      {
        "name": "onValueChange",
        "type": "((value: number[]) => void)",
        "required": false,
        "description": "Called when the value changes"
      },
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "description": "Orientation of the slider track",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label for the slider"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "ID of an element that labels the slider"
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
        "required": false,
        "description": "Controlled selected (on) state"
      },
      {
        "name": "onChange",
        "type": "((isSelected: boolean) => void)",
        "required": false,
        "description": "Called when the switch is toggled"
      },
      {
        "name": "defaultSelected",
        "type": "boolean",
        "required": false,
        "description": "Initial selected state for uncontrolled usage"
      },
      {
        "name": "size",
        "type": "md | lg",
        "required": false,
        "defaultValue": "lg",
        "description": "Size of the switch",
        "enumValues": [
          "md",
          "lg"
        ]
      },
      {
        "name": "pill",
        "type": "boolean",
        "required": false,
        "description": "Whether to render with a fully rounded pill shape"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the switch is disabled"
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
        "required": true,
        "description": "Array of data rows to display"
      },
      {
        "name": "columns",
        "type": "Column<T>[]",
        "required": true,
        "description": "Column definitions including key, label, and optional render function"
      },
      {
        "name": "showFilters",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to show filter inputs above the table"
      },
      {
        "name": "onRowClick",
        "type": "((row: T) => void)",
        "required": false,
        "description": "Called when a table row is clicked"
      },
      {
        "name": "onFilterChange",
        "type": "((filters: Record<string, string>) => void)",
        "required": false,
        "description": "Called when any column filter value changes"
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
        "description": "Visual style of the tab list indicator",
        "enumValues": [
          "default",
          "underline"
        ]
      },
      {
        "name": "orientation",
        "type": "horizontal | vertical",
        "required": false,
        "defaultValue": "horizontal",
        "description": "Direction of the tab list layout",
        "enumValues": [
          "horizontal",
          "vertical"
        ]
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected tab value for uncontrolled usage"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Controlled selected tab value"
      },
      {
        "name": "onValueChange",
        "type": "((value: string) => void)",
        "required": false,
        "description": "Called when the selected tab changes"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the tabs root"
      }
    ],
    "subComponents": {
      "TabsList": {
        "description": "Container for the row of tab trigger buttons",
        "props": [
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "aria-label",
            "type": "string",
            "required": false,
            "description": "Accessible label for the tab list"
          }
        ]
      },
      "Tab": {
        "description": "A tab button that activates its associated content panel",
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": true,
            "description": "Unique identifier matching the associated TabsContent value"
          },
          {
            "name": "disabled",
            "type": "boolean",
            "required": false,
            "defaultValue": "false",
            "description": "Whether the tab trigger is disabled"
          },
          {
            "name": "icon",
            "type": "ReactNode",
            "required": false,
            "description": "Icon element displayed before the tab label"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          },
          {
            "name": "_registerDisabled",
            "type": "((value: string) => void)",
            "required": false
          },
          {
            "name": "_unregisterDisabled",
            "type": "((value: string) => void)",
            "required": false
          }
        ]
      },
      "TabsContent": {
        "description": "Content panel shown when its corresponding tab is active",
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": true,
            "description": "Unique identifier matching the associated TabsTrigger value"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class names"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Basic Tabs",
        "description": "A simple tabbed interface with content switching. Use this to organize related content into separate views.",
        "code": "import React from 'react';\nimport { Tabs, TabsList, TabsTrigger, TabsContent } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tabs defaultValue=\"overview\">\n      <TabsList aria-label=\"Content sections\">\n        <TabsTrigger value=\"overview\">Overview</TabsTrigger>\n        <TabsTrigger value=\"details\">Details</TabsTrigger>\n        <TabsTrigger value=\"settings\">Settings</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"overview\">\n        <p>Overview content goes here.</p>\n      </TabsContent>\n      <TabsContent value=\"details\">\n        <p>Details content goes here.</p>\n      </TabsContent>\n      <TabsContent value=\"settings\">\n        <p>Settings content goes here.</p>\n      </TabsContent>\n    </Tabs>\n  );\n}"
      },
      {
        "title": "Vertical Tabs (Sidebar)",
        "description": "A vertical tab layout ideal for settings pages or sidebar navigation. Tabs are stacked vertically with content panels beside them.",
        "code": "import React from 'react';\nimport { Tabs, TabsList, TabsTrigger, TabsContent, Card } from 'ui-lab-components';\nimport { User, Settings, Bell, Shield } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4 min-h-[400px]\">\n      <Card className=\"w-full max-w-2xl\">\n        <Tabs defaultValue=\"profile\" className=\"flex flex-row\">\n          {/* Vertical tab list - styled as sidebar */}\n          <TabsList\n            aria-label=\"Settings sections\"\n            className=\"flex-col items-stretch justify-start h-auto w-48 border-r border-background-700 rounded-none bg-transparent p-2\"\n          >\n            <TabsTrigger value=\"profile\" icon={<User className=\"w-4 h-4\" />} className=\"justify-start\">\n              Profile\n            </TabsTrigger>\n            <TabsTrigger value=\"notifications\" icon={<Bell className=\"w-4 h-4\" />} className=\"justify-start\">\n              Notifications\n            </TabsTrigger>\n            <TabsTrigger value=\"security\" icon={<Shield className=\"w-4 h-4\" />} className=\"justify-start\">\n              Security\n            </TabsTrigger>\n            <TabsTrigger value=\"preferences\" icon={<Settings className=\"w-4 h-4\" />} className=\"justify-start\">\n              Preferences\n            </TabsTrigger>\n          </TabsList>\n\n          {/* Content panels */}\n          <div className=\"flex-1 p-6\">\n            <TabsContent value=\"profile\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Profile Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Manage your personal information and how others see you on the platform.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-2/3 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </TabsContent>\n\n            <TabsContent value=\"notifications\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Notification Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Control how and when you receive alerts and updates.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-32 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-background-700 rounded\" />\n                  <div className=\"h-4 w-40 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-28 bg-background-800 rounded\" />\n                </div>\n              </div>\n            </TabsContent>\n\n            <TabsContent value=\"security\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Security Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Protect your account with passwords, two-factor authentication, and more.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-24 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-48 bg-background-700/50 rounded\" />\n                </div>\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-32 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-40 bg-background-700/50 rounded\" />\n                </div>\n              </div>\n            </TabsContent>\n\n            <TabsContent value=\"preferences\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">General Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Customize your experience with theme, language, and display options.\n              </p>\n              <div className=\"grid grid-cols-2 gap-3\">\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </TabsContent>\n          </div>\n        </Tabs>\n      </Card>\n    </div>\n  );\n}"
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
        "description": "Size of the textarea",
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
        "defaultValue": "false",
        "description": "Whether to apply error styling"
      },
      {
        "name": "resizable",
        "type": "boolean",
        "required": false,
        "defaultValue": "true",
        "description": "Whether the textarea can be manually resized by the user"
      },
      {
        "name": "showCharacterCount",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to display a character count below the textarea"
      },
      {
        "name": "maxCharacters",
        "type": "number",
        "required": false,
        "description": "Maximum number of characters allowed"
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
        "required": true,
        "description": "Toast data object containing content and display options"
      },
      {
        "name": "pauseOnHover",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the auto-dismiss timer pauses on mouse hover"
      }
    ],
    "examples": [
      {
        "title": "Basic Toast",
        "description": "A simple toast notification. Click the button to trigger a toast message with default styling.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button onClick={() => toast({ title: 'Notification', description: 'This is a toast message' })}>\n        Show Toast\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Success Toast",
        "description": "Toast notification for successful operations.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        onClick={() =>\n          toast({\n            title: 'Success',\n            description: 'Operation completed successfully',\n            variant: 'success',\n          })\n        }\n      >\n        Show Success\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Destructive Toast",
        "description": "Toast notification for errors or destructive operations.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        onClick={() =>\n          toast({\n            title: 'Error',\n            description: 'Something went wrong',\n            variant: 'destructive',\n          })\n        }\n      >\n        Show Error\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Info Toast",
        "description": "Toast notification for informational messages.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        onClick={() =>\n          toast({\n            title: 'Info',\n            description: 'Here is some useful information',\n            variant: 'info',\n          })\n        }\n      >\n        Show Info\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Warning Toast",
        "description": "Toast notification for warnings.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        onClick={() =>\n          toast({\n            title: 'Warning',\n            description: 'Please be careful',\n            variant: 'warning',\n          })\n        }\n      >\n        Show Warning\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      }
    ]
  },
  "tooltip": {
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "required": true,
        "description": "Content to display inside the tooltip"
      },
      {
        "name": "position",
        "type": "top | right | bottom | left",
        "required": false,
        "defaultValue": "top",
        "description": "Preferred side of the trigger where the tooltip appears",
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
        "required": false,
        "description": "Additional CSS class for the trigger wrapper"
      },
      {
        "name": "delay",
        "type": "number",
        "required": false,
        "defaultValue": "600",
        "description": "Milliseconds before the tooltip appears after hover"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the tooltip is disabled"
      },
      {
        "name": "isOpen",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state"
      },
      {
        "name": "onOpenChange",
        "type": "((isOpen: boolean) => void)",
        "required": false,
        "description": "Called when the tooltip opens or closes"
      },
      {
        "name": "showArrow",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether to render a directional arrow pointing at the trigger"
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
  "anchor": "@reference \"tailwindcss\";\n\n@layer components {\n  .anchor {\n    display: inline;\n  }\n\n  .preview {\n    display: inline;\n  }\n\n  .trigger {\n    --underline-background: var(--background-600);\n\n    display: inline-block;\n    position: relative;\n    color: var(--foreground-200);\n    text-decoration: none;\n    cursor: pointer;\n    transition: color 150ms var(--ease-gentle-ease);\n\n    &:focus-visible {\n      outline: 2px solid var(--color-background-600);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0px;\n    height: 1px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 150ms var(--ease-gentle-ease);\n    pointer-events: none;\n  }\n}\n",
  "badge": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    --background: var(--background-800);\n    --foreground: var(--foreground-200);\n    --border: var(--background-600);\n\n    @apply px-4 py-1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    background-color: var(--background);\n    color: var(--foreground);\n    border-radius: var(--radius-sm);\n  }\n\n  .badge.default {\n    --background: color-mix(in srgb, var(--background-600) 10%, var(--background-900));\n    --foreground: var(--foreground-200);\n    border: var(--border-width-base) solid var(--background-700)\n  }\n\n  .badge.success {\n    --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n    --foreground: var(--success-600);\n  }\n\n  .badge.warning {\n    --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n    --foreground: var(--warning-600);\n  }\n\n  .badge.danger {\n    --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n    --foreground: var(--danger-600);\n  }\n\n  .badge.info {\n    --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n    --foreground: var(--info-600);\n  }\n\n  .badge.sm {\n    @apply px-2.5 py-0.5;\n    font-size: var(--text-xs);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .badge.md {\n    @apply px-3.5 py-1;\n    font-size: var(--text-sm);\n  }\n\n  .badge.lg {\n    @apply px-4 py-2.5;\n    font-size: var(--text-sm);\n  }\n\n  .pill {\n    border-radius: 9999px;\n  }\n\n  .iconWrapper {\n    display: flex;\n    align-items: center;\n    flex-shrink: 0;\n  }\n\n  .dismissButton {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-left: 0.25rem;\n    @apply p-1;\n    border-radius: var(--radius-xs);\n    background: transparent;\n    border: none;\n    color: var(--foreground-400);\n    cursor: pointer;\n    transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n    outline: none;\n  }\n\n  .dismissButton[data-hovered=\"true\"] {\n    background: color-mix(in srgb, var(--background-700) 80%, var(--background-900));\n  }\n\n  .dismissButton[data-pressed=\"true\"] {\n    background: var(--background-700);\n    transform: scale(0.95);\n  }\n\n  .dismissButton[data-focus-visible=\"true\"] {\n    outline: 2px solid currentColor;\n    outline-offset: 1px;\n  }\n}\n\n",
  "banner": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    --background: var(--background-900);\n    --foreground: var(--info-50);\n    --border: var(--info-600);\n\n    width: 100%;\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--spacing-4);\n    font-family: inherit;\n    font-size: var(--text-md);\n    line-height: var(--leading-normal);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out;\n  }\n\n  .content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-2);\n  }\n\n  .iconContainer {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    align-self: flex-start;\n  }\n\n  .icon {\n    @apply mr-4;\n    width: 1.25rem;\n    height: 1.25rem;\n    color: currentColor;\n  }\n\n  .dismiss {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    padding: 0;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm);\n    cursor: pointer;\n    transition: background-color 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: inherit;\n    line-height: var(--leading-tight);\n    margin: 0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-normal);\n    font-size: inherit;\n    line-height: var(--leading-normal);\n    margin: 0;\n    opacity: 0.9;\n  }\n}\n\n.banner.note {\n  --background: var(--background-900);\n  --foreground: var(--foreground-200);\n  --border: var(--background-700);\n}\n\n.banner.note .icon {\n  color: var(--background-500);\n}\n\n.banner.info {\n  --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--info-600) 30%, var(--background-900));\n}\n\n.banner.info .icon {\n  color: var(--info-600);\n}\n\n.banner.success {\n  --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--success-600) 30%, var(--background-900));\n}\n\n.banner.success .icon {\n  color: var(--success-600);\n}\n\n.banner.warning {\n  --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--warning-600) 30%, var(--background-900));\n}\n\n.banner.warning .icon {\n  color: var(--warning-600);\n}\n\n.banner.danger {\n  --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--danger-600) 30%, var(--background-900));\n}\n\n.banner.danger .icon {\n  color: var(--danger-600);\n}\n\n.banner.sm {\n  @apply px-3 py-2;\n  font-size: var(--text-sm);\n}\n\n.banner.md {\n  @apply px-4 py-3;\n  font-size: var(--text-sm);\n}\n\n.banner.lg {\n  @apply px-6 py-4;\n  font-size: var(--text-lg);\n}\n",
  "breadcrumbs": "@layer components {\n  .breadcrumbs {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --font-size: var(--text-sm);\n\n    display: block;\n  }\n\n  .breadcrumbsList {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n  .breadcrumbsList.withCustomSeparator .breadcrumb:not(:last-child)::after {\n    content: none;\n  }\n\n  .breadcrumb {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* Separator after each item except the last */\n  .breadcrumb:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    display: flex;\n    align-items: center;\n    margin: 0;\n    padding: 0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .breadcrumbLink {\n    color: var(--foreground);\n    text-decoration: none;\n    padding: 0.25rem 0.5rem;\n    border-radius: 0.375rem;\n    cursor: pointer;\n    font-size: var(--font-size);\n    line-height: 1.5;\n    position: relative;\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: var(--font-weight-medium);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: 0.6;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
  "button": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply px-3 py-1;\n\n    --ring-color: var(--accent-500);\n    --background: var(--background-800);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border);\n    border-radius: var(--radius-sm);\n\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-md);\n    line-height: var(--leading-snug);\n\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out, color 0.15s ease-out;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-family: inherit;\n    user-select: none;\n    cursor: pointer;\n\n    &:focus-visible {\n      box-shadow: 0 0 0 3px var(--ring-color);\n      outline: 2px solid transparent;\n      outline-offset: 2px;\n    }\n\n    &:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n      filter: none;\n    }\n\n    &:hover:not(:disabled) {\n      background-color: color-mix(in srgb, var(--background-600) 50%, transparent);\n      border: var(--border);\n    }\n  }\n\n  .button.primary {\n    --background: var(--accent-600);\n    --foreground: var(--accent-50);\n    --border: var(--border-width-base) solid var(--background);\n  }\n\n  .button.default {\n    --background: var(--background-800);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n  }\n\n  .button.secondary {\n    --background: var(--background-700);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-600);\n  }\n\n  .button.outline {\n    --background: transparent;\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    outline-style: unset !important;\n    \n    &:hover:not(:disabled) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .button.ghost {\n    --background: transparent;\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid transparent;\n\n    @media (hover: hover) {\n      &:hover:not(:disabled) {\n        background-color: var(--background-900);\n      }\n    }\n  }\n\n  .button.danger {\n    --background: color-mix(in srgb, var(--danger-600) 20%, transparent);\n    --foreground: var(--danger-600);\n    --border: var(--border-width-base) solid transparent;\n    --ring-color: var(--danger-600);\n\n    &:hover:not(:disabled) {\n      background-color: color-mix(in srgb, var(--danger-600) 30%, transparent);\n    }\n  }\n\n  .button.sm {\n    @apply px-3 py-1.5;\n    font-size: var(--text-xs);\n  }\n\n  .button.md {\n    @apply px-5 py-2;\n    font-size: var(--text-sm);\n  }\n\n  .button.lg {\n    @apply px-7 py-1.5;\n    font-size: var(--text-sm);\n  }\n\n  .icon-sm {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n}\n",
  "card": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    --background: var(--background-800);\n    --border: var(--background-700);\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    overflow: hidden;\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring, #0066cc);\n    outline-offset: 2px;\n  }\n\n  .header {\n    --border: var(--background-700);\n\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    --background: color-mix(in srgb, var(--background-900) 50%, transparent);\n    --border: var(--background-700);\n\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
  "checkbox": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .checkbox-root {\n    @apply gap-3;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .checkbox-container {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  /* Visual checkbox */\n  .checkbox {\n    --background: var(--background-800);\n    --foreground: var(--accent-50);\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n\n    @apply cursor-pointer;\n    appearance: none;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-xs);\n    outline: none;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    position: relative;\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .checkbox-checkmark {\n    position: absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--accent-50);\n    pointer-events: none;\n  }\n\n  .checkbox-indeterminate {\n    position: absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--accent-50);\n    pointer-events: none;\n  }\n\n  .checkbox:focus-visible {\n    outline: 2px solid transparent;\n    box-shadow: 0 0 0 3px var(--ring-color);\n  }\n\n  .checkbox[data-pressed=\"true\"] {\n    transform: scale(0.92);\n  }\n\n  .checkbox[data-selected=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .checkbox[data-indeterminate=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .checkbox[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  .size-sm .checkbox {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .size-md .checkbox {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .size-lg .checkbox {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-sm);\n  }\n\n  .label-md {\n    font-size: var(--text-md);\n  }\n\n  .label-lg {\n    font-size: var(--text-lg);\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal {\n    color: inherit;\n  }\n\n  .helper-text-error {\n    color: var(--danger-600);\n  }\n\n  .indeterminate {\n  }\n}\n",
  "code": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--background-700);\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    width: 100%;\n    min-width: 0;\n  }\n\n  .header {\n    flex: none;\n    background-color: color-mix(in srgb, var(--background-900) 90%, transparent);\n    display: flex;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: 1px solid var(--background-700);\n    padding: 0.375rem 0.75rem;\n    color: var(--foreground-400);\n  }\n\n  .header-lang {\n    color: var(--foreground-400);\n  }\n\n  .body {\n    position: relative;\n    flex: 1;\n    min-height: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .viewport {\n    overflow-y: hidden;\n    overflow-x: hidden;\n  }\n\n  .viewport :global(pre) {\n    background: transparent;\n    padding: 0;\n    margin: 0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background: var(--background-700);\n    border-radius: 9999px;\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    background: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    width: 100%;\n    overflow-x: auto;\n    background-color: color-mix(in srgb, var(--background-950) 50%, transparent);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    width: 100%;\n    @apply px-4 py-2;\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition: background-color 0.15s ease-out;\n    border-top: 1px solid var(--background-700);\n    background: transparent;\n    cursor: pointer;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover {\n    background-color: var(--background-800);\n  }\n\n  .expand-icon {\n    color: var(--foreground-400);\n    flex-shrink: 0;\n  }\n\n  .copy-button {\n    position: absolute;\n    right: 0.5rem;\n    top: 0.5rem;\n    border-radius: var(--radius-sm);\n    padding: 0.25rem;\n    color: var(--foreground-400);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out;\n    background: transparent;\n    cursor: pointer;\n    border: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1;\n  }\n\n  .copy-button:hover {\n    background-color: var(--background-800);\n    color: var(--foreground-300);\n  }\n\n  .copy-button:focus {\n    opacity: 1;\n  }\n\n  .body:hover .copy-button {\n    opacity: 1;\n  }\n}\n",
  "color": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --background: color-mix(in srgb, var(--background-800) 30%, transparent);;\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n\n  .colorControls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  /* Input styles */\n  .inputGroup {\n    width: 100%;\n    display: flex;\n  }\n\n  .inputGroup > div:nth-child(1) {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .colorInput {\n    width: 100%;\n  }\n\n  .formatSelect {\n    flex-shrink: 0;\n    width: 85px; /* Fixed width for the format selector */\n  }\n\n  .color[data-size=\"sm\"] .formatSelect {\n    width: 75px;\n  }\n\n  /* Canvas Styles */\n  .canvasContainer {\n    position: relative;\n    width: 96%;\n    @apply mx-auto mt-2;\n    cursor: crosshair;\n    touch-action: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .canvasContainer[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .canvas {\n    position: relative;\n    width: 100%;\n    flex: 1;\n    border-radius: none;\n    /* clip-path: inset(0 round var(--radius-sm)); */\n    overflow: hidden;\n  }\n\n  .canvasGradientHue {\n    position: absolute;\n    inset: 0;\n    overflow: hidden;\n    /* border-radius: var(--radius-sm); */\n  }\n\n  .canvasGradientSaturation {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n    border-radius: none;\n  }\n\n  .canvasGradientLightness {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n    border-radius: none\n  }\n\n  .canvasPointer {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid color-mix(in srgb, var(--foreground-200) 50%, transparent);\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  /* Hue Slider Styles */\n  .hueSlider {\n    display: flex;\n    align-items: center;\n    height: 16px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .hueTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .hueThumb {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .hueSlider[data-focus-visible=\"true\"] .hueThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .hueThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .hueThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Opacity Slider Styles */\n  .opacitySlider {\n    display: flex;\n    align-items: center;\n    height: 12px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .opacityTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-800),\n      var(--background-800) 10px,\n      var(--background-700) 10px,\n      var(--background-700) 20px\n    );\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .opacityThumb {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .opacitySlider[data-focus-visible=\"true\"] .opacityThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .opacityThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .opacityThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Recent Colors Styles */\n  .recentColors {\n    display: flex;\n    gap: 0.5rem;\n    overflow-x: auto;\n    padding-bottom: 0.25rem;\n  }\n\n  .recentColorSwatch {\n    flex-shrink: 0;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    cursor: pointer;\n    background: none;\n    padding: 0;\n    outline: none;\n  }\n\n  .recentColorSwatch:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--ring-color);\n  }\n\n  .recentColorSwatch:active {\n    transform: scale(0.95);\n  }\n\n  .recentColorSwatch:focus-visible {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n\n  /* Preview Container - deprecated, use previewSwatch instead */\n  .previewContainer {\n    display: flex;\n    justify-content: center;\n    padding: 0.5rem 0;\n  }\n\n  /* Preview Swatch - inline with input */\n  .previewSwatch {\n    position: relative;\n    width: 36px;\n    height: 36px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    flex-shrink: 0;\n  }\n\n  .previewSwatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 6px,\n      var(--background-800) 6px,\n      var(--background-800) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .previewSwatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .preview {\n    position: relative;\n    width: 64px;\n    height: 64px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n  }\n\n  .preview::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 10px,\n      var(--background-800) 10px,\n      var(--background-800) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .preview::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .canvasContainer {\n    min-height: 160px;\n  }\n}\n",
  "command": "@reference \"tailwindcss\";\n\n@layer components {\n  .palette {\n    --background-default: var(--background-900);\n    --background-hover: var(--background-800);\n    --background-selected: var(--background-800);\n    --background-input: var(--background-900);\n    --border-default: var(--background-700);\n    --fg-default: var(--foreground-300);\n    --fg-muted: var(--foreground-400);\n    --fg-icon: var(--foreground-400);\n    --overlay: rgb(0 0 0 / 0.2);\n    --list-background: var(--background-950);\n    --footer-background: var(--background-800);\n  }\n\n  /* Overlay Container */\n  .overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 999;\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    overflow: hidden;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: blur(4px);\n  }\n\n  /* Content */\n  .content {\n    position: relative;\n    @apply m-2;\n    border-radius: var(--radius-sm);\n    background: var(--background-default);\n    width: 100%;\n    margin-inline: 1rem;\n    max-width: 28rem;\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);\n    animation: fadeInZoomIn 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border-default);\n    overflow: hidden;\n  }\n\n  /* Search Section */\n  .search {\n    border: none;\n    display: flex;\n    padding: 0\n  }\n\n  .search-container {\n    @apply p-1.5 pl-12; \n    position: relative;\n    width: 100%;\n  }\n\n  .search-icon {\n    position: absolute;\n    left: 1.0rem;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 1rem;\n    height: 1rem;\n    display: flex;\n    align-items: center;\n    color: var(--fg-muted);\n    pointer-events: none;\n  }\n\n  .search-input {\n    width: 100%;\n    background-color: var(--background-input);\n    border: none;\n    color: var(--fg-default);\n    padding-block: 0.5rem;\n    font-size: 0.875rem;\n    font-family: inherit;\n  }\n\n  .search-input::placeholder {\n    color: var(--fg-muted);\n  }\n\n  .search-input:focus {\n    outline: none;\n  }\n\n  .search-clear {\n    position: absolute;\n    right: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 0.25rem;\n    border-radius: var(--radius-md);\n    background-color: transparent;\n    color: var(--fg-muted);\n    border: none;\n    cursor: pointer;\n    transition:\n      background-color 0.15s,\n      color 0.15s;\n  }\n\n  .search-clear:hover {\n    background-color: var(--background-hover);\n    color: var(--fg-icon);\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--list-background);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n  }\n\n  .item {\n    display: flex;\n    @apply px-2 py-0.5;\n    border-radius: 0.375rem;\n    align-items: center;\n    justify-content: space-between;\n    cursor: pointer;\n    transition: background-color 0.15s;\n  }\n\n  .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-highlighted=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .item-content {\n    display: flex;\n    align-items: center;\n    gap: 0.625rem;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    color: var(--fg-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-label {\n    font-size: 0.875rem;\n    color: var(--fg-default);\n    font-weight: var(--font-weight-medium);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    color: var(--fg-muted);\n    font-size: 0.875rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--fg-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--fg-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply px-1.5 py-2 gap-2;\n    width: 100%;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    display: flex;\n    align-items: center;\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fadeInZoomIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n}\n",
  "confirmation": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .card {\n    max-width: 28rem;\n  }\n\n  .card-compact {\n    max-width: 21rem;\n  }\n\n  .dialog-overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 50;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: color-mix(in srgb, var(--background-950) 50%, transparent);\n  }\n\n  .dialog-card {\n    max-width: 28rem;\n    margin: 0 1rem;\n  }\n\n  .header {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n  }\n\n  .header-content {\n    flex: 1;\n  }\n\n  .header-title {\n    font-weight: 600;\n    color: var(--foreground-100);\n  }\n\n  .body {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .body-compact {\n    gap: 0.75rem;\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--foreground-danger);\n  }\n\n  .warning-box {\n    padding: 0.75rem;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid;\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    background-color: color-mix(in srgb, var(--background-info) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-info) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-medium {\n    background-color: color-mix(in srgb, var(--background-warning) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-warning) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-high {\n    background-color: color-mix(in srgb, var(--background-warning-dark) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-warning-dark) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-critical {\n    background-color: color-mix(in srgb, var(--background-danger) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-danger) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--foreground-300);\n  }\n\n  .input {\n    width: 100%;\n    margin-top: 0.5rem;\n    padding: 0.5rem 0.75rem;\n    border-radius: var(--radius-sm);\n    background-color: var(--background-800);\n    border: var(--border-width-base) solid var(--background-700);\n    color: var(--foreground-100);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .actions-inline {\n    flex-direction: row;\n  }\n\n  .actions-dialog {\n    flex-direction: row;\n    justify-content: flex-end;\n  }\n}\n",
  "date": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --border: var(--background-700);\n\n    display: inline-flex;\n    flex-direction: column;\n    gap: 0;\n    border-radius: var(--radius-md);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .dayHeaders {\n    @apply px-4 pt-3 pb-1;\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    gap: 0.5rem;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md) var(--radius-md) 0 0;\n    background: var(--background-900);\n  }\n\n  .dayHeader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 500;\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n  }\n\n  .header {\n    display: flex;\n    @apply pl-2 pr-1.5 py-1.5;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .monthYear {\n    font-weight: 500;\n    @apply ml-2;\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .navButton {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 2rem;\n    min-height: 2rem;\n    border-radius: var(--radius-sm);\n    background-color: transparent;\n    color: var(--foreground-400);\n    border: 1px solid transparent;\n    cursor: pointer;\n    font-size: var(--text-sm);\n    font-weight: 500;\n  }\n\n  .navButton:hover {\n    background-color: var(--background-800);\n  }\n\n  .navButton:focus-visible {\n    background: var(--background-800);\n    border-radius: 0px;\n    outline: 0px solid var(--accent-500);\n  }\n\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    @apply gap-1 px-4 pb-4;\n    background-color: var(--background);\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n    background: var(--background-900);\n  }\n\n  .dayCell {\n    --cell-bg: transparent;\n    --cell-text: var(--foreground-300);\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 2rem;\n    @apply py-2 px-2.5;\n    border-radius: var(--radius-base);\n    background-color: var(--cell-bg);\n    color: var(--cell-text);\n    border: 2px solid transparent;\n    cursor: pointer;\n    font-size: var(--text-sm);\n    font-weight: 400;\n  }\n\n  .weekHeader {\n    display: none;\n  }\n\n  .weekNumber {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.dayCell[data-selected=\"true\"] {\n  --cell-bg: var(--background-800);\n  --cell-text: var(--foreground-50);\n  font-weight: 500;\n}\n\n.dayCell[data-today=\"true\"] {\n  --border: transparent;\n  --foreground: var(--foreground-50);\n  --cell-bg: var(--background-800);\n  color: var(--foreground);\n  border-color: var(--border);\n}\n\n.dayCell[data-disabled=\"true\"] {\n  --cell-bg: var(--background-700);\n  --cell-text: var(--foreground-400);\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.dayCell[data-out-of-range=\"true\"] {\n  --cell-text: var(--foreground-400);\n  opacity: 0.5;\n}\n\n.dayCell:hover:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"]) {\n  --cell-bg: var(--background-800);\n}\n\n.dayCell[data-focus-visible=\"true\"]:not([data-disabled=\"true\"]) {\n  outline: 2px solid var(--foreground-300);\n  outline-offset: 2px;\n}\n",
  "expand": "@reference \"tailwindcss\";\n\n@layer components {\n  .expand {\n    --expand-trigger-background: transparent;\n    --expand-trigger-background-hover: var(--background-900);\n    --expand-trigger-foreground: var(--foreground-50);\n    --expand-content-background: transparent;\n    --expand-content-foreground: var(--foreground-300);\n\n    display: flex;\n    flex-direction: column;\n  }\n\n  .expand[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n\n  .trigger {\n    @apply text-left cursor-pointer;\n    display: flex;\n    align-items: stretch;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--expand-trigger-foreground);\n    background-color: var(--expand-trigger-background);\n    border: none;\n    border-radius: var(--radius-sm);\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    @apply px-3 py-2;\n    flex-shrink: 0;\n    color: inherit;\n    border-radius: var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--expand-trigger-background-hover);\n        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n      }\n\n      /* When the icon itself is hovered, it should be isolated and fully rounded */\n      .trigger:not([data-disabled]) &:hover {\n        border-radius: var(--radius-sm);\n      }\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .expand:has(.trigger[data-expanded=\"true\"]) .icon > * {\n    transform: rotate(180deg);\n  }\n\n  /* from=\"above\": content expands upward above the trigger */\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n\n    .icon > * {\n      transform: rotate(180deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(0deg);\n    }\n  }\n\n  /* from=\"left\": content appears left of trigger */\n  .expand:has(.content[data-from=\"left\"]) {\n    flex-direction: row-reverse;\n    align-items: flex-start;\n\n    .trigger {\n      width: auto;\n      flex-direction: column;\n    }\n\n    .icon > * {\n      transform: rotate(-90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(90deg);\n    }\n  }\n\n  /* from=\"right\": content appears right of trigger */\n  .expand:has(.content[data-from=\"right\"]) {\n    flex-direction: row;\n    align-items: flex-start;\n\n    .trigger {\n      width: auto;\n      flex-direction: column;\n    }\n\n    .icon > * {\n      transform: rotate(90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(-90deg);\n    }\n  }\n\n  /* Horizontal content animation */\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-columns: 1fr;\n    }\n\n    .contentInner {\n      min-height: unset;\n      min-width: 0;\n    }\n  }\n\n  .title {\n    flex: 1;\n    font-weight: var(--font-weight-medium);\n    @apply py-2 pl-3;\n    display: flex;\n    align-items: center;\n    border-radius: var(--radius-sm) 0 0 var(--radius-sm);\n    min-width: 0;\n    overflow: hidden;\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--expand-trigger-background-hover);\n      }\n\n      /* When icon is hovered, remove background from title */\n      .trigger:not([data-disabled]):has(.icon:hover) & {\n        background-color: transparent;\n      }\n    }\n\n    .trigger:not([data-disabled]) {\n      background-color: transparent;\n    }\n  }\n\n  .content {\n    display: grid;\n    grid-template-rows: 0fr;\n    overflow: hidden;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-rows: 1fr;\n    }\n  }\n\n  .contentInner {\n    overflow: hidden;\n    min-height: 0;\n    color: var(--expand-content-foreground);\n    background-color: var(--expand-content-background);\n  }\n\n  .expand:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
  "flex": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n    width: 100%;\n  }\n\n  /* Direction variants */\n  .flex.row {\n    flex-direction: row;\n  }\n\n  .flex.column {\n    flex-direction: column;\n  }\n\n  /* Wrap variants */\n  .flex.wrap {\n    flex-wrap: wrap;\n  }\n\n  .flex.nowrap {\n    flex-wrap: nowrap;\n  }\n\n  /* Gap variants */\n  .flex.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .flex.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .flex.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .flex.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .flex.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start {\n    justify-content: flex-start;\n  }\n\n  .flex.justify-flex-end {\n    justify-content: flex-end;\n  }\n\n  .flex.justify-center {\n    justify-content: center;\n  }\n\n  .flex.justify-space-between {\n    justify-content: space-between;\n  }\n\n  .flex.justify-space-around {\n    justify-content: space-around;\n  }\n\n  .flex.justify-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align-items variants */\n  .flex.align-flex-start {\n    align-items: flex-start;\n  }\n\n  .flex.align-flex-end {\n    align-items: flex-end;\n  }\n\n  .flex.align-center {\n    align-items: center;\n  }\n\n  .flex.align-stretch {\n    align-items: stretch;\n  }\n\n  .flex.align-baseline {\n    align-items: baseline;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
  "frame": "@layer components {\n  .frame {\n    position: relative;\n    display: inline-block;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  .frame[data-has-measurements=\"true\"] {\n    border: none;\n  }\n\n  .background {\n    position: absolute;\n    inset: 0;\n    z-index: 0;\n    background: var(--frame-bg, currentColor);\n    pointer-events: none;\n  }\n\n  .svgOverlay {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n    overflow: visible; /* Crucial: Allows strokes to bleed slightly outside the path */\n  }\n\n  .pathStroke {\n    fill: none;\n    stroke: var(--frame-stroke, currentColor);\n    stroke-width: var(--frame-stroke-width, 1px);\n  }\n\n  .content {\n    position: relative;\n    z-index: 2;\n    height: 100%;\n  }\n\n  /* Padding variants applied only to the content layer */\n  .padding-none .content { padding: 0; }\n  .padding-small .content { padding: 0.5rem; }\n  .padding-medium .content { padding: 1rem; }\n  .padding-large .content { padding: 2rem; }\n\n  /* Variant styling examples */\n  .variant-default { --frame-bg: rgba(255, 255, 255, 0.05); --frame-stroke: rgba(255, 255, 255, 0.2); }\n  .variant-accent { --frame-stroke: #00f2ff; --frame-bg: rgba(0, 242, 255, 0.05); }\n  .variant-subtle { --frame-stroke: rgba(255, 255, 255, 0.1); --frame-bg: transparent; }\n}\n",
  "gallery": "@reference \"tailwindcss\";\n\n@layer components {\n  .item {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --border-focus: var(--accent-500);\n\n    display: flex;\n    flex-direction: column;\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    cursor: pointer;\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    flex-direction: row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n    --background: var(--background-950);\n\n    position: relative;\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n    overflow: hidden;\n  }\n\n  .view > img,\n  .view > video {\n      width: 100%;\n      height: 100%;\n    object-fit: cover;\n  }\n\n  .body {\n      display: flex;\n      flex-direction: column;\n    gap: 0.25rem;\n    padding: 0.75rem;\n    align-self: flex-start;\n    min-width: 0;\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-50);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n}\n",
  "grid": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    display: grid;\n    width: 100%;\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: var(--grid-gap, calc(var(--spacing, 0.25rem) * 4));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    gap: var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 2));\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-xl, var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap {\n    row-gap: var(--grid-row-gap);\n  }\n\n  .grid.has-col-gap {\n    column-gap: var(--grid-col-gap);\n  }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      gap: calc(var(--spacing, 0.25rem) * 2);\n    }\n  }\n}\n",
  "group": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --radius-basis: calc(var(--spacing) * 1.5);\n    --padding: var(--radius-basis);\n    \n    --background: var(--background-950);\n    --border: var(--background-700);\n\n    display: flex;\n    width: fit-content;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    \n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    overflow: hidden;\n    \n    padding: var(--padding);\n  }\n\n  /* Orientations */\n  .group.horizontal {\n    flex-direction: row;\n    align-items: stretch;\n  }\n\n  .group.vertical {\n    flex-direction: column;\n  }\n\n  /* Spacing */\n  .group.none {\n    --padding: 0;\n    @apply gap-0;\n  }\n\n  .group.sm {\n    --radius-basis: calc(var(--spacing) * 1.25);\n    --padding: var(--radius-basis);\n    @apply space-x-1;\n  }\n\n  /* Variants */\n  .group.ghost {\n    --background: transparent;\n    background-color: transparent;\n    border: none;\n    overflow: visible;\n    @apply gap-1;\n  }\n\n  .item {\n    display: flex;\n    align-items: stretch;\n  }\n\n  .group:not(.ghost) .item .group-item,\n  .group:not(.ghost) .group-input-wrapper input,\n  .group:not(.ghost) .item .group-select-wrapper {\n    border: none;\n  }\n\n  .group.none:not(.ghost) .item .group-item,\n  .group.none:not(.ghost) .group-input-wrapper input,\n  .group.none:not(.ghost) .item .group-select-wrapper,\n  .group.none:not(.ghost) .item .trigger {\n    border-radius: 0;\n  }\n\n  .group.none:not(.ghost) .item .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n  }\n\n  .group.sm:not(.ghost) .item .group-item,\n  .group.sm:not(.ghost) .item .trigger,\n  .group.sm:not(.ghost) .group-select-wrapper .group-item,\n  .group.sm:not(.ghost) .group-select-wrapper .trigger {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.sm:not(.ghost) .group-input-wrapper input {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .group-item {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .group-item {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .item.divider {\n    padding: 0;\n    display: flex;\n    align-items: stretch;\n  }\n\n  .item.divider > [role=\"separator\"] {\n    height: 100%;\n    width: 100%;\n  }\n\n  .group.horizontal .item.divider {\n    margin-top: calc(var(--padding) * -1);\n    margin-bottom: calc(var(--padding) * -1);\n  }\n\n  .group.vertical .item.divider {\n    margin-left: calc(var(--padding) * -1);\n    margin-right: calc(var(--padding) * -1);\n  }\n\n  .group.ghost:not(.none) .item .group-item:not(.active) {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border: var(--border-width-base) solid transparent;\n  }\n\n  /* ghost + none: flat children — no borders or radius */\n  .group.ghost.none {\n    @apply gap-0;\n  }\n\n  .group.ghost.none .item .group-item,\n  .group.ghost.none .group-item.active {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-input-wrapper input {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n    border: none;\n    border-radius: 0;\n  }\n\n  .group:not(.ghost) .item .group-item:focus-visible,\n  .group:not(.ghost) .item .trigger:focus-visible,\n  .group-input-wrapper input:focus-visible {\n    outline: none;\n    box-shadow: inset 0 0 0 1px var(--accent-500);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group.ghost .item .group-item:focus-visible,\n  .group.ghost .item .trigger:focus-visible {\n    outline: none;\n    box-shadow: 0 0 0 1px var(--accent-500);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group-input-wrapper {\n    display: flex;\n    align-items: stretch;\n    height: 100%;\n    flex: 1;\n    overflow: visible;\n  }\n\n  .group-input-wrapper input {\n    height: 100%;\n  }\n\n  .item .group-item {\n    display: flex;\n    height: 100%;\n  }\n\n  .group.vertical .item .group-item {\n    width: 100%;\n  }\n\n  .group.sm .item button.group-item {\n    padding: calc(var(--spacing) * 1.50) calc(var(--spacing) * 2.00);\n  }\n\n  .group.none .item button.group-item {\n    padding: calc(var(--spacing) * 2.00) calc(var(--spacing) * 2.50);\n  }\n\n  .group-select-wrapper {\n    display: flex;\n    align-items: stretch;\n    padding: 0;\n    border: none;\n    background-color: transparent;\n  }\n\n  .group.none:not(.ghost) .trigger {\n    border-radius: 0;\n  }\n\n  .trigger {\n    border: none;\n  }\n\n  .group-select-wrapper .select {\n    height: 100%;\n    width: 100%;\n  }\n\n  .group-item.active {\n    position: relative;\n  }\n\n  .group.ghost .group-item.active {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group:not(.ghost) .group-item.active {\n    background-color: var(--background-800);\n    font-weight: 500;\n  }\n}\n",
  "input": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-400);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    outline: none;\n    box-sizing: border-box;\n    @apply px-3 py-2;\n    transition: transform 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop), background-color 150ms var(--ease-snappy-pop);\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px color-mix(in srgb, var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      border-color: var(--ring-color);\n      /* box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring-color) 20%, transparent); */\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-400);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-active] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .input[data-variant=\"ghost\"] {\n    --background: transparent;\n    --border: transparent;\n    --background-hover: transparent;\n    --border-hover: transparent;\n\n    &[data-focus-visible] {\n      box-shadow: none;\n    }\n  }\n\n  .icon-wrapper {\n    position: absolute;\n    top: 50%;\n    display: flex;\n    align-items: center;\n    color: var(--foreground-400);\n    pointer-events: none;\n    transform: translateY(-50%);\n    z-index: 10;\n  }\n\n  .prefix-icon {\n    left: 0.60rem;\n  }\n\n  .suffix-icon {\n    right: 1.00rem;\n  }\n\n  .container {\n    position: relative;\n    width: 100%;\n  }\n\n  .number-controls {\n    position: absolute;\n    top: 50%;\n    right: 0.50rem;\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n    height: 1.5rem;\n    transform: translateY(-50%);\n    pointer-events: auto;\n    z-index: 10;\n  }\n\n  .numberControls.disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .spin-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex: 1;\n    width: 1.25rem;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: var(--foreground-400);\n    cursor: pointer;\n    transition: color 150ms var(--ease-snappy-pop);\n\n    &:hover:not(:disabled) {\n      color: var(--foreground-400);\n    }\n\n    &:active:not(:disabled) {\n      color: var(--accent-500);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n  }\n}\n",
  "list": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    --foreground: var(--foreground-50);\n\n    max-width: 28rem;\n    margin-left: auto;\n    margin-right: auto;\n    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\n    color: var(--foreground);\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .header.sticky {\n    position: sticky;\n    top: 0;\n  }\n\n  .container[data-spacing=\"sm\"] .header {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.25rem;\n    padding-bottom: 0.25rem;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--foreground-50);\n  }\n\n  .header > :last-child {\n    color: var(--foreground-400);\n  }\n\n  .item {\n    --background-hover: var(--background-800);\n    --background-highlighted: var(--background-800);\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    @apply py-1 px-2;\n    cursor: pointer;\n  }\n\n  .container .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    background-color: var(--background-highlighted);\n  }\n\n  .container[data-spacing=\"sm\"] .item {\n    padding: 0.5rem 0.75rem;\n    gap: 0.375rem;\n  }\n\n  .checkbox {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n  }\n\n  .media {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2rem;\n    height: 2rem;\n    flex-shrink: 0;\n  }\n\n  .desc {\n    font-size: 0.875rem;\n    color: var(--foreground-400);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .action-group {\n    display: flex;\n    align-items: center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .action-group[data-justify=\"space-between\"] {\n    justify-content: space-between;\n  }\n\n  .action-group[data-justify=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .action-group[data-justify=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .footer {\n    padding: 1.5rem;\n    padding-bottom: 3rem;\n    display: flex;\n  }\n\n  .footer[data-align=\"center\"] {\n    justify-content: center;\n  }\n\n  .footer[data-align=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .footer[data-align=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
  "mask": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
  "menu": "@reference \"tailwindcss\";\n\n@layer components {\n  .content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    --menu-animation: none;\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slideInFromTop 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slideOutToTop 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .checkboxItem {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .radioItem {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .itemIndicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-300);\n    margin-left: auto;\n  }\n\n  .subTrigger {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .subTriggerChevron {\n    flex-shrink: 0;\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subContent {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    --menu-animation: none;\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slideInFromTop 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slideOutToTop 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .label {\n    padding: var(--padding);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    font-size: var(--text-xs);\n    letter-spacing: 0.1em;\n    color: var(--foreground-400);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n}\n",
  "modal": "@reference \"tailwindcss\";\n\n@layer components {\n  .overlay {\n    --modal-bg: var(--background-900);\n    --modal-bg-footer: var(--background-800);\n    --modal-border: var(--background-700);\n    --modal-title-color: var(--foreground-100);\n    --modal-text-color: var(--foreground-300);\n    --modal-close-color: var(--foreground-400);\n    --modal-close-hover: var(--foreground-200);\n  }\n\n  .backdrop {\n    position: absolute;\n    inset: 0;\n    background-color: rgb(0 0 0 / 0.5);\n    backdrop-filter: blur(4px);\n    transition: opacity 200ms var(--ease-gentle-ease);\n    cursor: pointer;\n  }\n\n  .modal {\n    position: relative;\n    z-index: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    max-height: 90vh;\n    margin: 1rem;\n    background-color: var(--modal-bg);\n    border: var(--border-width-base) solid var(--modal-border);\n    border-radius: var(--radius-md);\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);\n    animation: modalIn 200ms var(--ease-snappy-pop);\n    pointer-events: auto;\n    overflow: hidden;\n  }\n\n  @keyframes modalIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  .header {\n    @apply py-4 px-6 gap-2;\n\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: var(--border-width-base) solid var(--modal-border);\n  }\n\n  .title {\n    margin: 0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--modal-title-color);\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-left: auto;\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: var(--modal-close-color);\n    transition: color 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  }\n\n  .closeButton:hover {\n    color: var(--modal-close-hover);\n  }\n\n  .closeButton:active {\n    transform: scale(0.92);\n  }\n\n  .closeButton:focus {\n    outline: 2px solid var(--modal-close-hover);\n    outline-offset: 2px;\n    border-radius: 0.25rem;\n  }\n\n  .closeIcon {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--modal-text-color);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background: var(--modal-border);\n    border-radius: 3px;\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    background: var(--modal-close-color);\n  }\n\n  .footer {\n    @apply py-4 px-6 gap-4;\n\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    background-color: var(--background-950);\n    border-top: var(--border-width-base) solid var(--modal-border);\n  }\n\n  /* Size variants */\n  .size-fit {\n    width: fit-content;\n  }\n\n  .size-auto {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .modal {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
  "page": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    position: relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    align-items: center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .paddingNone {\n    padding: 0;\n  }\n\n  .paddingSm {\n    padding: var(--spacing-sm, 0.5rem);\n  }\n\n  .paddingMd {\n    padding: var(--spacing-md, 1rem);\n  }\n\n  .paddingLg {\n    padding: var(--spacing-lg, 1.5rem);\n  }\n\n  .paddingXl {\n    padding: var(--spacing-xl, 2rem);\n  }\n}\n",
  "panel": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    height: 100%;\n    background: inherit;\n    min-width: 0;\n    min-height: 0;\n  }\n\n  .panel[data-stacked=\"true\"] {\n    flex-direction: column;\n  }\n\n  .header {\n    flex-shrink: 0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    flex: 1;\n    display: flex;\n    min-width: 0;\n    min-height: 0;\n    overflow: auto;\n  }\n\n  .footer {\n    flex-shrink: 0;\n    background: inherit;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    flex-shrink: 0;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--background-700);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--background-700);\n  }\n\n  /* Toggle */\n  .toggle {\n    display: flex;\n    align-items: center;\n  }\n\n  /* Group */\n  .group {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] {\n    flex-direction: column;\n  }\n\n  /* Resize handle */\n  .resize {\n    flex-shrink: 0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n    position: relative;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--background-700, #374151);\n    transform: translateX(-50%);\n    transition: width 0.15s ease;\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before {\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"]:hover::before {\n    width: auto;\n    height: 2px;\n  }\n\n  .resize[data-resizing=\"true\"]::before {\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone {\n    gap: 0;\n  }\n\n  .spacingSm {\n    gap: var(--spacing-sm, 0.5rem);\n  }\n\n  .spacingMd {\n    gap: var(--spacing-md, 1rem);\n  }\n\n  .spacingLg {\n    gap: var(--spacing-lg, 1.5rem);\n  }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked {\n      flex-direction: column;\n    }\n  }\n}\n",
  "progress": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    --track-background: var(--background-700);\n    --fill-background: var(--accent-500);\n\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm {\n    height: 0.25rem;\n  }\n\n  .progress.md {\n    height: 0.5rem;\n  }\n\n  .progress.lg {\n    height: 0.75rem;\n  }\n\n  .fill {\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.default {\n    --fill-background: var(--accent-500);\n  }\n\n  .fill.success {\n    --fill-background: var(--success-500);\n  }\n\n  .fill.warning {\n    --fill-background: var(--warning-500);\n  }\n\n  .fill.error {\n    --fill-background: var(--danger-500);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    width: 100%;\n  }\n\n  .wrapper.hasLabel {\n    @apply space-y-1;\n  }\n\n  .labelRow {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% {\n      transform: translateX(-100%);\n    }\n    100% {\n      transform: translateX(400%);\n    }\n  }\n}\n",
  "radio": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .radio-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .radio-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .radio {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n    --radio-dot-unchecked: transparent;\n    --radio-dot-checked: var(--accent-50);\n    --radio-hover-background: var(--accent-500);\n    --radio-hover-border: var(--background-500);\n    --radio-error-border: var(--danger-500);\n\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1.25rem;\n    height: 1.25rem;\n    cursor: pointer;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: 0.6;\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: rgb(59, 130, 246);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    font-weight: var(--font-weight-medium);\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground, var(--foreground-300));\n    font-size: inherit;\n    line-height: inherit;\n    cursor: pointer;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled, var(--foreground-400));\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper, var(--foreground-400));\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error, var(--danger-500));\n  }\n  /* Size variants */\n  .radio.sm {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n\n  /* Variants */\n  .radio.primary[data-checked=\"true\"] {\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n  }\n\n  .radio.secondary {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline {\n    --radio-background-unchecked: transparent;\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline[data-checked=\"true\"] {\n    --radio-background-unchecked: color-mix(in srgb, var(--accent-500) 15%, transparent);\n    --radio-border-unchecked: var(--accent-500);\n    --radio-dot-unchecked: var(--accent-500);\n  }\n}\n",
  "scroll": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    position: relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n    min-height: 0;\n  }\n\n  .horizontal {\n    --scrollbar-height: 12px;\n  }\n\n  .content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-right: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .track {\n    position: absolute;\n    z-index: 10;\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    background-color: transparent;\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: transparent;\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs) * 0.80);\n    background-color: var(--background-700);\n    transition-property: background-color, width, height;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover {\n    background-color: var(--background-600);\n  }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--background-500);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: 150ms;\n  }\n\n  .vertical .thumb:hover {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .vertical[data-dragging=\"true\"] .thumb {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: 150ms;\n  }\n\n  .horizontal .thumb:hover {\n    height: 8px;\n    margin-top: 4px;\n  }\n\n  .horizontal[data-dragging=\"true\"] .thumb {\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
  "select": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    padding: 0;\n    gap: 0;\n    font-size: var(--text-sm);\n    background-color: color-mix(in srgb, var(--background-800) 50%, transparent);\n    color: var(--foreground-300);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n    user-select: none;\n    cursor: pointer;\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: color-mix(in srgb, var(--background-600) 50%, transparent);\n    }\n\n    &[aria-expanded=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .trigger {\n    display: flex;\n    align-items: stretch;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    user-select: none;\n    flex: 1;\n    gap: 0;\n    height: 100%;\n    min-width: 0;\n    padding: var(--padding) calc(var(--padding) * 1.50);\n\n    @media (hover: hover) {\n      &:not(:disabled):hover .icon-section {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n\n      &:not(:disabled):hover .value-section:not(:empty) {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 1px var(--ring-color);\n      outline-offset: 2px;\n    }\n\n    :global(.group) &:focus-visible {\n      outline: none;\n    }\n  }\n\n  button.trigger {\n    padding: 0;\n  }\n\n  .value-section {\n    display: flex;\n    align-items: center;\n    flex: 1;\n    min-width: 0;\n    padding: var(--padding) calc(var(--padding) * 1.50);\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n    gap: 0.5rem;\n\n    &:only-child {\n      border-radius: var(--inner-radius);\n      justify-content: center;\n    }\n\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    padding: var(--padding) calc(var(--padding) * 1.50);\n    border-radius: 0 var(--inner-radius) var(--inner-radius) 0;\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 0.7rem;\n    height: 0.7rem;\n    opacity: 0.7;\n  }\n\n  .select[aria-expanded=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    min-width: 0;\n    background: transparent;\n    border: none;\n    cursor: inherit;\n    padding: 0;\n  }\n\n  .value-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .value-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    border-radius: var(--radius);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n\n    &[data-state=\"open\"][data-placement=\"bottom\"] {\n      animation: slideInFromTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"open\"][data-placement=\"top\"] {\n      animation: slideInFromBottom 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"bottom\"] {\n      animation: slideOutToTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"top\"] {\n      animation: slideOutToBottom 0.15s var(--ease-snappy-pop);\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n\n    &[data-selected=\"true\"] {\n      color: var(--foreground-300);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &[data-highlighted=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n  }\n\n  .item-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .item-indicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-300);\n    margin-left: auto;\n  }\n\n  .item-content {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .item-text {\n    flex: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-with-description {\n    align-items: flex-start;\n    @apply py-2;\n  }\n\n  .item-icon-with-description {\n    margin-top: 0.125rem;\n  }\n\n  .item-indicator-with-description {\n    margin-top: 0.125rem;\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideInFromBottom {\n    from {\n      opacity: 0;\n      translate: 0 2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n\n  @keyframes slideOutToBottom {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 2px;\n    }\n  }\n\n  .select:has(.trigger[data-variant=\"ghost\"]) {\n    background: transparent;\n    border-color: transparent;\n\n    &[data-pressed]:not([data-disabled]),\n    &[aria-expanded=\"true\"] {\n      background: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .placeholder {\n    color: var(--foreground-400);\n  }\n\n  .icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    flex-shrink: 0;\n  }\n\n  .select[data-mode=\"multiple\"] .item {\n    gap: 0.5rem;\n  }\n\n  .subTrigger {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n    cursor: default;\n    user-select: none;\n    outline: none;\n\n    &[data-highlighted=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted=\"true\"]) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .subTriggerChevron {\n    flex-shrink: 0;\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n    opacity: 0.6;\n  }\n\n  .subContent {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    position: absolute;\n    z-index: 50001;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    border-radius: var(--radius);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n\n  }\n}\n",
  "slider": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] {\n    @apply h-6;\n  }\n\n  .slider[data-size=\"md\"] {\n    @apply h-8;\n  }\n\n  .slider[data-size=\"lg\"] {\n    @apply h-10;\n  }\n\n  .slider[data-disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n    --background: var(--background-600);\n    --background-disabled: var(--background-500);\n\n    position: relative;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: 9999px;\n    background-color: var(--background);\n    display: flex;\n    align-items: center;\n  }\n\n  .slider[data-disabled] .track {\n    background-color: var(--background-disabled);\n  }\n\n  .slider[data-size=\"sm\"] .track {\n    height: var(--track-height-sm);\n  }\n\n  .slider[data-size=\"md\"] .track {\n    height: var(--track-height-md);\n  }\n\n  .slider[data-size=\"lg\"] .track {\n    height: var(--track-height-lg);\n  }\n\n  .range {\n    --background: var(--accent-500);\n    --background-disabled: var(--background-600);\n\n    position: absolute;\n    height: 100%;\n    background-color: var(--background);\n    transition: background-color 200ms var(--ease-snappy-pop);\n  }\n\n  .slider[data-disabled] .range {\n    background-color: var(--background-disabled);\n  }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n    --background: var(--accent-500);\n    --background-focus: var(--accent-400);\n\n    display: block;\n    background-color: var(--background);\n    border-radius: 9999px;\n    cursor: grab;\n    outline: none;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--background-focus);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
  "switch": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --track-background-unchecked: var(--background-700);\n    --track-background-checked: var(--accent-500);\n    --track-background-hover: var(--accent-600);\n    --track-background-active: var(--accent-600);\n    --track-background-disabled: var(--background-800);\n    --thumb-background-unchecked: var(--background-500);\n    --thumb-background-checked: var(--accent-50);\n    --border: var(--background-700);\n    --border-hover: var(--accent-500);\n    --border-active: var(--accent-600);\n    --radius: 0.375rem;\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .switch-track {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--accent-500);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n}\n\n.md {\n  width: 1.75rem;\n  height: 1rem;\n}\n\n.md .switch-thumb {\n  width: 0.5rem;\n  height: 0.5rem;\n}\n\n.lg {\n  width: 2.75rem;\n  height: 1.5rem;\n}\n\n.lg .switch-thumb {\n  width: 1rem;\n  height: 1rem;\n}\n\n.pill {\n  --radius: 9999px;\n}\n\n.round {\n  --radius: 0.375rem;\n}\n\n.switch[data-focus-visible] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-500) 40%, transparent);\n}\n",
  "tabs": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .tabsList {\n    @apply gap-3 py-1;\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    position: relative;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: auto;\n      min-width: 120px;\n      height: 100%;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--background-700);\n      align-items: stretch;\n    }\n  }\n\n  .indicator {\n    --indicator-padding: 2px;\n\n    position: absolute;\n    background-color: var(--accent-500);\n    border-radius: var(--radius-xs);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    will-change: transform;\n    pointer-events: none;\n  }\n\n  .indicatorDefault {\n    background-color: color-mix(in srgb, var(--background-700) 50%, transparent);;\n    border-radius: var(--radius-sm);\n  }\n\n  .indicatorUnderline {\n    background-color: var(--accent-500);\n    border-radius: 0;\n  }\n\n  .tabsTrigger {\n    @apply px-2 py-1.5;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    background-color: transparent;\n    border: none;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    position: relative;\n    z-index: 1;\n    transition: color 0.15s ease, background-color 0.15s ease;\n    border-radius: var(--radius-sm);\n    flex-shrink: 0;\n\n\n    &:not([data-disabled]) {\n      &:hover {\n        color: var(--foreground-200);\n      }\n\n      &:active {\n        color: var(--foreground-50);\n      }\n    }\n\n    &[data-selected=\"true\"] {\n      color: var(--foreground-50);\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      .tabsList:not([data-variant=\"underline\"]) & {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n\n      .tabsList[data-variant=\"underline\"] & {\n        border-bottom-color: var(--accent-500);\n      }\n\n      .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--accent-500);\n      }\n    }\n\n    &[data-focus-visible] {\n      background: var(--background-800);\n      outline: none;\n    }\n\n    &[data-disabled=\"true\"] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .tabsList[data-variant=\"underline\"] & {\n      background-color: transparent;\n      border-radius: 0;\n      border-bottom: 2px solid transparent;\n    }\n\n    .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      border-left-color: var(--accent-500);\n      border-bottom: none;\n    }\n  }\n\n  .triggerIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    flex-shrink: 0;\n  }\n\n  .tabsContent {\n    flex: 1;\n    width: 100%;\n    padding: 0;\n    outline: none;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &[data-variant=\"default\"] {\n      padding-top: 1rem;\n    }\n\n    &[data-variant=\"underline\"] {\n      padding-top: 1rem;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .tabsList {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0;\n      }\n    }\n\n    .tabsTrigger {\n      @apply px-1 py-1;\n      font-size: var(--text-xs);\n\n      .tabsList[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
  "textarea": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-400);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    resize: vertical;\n    @apply px-3 py-2;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        border-color: var(--border-hover);\n      }\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring-color) 15%, transparent);\n      transform: scale(1.01);\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-400);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--danger-600) 25%, transparent);\n      }\n    }\n\n    &[data-resizable=\"false\"] {\n      resize: none;\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    font-size: var(--text-xs);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    width: 100%;\n  }\n\n  .characterCount {\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .characterCount[data-over-limit] {\n    color: var(--danger-600);\n  }\n}\n",
  "toast": "@reference \"tailwindcss\";\n\n@layer components {\n  .toast {\n    --background: var(--background-900);\n    --foreground: var(--foreground-200);\n    --border: var(--background-600);\n    @apply py-2 px-4;\n\n    width: 100%;\n    max-width: 28rem;\n    display: flex;\n    align-items: flex-start;\n    gap: var(--spacing-3);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n  }\n\n  .icon {\n    flex-shrink: 0;\n    @apply mr-4 mt-2;\n    width: 1.25rem;\n    height: 1.25rem;\n    color: currentColor;\n  }\n\n  .content {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-md);\n    line-height: var(--leading-tight);\n    margin: 0;\n  }\n\n  .description {\n    @apply mt-1;\n    font-weight: var(--font-weight-normal);\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n  }\n\n  .closeButton {\n    @apply p-2;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: transparent;\n    border: none;\n    border-radius: var(--radius-sm);\n    cursor: pointer;\n    opacity: 0.6;\n    transition: opacity 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n\n    @media (hover: hover) {\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n.toast.default {\n  --background: var(--background-900);\n  --foreground: var(--foreground-200);\n  --border: var(--background-600);\n}\n\n.toast.default .title {\n  color: var(--foreground-100);\n}\n\n.toast.default .description {\n  color: var(--foreground-300);\n}\n\n.toast.destructive {\n  --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--danger-600) 40%, var(--background-900));\n}\n\n.toast.destructive .title {\n  color: var(--foreground-100);\n}\n\n.toast.destructive .description {\n  color: var(--foreground-300);\n}\n\n.toast.destructive .icon {\n  color: var(--danger-600);\n}\n\n.toast.destructive .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--danger-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.success {\n  --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--success-600) 40%, var(--background-900));\n}\n\n.toast.success .title {\n  color: var(--foreground-100);\n}\n\n.toast.success .description {\n  color: var(--foreground-300);\n}\n\n.toast.success .icon {\n  color: var(--success-600);\n}\n\n.toast.success .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--success-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.info {\n  --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--info-600) 40%, var(--background-900));\n}\n\n.toast.info .title {\n  color: var(--foreground-100);\n}\n\n.toast.info .description {\n  color: var(--foreground-300);\n}\n\n.toast.info .icon {\n  color: var(--info-600);\n}\n\n.toast.info .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--info-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.warning {\n  --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--warning-600) 40%, var(--background-900));\n}\n\n.toast.warning .title {\n  color: var(--foreground-100);\n}\n\n.toast.warning .description {\n  color: var(--foreground-300);\n}\n\n.toast.warning .icon {\n  color: var(--warning-600);\n}\n\n.toast.warning .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--warning-500) 20%, var(--background-900));\n    }\n  }\n}\n",
  "tooltip": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: inline-block;\n  }\n\n  .root {\n    position: absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n    pointer-events: none;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  [data-scrolling] .content {\n    transition: none;\n  }\n\n  .content-frame {\n    --background: var(--background-900);\n    --foreground: var(--foreground-200);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    display: block;\n    padding: 0.25rem 0.5rem;\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border);\n    border-radius: var(--radius-sm);\n    font-size: var(--text-sm);\n    white-space: nowrap;\n  }\n}\n"
};

export const generatedSourceCode: Record<string, ComponentSourceCode> = {
  "anchor": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport { Popover } from \"@/components/Popover\";\nimport styles from \"./Anchor.module.css\";\n\ntype Orientation = \"horizontal\" | \"vertical\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nconst DASHED_DIMENSIONS = {\n  sm: { thickness: 1, dashLength: 8, gapLength: 4 },\n  md: { thickness: 2, dashLength: 8, gapLength: 4 },\n  lg: { thickness: 4, dashLength: 10, gapLength: 6 },\n} as const;\n\nconst DOTTED_DIMENSIONS = {\n  sm: { thickness: 1, radius: 0.5, spacing: 6 },\n  md: { thickness: 2, radius: 1, spacing: 8 },\n  lg: { thickness: 4, radius: 2, spacing: 12 },\n} as const;\n\nfunction getDashedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];\n  const totalLength = dashLength + gapLength;\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\nfunction getDottedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\n// --- Sub-components ---\n\nexport interface AnchorPreviewProps\n  extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n}\n\nconst AnchorPreview = React.forwardRef<HTMLSpanElement, AnchorPreviewProps>(\n  ({ children }, ref) => {\n    return <span ref={ref as React.Ref<HTMLSpanElement>} style={{ display: \"none\" }}>{children}</span>;\n  },\n);\nAnchorPreview.displayName = \"Anchor.Preview\";\n\nexport interface AnchorUnderlineProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Controls the line style of the underline */\n  variant?: \"solid\" | \"dashed\" | \"dotted\";\n}\n\nconst AnchorUnderline = React.forwardRef<HTMLDivElement, AnchorUnderlineProps>(\n  ({ className, variant = \"solid\", style, ...props }, ref) => {\n    const getMaskStyles = (): React.CSSProperties => {\n      if (variant === \"solid\") {\n        return {};\n      }\n\n      const orientation = \"horizontal\";\n      const size = \"sm\";\n\n      const svgDataUri =\n        variant === \"dashed\"\n          ? getDashedMaskSvg(orientation, size)\n          : getDottedMaskSvg(orientation, size);\n\n      const maskRepeat = \"repeat-x\";\n      const encodedSvg = `url(\"data:image/svg+xml,${svgDataUri}\")`;\n\n      return {\n        WebkitMaskImage: encodedSvg,\n        maskImage: encodedSvg,\n        WebkitMaskRepeat: maskRepeat,\n        maskRepeat: maskRepeat,\n      } as React.CSSProperties;\n    };\n\n    return (\n      <span\n        ref={ref}\n        className={cn(styles.underline, className)}\n        style={{ ...getMaskStyles(), ...style }}\n        {...props}\n      />\n    );\n  }\n);\nAnchorUnderline.displayName = \"Anchor.Underline\";\n\n// --- Main Anchor Component ---\n\nexport interface AnchorProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onChange\"> {\n  children?: React.ReactNode;\n  /** Additional CSS class for the anchor element */\n  className?: string;\n  /** URL the anchor navigates to */\n  href?: string;\n  /** Browsing context for the link (e.g. \"_blank\") */\n  target?: string;\n}\n\nconst AnchorRoot = React.forwardRef<HTMLAnchorElement | HTMLSpanElement, AnchorProps>(\n  ({ className, children, href, target = \"_blank\", ...props }, ref) => {\n    const [isOpen, setIsOpen] = React.useState(false);\n    let previewContent: React.ReactNode = null;\n    let hasUnderline = false;\n\n    const childrenArray = React.Children.toArray(children);\n\n    // Extract preview content and filter it out from rendered children\n    const filteredChildren = childrenArray.filter((child) => {\n      if (React.isValidElement(child)) {\n        if (child.type === AnchorPreview) {\n          previewContent = (child.props as any).children;\n          return false;\n        }\n        if (child.type === AnchorUnderline) {\n          hasUnderline = true;\n        }\n      }\n      return true;\n    });\n\n    // Inject default underline if none provided\n    if (!hasUnderline) {\n      filteredChildren.push(<AnchorUnderline key=\"__default_underline\" />);\n    }\n\n    const triggerElement = href ? (\n      <a\n        ref={ref as React.Ref<HTMLAnchorElement>}\n        href={href}\n        target={target}\n        rel={target === \"_blank\" ? \"noopener noreferrer\" : undefined}\n        className={cn('trigger', styles.trigger)}\n      >\n        {filteredChildren}\n      </a>\n    ) : (\n      <span ref={ref as React.Ref<HTMLSpanElement>} className={cn('trigger', styles.trigger)}>{filteredChildren}</span>\n    );\n\n    // If no preview content, render trigger directly without popover\n    if (!previewContent) {\n      return triggerElement;\n    }\n\n    return (\n      <Popover\n        content={previewContent}\n        isOpen={isOpen}\n        onOpenChange={setIsOpen}\n        position=\"bottom\"\n        className={cn('preview', styles.preview, className)}\n        {...props}\n      >\n        {triggerElement}\n      </Popover>\n    );\n  },\n);\nAnchorRoot.displayName = \"Anchor\";\n\n// Compound component with attached sub-components\nconst Anchor = React.forwardRef<HTMLDivElement, AnchorProps & { Preview: typeof AnchorPreview; Underline: typeof AnchorUnderline }>((props, ref) => {\n  return <AnchorRoot ref={ref} {...props} />;\n}) as React.ForwardRefExoticComponent<AnchorProps & React.RefAttributes<HTMLDivElement>> & { Preview: typeof AnchorPreview; Underline: typeof AnchorUnderline };\n\nAnchor.displayName = \"Anchor\";\nAnchor.Preview = AnchorPreview;\nAnchor.Underline = AnchorUnderline;\n\nexport { Anchor };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .anchor {\n    display: inline;\n  }\n\n  .preview {\n    display: inline;\n  }\n\n  .trigger {\n    --underline-background: var(--background-600);\n\n    display: inline-block;\n    position: relative;\n    color: var(--foreground-200);\n    text-decoration: none;\n    cursor: pointer;\n    transition: color 150ms var(--ease-gentle-ease);\n\n    &:focus-visible {\n      outline: 2px solid var(--color-background-600);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    position: absolute;\n    left: 0;\n    right: 0;\n    bottom: 0px;\n    height: 1px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 150ms var(--ease-gentle-ease);\n    pointer-events: none;\n  }\n}\n",
    "cssTypes": "export const anchor: string;\nexport const preview: string;\nexport const trigger: string;\nexport const underline: string;"
  },
  "badge": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useButton, useFocusRing, useHover, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Badge.module.css\";\nimport { HiX } from \"react-icons/hi\";\n\ntype BadgeVariant = \"default\" | \"success\" | \"warning\" | \"danger\" | \"info\";\ntype BadgeSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {\n  /** Visual color style of the badge */\n  variant?: BadgeVariant;\n  /** Size of the badge */\n  size?: BadgeSize;\n  /** Icon element displayed before the badge label */\n  icon?: React.ReactNode;\n  /** Whether to show a dismiss button */\n  dismissible?: boolean;\n  /** Called when the dismiss button is clicked */\n  onDismiss?: () => void;\n  /** Whether to render with a fully rounded pill shape */\n  pill?: boolean;\n  /** Numeric count to display; replaces children when provided */\n  count?: number;\n}\n\nconst variantMap = {\n  default: styles[\"default\"],\n  success: styles[\"success\"],\n  warning: styles[\"warning\"],\n  danger: styles[\"danger\"],\n  info: styles[\"info\"],\n} as const;\n\nconst sizeMap = {\n  sm: styles[\"sm\"],\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n} as const;\n\ninterface DismissButtonProps {\n  onDismiss?: () => void;\n  size: BadgeSize;\n}\n\nfunction DismissButton({ onDismiss, size }: DismissButtonProps) {\n  const buttonRef = React.useRef<HTMLDivElement>(null);\n\n  const { buttonProps, isPressed } = useButton(\n    {\n      \"aria-label\": \"Dismiss\",\n      onPress: onDismiss,\n    },\n    buttonRef\n  );\n\n  const { focusProps, isFocusVisible } = useFocusRing();\n  const { hoverProps, isHovered } = useHover({});\n\n  return (\n    <div\n      {...mergeProps(buttonProps, focusProps, hoverProps)}\n      ref={buttonRef}\n      role=\"button\"\n      tabIndex={0}\n      className={styles.dismissButton}\n      data-pressed={isPressed || undefined}\n      data-hovered={isHovered || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n    >\n      <HiX size={14} />\n    </div>\n  );\n}\n\nconst Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(\n  (\n    {\n      variant = \"default\",\n      size = \"md\",\n      icon,\n      dismissible = false,\n      onDismiss,\n      pill = false,\n      count,\n      children,\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    return (\n      <span\n        ref={ref}\n        className={cn(\n          \"badge\",\n          variant,\n          size,\n          styles.badge,\n          variantMap[variant],\n          sizeMap[size],\n          pill && styles.pill,\n          dismissible && styles.dismissible,\n          className\n        )}\n        data-variant={variant}\n        data-size={size}\n        data-pill={pill ? \"true\" : undefined}\n        data-dismissible={dismissible || undefined}\n        {...props}\n      >\n        {icon && (\n          <span className={styles.iconWrapper} aria-hidden=\"true\">\n            {icon}\n          </span>\n        )}\n        <span>{count !== undefined ? count : children}</span>\n        {dismissible && <DismissButton onDismiss={onDismiss} size={size} />}\n      </span>\n    );\n  }\n);\n\nBadge.displayName = \"Badge\";\n\nexport { Badge };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    --background: var(--background-800);\n    --foreground: var(--foreground-200);\n    --border: var(--background-600);\n\n    @apply px-4 py-1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    background-color: var(--background);\n    color: var(--foreground);\n    border-radius: var(--radius-sm);\n  }\n\n  .badge.default {\n    --background: color-mix(in srgb, var(--background-600) 10%, var(--background-900));\n    --foreground: var(--foreground-200);\n    border: var(--border-width-base) solid var(--background-700)\n  }\n\n  .badge.success {\n    --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n    --foreground: var(--success-600);\n  }\n\n  .badge.warning {\n    --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n    --foreground: var(--warning-600);\n  }\n\n  .badge.danger {\n    --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n    --foreground: var(--danger-600);\n  }\n\n  .badge.info {\n    --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n    --foreground: var(--info-600);\n  }\n\n  .badge.sm {\n    @apply px-2.5 py-0.5;\n    font-size: var(--text-xs);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .badge.md {\n    @apply px-3.5 py-1;\n    font-size: var(--text-sm);\n  }\n\n  .badge.lg {\n    @apply px-4 py-2.5;\n    font-size: var(--text-sm);\n  }\n\n  .pill {\n    border-radius: 9999px;\n  }\n\n  .iconWrapper {\n    display: flex;\n    align-items: center;\n    flex-shrink: 0;\n  }\n\n  .dismissButton {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-left: 0.25rem;\n    @apply p-1;\n    border-radius: var(--radius-xs);\n    background: transparent;\n    border: none;\n    color: var(--foreground-400);\n    cursor: pointer;\n    transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n    outline: none;\n  }\n\n  .dismissButton[data-hovered=\"true\"] {\n    background: color-mix(in srgb, var(--background-700) 80%, var(--background-900));\n  }\n\n  .dismissButton[data-pressed=\"true\"] {\n    background: var(--background-700);\n    transform: scale(0.95);\n  }\n\n  .dismissButton[data-focus-visible=\"true\"] {\n    outline: 2px solid currentColor;\n    outline-offset: 1px;\n  }\n}\n\n",
    "cssTypes": "export interface Styles {\n  badge: string;\n  \"default\": string;\n  \"success\": string;\n  \"warning\": string;\n  \"danger\": string;\n  \"info\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n  pill: string;\n  dismissible: string;\n  iconWrapper: string;\n  dismissButton: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "banner": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useHover, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Banner.module.css\";\nimport { FaCircleInfo, FaCircleCheck, FaTriangleExclamation, FaCircleExclamation } from \"react-icons/fa6\";\n\ntype BannerVariant = \"note\" | \"info\" | \"success\" | \"warning\" | \"danger\";\ntype BannerSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Visual style of the banner conveying its intent */\n  variant?: BannerVariant;\n  /** Controls the padding and font size of the banner */\n  size?: BannerSize;\n  /** When true, renders a dismiss button that hides the banner on click */\n  isDismissible?: boolean;\n  /** Called when the dismiss button is clicked */\n  onDismiss?: () => void;\n}\n\nexport interface BannerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}\n\nexport interface BannerBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {}\n\nconst variantMap = {\n  note: styles[\"note\"],\n  info: styles[\"info\"],\n  success: styles[\"success\"],\n  warning: styles[\"warning\"],\n  danger: styles[\"danger\"],\n} as const;\n\nconst getBannerIcon = (variant: BannerVariant) => {\n  const iconProps = { className: styles.icon };\n  const icons = {\n    note: <FaCircleInfo {...iconProps} />,\n    info: <FaCircleInfo {...iconProps} />,\n    success: <FaCircleCheck {...iconProps} />,\n    warning: <FaTriangleExclamation {...iconProps} />,\n    danger: <FaCircleExclamation {...iconProps} />,\n  };\n  return icons[variant];\n};\n\nconst sizeMap = {\n  sm: styles[\"sm\"],\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n} as const;\n\n/** Heading text for the banner message */\nconst BannerTitle = React.forwardRef<HTMLHeadingElement, BannerTitleProps>(\n  ({ className, ...props }, ref) => (\n    <h3\n      ref={ref}\n      className={cn(\"banner-title\", styles.title, className)}\n      {...props}\n    />\n  )\n);\n\nBannerTitle.displayName = \"Banner.Title\";\n\n/** Body text content of the banner */\nconst BannerBody = React.forwardRef<HTMLParagraphElement, BannerBodyProps>(\n  ({ className, ...props }, ref) => (\n    <p\n      ref={ref}\n      className={cn(\"banner-body\", styles.body, className)}\n      {...props}\n    />\n  )\n);\n\nBannerBody.displayName = \"Banner.Body\";\n\n/** Full-width notification strip for system messages and alerts */\nconst BannerRoot = React.forwardRef<HTMLDivElement, BannerProps>(\n  (\n    {\n      className,\n      variant = \"note\",\n      size = \"md\",\n      isDismissible = false,\n      onDismiss,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    const [isVisible, setIsVisible] = React.useState(true);\n    const { hoverProps, isHovered } = useHover({});\n\n    const handleDismiss = () => {\n      setIsVisible(false);\n      onDismiss?.();\n    };\n\n    if (!isVisible) {\n      return null;\n    }\n\n    const icon = getBannerIcon(variant);\n\n    return (\n      <div\n        {...mergeProps(hoverProps, props)}\n        ref={ref}\n        className={cn(\"banner\", styles.banner, variantMap[variant], sizeMap[size], className)}\n        data-variant={variant}\n        data-size={size}\n        data-hovered={isHovered ? \"true\" : \"false\"}\n      >\n        {icon && <div className={cn(\"banner-icon\", styles.iconContainer)}>{icon}</div>}\n        <div className={cn(\"banner-content\", styles.content)}>\n          {children}\n        </div>\n        {isDismissible && (\n          <button\n            onClick={handleDismiss}\n            className={cn(\"banner-dismiss\", styles.dismiss)}\n            aria-label=\"Dismiss banner\"\n            type=\"button\"\n          >\n            <svg\n              width=\"16\"\n              height=\"16\"\n              viewBox=\"0 0 16 16\"\n              fill=\"none\"\n              stroke=\"currentColor\"\n              strokeWidth=\"2\"\n              strokeLinecap=\"round\"\n              strokeLinejoin=\"round\"\n            >\n              <line x1=\"4\" y1=\"4\" x2=\"12\" y2=\"12\" />\n              <line x1=\"12\" y1=\"4\" x2=\"4\" y2=\"12\" />\n            </svg>\n          </button>\n        )}\n      </div>\n    );\n  }\n);\n\nBannerRoot.displayName = \"Banner\";\n\ninterface BannerComponent extends React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>> {\n  Title: typeof BannerTitle;\n  Body: typeof BannerBody;\n}\n\nconst Banner = Object.assign(BannerRoot, {\n  Title: BannerTitle,\n  Body: BannerBody,\n}) as BannerComponent;\n\nexport { Banner, BannerRoot, BannerTitle, BannerBody };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    --background: var(--background-900);\n    --foreground: var(--info-50);\n    --border: var(--info-600);\n\n    width: 100%;\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: var(--spacing-4);\n    font-family: inherit;\n    font-size: var(--text-md);\n    line-height: var(--leading-normal);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out;\n  }\n\n  .content {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: var(--spacing-2);\n  }\n\n  .iconContainer {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    align-self: flex-start;\n  }\n\n  .icon {\n    @apply mr-4;\n    width: 1.25rem;\n    height: 1.25rem;\n    color: currentColor;\n  }\n\n  .dismiss {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    padding: 0;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm);\n    cursor: pointer;\n    transition: background-color 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: inherit;\n    line-height: var(--leading-tight);\n    margin: 0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-normal);\n    font-size: inherit;\n    line-height: var(--leading-normal);\n    margin: 0;\n    opacity: 0.9;\n  }\n}\n\n.banner.note {\n  --background: var(--background-900);\n  --foreground: var(--foreground-200);\n  --border: var(--background-700);\n}\n\n.banner.note .icon {\n  color: var(--background-500);\n}\n\n.banner.info {\n  --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--info-600) 30%, var(--background-900));\n}\n\n.banner.info .icon {\n  color: var(--info-600);\n}\n\n.banner.success {\n  --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--success-600) 30%, var(--background-900));\n}\n\n.banner.success .icon {\n  color: var(--success-600);\n}\n\n.banner.warning {\n  --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--warning-600) 30%, var(--background-900));\n}\n\n.banner.warning .icon {\n  color: var(--warning-600);\n}\n\n.banner.danger {\n  --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--danger-600) 30%, var(--background-900));\n}\n\n.banner.danger .icon {\n  color: var(--danger-600);\n}\n\n.banner.sm {\n  @apply px-3 py-2;\n  font-size: var(--text-sm);\n}\n\n.banner.md {\n  @apply px-4 py-3;\n  font-size: var(--text-sm);\n}\n\n.banner.lg {\n  @apply px-6 py-4;\n  font-size: var(--text-lg);\n}\n",
    "cssTypes": "declare const styles: {\n  banner: string;\n  content: string;\n  dismiss: string;\n  note: string;\n  info: string;\n  success: string;\n  warning: string;\n  danger: string;\n  sm: string;\n  md: string;\n  lg: string;\n  iconContainer: string;\n  icon: string;\n  title: string;\n  body: string;\n};\n\nexport default styles;\n"
  },
  "breadcrumbs": {
    "tsx": "'use client';\n\nimport React, { ReactNode, forwardRef } from 'react';\nimport styles from \"./Breadcrumbs.module.css\";\n\nexport interface BreadcrumbItemProps {\n  /** URL this breadcrumb item links to */\n  href?: string;\n  /** Called when the breadcrumb item is pressed */\n  onPress?: () => void;\n  children: ReactNode;\n  /** Whether this is the current/active page */\n  isCurrent?: boolean;\n  /** Whether the item is non-interactive */\n  isDisabled?: boolean;\n  /** Additional CSS class names */\n  className?: string;\n}\n\nexport interface BreadcrumbsProps {\n  children: ReactNode;\n  /** Additional CSS class for the breadcrumbs container */\n  className?: string;\n  /** Custom separator element between breadcrumb items */\n  separator?: ReactNode;\n}\n\nconst Breadcrumb = forwardRef<HTMLLIElement, BreadcrumbItemProps>(\n  ({ href, onPress, children, isCurrent = false, isDisabled = false, className }, ref) => {\n    const isInteractive = !isCurrent && !isDisabled && (href || onPress);\n\n    return (\n      <li ref={ref} className={styles.breadcrumb}>\n        {isInteractive ? (\n          <a\n            href={href}\n            className={`${styles.breadcrumbLink} ${className || ''}`}\n            data-disabled={isDisabled || undefined}\n            data-current={isCurrent || undefined}\n            aria-current={isCurrent ? 'page' : undefined}\n            onClick={(e) => {\n              if (onPress) {\n                e.preventDefault();\n                onPress();\n              }\n            }}\n          >\n            {children}\n          </a>\n        ) : (\n          <span\n            className={`${styles.breadcrumbLink} ${className || ''}`}\n            data-disabled={isDisabled || undefined}\n            data-current={isCurrent || undefined}\n            aria-current={isCurrent ? 'page' : undefined}\n          >\n            {children}\n          </span>\n        )}\n      </li>\n    );\n  }\n);\n\nBreadcrumb.displayName = 'Breadcrumb';\n\nconst Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(\n  ({ children, className, separator }, ref) => {\n    const childArray = React.Children.toArray(children);\n    const childCount = childArray.length;\n\n    return (\n      <nav\n        ref={ref}\n        className={`${styles.breadcrumbs} ${className || ''}`}\n        aria-label=\"Breadcrumb\"\n      >\n        <ol className={`${styles.breadcrumbsList} ${separator ? styles.withCustomSeparator : ''}`}>\n          {React.Children.map(childArray, (child, index) => {\n            const isLastChild = index === childCount - 1;\n            if (React.isValidElement(child)) {\n              const element = React.cloneElement(child as React.ReactElement<BreadcrumbItemProps>, {\n                isCurrent: isLastChild,\n              });\n\n              // Add separator after each item except the last\n              if (separator && !isLastChild) {\n                return (\n                  <React.Fragment key={index}>\n                    {element}\n                    <li className={styles.separator} aria-hidden=\"true\">\n                      {separator}\n                    </li>\n                  </React.Fragment>\n                );\n              }\n              return element;\n            }\n            return child;\n          })}\n        </ol>\n      </nav>\n    );\n  }\n);\n\nBreadcrumbs.displayName = 'Breadcrumbs';\n\nexport { Breadcrumbs, Breadcrumb };\n",
    "css": "@layer components {\n  .breadcrumbs {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --font-size: var(--text-sm);\n\n    display: block;\n  }\n\n  .breadcrumbsList {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-wrap: wrap;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n  .breadcrumbsList.withCustomSeparator .breadcrumb:not(:last-child)::after {\n    content: none;\n  }\n\n  .breadcrumb {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    padding: 0;\n  }\n\n  /* Separator after each item except the last */\n  .breadcrumb:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    display: flex;\n    align-items: center;\n    margin: 0;\n    padding: 0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .breadcrumbLink {\n    color: var(--foreground);\n    text-decoration: none;\n    padding: 0.25rem 0.5rem;\n    border-radius: 0.375rem;\n    cursor: pointer;\n    font-size: var(--font-size);\n    line-height: 1.5;\n    position: relative;\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: var(--font-weight-medium);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: 0.6;\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  \"breadcrumbs\": string;\n  \"breadcrumbsList\": string;\n  \"withCustomSeparator\": string;\n  \"breadcrumb\": string;\n  \"separator\": string;\n  \"breadcrumbLink\": string;\n}\n\nexport const styles: Styles;\nexport default styles;\n"
  },
  "button": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useButton, useFocusRing, useHover, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Button.module.css\";\n\ntype ButtonVariant = \"primary\" | \"default\" | \"secondary\" | \"outline\" | \"ghost\" | \"danger\";\ntype ButtonSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"href\"> {\n  /** Visual style of the button */\n  variant?: ButtonVariant;\n  /** Size of the button */\n  size?: ButtonSize;\n  /** Disables interaction and applies disabled styling */\n  isDisabled?: boolean;\n  /** React Aria press handler — preferred over onClick for accessibility */\n  onPress?: (e: { target: EventTarget | null }) => void;\n  /** Icon slots rendered before (left) or after (right) the button label */\n  icon?: {\n    left?: React.ReactNode;\n    right?: React.ReactNode;\n  };\n  /** Renders the button as an anchor element when provided */\n  href?: string;\n}\n\nconst variantMap = {\n  primary: styles[\"primary\"],\n  default: styles[\"default\"],\n  secondary: styles[\"secondary\"],\n  outline: styles[\"outline\"],\n  ghost: styles[\"ghost\"],\n  danger: styles[\"danger\"],\n} as const;\n\nconst sizeMap = {\n  sm: styles[\"sm\"],\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n} as const;\n\nconst Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(\n  ({ className, variant = \"default\", size = \"md\", children, onClick, onPress, isDisabled, disabled, icon, href, ...props }, ref) => {\n    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);\n    const mergedRef = useMergedRef(ref, buttonRef);\n    const isButtonDisabled = isDisabled ?? disabled ?? false;\n    const [isPressed, setIsPressed] = React.useState(false);\n    const isAnchor = !!href;\n\n    const handlePress = React.useCallback((e: any) => {\n      if (onPress) onPress({ target: e.target });\n      if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);\n    }, [onPress, onClick]);\n\n    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {\n      if (!isButtonDisabled) {\n        setIsPressed(true);\n      }\n      props.onMouseDown?.(e as any);\n    }, [isButtonDisabled, props]);\n\n    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {\n      setIsPressed(false);\n      props.onMouseUp?.(e as any);\n    }, [props]);\n\n    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {\n      setIsPressed(false);\n      props.onMouseLeave?.(e as any);\n    }, [props]);\n\n    const { buttonProps } = useButton({\n      isDisabled: isButtonDisabled,\n      onPress: handlePress,\n    }, buttonRef as React.RefObject<HTMLButtonElement>);\n\n    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });\n    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });\n\n    const buttonClassName = cn(\"button\", variant, size, styles.button, variantMap[variant], sizeMap[size], className);\n\n    if (isAnchor) {\n      return (\n        <a\n          {...mergeProps(focusProps, hoverProps, props as any)}\n          ref={mergedRef as unknown as React.RefObject<HTMLAnchorElement>}\n          href={href}\n          onMouseDown={handleMouseDown}\n          onMouseUp={handleMouseUp}\n          onMouseLeave={handleMouseLeave}\n          className={buttonClassName}\n          data-disabled={isButtonDisabled ? \"true\" : undefined}\n          data-pressed={isPressed ? \"true\" : \"false\"}\n          data-hovered={isHovered ? \"true\" : \"false\"}\n          data-focused={isFocused ? \"true\" : \"false\"}\n          data-focus-visible={isFocusVisible ? \"true\" : \"false\"}\n        >\n          {icon?.left && <span className={cn((styles as any)[`icon-${size}`])}>{icon.left}</span>}\n          {children}\n          {icon?.right && <span className={cn((styles as any)[`icon-${size}`])}>{icon.right}</span>}\n        </a>\n      );\n    }\n\n    return (\n      <button\n        {...mergeProps(buttonProps, focusProps, hoverProps, props)}\n        ref={mergedRef as unknown as React.RefObject<HTMLButtonElement>}\n        onMouseDown={handleMouseDown}\n        onMouseUp={handleMouseUp}\n        onMouseLeave={handleMouseLeave}\n        className={buttonClassName}\n        data-disabled={isButtonDisabled ? \"true\" : undefined}\n        data-pressed={isPressed ? \"true\" : \"false\"}\n        data-hovered={isHovered ? \"true\" : \"false\"}\n        data-focused={isFocused ? \"true\" : \"false\"}\n        data-focus-visible={isFocusVisible ? \"true\" : \"false\"}\n      >\n        {icon?.left && <span className={cn((styles as any)[`icon-${size}`])}>{icon.left}</span>}\n        {children}\n        {icon?.right && <span className={cn((styles as any)[`icon-${size}`])}>{icon.right}</span>}\n      </button>\n    );\n  }\n);\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return (value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nButton.displayName = \"Button\";\n\nexport { Button };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply px-3 py-1;\n\n    --ring-color: var(--accent-500);\n    --background: var(--background-800);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border);\n    border-radius: var(--radius-sm);\n\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-md);\n    line-height: var(--leading-snug);\n\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out, transform 0.15s ease-out, filter 0.15s ease-out, color 0.15s ease-out;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    font-family: inherit;\n    user-select: none;\n    cursor: pointer;\n\n    &:focus-visible {\n      box-shadow: 0 0 0 3px var(--ring-color);\n      outline: 2px solid transparent;\n      outline-offset: 2px;\n    }\n\n    &:disabled {\n      opacity: 0.6;\n      cursor: not-allowed;\n      filter: none;\n    }\n\n    &:hover:not(:disabled) {\n      background-color: color-mix(in srgb, var(--background-600) 50%, transparent);\n      border: var(--border);\n    }\n  }\n\n  .button.primary {\n    --background: var(--accent-600);\n    --foreground: var(--accent-50);\n    --border: var(--border-width-base) solid var(--background);\n  }\n\n  .button.default {\n    --background: var(--background-800);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n  }\n\n  .button.secondary {\n    --background: var(--background-700);\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-600);\n  }\n\n  .button.outline {\n    --background: transparent;\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    outline-style: unset !important;\n    \n    &:hover:not(:disabled) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .button.ghost {\n    --background: transparent;\n    --foreground: var(--foreground-300);\n    --border: var(--border-width-base) solid transparent;\n\n    @media (hover: hover) {\n      &:hover:not(:disabled) {\n        background-color: var(--background-900);\n      }\n    }\n  }\n\n  .button.danger {\n    --background: color-mix(in srgb, var(--danger-600) 20%, transparent);\n    --foreground: var(--danger-600);\n    --border: var(--border-width-base) solid transparent;\n    --ring-color: var(--danger-600);\n\n    &:hover:not(:disabled) {\n      background-color: color-mix(in srgb, var(--danger-600) 30%, transparent);\n    }\n  }\n\n  .button.sm {\n    @apply px-3 py-1.5;\n    font-size: var(--text-xs);\n  }\n\n  .button.md {\n    @apply px-5 py-2;\n    font-size: var(--text-sm);\n  }\n\n  .button.lg {\n    @apply px-7 py-1.5;\n    font-size: var(--text-sm);\n  }\n\n  .icon-sm {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  button: string;\n  \"default\": string;\n  \"primary\": string;\n  \"secondary\": string;\n  \"outline\": string;\n  \"ghost\": string;\n  \"danger\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "card": {
    "tsx": "\"use client\"\n\nimport React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Card.module.css\";\n\ninterface CardProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }\n\nconst CardRoot = React.forwardRef<HTMLDivElement, CardProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.card, className)}\n      {...props}\n    />\n  )\n);\nCardRoot.displayName = \"Card\";\n\n/** Top section of the card, typically containing a title or toolbar */\nconst CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.header, className)}\n      {...props}\n    />\n  )\n);\nCardHeader.displayName = \"Card.Header\";\n\n/** Main content area of the card */\nconst CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.body, className)}\n      {...props}\n    />\n  )\n);\nCardBody.displayName = \"Card.Body\";\n\n/** Bottom section of the card, typically containing actions */\nconst CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(\n  ({ className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.footer, className)}\n      {...props}\n    />\n  )\n);\nCardFooter.displayName = \"Card.Footer\";\n\n// Compound component\nconst Card = Object.assign(CardRoot, {\n  Header: CardHeader,\n  Body: CardBody,\n  Footer: CardFooter,\n});\n\nexport { Card, CardHeader, CardBody, CardFooter };\nexport type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    --background: var(--background-800);\n    --border: var(--background-700);\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    overflow: hidden;\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring, #0066cc);\n    outline-offset: 2px;\n  }\n\n  .header {\n    --border: var(--background-700);\n\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    --background: color-mix(in srgb, var(--background-900) 50%, transparent);\n    --border: var(--background-700);\n\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  card: string;\n  header: string;\n  body: string;\n  footer: string;\n};\n\nexport default styles;\n"
  },
  "checkbox": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useState } from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Checkbox.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nexport interface CheckboxProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"size\"> {\n  /** Size of the checkbox */\n  size?: Size;\n  /** Label text or element displayed next to the checkbox */\n  label?: React.ReactNode;\n  /** Helper text shown below the checkbox */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Whether to show an indeterminate (partial selection) state */\n  isIndeterminate?: boolean;\n}\n\nconst sizeMap: Record<Size, string> = {\n  sm: styles[\"size-sm\"],\n  md: styles[\"size-md\"],\n  lg: styles[\"size-lg\"],\n};\n\nconst labelSizeMap: Record<Size, string> = {\n  sm: styles[\"label-sm\"],\n  md: styles[\"label-md\"],\n  lg: styles[\"label-lg\"],\n};\n\nexport const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      label,\n      helperText,\n      helperTextError = false,\n      id,\n      disabled = false,\n      checked,\n      defaultChecked,\n      onChange,\n      isIndeterminate = false,\n      ...props\n    },\n    ref\n  ) => {\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const [isFocused, setIsFocused] = useState(false);\n    // Track pressed state for tactile feedback animation (data-pressed attribute)\n    const [isPressed, setIsPressed] = useState(false);\n    const [internalChecked, setInternalChecked] = useState(() =>\n      checked !== undefined ? checked : (defaultChecked ?? false)\n    );\n\n    const handleFocus = () => setIsFocused(true);\n    const handleBlur = () => setIsFocused(false);\n\n    // React Aria press state handlers for tactile scale animation (mouse)\n    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      if (!disabled) {\n        setIsPressed(true);\n      }\n      props.onMouseDown?.(e);\n    }, [disabled, props]);\n\n    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      setIsPressed(false);\n      props.onMouseUp?.(e);\n    }, [props]);\n\n    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      setIsPressed(false);\n      props.onMouseLeave?.(e);\n    }, [props]);\n\n    // React Aria press state handlers for keyboard interactions (Space/Enter)\n    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {\n      if (!disabled && (e.key === \" \" || e.key === \"Enter\")) {\n        setIsPressed(true);\n      }\n      props.onKeyDown?.(e);\n    }, [disabled, props]);\n\n    const handleKeyUp = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {\n      if (e.key === \" \" || e.key === \"Enter\") {\n        setIsPressed(false);\n      }\n      props.onKeyUp?.(e);\n    }, [props]);\n\n    React.useEffect(() => {\n      if (checked !== undefined) {\n        setInternalChecked(checked);\n      }\n    }, [checked]);\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      // Update internal state (needed for uncontrolled mode)\n      setInternalChecked(e.target.checked);\n      // Call parent handler if provided\n      onChange?.(e);\n    };\n\n    // Filter out boolean props to avoid DOM attribute warnings\n    const domProps = Object.fromEntries(\n      Object.entries(props).filter(([, value]) => typeof value !== 'boolean')\n    );\n\n    // Determine if this is a controlled component\n    const isControlled = checked !== undefined;\n    const displayChecked = isControlled ? checked : internalChecked;\n\n    return (\n      <div ref={ref} className={cn(\"checkbox-root\", styles['checkbox-root'])}>\n        <div className={cn((styles as any)['checkbox-container'], sizeMap[size])}>\n          <input\n            ref={inputRef}\n            type=\"checkbox\"\n            id={id}\n            disabled={disabled}\n            {...(isControlled ? { checked } : { defaultChecked: internalChecked })}\n            onChange={handleChange}\n            onFocus={handleFocus}\n            onBlur={handleBlur}\n            onMouseDown={handleMouseDown}\n            onMouseUp={handleMouseUp}\n            onMouseLeave={handleMouseLeave}\n            onKeyDown={handleKeyDown}\n            onKeyUp={handleKeyUp}\n            className={cn(\n              'checkbox',\n              styles.checkbox,\n              isIndeterminate && styles.indeterminate,\n              className\n            )}\n            data-size={size}\n            data-selected={displayChecked ? \"true\" : undefined}\n            data-disabled={disabled ? \"true\" : undefined}\n            data-indeterminate={isIndeterminate ? \"true\" : undefined}\n            data-focused={isFocused ? \"true\" : undefined}\n            data-pressed={isPressed ? \"true\" : undefined}\n            {...domProps}\n          />\n          {displayChecked && !isIndeterminate && (\n            <svg\n              className={(styles as any)['checkbox-checkmark']}\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              stroke=\"currentColor\"\n              strokeWidth=\"3\"\n              strokeLinecap=\"round\"\n              strokeLinejoin=\"round\"\n            >\n              <polyline points=\"20 6 9 17 4 12\"></polyline>\n            </svg>\n          )}\n          {isIndeterminate && (\n            <svg\n              className={styles['checkbox-indeterminate']}\n              viewBox=\"0 0 24 24\"\n              fill=\"currentColor\"\n            >\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\" stroke=\"currentColor\" strokeWidth=\"3\" strokeLinecap=\"round\" />\n            </svg>\n          )}\n        </div>\n        {label && (\n          <label\n            htmlFor={id}\n            className={cn(\n              styles.label,\n              labelSizeMap[size],\n              disabled && styles[\"label-disabled\"]\n            )}\n          >\n            {label}\n          </label>\n        )}\n        {helperText && (\n          <p\n            className={cn(\n              styles[\"helper-text\"],\n              helperTextError\n                ? styles[\"helper-text-error\"]\n                : styles[\"helper-text-normal\"]\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nCheckbox.displayName = \"Checkbox\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .checkbox-root {\n    @apply gap-3;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .checkbox-container {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  /* Visual checkbox */\n  .checkbox {\n    --background: var(--background-800);\n    --foreground: var(--accent-50);\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n\n    @apply cursor-pointer;\n    appearance: none;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-xs);\n    outline: none;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    position: relative;\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .checkbox-checkmark {\n    position: absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--accent-50);\n    pointer-events: none;\n  }\n\n  .checkbox-indeterminate {\n    position: absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--accent-50);\n    pointer-events: none;\n  }\n\n  .checkbox:focus-visible {\n    outline: 2px solid transparent;\n    box-shadow: 0 0 0 3px var(--ring-color);\n  }\n\n  .checkbox[data-pressed=\"true\"] {\n    transform: scale(0.92);\n  }\n\n  .checkbox[data-selected=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .checkbox[data-indeterminate=\"true\"] {\n    --background: var(--accent-500);\n    --border: var(--accent-500);\n    background-color: var(--background);\n    border-color: var(--border);\n  }\n\n  .checkbox[data-disabled=\"true\"] {\n    cursor: not-allowed;\n    opacity: 0.6;\n    pointer-events: none;\n  }\n\n  .size-sm .checkbox {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .size-md .checkbox {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .size-lg .checkbox {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-sm);\n  }\n\n  .label-md {\n    font-size: var(--text-md);\n  }\n\n  .label-lg {\n    font-size: var(--text-lg);\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal {\n    color: inherit;\n  }\n\n  .helper-text-error {\n    color: var(--danger-600);\n  }\n\n  .indeterminate {\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  \"checkbox-root\": string;\n  checkbox: string;\n  \"checkbox-indeterminate\": string;\n  \"size-sm\": string;\n  \"size-md\": string;\n  \"size-lg\": string;\n  indeterminate: string;\n  label: string;\n  \"label-sm\": string;\n  \"label-md\": string;\n  \"label-lg\": string;\n  \"label-disabled\": string;\n  \"helper-text\": string;\n  \"helper-text-normal\": string;\n  \"helper-text-error\": string;\n};\n\nexport default styles;\n"
  },
  "code": {
    "tsx": "'use client';\n\nimport { useEffect, useRef, useState, useCallback } from \"react\";\nimport { codeToHtml } from \"shiki\";\nimport { transformerRenderIndentGuides } from \"@shikijs/transformers\";\nimport { Copy, Check, ChevronDown } from \"lucide-react\";\nimport { cn } from \"../../lib/utils\";\nimport styles from \"./Code.module.css\";\n\nconst escapeHtml = (s: string) =>\n  s.replace(/[&<>\"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#039;' }[c] || c));\n\nfunction generateFallbackHtml(code: string): string {\n  return `<pre><code style=\"display: block; padding: 1rem\">${escapeHtml(code)}</code></pre>`;\n}\n\nfunction useColorScheme(colorScheme: 'light' | 'dark' | 'system'): 'light' | 'dark' {\n  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(() => {\n    if (typeof window === 'undefined') return 'dark';\n    const domTheme = document.documentElement.getAttribute('data-theme');\n    if (domTheme === 'light' || domTheme === 'dark') return domTheme;\n    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';\n  });\n\n  useEffect(() => {\n    if (colorScheme !== 'system') return;\n\n    const update = () => {\n      const domTheme = document.documentElement.getAttribute('data-theme');\n      if (domTheme === 'light' || domTheme === 'dark') {\n        setSystemMode(domTheme);\n      } else {\n        setSystemMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');\n      }\n    };\n\n    const observer = new MutationObserver(update);\n    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });\n\n    const mq = window.matchMedia('(prefers-color-scheme: dark)');\n    mq.addEventListener('change', update);\n\n    return () => {\n      observer.disconnect();\n      mq.removeEventListener('change', update);\n    };\n  }, [colorScheme]);\n\n  return colorScheme === 'system' ? systemMode : colorScheme;\n}\n\nfunction CopyButton({ code }: { code: string }) {\n  const [copied, setCopied] = useState(false);\n\n  const handleCopy = async () => {\n    await navigator.clipboard.writeText(code);\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1800);\n  };\n\n  return (\n    <button onClick={handleCopy} className={styles['copy-button']}>\n      {copied ? <Check size={14} /> : <Copy size={14} />}\n    </button>\n  );\n}\n\nexport interface CodeProps {\n  children: string;\n  /** Programming language for syntax highlighting */\n  language?: string;\n  /** Additional CSS class names */\n  className?: string;\n  /** Filename displayed in the header bar */\n  filename?: string;\n  /** Custom heading text displayed in the header bar instead of filename */\n  heading?: string;\n  /** Shiki theme name or separate light/dark theme names */\n  theme?: string | { light: string; dark: string };\n  /** Color scheme used for theme selection; 'system' follows the page data-theme attribute */\n  colorScheme?: 'light' | 'dark' | 'system';\n  /** Pre-highlighted HTML string for light mode to skip client-side Shiki processing */\n  preHighlightedLight?: string;\n  /** Pre-highlighted HTML string for dark mode to skip client-side Shiki processing */\n  preHighlightedDark?: string;\n}\n\nconst MAX_HEIGHT_LINES = 20;\n\nexport function Code({\n  children,\n  language = \"ts\",\n  className,\n  filename,\n  heading,\n  theme,\n  colorScheme = 'system',\n  preHighlightedLight,\n  preHighlightedDark,\n}: CodeProps) {\n  const mode = useColorScheme(colorScheme);\n\n  const lightTheme = typeof theme === 'string' ? theme : (theme?.light ?? 'github-light');\n  const darkTheme = typeof theme === 'string' ? theme : (theme?.dark ?? 'github-dark');\n  const activeTheme = mode === 'light' ? lightTheme : darkTheme;\n\n  const viewportRef = useRef<HTMLDivElement>(null);\n  const scrollTrackRef = useRef<HTMLDivElement>(null);\n\n  const [highlightedCode, setHighlightedCode] = useState<string>(() => {\n    if (mode === 'light' && preHighlightedLight) return preHighlightedLight;\n    if (mode === 'dark' && preHighlightedDark) return preHighlightedDark;\n    if (preHighlightedLight) return preHighlightedLight;\n    return generateFallbackHtml(children);\n  });\n\n  const [contentScrollWidth, setContentScrollWidth] = useState(0);\n  const [viewportWidth, setViewportWidth] = useState(0);\n  const [isExpanded, setIsExpanded] = useState(false);\n  const [totalCodeLines, setTotalCodeLines] = useState(0);\n\n  const handleScrollTrack = useCallback(() => {\n    if (viewportRef.current && scrollTrackRef.current) {\n      viewportRef.current.scrollLeft = scrollTrackRef.current.scrollLeft;\n    }\n  }, []);\n\n  const handleScrollViewport = useCallback(() => {\n    if (viewportRef.current && scrollTrackRef.current) {\n      const diff = Math.abs(scrollTrackRef.current.scrollLeft - viewportRef.current.scrollLeft);\n      if (diff > 1) scrollTrackRef.current.scrollLeft = viewportRef.current.scrollLeft;\n    }\n  }, []);\n\n  const handleWheel = useCallback((e: React.WheelEvent) => {\n    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {\n      if (viewportRef.current) {\n        viewportRef.current.scrollLeft += e.deltaX;\n        e.preventDefault();\n      }\n    }\n  }, []);\n\n  useEffect(() => {\n    if (mode === 'light' && preHighlightedLight) { setHighlightedCode(preHighlightedLight); return; }\n    if (mode === 'dark' && preHighlightedDark) { setHighlightedCode(preHighlightedDark); return; }\n\n    const highlight = async () => {\n      try {\n        const html = await codeToHtml(children, {\n          lang: language as any,\n          theme: activeTheme,\n          transformers: [transformerRenderIndentGuides()],\n        });\n        let styledHtml = html.replace(/<code>/, '<code style=\"display: block; padding: 1rem;\">');\n        styledHtml = styledHtml.replace(/background-color:\\s*[^;]+;?/g, '');\n        setHighlightedCode(styledHtml);\n      } catch {\n        setHighlightedCode(generateFallbackHtml(children));\n      }\n    };\n\n    highlight();\n  }, [children, language, mode, activeTheme, preHighlightedLight, preHighlightedDark]);\n\n  useEffect(() => {\n    const measure = () => {\n      if (viewportRef.current) {\n        setContentScrollWidth(viewportRef.current.scrollWidth);\n        setViewportWidth(viewportRef.current.clientWidth);\n      }\n    };\n    measure();\n    const observer = new ResizeObserver(measure);\n    if (viewportRef.current) observer.observe(viewportRef.current);\n    return () => observer.disconnect();\n  }, [highlightedCode]);\n\n  useEffect(() => {\n    setTotalCodeLines(children.split('\\n').length);\n  }, [children]);\n\n  useEffect(() => {\n    if (totalCodeLines > MAX_HEIGHT_LINES) {\n      setIsExpanded(totalCodeLines - MAX_HEIGHT_LINES < 30);\n    } else {\n      setIsExpanded(false);\n    }\n  }, [totalCodeLines]);\n\n  const hasHorizontalOverflow = contentScrollWidth > viewportWidth;\n  const hiddenCodeLines = totalCodeLines - MAX_HEIGHT_LINES;\n  const shouldShowExpandButton = totalCodeLines > MAX_HEIGHT_LINES && hiddenCodeLines >= 30;\n\n  return (\n    <div className={cn(styles['code'], className)}>\n      {(filename || heading) && (\n        <div className={styles.header}>\n          <span>{heading || filename}</span>\n          {!heading && <span className={styles['header-lang']}>{language}</span>}\n        </div>\n      )}\n\n      <div className={styles.body}>\n        <CopyButton code={children} />\n        <div\n          ref={viewportRef}\n          onScroll={handleScrollViewport}\n          onWheel={handleWheel}\n          className={styles.viewport}\n          style={{\n            overflowY: isExpanded ? 'auto' : 'hidden',\n            maskImage: !isExpanded && shouldShowExpandButton\n              ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'\n              : 'none',\n            WebkitMaskImage: !isExpanded && shouldShowExpandButton\n              ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'\n              : 'none',\n          }}\n          dangerouslySetInnerHTML={{ __html: highlightedCode }}\n        />\n\n        {hasHorizontalOverflow && (\n          <div ref={scrollTrackRef} onScroll={handleScrollTrack} className={styles['scroll-track']}>\n            <div style={{ width: contentScrollWidth, height: '12px' }} />\n          </div>\n        )}\n\n        {shouldShowExpandButton && !isExpanded && (\n          <button onClick={() => setIsExpanded(true)} className={styles['expand-button']}>\n            <ChevronDown size={14} className={styles['expand-icon']} />\n            Show {hiddenCodeLines} more lines\n          </button>\n        )}\n      </div>\n    </div>\n  );\n}\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--background-700);\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n    width: 100%;\n    min-width: 0;\n  }\n\n  .header {\n    flex: none;\n    background-color: color-mix(in srgb, var(--background-900) 90%, transparent);\n    display: flex;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: 1px solid var(--background-700);\n    padding: 0.375rem 0.75rem;\n    color: var(--foreground-400);\n  }\n\n  .header-lang {\n    color: var(--foreground-400);\n  }\n\n  .body {\n    position: relative;\n    flex: 1;\n    min-height: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .viewport {\n    overflow-y: hidden;\n    overflow-x: hidden;\n  }\n\n  .viewport :global(pre) {\n    background: transparent;\n    padding: 0;\n    margin: 0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background: var(--background-700);\n    border-radius: 9999px;\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    background: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    width: 100%;\n    overflow-x: auto;\n    background-color: color-mix(in srgb, var(--background-950) 50%, transparent);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    width: 100%;\n    @apply px-4 py-2;\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition: background-color 0.15s ease-out;\n    border-top: 1px solid var(--background-700);\n    background: transparent;\n    cursor: pointer;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover {\n    background-color: var(--background-800);\n  }\n\n  .expand-icon {\n    color: var(--foreground-400);\n    flex-shrink: 0;\n  }\n\n  .copy-button {\n    position: absolute;\n    right: 0.5rem;\n    top: 0.5rem;\n    border-radius: var(--radius-sm);\n    padding: 0.25rem;\n    color: var(--foreground-400);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out;\n    background: transparent;\n    cursor: pointer;\n    border: none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 1;\n  }\n\n  .copy-button:hover {\n    background-color: var(--background-800);\n    color: var(--foreground-300);\n  }\n\n  .copy-button:focus {\n    opacity: 1;\n  }\n\n  .body:hover .copy-button {\n    opacity: 1;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly \"code\": string;\n  readonly header: string;\n  readonly \"header-lang\": string;\n  readonly body: string;\n  readonly viewport: string;\n  readonly \"scroll-track\": string;\n  readonly \"expand-button\": string;\n  readonly \"expand-icon\": string;\n  readonly \"copy-button\": string;\n};\n\nexport default styles;\n"
  },
  "color": {
    "tsx": "\"use client\";\n\nimport React, { useState, useEffect, useCallback, useRef } from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Color.module.css\";\nimport {\n  rgbToHsl,\n  hslToRgb,\n  rgbToHsv,\n  hsvToRgb,\n  formatColorHex,\n  formatColorRgb,\n  parseColor,\n  addRecentColor,\n  isValidColor,\n} from \"./color-utils\";\nimport { ColorCanvas } from \"./Color.Canvas\";\nimport { ColorHueSlider } from \"./Color.HueSlider\";\nimport { ColorOpacitySlider } from \"./Color.OpacitySlider\";\nimport { ColorRecentColors } from \"./Color.RecentColors\";\nimport { ColorInput } from \"./Color.Input\";\n\nexport interface ColorProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onChange\"> {\n  /** Controlled color value as a CSS color string */\n  value?: string;\n  /** Initial color value for uncontrolled usage */\n  defaultValue?: string;\n  /** Called continuously while the user drags the color picker */\n  onChange?: (color: string) => void;\n  /** Called once when the user finishes a drag interaction */\n  onChangeComplete?: (color: string) => void;\n  /** Whether to show the opacity/alpha slider */\n  showOpacity?: boolean;\n  /** Whether to show a color preview swatch next to the input */\n  showPreview?: boolean;\n  /** Output format of the color value string */\n  format?: \"hex\" | \"rgb\";\n  /** Whether the color picker is disabled */\n  disabled?: boolean;\n  /** Size of the color picker */\n  size?: \"sm\" | \"md\" | \"lg\";\n  /** Additional CSS class for the root element */\n  className?: string;\n}\n\nexport const Color = React.forwardRef<HTMLDivElement, ColorProps>(\n  (\n    {\n      value: controlledValue,\n      defaultValue = \"#000000\",\n      onChange,\n      onChangeComplete,\n      showOpacity = false,\n      showPreview = false,\n      format: controlledFormat = \"hex\",\n      disabled = false,\n      size = \"md\",\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    const isControlled = controlledValue !== undefined;\n    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);\n    const currentValue = isControlled ? controlledValue : uncontrolledValue;\n\n    const [format, setFormat] = useState<\"hex\" | \"rgb\">(controlledFormat);\n    const [isDragging, setIsDragging] = useState(false);\n\n    // Initialize state using HSV for better canvas mapping\n    const initializeState = () => {\n      const parsed = parseColor(currentValue);\n      const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n      return { h, s, v };\n    };\n\n    const [initialState] = useState(initializeState);\n\n    // Source of truth for canvas position (HSV Saturation & Value) and hue\n    const [canvasSaturation, setCanvasSaturation] = useState(initialState.s);\n    const [canvasBrightness, setCanvasBrightness] = useState(initialState.v);\n    const [hue, setHue] = useState(initialState.h);\n    const [hueWhenGrayscale, setHueWhenGrayscale] = useState(initialState.h);\n\n    // Track the last emitted color to distinguish external updates from internal ones\n    const lastEmittedColor = useRef(currentValue);\n\n    const parsed = parseColor(currentValue);\n    const opacity = parsed.a ?? 1;\n\n    // Sync with external updates\n    useEffect(() => {\n      if (currentValue !== lastEmittedColor.current) {\n        const parsed = parseColor(currentValue);\n        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n\n        setCanvasSaturation(s);\n        setCanvasBrightness(v);\n\n        // Preserve hue when desaturated\n        if (s > 0) {\n          setHue(h);\n          setHueWhenGrayscale(h);\n        }\n\n        lastEmittedColor.current = currentValue;\n      }\n    }, [currentValue]);\n\n    // Compute display color from current state (HSV -> RGB)\n    const { r: displayR, g: displayG, b: displayB } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n\n    const displayValue =\n      format === \"hex\"\n        ? formatColorHex(displayR, displayG, displayB, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(displayR, displayG, displayB, opacity < 1 ? opacity : undefined);\n\n    const handleColorChange = useCallback(\n      (newColor: string) => {\n        if (!isControlled) {\n          setUncontrolledValue(newColor);\n        }\n        onChange?.(newColor);\n      },\n      [isControlled, onChange]\n    );\n\n    const handleChangeComplete = useCallback(\n      (newColor: string) => {\n        addRecentColor(newColor);\n        onChangeComplete?.(newColor);\n      },\n      [onChangeComplete]\n    );\n\n    const handleCanvasChange = useCallback(\n      (saturation: number, brightness: number) => {\n        setIsDragging(true);\n        setCanvasSaturation(saturation);\n        setCanvasBrightness(brightness);\n\n        const { r, g, b } = hsvToRgb(hue, saturation, brightness);\n        const newColor = format === \"hex\"\n          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n        lastEmittedColor.current = newColor;\n        handleColorChange(newColor);\n      },\n      [hue, opacity, format, handleColorChange]\n    );\n\n    const handleCanvasChangeComplete = useCallback(() => {\n      setIsDragging(false);\n      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n      const newColor = format === \"hex\"\n        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n      handleChangeComplete(newColor);\n    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);\n\n    const handleHueChange = useCallback(\n      (newHue: number) => {\n        setIsDragging(true);\n        setHue(newHue);\n        if (canvasSaturation > 0) {\n          setHueWhenGrayscale(newHue);\n        }\n\n        const { r, g, b } = hsvToRgb(newHue, canvasSaturation, canvasBrightness);\n        const newColor = format === \"hex\"\n          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n        lastEmittedColor.current = newColor;\n        handleColorChange(newColor);\n      },\n      [canvasSaturation, canvasBrightness, opacity, format, handleColorChange]\n    );\n\n    const handleHueChangeComplete = useCallback(() => {\n      setIsDragging(false);\n      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n      const newColor = format === \"hex\"\n        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n      handleChangeComplete(newColor);\n    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);\n\n    const handleOpacityChange = useCallback(\n      (newOpacity: number) => {\n        setIsDragging(true);\n        const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n        const newColor = format === \"hex\"\n          ? formatColorHex(r, g, b, newOpacity < 1 ? newOpacity : undefined)\n          : formatColorRgb(r, g, b, newOpacity < 1 ? newOpacity : undefined);\n\n        lastEmittedColor.current = newColor;\n        handleColorChange(newColor);\n      },\n      [hue, canvasSaturation, canvasBrightness, format, handleColorChange]\n    );\n\n    const handleOpacityChangeComplete = useCallback(() => {\n      setIsDragging(false);\n      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n      const newColor = format === \"hex\"\n        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n      handleChangeComplete(newColor);\n    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);\n\n    const handleRecentColorSelect = useCallback(\n      (color: string) => {\n        // Update internal state immediately\n        const parsed = parseColor(color);\n        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n        setCanvasSaturation(s);\n        setCanvasBrightness(v);\n        if (s > 0) {\n          setHue(h);\n          setHueWhenGrayscale(h);\n        }\n\n        lastEmittedColor.current = color;\n        handleColorChange(color);\n        handleChangeComplete(color);\n      },\n      [handleColorChange, handleChangeComplete]\n    );\n\n    const handleInputChange = useCallback(\n      (newValue: string) => {\n        if (isValidColor(newValue)) {\n          // Update internal state immediately\n          const parsed = parseColor(newValue);\n          const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n          setCanvasSaturation(s);\n          setCanvasBrightness(v);\n          if (s > 0) {\n            setHue(h);\n            setHueWhenGrayscale(h);\n          }\n\n          lastEmittedColor.current = newValue;\n          handleColorChange(newValue);\n          handleChangeComplete(newValue);\n        }\n      },\n      [handleColorChange, handleChangeComplete]\n    );\n\n    const handleFormatChange = useCallback(\n      (newFormat: \"hex\" | \"rgb\") => {\n        setFormat(newFormat);\n      },\n      []\n    );\n\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.color, className)}\n        data-size={size}\n        data-disabled={disabled || undefined}\n        {...props}\n      >\n        {/* Recent Colors */}\n        <ColorRecentColors\n          onSelect={handleRecentColorSelect}\n          disabled={disabled}\n          size={size}\n        />\n\n        {/* Canvas for saturation/brightness (HSV) */}\n        <ColorCanvas\n          hue={hue}\n          saturation={canvasSaturation}\n          brightness={canvasBrightness}\n          onChange={handleCanvasChange}\n          disabled={disabled}\n          size={size}\n        />\n\n        <div className={styles.colorControls}>\n          {/* Hue Slider */}\n          <ColorHueSlider\n            value={hue}\n            onChange={handleHueChange}\n            disabled={disabled}\n            size={size}\n          />\n\n          {/* Opacity Slider */}\n          {showOpacity && (\n            <ColorOpacitySlider\n              value={opacity}\n              color={formatColorRgb(parsed.r, parsed.g, parsed.b)}\n              onChange={handleOpacityChange}\n              disabled={disabled}\n              size={size}\n            />\n          )}\n\n          {/* Input & Format Selector */}\n          <ColorInput\n            value={displayValue}\n            format={format}\n            onValueChange={handleInputChange}\n            onFormatChange={handleFormatChange}\n            disabled={disabled}\n            size={size}\n            showPreview={showPreview}\n            previewColor={formatColorRgb(\n              displayR,\n              displayG,\n              displayB,\n              opacity < 1 ? opacity : undefined\n            )}\n          />\n        </div>\n      </div>\n    );\n  }\n);\n\nColor.displayName = \"Color\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --background: color-mix(in srgb, var(--background-800) 30%, transparent);;\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n\n  .colorControls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  /* Input styles */\n  .inputGroup {\n    width: 100%;\n    display: flex;\n  }\n\n  .inputGroup > div:nth-child(1) {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .colorInput {\n    width: 100%;\n  }\n\n  .formatSelect {\n    flex-shrink: 0;\n    width: 85px; /* Fixed width for the format selector */\n  }\n\n  .color[data-size=\"sm\"] .formatSelect {\n    width: 75px;\n  }\n\n  /* Canvas Styles */\n  .canvasContainer {\n    position: relative;\n    width: 96%;\n    @apply mx-auto mt-2;\n    cursor: crosshair;\n    touch-action: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .canvasContainer[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .canvas {\n    position: relative;\n    width: 100%;\n    flex: 1;\n    border-radius: none;\n    /* clip-path: inset(0 round var(--radius-sm)); */\n    overflow: hidden;\n  }\n\n  .canvasGradientHue {\n    position: absolute;\n    inset: 0;\n    overflow: hidden;\n    /* border-radius: var(--radius-sm); */\n  }\n\n  .canvasGradientSaturation {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n    border-radius: none;\n  }\n\n  .canvasGradientLightness {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n    border-radius: none\n  }\n\n  .canvasPointer {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid color-mix(in srgb, var(--foreground-200) 50%, transparent);\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  /* Hue Slider Styles */\n  .hueSlider {\n    display: flex;\n    align-items: center;\n    height: 16px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .hueTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .hueThumb {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .hueSlider[data-focus-visible=\"true\"] .hueThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .hueThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .hueThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Opacity Slider Styles */\n  .opacitySlider {\n    display: flex;\n    align-items: center;\n    height: 12px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .opacityTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-800),\n      var(--background-800) 10px,\n      var(--background-700) 10px,\n      var(--background-700) 20px\n    );\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .opacityThumb {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .opacitySlider[data-focus-visible=\"true\"] .opacityThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .opacityThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .opacityThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Recent Colors Styles */\n  .recentColors {\n    display: flex;\n    gap: 0.5rem;\n    overflow-x: auto;\n    padding-bottom: 0.25rem;\n  }\n\n  .recentColorSwatch {\n    flex-shrink: 0;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    cursor: pointer;\n    background: none;\n    padding: 0;\n    outline: none;\n  }\n\n  .recentColorSwatch:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--ring-color);\n  }\n\n  .recentColorSwatch:active {\n    transform: scale(0.95);\n  }\n\n  .recentColorSwatch:focus-visible {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n\n  /* Preview Container - deprecated, use previewSwatch instead */\n  .previewContainer {\n    display: flex;\n    justify-content: center;\n    padding: 0.5rem 0;\n  }\n\n  /* Preview Swatch - inline with input */\n  .previewSwatch {\n    position: relative;\n    width: 36px;\n    height: 36px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    flex-shrink: 0;\n  }\n\n  .previewSwatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 6px,\n      var(--background-800) 6px,\n      var(--background-800) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .previewSwatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .preview {\n    position: relative;\n    width: 64px;\n    height: 64px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n  }\n\n  .preview::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 10px,\n      var(--background-800) 10px,\n      var(--background-800) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .preview::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .canvasContainer {\n    min-height: 160px;\n  }\n}\n",
    "cssTypes": "export const color: string;\nexport const colorControls: string;\nexport const inputGroup: string;\nexport const colorInput: string;\nexport const formatSelect: string;\nexport const canvasContainer: string;\nexport const canvas: string;\nexport const canvasGradientHue: string;\nexport const canvasGradientSaturation: string;\nexport const canvasGradientLightness: string;\nexport const canvasPointer: string;\nexport const hueSlider: string;\nexport const hueTrack: string;\nexport const hueThumb: string;\nexport const opacitySlider: string;\nexport const opacityTrack: string;\nexport const opacityThumb: string;\nexport const recentColors: string;\nexport const recentColorSwatch: string;\nexport const previewContainer: string;\nexport const previewSwatch: string;\nexport const preview: string;\n"
  },
  "command": {
    "tsx": "\"use client\";\n\nimport React, {\n  useState,\n  useEffect,\n  useRef,\n  useCallback,\n  ReactNode,\n  Dispatch,\n  SetStateAction,\n} from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useOverlayTriggerState } from \"@react-stately/overlays\";\nimport { useDialog } from \"@react-aria/dialog\";\nimport { FocusScope } from \"@react-aria/focus\";\nimport { filterDOMProps } from \"@react-aria/utils\";\nimport { cn } from \"./utils\";\nimport { FaMagnifyingGlass } from \"react-icons/fa6\";\nimport { useScrollLock } from \"../../hooks/useScrollLock\";\nimport { Card } from \"../Card\";\nimport { Badge } from \"../Badge\";\nimport { Scroll } from \"../Scroll\";\nimport { List } from \"../List\";\nimport type { Key } from \"react-aria\";\nimport styles from \"./Command.module.css\";\n\nexport interface CommandItem {\n  id: string;\n  label: string;\n  description?: string;\n  category?: string;\n  shortcut?: string;\n  icon?: React.ReactNode;\n  keywords?: string[];\n  action: () => void | Promise<void>;\n}\n\nexport interface CommandGroupedItems {\n  category: string | undefined;\n  items: CommandItem[];\n}\n\ninterface CommandContextValue {\n  isOpen: boolean;\n  close: () => void;\n  focusedKey: Key | null;\n  setFocusedKey: Dispatch<SetStateAction<Key | null>>;\n  registerItem: (key: Key, textValue: string) => void;\n  unregisterItem: (key: Key) => void;\n  actionRef: React.MutableRefObject<Map<Key, () => void | Promise<void>>>;\n  searchInputRef: React.MutableRefObject<HTMLInputElement | null>;\n  scrollableRef: React.MutableRefObject<HTMLDivElement | null>;\n  searchValue: string;\n  setSearchValue: Dispatch<SetStateAction<string>>;\n  filteredItems: CommandItem[];\n  groupedItems: CommandGroupedItems[];\n}\n\nconst CommandContext = React.createContext<CommandContextValue | undefined>(\n  undefined,\n);\n\nfunction useCommandContext() {\n  const ctx = React.useContext(CommandContext);\n  if (!ctx) {\n    throw new Error(\"Command sub-components must be used within Command\");\n  }\n  return ctx;\n}\n\nfunction scoreCommandRelevance(\n  text: string,\n  query: string,\n): number {\n  const t = text.toLowerCase();\n  const q = query.toLowerCase();\n\n  if (t === q) return 1000;\n  if (t.startsWith(q)) return 900;\n  if (t.split(/\\s+/).some((word) => word === q)) return 800;\n  if (t.includes(q)) {\n    const index = t.indexOf(q);\n    return 710 - Math.min(index, 10);\n  }\n  return 0;\n}\n\n// ============================================================================\n// Command (root component)\n// ============================================================================\n\nexport interface CommandProps {\n  /** Whether the command palette is open */\n  open?: boolean;\n  /** Called when the open state changes */\n  onOpenChange?: (open: boolean) => void;\n  /** Additional CSS class for the palette dialog */\n  className?: string;\n  /** Additional CSS class for the backdrop overlay */\n  overlayClassName?: string;\n  /** List of command items to display */\n  items?: CommandItem[];\n  /** Custom filter function for commands against the query */\n  filter?: (command: CommandItem, query: string) => boolean;\n  /** Child elements rendered inside the palette */\n  children?: ReactNode;\n}\n\nconst Command = React.forwardRef<HTMLDivElement, CommandProps>(\n  (\n    { open = false, onOpenChange, className, overlayClassName, items = [], filter, children },\n    ref,\n  ) => {\n    const [mounted, setMounted] = useState(false);\n    const overlayState = useOverlayTriggerState({\n      isOpen: open,\n      onOpenChange,\n    });\n\n    const modalRef = useRef<HTMLDivElement>(null);\n    const paletteRef = useRef<HTMLDivElement>(null);\n    const searchInputRef = useRef<HTMLInputElement>(null);\n    const scrollableRef = useRef<HTMLDivElement>(null);\n\n    useScrollLock(overlayState.isOpen, scrollableRef.current);\n    const itemsRef = useRef<Map<Key, string>>(new Map());\n    const actionRef = useRef<Map<Key, () => void | Promise<void>>>(\n      new Map(),\n    );\n    const focusedKeyRef = useRef<Key | null>(null);\n\n    const [focusedKey, setFocusedKey] = useState<Key | null>(null);\n    const [itemCount, setItemCount] = useState(0);\n    const [searchValue, setSearchValue] = useState(\"\");\n\n    const filteredItems = items.filter((cmd) => !filter || filter(cmd, searchValue));\n\n    const groupedItems = React.useMemo(() => {\n      const groups = new Map<string | undefined, CommandItem[]>();\n      filteredItems.forEach((cmd) => {\n        const cat = cmd.category;\n        if (!groups.has(cat)) {\n          groups.set(cat, []);\n        }\n        groups.get(cat)!.push(cmd);\n      });\n\n      // Maintain category order from original items\n      const categoryOrder = new Map<string | undefined, number>();\n      let idx = 0;\n      items.forEach((cmd) => {\n        if (!categoryOrder.has(cmd.category)) {\n          categoryOrder.set(cmd.category, idx++);\n        }\n      });\n\n      return Array.from(groups.entries())\n        .sort(\n          ([a], [b]) =>\n            (categoryOrder.get(a) ?? Infinity) - (categoryOrder.get(b) ?? Infinity),\n        )\n        .map(([category, items]) => ({ category, items }));\n    }, [filteredItems, items]);\n\n    React.useImperativeHandle(ref, () => paletteRef.current as HTMLDivElement);\n\n    useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    // Sync focusedKeyRef with focusedKey\n    useEffect(() => {\n      focusedKeyRef.current = focusedKey;\n    }, [focusedKey]);\n\n    // Auto-focus search input when opening\n    useEffect(() => {\n      if (overlayState.isOpen && searchInputRef.current) {\n        setTimeout(() => searchInputRef.current?.focus(), 0);\n      }\n    }, [overlayState.isOpen]);\n\n    // Cleanup state when overlay closes\n    useEffect(() => {\n      if (!overlayState.isOpen) {\n        scrollableRef.current = null;\n        setSearchValue(\"\");\n      }\n    }, [overlayState.isOpen]);\n\n    // Cmd+K global listener\n    useEffect(() => {\n      const handleKeyDown = (event: KeyboardEvent) => {\n        const isMac =\n          navigator.platform.toUpperCase().indexOf(\"MAC\") >= 0 ||\n          navigator.userAgent.indexOf(\"Mac\") !== -1;\n        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;\n\n        if (isCommandKey && event.key === \"k\") {\n          event.preventDefault();\n          overlayState.open();\n        }\n      };\n\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => {\n        document.removeEventListener(\"keydown\", handleKeyDown);\n      };\n    }, [overlayState]);\n\n    // Auto-focus first item when items change (filtering, opening)\n    useEffect(() => {\n      if (!overlayState.isOpen) return;\n\n      if (!searchValue) {\n        setFocusedKey(null);\n        return;\n      }\n\n      const keys = Array.from(itemsRef.current.keys());\n      if (keys.length > 0) {\n        setFocusedKey(keys[0]);\n      } else {\n        setFocusedKey(null);\n      }\n    }, [itemCount, overlayState.isOpen, searchValue]);\n\n    // Keyboard navigation\n    useEffect(() => {\n      if (!overlayState.isOpen) return;\n\n      const handleKeyDown = (event: KeyboardEvent) => {\n        switch (event.key) {\n          case \"ArrowDown\": {\n            event.preventDefault();\n            const keys = Array.from(itemsRef.current.keys());\n            if (keys.length === 0) return;\n            if (focusedKey === null) {\n              setFocusedKey(keys[0]);\n            } else {\n              const idx = keys.indexOf(focusedKey);\n              setFocusedKey(keys[(idx + 1) % keys.length]);\n            }\n            break;\n          }\n          case \"ArrowUp\": {\n            event.preventDefault();\n            const keys = Array.from(itemsRef.current.keys());\n            if (keys.length === 0) return;\n            if (focusedKey === null) {\n              setFocusedKey(keys[keys.length - 1]);\n            } else {\n              const idx = keys.indexOf(focusedKey);\n              setFocusedKey(keys[idx === 0 ? keys.length - 1 : idx - 1]);\n            }\n            break;\n          }\n          case \"Enter\": {\n            event.preventDefault();\n            if (focusedKey !== null) {\n              const action = actionRef.current.get(focusedKey);\n              if (action) {\n                action();\n                overlayState.close();\n              }\n            }\n            break;\n          }\n          case \"Escape\": {\n            event.preventDefault();\n            overlayState.close();\n            break;\n          }\n        }\n      };\n\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => document.removeEventListener(\"keydown\", handleKeyDown);\n    }, [overlayState.isOpen, focusedKey]);\n\n    const registerItem = useCallback((key: Key, textValue: string) => {\n      itemsRef.current.set(key, textValue);\n      setItemCount((c) => c + 1);\n    }, []);\n\n    const unregisterItem = useCallback((key: Key) => {\n      itemsRef.current.delete(key);\n      setItemCount((c) => c + 1);\n    }, []);\n\n    // Click outside to close\n    const handleOverlayClick = useCallback(\n      (e: React.MouseEvent) => {\n        if (e.target === e.currentTarget) {\n          overlayState.close();\n        }\n      },\n      [overlayState],\n    );\n\n    const { dialogProps } = useDialog(\n      { \"aria-label\": \"Command palette\" },\n      modalRef,\n    );\n\n    if (!mounted || !overlayState.isOpen) {\n      return null;\n    }\n\n    return createPortal(\n      <FocusScope contain restoreFocus>\n        <div\n          className={cn(\n            styles[\"palette\"],\n            styles[\"overlay\"],\n            overlayClassName,\n          )}\n          onClick={handleOverlayClick}\n        >\n          <Card\n            {...filterDOMProps(dialogProps)}\n            ref={modalRef}\n            className={cn(\"content\", styles[\"content\"], className)}\n            role=\"dialog\"\n            aria-modal=\"true\"\n          >\n            <CommandContext.Provider\n              value={{\n                isOpen: overlayState.isOpen,\n                close: overlayState.close,\n                focusedKey,\n                setFocusedKey,\n                registerItem,\n                unregisterItem,\n                actionRef,\n                searchInputRef,\n                scrollableRef,\n                searchValue,\n                setSearchValue,\n                filteredItems,\n                groupedItems,\n              }}\n            >\n              {children}\n            </CommandContext.Provider>\n          </Card>\n        </div>\n      </FocusScope>,\n      document.body,\n    );\n  },\n);\n\nCommand.displayName = \"Command\";\n\n// ============================================================================\n// Command.SearchInput\n// ============================================================================\n\ninterface CommandSearchInputProps {\n  /** Controlled search text value */\n  value?: string;\n  /** Called when the search text changes */\n  onChange?: (value: string) => void;\n  /** Placeholder text for the search input */\n  placeholder?: string;\n  /** Additional CSS class for the search input */\n  className?: string;\n}\n\nconst CommandSearchInput = React.forwardRef<\n  HTMLInputElement,\n  CommandSearchInputProps\n>(({ value: externalValue, onChange: externalOnChange, placeholder = \"Search...\" }, ref) => {\n  const { searchInputRef, searchValue, setSearchValue } = useCommandContext();\n\n  // Use external value/onChange if provided, otherwise use internal context state\n  const value = externalValue !== undefined ? externalValue : searchValue;\n  const onChange = externalOnChange || setSearchValue;\n\n  // Use internal Command ref for auto-focus, or user-provided ref\n  const inputRef = (ref || searchInputRef) as React.RefObject<HTMLInputElement>;\n\n  return (\n    <Card.Header className={styles[\"search\"]}>\n      <div className={styles[\"search-container\"]}>\n        <div className={styles[\"search-icon\"]}>\n          <FaMagnifyingGlass className=\"w-4 h-4\" />\n        </div>\n        <input\n          ref={inputRef}\n          type=\"text\"\n          value={value}\n          onChange={(e) => onChange(e.target.value)}\n          placeholder={placeholder}\n          className={styles[\"search-input\"]}\n          aria-label=\"Search commands\"\n        />\n        {value && (\n          <button\n            aria-label=\"Clear search\"\n            onClick={() => onChange(\"\")}\n            className={styles[\"search-clear\"]}\n          >\n            ✕\n          </button>\n        )}\n      </div>\n    </Card.Header>\n  );\n});\n\nCommandSearchInput.displayName = \"Command.SearchInput\";\n\n// ============================================================================\n// Command.List\n// ============================================================================\n\ninterface CommandListProps {\n  /** Child elements rendered inside the list */\n  children?: ReactNode;\n  /** Message shown when no items match the search */\n  emptyMessage?: string;\n  /** Additional CSS class for the list container */\n  className?: string;\n}\n\n/** Scrollable container that renders the filtered command items */\nconst CommandListComponent = React.forwardRef<\n  HTMLDivElement,\n  CommandListProps\n>(({ children, emptyMessage = \"No items found.\", className }, ref) => {\n  const { scrollableRef } = useCommandContext();\n\n  return (\n    <div className={cn(styles[\"inner\"], className)}>\n      <Scroll\n        ref={(el) => {\n          if (ref) {\n            if (typeof ref === \"function\") {\n              ref(el);\n            } else {\n              ref.current = el;\n            }\n          }\n          scrollableRef.current = el;\n        }}\n        className={styles[\"list\"]}\n        maxHeight=\"44dvh\"\n        fadeY={true}\n      >\n        <div role=\"listbox\" aria-label=\"Commands\">\n          {!children ? (\n            <div className={styles[\"empty\"]}>{emptyMessage}</div>\n          ) : (\n            children\n          )}\n        </div>\n      </Scroll>\n    </div>\n  );\n});\n\nCommandListComponent.displayName = \"Command.List\";\n\n// ============================================================================\n// Command.Item\n// ============================================================================\n\ninterface CommandItemProps {\n  /** Unique key identifying this command item */\n  value: Key;\n  /** Plain-text label used for keyboard navigation lookup */\n  textValue: string;\n  /** Called when the item is selected */\n  action: () => void | Promise<void>;\n  /** Child elements rendered inside the item */\n  children?: ReactNode;\n  /** Additional CSS class for the item */\n  className?: string;\n}\n\nconst CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(\n  ({ value, textValue, action, children, className }, ref) => {\n    const { focusedKey, registerItem, unregisterItem, actionRef } =\n      useCommandContext();\n\n    useEffect(() => {\n      registerItem(value, textValue);\n      actionRef.current.set(value, action);\n      return () => {\n        unregisterItem(value);\n        actionRef.current.delete(value);\n      };\n    }, [value, textValue, action, registerItem, unregisterItem, actionRef]);\n\n    const isHighlighted = focusedKey === value;\n\n    return (\n      <div\n        ref={ref}\n        data-highlighted={isHighlighted}\n        role=\"option\"\n        aria-selected={isHighlighted}\n        onClick={() => action()}\n        className={cn(\"item\", styles[\"item\"], className)}\n      >\n        {children}\n      </div>\n    );\n  },\n);\n\nCommandItem.displayName = \"Command.Item\";\n\n// ============================================================================\n// Command.Category\n// ============================================================================\n\ninterface CommandCategoryProps {\n  /** Child elements rendered inside the category header */\n  children?: ReactNode;\n  /** Additional CSS class for the category */\n  className?: string;\n}\n\n/** Labeled section grouping related commands */\nconst CommandCategory = React.forwardRef<\n  HTMLDivElement,\n  CommandCategoryProps\n>(({ children, className }, ref) => {\n  return (\n    <div\n      ref={ref}\n      className={cn(styles[\"category-header\"], className)}\n    >\n      {children}\n    </div>\n  );\n});\n\nCommandCategory.displayName = \"Command.Category\";\n\n// ============================================================================\n// Command.Footer\n// ============================================================================\n\ninterface CommandFooterProps {\n  /** Child elements rendered inside the footer */\n  children?: ReactNode;\n  /** Additional CSS class applied to the footer */\n  className?: string;\n}\n\n/** Fixed bottom bar in the command palette for hints or actions */\nconst CommandFooter = React.forwardRef<HTMLDivElement, CommandFooterProps>(\n  ({ children, className }, ref) => {\n    return (\n      <Card.Footer ref={ref} className={cn(styles[\"footer\"], className)}>\n        {children}\n      </Card.Footer>\n    );\n  },\n);\n\nCommandFooter.displayName = \"Command.Footer\";\n\n// ============================================================================\n// Command.Groups\n// ============================================================================\n\nexport interface CommandGroupsProps {\n  /** Renders a category header for the given category name */\n  renderCategory?: (category: string | undefined) => ReactNode;\n  /** Renders a single command item row */\n  renderItem: (command: CommandItem) => ReactNode;\n  /** Additional CSS class for the groups container */\n  className?: string;\n}\n\n/** Wrapper that renders multiple Command.Category sections */\nconst CommandGroups = React.forwardRef<HTMLDivElement, CommandGroupsProps>(\n  ({ renderCategory, renderItem, className }, ref) => {\n    const { groupedItems } = useCommandContext();\n\n    return (\n      <div ref={ref} className={className}>\n        {groupedItems.map(({ category, items }) => (\n          <div key={category || \"uncategorized\"}>\n            {renderCategory && renderCategory(category)}\n            {items.map((cmd) => (\n              <React.Fragment key={cmd.id}>{renderItem(cmd)}</React.Fragment>\n            ))}\n          </div>\n        ))}\n      </div>\n    );\n  },\n);\n\nCommandGroups.displayName = \"Command.Groups\";\n\n// ============================================================================\n// Compound Component Type\n// ============================================================================\n\ninterface CommandComponent\n  extends React.ForwardRefExoticComponent<\n    CommandProps & React.RefAttributes<HTMLDivElement>\n  > {\n  SearchInput: typeof CommandSearchInput;\n  List: typeof CommandListComponent;\n  Item: typeof CommandItem;\n  Category: typeof CommandCategory;\n  Footer: typeof CommandFooter;\n  Groups: typeof CommandGroups;\n}\n\n// ============================================================================\n// Exports\n// ============================================================================\n\nconst CommandWithSubcomponents = Object.assign(Command, {\n  SearchInput: CommandSearchInput,\n  List: CommandListComponent,\n  Item: CommandItem,\n  Category: CommandCategory,\n  Footer: CommandFooter,\n  Groups: CommandGroups,\n}) as CommandComponent;\n\nexport { CommandWithSubcomponents as Command };\nexport { CommandSearchInput as CommandInput };\nexport { CommandListComponent as CommandListComponent };\nexport { CommandCategory };\nexport { CommandFooter };\nexport { CommandGroups };\nexport { scoreCommandRelevance };\nexport { useCommandContext };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .palette {\n    --background-default: var(--background-900);\n    --background-hover: var(--background-800);\n    --background-selected: var(--background-800);\n    --background-input: var(--background-900);\n    --border-default: var(--background-700);\n    --fg-default: var(--foreground-300);\n    --fg-muted: var(--foreground-400);\n    --fg-icon: var(--foreground-400);\n    --overlay: rgb(0 0 0 / 0.2);\n    --list-background: var(--background-950);\n    --footer-background: var(--background-800);\n  }\n\n  /* Overlay Container */\n  .overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 999;\n    display: flex;\n    align-items: flex-start;\n    justify-content: center;\n    overflow: hidden;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: blur(4px);\n  }\n\n  /* Content */\n  .content {\n    position: relative;\n    @apply m-2;\n    border-radius: var(--radius-sm);\n    background: var(--background-default);\n    width: 100%;\n    margin-inline: 1rem;\n    max-width: 28rem;\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);\n    animation: fadeInZoomIn 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border-default);\n    overflow: hidden;\n  }\n\n  /* Search Section */\n  .search {\n    border: none;\n    display: flex;\n    padding: 0\n  }\n\n  .search-container {\n    @apply p-1.5 pl-12; \n    position: relative;\n    width: 100%;\n  }\n\n  .search-icon {\n    position: absolute;\n    left: 1.0rem;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 1rem;\n    height: 1rem;\n    display: flex;\n    align-items: center;\n    color: var(--fg-muted);\n    pointer-events: none;\n  }\n\n  .search-input {\n    width: 100%;\n    background-color: var(--background-input);\n    border: none;\n    color: var(--fg-default);\n    padding-block: 0.5rem;\n    font-size: 0.875rem;\n    font-family: inherit;\n  }\n\n  .search-input::placeholder {\n    color: var(--fg-muted);\n  }\n\n  .search-input:focus {\n    outline: none;\n  }\n\n  .search-clear {\n    position: absolute;\n    right: 0.5rem;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 0.25rem;\n    border-radius: var(--radius-md);\n    background-color: transparent;\n    color: var(--fg-muted);\n    border: none;\n    cursor: pointer;\n    transition:\n      background-color 0.15s,\n      color 0.15s;\n  }\n\n  .search-clear:hover {\n    background-color: var(--background-hover);\n    color: var(--fg-icon);\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--list-background);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n  }\n\n  .item {\n    display: flex;\n    @apply px-2 py-0.5;\n    border-radius: 0.375rem;\n    align-items: center;\n    justify-content: space-between;\n    cursor: pointer;\n    transition: background-color 0.15s;\n  }\n\n  .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-highlighted=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .item-content {\n    display: flex;\n    align-items: center;\n    gap: 0.625rem;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-icon {\n    width: 1.5rem;\n    height: 1.5rem;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    color: var(--fg-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .item-label {\n    font-size: 0.875rem;\n    color: var(--fg-default);\n    font-weight: var(--font-weight-medium);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    color: var(--fg-muted);\n    font-size: 0.875rem;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--fg-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--fg-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply px-1.5 py-2 gap-2;\n    width: 100%;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    display: flex;\n    align-items: center;\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fadeInZoomIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  palette: string;\n  overlay: string;\n  backdrop: string;\n  content: string;\n  inner: string;\n  search: string;\n  \"search-container\": string;\n  \"search-icon\": string;\n  \"search-input\": string;\n  \"search-clear\": string;\n  list: string;\n  item: string;\n  \"item-content\": string;\n  \"item-icon\": string;\n  \"item-labels\": string;\n  \"item-label\": string;\n  \"item-description\": string;\n  \"category-header\": string;\n  empty: string;\n  footer: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "confirmation": {
    "tsx": "\"use client\"\n\nimport React, { useState, useEffect } from \"react\"\nimport { cn } from \"./utils\"\nimport { Button } from \"../Button\"\nimport { Card } from \"../Card\"\nimport { HiExclamationCircle, HiExclamation, HiInformationCircle, HiCheckCircle } from \"react-icons/hi\"\nimport styles from \"./Confirmation.module.css\"\n\nexport interface ConfirmationProps {\n  /** Display mode: inline expands in place, dialog shows a modal, auto chooses based on severity */\n  mode?: \"inline\" | \"dialog\" | \"auto\"\n  /** Severity level that affects styling and default mode selection */\n  severity?: \"low\" | \"medium\" | \"high\" | \"critical\"\n  /** Called when the user confirms the action */\n  onConfirm: () => void | Promise<void>\n  /** Called when the user cancels the action */\n  onCancel?: () => void\n  /** Label for the trigger button */\n  triggerLabel: string\n  /** Label for the confirm button */\n  confirmLabel?: string\n  /** Label for the cancel button */\n  cancelLabel?: string\n  /** Whether the trigger button is disabled */\n  disabled?: boolean\n  /** Title shown in dialog mode */\n  title?: string\n  /** Description text shown during the confirmation step */\n  description?: string\n  /** Custom icon shown in the confirmation header */\n  icon?: React.ReactNode\n  /** Warning message displayed in a colored box before confirming */\n  destructiveActionWarning?: string\n  /** Seconds the user must wait before the confirm button becomes active */\n  countdownSeconds?: number\n  /** Whether the user must type confirmationText to enable the confirm button */\n  requiresReason?: boolean\n  /** Text the user must type to confirm when requiresReason is true */\n  confirmationText?: string\n  /** Milliseconds after which the inline confirmation auto-resets to idle state */\n  autoResetAfter?: number\n}\n\nconst severityConfig = {\n  low: {\n    icon: <HiInformationCircle className=\"w-5 h-5 text-blue-500\" />,\n    warningBoxClass: styles[\"warning-box-low\"],\n    buttonVariant: \"primary\" as const,\n  },\n  medium: {\n    icon: <HiExclamation className=\"w-5 h-5 text-yellow-500\" />,\n    warningBoxClass: styles[\"warning-box-medium\"],\n    buttonVariant: \"secondary\" as const,\n  },\n  high: {\n    icon: <HiExclamationCircle className=\"w-5 h-5 text-orange-500\" />,\n    warningBoxClass: styles[\"warning-box-high\"],\n    buttonVariant: \"secondary\" as const,\n  },\n  critical: {\n    icon: <HiExclamationCircle className=\"w-5 h-5 text-red-500\" />,\n    warningBoxClass: styles[\"warning-box-critical\"],\n    buttonVariant: \"secondary\" as const,\n  },\n} as const\n\n/** Modal dialog for confirming destructive actions with context and choices */\nconst Confirmation = React.forwardRef<HTMLDivElement, ConfirmationProps>(\n  (\n    {\n      mode = \"auto\",\n      severity = \"medium\",\n      onConfirm,\n      onCancel,\n      triggerLabel,\n      confirmLabel = \"Confirm\",\n      cancelLabel = \"Cancel\",\n      disabled = false,\n      title,\n      description,\n      icon,\n      destructiveActionWarning,\n      countdownSeconds,\n      requiresReason = false,\n      confirmationText,\n      autoResetAfter,\n    },\n    ref\n  ) => {\n    const [isConfirming, setIsConfirming] = useState(false)\n    const [isLoading, setIsLoading] = useState(false)\n    const [error, setError] = useState<string | null>(null)\n    const [countdown, setCountdown] = useState(countdownSeconds || 0)\n    const [inputValue, setInputValue] = useState(\"\")\n    const [showDialogMode, setShowDialogMode] = useState(false)\n\n    // Determine actual mode\n    const effectiveMode = mode === \"auto\"\n      ? (severity === \"low\" || severity === \"medium\") ? \"inline\" : \"dialog\"\n      : mode\n\n    // Handle countdown timer\n    useEffect(() => {\n      if (!isConfirming || countdown <= 0) return\n\n      const timer = setTimeout(() => {\n        setCountdown(countdown - 1)\n      }, 1000)\n\n      return () => clearTimeout(timer)\n    }, [isConfirming, countdown])\n\n    // Auto-reset inline confirmations\n    useEffect(() => {\n      if (!isConfirming || !autoResetAfter) return\n\n      const timer = setTimeout(() => {\n        resetConfirmation()\n      }, autoResetAfter)\n\n      return () => clearTimeout(timer)\n    }, [isConfirming, autoResetAfter])\n\n    const resetConfirmation = () => {\n      setIsConfirming(false)\n      setError(null)\n      setCountdown(countdownSeconds || 0)\n      setInputValue(\"\")\n      setShowDialogMode(false)\n    }\n\n    const handleTrigger = () => {\n      if (effectiveMode === \"dialog\") {\n        setShowDialogMode(true)\n        setIsConfirming(true)\n      } else {\n        setIsConfirming(true)\n      }\n      setCountdown(countdownSeconds || 0)\n    }\n\n    const handleConfirm = async () => {\n      if (requiresReason && inputValue !== confirmationText) {\n        setError(`Please type \"${confirmationText}\" to confirm`)\n        return\n      }\n\n      if (countdownSeconds && countdown > 0) {\n        setError(`Please wait ${countdown} seconds before confirming`)\n        return\n      }\n\n      setIsLoading(true)\n      setError(null)\n\n      try {\n        await Promise.resolve(onConfirm())\n        resetConfirmation()\n      } catch (err) {\n        setError(err instanceof Error ? err.message : \"An error occurred\")\n        setIsLoading(false)\n      }\n    }\n\n    const handleCancel = () => {\n      onCancel?.()\n      resetConfirmation()\n    }\n\n    const config = severityConfig[severity]\n    const canConfirm = !countdownSeconds || countdown === 0\n    const confirmationValid = !requiresReason || inputValue === confirmationText\n\n    if (effectiveMode === \"inline\" && !showDialogMode) {\n      return (\n        <div ref={ref} className={styles.container}>\n          {!isConfirming ? (\n            <Button\n              onClick={handleTrigger}\n              isDisabled={disabled || isLoading}\n              variant={config.buttonVariant}\n            >\n              {triggerLabel}\n            </Button>\n          ) : (\n            <Card className={cn(styles.card)}>\n              <Card.Body className={cn(styles.body, styles['body-compact'])}>\n                {description && (\n                  <p className={styles.description}>{description}</p>\n                )}\n                {error && (\n                  <p className={styles['error-message']}>{error}</p>\n                )}\n                <div className={cn(styles.actions, styles['actions-inline'])}>\n                  <Button\n                    size=\"sm\"\n                    variant=\"primary\"\n                    onClick={handleConfirm}\n                    isDisabled={!canConfirm || !confirmationValid || isLoading}\n                  >\n                    {isLoading ? \"...\" : confirmLabel}\n                  </Button>\n                  <Button\n                    size=\"sm\"\n                    variant=\"outline\"\n                    onClick={handleCancel}\n                    isDisabled={isLoading}\n                  >\n                    {cancelLabel}\n                  </Button>\n                </div>\n              </Card.Body>\n            </Card>\n          )}\n        </div>\n      )\n    }\n\n    // Dialog mode\n    if (showDialogMode) {\n      return (\n        <div ref={ref}>\n          {isConfirming && (\n            <div className={styles['dialog-overlay']}>\n              <Card className={cn(styles['dialog-card'])}>\n                <Card.Header className={styles.body}>\n                  <div className={styles.header}>\n                    {icon || config.icon}\n                    <div className={styles['header-content']}>\n                      <h4 className={styles['header-title']}>\n                        {title || triggerLabel}\n                      </h4>\n                    </div>\n                  </div>\n                </Card.Header>\n                <Card.Body className={cn(styles.body)}>\n                  {description && (\n                    <p className={styles.description}>{description}</p>\n                  )}\n                  {destructiveActionWarning && (\n                    <div className={cn(\n                      styles['warning-box'],\n                      config.warningBoxClass\n                    )}>\n                      {destructiveActionWarning}\n                    </div>\n                  )}\n                  {countdownSeconds && countdown > 0 && (\n                    <div className={styles['countdown-text']}>\n                      Please wait {countdown}s before confirming\n                    </div>\n                  )}\n                  {requiresReason && (\n                    <div>\n                      <label className={styles['input-label']}>\n                        Type \"{confirmationText}\" to confirm:\n                      </label>\n                      <input\n                        type=\"text\"\n                        value={inputValue}\n                        onChange={(e) => {\n                          setInputValue(e.target.value)\n                          setError(null)\n                        }}\n                        placeholder={confirmationText}\n                        className={styles.input}\n                      />\n                    </div>\n                  )}\n                  {error && (\n                    <p className={styles['error-message']}>{error}</p>\n                  )}\n                </Card.Body>\n                <Card.Footer className={cn(styles.actions, styles['actions-dialog'])}>\n                  <Button\n                    size=\"sm\"\n                    variant=\"outline\"\n                    onClick={handleCancel}\n                    isDisabled={isLoading}\n                  >\n                    {cancelLabel}\n                  </Button>\n                  <Button\n                    size=\"sm\"\n                    variant=\"primary\"\n                    onClick={handleConfirm}\n                    isDisabled={!canConfirm || !confirmationValid || isLoading}\n                  >\n                    {isLoading ? \"...\" : confirmLabel}\n                  </Button>\n                </Card.Footer>\n              </Card>\n            </div>\n          )}\n        </div>\n      )\n    }\n\n    return (\n      <div ref={ref} className={styles.container}>\n        <Button\n          onClick={handleTrigger}\n          isDisabled={disabled || isLoading}\n          variant={config.buttonVariant}\n        >\n          {triggerLabel}\n        </Button>\n      </div>\n    )\n  }\n)\n\nConfirmation.displayName = \"Confirmation\"\n\nexport { Confirmation }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .card {\n    max-width: 28rem;\n  }\n\n  .card-compact {\n    max-width: 21rem;\n  }\n\n  .dialog-overlay {\n    position: fixed;\n    inset: 0;\n    z-index: 50;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: color-mix(in srgb, var(--background-950) 50%, transparent);\n  }\n\n  .dialog-card {\n    max-width: 28rem;\n    margin: 0 1rem;\n  }\n\n  .header {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n  }\n\n  .header-content {\n    flex: 1;\n  }\n\n  .header-title {\n    font-weight: 600;\n    color: var(--foreground-100);\n  }\n\n  .body {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .body-compact {\n    gap: 0.75rem;\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--foreground-danger);\n  }\n\n  .warning-box {\n    padding: 0.75rem;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid;\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    background-color: color-mix(in srgb, var(--background-info) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-info) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-medium {\n    background-color: color-mix(in srgb, var(--background-warning) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-warning) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-high {\n    background-color: color-mix(in srgb, var(--background-warning-dark) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-warning-dark) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-critical {\n    background-color: color-mix(in srgb, var(--background-danger) 20%, transparent);\n    border-color: color-mix(in srgb, var(--background-danger) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--foreground-300);\n  }\n\n  .input {\n    width: 100%;\n    margin-top: 0.5rem;\n    padding: 0.5rem 0.75rem;\n    border-radius: var(--radius-sm);\n    background-color: var(--background-800);\n    border: var(--border-width-base) solid var(--background-700);\n    color: var(--foreground-100);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    display: flex;\n    gap: 0.5rem;\n  }\n\n  .actions-inline {\n    flex-direction: row;\n  }\n\n  .actions-dialog {\n    flex-direction: row;\n    justify-content: flex-end;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  container: string;\n  card: string;\n  \"card-compact\": string;\n  \"dialog-overlay\": string;\n  \"dialog-card\": string;\n  header: string;\n  \"header-content\": string;\n  \"header-title\": string;\n  body: string;\n  \"body-compact\": string;\n  description: string;\n  \"error-message\": string;\n  \"warning-box\": string;\n  \"warning-box-low\": string;\n  \"warning-box-medium\": string;\n  \"warning-box-high\": string;\n  \"warning-box-critical\": string;\n  \"countdown-text\": string;\n  \"input-label\": string;\n  input: string;\n  actions: string;\n  \"actions-inline\": string;\n  \"actions-dialog\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "date": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing, useHover, mergeProps } from \"react-aria\"\nimport { ChevronLeft, ChevronRight } from \"lucide-react\"\nimport styles from \"./Date.module.css\"\nimport { cn } from \"./utils\"\n\n// Alias global Date to avoid shadowing by component name\nconst NativeDate = globalThis.Date;\n\n/**\n * Context type for Calendar state management\n */\nexport interface DateContextValue {\n  selectedDate: Date | null\n  focusedDate: Date | null\n  currentMonth: Date\n  selectDate: (date: Date) => void\n  focusDate: (date: Date) => void\n  navigateMonth: (offset: number) => void\n  isDateDisabled: (date: Date) => boolean\n  isDateOutOfRange: (date: Date) => boolean\n}\n\nconst DateContext = React.createContext<DateContextValue | null>(null)\n\nexport function useDateContext() {\n  const context = React.useContext(DateContext)\n  if (!context) {\n    throw new Error(\"Date component must be used within Date root\")\n  }\n  return context\n}\n\n/**\n * Props for Calendar component\n */\nexport interface DateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {\n  /** Controlled selected date */\n  value?: Date | null\n  /** Called when the user selects a date */\n  onChange?: (date: Date) => void\n  /** Function returning true for dates that should be unselectable */\n  disabled?: (date: Date) => boolean\n  /** Earliest selectable date */\n  minDate?: Date\n  /** Latest selectable date */\n  maxDate?: Date\n  /** Month shown initially when no date is selected */\n  defaultMonth?: Date\n}\n\n/**\n * Helper functions for date calculations\n */\nfunction getDaysInMonth(date: Date): number {\n  return new NativeDate(date.getFullYear(), date.getMonth() + 1, 0).getDate()\n}\n\nfunction getFirstDayOfMonth(date: Date): number {\n  return new NativeDate(date.getFullYear(), date.getMonth(), 1).getDay()\n}\n\nfunction isSameDay(date1: Date, date2: Date): boolean {\n  return (\n    date1.getFullYear() === date2.getFullYear() &&\n    date1.getMonth() === date2.getMonth() &&\n    date1.getDate() === date2.getDate()\n  )\n}\n\nfunction isToday(date: Date): boolean {\n  return isSameDay(date, new NativeDate())\n}\n\n/**\n * Calendar grid computation\n */\nfunction getCalendarGrid(currentMonth: Date): Date[][] {\n  const daysInMonth = getDaysInMonth(currentMonth)\n  const firstDay = getFirstDayOfMonth(currentMonth)\n\n  const grid: Date[] = []\n  let currentDate = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), 1)\n\n  // Handle previous month's days\n  if (firstDay > 0) {\n    const prevMonth = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), 0)\n    const daysInPrevMonth = getDaysInMonth(prevMonth)\n\n    for (let i = firstDay - 1; i >= 0; i--) {\n      const date = new NativeDate(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i)\n      grid.push(date)\n    }\n  }\n\n  // Current month days\n  for (let i = 1; i <= daysInMonth; i++) {\n    grid.push(new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), i))\n  }\n\n  // Pad with next month's days\n  while (grid.length % 7 !== 0) {\n    const nextDay = grid.length - firstDay - daysInMonth + 1\n    const date = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth() + 1, nextDay)\n    grid.push(date)\n  }\n\n  // Convert to rows\n  const rows: Date[][] = []\n  for (let i = 0; i < grid.length; i += 7) {\n    rows.push(grid.slice(i, i + 7))\n  }\n\n  return rows\n}\n\nconst Date = React.forwardRef<HTMLDivElement, DateProps>(\n  (\n    {\n      value: controlledValue,\n      onChange,\n      disabled: disabledProp = () => false,\n      minDate,\n      maxDate,\n      defaultMonth,\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(null)\n    const [currentMonth, setCurrentMonth] = React.useState<Date>(\n      defaultMonth ?? new NativeDate()\n    )\n    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null)\n\n    const selectedDate = controlledValue !== undefined ? controlledValue : uncontrolledValue\n\n    const isDateDisabled = React.useCallback(\n      (date: Date): boolean => {\n        if (disabledProp(date)) return true\n        if (minDate && date < minDate) return true\n        if (maxDate && date > maxDate) return true\n        return false\n      },\n      [disabledProp, minDate, maxDate]\n    )\n\n    const isDateOutOfRange = React.useCallback(\n      (date: Date): boolean => {\n        return (\n          date.getMonth() !== currentMonth.getMonth() ||\n          date.getFullYear() !== currentMonth.getFullYear()\n        )\n      },\n      [currentMonth]\n    )\n\n    const selectDate = React.useCallback(\n      (date: Date) => {\n        if (!isDateDisabled(date)) {\n          if (controlledValue === undefined) {\n            setUncontrolledValue(date)\n          }\n          onChange?.(date)\n          setFocusedDate(null)\n        }\n      },\n      [controlledValue, onChange, isDateDisabled]\n    )\n\n    const focusDate = React.useCallback((date: Date) => {\n      setFocusedDate(date)\n    }, [])\n\n    const navigateMonth = React.useCallback((offset: number) => {\n      setCurrentMonth(prev => {\n        const newMonth = new NativeDate(prev.getFullYear(), prev.getMonth() + offset, 1)\n        return newMonth\n      })\n    }, [])\n\n    const calendarGrid = React.useMemo(\n      () => getCalendarGrid(currentMonth),\n      [currentMonth]\n    )\n\n    const contextValue: DateContextValue = React.useMemo(\n      () => ({\n        selectedDate,\n        focusedDate,\n        currentMonth,\n        selectDate,\n        focusDate,\n        navigateMonth,\n        isDateDisabled,\n        isDateOutOfRange,\n      }),\n      [selectedDate, focusedDate, currentMonth, selectDate, focusDate, navigateMonth, isDateDisabled, isDateOutOfRange]\n    )\n\n    const handleKeyDown = React.useCallback(\n      (e: React.KeyboardEvent<HTMLDivElement>) => {\n        if (!focusedDate) return\n\n        let newFocusedDate: Date | null = null\n\n        switch (e.key) {\n          case \"ArrowUp\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 7)\n            break\n          case \"ArrowDown\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 7)\n            break\n          case \"ArrowLeft\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 1)\n            break\n          case \"ArrowRight\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 1)\n            break\n          case \"Home\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), 1)\n            break\n          case \"End\":\n            e.preventDefault()\n            const daysInMonth = getDaysInMonth(focusedDate)\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), daysInMonth)\n            break\n          case \"PageUp\":\n            e.preventDefault()\n            navigateMonth(-1)\n            return\n          case \"PageDown\":\n            e.preventDefault()\n            navigateMonth(1)\n            return\n          case \"Enter\":\n          case \" \":\n            e.preventDefault()\n            selectDate(focusedDate)\n            return\n        }\n\n        if (newFocusedDate) {\n          setFocusedDate(newFocusedDate)\n          // Auto-navigate month if needed\n          if (newFocusedDate.getMonth() !== currentMonth.getMonth() || newFocusedDate.getFullYear() !== currentMonth.getFullYear()) {\n            setCurrentMonth(new NativeDate(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1))\n          }\n        }\n      },\n      [focusedDate, currentMonth, selectDate, navigateMonth]\n    )\n\n    // Set initial focus to today or selected date\n    React.useEffect(() => {\n      if (!focusedDate) {\n        const dateToFocus = selectedDate ?? new NativeDate()\n        setFocusedDate(dateToFocus)\n      }\n    }, [])\n\n    return (\n      <DateContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          className={cn(\"date\", styles.calendar, className)}\n          role=\"application\"\n          aria-label=\"Date picker calendar\"\n          onKeyDown={handleKeyDown}\n          {...props}\n        >\n          <DateHeader />\n          <DateDayHeaders />\n          <DateGrid grid={calendarGrid} />\n        </div>\n      </DateContext.Provider>\n    )\n  }\n)\n\nDate.displayName = \"Date\"\n\n/**\n * Calendar Header component\n */\ninterface DateHeaderProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Additional CSS class for the header */\n  className?: string;\n}\n\n/** Navigation header with month/year display and prev/next controls */\nconst DateHeader = React.forwardRef<HTMLDivElement, DateHeaderProps>(\n  ({ className, ...props }, ref) => {\n    const { currentMonth, navigateMonth } = useDateContext()\n\n    const monthYear = currentMonth.toLocaleDateString(\"en-US\", {\n      month: \"long\",\n      year: \"numeric\",\n    })\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\"date-header\", styles.header, className)}\n        {...props}\n      >\n        <div className={cn(\"date-month-year\", styles.monthYear)}>\n          {monthYear}\n        </div>\n        <div>\n          <button\n            onClick={() => navigateMonth(-1)}\n            className={cn(\"date-prev-button\", styles.navButton)}\n            aria-label=\"Previous month\"\n          >\n            <ChevronLeft size={16} />\n          </button>\n          <button\n            onClick={() => navigateMonth(1)}\n            className={cn(\"date-next-button\", styles.navButton)}\n            aria-label=\"Next month\"\n          >\n            <ChevronRight size={16} />\n          </button>\n        </div>\n      </div>\n    )\n  }\n)\n\nDateHeader.displayName = \"Date.Header\"\n\n/**\n * Calendar Day Headers component\n */\ninterface DateDayHeadersProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Additional CSS class for the day headers row */\n  className?: string;\n}\n\n/** Row of weekday abbreviation labels above the calendar grid */\nconst DateDayHeaders = React.forwardRef<HTMLDivElement, DateDayHeadersProps>(\n  ({ className, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(\"date-day-headers\", styles.dayHeaders, className)}\n        {...props}\n      >\n        {[\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"].map((day) => (\n          <div\n            key={day}\n            className={cn(\"date-day-header\", styles.dayHeader)}\n          >\n            {day}\n          </div>\n        ))}\n      </div>\n    )\n  }\n)\n\nDateDayHeaders.displayName = \"Date.DayHeaders\"\n\n/**\n * Calendar Grid component\n */\ninterface DateGridProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Calendar grid rows, each containing 7 Date objects */\n  grid: Date[][]\n}\n\n/** The 7-column calendar grid containing date cells */\nconst DateGrid = React.forwardRef<HTMLDivElement, DateGridProps>(\n  ({ grid, className, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(\"date-grid\", styles.grid, className)}\n        role=\"grid\"\n        {...props}\n      >\n        {/* Week headers */}\n        {[\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"].map((day) => (\n          <div\n            key={day}\n            className={cn(\"date-day-header\", styles.weekHeader)}\n            role=\"columnheader\"\n          >\n            {day}\n          </div>\n        ))}\n\n        {/* Calendar rows */}\n        {grid.map((week: Date[], weekIndex: number) => {\n          return (\n            <React.Fragment key={weekIndex}>\n              {week.map((date: Date, dayIndex: number) => (\n                <DateDay key={`${weekIndex}-${dayIndex}`} date={date} />\n              ))}\n            </React.Fragment>\n          )\n        })}\n      </div>\n    )\n  }\n)\n\nDateGrid.displayName = \"Date.Grid\"\n\n/**\n * Calendar Day component\n */\ninterface DateDayProps extends React.HTMLAttributes<HTMLButtonElement> {\n  /** The date this cell represents */\n  date: Date\n}\n\n/** Individual date cell in the calendar grid */\nconst DateDay = React.forwardRef<HTMLButtonElement, DateDayProps>(\n  ({ date, className, onClick, ...props }, ref) => {\n    const {\n      selectedDate,\n      focusedDate,\n      selectDate,\n      focusDate,\n      isDateDisabled,\n      isDateOutOfRange,\n    } = useDateContext()\n\n    const isDisabled = isDateDisabled(date)\n\n    const buttonRef = React.useRef<HTMLButtonElement>(null)\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps } = useHover({ isDisabled })\n\n    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false\n    const isFocused = focusedDate ? isSameDay(date, focusedDate) : false\n    const isCurrentToday = isToday(date)\n    const isOutOfRange = isDateOutOfRange(date)\n\n    const handleClick = React.useCallback(\n      (e: React.MouseEvent<HTMLButtonElement>) => {\n        selectDate(date)\n        focusDate(date)\n        onClick?.(e)\n      },\n      [date, selectDate, focusDate, onClick]\n    )\n\n    const handleFocus = React.useCallback(() => {\n      focusDate(date)\n    }, [date, focusDate])\n\n    React.useEffect(() => {\n      if (isFocused && buttonRef.current) {\n        buttonRef.current.focus({ preventScroll: true })\n      }\n    }, [isFocused])\n\n    return (\n      <button\n        ref={buttonRef}\n        onClick={handleClick}\n        onFocus={handleFocus}\n        className={cn(\"date-day\", styles.dayCell, className)}\n        data-selected={isSelected ? \"true\" : undefined}\n        data-today={isCurrentToday ? \"true\" : undefined}\n        data-disabled={isDisabled ? \"true\" : undefined}\n        data-out-of-range={isOutOfRange ? \"true\" : undefined}\n        data-focus-visible={isFocusVisible && isFocused ? \"true\" : undefined}\n        disabled={isDisabled}\n        aria-selected={isSelected}\n        aria-label={date.toLocaleDateString(\"en-US\", {\n          weekday: \"long\",\n          month: \"long\",\n          day: \"numeric\",\n        })}\n        {...mergeProps(focusProps, hoverProps, props)}\n      >\n        {date.getDate()}\n      </button>\n    )\n  }\n)\n\nDateDay.displayName = \"Date.Day\"\n\nexport { Date, DateDayHeaders, DateHeader, DateGrid, DateDay }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --border: var(--background-700);\n\n    display: inline-flex;\n    flex-direction: column;\n    gap: 0;\n    border-radius: var(--radius-md);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .dayHeaders {\n    @apply px-4 pt-3 pb-1;\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);\n    gap: 0.5rem;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md) var(--radius-md) 0 0;\n    background: var(--background-900);\n  }\n\n  .dayHeader {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 500;\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n  }\n\n  .header {\n    display: flex;\n    @apply pl-2 pr-1.5 py-1.5;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .monthYear {\n    font-weight: 500;\n    @apply ml-2;\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .navButton {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 2rem;\n    min-height: 2rem;\n    border-radius: var(--radius-sm);\n    background-color: transparent;\n    color: var(--foreground-400);\n    border: 1px solid transparent;\n    cursor: pointer;\n    font-size: var(--text-sm);\n    font-weight: 500;\n  }\n\n  .navButton:hover {\n    background-color: var(--background-800);\n  }\n\n  .navButton:focus-visible {\n    background: var(--background-800);\n    border-radius: 0px;\n    outline: 0px solid var(--accent-500);\n  }\n\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    @apply gap-1 px-4 pb-4;\n    background-color: var(--background);\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n    background: var(--background-900);\n  }\n\n  .dayCell {\n    --cell-bg: transparent;\n    --cell-text: var(--foreground-300);\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 2rem;\n    @apply py-2 px-2.5;\n    border-radius: var(--radius-base);\n    background-color: var(--cell-bg);\n    color: var(--cell-text);\n    border: 2px solid transparent;\n    cursor: pointer;\n    font-size: var(--text-sm);\n    font-weight: 400;\n  }\n\n  .weekHeader {\n    display: none;\n  }\n\n  .weekNumber {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.dayCell[data-selected=\"true\"] {\n  --cell-bg: var(--background-800);\n  --cell-text: var(--foreground-50);\n  font-weight: 500;\n}\n\n.dayCell[data-today=\"true\"] {\n  --border: transparent;\n  --foreground: var(--foreground-50);\n  --cell-bg: var(--background-800);\n  color: var(--foreground);\n  border-color: var(--border);\n}\n\n.dayCell[data-disabled=\"true\"] {\n  --cell-bg: var(--background-700);\n  --cell-text: var(--foreground-400);\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n.dayCell[data-out-of-range=\"true\"] {\n  --cell-text: var(--foreground-400);\n  opacity: 0.5;\n}\n\n.dayCell:hover:not([data-disabled=\"true\"]):not([data-out-of-range=\"true\"]) {\n  --cell-bg: var(--background-800);\n}\n\n.dayCell[data-focus-visible=\"true\"]:not([data-disabled=\"true\"]) {\n  outline: 2px solid var(--foreground-300);\n  outline-offset: 2px;\n}\n",
    "cssTypes": "declare const styles: {\n  calendar: string\n  dayHeaders: string\n  dayHeader: string\n  header: string\n  monthYear: string\n  navButton: string\n  grid: string\n  dayCell: string\n  weekHeader: string\n  weekNumber: string\n}\n\nexport default styles\n"
  },
  "divider": {
    "tsx": "import { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn } from \"./utils\";\nimport React from \"react\";\nimport { GroupContext } from \"../Group/Group\";\n\ntype Orientation = \"horizontal\" | \"vertical\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nconst DASHED_DIMENSIONS = {\n  sm: { thickness: 1, dashLength: 8, gapLength: 4 },\n  md: { thickness: 2, dashLength: 8, gapLength: 4 },\n  lg: { thickness: 4, dashLength: 10, gapLength: 6 },\n} as const;\n\nconst DOTTED_DIMENSIONS = {\n  sm: { thickness: 1, radius: 0.5, spacing: 3 },\n  md: { thickness: 2, radius: 1, spacing: 6 },\n  lg: { thickness: 4, radius: 2, spacing: 12 },\n} as const;\n\nfunction getDashedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];\n  const totalLength = dashLength + gapLength;\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\nfunction getDottedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\n// --- CVA Variants ---\n\nconst dividerVariants = cva(\"shrink-0\", {\n  variants: {\n    variant: {\n      solid: \"\",\n      dashed: \"\",\n      dotted: \"\",\n    },\n    orientation: {\n      horizontal: \"w-full\",\n      vertical: \"self-stretch\",\n    },\n    size: {\n      sm: \"\",\n      md: \"\",\n      lg: \"\",\n    },\n    spacing: {\n      none: \"\",\n      sm: \"\",\n      md: \"\",\n      lg: \"\",\n    },\n  },\n  compoundVariants: [\n    // Size + Orientation → dimensions\n    { orientation: \"horizontal\", size: \"sm\", class: \"h-px\" },\n    { orientation: \"vertical\", size: \"sm\", class: \"w-px\" },\n    { orientation: \"horizontal\", size: \"md\", class: \"h-0.5\" },\n    { orientation: \"vertical\", size: \"md\", class: \"w-0.5\" },\n    { orientation: \"horizontal\", size: \"lg\", class: \"h-1\" },\n    { orientation: \"vertical\", size: \"lg\", class: \"w-1\" },\n    // Spacing + Orientation → margins\n    { orientation: \"horizontal\", spacing: \"none\", class: \"my-0\" },\n    { orientation: \"vertical\", spacing: \"none\", class: \"mx-0\" },\n    { orientation: \"horizontal\", spacing: \"sm\", class: \"my-1\" },\n    { orientation: \"vertical\", spacing: \"sm\", class: \"mx-1\" },\n    { orientation: \"horizontal\", spacing: \"md\", class: \"my-2\" },\n    { orientation: \"vertical\", spacing: \"md\", class: \"mx-2\" },\n    { orientation: \"horizontal\", spacing: \"lg\", class: \"my-4\" },\n    { orientation: \"vertical\", spacing: \"lg\", class: \"mx-4\" },\n  ],\n  defaultVariants: {\n    variant: \"solid\",\n    orientation: \"horizontal\",\n    size: \"md\",\n    spacing: \"md\",\n  },\n});\n\nexport interface DividerProps\n  extends React.HTMLAttributes<HTMLDivElement>,\n  VariantProps<typeof dividerVariants> {\n  /** Controls the line style of the divider */\n  variant?: \"solid\" | \"dashed\" | \"dotted\";\n  /** Controls the axis the divider spans */\n  orientation?: \"horizontal\" | \"vertical\";\n  /** Size of the divider thickness */\n  size?: \"sm\" | \"md\" | \"lg\";\n  /** Controls the margin around the divider */\n  spacing?: \"none\" | \"sm\" | \"md\" | \"lg\";\n}\n\nconst Divider = React.forwardRef<HTMLDivElement, DividerProps>(\n  (\n    {\n      className,\n      variant = \"solid\",\n      orientation,\n      size = \"md\",\n      spacing,\n      style,\n      ...props\n    },\n    ref,\n  ) => {\n    const groupContext = React.useContext(GroupContext);\n\n    const resolvedOrientation = (() => {\n      if (orientation !== undefined) return orientation;\n      if (!groupContext) return \"horizontal\";\n      return groupContext.groupOrientation === \"horizontal\" ? \"vertical\" : \"horizontal\";\n    })() as Orientation;\n\n    const resolvedSpacing = (() => {\n      if (spacing !== undefined) return spacing;\n      if (!groupContext) return \"md\";\n      return \"none\";\n    })();\n    const getMaskStyles = (): React.CSSProperties => {\n      const baseStyles: React.CSSProperties = {\n        backgroundColor: \"var(--color-background-700)\",\n      };\n\n      if (variant === \"solid\") {\n        return baseStyles;\n      }\n\n      const svgDataUri =\n        variant === \"dashed\"\n          ? getDashedMaskSvg(resolvedOrientation, size)\n          : getDottedMaskSvg(resolvedOrientation, size);\n\n      const maskRepeat = resolvedOrientation === \"horizontal\" ? \"repeat-x\" : \"repeat-y\";\n      const encodedSvg = `url(\"data:image/svg+xml,${svgDataUri}\")`;\n\n      return {\n        ...baseStyles,\n        WebkitMaskImage: encodedSvg,\n        maskImage: encodedSvg,\n        WebkitMaskRepeat: maskRepeat,\n        maskRepeat: maskRepeat,\n      } as React.CSSProperties;\n    };\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          dividerVariants({ variant, orientation: resolvedOrientation, size, spacing: resolvedSpacing }),\n          'divider', className,\n        )}\n        style={{ ...getMaskStyles(), ...style }}\n        role=\"separator\"\n        aria-orientation={resolvedOrientation}\n        {...props}\n      />\n    );\n  },\n);\n\nDivider.displayName = \"Divider\";\n\nexport { Divider, dividerVariants };\n",
    "css": "",
    "cssTypes": ""
  },
  "easing-preview": {
    "tsx": "import React from \"react\";\nimport type { EasingKey } from \"../../utils/easing\";\nimport { EASING_FUNCTIONS } from \"../../utils/easing\";\n\nexport interface EasingPreviewProps {\n  /** The easing function key to visualize */\n  easing: EasingKey;\n  /** Size of the SVG preview graphic */\n  size?: \"sm\" | \"md\";\n  /** Additional CSS class names */\n  className?: string;\n}\n\nexport const EasingPreview = React.forwardRef<SVGSVGElement, EasingPreviewProps>(\n  ({ easing, size = \"sm\", className = \"\" }, ref) => {\n    const easingData = EASING_FUNCTIONS[easing];\n    const match = easingData.bezier.match(\n      /cubic-bezier\\(([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+),\\s*([\\d.]+)\\)/\n    );\n\n    if (!match) {\n      return null;\n    }\n\n    const [, x1Str, y1Str, x2Str, y2Str] = match;\n    const x1 = parseFloat(x1Str);\n    const y1 = parseFloat(y1Str);\n    const x2 = parseFloat(x2Str);\n    const y2 = parseFloat(y2Str);\n\n    const svgSize = size === \"sm\" ? 24 : 32;\n    const padding = 2;\n    const graphWidth = svgSize - padding * 2;\n    const graphHeight = svgSize - padding * 2;\n\n    const startX = padding;\n    const startY = padding + graphHeight;\n    const endX = padding + graphWidth;\n    const endY = padding;\n\n    const cp1X = startX + x1 * graphWidth;\n    const cp1Y = startY - y1 * graphHeight;\n    const cp2X = startX + x2 * graphWidth;\n    const cp2Y = startY - y2 * graphHeight;\n\n    const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;\n\n    return (\n      <svg\n        ref={ref}\n        width={svgSize}\n        height={svgSize}\n        viewBox={`0 0 ${svgSize} ${svgSize}`}\n        className={className}\n        style={{\n          display: \"inline-block\",\n        }}\n        aria-label={`${easingData.name} easing curve`}\n      >\n        <g>\n          <rect\n            x={padding}\n            y={padding}\n            width={graphWidth}\n            height={graphHeight}\n            fill=\"none\"\n            stroke=\"currentColor\"\n            strokeWidth=\"0.5\"\n            opacity=\"0.2\"\n          />\n          <path\n            d={pathData}\n            fill=\"none\"\n            stroke=\"currentColor\"\n            strokeWidth=\"1.2\"\n            vectorEffect=\"non-scaling-stroke\"\n          />\n          <circle\n            cx={startX}\n            cy={startY}\n            r=\"0.8\"\n            fill=\"currentColor\"\n            opacity=\"0.6\"\n          />\n          <circle\n            cx={endX}\n            cy={endY}\n            r=\"0.8\"\n            fill=\"currentColor\"\n            opacity=\"0.6\"\n          />\n        </g>\n      </svg>\n    );\n  }\n);\n\nEasingPreview.displayName = \"EasingPreview\";\n",
    "css": "",
    "cssTypes": ""
  },
  "expand": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useToggleState, ToggleState } from \"react-stately\";\nimport { useButton, useFocusRing, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport { Divider, DividerProps } from \"@/components/Divider\";\nimport styles from \"./Expand.module.css\";\nimport { FaChevronDown } from \"react-icons/fa6\";\n\ninterface ExpandContextValue {\n  state: ToggleState;\n  isDisabled: boolean;\n}\n\nconst ExpandContext = React.createContext<ExpandContextValue | null>(null);\n\nconst useExpandContext = () => {\n  const context = React.useContext(ExpandContext);\n  if (!context) {\n    throw new Error(\n      \"Expand compound components must be used within an Expand component\",\n    );\n  }\n  return context;\n};\n\n// --- Sub-components ---\n\nexport interface ExpandIconProps\n  extends React.HTMLAttributes<HTMLSpanElement> {\n  /** Custom icon element; defaults to a chevron */\n  children?: React.ReactNode;\n}\n\n/** Animated chevron icon that rotates when the section is open */\nconst ExpandIcon = React.forwardRef<HTMLSpanElement, ExpandIconProps>(\n  ({ children, className, ...props }, ref) => {\n    return (\n      <span ref={ref} className={cn(styles.icon, className)} {...props}>\n        {children ?? (\n          <FaChevronDown size={11} className=\"text-foreground-400\" />\n        )}\n      </span>\n    );\n  },\n);\nExpandIcon.displayName = \"Expand.Icon\";\n\nexport interface ExpandTriggerProps\n  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"title\"> {\n  /** Label or content of the trigger button */\n  children?: React.ReactNode;\n  /** ReactNode label rendered in the title span (overrides HTML title tooltip) */\n  title?: React.ReactNode;\n}\n\n/** Clickable button that toggles the expand/collapse state */\nconst ExpandTrigger = React.forwardRef<HTMLButtonElement, ExpandTriggerProps>(\n  ({ children, className, title, ...props }, ref) => {\n    const { state, isDisabled } = useExpandContext();\n    const triggerRef = React.useRef<HTMLButtonElement>(null);\n    React.useImperativeHandle(\n      ref,\n      () => triggerRef.current as HTMLButtonElement,\n    );\n\n    const { buttonProps, isPressed } = useButton(\n      {\n        isDisabled,\n        onPress: () => state.toggle(),\n        // Filter out form-related props that useButton doesn't support\n        ...Object.fromEntries(\n          Object.entries(props).filter(\n            ([key]) =>\n              ![\n                \"formAction\",\n                \"formEncType\",\n                \"formMethod\",\n                \"formNoValidate\",\n                \"formTarget\",\n              ].includes(key),\n          ),\n        ),\n      },\n      triggerRef,\n    );\n\n    const { focusProps, isFocused, isFocusVisible } = useFocusRing();\n\n    // If children contains React elements, render as a transparent div wrapper.\n    // The child element (e.g. <Group.Button>) owns its own toggle logic and styling.\n    const hasElementChildren = React.Children.toArray(children).some(\n      (child) => React.isValidElement(child),\n    );\n\n    if (hasElementChildren) {\n      return (\n        <div\n          className={cn(styles.trigger, className)}\n          data-expanded={state.isSelected || undefined}\n        >\n          {children}\n        </div>\n      );\n    }\n\n    // Default: styled button with title span + auto-injected chevron\n    return (\n      <button\n        ref={triggerRef}\n        {...mergeProps(buttonProps, focusProps)}\n        className={cn(styles.trigger, className)}\n        aria-expanded={state.isSelected}\n        data-expanded={state.isSelected || undefined}\n        data-disabled={isDisabled || undefined}\n        data-focused={isFocused || undefined}\n        data-focus-visible={isFocusVisible || undefined}\n        data-pressed={isPressed || undefined}\n      >\n        <span className={styles.title}>{title ?? children}</span>\n        <ExpandIcon />\n      </button>\n    );\n  },\n);\nExpandTrigger.displayName = \"Expand.Trigger\";\n\nexport interface ExpandContentProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Content shown when the expand is open */\n  children: React.ReactNode;\n  /** Direction the content reveals from the trigger */\n  from?: \"below\" | \"above\" | \"left\" | \"right\";\n}\n\n/** Collapsible content area revealed when expanded */\nconst ExpandContent = React.forwardRef<HTMLDivElement, ExpandContentProps>(\n  ({ children, className, from, ...props }, ref) => {\n    const { state } = useExpandContext();\n\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.content, className)}\n        data-expanded={state.isSelected || undefined}\n        data-from={from && from !== \"below\" ? from : undefined}\n        aria-hidden={!state.isSelected}\n        {...props}\n      >\n        <div className={styles.contentInner}>{children}</div>\n      </div>\n    );\n  },\n);\nExpandContent.displayName = \"Expand.Content\";\n\n/** Separator line between expand sections */\nconst ExpandDivider = React.forwardRef<HTMLDivElement, DividerProps>(\n  ({ className, spacing = \"none\", ...props }, ref) => {\n    return (\n      <Divider\n        ref={ref}\n        className={cn(\"mt-2\", className)}\n        spacing={spacing}\n        {...props}\n      />\n    );\n  },\n);\nExpandDivider.displayName = \"Expand.Divider\";\n\n// --- Main Expand Component ---\n\nexport interface ExpandProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"title\" | \"onChange\"> {\n  /** Header text or element for the trigger button in preset (non-compound) mode */\n  title?: React.ReactNode;\n  /** Controlled expanded state */\n  isExpanded?: boolean;\n  /** Initial expanded state for uncontrolled usage */\n  defaultExpanded?: boolean;\n  /** Called when the expanded state changes */\n  onExpandedChange?: (isExpanded: boolean) => void;\n  /** Alias for onExpandedChange */\n  onChange?: (isExpanded: boolean) => void;\n  /** Whether the expand is disabled */\n  isDisabled?: boolean;\n  /** Compound sub-components or content nodes */\n  children?: React.ReactNode;\n  /** Additional CSS class for the trigger button */\n  triggerClassName?: string;\n  /** Additional CSS class for the content area */\n  contentClassName?: string;\n}\n\nconst ExpandRoot = React.forwardRef<HTMLDivElement, ExpandProps>(\n  (\n    {\n      isExpanded,\n      defaultExpanded = false,\n      onExpandedChange,\n      onChange,\n      isDisabled = false,\n      className,\n      children,\n      ...props\n    },\n    ref,\n  ) => {\n    const state = useToggleState({\n      isSelected: isExpanded,\n      defaultSelected: defaultExpanded,\n      onChange: onExpandedChange || onChange,\n    });\n\n    const { title, triggerClassName, contentClassName, ...divProps } = props;\n\n    return (\n      <ExpandContext.Provider value={{ state, isDisabled }}>\n        <div\n          ref={ref}\n          className={cn(\"expand\", styles.expand, className)}\n          data-disabled={isDisabled || undefined}\n          {...divProps}\n        >\n          {children}\n        </div>\n      </ExpandContext.Provider>\n    );\n  },\n);\nExpandRoot.displayName = \"Expand\";\n\n// Compatibility wrapper to support both old API and new Compound API\nconst Expand = React.forwardRef<\n  HTMLDivElement,\n  ExpandProps & {\n    Trigger?: typeof ExpandTrigger;\n    Content?: typeof ExpandContent;\n    Divider?: typeof ExpandDivider;\n    Icon?: typeof ExpandIcon;\n  }\n>((props, ref) => {\n  const { title, children, triggerClassName, contentClassName, ...rootProps } =\n    props;\n\n  // If title is provided, use the \"Preset\" structure (Backward Compatibility)\n  if (title !== undefined) {\n    const childrenArray = React.Children.toArray(children);\n    const customDivider = childrenArray.find(\n      (child) => React.isValidElement(child) && child.type === ExpandDivider,\n    );\n    const filteredChildren = childrenArray.filter(\n      (child) => !(React.isValidElement(child) && child.type === ExpandDivider),\n    );\n\n    return (\n      <ExpandRoot ref={ref} {...rootProps}>\n        <ExpandTrigger className={triggerClassName}>{title}</ExpandTrigger>\n        {customDivider || <ExpandDivider />}\n        <ExpandContent className={contentClassName}>\n          {filteredChildren}\n        </ExpandContent>\n      </ExpandRoot>\n    );\n  }\n\n  // Otherwise, use Compound structure (children are expected to include Trigger/Content/Divider)\n  return (\n    <ExpandRoot ref={ref} {...rootProps}>\n      {children}\n    </ExpandRoot>\n  );\n}) as React.ForwardRefExoticComponent<\n  ExpandProps & React.RefAttributes<HTMLDivElement>\n> & {\n  Trigger: typeof ExpandTrigger;\n  Content: typeof ExpandContent;\n  Divider: typeof ExpandDivider;\n  Icon: typeof ExpandIcon;\n};\n\nExpand.displayName = \"Expand\";\n\n// Attach sub-components\nExpand.Trigger = ExpandTrigger;\nExpand.Content = ExpandContent;\nExpand.Divider = ExpandDivider;\nExpand.Icon = ExpandIcon;\n\nexport { Expand, ExpandRoot, ExpandIcon, ExpandTrigger, ExpandContent, ExpandDivider };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .expand {\n    --expand-trigger-background: transparent;\n    --expand-trigger-background-hover: var(--background-900);\n    --expand-trigger-foreground: var(--foreground-50);\n    --expand-content-background: transparent;\n    --expand-content-foreground: var(--foreground-300);\n\n    display: flex;\n    flex-direction: column;\n  }\n\n  .expand[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n\n  .trigger {\n    @apply text-left cursor-pointer;\n    display: flex;\n    align-items: stretch;\n    justify-content: space-between;\n    width: 100%;\n    padding: 0;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--expand-trigger-foreground);\n    background-color: var(--expand-trigger-background);\n    border: none;\n    border-radius: var(--radius-sm);\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    @apply px-3 py-2;\n    flex-shrink: 0;\n    color: inherit;\n    border-radius: var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--expand-trigger-background-hover);\n        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n      }\n\n      /* When the icon itself is hovered, it should be isolated and fully rounded */\n      .trigger:not([data-disabled]) &:hover {\n        border-radius: var(--radius-sm);\n      }\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .expand:has(.trigger[data-expanded=\"true\"]) .icon > * {\n    transform: rotate(180deg);\n  }\n\n  /* from=\"above\": content expands upward above the trigger */\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n\n    .icon > * {\n      transform: rotate(180deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(0deg);\n    }\n  }\n\n  /* from=\"left\": content appears left of trigger */\n  .expand:has(.content[data-from=\"left\"]) {\n    flex-direction: row-reverse;\n    align-items: flex-start;\n\n    .trigger {\n      width: auto;\n      flex-direction: column;\n    }\n\n    .icon > * {\n      transform: rotate(-90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(90deg);\n    }\n  }\n\n  /* from=\"right\": content appears right of trigger */\n  .expand:has(.content[data-from=\"right\"]) {\n    flex-direction: row;\n    align-items: flex-start;\n\n    .trigger {\n      width: auto;\n      flex-direction: column;\n    }\n\n    .icon > * {\n      transform: rotate(90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(-90deg);\n    }\n  }\n\n  /* Horizontal content animation */\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-columns: 1fr;\n    }\n\n    .contentInner {\n      min-height: unset;\n      min-width: 0;\n    }\n  }\n\n  .title {\n    flex: 1;\n    font-weight: var(--font-weight-medium);\n    @apply py-2 pl-3;\n    display: flex;\n    align-items: center;\n    border-radius: var(--radius-sm) 0 0 var(--radius-sm);\n    min-width: 0;\n    overflow: hidden;\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--expand-trigger-background-hover);\n      }\n\n      /* When icon is hovered, remove background from title */\n      .trigger:not([data-disabled]):has(.icon:hover) & {\n        background-color: transparent;\n      }\n    }\n\n    .trigger:not([data-disabled]) {\n      background-color: transparent;\n    }\n  }\n\n  .content {\n    display: grid;\n    grid-template-rows: 0fr;\n    overflow: hidden;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-rows: 1fr;\n    }\n  }\n\n  .contentInner {\n    overflow: hidden;\n    min-height: 0;\n    color: var(--expand-content-foreground);\n    background-color: var(--expand-content-background);\n  }\n\n  .expand:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
    "cssTypes": "export const expand: string;\nexport const trigger: string;\nexport const icon: string;\nexport const title: string;\nexport const content: string;\nexport const contentInner: string;\n"
  },
  "flex": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Flex.module.css\";\n\ntype FlexDirection = \"row\" | \"column\";\ntype FlexWrap = \"wrap\" | \"nowrap\";\ntype FlexJustify =\n  | \"flex-start\"\n  | \"flex-end\"\n  | \"center\"\n  | \"space-between\"\n  | \"space-around\"\n  | \"space-evenly\";\ntype FlexAlign =\n  | \"flex-start\"\n  | \"flex-end\"\n  | \"center\"\n  | \"stretch\"\n  | \"baseline\";\ntype FlexGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\n\nexport interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Direction of the flex container */\n  direction?: FlexDirection;\n  /** Whether items wrap to the next line when they overflow */\n  wrap?: FlexWrap;\n  /** Gap between flex items */\n  gap?: FlexGap;\n  /** Alignment of items along the main axis */\n  justify?: FlexJustify;\n  /** Alignment of items along the cross axis */\n  align?: FlexAlign;\n  /** Wraps the flex container in a container query parent for breakpoint-aware responsiveness */\n  containerQueryResponsive?: boolean;\n}\n\nconst directionMap = {\n  row: styles[\"row\"],\n  column: styles[\"column\"],\n} as const;\n\nconst wrapMap = {\n  wrap: styles[\"wrap\"],\n  nowrap: styles[\"nowrap\"],\n} as const;\n\nconst justifyMap = {\n  \"flex-start\": styles[\"justify-flex-start\"],\n  \"flex-end\": styles[\"justify-flex-end\"],\n  center: styles[\"justify-center\"],\n  \"space-between\": styles[\"justify-space-between\"],\n  \"space-around\": styles[\"justify-space-around\"],\n  \"space-evenly\": styles[\"justify-space-evenly\"],\n} as const;\n\nconst alignMap = {\n  \"flex-start\": styles[\"align-flex-start\"],\n  \"flex-end\": styles[\"align-flex-end\"],\n  center: styles[\"align-center\"],\n  stretch: styles[\"align-stretch\"],\n  baseline: styles[\"align-baseline\"],\n} as const;\n\nconst gapMap = {\n  xs: styles[\"gap-xs\"],\n  sm: styles[\"gap-sm\"],\n  md: styles[\"gap-md\"],\n  lg: styles[\"gap-lg\"],\n  xl: styles[\"gap-xl\"],\n} as const;\n\nconst Flex = React.forwardRef<HTMLDivElement, FlexProps>(\n  (\n    {\n      className,\n      direction = \"row\",\n      wrap = \"nowrap\",\n      gap = \"md\",\n      justify = \"flex-start\",\n      align = \"stretch\",\n      containerQueryResponsive = false,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    if (containerQueryResponsive) {\n      return (\n        <div\n          ref={ref}\n          className={cn(styles[\"container-query-parent\"], className)}\n          data-container-responsive=\"true\"\n          {...props}\n        >\n          <div\n            className={cn(\n              styles.flex,\n              directionMap[direction],\n              wrapMap[wrap],\n              gapMap[gap],\n              justifyMap[justify],\n              alignMap[align],\n              styles[\"container-responsive\"]\n            )}\n            data-direction={direction}\n            data-wrap={wrap}\n            data-gap={gap}\n            data-justify={justify}\n            data-align={align}\n          >\n            {children}\n          </div>\n        </div>\n      );\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          styles.flex,\n          directionMap[direction],\n          wrapMap[wrap],\n          gapMap[gap],\n          justifyMap[justify],\n          alignMap[align],\n          className\n        )}\n        data-direction={direction}\n        data-wrap={wrap}\n        data-gap={gap}\n        data-justify={justify}\n        data-align={align}\n        data-container-responsive={containerQueryResponsive || undefined}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nFlex.displayName = \"Flex\";\n\nexport { Flex };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n    width: 100%;\n  }\n\n  /* Direction variants */\n  .flex.row {\n    flex-direction: row;\n  }\n\n  .flex.column {\n    flex-direction: column;\n  }\n\n  /* Wrap variants */\n  .flex.wrap {\n    flex-wrap: wrap;\n  }\n\n  .flex.nowrap {\n    flex-wrap: nowrap;\n  }\n\n  /* Gap variants */\n  .flex.gap-xs {\n    gap: var(--spacing-xs);\n  }\n\n  .flex.gap-sm {\n    gap: var(--spacing-sm);\n  }\n\n  .flex.gap-md {\n    gap: var(--spacing-md);\n  }\n\n  .flex.gap-lg {\n    gap: var(--spacing-lg);\n  }\n\n  .flex.gap-xl {\n    gap: var(--spacing-xl);\n  }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start {\n    justify-content: flex-start;\n  }\n\n  .flex.justify-flex-end {\n    justify-content: flex-end;\n  }\n\n  .flex.justify-center {\n    justify-content: center;\n  }\n\n  .flex.justify-space-between {\n    justify-content: space-between;\n  }\n\n  .flex.justify-space-around {\n    justify-content: space-around;\n  }\n\n  .flex.justify-space-evenly {\n    justify-content: space-evenly;\n  }\n\n  /* Align-items variants */\n  .flex.align-flex-start {\n    align-items: flex-start;\n  }\n\n  .flex.align-flex-end {\n    align-items: flex-end;\n  }\n\n  .flex.align-center {\n    align-items: center;\n  }\n\n  .flex.align-stretch {\n    align-items: stretch;\n  }\n\n  .flex.align-baseline {\n    align-items: baseline;\n  }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    width: 100%;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  flex: string;\n  row: string;\n  column: string;\n  wrap: string;\n  nowrap: string;\n  \"gap-xs\": string;\n  \"gap-sm\": string;\n  \"gap-md\": string;\n  \"gap-lg\": string;\n  \"gap-xl\": string;\n  \"justify-flex-start\": string;\n  \"justify-flex-end\": string;\n  \"justify-center\": string;\n  \"justify-space-between\": string;\n  \"justify-space-around\": string;\n  \"justify-space-evenly\": string;\n  \"align-flex-start\": string;\n  \"align-flex-end\": string;\n  \"align-center\": string;\n  \"align-stretch\": string;\n  \"align-baseline\": string;\n  \"container-query-parent\": string;\n  \"container-responsive\": string;\n};\n\nexport default styles;\n"
  },
  "frame": {
    "tsx": "\"use client\";\n\nimport React, { useId } from \"react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn } from \"./utils\";\n\nconst frameVariants = cva(\"relative w-full group isolate\", {\n  variants: {\n    variant: {\n      default: \"text-zinc-500\",\n      accent: \"text-emerald-500\",\n    },\n    padding: {\n      none: \"p-0\",\n      small: \"p-2\",\n      medium: \"p-4\",\n      large: \"p-6\",\n    },\n  },\n  defaultVariants: {\n    variant: \"default\",\n    padding: \"medium\",\n  },\n});\n\nexport interface FrameProps\n  extends React.HTMLAttributes<HTMLDivElement>,\n  VariantProps<typeof frameVariants> {\n  /** SVG path data for the notch or tab shape cut into the frame border */\n  path?: string;\n  /** Width of the path shape in pixels */\n  pathWidth?: number;\n  /** Which side of the frame the path shape appears on */\n  side?: \"top\" | \"bottom\" | \"left\" | \"right\";\n  /** Corner radius of the frame border in pixels */\n  cornerRadius?: number;\n  /** Fill color applied behind the frame content area */\n  fill?: string;\n  /** Whether the path shape indents into the frame or extends out from it */\n  shapeMode?: \"indent\" | \"extend\";\n  /** Stroke width of the frame border in pixels */\n  borderWidth?: number;\n  /** Color of the frame border stroke */\n  borderColor?: string;\n  /** Visual color style of the frame */\n  variant?: \"default\" | \"accent\" | null;\n  /** Internal padding preset */\n  padding?: \"none\" | \"small\" | \"medium\" | \"large\" | null;\n}\n\nconst Frame = React.forwardRef<HTMLDivElement, FrameProps>(\n  ({ children, variant, padding, className, style, path, pathWidth = 0, side = \"top\", cornerRadius = 24, fill, shapeMode = \"indent\", borderWidth, borderColor = \"var(--background-700)\", ...props }, ref) => {\n    const maskId = useId();\n    const borderMaskId = `border-${maskId}`;\n    const bgMaskId = `bg-${maskId}`;\n\n    const borderStroke = borderWidth ?? 1;\n    const halfStroke = borderStroke / 2;\n\n    const positionMap = {\n      top: { x: \"50%\", y: \"0\", rotate: 0 },\n      bottom: { x: \"50%\", y: \"100%\", rotate: 180 },\n      left: { x: \"0\", y: \"50%\", rotate: -90 },\n      right: { x: \"100%\", y: \"50%\", rotate: 90 },\n    };\n\n    const { x, y, rotate } = positionMap[side];\n\n    return (\n      <div\n        ref={ref}\n        className={cn(frameVariants({ variant, padding }), className)}\n        style={{\n          maskImage: path && shapeMode === \"indent\" ? `url(#${maskId})` : undefined,\n          WebkitMaskImage: path && shapeMode === \"indent\" ? `url(#${maskId})` : undefined,\n          ...style,\n        }}\n        {...props}\n      >\n        <svg\n          className=\"absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <defs>\n            {/* Mask for the Content/Background: Cuts the path shape (curvature) */}\n            <mask id={maskId}>\n              <rect width=\"100%\" height=\"100%\" fill=\"white\" rx={cornerRadius} />\n              {path && (\n                <svg x={x} y={y} overflow=\"visible\">\n                  <g transform={`rotate(${rotate})`}>\n                    <path\n                      d={path}\n                      fill=\"black\"\n                      transform={`translate(-${pathWidth / 2}, 0)`}\n                    />\n                  </g>\n                </svg>\n              )}\n            </mask>\n\n            {/* Mask for the Border: Cuts a clean gap for the stroke connection */}\n            <mask id={borderMaskId}>\n              <rect width=\"100%\" height=\"100%\" fill=\"white\" rx={cornerRadius} />\n              {path && (\n                <svg x={x} y={y} overflow=\"visible\">\n                  <g transform={`rotate(${rotate})`}>\n                    <rect\n                      x={-pathWidth / 2}\n                      y={-borderStroke * 2}\n                      width={pathWidth}\n                      height={borderStroke * 4}\n                      fill=\"black\"\n                    />\n                  </g>\n                </svg>\n              )}\n            </mask>\n\n            {/* Mask for the Background Fill (Union or Difference) */}\n            <mask id={bgMaskId}>\n              <rect width=\"100%\" height=\"100%\" fill=\"white\" rx={cornerRadius} />\n              {path && (\n                <svg x={x} y={y} overflow=\"visible\">\n                  <g transform={`rotate(${rotate})`}>\n                    <path\n                      d={path}\n                      fill={shapeMode === \"extend\" ? \"white\" : \"black\"}\n                      transform={`translate(-${pathWidth / 2}, 0.010)`}\n                    />\n                  </g>\n                </svg>\n              )}\n            </mask>\n          </defs>\n\n          {/* Background Fill Layer */}\n          {fill && (\n            <rect\n              x=\"-50%\"\n              y=\"-50%\"\n              width=\"200%\"\n              height=\"200%\"\n              fill={fill}\n              mask={`url(#${bgMaskId})`}\n            />\n          )}\n\n          {/* Border Stroke Layer */}\n          <rect\n            x=\"0\"\n            y=\"0\"\n            width=\"100%\"\n            height=\"100%\"\n            rx={cornerRadius}\n            fill=\"none\"\n            stroke={borderColor}\n            strokeWidth={borderStroke}\n            mask={`url(#${borderMaskId})`}\n          />\n\n          {/* Layer 2: The Notch/Tab Path Stroke */}\n          {path && (\n            <svg x={x} y={y} overflow=\"visible\">\n              <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>\n                <path\n                  d={path}\n                  fill=\"none\"\n                  stroke={borderColor}\n                  strokeWidth={borderStroke}\n                  transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}\n                />\n              </g>\n            </svg>\n          )}\n        </svg>\n\n        <div className=\"relative z-10\">{children}</div>\n      </div>\n    );\n  }\n);\n\nFrame.displayName = \"Frame\";\n\nexport { Frame };\n",
    "css": "@layer components {\n  .frame {\n    position: relative;\n    display: inline-block;\n    width: 100%;\n    box-sizing: border-box;\n  }\n\n  .frame[data-has-measurements=\"true\"] {\n    border: none;\n  }\n\n  .background {\n    position: absolute;\n    inset: 0;\n    z-index: 0;\n    background: var(--frame-bg, currentColor);\n    pointer-events: none;\n  }\n\n  .svgOverlay {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    pointer-events: none;\n    overflow: visible; /* Crucial: Allows strokes to bleed slightly outside the path */\n  }\n\n  .pathStroke {\n    fill: none;\n    stroke: var(--frame-stroke, currentColor);\n    stroke-width: var(--frame-stroke-width, 1px);\n  }\n\n  .content {\n    position: relative;\n    z-index: 2;\n    height: 100%;\n  }\n\n  /* Padding variants applied only to the content layer */\n  .padding-none .content { padding: 0; }\n  .padding-small .content { padding: 0.5rem; }\n  .padding-medium .content { padding: 1rem; }\n  .padding-large .content { padding: 2rem; }\n\n  /* Variant styling examples */\n  .variant-default { --frame-bg: rgba(255, 255, 255, 0.05); --frame-stroke: rgba(255, 255, 255, 0.2); }\n  .variant-accent { --frame-stroke: #00f2ff; --frame-bg: rgba(0, 242, 255, 0.05); }\n  .variant-subtle { --frame-stroke: rgba(255, 255, 255, 0.1); --frame-bg: transparent; }\n}\n",
    "cssTypes": ""
  },
  "gallery": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing, useHover, usePress, mergeProps } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport { Grid } from \"../Grid\"\nimport styles from \"./Gallery.module.css\"\n\n// Types\ntype GridColumns = \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\"\ntype GridGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"\ntype ResponsiveColumns = {\n  sm?: GridColumns\n  md?: GridColumns\n  lg?: GridColumns\n  xl?: GridColumns\n}\n\ninterface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Number of columns in the gallery grid */\n  columns?: GridColumns | number | ResponsiveColumns\n  /** Gap between gallery items */\n  gap?: GridGap | number | string\n  /** Number of rows in the gallery grid */\n  rows?: \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto\"\n  /** Whether to enable container-query-based responsive columns */\n  containerQueryResponsive?: boolean\n}\n\ninterface GalleryItemProps extends React.HTMLAttributes<HTMLElement> {\n  /** URL the item links to */\n  href?: string\n  /** Called when the item is pressed */\n  onPress?: (href?: string) => void\n  /** Number of columns this item spans */\n  columnSpan?: number\n  /** Number of rows this item spans */\n  rowSpan?: number\n  /** Controls the item's layout orientation */\n  orientation?: \"vertical\" | \"horizontal\"\n}\n\ninterface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Aspect ratio of the view area (e.g. \"16/9\") */\n  aspectRatio?: string\n}\n\ninterface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> { }\n\n// Helper to map numeric columns to Grid's column values\nconst mapColumnsToGrid = (columns?: GridColumns | number | ResponsiveColumns): GridColumns | ResponsiveColumns => {\n  if (!columns) return \"3\"\n  if (typeof columns === \"string\") return columns\n  if (typeof columns === \"object\") {\n    return columns as ResponsiveColumns\n  }\n  if (columns >= 1 && columns <= 6) return columns.toString() as GridColumns\n  return \"3\" // default fallback\n}\n\n// Helper to map gap values to Grid's gap values\nconst mapGapToGrid = (gap?: GridGap | number | string): GridGap => {\n  if (!gap) return \"md\"\n  if (typeof gap === \"string\" && [\"xs\", \"sm\", \"md\", \"lg\", \"xl\"].includes(gap)) {\n    return gap as GridGap\n  }\n  if (typeof gap === \"number\") {\n    // Map numeric gap values (in pixels) to Grid gap presets\n    if (gap <= 4) return \"xs\"\n    if (gap <= 8) return \"sm\"\n    if (gap <= 16) return \"md\"\n    if (gap <= 24) return \"lg\"\n    return \"xl\"\n  }\n  return \"md\" // default fallback\n}\n\n// Gallery Root Component\nconst GalleryRoot = React.forwardRef<HTMLDivElement, GalleryProps>(\n  ({ columns = 3, gap = \"md\", rows, containerQueryResponsive, className, children, ...props }, ref) => {\n    const gridColumns = mapColumnsToGrid(columns)\n    const gridGap = mapGapToGrid(gap)\n\n    return (\n      <Grid\n        ref={ref}\n        columns={gridColumns as GridColumns | ResponsiveColumns}\n        gap={gridGap}\n        rows={rows}\n        containerQueryResponsive={containerQueryResponsive}\n        className={className}\n        {...props}\n      >\n        {children}\n      </Grid>\n    )\n  }\n)\nGalleryRoot.displayName = \"Gallery\"\n\n// Gallery Item Component\n/** A single media or content tile in the gallery grid */\nconst GalleryItem = React.forwardRef<HTMLElement, GalleryItemProps>(\n  ({ href, onPress, columnSpan, rowSpan, orientation = \"vertical\", className, style, children, ...props }, ref) => {\n    const elementRef = React.useRef<HTMLElement>(null)\n    const combinedRef = (node: HTMLElement | null) => {\n      (elementRef as React.MutableRefObject<HTMLElement | null>).current = node\n      if (typeof ref === \"function\") {\n        ref(node)\n      } else if (ref) {\n        ref.current = node\n      }\n    }\n\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered } = useHover({})\n\n    // Use usePress for button interaction\n    const { pressProps, isPressed } = usePress({\n      onPress: () => onPress?.(href),\n    })\n\n    const spanStyles: React.CSSProperties = {\n      ...(columnSpan && { gridColumn: `span ${columnSpan}` }),\n      ...(rowSpan && { gridRow: `span ${rowSpan}` }),\n      ...style,\n    }\n\n    // Ensure accessible name: aria-label, aria-labelledby, or text content\n    const ariaLabel = props[\"aria-label\"] || props[\"aria-labelledby\"]\n    const hasAccessibleName = ariaLabel || React.Children.count(children) > 0\n\n    const commonProps = mergeProps(\n      focusProps,\n      hoverProps,\n      pressProps,\n      {\n        className: cn(styles.item, className),\n        style: spanStyles,\n        \"data-focus-visible\": isFocusVisible || undefined,\n        \"data-hovered\": isHovered || undefined,\n        \"data-pressed\": isPressed || undefined,\n        \"data-orientation\": orientation,\n        ...(!hasAccessibleName && { \"aria-label\": \"Gallery item\" }),\n        ...props,\n      }\n    )\n\n    return (\n      <div\n        ref={combinedRef as React.Ref<HTMLDivElement>}\n        role=\"button\"\n        tabIndex={0}\n        {...commonProps}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryItem.displayName = \"Gallery.Item\"\n\n// Gallery View Component\n/** Expanded full-screen view overlay for a selected gallery item */\nconst GalleryView = React.forwardRef<HTMLDivElement, GalleryViewProps>(\n  ({ aspectRatio = \"16/9\", className, style, children, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.view, className)}\n        style={{\n          \"--gallery-aspect-ratio\": aspectRatio,\n          ...style\n        } as React.CSSProperties}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryView.displayName = \"Gallery.View\"\n\n// Gallery Body Component\n/** Container for the gallery item's visible content */\nconst GalleryBody = React.forwardRef<HTMLDivElement, GalleryBodyProps>(\n  ({ className, children, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.body, className)}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryBody.displayName = \"Gallery.Body\"\n\n// Compound Component\nconst Gallery = Object.assign(GalleryRoot, {\n  Item: GalleryItem,\n  View: GalleryView,\n  Body: GalleryBody,\n})\n\nexport { Gallery, GalleryItem, GalleryView, GalleryBody }\nexport type { GalleryProps, GalleryItemProps, GalleryViewProps, GalleryBodyProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .item {\n    --background: var(--background-950);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --border-focus: var(--accent-500);\n\n    display: flex;\n    flex-direction: column;\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    cursor: pointer;\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    flex-direction: row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n    --background: var(--background-950);\n\n    position: relative;\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n    overflow: hidden;\n  }\n\n  .view > img,\n  .view > video {\n      width: 100%;\n      height: 100%;\n    object-fit: cover;\n  }\n\n  .body {\n      display: flex;\n      flex-direction: column;\n    gap: 0.25rem;\n    padding: 0.75rem;\n    align-self: flex-start;\n    min-width: 0;\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-50);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly item: string;\n  readonly view: string;\n  readonly body: string;\n};\n\nexport default styles;\n"
  },
  "grid": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Grid.module.css\";\n\ntype GridColumns = \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto-fit\" | \"auto-fill\";\ntype GridRows = \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto\" | \"masonry\";\ntype GridGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\ntype GridJustifyItems = \"start\" | \"end\" | \"center\" | \"stretch\";\ntype GridAlignItems = \"start\" | \"end\" | \"center\" | \"stretch\" | \"baseline\";\ntype GridJustifyContent = \"start\" | \"end\" | \"center\" | \"stretch\" | \"space-between\" | \"space-around\" | \"space-evenly\";\ntype GridAlignContent = \"start\" | \"end\" | \"center\" | \"stretch\" | \"space-between\" | \"space-around\" | \"space-evenly\";\ntype GridAutoFlow = \"row\" | \"column\" | \"row-dense\" | \"column-dense\";\n\ntype ResponsiveValue<T> = { sm?: T; md?: T; lg?: T; xl?: T };\n\nexport interface GridProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Number of grid columns, or responsive object per breakpoint */\n  columns?: GridColumns | ResponsiveValue<GridColumns>;\n  /** Number of grid rows, or responsive object per breakpoint */\n  rows?: GridRows | ResponsiveValue<GridRows>;\n  /** Gap between all grid cells, or responsive object per breakpoint */\n  gap?: GridGap | ResponsiveValue<GridGap>;\n  /** Override gap between rows only */\n  rowGap?: GridGap;\n  /** Override gap between columns only */\n  columnGap?: GridGap;\n  /** Horizontal alignment of items within their cells */\n  justifyItems?: GridJustifyItems;\n  /** Vertical alignment of items within their cells */\n  alignItems?: GridAlignItems;\n  /** Horizontal distribution of the grid within its container */\n  justifyContent?: GridJustifyContent;\n  /** Vertical distribution of the grid rows within its container */\n  alignContent?: GridAlignContent;\n  /** Direction items are auto-placed when no explicit placement is set */\n  autoFlow?: GridAutoFlow;\n  /** Wraps the grid in a container query parent for breakpoint-aware responsiveness */\n  containerQueryResponsive?: boolean;\n}\n\nconst isResponsive = <T,>(v: unknown): v is ResponsiveValue<T> =>\n  typeof v === \"object\" && v !== null && !Array.isArray(v);\n\nconst colsToTpl = (c: GridColumns): string => {\n  if (c === \"auto-fit\") return \"repeat(auto-fit, minmax(200px, 1fr))\";\n  if (c === \"auto-fill\") return \"repeat(auto-fill, minmax(200px, 1fr))\";\n  return `repeat(${c}, 1fr)`;\n};\n\nconst rowsToTpl = (r: GridRows): string => {\n  if (r === \"masonry\" || r === \"auto\") return r;\n  return `repeat(${r}, auto)`;\n};\n\nconst gapVal: Record<GridGap, string> = {\n  xs: \"calc(var(--spacing, 0.25rem) * 1)\",\n  sm: \"calc(var(--spacing, 0.25rem) * 2)\",\n  md: \"calc(var(--spacing, 0.25rem) * 4)\",\n  lg: \"calc(var(--spacing, 0.25rem) * 6)\",\n  xl: \"calc(var(--spacing, 0.25rem) * 8)\",\n};\n\nconst flowVal: Record<GridAutoFlow, string> = {\n  row: \"row\",\n  column: \"column\",\n  \"row-dense\": \"row dense\",\n  \"column-dense\": \"column dense\",\n};\n\nconst Grid = React.forwardRef<HTMLDivElement, GridProps>(\n  (\n    {\n      className,\n      style,\n      columns = \"3\",\n      rows = \"auto\",\n      gap = \"md\",\n      rowGap,\n      columnGap,\n      justifyItems = \"stretch\",\n      alignItems = \"stretch\",\n      justifyContent = \"start\",\n      alignContent = \"start\",\n      autoFlow = \"row\",\n      containerQueryResponsive = false,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    const responsiveCols = isResponsive<GridColumns>(columns);\n    const responsiveRows = isResponsive<GridRows>(rows);\n    const responsiveGap = isResponsive<GridGap>(gap);\n    const needsContainer = responsiveCols || responsiveRows || responsiveGap || containerQueryResponsive;\n\n    const vars: Record<string, string> = {};\n\n    if (responsiveCols) {\n      const rc = columns as ResponsiveValue<GridColumns>;\n      if (rc.sm) vars[\"--grid-tpl-sm\"] = colsToTpl(rc.sm);\n      if (rc.md) vars[\"--grid-tpl-md\"] = colsToTpl(rc.md);\n      if (rc.lg) vars[\"--grid-tpl-lg\"] = colsToTpl(rc.lg);\n      if (rc.xl) vars[\"--grid-tpl-xl\"] = colsToTpl(rc.xl);\n    } else {\n      vars[\"--grid-tpl\"] = colsToTpl(columns as GridColumns);\n    }\n\n    if (responsiveRows) {\n      const rr = rows as ResponsiveValue<GridRows>;\n      if (rr.sm) vars[\"--grid-rows-sm\"] = rowsToTpl(rr.sm);\n      if (rr.md) vars[\"--grid-rows-md\"] = rowsToTpl(rr.md);\n      if (rr.lg) vars[\"--grid-rows-lg\"] = rowsToTpl(rr.lg);\n      if (rr.xl) vars[\"--grid-rows-xl\"] = rowsToTpl(rr.xl);\n    } else {\n      vars[\"--grid-rows\"] = rowsToTpl(rows as GridRows);\n    }\n\n    if (responsiveGap) {\n      const rg = gap as ResponsiveValue<GridGap>;\n      if (rg.sm) vars[\"--grid-gap-sm\"] = gapVal[rg.sm];\n      if (rg.md) vars[\"--grid-gap-md\"] = gapVal[rg.md];\n      if (rg.lg) vars[\"--grid-gap-lg\"] = gapVal[rg.lg];\n      if (rg.xl) vars[\"--grid-gap-xl\"] = gapVal[rg.xl];\n    } else {\n      vars[\"--grid-gap\"] = gapVal[gap as GridGap];\n    }\n\n    if (rowGap) vars[\"--grid-row-gap\"] = gapVal[rowGap];\n    if (columnGap) vars[\"--grid-col-gap\"] = gapVal[columnGap];\n\n    vars[\"--grid-ji\"] = justifyItems;\n    vars[\"--grid-ai\"] = alignItems;\n    vars[\"--grid-jc\"] = justifyContent;\n    vars[\"--grid-ac\"] = alignContent;\n    vars[\"--grid-flow\"] = flowVal[autoFlow];\n\n    const gridClasses = cn(\n      styles.grid,\n      responsiveCols && styles[\"responsive-cols\"],\n      responsiveGap && styles[\"responsive-gap\"],\n      responsiveRows && styles[\"responsive-rows\"],\n      rowGap && styles[\"has-row-gap\"],\n      columnGap && styles[\"has-col-gap\"],\n    );\n\n    if (needsContainer) {\n      return (\n        <div\n          ref={ref}\n          className={cn(styles.container, className)}\n          style={style}\n          {...props}\n        >\n          <div className={gridClasses} style={vars as React.CSSProperties}>\n            {children}\n          </div>\n        </div>\n      );\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={cn(gridClasses, className)}\n        style={{ ...vars, ...style } as React.CSSProperties}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nGrid.displayName = \"Grid\";\n\nexport { Grid };\nexport type { GridColumns, GridRows, GridGap, GridAutoFlow, ResponsiveValue };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    display: grid;\n    width: 100%;\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: var(--grid-gap, calc(var(--spacing, 0.25rem) * 4));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    gap: var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 2));\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-xl, var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap {\n    row-gap: var(--grid-row-gap);\n  }\n\n  .grid.has-col-gap {\n    column-gap: var(--grid-col-gap);\n  }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      gap: calc(var(--spacing, 0.25rem) * 2);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly grid: string;\n  readonly container: string;\n  readonly \"responsive-cols\": string;\n  readonly \"responsive-gap\": string;\n  readonly \"responsive-rows\": string;\n  readonly \"has-row-gap\": string;\n  readonly \"has-col-gap\": string;\n};\n\nexport default styles;\n"
  },
  "group": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { cn } from \"./utils\"\nimport { Button, type ButtonProps } from \"../Button\"\nimport { Input, type InputProps } from \"../Input\"\nimport { Select, type SelectProps } from \"../Select\"\nimport { SelectTriggerContext } from \"../Select/Select.Trigger\"\nimport styles from \"./Group.module.css\"\n\ntype Orientation = \"horizontal\" | \"vertical\"\ntype Spacing = \"none\" | \"sm\"\ntype Variant = \"primary\" | \"secondary\" | \"outline\" | \"ghost\"\n\ninterface GroupProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Controls the axis that children are arranged along */\n  orientation?: Orientation\n  /** Controls the gap between group items */\n  spacing?: Spacing\n  /** Controls the shared visual style applied to group items */\n  variant?: Variant\n  /** Whether all items in the group are non-interactive */\n  isDisabled?: boolean\n}\n\ninterface GroupContextValue {\n  isInGroup: boolean\n  groupVariant: Variant\n  groupOrientation: Orientation\n  groupSpacing: Spacing\n  groupIsDisabled: boolean\n}\n\n// Context\nconst GroupContext = React.createContext<GroupContextValue | null>(null)\n\nfunction useGroupContext() {\n  const context = React.useContext(GroupContext)\n  if (!context) {\n    throw new Error(\"Group sub-components must be used within Group\")\n  }\n  return context\n}\n\n// Variant and orientation maps\nconst orientationMap: Record<Orientation, string> = {\n  horizontal: styles.horizontal,\n  vertical: styles.vertical,\n}\n\nconst spacingMap: Record<Spacing, string> = {\n  none: styles.none,\n  sm: styles.sm,\n}\n\nconst variantMap: Record<Variant, string | undefined> = {\n  primary: undefined,\n  secondary: undefined,\n  outline: undefined,\n  ghost: styles.ghost,\n}\n\n// Detect Divider elements by checking for separator role or orientation prop\nfunction isDivider(child: React.ReactNode): boolean {\n  if (!React.isValidElement(child)) return false\n  const props = (child.props || {}) as Record<string, unknown>\n  return props.role === \"separator\" || \"orientation\" in props\n}\n\n// Root component\n/** Button group that groups related buttons together */\nconst GroupRoot = React.forwardRef<HTMLDivElement, GroupProps>(\n  (\n    {\n      className,\n      orientation = \"horizontal\",\n      spacing = \"none\",\n      variant = \"primary\",\n      children,\n      isDisabled = false,\n      ...props\n    },\n    ref\n  ) => {\n    const isVertical = orientation === \"vertical\"\n\n    const childrenArray = React.Children.toArray(children).filter(\n      (child) => child !== null && child !== undefined\n    )\n\n    const contextValue: GroupContextValue = {\n      isInGroup: true,\n      groupVariant: variant,\n      groupOrientation: orientation,\n      groupSpacing: spacing,\n      groupIsDisabled: isDisabled,\n    }\n\n    return (\n      <GroupContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          className={cn(\n            'group',\n            orientation,\n            styles.group,\n            orientationMap[orientation],\n            spacingMap[spacing],\n            variantMap[variant],\n            className\n          )}\n          role=\"group\"\n          aria-disabled={isDisabled || undefined}\n          {...props}\n        >\n          {childrenArray.map((child, index) => {\n            const isFirst = index === 0\n            const isLast = index === childrenArray.length - 1\n            const isDividerChild = isDivider(child)\n\n            return (\n              <div\n                key={`item-${index}`}\n                className={cn(\n                  'item',\n                  styles.item,\n                  isVertical ? styles.vertical : styles.horizontal,\n                  isFirst && styles.first,\n                  isLast && styles.last,\n                  isDividerChild && styles.divider\n                )}\n              >\n                {child}\n              </div>\n            )\n          })}\n        </div>\n      </GroupContext.Provider>\n    )\n  }\n)\nGroupRoot.displayName = \"Group\"\n\n// Group.Button component\ninterface GroupButtonProps extends ButtonProps {\n  /** Whether this button is in an active/pressed state */\n  active?: boolean\n}\n\n/** Button styled to merge seamlessly with adjacent group items */\nconst GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(\n  ({ active, variant, className, ...restProps }, ref) => {\n    const context = useGroupContext()\n    const isInSelectTrigger = React.useContext(SelectTriggerContext)\n\n    // Merge disabled state from group context\n    const isDisabled = restProps.isDisabled ?? context.groupIsDisabled\n\n    if (isInSelectTrigger) {\n      return (\n        <span className={cn(styles['group-item'], className)}>\n          {restProps.icon?.left}\n          {restProps.children}\n          {restProps.icon?.right}\n        </span>\n      )\n    }\n\n    let buttonVariant = variant\n    if (variant === undefined) {\n      if (context.groupVariant === \"ghost\") {\n        buttonVariant = active ? \"default\" : \"ghost\"\n      } else {\n        buttonVariant = \"ghost\"\n      }\n    }\n\n    const buttonProps = {\n      ...restProps,\n      variant: buttonVariant,\n      isDisabled,\n      className: cn(\n        styles['group-item'],\n        active && styles.active,\n        className\n      ),\n    }\n\n    return <Button ref={ref} {...buttonProps} />\n  }\n)\nGroupButton.displayName = \"Group.Button\"\n\n// Group.Input component\ninterface GroupInputProps extends InputProps { }\n\n/** Input field integrated into the button group */\nconst GroupInput = React.forwardRef<HTMLInputElement, GroupInputProps>(\n  (props, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const disabled = props.disabled ?? context.groupIsDisabled\n\n    return (\n      <div className={styles['group-input-wrapper']}>\n        <Input\n          ref={ref}\n          {...props}\n          disabled={disabled}\n          className={props.className}\n        />\n      </div>\n    )\n  }\n)\nGroupInput.displayName = \"Group.Input\"\n\n// Group.InputWrapper component - preserves Input styling (for use with ghost variant)\ninterface GroupInputWrapperProps extends InputProps { }\n\n/** Input variant that preserves Input styling within the group */\nconst GroupInputWrapper = React.forwardRef<HTMLInputElement, GroupInputWrapperProps>(\n  (props, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const disabled = props.disabled ?? context.groupIsDisabled\n\n    return (\n      <div className={styles['group-input-wrapper']}>\n        <Input\n          ref={ref}\n          {...props}\n          disabled={disabled}\n          className={props.className}\n        />\n      </div>\n    )\n  }\n)\nGroupInputWrapper.displayName = \"Group.InputWrapper\"\n\n// Group.Select component\ninterface GroupSelectProps extends SelectProps<any> { }\n\n/** Select dropdown integrated into the button group */\nconst GroupSelect = React.forwardRef<HTMLDivElement, GroupSelectProps>(\n  ({ className, isDisabled, ...props }, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const disabled = isDisabled ?? context.groupIsDisabled\n\n    return (\n      <Select\n        ref={ref}\n        {...props}\n        isDisabled={disabled}\n        className={cn('groupSelectWrapper', styles['group-select-wrapper'], className)}\n      />\n    )\n  }\n)\nGroupSelect.displayName = \"Group.Select\"\n\n// Assemble compound component\nconst Group = Object.assign(GroupRoot, {\n  Button: GroupButton,\n  Input: GroupInput,\n  InputWrapper: GroupInputWrapper,\n  Select: GroupSelect,\n})\n\nexport { Group, GroupContext, GroupRoot, GroupButton, GroupInput, GroupInputWrapper, GroupSelect }\nexport type { GroupProps, GroupContextValue, GroupButtonProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --radius-basis: calc(var(--spacing) * 1.5);\n    --padding: var(--radius-basis);\n    \n    --background: var(--background-950);\n    --border: var(--background-700);\n\n    display: flex;\n    width: fit-content;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    \n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    overflow: hidden;\n    \n    padding: var(--padding);\n  }\n\n  /* Orientations */\n  .group.horizontal {\n    flex-direction: row;\n    align-items: stretch;\n  }\n\n  .group.vertical {\n    flex-direction: column;\n  }\n\n  /* Spacing */\n  .group.none {\n    --padding: 0;\n    @apply gap-0;\n  }\n\n  .group.sm {\n    --radius-basis: calc(var(--spacing) * 1.25);\n    --padding: var(--radius-basis);\n    @apply space-x-1;\n  }\n\n  /* Variants */\n  .group.ghost {\n    --background: transparent;\n    background-color: transparent;\n    border: none;\n    overflow: visible;\n    @apply gap-1;\n  }\n\n  .item {\n    display: flex;\n    align-items: stretch;\n  }\n\n  .group:not(.ghost) .item .group-item,\n  .group:not(.ghost) .group-input-wrapper input,\n  .group:not(.ghost) .item .group-select-wrapper {\n    border: none;\n  }\n\n  .group.none:not(.ghost) .item .group-item,\n  .group.none:not(.ghost) .group-input-wrapper input,\n  .group.none:not(.ghost) .item .group-select-wrapper,\n  .group.none:not(.ghost) .item .trigger {\n    border-radius: 0;\n  }\n\n  .group.none:not(.ghost) .item .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n  }\n\n  .group.sm:not(.ghost) .item .group-item,\n  .group.sm:not(.ghost) .item .trigger,\n  .group.sm:not(.ghost) .group-select-wrapper .group-item,\n  .group.sm:not(.ghost) .group-select-wrapper .trigger {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.sm:not(.ghost) .group-input-wrapper input {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .group-item {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .group-item {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-input-wrapper input {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-input-wrapper input {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child .group-select-wrapper .group-item {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child .group-select-wrapper .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.horizontal:not(.ghost) .item:last-child > .trigger {\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:first-child > .trigger {\n    border-top-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-top-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group.none.vertical:not(.ghost) .item:last-child > .trigger {\n    border-bottom-left-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border-bottom-right-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .item.divider {\n    padding: 0;\n    display: flex;\n    align-items: stretch;\n  }\n\n  .item.divider > [role=\"separator\"] {\n    height: 100%;\n    width: 100%;\n  }\n\n  .group.horizontal .item.divider {\n    margin-top: calc(var(--padding) * -1);\n    margin-bottom: calc(var(--padding) * -1);\n  }\n\n  .group.vertical .item.divider {\n    margin-left: calc(var(--padding) * -1);\n    margin-right: calc(var(--padding) * -1);\n  }\n\n  .group.ghost:not(.none) .item .group-item:not(.active) {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n    border: var(--border-width-base) solid transparent;\n  }\n\n  /* ghost + none: flat children — no borders or radius */\n  .group.ghost.none {\n    @apply gap-0;\n  }\n\n  .group.ghost.none .item .group-item,\n  .group.ghost.none .group-item.active {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-input-wrapper input {\n    border: none;\n    border-radius: 0;\n  }\n\n  .group.ghost.none .group-select-wrapper {\n    --radius: 0;\n    --inner-radius: 0;\n    border: none;\n    border-radius: 0;\n  }\n\n  .group:not(.ghost) .item .group-item:focus-visible,\n  .group:not(.ghost) .item .trigger:focus-visible,\n  .group-input-wrapper input:focus-visible {\n    outline: none;\n    box-shadow: inset 0 0 0 1px var(--accent-500);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group.ghost .item .group-item:focus-visible,\n  .group.ghost .item .trigger:focus-visible {\n    outline: none;\n    box-shadow: 0 0 0 1px var(--accent-500);\n    position: relative;\n    z-index: 1;\n  }\n\n  .group-input-wrapper {\n    display: flex;\n    align-items: stretch;\n    height: 100%;\n    flex: 1;\n    overflow: visible;\n  }\n\n  .group-input-wrapper input {\n    height: 100%;\n  }\n\n  .item .group-item {\n    display: flex;\n    height: 100%;\n  }\n\n  .group.vertical .item .group-item {\n    width: 100%;\n  }\n\n  .group.sm .item button.group-item {\n    padding: calc(var(--spacing) * 1.50) calc(var(--spacing) * 2.00);\n  }\n\n  .group.none .item button.group-item {\n    padding: calc(var(--spacing) * 2.00) calc(var(--spacing) * 2.50);\n  }\n\n  .group-select-wrapper {\n    display: flex;\n    align-items: stretch;\n    padding: 0;\n    border: none;\n    background-color: transparent;\n  }\n\n  .group.none:not(.ghost) .trigger {\n    border-radius: 0;\n  }\n\n  .trigger {\n    border: none;\n  }\n\n  .group-select-wrapper .select {\n    height: 100%;\n    width: 100%;\n  }\n\n  .group-item.active {\n    position: relative;\n  }\n\n  .group.ghost .group-item.active {\n    border-radius: calc(var(--radius-basis) * var(--radius-ratio));\n  }\n\n  .group:not(.ghost) .group-item.active {\n    background-color: var(--background-800);\n    font-weight: 500;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  group: string;\n  horizontal: string;\n  vertical: string;\n  none: string;\n  sm: string;\n  ghost: string;\n  item: string;\n  divider: string;\n  first: string;\n  last: string;\n  separator: string;\n  \"group-item\": string;\n  \"group-input-wrapper\": string;\n  \"group-select-wrapper\": string;\n  active: string;\n  trigger: string;\n};\n\nexport default styles;\n"
  },
  "input": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, type ComponentPropsWithoutRef } from \"react\";\nimport { useFocusRing, mergeProps } from \"react-aria\";\nimport { FaChevronUp, FaChevronDown } from \"react-icons/fa6\";\nimport { cn } from \"./utils\";\nimport styles from \"./Input.module.css\";\n\ntype Variant = \"default\" | \"ghost\";\n\nexport interface InputProps extends Omit<ComponentPropsWithoutRef<\"input\">, \"size\"> {\n  /** Controls the visual style of the input */\n  variant?: Variant;\n  /** Whether the input is in an error state */\n  error?: boolean;\n  /** Icon displayed before the input value */\n  prefixIcon?: React.ReactNode;\n  /** Icon displayed after the input value */\n  suffixIcon?: React.ReactNode;\n}\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return React.useCallback((value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  }, refs);\n}\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  (\n    {\n      className,\n      variant = \"default\",\n      error = false,\n      disabled,\n      prefixIcon,\n      suffixIcon,\n      type = \"text\",\n      onFocus,\n      onBlur,\n      ...props\n    },\n    ref\n  ) => {\n    const hasPrefix = !!prefixIcon;\n    const hasSuffix = !!suffixIcon;\n    const isNumberType = type === \"number\";\n    const [isFocused, setIsFocused] = React.useState(false);\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const mergedRef = useMergedRef(ref, inputRef);\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {\n      setIsFocused(true);\n      onFocus?.(e);\n    };\n\n    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {\n      setIsFocused(false);\n      onBlur?.(e);\n    };\n\n    const handleSpinClick = (direction: \"up\" | \"down\") => {\n      if (!inputRef.current || disabled) return;\n\n      const input = inputRef.current;\n\n      if (direction === \"up\") {\n        input.stepUp();\n      } else {\n        input.stepDown();\n      }\n\n      // Dispatch native input event to trigger React onChange handlers\n      const event = new Event(\"input\", { bubbles: true });\n      input.dispatchEvent(event);\n    };\n\n    return (\n      <div className={styles.container}>\n        {hasPrefix && (\n          <div className={cn(styles['icon-wrapper'], styles['prefix-icon'])}>\n            {prefixIcon}\n          </div>\n        )}\n        <input\n          ref={mergedRef}\n          type={type}\n          disabled={disabled}\n          data-focus-visible={isFocusVisible ? \"true\" : undefined}\n          data-active={isFocused ? \"true\" : undefined}\n          data-disabled={disabled || undefined}\n          data-error={error ? \"true\" : undefined}\n          data-variant={variant}\n          className={cn(\n            styles.input,\n            hasPrefix && \"pl-10\",\n            (hasSuffix || isNumberType) && \"pr-10\",\n            className\n          )}\n          {...mergeProps(focusProps, {\n            onFocus: handleFocus,\n            onBlur: handleBlur,\n            ...props,\n          })}\n        />\n        {isNumberType && (\n          <div\n            className={cn(styles['number-controls'], disabled && styles.disabled)}\n            data-disabled={disabled || undefined}\n          >\n            <button\n              type=\"button\"\n              className={styles['spin-button']}\n              onClick={() => handleSpinClick(\"up\")}\n              disabled={disabled}\n              tabIndex={-1}\n              aria-label=\"Increment\"\n            >\n              <FaChevronUp size={10} />\n            </button>\n            <button\n              type=\"button\"\n              className={styles['spin-button']}\n              onClick={() => handleSpinClick(\"down\")}\n              disabled={disabled}\n              tabIndex={-1}\n              aria-label=\"Decrement\"\n            >\n              <FaChevronDown size={10} />\n            </button>\n          </div>\n        )}\n        {hasSuffix && (\n          <div className={cn(styles['icon-wrapper'], styles['suffix-icon'])}>\n            {suffixIcon}\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nInput.displayName = \"Input\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-400);\n    --border: var(--background-700);\n    --background-hover: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    outline: none;\n    box-sizing: border-box;\n    @apply px-3 py-2;\n    transition: transform 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop), box-shadow 150ms var(--ease-snappy-pop), background-color 150ms var(--ease-snappy-pop);\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px color-mix(in srgb, var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      border-color: var(--ring-color);\n      /* box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring-color) 20%, transparent); */\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-400);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-active] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 1px color-mix(in srgb, var(--danger-600) 20%, transparent);\n      }\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .input[data-variant=\"ghost\"] {\n    --background: transparent;\n    --border: transparent;\n    --background-hover: transparent;\n    --border-hover: transparent;\n\n    &[data-focus-visible] {\n      box-shadow: none;\n    }\n  }\n\n  .icon-wrapper {\n    position: absolute;\n    top: 50%;\n    display: flex;\n    align-items: center;\n    color: var(--foreground-400);\n    pointer-events: none;\n    transform: translateY(-50%);\n    z-index: 10;\n  }\n\n  .prefix-icon {\n    left: 0.60rem;\n  }\n\n  .suffix-icon {\n    right: 1.00rem;\n  }\n\n  .container {\n    position: relative;\n    width: 100%;\n  }\n\n  .number-controls {\n    position: absolute;\n    top: 50%;\n    right: 0.50rem;\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n    height: 1.5rem;\n    transform: translateY(-50%);\n    pointer-events: auto;\n    z-index: 10;\n  }\n\n  .numberControls.disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .spin-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex: 1;\n    width: 1.25rem;\n    padding: 0;\n    background-color: transparent;\n    border: none;\n    color: var(--foreground-400);\n    cursor: pointer;\n    transition: color 150ms var(--ease-snappy-pop);\n\n    &:hover:not(:disabled) {\n      color: var(--foreground-400);\n    }\n\n    &:active:not(:disabled) {\n      color: var(--accent-500);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: 0.5;\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  input: string;\n  \"icon-wrapper\": string;\n  \"prefix-icon\": string;\n  \"suffix-icon\": string;\n  container: string;\n  \"number-controls\": string;\n  disabled: string;\n  \"spin-button\": string;\n};\n\nexport default styles;\n"
  },
  "label": {
    "tsx": "import { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn } from \"./utils\";\n\nconst labelVariants = cva(\n  \"block text-foreground-300 transition-colors\",\n  {\n    variants: {\n      size: {\n        sm: \"text-xs\",\n        md: \"text-sm\",\n        lg: \"text-md\",\n      },\n      disabled: {\n        true: \"text-foreground-400 opacity-60 cursor-not-allowed\",\n        false: \"\",\n      },\n      error: {\n        true: \"text-danger-600\",\n        false: \"\",\n      },\n    },\n    defaultVariants: {\n      size: \"md\",\n      disabled: false,\n      error: false,\n    },\n  }\n);\n\nexport interface LabelProps\n  extends React.LabelHTMLAttributes<HTMLLabelElement>,\n  VariantProps<typeof labelVariants> {\n  /** Whether to show a required asterisk indicator */\n  required?: boolean;\n  /** Helper text shown below the label */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Size of the label text */\n  size?: \"sm\" | \"md\" | \"lg\" | null;\n  /** Whether the label appears disabled */\n  disabled?: boolean | null;\n  /** Whether to apply error styling */\n  error?: boolean | null;\n}\n\nconst Label = ({\n  className,\n  size,\n  disabled,\n  error,\n  required,\n  helperText,\n  helperTextError,\n  children,\n  ...props\n}: LabelProps) => {\n  return (\n    <div className=\"w-full\">\n      <label\n        className={cn(\n          labelVariants({ size, disabled, error, className })\n        )}\n        {...props}\n      >\n        {children}\n        {required && (\n          <span className=\"text-danger-600 ml-1\" aria-label=\"required\">\n            *\n          </span>\n        )}\n      </label>\n      {helperText && (\n        <p className={cn(\n          \"text-xs mt-1 transition-colors\",\n          helperTextError ? \"text-danger-600\" : \"text-foreground-400\"\n        )}>\n          {helperText}\n        </p>\n      )}\n    </div>\n  );\n};\n\nLabel.displayName = \"Label\";\n\nexport { Label, labelVariants };\n",
    "css": "",
    "cssTypes": ""
  },
  "list": {
    "tsx": "'use client';\n\nimport React from 'react';\nimport { cn } from \"./utils\";\nimport { Divider as FoldDivider } from '@/components/Divider';\nimport styles from './List.module.css';\nimport { ListContext } from './list.context';\nimport {\n  ListContainerProps,\n  ListHeaderProps,\n  ListNavigateCallbacks,\n  ListRef,\n  ActionGroupComponentProps,\n  FooterComponentProps,\n} from './list.types';\nimport { DividerProps } from '@/components/Divider';\n\n// Ref container for keyboard navigation\nconst Container = React.forwardRef<ListRef, ListContainerProps>(\n  ({ items = [], variant = 'default', spacing = 'default', onNavigate, children, className, ...props }, ref) => {\n    const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);\n    const [isKeyboardMode, setIsKeyboardMode] = React.useState(false);\n    const itemRefsContainer = React.useRef<(HTMLElement | null)[]>([]);\n    const itemCountRef = React.useRef(0);\n    const prevItemsLengthRef = React.useRef(items.length);\n\n    // Reset counter if items length changes significantly\n    if (items.length !== prevItemsLengthRef.current) {\n      itemCountRef.current = 0;\n      itemRefsContainer.current = [];\n      prevItemsLengthRef.current = items.length;\n    }\n\n    // Expose ref methods for keyboard navigation\n    React.useImperativeHandle(ref, () => ({\n      focusNext: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex((prev) => {\n          const next = prev === null ? 0 : Math.min(prev + 1, items.length - 1);\n          onNavigate?.down?.();\n          return next;\n        });\n      },\n      focusPrev: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex((prev) => {\n          const next = prev === null ? items.length - 1 : Math.max(prev - 1, 0);\n          onNavigate?.up?.();\n          return next;\n        });\n      },\n      focusFirst: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex(0);\n        onNavigate?.down?.();\n      },\n      focusLast: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex(items.length - 1);\n        onNavigate?.up?.();\n      },\n      selectHighlighted: () => {\n        onNavigate?.enter?.();\n      },\n      clearHighlight: () => {\n        setHighlightedIndex(null);\n      },\n      getHighlightedIndex: () => highlightedIndex,\n    }), [highlightedIndex, items.length, onNavigate]);\n\n    React.useEffect(() => {\n      const el = highlightedIndex !== null ? itemRefsContainer.current[highlightedIndex] : null;\n      if (!el) return;\n      let scroller: HTMLElement | null = el.parentElement;\n      while (scroller && scroller !== document.body && scroller.scrollHeight <= scroller.clientHeight) {\n        scroller = scroller.parentElement;\n      }\n      if (!scroller || scroller === document.body) return;\n      const scrollerRect = scroller.getBoundingClientRect();\n      const itemRect = el.getBoundingClientRect();\n      const buffer = el.offsetHeight * 2;\n      const itemTop = itemRect.top - scrollerRect.top;\n      const itemBottom = itemRect.bottom - scrollerRect.top;\n      if (itemTop < buffer) {\n        scroller.scrollTo({ top: Math.max(0, scroller.scrollTop + itemTop - buffer), behavior: 'smooth' });\n      } else if (itemBottom > scroller.clientHeight - buffer) {\n        scroller.scrollTo({ top: scroller.scrollTop + itemBottom - scroller.clientHeight + buffer, behavior: 'smooth' });\n      }\n    }, [highlightedIndex]);\n\n    const registerItem = React.useCallback((ref: HTMLElement | null) => {\n      const index = itemCountRef.current;\n      itemRefsContainer.current[index] = ref;\n      itemCountRef.current++;\n      return index;\n    }, [items.length]);\n\n    const contextValue = React.useMemo(\n      () => ({\n        highlightedIndex,\n        isKeyboardMode,\n        focusItem: (index: number) => {\n          setIsKeyboardMode(false);\n          setHighlightedIndex(index);\n        },\n        registerItem,\n        itemRefs: itemRefsContainer,\n      }),\n      [highlightedIndex, isKeyboardMode, registerItem]\n    );\n\n    return (\n      <ListContext.Provider value={contextValue}>\n        <div\n          role=\"list\"\n          className={cn(styles.container, className)}\n          data-variant={variant}\n          data-spacing={spacing}\n          data-keyboard-mode={isKeyboardMode ? 'true' : undefined}\n          {...(props as React.HTMLAttributes<HTMLDivElement>)}\n        >\n          {children}\n        </div>\n      </ListContext.Provider>\n    );\n  }\n);\nContainer.displayName = 'List';\n\n/** Sticky heading row above a section of list items */\nconst Header = React.forwardRef<HTMLElement, ListHeaderProps>(\n  ({ sticky, children, className, ...props }, ref) => (\n    <header\n      ref={ref}\n      className={cn(styles.header, sticky && styles.sticky, className)}\n      {...props}\n    >\n      {children}\n    </header>\n  )\n);\nHeader.displayName = 'List.Header';\n\n/** Row of action buttons aligned to the right of a list item */\nconst ActionGroup = React.forwardRef<HTMLDivElement, ActionGroupComponentProps>(\n  ({ justify = 'flex-start', children, className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.actionGroup, className)}\n      data-justify={justify}\n      {...props}\n    >\n      {children}\n    </div>\n  )\n);\nActionGroup.displayName = 'List.ActionGroup';\n\n/** Horizontal separator between list sections */\nconst Divider = React.forwardRef<HTMLDivElement, DividerProps>(\n  ({ className, ...props }, ref) => (\n    <FoldDivider\n      ref={ref}\n      className={className}\n      {...props}\n    />\n  )\n);\nDivider.displayName = 'List.Divider';\n\n/** Fixed bottom row beneath the list body */\nconst Footer = React.forwardRef<HTMLElement, FooterComponentProps>(\n  ({ align = 'center', children, className, ...props }, ref) => (\n    <footer\n      ref={ref}\n      className={cn(styles.footer, className)}\n      data-align={align}\n      {...props}\n    >\n      {children}\n    </footer>\n  )\n);\nFooter.displayName = 'List.Footer';\n\n// Compound component\nconst List = Object.assign(Container, {\n  Header,\n  Item: null as any, // Set in index.ts\n  Checkbox: null as any,\n  Media: null as any,\n  Desc: null as any,\n  ActionGroup,\n  Divider,\n  Footer,\n});\n\nexport { List, Container, Header, ActionGroup, Divider, Footer };\nexport type { ListRef };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    --foreground: var(--foreground-50);\n\n    max-width: 28rem;\n    margin-left: auto;\n    margin-right: auto;\n    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\n    color: var(--foreground);\n  }\n\n  .header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .header.sticky {\n    position: sticky;\n    top: 0;\n  }\n\n  .container[data-spacing=\"sm\"] .header {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.25rem;\n    padding-bottom: 0.25rem;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--foreground-50);\n  }\n\n  .header > :last-child {\n    color: var(--foreground-400);\n  }\n\n  .item {\n    --background-hover: var(--background-800);\n    --background-highlighted: var(--background-800);\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    @apply py-1 px-2;\n    cursor: pointer;\n  }\n\n  .container .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    background-color: var(--background-highlighted);\n  }\n\n  .container[data-spacing=\"sm\"] .item {\n    padding: 0.5rem 0.75rem;\n    gap: 0.375rem;\n  }\n\n  .checkbox {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n  }\n\n  .media {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 2rem;\n    height: 2rem;\n    flex-shrink: 0;\n  }\n\n  .desc {\n    font-size: 0.875rem;\n    color: var(--foreground-400);\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .action-group {\n    display: flex;\n    align-items: center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .action-group[data-justify=\"space-between\"] {\n    justify-content: space-between;\n  }\n\n  .action-group[data-justify=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .action-group[data-justify=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .footer {\n    padding: 1.5rem;\n    padding-bottom: 3rem;\n    display: flex;\n  }\n\n  .footer[data-align=\"center\"] {\n    justify-content: center;\n  }\n\n  .footer[data-align=\"flex-start\"] {\n    justify-content: flex-start;\n  }\n\n  .footer[data-align=\"flex-end\"] {\n    justify-content: flex-end;\n  }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly container: string;\n  readonly header: string;\n  readonly sticky: string;\n  readonly item: string;\n  readonly actionGroup: string;\n  readonly checkbox: string;\n  readonly media: string;\n  readonly desc: string;\n  readonly footer: string;\n};\n\nexport default styles;\n"
  },
  "mask": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Mask.module.css\";\n\ninterface MaskContextValue {\n  maskFilters: string[];\n  clipPath?: string;\n}\n\nconst MaskContext = React.createContext<MaskContextValue | undefined>(undefined);\n\nconst useMaskContext = () => {\n  const context = React.useContext(MaskContext);\n  if (!context) {\n    throw new Error(\"Mask sub-components must be used within a Mask component\");\n  }\n  return context;\n};\n\nexport interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n}\n\nconst MaskRoot = React.forwardRef<HTMLDivElement, MaskProps>(\n  ({ className, children, style, ...props }, ref) => {\n    const childArray = React.Children.toArray(children);\n    const maskFilters: string[] = [];\n    let clipPath: string | undefined;\n    let hasFixedFade = false;\n    let contentChildren: React.ReactNode[] = [];\n\n    childArray.forEach((child) => {\n      if (React.isValidElement(child)) {\n        if (child.type === MaskFade) {\n          const fadeChild = child as React.ReactElement<MaskFadeProps>;\n          if (fadeChild.props.fixed) hasFixedFade = true;\n          maskFilters.push(generateFadeMask(fadeChild.props.direction, fadeChild.props.intensity, fadeChild.props.fixed));\n        } else if (child.type === MaskClip) {\n          const clipChild = child as React.ReactElement<MaskClipProps>;\n          clipPath = clipChild.props.shape;\n        } else {\n          contentChildren.push(child);\n        }\n      } else {\n        contentChildren.push(child);\n      }\n    });\n\n    const contextValue: MaskContextValue = { maskFilters, clipPath };\n\n    const maskStyles = {\n      ...style,\n      ...(hasFixedFade ? { maxHeight: \"inherit\", overflow: \"hidden\" as const } : {}),\n      ...(clipPath ? { \"--mask-clip-path\": clipPath } as Record<string, string> : {}),\n      ...(maskFilters.length > 0 ? {\n        WebkitMaskImage: maskFilters.join(\", \"),\n        maskImage: maskFilters.join(\", \"),\n        WebkitMaskComposite: maskFilters.length > 1 ? \"source-in\" : \"source-over\",\n        maskComposite: maskFilters.length > 1 ? \"intersect\" : \"add\",\n      } : {}),\n    } as React.CSSProperties;\n\n    return (\n      <MaskContext.Provider value={contextValue}>\n        <div\n          {...props}\n          ref={ref}\n          className={cn(\"mask\", styles.mask, className)}\n          style={maskStyles}\n        >\n          {contentChildren}\n        </div>\n      </MaskContext.Provider>\n    );\n  }\n);\n\nMaskRoot.displayName = \"Mask\";\n\nexport interface MaskGradientProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** CSS gradient string applied as the mask image */\n  gradient: string;\n}\n\nconst MaskGradient = React.forwardRef<HTMLDivElement, MaskGradientProps>(\n  ({ className, gradient, style, children, ...props }, ref) => {\n    const maskStyles = {\n      ...style,\n      \"--mask-gradient\": gradient,\n    } as React.CSSProperties;\n\n    return (\n      <div\n        {...props}\n        ref={ref}\n        className={cn(styles.mask, styles[\"mask-gradient\"], className)}\n        style={maskStyles}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nMaskGradient.displayName = \"MaskGradient\";\n\nexport interface MaskFadeProps {\n  /** Edge of the container where the fade starts */\n  direction?: \"top\" | \"bottom\" | \"left\" | \"right\";\n  /** Controls the size of the fade — higher values produce a longer fade */\n  intensity?: number;\n  /** Uses percentage-based fade size instead of pixel-based, for fixed-height containers */\n  fixed?: boolean;\n}\n\nconst MaskFade: React.FC<MaskFadeProps> = () => null;\nMaskFade.displayName = \"MaskFade\";\n\nfunction generateFadeMask(direction: string = \"bottom\", intensity: number = 1, fixed?: boolean): string {\n  const fadeSize = fixed ? `${Math.min(50, 15 * intensity)}%` : `${Math.min(200, 40 * intensity)}px`;\n  const directionMap = {\n    top: `linear-gradient(to bottom, transparent 0, black ${fadeSize})`,\n    bottom: `linear-gradient(to bottom, black calc(100% - ${fadeSize}), transparent 100%)`,\n    left: `linear-gradient(to right, transparent 0, black ${fadeSize})`,\n    right: `linear-gradient(to right, black calc(100% - ${fadeSize}), transparent 100%)`,\n  };\n  return directionMap[direction as keyof typeof directionMap] || directionMap.bottom;\n}\n\n\nexport interface MaskClipProps {\n  /** CSS clip-path value applied to the container (e.g. polygon, circle) */\n  shape: string;\n}\n\nconst MaskClip: React.FC<MaskClipProps> = () => null;\nMaskClip.displayName = \"MaskClip\";\n\nconst Mask = Object.assign(MaskRoot, {\n  Gradient: MaskGradient,\n  Fade: MaskFade,\n  Clip: MaskClip,\n});\n\nexport { Mask };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    position: relative;\n    width: 100%;\n    height: 100%;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
    "cssTypes": "declare const styles: {\n  mask: string;\n  \"mask-gradient\": string;\n};\n\nexport default styles;\n"
  },
  "menu": {
    "tsx": "import * as React from \"react\"\nimport type { Key } from \"react-aria\"\nimport { useListNavigation } from \"../../utils/list-navigation\"\nimport type {\n  MenuContextValue,\n  MenuSubmenuContextValue,\n  RadioGroupContextValue,\n  MenuProps,\n  MenuPortalProps,\n  MenuItemExtras,\n} from \"./menu.types\"\n\nexport const MenuContext = React.createContext<MenuContextValue | null>(null)\n\nexport function useMenuContext() {\n  const context = React.useContext(MenuContext)\n  if (!context) {\n    throw new Error(\"Menu component must be used within Menu root\")\n  }\n  return context\n}\n\nexport const MenuSubmenuContext = React.createContext<MenuSubmenuContextValue | null>(null)\n\nexport function useMenuSubmenuContext() {\n  return React.useContext(MenuSubmenuContext)\n}\n\nexport const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)\n\nexport function useRadioGroupContext() {\n  return React.useContext(RadioGroupContext)\n}\n\nconst MenuPortal = ({ children }: MenuPortalProps) => {\n  return <>{children}</>\n}\nMenuPortal.displayName = \"MenuPortal\"\n\nconst Menu = ({\n  children,\n  selectionMode = \"none\",\n  selectedKeys: controlledSelectedKeys,\n  defaultSelectedKeys,\n  onSelectionChange,\n}: MenuProps) => {\n  const [isOpen, setIsOpen] = React.useState(false)\n  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(\n    defaultSelectedKeys ?? new Set()\n  )\n  const [radioGroups, setRadioGroups] = React.useState<Map<string, Key | null>>(new Map())\n  const [activeSubmenuKey, setActiveSubmenuKey] = React.useState<Key | null>(null)\n\n  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : uncontrolledSelectedKeys\n\n  const nav = useListNavigation({ isOpen })\n  const itemExtrasRef = React.useRef<Map<Key, MenuItemExtras>>(new Map())\n  const mouseMoveDetectedRef = React.useRef(true)\n  const clickPositionRef = React.useRef({ x: 0, y: 0 })\n  const triggerRef = React.useRef<HTMLDivElement | null>(null)\n\n  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {\n    nav.registerItem(key, textValue, isDisabled)\n    itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })\n  }, [nav.registerItem])\n\n  const unregisterItem = React.useCallback((key: Key) => {\n    nav.unregisterItem(key)\n    itemExtrasRef.current.delete(key)\n  }, [nav.unregisterItem])\n\n  const handleSelectionChange = React.useCallback((keys: Set<Key>) => {\n    if (controlledSelectedKeys === undefined) {\n      setUncontrolledSelectedKeys(keys)\n    }\n    onSelectionChange?.(keys)\n  }, [controlledSelectedKeys, onSelectionChange])\n\n  const toggleSelection = React.useCallback((key: Key) => {\n    const newKeys = new Set(selectedKeys)\n    if (selectionMode === \"single\") {\n      newKeys.clear()\n      newKeys.add(key)\n    } else if (selectionMode === \"multiple\") {\n      if (newKeys.has(key)) {\n        newKeys.delete(key)\n      } else {\n        newKeys.add(key)\n      }\n    }\n    handleSelectionChange(newKeys)\n  }, [selectedKeys, selectionMode, handleSelectionChange])\n\n  const close = React.useCallback(() => {\n    setIsOpen(false)\n    nav.setFocusedKey(null)\n  }, [nav.setFocusedKey])\n\n  const selectFocusedItem = React.useCallback(() => {\n    if (nav.focusedKey === null) return\n    const item = nav.items.find(i => i.key === nav.focusedKey)\n    if (item?.isDisabled) return\n    const extras = itemExtrasRef.current.get(nav.focusedKey)\n    extras?.onSelect?.()\n  }, [nav.focusedKey, nav.items])\n\n  const isFocusedItemSubmenu = React.useCallback(() => {\n    if (nav.focusedKey === null) return false\n    const extras = itemExtrasRef.current.get(nav.focusedKey)\n    return extras?.isSubmenuTrigger ?? false\n  }, [nav.focusedKey])\n\n  const setRadioGroupValue = React.useCallback((groupName: string, value: Key | null) => {\n    setRadioGroups(prev => {\n      const next = new Map(prev)\n      next.set(groupName, value)\n      return next\n    })\n  }, [])\n\n  const getRadioGroupValue = React.useCallback((groupName: string) => {\n    return radioGroups.get(groupName) ?? null\n  }, [radioGroups])\n\n  React.useEffect(() => {\n    if (isOpen && nav.enabledFilteredItems.length > 0) {\n      nav.setFocusedKey(nav.enabledFilteredItems[0].key)\n    }\n  }, [isOpen])\n\n  const contextValue = React.useMemo(() => ({\n    isOpen,\n    setIsOpen,\n    close,\n    selectionMode,\n    selectedKeys,\n    onSelectionChange: handleSelectionChange,\n    toggleSelection,\n    items: nav.items,\n    registerItem,\n    unregisterItem,\n    focusedKey: nav.focusedKey,\n    setFocusedKey: nav.setFocusedKey,\n    navigateToNextItem: nav.navigateToNextItem,\n    navigateToPrevItem: nav.navigateToPrevItem,\n    selectFocusedItem,\n    isFocusedItemSubmenu,\n    radioGroups,\n    setRadioGroupValue,\n    getRadioGroupValue,\n    triggerRef,\n    mouseMoveDetectedRef,\n    clickPositionRef,\n    activeSubmenuKey,\n    setActiveSubmenuKey,\n  } satisfies MenuContextValue), [\n    isOpen,\n    close,\n    selectionMode,\n    selectedKeys,\n    handleSelectionChange,\n    toggleSelection,\n    nav.items,\n    registerItem,\n    unregisterItem,\n    nav.focusedKey,\n    nav.setFocusedKey,\n    nav.navigateToNextItem,\n    nav.navigateToPrevItem,\n    selectFocusedItem,\n    isFocusedItemSubmenu,\n    radioGroups,\n    setRadioGroupValue,\n    getRadioGroupValue,\n    activeSubmenuKey,\n    setActiveSubmenuKey,\n  ])\n\n  return (\n    <MenuContext.Provider value={contextValue}>\n      {children}\n    </MenuContext.Provider>\n  )\n}\nMenu.displayName = \"Menu\"\n\nexport { Menu, MenuPortal }\nexport type {\n  SelectionMode,\n  MenuContextValue,\n  MenuSubmenuContextValue,\n  RadioGroupContextValue,\n  MenuItemExtras,\n} from \"./menu.types\"\nexport type {\n  MenuProps,\n  MenuTriggerProps,\n  MenuPortalProps,\n  MenuContentProps,\n  MenuGroupProps,\n  MenuItemProps,\n  MenuCheckboxItemProps,\n  MenuRadioGroupProps,\n  MenuRadioItemProps,\n  MenuLabelProps,\n  MenuSeparatorProps,\n  MenuShortcutProps,\n  MenuSubProps,\n  MenuSubTriggerProps,\n  MenuSubContentProps,\n} from \"./menu.types\"\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    --menu-animation: none;\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slideInFromTop 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slideOutToTop 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .checkboxItem {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .radioItem {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .itemIndicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-300);\n    margin-left: auto;\n  }\n\n  .subTrigger {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    min-width: 0;\n\n    &[data-highlighted] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .subTriggerChevron {\n    flex-shrink: 0;\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .subContent {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    --menu-animation: none;\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    background-color: var(--background-900);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slideInFromTop 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slideOutToTop 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .label {\n    padding: var(--padding);\n    font-size: var(--text-xs);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    font-size: var(--text-xs);\n    letter-spacing: 0.1em;\n    color: var(--foreground-400);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  content: string\n  list: string\n  item: string\n  checkboxItem: string\n  radioItem: string\n  itemIndicator: string\n  subTrigger: string\n  subTriggerChevron: string\n  subContent: string\n  label: string\n  separator: string\n  shortcut: string\n}\n\nexport default styles\n"
  },
  "modal": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useDialog, useModalOverlay, mergeProps } from \"react-aria\";\nimport { useOverlayTriggerState } from \"react-stately\";\nimport { cn } from \"./utils\";\nimport { HiX } from \"react-icons/hi\";\nimport styles from \"./Modal.module.css\";\n\nconst useModalKeyboard = (\n  ref: React.RefObject<HTMLDivElement | null>,\n  isOpen: boolean,\n  isDismissable: boolean,\n  isKeyboardDismissDisabled: boolean,\n  onClose: () => void\n) => {\n  React.useEffect(() => {\n    if (!isOpen || !ref.current) return;\n\n    ref.current.focus();\n\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\" && isDismissable && !isKeyboardDismissDisabled) {\n        e.preventDefault();\n        onClose();\n      }\n    };\n\n    ref.current.addEventListener(\"keydown\", handleKeyDown);\n    return () => ref.current?.removeEventListener(\"keydown\", handleKeyDown);\n  }, [isOpen, isDismissable, isKeyboardDismissDisabled, onClose]);\n};\n\nexport interface ModalProps {\n  /** Whether the modal is open */\n  isOpen?: boolean;\n  /** Callback when the open state changes */\n  onOpenChange?: (isOpen: boolean) => void;\n  /** Optional title rendered in the modal header bar */\n  title?: React.ReactNode;\n  /** Modal body content */\n  children: React.ReactNode;\n  /** Optional footer content rendered below the body */\n  footer?: React.ReactNode;\n  /** Whether to show the X close button in the header */\n  closeButton?: boolean;\n  /** Controls modal width: \"fit\" adapts to content, \"auto\" uses default width */\n  size?: \"fit\" | \"auto\";\n  /** Whether clicking the backdrop dismisses the modal */\n  isDismissable?: boolean;\n  /** Prevents the Escape key from dismissing the modal */\n  isKeyboardDismissDisabled?: boolean;\n  /** Additional class for the modal panel */\n  className?: string;\n  /** Additional class for the inner content area */\n  contentClassName?: string;\n  /** Additional class for the backdrop overlay */\n  overlayClassName?: string;\n}\n\nconst sizeClasses: Record<string, string> = {\n  fit: (styles as any)[\"size-fit\"],\n  auto: (styles as any)[\"size-auto\"],\n};\n\n/**\n * Modal component that displays content in a centered dialog with a backdrop overlay.\n * Built with React Aria for full accessibility support including focus management,\n * keyboard handling, and screen reader announcements.\n */\nconst ModalBase = React.forwardRef<HTMLDivElement, ModalProps>(\n  (\n    {\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      title,\n      children,\n      footer,\n      closeButton = true,\n      size = \"auto\",\n      isDismissable = true,\n      isKeyboardDismissDisabled = false,\n      className,\n      contentClassName,\n      overlayClassName,\n    },\n    ref\n  ) => {\n    const modalRef = React.useRef<HTMLDivElement>(null);\n    const [mounted, setMounted] = React.useState(false);\n\n    // Use uncontrolled state management via useOverlayTriggerState\n    const state = useOverlayTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange: onOpenChange,\n    });\n\n    // Handle mount to prevent hydration issues\n    React.useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    // Use forwardRef callback to expose modalRef\n    React.useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);\n\n    // Handle keyboard events and auto-focus\n    useModalKeyboard(\n      modalRef,\n      state.isOpen,\n      isDismissable,\n      isKeyboardDismissDisabled,\n      () => state.close()\n    );\n\n    // useDialog hook provides accessibility attributes and title handling\n    const { dialogProps, titleProps } = useDialog({}, modalRef);\n\n    // useModalOverlay handles focus management, scroll prevention, and backdrop interaction\n    const { modalProps, underlayProps } = useModalOverlay(\n      {\n        isDismissable: isDismissable,\n        isKeyboardDismissDisabled: isKeyboardDismissDisabled,\n      },\n      state,\n      modalRef\n    );\n\n    if (!mounted || !state.isOpen) {\n      return null;\n    }\n\n    const handleClose = () => {\n      state.close();\n    };\n\n    return createPortal(\n      <div\n        className={cn(\n          \"fixed inset-0 z-9999 flex items-center justify-center\",\n          styles.overlay,\n          overlayClassName\n        )}\n      >\n        {/* Backdrop overlay - underlayProps handles click outside and escape key */}\n        <div\n          {...underlayProps}\n          className={cn(styles.backdrop)}\n        />\n\n        {/* Modal content */}\n        <div\n          {...mergeProps(dialogProps, modalProps)}\n          ref={modalRef}\n          className={cn(\n            styles.modal,\n            sizeClasses[size],\n            className\n          )}\n          onClick={(e) => e.stopPropagation()}\n          tabIndex={-1}\n          data-open={state.isOpen || undefined}\n        >\n          {/* Header */}\n          {(title || closeButton) && (\n            <div className={styles.header}>\n              {title && (\n                <h4 {...titleProps} className={styles.title}>\n                  {title}\n                </h4>\n              )}\n              {!title && closeButton && <div className={styles.spacer} />}\n              {closeButton && (\n                <button\n                  onClick={handleClose}\n                  className={styles.closeButton}\n                  aria-label=\"Close modal\"\n                >\n                  <HiX className={styles.closeIcon} />\n                </button>\n              )}\n            </div>\n          )}\n\n          {/* Body */}\n          <div className={cn(styles.content, contentClassName)}>\n            {children}\n          </div>\n\n          {/* Footer */}\n          {footer && (\n            <div className={styles.footer}>\n              {footer}\n            </div>\n          )}\n        </div>\n      </div>,\n      document.body\n    );\n  }\n);\n\nModalBase.displayName = \"Modal\";\n\n/**\n * ModalHeader component for use with compound Modal pattern\n */\nconst ModalHeader = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={styles.header} {...props}>\n    {children}\n  </div>\n));\n\nModalHeader.displayName = \"Modal.Header\";\n\n/**\n * ModalBody component for use with compound Modal pattern\n */\nconst ModalBody = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={styles.content} {...props}>\n    {children}\n  </div>\n));\n\nModalBody.displayName = \"Modal.Body\";\n\n/**\n * ModalFooter component for use with compound Modal pattern\n */\nconst ModalFooter = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={cn('footer', styles.footer)} {...props}>\n    {children}\n  </div>\n));\n\nModalFooter.displayName = \"Modal.Footer\";\n\nconst Modal = Object.assign(ModalBase, {\n  Header: ModalHeader,\n  Body: ModalBody,\n  Footer: ModalFooter,\n});\n\nexport { Modal, ModalHeader, ModalBody, ModalFooter };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .overlay {\n    --modal-bg: var(--background-900);\n    --modal-bg-footer: var(--background-800);\n    --modal-border: var(--background-700);\n    --modal-title-color: var(--foreground-100);\n    --modal-text-color: var(--foreground-300);\n    --modal-close-color: var(--foreground-400);\n    --modal-close-hover: var(--foreground-200);\n  }\n\n  .backdrop {\n    position: absolute;\n    inset: 0;\n    background-color: rgb(0 0 0 / 0.5);\n    backdrop-filter: blur(4px);\n    transition: opacity 200ms var(--ease-gentle-ease);\n    cursor: pointer;\n  }\n\n  .modal {\n    position: relative;\n    z-index: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    max-height: 90vh;\n    margin: 1rem;\n    background-color: var(--modal-bg);\n    border: var(--border-width-base) solid var(--modal-border);\n    border-radius: var(--radius-md);\n    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5);\n    animation: modalIn 200ms var(--ease-snappy-pop);\n    pointer-events: auto;\n    overflow: hidden;\n  }\n\n  @keyframes modalIn {\n    from {\n      opacity: 0;\n      transform: scale(0.95);\n    }\n    to {\n      opacity: 1;\n      transform: scale(1);\n    }\n  }\n\n  .header {\n    @apply py-4 px-6 gap-2;\n\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    border-bottom: var(--border-width-base) solid var(--modal-border);\n  }\n\n  .title {\n    margin: 0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--modal-title-color);\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    margin-left: auto;\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: var(--modal-close-color);\n    transition: color 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n  }\n\n  .closeButton:hover {\n    color: var(--modal-close-hover);\n  }\n\n  .closeButton:active {\n    transform: scale(0.92);\n  }\n\n  .closeButton:focus {\n    outline: 2px solid var(--modal-close-hover);\n    outline-offset: 2px;\n    border-radius: 0.25rem;\n  }\n\n  .closeIcon {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--modal-text-color);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background: var(--modal-border);\n    border-radius: 3px;\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    background: var(--modal-close-color);\n  }\n\n  .footer {\n    @apply py-4 px-6 gap-4;\n\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    background-color: var(--background-950);\n    border-top: var(--border-width-base) solid var(--modal-border);\n  }\n\n  /* Size variants */\n  .size-fit {\n    width: fit-content;\n  }\n\n  .size-auto {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .modal {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  overlay: string;\n  backdrop: string;\n  modal: string;\n  header: string;\n  title: string;\n  spacer: string;\n  closeButton: string;\n  closeIcon: string;\n  content: string;\n  footer: string;\n  \"size-sm\": string;\n  \"size-md\": string;\n  \"size-lg\": string;\n  \"size-xl\": string;\n};\n\nexport default styles;\n"
  },
  "page": {
    "tsx": "\"use client\"\n\nimport * as React from 'react';\nimport { cn } from \"./utils\";\nimport { PageContext } from './page.context';\nimport { PageProps, PageContextValue, PagePadding } from './page.types';\nimport styles from './Page.module.css';\n\nconst paddingMap: Record<PagePadding, string> = {\n  none: styles.paddingNone,\n  sm: styles.paddingSm,\n  md: styles.paddingMd,\n  lg: styles.paddingLg,\n  xl: styles.paddingXl,\n};\n\nconst PageRoot = React.forwardRef<HTMLDivElement, PageProps>(\n  (\n    {\n      maxWidth = '1400px',\n      padding = 'md',\n      centered = true,\n      fullscreen = false,\n      className,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    const [isMobile, setIsMobile] = React.useState(false);\n\n    React.useEffect(() => {\n      const mediaQuery = window.matchMedia('(max-width: 768px)');\n      setIsMobile(mediaQuery.matches);\n\n      const handleChange = (e: MediaQueryListEvent) => {\n        setIsMobile(e.matches);\n      };\n\n      mediaQuery.addEventListener('change', handleChange);\n      return () => mediaQuery.removeEventListener('change', handleChange);\n    }, []);\n\n    const contextValue: PageContextValue = {\n      pageWidth: fullscreen ? undefined : maxWidth,\n      isMobile,\n      pageMaxWidth: fullscreen ? undefined : maxWidth,\n      pagePadding: padding,\n    };\n\n    const paddingClass = paddingMap[padding];\n\n    return (\n      <PageContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          role=\"main\"\n          className={cn(styles.page, paddingClass, className)}\n          data-centered={centered}\n          data-fullscreen={fullscreen}\n          style={\n            {\n              maxWidth: !fullscreen ? maxWidth : undefined,\n              ...props.style,\n            } as React.CSSProperties\n          }\n          {...props}\n        >\n          {children}\n        </div>\n      </PageContext.Provider>\n    );\n  }\n);\n\nPageRoot.displayName = 'Page';\n\nexport const Page = PageRoot;\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    position: relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    align-items: center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .paddingNone {\n    padding: 0;\n  }\n\n  .paddingSm {\n    padding: var(--spacing-sm, 0.5rem);\n  }\n\n  .paddingMd {\n    padding: var(--spacing-md, 1rem);\n  }\n\n  .paddingLg {\n    padding: var(--spacing-lg, 1.5rem);\n  }\n\n  .paddingXl {\n    padding: var(--spacing-xl, 2rem);\n  }\n}\n",
    "cssTypes": "export const page: string;\nexport const paddingNone: string;\nexport const paddingSm: string;\nexport const paddingMd: string;\nexport const paddingLg: string;\nexport const paddingXl: string;\n"
  },
  "panel": {
    "tsx": "'use client'\n\nimport React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'\nimport {\n  PanelProps,\n  PanelHeaderProps,\n  PanelContentProps,\n  PanelFooterProps,\n  PanelSidebarProps,\n  PanelToggleProps,\n  PanelGroupProps,\n  PanelResizeProps,\n  PanelGroupContextValue,\n} from './panel.types'\nimport { PanelContext, PanelGroupContext } from './panel.context'\nimport styles from './Panel.module.css'\n\n/** Flexible multi-panel layout with header, content, footer, and sidebar */\nconst PanelRoot = React.forwardRef<HTMLDivElement, PanelProps>(\n  ({ spacing = 'md', variant = 'default', className, children, ...props }, ref) => {\n    const [isStacked, setIsStacked] = useState(false)\n    const [sidebarOpen, setSidebarOpen] = useState(true)\n    const containerRef = useRef<HTMLDivElement>(null)\n\n    useEffect(() => {\n      const container = containerRef.current || (ref && 'current' in ref ? ref.current : null)\n      if (!container) return\n\n      // Initial check\n      const checkViewport = () => {\n        setIsStacked(window.innerWidth < 768)\n      }\n\n      checkViewport()\n\n      // Setup ResizeObserver to detect viewport changes\n      const observer = new ResizeObserver(() => {\n        checkViewport()\n      })\n\n      observer.observe(document.documentElement)\n\n      // Also listen to window resize as fallback\n      window.addEventListener('resize', checkViewport)\n\n      return () => {\n        observer.disconnect()\n        window.removeEventListener('resize', checkViewport)\n      }\n    }, [ref])\n\n    const contextValue = useMemo(\n      () => ({\n        spacing,\n        isStacked,\n        variant,\n        sidebarOpen,\n        toggleSidebar: () => setSidebarOpen((prev) => !prev),\n      }),\n      [spacing, isStacked, variant, sidebarOpen]\n    )\n\n    const spacingClass =\n      {\n        none: styles.spacingNone,\n        sm: styles.spacingSm,\n        md: styles.spacingMd,\n        lg: styles.spacingLg,\n      }[spacing] || styles.spacingMd\n\n    const variantClass = variant === 'compact' ? styles.compact : ''\n    const stackedClass = isStacked ? styles.stacked : ''\n\n    const panelRef = ref && 'current' in ref ? ref : containerRef\n\n    return (\n      <div\n        ref={panelRef}\n        className={`${styles.panel} ${spacingClass} ${variantClass} ${stackedClass} ${className || ''}`}\n        data-spacing={spacing}\n        data-variant={variant}\n        data-stacked={isStacked}\n        {...props}\n      >\n        <PanelContext.Provider value={contextValue}>{children}</PanelContext.Provider>\n      </div>\n    )\n  }\n)\n\nPanelRoot.displayName = 'Panel'\n\n/** Top bar of the panel, typically for a title and actions */\nconst PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>(\n  ({ sticky = true, className, ...props }, ref) => {\n    const stickyClass = sticky ? styles.sticky : ''\n\n    return (\n      <header ref={ref} className={`${styles.header} ${stickyClass} ${className || ''}`} {...props} />\n    )\n  }\n)\n\nPanelHeader.displayName = 'Panel.Header'\n\n/** Main scrollable body area of the panel */\nconst PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(\n  ({ className, ...props }, ref) => {\n    return <div ref={ref} role=\"main\" className={`${styles.content} ${className || ''}`} {...props} />\n  }\n)\n\nPanelContent.displayName = 'Panel.Content'\n\n/** Bottom bar of the panel, typically for controls or status */\nconst PanelFooter = React.forwardRef<HTMLElement, PanelFooterProps>(\n  ({ fixed = false, className, ...props }, ref) => {\n    const fixedClass = fixed ? styles.fixed : ''\n\n    return (\n      <footer ref={ref} className={`${styles.footer} ${fixedClass} ${className || ''}`} {...props} />\n    )\n  }\n)\n\nPanelFooter.displayName = 'Panel.Footer'\n\n/** Collapsible side panel that slides in from left or right */\nconst PanelSidebar = React.forwardRef<HTMLElement, PanelSidebarProps>(\n  ({ side = 'left', defaultOpen = true, width = '240px', collapsedWidth = '0', className, ...props }, ref) => {\n    const { sidebarOpen } = usePanelContext()\n    const isOpen = defaultOpen && sidebarOpen\n\n    const sidebarStyle: React.CSSProperties = {\n      width: isOpen ? width : collapsedWidth,\n      transition: 'width 0.2s ease',\n      overflow: 'hidden',\n      flexShrink: 0,\n      [side === 'right' ? 'marginLeft' : 'marginRight']: 'auto',\n    }\n\n    return (\n      <aside\n        ref={ref}\n        className={`${styles['sidebar']} ${className || ''}`}\n        data-open={isOpen}\n        data-side={side}\n        style={sidebarStyle}\n        {...props}\n      />\n    )\n  }\n)\n\nPanelSidebar.displayName = 'Panel.Sidebar'\n\n/** Button that shows/hides the Panel.Sidebar */\nconst PanelToggle = React.forwardRef<HTMLDivElement, PanelToggleProps>(\n  ({ children, ...props }, ref) => {\n    const { toggleSidebar } = usePanelContext()\n\n    const handleClick = () => {\n      toggleSidebar()\n    }\n\n    const clonedChild = React.cloneElement(children as React.ReactElement<any>, {\n      onClick: (e: React.MouseEvent) => {\n        handleClick()\n        ;(children as any).props?.onClick?.(e)\n      },\n    })\n\n    return (\n      <div ref={ref} className={styles['toggle']} {...props}>\n        {clonedChild}\n      </div>\n    )\n  }\n)\n\nPanelToggle.displayName = 'Panel.Toggle'\n\n/** Container that manages side-by-side resizable panel columns */\nconst PanelGroup = React.forwardRef<HTMLDivElement, PanelGroupProps>(\n  ({ direction = 'horizontal', className, children, ...props }, ref) => {\n    const containerRef = useRef<HTMLDivElement>(null)\n    const [sizes, setSizes] = useState<number[]>([])\n    const resizeIndexRef = useRef(0)\n\n    // Extract panel children (skip Resize handles)\n    const panelChildren = React.Children.toArray(children).filter(\n      (child) =>\n        React.isValidElement(child) &&\n        child.type !== PanelResize &&\n        (child.props as any).children !== undefined\n    )\n\n    const panelCount = panelChildren.length\n\n    useEffect(() => {\n      // Initialize sizes as equal percentages\n      if (panelCount > 0) {\n        setSizes(Array(panelCount).fill(100 / panelCount))\n      }\n    }, [panelCount])\n\n    const handleSetSize = useCallback(\n      (resizeIndex: number, delta: number) => {\n        setSizes((prev) => {\n          if (prev.length === 0) return prev\n          const newSizes = [...prev]\n          const containerSize =\n            direction === 'horizontal'\n              ? containerRef.current?.clientWidth || 1\n              : containerRef.current?.clientHeight || 1\n\n          const deltaPercent = (delta / containerSize) * 100\n          const minSize = 10\n\n          if (resizeIndex + 1 < newSizes.length) {\n            // For paired panels: maintain total, apply min/max constraints\n            const totalSize = newSizes[resizeIndex] + newSizes[resizeIndex + 1]\n            const maxSize = totalSize - minSize\n\n            let newSizeA = Math.max(minSize, Math.min(maxSize, newSizes[resizeIndex] + deltaPercent))\n            let newSizeB = totalSize - newSizeA\n\n            newSizes[resizeIndex] = newSizeA\n            newSizes[resizeIndex + 1] = Math.max(minSize, newSizeB)\n          } else {\n            // Single panel, just apply min constraint\n            newSizes[resizeIndex] = Math.max(minSize, newSizes[resizeIndex] + deltaPercent)\n          }\n\n          return newSizes\n        })\n      },\n      [direction]\n    )\n\n    const contextValue = useMemo(\n      () => ({\n        sizes,\n        setSize: handleSetSize,\n        direction,\n        containerRef: containerRef as React.RefObject<HTMLDivElement>,\n      }),\n      [sizes, direction, handleSetSize]\n    )\n\n    const groupRef = ref && 'current' in ref ? ref : containerRef\n\n    // Render children, injecting sizes into panels and tracking resize indices\n    let panelIndex = 0\n    let resizeIndex = 0\n    const renderedChildren = React.Children.map(children, (child) => {\n      if (!React.isValidElement(child)) return child\n\n      if (child.type === PanelResize) {\n        const currentResizeIndex = resizeIndex\n        resizeIndex++\n        return React.cloneElement(child as React.ReactElement<any>, {\n          'data-resize-index': currentResizeIndex,\n        })\n      }\n\n      if (child.type !== PanelResize && (child.props as any).children !== undefined) {\n        const currentPanelIndex = panelIndex\n        const size = sizes[currentPanelIndex] ?? 100 / panelCount\n        panelIndex++\n\n        const style: React.CSSProperties = {\n          ...((child.props as any).style || {}),\n          flex: `0 0 ${size}%`,\n          overflow: 'hidden',\n        }\n\n        return React.cloneElement(child as React.ReactElement<any>, {\n          style,\n        })\n      }\n\n      return child\n    })\n\n    return (\n      <div\n        ref={groupRef}\n        className={`${styles['group']} ${className || ''}`}\n        data-direction={direction}\n        {...props}\n      >\n        <PanelGroupContext.Provider value={contextValue}>{renderedChildren}</PanelGroupContext.Provider>\n      </div>\n    )\n  }\n)\n\nPanelGroup.displayName = 'Panel.Group'\n\n/** Drag handle between Panel.Group columns for resizing */\nconst PanelResize = React.forwardRef<HTMLDivElement, PanelResizeProps & { 'data-resize-index'?: number }>(\n  ({ className, 'data-resize-index': resizeIndexProp, ...props }, ref) => {\n    const { direction, setSize } = usePanelGroupContext()\n    const [isDragging, setIsDragging] = useState(false)\n    const startPosRef = useRef(0)\n    const resizeIndexRef = useRef(resizeIndexProp ?? 0)\n\n    // Update index if it changes\n    useEffect(() => {\n      resizeIndexRef.current = resizeIndexProp ?? 0\n    }, [resizeIndexProp])\n\n    const handleMouseDown = (e: React.MouseEvent) => {\n      e.preventDefault()\n      setIsDragging(true)\n      startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY\n\n      const handleMouseMove = (moveEvent: MouseEvent) => {\n        const currentPos = direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY\n        const delta = currentPos - startPosRef.current\n        setSize(resizeIndexRef.current, delta)\n        startPosRef.current = currentPos\n      }\n\n      const handleMouseUp = () => {\n        setIsDragging(false)\n        document.removeEventListener('mousemove', handleMouseMove)\n        document.removeEventListener('mouseup', handleMouseUp)\n      }\n\n      document.addEventListener('mousemove', handleMouseMove)\n      document.addEventListener('mouseup', handleMouseUp)\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={`${styles['resize']} ${className || ''}`}\n        data-resizing={isDragging}\n        data-direction={direction}\n        onMouseDown={handleMouseDown}\n        {...props}\n      />\n    )\n  }\n)\n\nPanelResize.displayName = 'Panel.Resize'\n\n// Helper function for internal use\nfunction usePanelContext() {\n  const context = React.useContext(PanelContext)\n  if (!context) {\n    throw new Error('usePanelContext must be used within a Panel component')\n  }\n  return context\n}\n\nfunction usePanelGroupContext() {\n  const context = React.useContext(PanelGroupContext)\n  if (!context) {\n    throw new Error('usePanelGroupContext must be used within a Panel.Group component')\n  }\n  return context\n}\n\nexport const Panel = Object.assign(PanelRoot, {\n  Header: PanelHeader,\n  Content: PanelContent,\n  Footer: PanelFooter,\n  Sidebar: PanelSidebar,\n  Toggle: PanelToggle,\n  Group: PanelGroup,\n  Resize: PanelResize,\n})\n\nexport {\n  PanelRoot,\n  PanelHeader,\n  PanelContent,\n  PanelFooter,\n  PanelSidebar,\n  PanelToggle,\n  PanelGroup,\n  PanelResize,\n  PanelContext,\n  PanelGroupContext,\n}\nexport type { PanelContextValue } from './panel.types'\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    display: flex;\n    flex-direction: row;\n    width: 100%;\n    height: 100%;\n    background: inherit;\n    min-width: 0;\n    min-height: 0;\n  }\n\n  .panel[data-stacked=\"true\"] {\n    flex-direction: column;\n  }\n\n  .header {\n    flex-shrink: 0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    flex: 1;\n    display: flex;\n    min-width: 0;\n    min-height: 0;\n    overflow: auto;\n  }\n\n  .footer {\n    flex-shrink: 0;\n    background: inherit;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    flex-shrink: 0;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--background-700);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--background-700);\n  }\n\n  /* Toggle */\n  .toggle {\n    display: flex;\n    align-items: center;\n  }\n\n  /* Group */\n  .group {\n    display: flex;\n    width: 100%;\n    height: 100%;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] {\n    flex-direction: column;\n  }\n\n  /* Resize handle */\n  .resize {\n    flex-shrink: 0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n    position: relative;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--background-700, #374151);\n    transform: translateX(-50%);\n    transition: width 0.15s ease;\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before {\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"]:hover::before {\n    width: auto;\n    height: 2px;\n  }\n\n  .resize[data-resizing=\"true\"]::before {\n    width: 2px;\n  }\n\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone {\n    gap: 0;\n  }\n\n  .spacingSm {\n    gap: var(--spacing-sm, 0.5rem);\n  }\n\n  .spacingMd {\n    gap: var(--spacing-md, 1rem);\n  }\n\n  .spacingLg {\n    gap: var(--spacing-lg, 1.5rem);\n  }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked {\n      flex-direction: column;\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly panel: string;\n  readonly header: string;\n  readonly sticky: string;\n  readonly content: string;\n  readonly footer: string;\n  readonly fixed: string;\n  readonly sidebar: string;\n  readonly toggle: string;\n  readonly group: string;\n  readonly resize: string;\n  readonly spacingNone: string;\n  readonly spacingSm: string;\n  readonly spacingMd: string;\n  readonly spacingLg: string;\n  readonly compact: string;\n  readonly stacked: string;\n};\n\nexport default styles;\n"
  },
  "popover": {
    "tsx": "\"use client\"\n\nimport React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useOverlayTrigger, useDialog, mergeProps } from \"react-aria\";\nimport { useOverlayTriggerState } from \"react-stately\";\nimport { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';\nimport { cn } from \"./utils\";\nimport { Frame } from \"../Frame\";\n\nconst ARROW_PATH = \"M 0 0 L 6 -12 L 12 0\";\nconst ARROW_WIDTH = 12;\nconst POPOVER_GAP = 8;\nconst ARROW_POSITIONING_SIZE = 6;\n\ntype PopoverPosition = \"top\" | \"right\" | \"bottom\" | \"left\";\n\nconst getFrameSide = (position: PopoverPosition): \"top\" | \"right\" | \"bottom\" | \"left\" => {\n  switch (position) {\n    case \"top\":\n      return \"bottom\";\n    case \"bottom\":\n      return \"top\";\n    case \"left\":\n      return \"right\";\n    case \"right\":\n      return \"left\";\n  }\n};\n\n/**\n * Maps placement to initial transform for directional entrance animation.\n * When animating in, the component slides from its placement direction toward the center.\n * For example, \"top\" placement slides up (-Y) and fades in.\n */\nconst getInitialTransform = (placement: string): string => {\n  switch (placement) {\n    case \"top\":\n      return \"translateY(3px) scale(0.95)\";\n    case \"bottom\":\n      return \"translateY(-3px) scale(0.95)\";\n    case \"left\":\n      return \"translateX(3px) scale(0.95)\";\n    case \"right\":\n      return \"translateX(-3px) scale(0.95)\";\n    default:\n      return \"scale(0.95)\";\n  }\n};\n\nexport interface PopoverProps {\n  children: React.ReactNode;\n  /** Content to display inside the popover panel */\n  content: React.ReactNode;\n  /** Preferred side of the trigger where the popover appears */\n  position?: PopoverPosition;\n  /** Additional CSS class for the trigger element */\n  className?: string;\n  /** Additional CSS class for the popover content panel */\n  contentClassName?: string;\n  /** Controlled open state */\n  isOpen?: boolean;\n  /** Called when the popover opens or closes */\n  onOpenChange?: (isOpen: boolean) => void;\n  /** Whether to render a directional arrow pointing at the trigger */\n  showArrow?: boolean;\n}\n\nconst Popover = React.forwardRef<HTMLDivElement, PopoverProps>(\n  ({ children, content, position = \"bottom\", className, contentClassName, isOpen: controlledIsOpen, onOpenChange, showArrow = false }, ref) => {\n    const triggerRef = React.useRef<HTMLDivElement>(null);\n    const popoverContentRef = React.useRef<HTMLDivElement>(null);\n    const [isAnimating, setIsAnimating] = React.useState(false);\n    const [isExiting, setIsExiting] = React.useState(false);\n\n    const state = useOverlayTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange,\n    });\n\n    const { triggerProps, overlayProps } = useOverlayTrigger({ type: \"dialog\" }, state, triggerRef);\n    const { dialogProps } = useDialog({}, popoverContentRef);\n\n    const placementMap: Record<PopoverPosition, \"top\" | \"bottom\" | \"left\" | \"right\"> = {\n      top: \"top\",\n      bottom: \"bottom\",\n      left: \"left\",\n      right: \"right\",\n    };\n\n    const { refs, floatingStyles, placement } = useFloating({\n      placement: placementMap[position],\n      whileElementsMounted: autoUpdate,\n      middleware: [\n        offset(POPOVER_GAP + ARROW_POSITIONING_SIZE),\n        flip(),\n        shift({ padding: 8 }),\n      ],\n    });\n\n    const isPositioned = floatingStyles.transform !== undefined;\n\n    // Trigger animation when popover is opened and positioned\n    React.useEffect(() => {\n      if (state.isOpen && isPositioned) {\n        setIsExiting(false);\n        setIsAnimating(true);\n      }\n    }, [state.isOpen, isPositioned]);\n\n    // Handle exit animation when closing\n    React.useEffect(() => {\n      if (!state.isOpen && isAnimating) {\n        // First, enable exit mode so element stays in DOM\n        setIsExiting(true);\n\n        requestAnimationFrame(() => setIsAnimating(false));\n        const timer = setTimeout(() => setIsExiting(false), 50)\n        return () => clearTimeout(timer);\n      }\n    }, [state.isOpen, isAnimating]);\n\n    React.useLayoutEffect(() => {\n      refs.setReference(triggerRef.current);\n    }, [refs]);\n\n    React.useEffect(() => {\n      if (!state.isOpen) return;\n      const handleClickOutside = (e: MouseEvent) => {\n        const target = e.target as Node;\n        if (\n          triggerRef.current &&\n          !triggerRef.current.contains(target) &&\n          popoverContentRef.current &&\n          !popoverContentRef.current.contains(target)\n        ) {\n          state.close();\n        }\n      };\n      document.addEventListener(\"click\", handleClickOutside);\n      return () => document.removeEventListener(\"click\", handleClickOutside);\n    }, [state.isOpen, state]);\n\n    React.useEffect(() => {\n      if (!state.isOpen) return;\n      const handleKeyDown = (event: KeyboardEvent) => {\n        if (event.key === \"Escape\") state.close();\n      };\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => document.removeEventListener(\"keydown\", handleKeyDown);\n    }, [state.isOpen, state]);\n\n    const mergedTriggerRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;\n        refs.setReference(el);\n        if (typeof ref === \"function\") ref(el);\n        else if (ref) ref.current = el;\n      },\n      [refs, ref]\n    );\n\n    const mergedContentRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        (popoverContentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;\n        refs.setFloating(el);\n      },\n      [refs]\n    );\n\n    // Convert React Aria's onPress to onClick for native HTML elements\n    const nativeProps = React.useMemo(() => {\n      const props: any = { ...triggerProps };\n      if (props.onPress && typeof props.onPress === 'function') {\n        const onPress = props.onPress;\n        props.onClick = (e: React.MouseEvent) => {\n          onPress({ target: e.currentTarget, type: 'press', pointerType: 'mouse', ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey });\n        };\n        delete props.onPress;\n      }\n      return props;\n    }, [triggerProps]);\n\n    const triggerElement = React.isValidElement(children)\n      ? React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement | HTMLDivElement> }>, {\n        ...nativeProps,\n        className: cn((children as React.ReactElement<{ className?: string }>).props.className, className),\n        ref: mergedTriggerRef,\n      })\n      : (\n        <span ref={mergedTriggerRef} {...nativeProps} className={cn(\"inline-block\", className)}>\n          {children}\n        </span>\n      );\n\n    return (\n      <>\n        {triggerElement}\n        {(state.isOpen || isExiting) &&\n          createPortal(\n            <div\n              ref={mergedContentRef}\n              style={{\n                ...floatingStyles,\n                pointerEvents: \"none\",\n                transition: 'none',\n                zIndex: 500,\n              }}\n            >\n              <div\n                style={{\n                  opacity: isAnimating ? 1 : 0,\n                  transform: isAnimating ? \"scale(1)\" : getInitialTransform(placement),\n                  transition: 'opacity 0.2s ease-out',\n                  pointerEvents: isAnimating ? 'auto' : 'none',\n                }}\n              >\n                <Frame\n                  {...mergeProps(overlayProps, dialogProps)}\n                  role=\"dialog\"\n                  side={showArrow ? getFrameSide(position) : position}\n                  shapeMode={showArrow ? \"extend\" : undefined}\n                  path={showArrow ? ARROW_PATH : undefined}\n                  pathWidth={showArrow ? ARROW_WIDTH : undefined}\n                  fill=\"var(--color-background-900)\"\n                  borderColor=\"var(--color-background-700)\"\n                  cornerRadius={8}\n                  padding=\"none\"\n                  className={cn(\"w-max pointer-events-auto text-foreground-50 text-sm shadow-lg\", contentClassName)}\n                  style={{\n                    minWidth: '200px',\n                    maxWidth: '400px',\n                    padding: '0.75rem',\n                  }}\n                >\n                  {content}\n                </Frame>\n              </div>\n            </div>,\n            document.body\n          )}\n      </>\n    );\n  }\n);\n\nPopover.displayName = \"Popover\";\n\nexport { Popover };\n",
    "css": "",
    "cssTypes": ""
  },
  "progress": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Progress.module.css\";\n\ntype ProgressVariant = \"default\" | \"success\" | \"warning\" | \"error\";\ntype ProgressSize = \"sm\" | \"md\" | \"lg\";\n\nexport interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Current progress value */\n  value?: number;\n  /** Maximum value that represents 100% */\n  max?: number;\n  /** Visual color variant indicating progress state */\n  variant?: ProgressVariant;\n  /** Size of the progress bar */\n  size?: ProgressSize;\n  /** Whether to show an infinite loading animation instead of a fixed value */\n  indeterminate?: boolean;\n  /** Accessible label describing what is progressing */\n  label?: string;\n  /** Whether to display the percentage value next to the label */\n  showValue?: boolean;\n  /** Whether to show a shimmer animation on the progress fill */\n  animated?: boolean;\n}\n\nconst sizeMap = {\n  sm: styles.sm,\n  md: styles.md,\n  lg: styles.lg,\n} as const;\n\nconst variantMap = {\n  default: styles.default,\n  success: styles.success,\n  warning: styles.warning,\n  error: styles.error,\n} as const;\n\nconst Progress = React.forwardRef<HTMLDivElement, ProgressProps>(\n  (\n    {\n      className,\n      value = 0,\n      max = 100,\n      variant = \"default\",\n      size = \"md\",\n      indeterminate = false,\n      label,\n      showValue = false,\n      animated = false,\n      ...props\n    },\n    ref\n  ) => {\n    const clampedValue = Math.min(Math.max(value, 0), max);\n    const percentage = (clampedValue / max) * 100;\n    const hasLabelContent = label || showValue;\n\n    return (\n      <div\n        className={cn(styles.wrapper, hasLabelContent && styles.hasLabel)}\n      >\n        {hasLabelContent && (\n          <div className={styles.labelRow}>\n            {label && (\n              <span className={styles.label}>\n                {label}\n              </span>\n            )}\n            {showValue && !indeterminate && (\n              <span className={styles.value}>{Math.round(percentage)}%</span>\n            )}\n          </div>\n        )}\n        <div\n          ref={ref}\n          role=\"progressbar\"\n          aria-valuenow={indeterminate ? undefined : clampedValue}\n          aria-valuemin={0}\n          aria-valuemax={max}\n          aria-label={label}\n          className={cn(styles.progress, sizeMap[size], className)}\n          data-variant={variant}\n          data-size={size}\n          data-indeterminate={indeterminate || undefined}\n          {...props}\n        >\n          <div\n            className={cn(\n              styles.fill,\n              variantMap[variant],\n              (animated || indeterminate) && styles.animated,\n              indeterminate && styles.indeterminate\n            )}\n            style={indeterminate ? undefined : { width: `${percentage}%` }}\n          />\n        </div>\n      </div>\n    );\n  }\n);\n\nProgress.displayName = \"Progress\";\n\nexport { Progress };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    --track-background: var(--background-700);\n    --fill-background: var(--accent-500);\n\n    position: relative;\n    width: 100%;\n    overflow: hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm {\n    height: 0.25rem;\n  }\n\n  .progress.md {\n    height: 0.5rem;\n  }\n\n  .progress.lg {\n    height: 0.75rem;\n  }\n\n  .fill {\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.default {\n    --fill-background: var(--accent-500);\n  }\n\n  .fill.success {\n    --fill-background: var(--success-500);\n  }\n\n  .fill.warning {\n    --fill-background: var(--warning-500);\n  }\n\n  .fill.error {\n    --fill-background: var(--danger-500);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    width: 100%;\n  }\n\n  .wrapper.hasLabel {\n    @apply space-y-1;\n  }\n\n  .labelRow {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% {\n      transform: translateX(-100%);\n    }\n    100% {\n      transform: translateX(400%);\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  progress: string;\n  sm: string;\n  md: string;\n  lg: string;\n  fill: string;\n  default: string;\n  success: string;\n  warning: string;\n  error: string;\n  animated: string;\n  indeterminate: string;\n  wrapper: string;\n  hasLabel: string;\n  labelRow: string;\n  label: string;\n  value: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "radio": {
    "tsx": "\"use client\";\n\nimport React, { useId, createContext, useContext } from \"react\";\nimport { useRadioGroupState } from \"react-stately\";\nimport {\n  useRadioGroup,\n  useRadio,\n  useFocusRing,\n  mergeProps,\n} from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Radio.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\n// Context for Radio.Group\ninterface RadioGroupContextType {\n  state?: ReturnType<typeof useRadioGroupState>;\n  disabled?: boolean;\n  size?: Size;\n}\n\nconst RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);\n\nconst useRadioGroupContext = () => {\n  const context = useContext(RadioGroupContext);\n  return context;\n};\n\n// Radio.Group Component\nexport interface RadioGroupProps {\n  /** Controlled selected radio value */\n  value?: string;\n  /** Initial selected value for uncontrolled usage */\n  defaultValue?: string;\n  /** Called when the selected value changes */\n  onValueChange?: (value: string) => void;\n  /** Whether all radios in the group are disabled */\n  disabled?: boolean;\n  /** Size of all radio buttons in the group */\n  size?: Size;\n  children: React.ReactNode;\n  /** Additional CSS class names */\n  className?: string;\n  /** Accessible label for the radio group */\n  label?: string;\n  /** Descriptive text shown below the group label */\n  description?: string;\n}\n\nconst RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(\n  ({\n    value: controlledValue,\n    defaultValue,\n    onValueChange,\n    disabled = false,\n    size = \"md\",\n    children,\n    className,\n    label,\n    description,\n  }, ref) => {\n    const state = useRadioGroupState({\n      value: controlledValue,\n      defaultValue,\n      onChange: onValueChange,\n      isDisabled: disabled,\n    });\n\n    useRadioGroup(\n      {\n        isDisabled: disabled,\n        label,\n        description,\n      },\n      state\n    );\n\n    return (\n      <RadioGroupContext.Provider\n        value={{ state, disabled, size }}\n      >\n        <div\n          ref={ref}\n          className={className}\n          role=\"group\"\n        >\n          {label && (\n            <label\n              className={cn(\n                styles[\"radio-label\"],\n                disabled && styles[\"radio-label-disabled\"]\n              )}\n            >\n              {label}\n            </label>\n          )}\n          {description && (\n            <p className=\"text-sm text-foreground-400\">\n              {description}\n            </p>\n          )}\n          <div className={styles[\"radio-group\"]}>\n            {children}\n          </div>\n        </div>\n      </RadioGroupContext.Provider>\n    );\n  }\n);\n\nRadioGroup.displayName = \"RadioGroup\";\n\n// Radio.Item Component\nexport interface RadioItemProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\"> {\n  /** Size of the radio button */\n  size?: Size;\n  /** Label text or element displayed next to the radio */\n  label?: React.ReactNode;\n  /** Secondary description shown below the label */\n  description?: React.ReactNode;\n  /** Helper text shown below the radio item */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Whether to apply error styling */\n  error?: boolean;\n  /** Value submitted when this radio is selected */\n  value: string;\n}\n\nconst RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(\n  ({\n    className,\n    size: sizeProp,\n    disabled: disabledProp = false,\n    error = false,\n    label,\n    description,\n    helperText,\n    helperTextError = false,\n    value,\n    id,\n    ...props\n  }, ref) => {\n    const radioGroupContext = useRadioGroupContext();\n    const generatedId = useId();\n    const radioId = id || `radio-${generatedId}`;\n\n    if (!radioGroupContext?.state) {\n      throw new Error(\"RadioItem must be used within a Radio.Group\");\n    }\n\n    const { state } = radioGroupContext;\n    const size = sizeProp || radioGroupContext?.size || \"md\";\n    const disabled = disabledProp ?? radioGroupContext?.disabled ?? false;\n    const isSelected = state.selectedValue === value;\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    // Extract aria-label from props if provided, fallback to label if it's a string\n    const ariaLabelFromProps = props[\"aria-label\"];\n    const ariaLabelValue =\n      ariaLabelFromProps ||\n      (typeof label === \"string\" ? label : undefined);\n\n    const { inputProps } = useRadio(\n      {\n        value,\n        isDisabled: disabled,\n        ...(ariaLabelValue && { \"aria-label\": ariaLabelValue }),\n      },\n      state,\n      inputRef\n    );\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    return (\n      <div className=\"w-full\">\n        <div\n          className={styles[\"radio-item\"]}\n          data-disabled={disabled || undefined}\n        >\n          <div className=\"relative\">\n            <div\n              className={cn(\n                styles.radio,\n                styles[size],\n                className\n              )}\n              data-checked={isSelected || undefined}\n              data-disabled={disabled || undefined}\n              data-error={error ? \"true\" : undefined}\n              data-focus-visible={isFocusVisible || undefined}\n              role=\"presentation\"\n            >\n              {isSelected && (\n                <div className={cn(styles[\"radio-dot\"], styles[size])} />\n              )}\n            </div>\n            <input\n              {...mergeProps(inputProps, focusProps)}\n              ref={ref || inputRef}\n              type=\"radio\"\n              id={radioId}\n              className={styles[\"radio-input\"]}\n              suppressHydrationWarning\n              {...props}\n            />\n          </div>\n          {(label || description) && (\n            <div className=\"flex flex-col gap-1\">\n              {label && (\n                <label\n                  htmlFor={radioId}\n                  className={cn(\n                    styles[\"radio-label\"],\n                    disabled && styles[\"radio-label-disabled\"]\n                  )}\n                  suppressHydrationWarning\n                >\n                  {label}\n                </label>\n              )}\n              {description && (\n                <p\n                  className={cn(\n                    styles[\"radio-description\"],\n                    error && styles[\"radio-description-error\"]\n                  )}\n                >\n                  {description}\n                </p>\n              )}\n            </div>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              \"text-xs mt-2 ml-8 transition-colors\",\n              helperTextError ? \"text-danger-600\" : \"text-foreground-400\"\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nRadioItem.displayName = \"RadioItem\";\n\n// Standalone Radio component for backward compatibility\nexport interface RadioProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\"> {\n  /** Size of the radio button */\n  size?: Size;\n  /** Label text or element displayed next to the radio */\n  label?: React.ReactNode;\n  /** Secondary description shown below the label */\n  description?: React.ReactNode;\n  /** Helper text shown below the radio item */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Whether to apply error styling */\n  error?: boolean;\n}\n\nconst RadioBase = React.forwardRef<HTMLInputElement, RadioProps>(\n  ({\n    className,\n    size = \"md\",\n    disabled = false,\n    error = false,\n    label,\n    description,\n    helperText,\n    helperTextError = false,\n    checked: checkedProp,\n    defaultChecked,\n    onChange,\n    id,\n    ...props\n  }, ref) => {\n    const [internalChecked, setInternalChecked] = React.useState(checkedProp ?? defaultChecked ?? false);\n    const generatedId = useId();\n\n    const isControlled = checkedProp !== undefined;\n    const checked = isControlled ? checkedProp : internalChecked;\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      if (!isControlled) {\n        setInternalChecked(e.target.checked);\n      }\n      onChange?.(e);\n    };\n\n    const radioId = id || `radio-${generatedId}`;\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    return (\n      <div className=\"w-full\">\n        <div\n          className={styles[\"radio-item\"]}\n          data-disabled={disabled || undefined}\n        >\n          <div className=\"relative\">\n            <div\n              className={cn(\n                styles.radio,\n                styles[size],\n                className\n              )}\n              data-checked={checked || undefined}\n              data-disabled={disabled || undefined}\n              data-error={error ? \"true\" : undefined}\n              data-focus-visible={isFocusVisible || undefined}\n              role=\"presentation\"\n            >\n              {checked && (\n                <div className={cn(styles[\"radio-dot\"], styles[size])} />\n              )}\n            </div>\n            <input\n              {...focusProps}\n              ref={inputRef}\n              type=\"radio\"\n              id={radioId}\n              checked={checked}\n              onChange={handleChange}\n              disabled={disabled ?? false}\n              className={styles[\"radio-input\"]}\n              aria-label={typeof label === \"string\" ? label : undefined}\n              suppressHydrationWarning\n              {...props}\n            />\n          </div>\n          {(label || description) && (\n            <div className=\"flex flex-col gap-1\">\n              {label && (\n                <label\n                  htmlFor={radioId}\n                  className={cn(\n                    styles[\"radio-label\"],\n                    disabled && styles[\"radio-label-disabled\"]\n                  )}\n                  suppressHydrationWarning\n                >\n                  {label}\n                </label>\n              )}\n              {description && (\n                <p\n                  className={cn(\n                    styles[\"radio-description\"],\n                    error && styles[\"radio-description-error\"]\n                  )}\n                >\n                  {description}\n                </p>\n              )}\n            </div>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              \"text-xs mt-2 ml-8 transition-colors\",\n              helperTextError ? \"text-danger-600\" : \"text-foreground-400\"\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nRadioBase.displayName = \"Radio\";\n\n// Compound component\nconst Radio = Object.assign(RadioBase, {\n  Group: RadioGroup,\n  Item: RadioItem,\n});\n\nexport { Radio };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n  }\n\n  .radio-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .radio-input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n\n  .radio {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n    --radio-dot-unchecked: transparent;\n    --radio-dot-checked: var(--accent-50);\n    --radio-hover-background: var(--accent-500);\n    --radio-hover-border: var(--background-500);\n    --radio-error-border: var(--danger-500);\n\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1.25rem;\n    height: 1.25rem;\n    cursor: pointer;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: 0.6;\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: rgb(59, 130, 246);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    font-weight: var(--font-weight-medium);\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground, var(--foreground-300));\n    font-size: inherit;\n    line-height: inherit;\n    cursor: pointer;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled, var(--foreground-400));\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper, var(--foreground-400));\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error, var(--danger-500));\n  }\n  /* Size variants */\n  .radio.sm {\n    width: 1rem;\n    height: 1rem;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    width: 1.25rem;\n    height: 1.25rem;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n\n  /* Variants */\n  .radio.primary[data-checked=\"true\"] {\n    --radio-background-checked: var(--accent-500);\n    --radio-border-checked: var(--accent-500);\n  }\n\n  .radio.secondary {\n    --radio-background-unchecked: var(--background-800);\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline {\n    --radio-background-unchecked: transparent;\n    --radio-border-unchecked: var(--background-700);\n  }\n\n  .radio.outline[data-checked=\"true\"] {\n    --radio-background-unchecked: color-mix(in srgb, var(--accent-500) 15%, transparent);\n    --radio-border-unchecked: var(--accent-500);\n    --radio-dot-unchecked: var(--accent-500);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  \"radio-group\": string;\n  \"radio-item\": string;\n  \"radio-input\": string;\n  radio: string;\n  \"radio-dot\": string;\n  sm: string;\n  md: string;\n  lg: string;\n  \"radio-label\": string;\n  \"radio-label-disabled\": string;\n  \"radio-description\": string;\n  \"radio-description-error\": string;\n};\n\nexport default styles;\n"
  },
  "scroll": {
    "tsx": "\"use client\";\n\nimport React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Scroll.module.css\";\n\nexport interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Content to render inside the scroll container */\n  children: React.ReactNode;\n  /** Maximum height before scrolling becomes active */\n  maxHeight?: string;\n  /** Maximum width before scrolling becomes active */\n  maxWidth?: string;\n  /** Scroll direction */\n  direction?: \"vertical\" | \"horizontal\";\n  /** Padding on the top and bottom of the scrollbar track in pixels */\n  paddingY?: string | number;\n  /** Whether to apply a fade mask at the top and bottom scroll edges */\n  fadeY?: boolean;\n  /** Pixels scrolled before the fade mask begins to appear */\n  fadeDistance?: number;\n  /** Percentage of container height used for the fade gradient */\n  fadeSize?: number;\n  /** Whether to render the custom scrollbar; when false, renders children without scroll */\n  enabled?: boolean;\n  /** Whether to hide the scrollbar when not actively scrolling */\n  hide?: boolean;\n}\n\nconst Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(\n  (\n    {\n      children,\n      className,\n      maxHeight = \"100%\",\n      maxWidth = \"100%\",\n      direction = \"vertical\",\n      paddingY = 4,\n      fadeY = false,\n      fadeDistance = 5,\n      fadeSize = 4,\n      enabled = true,\n      hide = true,\n      ...props\n    },\n    ref\n  ) => {\n    const containerRef = useRef<HTMLDivElement>(null);\n    const internalContentRef = useRef<HTMLDivElement>(null);\n    const contentRef = internalContentRef;\n    const thumbRef = useRef<HTMLDivElement>(null);\n    const childrenRef = useRef(children);\n    const mergedRef = useMergedRef(ref, containerRef);\n\n    const [needsScrollbar, setNeedsScrollbar] = useState(false);\n    const [isHoveredRight, setIsHoveredRight] = useState(false);\n    const [thumbSize, setThumbSize] = useState(0);\n    const [thumbPosition, setThumbPosition] = useState(0);\n    const [isDragging, setIsDragging] = useState(false);\n    const [dragStart, setDragStart] = useState({ origin: 0, scrollOrigin: 0 });\n    const [isScrolling, setIsScrolling] = useState(false);\n    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);\n\n    const updateScrollbar = useCallback(() => {\n      if (!containerRef.current || !contentRef.current) return;\n\n      const container = containerRef.current;\n      const content = contentRef.current;\n      const paddingYValue = paddingY ? (typeof paddingY === 'number' ? paddingY : parseInt(paddingY)) : 0;\n\n      if (direction === \"horizontal\") {\n        const containerWidth = container.clientWidth;\n        const contentWidth = content.scrollWidth || containerWidth;\n        const scrollLeft = content.scrollLeft;\n\n        const needs = contentWidth > containerWidth;\n        setNeedsScrollbar(needs);\n\n        const scrollRatio = containerWidth / Math.max(1, contentWidth);\n        const newThumbWidth = Math.max(20, Math.min(containerWidth, containerWidth * scrollRatio));\n        const scrollProgress = needs ? scrollLeft / (contentWidth - containerWidth) : 0;\n        const maxThumbLeft = containerWidth - newThumbWidth;\n        const newThumbLeft = scrollProgress * maxThumbLeft;\n\n        setThumbSize(newThumbWidth);\n        setThumbPosition(newThumbLeft);\n      } else {\n        const containerHeight = container.clientHeight;\n        const contentHeight = content.scrollHeight || containerHeight;\n        const scrollTop = content.scrollTop;\n        const trackHeight = containerHeight - (paddingYValue * 2);\n\n        const needs = contentHeight > containerHeight;\n        setNeedsScrollbar(needs);\n\n        const scrollRatio = trackHeight / Math.max(1, contentHeight);\n        const newThumbHeight = Math.max(20, Math.min(trackHeight, trackHeight * scrollRatio));\n        const scrollProgress = needs ? scrollTop / (contentHeight - containerHeight) : 0;\n        const maxThumbTop = trackHeight - newThumbHeight;\n        const newThumbTop = scrollProgress * maxThumbTop;\n\n        setThumbSize(newThumbHeight);\n        setThumbPosition(newThumbTop);\n\n        if (fadeY && needs) {\n          const maxScroll = contentHeight - containerHeight;\n          const topP = Math.min(1, Math.max(0, scrollTop / fadeDistance));\n          const botP = Math.min(1, Math.max(0, (maxScroll - scrollTop) / fadeDistance));\n          const gradient = `linear-gradient(to bottom, transparent 0%, black ${topP * fadeSize}%, black ${100 - botP * fadeSize}%, transparent 100%)`;\n          content.style.maskImage = gradient;\n          content.style.webkitMaskImage = gradient;\n        } else {\n          content.style.maskImage = \"\";\n          content.style.webkitMaskImage = \"\";\n        }\n      }\n    }, [contentRef, direction, paddingY, fadeY, fadeDistance, fadeSize]);\n\n    const handleScroll = useCallback(() => {\n      updateScrollbar();\n      setIsScrolling(true);\n      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);\n      scrollTimeoutRef.current = setTimeout(() => {\n        setIsScrolling(false);\n      }, 1500);\n    }, [updateScrollbar]);\n\n    const handleContainerMouseMove = useCallback(\n      (e: React.MouseEvent<HTMLDivElement>) => {\n        if (!containerRef.current) return;\n\n        const rect = containerRef.current.getBoundingClientRect();\n        let newIsHovered = false;\n\n        if (direction === \"horizontal\") {\n          const mouseY = e.clientY - rect.top;\n          const hoverZone = 20;\n          newIsHovered = mouseY > rect.height - hoverZone;\n        } else {\n          const mouseX = e.clientX - rect.left;\n          const hoverZone = 20;\n          newIsHovered = mouseX > rect.width - hoverZone;\n        }\n\n        if (newIsHovered !== isHoveredRight) {\n          setIsHoveredRight(newIsHovered);\n        }\n      },\n      [isHoveredRight, direction]\n    );\n\n    const handleContainerMouseLeave = useCallback(() => {\n      setIsHoveredRight(false);\n    }, []);\n\n    const handleMouseDown = useCallback(\n      (e: React.MouseEvent) => {\n        if (!contentRef.current) return;\n        e.preventDefault();\n        setIsDragging(true);\n        if (direction === \"horizontal\") {\n          setDragStart({\n            origin: e.clientX,\n            scrollOrigin: contentRef.current.scrollLeft,\n          });\n        } else {\n          setDragStart({\n            origin: e.clientY,\n            scrollOrigin: contentRef.current.scrollTop,\n          });\n        }\n      },\n      [contentRef, direction]\n    );\n\n    const handleMouseMove = useCallback(\n      (e: MouseEvent) => {\n        if (!isDragging || !contentRef.current || !containerRef.current) return;\n\n        const container = containerRef.current;\n        const content = contentRef.current;\n\n        if (direction === \"horizontal\") {\n          const deltaX = e.clientX - dragStart.origin;\n          const containerWidth = container.clientWidth;\n          const contentWidth = content.scrollWidth;\n          const maxScroll = contentWidth - containerWidth;\n          const scrollRatio = maxScroll / (containerWidth - thumbSize);\n          const newScrollLeft = Math.max(\n            0,\n            Math.min(\n              maxScroll,\n              dragStart.scrollOrigin + deltaX * scrollRatio\n            )\n          );\n\n          content.scrollLeft = newScrollLeft;\n        } else {\n          const deltaY = e.clientY - dragStart.origin;\n          const containerHeight = container.clientHeight;\n          const contentHeight = content.scrollHeight;\n          const maxScroll = contentHeight - containerHeight;\n          const scrollRatio = maxScroll / (containerHeight - thumbSize);\n          const newScrollTop = Math.max(\n            0,\n            Math.min(\n              maxScroll,\n              dragStart.scrollOrigin + deltaY * scrollRatio\n            )\n          );\n\n          content.scrollTop = newScrollTop;\n        }\n      },\n      [isDragging, dragStart, thumbSize, contentRef, direction]\n    );\n\n    const handleMouseUp = useCallback(() => {\n      setIsDragging(false);\n    }, []);\n\n    const handleTrackClick = useCallback(\n      (e: React.MouseEvent) => {\n        if (\n          !containerRef.current ||\n          !contentRef.current ||\n          !thumbRef.current\n        )\n          return;\n\n        const container = containerRef.current;\n        const content = contentRef.current;\n        const rect = container.getBoundingClientRect();\n        const thumbRect = thumbRef.current.getBoundingClientRect();\n        const paddingYValue = paddingY ? (typeof paddingY === 'number' ? paddingY : parseInt(paddingY)) : 0;\n\n        if (direction === \"horizontal\") {\n          const clickX = e.clientX - rect.left;\n          const relativeThumbLeft = thumbRect.left - rect.left;\n          const relativeThumbRight = thumbRect.right - rect.left;\n\n          if (clickX >= relativeThumbLeft && clickX <= relativeThumbRight)\n            return;\n\n          const containerWidth = container.clientWidth;\n          const contentWidth = content.scrollWidth;\n          const maxScroll = contentWidth - containerWidth;\n\n          const newThumbWidth = Math.max(\n            20,\n            containerWidth * (containerWidth / contentWidth)\n          );\n          const targetThumbCenter = clickX;\n          const targetThumbLeft = targetThumbCenter - newThumbWidth / 2;\n          const maxThumbLeft = containerWidth - newThumbWidth;\n          const clampedThumbLeft = Math.max(\n            0,\n            Math.min(maxThumbLeft, targetThumbLeft)\n          );\n\n          const scrollProgress = clampedThumbLeft / maxThumbLeft;\n          const targetScrollLeft = scrollProgress * maxScroll;\n\n          content.scrollLeft = Math.max(\n            0,\n            Math.min(maxScroll, targetScrollLeft)\n          );\n\n          setIsDragging(true);\n          setDragStart({\n            origin: e.clientX,\n            scrollOrigin: content.scrollLeft,\n          });\n        } else {\n          const clickY = e.clientY - rect.top - paddingYValue;\n          const relativeThumbTop = thumbRect.top - rect.top - paddingYValue;\n          const relativeThumbBottom = thumbRect.bottom - rect.top - paddingYValue;\n\n          if (clickY >= relativeThumbTop && clickY <= relativeThumbBottom)\n            return;\n\n          const containerHeight = container.clientHeight;\n          const contentHeight = content.scrollHeight;\n          const maxScroll = contentHeight - containerHeight;\n          const trackHeight = containerHeight - (paddingYValue * 2);\n\n          const newThumbHeight = Math.max(\n            20,\n            trackHeight * (trackHeight / contentHeight)\n          );\n          const targetThumbCenter = clickY;\n          const targetThumbTop = targetThumbCenter - newThumbHeight / 2;\n          const maxThumbTop = trackHeight - newThumbHeight;\n          const clampedThumbTop = Math.max(\n            0,\n            Math.min(maxThumbTop, targetThumbTop)\n          );\n\n          const scrollProgress = clampedThumbTop / maxThumbTop;\n          const targetScrollTop = scrollProgress * maxScroll;\n\n          content.scrollTop = Math.max(\n            0,\n            Math.min(maxScroll, targetScrollTop)\n          );\n\n          setIsDragging(true);\n          setDragStart({\n            origin: e.clientY,\n            scrollOrigin: content.scrollTop,\n          });\n        }\n      },\n      [contentRef, direction, paddingY]\n    );\n\n    const handleWheel = useCallback(\n      (e: React.WheelEvent) => {\n        if (!contentRef.current) return;\n        if (direction !== \"horizontal\") return;\n\n        e.preventDefault();\n        const scrollAmount = e.deltaY || e.deltaX;\n        const content = contentRef.current;\n        const containerWidth = content.clientWidth;\n        const contentWidth = content.scrollWidth;\n        const maxScroll = contentWidth - containerWidth;\n\n        const newScrollLeft = Math.max(\n          0,\n          Math.min(maxScroll, content.scrollLeft + scrollAmount)\n        );\n        content.scrollLeft = newScrollLeft;\n      },\n      [contentRef, direction]\n    );\n\n    useLayoutEffect(() => {\n      updateScrollbar();\n\n      const resizeObserver = new ResizeObserver(() => {\n        requestAnimationFrame(updateScrollbar);\n      });\n\n      const mutationObserver = new MutationObserver(() => {\n        requestAnimationFrame(updateScrollbar);\n      });\n\n      if (containerRef.current) {\n        resizeObserver.observe(containerRef.current);\n      }\n\n      if (contentRef.current) {\n        resizeObserver.observe(contentRef.current);\n        mutationObserver.observe(contentRef.current, {\n          childList: true,\n          subtree: true,\n        });\n      }\n\n      return () => {\n        resizeObserver.disconnect();\n        mutationObserver.disconnect();\n      };\n    }, [updateScrollbar, contentRef, enabled]);\n\n    useEffect(() => {\n      if (childrenRef.current !== children) {\n        childrenRef.current = children;\n        const timeoutId = setTimeout(() => {\n          updateScrollbar();\n        }, 0);\n        return () => clearTimeout(timeoutId);\n      }\n    }, [children, updateScrollbar]);\n\n    useEffect(() => {\n      if (isDragging) {\n        document.addEventListener(\"mousemove\", handleMouseMove);\n        document.addEventListener(\"mouseup\", handleMouseUp);\n        document.body.style.userSelect = \"none\";\n        return () => {\n          document.removeEventListener(\"mousemove\", handleMouseMove);\n          document.removeEventListener(\"mouseup\", handleMouseUp);\n          document.body.style.userSelect = \"\";\n        };\n      }\n    }, [isDragging, handleMouseMove, handleMouseUp]);\n\n    useEffect(() => {\n      return () => {\n        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);\n      };\n    }, []);\n\n    // When disabled, just render children without scroll functionality\n    if (!enabled) {\n      const { style: propsStyle, ...restProps } = props;\n      return (\n        <div\n          ref={ref}\n          className={cn(styles.root, className)}\n          style={{\n            ...(direction === \"horizontal\"\n              ? { width: \"100%\", maxWidth }\n              : { height: \"100%\", maxHeight }),\n            ...propsStyle,\n          }}\n          {...restProps}\n        >\n          {children}\n        </div>\n      );\n    }\n\n    const showOpacity = !hide ? 1 : (needsScrollbar && (isHoveredRight || isDragging || isScrolling) ? 1 : 0);\n\n    if (direction === \"horizontal\") {\n      const { style: propsStyle, ...restProps } = props;\n      return (\n        <div\n          ref={mergedRef}\n          className={cn(styles.root, styles.horizontal, className)}\n          style={{\n            width: \"100%\",\n            maxWidth,\n            ...propsStyle,\n          }}\n          onMouseMove={handleContainerMouseMove}\n          onMouseLeave={handleContainerMouseLeave}\n          data-dragging={isDragging ? \"true\" : \"false\"}\n          {...restProps}\n        >\n          <div\n            ref={contentRef}\n            className={styles.content}\n            onScroll={handleScroll}\n            onWheel={handleWheel}\n            style={{ maxWidth: \"inherit\" }}\n          >\n            {children}\n          </div>\n\n          <div\n            className={styles.track}\n            data-hide={hide ? \"true\" : \"false\"}\n            style={{\n              opacity: showOpacity,\n              pointerEvents: needsScrollbar ? \"auto\" : \"none\",\n            }}\n            onMouseDown={handleTrackClick}\n          >\n            {(needsScrollbar || !hide) && (\n              <div\n                ref={thumbRef}\n                className={styles.thumb}\n                style={{\n                  width: `${thumbSize}px`,\n                  left: `${thumbPosition}px`,\n                }}\n                onMouseDown={handleMouseDown}\n              />\n            )}\n          </div>\n        </div>\n      );\n    }\n\n    const { style: propsStyle, ...restProps } = props;\n    const paddingYValue = paddingY ? (typeof paddingY === 'number' ? `${paddingY}px` : paddingY) : undefined;\n    return (\n      <div\n        ref={mergedRef}\n        className={cn(styles.root, styles.vertical, className)}\n        style={{\n          height: \"100%\",\n          maxHeight,\n          ...(paddingYValue ? { \"--scroll-padding-y\": paddingYValue } : {}),\n          ...propsStyle,\n        } as React.CSSProperties}\n        onMouseMove={handleContainerMouseMove}\n        onMouseLeave={handleContainerMouseLeave}\n        data-dragging={isDragging ? \"true\" : \"false\"}\n        {...restProps}\n      >\n        <div\n          ref={contentRef}\n          className={styles.content}\n          onScroll={handleScroll}\n          style={{ maxHeight: \"inherit\" }}\n        >\n          {children}\n        </div>\n\n        <div\n          className={styles.track}\n          data-hide={hide ? \"true\" : \"false\"}\n          style={{\n            opacity: showOpacity,\n            pointerEvents: needsScrollbar ? \"auto\" : \"none\",\n          }}\n          onMouseDown={handleTrackClick}\n        >\n          {(needsScrollbar || !hide) && (\n            <div\n              ref={thumbRef}\n              className={styles.thumb}\n              style={{\n                height: `${thumbSize}px`,\n                top: `${thumbPosition}px`,\n              }}\n              onMouseDown={handleMouseDown}\n            />\n          )}\n        </div>\n      </div>\n    );\n  }\n);\n\nScroll.displayName = \"Scroll\";\n\nfunction useMergedRef<T>(\n  ...refs: (React.Ref<T> | undefined)[]\n): React.RefCallback<T> {\n  return (value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\")\n        (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nexport { Scroll };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    position: relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n    min-height: 0;\n  }\n\n  .horizontal {\n    --scrollbar-height: 12px;\n  }\n\n  .content {\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding-right: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 16px;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal .content::-webkit-scrollbar {\n    display: none;\n  }\n\n  .track {\n    position: absolute;\n    z-index: 10;\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    background-color: transparent;\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: transparent;\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs) * 0.80);\n    background-color: var(--background-700);\n    transition-property: background-color, width, height;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover {\n    background-color: var(--background-600);\n  }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--background-500);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: 150ms;\n  }\n\n  .vertical .thumb:hover {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .vertical[data-dragging=\"true\"] .thumb {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: 150ms;\n  }\n\n  .horizontal .thumb:hover {\n    height: 8px;\n    margin-top: 4px;\n  }\n\n  .horizontal[data-dragging=\"true\"] .thumb {\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
    "cssTypes": "export const root: string;\nexport const vertical: string;\nexport const horizontal: string;\nexport const content: string;\nexport const track: string;\nexport const thumb: string;\n"
  },
  "select": {
    "tsx": "import * as React from \"react\"\nimport { useButton, useFocusRing, useHover, mergeProps, type Key } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport styles from \"./Select.module.css\"\nimport { useListNavigation, useMergedRef, type ItemData } from \"./Select.shared\"\nimport { useFilter } from \"../../hooks/useFilter\"\n\nexport type SelectItemData = ItemData\n\nexport type SelectTriggerMode = \"click\" | \"hover\"\nexport type SelectMode = \"single\" | \"multiple\"\n\nexport interface SelectContextValue {\n  isOpen: boolean\n  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>\n  mode: SelectMode\n  selectedKey: Key | null\n  selectedKeys?: Set<Key>\n  selectedTextValue: string\n  onSelect: (key: Key) => void\n  onToggle?: (key: Key) => void\n  triggerRef: React.MutableRefObject<HTMLElement | null>\n  wrapperRef: React.MutableRefObject<HTMLElement | null>\n  triggerProps: any\n  isFocusVisible: boolean\n  isPressed: boolean\n  isHovered: boolean\n  isDisabled: boolean\n  items: SelectItemData[]\n  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void\n  unregisterItem: (key: Key) => void\n  searchValue: string\n  setSearchValue: React.Dispatch<React.SetStateAction<string>>\n  filteredItems: SelectItemData[]\n  visibleKeys: Set<Key>\n  focusedKey: Key | null\n  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>\n  navigateToNextItem: () => void\n  navigateToPrevItem: () => void\n  selectFocusedItem: () => void\n  isFocusedItemSubmenu: () => boolean\n  maxItems: number\n  triggerMode: SelectTriggerMode\n  handleHoverIntent: (isHovering: boolean) => void\n  mouseMoveDetectedRef: React.MutableRefObject<boolean>\n  filter?: (item: any) => boolean\n}\n\nconst SelectContext = React.createContext<SelectContextValue | null>(null)\n\nexport function useSelectContext() {\n  const context = React.useContext(SelectContext)\n  if (!context) {\n    throw new Error(\"Select component must be used within Select root\")\n  }\n  return context\n}\n\nexport interface SelectProps<T = any> extends React.PropsWithChildren {\n  /** Selection mode: \"single\" for one item, \"multiple\" for multi-item selection */\n  mode?: SelectMode\n  /** External items array — used when items are provided as data rather than JSX */\n  items?: Array<T>\n  /** Controlled selected key for single-select mode */\n  selectedKey?: Key | null\n  /** Default selected key for uncontrolled single-select */\n  defaultSelectedKey?: Key | null\n  /** Controlled selected keys for multi-select mode */\n  selectedKeys?: Key[]\n  /** Default selected keys for uncontrolled multi-select */\n  defaultSelectedKeys?: Key[]\n  /** Default display text shown in the trigger when nothing is selected */\n  defaultValue?: string | null\n  /** Called when selection changes; receives a single key (single) or key array (multiple) */\n  onSelectionChange?: (value: any) => void\n  /** Disables the entire select and prevents interaction */\n  isDisabled?: boolean\n  /** Focuses the trigger automatically on mount */\n  autoFocus?: boolean\n  /** Maximum number of items visible before the dropdown scrolls */\n  maxItems?: number\n  /** Additional CSS class for the root wrapper */\n  className?: string\n  /** How the dropdown opens: \"click\" (default) or \"hover\" */\n  trigger?: SelectTriggerMode\n  /** Custom filter predicate applied to the items array */\n  filter?: (item: T) => boolean\n}\n\nconst Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(\n  (\n    {\n      mode = \"single\",\n      items: propItems = [],\n      selectedKey: controlledSelectedKey,\n      defaultSelectedKey,\n      selectedKeys: controlledSelectedKeys,\n      defaultSelectedKeys = [],\n      defaultValue,\n      onSelectionChange,\n      isDisabled = false,\n      autoFocus = false,\n      maxItems = 6,\n      children,\n      className,\n      trigger: triggerMode = \"click\",\n      filter,\n    },\n    ref\n  ) => {\n    const triggerRef = React.useRef<HTMLElement>(null)\n    const wrapperRef = React.useRef<HTMLElement>(null)\n    const mouseMoveDetectedRef = React.useRef(true)\n    const itemExtrasRef = React.useRef<Map<Key, { onSelect?: () => void; isSubmenuTrigger?: boolean }>>(new Map())\n    const [isOpen, setIsOpen] = React.useState(false)\n    const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)\n\n    const handleHoverIntent = React.useCallback((isHovering: boolean) => {\n      if (triggerMode !== \"hover\" || isDisabled) return\n      if (hoverTimeoutRef.current) {\n        clearTimeout(hoverTimeoutRef.current)\n        hoverTimeoutRef.current = null\n      }\n\n      if (isHovering) {\n        setIsOpen(true)\n      } else {\n        hoverTimeoutRef.current = setTimeout(() => {\n          setIsOpen(false)\n        }, 100)\n      }\n    }, [triggerMode, isDisabled])\n\n    React.useEffect(() => {\n      return () => {\n        if (hoverTimeoutRef.current) {\n          clearTimeout(hoverTimeoutRef.current)\n        }\n      }\n    }, [])\n\n    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState<Key | null>(\n      defaultSelectedKey ?? null\n    )\n    const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(\n      new Set(defaultSelectedKeys)\n    )\n    const [selectedTextValue, setSelectedTextValue] = React.useState(defaultValue ?? \"\")\n    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey\n    const selectedKeys = controlledSelectedKeys !== undefined ? new Set(controlledSelectedKeys) : uncontrolledSelectedKeys\n\n    const filteredPropItems = useFilter(propItems, filter)\n\n    const nav = useListNavigation({\n      isOpen,\n      externalItems: filteredPropItems.length > 0 ? filteredPropItems : undefined,\n    })\n\n    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {\n      nav.registerItem(key, textValue, isDisabled)\n      itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })\n    }, [nav.registerItem])\n\n    const unregisterItem = React.useCallback((key: Key) => {\n      nav.unregisterItem(key)\n      itemExtrasRef.current.delete(key)\n    }, [nav.unregisterItem])\n\n    const isFocusedItemSubmenu = React.useCallback(() => {\n      if (nav.focusedKey === null) return false\n      return itemExtrasRef.current.get(nav.focusedKey)?.isSubmenuTrigger ?? false\n    }, [nav.focusedKey])\n\n    const onSelect = React.useCallback((key: Key) => {\n      const item = nav.items.find(i => i.key === key)\n      if (item) {\n        setSelectedTextValue(item.textValue)\n      }\n      if (controlledSelectedKey === undefined) {\n        setUncontrolledSelectedKey(key)\n      }\n      onSelectionChange?.(key)\n      setIsOpen(false)\n      nav.setSearchValue(\"\")\n    }, [controlledSelectedKey, onSelectionChange, nav.items])\n\n    const onToggle = React.useCallback((key: Key) => {\n      const newKeys = new Set(selectedKeys)\n      if (newKeys.has(key)) {\n        newKeys.delete(key)\n      } else {\n        newKeys.add(key)\n      }\n      if (controlledSelectedKeys === undefined) {\n        setUncontrolledSelectedKeys(newKeys)\n      }\n      onSelectionChange?.(Array.from(newKeys))\n    }, [selectedKeys, controlledSelectedKeys, onSelectionChange])\n\n    const selectFocusedItem = React.useCallback(() => {\n      if (nav.focusedKey !== null) {\n        const item = nav.enabledFilteredItems.find(item => item.key === nav.focusedKey)\n        if (item && !item.isDisabled) {\n          const extras = itemExtrasRef.current.get(nav.focusedKey)\n          if (extras?.onSelect) {\n            extras.onSelect()\n          } else if (mode === \"multiple\") {\n            onToggle(nav.focusedKey)\n          } else {\n            onSelect(nav.focusedKey)\n          }\n        }\n      }\n    }, [nav.focusedKey, nav.enabledFilteredItems, onSelect, onToggle, mode])\n\n    React.useEffect(() => {\n      if (isOpen) {\n        // Only initialize focusedKey if it's not already valid\n        if (nav.focusedKey !== null && nav.visibleKeys.has(nav.focusedKey)) {\n          const item = nav.filteredItems.find(item => item.key === nav.focusedKey)\n          if (item && !item.isDisabled) {\n            return  // Keep current keyboard focus, don't reset it\n          }\n        }\n\n        const focusKey = mode === \"multiple\" && selectedKeys.size > 0\n          ? Array.from(selectedKeys)[0]\n          : selectedKey\n\n        if (focusKey !== null && nav.visibleKeys.has(focusKey)) {\n          const item = nav.filteredItems.find(item => item.key === focusKey)\n          if (item && !item.isDisabled) {\n            nav.setFocusedKey(focusKey)\n            return\n          }\n        }\n        if (nav.enabledFilteredItems.length > 0) {\n          nav.setFocusedKey(nav.enabledFilteredItems[0].key)\n        } else {\n          nav.setFocusedKey(null)\n        }\n      }\n    }, [isOpen, selectedKey, selectedKeys, nav.visibleKeys, nav.enabledFilteredItems, nav.filteredItems, mode, nav.focusedKey])\n\n    const { buttonProps, isPressed } = useButton({\n      isDisabled,\n      onPress: () => !isDisabled && setIsOpen(prev => !prev),\n    }, triggerRef)\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered } = useHover({ isDisabled })\n\n    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {\n      'aria-haspopup': 'listbox' as const,\n      'aria-expanded': isOpen,\n    })\n\n    React.useEffect(() => {\n      if (autoFocus && triggerRef.current) {\n        triggerRef.current.focus({ preventScroll: true })\n      }\n    }, [autoFocus])\n\n    React.useEffect(() => {\n      if (mode === \"single\") {\n        if (selectedKey === null) {\n          setSelectedTextValue(\"\")\n        } else {\n          const selectedItem = nav.items.find(item => item.key === selectedKey)\n          if (selectedItem) {\n            setSelectedTextValue(selectedItem.textValue)\n          } else if (defaultValue !== undefined && defaultValue !== null) {\n            setSelectedTextValue(defaultValue)\n          }\n        }\n      }\n    }, [selectedKey, nav.items, mode, defaultValue])\n\n    const rootRef = useMergedRef<HTMLDivElement>(wrapperRef, ref)\n\n    const childrenArray = React.Children.toArray(children)\n    const trigger = childrenArray.find(child => React.isValidElement(child) && (child.type as any)?.displayName === 'SelectTrigger')\n    const contentItems = childrenArray.filter(child => React.isValidElement(child) && ((child.type as any)?.displayName === 'SelectContent' || (child.type as any)?.displayName === 'SearchableContent'))\n    const otherContent = childrenArray.filter(child => !React.isValidElement(child) || ((child.type as any)?.displayName !== 'SelectTrigger' && (child.type as any)?.displayName !== 'SelectContent' && (child.type as any)?.displayName !== 'SearchableContent'))\n\n    return (\n      <SelectContext.Provider\n        value={{\n          isOpen,\n          setIsOpen,\n          mode,\n          selectedKey,\n          selectedKeys: mode === \"multiple\" ? selectedKeys : undefined,\n          selectedTextValue,\n          onSelect,\n          onToggle: mode === \"multiple\" ? onToggle : undefined,\n          triggerRef,\n          wrapperRef,\n          triggerProps,\n          isFocusVisible,\n          isPressed,\n          isHovered,\n          isDisabled,\n          items: nav.items,\n          registerItem,\n          unregisterItem,\n          searchValue: nav.searchValue,\n          setSearchValue: nav.setSearchValue,\n          filteredItems: nav.filteredItems,\n          visibleKeys: nav.visibleKeys,\n          focusedKey: nav.focusedKey,\n          setFocusedKey: nav.setFocusedKey,\n          navigateToNextItem: nav.navigateToNextItem,\n          navigateToPrevItem: nav.navigateToPrevItem,\n          selectFocusedItem,\n          isFocusedItemSubmenu,\n          maxItems,\n          triggerMode,\n          handleHoverIntent,\n          mouseMoveDetectedRef,\n          filter,\n        }}\n      >\n        <div ref={rootRef} className={cn('select', styles.select, className)} data-mode={mode}>\n          {otherContent}\n          {trigger}\n          {contentItems}\n        </div>\n      </SelectContext.Provider>\n    )\n  }\n)\nSelect.displayName = \"Select\"\n\nexport { Select, SelectContext }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    padding: 0;\n    gap: 0;\n    font-size: var(--text-sm);\n    background-color: color-mix(in srgb, var(--background-800) 50%, transparent);\n    color: var(--foreground-300);\n    border: var(--border-width-base) solid var(--background-700);\n    border-radius: var(--radius);\n    user-select: none;\n    cursor: pointer;\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: color-mix(in srgb, var(--background-600) 50%, transparent);\n    }\n\n    &[aria-expanded=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .trigger {\n    display: flex;\n    align-items: stretch;\n    background: transparent;\n    border: none;\n    cursor: pointer;\n    user-select: none;\n    flex: 1;\n    gap: 0;\n    height: 100%;\n    min-width: 0;\n    padding: var(--padding) calc(var(--padding) * 1.50);\n\n    @media (hover: hover) {\n      &:not(:disabled):hover .icon-section {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n\n      &:not(:disabled):hover .value-section:not(:empty) {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 1px var(--ring-color);\n      outline-offset: 2px;\n    }\n\n    :global(.group) &:focus-visible {\n      outline: none;\n    }\n  }\n\n  button.trigger {\n    padding: 0;\n  }\n\n  .value-section {\n    display: flex;\n    align-items: center;\n    flex: 1;\n    min-width: 0;\n    padding: var(--padding) calc(var(--padding) * 1.50);\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n    gap: 0.5rem;\n\n    &:only-child {\n      border-radius: var(--inner-radius);\n      justify-content: center;\n    }\n\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    padding: var(--padding) calc(var(--padding) * 1.50);\n    border-radius: 0 var(--inner-radius) var(--inner-radius) 0;\n  }\n\n  .icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 0.7rem;\n    height: 0.7rem;\n    opacity: 0.7;\n  }\n\n  .select[aria-expanded=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    flex: 1;\n    min-width: 0;\n    background: transparent;\n    border: none;\n    cursor: inherit;\n    padding: 0;\n  }\n\n  .value-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .value-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    position: absolute;\n    z-index: 50000;\n    overflow: hidden;\n    border-radius: var(--radius);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n\n    &[data-state=\"open\"][data-placement=\"bottom\"] {\n      animation: slideInFromTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"open\"][data-placement=\"top\"] {\n      animation: slideInFromBottom 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"bottom\"] {\n      animation: slideOutToTop 0.15s var(--ease-snappy-pop);\n    }\n\n    &[data-state=\"closed\"][data-placement=\"top\"] {\n      animation: slideOutToBottom 0.15s var(--ease-snappy-pop);\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--foreground-300);\n\n    &[data-selected=\"true\"] {\n      color: var(--foreground-300);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    &[data-highlighted=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n  }\n\n  .item-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--foreground-300);\n  }\n\n  .item-indicator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    width: 1rem;\n    height: 1rem;\n    color: var(--accent-300);\n    margin-left: auto;\n  }\n\n  .item-content {\n    flex: 1;\n    min-width: 0;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .item-text {\n    flex: 1;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-description {\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .item-with-description {\n    align-items: flex-start;\n    @apply py-2;\n  }\n\n  .item-icon-with-description {\n    margin-top: 0.125rem;\n  }\n\n  .item-indicator-with-description {\n    margin-top: 0.125rem;\n  }\n\n  .separator {\n    margin: 0.25rem -0.25rem;\n    height: 1px;\n    background-color: var(--background-700);\n  }\n\n  @keyframes slideInFromTop {\n    from {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideInFromBottom {\n    from {\n      opacity: 0;\n      translate: 0 2px;\n    }\n    to {\n      opacity: 1;\n      translate: 0 0;\n    }\n  }\n\n  @keyframes slideOutToTop {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 -2px;\n    }\n  }\n\n  @keyframes slideOutToBottom {\n    from {\n      opacity: 1;\n      translate: 0 0;\n    }\n    to {\n      opacity: 0;\n      translate: 0 2px;\n    }\n  }\n\n  .select:has(.trigger[data-variant=\"ghost\"]) {\n    background: transparent;\n    border-color: transparent;\n\n    &[data-pressed]:not([data-disabled]),\n    &[aria-expanded=\"true\"] {\n      background: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n  }\n\n  .placeholder {\n    color: var(--foreground-400);\n  }\n\n  .icon-prefix {\n    display: inline-flex;\n    align-items: center;\n    flex-shrink: 0;\n  }\n\n  .select[data-mode=\"multiple\"] .item {\n    gap: 0.5rem;\n  }\n\n  .subTrigger {\n    display: flex;\n    align-items: center;\n    padding: var(--padding);\n    @apply gap-2;\n    border-radius: var(--inner-radius);\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n    cursor: default;\n    user-select: none;\n    outline: none;\n\n    &[data-highlighted=\"true\"] {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted=\"true\"]) {\n      background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n    }\n\n    &[data-disabled] {\n      opacity: 0.5;\n      pointer-events: none;\n    }\n  }\n\n  .subTriggerChevron {\n    flex-shrink: 0;\n    margin-left: auto;\n    width: 1rem;\n    height: 1rem;\n    opacity: 0.6;\n  }\n\n  .subContent {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: calc(var(--padding) * var(--radius-ratio));\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n    position: absolute;\n    z-index: 50001;\n    overflow: hidden;\n    min-width: 160px;\n    max-width: 320px;\n    border-radius: var(--radius);\n    border: var(--border-width-base) solid var(--background-700);\n    background-color: var(--background-900);\n\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  select: string;\n  trigger: string;\n  \"value-section\": string;\n  \"icon-section\": string;\n  icon: string;\n  value: string;\n  \"value-icon\": string;\n  \"value-text\": string;\n  \"value-chevron\": string;\n  content: string;\n  viewport: string;\n  list: string;\n  item: string;\n  \"item-icon\": string;\n  \"item-indicator\": string;\n  \"item-text\": string;\n  \"item-content\": string;\n  \"item-description\": string;\n  \"item-with-description\": string;\n  \"item-icon-with-description\": string;\n  \"item-indicator-with-description\": string;\n  separator: string;\n  \"scroll-button\": string;\n  placeholder: string;\n  \"icon-prefix\": string;\n  subTrigger: string;\n  subTriggerChevron: string;\n  subContent: string;\n};\n\nexport default styles;\n"
  },
  "slider": {
    "tsx": "\"use client\"\n\nimport * as React from 'react';\nimport { useFocusRing } from 'react-aria';\nimport { cn } from \"./utils\";\nimport styles from \"./Slider.module.css\";\n\ntype SliderSize = 'sm' | 'md' | 'lg';\n\ninterface SliderRootProps {\n  /** Size of the slider track and thumb */\n  size?: SliderSize;\n  /** Whether the slider is disabled */\n  disabled?: boolean;\n  /** Additional CSS class for the slider container */\n  className?: string;\n  /** Inline styles for the slider container */\n  style?: React.CSSProperties;\n  /** Minimum value of the slider range */\n  min?: number;\n  /** Maximum value of the slider range */\n  max?: number;\n  /** Step increment between values */\n  step?: number;\n  /** Initial value(s) for uncontrolled usage */\n  defaultValue?: number | number[];\n  /** Controlled value(s) for the slider thumb(s) */\n  value?: number | number[];\n  /** Called when the value changes */\n  onValueChange?: (value: number[]) => void;\n  /** Orientation of the slider track */\n  orientation?: 'horizontal' | 'vertical';\n  /** Accessible label for the slider */\n  'aria-label'?: string;\n  /** ID of an element that labels the slider */\n  'aria-labelledby'?: string;\n}\n\nconst SliderContext = React.createContext<{\n  size: SliderSize;\n  disabled?: boolean;\n} | null>(null);\n\nfunction clamp(value: number, min: number, max: number): number {\n  return Math.min(Math.max(value, min), max);\n}\n\nfunction snapToStep(value: number, min: number, max: number, step: number): number {\n  const snapped = Math.round((value - min) / step) * step + min;\n  return clamp(snapped, min, max);\n}\n\ninterface ThumbProps {\n  index: number;\n  value: number;\n  min: number;\n  max: number;\n  step: number;\n  disabled?: boolean;\n  trackRef: React.RefObject<HTMLDivElement | null>;\n  onValueChange: (index: number, value: number) => void;\n  'aria-label'?: string;\n  'aria-labelledby'?: string;\n}\n\nfunction SliderThumbInternal({\n  index,\n  value,\n  min,\n  max,\n  step,\n  disabled,\n  trackRef,\n  onValueChange,\n  'aria-label': ariaLabel,\n  'aria-labelledby': ariaLabelledBy,\n}: ThumbProps) {\n  const thumbRef = React.useRef<HTMLDivElement>(null);\n  const [isDragging, setIsDragging] = React.useState(false);\n  const { focusProps, isFocusVisible } = useFocusRing();\n\n  const percent = ((value - min) / (max - min)) * 100;\n\n  const getValueFromPointer = React.useCallback((clientX: number) => {\n    const track = trackRef.current;\n    if (!track) return value;\n\n    const rect = track.getBoundingClientRect();\n    const percent = clamp((clientX - rect.left) / rect.width, 0, 1);\n    const rawValue = percent * (max - min) + min;\n    return snapToStep(rawValue, min, max, step);\n  }, [trackRef, min, max, step, value]);\n\n  const handlePointerDown = (e: React.PointerEvent) => {\n    if (disabled) return;\n    e.preventDefault();\n    setIsDragging(true);\n    thumbRef.current?.setPointerCapture(e.pointerId);\n    thumbRef.current?.focus();\n  };\n\n  const handlePointerMove = (e: React.PointerEvent) => {\n    if (!isDragging || disabled) return;\n    const newValue = getValueFromPointer(e.clientX);\n    if (newValue !== value) {\n      onValueChange(index, newValue);\n    }\n  };\n\n  const handlePointerUp = (e: React.PointerEvent) => {\n    if (isDragging) {\n      setIsDragging(false);\n      thumbRef.current?.releasePointerCapture(e.pointerId);\n    }\n  };\n\n  const handleKeyDown = (e: React.KeyboardEvent) => {\n    if (disabled) return;\n\n    let newValue = value;\n    const largeStep = step * 10;\n\n    switch (e.key) {\n      case 'ArrowRight':\n      case 'ArrowUp':\n        newValue = clamp(value + step, min, max);\n        break;\n      case 'ArrowLeft':\n      case 'ArrowDown':\n        newValue = clamp(value - step, min, max);\n        break;\n      case 'PageUp':\n        newValue = clamp(value + largeStep, min, max);\n        break;\n      case 'PageDown':\n        newValue = clamp(value - largeStep, min, max);\n        break;\n      case 'Home':\n        newValue = min;\n        break;\n      case 'End':\n        newValue = max;\n        break;\n      default:\n        return;\n    }\n\n    e.preventDefault();\n    if (newValue !== value) {\n      onValueChange(index, newValue);\n    }\n  };\n\n  return (\n    <div\n      ref={thumbRef}\n      role=\"slider\"\n      tabIndex={disabled ? -1 : 0}\n      aria-valuemin={min}\n      aria-valuemax={max}\n      aria-valuenow={value}\n      aria-disabled={disabled || undefined}\n      aria-label={ariaLabel}\n      aria-labelledby={ariaLabelledBy}\n      className={cn('slider thumb', styles.thumb)}\n      style={{ left: `${percent}%` }}\n      data-dragging={isDragging || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n      onPointerDown={handlePointerDown}\n      onPointerMove={handlePointerMove}\n      onPointerUp={handlePointerUp}\n      onPointerCancel={handlePointerUp}\n      onKeyDown={handleKeyDown}\n      {...focusProps}\n    />\n  );\n}\n\n/** Horizontal slider for selecting a value within a range */\nconst Root = React.forwardRef<HTMLDivElement, SliderRootProps>(\n  (\n    {\n      className,\n      size = 'md',\n      disabled,\n      style,\n      defaultValue,\n      value: controlledValue,\n      onValueChange,\n      min = 0,\n      max = 100,\n      step = 1,\n      orientation = 'horizontal',\n      'aria-label': ariaLabel,\n      'aria-labelledby': ariaLabelledBy,\n      ...props\n    },\n    ref\n  ) => {\n    const trackRef = React.useRef<HTMLDivElement>(null);\n\n    // Normalize to arrays\n    const normalizeValue = (v: number | number[] | undefined): number[] | undefined => {\n      if (v === undefined) return undefined;\n      return Array.isArray(v) ? v : [v];\n    };\n\n    const [internalValues, setInternalValues] = React.useState<number[]>(() => {\n      return normalizeValue(defaultValue) ?? normalizeValue(controlledValue) ?? [min];\n    });\n\n    const isControlled = controlledValue !== undefined;\n    const values = isControlled ? normalizeValue(controlledValue)! : internalValues;\n\n    const handleValueChange = React.useCallback((index: number, newValue: number) => {\n      const newValues = [...values];\n      newValues[index] = newValue;\n\n      if (!isControlled) {\n        setInternalValues(newValues);\n      }\n      onValueChange?.(newValues);\n    }, [values, isControlled, onValueChange]);\n\n    const handleTrackClick = (e: React.PointerEvent) => {\n      if (disabled) return;\n      // Only handle clicks directly on the track, not on thumbs\n      if (e.target !== trackRef.current) return;\n\n      const track = trackRef.current;\n      if (!track) return;\n\n      const rect = track.getBoundingClientRect();\n      const percent = clamp((e.clientX - rect.left) / rect.width, 0, 1);\n      const rawValue = percent * (max - min) + min;\n      const newValue = snapToStep(rawValue, min, max, step);\n\n      // Find the closest thumb and update it\n      let closestIndex = 0;\n      let closestDistance = Math.abs(values[0] - newValue);\n      for (let i = 1; i < values.length; i++) {\n        const distance = Math.abs(values[i] - newValue);\n        if (distance < closestDistance) {\n          closestDistance = distance;\n          closestIndex = i;\n        }\n      }\n\n      handleValueChange(closestIndex, newValue);\n    };\n\n    return (\n      <SliderContext.Provider value={{ size, disabled }}>\n        <div\n          ref={ref}\n          data-size={size}\n          data-disabled={disabled || undefined}\n          data-orientation={orientation}\n          style={style}\n          className={cn('slider', styles.slider, className)}\n          {...props}\n        >\n          <div\n            ref={trackRef}\n            className={cn('slider track', styles.track)}\n            onPointerDown={handleTrackClick}\n          >\n            <div\n              className={cn('slider range', styles.range)}\n              style={{\n                left: `${values.length === 1 ? 0 : ((values[0] - min) / (max - min)) * 100}%`,\n                right: `${values.length === 1 ? 100 - ((values[0] - min) / (max - min)) * 100 : 100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,\n              }}\n            />\n            {values.map((value, index) => (\n              <SliderThumbInternal\n                key={index}\n                index={index}\n                value={value}\n                min={min}\n                max={max}\n                step={step}\n                disabled={disabled}\n                trackRef={trackRef}\n                onValueChange={handleValueChange}\n                aria-label={ariaLabel}\n                aria-labelledby={ariaLabelledBy}\n              />\n            ))}\n          </div>\n        </div>\n      </SliderContext.Provider>\n    );\n  }\n);\nRoot.displayName = 'SliderRoot';\n\nexport { Root };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    position: relative;\n    display: flex;\n    align-items: center;\n    width: 100%;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] {\n    @apply h-6;\n  }\n\n  .slider[data-size=\"md\"] {\n    @apply h-8;\n  }\n\n  .slider[data-size=\"lg\"] {\n    @apply h-10;\n  }\n\n  .slider[data-disabled] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n    --background: var(--background-600);\n    --background-disabled: var(--background-500);\n\n    position: relative;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: 9999px;\n    background-color: var(--background);\n    display: flex;\n    align-items: center;\n  }\n\n  .slider[data-disabled] .track {\n    background-color: var(--background-disabled);\n  }\n\n  .slider[data-size=\"sm\"] .track {\n    height: var(--track-height-sm);\n  }\n\n  .slider[data-size=\"md\"] .track {\n    height: var(--track-height-md);\n  }\n\n  .slider[data-size=\"lg\"] .track {\n    height: var(--track-height-lg);\n  }\n\n  .range {\n    --background: var(--accent-500);\n    --background-disabled: var(--background-600);\n\n    position: absolute;\n    height: 100%;\n    background-color: var(--background);\n    transition: background-color 200ms var(--ease-snappy-pop);\n  }\n\n  .slider[data-disabled] .range {\n    background-color: var(--background-disabled);\n  }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n    --background: var(--accent-500);\n    --background-focus: var(--accent-400);\n\n    display: block;\n    background-color: var(--background);\n    border-radius: 9999px;\n    cursor: grab;\n    outline: none;\n    position: absolute;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--background-focus);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly slider: string;\n  readonly track: string;\n  readonly range: string;\n  readonly thumb: string;\n};\n\nexport default styles;\n"
  },
  "switch": {
    "tsx": "\"use client\";\n\nimport React from \"react\";\nimport { useSwitch, useFocusRing, useHover, mergeProps } from \"react-aria\";\nimport { useToggleState } from \"react-stately\";\nimport { cn } from \"./utils\";\n\nimport styles from \"./Switch.module.css\";\n\nconst sizeMap = {\n  md: styles[\"md\"],\n  lg: styles[\"lg\"],\n};\n\nconst shapeMap = {\n  pill: styles[\"pill\"],\n  round: styles[\"round\"],\n};\n\nconst thumbPositions = {\n  md: { unchecked: 0.25, checked: 1 },\n  lg: { unchecked: 0.25, checked: 1.5 },\n};\n\nexport interface SwitchProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\" | \"onChange\" | \"checked\" | \"defaultChecked\"> {\n  /** Controlled selected (on) state */\n  isSelected?: boolean;\n  /** Called when the switch is toggled */\n  onChange?: (isSelected: boolean) => void;\n  /** Initial selected state for uncontrolled usage */\n  defaultSelected?: boolean;\n  /** Size of the switch */\n  size?: \"md\" | \"lg\";\n  /** Whether to render with a fully rounded pill shape */\n  pill?: boolean;\n  /** Whether the switch is disabled */\n  isDisabled?: boolean;\n}\n\nconst Switch = React.forwardRef<HTMLInputElement, SwitchProps>(\n  (\n    {\n      className,\n      size = \"lg\",\n      isDisabled = false,\n      isSelected: controlledSelected,\n      onChange,\n      defaultSelected,\n      pill,\n      ...props\n    },\n    ref\n  ) => {\n    const state = useToggleState({\n      isSelected: controlledSelected,\n      defaultSelected: defaultSelected ?? false,\n      onChange,\n    });\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    // Extract aria-label from props if provided\n    const { \"aria-label\": ariaLabel, \"aria-labelledby\": ariaLabelledby, ...otherProps } = props;\n\n    const { inputProps, isSelected } = useSwitch(\n      {\n        isDisabled,\n        ...(ariaLabel && { \"aria-label\": ariaLabel }),\n        ...(ariaLabelledby && { \"aria-labelledby\": ariaLabelledby }),\n      },\n      state,\n      inputRef\n    );\n    const { focusProps, isFocusVisible } = useFocusRing();\n    const { hoverProps, isHovered } = useHover({ isDisabled });\n\n    const isPill = pill === true;\n    const shapeClass = isPill ? shapeMap.pill : shapeMap.round;\n    const position = thumbPositions[size];\n    const thumbLeft = isSelected ? position.checked : position.unchecked;\n\n    React.useImperativeHandle(ref, () => inputRef.current!);\n\n    return (\n      <div\n        className={cn(\n          'switch',\n          styles.switch,\n          sizeMap[size],\n          shapeClass,\n          className\n        )}\n        data-selected={isSelected || undefined}\n        data-disabled={isDisabled || undefined}\n        data-focus-visible={isFocusVisible || undefined}\n        data-hovered={isHovered || undefined}\n      >\n        <div\n          className={cn(\n            'switch-track',\n            styles[\"switch-track\"],\n            shapeClass\n          )}\n        />\n        <div\n          className={cn(\n            'switch-thumb',\n            styles[\"switch-thumb\"],\n            sizeMap[size],\n            shapeClass\n          )}\n          style={{\n            left: `${thumbLeft}rem`,\n          }}\n        />\n        <input\n          ref={inputRef}\n          type=\"checkbox\"\n          className=\"absolute inset-0 w-full h-full opacity-0 cursor-pointer\"\n          {...mergeProps(inputProps, focusProps, hoverProps)}\n          {...otherProps}\n        />\n      </div>\n    );\n  }\n);\n\nSwitch.displayName = \"Switch\";\n\nexport { Switch };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --track-background-unchecked: var(--background-700);\n    --track-background-checked: var(--accent-500);\n    --track-background-hover: var(--accent-600);\n    --track-background-active: var(--accent-600);\n    --track-background-disabled: var(--background-800);\n    --thumb-background-unchecked: var(--background-500);\n    --thumb-background-checked: var(--accent-50);\n    --border: var(--background-700);\n    --border-hover: var(--accent-500);\n    --border-active: var(--accent-600);\n    --radius: 0.375rem;\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    cursor: pointer;\n    user-select: none;\n  }\n\n  .switch-track {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--accent-500);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: 0.6;\n    cursor: not-allowed;\n  }\n}\n\n.md {\n  width: 1.75rem;\n  height: 1rem;\n}\n\n.md .switch-thumb {\n  width: 0.5rem;\n  height: 0.5rem;\n}\n\n.lg {\n  width: 2.75rem;\n  height: 1.5rem;\n}\n\n.lg .switch-thumb {\n  width: 1rem;\n  height: 1rem;\n}\n\n.pill {\n  --radius: 9999px;\n}\n\n.round {\n  --radius: 0.375rem;\n}\n\n.switch[data-focus-visible] {\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent-500) 40%, transparent);\n}\n",
    "cssTypes": "export interface Styles {\n  switch: string;\n  \"switch-track\": string;\n  \"switch-thumb\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n  \"pill\": string;\n  \"round\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "table": {
    "tsx": "\"use client\";\n\nimport { useState } from \"react\";\nimport { cn } from \"./utils\";\n\nexport interface Column<T> {\n  /** Key of the data row object to display in this column */\n  key: keyof T;\n  /** Column header label displayed in the table head */\n  label: string;\n  /** Whether the column supports sorting (reserved for future use) */\n  sortable?: boolean;\n  /** Whether a filter input is shown for this column when showFilters is enabled */\n  filterable?: boolean;\n  /** Custom render function for the cell; receives the cell value and full row */\n  render?: (value: any, row: T) => React.ReactNode;\n}\n\nexport interface TableProps<T> {\n  /** Array of data rows to display */\n  data: T[];\n  /** Column definitions including key, label, and optional render function */\n  columns: Column<T>[];\n  /** Whether to show filter inputs above the table */\n  showFilters?: boolean;\n  /** Called when a table row is clicked */\n  onRowClick?: (row: T) => void;\n  /** Called when any column filter value changes */\n  onFilterChange?: (filters: Record<string, string>) => void;\n}\n\nexport function Table<T extends Record<string, any>>({\n  data,\n  columns,\n  showFilters = false,\n  onRowClick,\n  onFilterChange,\n}: TableProps<T>) {\n  const [filters, setFilters] = useState<Record<string, string>>({});\n\n  const filterableColumns = columns.filter((col) => col.filterable);\n\n  const handleFilterChange = (columnKey: string, value: string) => {\n    const newFilters = { ...filters, [columnKey]: value };\n    setFilters(newFilters);\n    onFilterChange?.(newFilters);\n  };\n\n  const filteredData = data.filter((row) =>\n    Object.entries(filters).every(([key, filterValue]) => {\n      if (!filterValue) return true;\n      const cellValue = String(row[key]).toLowerCase();\n      return cellValue.includes(filterValue.toLowerCase());\n    })\n  );\n\n  return (\n    <div className=\"w-full\">\n      {showFilters && filterableColumns.length > 0 && (\n        <div className=\"mb-4 p-4 bg-background-900 rounded-md border border-background-800\">\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">\n            {filterableColumns.map((col) => (\n              <div key={String(col.key)}>\n                <label className=\"block text-sm font-medium text-foreground-300 mb-2\">\n                  {col.label}\n                </label>\n                <input\n                  type=\"text\"\n                  value={filters[String(col.key)] || \"\"}\n                  onChange={(e) =>\n                    handleFilterChange(String(col.key), e.target.value)\n                  }\n                  placeholder={`Filter by ${col.label.toLowerCase()}`}\n                  className=\"w-full px-3 py-2 rounded-md border border-background-700 bg-background-950 text-foreground-50 placeholder-foreground-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all\"\n                />\n              </div>\n            ))}\n          </div>\n        </div>\n      )}\n\n      <div className=\"overflow-x-auto border border-background-800 rounded-md\">\n        <table className=\"w-full text-sm\">\n          <thead>\n            <tr className=\"border-b border-background-800 bg-background-900\">\n              {columns.map((col) => (\n                <th\n                  key={String(col.key)}\n                  className=\"px-4 py-3 text-left font-semibold text-foreground-200\"\n                >\n                  {col.label}\n                </th>\n              ))}\n            </tr>\n          </thead>\n          <tbody>\n            {filteredData.length > 0 ? (\n              filteredData.map((row, idx) => (\n                <tr\n                  key={idx}\n                  onClick={() => onRowClick?.(row)}\n                  className={cn(\n                    \"border-b border-background-800 last:border-b-0\",\n                    onRowClick\n                      ? \"cursor-pointer hover:bg-background-900 transition-colors\"\n                      : \"\"\n                  )}\n                >\n                  {columns.map((col) => (\n                    <td\n                      key={String(col.key)}\n                      className=\"px-4 py-3 text-foreground-300\"\n                    >\n                      {col.render ? (\n                        col.render(row[col.key], row)\n                      ) : (\n                        String(row[col.key])\n                      )}\n                    </td>\n                  ))}\n                </tr>\n              ))\n            ) : (\n              <tr>\n                <td\n                  colSpan={columns.length}\n                  className=\"px-4 py-8 text-center text-foreground-400\"\n                >\n                  No data available\n                </td>\n              </tr>\n            )}\n          </tbody>\n        </table>\n      </div>\n    </div>\n  );\n}\n",
    "css": "",
    "cssTypes": ""
  },
  "tabs": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing, useHover, mergeProps } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport styles from \"./Tabs.module.css\"\n\ntype TabsVariant = \"default\" | \"underline\"\ntype TabsOrientation = \"horizontal\" | \"vertical\"\n\ninterface IndicatorPosition {\n  left: number\n  top: number\n  width: number\n  height: number\n}\n\ninterface ListDimensions {\n  width: number\n  height: number\n}\n\ninterface TabsContextValue {\n  selectedValue: string\n  setSelectedValue: (value: string) => void\n  variant: TabsVariant\n  orientation: TabsOrientation\n  isDisabledTab: (value: string) => boolean\n  hoveredValue: string | null\n  setHoveredValue: (value: string | null) => void\n  indicatorReady: boolean\n  setIndicatorReady: (ready: boolean) => void\n}\n\nconst TabsContext = React.createContext<TabsContextValue | null>(null)\n\nfunction useTabsContext() {\n  const context = React.useContext(TabsContext)\n  if (!context) {\n    throw new Error(\"Tabs component must be used within Tabs root\")\n  }\n  return context\n}\n\ninterface TabsProps {\n  /** Visual style of the tab list indicator */\n  variant?: TabsVariant\n  /** Direction of the tab list layout */\n  orientation?: TabsOrientation\n  /** Initially selected tab value for uncontrolled usage */\n  defaultValue?: string\n  /** Controlled selected tab value */\n  value?: string\n  /** Called when the selected tab changes */\n  onValueChange?: (value: string) => void\n  /** Additional CSS class for the tabs root */\n  className?: string\n  children?: React.ReactNode\n}\n\nconst Tabs = React.forwardRef<HTMLDivElement, TabsProps>(\n  (\n    {\n      variant = \"default\",\n      orientation = \"horizontal\",\n      defaultValue,\n      value: controlledValue,\n      onValueChange,\n      className,\n      children,\n    },\n    ref\n  ) => {\n    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || \"\")\n    const [hoveredValue, setHoveredValue] = React.useState<string | null>(null)\n    const [disabledTabs, setDisabledTabs] = React.useState<Set<string>>(new Set())\n\n    const selectedValue = controlledValue !== undefined ? controlledValue : uncontrolledValue\n    const isDisabledTab = React.useCallback(\n      (value: string) => disabledTabs.has(value),\n      [disabledTabs]\n    )\n\n    const setSelectedValue = React.useCallback(\n      (newValue: string) => {\n        if (!isDisabledTab(newValue)) {\n          if (controlledValue === undefined) {\n            setUncontrolledValue(newValue)\n          }\n          onValueChange?.(newValue)\n        }\n      },\n      [controlledValue, isDisabledTab, onValueChange]\n    )\n\n    const registerDisabledTab = React.useCallback((value: string) => {\n      setDisabledTabs((prev) => new Set(prev).add(value))\n    }, [])\n\n    const unregisterDisabledTab = React.useCallback((value: string) => {\n      setDisabledTabs((prev) => {\n        const newSet = new Set(prev)\n        newSet.delete(value)\n        return newSet\n      })\n    }, [])\n\n    const [indicatorReady, setIndicatorReady] = React.useState(false)\n\n    return (\n      <TabsContext.Provider\n        value={{\n          selectedValue,\n          setSelectedValue,\n          variant,\n          orientation,\n          isDisabledTab,\n          hoveredValue,\n          setHoveredValue,\n          indicatorReady,\n          setIndicatorReady,\n        }}\n      >\n        <div\n          ref={ref}\n          className={cn(\"tabs\", styles.tabs, className)}\n          data-variant={variant}\n          data-orientation={orientation}\n        >\n          {React.Children.map(children, (child) =>\n            React.isValidElement(child) && child.type === TabsTrigger\n              ? React.cloneElement(child, {\n                _registerDisabled: registerDisabledTab,\n                _unregisterDisabled: unregisterDisabledTab,\n              } as any)\n              : child\n          )}\n        </div>\n      </TabsContext.Provider>\n    )\n  }\n)\nTabs.displayName = \"Tabs\"\n\ninterface TabsListProps {\n  /** Additional CSS class names */\n  className?: string\n  children?: React.ReactNode\n  /** Accessible label for the tab list */\n  \"aria-label\"?: string\n}\n\n/** Container for the row of tab trigger buttons */\nconst TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(\n  ({ className, children, \"aria-label\": ariaLabel }, ref) => {\n    const { selectedValue, hoveredValue, variant, orientation, setIndicatorReady } = useTabsContext()\n    const listRef = React.useRef<HTMLDivElement>(null)\n    const [indicator, setIndicator] = React.useState<IndicatorPosition>({\n      left: 0,\n      top: 0,\n      width: 0,\n      height: 0,\n    })\n    const [listDimensions, setListDimensions] = React.useState<ListDimensions>({\n      width: 0,\n      height: 0,\n    })\n\n\n    const measureTrigger = React.useCallback((element: HTMLElement | null) => {\n      if (!element) return null\n\n      const rect = element.getBoundingClientRect()\n      const listRect = listRef.current?.getBoundingClientRect()\n\n      if (!listRect) return null\n\n      const relativeLeft = rect.left - listRect.left\n      const relativeTop = rect.top - listRect.top\n\n      return {\n        left: relativeLeft,\n        top: relativeTop,\n        width: rect.width,\n        height: rect.height,\n      }\n    }, [])\n\n    const measureList = React.useCallback(() => {\n      if (!listRef.current) return\n      const rect = listRef.current.getBoundingClientRect()\n      setListDimensions({\n        width: rect.width,\n        height: rect.height,\n      })\n    }, [])\n\n    const updateIndicator = React.useCallback(\n      (value: string) => {\n        if (!listRef.current) return\n\n        const trigger = listRef.current.querySelector(\n          `[data-tabs-value=\"${value}\"]`\n        ) as HTMLElement | null\n\n        if (trigger) {\n          const position = measureTrigger(trigger)\n          if (position) {\n            setIndicator(position)\n          }\n        }\n      },\n      [measureTrigger]\n    )\n\n    React.useLayoutEffect(() => {\n      measureList()\n      updateIndicator(selectedValue)\n      setIndicatorReady(true)\n    }, [selectedValue, updateIndicator, measureList, setIndicatorReady])\n\n    React.useEffect(() => {\n      if (!listRef.current) return\n\n      const resizeObserver = new ResizeObserver(() => {\n        requestAnimationFrame(() => {\n          measureList()\n          updateIndicator(selectedValue)\n        })\n      })\n\n      resizeObserver.observe(listRef.current)\n      return () => resizeObserver.disconnect()\n    }, [selectedValue, updateIndicator, measureList])\n\n    React.useEffect(() => {\n      const handleWindowResize = () => {\n        requestAnimationFrame(() => {\n          measureList()\n          updateIndicator(selectedValue)\n        })\n      }\n\n      window.addEventListener(\"resize\", handleWindowResize)\n      return () => window.removeEventListener(\"resize\", handleWindowResize)\n    }, [selectedValue, updateIndicator, measureList])\n\n    const getIndicatorStyle = React.useMemo<React.CSSProperties>(() => {\n      const baseStyle: React.CSSProperties = {\n        position: \"absolute\",\n        transition: \"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)\",\n        willChange: \"transform\",\n        pointerEvents: \"none\",\n        opacity: indicator.width === 0 && indicator.height === 0 ? 0 : 1,\n      }\n\n      if (indicator.width === 0 && indicator.height === 0) {\n        return baseStyle\n      }\n\n      if (orientation === \"vertical\") {\n        if (variant === \"underline\") {\n          return {\n            ...baseStyle,\n            left: 0,\n            top: indicator.top,\n            width: 2,\n            height: indicator.height,\n          }\n        }\n        // Apply horizontal padding to indicator for vertical orientation\n        const horizontalPadding = 4\n        const adjustedWidth = Math.max(0, listDimensions.width - horizontalPadding * 2)\n        return {\n          ...baseStyle,\n          left: horizontalPadding,\n          top: indicator.top,\n          width: adjustedWidth,\n          height: indicator.height,\n        }\n      }\n\n      if (variant === \"underline\") {\n        return {\n          ...baseStyle,\n          left: indicator.left,\n          top: indicator.top + indicator.height - 2,\n          width: indicator.width,\n          height: 2,\n        }\n      }\n\n      // Apply vertical padding to indicator (matches --indicator-padding CSS variable)\n      const verticalPadding = 4\n      const adjustedHeight = Math.max(0, listDimensions.height - verticalPadding * 2)\n      return {\n        ...baseStyle,\n        left: indicator.left,\n        top: verticalPadding,\n        width: indicator.width,\n        height: adjustedHeight,\n      }\n    }, [indicator, listDimensions, variant, orientation])\n\n    const mergedRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        listRef.current = el\n        if (typeof ref === \"function\") ref(el)\n        else if (ref) ref.current = el\n      },\n      [ref]\n    )\n\n    return (\n      <div\n        ref={mergedRef}\n        role=\"tablist\"\n        aria-label={ariaLabel}\n        aria-orientation={orientation}\n        className={cn(\"tabsList\", styles.tabsList, className)}\n        data-variant={variant}\n        data-orientation={orientation}\n        style={{ position: \"relative\" }}\n      >\n        {indicator.width > 0 && (\n          <div\n            className={cn(\"indicator\", styles.indicator, {\n              [styles.indicatorDefault]: variant === \"default\",\n              [styles.indicatorUnderline]: variant === \"underline\",\n            })}\n            style={getIndicatorStyle}\n          />\n        )}\n        {children}\n      </div>\n    )\n  }\n)\nTabsList.displayName = \"TabsList\"\n\ninterface TabsTriggerProps {\n  /** Unique identifier matching the associated TabsContent value */\n  value: string\n  /** Whether the tab trigger is disabled */\n  disabled?: boolean\n  /** Icon element displayed before the tab label */\n  icon?: React.ReactNode\n  /** Additional CSS class names */\n  className?: string\n  children?: React.ReactNode\n  _registerDisabled?: (value: string) => void\n  _unregisterDisabled?: (value: string) => void\n}\n\n/** A tab button that activates its associated content panel */\nconst TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(\n  (\n    {\n      value,\n      disabled = false,\n      icon,\n      className,\n      children,\n      _registerDisabled,\n      _unregisterDisabled,\n    },\n    ref\n  ) => {\n    const { selectedValue, setSelectedValue, hoveredValue, setHoveredValue, indicatorReady } =\n      useTabsContext()\n    const buttonRef = React.useRef<HTMLButtonElement>(null)\n    const isSelected = value === selectedValue\n    const isHovered = value === hoveredValue\n\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered: isHoverActive } = useHover({ isDisabled: disabled })\n\n    React.useEffect(() => {\n      if (disabled) {\n        _registerDisabled?.(value)\n      } else {\n        _unregisterDisabled?.(value)\n      }\n    }, [disabled, value, _registerDisabled, _unregisterDisabled])\n\n    const handleClick = React.useCallback(() => {\n      if (!disabled) {\n        setSelectedValue(value)\n      }\n    }, [disabled, value, setSelectedValue])\n\n    const handleKeyDown = React.useCallback(\n      (e: React.KeyboardEvent) => {\n        if (disabled) return\n\n        const listElement = buttonRef.current?.parentElement\n        if (!listElement) return\n\n        const triggers = Array.from(\n          listElement.querySelectorAll('[data-tabs-value]')\n        ) as HTMLButtonElement[]\n        const currentIndex = triggers.findIndex((el) => el.getAttribute(\"data-tabs-value\") === value)\n\n        let nextValue: string | null = null\n\n        if (e.key === \"ArrowRight\" || e.key === \"ArrowDown\") {\n          e.preventDefault()\n          const nextIndex = (currentIndex + 1) % triggers.length\n          nextValue = triggers[nextIndex].getAttribute(\"data-tabs-value\")\n        } else if (e.key === \"ArrowLeft\" || e.key === \"ArrowUp\") {\n          e.preventDefault()\n          const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1\n          nextValue = triggers[prevIndex].getAttribute(\"data-tabs-value\")\n        } else if (e.key === \"Home\") {\n          e.preventDefault()\n          nextValue = triggers[0].getAttribute(\"data-tabs-value\")\n        } else if (e.key === \"End\") {\n          e.preventDefault()\n          nextValue = triggers[triggers.length - 1].getAttribute(\"data-tabs-value\")\n        }\n\n        if (nextValue) {\n          setSelectedValue(nextValue)\n          setTimeout(() => {\n            const nextTrigger = listElement.querySelector(\n              `[data-tabs-value=\"${nextValue}\"]`\n            ) as HTMLButtonElement | null\n            nextTrigger?.focus()\n          }, 0)\n        }\n      },\n      [value, disabled, setSelectedValue]\n    )\n\n    const mergedRef = React.useCallback(\n      (el: HTMLButtonElement | null) => {\n        buttonRef.current = el\n        if (typeof ref === \"function\") ref(el)\n        else if (ref) ref.current = el\n      },\n      [ref]\n    )\n\n    return (\n      <button\n        {...mergeProps(focusProps, hoverProps)}\n        ref={mergedRef}\n        id={`${value}-trigger`}\n        role=\"tab\"\n        aria-selected={isSelected}\n        aria-controls={`${value}-content`}\n        tabIndex={isSelected ? 0 : -1}\n        disabled={disabled}\n        data-tabs-value={value}\n        className={cn(\"tabsTrigger\", styles.tabsTrigger, className)}\n        data-selected={isSelected ? \"true\" : \"false\"}\n        data-disabled={disabled ? \"true\" : undefined}\n        data-focus-visible={isFocusVisible ? \"true\" : undefined}\n        data-hovered={isHoverActive ? \"true\" : \"false\"}\n        data-indicator-ready={isSelected && indicatorReady ? \"true\" : undefined}\n        onClick={handleClick}\n        onKeyDown={handleKeyDown}\n        onMouseEnter={() => !disabled && setHoveredValue(value)}\n        onMouseLeave={() => setHoveredValue(null)}\n      >\n        {icon && <span className={styles.triggerIcon}>{icon}</span>}\n        {children}\n      </button>\n    )\n  }\n)\nTabsTrigger.displayName = \"Tab\"\n\ninterface TabsContentProps {\n  /** Unique identifier matching the associated TabsTrigger value */\n  value: string\n  /** Additional CSS class names */\n  className?: string\n  children?: React.ReactNode\n}\n\n/** Content panel shown when its corresponding tab is active */\nconst TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(\n  ({ value, className, children }, ref) => {\n    const { selectedValue, variant, orientation } = useTabsContext()\n    const isVisible = value === selectedValue\n\n    return (\n      <div\n        ref={ref}\n        role=\"tabpanel\"\n        aria-labelledby={`${value}-trigger`}\n        id={`${value}-content`}\n        className={cn(\"tabsContent\", styles.tabsContent, className)}\n        data-variant={variant}\n        data-orientation={orientation}\n        hidden={!isVisible}\n      >\n        {isVisible && children}\n      </div>\n    )\n  }\n)\nTabsContent.displayName = \"TabsContent\"\n\nexport { Tabs, TabsList, TabsTrigger, TabsContent }\nexport type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .tabsList {\n    @apply gap-3 py-1;\n\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    width: 100%;\n    position: relative;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: auto;\n      min-width: 120px;\n      height: 100%;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--background-700);\n      align-items: stretch;\n    }\n  }\n\n  .indicator {\n    --indicator-padding: 2px;\n\n    position: absolute;\n    background-color: var(--accent-500);\n    border-radius: var(--radius-xs);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    will-change: transform;\n    pointer-events: none;\n  }\n\n  .indicatorDefault {\n    background-color: color-mix(in srgb, var(--background-700) 50%, transparent);;\n    border-radius: var(--radius-sm);\n  }\n\n  .indicatorUnderline {\n    background-color: var(--accent-500);\n    border-radius: 0;\n  }\n\n  .tabsTrigger {\n    @apply px-2 py-1.5;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    background-color: transparent;\n    border: none;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    color: var(--foreground-400);\n    cursor: pointer;\n    user-select: none;\n    outline: none;\n    position: relative;\n    z-index: 1;\n    transition: color 0.15s ease, background-color 0.15s ease;\n    border-radius: var(--radius-sm);\n    flex-shrink: 0;\n\n\n    &:not([data-disabled]) {\n      &:hover {\n        color: var(--foreground-200);\n      }\n\n      &:active {\n        color: var(--foreground-50);\n      }\n    }\n\n    &[data-selected=\"true\"] {\n      color: var(--foreground-50);\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      .tabsList:not([data-variant=\"underline\"]) & {\n        background-color: color-mix(in srgb, var(--background-700) 50%, transparent);\n      }\n\n      .tabsList[data-variant=\"underline\"] & {\n        border-bottom-color: var(--accent-500);\n      }\n\n      .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--accent-500);\n      }\n    }\n\n    &[data-focus-visible] {\n      background: var(--background-800);\n      outline: none;\n    }\n\n    &[data-disabled=\"true\"] {\n      opacity: 0.5;\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .tabsList[data-variant=\"underline\"] & {\n      background-color: transparent;\n      border-radius: 0;\n      border-bottom: 2px solid transparent;\n    }\n\n    .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .tabsList[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]) {\n      border-left-color: var(--accent-500);\n      border-bottom: none;\n    }\n  }\n\n  .triggerIcon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 1rem;\n    height: 1rem;\n    flex-shrink: 0;\n  }\n\n  .tabsContent {\n    flex: 1;\n    width: 100%;\n    padding: 0;\n    outline: none;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &[data-variant=\"default\"] {\n      padding-top: 1rem;\n    }\n\n    &[data-variant=\"underline\"] {\n      padding-top: 1rem;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .tabsList {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0;\n      }\n    }\n\n    .tabsTrigger {\n      @apply px-1 py-1;\n      font-size: var(--text-xs);\n\n      .tabsList[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  tabs: string;\n  tabsList: string;\n  indicator: string;\n  indicatorDefault: string;\n  indicatorUnderline: string;\n  tabsTrigger: string;\n  triggerIcon: string;\n  tabsContent: string;\n};\n\nexport default styles;\n"
  },
  "textarea": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useState, type ComponentPropsWithoutRef } from \"react\";\nimport { useFocusRing, mergeProps } from \"react-aria\";\nimport { cn } from \"./utils\";\nimport styles from \"./Textarea.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\nexport interface TextAreaProps extends Omit<ComponentPropsWithoutRef<\"textarea\">, \"size\"> {\n  /** Size of the textarea */\n  size?: Size;\n  /** Whether to apply error styling */\n  error?: boolean;\n  /** Whether the textarea can be manually resized by the user */\n  resizable?: boolean;\n  /** Whether to display a character count below the textarea */\n  showCharacterCount?: boolean;\n  /** Maximum number of characters allowed */\n  maxCharacters?: number;\n}\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return React.useCallback((value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  }, refs);\n}\n\nexport const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      error = false,\n      disabled,\n      resizable = true,\n      showCharacterCount = false,\n      maxCharacters,\n      value: controlledValue,\n      defaultValue,\n      onChange,\n      ...props\n    },\n    ref\n  ) => {\n    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? \"\");\n\n    const textareaRef = React.useRef<HTMLTextAreaElement>(null);\n    const mergedRef = useMergedRef(ref, textareaRef);\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;\n    const charCount = typeof currentValue === \"string\" ? currentValue.length : 0;\n    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;\n\n    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {\n      const newValue = e.target.value;\n\n      if (maxCharacters && newValue.length > maxCharacters) {\n        const truncated = newValue.slice(0, maxCharacters);\n        if (controlledValue === undefined) {\n          setInternalValue(truncated);\n        }\n        onChange?.({\n          ...e,\n          target: { ...e.target, value: truncated },\n        } as React.ChangeEvent<HTMLTextAreaElement>);\n      } else {\n        if (controlledValue === undefined) {\n          setInternalValue(newValue);\n        }\n        onChange?.(e);\n      }\n    };\n\n    return (\n      <div className={styles.container}>\n        <textarea\n          ref={mergedRef}\n          disabled={disabled}\n          data-focus-visible={isFocusVisible || undefined}\n          data-disabled={disabled || undefined}\n          data-error={error || isOverLimit ? \"true\" : undefined}\n          data-size={size}\n          data-resizable={resizable ? undefined : \"false\"}\n          className={cn(styles.textarea, className)}\n          value={currentValue}\n          {...mergeProps(focusProps, { onChange: handleChange, ...props })}\n        />\n        {showCharacterCount && (\n          <div\n            className={styles.characterCount}\n            data-over-limit={isOverLimit || undefined}\n          >\n            {charCount}{maxCharacters ? ` / ${maxCharacters}` : \"\"} characters\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nTextArea.displayName = \"TextArea\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --background: var(--background-950);\n    --foreground: var(--foreground-50);\n    --placeholder: var(--foreground-400);\n    --border: var(--background-700);\n    --border-hover: var(--background-600);\n    --ring-color: var(--accent-500);\n\n    width: 100%;\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    resize: vertical;\n    @apply px-3 py-2;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    @media (hover: hover) {\n      &:hover:not([data-disabled]) {\n        border-color: var(--border-hover);\n      }\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring-color) 15%, transparent);\n      transform: scale(1.01);\n    }\n\n    &[data-disabled] {\n      background-color: var(--background-900);\n      color: var(--foreground-400);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      --border: var(--danger-600);\n      --ring-color: var(--danger-600);\n      border-color: var(--danger-600);\n\n      &[data-focus-visible] {\n        border-color: var(--danger-600);\n        box-shadow: 0 0 0 2px color-mix(in srgb, var(--danger-600) 25%, transparent);\n      }\n    }\n\n    &[data-resizable=\"false\"] {\n      resize: none;\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    font-size: var(--text-xs);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    width: 100%;\n  }\n\n  .characterCount {\n    font-size: var(--text-xs);\n    color: var(--foreground-400);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .characterCount[data-over-limit] {\n    color: var(--danger-600);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  textarea: string;\n  container: string;\n  characterCount: string;\n};\n\nexport default styles;\n"
  },
  "toast": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';\nimport gsap from 'gsap';\nimport { useGSAP } from \"@gsap/react\";\nimport { cn } from \"./utils\";\nimport styles from './Toast.module.css';\nimport { ToastProps as ToastData } from \"./Toast.Store\";\nimport { dispatch } from \"./Toast.Store\";\nimport { FaCircleExclamation, FaCircleCheck, FaCircleInfo, FaTriangleExclamation } from 'react-icons/fa6';\nimport { HiX } from 'react-icons/hi';\n\nconst variantMap = {\n  default: styles.default,\n  destructive: styles.destructive,\n  success: styles.success,\n  info: styles.info,\n  warning: styles.warning,\n} as const;\n\nconst toastIcons = {\n  destructive: <FaCircleExclamation className={styles.icon} />,\n  success: <FaCircleCheck className={styles.icon} />,\n  info: <FaCircleInfo className={styles.icon} />,\n  warning: <FaTriangleExclamation className={styles.icon} />,\n  default: null,\n};\n\ninterface ToastComponentProps {\n  /** Toast data object containing content and display options */\n  toast: ToastData;\n  /** Whether the auto-dismiss timer pauses on mouse hover */\n  pauseOnHover?: boolean;\n}\n\nexport const Toast = forwardRef<HTMLDivElement, ToastComponentProps>(function Toast(\n  { toast, pauseOnHover = false },\n  ref\n) {\n  const innerRef = useRef<HTMLDivElement>(null);\n  useImperativeHandle(ref, () => innerRef.current!);\n\n  const {\n    id,\n    title,\n    description,\n    jsx,\n    variant = 'default',\n    duration = 5000,\n    onDismiss,\n    position = 'bottom-right',\n  } = toast;\n\n  const isTop = position.startsWith('top');\n\n  // Time tracking refs\n  const elapsedRef = useRef(0);\n  const lastTimeRef = useRef<number>(Date.now());\n  const animationFrameRef = useRef<number | null>(null);\n\n  // Use a ref for paused state to avoid restarting the effect on every hover change\n  const isPausedRef = useRef(pauseOnHover);\n  useEffect(() => {\n    isPausedRef.current = pauseOnHover;\n  }, [pauseOnHover]);\n\n  const handleDismiss = useCallback(() => {\n    const yOffset = isTop ? -20 : 20;\n\n    if (innerRef.current) {\n      innerRef.current.dataset.dismissing = \"true\";\n      gsap.killTweensOf(innerRef.current);\n      gsap.to(innerRef.current, {\n        opacity: 0,\n        y: yOffset,\n        scale: 0.9,\n        duration: 0.3,\n        onComplete: () => {\n          onDismiss?.();\n          dispatch({ type: 'DISMISS_TOAST', toastId: id });\n        },\n      });\n    } else {\n      onDismiss?.();\n      dispatch({ type: 'DISMISS_TOAST', toastId: id });\n    }\n  }, [id, isTop, onDismiss]);\n\n  // Entrance animation\n  useGSAP(() => {\n    if (!innerRef.current) return;\n\n    const spawnDir = toast.spawnDirection || 'bottom';\n    // 'bottom' (user-triggered): enter from below for bottom positions, above for top positions\n    // 'top' (dismiss-revealed): enter from above for bottom positions, below for top positions\n    const fromY = spawnDir === 'top'\n      ? (isTop ? 20 : -20)\n      : (isTop ? -20 : 20);\n\n    gsap.from(innerRef.current, {\n      opacity: 0,\n      y: fromY,\n      duration: 0.35,\n      ease: \"power3.out\",\n    });\n  }, { scope: innerRef });\n\n  // Animation Frame Timer Logic\n  useEffect(() => {\n    if (duration === Infinity || duration <= 0) return;\n    lastTimeRef.current = Date.now();\n\n    const loop = () => {\n      const now = Date.now();\n      const delta = now - lastTimeRef.current;\n      lastTimeRef.current = now;\n\n      if (!isPausedRef.current) {\n        elapsedRef.current += delta;\n\n        if (elapsedRef.current >= duration) {\n          handleDismiss();\n          return;\n        }\n      }\n\n      animationFrameRef.current = requestAnimationFrame(loop);\n    };\n\n    animationFrameRef.current = requestAnimationFrame(loop);\n\n    return () => {\n      if (animationFrameRef.current) {\n        cancelAnimationFrame(animationFrameRef.current);\n      }\n    };\n  }, [duration, handleDismiss]);\n\n  const icon = toastIcons[variant as keyof typeof toastIcons];\n\n  return (\n    <div\n      ref={innerRef}\n      className={cn('toast', styles.toast, variantMap[variant])}\n      role=\"alert\"\n    >\n      {icon && <div className=\"toast-icon\">{icon}</div>}\n      <div className={cn('toast-content', styles.content)}>\n        {jsx || (\n          <>\n            {title && <h4 className={cn('toast-title', styles.title)}>{title}</h4>}\n            {description && <p className={cn('toast-description', styles.description)}>{description}</p>}\n          </>\n        )}\n        {toast.action}\n      </div>\n      <button\n        onClick={handleDismiss}\n        className={cn('toast-close', styles.closeButton)}\n        aria-label=\"Close\"\n      >\n        <HiX className=\"w-4 h-4\" />\n      </button>\n    </div>\n  );\n});\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .toast {\n    --background: var(--background-900);\n    --foreground: var(--foreground-200);\n    --border: var(--background-600);\n    @apply py-2 px-4;\n\n    width: 100%;\n    max-width: 28rem;\n    display: flex;\n    align-items: flex-start;\n    gap: var(--spacing-3);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n  }\n\n  .icon {\n    flex-shrink: 0;\n    @apply mr-4 mt-2;\n    width: 1.25rem;\n    height: 1.25rem;\n    color: currentColor;\n  }\n\n  .content {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-md);\n    line-height: var(--leading-tight);\n    margin: 0;\n  }\n\n  .description {\n    @apply mt-1;\n    font-weight: var(--font-weight-normal);\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n  }\n\n  .closeButton {\n    @apply p-2;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: transparent;\n    border: none;\n    border-radius: var(--radius-sm);\n    cursor: pointer;\n    opacity: 0.6;\n    transition: opacity 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n\n    @media (hover: hover) {\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n.toast.default {\n  --background: var(--background-900);\n  --foreground: var(--foreground-200);\n  --border: var(--background-600);\n}\n\n.toast.default .title {\n  color: var(--foreground-100);\n}\n\n.toast.default .description {\n  color: var(--foreground-300);\n}\n\n.toast.destructive {\n  --background: color-mix(in srgb, var(--danger-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--danger-600) 40%, var(--background-900));\n}\n\n.toast.destructive .title {\n  color: var(--foreground-100);\n}\n\n.toast.destructive .description {\n  color: var(--foreground-300);\n}\n\n.toast.destructive .icon {\n  color: var(--danger-600);\n}\n\n.toast.destructive .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--danger-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.success {\n  --background: color-mix(in srgb, var(--success-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--success-600) 40%, var(--background-900));\n}\n\n.toast.success .title {\n  color: var(--foreground-100);\n}\n\n.toast.success .description {\n  color: var(--foreground-300);\n}\n\n.toast.success .icon {\n  color: var(--success-600);\n}\n\n.toast.success .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--success-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.info {\n  --background: color-mix(in srgb, var(--info-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--info-600) 40%, var(--background-900));\n}\n\n.toast.info .title {\n  color: var(--foreground-100);\n}\n\n.toast.info .description {\n  color: var(--foreground-300);\n}\n\n.toast.info .icon {\n  color: var(--info-600);\n}\n\n.toast.info .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--info-500) 20%, var(--background-900));\n    }\n  }\n}\n\n.toast.warning {\n  --background: color-mix(in srgb, var(--warning-600) 10%, var(--background-900));\n  --foreground: var(--foreground-200);\n  --border: color-mix(in srgb, var(--warning-600) 40%, var(--background-900));\n}\n\n.toast.warning .title {\n  color: var(--foreground-100);\n}\n\n.toast.warning .description {\n  color: var(--foreground-300);\n}\n\n.toast.warning .icon {\n  color: var(--warning-600);\n}\n\n.toast.warning .closeButton {\n  @media (hover: hover) {\n    &:hover {\n      background-color: color-mix(in srgb, var(--warning-500) 20%, var(--background-900));\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  toast: string;\n  icon: string;\n  content: string;\n  title: string;\n  description: string;\n  closeButton: string;\n  default: string;\n  destructive: string;\n  success: string;\n  info: string;\n  warning: string;\n};\n\nexport default styles;\n"
  },
  "tooltip": {
    "tsx": "\"use client\";\n\nimport React, { useRef, useLayoutEffect, useState, useEffect, useCallback } from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useTooltipTrigger, useTooltip, mergeProps } from \"react-aria\";\nimport { useFloating, offset, flip, shift, autoUpdate } from \"@floating-ui/react-dom\";\nimport { cn } from \"./utils\";\nimport { useTooltipTriggerState } from \"react-stately\";\nimport { Frame } from \"../Frame\";\nimport styles from \"./Tooltip.module.css\";\n\nconst ARROW_PATH = \"M 0 0 L 6 -12 L 12 0\";\nconst ARROW_WIDTH = 12;\nconst TOOLTIP_GAP = 8;\nconst ARROW_POSITIONING_SIZE = 6;\nconst DEFAULT_SHOW_DELAY_MS = 600;\nconst SWAP_WINDOW_MS = 150;\nconst EXIT_ANIMATION_MS = 160;\n\n// Module-level timestamps set synchronously in onOpenChange (before effects).\n// This eliminates DOM-order dependency: both opening and closing effects\n// can reliably read these regardless of which effect runs first.\nlet lastCloseTime = 0;\nlet lastOpenTime = 0;\nlet pendingExit: (() => void) | null = null;\n\nfunction useTimeout() {\n  const idRef = useRef<ReturnType<typeof setTimeout>>(undefined);\n\n  const start = useCallback((fn: () => void, ms: number) => {\n    clearTimeout(idRef.current);\n    idRef.current = setTimeout(fn, ms);\n  }, []);\n\n  const clear = useCallback(() => {\n    clearTimeout(idRef.current);\n  }, []);\n\n  useEffect(() => () => clearTimeout(idRef.current), []);\n\n  return [start, clear] as const;\n}\n\ntype TooltipPosition = \"top\" | \"right\" | \"bottom\" | \"left\";\n\nconst getFrameSide = (position: TooltipPosition): \"top\" | \"right\" | \"bottom\" | \"left\" => {\n  switch (position) {\n    case \"top\":\n      return \"bottom\";\n    case \"bottom\":\n      return \"top\";\n    case \"left\":\n      return \"right\";\n    case \"right\":\n      return \"left\";\n  }\n};\n\nconst placementMap: Record<TooltipPosition, \"top\" | \"bottom\" | \"left\" | \"right\"> = {\n  top: \"top\",\n  bottom: \"bottom\",\n  left: \"left\",\n  right: \"right\",\n};\n\nconst getInitialTransform = (placement: string): string => {\n  switch (placement) {\n    case \"top\":\n      return \"translateY(3px) scale(0.95)\";\n    case \"bottom\":\n      return \"translateY(-3px) scale(0.95)\";\n    case \"left\":\n      return \"translateX(3px) scale(0.95)\";\n    case \"right\":\n      return \"translateX(-3px) scale(0.95)\";\n    default:\n      return \"scale(0.95)\";\n  }\n};\n\nexport interface TooltipProps {\n  children: React.ReactNode;\n  /** Content to display inside the tooltip */\n  content: React.ReactNode;\n  /** Preferred side of the trigger where the tooltip appears */\n  position?: TooltipPosition;\n  /** Additional CSS class for the trigger wrapper */\n  className?: string;\n  /** Milliseconds before the tooltip appears after hover */\n  delay?: number;\n  /** Whether the tooltip is disabled */\n  isDisabled?: boolean;\n  /** Controlled open state */\n  isOpen?: boolean;\n  /** Called when the tooltip opens or closes */\n  onOpenChange?: (isOpen: boolean) => void;\n  /** Whether to render a directional arrow pointing at the trigger */\n  showArrow?: boolean;\n}\n\nconst Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(\n  (\n    {\n      children,\n      content,\n      position = \"top\",\n      className,\n      delay = DEFAULT_SHOW_DELAY_MS,\n      isDisabled = false,\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      showArrow = false,\n    },\n    _ref\n  ) => {\n    const triggerRef = useRef<HTMLDivElement>(null);\n    const tooltipRef = useRef<HTMLDivElement>(null);\n    const [shouldRender, setShouldRender] = useState(false);\n    const [isVisible, setIsVisible] = useState(false);\n    const [isInstant, setIsInstant] = useState(false);\n    const wasOpenRef = useRef(false);\n    const [startSwapTimer, clearSwapTimer] = useTimeout();\n    const [startUnmountTimer, clearUnmountTimer] = useTimeout();\n\n    const onOpenChangeRef = useRef(onOpenChange);\n    onOpenChangeRef.current = onOpenChange;\n\n    const state = useTooltipTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange: useCallback((open: boolean) => {\n        if (open) lastOpenTime = Date.now();\n        else lastCloseTime = Date.now();\n        onOpenChangeRef.current?.(open);\n      }, []),\n      delay,\n      isDisabled,\n    });\n\n    const { triggerProps, tooltipProps } = useTooltipTrigger(\n      { isDisabled },\n      state,\n      triggerRef\n    );\n    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);\n\n    const { refs, floatingStyles, placement } = useFloating({\n      placement: placementMap[position],\n      whileElementsMounted: autoUpdate,\n      middleware: [\n        offset(TOOLTIP_GAP + ARROW_POSITIONING_SIZE),\n        flip(),\n        shift({ padding: 8 }),\n      ],\n    });\n\n    const isPositioned = floatingStyles.transform !== undefined;\n\n    useEffect(() => {\n      if (state.isOpen) {\n        wasOpenRef.current = true;\n        const elapsed = Date.now() - lastCloseTime;\n        const isSwap = lastCloseTime > 0 && elapsed < SWAP_WINDOW_MS;\n\n        if (pendingExit) {\n          pendingExit();\n          pendingExit = null;\n        }\n\n        setIsInstant(isSwap);\n        setShouldRender(true);\n      } else if (wasOpenRef.current) {\n        wasOpenRef.current = false;\n\n        // Batched swap: onOpenChange timestamps are set synchronously\n        // before effects, so if another tooltip opened in this cycle,\n        // lastOpenTime will be >= lastCloseTime.\n        if (lastOpenTime > 0 && lastOpenTime >= lastCloseTime) {\n          setIsVisible(false);\n          setShouldRender(false);\n          return;\n        }\n\n        // Non-batched: delay exit to allow cross-frame swap detection.\n        // If another tooltip opens within the window, pendingExit cancels.\n        startSwapTimer(() => {\n          setIsVisible(false);\n          startUnmountTimer(() => {\n            setShouldRender(false);\n            pendingExit = null;\n          }, EXIT_ANIMATION_MS);\n        }, SWAP_WINDOW_MS);\n\n        pendingExit = () => {\n          clearSwapTimer();\n          clearUnmountTimer();\n          setIsVisible(false);\n          setShouldRender(false);\n        };\n      }\n    }, [state.isOpen]);\n\n    useEffect(() => {\n      if (shouldRender && state.isOpen && isPositioned) {\n        if (isInstant) {\n          setIsVisible(true);\n          requestAnimationFrame(() => setIsInstant(false));\n        } else {\n          requestAnimationFrame(() => {\n            requestAnimationFrame(() => {\n              setIsVisible(true);\n            });\n          });\n        }\n      }\n    }, [shouldRender, state.isOpen, isPositioned]);\n\n    useLayoutEffect(() => {\n      refs.setReference(triggerRef.current);\n    }, [refs]);\n\n    return (\n      <>\n        <div\n          ref={triggerRef}\n          {...mergeProps(triggerProps)}\n          className={cn(styles.trigger, className)}\n        >\n          {children}\n        </div>\n\n        {shouldRender &&\n          createPortal(\n            <div\n              ref={(el) => {\n                (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = el;\n                refs.setFloating(el);\n              }}\n              {...mergeProps(tooltipProps, ariaTooltipProps)}\n              className={styles.root}\n              style={{\n                ...floatingStyles,\n              }}\n            >\n              <div\n                className={styles.content}\n                data-visible={isVisible ? \"true\" : \"false\"}\n                data-instant={isInstant || undefined}\n                style={{\n                  transform: isVisible ? \"scale(1)\" : getInitialTransform(placement),\n                  pointerEvents: isVisible ? \"auto\" : \"none\",\n                }}\n              >\n                <Frame\n                  side={showArrow ? getFrameSide(position) : position}\n                  shapeMode={showArrow ? \"extend\" : undefined}\n                  path={showArrow ? ARROW_PATH : undefined}\n                  pathWidth={showArrow ? ARROW_WIDTH : undefined}\n                  cornerRadius={8}\n                  padding=\"none\"\n                >\n                  <div className={styles[\"content-frame\"]}>\n                    {content}\n                  </div>\n                </Frame>\n              </div>\n            </div>,\n            document.body\n          )}\n      </>\n    );\n  }\n);\n\nTooltip.displayName = \"Tooltip\";\n\nexport { Tooltip };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: inline-block;\n  }\n\n  .root {\n    position: absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n    pointer-events: none;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  [data-scrolling] .content {\n    transition: none;\n  }\n\n  .content-frame {\n    --background: var(--background-900);\n    --foreground: var(--foreground-200);\n    --border: var(--border-width-base) solid var(--background-700);\n\n    display: block;\n    padding: 0.25rem 0.5rem;\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border);\n    border-radius: var(--radius-sm);\n    font-size: var(--text-sm);\n    white-space: nowrap;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  trigger: string;\n  root: string;\n  content: string;\n  \"content-frame\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  }
};

export const reactAriaUrls: Record<string, string> = {
  "anchor": "",
  "badge": "",
  "banner": "",
  "breadcrumbs": "https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html",
  "button": "https://react-spectrum.adobe.com/react-aria/useButton.html",
  "card": "",
  "checkbox": "https://react-spectrum.adobe.com/react-aria/useCheckbox.html",
  "code": "",
  "color": "",
  "command": "",
  "confirmation": "",
  "date": "",
  "divider": "",
  "easing-preview": "",
  "expand": "",
  "flex": "",
  "frame": "",
  "gallery": "",
  "grid": "",
  "group": "",
  "input": "https://react-spectrum.adobe.com/react-aria/useTextField.html",
  "label": "https://react-spectrum.adobe.com/react-aria/useLabel.html",
  "list": "",
  "mask": "",
  "menu": "https://react-spectrum.adobe.com/react-aria/useMenu.html",
  "modal": "https://react-spectrum.adobe.com/react-aria/useDialog.html",
  "page": "",
  "panel": "",
  "popover": "https://react-spectrum.adobe.com/react-aria/usePopover.html",
  "progress": "https://react-spectrum.adobe.com/react-aria/useProgressBar.html",
  "radio": "https://react-spectrum.adobe.com/react-aria/useRadioGroup.html",
  "scroll": "",
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
  "expand": {
    "npm": [
      "gsap",
      "@gsap/react"
    ],
    "internal": []
  },
  "frame": {
    "npm": [],
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
  "panel": {
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
  "page": {
    "npm": [],
    "internal": []
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
  "scroll": {
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
  "version": "0.1.8"
};
