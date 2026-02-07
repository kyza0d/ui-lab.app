import type { ComponentRegistry } from './types.js';

export const componentRegistry: ComponentRegistry = {
  anchor: {
    id: "anchor",
    name: "Anchor",
    description: "Styled link with custom underline animation and popover preview on hover.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Anchor",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["popover","breadcrumbs"],
    tags: ["navigation","interactive","link"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible with focus visible states","Built on Popover for accessible overlay handling","Screen reader friendly"]},
    examples: [
    {
        "title": "Basic Anchor",
        "description": "A simple anchor component with custom underline. Hover to see the popover preview.",
        "code": "import React from 'react';\nimport { Anchor } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Anchor>\n      Learn more about this topic\n      <Anchor.Preview>\n        <div className=\"text-sm\">Preview content</div>\n      </Anchor.Preview>\n    </Anchor>\n  );\n}"
    }
],
  },

  badge: {
    id: "badge",
    name: "Badge",
    description: "Small badge for displaying labels or status indicators.",
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
    },
    {
        "title": "Badge Variants and Sizes",
        "description": "Showcases all available badge variants (default, success, warning, danger, info) and sizes (sm, md, lg). Also demonstrates pill-shaped badges.",
        "code": "import React from 'react';\nimport { Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"p-4 space-y-8\">\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Variants</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge variant=\"default\">Default</Badge>\n          <Badge variant=\"success\">Success</Badge>\n          <Badge variant=\"warning\">Warning</Badge>\n          <Badge variant=\"danger\">Danger</Badge>\n          <Badge variant=\"info\">Info</Badge>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Sizes</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge size=\"sm\">Small</Badge>\n          <Badge size=\"md\">Medium</Badge>\n          <Badge size=\"lg\">Large</Badge>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Pill Shape</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge pill variant=\"default\">Default Pill</Badge>\n          <Badge pill variant=\"success\">Success Pill</Badge>\n          <Badge pill variant=\"warning\">Warning Pill</Badge>\n          <Badge pill variant=\"danger\">Danger Pill</Badge>\n          <Badge pill variant=\"info\">Info Pill</Badge>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Variants with Sizes</h3>\n        <div className=\"space-y-3\">\n          <div className=\"flex gap-2 flex-wrap items-center\">\n            <Badge variant=\"success\" size=\"sm\">Small Success</Badge>\n            <Badge variant=\"success\" size=\"md\">Medium Success</Badge>\n            <Badge variant=\"success\" size=\"lg\">Large Success</Badge>\n          </div>\n          <div className=\"flex gap-2 flex-wrap items-center\">\n            <Badge variant=\"danger\" size=\"sm\">Small Danger</Badge>\n            <Badge variant=\"danger\" size=\"md\">Medium Danger</Badge>\n            <Badge variant=\"danger\" size=\"lg\">Large Danger</Badge>\n          </div>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">With Count</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Badge variant=\"default\" count={5} />\n          <Badge variant=\"success\" count={12} />\n          <Badge variant=\"warning\" count={99} />\n          <Badge variant=\"danger\" count={3} pill />\n          <Badge variant=\"info\" count={42} pill />\n        </div>\n      </div>\n    </div>\n  );\n}"
    }
],
  },

  banner: {
    id: "banner",
    name: "Banner",
    description: "Full-width banner for displaying important information, notifications, and alerts.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Banner",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","alert","badge"],
    tags: ["notification","layout","visual","full-width"],
    accessibility: {"hasAriaSupport":true,"notes":["Supports keyboard navigation for dismiss button","Semantic HTML structure","ARIA labels for accessibility","Focus management for interactive elements"]},
    examples: [
    {
        "title": "Basic Banner",
        "description": "A neutral note banner using background shades instead of semantic colors. The default banner variant for general-purpose messaging.",
        "code": "import React from 'react';\nimport { Banner } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Banner variant=\"note\" size=\"md\">\n      This is a note banner. Use it for general-purpose messages and information without semantic intent.\n    </Banner>\n  );\n}"
    }
],
  },

  breadcrumbs: {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    description: "Navigation component showing page hierarchy with links to parent pages.",
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
    description: "Clickable element that triggers an action.",
    category: "action",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Button",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["group"],
    tags: ["cta","interactive","primary-action"],
    accessibility: {"hasAriaSupport":true,"notes":["Supports keyboard navigation","Screen reader friendly"]},
    examples: [],
  },

  card: {
    id: "card",
    name: "Card",
    description: "Container for grouping related content.",
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
    },
    {
        "title": "User Profile Card",
        "description": "A practical user profile card combining header with avatar, status badge, content details, and action buttons. Demonstrates rich composition with user information display.",
        "code": "import { Card, Badge, Group } from 'ui-lab-components';\nimport { Mail, MapPin, MessageSquare } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-sm\">\n        {/* Header: Profile Section */}\n        <Card.Header className=\"flex items-start justify-between gap-4\">\n          <div className=\"flex items-start gap-3 flex-1\">\n            <div className=\"h-12 w-12 rounded-full bg-background-700 flex-shrink-0\" />\n            <div className=\"flex-1\">\n              <h3 className=\"font-semibold text-foreground-100\">Alex Johnson</h3>\n              <p className=\"text-sm text-foreground-400\">Product Designer</p>\n            </div>\n          </div>\n          <Badge variant=\"success\" size=\"sm\">Active</Badge>\n        </Card.Header>\n\n        {/* Body: Details */}\n        <Card.Body className=\"space-y-4\">\n          <div className=\"space-y-3\">\n            <div className=\"flex items-center gap-3 text-sm text-foreground-300\">\n              <Mail className=\"w-4 h-4 text-foreground-500\" />\n              <span>alex.johnson@company.com</span>\n            </div>\n            <div className=\"flex items-center gap-3 text-sm text-foreground-300\">\n              <MapPin className=\"w-4 h-4 text-foreground-500\" />\n              <span>San Francisco, CA</span>\n            </div>\n          </div>\n\n          <p className=\"text-sm text-foreground-300 leading-relaxed\">\n            Passionate about creating intuitive user experiences and mentoring design teams. Always exploring new design patterns.\n          </p>\n        </Card.Body>\n\n        {/* Footer: Actions */}\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group variant=\"ghost\" spacing=\"sm\">\n            <Group.Button variant=\"outline\" size=\"md\" className=\"flex-1\">\n              <MessageSquare className=\"w-4 h-4\" />\n              <span>Message</span>\n            </Group.Button>\n            <Group.Button variant=\"primary\" size=\"md\" className=\"flex-1\">\n              View Profile\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
    },
    {
        "title": "Settings Panel Card",
        "description": "A card-based settings panel with grouped toggle controls and action buttons. Shows how cards structure configuration options with clear labeling and actions.",
        "code": "'use client';\n\nimport React, { useState } from 'react';\nimport { Card, Button, Group, Badge, Checkbox } from 'ui-lab-components';\nimport { Bell, Eye, Lock } from 'lucide-react';\n\nexport default function Example() {\n  const [notificationsEnabled, setNotificationsEnabled] = useState(true);\n  const [previewMode, setPreviewMode] = useState(false);\n  const [privateMode, setPrivateMode] = useState(false);\n\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-md\">\n        <Card.Header className=\"flex items-center justify-between gap-3\">\n          <h3 className=\"font-semibold text-foreground-100\">Preferences</h3>\n          <Badge variant=\"info\" size=\"sm\">3 settings</Badge>\n        </Card.Header>\n\n        <Card.Body className=\"space-y-3\">\n          {/* Notification Setting */}\n          <div className=\"flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors\">\n            <Bell className=\"w-4 h-4 text-foreground-500 mt-1 flex-shrink-0\" />\n            <Checkbox\n              id=\"notifications\"\n              checked={notificationsEnabled}\n              onChange={(e) => setNotificationsEnabled(e.target.checked)}\n              label={\n                <div className=\"ml-1\">\n                  <p className=\"text-sm font-medium text-foreground-100\">Notifications</p>\n                  <p className=\"text-xs text-foreground-400\">Stay updated with alerts</p>\n                </div>\n              }\n              size=\"md\"\n            />\n          </div>\n\n          {/* Preview Mode Setting */}\n          <div className=\"flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors\">\n            <Eye className=\"w-4 h-4 text-foreground-500 mt-1 flex-shrink-0\" />\n            <Checkbox\n              id=\"preview\"\n              checked={previewMode}\n              onChange={(e) => setPreviewMode(e.target.checked)}\n              label={\n                <div className=\"ml-1\">\n                  <p className=\"text-sm font-medium text-foreground-100\">Preview Mode</p>\n                  <p className=\"text-xs text-foreground-400\">See changes in real-time</p>\n                </div>\n              }\n              size=\"md\"\n            />\n          </div>\n\n          {/* Privacy Mode Setting */}\n          <div className=\"flex items-start gap-3 py-2 px-2 rounded hover:bg-background-900 transition-colors\">\n            <Lock className=\"w-4 h-4 text-foreground-500 mt-1 flex-shrink-0\" />\n            <Checkbox\n              id=\"privacy\"\n              checked={privateMode}\n              onChange={(e) => setPrivateMode(e.target.checked)}\n              label={\n                <div className=\"ml-1\">\n                  <p className=\"text-sm font-medium text-foreground-100\">Privacy Mode</p>\n                  <p className=\"text-xs text-foreground-400\">Hide sensitive data</p>\n                </div>\n              }\n              size=\"md\"\n            />\n          </div>\n        </Card.Body>\n\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group>\n            <Group.Button variant=\"ghost\" size=\"md\" className=\"flex-1\">\n              Reset to Defaults\n            </Group.Button>\n            <Group.Button variant=\"primary\" size=\"md\" className=\"flex-1\">\n              Save Changes\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
    },
    {
        "title": "Task Progress Card",
        "description": "A project task card with progress tracking, team assignments, due dates, and status. Shows how cards organize complex project information with clear visual hierarchy.",
        "code": "import { Card, Badge, Group, Progress } from 'ui-lab-components';\nimport { Calendar, CheckCircle2 } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-sm\">\n        {/* Header: Title and Status */}\n        <Card.Header className=\"flex items-start justify-between gap-3\">\n          <div className=\"flex-1 min-w-0\">\n            <h3 className=\"font-semibold text-foreground-100\">Design System Audit</h3>\n            <p className=\"text-xs text-foreground-400 mt-1\">Component documentation</p>\n          </div>\n          <Badge variant=\"info\" size=\"sm\">In Progress</Badge>\n        </Card.Header>\n\n        {/* Body: Task Details */}\n        <Card.Body className=\"space-y-4\">\n          {/* Description */}\n          <p className=\"text-sm text-foreground-300\">\n            Complete comprehensive audit of existing design system components and document best practices.\n          </p>\n\n          {/* Progress Bar using UI Lab Progress component */}\n          <Progress\n            value={65}\n            max={100}\n            label=\"Progress\"\n            showValue\n            size=\"sm\"\n            variant=\"default\"\n          />\n\n          {/* Team & Metadata */}\n          <div className=\"grid grid-cols-2 gap-3 pt-2 border-t border-background-800\">\n            <div>\n              <p className=\"text-xs text-foreground-500 uppercase tracking-wide mb-2\">Assigned To</p>\n              <div className=\"flex -space-x-2\">\n                <div className=\"w-6 h-6 rounded-full bg-background-700 border border-background-800 flex items-center justify-center text-[10px] font-semibold text-foreground-300\">\n                  SA\n                </div>\n                <div className=\"w-6 h-6 rounded-full bg-background-700 border border-background-800 flex items-center justify-center text-[10px] font-semibold text-foreground-300\">\n                  JD\n                </div>\n              </div>\n            </div>\n            <div>\n              <p className=\"text-xs text-foreground-500 uppercase tracking-wide mb-2\">Due Date</p>\n              <div className=\"flex items-center gap-1.5\">\n                <Calendar className=\"w-4 h-4 text-foreground-500\" />\n                <span className=\"text-sm font-medium text-foreground-300\">Mar 15</span>\n              </div>\n            </div>\n          </div>\n        </Card.Body>\n\n        {/* Footer: Actions */}\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group>\n            <Group.Button variant=\"ghost\" size=\"md\" className=\"flex-1\">\n              View Details\n            </Group.Button>\n            <Group.Button variant=\"primary\" size=\"md\" className=\"flex-1 gap-2\">\n              <CheckCircle2 className=\"w-4 h-4\" />\n              Complete\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
    },
    {
        "title": "Data Summary Card",
        "description": "A dashboard card displaying key metrics with header, summary values, and comparison info. Shows how cards present quantitative data with visual hierarchy.",
        "code": "import { Card, Badge, Group, Button } from 'ui-lab-components';\nimport { TrendingUp, MoreVertical } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4\">\n      <Card className=\"w-full max-w-sm\">\n        {/* Header with Title and Actions */}\n        <Card.Header className=\"flex items-center justify-between\">\n          <div>\n            <h3 className=\"font-semibold text-foreground-100\">Revenue</h3>\n            <p className=\"text-xs text-foreground-400 mt-1\">Last 30 days</p>\n          </div>\n          <Button variant=\"ghost\" size=\"sm\" className=\"h-8 w-8 p-0\">\n            <MoreVertical className=\"w-4 h-4\" />\n          </Button>\n        </Card.Header>\n\n        {/* Body: Primary Metric */}\n        <Card.Body className=\"space-y-4\">\n          <div>\n            <p className=\"text-xs text-foreground-500 uppercase tracking-wide mb-1\">Total Revenue</p>\n            <p className=\"text-3xl font-bold text-foreground-100\">$24,580</p>\n          </div>\n\n          {/* Secondary Metrics Grid */}\n          <div className=\"grid grid-cols-3 gap-3 pt-3 border-t border-background-700\">\n            <div>\n              <p className=\"text-xs text-foreground-500 uppercase tracking-wide mb-2\">Orders</p>\n              <p className=\"text-lg font-semibold text-foreground-100\">342</p>\n            </div>\n            <div>\n              <p className=\"text-xs text-foreground-500 uppercase tracking-wide mb-2\">Average</p>\n              <p className=\"text-lg font-semibold text-foreground-100\">$72</p>\n            </div>\n            <div>\n              <p className=\"text-xs text-foreground-500 uppercase tracking-wide mb-2\">Growth</p>\n              <div className=\"flex items-center gap-1\">\n                <TrendingUp className=\"w-4 h-4 text-green-500\" />\n                <p className=\"text-lg font-semibold text-green-500\">12%</p>\n              </div>\n            </div>\n          </div>\n\n          {/* Status Badge */}\n          <div className=\"flex gap-2 flex-wrap pt-2\">\n            <Badge variant=\"success\" size=\"sm\">On Track</Badge>\n            <Badge variant=\"info\" size=\"sm\">Updated Today</Badge>\n          </div>\n        </Card.Body>\n\n        {/* Footer: Actions */}\n        <Card.Footer className=\"border-t border-background-700 pt-4\">\n          <Group>\n            <Group.Button variant=\"ghost\" size=\"md\" className=\"flex-1\">\n              Export\n            </Group.Button>\n            <Group.Button variant=\"outline\" size=\"md\" className=\"flex-1\">\n              View Details\n            </Group.Button>\n          </Group>\n        </Card.Footer>\n      </Card>\n    </div>\n  );\n}"
    }
],
  },

  checkbox: {
    id: "checkbox",
    name: "Checkbox",
    description: "Input for selecting one or multiple options.",
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
        "code": "'use client';\n\nimport React from 'react';\nimport { Checkbox } from 'ui-lab-components';\n\nexport default function Example() {\n  const [checked, setChecked] = React.useState(false);\n\n  return (\n    <Checkbox\n      checked={checked}\n      onChange={(e) => setChecked(e.target.checked)}\n      label=\"Accept terms and conditions\"\n    />\n  );\n}"
    },
    {
        "title": "Checkbox Group with Descriptions",
        "description": "Multiple checkboxes grouped together as a settings panel. Each checkbox includes a label and helper text for context.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Checkbox, Card, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [notifications, setNotifications] = React.useState({\n    email: true,\n    push: false,\n    sms: false,\n    marketing: false,\n  });\n\n  const handleChange = (key: keyof typeof notifications) => (e: React.ChangeEvent<HTMLInputElement>) => {\n    setNotifications(prev => ({ ...prev, [key]: e.target.checked }));\n  };\n\n  return (\n    <Card>\n      <Card.Header>\n        <h3 className=\"text-lg font-medium text-foreground-100\">Notification Preferences</h3>\n        <p className=\"text-sm text-foreground-400\">Choose how you want to be notified.</p>\n      </Card.Header>\n      <Card.Body>\n        <Flex direction=\"column\" gap=\"lg\">\n          <Checkbox\n            checked={notifications.email}\n            onChange={handleChange('email')}\n            label=\"Email notifications\"\n            helperText=\"Receive updates about your account activity via email.\"\n          />\n          <Checkbox\n            checked={notifications.push}\n            onChange={handleChange('push')}\n            label=\"Push notifications\"\n            helperText=\"Get instant alerts on your device for important updates.\"\n          />\n          <Checkbox\n            checked={notifications.sms}\n            onChange={handleChange('sms')}\n            label=\"SMS notifications\"\n            helperText=\"Receive text messages for critical alerts and reminders.\"\n          />\n          <Checkbox\n            checked={notifications.marketing}\n            onChange={handleChange('marketing')}\n            label=\"Marketing emails\"\n            helperText=\"Stay informed about new features, tips, and special offers.\"\n          />\n        </Flex>\n      </Card.Body>\n    </Card>\n  );\n}"
    }
],
  },

  color: {
    id: "color",
    name: "Color",
    description: "Custom color picker with 2D canvas, hue slider, and format selection.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Color",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","select"],
    tags: ["color","form","user-input","interactive"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible sliders","ARIA labels for color components","Visual focus indicators","Screen reader announcements for color values"]},
    examples: [
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
        "code": "import React, { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [color, setColor] = useState('#3B82F6');\n  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');\n\n  const handleFormatChange = () => {\n    setFormat(format === 'hex' ? 'rgb' : 'hex');\n  };\n\n  return (\n    <div className=\"p-4 space-y-4\">\n      <div>\n        <div className=\"flex items-center justify-between mb-3\">\n          <p className=\"text-sm text-foreground-300\">\n            Selected color: <code className=\"text-accent-500 font-mono\">{color}</code>\n          </p>\n          <button\n            onClick={handleFormatChange}\n            className=\"px-3 py-1 text-xs bg-foreground-800 hover:bg-foreground-700 text-foreground-100 rounded transition-colors\"\n          >\n            Format: {format.toUpperCase()}\n          </button>\n        </div>\n        <Color\n          value={color}\n          onChange={setColor}\n          format={format}\n          defaultValue=\"#3B82F6\"\n        />\n      </div>\n      <div className=\"mt-4 p-3 bg-foreground-850 rounded border border-foreground-800\">\n        <p className=\"text-xs text-foreground-300\">\n          <strong>Tip:</strong> Click the format button to switch between hex and RGB output formats.\n          This is useful when you need to copy colors in different formats for different contexts.\n        </p>\n      </div>\n    </div>\n  );\n}"
    }
],
  },

  command: {
    id: "command",
    name: "Command",
    description: "Searchable command palette for quick action access.",
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
        "code": "'use client';\n\nimport React from 'react';\nimport { CommandPalette, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [open, setOpen] = React.useState(false);\n\n  const commands = [\n    {\n      id: 'search',\n      label: 'Search',\n      description: 'Search documents',\n      shortcut: '⌘F',\n      action: () => console.log('Search'),\n    },\n    {\n      id: 'create',\n      label: 'Create new',\n      description: 'Create a new document',\n      shortcut: '⌘N',\n      action: () => console.log('Create'),\n    },\n    {\n      id: 'settings',\n      label: 'Settings',\n      description: 'Open application settings',\n      shortcut: '⌘,',\n      action: () => console.log('Settings'),\n    },\n  ];\n\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>\n        Open Palette (⌘K)\n      </Button>\n      <CommandPalette\n        open={open}\n        onOpenChange={setOpen}\n        commands={commands}\n      />\n    </>\n  );\n}"
    }
],
  },

  confirm: {
    id: "confirm",
    name: "Confirm",
    description: "Confirm dialog for critical user actions.",
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

  date: {
    id: "date",
    name: "Date",
    description: "Minimal date picker with keyboard navigation and full accessibility support.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Date",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","select"],
    tags: ["date","selection","input","interactive"],
    accessibility: {"hasAriaSupport":true,"notes":["Full keyboard navigation with arrow keys","Enter/Space to select dates","PageUp/PageDown for month navigation","Screen reader friendly with semantic HTML","Focus management with visible focus ring","Disabled dates properly announced"]},
    examples: [],
  },

  divider: {
    id: "divider",
    name: "Divider",
    description: "Horizontal or vertical separator for dividing content.",
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
],
  },

  flex: {
    id: "flex",
    name: "Flex",
    description: "Flexible layout component with container query support for responsive designs.",
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
    description: "Collapsible disclosure component for expanding and collapsing sections.",
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

  frame: {
    id: "frame",
    name: "Frame",
    description: "Decorative border/frame component with advanced SVG path support.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Frame",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","modal"],
    tags: ["container","decorative","border","svg","custom-shapes"],
    accessibility: {"hasAriaSupport":false,"notes":["Decorative SVG elements are properly hidden from assistive technology"]},
    examples: [
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
        "code": "import { Frame } from 'ui-lab-components';\n\nconst TAB_WIDTH = 120;\nconst TAB_PATH = \"M 0 0 C 20 0 20 -24 40 -24 L 80 -24 C 100 -24 100 0 120 0\";\n\nconst Example3 = () => {\n  return (\n    <div className=\"flex flex-row gap-0 p-12 items-center justify-center bg-background-950 min-h-[400px]\">\n      {/* Mock Sidebar */}\n      <div className=\"flex flex-col items-end justify-center space-y-8 pr-6 border-background-800/50 h-64\">\n        <div className=\"text-foreground-600 font-medium cursor-pointer hover:text-foreground-400 transition-colors\">Dashboard</div>\n        <div className=\"text-accent-500 font-bold cursor-default\">Settings</div>\n        <div className=\"text-foreground-600 font-medium cursor-pointer hover:text-foreground-400 transition-colors\">Profile</div>\n      </div>\n\n      {/* Frame content - visually connecting to \"Settings\" */}\n      <div className=\"-ml-[1.5px]\"> {/* Overlap border slightly to merge visual connection */}\n        <Frame\n          side=\"left\"\n          shapeMode=\"extend\"\n          path={TAB_PATH}\n          pathWidth={TAB_WIDTH}\n          fill=\"var(--color-background-900)\"\n          style={{ color: \"var(--background-700)\" }}\n          className=\"w-80 h-64\"\n          padding=\"large\"\n          cornerRadius={16}\n        >\n          <div className=\"h-full flex flex-col justify-center\">\n            <h2 className=\"text-2xl font-bold text-foreground-50 mb-4\">Settings</h2>\n            <div className=\"space-y-3\">\n              <div className=\"h-2 w-2/3 bg-background-800 rounded\"></div>\n              <div className=\"h-2 w-1/2 bg-background-800 rounded\"></div>\n              <div className=\"h-2 w-3/4 bg-background-800 rounded\"></div>\n            </div>\n          </div>\n        </Frame>\n      </div>\n    </div>\n  );\n};\n\nexport default Example3;"
    }
],
  },

  gallery: {
    id: "gallery",
    name: "Gallery",
    description: "Responsive grid layout for displaying media content, images, videos, and product cards.",
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
    }
],
  },

  grid: {
    id: "grid",
    name: "Grid",
    description: "Powerful grid layout component with container query support for responsive designs.",
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
    description: "Flexible container for grouping Button, Input, and Select components with unified styling.",
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
    },
    {
        "title": "Active Buttons",
        "description": "Ghost variant automatically applies default styling with full border radius to active buttons, while inactive buttons remain ghost. Perfect for tabs and pagination.",
        "code": "import React from 'react';\nimport { Group } from 'ui-lab-components';\n\nexport default function Example() {\n  const [activeTab, setActiveTab] = React.useState('overview');\n\n  return (\n    <div className=\"space-y-6\">\n      {/* Ghost variant with active state - tab-like interface */}\n      <div className=\"space-y-2\">\n        <label className=\"text-sm text-foreground-300\">Ghost variant (tabs & pagination)</label>\n        <Group variant=\"ghost\">\n          <Group.Button\n            active={activeTab === 'overview'}\n            onClick={() => setActiveTab('overview')}\n          >\n            Overview\n          </Group.Button>\n          <Group.Button\n            active={activeTab === 'details'}\n            onClick={() => setActiveTab('details')}\n          >\n            Details\n          </Group.Button>\n          <Group.Button\n            active={activeTab === 'settings'}\n            onClick={() => setActiveTab('settings')}\n          >\n            Settings\n          </Group.Button>\n        </Group>\n      </div>\n\n      {/* Ghost variant pagination style */}\n      <div className=\"space-y-2\">\n        <label className=\"text-sm text-foreground-300\">Ghost variant pagination</label>\n        <Group variant=\"ghost\" spacing=\"none\">\n          {[1, 2, 3, 4, 5].map((page) => (\n            <Group.Button\n              key={page}\n              active={page === 2}\n              onClick={() => {}}\n            >\n              {page}\n            </Group.Button>\n          ))}\n        </Group>\n      </div>\n\n      {/* Primary variant with active state */}\n      <div className=\"space-y-2\">\n        <label className=\"text-sm text-foreground-300\">Primary variant with active</label>\n        <Group variant=\"primary\">\n          <Group.Button active>Active</Group.Button>\n          <Group.Button>Inactive</Group.Button>\n          <Group.Button>Inactive</Group.Button>\n        </Group>\n      </div>\n    </div>\n  );\n}"
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
    },
    {
        "title": "Validation States",
        "description": "Input fields with error and success validation states, including helper text for user feedback.",
        "code": "import React from 'react';\nimport { Input, Label } from 'ui-lab-components';\nimport { FaCircleExclamation, FaCircleCheck } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-6 w-full max-w-sm\">\n      {/* Error State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label error helperText=\"Please enter a valid email address\" helperTextError>\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          error\n          defaultValue=\"invalid-email\"\n          suffixIcon={<FaCircleExclamation className=\"text-danger-600\" size={14} />}\n        />\n      </div>\n\n      {/* Success State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label helperText=\"Email address is available\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          defaultValue=\"user@example.com\"\n          suffixIcon={<FaCircleCheck className=\"text-success-600\" size={14} />}\n          className=\"border-success-600 focus:border-success-600\"\n        />\n      </div>\n\n      {/* Default State with Helper Text */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label required helperText=\"We'll never share your email with anyone else.\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n        />\n      </div>\n    </div>\n  );\n}"
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

  list: {
    id: "list",
    name: "List",
    description: "Compound component for displaying item collections with selection and actions.",
    category: "composition",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "List",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","table"],
    tags: ["list","items","collections","selection","actions"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses list role for semantic structure","Supports interactive items with keyboard navigation","Proper ARIA labels for selection states"]},
    examples: [
    {
        "title": "Basic List",
        "description": "A simple list displaying basic items with selection and interaction support.",
        "code": "import { List } from 'ui-lab-components';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <List ariaLabel=\"Basic List Example\">\n      <List.Header>\n        <h2>Items</h2>\n      </List.Header>\n      <List.Item interactive>Item One</List.Item>\n      <List.Item interactive>Item Two</List.Item>\n      <List.Item interactive>Item Three</List.Item>\n      <List.Footer align=\"center\">\n        <Button variant=\"primary\" size=\"sm\">\n          Load More\n        </Button>\n      </List.Footer>\n    </List>\n  );\n}"
    }
],
  },

  mask: {
    id: "mask",
    name: "Mask",
    description: "Container component that creates fading edge effects on content.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Mask",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","scroll"],
    tags: ["container","visual","effect","fade"],
    accessibility: {"hasAriaSupport":false,"notes":["Visual effect only, does not affect content semantics"]},
    examples: [
    {
        "title": "Mask - Read More Effect",
        "description": "Using the mask component to create a smooth fade effect on long text content.",
        "code": "import React from 'react';\nimport { Mask } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"max-w-md mx-auto p-4 border rounded-lg bg-background\">\n      <h3 className=\"text-lg font-semibold mb-2\">Terms of Service</h3>\n      <Mask variant=\"y\" className=\"h-48 bg-muted/30 rounded-md p-4\">\n        <div className=\"space-y-4 text-sm text-muted-foreground\">\n          <p>\n            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n          </p>\n          <p>\n            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n          </p>\n          <p>\n            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n          </p>\n          <p>\n            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.\n          </p>\n        </div>\n      </Mask>\n    </div>\n  );\n}"
    },
    {
        "title": "Mask - Text Gradient",
        "description": "Using the mask component to create a generic gradient effect on text elements.",
        "code": "import React from 'react';\nimport { Mask } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full flex flex-col items-center justify-center space-y-8 p-8\">\n      <div className=\"w-full max-w-2xl\">\n        <Mask\n          variant=\"gradient\"\n          gradient=\"linear-gradient(to right, var(--foreground-200), var(--accent-500))\"\n        >\n          <div className=\"whitespace-nowrap text-3xl text-center\">\n            Gradient\n          </div>\n        </Mask>\n      </div>\n    </div>\n  );\n}"
    }
],
  },

  menu: {
    id: "menu",
    name: "Menu",
    description: "Context menu for right-click actions.",
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
        "code": "import React from 'react';\nimport { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>Copy</Menu.Item>\n        <Menu.Item>Paste</Menu.Item>\n        <Menu.Item disabled>Cut</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    },
    {
        "title": "Nested Menu",
        "description": "Context menu with submenus for organizing related actions. Hover over items with arrows to reveal nested options.",
        "code": "import React from 'react';\nimport { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>New File</Menu.Item>\n        <Menu.Item>New Folder</Menu.Item>\n        <Menu.Separator />\n        <Menu.Sub>\n          <Menu.SubTrigger>Open with...</Menu.SubTrigger>\n          <Menu.SubContent>\n            <Menu.Item>VS Code</Menu.Item>\n            <Menu.Item>Sublime Text</Menu.Item>\n            <Menu.Item>Vim</Menu.Item>\n            <Menu.Separator />\n            <Menu.Item>Choose another app...</Menu.Item>\n          </Menu.SubContent>\n        </Menu.Sub>\n        <Menu.Sub>\n          <Menu.SubTrigger>Share</Menu.SubTrigger>\n          <Menu.SubContent>\n            <Menu.Item>Copy Link</Menu.Item>\n            <Menu.Item>Email</Menu.Item>\n            <Menu.Sub>\n              <Menu.SubTrigger>Social Media</Menu.SubTrigger>\n              <Menu.SubContent>\n                <Menu.Item>Twitter</Menu.Item>\n                <Menu.Item>LinkedIn</Menu.Item>\n                <Menu.Item>Facebook</Menu.Item>\n              </Menu.SubContent>\n            </Menu.Sub>\n          </Menu.SubContent>\n        </Menu.Sub>\n        <Menu.Separator />\n        <Menu.Item>Rename</Menu.Item>\n        <Menu.Item disabled>Delete</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    }
],
  },

  modal: {
    id: "modal",
    name: "Modal",
    description: "Modal dialog for focusing user attention on important content.",
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
        "code": "'use client';\n\nimport React from 'react';\nimport { Modal, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>\n        <Modal.Header>Modal Title</Modal.Header>\n        <Modal.Body>This is the modal content. It displays important information or actions.</Modal.Body>\n        <Modal.Footer>Modal Footer</Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
    },
    {
        "title": "Form Modal",
        "description": "A modal dialog containing a form for editing user profile settings. Demonstrates using form inputs, labels, and action buttons within a modal.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Modal, Button, Input, Label, TextArea, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n  const [formData, setFormData] = React.useState({\n    name: 'John Doe',\n    email: 'john.doe@example.com',\n    bio: 'Software developer passionate about building great user experiences.',\n  });\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    // Handle form submission\n    setIsOpen(false);\n  };\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size=\"md\">\n        <Modal.Header>Edit Profile</Modal.Header>\n        <Modal.Body>\n          <form id=\"profile-form\" onSubmit={handleSubmit}>\n            <Flex direction=\"column\" gap=\"md\">\n              <div>\n                <Label htmlFor=\"name\" required>\n                  Full Name\n                </Label>\n                <Input\n                  id=\"name\"\n                  value={formData.name}\n                  onChange={(e) =>\n                    setFormData({ ...formData, name: e.target.value })\n                  }\n                  placeholder=\"Enter your name\"\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"email\" required>\n                  Email Address\n                </Label>\n                <Input\n                  id=\"email\"\n                  type=\"email\"\n                  value={formData.email}\n                  onChange={(e) =>\n                    setFormData({ ...formData, email: e.target.value })\n                  }\n                  placeholder=\"Enter your email\"\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"bio\">Bio</Label>\n                <TextArea\n                  id=\"bio\"\n                  value={formData.bio}\n                  onChange={(e) =>\n                    setFormData({ ...formData, bio: e.target.value })\n                  }\n                  placeholder=\"Tell us about yourself\"\n                  rows={3}\n                />\n              </div>\n            </Flex>\n          </form>\n        </Modal.Body>\n        <Modal.Footer>\n          <Flex gap=\"sm\" justify=\"flex-end\">\n            <Button variant=\"ghost\" onClick={() => setIsOpen(false)}>\n              Cancel\n            </Button>\n            <Button type=\"submit\" form=\"profile-form\">\n              Save Changes\n            </Button>\n          </Flex>\n        </Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
    }
],
  },

  popover: {
    id: "popover",
    name: "Popover",
    description: "Popover component for displaying content on demand.",
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
    description: "Progress bar component for showing completion status.",
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
    description: "Radio button for selecting one option from a group.",
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
    },
    {
        "title": "Radio with Descriptions",
        "description": "Radio buttons with titles and descriptive text. Useful for plan selection, settings, or any choice that benefits from additional context.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Radio } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Radio.Group defaultValue=\"pro\" className=\"w-full max-w-md\">\n      <Radio.Item\n        value=\"starter\"\n        label=\"Starter Plan\"\n        description=\"Perfect for individuals and small projects. Includes 5GB storage and basic support.\"\n      />\n      <Radio.Item\n        value=\"pro\"\n        label=\"Pro Plan\"\n        description=\"Ideal for growing teams. Includes 50GB storage, priority support, and advanced analytics.\"\n      />\n      <Radio.Item\n        value=\"enterprise\"\n        label=\"Enterprise Plan\"\n        description=\"For large organizations. Unlimited storage, dedicated support, and custom integrations.\"\n      />\n    </Radio.Group>\n  );\n}"
    }
],
  },

  scroll: {
    id: "scroll",
    name: "Scroll",
    description: "Scroll area component with custom scrollbars for overflowing content.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Scroll",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["scroll","overflow","layout","scrollbar"],
    accessibility: {"hasAriaSupport":false,"notes":["Custom scrollbar implementation for visual consistency"]},
    examples: [
    {
        "title": "Basic Scroll",
        "description": "A simple scrollable container with fixed height. Use this to display overflow content in a constrained space.",
        "code": "import { Scroll } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className='overflow-hidden' style={{ height: '200px', width: '300px' }}>\n      <Scroll>\n        <div>\n          <p>This is scrollable content.</p>\n          <p>Add more content here to see scrolling in action.</p>\n          <p>The Scroll component manages overflow elegantly.</p>\n          <p>You can scroll through all of this content.</p>\n          <p>Perfect for constrained layouts.</p>\n        </div>\n      </Scroll>\n    </div>\n  );\n}"
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
        "code": "import React from 'react';\nimport { Select } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Select>\n      <Select.Trigger>\n        <Select.Value placeholder=\"Select an option\" />\n      </Select.Trigger>\n      <Select.Content>\n        <Select.List>\n          <Select.Item value=\"option1\">Option 1</Select.Item>\n          <Select.Item value=\"option2\">Option 2</Select.Item>\n          <Select.Item value=\"option3\">Option 3</Select.Item>\n        </Select.List>\n      </Select.Content>\n    </Select>\n  );\n}"
    },
    {
        "title": "Searchable Select",
        "description": "A filterable select component with search input. Type to filter through a large list of options.",
        "code": "import React from 'react';\nimport { Select, Searchable } from 'ui-lab-components';\n\nconst countries = [\n  { value: 'us', label: 'United States' },\n  { value: 'ca', label: 'Canada' },\n  { value: 'mx', label: 'Mexico' },\n  { value: 'br', label: 'Brazil' },\n  { value: 'ar', label: 'Argentina' },\n  { value: 'uk', label: 'United Kingdom' },\n  { value: 'fr', label: 'France' },\n  { value: 'de', label: 'Germany' },\n  { value: 'it', label: 'Italy' },\n  { value: 'es', label: 'Spain' },\n  { value: 'pt', label: 'Portugal' },\n  { value: 'nl', label: 'Netherlands' },\n  { value: 'be', label: 'Belgium' },\n  { value: 'ch', label: 'Switzerland' },\n  { value: 'at', label: 'Austria' },\n  { value: 'se', label: 'Sweden' },\n  { value: 'no', label: 'Norway' },\n  { value: 'dk', label: 'Denmark' },\n  { value: 'fi', label: 'Finland' },\n  { value: 'pl', label: 'Poland' },\n  { value: 'jp', label: 'Japan' },\n  { value: 'cn', label: 'China' },\n  { value: 'kr', label: 'South Korea' },\n  { value: 'in', label: 'India' },\n  { value: 'au', label: 'Australia' },\n  { value: 'nz', label: 'New Zealand' },\n];\n\nexport default function Example() {\n  return (\n    <Select>\n      <Searchable.Trigger placeholder=\"Search countries...\" />\n      <Searchable.Content searchPlaceholder=\"Type to filter...\">\n        <Select.List>\n          {countries.map((country) => (\n            <Select.Item key={country.value} value={country.value}>\n              {country.label}\n            </Select.Item>\n          ))}\n        </Select.List>\n      </Searchable.Content>\n    </Select>\n  );\n}"
    }
],
  },

  slider: {
    id: "slider",
    name: "Slider",
    description: "Slider component for selecting a value from a range.",
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
    description: "Toggle switch for boolean input.",
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
    description: "Table component for displaying and organizing tabular data.",
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
    description: "Tabbed interface for organizing content into sections.",
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
    },
    {
        "title": "Vertical Tabs (Sidebar)",
        "description": "A vertical tab layout ideal for settings pages or sidebar navigation. Tabs are stacked vertically with content panels beside them.",
        "code": "import React from 'react';\nimport { Tabs, TabsList, TabsTrigger, TabsContent, Card } from 'ui-lab-components';\nimport { User, Settings, Bell, Shield } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4 min-h-[400px]\">\n      <Card className=\"w-full max-w-2xl\">\n        <Tabs defaultValue=\"profile\" className=\"flex flex-row\">\n          {/* Vertical tab list - styled as sidebar */}\n          <TabsList\n            aria-label=\"Settings sections\"\n            className=\"flex-col items-stretch justify-start h-auto w-48 border-r border-background-700 rounded-none bg-transparent p-2\"\n          >\n            <TabsTrigger value=\"profile\" icon={<User className=\"w-4 h-4\" />} className=\"justify-start\">\n              Profile\n            </TabsTrigger>\n            <TabsTrigger value=\"notifications\" icon={<Bell className=\"w-4 h-4\" />} className=\"justify-start\">\n              Notifications\n            </TabsTrigger>\n            <TabsTrigger value=\"security\" icon={<Shield className=\"w-4 h-4\" />} className=\"justify-start\">\n              Security\n            </TabsTrigger>\n            <TabsTrigger value=\"preferences\" icon={<Settings className=\"w-4 h-4\" />} className=\"justify-start\">\n              Preferences\n            </TabsTrigger>\n          </TabsList>\n\n          {/* Content panels */}\n          <div className=\"flex-1 p-6\">\n            <TabsContent value=\"profile\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Profile Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Manage your personal information and how others see you on the platform.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-2/3 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </TabsContent>\n\n            <TabsContent value=\"notifications\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Notification Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Control how and when you receive alerts and updates.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-32 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-background-700 rounded\" />\n                  <div className=\"h-4 w-40 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-28 bg-background-800 rounded\" />\n                </div>\n              </div>\n            </TabsContent>\n\n            <TabsContent value=\"security\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Security Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Protect your account with passwords, two-factor authentication, and more.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-24 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-48 bg-background-700/50 rounded\" />\n                </div>\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-32 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-40 bg-background-700/50 rounded\" />\n                </div>\n              </div>\n            </TabsContent>\n\n            <TabsContent value=\"preferences\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">General Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Customize your experience with theme, language, and display options.\n              </p>\n              <div className=\"grid grid-cols-2 gap-3\">\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </TabsContent>\n          </div>\n        </Tabs>\n      </Card>\n    </div>\n  );\n}"
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
    category: "feedback",
    experimental: true,
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
