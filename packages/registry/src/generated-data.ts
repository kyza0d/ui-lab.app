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
      },
      {
        "name": "styles",
        "type": "AnchorStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      },
      {
        "name": "preview",
        "type": "ReactNode",
        "required": false,
        "description": "Preview content to show in a tooltip on hover. Use this in server components instead of <Anchor.Preview>."
      }
    ],
    "subComponents": {
      "AnchorPreview": {
        "props": []
      }
    },
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
        "type": "string",
        "required": false,
        "defaultValue": "default",
        "description": "Visual color style of the badge"
      },
      {
        "name": "size",
        "type": "sm | md | lg",
        "required": false,
        "defaultValue": "sm",
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
      },
      {
        "name": "styles",
        "type": "BadgeStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
  "button": {
    "props": [
      {
        "name": "variant",
        "type": "string",
        "required": false,
        "defaultValue": "default",
        "description": "Variant class appended to the root element. Accepts any string."
      },
      {
        "name": "size",
        "type": "ButtonSize",
        "required": false,
        "defaultValue": "md",
        "description": "Size class appended to the root element. Accepts any string."
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
        "type": "ReactNode | ButtonIconSlots",
        "required": false,
        "description": "Icon slots rendered before (left) or after (right) the button label"
      },
      {
        "name": "href",
        "type": "string",
        "required": false,
        "description": "Renders the button as an anchor element when provided"
      },
      {
        "name": "target",
        "type": "HTMLAttributeAnchorTarget",
        "required": false,
        "description": "Browsing context for the anchor variant (e.g. \"_blank\")"
      },
      {
        "name": "styles",
        "type": "ButtonStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      }
    ],
    "examples": [
      {
        "title": "Button Variants",
        "description": "All available button variants including primary, default, secondary, outline, and ghost styles.",
        "code": "import React from 'react'\nimport { Button } from 'ui-lab-components'\n\nexport default function Example() {\n  return (\n    <div className=\"p-4 space-y-8\">\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Primary Variant</h3>\n        <div className=\"flex gap-2 flex-wrap\">\n          <Button variant=\"primary\">Primary Button</Button>\n          <Button variant=\"primary\" disabled>Disabled</Button>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Default Variant</h3>\n        <div className=\"flex gap-2 flex-wrap\">\n          <Button variant=\"default\">Default Button</Button>\n          <Button variant=\"default\" disabled>Disabled</Button>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Secondary Variant</h3>\n        <div className=\"flex gap-2 flex-wrap\">\n          <Button variant=\"secondary\">Secondary Button</Button>\n          <Button variant=\"secondary\" disabled>Disabled</Button>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Outline Variant</h3>\n        <div className=\"flex gap-2 flex-wrap\">\n          <Button variant=\"outline\">Outline Button</Button>\n          <Button variant=\"outline\" disabled>Disabled</Button>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Ghost Variant</h3>\n        <div className=\"flex gap-2 flex-wrap\">\n          <Button variant=\"ghost\">Ghost Button</Button>\n          <Button variant=\"ghost\" disabled>Disabled</Button>\n        </div>\n      </div>\n\n      <div>\n        <h3 className=\"text-sm font-semibold text-foreground-200 mb-3\">Sizes</h3>\n        <div className=\"flex gap-2 flex-wrap items-center\">\n          <Button size=\"sm\">Small</Button>\n          <Button size=\"md\">Medium</Button>\n          <Button size=\"lg\">Large</Button>\n        </div>\n      </div>\n    </div>\n  )\n}"
      },
      {
        "title": "Multiple Actions",
        "description": "A primary action button grouped with secondary actions and an options menu.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Flex } from 'ui-lab-components'\nimport { FaEllipsisVertical } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Flex gap=\"xs\" className=\"w-110 *:not-last:flex-1\">\n      <Button size=\"sm\" variant=\"primary\" >Subscribe</Button>\n      <Button size=\"sm\" >Message</Button>\n      <Button size=\"icon\" variant=\"outline\" icon={<FaEllipsisVertical />} />\n    </Flex>\n  );\n}"
      },
      {
        "title": "Joined Toggle Buttons",
        "description": "Multiple buttons grouped together for view/mode selection with active state indication.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Group, Divider, Input, Flex } from 'ui-lab-components'\nimport { FaList, FaGrip, FaTable, FaPlus } from \"react-icons/fa6\";\nimport { LuSearch } from \"react-icons/lu\";\n\nexport default function Example() {\n  const [viewMode, setViewMode] = useState(\"list\");\n  return (\n    <Flex className=\"w-110\" gap=\"xs\" align=\"center\">\n      <Input\n        placeholder=\"Search items...\"\n        icon={<LuSearch />}\n        className=\"w-full\"\n      />\n      <Group orientation=\"horizontal\" value={viewMode} onChange={setViewMode}>\n        <Group.Button size=\"icon\" value=\"list\"><FaList /></Group.Button>\n        <Divider orientation=\"vertical\" />\n        <Group.Button size=\"icon\" value=\"grid\"><FaGrip /></Group.Button>\n        <Divider orientation=\"vertical\" />\n        <Group.Button size=\"icon\" value=\"table\"><FaTable /></Group.Button>\n      </Group>\n      <Button size=\"sm\" icon={{ left: <FaPlus size={12} /> }} >New</Button>\n    </Flex>\n  );\n}"
      },
      {
        "title": "Sub Stack Actions",
        "description": "A collection of buttons and inputs arranged horizontally for grouped actions and filtering.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Group, Input, Badge, Flex } from 'ui-lab-components'\nimport { FaList, FaGrip, FaPlus } from \"react-icons/fa6\";\nimport { LuSearch } from \"react-icons/lu\";\n\nexport default function Example() {\n  const [viewMode, setViewMode] = useState(\"list\");\n  return (\n    <Flex align=\"center\" gap=\"xs\" className=\"w-110\">\n      <Group orientation=\"horizontal\" spacing=\"xs\" value={viewMode} onChange={setViewMode}>\n        <Group.Button size=\"icon\" value=\"list\"><FaList /></Group.Button>\n        <Group.Button size=\"icon\" value=\"grid\"><FaGrip /></Group.Button>\n      </Group>\n      <Input\n        placeholder=\"Search...\"\n        icon={<LuSearch />}\n        hint={<Badge size=\"sm\" variant=\"secondary\" >Ctrl+K</Badge>}\n      />\n      <Button size=\"sm\" icon={{ right: <FaPlus size={12} /> }} >Upload</Button>\n    </Flex>\n  );\n}"
      },
      {
        "title": "Split Action Button",
        "description": "A primary action button joined with a Select dropdown that changes what the button does — useful for publish workflows with multiple delivery options.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Divider, Select, Searchable, Flex, Menu } from 'ui-lab-components'\nimport { FaSpinner, FaCheck, FaEllipsisVertical, FaHashtag, FaLock } from \"react-icons/fa6\";\n\ntype Channel = { value: string; label: string; description: string; private?: boolean };\n\nconst channels: Channel[] = [\n  { value: \"general\", label: \"general\", description: \"General team discussion\" },\n  { value: \"announcements\", label: \"announcements\", description: \"Important team updates\", private: true },\n  { value: \"design\", label: \"design\", description: \"Design work and feedback\" },\n  { value: \"engineering\", label: \"engineering\", description: \"Engineering discussions\" },\n  { value: \"marketing\", label: \"marketing\", description: \"Marketing campaigns\" },\n  { value: \"product\", label: \"product\", description: \"Product roadmap and planning\" },\n  { value: \"random\", label: \"random\", description: \"Off-topic conversations\" },\n  { value: \"releases\", label: \"releases\", description: \"Release announcements\", private: true },\n];\n\ntype PublishAction = \"publish\" | \"draft\" | \"schedule\";\n\nconst publishActions: Record<PublishAction, { label: string; variant: \"ghost\" | \"default\" | \"outline\" }> = {\n  publish: { label: \"Publish Now\", variant: \"ghost\" },\n  draft: { label: \"Save as Draft\", variant: \"ghost\" },\n  schedule: { label: \"Schedule for Later\", variant: \"outline\" },\n};\n\nexport default function Example() {\n  const [action, setAction] = useState<PublishAction>(\"publish\");\n  const [status, setStatus] = useState<\"idle\" | \"loading\" | \"done\">(\"idle\");\n  const [channel, setChannel] = useState<string | number | null>(\"general\");\n  const selectedChannel = channels.find((c) => c.value === channel);\n  const cfg = publishActions[action];\n\n  const handleExecute = () => {\n    setStatus(\"loading\");\n    setTimeout(() => {\n      setStatus(\"done\");\n      setTimeout(() => setStatus(\"idle\"), 2000);\n    }, 1500);\n  };\n\n  const leftIcon = status === \"loading\" ? <FaSpinner className=\"animate-spin\" /> : status === \"done\" ? <FaCheck /> : undefined;\n  const label = status === \"loading\" ? \"Saving...\" : status === \"done\" ? \"Done!\" : cfg.label;\n\n  return (\n    <Flex gap=\"xs\" className=\"w-110\" align=\"center\">\n      <Select\n        selectedKey={channel}\n        valueLabel={selectedChannel ? `#${selectedChannel.label}` : undefined}\n        onSelectionChange={setChannel}\n        className=\"flex h-10\"\n        isDisabled={status !== \"idle\"}\n      >\n        <Searchable.Input className=\"w-50\" icon={<FaHashtag />} placeholder=\"Select channel...\" />\n        <Select.Content>\n          <Select.List>\n            {channels.map((c) => (\n              <Select.Item\n                key={c.value}\n                value={c.value}\n                textValue={c.label}\n                icon={c.private ? <FaLock className=\"h-3 w-3\" /> : <FaHashtag className=\"h-3 w-3\" />}\n                description={c.description}\n              >\n                {c.label}\n              </Select.Item>\n            ))}\n          </Select.List>\n        </Select.Content>\n      </Select>\n      <Select className=\"flex h-10\" selectedKey={action} onSelectionChange={(key) => setAction(key as PublishAction)} isDisabled={status !== \"idle\"}>\n        <Button\n          onPress={handleExecute}\n          variant=\"ghost\"\n          size=\"sm\"\n          className=\"w-full\"\n          isDisabled={status !== \"idle\"}\n          icon={leftIcon}\n        >\n          {label}\n        </Button>\n        <Divider orientation=\"vertical\" spacing=\"none\" />\n        <Select.Trigger />\n        <Select.Content>\n          <Select.Item value=\"publish\" textValue=\"Publish Now\">Publish Now</Select.Item>\n          <Select.Item value=\"draft\" textValue=\"Save as Draft\">Save as Draft</Select.Item>\n          <Select.Item value=\"schedule\" textValue=\"Schedule for Later\">Schedule for Later</Select.Item>\n        </Select.Content>\n      </Select>\n      <Menu type=\"pop-over\">\n        <Menu.Trigger>\n          <Button size=\"icon\" variant=\"outline\" icon={<FaEllipsisVertical />} />\n        </Menu.Trigger>\n        <Menu.Content offset={8} side=\"bottom\" align=\"end\">\n          <Menu.Item>Preview</Menu.Item>\n          <Menu.Item>View History</Menu.Item>\n          <Menu.Item>Discard Changes</Menu.Item>\n        </Menu.Content>\n      </Menu>\n    </Flex>\n  );\n}"
      }
    ]
  },
  "card": {
    "props": [
      {
        "name": "styles",
        "type": "CardStylesProp",
        "required": false
      }
    ],
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
      },
      {
        "name": "styles",
        "type": "CheckboxStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "required": false
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "defaultValue": "#000000"
      },
      {
        "name": "onChange",
        "type": "((color: string) => void)",
        "required": false
      },
      {
        "name": "onChangeComplete",
        "type": "((color: string) => void)",
        "required": false
      },
      {
        "name": "showOpacity",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "showPreview",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "format",
        "type": "hex | rgb",
        "required": false,
        "defaultValue": "hex",
        "enumValues": [
          "hex",
          "rgb"
        ]
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
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
        "name": "className",
        "type": "string",
        "required": false
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
        "props": [
          {
            "name": "value",
            "type": "string",
            "required": true
          },
          {
            "name": "format",
            "type": "hex | rgb",
            "required": true,
            "enumValues": [
              "hex",
              "rgb"
            ]
          },
          {
            "name": "onFormatChange",
            "type": "((format: \"hex\" | \"rgb\") => void)",
            "required": false
          },
          {
            "name": "onValueChange",
            "type": "((value: string) => void)",
            "required": false
          },
          {
            "name": "disabled",
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
            "name": "showPreview",
            "type": "boolean",
            "required": false,
            "defaultValue": "false"
          },
          {
            "name": "previewColor",
            "type": "string",
            "required": false
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
      }
    ]
  },
  "confirm": {
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
        "description": "Description text shown during the confirm step"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Custom icon shown in the confirm header"
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
        "description": "Whether the user must type confirmText to enable the confirm button"
      },
      {
        "name": "confirmText",
        "type": "string",
        "required": false,
        "description": "Text the user must type to confirm when requiresReason is true"
      },
      {
        "name": "autoResetAfter",
        "type": "number",
        "required": false,
        "description": "Milliseconds after which the inline confirm auto-resets to idle state"
      }
    ],
    "examples": [
      {
        "title": "Basic Confirm",
        "description": "A confirmation dialog for critical actions. Use this to prevent accidental deletions or destructive operations.",
        "code": "import { Confirm } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Confirm\n      triggerLabel=\"Delete Account\"\n      title=\"Are you sure?\"\n      description=\"This action cannot be undone. All your data will be permanently deleted.\"\n      confirmLabel=\"Delete\"\n      cancelLabel=\"Cancel\"\n      onConfirm={() => console.log('Account deleted')}\n      onCancel={() => console.log('Cancelled')}\n    />\n  );\n}"
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
      },
      {
        "name": "styles",
        "type": "DateStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      }
    ],
    "subComponents": {
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
          },
          {
            "name": "dayCellClassName",
            "type": "string",
            "required": false,
            "description": "Classes applied to each individual date cell (DateDay component)"
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
        "type": "sm | md | lg | auto",
        "required": false,
        "defaultValue": "auto",
        "description": "Size of the divider thickness",
        "enumValues": [
          "sm",
          "md",
          "lg",
          "auto"
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
      },
      {
        "name": "styles",
        "type": "DividerStylesProp",
        "required": false,
        "description": "Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object."
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
        "code": "import { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"space-y-6 w-full\">\n      <div className=\"space-y-2\">\n        <span className=\"text-sm text-foreground-400\">Solid</span>\n        <Divider variant=\"solid\" />\n      </div>\n      <div className=\"space-y-2\">\n        <span className=\"text-sm text-foreground-400\">Dashed</span>\n        <Divider variant=\"dashed\" />\n      </div>\n      <div className=\"space-y-2\">\n        <span className=\"text-sm text-foreground-400\">Dotted</span>\n        <Divider variant=\"dotted\" />\n      </div>\n    </div>\n  );\n}"
      },
      {
        "title": "Vertical Orientation",
        "description": "Vertical dividers separate side-by-side content. All pattern variants work in both horizontal and vertical orientations.",
        "code": "import React from 'react';\nimport { Divider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center gap-4 h-16\">\n      <span className=\"text-foreground-300\">First</span>\n      <Divider orientation=\"vertical\" variant=\"solid\" spacing=\"none\" />\n      <span className=\"text-foreground-300\">Second</span>\n      <Divider orientation=\"vertical\" variant=\"dashed\" spacing=\"none\" />\n      <span className=\"text-foreground-300\">Third</span>\n      <Divider orientation=\"vertical\" variant=\"dotted\" spacing=\"none\" />\n      <span className=\"text-foreground-300\">Fourth</span>\n    </div>\n  );\n}"
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
        "name": "styles",
        "type": "ExpandStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, or slot object."
      }
    ],
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
      },
      {
        "name": "styles",
        "type": "FlexStylesProp",
        "required": false,
        "description": "Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object."
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
        "defaultValue": "var(--frame-stroke-color, var(--background-700))",
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
      },
      {
        "name": "styles",
        "type": "FrameStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "type": "number | ResponsiveColumns",
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
        "name": "responsive",
        "type": "boolean",
        "required": false,
        "description": "Whether to enable container-query-based responsive columns"
      },
      {
        "name": "styles",
        "type": "GalleryStylesProp",
        "required": false,
        "description": "Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object."
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
          },
          {
            "name": "styles",
            "type": "GalleryStylesProp",
            "required": false,
            "description": "Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object."
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
        "type": "GridTemplateColumns | ResponsiveValue<GridTemplateColumns>",
        "required": false,
        "defaultValue": "3",
        "description": "Grid template columns value, or responsive object per breakpoint"
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
        "name": "responsive",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Wraps the grid in a container query parent for breakpoint-aware responsiveness"
      },
      {
        "name": "styles",
        "type": "GridStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      }
    ],
    "examples": [
      {
        "title": "Basic Grid",
        "description": "A simple grid layout with multiple cells. Use this for organizing content in a responsive grid structure.",
        "code": "import React from 'react';\nimport { Grid } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Grid columns={3} gap=\"md\">\n      <div style={{ padding: '1rem', background: '#e0e0e0' }}>Cell 1</div>\n      <div style={{ padding: '1rem', background: '#d0d0d0' }}>Cell 2</div>\n      <div style={{ padding: '1rem', background: '#c0c0c0' }}>Cell 3</div>\n      <div style={{ padding: '1rem', background: '#b0b0b0' }}>Cell 4</div>\n      <div style={{ padding: '1rem', background: '#a0a0a0' }}>Cell 5</div>\n      <div style={{ padding: '1rem', background: '#909090' }}>Cell 6</div>\n    </Grid>\n  );\n}"
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
        "type": "none | xs | sm",
        "required": false,
        "defaultValue": "none",
        "description": "Controls the gap between group items",
        "enumValues": [
          "none",
          "xs",
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
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "The currently active button value for toggle group behavior"
      },
      {
        "name": "onChange",
        "type": "((value: string) => void)",
        "required": false,
        "description": "Called when a button with a value prop is pressed"
      }
    ],
    "examples": [
      {
        "title": "Basic Group",
        "description": "A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.",
        "code": "import { Group } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Group>\n      <Group.Button>First</Group.Button>\n      <Group.Button>Second</Group.Button>\n      <Group.Button>Third</Group.Button>\n    </Group>\n  );\n}"
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
        "name": "icon",
        "type": "ReactNode | InputIconSlots",
        "required": false,
        "description": "Icon displayed before the input value by default, or in named prefix/suffix slots"
      },
      {
        "name": "actions",
        "type": "InputAction[] | InputActionSlots",
        "required": false,
        "description": "Inline actions rendered on the left or right side of the input. Passing an array keeps the existing right-side behavior."
      },
      {
        "name": "hint",
        "type": "ReactNode",
        "required": false,
        "description": "Hint content rendered inside a badge on the right side of the input, commonly used for keyboard shortcuts."
      },
      {
        "name": "styles",
        "type": "InputStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "code": "import React from 'react';\nimport { Input, Label } from 'ui-lab-components';\nimport { FaCircleExclamation, FaCircleCheck } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-6 w-full max-w-sm\">\n      {/* Error State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label error helperText=\"Please enter a valid email address\" helperTextError>\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          error\n          defaultValue=\"invalid-email\"\n          icon={{ suffix: <FaCircleExclamation className=\"text-danger-600\" size={14} /> }}\n        />\n      </div>\n\n      {/* Success State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label helperText=\"Email address is available\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          defaultValue=\"user@example.com\"\n          icon={{ suffix: <FaCircleCheck className=\"text-success-600\" size={14} /> }}\n          className=\"border-success-600 focus:border-success-600\"\n        />\n      </div>\n\n      {/* Default State with Helper Text */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label required helperText=\"We'll never share your email with anyone else.\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n        />\n      </div>\n    </div>\n  );\n}"
      }
    ]
  },
  "label": {
    "props": [
      {
        "name": "styles",
        "type": "LabelStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      },
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
        "defaultValue": "md",
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
            "type": "sm | md | lg | auto",
            "required": false,
            "description": "Size of the divider thickness",
            "enumValues": [
              "sm",
              "md",
              "lg",
              "auto"
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
          },
          {
            "name": "styles",
            "type": "DividerStylesProp",
            "required": false,
            "description": "Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object."
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
        "description": "Interactive checkbox inside a list item",
        "props": [
          {
            "name": "size",
            "type": "sm | md | lg",
            "required": false,
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
            "description": "Whether to style the helper text as an error"
          },
          {
            "name": "isIndeterminate",
            "type": "boolean",
            "required": false,
            "description": "Whether to show an indeterminate (partial selection) state"
          },
          {
            "name": "styles",
            "type": "CheckboxStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
          }
        ]
      },
      "List.CheckboxIndicator": {
        "description": "Non-interactive checkbox indicator inside a list item",
        "props": [
          {
            "name": "checked",
            "type": "boolean",
            "required": false,
            "description": "Whether the indicator is in a checked state"
          }
        ]
      },
      "List.Switch": {
        "description": "Interactive switch inside a list item",
        "props": [
          {
            "name": "size",
            "type": "sm | default",
            "required": false,
            "description": "Size of the switch",
            "enumValues": [
              "sm",
              "default"
            ]
          },
          {
            "name": "onChange",
            "type": "((isSelected: boolean) => void)",
            "required": false,
            "description": "Called when the switch is toggled"
          },
          {
            "name": "styles",
            "type": "SwitchStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
          },
          {
            "name": "isSelected",
            "type": "boolean",
            "required": false,
            "description": "Controlled selected (on) state"
          },
          {
            "name": "defaultSelected",
            "type": "boolean",
            "required": false,
            "description": "Initial selected state for uncontrolled usage"
          },
          {
            "name": "isDisabled",
            "type": "boolean",
            "required": false,
            "description": "Whether the switch is disabled"
          }
        ]
      },
      "List.Input": {
        "description": "Input element inside a list item",
        "props": [
          {
            "name": "styles",
            "type": "InputStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
          },
          {
            "name": "variant",
            "type": "default | ghost",
            "required": false,
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
            "description": "Whether the input is in an error state"
          },
          {
            "name": "icon",
            "type": "ReactNode | InputIconSlots",
            "required": false,
            "description": "Icon displayed before the input value by default, or in named prefix/suffix slots"
          },
          {
            "name": "actions",
            "type": "InputAction[] | InputActionSlots",
            "required": false,
            "description": "Inline actions rendered on the left or right side of the input. Passing an array keeps the existing right-side behavior."
          },
          {
            "name": "hint",
            "type": "ReactNode",
            "required": false,
            "description": "Hint content rendered inside a badge on the right side of the input, commonly used for keyboard shortcuts."
          }
        ]
      },
      "List.Select": {
        "description": "Select element wrapper inside a list item",
        "props": [
          {
            "name": "defaultValue",
            "type": "string | null",
            "required": false,
            "description": "Default display text shown in the trigger when nothing is selected"
          },
          {
            "name": "autoFocus",
            "type": "boolean",
            "required": false,
            "description": "Focuses the trigger automatically on mount"
          },
          {
            "name": "className",
            "type": "string",
            "required": false,
            "description": "Additional CSS class for the root wrapper"
          },
          {
            "name": "styles",
            "type": "SelectStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
          },
          {
            "name": "filter",
            "type": "((item: any) => boolean)",
            "required": false,
            "description": "Custom filter predicate applied to the items array"
          },
          {
            "name": "isDisabled",
            "type": "boolean",
            "required": false,
            "description": "Disables the entire select and prevents interaction"
          },
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
            "name": "valueLabel",
            "type": "string",
            "required": false,
            "description": "Display text for the currently selected value — used for SSR/SSG to avoid\nflash of placeholder before items register. Provide alongside selectedKey or\ndefaultSelectedKey so the correct label renders on the first pass."
          },
          {
            "name": "onSelectionChange",
            "type": "((value: any) => void)",
            "required": false,
            "description": "Called when selection changes; receives a single key (single) or key array (multiple)"
          },
          {
            "name": "maxItems",
            "type": "number",
            "required": false,
            "description": "Maximum number of items visible before the dropdown scrolls"
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
          },
          {
            "name": "styles",
            "type": "ListStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots."
          },
          {
            "name": "actions",
            "type": "(ReactNode | ListActionDef)[]",
            "required": false
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
    "props": [
      {
        "name": "asChild",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      }
    ],
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
        "name": "type",
        "type": "context-menu | pop-over",
        "required": false,
        "defaultValue": "context-menu",
        "description": "The behavior type of the menu",
        "enumValues": [
          "context-menu",
          "pop-over"
        ]
      },
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
            "name": "side",
            "type": "top | bottom | left | right",
            "required": false,
            "defaultValue": "bottom",
            "description": "The side to position the menu content relative to the trigger (for pop-over type)",
            "enumValues": [
              "top",
              "bottom",
              "left",
              "right"
            ]
          },
          {
            "name": "align",
            "type": "start | center | end",
            "required": false,
            "defaultValue": "start",
            "description": "The alignment of the menu content relative to the trigger (for pop-over type)",
            "enumValues": [
              "start",
              "center",
              "end"
            ]
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
            "name": "offset",
            "type": "number",
            "required": false,
            "defaultValue": "0",
            "description": "Distance offset from the trigger in all directions (for pop-over type)"
          },
          {
            "name": "styles",
            "type": "MenuContentStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "MenuItemStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "MenuCheckboxItemStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "MenuRadioItemStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "MenuSubTriggerStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
            "name": "offset",
            "type": "number",
            "required": false,
            "defaultValue": "8",
            "description": "Distance offset from the trigger in all directions"
          },
          {
            "name": "styles",
            "type": "MenuSubContentStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "name": "close",
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
        "name": "styles",
        "type": "ModalStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "name": "styles",
        "type": "PageStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      },
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
      },
      {
        "name": "styles",
        "type": "PanelStylesProp",
        "required": false,
        "description": "Slot styles."
      }
    ],
    "examples": []
  },
  "path": {
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the path container"
      },
      {
        "name": "separator",
        "type": "ReactNode",
        "required": false,
        "description": "Custom separator element between path items"
      },
      {
        "name": "styles",
        "type": "PathStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      }
    ],
    "subComponents": {
      "Path.Item": {
        "props": [
          {
            "name": "href",
            "type": "string",
            "required": false,
            "description": "URL this path item links to"
          },
          {
            "name": "onPress",
            "type": "(() => void)",
            "required": false,
            "description": "Called when the path item is pressed"
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
        "title": "Basic Path",
        "description": "A simple path navigation showing the current page location. Use this to help users understand their position in the site hierarchy.",
        "code": "import { Path, PathItem } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Path>\n      <PathItem href=\"/\">Home</PathItem>\n      <PathItem href=\"/products\">Products</PathItem>\n      <PathItem href=\"/products/electronics\">Electronics</PathItem>\n      <PathItem>Laptop</PathItem>\n    </Path>\n  );\n}"
      }
    ]
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
        "name": "styles",
        "type": "PopoverStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional CSS class for the trigger element."
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
        "type": "string",
        "required": false,
        "defaultValue": "default",
        "description": "Visual color variant indicating progress state"
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
      },
      {
        "name": "styles",
        "type": "ProgressStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
      },
      {
        "name": "styles",
        "type": "RadioStylesProp",
        "required": false,
        "description": "Classes applied to named slots"
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
        "name": "maxHeight",
        "type": "string",
        "required": false
      },
      {
        "name": "maxWidth",
        "type": "string",
        "required": false
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
      },
      {
        "name": "paddingY",
        "type": "string | number",
        "required": false,
        "defaultValue": "4"
      },
      {
        "name": "fade-y",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "fadeDistance",
        "type": "number",
        "required": false,
        "defaultValue": "5"
      },
      {
        "name": "fadeSize",
        "type": "number",
        "required": false,
        "defaultValue": "4"
      },
      {
        "name": "enabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "hide",
        "type": "boolean",
        "required": false,
        "defaultValue": "true"
      },
      {
        "name": "inline",
        "type": "boolean",
        "required": false,
        "defaultValue": "false"
      },
      {
        "name": "styles",
        "type": "ScrollStylesProp",
        "required": false
      },
      {
        "name": "storageKey",
        "type": "string",
        "required": false
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
        "name": "valueLabel",
        "type": "string",
        "required": false,
        "description": "Display text for the currently selected value — used for SSR/SSG to avoid\nflash of placeholder before items register. Provide alongside selectedKey or\ndefaultSelectedKey so the correct label renders on the first pass."
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
      },
      {
        "name": "styles",
        "type": "SelectStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "SelectContentStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "SelectContentStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "SelectGroupStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "SelectValueStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "SelectItemStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
          },
          {
            "name": "styles",
            "type": "SelectListStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
            "description": "Custom chevron icon displayed on the right side of the trigger; defaults to ChevronDown"
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
          },
          {
            "name": "styles",
            "type": "SelectTriggerStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
          }
        ]
      },
      "SearchableTrigger": {
        "description": "Combobox-style input that opens the dropdown on focus and filters items as you type",
        "props": [
          {
            "name": "styles",
            "type": "SearchableTriggerStylesProp",
            "required": false,
            "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
          },
          {
            "name": "icon",
            "type": "ReactNode | InputIconSlots",
            "required": false,
            "description": "Icon displayed before the input value by default, or in named prefix/suffix slots"
          },
          {
            "name": "variant",
            "type": "ghost | default",
            "required": false,
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
            "name": "actions",
            "type": "InputAction[] | InputActionSlots",
            "required": false,
            "description": "Inline actions rendered on the left or right side of the input. Passing an array keeps the existing right-side behavior."
          },
          {
            "name": "hint",
            "type": "ReactNode",
            "required": false,
            "description": "Hint content rendered inside a badge on the right side of the input, commonly used for keyboard shortcuts."
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
        "code": "import React from 'react';\nimport { Select, Searchable } from 'ui-lab-components';\n\nconst countries = [\n  { value: 'us', label: 'United States' },\n  { value: 'ca', label: 'Canada' },\n  { value: 'mx', label: 'Mexico' },\n  { value: 'br', label: 'Brazil' },\n  { value: 'ar', label: 'Argentina' },\n  { value: 'uk', label: 'United Kingdom' },\n  { value: 'fr', label: 'France' },\n  { value: 'de', label: 'Germany' },\n  { value: 'it', label: 'Italy' },\n  { value: 'es', label: 'Spain' },\n  { value: 'pt', label: 'Portugal' },\n  { value: 'nl', label: 'Netherlands' },\n  { value: 'be', label: 'Belgium' },\n  { value: 'ch', label: 'Switzerland' },\n  { value: 'at', label: 'Austria' },\n  { value: 'se', label: 'Sweden' },\n  { value: 'no', label: 'Norway' },\n  { value: 'dk', label: 'Denmark' },\n  { value: 'fi', label: 'Finland' },\n  { value: 'pl', label: 'Poland' },\n  { value: 'jp', label: 'Japan' },\n  { value: 'cn', label: 'China' },\n  { value: 'kr', label: 'South Korea' },\n  { value: 'in', label: 'India' },\n  { value: 'au', label: 'Australia' },\n  { value: 'nz', label: 'New Zealand' },\n];\n\nexport default function Example() {\n  return (\n    <Select>\n      <Searchable.Input placeholder=\"Search countries...\" />\n      <Searchable.Content searchPlaceholder=\"Type to filter...\">\n        {countries.map((country) => (\n          <Select.Item key={country.value} value={country.value} textValue={country.label}>\n            {country.label}\n          </Select.Item>\n        ))}\n      </Searchable.Content>\n    </Select>\n  );\n}"
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
      },
      {
        "name": "styles",
        "type": "SliderStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "name": "isDisabled",
        "type": "boolean",
        "required": false,
        "defaultValue": "false",
        "description": "Whether the switch is disabled"
      },
      {
        "name": "size",
        "type": "default | sm",
        "required": false,
        "defaultValue": "default",
        "description": "Size of the switch",
        "enumValues": [
          "default",
          "sm"
        ]
      },
      {
        "name": "styles",
        "type": "SwitchStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
        "type": "underline",
        "required": false,
        "description": "Optional alternate visual style of the tab list indicator",
        "enumValues": [
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
      },
      {
        "name": "styles",
        "type": "StylesProp<TabsStyleSlots>",
        "required": false,
        "description": "Custom styles for the component slots"
      }
    ],
    "examples": [
      {
        "title": "Basic Tabs",
        "description": "A simple tabbed interface with content switching. Use this to organize related content into separate views.",
        "code": "import React from 'react';\nimport { Tabs } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tabs defaultValue=\"overview\">\n      <Tabs.List aria-label=\"Content sections\">\n        <Tabs.Trigger value=\"overview\">Overview</Tabs.Trigger>\n        <Tabs.Trigger value=\"details\">Details</Tabs.Trigger>\n        <Tabs.Trigger value=\"settings\">Settings</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value=\"overview\">\n        <p>Overview content goes here.</p>\n      </Tabs.Content>\n      <Tabs.Content value=\"details\">\n        <p>Details content goes here.</p>\n      </Tabs.Content>\n      <Tabs.Content value=\"settings\">\n        <p>Settings content goes here.</p>\n      </Tabs.Content>\n    </Tabs>\n  );\n}"
      },
      {
        "title": "Vertical Tabs (Sidebar)",
        "description": "A vertical tab layout ideal for settings pages or sidebar navigation. Tabs are stacked vertically with content panels beside them.",
        "code": "import React from 'react';\nimport { Tabs, Card } from 'ui-lab-components';\nimport { User, Settings, Bell, Shield } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4 min-h-[400px]\">\n      <Card className=\"w-full max-w-2xl\">\n        <Tabs defaultValue=\"profile\" className=\"flex flex-row\">\n          {/* Vertical tab list - styled as sidebar */}\n          <Tabs.List\n            aria-label=\"Settings sections\"\n            className=\"flex-col items-stretch justify-start h-auto w-48 border-r border-background-700 rounded-none bg-transparent p-2\"\n          >\n            <Tabs.Trigger value=\"profile\" icon={<User className=\"w-4 h-4\" />} className=\"justify-start\">\n              Profile\n            </Tabs.Trigger>\n            <Tabs.Trigger value=\"notifications\" icon={<Bell className=\"w-4 h-4\" />} className=\"justify-start\">\n              Notifications\n            </Tabs.Trigger>\n            <Tabs.Trigger value=\"security\" icon={<Shield className=\"w-4 h-4\" />} className=\"justify-start\">\n              Security\n            </Tabs.Trigger>\n            <Tabs.Trigger value=\"preferences\" icon={<Settings className=\"w-4 h-4\" />} className=\"justify-start\">\n              Preferences\n            </Tabs.Trigger>\n          </Tabs.List>\n\n          {/* Content panels */}\n          <div className=\"flex-1 p-6\">\n            <Tabs.Content value=\"profile\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Profile Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Manage your personal information and how others see you on the platform.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-2/3 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </Tabs.Content>\n\n            <Tabs.Content value=\"notifications\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Notification Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Control how and when you receive alerts and updates.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-32 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-background-700 rounded\" />\n                  <div className=\"h-4 w-40 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-28 bg-background-800 rounded\" />\n                </div>\n              </div>\n            </Tabs.Content>\n\n            <Tabs.Content value=\"security\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Security Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Protect your account with passwords, two-factor authentication, and more.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-24 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-48 bg-background-700/50 rounded\" />\n                </div>\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-32 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-40 bg-background-700/50 rounded\" />\n                </div>\n              </div>\n            </Tabs.Content>\n\n            <Tabs.Content value=\"preferences\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">General Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Customize your experience with theme, language, and display options.\n              </p>\n              <div className=\"grid grid-cols-2 gap-3\">\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </Tabs.Content>\n          </div>\n        </Tabs>\n      </Card>\n    </div>\n  );\n}"
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
        "description": "Whether the textarea can be manually resized by the user. When enabled, `className` may include Tailwind `resize`, `resize-x`, `resize-y`, or `resize-none` to select the resize axis."
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
      },
      {
        "name": "maxHeight",
        "type": "string",
        "required": false,
        "description": "Maximum height before the custom scrollbar activates"
      },
      {
        "name": "styles",
        "type": "TextAreaStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
      },
      {
        "name": "onDragStart",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "onDragEnd",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "onDismissStart",
        "type": "(() => void)",
        "required": false
      },
      {
        "name": "onDismissEnd",
        "type": "(() => void)",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Basic Toast",
        "description": "A simple toast notification. Click the button to trigger a toast message with default styling.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        size=\"sm\"\n        onClick={() => toast({ title: 'Notification', description: 'This is a toast message' })}>\n        Show Toast\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Success Toast",
        "description": "Toast notification for successful operations.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        size=\"sm\"\n        onClick={() =>\n          toast({\n            title: 'Success',\n            description: 'Operation completed successfully',\n            variant: 'success',\n          })\n        }\n      >\n        Show Success\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Danger Toast",
        "description": "Toast notification for errors or destructive operations.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        size=\"sm\"\n        onClick={() =>\n          toast({\n            title: 'Error',\n            description: 'Something went wrong',\n            variant: 'danger',\n          })\n        }\n      >\n        Show Error\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Info Toast",
        "description": "Toast notification for informational messages.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        size=\"sm\"\n        onClick={() =>\n          toast({\n            title: 'Info',\n            description: 'Here is some useful information',\n            variant: 'info',\n          })\n        }\n      >\n        Show Info\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
      },
      {
        "title": "Warning Toast",
        "description": "Toast notification for warnings.",
        "code": "import React from 'react';\nimport { Button, toast, Toaster } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <>\n      <Button\n        size=\"sm\"\n        onClick={() =>\n          toast({\n            title: 'Warning',\n            description: 'Please be careful',\n            variant: 'warning',\n          })\n        }\n      >\n        Show Warning\n      </Button>\n      <Toaster />\n    </>\n  );\n}"
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
      },
      {
        "name": "hint",
        "type": "string",
        "required": false,
        "description": "Keyboard shortcut or hint text rendered as a Badge at the end of the tooltip"
      },
      {
        "name": "styles",
        "type": "TooltipStylesProp",
        "required": false,
        "description": "Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those."
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
  "anchor": "@reference \"tailwindcss\";\n\n@layer components {\n  .preview, .anchor {\n    display: inline\n  }\n\n  .trigger {\n    @apply inline-block relative cursor-pointer;\n    color: var(--foreground);\n    text-decoration: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:hover .underline {\n      background: var(--underline-background-hover);\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    @apply absolute left-0 right-0 bottom-0 h-px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n}\n",
  "badge": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    @apply inline-flex items-center justify-center gap-2 px-3 py-0.5;\n    height: fit-content;\n    width: fit-content;\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--background-border);\n    border-radius: var(--radius-sm);\n  }\n\n  .badge.sm {\n    @apply px-1.5 py-px;\n    gap: 0.25rem;\n    font-size: var(--text-sm);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .badge.md {\n    @apply px-3.5 py-1;\n    font-size: var(--text-sm);\n  }\n\n  .badge.lg {\n    @apply px-4 py-2.5;\n    font-size: var(--text-sm);\n  }\n\n  .pill { border-radius: 9999px; }\n\n  .icon {\n    @apply flex items-center shrink-0;\n  }\n\n  .dismiss {\n    @apply ml-1 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-xs);\n    background: transparent;\n    border: none;\n    color: var(--dismiss-color);\n    transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n    outline: none;\n  }\n\n  .dismiss-button[data-hovered=\"true\"] {\n    background: var(--dismiss-hover-background);\n  }\n\n  .dismiss-button[data-pressed=\"true\"] {\n    background: var(--dismiss-pressed-background);\n    transform: scale(0.95);\n  }\n\n  .dismiss-button[data-focus-visible=\"true\"] {\n    outline: 2px solid currentColor;\n    outline-offset: 1px;\n  }\n}\n",
  "banner": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    @apply flex w-full items-start gap-4;\n    font-family: inherit;\n    font-weight: var(--font-weight-medium);\n    line-height: var(--leading-normal);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out;\n  }\n\n  .content {\n    @apply flex flex-col gap-2;\n  }\n\n  .icon-container {\n    @apply flex shrink-0 items-center justify-center self-start;\n  }\n\n  .icon {\n    @apply mr-4 h-5 w-5;\n    color: var(--icon-color, currentColor);\n  }\n\n  .dismiss {\n    @apply flex h-8 w-8 shrink-0 items-center justify-center p-0 cursor-pointer;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: inherit;\n    line-height: var(--leading-tight);\n    @apply my-0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-medium);\n    font-size: inherit;\n    line-height: var(--leading-normal);\n    @apply my-0;\n  }\n}\n\n\n.banner.sm {\n  @apply px-3 py-2;\n}\n\n.banner.md {\n  @apply px-4 py-3;\n}\n\n.banner.lg {\n  @apply px-6 py-4;\n}\n",
  "button": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply inline-flex items-center justify-center gap-2 select-none cursor-pointer whitespace-nowrap;\n    /* height: fit-content; */\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n\n    font-weight: var(--font-weight-medium, 500);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-tight, 1.25);\n\n    &:hover:not(:disabled) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:active:not(:disabled) {\n      filter: brightness(0.8);\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 1.5px var(--focus-visible);\n      outline: none;\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      filter: grayscale(0.5);\n    }\n  }\n}\n",
  "card": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    @apply overflow-hidden;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring);\n    outline-offset: 2px;\n  }\n\n  .header {\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
  "checkbox": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    @apply absolute inset-0 h-full w-full cursor-pointer;\n    opacity: 0;\n  }\n\n  .checkbox-root {\n    @apply inline-flex items-center justify-center gap-3;\n  }\n\n  .checkbox-container {\n    @apply relative inline-flex items-center justify-center;\n  }\n\n  /* Visual checkbox */\n  .checkbox {\n    --disabled-opacity: 0.6;\n\n    @apply relative h-5 w-5 cursor-pointer appearance-none;\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-xs);\n    outline: none;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    /* Interactive States */\n    &:hover:not([data-disabled=\"true\"]) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:focus-visible {\n      outline: 2px solid transparent;\n      box-shadow: 0 0 0 3px var(--ring-color);\n    }\n\n    &[data-selected=\"true\"] {\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-indeterminate=\"true\"] {\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-disabled=\"true\"] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n\n    /* Sizes */\n    &.size-sm {\n      @apply h-4 w-4;\n    }\n\n    &.size-md {\n      @apply h-5 w-5;\n    }\n\n    &.size-lg {\n      @apply h-6 w-6;\n    }\n  }\n\n  /* Checkmark and Indeterminate styles - combined */\n  .checkbox-checkmark,\n  .checkbox-indeterminate {\n    @apply absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--checkmark-color);\n    pointer-events: none;\n  }\n\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-md {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-lg {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal { color: inherit; }\n\n  .helper-text-error { color: var(--error-color); }\n}\n",
  "code": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    --border-color: var(--background-700);\n    --header-bg: mix(var(--background-900) 90%, transparent);\n    --scroll-track-bg: mix(var(--background-950) 50%, transparent);\n\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--border-color);\n    @apply flex w-full min-w-0 flex-col overflow-hidden;\n  }\n\n  .header {\n    flex: none;\n    background-color: var(--header-bg);\n    @apply flex items-center justify-between px-3 py-1.5;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    border-bottom: 1px solid var(--border-color);\n    color: var(--foreground-400);\n  }\n\n\n  .body {\n    @apply relative flex min-h-0 flex-1 flex-col;\n    flex: 1;\n  }\n\n  .viewport { @apply overflow-hidden; }\n\n  .viewport :global(pre) {\n    background: transparent;\n    @apply m-0 p-0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background: var(--background-700);\n    border-radius: 9999px;\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    background: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    @apply w-full;\n    overflow-x: auto;\n    background-color: var(--scroll-track-bg);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    @apply flex w-full items-center gap-3 px-4 py-2 cursor-pointer;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition: background-color 0.15s ease-out;\n    border-top: 1px solid var(--border-color);\n    background: transparent;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover { background-color: var(--background-800); }\n\n  .expand-icon { @apply shrink-0; color: var(--foreground-400); }\n\n  .copy-button {\n    @apply absolute right-2 top-2 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-sm);\n    color: var(--foreground-400);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out;\n    background: transparent;\n    border: none;\n    z-index: 1;\n  }\n\n  .copy-button:hover { background-color: var(--background-800); color: var(--foreground-300); }\n\n  .copy-button:focus, .body:hover .copy-button { opacity: 1; }\n}\n",
  "color": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --background: color-mix(in srgb, var(--background-800) 30%, transparent);;\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n\n  .colorControls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  /* Input styles */\n  .inputGroup {\n    width: 100%;\n  }\n\n  .inputGroup > div:first-child {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .colorInput {\n    width: 100%;\n  }\n\n  .formatSelect {\n    flex-shrink: 0;\n    width: 85px;\n  }\n\n  .color[data-size=\"sm\"] .formatSelect {\n    width: 75px;\n  }\n\n  /* Canvas Styles */\n  .canvasContainer {\n    position: relative;\n    width: 96%;\n    @apply mx-auto mt-2;\n    cursor: crosshair;\n    touch-action: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .canvasContainer[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .canvas {\n    position: relative;\n    width: 100%;\n    flex: 1;\n    border-radius: none;\n    /* clip-path: inset(0 round var(--radius-sm)); */\n    overflow: hidden;\n  }\n\n  .canvasGradientHue {\n    position: absolute;\n    inset: 0;\n    overflow: hidden;\n    /* border-radius: var(--radius-sm); */\n  }\n\n  .canvasGradientSaturation {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n    border-radius: none;\n  }\n\n  .canvasGradientLightness {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n    border-radius: none\n  }\n\n  .canvasPointer {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid color-mix(in srgb, var(--foreground-200) 50%, transparent);\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  /* Hue Slider Styles */\n  .hueSlider {\n    display: flex;\n    align-items: center;\n    height: 16px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .hueTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .hueThumb {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .hueSlider[data-focus-visible=\"true\"] .hueThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .hueThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .hueThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Opacity Slider Styles */\n  .opacitySlider {\n    display: flex;\n    align-items: center;\n    height: 12px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .opacityTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-800),\n      var(--background-800) 10px,\n      var(--background-700) 10px,\n      var(--background-700) 20px\n    );\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .opacityThumb {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .opacitySlider[data-focus-visible=\"true\"] .opacityThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .opacityThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .opacityThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Recent Colors Styles */\n  .recentColors {\n    display: flex;\n    gap: 0.5rem;\n    overflow-x: auto;\n    padding-bottom: 0.25rem;\n  }\n\n  .recentColorSwatch {\n    flex-shrink: 0;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    cursor: pointer;\n    background: none;\n    padding: 0;\n    outline: none;\n  }\n\n  .recentColorSwatch:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--ring-color);\n  }\n\n  .recentColorSwatch:active {\n    transform: scale(0.95);\n  }\n\n  .recentColorSwatch:focus-visible {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n\n  /* Preview Container - deprecated, use previewSwatch instead */\n  .previewContainer {\n    display: flex;\n    justify-content: center;\n    padding: 0.5rem 0;\n  }\n\n  /* Preview Swatch - inline with input */\n  .previewSwatch {\n    position: relative;\n    width: 36px;\n    height: 36px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    flex-shrink: 0;\n  }\n\n  .previewSwatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 6px,\n      var(--background-800) 6px,\n      var(--background-800) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .previewSwatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .preview {\n    position: relative;\n    width: 64px;\n    height: 64px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n  }\n\n  .preview::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 10px,\n      var(--background-800) 10px,\n      var(--background-800) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .canvasContainer {\n    min-height: 160px;\n  }\n}\n",
  "command": "@reference \"tailwindcss\";\n\n:global(.command) :global(.input) {\n  --background: var(--background-input);\n}\n\n@layer components {\n  /* Overlay Container */\n  .overlay {\n    @apply fixed inset-0 flex items-start justify-center overflow-hidden;\n    z-index: 999;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: var(--overlay-backdrop);\n  }\n\n  /* Content */\n  .content {\n    @apply relative m-2 w-full max-w-[28rem];\n    border-radius: var(--radius-sm);\n    background: var(--background-default);\n    margin-inline: 1rem;\n    box-shadow: var(--shadow);\n    animation: fade-in-zoom-in 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border-default);\n    @apply overflow-hidden;\n  }\n\n  /* Search Section */\n  .search {\n    @apply border-none flex p-1.5;\n    --input-active-border-color: transparent;\n    --input-active-box-shadow: none;\n  }\n\n  .input {\n    border-color: transparent;\n    background: transparent;\n    box-shadow: none;\n\n    &[data-active],\n    &[data-focus-visible] {\n      border-color: transparent;\n      box-shadow: none;\n    }\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--list-background);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    @apply flex w-full flex-col;\n  }\n\n  .item {\n    @apply flex items-center justify-between rounded-sm px-2 py-0.5 cursor-pointer;\n    border-radius: 0.375rem;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-highlighted=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .item-content {\n    @apply flex min-w-0 flex-1 items-center gap-2.5;\n    flex: 1;\n  }\n\n  .item-icon {\n    @apply flex h-6 w-6 shrink-0 items-center justify-center;\n    color: var(--color-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    @apply min-w-0;\n  }\n\n  .item-label {\n    font-size: var(--text-sm);\n    color: var(--color-default);\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    color: var(--color-muted);\n    font-size: 0.875rem;\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .hint-wrapper {\n    @apply flex items-center;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--color-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--color-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply flex w-full items-center gap-2 px-1.5 py-2;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fade-in-zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }\n}\n",
  "confirm": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    @apply flex flex-col;\n  }\n\n  .card {\n    @apply max-w-[28rem];\n  }\n\n  .card-compact {\n    @apply max-w-[21rem];\n  }\n\n  .dialog-overlay {\n    @apply fixed inset-0 z-50 flex items-center justify-center;\n    background-color: mix(var(--background-950) 50%, transparent);\n  }\n\n  .dialog-card {\n    @apply max-w-[28rem];\n    margin: 0 1rem;\n  }\n\n  .header {\n    @apply flex items-start gap-3;\n  }\n\n  .header-content {\n    @apply flex-1;\n  }\n\n  .header-title {\n    @apply font-semibold;\n    color: var(--foreground-100);\n  }\n\n  .body {\n    @apply flex flex-col gap-4;\n  }\n\n  .body-compact {\n    @apply gap-3;\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--foreground-danger);\n  }\n\n  .warning-box {\n    @apply p-3 rounded-sm;\n    border: var(--border-width-base) solid;\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    background-color: mix(var(--background-info) 20%, transparent);\n    border-color: mix(var(--background-info) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-medium {\n    background-color: mix(var(--background-warning) 20%, transparent);\n    border-color: mix(var(--background-warning) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-high {\n    background-color: mix(var(--background-warning-dark) 20%, transparent);\n    border-color: mix(var(--background-warning-dark) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-critical {\n    background-color: mix(var(--background-danger) 20%, transparent);\n    border-color: mix(var(--background-danger) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--foreground-300);\n  }\n\n  .input {\n    @apply w-full mt-2 px-3 py-2 rounded-sm transition-all duration-200;\n    background-color: var(--background-800);\n    border: var(--border-width-base) solid var(--background-700);\n    color: var(--foreground-100);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    @apply flex gap-2;\n  }\n\n  .actions-inline {\n    @apply flex-row;\n  }\n\n  .actions-dialog {\n    @apply flex-row justify-end;\n  }\n}\n",
  "date": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --disabled-opacity: 0.5;\n\n    @apply inline-flex flex-col overflow-hidden gap-0;\n    border-radius: var(--radius-md);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .day-headers {\n    @apply grid gap-2 px-4 pt-3 pb-1;\n    grid-template-columns: repeat(7, 1fr);\n    background: var(--day-headers-background);\n    border-top: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md) var(--radius-md) 0 0;\n  }\n\n  .day-header {\n    @apply flex items-center justify-center;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    color: var(--day-header-color);\n  }\n\n  .header {\n    @apply flex items-center justify-between gap-4 pl-2 pr-1.5 py-1.5;\n    color: var(--header-color);\n  }\n\n  .month-year {\n    @apply ml-2;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .nav-button {\n    @apply inline-flex min-h-8 min-w-8 items-center justify-center cursor-pointer;\n    border-radius: var(--radius-sm);\n    background-color: transparent;\n    color: var(--nav-button-color);\n    border: 1px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 500;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .nav-button:hover { background-color: var(--nav-button-background-hover); }\n\n  .nav-button:focus-visible {\n    background: var(--nav-button-background-hover);\n    border-radius: 0px;\n    outline: 0px solid var(--accent-500);\n  }\n\n  .grid {\n    @apply grid gap-1 px-4 pb-4;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    background: var(--grid-background);\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n  }\n\n  .day-cell {\n    --cell-background: transparent;\n\n    @apply flex min-h-8 items-center justify-center px-2.5 py-2 cursor-pointer;\n    border-radius: var(--radius-base);\n    background-color: var(--cell-background);\n    color: var(--cell-text);\n    border: 2px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 400;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .week-header {\n    display: none;\n  }\n\n  .week-number {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.day-cell[data-selected=\"true\"] {\n  font-weight: 500;\n}\n\n.day-cell[data-today=\"true\"] {\n  border-color: transparent;\n}\n\n.day-cell[data-disabled=\"true\"],\n.day-cell[data-out-of-range=\"true\"] {\n  opacity: var(--disabled-opacity);\n}\n\n.day-cell[data-disabled=\"true\"] { cursor: not-allowed; }\n\n.day-cell[data-focus-visible=\"true\"]:not([data-disabled=\"true\"]) { outline: 2px solid var(--focus-ring); outline-offset: 2px; }\n",
  "expand": "@reference \"tailwindcss\";\n\n@layer components {\n  .expand {\n    --disabled-opacity: 0.6;\n\n    @apply flex flex-col;\n  }\n\n  .expand[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .trigger {\n    @apply flex w-full items-stretch justify-between p-0 text-left cursor-pointer;\n\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--trigger-foreground);\n    background-color: var(--trigger-background);\n\n    border: none;\n    border-radius: var(--radius-sm);\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n  }\n\n  .icon {\n    @apply flex shrink-0 items-center justify-center px-3 py-2;\n    color: inherit;\n    border-radius: var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n      }\n\n      /* When the icon itself is hovered, it should be isolated and fully rounded */\n      .trigger:not([data-disabled]) &:hover {\n        border-radius: var(--radius-sm);\n      }\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .expand:has(.trigger[data-expanded=\"true\"]) .icon > *,\n  .icon[data-expanded=\"true\"] > * {\n    transform: rotate(180deg);\n  }\n\n  /* from=\"above\": content expands upward above the trigger */\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n\n    .icon > * {\n      transform: rotate(180deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(0deg);\n    }\n  }\n\n  /* from=\"left\": content appears left of trigger */\n  .expand:has(.content[data-from=\"left\"]) {\n    @apply flex-row-reverse items-start;\n\n    .trigger {\n      @apply w-auto flex-col;\n    }\n\n    .icon > * {\n      transform: rotate(-90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(90deg);\n    }\n  }\n\n  /* from=\"right\": content appears right of trigger */\n  .expand:has(.content[data-from=\"right\"]) {\n    @apply flex-row items-start;\n\n    .trigger {\n      @apply w-auto flex-col;\n    }\n\n    .icon > * {\n      transform: rotate(90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(-90deg);\n    }\n  }\n\n  /* Horizontal content animation */\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-columns: 1fr;\n    }\n\n    .content-inner {\n      min-height: unset;\n      min-width: 0;\n    }\n  }\n\n  .title {\n    @apply flex flex-1 min-w-0 items-center overflow-hidden py-2 pl-3;\n\n    font-weight: var(--font-weight-medium);\n    border-radius: var(--radius-sm) 0 0 var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n      }\n\n      /* When icon is hovered, remove background from title */\n      .trigger:not([data-disabled]):has(.icon:hover) & {\n        background-color: transparent;\n      }\n    }\n\n    .trigger:not([data-disabled]) {\n      background-color: transparent;\n    }\n  }\n\n  .content {\n    @apply grid overflow-hidden;\n    grid-template-rows: 0fr;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-rows: 1fr;\n    }\n  }\n\n  .content-inner {\n    @apply min-h-0 overflow-hidden;\n    color: var(--content-foreground);\n    background-color: var(--content-background);\n  }\n\n  .expand:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
  "flex": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    @apply flex w-full flex-row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n  }\n\n  /* Direction variants */\n  .flex.row { flex-direction: row; }\n  .flex.column { flex-direction: column; }\n\n  /* Wrap variants */\n  .flex.wrap { flex-wrap: wrap; }\n  .flex.nowrap { flex-wrap: nowrap; }\n\n  /* Gap variants */\n  .flex.gap-xs { gap: var(--spacing-xs); }\n  .flex.gap-sm { gap: var(--spacing-sm); }\n  .flex.gap-md { gap: var(--spacing-md); }\n  .flex.gap-lg { gap: var(--spacing-lg); }\n  .flex.gap-xl { gap: var(--spacing-xl); }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start { justify-content: flex-start; }\n  .flex.justify-flex-end { justify-content: flex-end; }\n  .flex.justify-center { justify-content: center; }\n  .flex.justify-space-between { justify-content: space-between; }\n  .flex.justify-space-around { justify-content: space-around; }\n  .flex.justify-space-evenly { justify-content: space-evenly; }\n\n  /* Align-items variants */\n  .flex.align-flex-start { align-items: flex-start; }\n  .flex.align-flex-end { align-items: flex-end; }\n  .flex.align-center { align-items: center; }\n  .flex.align-stretch { align-items: stretch; }\n  .flex.align-baseline { align-items: baseline; }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    @apply w-full;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
  "frame": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    --frame-radius: var(--radius-sm, 24px);\n    --frame-stroke-width: var(--border-width-base, 1px);\n  }\n\n  .shape {\n    rx: var(--frame-radius);\n  }\n\n  .stroke {\n    stroke-width: var(--frame-stroke-width);\n    vector-effect: non-scaling-stroke;\n  }\n\n}\n",
  "gallery": "@reference \"tailwindcss\";\n\n@layer components {\n  .item {\n    @apply flex flex-col border overflow-hidden no-underline cursor-pointer;\n\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    color: inherit;\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    @apply flex-row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n\n    @apply relative overflow-hidden;\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n  }\n\n  .view > img,\n  .view > video {\n    @apply w-full h-full object-cover;\n  }\n\n  .body {\n    @apply flex flex-col gap-1 p-3 self-start min-w-0;\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    font-weight: var(--font-weight-medium);\n    color: var(--title-color);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--description-color);\n  }\n}\n",
  "grid": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    @apply grid w-full;\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: var(--grid-gap, calc(var(--spacing, 0.25rem) * 4));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    gap: var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 2));\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-xl, var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap { row-gap: var(--grid-row-gap); }\n  .grid.has-col-gap { column-gap: var(--grid-col-gap); }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      gap: calc(var(--spacing, 0.25rem) * 2);\n    }\n  }\n}\n",
  "group": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --radius-basis: calc(var(--spacing) * 1.5);\n    --padding: var(--radius-basis);\n    --radius: var(--radius-sm, 0.375rem);\n    --group-border-width: var(--border-width-base, 1px);\n    --inner-radius: calc(var(--radius) - var(--group-border-width));\n    \n    --control-height: calc((0.80em * var(--leading-tight, 1.25)) + (var(--spacing) * 4) + (var(--group-border-width) * 2));\n    --item-height: max(calc(var(--control-height) - (var(--padding) * 2) - (var(--group-border-width) * 2)), 0px);\n    \n    --button-padding-x: max(calc(var(--spacing) * 2.5 - var(--padding)), 0px);\n    --button-padding-y: max(calc(var(--spacing) * 2 - var(--padding)), 0px);\n    --input-padding-x: max(calc(var(--spacing) * 3 - var(--padding)), 0px);\n    --input-padding-y: max(calc(var(--spacing) * 1.5 - var(--padding)), 0px);\n\n    @apply flex overflow-hidden shrink-0 box-border;\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--group-border-width) solid var(--border);\n    border-radius: var(--radius);\n    padding: var(--padding);\n\n    &.horizontal {\n      @apply flex-row items-stretch;\n      height: var(--control-height);\n\n      /* Fixed: Use margin-block (top/bottom) for horizontal layouts */\n      .item.divider { margin-block: calc(var(--padding) * -1); }\n      .item.divider > [role=\"separator\"] { height: 100%; }\n    }\n\n    &.vertical {\n      @apply flex-col;\n      \n      .item .group-item { @apply w-full; }\n      /* Fixed: Use margin-inline (left/right) for vertical layouts */\n      .item.divider { margin-inline: calc(var(--padding) * -1); }\n      .item.divider > [role=\"separator\"] { width: 100%; }\n    }\n\n    &.none {\n      --padding: 0;\n      @apply gap-0;\n    }\n    \n    &.xs {\n      --radius-basis: calc(var(--spacing) * 0.875);\n      @apply space-x-0.5;\n    }\n    \n    &.sm {\n      --radius-basis: calc(var(--spacing) * 1.25);\n      @apply space-x-1;\n    }\n\n    /* --- Ghost Variant --- */\n    &.ghost {\n      @apply gap-1 border-none overflow-visible;\n      \n      &.none { @apply gap-0; }\n    }\n  }\n\n  .item {\n    @apply flex items-stretch;\n\n    &.grow { flex: 1; }\n    &.divider { \n      @apply p-0 shrink-0 flex-none; \n      > [role=\"separator\"] { flex: 0 0 auto; }\n    }\n  }\n\n  /* Shared Height Logic */\n  :is(.group-item, .group-input-wrapper, .group-select-wrapper) {\n    height: 100%;\n    min-height: var(--item-height);\n  }\n\n  .group-item {\n    @apply flex box-border;\n    padding: var(--button-padding-y) var(--button-padding-x);\n\n    &.active {\n      @apply relative;\n      background-color: var(--active-background);\n      color: var(--active-foreground);\n    }\n  }\n\n  .group-input-wrapper {\n    @apply flex flex-1 items-stretch overflow-visible;\n    input { \n      @apply h-full; \n      padding: var(--input-padding-y) var(--input-padding-x); \n    }\n  }\n\n  .group-select-wrapper {\n    @apply flex items-stretch p-0 bg-transparent border-none;\n    .select { @apply h-full w-full; }\n  }\n\n  .trigger { border: none; }\n\n  .group:not(.ghost) {\n    .item :is(.group-item, .group-select-wrapper) { border: none; }\n    \n    .group-item.active { font-weight: 500; }\n    \n    .group-input-wrapper {\n      --input-border-color: transparent;\n      --input-active-border-color: transparent;\n      --input-active-box-shadow: none;\n    }\n\n    &.none {\n      :is(.group-item, .trigger, .group-select-wrapper) { border-radius: 0; --radius: 0; --inner-radius: 0; }\n      .group-input-wrapper { --input-border-radius: 0; }\n\n      &.horizontal {\n        .item:first-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-top-left-radius: var(--inner-radius);\n          border-bottom-left-radius: var(--inner-radius);\n        }\n        .item:last-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-top-right-radius: var(--inner-radius);\n          border-bottom-right-radius: var(--inner-radius);\n        }\n      }\n      &.vertical {\n        .item:first-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-top-left-radius: var(--inner-radius);\n          border-top-right-radius: var(--inner-radius);\n        }\n        .item:last-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-bottom-left-radius: var(--inner-radius);\n          border-bottom-right-radius: var(--inner-radius);\n        }\n      }\n    }\n\n    &:is(.xs, .sm) {\n      :is(.group-item, .trigger, .group-select-wrapper > *) { border-radius: var(--inner-radius); }\n      .group-input-wrapper { --input-border-radius: var(--inner-radius); }\n    }\n  }\n\n  /* Ghost overrides */\n  .group.ghost {\n    .group-item.active { border-radius: var(--inner-radius); }\n    \n    &:not(.none) .item .group-item:not(.active) {\n      border-radius: var(--inner-radius);\n      border: var(--border-width-base) solid transparent;\n    }\n\n    &.none {\n      :is(.group-item, .group-select-wrapper) { border: none; border-radius: 0; --radius: 0; --inner-radius: 0; }\n      .group-input-wrapper { --input-border-color: transparent; --input-border-radius: 0; }\n    }\n  }\n\n  :is(.group-item, .trigger, .group-input-wrapper > [data-focus-visible]):focus-visible {\n    @apply relative outline-none z-10;\n  }\n\n  .group:not(.ghost) :is(.group-item, .trigger, .group-input-wrapper > [data-focus-visible]):focus-visible {\n    box-shadow: inset 0 0 0 1px var(--focus-ring-color);\n  }\n\n  .group.ghost :is(.group-item, .trigger, .group-input-wrapper > [data-focus-visible]):focus-visible {\n    box-shadow: 0 0 0 1px var(--focus-ring-color);\n  }\n}\n",
  "input": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --disabled-opacity: 0.5;\n    height: fit-content;\n    flex: 1;\n    min-width: 0;\n    @apply py-1.5 px-3;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: transparent;\n    border: none;\n    outline: none;\n    box-sizing: border-box;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-disabled] {\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .icon-wrapper {\n    @apply z-10 flex items-center;\n    color: var(--icon-color);\n    pointer-events: none;\n  }\n\n  .prefix-icon {\n    @apply relative;\n  }\n\n  .suffix-icon {\n    @apply relative;\n  }\n\n  .container {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--input-border-color, var(--border));\n    border-radius: var(--input-border-radius, var(--radius-sm));\n    box-sizing: border-box;\n    overflow: hidden;\n\n    &[data-active] {\n      border-color: var(--input-active-border-color, var(--ring-color));\n      box-shadow: var(--input-active-box-shadow, 0 0 0 1px mix(var(--ring-color) 20%, transparent));\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      border-color: var(--input-active-border-color, var(--ring-color));\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n\n      &[data-focus-visible] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n\n    &[data-variant=\"ghost\"] {\n      background-color: transparent;\n      border-color: transparent;\n      &[data-active], &[data-focus-visible] {\n        border-color: transparent;\n        box-shadow: none;\n      }\n    }\n  }\n\n  .start-adornments,\n  .end-adornments {\n    @apply flex items-center gap-1;\n    flex-shrink: 0;\n    pointer-events: none;\n  }\n\n  .start-adornments {\n    @apply pl-2.5;\n  }\n\n  .end-adornments {\n    @apply pr-1.5;\n  }\n\n  .actions {\n    @apply flex items-center gap-1;\n    pointer-events: auto;\n  }\n\n  .action {\n    @apply flex items-center justify-center p-2;\n    border-radius: 0.25rem;\n    color: var(--action-color);\n  }\n\n  .action:hover {\n    background-color: var(--background-hover);\n    color: var(--action-hover-color);\n  }\n\n  .number-controls {\n    @apply flex w-6 flex-col;\n    pointer-events: auto;\n  }\n\n  .number-controls.disabled {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .spin-button {\n    @apply flex w-full flex-1 items-center justify-center p-0 cursor-pointer;\n    flex: 1;\n    background-color: transparent;\n    border: none;\n    color: var(--spin-color);\n    transition: color 150ms ease-out, background-color 150ms ease-out;\n\n    &:hover:not(:disabled) {\n      background-color: var(--spin-hover-background);\n      color: var(--spin-hover-color);\n    }\n\n    &:active:not(:disabled) {\n      background-color: var(--spin-active-background);\n      color: var(--spin-active-color);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n  }\n}\n",
  "label": "@reference \"tailwindcss\";\n\n@layer components {\n  .label {\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n    transition: color 150ms ease;\n\n    &[data-size=\"sm\"] { font-size: var(--text-sm); }\n    &[data-size=\"lg\"] { font-size: var(--text-md); }\n\n    &[data-disabled] {\n      color: var(--disabled-foreground);\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    &[data-error] {\n      color: var(--error-foreground);\n    }\n  }\n\n  .required-indicator {\n    margin-left: 0.25rem;\n    color: var(--required-color);\n  }\n\n  .helper-text {\n    display: block;\n    font-size: var(--text-sm);\n    margin-top: 0.25rem;\n    transition: color 150ms ease;\n    color: var(--helper-color);\n\n    &[data-error] {\n      color: var(--helper-error-color);\n    }\n  }\n}\n",
  "list": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    @apply mx-auto;\n    max-width: 28rem;\n    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\n    color: var(--foreground);\n  }\n\n  .header {\n    @apply flex items-center justify-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .header.sticky { position: sticky; top: 0; }\n\n  .container[data-spacing=\"sm\"] .header {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.25rem;\n    padding-bottom: 0.25rem;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--header-title-color);\n  }\n\n  .header > :last-child { color: var(--header-subtitle-color); }\n\n  .item {\n    @apply flex flex-row items-center gap-3 px-2 py-1 cursor-pointer;\n  }\n\n  .container .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    background-color: var(--background-highlighted);\n  }\n\n  .container[data-spacing=\"sm\"] .item {\n    padding: 0.5rem 0.75rem;\n    gap: 0.375rem;\n  }\n\n  .checkbox,\n  .control,\n  .media {\n    @apply flex items-center justify-center flex-shrink-0;\n  }\n\n  .control { margin-left: auto; }\n\n  .media {\n    @apply h-8 w-8;\n  }\n\n  .desc {\n    font-size: var(--text-sm);\n    color: var(--desc-color);\n    @apply truncate;\n  }\n\n  .action-group {\n    @apply flex items-center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .action-group[data-justify=\"space-between\"] { justify-content: space-between; }\n  .action-group[data-justify=\"flex-start\"] { justify-content: flex-start; }\n  .action-group[data-justify=\"flex-end\"] { justify-content: flex-end; }\n\n  .actions {\n    align-items: center;\n    gap: 0.25rem;\n    margin-left: auto;\n    flex-shrink: 0;\n    @apply p-1.5 hidden group-hover:flex;\n  }\n\n  .action {\n    @apply flex items-center justify-center;\n    border-radius: 0.25rem;\n    color: var(--action-color);\n    @apply p-2;\n  }\n\n  .action:hover {\n    background-color: var(--background-hover);\n    color: var(--action-hover-color);\n  }\n\n  .footer {\n    @apply flex p-6 pb-12;\n  }\n\n  .footer[data-align=\"center\"] { justify-content: center; }\n  .footer[data-align=\"flex-start\"] { justify-content: flex-start; }\n  .footer[data-align=\"flex-end\"] { justify-content: flex-end; }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
  "mask": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    @apply relative h-full w-full;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
  "menu": "@reference \"tailwindcss\";\n\n@layer components {\n  .content,\n  .sub-content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    --menu-animation: none;\n    --disabled-opacity: 0.5;\n  }\n\n  .trigger {\n    &[data-type=\"pop-over\"][data-active] {\n      opacity: 1;\n      background-color: var(--trigger-active-background);\n      border-radius: var(--radius-sm, 0.375rem);\n    }\n  }\n\n  .content {\n    @apply absolute min-w-40 max-w-80 overflow-hidden;\n    z-index: 50000;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slide-in-from-top 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slide-out-to-top 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item,\n  .checkbox-item,\n  .radio-item {\n    @apply flex min-w-0 items-center gap-2;\n    padding: var(--padding);\n    border-radius: var(--inner-radius);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--item-foreground);\n    &[data-highlighted] {\n      background-color: var(--item-highlighted-background);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n  }\n\n  .item,\n  .sub-trigger {\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .item-indicator {\n    @apply ml-auto flex h-4 w-4 shrink-0 items-center justify-center;\n    color: var(--item-indicator-color);\n  }\n\n  .sub-trigger {\n    @apply flex min-w-0 items-center gap-2;\n    padding: var(--padding);\n    border-radius: var(--inner-radius);\n    color: var(--item-foreground);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    &[data-highlighted] {\n      background-color: var(--item-highlighted-background);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: var(--item-highlighted-background);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply ml-auto h-4 w-4 shrink-0;\n  }\n\n  .sub-content {\n    @apply absolute min-w-40 max-w-80 overflow-hidden;\n    z-index: 50000;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slide-in-from-top 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slide-out-to-top 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .label {\n    padding: var(--padding);\n    color: var(--label-foreground);\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .separator {\n    @apply -mx-1 my-1 h-px;\n    background-color: var(--separator-background);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    color: var(--shortcut-foreground);\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-to-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n}\n",
  "modal": "@reference \"tailwindcss\";\n\n@layer components {\n  .overlay {\n    --disabled-opacity: 0.5;\n  }\n\n  .backdrop {\n    @apply absolute inset-0 cursor-pointer;\n    background-color: var(--backdrop-background);\n    backdrop-filter: blur(4px);\n  }\n\n  .modal:focus-visible {\n    outline: 2px solid var(--modal-focus-ring);\n    outline-offset: 2px;\n  }\n\n  .modal {\n    @apply relative flex w-full flex-col overflow-hidden;\n    z-index: 1;\n    max-height: 90vh;\n    margin: 1rem;\n    background-color: var(--modal-background);\n    border: var(--border-width-base) solid var(--modal-border);\n    border-radius: var(--radius-sm);\n    pointer-events: auto;\n    overflow: hidden;\n  }\n\n  .header {\n    @apply flex shrink-0 items-center justify-between gap-2 px-6 py-4;\n    border-bottom: var(--border-width-base) solid var(--modal-border);\n  }\n\n  .title {\n    @apply m-0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--modal-title-color);\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close {\n    @apply ml-auto flex items-center justify-center cursor-pointer;\n    background: none;\n    border: none;\n    color: var(--modal-close-color);\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .close:hover {\n    color: var(--modal-close-hover);\n  }\n\n  .close:active {\n    transform: scale(0.92);\n  }\n\n  .close:focus {\n    outline: 2px solid var(--modal-close-hover);\n    outline-offset: 2px;\n    border-radius: 0.25rem;\n  }\n\n  .closeIcon {\n    @apply h-5 w-5;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--modal-text-color);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background: var(--modal-border);\n    border-radius: 3px;\n    transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    background: var(--modal-close-color);\n  }\n\n  .footer {\n    @apply flex shrink-0 items-center justify-between gap-4 px-6 py-4;\n    background-color: var(--footer-background);\n    border-top: var(--border-width-base) solid var(--modal-border);\n  }\n\n  /* Size variants */\n  .size-fit {\n    width: fit-content;\n  }\n\n  .size-auto {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .modal {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
  "page": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    @apply flex flex-col w-full relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    @apply items-center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .padding-none { padding: 0; }\n\n  .padding-sm { padding: var(--spacing-sm, 0.5rem); }\n\n  .padding-md { padding: var(--spacing-md, 1rem); }\n\n  .padding-lg { padding: var(--spacing-lg, 1.5rem); }\n\n  .padding-xl { padding: var(--spacing-xl, 2rem); }\n}\n",
  "panel": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    @apply flex h-full w-full min-h-0 min-w-0 flex-row;\n    background: inherit;\n  }\n\n  .panel[data-stacked=\"true\"] { flex-direction: column; }\n\n  .header,\n  .footer {\n    @apply shrink-0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    @apply flex min-h-0 min-w-0;\n    flex: 1;\n    overflow: auto;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    @apply shrink-0 overflow-hidden;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--background-700);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--background-700);\n  }\n\n  /* Toggle */\n  .toggle {\n    @apply flex items-center;\n  }\n\n  /* Group */\n  .group {\n    @apply flex w-full h-full;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] { flex-direction: column; }\n\n  /* Resize handle */\n  .resize {\n    @apply relative shrink-0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--background-700, #374151);\n    transform: translateX(-50%);\n    transition: width 0.15s ease;\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before,\n  .resize[data-resizing=\"true\"]::before { width: 2px; }\n\n  .resize[data-direction=\"vertical\"]:hover::before,\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone,\n  .spacing-none { gap: 0; }\n\n  .spacingSm,\n  .spacing-sm { gap: var(--spacing-sm, 0.5rem); }\n\n  .spacingMd,\n  .spacing-md { gap: var(--spacing-md, 1rem); }\n\n  .spacingLg,\n  .spacing-lg { gap: var(--spacing-lg, 1.5rem); }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked { flex-direction: column; }\n  }\n}\n",
  "path": "@reference \"tailwindcss\";\n\n@layer components {\n  .path {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --disabled-opacity: 0.6;\n\n    @apply block;\n  }\n\n  .path-list {\n    list-style: none;\n    @apply m-0 flex flex-wrap items-center gap-2 p-0;\n    flex-wrap: wrap;\n  }\n\n  .path-list.with-custom-separator .path-item:not(:last-child)::after {\n    content: none;\n  }\n\n  .path-item {\n    @apply m-0 flex items-center gap-2 p-0;\n  }\n\n  /* Separator after each item except the last */\n  .path-item:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    @apply m-0 flex items-center p-0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .path-item-link {\n    @apply relative cursor-pointer rounded-sm px-2 py-1;\n    color: var(--foreground);\n    text-decoration: none;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    line-height: 1.5;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: var(--font-weight-medium);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
  "popover": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    @apply inline-block;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--popover-fill);\n    --frame-stroke-color: var(--popover-border-color);\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.2s ease-out, transform 0.2s ease-out;\n    pointer-events: none;\n    min-width: 200px;\n    max-width: 400px;\n    padding: 0.75rem;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1;\n    color: var(--foreground);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    @apply whitespace-nowrap;\n  }\n}\n",
  "progress": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    @apply relative w-full overflow-hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm { height: 0.25rem; }\n  .progress.md { height: 0.5rem; }\n  .progress.lg { height: 0.75rem; }\n\n  .fill {\n    @apply h-full;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    @apply w-full;\n  }\n\n  .wrapper.has-label {\n    @apply space-y-1;\n  }\n\n  .label-row {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n}\n",
  "radio": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    @apply flex flex-col gap-3;\n  }\n\n  .radio-item {\n    @apply flex items-start gap-3 cursor-pointer select-none;\n  }\n\n  .radio-input {\n    @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer\n  }\n\n  .radio {\n    --disabled-opacity: 0.6;\n\n    @apply relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: var(--ring-color);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    @apply cursor-pointer;\n    font-weight: var(--font-weight-medium);\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground);\n    font-size: inherit;\n    line-height: inherit;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled);\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper);\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error);\n  }\n  /* Size variants */\n  .radio.sm {\n    @apply h-4 w-4;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    @apply h-5 w-5;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    @apply h-6 w-6;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n}\n",
  "scroll": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    @apply relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n    min-height: 0;\n  }\n\n  .horizontal { --scrollbar-height: 12px; }\n\n  .content {\n    @apply h-full w-full;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical[data-inline=\"true\"] .content {\n    padding-right: 16px;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal[data-inline=\"true\"] .content {\n    padding-bottom: 16px;\n  }\n\n  .vertical .content::-webkit-scrollbar,\n  .horizontal .content::-webkit-scrollbar { display: none; }\n\n  .track {\n    @apply absolute;\n    z-index: 10;\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    background-color: var(--track-background);\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: var(--track-background);\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs) * 0.80);\n    background-color: var(--thumb-background);\n    transition-property: background-color, width, height;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover { background-color: var(--thumb-hover-background); }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--thumb-dragging-background);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: 150ms;\n  }\n\n  .vertical .thumb:hover,\n  .vertical[data-dragging=\"true\"] .thumb {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: 150ms;\n  }\n\n  .horizontal .thumb:hover,\n  .horizontal[data-dragging=\"true\"] .thumb {\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
  "select": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    --disabled-opacity: 0.5;\n    --padding-x: calc(var(--spacing) * 2.00);\n    --padding-y: calc(var(--spacing) * 1.75);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    font-size: var(--font-size);\n\n    @apply p-0 gap-0 w-full flex-row items-center;\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--border-color);\n    border-radius: var(--radius);\n\n    @apply select-none cursor-pointer;\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: var(--pressed-background);\n    }\n\n    &[aria-expanded=\"true\"] {\n      background-color: var(--hover-background);\n    }\n  }\n\n  .trigger {\n    @apply flex items-stretch flex-1 gap-0 w-full h-full min-h-0;\n\n    background: transparent;\n\n    @apply border-none cursor-pointer select-none;\n\n    @media (hover: hover) {\n      &:not(:disabled):hover .icon-section,\n      &:not(:disabled):hover .value-section:not(:empty) {\n        background-color: var(--hover-background);\n      }\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 2px var(--focus-ring-background), 0 0 0 4px var(--ring-color);\n      @apply outline-none;\n    }\n\n    :global(.group) &:focus-visible {\n      @apply outline-none;\n    }\n  }\n\n  button.trigger { @apply p-0; }\n\n  .value-section {\n    @apply flex items-center flex-1 min-w-0 gap-0.5;\n\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n    font-size: var(--font-size);\n\n    &:only-child {\n      border-radius: var(--inner-radius);\n      justify-content: center;\n    }\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    @apply flex items-center justify-center shrink-0;\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: 0 var(--inner-radius) var(--inner-radius) 0;\n  }\n\n  .icon {\n    @apply flex items-center justify-center w-4 h-4 opacity-70;\n  }\n\n  .trigger[aria-expanded=\"true\"] .icon,\n  .trigger[data-open=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    @apply flex items-center flex-1 min-w-0 gap-2 bg-transparent border-none p-0;\n    cursor: inherit;\n  }\n\n  .value-icon {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n    color: var(--foreground);\n  }\n\n  .value-text {\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .content,\n  .sub-content {\n    --padding-x: calc(var(--spacing) * 1.5);\n    --padding-y: var(--spacing);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    overflow: hidden;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n  }\n\n  .content-root,\n  .sub-content-root {\n    position: absolute;\n  }\n\n  .content {\n    &[data-state=\"open\"][data-placement=\"bottom\"] { animation: slide-in-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"open\"][data-placement=\"top\"] { animation: slide-in-from-bottom 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"bottom\"] { animation: slide-out-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"top\"] { animation: slide-out-from-bottom 0.15s var(--ease-snappy-pop); }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item {\n    --item-padding-x: var(--padding-x);\n    --item-padding-y: calc(var(--padding-y) * 1.15);\n\n    @apply flex items-center gap-2 outline-none cursor-default select-none;\n    padding: var(--item-padding-y) var(--item-padding-x);\n\n    border-radius: var(--inner-radius);\n    font-size: var(--font-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--item-foreground);\n\n    &[data-selected=\"true\"] {\n      color: var(--item-foreground);\n    }\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n    &[data-highlighted=\"true\"] {\n      background-color: var(--item-background-hover);\n    }\n  }\n\n  .item-content {\n    @apply flex flex-col flex-1 min-w-0;\n  }\n\n  .item-text {\n    @apply min-w-0 overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    font-size: var(--font-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--item-description-color);\n    @apply min-w-0 whitespace-normal break-words;\n  }\n\n  .item-icon, .item-indicator {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n  }\n\n  .item-icon { color: var(--item-icon-color); }\n  .item-indicator { color: var(--item-indicator-color); margin-left: auto; }\n\n  .item-with-description { @apply items-start py-2; }\n  .item-icon-with-description, .item-indicator-with-description { @apply mt-0.5; }\n\n  .separator {\n    @apply my-1 -mx-1 h-px;\n    background-color: var(--content-border); /* Reuses content border var */\n  }\n\n  .placeholder {\n    color: var(--placeholder-color);\n  }\n\n  .icon-prefix {\n    @apply inline-flex items-center shrink-0;\n  }\n\n  .select[data-mode=\"multiple\"] .item { gap: 0.5rem; }\n\n  .search-trigger {\n    @apply flex items-stretch relative bg-transparent cursor-text overflow-hidden;\n    border-radius: var(--inner-radius);\n    transition: box-shadow 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop);\n\n    --input-active-border-color: transparent;\n    --input-active-box-shadow: none;\n\n    &:focus-within {\n      @apply outline-none;\n      box-shadow: 0 0 0 1px var(--search-focus-ring);\n      z-index: 1;\n    }\n  }\n\n  .search-value-section {\n    @apply p-0;\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n  }\n\n  .input {\n    padding: var(--padding-y) calc(var(--padding-x) * 1.50);\n    padding-right: calc(var(--padding-x) * 2 + 1rem);\n    @apply border-none rounded-none shadow-none bg-transparent;\n\n    &[data-active], &[data-focus-visible] {\n      @apply border-none shadow-none;\n    }\n  }\n\n  .search-content-input {\n    padding-inline: calc(var(--padding-x) * 1.50);\n    @apply border-none rounded-none bg-transparent;\n  }\n\n  .search-icon-section {\n    @apply absolute right-0 top-0 bottom-0 flex items-center justify-center bg-transparent pointer-events-none;\n    padding-inline: var(--padding-x);\n  }\n\n\n  .search-wrapper {\n    @apply overflow-hidden;\n    border-bottom: var(--border-width-base, 1px) solid var(--content-border);\n  }\n\n  .content[data-placement=\"top\"] .search-wrapper {\n    border-radius: 0;\n    border-bottom: none;\n    border-top: var(--border-width-base, 1px) solid var(--content-border);\n  }\n\n  .sub-trigger {\n    --subtrigger-padding-x: var(--padding-x);\n    --subtrigger-padding-y: var(--padding-y);\n\n    @apply flex items-center gap-2 cursor-default select-none outline-none;\n    padding: var(--subtrigger-padding-y) var(--subtrigger-padding-x);\n    border-radius: var(--inner-radius);\n    font-size: var(--font-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--subtrigger-foreground);\n\n    &[data-highlighted=\"true\"],\n    &[data-state=\"open\"]:not([data-highlighted=\"true\"]) {\n      background-color: var(--subtrigger-background-hover);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      pointer-events: none;\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply shrink-0 ml-auto w-4 h-4 opacity-60;\n  }\n\n  .sub-content {\n    min-width: 160px;\n    max-width: 320px;\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-in-from-bottom { from { opacity: 0; translate: 0 2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-from-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n  @keyframes slide-out-from-bottom { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 2px; } }\n}\n",
  "slider": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    --disabled-opacity: 0.6;\n\n    @apply relative flex w-full items-center;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] { @apply h-6; }\n  .slider[data-size=\"md\"] { @apply h-8; }\n  .slider[data-size=\"lg\"] { @apply h-10; }\n\n  .slider[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n\n    @apply relative flex grow items-center;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: var(--radius-xs);\n    background-color: var(--slider-track-background);\n  }\n\n  .slider[data-size=\"sm\"] .track { height: var(--track-height-sm); }\n  .slider[data-size=\"md\"] .track { height: var(--track-height-md); }\n  .slider[data-size=\"lg\"] .track { height: var(--track-height-lg); }\n\n  .range {\n    @apply absolute h-full;\n    background-color: var(--slider-range-background-default);\n    transition: background-color 200ms var(--ease-snappy-pop);\n    border-radius: var(--radius-xs);\n  }\n\n  .slider[data-disabled] .range { background-color: var(--slider-range-background-disabled); }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n\n    @apply absolute block;\n    background-color: var(--slider-thumb-background-default);\n    border-radius: 9999px;\n    outline: none;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .slider[data-disabled] .thumb {\n    background-color: var(--slider-thumb-background-disabled);\n    cursor: not-allowed;\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--slider-thumb-background-focus);\n    box-shadow: 0 0 0 3px var(--slider-thumb-ring);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
  "switch": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --radius: 9999px;\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    --width: 2.75rem;\n    --height: 1.5rem;\n    --thumb-size: 1rem;\n    --thumb-offset: 0.25rem;\n\n    --disabled-opacity: 0.6;\n\n    @apply relative inline-flex cursor-pointer items-center;\n    user-select: none;\n    width: var(--width);\n    height: var(--height);\n  }\n\n  .switch-track {\n    @apply absolute inset-0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop), transform 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    @apply absolute top-0 bottom-0 my-auto;\n    left: var(--thumb-offset);\n    width: var(--thumb-size);\n    height: var(--thumb-size);\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--border-checked);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n    left: calc(var(--width) - var(--thumb-size) - var(--thumb-offset));\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n\n\n  .switch[data-focus-visible] {\n    box-shadow: var(--focus-ring);\n  }\n\n  .switch-sm {\n    --width: 1.75rem;\n    --height: 1rem;\n    --thumb-size: 0.625rem;\n    --thumb-offset: 0.1875rem;\n  }\n}\n",
  "tabs": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    @apply flex w-full flex-col;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .list {\n    @apply relative flex w-full flex-row items-center gap-3 py-1;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: auto;\n      min-width: 120px;\n      height: 100%;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--list-border-color);\n      align-items: stretch;\n    }\n  }\n\n  .indicator {\n    @apply absolute;\n    background-color: var(--indicator-background);\n    box-sizing: border-box;\n    border-radius: var(--radius-xs);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n\n  .indicator-fallback {\n    z-index: -1;\n  }\n\n  .indicator-underline {\n    border-radius: 0;\n  }\n\n  .trigger {\n    @apply relative z-[1] flex shrink-0 items-center justify-center gap-2 rounded-sm px-2 py-1.5 cursor-pointer select-none;\n    height: 100%;\n    background-color: transparent;\n    border: none;\n    color: var(--trigger-color);\n    outline: none;\n    transition: color 0.15s ease, background-color 0.15s ease;\n\n\n    &:not([data-disabled]) {\n      &:hover {\n        color: var(--trigger-hover-color);\n      }\n\n      &:active {\n        color: var(--trigger-active-color);\n      }\n    }\n\n    &[data-selected=\"true\"] {\n      color: var(--trigger-selected-color);\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]):not([data-indicator-fallback=\"true\"]) {\n      .list & {\n        background-color: var(--trigger-selected-background);\n      }\n\n      .list[data-variant=\"underline\"] & {\n        background-color: transparent;\n        border-bottom-color: var(--trigger-underline-color);\n      }\n\n      .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--trigger-underline-color);\n      }\n    }\n\n    &[data-focus-visible] {\n      background: var(--trigger-focus-background);\n      outline: none;\n    }\n\n    &[data-disabled=\"true\"] {\n      --disabled-opacity: 0.5;\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .list[data-variant=\"underline\"] & {\n      background-color: transparent;\n      border-radius: 0;\n      border-bottom: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]):not([data-indicator-fallback=\"true\"]) {\n      border-left-color: var(--trigger-underline-color);\n      border-bottom: none;\n    }\n  }\n\n  .trigger-icon {\n    @apply flex h-4 w-4 shrink-0 items-center justify-center;\n  }\n\n  .content {\n    @apply w-full p-0 outline-none;\n    flex: 1;\n    padding-top: 1rem;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--content-outline-color);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .list {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0;\n      }\n    }\n\n    .trigger {\n      @apply px-1 py-1;\n      .list[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
  "textarea": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --textarea-padding-x: 0.75rem;\n    --textarea-padding-y: 0.5rem;\n    --disabled-opacity: 0.6;\n\n    @apply block w-full px-3 py-2;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-sizing: border-box;\n    resize: none;\n    outline: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-error] {\n      border-color: var(--border);\n\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n\n    &[data-resize-axis=\"x\"],\n    &[data-resize-axis=\"both\"] {\n      padding-inline-end: calc(var(--textarea-padding-x) + 1rem);\n    }\n\n    &[data-resize-axis=\"y\"],\n    &[data-resize-axis=\"both\"] {\n      padding-block-end: calc(var(--textarea-padding-y) + 1rem);\n    }\n\n    &[data-scroll=\"true\"] {\n      overflow: hidden;\n      resize: none;\n      background: transparent;\n      border: none;\n      border-radius: 0;\n      box-shadow: none;\n\n      &[data-active],\n      &[data-focus-visible] {\n        border-color: transparent;\n        box-shadow: none;\n      }\n\n      &[data-disabled] {\n        background-color: transparent;\n        opacity: 1;\n      }\n\n      &[data-error] {\n        border-color: transparent;\n\n        &[data-active] {\n          border-color: transparent;\n          box-shadow: none;\n        }\n      }\n    }\n  }\n\n  .surface {\n    @apply relative w-full;\n  }\n\n  .resize-handle {\n    position: absolute;\n    z-index: 1;\n    touch-action: none;\n    user-select: none;\n\n    &::before {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--resize-handle-color);\n      transition: background-color 150ms;\n    }\n\n    &::after {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--resize-handle-color);\n      transition: background-color 150ms;\n    }\n\n    &:hover::before,\n    &:hover::after {\n      background-color: var(--resize-handle-color-hover);\n    }\n\n    &[data-axis=\"both\"] {\n      right: 3px;\n      bottom: 3px;\n      width: 1.5rem;\n      height: 1.5rem;\n      cursor: nwse-resize;\n\n      &::before {\n        bottom: 0.35rem;\n        right: 0.15rem;\n        width: 0.5rem;\n        height: 0.125rem;\n        transform: rotate(-45deg);\n        transform-origin: center;\n      }\n\n      &::after {\n        bottom: 0.6rem;\n        right: 0.2rem;\n        width: 1.0rem;\n        height: 0.125rem;\n        transform: rotate(-45deg);\n        transform-origin: center;\n      }\n    }\n\n    &[data-axis=\"x\"] {\n      top: 50%;\n      right: 0;\n      width: 0.75rem;\n      height: 2rem;\n      cursor: ew-resize;\n      transform: translateY(-50%);\n\n      &::before {\n        top: 50%;\n        left: 50%;\n        width: 0.125rem;\n        height: 1.5rem;\n        transform: translate(-50%, -50%);\n      }\n    }\n\n    &[data-axis=\"y\"] {\n      left: 50%;\n      bottom: 0;\n      width: 2rem;\n      height: 0.75rem;\n      cursor: ns-resize;\n      transform: translateX(-50%);\n\n      &::before {\n        top: 50%;\n        left: 50%;\n        width: 1.5rem;\n        height: 0.125rem;\n        transform: translate(-50%, -50%);\n      }\n    }\n  }\n\n  .scroll-wrapper {\n    --disabled-opacity: 0.6;\n\n    @apply w-full overflow-hidden;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-error] {\n      border-color: var(--border);\n\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    --textarea-padding-x: 0.5rem;\n    --textarea-padding-y: 0.25rem;\n    font-size: var(--text-sm);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    --textarea-padding-x: 0.75rem;\n    --textarea-padding-y: 0.5rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    --textarea-padding-x: 1rem;\n    --textarea-padding-y: 0.75rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    @apply w-full;\n  }\n\n  .character-count {\n    font-size: var(--text-sm);\n    color: var(--character-count-color);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .character-count[data-over-limit] {\n    color: var(--character-count-over-limit-color);\n  }\n}\n",
  "toast": "@reference \"tailwindcss\";\n\n@layer components {\n  .toast {\n    @apply flex w-full max-w-[28rem] items-start gap-3 px-4 py-2.5 select-none;\n    background: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-shadow: var(--shadow);\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n    touch-action: pan-y;\n  }\n\n  .icon {\n    @apply mr-4 mt-2 h-5 w-5 shrink-0;\n    color: var(--icon-color);\n  }\n\n  .content {\n    @apply min-w-0 flex-1;\n  }\n\n  .title {\n    @apply m-0;\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-sm);\n    line-height: var(--leading-tight);\n    color: var(--title-color);\n  }\n\n  .description {\n    @apply mt-1 mb-0;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n    color: var(--description-color);\n  }\n\n  .close {\n    @apply flex shrink-0 items-center justify-center p-2 cursor-pointer;\n    background: transparent;\n    border: none;\n    border-radius: var(--radius-sm);\n    color: var(--close-color);\n    opacity: 0.6;\n    transition: opacity 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n\n    @media (hover: hover) {\n      &:hover {\n        opacity: 1;\n        background: var(--close-hover-background);\n      }\n    }\n  }\n}\n",
  "tooltip": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: contents;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--tooltip-fill);\n    --frame-stroke-color: var(--tooltip-border-color);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1 whitespace-nowrap;;\n    color: var(--foreground);\n  }\n\n  .frame[data-hint] {\n    @apply pr-1;\n  }\n}\n"
};

export const generatedSourceCode: Record<string, ComponentSourceCode> = {
  "anchor": {
    "tsx": "import * as React from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { Tooltip } from \"@/components/Tooltip\";\nimport css from \"./Anchor.module.css\";\n\ntype Orientation = \"horizontal\" | \"vertical\";\ntype Size = \"sm\" | \"md\" | \"lg\";\n\ninterface AnchorStyleSlots {\n  root?: StyleValue;\n  underline?: StyleValue;\n  preview?: StyleValue;\n}\n\ntype AnchorStylesProp = StylesProp<AnchorStyleSlots>;\n\nconst resolveAnchorBaseStyles = createStylesResolver(['root', 'underline', 'preview'] as const);\nconst ANCHOR_PREVIEW_DISPLAY_NAME = \"Anchor.Preview\";\nconst ANCHOR_UNDERLINE_DISPLAY_NAME = \"Anchor.Underline\";\n\nconst DASHED_DIMENSIONS = {\n  sm: { thickness: 1, dashLength: 8, gapLength: 4 },\n  md: { thickness: 2, dashLength: 8, gapLength: 4 },\n  lg: { thickness: 4, dashLength: 10, gapLength: 6 },\n} as const;\n\nconst DOTTED_DIMENSIONS = {\n  sm: { thickness: 1, radius: 0.5, spacing: 6 },\n  md: { thickness: 2, radius: 1, spacing: 8 },\n  lg: { thickness: 4, radius: 2, spacing: 12 },\n} as const;\n\nfunction getPath(orientation: Orientation, size: Size): string {\n  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size];\n  const totalLength = dashLength + gapLength;\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\nfunction getDottedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size];\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\ntype CompoundComponentType = {\n  displayName?: string;\n  name?: string;\n  render?: {\n    displayName?: string;\n    name?: string;\n  };\n};\n\nfunction matchesCompoundComponent(\n  childType: React.JSXElementConstructor<any> | string | undefined,\n  component: React.JSXElementConstructor<any>,\n  displayName: string,\n): boolean {\n  if (!childType) {\n    return false;\n  }\n\n  if (childType === component) {\n    return true;\n  }\n\n  if (typeof childType === \"string\") {\n    return false;\n  }\n\n  const componentType = childType as CompoundComponentType;\n\n  return (\n    componentType.displayName === displayName ||\n    componentType.name === displayName ||\n    componentType.render?.displayName === displayName ||\n    componentType.render?.name === displayName\n  );\n}\n\n// --- Sub-components ---\n\nexport interface AnchorPreviewProps\n  extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n}\n\nexport function AnchorPreview({ children }: AnchorPreviewProps) {\n  return null;\n}\nAnchorPreview.displayName = ANCHOR_PREVIEW_DISPLAY_NAME;\n\ninterface AnchorUnderlineProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Controls the line style of the underline */\n  variant?: \"solid\" | \"dashed\" | \"dotted\";\n}\n\nconst AnchorUnderline = React.forwardRef<HTMLDivElement, AnchorUnderlineProps>(\n  ({ className, variant = \"solid\", style, ...props }, ref) => {\n    const getMaskStyles = (): React.CSSProperties => {\n      if (variant === \"solid\") return {}\n\n      const orientation = \"horizontal\";\n      const size = \"sm\";\n\n      const svgDataUri = variant === \"dashed\" ? getPath(orientation, size) : getDottedMaskSvg(orientation, size);\n      const maskRepeat = \"repeat-x\";\n      const encodedSvg = `url(\"data:image/svg+xml,${svgDataUri}\")`;\n\n      return {\n        WebkitMaskImage: encodedSvg,\n        maskImage: encodedSvg,\n        WebkitMaskRepeat: maskRepeat,\n        maskRepeat: maskRepeat,\n      } as React.CSSProperties;\n    };\n\n    return (\n      <span\n        ref={ref}\n        className={cn(css.underline, className)}\n        style={{ ...getMaskStyles(), ...style }}\n        {...props}\n      />\n    );\n  }\n);\nAnchorUnderline.displayName = ANCHOR_UNDERLINE_DISPLAY_NAME;\n\n// --- Main Anchor Component ---\n\nexport interface AnchorProps\n  extends Omit<React.HTMLAttributes<HTMLElement>, \"onChange\"> {\n  children?: React.ReactNode;\n  /** Additional CSS class for the anchor element */\n  className?: string;\n  /** URL the anchor navigates to */\n  href?: string;\n  /** Browsing context for the link (e.g. \"_blank\") */\n  target?: string;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: AnchorStylesProp;\n  /** Preview content to show in a tooltip on hover. Use this in server components instead of <Anchor.Preview>. */\n  preview?: React.ReactNode;\n}\n\nconst AnchorRoot = React.forwardRef<HTMLAnchorElement | HTMLSpanElement, AnchorProps>(\n  ({ className, children, href, target = \"_blank\", styles, preview: previewProp, ...props }, ref) => {\n    let previewContent: React.ReactNode = previewProp ?? null;\n    let hasUnderline = false;\n\n    const childrenArray = React.Children.toArray(children);\n    const resolved = resolveAnchorBaseStyles(styles);\n\n    let filteredChildren: React.ReactNode[] = [];\n\n    // Extract preview content and filter it out from rendered children\n    React.Children.forEach(childrenArray, (child) => {\n      if (React.isValidElement(child)) {\n        if (matchesCompoundComponent(child.type, AnchorPreview, ANCHOR_PREVIEW_DISPLAY_NAME)) {\n          if (!previewProp) previewContent = (child.props as any).children;\n          // Don't add to filteredChildren\n        } else if (matchesCompoundComponent(child.type, AnchorUnderline, ANCHOR_UNDERLINE_DISPLAY_NAME)) {\n          hasUnderline = true;\n          // Clone AnchorUnderline to inject resolved.underline\n          const underlineChild = child as React.ReactElement<AnchorUnderlineProps>;\n          filteredChildren.push(React.cloneElement(underlineChild, {\n            className: cn(underlineChild.props.className, resolved.underline),\n          }));\n        } else {\n          filteredChildren.push(child);\n        }\n      } else {\n        filteredChildren.push(child);\n      }\n    });\n\n    // Inject default underline if none provided\n    if (!hasUnderline) {\n      filteredChildren.push(<AnchorUnderline key=\"__default_underline\" className={resolved.underline} />);\n    }\n\n    const triggerElement = href ? (\n      <a\n        ref={ref as React.Ref<HTMLAnchorElement>}\n        href={href}\n        target={target}\n        rel={target === \"_blank\" ? \"noopener noreferrer\" : undefined}\n        className={cn(\"anchor\", \"trigger\", css.trigger, className, resolved.root)}\n        {...props}\n      >\n        {filteredChildren}\n      </a>\n    ) : (\n      <span\n        ref={ref as React.Ref<HTMLSpanElement>}\n        className={cn(\"anchor\", \"trigger\", css.trigger, className, resolved.root)}\n        {...props}\n      >\n        {filteredChildren}\n      </span>\n    );\n\n    // If no preview content, render trigger directly without a tooltip wrapper.\n    if (!previewContent) {\n      return triggerElement;\n    }\n\n    return (\n      <Tooltip\n        content={previewContent}\n        showArrow\n        position=\"top\"\n        className={cn(\"preview\", css.preview)}\n        styles={{ content: resolved.preview }}\n      >\n        {triggerElement}\n      </Tooltip>\n    );\n  },\n);\nAnchorRoot.displayName = \"Anchor\";\n\n// Compound component with attached sub-components\nconst Anchor = Object.assign(AnchorRoot, {\n  Preview: AnchorPreview,\n  Underline: AnchorUnderline,\n});\n\nexport { Anchor };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .preview, .anchor {\n    display: inline\n  }\n\n  .trigger {\n    @apply inline-block relative cursor-pointer;\n    color: var(--foreground);\n    text-decoration: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:hover .underline {\n      background: var(--underline-background-hover);\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring);\n      outline-offset: 2px;\n      border-radius: 2px;\n    }\n  }\n\n  .underline {\n    @apply absolute left-0 right-0 bottom-0 h-px;\n    background: var(--underline-background);\n    transform-origin: right;\n    transform: scaleX(1);\n    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n}\n",
    "cssTypes": "export const anchor: string;\nexport const preview: string;\nexport const trigger: string;\nexport const underline: string;"
  },
  "badge": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\n\nimport { useFocusRing } from \"@react-aria/focus\";\nimport { mergeProps, } from \"@react-aria/utils\";\nimport { useHover } from \"@react-aria/interactions\";\nimport { useButton } from \"@react-aria/button\";\n\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Badge.module.css\";\n\nimport { X } from \"lucide-react\";\n\ntype BadgeSize = \"sm\" | \"md\" | \"lg\";\n\ninterface BadgeStyleSlots {\n  root?: StyleValue;\n  icon?: StyleValue;\n  dismiss?: StyleValue;\n}\n\ntype BadgeStylesProp = StylesProp<BadgeStyleSlots>;\n\nexport interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {\n  /** Visual color style of the badge */\n  variant?: string;\n  /** Size of the badge */\n  size?: BadgeSize;\n  /** Icon element displayed before the badge label */\n  icon?: React.ReactNode;\n  /** Whether to show a dismiss button */\n  dismissible?: boolean;\n  /** Called when the dismiss button is clicked */\n  onDismiss?: () => void;\n  /** Whether to render with a fully rounded pill shape */\n  pill?: boolean;\n  /** Numeric count to display; replaces children when provided */\n  count?: number;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: BadgeStylesProp;\n}\n\nconst sizeMap = {\n  sm: css[\"sm\"],\n  md: css[\"md\"],\n  lg: css[\"lg\"],\n} as const;\n\ninterface DismissButtonProps {\n  onDismiss?: () => void;\n  size: BadgeSize;\n  className?: StyleValue;\n}\n\nfunction DismissButton({ onDismiss, size, className }: DismissButtonProps) {\n  const buttonRef = React.useRef<HTMLDivElement>(null);\n\n  const { buttonProps, isPressed } = useButton(\n    {\n      \"aria-label\": \"Dismiss\",\n      onPress: onDismiss,\n    },\n    buttonRef\n  );\n\n  const { focusProps, isFocusVisible } = useFocusRing();\n  const { hoverProps, isHovered } = useHover({});\n\n  return (\n    <div\n      {...mergeProps(buttonProps, focusProps, hoverProps)}\n      ref={buttonRef}\n      role=\"button\"\n      tabIndex={0}\n      className={cn(css.dismiss, className)}\n      data-pressed={isPressed || undefined}\n      data-hovered={isHovered || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n    >\n      <X size={14} />\n    </div>\n  );\n}\n\nconst resolveBadgeBaseStyles = createStylesResolver(['root', 'icon', 'dismiss'] as const);\n\nconst Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(\n  (\n    {\n      variant = \"default\",\n      size = \"sm\",\n      icon,\n      dismissible = false,\n      onDismiss,\n      pill = false,\n      count,\n      children,\n      className,\n      styles,\n      ...props\n    },\n    ref\n  ) => {\n    const resolved = resolveBadgeBaseStyles(styles);\n    return (\n      <span\n        ref={ref}\n        className={cn(\n          \"badge\",\n          variant,\n          size,\n          css.badge,\n          sizeMap[size],\n          pill && css.pill,\n          dismissible && css.dismissible,\n          className,\n          resolved.root\n        )}\n        data-variant={variant}\n        data-size={size}\n        data-pill={pill ? \"true\" : undefined}\n        data-dismissible={dismissible || undefined}\n        {...props}\n      >\n        {icon && (\n          <span className={cn(css.icon, resolved.icon)} aria-hidden=\"true\">\n            {icon}\n          </span>\n        )}\n        {count !== undefined ? count : children}\n        {dismissible && <DismissButton onDismiss={onDismiss} size={size} className={resolved.dismiss} />}\n      </span>\n    );\n  }\n);\n\nBadge.displayName = \"Badge\";\n\nexport { Badge };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .badge {\n    @apply inline-flex items-center justify-center gap-2 px-3 py-0.5;\n    height: fit-content;\n    width: fit-content;\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--background-border);\n    border-radius: var(--radius-sm);\n  }\n\n  .badge.sm {\n    @apply px-1.5 py-px;\n    gap: 0.25rem;\n    font-size: var(--text-sm);\n  }\n\n  .badge.dismissible {\n    @apply pr-0.5;\n  }\n\n  .badge.md {\n    @apply px-3.5 py-1;\n    font-size: var(--text-sm);\n  }\n\n  .badge.lg {\n    @apply px-4 py-2.5;\n    font-size: var(--text-sm);\n  }\n\n  .pill { border-radius: 9999px; }\n\n  .icon {\n    @apply flex items-center shrink-0;\n  }\n\n  .dismiss {\n    @apply ml-1 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-xs);\n    background: transparent;\n    border: none;\n    color: var(--dismiss-color);\n    transition: opacity 150ms var(--ease-snappy-pop), transform 150ms var(--ease-snappy-pop);\n    outline: none;\n  }\n\n  .dismiss-button[data-hovered=\"true\"] {\n    background: var(--dismiss-hover-background);\n  }\n\n  .dismiss-button[data-pressed=\"true\"] {\n    background: var(--dismiss-pressed-background);\n    transform: scale(0.95);\n  }\n\n  .dismiss-button[data-focus-visible=\"true\"] {\n    outline: 2px solid currentColor;\n    outline-offset: 1px;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  badge: string;\n  default: string;\n  secondary: string;\n  success: string;\n  warning: string;\n  danger: string;\n  info: string;\n  sm: string;\n  md: string;\n  lg: string;\n  pill: string;\n  dismissible: string;\n  icon: string;\n  dismiss: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "banner": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useHover, mergeProps } from \"react-aria\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Banner.module.css\";\nimport { Info, CircleCheck, TriangleAlert, CircleAlert } from \"lucide-react\";\n\ntype BannerSize = \"sm\" | \"md\" | \"lg\";\n\ninterface BannerStyleSlots {\n  root?: StyleValue;\n  \"icon-container\"?: StyleValue;\n  content?: StyleValue;\n  dismiss?: StyleValue;\n}\n\ntype BannerStylesProp = StylesProp<BannerStyleSlots>;\n\nexport interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Variant class appended to the root element. Accepts any string. */\n  variant?: string;\n  /** Controls the padding and font size of the banner */\n  size?: BannerSize;\n  /** When true, renders a dismiss button that hides the banner on click */\n  isDismissible?: boolean;\n  /** Called when the dismiss button is clicked */\n  onDismiss?: () => void;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: BannerStylesProp;\n}\n\ninterface BannerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: StyleValue;\n}\n\ninterface BannerBodyProps extends React.HTMLAttributes<HTMLParagraphElement> {\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: StyleValue;\n}\n\nconst bannerIcons = {\n  note: Info,\n  info: Info,\n  success: CircleCheck,\n  warning: TriangleAlert,\n  danger: CircleAlert,\n} as const;\n\ntype PresetBannerVariant = keyof typeof bannerIcons;\n\nfunction isPresetBannerVariant(variant: string): variant is PresetBannerVariant {\n  return Object.prototype.hasOwnProperty.call(bannerIcons, variant);\n}\n\nconst getBannerIcon = (variant: string) => {\n  const Icon = bannerIcons[isPresetBannerVariant(variant) ? variant : \"note\"];\n  return <Icon className={css.icon} />;\n};\n\nconst sizeMap = {\n  sm: css[\"sm\"],\n  md: css[\"md\"],\n  lg: css[\"lg\"],\n} as const;\n\nconst resolveBannerBaseStyles = createStylesResolver(['root', 'icon-container', 'content', 'dismiss'] as const);\n\n/** Heading text for the banner message */\nconst BannerTitle = React.forwardRef<HTMLHeadingElement, BannerTitleProps>(\n  ({ className, styles, ...props }, ref) => (\n    <h3\n      ref={ref}\n      className={cn(\"title\", css.title, className, styles)}\n      {...props}\n    />\n  )\n);\n\nBannerTitle.displayName = \"Banner.Title\";\n\n/** Body text content of the banner */\nconst BannerBody = React.forwardRef<HTMLParagraphElement, BannerBodyProps>(\n  ({ className, styles, ...props }, ref) => (\n    <p\n      ref={ref}\n      className={cn(\"body\", css.body, className, styles)}\n      {...props}\n    />\n  )\n);\n\nBannerBody.displayName = \"Banner.Body\";\n\n/** Full-width notification strip for system messages and alerts */\nconst BannerRoot = React.forwardRef<HTMLDivElement, BannerProps>(\n  (\n    {\n      className,\n      styles,\n      variant = \"note\",\n      size = \"md\",\n      isDismissible = false,\n      onDismiss,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    const [isVisible, setIsVisible] = React.useState(true);\n    const { hoverProps, isHovered } = useHover({});\n\n    const handleDismiss = () => {\n      setIsVisible(false);\n      onDismiss?.();\n    };\n\n    if (!isVisible) {\n      return null;\n    }\n\n    const icon = getBannerIcon(variant);\n    const resolved = resolveBannerBaseStyles(styles);\n\n    return (\n      <div\n        {...mergeProps(hoverProps, props)}\n        ref={ref}\n        className={cn(\"banner\", variant, css.banner, sizeMap[size], className, resolved.root)}\n        data-variant={variant}\n        data-size={size}\n        data-hovered={isHovered ? \"true\" : \"false\"}\n      >\n        {icon && <div className={cn(\"icon\", css.icon, resolved[\"icon-container\"])}>{icon}</div>}\n        <div className={cn(\"content\", css.content, resolved.content)}>\n          {children}\n        </div>\n        {isDismissible && (\n          <button\n            onClick={handleDismiss}\n            className={cn(\"dismiss\", css.dismiss, resolved.dismiss)}\n            aria-label=\"Dismiss banner\"\n            type=\"button\"\n          >\n            <svg\n              width=\"16\"\n              height=\"16\"\n              viewBox=\"0 0 16 16\"\n              fill=\"none\"\n              stroke=\"currentColor\"\n              strokeWidth=\"2\"\n              strokeLinecap=\"round\"\n              strokeLinejoin=\"round\"\n            >\n              <line x1=\"4\" y1=\"4\" x2=\"12\" y2=\"12\" />\n              <line x1=\"12\" y1=\"4\" x2=\"4\" y2=\"12\" />\n            </svg>\n          </button>\n        )}\n      </div>\n    );\n  }\n);\n\nBannerRoot.displayName = \"Banner\";\n\ninterface BannerComponent extends React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>> {\n  Title: typeof BannerTitle;\n  Body: typeof BannerBody;\n}\n\nconst Banner = Object.assign(BannerRoot, {\n  Title: BannerTitle,\n  Body: BannerBody,\n}) as BannerComponent;\n\nexport { Banner };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .banner {\n    @apply flex w-full items-start gap-4;\n    font-family: inherit;\n    font-weight: var(--font-weight-medium);\n    line-height: var(--leading-normal);\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out, border-color 0.15s ease-out;\n  }\n\n  .content {\n    @apply flex flex-col gap-2;\n  }\n\n  .icon-container {\n    @apply flex shrink-0 items-center justify-center self-start;\n  }\n\n  .icon {\n    @apply mr-4 h-5 w-5;\n    color: var(--icon-color, currentColor);\n  }\n\n  .dismiss {\n    @apply flex h-8 w-8 shrink-0 items-center justify-center p-0 cursor-pointer;\n    background-color: transparent;\n    color: currentColor;\n    border: none;\n    border-radius: var(--radius-sm);\n    transition: background-color 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n  }\n\n  .title {\n    font-weight: var(--font-weight-semibold);\n    font-size: inherit;\n    line-height: var(--leading-tight);\n    @apply my-0;\n  }\n\n  .body {\n    font-weight: var(--font-weight-medium);\n    font-size: inherit;\n    line-height: var(--leading-normal);\n    @apply my-0;\n  }\n}\n\n\n.banner.sm {\n  @apply px-3 py-2;\n}\n\n.banner.md {\n  @apply px-4 py-3;\n}\n\n.banner.lg {\n  @apply px-6 py-4;\n}\n",
    "cssTypes": "declare const styles: {\n  banner: string;\n  content: string;\n  dismiss: string;\n  note: string;\n  info: string;\n  success: string;\n  warning: string;\n  danger: string;\n  sm: string;\n  md: string;\n  lg: string;\n  icon: string;\n  icon: string;\n  title: string;\n  body: string;\n};\n\nexport default styles;\n"
  },
  "button": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\n\nimport { mergeProps, } from \"@react-aria/utils\";\nimport { useHover } from \"@react-aria/interactions\";\nimport { useFocusRing } from \"@react-aria/focus\"\nimport { useButton } from \"@react-aria/button\";\n\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Button.module.css\";\n\ntype ButtonSize = (string & {});\ntype ButtonIconSlots = {\n  left?: React.ReactNode;\n  right?: React.ReactNode;\n};\n\ninterface ButtonIconStyles {\n  left?: StyleValue;\n  right?: StyleValue;\n}\n\nexport interface ButtonStyleSlots {\n  root?: StyleValue;\n  icon?: StyleValue | ButtonIconStyles;\n}\n\nexport type ButtonStylesProp = StylesProp<ButtonStyleSlots>;\n\nconst resolveButtonBaseStyles = createStylesResolver(['root', 'iconLeft', 'iconRight'] as const);\n\nfunction resolveButtonStyles(styles: ButtonStylesProp | undefined) {\n  if (!styles || typeof styles === 'string' || Array.isArray(styles)) return resolveButtonBaseStyles(styles)\n  const { root, icon } = styles;\n\n  let iconLeft: StyleValue | undefined;\n  let iconRight: StyleValue | undefined;\n\n  if (icon) {\n    if (typeof icon === 'string' || Array.isArray(icon)) {\n      iconLeft = icon;\n      iconRight = icon;\n    } else {\n      iconLeft = icon.left;\n      iconRight = icon.right;\n    }\n  }\n\n  return resolveButtonBaseStyles({ root, iconLeft, iconRight });\n}\n\nexport interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"href\" | \"target\"> {\n  /** Variant class appended to the root element. Accepts any string. */\n  variant?: string;\n  /** Size class appended to the root element. Accepts any string. */\n  size?: ButtonSize;\n  /** Disables interaction and applies disabled styling */\n  isDisabled?: boolean;\n  /** React Aria press handler — preferred over onClick for accessibility */\n  onPress?: (e: { target: EventTarget | null }) => void;\n  /** Icon slots rendered before (left) or after (right) the button label */\n  icon?: React.ReactNode | ButtonIconSlots;\n  /** Renders the button as an anchor element when provided */\n  href?: string;\n  /** Browsing context for the anchor variant (e.g. \"_blank\") */\n  target?: React.HTMLAttributeAnchorTarget;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: ButtonStylesProp;\n}\n\nfunction isButtonIconSlots(icon: ButtonProps[\"icon\"]): icon is ButtonIconSlots {\n  return typeof icon === \"object\" && icon !== null && !React.isValidElement(icon) && ('left' in icon || 'right' in icon);\n}\n\nfunction resolveButtonIcon(icon: ButtonProps[\"icon\"]) {\n  if (!icon) {\n    return undefined;\n  }\n\n  if (isButtonIconSlots(icon)) {\n    return icon;\n  }\n\n  return { left: icon };\n}\n\nfunction resolveButtonIconSizeClass(size: ButtonSize | undefined) {\n  if (!size) {\n    return undefined;\n  }\n\n  return (css as unknown as Record<string, string | undefined>)[`icon-${size}`];\n}\n\nconst Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(\n  ({ className, styles, variant = \"default\", size = \"md\", children, onClick, onPress, isDisabled, disabled, icon, href, target, rel, ...props }, ref) => {\n    const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);\n    const mergedRef = useMergedRef(ref, buttonRef);\n    const isButtonDisabled = isDisabled ?? disabled ?? false;\n    const [isPressed, setIsPressed] = React.useState(false);\n    const isAnchor = !!href;\n\n    const handlePress = React.useCallback((e: any) => {\n      if (onPress) onPress({ target: e.target });\n      if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);\n    }, [onPress, onClick]);\n\n    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {\n      if (!isButtonDisabled) {\n        setIsPressed(true);\n      }\n      props.onMouseDown?.(e as any);\n    }, [isButtonDisabled, props]);\n\n    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {\n      setIsPressed(false);\n      props.onMouseUp?.(e as any);\n    }, [props]);\n\n    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {\n      setIsPressed(false);\n      props.onMouseLeave?.(e as any);\n    }, [props]);\n\n    const { buttonProps } = useButton({\n      isDisabled: isButtonDisabled,\n      onPress: handlePress,\n    }, buttonRef as React.RefObject<HTMLButtonElement>);\n\n    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });\n    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });\n\n    const resolved = resolveButtonStyles(styles);\n    const resolvedIcon = resolveButtonIcon(icon);\n    const iconSizeClassName = resolveButtonIconSizeClass(size);\n    const buttonClassName = cn(\"button\", variant, size, css.button, className, resolved.root);\n\n    if (isAnchor) {\n      return (\n        <a\n          {...mergeProps(focusProps, hoverProps, props as any)}\n          ref={mergedRef as unknown as React.RefObject<HTMLAnchorElement>}\n          href={href}\n          target={target}\n          rel={rel ?? (target === \"_blank\" ? \"noopener noreferrer\" : undefined)}\n          onMouseDown={handleMouseDown}\n          onMouseUp={handleMouseUp}\n          onMouseLeave={handleMouseLeave}\n          className={buttonClassName}\n          data-disabled={isButtonDisabled ? \"true\" : undefined}\n          data-pressed={isPressed ? \"true\" : \"false\"}\n          data-hovered={isHovered ? \"true\" : \"false\"}\n          data-focused={isFocused ? \"true\" : \"false\"}\n          data-focus-visible={isFocusVisible ? \"true\" : \"false\"}\n        >\n          {resolvedIcon?.left && <span className={cn(iconSizeClassName, resolved.iconLeft)}>{resolvedIcon.left}</span>}\n          {children}\n          {resolvedIcon?.right && <span className={cn(iconSizeClassName, resolved.iconRight)}>{resolvedIcon.right}</span>}\n        </a>\n      );\n    }\n\n    return (\n      <button\n        {...mergeProps(buttonProps, focusProps, hoverProps, props)}\n        ref={mergedRef as unknown as React.RefObject<HTMLButtonElement>}\n        onMouseDown={handleMouseDown}\n        onMouseUp={handleMouseUp}\n        onMouseLeave={handleMouseLeave}\n        className={buttonClassName}\n        data-disabled={isButtonDisabled ? \"true\" : undefined}\n        data-pressed={isPressed ? \"true\" : \"false\"}\n        data-hovered={isHovered ? \"true\" : \"false\"}\n        data-focused={isFocused ? \"true\" : \"false\"}\n        data-focus-visible={isFocusVisible ? \"true\" : \"false\"}\n      >\n        {resolvedIcon?.left && <span className={cn(iconSizeClassName, resolved.iconLeft)}>{resolvedIcon.left}</span>}\n        {children}\n        {resolvedIcon?.right && <span className={cn(iconSizeClassName, resolved.iconRight)}>{resolvedIcon.right}</span>}\n      </button>\n    );\n  }\n);\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return (value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nButton.displayName = \"Button\";\n\nexport { Button };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .button {\n    @apply inline-flex items-center justify-center gap-2 select-none cursor-pointer whitespace-nowrap;\n    /* height: fit-content; */\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--background-border);\n    border-radius: var(--radius-sm, 0.375rem);\n\n    font-weight: var(--font-weight-medium, 500);\n    font-size: var(--text-sm, 0.875rem);\n    line-height: var(--leading-tight, 1.25);\n\n    &:hover:not(:disabled) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:active:not(:disabled) {\n      filter: brightness(0.8);\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 1.5px var(--focus-visible);\n      outline: none;\n    }\n\n    &:disabled {\n      opacity: 0.5;\n      cursor: not-allowed;\n      filter: grayscale(0.5);\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  button: string;\n  \"default\": string;\n  \"primary\": string;\n  \"secondary\": string;\n  \"outline\": string;\n  \"ghost\": string;\n  \"danger\": string;\n  \"sm\": string;\n  \"md\": string;\n  \"lg\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "card": {
    "tsx": "\"use client\"\n\nimport React from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport styles from \"./Card.module.css\";\n\ninterface CardProps extends React.HTMLAttributes<HTMLDivElement> {\n  styles?: CardStylesProp;\n}\n\ninterface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface CardStyleSlots {\n  root?: StyleValue;\n  header?: StyleValue;\n  body?: StyleValue;\n  footer?: StyleValue;\n}\n\ntype CardStylesProp = StylesProp<CardStyleSlots>;\n\nconst resolveCardBaseStyles = createStylesResolver(['root', 'header', 'body', 'footer'] as const);\n\nconst CardStylesContext = React.createContext<Record<keyof CardStyleSlots, string>>({\n  root: '',\n  header: '',\n  body: '',\n  footer: '',\n});\n\nconst CardRoot = React.forwardRef<HTMLDivElement, CardProps>(\n  ({ className, styles: stylesProp, ...props }, ref) => {\n    const resolvedStyles = resolveCardBaseStyles(stylesProp);\n    return (\n      <CardStylesContext.Provider value={resolvedStyles}>\n        <div\n          ref={ref}\n          className={cn('card', styles.card, resolvedStyles.root, className)}\n          {...props}\n        />\n      </CardStylesContext.Provider>\n    );\n  }\n);\nCardRoot.displayName = \"Card\";\n\n/** Top section of the card, typically containing a title or toolbar */\nconst CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(\n  ({ className, ...props }, ref) => {\n    const { header } = React.useContext(CardStylesContext);\n    return (\n      <div\n        ref={ref}\n        className={cn('card', 'header', styles.header, header, className)}\n        {...props}\n      />\n    );\n  }\n);\nCardHeader.displayName = \"Card.Header\";\n\n/** Main content area of the card */\nconst CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(\n  ({ className, ...props }, ref) => {\n    const { body } = React.useContext(CardStylesContext);\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.body, body, className)}\n        {...props}\n      />\n    );\n  }\n);\nCardBody.displayName = \"Card.Body\";\n\n/** Bottom section of the card, typically containing actions */\nconst CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(\n  ({ className, ...props }, ref) => {\n    const { footer } = React.useContext(CardStylesContext);\n    return (\n      <div\n        ref={ref}\n        className={cn('card', 'footer', styles.footer, footer, className)}\n        {...props}\n      />\n    );\n  }\n);\nCardFooter.displayName = \"Card.Footer\";\n\n// Compound component\nconst Card = Object.assign(CardRoot, {\n  Header: CardHeader,\n  Body: CardBody,\n  Footer: CardFooter,\n});\n\nexport { Card, CardHeader, CardBody, CardFooter };\nexport type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .card {\n    @apply overflow-hidden;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n  }\n\n  .card[data-focused=\"true\"] {\n    outline: 2px solid var(--focus-ring);\n    outline-offset: 2px;\n  }\n\n  .header {\n    @apply p-4;\n    border-bottom: var(--border-width-base) solid var(--border);\n  }\n\n  .body {\n    @apply px-4 py-2;\n  }\n\n  .footer {\n    @apply px-2 py-2;\n    background-color: var(--background);\n    border-top: var(--border-width-base) solid var(--border);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  card: string;\n  header: string;\n  body: string;\n  footer: string;\n};\n\nexport default styles;\n"
  },
  "checkbox": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useState } from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Checkbox.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\ninterface CheckboxStyleSlots {\n  root?: StyleValue;\n  label?: StyleValue;\n  helperText?: StyleValue;\n}\n\ntype CheckboxStylesProp = StylesProp<CheckboxStyleSlots>;\n\nconst resolveCheckboxBaseStyles = createStylesResolver(['root', 'label', 'helperText'] as const);\n\nexport interface CheckboxProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"size\"> {\n  /** Size of the checkbox */\n  size?: Size;\n  /** Label text or element displayed next to the checkbox */\n  label?: React.ReactNode;\n  /** Helper text shown below the checkbox */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Whether to show an indeterminate (partial selection) state */\n  isIndeterminate?: boolean;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: CheckboxStylesProp;\n}\n\nconst sizeMap: Record<Size, string> = {\n  sm: css[\"size-sm\"],\n  md: css[\"size-md\"],\n  lg: css[\"size-lg\"],\n};\n\nconst labelSizeMap: Record<Size, string> = {\n  sm: css[\"label-sm\"],\n  md: css[\"label-md\"],\n  lg: css[\"label-lg\"],\n};\n\nexport const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      label,\n      helperText,\n      helperTextError = false,\n      id,\n      disabled = false,\n      checked,\n      defaultChecked,\n      onChange,\n      isIndeterminate = false,\n      styles,\n      ...props\n    },\n    ref\n  ) => {\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const [isFocused, setIsFocused] = useState(false);\n    // Track pressed state for tactile feedback animation (data-pressed attribute)\n    const [isPressed, setIsPressed] = useState(false);\n    const [internalChecked, setInternalChecked] = useState(() =>\n      checked !== undefined ? checked : (defaultChecked ?? false)\n    );\n\n    const handleFocus = () => setIsFocused(true);\n    const handleBlur = () => setIsFocused(false);\n\n    // React Aria press state handlers for tactile scale animation (mouse)\n    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      if (!disabled) {\n        setIsPressed(true);\n      }\n      props.onMouseDown?.(e);\n    }, [disabled, props]);\n\n    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      setIsPressed(false);\n      props.onMouseUp?.(e);\n    }, [props]);\n\n    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {\n      setIsPressed(false);\n      props.onMouseLeave?.(e);\n    }, [props]);\n\n    // React Aria press state handlers for keyboard interactions (Space/Enter)\n    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {\n      if (!disabled && (e.key === \" \" || e.key === \"Enter\")) {\n        setIsPressed(true);\n      }\n      props.onKeyDown?.(e);\n    }, [disabled, props]);\n\n    const handleKeyUp = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {\n      if (e.key === \" \" || e.key === \"Enter\") {\n        setIsPressed(false);\n      }\n      props.onKeyUp?.(e);\n    }, [props]);\n\n    React.useEffect(() => {\n      if (checked !== undefined) {\n        setInternalChecked(checked);\n      }\n    }, [checked]);\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      // Update internal state (needed for uncontrolled mode)\n      setInternalChecked(e.target.checked);\n      // Call parent handler if provided\n      onChange?.(e);\n    };\n\n    // Filter out boolean props to avoid DOM attribute warnings\n    const domProps = Object.fromEntries(\n      Object.entries(props).filter(([, value]) => typeof value !== 'boolean')\n    );\n\n    // Determine if this is a controlled component\n    const isControlled = checked !== undefined;\n    const displayChecked = isControlled ? checked : internalChecked;\n\n    const resolved = resolveCheckboxBaseStyles(styles);\n\n    return (\n      <div ref={ref} className={cn(\"checkbox-root\", css['checkbox-root'], resolved.root)}>\n        <div className={cn((css as any)['checkbox-container'], sizeMap[size])}>\n          <input\n            ref={inputRef}\n            type=\"checkbox\"\n            id={id}\n            disabled={disabled}\n            {...(isControlled ? { checked } : { defaultChecked: internalChecked })}\n            onChange={handleChange}\n            onFocus={handleFocus}\n            onBlur={handleBlur}\n            onMouseDown={handleMouseDown}\n            onMouseUp={handleMouseUp}\n            onMouseLeave={handleMouseLeave}\n            onKeyDown={handleKeyDown}\n            onKeyUp={handleKeyUp}\n            className={cn(\n              'checkbox',\n              css.checkbox,\n              isIndeterminate && css.indeterminate,\n              className\n            )}\n            data-size={size}\n            data-selected={displayChecked ? \"true\" : undefined}\n            data-disabled={disabled ? \"true\" : undefined}\n            data-indeterminate={isIndeterminate ? \"true\" : undefined}\n            data-focused={isFocused ? \"true\" : undefined}\n            data-pressed={isPressed ? \"true\" : undefined}\n            {...domProps}\n          />\n          {displayChecked && !isIndeterminate && (\n            <svg\n              className={cn('checkbox-root', 'checkbox-checkmark', (css as any)['checkbox-checkmark'])}\n              viewBox=\"0 0 24 24\"\n              fill=\"none\"\n              stroke=\"currentColor\"\n              strokeWidth=\"3\"\n              strokeLinecap=\"round\"\n              strokeLinejoin=\"round\"\n            >\n              <polyline points=\"20 6 9 17 4 12\"></polyline>\n            </svg>\n          )}\n          {isIndeterminate && (\n            <svg\n              className={cn('checkbox-root', 'checkbox-indeterminate', css['checkbox-indeterminate'])}\n              viewBox=\"0 0 24 24\"\n              fill=\"currentColor\"\n            >\n              <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\" stroke=\"currentColor\" strokeWidth=\"3\" strokeLinecap=\"round\" />\n            </svg>\n          )}\n        </div>\n        {label && (\n          <label\n            htmlFor={id}\n            className={cn(\n              css.label,\n              labelSizeMap[size],\n              disabled && css[\"label-disabled\"],\n              resolved.label\n            )}\n          >\n            {label}\n          </label>\n        )}\n        {helperText && (\n          <p\n            className={cn(\n              'checkbox-root',\n              'helper-text',\n              css[\"helper-text\"],\n              helperTextError && 'helper-text-error',\n              helperTextError\n                ? css[\"helper-text-error\"]\n                : css[\"helper-text-normal\"],\n              resolved.helperText\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nCheckbox.displayName = \"Checkbox\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  /* Hidden input element positioned behind visual checkbox */\n  .checkbox-input {\n    @apply absolute inset-0 h-full w-full cursor-pointer;\n    opacity: 0;\n  }\n\n  .checkbox-root {\n    @apply inline-flex items-center justify-center gap-3;\n  }\n\n  .checkbox-container {\n    @apply relative inline-flex items-center justify-center;\n  }\n\n  /* Visual checkbox */\n  .checkbox {\n    --disabled-opacity: 0.6;\n\n    @apply relative h-5 w-5 cursor-pointer appearance-none;\n\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-xs);\n    outline: none;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    /* Interactive States */\n    &:hover:not([data-disabled=\"true\"]) {\n      background-color: var(--hover-background);\n      border-color: var(--hover-border);\n    }\n\n    &:focus-visible {\n      outline: 2px solid transparent;\n      box-shadow: 0 0 0 3px var(--ring-color);\n    }\n\n    &[data-selected=\"true\"] {\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-indeterminate=\"true\"] {\n      background-color: var(--background);\n      border-color: var(--border);\n    }\n\n    &[data-disabled=\"true\"] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n\n    /* Sizes */\n    &.size-sm {\n      @apply h-4 w-4;\n    }\n\n    &.size-md {\n      @apply h-5 w-5;\n    }\n\n    &.size-lg {\n      @apply h-6 w-6;\n    }\n  }\n\n  /* Checkmark and Indeterminate styles - combined */\n  .checkbox-checkmark,\n  .checkbox-indeterminate {\n    @apply absolute;\n    inset: 50%;\n    width: 65%;\n    height: 65%;\n    transform: translate(-50%, -50%);\n    color: var(--checkmark-color);\n    pointer-events: none;\n  }\n\n\n  .label {\n    @apply cursor-pointer select-none;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .label-sm {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-md {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-lg {\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium)\n  }\n\n  .label-disabled {\n    @apply opacity-60 cursor-not-allowed;\n  }\n\n  .helper-text {\n    @apply text-sm ml-8;\n    transition: color 200ms var(--ease-snappy-pop);\n  }\n\n  .helper-text-normal { color: inherit; }\n\n  .helper-text-error { color: var(--error-color); }\n}\n",
    "cssTypes": "declare const styles: {\n  \"checkbox-root\": string;\n  checkbox: string;\n  \"checkbox-indeterminate\": string;\n  \"size-sm\": string;\n  \"size-md\": string;\n  \"size-lg\": string;\n  indeterminate: string;\n  label: string;\n  \"label-sm\": string;\n  \"label-md\": string;\n  \"label-lg\": string;\n  \"label-disabled\": string;\n  \"helper-text\": string;\n  \"helper-text-normal\": string;\n  \"helper-text-error\": string;\n};\n\nexport default styles;\n"
  },
  "code": {
    "tsx": "'use client';\n\nimport { useEffect, useRef, useState, useCallback } from \"react\";\nimport { codeToHtml } from \"shiki\";\nimport { transformerRenderIndentGuides } from \"@shikijs/transformers\";\nimport { Copy, Check, ChevronDown } from \"lucide-react\";\nimport { cn } from \"../../lib/utils\";\nimport styles from \"./Code.module.css\";\n\nconst escapeHtml = (s: string) =>\n  s.replace(/[&<>\"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', \"'\": '&#039;' }[c] || c));\n\nfunction generateFallbackHtml(code: string): string {\n  return `<pre><code style=\"display: block; padding: 1rem\">${escapeHtml(code)}</code></pre>`;\n}\n\nfunction useColorScheme(colorScheme: 'light' | 'dark' | 'system'): 'light' | 'dark' {\n  const [systemMode, setSystemMode] = useState<'light' | 'dark'>(() => {\n    if (typeof window === 'undefined') return 'dark';\n    const domTheme = document.documentElement.getAttribute('data-theme');\n    if (domTheme === 'light' || domTheme === 'dark') return domTheme;\n    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';\n  });\n\n  useEffect(() => {\n    if (colorScheme !== 'system') return;\n\n    const update = () => {\n      const domTheme = document.documentElement.getAttribute('data-theme');\n      if (domTheme === 'light' || domTheme === 'dark') {\n        setSystemMode(domTheme);\n      } else {\n        setSystemMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');\n      }\n    };\n\n    const observer = new MutationObserver(update);\n    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });\n\n    const mq = window.matchMedia('(prefers-color-scheme: dark)');\n    mq.addEventListener('change', update);\n\n    return () => {\n      observer.disconnect();\n      mq.removeEventListener('change', update);\n    };\n  }, [colorScheme]);\n\n  return colorScheme === 'system' ? systemMode : colorScheme;\n}\n\nfunction CopyButton({ code }: { code: string }) {\n  const [copied, setCopied] = useState(false);\n\n  const handleCopy = async () => {\n    await navigator.clipboard.writeText(code);\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1800);\n  };\n\n  return (\n    <button onClick={handleCopy} className={styles['copy-button']}>\n      {copied ? <Check size={14} /> : <Copy size={14} />}\n    </button>\n  );\n}\n\nexport interface CodeProps {\n  children: string;\n  /** Programming language for syntax highlighting */\n  language?: string;\n  /** Additional CSS class names */\n  className?: string;\n  /** Filename displayed in the header bar */\n  filename?: string;\n  /** Custom heading text displayed in the header bar instead of filename */\n  heading?: string;\n  /** Shiki theme name or separate light/dark theme names */\n  theme?: string | { light: string; dark: string };\n  /** Color scheme used for theme selection; 'system' follows the page data-theme attribute */\n  colorScheme?: 'light' | 'dark' | 'system';\n  /** Pre-highlighted HTML string for light mode to skip client-side Shiki processing */\n  preHighlightedLight?: string;\n  /** Pre-highlighted HTML string for dark mode to skip client-side Shiki processing */\n  preHighlightedDark?: string;\n}\n\nconst MAX_HEIGHT_LINES = 20;\n\nexport function Code({\n  children,\n  language = \"ts\",\n  className,\n  filename,\n  heading,\n  theme,\n  colorScheme = 'system',\n  preHighlightedLight,\n  preHighlightedDark,\n}: CodeProps) {\n  const mode = useColorScheme(colorScheme);\n\n  const lightTheme = typeof theme === 'string' ? theme : (theme?.light ?? 'github-light');\n  const darkTheme = typeof theme === 'string' ? theme : (theme?.dark ?? 'github-dark');\n  const activeTheme = mode === 'light' ? lightTheme : darkTheme;\n\n  const viewportRef = useRef<HTMLDivElement>(null);\n  const scrollTrackRef = useRef<HTMLDivElement>(null);\n\n  const [highlightedCode, setHighlightedCode] = useState<string>(() => {\n    if (mode === 'light' && preHighlightedLight) return preHighlightedLight;\n    if (mode === 'dark' && preHighlightedDark) return preHighlightedDark;\n    if (preHighlightedLight) return preHighlightedLight;\n    return generateFallbackHtml(children);\n  });\n\n  const [contentScrollWidth, setContentScrollWidth] = useState(0);\n  const [viewportWidth, setViewportWidth] = useState(0);\n  const [isExpanded, setIsExpanded] = useState(false);\n  const [totalCodeLines, setTotalCodeLines] = useState(0);\n\n  const handleScrollTrack = useCallback(() => {\n    if (viewportRef.current && scrollTrackRef.current) {\n      viewportRef.current.scrollLeft = scrollTrackRef.current.scrollLeft;\n    }\n  }, []);\n\n  const handleScrollViewport = useCallback(() => {\n    if (viewportRef.current && scrollTrackRef.current) {\n      const diff = Math.abs(scrollTrackRef.current.scrollLeft - viewportRef.current.scrollLeft);\n      if (diff > 1) scrollTrackRef.current.scrollLeft = viewportRef.current.scrollLeft;\n    }\n  }, []);\n\n  const handleWheel = useCallback((e: React.WheelEvent) => {\n    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {\n      if (viewportRef.current) {\n        viewportRef.current.scrollLeft += e.deltaX;\n        e.preventDefault();\n      }\n    }\n  }, []);\n\n  useEffect(() => {\n    if (mode === 'light' && preHighlightedLight) { setHighlightedCode(preHighlightedLight); return; }\n    if (mode === 'dark' && preHighlightedDark) { setHighlightedCode(preHighlightedDark); return; }\n\n    const highlight = async () => {\n      try {\n        const html = await codeToHtml(children, {\n          lang: language as any,\n          theme: activeTheme,\n          transformers: [transformerRenderIndentGuides()],\n        });\n        let styledHtml = html.replace(/<code>/, '<code style=\"display: block; padding: 1rem;\">');\n        styledHtml = styledHtml.replace(/background-color:\\s*[^;]+;?/g, '');\n        setHighlightedCode(styledHtml);\n      } catch {\n        setHighlightedCode(generateFallbackHtml(children));\n      }\n    };\n\n    highlight();\n  }, [children, language, mode, activeTheme, preHighlightedLight, preHighlightedDark]);\n\n  useEffect(() => {\n    const measure = () => {\n      if (viewportRef.current) {\n        setContentScrollWidth(viewportRef.current.scrollWidth);\n        setViewportWidth(viewportRef.current.clientWidth);\n      }\n    };\n    measure();\n    const observer = new ResizeObserver(measure);\n    if (viewportRef.current) observer.observe(viewportRef.current);\n    return () => observer.disconnect();\n  }, [highlightedCode]);\n\n  useEffect(() => {\n    setTotalCodeLines(children.split('\\n').length);\n  }, [children]);\n\n  useEffect(() => {\n    if (totalCodeLines > MAX_HEIGHT_LINES) {\n      setIsExpanded(totalCodeLines - MAX_HEIGHT_LINES < 30);\n    } else {\n      setIsExpanded(false);\n    }\n  }, [totalCodeLines]);\n\n  const hasHorizontalOverflow = contentScrollWidth > viewportWidth;\n  const hiddenCodeLines = totalCodeLines - MAX_HEIGHT_LINES;\n  const shouldShowExpandButton = totalCodeLines > MAX_HEIGHT_LINES && hiddenCodeLines >= 30;\n\n  return (\n    <div className={cn(styles['code'], className)}>\n      {(filename || heading) && (\n        <div className={styles.header}>\n          <span>{heading || filename}</span>\n          {!heading && <span className={styles['header-lang']}>{language}</span>}\n        </div>\n      )}\n\n      <div className={styles.body}>\n        <CopyButton code={children} />\n        <div\n          ref={viewportRef}\n          onScroll={handleScrollViewport}\n          onWheel={handleWheel}\n          className={styles.viewport}\n          style={{\n            overflowY: isExpanded ? 'auto' : 'hidden',\n            maskImage: !isExpanded && shouldShowExpandButton\n              ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'\n              : 'none',\n            WebkitMaskImage: !isExpanded && shouldShowExpandButton\n              ? 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'\n              : 'none',\n          }}\n          dangerouslySetInnerHTML={{ __html: highlightedCode }}\n        />\n\n        {hasHorizontalOverflow && (\n          <div ref={scrollTrackRef} onScroll={handleScrollTrack} className={styles['scroll-track']}>\n            <div style={{ width: contentScrollWidth, height: '12px' }} />\n          </div>\n        )}\n\n        {shouldShowExpandButton && !isExpanded && (\n          <button onClick={() => setIsExpanded(true)} className={styles['expand-button']}>\n            <ChevronDown size={14} className={styles['expand-icon']} />\n            Show {hiddenCodeLines} more lines\n          </button>\n        )}\n      </div>\n    </div>\n  );\n}\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .code {\n    --border-color: var(--background-700);\n    --header-bg: mix(var(--background-900) 90%, transparent);\n    --scroll-track-bg: mix(var(--background-950) 50%, transparent);\n\n    max-height: 52.5rem;\n    border-radius: var(--radius-sm);\n    border: 1px solid var(--border-color);\n    @apply flex w-full min-w-0 flex-col overflow-hidden;\n  }\n\n  .header {\n    flex: none;\n    background-color: var(--header-bg);\n    @apply flex items-center justify-between px-3 py-1.5;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    border-bottom: 1px solid var(--border-color);\n    color: var(--foreground-400);\n  }\n\n\n  .body {\n    @apply relative flex min-h-0 flex-1 flex-col;\n    flex: 1;\n  }\n\n  .viewport { @apply overflow-hidden; }\n\n  .viewport :global(pre) {\n    background: transparent;\n    @apply m-0 p-0;\n    width: fit-content;\n  }\n\n  .viewport :global(code) {\n    color: var(--foreground-300);\n    white-space: pre;\n  }\n\n  .viewport::-webkit-scrollbar {\n    width: 0.5rem;\n  }\n\n  .viewport::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .viewport::-webkit-scrollbar-thumb {\n    background: var(--background-700);\n    border-radius: 9999px;\n  }\n\n  .viewport::-webkit-scrollbar-thumb:hover {\n    background: var(--background-600);\n  }\n\n  .scroll-track {\n    flex: none;\n    @apply w-full;\n    overflow-x: auto;\n    background-color: var(--scroll-track-bg);\n    backdrop-filter: blur(4px);\n  }\n\n  .expand-button {\n    @apply flex w-full items-center gap-3 px-4 py-2 cursor-pointer;\n    color: var(--foreground-300);\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    transition: background-color 0.15s ease-out;\n    border-top: 1px solid var(--border-color);\n    background: transparent;\n    border-left: none;\n    border-right: none;\n    border-bottom: none;\n    font-family: inherit;\n  }\n\n  .expand-button:hover { background-color: var(--background-800); }\n\n  .expand-icon { @apply shrink-0; color: var(--foreground-400); }\n\n  .copy-button {\n    @apply absolute right-2 top-2 flex items-center justify-center p-1 cursor-pointer;\n    border-radius: var(--radius-sm);\n    color: var(--foreground-400);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, background-color 0.15s ease-out, color 0.15s ease-out;\n    background: transparent;\n    border: none;\n    z-index: 1;\n  }\n\n  .copy-button:hover { background-color: var(--background-800); color: var(--foreground-300); }\n\n  .copy-button:focus, .body:hover .copy-button { opacity: 1; }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly \"code\": string;\n  readonly header: string;\n  readonly \"header-lang\": string;\n  readonly body: string;\n  readonly viewport: string;\n  readonly \"scroll-track\": string;\n  readonly \"expand-button\": string;\n  readonly \"expand-icon\": string;\n  readonly \"copy-button\": string;\n};\n\nexport default styles;\n"
  },
  "color": {
    "tsx": "\"use client\";\n\nimport React, { useState, useEffect, useCallback, useRef, useReducer } from \"react\";\nimport styles from \"./Color.module.css\";\nimport {\n  rgbToHsl,\n  hslToRgb,\n  rgbToHsv,\n  hsvToRgb,\n  formatColorHex,\n  formatColorRgb,\n  parseColor,\n  addRecentColor,\n  isValidColor,\n} from \"./color-utils\";\nimport { ColorCanvas } from \"./Color.Canvas\";\nimport { ColorHueSlider } from \"./Color.HueSlider\";\nimport { ColorOpacitySlider } from \"./Color.OpacitySlider\";\nimport { ColorRecentColors } from \"./Color.RecentColors\";\nimport { ColorInput } from \"./Color.Input\";\nimport { cn } from \"./utils\";\n\ntype CanvasState = { s: number; v: number; h: number; hg: number };\ntype CanvasAction =\n  | { type: 'SET_FROM_COLOR'; h: number; s: number; v: number }\n  | { type: 'SET_CANVAS'; s: number; v: number }\n  | { type: 'SET_HUE'; h: number; updateHg: boolean };\n\nfunction canvasReducer(state: CanvasState, action: CanvasAction): CanvasState {\n  switch (action.type) {\n    case 'SET_FROM_COLOR':\n      if (action.s > 0) return { s: action.s, v: action.v, h: action.h, hg: action.h };\n      return { ...state, s: action.s, v: action.v };\n    case 'SET_CANVAS':\n      return { ...state, s: action.s, v: action.v };\n    case 'SET_HUE':\n      return { ...state, h: action.h, hg: action.updateHg ? action.h : state.hg };\n    default:\n      return state;\n  }\n}\n\nexport interface ColorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, \"onChange\"> {\n  value?: string;\n  defaultValue?: string;\n  onChange?: (color: string) => void;\n  onChangeComplete?: (color: string) => void;\n  showOpacity?: boolean;\n  showPreview?: boolean;\n  format?: \"hex\" | \"rgb\";\n  disabled?: boolean;\n  size?: \"sm\" | \"md\" | \"lg\";\n  className?: string;\n}\n\nexport const Color = React.forwardRef<HTMLDivElement, ColorProps>(\n  (\n    {\n      value: controlledValue,\n      defaultValue = \"#000000\",\n      onChange,\n      onChangeComplete,\n      showOpacity = false,\n      showPreview = false,\n      format: controlledFormat = \"hex\",\n      disabled = false,\n      size = \"md\",\n      className,\n      ...props\n    },\n    ref\n  ) => {\n    const isControlled = controlledValue !== undefined;\n    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);\n    const currentValue = isControlled ? controlledValue : uncontrolledValue;\n\n    const [format, setFormat] = useState<\"hex\" | \"rgb\">(controlledFormat);\n    const [isDragging, setIsDragging] = useState(false);\n\n    // Initialize state using HSV for better canvas mapping\n    const initializeState = () => {\n      const parsed = parseColor(currentValue);\n      const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n      return { h, s, v };\n    };\n\n    const [initialState] = useState(initializeState);\n\n    // Source of truth for canvas position (HSV Saturation & Value) and hue\n    const [canvasState, dispatchCanvas] = useReducer(canvasReducer, {\n      s: initialState.s, v: initialState.v, h: initialState.h, hg: initialState.h,\n    });\n    const { s: canvasSaturation, v: canvasBrightness, h: hue, hg: hueWhenGrayscale } = canvasState;\n\n    // Track the last emitted color to distinguish external updates from internal ones\n    const lastEmittedColor = useRef(currentValue);\n\n    const parsed = parseColor(currentValue);\n    const opacity = parsed.a ?? 1;\n\n    // Sync with external updates\n    useEffect(() => {\n      if (currentValue !== lastEmittedColor.current) {\n        const parsed = parseColor(currentValue);\n        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n\n        dispatchCanvas({ type: 'SET_FROM_COLOR', h, s, v });\n\n        lastEmittedColor.current = currentValue;\n      }\n    }, [currentValue]);\n\n    // Compute display color from current state (HSV -> RGB)\n    const { r: displayR, g: displayG, b: displayB } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n\n    const displayValue =\n      format === \"hex\"\n        ? formatColorHex(displayR, displayG, displayB, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(displayR, displayG, displayB, opacity < 1 ? opacity : undefined);\n\n    const handleColorChange = useCallback(\n      (newColor: string) => {\n        if (!isControlled) {\n          setUncontrolledValue(newColor);\n        }\n        onChange?.(newColor);\n      },\n      [isControlled, onChange]\n    );\n\n    const handleChangeComplete = useCallback(\n      (newColor: string) => {\n        addRecentColor(newColor);\n        onChangeComplete?.(newColor);\n      },\n      [onChangeComplete]\n    );\n\n    const handleCanvasChange = useCallback(\n      (saturation: number, brightness: number) => {\n        setIsDragging(true);\n        dispatchCanvas({ type: 'SET_CANVAS', s: saturation, v: brightness });\n\n        const { r, g, b } = hsvToRgb(hue, saturation, brightness);\n        const newColor = format === \"hex\"\n          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n        lastEmittedColor.current = newColor;\n        handleColorChange(newColor);\n      },\n      [hue, opacity, format, handleColorChange]\n    );\n\n    const handleCanvasChangeComplete = useCallback(() => {\n      setIsDragging(false);\n      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n      const newColor = format === \"hex\"\n        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n      handleChangeComplete(newColor);\n    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);\n\n    const handleHueChange = useCallback(\n      (newHue: number) => {\n        setIsDragging(true);\n        dispatchCanvas({ type: 'SET_HUE', h: newHue, updateHg: canvasSaturation > 0 });\n\n        const { r, g, b } = hsvToRgb(newHue, canvasSaturation, canvasBrightness);\n        const newColor = format === \"hex\"\n          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n        lastEmittedColor.current = newColor;\n        handleColorChange(newColor);\n      },\n      [canvasSaturation, canvasBrightness, opacity, format, handleColorChange]\n    );\n\n    const handleHueChangeComplete = useCallback(() => {\n      setIsDragging(false);\n      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n      const newColor = format === \"hex\"\n        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n      handleChangeComplete(newColor);\n    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);\n\n    const handleOpacityChange = useCallback(\n      (newOpacity: number) => {\n        setIsDragging(true);\n        const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n        const newColor = format === \"hex\"\n          ? formatColorHex(r, g, b, newOpacity < 1 ? newOpacity : undefined)\n          : formatColorRgb(r, g, b, newOpacity < 1 ? newOpacity : undefined);\n\n        lastEmittedColor.current = newColor;\n        handleColorChange(newColor);\n      },\n      [hue, canvasSaturation, canvasBrightness, format, handleColorChange]\n    );\n\n    const handleOpacityChangeComplete = useCallback(() => {\n      setIsDragging(false);\n      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);\n      const newColor = format === \"hex\"\n        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)\n        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);\n\n      handleChangeComplete(newColor);\n    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);\n\n    const handleRecentColorSelect = useCallback(\n      (color: string) => {\n        // Update internal state immediately\n        const parsed = parseColor(color);\n        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n        dispatchCanvas({ type: 'SET_FROM_COLOR', h, s, v });\n\n        lastEmittedColor.current = color;\n        handleColorChange(color);\n        handleChangeComplete(color);\n      },\n      [handleColorChange, handleChangeComplete]\n    );\n\n    const handleInputChange = useCallback(\n      (newValue: string) => {\n        if (isValidColor(newValue)) {\n          // Update internal state immediately\n          const parsed = parseColor(newValue);\n          const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);\n          dispatchCanvas({ type: 'SET_FROM_COLOR', h, s, v });\n\n          lastEmittedColor.current = newValue;\n          handleColorChange(newValue);\n          handleChangeComplete(newValue);\n        }\n      },\n      [handleColorChange, handleChangeComplete]\n    );\n\n    const handleFormatChange = useCallback(\n      (newFormat: \"hex\" | \"rgb\") => {\n        setFormat(newFormat);\n      },\n      []\n    );\n\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.color, className)}\n        data-size={size}\n        data-disabled={disabled || undefined}\n        {...props}\n      >\n        {/* Recent Colors */}\n        <ColorRecentColors\n          onSelect={handleRecentColorSelect}\n          disabled={disabled}\n          size={size}\n        />\n\n        {/* Canvas for saturation/brightness (HSV) */}\n        <ColorCanvas\n          hue={hue}\n          saturation={canvasSaturation}\n          brightness={canvasBrightness}\n          onChange={handleCanvasChange}\n          disabled={disabled}\n          size={size}\n        />\n\n        <div className={styles.colorControls}>\n          {/* Hue Slider */}\n          <ColorHueSlider\n            value={hue}\n            onChange={handleHueChange}\n            disabled={disabled}\n            size={size}\n          />\n\n          {/* Opacity Slider */}\n          {showOpacity && (\n            <ColorOpacitySlider\n              value={opacity}\n              color={formatColorRgb(parsed.r, parsed.g, parsed.b)}\n              onChange={handleOpacityChange}\n              disabled={disabled}\n              size={size}\n            />\n          )}\n\n          {/* Input & Format Selector */}\n          <ColorInput\n            value={displayValue}\n            format={format}\n            onValueChange={handleInputChange}\n            onFormatChange={handleFormatChange}\n            disabled={disabled}\n            size={size}\n            showPreview={showPreview}\n            previewColor={formatColorRgb(\n              displayR,\n              displayG,\n              displayB,\n              opacity < 1 ? opacity : undefined\n            )}\n          />\n        </div>\n      </div>\n    );\n  }\n);\n\nColor.displayName = \"Color\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .color {\n    --background: color-mix(in srgb, var(--background-800) 30%, transparent);;\n    --border: var(--background-700);\n    --ring-color: var(--accent-500);\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    width: 260px;\n  }\n\n  .color[data-disabled=\"true\"] {\n    opacity: 0.5;\n    pointer-events: none;\n  }\n\n  .colorControls {\n    @apply pb-3 px-3 space-y-3;\n  }\n\n  /* Input styles */\n  .inputGroup {\n    width: 100%;\n  }\n\n  .inputGroup > div:first-child {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .colorInput {\n    width: 100%;\n  }\n\n  .formatSelect {\n    flex-shrink: 0;\n    width: 85px;\n  }\n\n  .color[data-size=\"sm\"] .formatSelect {\n    width: 75px;\n  }\n\n  /* Canvas Styles */\n  .canvasContainer {\n    position: relative;\n    width: 96%;\n    @apply mx-auto mt-2;\n    cursor: crosshair;\n    touch-action: none;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .canvasContainer[data-focus-visible=\"true\"] {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .canvas {\n    position: relative;\n    width: 100%;\n    flex: 1;\n    border-radius: none;\n    /* clip-path: inset(0 round var(--radius-sm)); */\n    overflow: hidden;\n  }\n\n  .canvasGradientHue {\n    position: absolute;\n    inset: 0;\n    overflow: hidden;\n    /* border-radius: var(--radius-sm); */\n  }\n\n  .canvasGradientSaturation {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to right, rgb(255, 255, 255), transparent);\n    border-radius: none;\n  }\n\n  .canvasGradientLightness {\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to top, rgb(0, 0, 0), transparent);\n    border-radius: none\n  }\n\n  .canvasPointer {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid color-mix(in srgb, var(--foreground-200) 50%, transparent);\n    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.3);\n    pointer-events: none;\n    transform: translate(-50%, -50%);\n    z-index: 10;\n  }\n\n  /* Hue Slider Styles */\n  .hueSlider {\n    display: flex;\n    align-items: center;\n    height: 16px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .hueTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background: linear-gradient(\n      to right,\n      hsl(0, 100%, 50%),\n      hsl(60, 100%, 50%),\n      hsl(120, 100%, 50%),\n      hsl(180, 100%, 50%),\n      hsl(240, 100%, 50%),\n      hsl(300, 100%, 50%),\n      hsl(360, 100%, 50%)\n    );\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .hueThumb {\n    position: absolute;\n    width: 12px;\n    height: 12px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .hueSlider[data-focus-visible=\"true\"] .hueThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .hueThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .hueThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Opacity Slider Styles */\n  .opacitySlider {\n    display: flex;\n    align-items: center;\n    height: 12px;\n    border-radius: var(--radius-full);\n    position: relative;\n    cursor: pointer;\n    touch-action: none;\n    overflow: hidden;\n  }\n\n  .opacityTrack {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    border-radius: var(--radius-full);\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-800),\n      var(--background-800) 10px,\n      var(--background-700) 10px,\n      var(--background-700) 20px\n    );\n    border: var(--border-width-base) solid var(--border);\n    overflow: hidden;\n  }\n\n  .opacityThumb {\n    position: absolute;\n    width: 10px;\n    height: 10px;\n    border-radius: var(--radius-full);\n    border: 2px solid white;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n    top: 50%;\n    transform: translateY(-50%) translateX(-50%);\n    background: white;\n    pointer-events: none;\n  }\n\n  .opacitySlider[data-focus-visible=\"true\"] .opacityThumb {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n  .opacityThumb:hover {\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);\n  }\n\n  .opacityThumb:active {\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  }\n\n  /* Recent Colors Styles */\n  .recentColors {\n    display: flex;\n    gap: 0.5rem;\n    overflow-x: auto;\n    padding-bottom: 0.25rem;\n  }\n\n  .recentColorSwatch {\n    flex-shrink: 0;\n    width: 32px;\n    height: 32px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    cursor: pointer;\n    background: none;\n    padding: 0;\n    outline: none;\n  }\n\n  .recentColorSwatch:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 0 2px var(--ring-color);\n  }\n\n  .recentColorSwatch:active {\n    transform: scale(0.95);\n  }\n\n  .recentColorSwatch:focus-visible {\n    outline: 2px solid var(--ring-color);\n    outline-offset: 2px;\n  }\n\n\n  /* Preview Container - deprecated, use previewSwatch instead */\n  .previewContainer {\n    display: flex;\n    justify-content: center;\n    padding: 0.5rem 0;\n  }\n\n  /* Preview Swatch - inline with input */\n  .previewSwatch {\n    position: relative;\n    width: 36px;\n    height: 36px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    overflow: hidden;\n    flex-shrink: 0;\n  }\n\n  .previewSwatch::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 6px,\n      var(--background-800) 6px,\n      var(--background-800) 12px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .previewSwatch::after {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-color: var(--preview-color, transparent);\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 2;\n  }\n\n  .preview {\n    position: relative;\n    width: 64px;\n    height: 64px;\n    border-radius: var(--radius-sm);\n    border: var(--border-width-base) solid var(--border);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n    overflow: hidden;\n  }\n\n  .preview::before {\n    content: \"\";\n    position: absolute;\n    inset: 0;\n    background-image: repeating-linear-gradient(\n      45deg,\n      var(--background-700),\n      var(--background-700) 10px,\n      var(--background-800) 10px,\n      var(--background-800) 20px\n    );\n    border-radius: var(--radius-sm);\n    pointer-events: none;\n    z-index: 1;\n  }\n\n  .canvasContainer {\n    min-height: 160px;\n  }\n}\n",
    "cssTypes": "export const color: string;\nexport const colorControls: string;\nexport const inputGroup: string;\nexport const colorInput: string;\nexport const formatSelect: string;\nexport const canvasContainer: string;\nexport const canvas: string;\nexport const canvasGradientHue: string;\nexport const canvasGradientSaturation: string;\nexport const canvasGradientLightness: string;\nexport const canvasPointer: string;\nexport const hueSlider: string;\nexport const hueTrack: string;\nexport const hueThumb: string;\nexport const opacitySlider: string;\nexport const opacityTrack: string;\nexport const opacityThumb: string;\nexport const recentColors: string;\nexport const recentColorSwatch: string;\nexport const previewContainer: string;\nexport const previewSwatch: string;\nexport const preview: string;\n"
  },
  "command": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\"\n\nimport { createPortal } from \"react-dom\";\n\nimport { useDialog } from \"@react-aria/dialog\";\nimport { FocusScope } from \"@react-aria/focus\";\n\nimport { useOverlayTriggerState } from \"@react-stately/overlays\";\n\nimport { filterDOMProps } from \"@react-aria/utils\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { Search } from \"lucide-react\";\nimport { useScrollLock } from \"../../hooks/useScrollLock\";\n\nimport { Card } from \"../Card\";\nimport { Scroll } from \"../Scroll\";\nimport { Badge } from \"../Badge\";\nimport { Input, type InputProps } from \"../Input\";\n\nimport type { Key } from \"react-aria\";\nimport styles from \"./Command.module.css\";\n\ninterface CommandStyleSlots {\n  root?: StyleValue;\n  overlay?: StyleValue;\n}\n\ntype CommandStylesProp = StylesProp<CommandStyleSlots>;\n\nconst resolveCommandBaseStyles = createStylesResolver([\n  \"root\",\n  \"overlay\",\n] as const);\n\nexport interface CommandItem {\n  id: string;\n  label: string;\n  description?: string;\n  category?: string;\n  shortcut?: string;\n  icon?: React.ReactNode;\n  keywords?: string[];\n  action: () => void | Promise<void>;\n  hint?: string;\n}\n\nexport interface CommandGroupedItems {\n  category: string | undefined;\n  items: CommandItem[];\n}\n\ninterface CommandContextValue {\n  isOpen: boolean;\n  close: () => void;\n  focusedKey: Key | null;\n  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>;\n  registerItem: (key: Key, textValue: string) => void;\n  unregisterItem: (key: Key) => void;\n  actionRef: React.MutableRefObject<Map<Key, () => void | Promise<void>>>;\n  searchInputRef: React.MutableRefObject<HTMLInputElement | null>;\n  scrollableRef: React.MutableRefObject<HTMLDivElement | null>;\n  searchValue: string;\n  setSearchValue: React.Dispatch<React.SetStateAction<string>>;\n  filteredItems: CommandItem[];\n  groupedItems: CommandGroupedItems[];\n}\n\nconst CommandContext = React.createContext<CommandContextValue | undefined>(\n  undefined,\n);\n\nfunction useCommandContext() {\n  const ctx = React.useContext(CommandContext);\n  if (!ctx) {\n    throw new Error(\"Command sub-components must be used within Command\");\n  }\n  return ctx;\n}\n\nfunction scoreCommandRelevance(\n  text: string,\n  query: string,\n): number {\n  const t = text.toLowerCase();\n  const q = query.toLowerCase();\n\n  if (t === q) return 1000;\n  if (t.startsWith(q)) return 900;\n  if (t.split(/\\s+/).some((word) => word === q)) return 800;\n  if (t.includes(q)) {\n    const index = t.indexOf(q);\n    return 710 - Math.min(index, 10);\n  }\n  return 0;\n}\n\nexport interface CommandProps {\n  /** Whether the command palette is open */\n  open?: boolean;\n  /** Called when the open state changes */\n  onOpenChange?: (open: boolean) => void;\n  /** Additional CSS class for the palette dialog */\n  className?: string;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, or slot object. */\n  styles?: CommandStylesProp;\n  /** List of command items to display */\n  items?: CommandItem[];\n  /** Custom filter function for commands against the query */\n  filter?: (command: CommandItem, query: string) => boolean;\n  /** Child elements rendered inside the palette */\n  children?: React.ReactNode;\n}\n\nconst Command = React.forwardRef<HTMLDivElement, CommandProps>(\n  (\n    { open = false, onOpenChange, className, styles: commandStyles, items = [], filter, children },\n    ref,\n  ) => {\n    const [mounted, setMounted] = React.useState(false);\n    const overlayState = useOverlayTriggerState({\n      isOpen: open,\n      onOpenChange,\n    });\n\n    const modalRef = React.useRef<HTMLDivElement>(null);\n    const paletteRef = React.useRef<HTMLDivElement>(null);\n    const searchInputRef = React.useRef<HTMLInputElement>(null);\n    const scrollableRef = React.useRef<HTMLDivElement>(null);\n    const resolved = resolveCommandBaseStyles(commandStyles);\n\n    useScrollLock(overlayState.isOpen, scrollableRef.current);\n    const itemsRef = React.useRef<Map<Key, string>>(new Map());\n    const actionRef = React.useRef<Map<Key, () => void | Promise<void>>>(\n      new Map(),\n    );\n    const focusedKeyRef = React.useRef<Key | null>(null);\n\n    const [focusedKey, setFocusedKey] = React.useState<Key | null>(null);\n    const [itemCount, setItemCount] = React.useState(0);\n    const [searchValue, setSearchValue] = React.useState(\"\");\n\n    const filteredItems = items.filter((cmd) => !filter || filter(cmd, searchValue));\n\n    const groupedItems = React.useMemo(() => {\n      const groups = new Map<string | undefined, CommandItem[]>();\n      filteredItems.forEach((cmd) => {\n        const cat = cmd.category;\n        if (!groups.has(cat)) {\n          groups.set(cat, []);\n        }\n        groups.get(cat)!.push(cmd);\n      });\n\n      // Maintain category order from original items\n      const categoryOrder = new Map<string | undefined, number>();\n      let idx = 0;\n      items.forEach((cmd) => {\n        if (!categoryOrder.has(cmd.category)) {\n          categoryOrder.set(cmd.category, idx++);\n        }\n      });\n\n      return Array.from(groups.entries())\n        .sort(\n          ([a], [b]) =>\n            (categoryOrder.get(a) ?? Infinity) - (categoryOrder.get(b) ?? Infinity),\n        )\n        .map(([category, items]) => ({ category, items }));\n    }, [filteredItems, items]);\n\n    React.useImperativeHandle(ref, () => paletteRef.current as HTMLDivElement);\n\n    React.useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    // Sync focusedKeyRef with focusedKey\n    React.useEffect(() => {\n      focusedKeyRef.current = focusedKey;\n    }, [focusedKey]);\n\n    // Auto-focus search input when opening\n    React.useEffect(() => {\n      if (overlayState.isOpen && searchInputRef.current) {\n        setTimeout(() => searchInputRef.current?.focus(), 0);\n      }\n    }, [overlayState.isOpen]);\n\n    // Cleanup state when overlay closes\n    React.useEffect(() => {\n      if (!overlayState.isOpen) {\n        scrollableRef.current = null;\n        setSearchValue(\"\");\n      }\n    }, [overlayState.isOpen]);\n\n    // Cmd+K global listener\n    React.useEffect(() => {\n      const handleKeyDown = (event: KeyboardEvent) => {\n        const isMac =\n          navigator.platform.toUpperCase().indexOf(\"MAC\") >= 0 ||\n          navigator.userAgent.indexOf(\"Mac\") !== -1;\n        const isCommandKey = isMac ? event.metaKey : event.ctrlKey;\n\n        if (isCommandKey && event.key === \"k\") {\n          event.preventDefault();\n          overlayState.open();\n        }\n      };\n\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => {\n        document.removeEventListener(\"keydown\", handleKeyDown);\n      };\n    }, [overlayState]);\n\n    // Auto-focus first item when items change (filtering, opening)\n    React.useEffect(() => {\n      if (!overlayState.isOpen) return;\n\n      if (!searchValue) {\n        setFocusedKey(null);\n        return;\n      }\n\n      const keys = Array.from(itemsRef.current.keys());\n      if (keys.length > 0) {\n        setFocusedKey(keys[0]);\n      } else {\n        setFocusedKey(null);\n      }\n    }, [itemCount, overlayState.isOpen, searchValue]);\n\n    // Keyboard navigation\n    React.useEffect(() => {\n      if (!overlayState.isOpen) return;\n\n      const handleKeyDown = (event: KeyboardEvent) => {\n        switch (event.key) {\n          case \"ArrowDown\": {\n            event.preventDefault();\n            const keys = Array.from(itemsRef.current.keys());\n            if (keys.length === 0) return;\n            if (focusedKey === null) {\n              setFocusedKey(keys[0]);\n            } else {\n              const idx = keys.indexOf(focusedKey);\n              setFocusedKey(keys[(idx + 1) % keys.length]);\n            }\n            break;\n          }\n          case \"ArrowUp\": {\n            event.preventDefault();\n            const keys = Array.from(itemsRef.current.keys());\n            if (keys.length === 0) return;\n            if (focusedKey === null) {\n              setFocusedKey(keys[keys.length - 1]);\n            } else {\n              const idx = keys.indexOf(focusedKey);\n              setFocusedKey(keys[idx === 0 ? keys.length - 1 : idx - 1]);\n            }\n            break;\n          }\n          case \"Enter\": {\n            event.preventDefault();\n            if (focusedKey !== null) {\n              const action = actionRef.current.get(focusedKey);\n              if (action) {\n                action();\n                overlayState.close();\n              }\n            }\n            break;\n          }\n          case \"Escape\": {\n            event.preventDefault();\n            overlayState.close();\n            break;\n          }\n        }\n      };\n\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => document.removeEventListener(\"keydown\", handleKeyDown);\n    }, [overlayState.isOpen, focusedKey]);\n\n    const registerItem = React.useCallback((key: Key, textValue: string) => {\n      itemsRef.current.set(key, textValue);\n      setItemCount((c) => c + 1);\n    }, []);\n\n    const unregisterItem = React.useCallback((key: Key) => {\n      itemsRef.current.delete(key);\n      setItemCount((c) => c + 1);\n    }, []);\n\n    // Click outside to close\n    const handleOverlayClick = React.useCallback(\n      (e: React.MouseEvent) => {\n        if (e.target === e.currentTarget) {\n          overlayState.close();\n        }\n      },\n      [overlayState],\n    );\n\n    const { dialogProps } = useDialog(\n      { \"aria-label\": \"Command palette\" },\n      modalRef,\n    );\n\n    if (!mounted || !overlayState.isOpen) {\n      return null;\n    }\n\n    return createPortal(\n      <FocusScope contain restoreFocus>\n        <div\n          className={cn(\n            \"command\",\n            styles[\"overlay\"],\n            resolved.overlay,\n          )}\n          onClick={handleOverlayClick}\n        >\n          <Card\n            {...filterDOMProps(dialogProps)}\n            ref={modalRef}\n            className={cn(\"content\", styles[\"content\"], className, resolved.root)}\n            role=\"dialog\"\n            aria-modal=\"true\"\n          >\n            <CommandContext.Provider\n              value={{\n                isOpen: overlayState.isOpen,\n                close: overlayState.close,\n                focusedKey,\n                setFocusedKey,\n                registerItem,\n                unregisterItem,\n                actionRef,\n                searchInputRef,\n                scrollableRef,\n                searchValue,\n                setSearchValue,\n                filteredItems,\n                groupedItems,\n              }}\n            >\n              {children}\n            </CommandContext.Provider>\n          </Card>\n        </div>\n      </FocusScope>,\n      document.body,\n    );\n  },\n);\n\nCommand.displayName = \"Command\";\n\ninterface CommandInputProps extends InputProps {}\n\nconst CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(\n  ({ value: externalValue, onChange: externalOnChange, icon, actions, placeholder = \"Search...\", ...props }, ref) => {\n    const { searchInputRef, searchValue, setSearchValue } = useCommandContext();\n\n    const value = externalValue !== undefined ? externalValue : searchValue;\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      setSearchValue(e.target.value);\n      externalOnChange?.(e);\n    };\n\n    const inputRef = (ref ?? searchInputRef) as React.RefObject<HTMLInputElement>;\n\n    const resolvedActions = actions ?? (value ? [{ icon: <>✕</>, title: \"Clear search\", onClick: () => { setSearchValue(\"\"); } }] : []);\n\n    return (\n      <Card.Header className={styles[\"search\"]}>\n        <Input\n          ref={inputRef}\n          value={value as string}\n          onChange={handleChange}\n          icon={icon ?? <Search className=\"w-4 h-4\" />}\n          actions={resolvedActions}\n          placeholder={placeholder}\n          aria-label=\"Search commands\"\n          styles={{ root: styles[\"input\"] }}\n          {...props}\n        />\n      </Card.Header>\n    );\n  }\n);\n\nCommandInput.displayName = \"Command.Input\";\n\ninterface CommandListProps {\n  /** Child elements rendered inside the list */\n  children?: React.ReactNode;\n  /** Message shown when no items match the search */\n  emptyMessage?: string;\n  /** Additional CSS class for the list container */\n  className?: string;\n}\n\n/** Scrollable container that renders the filtered command items */\nconst CommandListComponent = React.forwardRef<\n  HTMLDivElement,\n  CommandListProps\n>(({ children, emptyMessage = \"No items found.\", className }, ref) => {\n  const { scrollableRef } = useCommandContext();\n\n  return (\n    <div className={cn(styles[\"inner\"], className)}>\n      <Scroll\n        ref={(el) => {\n          if (ref) {\n            if (typeof ref === \"function\") {\n              ref(el);\n            } else {\n              ref.current = el;\n            }\n          }\n          scrollableRef.current = el;\n        }}\n        className={styles[\"list\"]}\n        maxHeight=\"44dvh\"\n        fade-y\n      >\n        <div role=\"listbox\" aria-label=\"Commands\">\n          {!children ? (\n            <div className={styles[\"empty\"]}>{emptyMessage}</div>\n          ) : (\n            children\n          )}\n        </div>\n      </Scroll>\n    </div>\n  );\n});\n\nCommandListComponent.displayName = \"Command.List\";\n\ninterface CommandItemProps {\n  /** Unique key identifying this command item */\n  value: Key;\n  /** Plain-text label used for keyboard navigation lookup */\n  textValue: string;\n  /** Called when the item is selected */\n  action: () => void | Promise<void>;\n  /** Child elements rendered inside the item */\n  children?: React.ReactNode;\n  /** Additional CSS class for the item */\n  className?: string;\n  /** Keyboard shortcut or hint text rendered as a Badge at the end of the command item */\n  hint?: string;\n}\n\nconst CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(\n  ({ value, textValue, action, children, className, hint }, ref) => {\n    const { focusedKey, registerItem, unregisterItem, actionRef, close } =\n      useCommandContext();\n\n    React.useEffect(() => {\n      registerItem(value, textValue);\n      actionRef.current.set(value, action);\n      return () => {\n        unregisterItem(value);\n        actionRef.current.delete(value);\n      };\n    }, [value, textValue, action, registerItem, unregisterItem, actionRef]);\n\n    const isHighlighted = focusedKey === value;\n\n    return (\n      <div\n        ref={ref}\n        data-highlighted={isHighlighted}\n        role=\"option\"\n        aria-selected={isHighlighted}\n        onClick={() => { action(); close(); }}\n        className={cn(\"item\", styles[\"item\"], className)}\n      >\n        <div className={styles[\"item-content\"]}>{children}</div>\n        {hint && (\n          <Badge variant=\"secondary\" size=\"sm\" className={styles[\"hint-wrapper\"]}>\n            {hint}\n          </Badge>\n        )}\n      </div>\n    );\n  },\n);\n\nCommandItem.displayName = \"Command.Item\";\n\ninterface CommandCategoryProps {\n  /** Child elements rendered inside the category header */\n  children?: React.ReactNode;\n  /** Additional CSS class for the category */\n  className?: string;\n}\n\n/** Labeled section grouping related commands */\nconst CommandCategory = React.forwardRef<\n  HTMLDivElement,\n  CommandCategoryProps\n>(({ children, className }, ref) => {\n  return (\n    <div\n      ref={ref}\n      className={cn(styles[\"category-header\"], className)}\n    >\n      {children}\n    </div>\n  );\n});\n\nCommandCategory.displayName = \"Command.Category\";\n\ninterface CommandFooterProps {\n  /** Child elements rendered inside the footer */\n  children?: React.ReactNode;\n  /** Additional CSS class applied to the footer */\n  className?: string;\n}\n\n/** Fixed bottom bar in the command palette for hints or actions */\nconst CommandFooter = React.forwardRef<HTMLDivElement, CommandFooterProps>(\n  ({ children, className }, ref) => {\n    return (\n      <Card.Footer ref={ref} className={cn(styles[\"footer\"], className)}>\n        {children}\n      </Card.Footer>\n    );\n  },\n);\n\nCommandFooter.displayName = \"Command.Footer\";\n\nexport interface CommandGroupsProps {\n  /** Renders a category header for the given category name */\n  renderCategory?: (category: string | undefined) => React.ReactNode;\n  /** Renders a single command item row */\n  renderItem: (command: CommandItem, hint?: string) => React.ReactNode;\n  /** Additional CSS class for the groups container */\n  className?: string;\n}\n\n/** Wrapper that renders multiple Command.Category sections */\nconst CommandGroups = React.forwardRef<HTMLDivElement, CommandGroupsProps>(\n  ({ renderCategory, renderItem, className }, ref) => {\n    const { groupedItems } = useCommandContext();\n\n    return (\n      <div ref={ref} className={className}>\n        {groupedItems.map(({ category, items }) => (\n          <div key={category || \"uncategorized\"}>\n            {renderCategory && renderCategory(category)}\n            {items.map((cmd) => (\n              <React.Fragment key={cmd.id}>{renderItem(cmd, cmd.hint)}</React.Fragment>\n            ))}\n          </div>\n        ))}\n      </div>\n    );\n  },\n);\n\nCommandGroups.displayName = \"Command.Groups\";\n\ninterface CommandComponent\n  extends React.ForwardRefExoticComponent<\n    CommandProps & React.RefAttributes<HTMLDivElement>\n  > {\n  Input: typeof CommandInput;\n  List: typeof CommandListComponent;\n  Item: typeof CommandItem;\n  Category: typeof CommandCategory;\n  Footer: typeof CommandFooter;\n  Groups: typeof CommandGroups;\n}\n\nconst CommandWithSubcomponents = Object.assign(Command, {\n  Input: CommandInput,\n  List: CommandListComponent,\n  Item: CommandItem,\n  Category: CommandCategory,\n  Footer: CommandFooter,\n  Groups: CommandGroups,\n}) as CommandComponent;\n\nexport { CommandWithSubcomponents as Command };\nexport { scoreCommandRelevance };\nexport { useCommandContext };\n",
    "css": "@reference \"tailwindcss\";\n\n:global(.command) :global(.input) {\n  --background: var(--background-input);\n}\n\n@layer components {\n  /* Overlay Container */\n  .overlay {\n    @apply fixed inset-0 flex items-start justify-center overflow-hidden;\n    z-index: 999;\n    padding-top: 20vh;\n    /* Apply backdrop styles directly to avoid creating a containing block that disrupts sticky elements */\n    background-color: var(--overlay);\n    backdrop-filter: var(--overlay-backdrop);\n  }\n\n  /* Content */\n  .content {\n    @apply relative m-2 w-full max-w-[28rem];\n    border-radius: var(--radius-sm);\n    background: var(--background-default);\n    margin-inline: 1rem;\n    box-shadow: var(--shadow);\n    animation: fade-in-zoom-in 0.2s ease-out;\n  }\n\n  .inner {\n    border-radius: var(--radius-sm) var(--radius-sm) 0 0;\n    border-top: var(--border-width-base) solid var(--border-default);\n    @apply overflow-hidden;\n  }\n\n  /* Search Section */\n  .search {\n    @apply border-none flex p-1.5;\n    --input-active-border-color: transparent;\n    --input-active-box-shadow: none;\n  }\n\n  .input {\n    border-color: transparent;\n    background: transparent;\n    box-shadow: none;\n\n    &[data-active],\n    &[data-focus-visible] {\n      border-color: transparent;\n      box-shadow: none;\n    }\n  }\n\n  /* List Section */\n  .list {\n    @apply py-0.5 px-2 space-y-2;\n    background-color: var(--list-background);\n  }\n\n  .list :global([role=\"listbox\"]) {\n    @apply flex w-full flex-col;\n  }\n\n  .item {\n    @apply flex items-center justify-between rounded-sm px-2 py-0.5 cursor-pointer;\n    border-radius: 0.375rem;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .item[data-highlighted=\"true\"] {\n    background-color: var(--background-selected);\n  }\n\n  .item-content {\n    @apply flex min-w-0 flex-1 items-center gap-2.5;\n    flex: 1;\n  }\n\n  .item-icon {\n    @apply flex h-6 w-6 shrink-0 items-center justify-center;\n    color: var(--color-icon);\n  }\n\n  .item-labels {\n    flex: 1;\n    @apply min-w-0;\n  }\n\n  .item-label {\n    font-size: var(--text-sm);\n    color: var(--color-default);\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    color: var(--color-muted);\n    font-size: 0.875rem;\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .hint-wrapper {\n    @apply flex items-center;\n  }\n\n  .category-header {\n    @apply px-2 py-1.5 mt-2 first:mt-0;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-semibold);\n    color: var(--color-muted);\n  }\n\n  /* Empty State */\n  .empty {\n    padding: 1.5rem 1rem;\n    text-align: center;\n    font-size: 0.875rem;\n    color: var(--color-muted);\n  }\n\n  /* Footer */\n  .footer {\n    @apply flex w-full items-center gap-2 px-1.5 py-2;\n    background-color: var(--footer-background);\n    border-top: 1px solid var(--border-default);\n    justify-content: flex-between;\n  }\n\n  /* Animations */\n  @keyframes fade-in-zoom-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }\n}\n",
    "cssTypes": "export interface Styles {\n  overlay: string;\n  backdrop: string;\n  content: string;\n  inner: string;\n  search: string;\n  input: string;\n  list: string;\n  item: string;\n  \"item-content\": string;\n  \"item-icon\": string;\n  \"item-labels\": string;\n  \"item-label\": string;\n  \"item-description\": string;\n  \"category-header\": string;\n  empty: string;\n  footer: string;\n  \"hint-wrapper\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "confirm": {
    "tsx": "\"use client\"\n\nimport React, { useState, useEffect } from \"react\"\nimport { cn } from \"./utils\"\nimport { Button } from \"../Button\"\nimport { Card } from \"../Card\"\nimport { CircleAlert, TriangleAlert, Info } from \"lucide-react\"\nimport styles from \"./Confirm.module.css\"\n\nexport interface ConfirmProps {\n  /** Display mode: inline expands in place, dialog shows a modal, auto chooses based on severity */\n  mode?: \"inline\" | \"dialog\" | \"auto\"\n  /** Severity level that affects styling and default mode selection */\n  severity?: \"low\" | \"medium\" | \"high\" | \"critical\"\n  /** Called when the user confirms the action */\n  onConfirm: () => void | Promise<void>\n  /** Called when the user cancels the action */\n  onCancel?: () => void\n  /** Label for the trigger button */\n  triggerLabel: string\n  /** Label for the confirm button */\n  confirmLabel?: string\n  /** Label for the cancel button */\n  cancelLabel?: string\n  /** Whether the trigger button is disabled */\n  disabled?: boolean\n  /** Title shown in dialog mode */\n  title?: string\n  /** Description text shown during the confirm step */\n  description?: string\n  /** Custom icon shown in the confirm header */\n  icon?: React.ReactNode\n  /** Warning message displayed in a colored box before confirming */\n  destructiveActionWarning?: string\n  /** Seconds the user must wait before the confirm button becomes active */\n  countdownSeconds?: number\n  /** Whether the user must type confirmText to enable the confirm button */\n  requiresReason?: boolean\n  /** Text the user must type to confirm when requiresReason is true */\n  confirmText?: string\n  /** Milliseconds after which the inline confirm auto-resets to idle state */\n  autoResetAfter?: number\n}\n\nconst severityConfig = {\n  low: {\n    icon: <Info className=\"w-5 h-5 text-blue-500\" />,\n    warningBoxClass: styles[\"warning-box-low\"],\n    buttonVariant: \"primary\" as const,\n  },\n  medium: {\n    icon: <TriangleAlert className=\"w-5 h-5 text-yellow-500\" />,\n    warningBoxClass: styles[\"warning-box-medium\"],\n    buttonVariant: \"secondary\" as const,\n  },\n  high: {\n    icon: <CircleAlert className=\"w-5 h-5 text-orange-500\" />,\n    warningBoxClass: styles[\"warning-box-high\"],\n    buttonVariant: \"secondary\" as const,\n  },\n  critical: {\n    icon: <TriangleAlert className=\"w-5 h-5 text-red-500\" />,\n    warningBoxClass: styles[\"warning-box-critical\"],\n    buttonVariant: \"secondary\" as const,\n  },\n} as const\n\n/** Modal dialog for confirming destructive actions with context and choices */\nconst Confirm = React.forwardRef<HTMLDivElement, ConfirmProps>(\n  (\n    {\n      mode = \"auto\",\n      severity = \"medium\",\n      onConfirm,\n      onCancel,\n      triggerLabel,\n      confirmLabel = \"Confirm\",\n      cancelLabel = \"Cancel\",\n      disabled = false,\n      title,\n      description,\n      icon,\n      destructiveActionWarning,\n      countdownSeconds,\n      requiresReason = false,\n      confirmText,\n      autoResetAfter,\n    },\n    ref\n  ) => {\n    const [isConfirming, setIsConfirming] = useState(false)\n    const [isLoading, setIsLoading] = useState(false)\n    const [error, setError] = useState<string | null>(null)\n    const [countdown, setCountdown] = useState(countdownSeconds || 0)\n    const [inputValue, setInputValue] = useState(\"\")\n    const [showDialogMode, setShowDialogMode] = useState(false)\n\n    // Determine actual mode\n    const effectiveMode = mode === \"auto\"\n      ? (severity === \"low\" || severity === \"medium\") ? \"inline\" : \"dialog\"\n      : mode\n\n    // Handle countdown timer\n    useEffect(() => {\n      if (!isConfirming || countdown <= 0) return\n\n      const timer = setTimeout(() => {\n        setCountdown(countdown - 1)\n      }, 1000)\n\n      return () => clearTimeout(timer)\n    }, [isConfirming, countdown])\n\n    // Auto-reset inline confirms\n    useEffect(() => {\n      if (!isConfirming || !autoResetAfter) return\n\n      const timer = setTimeout(() => {\n        resetConfirm()\n      }, autoResetAfter)\n\n      return () => clearTimeout(timer)\n    }, [isConfirming, autoResetAfter])\n\n    const resetConfirm = () => {\n      setIsConfirming(false)\n      setError(null)\n      setCountdown(countdownSeconds || 0)\n      setInputValue(\"\")\n      setShowDialogMode(false)\n    }\n\n    const handleTrigger = () => {\n      if (effectiveMode === \"dialog\") {\n        setShowDialogMode(true)\n        setIsConfirming(true)\n      } else {\n        setIsConfirming(true)\n      }\n      setCountdown(countdownSeconds || 0)\n    }\n\n    const handleConfirm = async () => {\n      if (requiresReason && inputValue !== confirmText) {\n        setError(`Please type \"${confirmText}\" to confirm`)\n        return\n      }\n\n      if (countdownSeconds && countdown > 0) {\n        setError(`Please wait ${countdown} seconds before confirming`)\n        return\n      }\n\n      setIsLoading(true)\n      setError(null)\n\n      try {\n        await Promise.resolve(onConfirm())\n        resetConfirm()\n      } catch (err) {\n        setError(err instanceof Error ? err.message : \"An error occurred\")\n        setIsLoading(false)\n      }\n    }\n\n    const handleCancel = () => {\n      onCancel?.()\n      resetConfirm()\n    }\n\n    const config = severityConfig[severity]\n    const canConfirm = !countdownSeconds || countdown === 0\n    const confirmValid = !requiresReason || inputValue === confirmText\n\n    if (effectiveMode === \"inline\" && !showDialogMode) {\n      return (\n        <div ref={ref} className={styles.container}>\n          {!isConfirming ? (\n            <Button\n              onClick={handleTrigger}\n              isDisabled={disabled || isLoading}\n              variant={config.buttonVariant}\n            >\n              {triggerLabel}\n            </Button>\n          ) : (\n            <Card className={cn(styles.card)}>\n              <Card.Body className={cn(styles.body, styles['body-compact'])}>\n                {description && (\n                  <p className={styles.description}>{description}</p>\n                )}\n                {error && (\n                  <p className={styles['error-message']}>{error}</p>\n                )}\n                <div className={cn(styles.actions, styles['actions-inline'])}>\n                  <Button\n                    size=\"sm\"\n                    variant=\"primary\"\n                    onClick={handleConfirm}\n                    isDisabled={!canConfirm || !confirmValid || isLoading}\n                  >\n                    {isLoading ? \"...\" : confirmLabel}\n                  </Button>\n                  <Button\n                    size=\"sm\"\n                    variant=\"outline\"\n                    onClick={handleCancel}\n                    isDisabled={isLoading}\n                  >\n                    {cancelLabel}\n                  </Button>\n                </div>\n              </Card.Body>\n            </Card>\n          )}\n        </div>\n      )\n    }\n\n    // Dialog mode\n    if (showDialogMode) {\n      return (\n        <div ref={ref}>\n          {isConfirming && (\n            <div className={styles['dialog-overlay']}>\n              <Card className={cn(styles['dialog-card'])}>\n                <Card.Header className={styles.body}>\n                  <div className={styles.header}>\n                    {icon || config.icon}\n                    <div className={styles['header-content']}>\n                      <h4 className={styles['header-title']}>\n                        {title || triggerLabel}\n                      </h4>\n                    </div>\n                  </div>\n                </Card.Header>\n                <Card.Body className={cn(styles.body)}>\n                  {description && (\n                    <p className={styles.description}>{description}</p>\n                  )}\n                  {destructiveActionWarning && (\n                    <div className={cn(\n                      styles['warning-box'],\n                      config.warningBoxClass\n                    )}>\n                      {destructiveActionWarning}\n                    </div>\n                  )}\n                  {countdownSeconds && countdown > 0 && (\n                    <div className={styles['countdown-text']}>\n                      Please wait {countdown}s before confirming\n                    </div>\n                  )}\n                  {requiresReason && (\n                    <div>\n                      <label className={styles['input-label']}>\n                        Type \"{confirmText}\" to confirm:\n                      </label>\n                      <input\n                        type=\"text\"\n                        value={inputValue}\n                        onChange={(e) => {\n                          setInputValue(e.target.value)\n                          setError(null)\n                        }}\n                        placeholder={confirmText}\n                        className={styles.input}\n                      />\n                    </div>\n                  )}\n                  {error && (\n                    <p className={styles['error-message']}>{error}</p>\n                  )}\n                </Card.Body>\n                <Card.Footer className={cn(styles.actions, styles['actions-dialog'])}>\n                  <Button\n                    size=\"sm\"\n                    variant=\"outline\"\n                    onClick={handleCancel}\n                    isDisabled={isLoading}\n                  >\n                    {cancelLabel}\n                  </Button>\n                  <Button\n                    size=\"sm\"\n                    variant=\"primary\"\n                    onClick={handleConfirm}\n                    isDisabled={!canConfirm || !confirmValid || isLoading}\n                  >\n                    {isLoading ? \"...\" : confirmLabel}\n                  </Button>\n                </Card.Footer>\n              </Card>\n            </div>\n          )}\n        </div>\n      )\n    }\n\n    return (\n      <div ref={ref} className={styles.container}>\n        <Button\n          onClick={handleTrigger}\n          isDisabled={disabled || isLoading}\n          variant={config.buttonVariant}\n        >\n          {triggerLabel}\n        </Button>\n      </div>\n    )\n  }\n)\n\nConfirm.displayName = \"Confirm\"\n\nexport { Confirm }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    @apply flex flex-col;\n  }\n\n  .card {\n    @apply max-w-[28rem];\n  }\n\n  .card-compact {\n    @apply max-w-[21rem];\n  }\n\n  .dialog-overlay {\n    @apply fixed inset-0 z-50 flex items-center justify-center;\n    background-color: mix(var(--background-950) 50%, transparent);\n  }\n\n  .dialog-card {\n    @apply max-w-[28rem];\n    margin: 0 1rem;\n  }\n\n  .header {\n    @apply flex items-start gap-3;\n  }\n\n  .header-content {\n    @apply flex-1;\n  }\n\n  .header-title {\n    @apply font-semibold;\n    color: var(--foreground-100);\n  }\n\n  .body {\n    @apply flex flex-col gap-4;\n  }\n\n  .body-compact {\n    @apply gap-3;\n  }\n\n  .description {\n    font-size: var(--text-sm);\n    color: var(--foreground-300);\n  }\n\n  .error-message {\n    font-size: var(--text-sm);\n    color: var(--foreground-danger);\n  }\n\n  .warning-box {\n    @apply p-3 rounded-sm;\n    border: var(--border-width-base) solid;\n    font-size: var(--text-sm);\n  }\n\n  .warning-box-low {\n    background-color: mix(var(--background-info) 20%, transparent);\n    border-color: mix(var(--background-info) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-medium {\n    background-color: mix(var(--background-warning) 20%, transparent);\n    border-color: mix(var(--background-warning) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-high {\n    background-color: mix(var(--background-warning-dark) 20%, transparent);\n    border-color: mix(var(--background-warning-dark) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .warning-box-critical {\n    background-color: mix(var(--background-danger) 20%, transparent);\n    border-color: mix(var(--background-danger) 30%, transparent);\n    color: var(--foreground-200);\n  }\n\n  .countdown-text {\n    font-size: var(--text-sm);\n    color: var(--foreground-400);\n  }\n\n  .input-label {\n    font-size: var(--text-sm);\n    margin-left: 0.25rem;\n    color: var(--foreground-300);\n  }\n\n  .input {\n    @apply w-full mt-2 px-3 py-2 rounded-sm transition-all duration-200;\n    background-color: var(--background-800);\n    border: var(--border-width-base) solid var(--background-700);\n    color: var(--foreground-100);\n    font-size: var(--text-sm);\n\n    &:focus-visible {\n      outline: 2px solid var(--accent-500);\n      outline-offset: 2px;\n    }\n  }\n\n  .actions {\n    @apply flex gap-2;\n  }\n\n  .actions-inline {\n    @apply flex-row;\n  }\n\n  .actions-dialog {\n    @apply flex-row justify-end;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  container: string;\n  card: string;\n  \"card-compact\": string;\n  \"dialog-overlay\": string;\n  \"dialog-card\": string;\n  header: string;\n  \"header-content\": string;\n  \"header-title\": string;\n  body: string;\n  \"body-compact\": string;\n  description: string;\n  \"error-message\": string;\n  \"warning-box\": string;\n  \"warning-box-low\": string;\n  \"warning-box-medium\": string;\n  \"warning-box-high\": string;\n  \"warning-box-critical\": string;\n  \"countdown-text\": string;\n  \"input-label\": string;\n  input: string;\n  actions: string;\n  \"actions-inline\": string;\n  \"actions-dialog\": string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "date": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\n\nimport { mergeProps, } from \"@react-aria/utils\";\nimport { useHover } from \"@react-aria/interactions\";\nimport { useFocusRing } from \"@react-aria/focus\"\n\nimport { ChevronLeft, ChevronRight } from \"lucide-react\"\n\nimport { type StyleValue, cn } from \"./utils\"\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\"\n\nimport dateModuleStyles from \"./Date.module.css\"\n\n// Alias global Date to avoid shadowing by component name\nconst NativeDate = globalThis.Date;\n\ninterface DateStyleSlots {\n  root?: StyleValue;\n  header?: StyleValue;\n  \"day-headers\"?: StyleValue;\n  grid?: StyleValue;\n  \"day-cell\"?: StyleValue; // individual date button\n}\n\ntype DateStylesProp = StylesProp<DateStyleSlots>;\n\nconst dateStyleSlotKeys = ['root', 'header', 'day-headers', 'grid', 'day-cell'] as const;\nconst resolveDateBaseStyles = createStylesResolver(dateStyleSlotKeys);\n\nfunction normalizeDateStyles(styles: DateStylesProp | undefined) {\n  if (!styles || typeof styles === \"string\" || Array.isArray(styles)) {\n    return styles;\n  }\n\n  return {\n    root: styles.root,\n    header: styles.header,\n    \"day-headers\": styles[\"day-headers\"],\n    grid: styles.grid,\n    \"day-cell\": styles[\"day-cell\"],\n  };\n}\n\n/**\n * Context type for Calendar state management\n */\nexport interface DateContextValue {\n  selectedDate: Date | null\n  focusedDate: Date | null\n  currentMonth: Date | null\n  today: Date | null\n  selectDate: (date: Date) => void\n  focusDate: (date: Date) => void\n  navigateMonth: (offset: number) => void\n  isDateDisabled: (date: Date) => boolean\n  isDateOutOfRange: (date: Date) => boolean\n}\n\nconst DateContext = React.createContext<DateContextValue | null>(null)\n\nfunction useDateContext() {\n  const context = React.useContext(DateContext)\n  if (!context) {\n    throw new Error(\"Date component must be used within Date root\")\n  }\n  return context\n}\n\n/**\n * Props for Calendar component\n */\nexport interface DateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {\n  /** Controlled selected date */\n  value?: Date | null\n  /** Called when the user selects a date */\n  onChange?: (date: Date) => void\n  /** Function returning true for dates that should be unselectable */\n  disabled?: (date: Date) => boolean\n  /** Earliest selectable date */\n  minDate?: Date\n  /** Latest selectable date */\n  maxDate?: Date\n  /** Month shown initially when no date is selected */\n  defaultMonth?: Date;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: DateStylesProp;\n}\n\n/**\n * Helper functions for date calculations\n */\nfunction getDaysInMonth(date: Date): number {\n  return new NativeDate(date.getFullYear(), date.getMonth() + 1, 0).getDate()\n}\n\nfunction getFirstDayOfMonth(date: Date): number {\n  return new NativeDate(date.getFullYear(), date.getMonth(), 1).getDay()\n}\n\nfunction isSameDay(date1: Date, date2: Date): boolean {\n  return (\n    date1.getFullYear() === date2.getFullYear() &&\n    date1.getMonth() === date2.getMonth() &&\n    date1.getDate() === date2.getDate()\n  )\n}\n\nfunction isToday(date: Date, today: Date | null): boolean {\n  if (!today) return false;\n  return isSameDay(date, today)\n}\n\n/**\n * Calendar grid computation\n */\nfunction getCalendarGrid(currentMonth: Date | null): Date[][] {\n  if (!currentMonth) return [];\n\n  const daysInMonth = getDaysInMonth(currentMonth)\n  const firstDay = getFirstDayOfMonth(currentMonth)\n\n  const grid: Date[] = []\n\n  // Handle previous month's days\n  if (firstDay > 0) {\n    const prevMonth = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), 0)\n    const daysInPrevMonth = getDaysInMonth(prevMonth)\n\n    for (let i = firstDay - 1; i >= 0; i--) {\n      const date = new NativeDate(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i)\n      grid.push(date)\n    }\n  }\n\n  // Current month days\n  for (let i = 1; i <= daysInMonth; i++) {\n    grid.push(new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), i))\n  }\n\n  // Pad with next month's days\n  while (grid.length % 7 !== 0) {\n    const nextDay = grid.length - firstDay - daysInMonth + 1\n    const date = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth() + 1, nextDay)\n    grid.push(date)\n  }\n\n  // Convert to rows\n  const rows: Date[][] = []\n  for (let i = 0; i < grid.length; i += 7) {\n    rows.push(grid.slice(i, i + 7))\n  }\n\n  return rows\n}\n\nconst Date = React.forwardRef<HTMLDivElement, DateProps>(\n  (\n    {\n      value: controlledValue,\n      onChange,\n      disabled: disabledProp = () => false,\n      minDate,\n      maxDate,\n      defaultMonth,\n      className,\n      styles,\n      ...props\n    },\n    ref\n  ) => {\n    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(null)\n    const [today, setToday] = React.useState<Date | null>(null)\n    const [currentMonth, setCurrentMonth] = React.useState<Date | null>(null)\n    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null)\n\n    const selectedDate = controlledValue !== undefined ? controlledValue : uncontrolledValue\n\n    const resolved = resolveDateBaseStyles(normalizeDateStyles(styles));\n\n    const isDateDisabled = React.useCallback(\n      (date: Date): boolean => {\n        if (disabledProp(date)) return true\n        if (minDate && date < minDate) return true\n        if (maxDate && date > maxDate) return true\n        return false\n      },\n      [disabledProp, minDate, maxDate]\n    )\n\n    const isDateOutOfRange = React.useCallback(\n      (date: Date): boolean => {\n        if (!currentMonth) return false;\n        return (\n          date.getMonth() !== currentMonth.getMonth() ||\n          date.getFullYear() !== currentMonth.getFullYear()\n        )\n      },\n      [currentMonth]\n    )\n\n    const selectDate = React.useCallback(\n      (date: Date) => {\n        if (!isDateDisabled(date)) {\n          if (controlledValue === undefined) {\n            setUncontrolledValue(date)\n          }\n          onChange?.(date)\n          setFocusedDate(null)\n        }\n      },\n      [controlledValue, onChange, isDateDisabled]\n    )\n\n    const focusDate = React.useCallback((date: Date) => {\n      setFocusedDate(date)\n    }, [])\n\n    const navigateMonth = React.useCallback((offset: number) => {\n      setCurrentMonth(prev => {\n        const baseDate = prev ?? new NativeDate(); // Handle null prev\n        const newMonth = new NativeDate(baseDate.getFullYear(), baseDate.getMonth() + offset, 1)\n        return newMonth\n      })\n    }, [])\n\n    const calendarGrid = React.useMemo(\n      () => currentMonth ? getCalendarGrid(currentMonth) : [],\n      [currentMonth]\n    )\n\n    const contextValue: DateContextValue = React.useMemo(\n      () => ({\n        selectedDate,\n        focusedDate,\n        currentMonth,\n        today,\n        selectDate,\n        focusDate,\n        navigateMonth,\n        isDateDisabled,\n        isDateOutOfRange,\n      }),\n      [selectedDate, focusedDate, currentMonth, today, selectDate, focusDate, navigateMonth, isDateDisabled, isDateOutOfRange]\n    )\n\n    const handleKeyDown = React.useCallback(\n      (e: React.KeyboardEvent<HTMLDivElement>) => {\n        if (!focusedDate) return\n\n        let newFocusedDate: Date | null = null\n\n        switch (e.key) {\n          case \"ArrowUp\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 7)\n            break\n          case \"ArrowDown\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 7)\n            break\n          case \"ArrowLeft\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 1)\n            break\n          case \"ArrowRight\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 1)\n            break\n          case \"Home\":\n            e.preventDefault()\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), 1)\n            break\n          case \"End\":\n            e.preventDefault()\n            const daysInMonth = getDaysInMonth(focusedDate)\n            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), daysInMonth)\n            break\n          case \"PageUp\":\n            e.preventDefault()\n            navigateMonth(-1)\n            return\n          case \"PageDown\":\n            e.preventDefault()\n            navigateMonth(1)\n            return\n          case \"Enter\":\n          case \" \":\n            e.preventDefault()\n            selectDate(focusedDate)\n            return\n        }\n\n        if (newFocusedDate) {\n          setFocusedDate(newFocusedDate)\n          // Auto-navigate month if needed\n          if (newFocusedDate.getMonth() !== currentMonth!.getMonth() || newFocusedDate.getFullYear() !== currentMonth!.getFullYear()) {\n            setCurrentMonth(new NativeDate(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1))\n          }\n        }\n      },\n      [focusedDate, currentMonth, selectDate, navigateMonth]\n    )\n\n    // Set initial focus, today, and current month on client mount\n    React.useEffect(() => {\n      const now = new NativeDate()\n      setToday(now)\n\n      if (currentMonth === null) { // Only set if not yet initialized\n        setCurrentMonth(defaultMonth ?? now)\n      }\n\n      if (focusedDate === null) { // Only set if not yet initialized\n        setFocusedDate(selectedDate ?? now)\n      }\n    }, [defaultMonth, currentMonth, focusedDate, selectedDate]) // Add relevant dependencies\n\n    return (\n      <DateContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          className={cn(\"date\", dateModuleStyles.calendar, className, resolved.root)}\n          role=\"application\"\n          aria-label=\"Date picker calendar\"\n          onKeyDown={handleKeyDown}\n          {...props}\n        >\n          {currentMonth && (\n            <>\n              <DateHeader className={resolved.header} />\n              <DateDayHeaders className={resolved[\"day-headers\"]} />\n              <DateGrid grid={calendarGrid} className={resolved.grid} dayCellClassName={resolved[\"day-cell\"]} />\n            </>\n          )}\n        </div>\n      </DateContext.Provider>\n    )\n  }\n)\n\nDate.displayName = \"Date\"\n\n/**\n * Calendar Header component\n */\ninterface DateHeaderProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Additional CSS class for the header */\n  className?: string;\n}\n\n/** Navigation header with month/year display and prev/next controls */\nconst DateHeader = React.forwardRef<HTMLDivElement, DateHeaderProps>(\n  ({ className, ...props }, ref) => {\n    const { currentMonth, navigateMonth } = useDateContext()\n\n    const monthYear = currentMonth\n      ? currentMonth.toLocaleDateString(\"en-US\", {\n        month: \"long\",\n        year: \"numeric\",\n      })\n      : \"\"\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\"date\", \"date-header\", dateModuleStyles.header, className)}\n        {...props}\n      >\n        <div className={cn(\"date-month-year\", dateModuleStyles[\"month-year\"])}>\n          {monthYear}\n        </div>\n        <div>\n          <button\n            onClick={() => navigateMonth(-1)}\n            className={cn(\"date\", \"date-nav-button\", \"date-prev-button\", dateModuleStyles[\"nav-button\"])}\n            aria-label=\"Previous month\"\n          >\n            <ChevronLeft size={16} />\n          </button>\n          <button\n            onClick={() => navigateMonth(1)}\n            className={cn(\"date\", \"date-nav-button\", \"date-next-button\", dateModuleStyles[\"nav-button\"])}\n            aria-label=\"Next month\"\n          >\n            <ChevronRight size={16} />\n          </button>\n        </div>\n      </div>\n    )\n  }\n)\n\nDateHeader.displayName = \"Date.Header\"\n\n/**\n * Calendar Day Headers component\n */\ninterface DateDayHeadersProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Additional CSS class for the day headers row */\n  className?: string;\n}\n\n/** Row of weekday abbreviation labels above the calendar grid */\nconst DateDayHeaders = React.forwardRef<HTMLDivElement, DateDayHeadersProps>(\n  ({ className, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(\"date\", \"date-day-headers\", dateModuleStyles[\"day-headers\"], className)}\n        {...props}\n      >\n        {[\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"].map((day) => (\n          <div\n            key={day}\n            className={cn(\"date\", \"date-day-header\", dateModuleStyles[\"day-header\"])}\n          >\n            {day}\n          </div>\n        ))}\n      </div>\n    )\n  }\n)\n\nDateDayHeaders.displayName = \"Date.DayHeaders\"\n\n/**\n * Calendar Grid component\n */\ninterface DateGridProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Calendar grid rows, each containing 7 Date objects */\n  grid: Date[][]\n  /** Classes applied to each individual date cell (DateDay component) */\n  dayCellClassName?: string;\n}\n\n/** The 7-column calendar grid containing date cells */\nconst DateGrid = React.forwardRef<HTMLDivElement, DateGridProps>(\n  ({ grid, className, dayCellClassName, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(\"date\", \"date-grid\", dateModuleStyles.grid, className)}\n        role=\"grid\"\n        {...props}\n      >\n        {/* Week headers */}\n        {[\"Sun\", \"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\"].map((day) => (\n          <div\n            key={day}\n            className={cn(\"date-day-header\", dateModuleStyles[\"week-header\"])}\n            role=\"columnheader\"\n          >\n            {day}\n          </div>\n        ))}\n\n        {/* Calendar rows */}\n        {grid.map((week: Date[], weekIndex: number) => {\n          return (\n            <React.Fragment key={weekIndex}>\n              {week.map((date: Date, dayIndex: number) => (\n                <DateDay key={`${weekIndex}-${dayIndex}`} date={date} className={dayCellClassName} />\n              ))}\n            </React.Fragment>\n          )\n        })}\n      </div>\n    )\n  }\n)\n\nDateGrid.displayName = \"Date.Grid\"\n\n/**\n * Calendar Day component\n */\ninterface DateDayProps extends React.HTMLAttributes<HTMLButtonElement> {\n  /** The date this cell represents */\n  date: Date\n}\n/**\n * Individual date cell in the calendar grid\n */\nconst DateDay = React.forwardRef<HTMLButtonElement, DateDayProps>(\n  ({ date, className, onClick, ...props }, ref) => {\n    const {\n      selectedDate,\n      focusedDate,\n      today,\n      selectDate,\n      focusDate,\n      isDateDisabled,\n      isDateOutOfRange,\n    } = useDateContext()\n\n    const isDisabled = isDateDisabled(date)\n\n    const buttonRef = React.useRef<HTMLButtonElement>(null)\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps } = useHover({ isDisabled })\n\n    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false\n    const isFocused = focusedDate ? isSameDay(date, focusedDate) : false\n    const isCurrentToday = isToday(date, today)\n    const isOutOfRange = isDateOutOfRange(date)\n    const handleClick = React.useCallback(\n      (e: React.MouseEvent<HTMLButtonElement>) => {\n        selectDate(date)\n        focusDate(date)\n        onClick?.(e)\n      },\n      [date, selectDate, focusDate, onClick]\n    )\n\n    const handleFocus = React.useCallback(() => {\n      focusDate(date)\n    }, [date, focusDate])\n\n    React.useEffect(() => {\n      if (isFocused && buttonRef.current) {\n        buttonRef.current.focus({ preventScroll: true })\n      }\n    }, [isFocused])\n\n    return (\n      <button\n        ref={buttonRef}\n        onClick={handleClick}\n        onFocus={handleFocus}\n        className={cn(\"date\", \"date-day\", dateModuleStyles[\"day-cell\"], className)}\n        data-selected={isSelected ? \"true\" : undefined}\n        data-today={isCurrentToday ? \"true\" : undefined}\n        data-disabled={isDisabled ? \"true\" : undefined}\n        data-out-of-range={isOutOfRange ? \"true\" : undefined}\n        data-focus-visible={isFocusVisible && isFocused ? \"true\" : undefined}\n        disabled={isDisabled}\n        aria-selected={isSelected}\n        aria-label={date.toLocaleDateString(\"en-US\", {\n          weekday: \"long\",\n          month: \"long\",\n          day: \"numeric\",\n        })}\n        {...mergeProps(focusProps, hoverProps, props)}\n      >\n        {date.getDate()}\n      </button>\n    )\n  }\n)\n\nDateDay.displayName = \"Date.Day\"\n\nexport { Date, DateHeader, DateGrid, DateDay }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .calendar {\n    --disabled-opacity: 0.5;\n\n    @apply inline-flex flex-col overflow-hidden gap-0;\n    border-radius: var(--radius-md);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n  }\n\n  .day-headers {\n    @apply grid gap-2 px-4 pt-3 pb-1;\n    grid-template-columns: repeat(7, 1fr);\n    background: var(--day-headers-background);\n    border-top: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-md) var(--radius-md) 0 0;\n  }\n\n  .day-header {\n    @apply flex items-center justify-center;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    color: var(--day-header-color);\n  }\n\n  .header {\n    @apply flex items-center justify-between gap-4 pl-2 pr-1.5 py-1.5;\n    color: var(--header-color);\n  }\n\n  .month-year {\n    @apply ml-2;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    text-align: center;\n  }\n\n  .nav-button {\n    @apply inline-flex min-h-8 min-w-8 items-center justify-center cursor-pointer;\n    border-radius: var(--radius-sm);\n    background-color: transparent;\n    color: var(--nav-button-color);\n    border: 1px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 500;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .nav-button:hover { background-color: var(--nav-button-background-hover); }\n\n  .nav-button:focus-visible {\n    background: var(--nav-button-background-hover);\n    border-radius: 0px;\n    outline: 0px solid var(--accent-500);\n  }\n\n  .grid {\n    @apply grid gap-1 px-4 pb-4;\n    grid-template-columns: repeat(7, 1fr);  /* 7 days only */\n    background: var(--grid-background);\n    border-radius: 0 0 var(--radius-sm) var(--radius-sm);\n  }\n\n  .day-cell {\n    --cell-background: transparent;\n\n    @apply flex min-h-8 items-center justify-center px-2.5 py-2 cursor-pointer;\n    border-radius: var(--radius-base);\n    background-color: var(--cell-background);\n    color: var(--cell-text);\n    border: 2px solid transparent;\n    font-size: var(--text-sm);\n    font-weight: 400;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .week-header {\n    display: none;\n  }\n\n  .week-number {\n    display: none;\n  }\n}\n\n/* Variant states - these are outside @layer */\n.day-cell[data-selected=\"true\"] {\n  font-weight: 500;\n}\n\n.day-cell[data-today=\"true\"] {\n  border-color: transparent;\n}\n\n.day-cell[data-disabled=\"true\"],\n.day-cell[data-out-of-range=\"true\"] {\n  opacity: var(--disabled-opacity);\n}\n\n.day-cell[data-disabled=\"true\"] { cursor: not-allowed; }\n\n.day-cell[data-focus-visible=\"true\"]:not([data-disabled=\"true\"]) { outline: 2px solid var(--focus-ring); outline-offset: 2px; }\n",
    "cssTypes": "declare const styles: {\n  calendar: string\n  \"day-headers\": string\n  \"day-header\": string\n  header: string\n  \"month-year\": string\n  \"nav-button\": string\n  grid: string\n  \"day-cell\": string\n  \"week-header\": string\n  \"week-number\": string\n}\n\nexport default styles\n"
  },
  "divider": {
    "tsx": "import React from \"react\";\n\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { GroupContext } from \"../Group/Group\";\n\ntype Orientation = \"horizontal\" | \"vertical\";\ntype Size = \"sm\" | \"md\" | \"lg\" | \"auto\";\n\nconst DASHED_DIMENSIONS = {\n  sm: { thickness: 1, dashLength: 8, gapLength: 4 },\n  md: { thickness: 2, dashLength: 8, gapLength: 4 },\n  lg: { thickness: 4, dashLength: 10, gapLength: 6 },\n} as const;\n\nconst DOTTED_DIMENSIONS = {\n  sm: { thickness: 1, radius: 0.5, spacing: 3 },\n  md: { thickness: 2, radius: 1, spacing: 6 },\n  lg: { thickness: 4, radius: 2, spacing: 12 },\n} as const;\n\nfunction getDashedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, dashLength, gapLength } = DASHED_DIMENSIONS[size === \"auto\" ? \"md\" : size];\n  const totalLength = dashLength + gapLength;\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${totalLength}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${dashLength}' height='${thickness}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${totalLength}' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='${thickness}' height='${dashLength}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\nfunction getDottedMaskSvg(orientation: Orientation, size: Size): string {\n  const { thickness, radius, spacing } = DOTTED_DIMENSIONS[size === \"auto\" ? \"md\" : size];\n\n  if (orientation === \"horizontal\") {\n    return `%3Csvg width='${spacing}' height='${thickness}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n  }\n  return `%3Csvg width='${thickness}' height='${spacing}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${radius}' cy='${radius}' r='${radius}' fill='%23ffffff'/%3E%3C/svg%3E`;\n}\n\n// --- CVA Variants ---\n\nconst dividerVariants = cva(\"shrink-0\", {\n  variants: {\n    variant: { solid: \"\", dashed: \"\", dotted: \"\" },\n    orientation: { horizontal: \"w-full\", vertical: \"self-stretch\" },\n    size: { sm: \"\", md: \"\", lg: \"\", auto: \"\" },\n    spacing: { none: \"\", sm: \"\", md: \"\", lg: \"\" },\n  },\n  compoundVariants: [\n    // Size + Orientation → dimensions\n    { orientation: \"horizontal\", size: \"sm\", class: \"h-px\" },\n    { orientation: \"vertical\", size: \"sm\", class: \"w-px\" },\n    { orientation: \"horizontal\", size: \"md\", class: \"h-0.5\" },\n    { orientation: \"vertical\", size: \"md\", class: \"w-0.5\" },\n    { orientation: \"horizontal\", size: \"lg\", class: \"h-1\" },\n    { orientation: \"vertical\", size: \"lg\", class: \"w-1\" },\n    { orientation: \"horizontal\", spacing: \"none\", class: \"my-0\" },\n    { orientation: \"vertical\", spacing: \"none\", class: \"mx-0\" },\n    { orientation: \"horizontal\", spacing: \"sm\", class: \"my-1\" },\n    { orientation: \"vertical\", spacing: \"sm\", class: \"mx-1\" },\n    { orientation: \"horizontal\", spacing: \"md\", class: \"my-2\" },\n    { orientation: \"vertical\", spacing: \"md\", class: \"mx-2\" },\n    { orientation: \"horizontal\", spacing: \"lg\", class: \"my-4\" },\n    { orientation: \"vertical\", spacing: \"lg\", class: \"mx-4\" },\n  ],\n  defaultVariants: {\n    variant: \"solid\",\n    orientation: \"horizontal\",\n    size: \"auto\",\n    spacing: \"md\",\n  },\n});\n\nexport interface DividerStyleSlots {\n  root?: StyleValue;\n}\n\nexport type DividerStylesProp = StylesProp<DividerStyleSlots>;\n\nconst resolveDividerStyles = createStylesResolver(['root'] as const);\n\nexport interface DividerProps\n  extends React.HTMLAttributes<HTMLDivElement>,\n  VariantProps<typeof dividerVariants> {\n  /** Controls the line style of the divider */\n  variant?: \"solid\" | \"dashed\" | \"dotted\";\n  /** Controls the axis the divider spans */\n  orientation?: \"horizontal\" | \"vertical\";\n  /** Size of the divider thickness */\n  size?: \"sm\" | \"md\" | \"lg\" | \"auto\";\n  /** Controls the margin around the divider */\n  spacing?: \"none\" | \"sm\" | \"md\" | \"lg\";\n  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */\n  styles?: DividerStylesProp;\n}\n\nconst Divider = React.forwardRef<HTMLDivElement, DividerProps>(\n  ({ className, styles, variant = \"solid\", orientation, size = \"auto\", spacing, style, ...props }, ref) => {\n    const groupContext = React.useContext(GroupContext);\n\n    const resolvedOrientation = (() => {\n      if (orientation !== undefined) return orientation;\n      if (!groupContext) return \"horizontal\";\n      return groupContext.groupOrientation === \"horizontal\" ? \"vertical\" : \"horizontal\";\n    })() as Orientation;\n\n    const resolvedSpacing = (() => {\n      if (spacing !== undefined) return spacing;\n      if (!groupContext) return \"md\";\n      return \"none\";\n    })();\n    const getMaskStyles = (): React.CSSProperties => {\n      const baseStyles: React.CSSProperties = { backgroundColor: \"var(--color-background-700)\" };\n      if (variant === \"solid\") return baseStyles\n\n      const svgDataUri =\n        variant === \"dashed\"\n          ? getDashedMaskSvg(resolvedOrientation, size)\n          : getDottedMaskSvg(resolvedOrientation, size);\n\n      const maskRepeat = resolvedOrientation === \"horizontal\" ? \"repeat-x\" : \"repeat-y\";\n      const encodedSvg = `url(\"data:image/svg+xml,${svgDataUri}\")`;\n\n      return {\n        ...baseStyles,\n        WebkitMaskImage: encodedSvg,\n        maskImage: encodedSvg,\n        WebkitMaskRepeat: maskRepeat,\n        maskRepeat: maskRepeat,\n      } as React.CSSProperties;\n    };\n\n    const getAutoSizeStyle = (): React.CSSProperties => {\n      if (size !== \"auto\") return {};\n      return resolvedOrientation === \"horizontal\"\n        ? { height: \"var(--border-width-base, 1px)\" }\n        : { width: \"var(--border-width-base, 1px)\" };\n    };\n\n    const resolved = resolveDividerStyles(styles);\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          dividerVariants({ variant, orientation: resolvedOrientation, size, spacing: resolvedSpacing }),\n          'divider', className, resolved.root,\n        )}\n        style={{ ...getMaskStyles(), ...getAutoSizeStyle(), ...style }}\n        role=\"separator\"\n        aria-orientation={resolvedOrientation}\n        {...props}\n      />\n    );\n  },\n);\n\nDivider.displayName = \"Divider\";\n\nexport { Divider, dividerVariants };\n",
    "css": "",
    "cssTypes": ""
  },
  "expand": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { useToggleState, ToggleState } from \"react-stately\";\nimport { useButton, useFocusRing, mergeProps } from \"react-aria\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { Divider, DividerProps } from \"@/components/Divider\";\nimport styles from \"./Expand.module.css\";\nimport { ChevronDown } from \"lucide-react\";\n\ninterface ExpandStyleSlots {\n  root?: StyleValue;\n  trigger?: StyleValue;\n  content?: StyleValue;\n}\n\ntype ExpandStylesProp = StylesProp<ExpandStyleSlots>;\n\nconst resolveExpandBaseStyles = createStylesResolver(['root', 'trigger', 'content'] as const);\n\ninterface ExpandContextValue {\n  state: ToggleState;\n  isDisabled: boolean;\n}\n\nconst ExpandContext = React.createContext<ExpandContextValue | null>(null);\n\nconst useExpandContext = () => {\n  const context = React.useContext(ExpandContext);\n  if (!context) {\n    throw new Error(\n      \"Expand compound components must be used within an Expand component\",\n    );\n  }\n  return context;\n};\n\n// --- Sub-components ---\n\nexport interface ExpandIconProps\n  extends React.HTMLAttributes<HTMLSpanElement> {\n  /** Custom icon element; defaults to a chevron */\n  children?: React.ReactNode;\n}\n\n/** Animated chevron icon that rotates when the section is open */\nconst ExpandIcon = React.forwardRef<HTMLSpanElement, ExpandIconProps>(\n  ({ children, className, ...props }, ref) => {\n    const context = React.useContext(ExpandContext);\n    return (\n      <span\n        ref={ref}\n        className={cn(styles.icon, className)}\n        data-expanded={context?.state.isSelected || undefined}\n        {...props}\n      >\n        {children ?? <ChevronDown size={16} className=\"text-foreground-400\" />}\n      </span>\n    );\n  },\n);\nExpandIcon.displayName = \"Expand.Icon\";\n\ninterface ExpandTriggerProps\n  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"title\"> {\n  /** Label or content of the trigger button */\n  children?: React.ReactNode;\n  /** ReactNode label rendered in the title span (overrides HTML title tooltip) */\n  title?: React.ReactNode;\n}\n\n/** Clickable button that toggles the expand/collapse state */\nconst ExpandTrigger = React.forwardRef<HTMLButtonElement, ExpandTriggerProps>(\n  ({ children, className, title, ...props }, ref) => {\n    const { state, isDisabled } = useExpandContext();\n    const triggerRef = React.useRef<HTMLButtonElement>(null);\n    React.useImperativeHandle(\n      ref,\n      () => triggerRef.current as HTMLButtonElement,\n    );\n\n    const { buttonProps, isPressed } = useButton(\n      {\n        isDisabled,\n        onPress: () => state.toggle(),\n        // Filter out form-related props that useButton doesn't support\n        ...Object.fromEntries(\n          Object.entries(props).filter(\n            ([key]) =>\n              ![\n                \"formAction\",\n                \"formEncType\",\n                \"formMethod\",\n                \"formNoValidate\",\n                \"formTarget\",\n              ].includes(key),\n          ),\n        ),\n      },\n      triggerRef,\n    );\n\n    const { focusProps, isFocused, isFocusVisible } = useFocusRing();\n\n    const hasElementChildren = React.Children.toArray(children).some(\n      (child) => React.isValidElement(child),\n    );\n\n    // Default: styled button with title span + auto-injected chevron\n    return (\n      <button\n        ref={triggerRef}\n        {...mergeProps(buttonProps, focusProps)}\n        className={cn(styles.trigger, className)}\n        aria-expanded={state.isSelected}\n        data-expanded={state.isSelected || undefined}\n        data-disabled={isDisabled || undefined}\n        data-focused={isFocused || undefined}\n        data-focus-visible={isFocusVisible || undefined}\n        data-pressed={isPressed || undefined}\n      >\n        {hasElementChildren && title === undefined ? (\n          children\n        ) : (\n          <>\n            <span className={styles.title}>{title ?? children}</span>\n            <ExpandIcon />\n          </>\n        )}\n      </button>\n    );\n  },\n);\nExpandTrigger.displayName = \"Expand.Trigger\";\n\ninterface ExpandContentProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Content shown when the expand is open */\n  children: React.ReactNode;\n  /** Direction the content reveals from the trigger */\n  from?: \"below\" | \"above\" | \"left\" | \"right\";\n}\n\n/** Collapsible content area revealed when expanded */\nconst ExpandContent = React.forwardRef<HTMLDivElement, ExpandContentProps>(\n  ({ children, className, from, ...props }, ref) => {\n    const { state } = useExpandContext();\n\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.content, className)}\n        data-expanded={state.isSelected || undefined}\n        data-from={from && from !== \"below\" ? from : undefined}\n        aria-hidden={!state.isSelected}\n        {...props}\n      >\n        <div className={styles[\"content-inner\"]}>{children}</div>\n      </div>\n    );\n  },\n);\nExpandContent.displayName = \"Expand.Content\";\n\n/** Separator line between expand sections */\nconst ExpandDivider = React.forwardRef<HTMLDivElement, DividerProps>(\n  ({ className, spacing = \"none\", ...props }, ref) => {\n    return (\n      <Divider\n        ref={ref}\n        className={cn(\"mt-2\", className)}\n        spacing={spacing}\n        {...props}\n      />\n    );\n  },\n);\nExpandDivider.displayName = \"Expand.Divider\";\n\n// --- Main Expand Component ---\n\nexport interface ExpandProps\n  extends Omit<React.HTMLAttributes<HTMLDivElement>, \"title\" | \"onChange\"> {\n  /** Header text or element for the trigger button in preset (non-compound) mode */\n  title?: React.ReactNode;\n  /** Controlled expanded state */\n  isExpanded?: boolean;\n  /** Initial expanded state for uncontrolled usage */\n  defaultExpanded?: boolean;\n  /** Called when the expanded state changes */\n  onExpandedChange?: (isExpanded: boolean) => void;\n  /** Alias for onExpandedChange */\n  onChange?: (isExpanded: boolean) => void;\n  /** Whether the expand is disabled */\n  isDisabled?: boolean;\n  /** Compound sub-components or content nodes */\n  children?: React.ReactNode;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, or slot object. */\n  styles?: ExpandStylesProp;\n}\n\nconst ExpandRoot = React.forwardRef<HTMLDivElement, ExpandProps>(\n  (\n    {\n      isExpanded,\n      defaultExpanded = false,\n      onExpandedChange,\n      onChange,\n      isDisabled = false,\n      className,\n      children,\n      ...props\n    },\n    ref,\n  ) => {\n    const state = useToggleState({\n      isSelected: isExpanded,\n      defaultSelected: defaultExpanded,\n      onChange: onExpandedChange || onChange,\n    });\n\n    const { title, styles: expandStyles, ...divProps } = props;\n    const resolved = resolveExpandBaseStyles(expandStyles);\n\n    return (\n      <ExpandContext.Provider value={{ state, isDisabled }}>\n        <div\n          ref={ref}\n          className={cn(\"expand\", styles.expand, className, resolved.root)}\n          data-disabled={isDisabled || undefined}\n          {...divProps}\n        >\n          {children}\n        </div>\n      </ExpandContext.Provider>\n    );\n  },\n);\nExpandRoot.displayName = \"Expand\";\n\n// Compatibility wrapper to support both old API and new Compound API\nconst Expand = React.forwardRef<\n  HTMLDivElement,\n  ExpandProps & {\n    Trigger?: typeof ExpandTrigger;\n    Content?: typeof ExpandContent;\n    Divider?: typeof ExpandDivider;\n    Icon?: typeof ExpandIcon;\n  }\n>((props, ref) => {\n  const { title, children, ...rootProps } = props;\n  const resolved = resolveExpandBaseStyles(props.styles);\n\n  // If title is provided, use the \"Preset\" structure (Backward Compatibility)\n  if (title !== undefined) {\n    const childrenArray = React.Children.toArray(children);\n    const customDivider = childrenArray.find(\n      (child) => React.isValidElement(child) && child.type === ExpandDivider,\n    );\n    const filteredChildren = childrenArray.filter(\n      (child) => !(React.isValidElement(child) && child.type === ExpandDivider),\n    );\n\n    return (\n      <ExpandRoot ref={ref} {...rootProps}>\n        <ExpandTrigger className={resolved.trigger}>{title}</ExpandTrigger>\n        {customDivider || <ExpandDivider />}\n        <ExpandContent className={resolved.content}>\n          {filteredChildren}\n        </ExpandContent>\n      </ExpandRoot>\n    );\n  }\n\n  // Otherwise, use Compound structure (children are expected to include Trigger/Content/Divider)\n  return (\n    <ExpandRoot ref={ref} {...rootProps}>\n      {children}\n    </ExpandRoot>\n  );\n}) as React.ForwardRefExoticComponent<\n  ExpandProps & React.RefAttributes<HTMLDivElement>\n> & {\n  Trigger: typeof ExpandTrigger;\n  Content: typeof ExpandContent;\n  Divider: typeof ExpandDivider;\n  Icon: typeof ExpandIcon;\n};\n\nExpand.displayName = \"Expand\";\n\n// Attach sub-components\nExpand.Trigger = ExpandTrigger;\nExpand.Content = ExpandContent;\nExpand.Divider = ExpandDivider;\nExpand.Icon = ExpandIcon;\n\nexport { Expand };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .expand {\n    --disabled-opacity: 0.6;\n\n    @apply flex flex-col;\n  }\n\n  .expand[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .trigger {\n    @apply flex w-full items-stretch justify-between p-0 text-left cursor-pointer;\n\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--trigger-foreground);\n    background-color: var(--trigger-background);\n\n    border: none;\n    border-radius: var(--radius-sm);\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &[data-disabled] {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n  }\n\n  .icon {\n    @apply flex shrink-0 items-center justify-center px-3 py-2;\n    color: inherit;\n    border-radius: var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n        border-radius: 0 var(--radius-sm) var(--radius-sm) 0;\n      }\n\n      /* When the icon itself is hovered, it should be isolated and fully rounded */\n      .trigger:not([data-disabled]) &:hover {\n        border-radius: var(--radius-sm);\n      }\n    }\n  }\n\n  .icon > * {\n    transition: transform 250ms var(--ease-smooth-settle);\n  }\n\n  .expand:has(.trigger[data-expanded=\"true\"]) .icon > *,\n  .icon[data-expanded=\"true\"] > * {\n    transform: rotate(180deg);\n  }\n\n  /* from=\"above\": content expands upward above the trigger */\n  .expand:has(.content[data-from=\"above\"]) {\n    flex-direction: column-reverse;\n\n    .icon > * {\n      transform: rotate(180deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(0deg);\n    }\n  }\n\n  /* from=\"left\": content appears left of trigger */\n  .expand:has(.content[data-from=\"left\"]) {\n    @apply flex-row-reverse items-start;\n\n    .trigger {\n      @apply w-auto flex-col;\n    }\n\n    .icon > * {\n      transform: rotate(-90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(90deg);\n    }\n  }\n\n  /* from=\"right\": content appears right of trigger */\n  .expand:has(.content[data-from=\"right\"]) {\n    @apply flex-row items-start;\n\n    .trigger {\n      @apply w-auto flex-col;\n    }\n\n    .icon > * {\n      transform: rotate(90deg);\n    }\n\n    &:has(.trigger[data-expanded=\"true\"]) .icon > * {\n      transform: rotate(-90deg);\n    }\n  }\n\n  /* Horizontal content animation */\n  .content[data-from=\"left\"],\n  .content[data-from=\"right\"] {\n    grid-template-rows: 1fr;\n    grid-template-columns: 0fr;\n    transition: grid-template-columns 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-columns: 1fr;\n    }\n\n    .content-inner {\n      min-height: unset;\n      min-width: 0;\n    }\n  }\n\n  .title {\n    @apply flex flex-1 min-w-0 items-center overflow-hidden py-2 pl-3;\n\n    font-weight: var(--font-weight-medium);\n    border-radius: var(--radius-sm) 0 0 var(--radius-sm);\n\n    @media (hover: hover) {\n      .trigger:not([data-disabled]):hover & {\n        background-color: var(--trigger-background-hover);\n      }\n\n      /* When icon is hovered, remove background from title */\n      .trigger:not([data-disabled]):has(.icon:hover) & {\n        background-color: transparent;\n      }\n    }\n\n    .trigger:not([data-disabled]) {\n      background-color: transparent;\n    }\n  }\n\n  .content {\n    @apply grid overflow-hidden;\n    grid-template-rows: 0fr;\n    transition: grid-template-rows 300ms var(--ease-smooth-settle);\n\n    &[data-expanded=\"true\"] {\n      grid-template-rows: 1fr;\n    }\n  }\n\n  .content-inner {\n    @apply min-h-0 overflow-hidden;\n    color: var(--content-foreground);\n    background-color: var(--content-background);\n  }\n\n  .expand:has(.trigger[data-disabled]) {\n    pointer-events: none;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  expand: string;\n  trigger: string;\n  icon: string;\n  title: string;\n  content: string;\n  \"content-inner\": string;\n};\n\nexport default styles;\n"
  },
  "flex": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport styles from \"./Flex.module.css\";\n\ntype FlexDirection = \"row\" | \"column\";\ntype FlexWrap = \"wrap\" | \"nowrap\";\ntype FlexJustify =\n  | \"flex-start\"\n  | \"flex-end\"\n  | \"center\"\n  | \"space-between\"\n  | \"space-around\"\n  | \"space-evenly\";\ntype FlexAlign =\n  | \"flex-start\"\n  | \"flex-end\"\n  | \"center\"\n  | \"stretch\"\n  | \"baseline\";\ntype FlexGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\n\ninterface FlexStyleSlots {\n  root?: StyleValue;\n}\n\ntype FlexStylesProp = StylesProp<FlexStyleSlots>;\n\nconst resolveFlexBaseStyles = createStylesResolver(['root'] as const);\n\nexport interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Direction of the flex container */\n  direction?: FlexDirection;\n  /** Whether items wrap to the next line when they overflow */\n  wrap?: FlexWrap;\n  /** Gap between flex items */\n  gap?: FlexGap;\n  /** Alignment of items along the main axis */\n  justify?: FlexJustify;\n  /** Alignment of items along the cross axis */\n  align?: FlexAlign;\n  /** Wraps the flex container in a container query parent for breakpoint-aware responsiveness */\n  containerQueryResponsive?: boolean;\n  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */\n  styles?: FlexStylesProp;\n}\n\nconst directionMap = {\n  row: styles[\"row\"],\n  column: styles[\"column\"],\n} as const;\n\nconst wrapMap = {\n  wrap: styles[\"wrap\"],\n  nowrap: styles[\"nowrap\"],\n} as const;\n\nconst justifyMap = {\n  \"flex-start\": styles[\"justify-flex-start\"],\n  \"flex-end\": styles[\"justify-flex-end\"],\n  center: styles[\"justify-center\"],\n  \"space-between\": styles[\"justify-space-between\"],\n  \"space-around\": styles[\"justify-space-around\"],\n  \"space-evenly\": styles[\"justify-space-evenly\"],\n} as const;\n\nconst alignMap = {\n  \"flex-start\": styles[\"align-flex-start\"],\n  \"flex-end\": styles[\"align-flex-end\"],\n  center: styles[\"align-center\"],\n  stretch: styles[\"align-stretch\"],\n  baseline: styles[\"align-baseline\"],\n} as const;\n\nconst gapMap = {\n  xs: styles[\"gap-xs\"],\n  sm: styles[\"gap-sm\"],\n  md: styles[\"gap-md\"],\n  lg: styles[\"gap-lg\"],\n  xl: styles[\"gap-xl\"],\n} as const;\n\nconst Flex = React.forwardRef<HTMLDivElement, FlexProps>(\n  (\n    {\n      className,\n      styles: stylesProp,\n      direction = \"row\",\n      wrap = \"nowrap\",\n      gap = \"md\",\n      justify = \"flex-start\",\n      align = \"stretch\",\n      containerQueryResponsive = false,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    const resolved = resolveFlexBaseStyles(stylesProp);\n    if (containerQueryResponsive) {\n      return (\n        <div\n          ref={ref}\n          className={cn(styles[\"container-query-parent\"], className, resolved.root)}\n          data-container-responsive=\"true\"\n          {...props}\n        >\n          <div\n            className={cn(\n              styles.flex,\n              directionMap[direction],\n              wrapMap[wrap],\n              gapMap[gap],\n              justifyMap[justify],\n              alignMap[align],\n              styles[\"container-responsive\"]\n            )}\n            data-direction={direction}\n            data-wrap={wrap}\n            data-gap={gap}\n            data-justify={justify}\n            data-align={align}\n          >\n            {children}\n          </div>\n        </div>\n      );\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={cn(\n          styles.flex,\n          directionMap[direction],\n          wrapMap[wrap],\n          gapMap[gap],\n          justifyMap[justify],\n          alignMap[align],\n          className,\n          resolved.root\n        )}\n        data-direction={direction}\n        data-wrap={wrap}\n        data-gap={gap}\n        data-justify={justify}\n        data-align={align}\n        data-container-responsive={containerQueryResponsive || undefined}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nFlex.displayName = \"Flex\";\n\nexport { Flex };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .flex {\n    @apply flex w-full flex-row;\n    flex-wrap: nowrap;\n    gap: var(--spacing-md);\n    justify-content: flex-start;\n    align-items: stretch;\n  }\n\n  /* Direction variants */\n  .flex.row { flex-direction: row; }\n  .flex.column { flex-direction: column; }\n\n  /* Wrap variants */\n  .flex.wrap { flex-wrap: wrap; }\n  .flex.nowrap { flex-wrap: nowrap; }\n\n  /* Gap variants */\n  .flex.gap-xs { gap: var(--spacing-xs); }\n  .flex.gap-sm { gap: var(--spacing-sm); }\n  .flex.gap-md { gap: var(--spacing-md); }\n  .flex.gap-lg { gap: var(--spacing-lg); }\n  .flex.gap-xl { gap: var(--spacing-xl); }\n\n  /* Justify-content variants */\n  .flex.justify-flex-start { justify-content: flex-start; }\n  .flex.justify-flex-end { justify-content: flex-end; }\n  .flex.justify-center { justify-content: center; }\n  .flex.justify-space-between { justify-content: space-between; }\n  .flex.justify-space-around { justify-content: space-around; }\n  .flex.justify-space-evenly { justify-content: space-evenly; }\n\n  /* Align-items variants */\n  .flex.align-flex-start { align-items: flex-start; }\n  .flex.align-flex-end { align-items: flex-end; }\n  .flex.align-center { align-items: center; }\n  .flex.align-stretch { align-items: stretch; }\n  .flex.align-baseline { align-items: baseline; }\n\n  /* Container query parent - establishes containment context */\n  .container-query-parent {\n    container-type: inline-size;\n    container-name: flex-parent;\n    @apply w-full;\n  }\n\n  /* Container query responsive behavior - use .flex.container-responsive for specificity parity with base variants */\n  @container flex-parent (width < 400px) {\n    .flex.container-responsive {\n      flex-direction: column;\n      flex-wrap: wrap;\n      justify-content: flex-start;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (400px <= width < 500px) {\n    .flex.container-responsive {\n      flex-wrap: wrap;\n      gap: var(--spacing-sm);\n    }\n  }\n\n  @container flex-parent (500px <= width < 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-md);\n    }\n  }\n\n  @container flex-parent (width >= 900px) {\n    .flex.container-responsive {\n      gap: var(--spacing-lg);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  flex: string;\n  row: string;\n  column: string;\n  wrap: string;\n  nowrap: string;\n  \"gap-xs\": string;\n  \"gap-sm\": string;\n  \"gap-md\": string;\n  \"gap-lg\": string;\n  \"gap-xl\": string;\n  \"justify-flex-start\": string;\n  \"justify-flex-end\": string;\n  \"justify-center\": string;\n  \"justify-space-between\": string;\n  \"justify-space-around\": string;\n  \"justify-space-evenly\": string;\n  \"align-flex-start\": string;\n  \"align-flex-end\": string;\n  \"align-center\": string;\n  \"align-stretch\": string;\n  \"align-baseline\": string;\n  \"container-query-parent\": string;\n  \"container-responsive\": string;\n};\n\nexport default styles;\n"
  },
  "frame": {
    "tsx": "\"use client\";\n\nimport React, { useId } from \"react\";\nimport { cva, type VariantProps } from \"class-variance-authority\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Frame.module.css\";\n\ninterface FrameStyleSlots {\n  root?: StyleValue;\n}\n\ntype FrameStylesProp = StylesProp<FrameStyleSlots>;\n\nconst resolveFrameBaseStyles = createStylesResolver(['root'] as const);\n\nconst frameVariants = cva(\"relative w-full group isolate\", {\n  variants: {\n    variant: {\n      default: \"text-zinc-500\",\n      accent: \"text-emerald-500\",\n    },\n    padding: {\n      none: \"p-0\",\n      small: \"p-2\",\n      medium: \"p-4\",\n      large: \"p-6\",\n    },\n  },\n  defaultVariants: {\n    variant: \"default\",\n    padding: \"medium\",\n  },\n});\n\nexport interface FrameProps\n  extends React.HTMLAttributes<HTMLDivElement>,\n  VariantProps<typeof frameVariants> {\n  /** SVG path data for the notch or tab shape cut into the frame border */\n  path?: string;\n  /** Width of the path shape in pixels */\n  pathWidth?: number;\n  /** Which side of the frame the path shape appears on */\n  side?: \"top\" | \"bottom\" | \"left\" | \"right\";\n  /** Corner radius of the frame border in pixels */\n  cornerRadius?: number;\n  /** Fill color applied behind the frame content area */\n  fill?: string;\n  /** Whether the path shape indents into the frame or extends out from it */\n  shapeMode?: \"indent\" | \"extend\";\n  /** Stroke width of the frame border in pixels */\n  borderWidth?: number;\n  /** Color of the frame border stroke */\n  borderColor?: string;\n  /** Visual color style of the frame */\n  variant?: \"default\" | \"accent\" | null;\n  /** Internal padding preset */\n  padding?: \"none\" | \"small\" | \"medium\" | \"large\" | null;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: FrameStylesProp;\n}\n\nconst Frame = React.forwardRef<HTMLDivElement, FrameProps>(\n  ({ children, variant, padding, className, styles, style, path, pathWidth = 0, side = \"top\", cornerRadius, fill, shapeMode = \"indent\", borderWidth, borderColor = \"var(--frame-stroke-color, var(--background-700))\", ...props }, ref) => {\n    const maskId = useId();\n    const borderMaskId = `border-${maskId}`;\n    const bgMaskId = `bg-${maskId}`;\n\n    const borderStroke = borderWidth ?? 1;\n    const halfStroke = borderStroke / 2;\n\n    const positionMap = {\n      top: { x: \"50%\", y: \"0\", rotate: 0 },\n      bottom: { x: \"50%\", y: \"100%\", rotate: 180 },\n      left: { x: \"0\", y: \"50%\", rotate: -90 },\n      right: { x: \"100%\", y: \"50%\", rotate: 90 },\n    };\n\n    const { x, y, rotate } = positionMap[side];\n\n    const resolved = resolveFrameBaseStyles(styles);\n\n    return (\n      <div\n        ref={ref}\n        className={cn(frameVariants({ variant, padding }), css.root, className, resolved.root)}\n        style={{\n          ...(cornerRadius !== undefined && { \"--frame-radius\": `${cornerRadius}px` }),\n          ...(borderWidth !== undefined && { \"--frame-stroke-width\": `${borderWidth}px` }),\n          maskImage: path && shapeMode === \"indent\" ? `url(#${maskId})` : undefined,\n          WebkitMaskImage: path && shapeMode === \"indent\" ? `url(#${maskId})` : undefined,\n          ...style,\n        } as React.CSSProperties}\n        {...props}\n      >\n        <svg\n          className=\"absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <defs>\n            {/* Mask for the Content/Background: Cuts the path shape (curvature) */}\n            <mask id={maskId}>\n              <rect width=\"100%\" height=\"100%\" fill=\"white\" className={css.shape} />\n              {path && (\n                <svg x={x} y={y} overflow=\"visible\">\n                  <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>\n                    <path\n                      d={path}\n                      fill=\"black\"\n                      transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}\n                    />\n                  </g>\n                </svg>\n              )}\n            </mask>\n\n            {/* Mask for the Border: Cuts a clean gap for the stroke connection */}\n            <mask id={borderMaskId}>\n              <rect x=\"-10%\" y=\"-10%\" width=\"120%\" height=\"120%\" fill=\"white\" />\n              {path && (\n                <svg x={x} y={y} overflow=\"visible\">\n                  <g transform={`rotate(${rotate})`}>\n                    <rect\n                      x={-pathWidth / 2}\n                      y={-borderStroke * 2}\n                      width={pathWidth}\n                      height={borderStroke * 4}\n                      fill=\"black\"\n                    />\n                  </g>\n                </svg>\n              )}\n            </mask>\n\n            {/* Mask for the Background Fill (Union or Difference) */}\n            <mask id={bgMaskId}>\n              <rect width=\"100%\" height=\"100%\" fill=\"white\" className={css.shape} />\n              {path && (\n                <svg x={x} y={y} overflow=\"visible\">\n                  <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>\n                    <path\n                      d={path}\n                      fill={shapeMode === \"extend\" ? \"white\" : \"black\"}\n                      transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}\n                    />\n                  </g>\n                </svg>\n              )}\n            </mask>\n          </defs>\n\n          {/* Background Fill Layer */}\n          <rect\n            x=\"-50%\"\n            y=\"-50%\"\n            width=\"200%\"\n            height=\"200%\"\n            fill={fill ?? \"var(--frame-fill, transparent)\"}\n            mask={`url(#${bgMaskId})`}\n          />\n\n          {/* Border Stroke Layer */}\n          <rect\n            x=\"0\"\n            y=\"0\"\n            width=\"100%\"\n            height=\"100%\"\n            fill=\"none\"\n            stroke={borderColor}\n            strokeWidth={borderStroke}\n            mask={`url(#${borderMaskId})`}\n            className={cn(css.shape, css.stroke)}\n          />\n\n          {/* Layer 2: The Notch/Tab Path Stroke */}\n          {path && (\n            <svg x={x} y={y} overflow=\"visible\">\n              <g transform={`rotate(${rotate}) scale(1.010, 0.990)`}>\n                <path\n                  d={path}\n                  fill=\"none\"\n                  stroke={borderColor}\n                  strokeWidth={borderStroke}\n                  transform={`translate(-${pathWidth / 2}, ${borderStroke / 2})`}\n                  className={css.stroke}\n                />\n              </g>\n            </svg>\n          )}\n        </svg>\n\n        <div className=\"relative z-10\">{children}</div>\n      </div>\n    );\n  }\n);\n\nFrame.displayName = \"Frame\";\n\nexport { Frame };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    --frame-radius: var(--radius-sm, 24px);\n    --frame-stroke-width: var(--border-width-base, 1px);\n  }\n\n  .shape {\n    rx: var(--frame-radius);\n  }\n\n  .stroke {\n    stroke-width: var(--frame-stroke-width);\n    vector-effect: non-scaling-stroke;\n  }\n\n}\n",
    "cssTypes": "declare const styles: {\n  root: string;\n  shape: string;\n  stroke: string;\n};\n\nexport default styles;\n"
  },
  "gallery": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing, useHover, usePress, mergeProps } from \"react-aria\"\nimport { cn, type StyleValue } from \"./utils\"\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\"\nimport { Grid } from \"../Grid\"\nimport styles from \"./Gallery.module.css\"\n\n// Types\ntype GridColumns = number\ntype GridGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\"\ntype ResponsiveColumns = {\n  sm?: GridColumns\n  md?: GridColumns\n  lg?: GridColumns\n  xl?: GridColumns\n}\n\ninterface GalleryProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Number of columns in the gallery grid */\n  columns?: GridColumns | ResponsiveColumns\n  /** Gap between gallery items */\n  gap?: GridGap | number | string\n  /** Number of rows in the gallery grid */\n  rows?: \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto\"\n  /** Whether to enable container-query-based responsive columns */\n  responsive?: boolean\n  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */\n  styles?: GalleryStylesProp\n}\n\ninterface GalleryItemProps extends React.HTMLAttributes<HTMLElement> {\n  /** URL the item links to */\n  href?: string\n  /** Called when the item is pressed */\n  onPress?: (href?: string) => void\n  /** Number of columns this item spans */\n  columnSpan?: number\n  /** Number of rows this item spans */\n  rowSpan?: number\n  /** Controls the item's layout orientation */\n  orientation?: \"vertical\" | \"horizontal\"\n  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */\n  styles?: GalleryStylesProp\n}\n\ninterface GalleryViewProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Aspect ratio of the view area (e.g. \"16/9\") */\n  aspectRatio?: string\n}\n\ninterface GalleryBodyProps extends React.HTMLAttributes<HTMLDivElement> { }\n\ninterface GalleryStyleSlots {\n  root?: StyleValue;\n}\n\ntype GalleryStylesProp = StylesProp<GalleryStyleSlots>;\n\nconst resolveGalleryBaseStyles = createStylesResolver(['root'] as const);\n\n// Helper to map numeric columns to Grid's column values\nconst mapColumnsToGrid = (columns?: GridColumns | ResponsiveColumns): GridColumns | ResponsiveColumns => {\n  if (!columns) return 3\n  if (typeof columns === \"object\") return columns as ResponsiveColumns\n  return columns\n}\n\n// Helper to map gap values to Grid's gap values\nconst mapGapToGrid = (gap?: GridGap | number | string): GridGap => {\n  if (!gap) return \"md\"\n  if (typeof gap === \"string\" && [\"xs\", \"sm\", \"md\", \"lg\", \"xl\"].includes(gap)) {\n    return gap as GridGap\n  }\n  if (typeof gap === \"number\") {\n    // Map numeric gap values (in pixels) to Grid gap presets\n    if (gap <= 4) return \"xs\"\n    if (gap <= 8) return \"sm\"\n    if (gap <= 16) return \"md\"\n    if (gap <= 24) return \"lg\"\n    return \"xl\"\n  }\n  return \"md\" // default fallback\n}\n\n// Gallery Root Component\nconst GalleryRoot = React.forwardRef<HTMLDivElement, GalleryProps>(\n  ({ columns = 3, gap = \"md\", rows, responsive, className, styles: stylesProp, children, ...props }, ref) => {\n    const gridColumns = mapColumnsToGrid(columns)\n    const gridGap = mapGapToGrid(gap)\n    const resolved = resolveGalleryBaseStyles(stylesProp);\n\n    return (\n      <Grid\n        ref={ref}\n        columns={gridColumns as GridColumns | ResponsiveColumns}\n        gap={gridGap}\n        rows={rows}\n        responsive={responsive}\n        className={cn(className, resolved.root)}\n        {...props}\n      >\n        {children}\n      </Grid>\n    )\n  }\n)\nGalleryRoot.displayName = \"Gallery\"\n\n// Gallery Item Component\n/** A single media or content tile in the gallery grid */\nconst GalleryItem = React.forwardRef<HTMLElement, GalleryItemProps>(\n  ({ href, onPress, columnSpan, rowSpan, orientation = \"vertical\", className, style, styles: stylesProp, children, ...props }, ref) => {\n    const resolved = resolveGalleryBaseStyles(stylesProp);\n    const elementRef = React.useRef<HTMLElement>(null)\n    const combinedRef = (node: HTMLElement | null) => {\n      (elementRef as React.MutableRefObject<HTMLElement | null>).current = node\n      if (typeof ref === \"function\") {\n        ref(node)\n      } else if (ref) {\n        ref.current = node\n      }\n    }\n\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered } = useHover({})\n\n    // Use usePress for button interaction\n    const { pressProps, isPressed } = usePress({\n      onPress: () => onPress?.(href),\n    })\n\n    const spanStyles: React.CSSProperties = {\n      ...(columnSpan && { gridColumn: `span ${columnSpan}` }),\n      ...(rowSpan && { gridRow: `span ${rowSpan}` }),\n      ...style,\n    }\n\n    // Ensure accessible name: aria-label, aria-labelledby, or text content\n    const ariaLabel = props[\"aria-label\"] || props[\"aria-labelledby\"]\n    const hasAccessibleName = ariaLabel || React.Children.count(children) > 0\n\n    const commonProps = mergeProps(\n      focusProps,\n      hoverProps,\n      pressProps,\n      {\n        className: cn('gallery', 'item', styles.item, className, resolved.root),\n        style: spanStyles,\n        \"data-focus-visible\": isFocusVisible || undefined,\n        \"data-hovered\": isHovered || undefined,\n        \"data-pressed\": isPressed || undefined,\n        \"data-orientation\": orientation,\n        ...(!hasAccessibleName && { \"aria-label\": \"Gallery item\" }),\n        ...props,\n      }\n    )\n\n    return (\n      <div\n        ref={combinedRef as React.Ref<HTMLDivElement>}\n        role=\"button\"\n        tabIndex={0}\n        {...commonProps}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryItem.displayName = \"Gallery.Item\"\n\n// Gallery View Component\n/** Expanded full-screen view overlay for a selected gallery item */\nconst GalleryView = React.forwardRef<HTMLDivElement, GalleryViewProps>(\n  ({ aspectRatio = \"16/9\", className, style, children, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn(styles.view, className)}\n        style={{\n          \"--gallery-aspect-ratio\": aspectRatio,\n          ...style\n        } as React.CSSProperties}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryView.displayName = \"Gallery.View\"\n\n// Gallery Body Component\n/** Container for the gallery item's visible content */\nconst GalleryBody = React.forwardRef<HTMLDivElement, GalleryBodyProps>(\n  ({ className, children, ...props }, ref) => {\n    return (\n      <div\n        ref={ref}\n        className={cn('gallery', 'body', styles.body, className)}\n        {...props}\n      >\n        {children}\n      </div>\n    )\n  }\n)\nGalleryBody.displayName = \"Gallery.Body\"\n\n// Compound Component\nconst Gallery = Object.assign(GalleryRoot, {\n  Item: GalleryItem,\n  View: GalleryView,\n  Body: GalleryBody,\n})\n\nexport { Gallery, GalleryItem, GalleryView, GalleryBody }\nexport type { GalleryProps, GalleryItemProps, GalleryViewProps, GalleryBodyProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .item {\n    @apply flex flex-col border overflow-hidden no-underline cursor-pointer;\n\n    background: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    color: inherit;\n  }\n\n  .item:focus {\n    outline: none;\n  }\n\n  .item[data-focus-visible] {\n    outline: 2px solid var(--border-focus);\n    outline-offset: 2px;\n  }\n\n  .item[data-hovered] {\n    border-color: var(--border-hover);\n  }\n\n  .item[data-pressed] {\n    border-color: var(--border-focus);\n  }\n\n  .item[data-orientation=\"horizontal\"] {\n    @apply flex-row;\n  }\n\n  .item[data-orientation=\"horizontal\"] .view {\n    width: var(--gallery-horizontal-view-width, 200px);\n  }\n\n  .view {\n    --aspect-ratio: var(--gallery-aspect-ratio, 16/9);\n\n    @apply relative overflow-hidden;\n    aspect-ratio: var(--aspect-ratio);\n    background: var(--background);\n  }\n\n  .view > img,\n  .view > video {\n    @apply w-full h-full object-cover;\n  }\n\n  .body {\n    @apply flex flex-col gap-1 p-3 self-start min-w-0;\n  }\n\n  .item[data-orientation=\"horizontal\"] .body {\n    flex: 1;\n    align-self: stretch;\n  }\n\n  .body > :first-child {\n    font-weight: var(--font-weight-medium);\n    color: var(--title-color);\n  }\n\n  .body > :not(:first-child) {\n    font-size: var(--text-sm);\n    color: var(--description-color);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly item: string;\n  readonly view: string;\n  readonly body: string;\n};\n\nexport default styles;\n"
  },
  "grid": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Grid.module.css\";\n\ninterface GridStyleSlots {\n  root?: StyleValue;\n}\n\ntype GridStylesProp = StylesProp<GridStyleSlots>;\n\nconst resolveGridBaseStyles = createStylesResolver(['root'] as const);\n\ntype GridColumns = number | \"auto-fit\" | \"auto-fill\";\ntype GridRows = \"1\" | \"2\" | \"3\" | \"4\" | \"5\" | \"6\" | \"auto\" | \"masonry\";\ntype GridGap = \"xs\" | \"sm\" | \"md\" | \"lg\" | \"xl\";\ntype GridJustifyItems = \"start\" | \"end\" | \"center\" | \"stretch\";\ntype GridAlignItems = \"start\" | \"end\" | \"center\" | \"stretch\" | \"baseline\";\ntype GridJustifyContent = \"start\" | \"end\" | \"center\" | \"stretch\" | \"space-between\" | \"space-around\" | \"space-evenly\";\ntype GridAlignContent = \"start\" | \"end\" | \"center\" | \"stretch\" | \"space-between\" | \"space-around\" | \"space-evenly\";\ntype GridAutoFlow = \"row\" | \"column\" | \"row-dense\" | \"column-dense\";\ntype GridTemplateColumns = GridColumns | (string & {});\n\ntype ResponsiveValue<T> = { sm?: T; md?: T; lg?: T; xl?: T };\n\nexport interface GridProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Grid template columns value, or responsive object per breakpoint */\n  columns?: GridTemplateColumns | ResponsiveValue<GridTemplateColumns>;\n  /** Number of grid rows, or responsive object per breakpoint */\n  rows?: GridRows | ResponsiveValue<GridRows>;\n  /** Gap between all grid cells, or responsive object per breakpoint */\n  gap?: GridGap | ResponsiveValue<GridGap>;\n  /** Override gap between rows only */\n  rowGap?: GridGap;\n  /** Override gap between columns only */\n  columnGap?: GridGap;\n  /** Horizontal alignment of items within their cells */\n  justifyItems?: GridJustifyItems;\n  /** Vertical alignment of items within their cells */\n  alignItems?: GridAlignItems;\n  /** Horizontal distribution of the grid within its container */\n  justifyContent?: GridJustifyContent;\n  /** Vertical distribution of the grid rows within its container */\n  alignContent?: GridAlignContent;\n  /** Direction items are auto-placed when no explicit placement is set */\n  autoFlow?: GridAutoFlow;\n  /** Wraps the grid in a container query parent for breakpoint-aware responsiveness */\n  responsive?: boolean;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: GridStylesProp;\n}\n\nconst isResponsive = <T,>(v: unknown): v is ResponsiveValue<T> =>\n  typeof v === \"object\" && v !== null && !Array.isArray(v);\n\nconst colsToTpl = (c: GridTemplateColumns): string => {\n  if (c === \"auto-fit\") return \"repeat(auto-fit, minmax(200px, 1fr))\";\n  if (c === \"auto-fill\") return \"repeat(auto-fill, minmax(200px, 1fr))\";\n  if (typeof c === \"number\") return `repeat(${c}, 1fr)`;\n  return c;\n};\n\nconst rowsToTpl = (r: GridRows): string => {\n  if (r === \"masonry\" || r === \"auto\") return r;\n  return `repeat(${r}, auto)`;\n};\n\nconst gapVal: Record<GridGap, string> = {\n  xs: \"calc(var(--spacing, 0.25rem) * 1)\",\n  sm: \"calc(var(--spacing, 0.25rem) * 2)\",\n  md: \"calc(var(--spacing, 0.25rem) * 4)\",\n  lg: \"calc(var(--spacing, 0.25rem) * 6)\",\n  xl: \"calc(var(--spacing, 0.25rem) * 8)\",\n};\n\nconst flowVal: Record<GridAutoFlow, string> = {\n  row: \"row\",\n  column: \"column\",\n  \"row-dense\": \"row dense\",\n  \"column-dense\": \"column dense\",\n};\n\nconst Grid = React.forwardRef<HTMLDivElement, GridProps>(\n  (\n    {\n      className,\n      style,\n      columns = 3,\n      rows = \"auto\",\n      gap = \"md\",\n      rowGap,\n      columnGap,\n      justifyItems = \"stretch\",\n      alignItems = \"stretch\",\n      justifyContent = \"start\",\n      alignContent = \"start\",\n      autoFlow = \"row\",\n      responsive = false,\n      styles,\n      children,\n      ...props\n    },\n    ref\n  ) => {\n    const resolved = resolveGridBaseStyles(styles);\n    const responsiveCols = isResponsive<GridTemplateColumns>(columns);\n    const responsiveRows = isResponsive<GridRows>(rows);\n    const responsiveGap = isResponsive<GridGap>(gap);\n    const needsContainer = responsiveCols || responsiveRows || responsiveGap || responsive;\n\n    const vars: Record<string, string> = {};\n\n    if (responsiveCols) {\n      const rc = columns as ResponsiveValue<GridTemplateColumns>;\n      if (rc.sm) vars[\"--grid-tpl-sm\"] = colsToTpl(rc.sm);\n      if (rc.md) vars[\"--grid-tpl-md\"] = colsToTpl(rc.md);\n      if (rc.lg) vars[\"--grid-tpl-lg\"] = colsToTpl(rc.lg);\n      if (rc.xl) vars[\"--grid-tpl-xl\"] = colsToTpl(rc.xl);\n    } else {\n      vars[\"--grid-tpl\"] = colsToTpl(columns as GridTemplateColumns);\n    }\n\n    if (responsiveRows) {\n      const rr = rows as ResponsiveValue<GridRows>;\n      if (rr.sm) vars[\"--grid-rows-sm\"] = rowsToTpl(rr.sm);\n      if (rr.md) vars[\"--grid-rows-md\"] = rowsToTpl(rr.md);\n      if (rr.lg) vars[\"--grid-rows-lg\"] = rowsToTpl(rr.lg);\n      if (rr.xl) vars[\"--grid-rows-xl\"] = rowsToTpl(rr.xl);\n    } else {\n      vars[\"--grid-rows\"] = rowsToTpl(rows as GridRows);\n    }\n\n    if (responsiveGap) {\n      const rg = gap as ResponsiveValue<GridGap>;\n      if (rg.sm) vars[\"--grid-gap-sm\"] = gapVal[rg.sm];\n      if (rg.md) vars[\"--grid-gap-md\"] = gapVal[rg.md];\n      if (rg.lg) vars[\"--grid-gap-lg\"] = gapVal[rg.lg];\n      if (rg.xl) vars[\"--grid-gap-xl\"] = gapVal[rg.xl];\n    } else {\n      vars[\"--grid-gap\"] = gapVal[gap as GridGap];\n    }\n\n    if (rowGap) vars[\"--grid-row-gap\"] = gapVal[rowGap];\n    if (columnGap) vars[\"--grid-col-gap\"] = gapVal[columnGap];\n\n    vars[\"--grid-ji\"] = justifyItems;\n    vars[\"--grid-ai\"] = alignItems;\n    vars[\"--grid-jc\"] = justifyContent;\n    vars[\"--grid-ac\"] = alignContent;\n    vars[\"--grid-flow\"] = flowVal[autoFlow];\n\n    const gridClasses = cn(\n      css.grid,\n      responsiveCols && css[\"responsive-cols\"],\n      responsiveGap && css[\"responsive-gap\"],\n      responsiveRows && css[\"responsive-rows\"],\n      rowGap && css[\"has-row-gap\"],\n      columnGap && css[\"has-col-gap\"],\n    );\n\n    if (needsContainer) {\n      return (\n        <div\n          ref={ref}\n          className={cn(css.container, className, resolved.root)}\n          style={style}\n          {...props}\n        >\n          <div className={gridClasses} style={vars as React.CSSProperties}>\n            {children}\n          </div>\n        </div>\n      );\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={cn(gridClasses, className, resolved.root)}\n        style={{ ...vars, ...style } as React.CSSProperties}\n        {...props}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nGrid.displayName = \"Grid\";\n\nexport { Grid };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .grid {\n    @apply grid w-full;\n    grid-template-columns: var(--grid-tpl, repeat(3, 1fr));\n    grid-template-rows: var(--grid-rows, auto);\n    gap: var(--grid-gap, calc(var(--spacing, 0.25rem) * 4));\n    justify-items: var(--grid-ji, stretch);\n    align-items: var(--grid-ai, stretch);\n    justify-content: var(--grid-jc, start);\n    align-content: var(--grid-ac, start);\n    grid-auto-flow: var(--grid-flow, row);\n  }\n\n  .container {\n    container-type: inline-size;\n    container-name: grid-ctx;\n  }\n\n  .grid.responsive-cols {\n    grid-template-columns: var(--grid-tpl-sm, 1fr);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-md, var(--grid-tpl-sm, 1fr));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-cols {\n      grid-template-columns: var(--grid-tpl-xl, var(--grid-tpl-lg, var(--grid-tpl-md, var(--grid-tpl-sm, 1fr))));\n    }\n  }\n\n  .grid.responsive-gap {\n    gap: var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 2));\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4))));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-gap {\n      gap: var(--grid-gap-xl, var(--grid-gap-lg, var(--grid-gap-md, var(--grid-gap-sm, calc(var(--spacing, 0.25rem) * 4)))));\n    }\n  }\n\n  .grid.responsive-rows {\n    grid-template-rows: var(--grid-rows-sm, auto);\n  }\n\n  @media (min-width: 640px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-md, var(--grid-rows-sm, auto));\n    }\n  }\n\n  @media (min-width: 1024px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto)));\n    }\n  }\n\n  @media (min-width: 1280px) {\n    .grid.responsive-rows {\n      grid-template-rows: var(--grid-rows-xl, var(--grid-rows-lg, var(--grid-rows-md, var(--grid-rows-sm, auto))));\n    }\n  }\n\n  .grid.has-row-gap { row-gap: var(--grid-row-gap); }\n  .grid.has-col-gap { column-gap: var(--grid-col-gap); }\n\n  @container grid-ctx (width < 400px) {\n    .container .grid {\n      grid-template-columns: 1fr;\n      gap: calc(var(--spacing, 0.25rem) * 2);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly grid: string;\n  readonly container: string;\n  readonly \"responsive-cols\": string;\n  readonly \"responsive-gap\": string;\n  readonly \"responsive-rows\": string;\n  readonly \"has-row-gap\": string;\n  readonly \"has-col-gap\": string;\n};\n\nexport default styles;\n"
  },
  "group": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { cn } from \"./utils\"\nimport { Button, type ButtonProps } from \"../Button\"\nimport { Input, type InputProps } from \"../Input\"\nimport { Select, type SelectProps } from \"../Select\"\nimport styles from \"./Group.module.css\"\n\ntype Orientation = \"horizontal\" | \"vertical\"\ntype Spacing = \"none\" | \"xs\" | \"sm\"\ntype Variant = \"primary\" | \"secondary\" | \"outline\" | \"ghost\"\n\nexport interface GroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {\n  /** Controls the axis that children are arranged along */\n  orientation?: Orientation\n  /** Controls the gap between group items */\n  spacing?: Spacing\n  /** Controls the shared visual style applied to group items */\n  variant?: Variant\n  /** Whether all items in the group are non-interactive */\n  isDisabled?: boolean\n  /** The currently active button value for toggle group behavior */\n  value?: string\n  /** Called when a button with a value prop is pressed */\n  onChange?: (value: string) => void\n}\n\ninterface GroupContextValue {\n  isInGroup: boolean\n  groupVariant: Variant\n  groupOrientation: Orientation\n  groupSpacing: Spacing\n  groupIsDisabled: boolean\n  groupValue?: string\n  groupOnChange?: (value: string) => void\n}\n\n// Context\nconst GroupContext = React.createContext<GroupContextValue | null>(null)\n\nfunction useGroupContext() {\n  const context = React.useContext(GroupContext)\n  if (!context) {\n    throw new Error(\"Group sub-components must be used within Group\")\n  }\n  return context\n}\n\n// Variant and orientation maps\nconst orientationMap: Record<Orientation, string> = {\n  horizontal: styles.horizontal,\n  vertical: styles.vertical,\n}\n\nconst spacingMap: Record<Spacing, string> = {\n  none: styles.none,\n  xs: styles.xs,\n  sm: styles.sm,\n}\n\nconst variantMap: Record<Variant, string | undefined> = {\n  primary: undefined,\n  secondary: undefined,\n  outline: undefined,\n  ghost: styles.ghost,\n}\n\n// Detect Divider elements by checking for separator role or orientation prop\nfunction isDivider(child: React.ReactNode): boolean {\n  if (!React.isValidElement(child)) return false\n  const props = (child.props || {}) as Record<string, unknown>\n  return props.role === \"separator\" || \"orientation\" in props\n}\n\n// Root component\n/** Button group that groups related buttons together */\nconst GroupRoot = React.forwardRef<HTMLDivElement, GroupProps>(\n  (\n    {\n      className,\n      orientation = \"horizontal\",\n      spacing = \"none\",\n      variant = \"primary\",\n      children,\n      isDisabled = false,\n      value,\n      onChange,\n      ...props\n    },\n    ref\n  ) => {\n    const isVertical = orientation === \"vertical\"\n\n    const childrenArray = React.Children.toArray(children).filter(\n      (child) => child !== null && child !== undefined\n    )\n\n    const contextValue: GroupContextValue = {\n      isInGroup: true,\n      groupVariant: variant,\n      groupOrientation: orientation,\n      groupSpacing: spacing,\n      groupIsDisabled: isDisabled,\n      groupValue: value,\n      groupOnChange: onChange,\n    }\n\n    return (\n      <GroupContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          className={cn(\n            'group',\n            orientation,\n            variant,\n            styles.group,\n            orientationMap[orientation],\n            spacingMap[spacing],\n            variantMap[variant],\n            className\n          )}\n          role=\"group\"\n          aria-disabled={isDisabled || undefined}\n          {...props}\n        >\n          {childrenArray.map((child, index) => {\n            const isFirst = index === 0\n            const isLast = index === childrenArray.length - 1\n            const isDividerChild = isDivider(child)\n\n            // Extract layout-related classes from child to apply to the item wrapper\n            const childProps = React.isValidElement(child) ? (child.props as any) : {}\n            const childClassName = childProps.className || \"\"\n            const shouldGrow = childClassName.includes('w-full') || childClassName.includes('flex-1')\n            return (\n              <div\n                key={`item-${index}`}\n                className={cn(\n                  'item',\n                  styles.item,\n                  isVertical ? styles.vertical : styles.horizontal,\n                  isFirst && styles.first,\n                  isLast && styles.last,\n                  isDividerChild && styles.divider,\n                  shouldGrow && styles.grow,\n                )}\n              >\n                {child}\n              </div>\n            )\n          })}\n        </div>\n      </GroupContext.Provider>\n    )\n  }\n)\nGroupRoot.displayName = \"Group\"\n\n// Group.Button component\ninterface GroupButtonProps extends ButtonProps {\n  /** Whether this button is in an active/pressed state */\n  active?: boolean\n  /** Identifier used for toggle group behavior when Group has value/onChange */\n  value?: string\n}\n\n/** Button styled to merge seamlessly with adjacent group items */\nconst GroupButton = React.forwardRef<HTMLButtonElement, GroupButtonProps>(\n  ({ active, value, variant, className, onPress, ...restProps }, ref) => {\n    const context = useGroupContext()\n    // Merge disabled state from group context\n    const isDisabled = restProps.isDisabled ?? context.groupIsDisabled\n\n    // Derive active and onPress from toggle group context when value is provided\n    const isActive = value !== undefined && context.groupValue !== undefined ? value === context.groupValue : active\n    const handlePress = value !== undefined && context.groupOnChange !== undefined ? () => context.groupOnChange!(value) : onPress\n\n    let buttonVariant = variant\n    if (variant === undefined) {\n      if (context.groupVariant === \"ghost\") {\n        buttonVariant = isActive ? \"default\" : \"ghost\"\n      } else {\n        buttonVariant = \"ghost\"\n      }\n    }\n\n    const buttonProps = {\n      ...restProps,\n      onPress: handlePress,\n      variant: buttonVariant,\n      isDisabled,\n      className: cn(\n        styles['group-item'],\n        isActive && styles.active,\n        className\n      ),\n    }\n\n    return <Button ref={ref} {...buttonProps} />\n  }\n)\nGroupButton.displayName = \"Group.Button\"\n\n// Group.Input component\ninterface GroupInputProps extends InputProps { }\n\n/** Input field integrated into the button group */\nconst GroupInput = React.forwardRef<HTMLInputElement, GroupInputProps>(\n  ({ className, disabled, ...props }, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const inputDisabled = disabled ?? context.groupIsDisabled\n\n    return (\n      <div className={cn(styles['group-input-wrapper'], className)}>\n        <Input\n          ref={ref}\n          {...props}\n          disabled={inputDisabled}\n          className=\"w-full\"\n        />\n      </div>\n    )\n  }\n)\nGroupInput.displayName = \"Group.Input\"\n\n// Group.InputWrapper component - preserves Input styling (for use with ghost variant)\ninterface GroupInputWrapperProps extends InputProps { }\n\n/** Input variant that preserves Input styling within the group */\nconst GroupInputWrapper = React.forwardRef<HTMLInputElement, GroupInputWrapperProps>(\n  ({ className, disabled, ...props }, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const inputDisabled = disabled ?? context.groupIsDisabled\n\n    return (\n      <div className={cn(styles['group-input-wrapper'], className)}>\n        <Input\n          ref={ref}\n          {...props}\n          disabled={inputDisabled}\n          className=\"w-full\"\n        />\n      </div>\n    )\n  }\n)\nGroupInputWrapper.displayName = \"Group.InputWrapper\"\n\n// Group.Select component\ninterface GroupSelectProps extends SelectProps<any> { }\n\n/** Select dropdown integrated into the button group */\nconst GroupSelect = React.forwardRef<HTMLDivElement, GroupSelectProps>(\n  ({ className, isDisabled, ...props }, ref) => {\n    const context = useGroupContext()\n\n    // Merge disabled state from group context\n    const disabled = isDisabled ?? context.groupIsDisabled\n\n    return (\n      <Select\n        ref={ref}\n        {...props}\n        isDisabled={disabled}\n        className={cn('group-select-wrapper', styles['group-select-wrapper'], className)}\n      />\n    )\n  }\n)\nGroupSelect.displayName = \"Group.Select\"\n\n// Assemble compound component\nconst Group = Object.assign(GroupRoot, {\n  Button: GroupButton,\n  Input: GroupInput,\n  InputWrapper: GroupInputWrapper,\n  Select: GroupSelect,\n})\n\nexport { Group, GroupContext }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .group {\n    --radius-basis: calc(var(--spacing) * 1.5);\n    --padding: var(--radius-basis);\n    --radius: var(--radius-sm, 0.375rem);\n    --group-border-width: var(--border-width-base, 1px);\n    --inner-radius: calc(var(--radius) - var(--group-border-width));\n    \n    --control-height: calc((0.80em * var(--leading-tight, 1.25)) + (var(--spacing) * 4) + (var(--group-border-width) * 2));\n    --item-height: max(calc(var(--control-height) - (var(--padding) * 2) - (var(--group-border-width) * 2)), 0px);\n    \n    --button-padding-x: max(calc(var(--spacing) * 2.5 - var(--padding)), 0px);\n    --button-padding-y: max(calc(var(--spacing) * 2 - var(--padding)), 0px);\n    --input-padding-x: max(calc(var(--spacing) * 3 - var(--padding)), 0px);\n    --input-padding-y: max(calc(var(--spacing) * 1.5 - var(--padding)), 0px);\n\n    @apply flex overflow-hidden shrink-0 box-border;\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--group-border-width) solid var(--border);\n    border-radius: var(--radius);\n    padding: var(--padding);\n\n    &.horizontal {\n      @apply flex-row items-stretch;\n      height: var(--control-height);\n\n      /* Fixed: Use margin-block (top/bottom) for horizontal layouts */\n      .item.divider { margin-block: calc(var(--padding) * -1); }\n      .item.divider > [role=\"separator\"] { height: 100%; }\n    }\n\n    &.vertical {\n      @apply flex-col;\n      \n      .item .group-item { @apply w-full; }\n      /* Fixed: Use margin-inline (left/right) for vertical layouts */\n      .item.divider { margin-inline: calc(var(--padding) * -1); }\n      .item.divider > [role=\"separator\"] { width: 100%; }\n    }\n\n    &.none {\n      --padding: 0;\n      @apply gap-0;\n    }\n    \n    &.xs {\n      --radius-basis: calc(var(--spacing) * 0.875);\n      @apply space-x-0.5;\n    }\n    \n    &.sm {\n      --radius-basis: calc(var(--spacing) * 1.25);\n      @apply space-x-1;\n    }\n\n    /* --- Ghost Variant --- */\n    &.ghost {\n      @apply gap-1 border-none overflow-visible;\n      \n      &.none { @apply gap-0; }\n    }\n  }\n\n  .item {\n    @apply flex items-stretch;\n\n    &.grow { flex: 1; }\n    &.divider { \n      @apply p-0 shrink-0 flex-none; \n      > [role=\"separator\"] { flex: 0 0 auto; }\n    }\n  }\n\n  /* Shared Height Logic */\n  :is(.group-item, .group-input-wrapper, .group-select-wrapper) {\n    height: 100%;\n    min-height: var(--item-height);\n  }\n\n  .group-item {\n    @apply flex box-border;\n    padding: var(--button-padding-y) var(--button-padding-x);\n\n    &.active {\n      @apply relative;\n      background-color: var(--active-background);\n      color: var(--active-foreground);\n    }\n  }\n\n  .group-input-wrapper {\n    @apply flex flex-1 items-stretch overflow-visible;\n    input { \n      @apply h-full; \n      padding: var(--input-padding-y) var(--input-padding-x); \n    }\n  }\n\n  .group-select-wrapper {\n    @apply flex items-stretch p-0 bg-transparent border-none;\n    .select { @apply h-full w-full; }\n  }\n\n  .trigger { border: none; }\n\n  .group:not(.ghost) {\n    .item :is(.group-item, .group-select-wrapper) { border: none; }\n    \n    .group-item.active { font-weight: 500; }\n    \n    .group-input-wrapper {\n      --input-border-color: transparent;\n      --input-active-border-color: transparent;\n      --input-active-box-shadow: none;\n    }\n\n    &.none {\n      :is(.group-item, .trigger, .group-select-wrapper) { border-radius: 0; --radius: 0; --inner-radius: 0; }\n      .group-input-wrapper { --input-border-radius: 0; }\n\n      &.horizontal {\n        .item:first-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-top-left-radius: var(--inner-radius);\n          border-bottom-left-radius: var(--inner-radius);\n        }\n        .item:last-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-top-right-radius: var(--inner-radius);\n          border-bottom-right-radius: var(--inner-radius);\n        }\n      }\n      &.vertical {\n        .item:first-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-top-left-radius: var(--inner-radius);\n          border-top-right-radius: var(--inner-radius);\n        }\n        .item:last-child :is(.group-item, .trigger, .group-input-wrapper > *, .group-select-wrapper > *) {\n          border-bottom-left-radius: var(--inner-radius);\n          border-bottom-right-radius: var(--inner-radius);\n        }\n      }\n    }\n\n    &:is(.xs, .sm) {\n      :is(.group-item, .trigger, .group-select-wrapper > *) { border-radius: var(--inner-radius); }\n      .group-input-wrapper { --input-border-radius: var(--inner-radius); }\n    }\n  }\n\n  /* Ghost overrides */\n  .group.ghost {\n    .group-item.active { border-radius: var(--inner-radius); }\n    \n    &:not(.none) .item .group-item:not(.active) {\n      border-radius: var(--inner-radius);\n      border: var(--border-width-base) solid transparent;\n    }\n\n    &.none {\n      :is(.group-item, .group-select-wrapper) { border: none; border-radius: 0; --radius: 0; --inner-radius: 0; }\n      .group-input-wrapper { --input-border-color: transparent; --input-border-radius: 0; }\n    }\n  }\n\n  :is(.group-item, .trigger, .group-input-wrapper > [data-focus-visible]):focus-visible {\n    @apply relative outline-none z-10;\n  }\n\n  .group:not(.ghost) :is(.group-item, .trigger, .group-input-wrapper > [data-focus-visible]):focus-visible {\n    box-shadow: inset 0 0 0 1px var(--focus-ring-color);\n  }\n\n  .group.ghost :is(.group-item, .trigger, .group-input-wrapper > [data-focus-visible]):focus-visible {\n    box-shadow: 0 0 0 1px var(--focus-ring-color);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  group: string;\n  horizontal: string;\n  vertical: string;\n  none: string;\n  xs: string;\n  sm: string;\n  ghost: string;\n  item: string;\n  grow: string;\n  divider: string;\n  first: string;\n  last: string;\n  separator: string;\n  \"group-item\": string;\n  \"group-input-wrapper\": string;\n  \"group-select-wrapper\": string;\n  active: string;\n  trigger: string;\n};\n\nexport default styles;\n"
  },
  "input": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, type ComponentPropsWithoutRef } from \"react\";\n\nimport { useFocusRing } from \"@react-aria/focus\"\nimport { mergeProps, } from \"@react-aria/utils\";\n\nimport { ChevronUp, ChevronDown } from \"lucide-react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { Tooltip } from \"@/components/Tooltip\";\nimport css from \"./Input.module.css\";\n\ntype Variant = \"default\" | \"ghost\";\n\nexport interface InputStyleSlots {\n  root?: StyleValue;\n}\n\nexport type InputStylesProp = StylesProp<InputStyleSlots>;\n\nexport type InputAction = InputActionDef | React.ReactNode;\ntype InputIconSlots = {\n  prefix?: React.ReactNode;\n  suffix?: React.ReactNode;\n};\n\nexport type InputActionDef = {\n  icon: React.ReactNode;\n  title: string;\n  onClick?: React.MouseEventHandler<HTMLButtonElement>;\n};\n\ntype InputActionSlots = {\n  left?: InputAction[];\n  right?: InputAction[];\n};\n\nconst resolveInputStyles = createStylesResolver(['root'] as const);\n\nexport interface InputProps extends Omit<ComponentPropsWithoutRef<\"input\">, \"size\"> {\n  /** Controls the visual style of the input */\n  variant?: Variant;\n  /** Whether the input is in an error state */\n  error?: boolean;\n  /** Icon displayed before the input value by default, or in named prefix/suffix slots */\n  icon?: React.ReactNode | InputIconSlots;\n  /** Inline actions rendered on the left or right side of the input. Passing an array keeps the existing right-side behavior. */\n  actions?: InputAction[] | InputActionSlots;\n  /** Hint content rendered inside a badge on the right side of the input, commonly used for keyboard shortcuts. */\n  hint?: React.ReactNode;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: InputStylesProp;\n}\n\nfunction isInputIconSlots(icon: InputProps[\"icon\"]): icon is InputIconSlots {\n  return typeof icon === \"object\" && icon !== null && !React.isValidElement(icon) && (\"prefix\" in icon || \"suffix\" in icon);\n}\n\nfunction resolveInputIcon(icon: InputProps[\"icon\"]) {\n  if (!icon) {\n    return undefined;\n  }\n\n  if (isInputIconSlots(icon)) {\n    return icon;\n  }\n\n  return { prefix: icon };\n}\n\nfunction isInputActionSlots(actions: InputProps[\"actions\"]): actions is InputActionSlots {\n  return typeof actions === \"object\" && actions !== null && !Array.isArray(actions) && !React.isValidElement(actions) && (\"left\" in actions || \"right\" in actions);\n}\n\nfunction resolveInputActions(actions: InputProps[\"actions\"]): InputActionSlots {\n  if (!actions) {\n    return {};\n  }\n\n  if (isInputActionSlots(actions)) {\n    return actions;\n  }\n\n  return { right: actions };\n}\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return React.useCallback((value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  }, refs);\n}\n\n\nexport const Input = forwardRef<HTMLInputElement, InputProps>(\n  (\n    {\n      className,\n      variant = \"default\",\n      error = false,\n      disabled,\n      icon,\n      actions,\n      hint,\n      type = \"text\",\n      onFocus,\n      onBlur,\n      styles: stylesProp,\n      ...props\n    },\n    ref\n  ) => {\n    const resolvedActions = resolveInputActions(actions);\n    const resolvedIcon = resolveInputIcon(icon);\n    const leftActions = resolvedActions.left ?? [];\n    const rightActions = resolvedActions.right ?? [];\n    const hasPrefix = !!resolvedIcon?.prefix;\n    const hasSuffix = !!resolvedIcon?.suffix;\n    const hasLeftActions = leftActions.length > 0;\n    const hasRightActions = rightActions.length > 0;\n    const hasHint = hint !== undefined && hint !== null;\n    const hasStartAdornment = hasPrefix || hasLeftActions;\n    const isNumberType = type === \"number\";\n    const [isFocused, setIsFocused] = React.useState(false);\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const mergedRef = useMergedRef(ref, inputRef);\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {\n      setIsFocused(true);\n      onFocus?.(e);\n    };\n\n    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {\n      setIsFocused(false);\n      onBlur?.(e);\n    };\n\n    const handleSpinClick = (direction: \"up\" | \"down\") => {\n      if (!inputRef.current || disabled) return;\n\n      const input = inputRef.current;\n\n      if (direction === \"up\") {\n        input.stepUp();\n      } else {\n        input.stepDown();\n      }\n\n      // Dispatch native input event to trigger React onChange handlers\n      const event = new Event(\"input\", { bubbles: true });\n      input.dispatchEvent(event);\n    };\n\n    const resolved = resolveInputStyles(stylesProp);\n    const hasEndAdornment = hasSuffix || hasRightActions || hasHint || isNumberType;\n    const inputPaddingStyle: React.CSSProperties = {\n      ...(hasStartAdornment ? { paddingLeft: '8px' } : {}),\n      ...(hasEndAdornment ? { paddingRight: '8px' } : {}),\n    };\n\n    const renderAction = (action: InputAction, index: number) => {\n      const key = React.isValidElement(action) ? index : ((action as InputActionDef).title || index);\n\n      return React.isValidElement(action) ? (\n        <React.Fragment key={key}>{action}</React.Fragment>\n      ) : (\n        <Tooltip key={key} content={(action as InputActionDef).title} position=\"top\">\n          <button\n            type=\"button\"\n            className={css.action}\n            aria-label={(action as InputActionDef).title}\n            onClick={(action as InputActionDef).onClick}\n          >\n            {(action as InputActionDef).icon}\n          </button>\n        </Tooltip>\n      );\n    };\n\n    return (\n      <div\n        className={cn('input', css.container)}\n        data-active={isFocused ? \"true\" : undefined}\n        data-focus-visible={isFocusVisible ? \"true\" : undefined}\n        data-disabled={disabled || undefined}\n        data-error={error ? \"true\" : undefined}\n        data-variant={variant}\n      >\n        {hasStartAdornment && (\n          <div className={css['start-adornments']} data-start-adornments>\n            {hasPrefix && (\n              <div className={cn('input', 'icon-wrapper', css['icon-wrapper'], css['prefix-icon'])}>\n                {resolvedIcon?.prefix}\n              </div>\n            )}\n            {hasLeftActions && (\n              <div className={css.actions} data-actions data-actions-position=\"left\">\n                {leftActions.map(renderAction)}\n              </div>\n            )}\n          </div>\n        )}\n        <input\n          ref={mergedRef}\n          type={type}\n          disabled={disabled}\n          data-focus-visible={isFocusVisible ? \"true\" : undefined}\n          data-active={isFocused ? \"true\" : undefined}\n          data-disabled={disabled || undefined}\n          data-error={error ? \"true\" : undefined}\n          data-variant={variant}\n          className={cn(\n            'input',\n            css.input,\n            className,\n            resolved.root\n          )}\n          style={inputPaddingStyle}\n          {...mergeProps(focusProps, {\n            onFocus: handleFocus,\n            onBlur: handleBlur,\n            ...props,\n          })}\n        />\n        {hasEndAdornment && (\n          <div className={css['end-adornments']} data-end-adornments>\n            {hasSuffix && (\n              <div className={cn('input', 'icon-wrapper', css['icon-wrapper'], css['suffix-icon'])}>\n                {resolvedIcon?.suffix}\n              </div>\n            )}\n            {hasRightActions && (\n              <div className={css.actions} data-actions data-actions-position=\"right\">\n                {rightActions.map(renderAction)}\n              </div>\n            )}\n            {hasHint && <span data-hint>{hint}</span>}\n            {isNumberType && (\n              <div\n                className={cn(css['number-controls'], disabled && css.disabled)}\n                data-disabled={disabled || undefined}\n              >\n                <button\n                  type=\"button\"\n                  className={cn('input', 'spin-button', css['spin-button'])}\n                  onClick={() => handleSpinClick(\"up\")}\n                  disabled={disabled}\n                  tabIndex={-1}\n                  aria-label=\"Increment\"\n                >\n                  <ChevronUp size={12} />\n                </button>\n                <button\n                  type=\"button\"\n                  className={cn('input', 'spin-button', css['spin-button'])}\n                  onClick={() => handleSpinClick(\"down\")}\n                  disabled={disabled}\n                  tabIndex={-1}\n                  aria-label=\"Decrement\"\n                >\n                  <ChevronDown size={12} />\n                </button>\n              </div>\n            )}\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nInput.displayName = \"Input\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .input {\n    --disabled-opacity: 0.5;\n    height: fit-content;\n    flex: 1;\n    min-width: 0;\n    @apply py-1.5 px-3;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: transparent;\n    border: none;\n    outline: none;\n    box-sizing: border-box;\n\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-disabled] {\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n    }\n\n    /* Hide default browser spinners for number inputs */\n    &[type=\"number\"] {\n      &::-webkit-outer-spin-button,\n      &::-webkit-inner-spin-button {\n        -webkit-appearance: none;\n        margin: 0;\n        display: none;\n      }\n\n      /* Firefox */\n      &[type=\"number\"] {\n        -moz-appearance: textfield;\n      }\n    }\n  }\n\n  .icon-wrapper {\n    @apply z-10 flex items-center;\n    color: var(--icon-color);\n    pointer-events: none;\n  }\n\n  .prefix-icon {\n    @apply relative;\n  }\n\n  .suffix-icon {\n    @apply relative;\n  }\n\n  .container {\n    display: flex;\n    align-items: center;\n    width: 100%;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--input-border-color, var(--border));\n    border-radius: var(--input-border-radius, var(--radius-sm));\n    box-sizing: border-box;\n    overflow: hidden;\n\n    &[data-active] {\n      border-color: var(--input-active-border-color, var(--ring-color));\n      box-shadow: var(--input-active-box-shadow, 0 0 0 1px mix(var(--ring-color) 20%, transparent));\n    }\n\n    &[data-focus-visible] {\n      @apply ring-0;\n      border-color: var(--input-active-border-color, var(--ring-color));\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      cursor: not-allowed;\n      opacity: 0.6;\n    }\n\n    &[data-error] {\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n\n      &[data-focus-visible] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n\n    &[data-variant=\"ghost\"] {\n      background-color: transparent;\n      border-color: transparent;\n      &[data-active], &[data-focus-visible] {\n        border-color: transparent;\n        box-shadow: none;\n      }\n    }\n  }\n\n  .start-adornments,\n  .end-adornments {\n    @apply flex items-center gap-1;\n    flex-shrink: 0;\n    pointer-events: none;\n  }\n\n  .start-adornments {\n    @apply pl-2.5;\n  }\n\n  .end-adornments {\n    @apply pr-1.5;\n  }\n\n  .actions {\n    @apply flex items-center gap-1;\n    pointer-events: auto;\n  }\n\n  .action {\n    @apply flex items-center justify-center p-2;\n    border-radius: 0.25rem;\n    color: var(--action-color);\n  }\n\n  .action:hover {\n    background-color: var(--background-hover);\n    color: var(--action-hover-color);\n  }\n\n  .number-controls {\n    @apply flex w-6 flex-col;\n    pointer-events: auto;\n  }\n\n  .number-controls.disabled {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .spin-button {\n    @apply flex w-full flex-1 items-center justify-center p-0 cursor-pointer;\n    flex: 1;\n    background-color: transparent;\n    border: none;\n    color: var(--spin-color);\n    transition: color 150ms ease-out, background-color 150ms ease-out;\n\n    &:hover:not(:disabled) {\n      background-color: var(--spin-hover-background);\n      color: var(--spin-hover-color);\n    }\n\n    &:active:not(:disabled) {\n      background-color: var(--spin-active-background);\n      color: var(--spin-active-color);\n    }\n\n    &:disabled {\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  input: string;\n  \"icon-wrapper\": string;\n  \"prefix-icon\": string;\n  \"suffix-icon\": string;\n  container: string;\n  \"start-adornments\": string;\n  \"end-adornments\": string;\n  actions: string;\n  hint: string;\n  action: string;\n  \"number-controls\": string;\n  disabled: string;\n  \"spin-button\": string;\n};\n\nexport default styles;\n"
  },
  "label": {
    "tsx": "import { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Label.module.css\";\n\ninterface LabelStyleSlots {\n  root?: StyleValue;\n  requiredIndicator?: StyleValue;\n  helperText?: StyleValue;\n}\n\ntype LabelStylesProp = StylesProp<LabelStyleSlots>;\n\nconst resolveLabelBaseStyles = createStylesResolver(['root', 'requiredIndicator', 'helperText'] as const);\n\nexport interface LabelProps\n  extends React.LabelHTMLAttributes<HTMLLabelElement> {\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: LabelStylesProp;\n  /** Whether to show a required asterisk indicator */\n  required?: boolean;\n  /** Helper text shown below the label */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Size of the label text */\n  size?: \"sm\" | \"md\" | \"lg\" | null;\n  /** Whether the label appears disabled */\n  disabled?: boolean | null;\n  /** Whether to apply error styling */\n  error?: boolean | null;\n}\n\nconst Label = ({\n  className,\n  styles,\n  size = \"md\",\n  disabled,\n  error,\n  required,\n  helperText,\n  helperTextError,\n  children,\n  ...props\n}: LabelProps) => {\n  const resolved = resolveLabelBaseStyles(styles);\n  return (\n    <div className=\"w-full\">\n      <label\n        className={cn('label', css.label, className, resolved.root)}\n        data-size={size ?? 'md'}\n        data-disabled={disabled || undefined}\n        data-error={error || undefined}\n        {...props}\n      >\n        {children}\n        {required && (\n          <span className={cn('label', 'required-indicator', css['required-indicator'], resolved.requiredIndicator)} aria-label=\"required\">\n            *\n          </span>\n        )}\n      </label>\n      {helperText && (\n        <p\n          className={cn('label', 'helper-text', css['helper-text'], resolved.helperText)}\n          data-error={helperTextError || undefined}\n        >\n          {helperText}\n        </p>\n      )}\n    </div>\n  );\n};\n\nLabel.displayName = \"Label\";\n\nexport { Label };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .label {\n    display: block;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n    transition: color 150ms ease;\n\n    &[data-size=\"sm\"] { font-size: var(--text-sm); }\n    &[data-size=\"lg\"] { font-size: var(--text-md); }\n\n    &[data-disabled] {\n      color: var(--disabled-foreground);\n      opacity: 0.6;\n      cursor: not-allowed;\n    }\n\n    &[data-error] {\n      color: var(--error-foreground);\n    }\n  }\n\n  .required-indicator {\n    margin-left: 0.25rem;\n    color: var(--required-color);\n  }\n\n  .helper-text {\n    display: block;\n    font-size: var(--text-sm);\n    margin-top: 0.25rem;\n    transition: color 150ms ease;\n    color: var(--helper-color);\n\n    &[data-error] {\n      color: var(--helper-error-color);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  label: string;\n  \"required-indicator\": string;\n  \"helper-text\": string;\n};\n\nexport default styles;\n"
  },
  "list": {
    "tsx": "'use client';\n\nimport React from 'react';\nimport { cn } from \"./utils\";\nimport { Divider as FoldDivider } from '@/components/Divider';\nimport styles from './List.module.css';\nimport { ListContext } from './list.context';\nimport {\n  ListContainerProps,\n  ListHeaderProps,\n  ListNavigateCallbacks,\n  ListRef,\n  ActionGroupComponentProps,\n  FooterComponentProps,\n} from './list.types';\nimport { DividerProps } from '@/components/Divider';\n\n// Ref container for keyboard navigation\nconst Container = React.forwardRef<ListRef, ListContainerProps>(\n  ({ items = [], variant = 'default', spacing = 'default', onNavigate, children, className, ...props }, ref) => {\n    const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);\n    const [isKeyboardMode, setIsKeyboardMode] = React.useState(false);\n    const itemRefsContainer = React.useRef<(HTMLElement | null)[]>([]);\n    const itemCountRef = React.useRef(0);\n    const prevItemsLengthRef = React.useRef(items.length);\n\n    // Reset counter if items length changes significantly\n    if (items.length !== prevItemsLengthRef.current) {\n      itemCountRef.current = 0;\n      itemRefsContainer.current = [];\n      prevItemsLengthRef.current = items.length;\n    }\n\n    // Expose ref methods for keyboard navigation\n    React.useImperativeHandle(ref, () => ({\n      focusNext: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex((prev) => {\n          const next = prev === null ? 0 : Math.min(prev + 1, items.length - 1);\n          onNavigate?.down?.();\n          return next;\n        });\n      },\n      focusPrev: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex((prev) => {\n          const next = prev === null ? items.length - 1 : Math.max(prev - 1, 0);\n          onNavigate?.up?.();\n          return next;\n        });\n      },\n      focusFirst: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex(0);\n        onNavigate?.down?.();\n      },\n      focusLast: () => {\n        setIsKeyboardMode(true);\n        setHighlightedIndex(items.length - 1);\n        onNavigate?.up?.();\n      },\n      selectHighlighted: () => {\n        onNavigate?.enter?.();\n      },\n      clearHighlight: () => {\n        setHighlightedIndex(null);\n      },\n      getHighlightedIndex: () => highlightedIndex,\n    }), [highlightedIndex, items.length, onNavigate]);\n\n    React.useEffect(() => {\n      const el = highlightedIndex !== null ? itemRefsContainer.current[highlightedIndex] : null;\n      if (!el) return;\n      let scroller: HTMLElement | null = el.parentElement;\n      while (scroller && scroller !== document.body && scroller.scrollHeight <= scroller.clientHeight) {\n        scroller = scroller.parentElement;\n      }\n      if (!scroller || scroller === document.body) return;\n      const scrollerRect = scroller.getBoundingClientRect();\n      const itemRect = el.getBoundingClientRect();\n      const buffer = el.offsetHeight * 2;\n      const itemTop = itemRect.top - scrollerRect.top;\n      const itemBottom = itemRect.bottom - scrollerRect.top;\n      if (itemTop < buffer) {\n        scroller.scrollTo({ top: Math.max(0, scroller.scrollTop + itemTop - buffer), behavior: 'smooth' });\n      } else if (itemBottom > scroller.clientHeight - buffer) {\n        scroller.scrollTo({ top: scroller.scrollTop + itemBottom - scroller.clientHeight + buffer, behavior: 'smooth' });\n      }\n    }, [highlightedIndex]);\n\n    const registerItem = React.useCallback((ref: HTMLElement | null) => {\n      const index = itemCountRef.current;\n      itemRefsContainer.current[index] = ref;\n      itemCountRef.current++;\n      return index;\n    }, [items.length]);\n\n    const contextValue = React.useMemo(\n      () => ({\n        highlightedIndex,\n        isKeyboardMode,\n        focusItem: (index: number) => {\n          setIsKeyboardMode(false);\n          setHighlightedIndex(index);\n        },\n        registerItem,\n        itemRefs: itemRefsContainer,\n      }),\n      [highlightedIndex, isKeyboardMode, registerItem]\n    );\n\n    return (\n      <ListContext.Provider value={contextValue}>\n        <div\n          role=\"list\"\n          className={cn('list', styles.container, className)}\n          data-variant={variant}\n          data-spacing={spacing}\n          data-keyboard-mode={isKeyboardMode ? 'true' : undefined}\n          {...(props as React.HTMLAttributes<HTMLDivElement>)}\n        >\n          {children}\n        </div>\n      </ListContext.Provider>\n    );\n  }\n);\nContainer.displayName = 'List';\n\n/** Sticky heading row above a section of list items */\nconst Header = React.forwardRef<HTMLElement, ListHeaderProps>(\n  ({ sticky, children, className, ...props }, ref) => (\n    <header\n      ref={ref}\n      className={cn(styles.header, sticky && styles.sticky, className)}\n      {...props}\n    >\n      {children}\n    </header>\n  )\n);\nHeader.displayName = 'List.Header';\n\n/** Row of action buttons aligned to the right of a list item */\nconst ActionGroup = React.forwardRef<HTMLDivElement, ActionGroupComponentProps>(\n  ({ justify = 'flex-start', children, className, ...props }, ref) => (\n    <div\n      ref={ref}\n      className={cn(styles.actionGroup, className)}\n      data-justify={justify}\n      {...props}\n    >\n      {children}\n    </div>\n  )\n);\nActionGroup.displayName = 'List.ActionGroup';\n\n/** Horizontal separator between list sections */\nconst Divider = React.forwardRef<HTMLDivElement, DividerProps>(\n  ({ className, ...props }, ref) => (\n    <FoldDivider\n      ref={ref}\n      className={className}\n      {...props}\n    />\n  )\n);\nDivider.displayName = 'List.Divider';\n\n/** Fixed bottom row beneath the list body */\nconst Footer = React.forwardRef<HTMLElement, FooterComponentProps>(\n  ({ align = 'center', children, className, ...props }, ref) => (\n    <footer\n      ref={ref}\n      className={cn(styles.footer, className)}\n      data-align={align}\n      {...props}\n    >\n      {children}\n    </footer>\n  )\n);\nFooter.displayName = 'List.Footer';\n\n// Compound component\nconst List = Object.assign(Container, {\n  Header,\n  Item: null as any, // Set in index.ts\n  Checkbox: null as any,\n  CheckboxIndicator: null as any,\n  Switch: null as any,\n  Input: null as any,\n  Select: null as any,\n  Media: null as any,\n  Desc: null as any,\n  ActionGroup,\n  Divider,\n  Footer,\n});\n\nexport { Container, Header, ActionGroup, Divider, Footer };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .container {\n    @apply mx-auto;\n    max-width: 28rem;\n    font-family: var(--font-sans, system-ui, -apple-system, sans-serif);\n    color: var(--foreground);\n  }\n\n  .header {\n    @apply flex items-center justify-between;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n    backdrop-filter: blur(12px);\n    z-index: 10;\n  }\n\n  .header.sticky { position: sticky; top: 0; }\n\n  .container[data-spacing=\"sm\"] .header {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n    padding-top: 0.25rem;\n    padding-bottom: 0.25rem;\n  }\n\n  .header > :first-child {\n    font-weight: var(--font-weight-semibold);\n    font-size: 1.125rem;\n    color: var(--header-title-color);\n  }\n\n  .header > :last-child { color: var(--header-subtitle-color); }\n\n  .item {\n    @apply flex flex-row items-center gap-3 px-2 py-1 cursor-pointer;\n  }\n\n  .container .item:hover {\n    background-color: var(--background-hover);\n  }\n\n  .container[data-keyboard-mode=\"true\"] .item[data-highlighted=\"true\"] {\n    background-color: var(--background-highlighted);\n  }\n\n  .container[data-spacing=\"sm\"] .item {\n    padding: 0.5rem 0.75rem;\n    gap: 0.375rem;\n  }\n\n  .checkbox,\n  .control,\n  .media {\n    @apply flex items-center justify-center flex-shrink-0;\n  }\n\n  .control { margin-left: auto; }\n\n  .media {\n    @apply h-8 w-8;\n  }\n\n  .desc {\n    font-size: var(--text-sm);\n    color: var(--desc-color);\n    @apply truncate;\n  }\n\n  .action-group {\n    @apply flex items-center;\n    padding-left: 0.25rem;\n    padding-right: 0.25rem;\n  }\n\n  .action-group[data-justify=\"space-between\"] { justify-content: space-between; }\n  .action-group[data-justify=\"flex-start\"] { justify-content: flex-start; }\n  .action-group[data-justify=\"flex-end\"] { justify-content: flex-end; }\n\n  .actions {\n    align-items: center;\n    gap: 0.25rem;\n    margin-left: auto;\n    flex-shrink: 0;\n    @apply p-1.5 hidden group-hover:flex;\n  }\n\n  .action {\n    @apply flex items-center justify-center;\n    border-radius: 0.25rem;\n    color: var(--action-color);\n    @apply p-2;\n  }\n\n  .action:hover {\n    background-color: var(--background-hover);\n    color: var(--action-hover-color);\n  }\n\n  .footer {\n    @apply flex p-6 pb-12;\n  }\n\n  .footer[data-align=\"center\"] { justify-content: center; }\n  .footer[data-align=\"flex-start\"] { justify-content: flex-start; }\n  .footer[data-align=\"flex-end\"] { justify-content: flex-end; }\n\n  .container[data-spacing=\"sm\"] .footer {\n    padding: 0.375rem 0.75rem;\n    padding-bottom: 0.375rem;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly container: string;\n  readonly header: string;\n  readonly sticky: string;\n  readonly item: string;\n  readonly actionGroup: string;\n  readonly actions: string;\n  readonly action: string;\n  readonly checkbox: string;\n  readonly control: string;\n  readonly media: string;\n  readonly desc: string;\n  readonly footer: string;\n};\n\nexport default styles;\n"
  },
  "mask": {
    "tsx": "import * as React from \"react\";\nimport { cn } from \"./utils\";\nimport styles from \"./Mask.module.css\";\n\nexport interface MaskProps extends React.HTMLAttributes<HTMLDivElement> {\n  asChild?: boolean;\n  children: React.ReactNode;\n}\n\ntype MaskFilter =\n  | {\n      kind: \"fade\";\n      direction: NonNullable<MaskFadeProps[\"direction\"]>;\n      intensity: number;\n      fixed?: boolean;\n    }\n  | {\n      kind: \"scroll-fade\";\n    };\n\nconst MaskRoot = React.forwardRef<HTMLDivElement, MaskProps>(\n  ({ asChild = false, className, children, style, ...props }, ref) => {\n    const childArray = React.Children.toArray(children);\n    const maskFilters: MaskFilter[] = [];\n    let clipPath: string | undefined;\n    let hasFixedFade = false;\n    let contentChildren: React.ReactNode[] = [];\n    const supportsScrollFade = hasScrollFadeVariables(style);\n\n    childArray.forEach((child) => {\n      if (React.isValidElement(child)) {\n        if (child.type === MaskFade) {\n          const fadeChild = child as React.ReactElement<MaskFadeProps>;\n          if (isScrollFade(fadeChild.props) && supportsScrollFade) {\n            maskFilters.push({ kind: \"scroll-fade\" });\n          } else {\n            if (fadeChild.props.fixed) hasFixedFade = true;\n            maskFilters.push({\n              kind: \"fade\",\n              direction: fadeChild.props.direction ?? \"bottom\",\n              intensity: fadeChild.props.intensity ?? 1,\n              fixed: fadeChild.props.fixed,\n            });\n          }\n        } else if (child.type === MaskClip) {\n          const clipChild = child as React.ReactElement<MaskClipProps>;\n          clipPath = clipChild.props.shape;\n        } else {\n          contentChildren.push(child);\n        }\n      } else {\n        contentChildren.push(child);\n      }\n    });\n\n    const resolvedMaskFilters = maskFilters.map((maskFilter) => generateMaskFilter(maskFilter));\n\n    const maskStyles = {\n      ...style,\n      ...(hasFixedFade ? { maxHeight: \"inherit\", overflow: \"hidden\" as const } : {}),\n      ...(clipPath ? { \"--mask-clip-path\": clipPath } as Record<string, string> : {}),\n      ...(resolvedMaskFilters.length > 0 ? {\n        WebkitMaskImage: resolvedMaskFilters.join(\", \"),\n        maskImage: resolvedMaskFilters.join(\", \"),\n        WebkitMaskComposite: resolvedMaskFilters.length > 1 ? \"source-in\" : \"source-over\",\n        maskComposite: resolvedMaskFilters.length > 1 ? \"intersect\" : \"add\",\n      } : {}),\n    } as React.CSSProperties;\n\n    if (asChild) {\n      if (contentChildren.length !== 1 || !React.isValidElement(contentChildren[0])) {\n        throw new Error(\"Mask with asChild expects exactly one valid React element child.\");\n      }\n\n      const child = contentChildren[0] as React.ReactElement<{\n        className?: string;\n        style?: React.CSSProperties;\n        ref?: React.Ref<HTMLDivElement>;\n      }>;\n\n      return React.cloneElement(child, {\n        ...props,\n        ref: mergeRefs(ref, child.props.ref),\n        className: cn(\"mask\", styles.mask, className, child.props.className),\n        style: {\n          ...child.props.style,\n          ...maskStyles,\n        },\n      });\n    }\n\n    return (\n      <div\n        {...props}\n        ref={ref}\n        className={cn(\"mask\", styles.mask, className)}\n        style={maskStyles}\n      >\n        {contentChildren}\n      </div>\n    );\n  }\n);\n\nMaskRoot.displayName = \"Mask\";\n\ninterface MaskGradientProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** CSS gradient string applied as the mask image */\n  gradient: string;\n}\n\nconst MaskGradient = React.forwardRef<HTMLDivElement, MaskGradientProps>(\n  ({ className, gradient, style, children, ...props }, ref) => {\n    const maskStyles = {\n      ...style,\n      \"--mask-gradient\": gradient,\n    } as React.CSSProperties;\n\n    return (\n      <div\n        {...props}\n        ref={ref}\n        className={cn(styles.mask, styles[\"mask-gradient\"], className)}\n        style={maskStyles}\n      >\n        {children}\n      </div>\n    );\n  }\n);\n\nMaskGradient.displayName = \"MaskGradient\";\n\ninterface MaskFadeProps {\n  /** Edge of the container where the fade starts. Omit to use the variable-driven vertical scroll fade preset. */\n  direction?: \"top\" | \"bottom\" | \"left\" | \"right\";\n  /** Controls the size of the fade — higher values produce a longer fade */\n  intensity?: number;\n  /** Uses percentage-based fade size instead of pixel-based, for fixed-height containers */\n  fixed?: boolean;\n}\n\nconst MaskFade: React.FC<MaskFadeProps> = () => null;\nMaskFade.displayName = \"MaskFade\";\n\nfunction mergeRefs<T>(\n  ...refs: Array<React.Ref<T> | undefined>\n): React.RefCallback<T> {\n  return (value) => {\n    refs.forEach((ref) => {\n      if (!ref) return;\n\n      if (typeof ref === \"function\") {\n        ref(value);\n        return;\n      }\n\n      (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nfunction isScrollFade(props: MaskFadeProps): boolean {\n  return props.direction === undefined && props.intensity === undefined && props.fixed === undefined;\n}\n\nfunction hasScrollFadeVariables(style: React.CSSProperties | undefined): boolean {\n  if (!style) return false;\n\n  const styleEntries = style as Record<string, unknown>;\n  return \"--mask-top-fade\" in styleEntries || \"--mask-bottom-fade\" in styleEntries;\n}\n\nfunction generateMaskFilter(maskFilter: MaskFilter): string {\n  if (maskFilter.kind === \"scroll-fade\") {\n    return \"linear-gradient(to bottom, transparent 0%, black var(--mask-top-fade, 0%), black calc(100% - var(--mask-bottom-fade, 0%)), transparent 100%)\";\n  }\n\n  return generateFadeMask(maskFilter.direction, maskFilter.intensity, maskFilter.fixed);\n}\n\nfunction generateFadeMask(direction: string = \"bottom\", intensity: number = 1, fixed?: boolean): string {\n  const fadeSize = fixed ? `${Math.min(50, 15 * intensity)}%` : `${Math.min(200, 40 * intensity)}px`;\n  const directionMap = {\n    top: `linear-gradient(to bottom, transparent 0, black ${fadeSize})`,\n    bottom: `linear-gradient(to bottom, black calc(100% - ${fadeSize}), transparent 100%)`,\n    left: `linear-gradient(to right, transparent 0, black ${fadeSize})`,\n    right: `linear-gradient(to right, black calc(100% - ${fadeSize}), transparent 100%)`,\n  };\n  return directionMap[direction as keyof typeof directionMap] || directionMap.bottom;\n}\n\n\ninterface MaskClipProps {\n  /** CSS clip-path value applied to the container (e.g. polygon, circle) */\n  shape: string;\n}\n\nconst MaskClip: React.FC<MaskClipProps> = () => null;\nMaskClip.displayName = \"MaskClip\";\n\nconst Mask = Object.assign(MaskRoot, {\n  Gradient: MaskGradient,\n  Fade: MaskFade,\n  Clip: MaskClip,\n});\n\nexport { Mask };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .mask {\n    @apply relative h-full w-full;\n  }\n}\n\n.mask[style*=\"mask-image\"],\n.mask[style*=\"-webkit-mask-image\"] {\n  -webkit-mask-size: 100% 100%;\n  mask-size: 100% 100%;\n}\n\n.mask[style*=\"--mask-clip-path\"] {\n  clip-path: var(--mask-clip-path);\n}\n\n.mask-gradient {\n  background: var(--mask-gradient);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n}\n",
    "cssTypes": "declare const styles: {\n  mask: string;\n  \"mask-gradient\": string;\n};\n\nexport default styles;\n"
  },
  "menu": {
    "tsx": "import * as React from \"react\"\nimport type { Key } from \"react-aria\"\nimport { useListNavigation } from \"../../utils/list-navigation\"\nimport type {\n  MenuContextValue,\n  MenuSubmenuContextValue,\n  RadioGroupContextValue,\n  MenuProps,\n  MenuPortalProps,\n  MenuItemExtras,\n} from \"./menu.types\"\n\nconst MenuContext = React.createContext<MenuContextValue | null>(null)\n\nexport function useMenuContext() {\n  const context = React.useContext(MenuContext)\n  if (!context) {\n    throw new Error(\"Menu component must be used within Menu root\")\n  }\n  return context\n}\n\nexport const MenuSubmenuContext = React.createContext<MenuSubmenuContextValue | null>(null)\n\nexport function useMenuSubmenuContext() {\n  return React.useContext(MenuSubmenuContext)\n}\n\nexport const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)\n\nexport function useRadioGroupContext() {\n  return React.useContext(RadioGroupContext)\n}\n\nconst MenuPortal = ({ children }: MenuPortalProps) => {\n  return <>{children}</>\n}\nMenuPortal.displayName = \"MenuPortal\"\nconst Menu = ({\n  children,\n  type = \"context-menu\",\n  selectionMode = \"none\",\n  selectedKeys: controlledSelectedKeys,\n  defaultSelectedKeys,\n  onSelectionChange,\n}: MenuProps) => {\n  const [isOpen, setIsOpen] = React.useState(false)\n  const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(\n    defaultSelectedKeys ?? new Set()\n  )\n  const [radioGroups, setRadioGroups] = React.useState<Map<string, Key | null>>(new Map())\n  const [activeSubmenuKey, setActiveSubmenuKey] = React.useState<Key | null>(null)\n\n  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : uncontrolledSelectedKeys\n\n  const nav = useListNavigation({ isOpen })\n  const itemExtrasRef = React.useRef<Map<Key, MenuItemExtras>>(new Map())\n  const mouseMoveDetectedRef = React.useRef(true)\n  const clickPositionRef = React.useRef({ x: 0, y: 0 })\n  const triggerRef = React.useRef<HTMLDivElement | null>(null)\n\n  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {\n    nav.registerItem(key, textValue, isDisabled)\n    itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })\n  }, [nav.registerItem])\n\n  const unregisterItem = React.useCallback((key: Key) => {\n    nav.unregisterItem(key)\n    itemExtrasRef.current.delete(key)\n  }, [nav.unregisterItem])\n\n  const handleSelectionChange = React.useCallback((keys: Set<Key>) => {\n    if (controlledSelectedKeys === undefined) {\n      setUncontrolledSelectedKeys(keys)\n    }\n    onSelectionChange?.(keys)\n  }, [controlledSelectedKeys, onSelectionChange])\n\n  const toggleSelection = React.useCallback((key: Key) => {\n    const newKeys = new Set(selectedKeys)\n    if (selectionMode === \"single\") {\n      newKeys.clear()\n      newKeys.add(key)\n    } else if (selectionMode === \"multiple\") {\n      if (newKeys.has(key)) {\n        newKeys.delete(key)\n      } else {\n        newKeys.add(key)\n      }\n    }\n    handleSelectionChange(newKeys)\n  }, [selectedKeys, selectionMode, handleSelectionChange])\n\n  const close = React.useCallback(() => {\n    setIsOpen(false)\n    nav.setFocusedKey(null)\n  }, [nav.setFocusedKey])\n\n  const selectFocusedItem = React.useCallback(() => {\n    if (nav.focusedKey === null) return\n    const item = nav.items.find(i => i.key === nav.focusedKey)\n    if (item?.isDisabled) return\n    const extras = itemExtrasRef.current.get(nav.focusedKey)\n    extras?.onSelect?.()\n  }, [nav.focusedKey, nav.items])\n\n  const isFocusedItemSubmenu = React.useCallback(() => {\n    if (nav.focusedKey === null) return false\n    const extras = itemExtrasRef.current.get(nav.focusedKey)\n    return extras?.isSubmenuTrigger ?? false\n  }, [nav.focusedKey])\n\n  const setRadioGroupValue = React.useCallback((groupName: string, value: Key | null) => {\n    setRadioGroups(prev => {\n      const next = new Map(prev)\n      next.set(groupName, value)\n      return next\n    })\n  }, [])\n\n  const getRadioGroupValue = React.useCallback((groupName: string) => {\n    return radioGroups.get(groupName) ?? null\n  }, [radioGroups])\n\n  React.useEffect(() => {\n    if (isOpen && nav.focusedKey === null && nav.enabledFilteredItems.length > 0) {\n      nav.setFocusedKey(nav.enabledFilteredItems[0].key)\n    }\n  }, [isOpen, nav.enabledFilteredItems, nav.focusedKey, nav.setFocusedKey])\n\n  const contextValue = React.useMemo(() => ({\n    isOpen,\n    setIsOpen,\n    type,\n    close,\n    selectionMode,\n    selectedKeys,\n    onSelectionChange: handleSelectionChange,\n    toggleSelection,\n    items: nav.items,\n    registerItem,\n    unregisterItem,\n    focusedKey: nav.focusedKey,\n    setFocusedKey: nav.setFocusedKey,\n    navigateToNextItem: nav.navigateToNextItem,\n    navigateToPrevItem: nav.navigateToPrevItem,\n    selectFocusedItem,\n    isFocusedItemSubmenu,\n    radioGroups,\n    setRadioGroupValue,\n    getRadioGroupValue,\n    triggerRef,\n    mouseMoveDetectedRef,\n    clickPositionRef,\n    activeSubmenuKey,\n    setActiveSubmenuKey,\n  } satisfies MenuContextValue), [\n    isOpen,\n    setIsOpen,\n    type,\n    close,\n    selectionMode,\n    selectedKeys,\n    handleSelectionChange,\n    toggleSelection,\n    nav.items,\n    registerItem,\n    unregisterItem,\n    nav.focusedKey,\n    nav.setFocusedKey,\n    nav.navigateToNextItem,\n    nav.navigateToPrevItem,\n    selectFocusedItem,\n    isFocusedItemSubmenu,\n    radioGroups,\n    setRadioGroupValue,\n    getRadioGroupValue,\n    activeSubmenuKey,\n    setActiveSubmenuKey,\n  ])\n\n  return (\n    <MenuContext.Provider value={contextValue}>\n      {children}\n    </MenuContext.Provider>\n  )\n}\nMenu.displayName = \"Menu\"\n\nexport { Menu, MenuPortal }\nexport type {\n  MenuProps,\n  MenuTriggerProps,\n  MenuPortalProps,\n  MenuContentProps,\n  MenuGroupProps,\n  MenuItemProps,\n  MenuCheckboxItemProps,\n  MenuRadioGroupProps,\n  MenuRadioItemProps,\n  MenuLabelProps,\n  MenuSeparatorProps,\n  MenuShortcutProps,\n  MenuSubProps,\n  MenuSubTriggerProps,\n  MenuSubContentProps,\n} from \"./menu.types\"\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .content,\n  .sub-content {\n    --padding: calc(var(--spacing) * 1.5);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    --menu-animation: none;\n    --disabled-opacity: 0.5;\n  }\n\n  .trigger {\n    &[data-type=\"pop-over\"][data-active] {\n      opacity: 1;\n      background-color: var(--trigger-active-background);\n      border-radius: var(--radius-sm, 0.375rem);\n    }\n  }\n\n  .content {\n    @apply absolute min-w-40 max-w-80 overflow-hidden;\n    z-index: 50000;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slide-in-from-top 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slide-out-to-top 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .list {\n    @apply space-y-1;\n    max-height: 24rem;\n    overflow-y: auto;\n  }\n\n  .item,\n  .checkbox-item,\n  .radio-item {\n    @apply flex min-w-0 items-center gap-2;\n    padding: var(--padding);\n    border-radius: var(--inner-radius);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    color: var(--item-foreground);\n    &[data-highlighted] {\n      background-color: var(--item-highlighted-background);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n  }\n\n  .item,\n  .sub-trigger {\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .item-indicator {\n    @apply ml-auto flex h-4 w-4 shrink-0 items-center justify-center;\n    color: var(--item-indicator-color);\n  }\n\n  .sub-trigger {\n    @apply flex min-w-0 items-center gap-2;\n    padding: var(--padding);\n    border-radius: var(--inner-radius);\n    color: var(--item-foreground);\n    cursor: default;\n    user-select: none;\n    outline: none;\n    &[data-highlighted] {\n      background-color: var(--item-highlighted-background);\n    }\n\n    &[data-state=\"open\"]:not([data-highlighted]) {\n      background-color: var(--item-highlighted-background);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      pointer-events: none;\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply ml-auto h-4 w-4 shrink-0;\n  }\n\n  .sub-content {\n    @apply absolute min-w-40 max-w-80 overflow-hidden;\n    z-index: 50000;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n\n    &[data-state=\"open\"] {\n      animation: var(--menu-animation, slide-in-from-top 0.15s var(--ease-snappy-pop));\n    }\n\n    &[data-state=\"closed\"] {\n      animation: var(--menu-animation, slide-out-to-top 0.15s var(--ease-snappy-pop));\n    }\n  }\n\n  .label {\n    padding: var(--padding);\n    color: var(--label-foreground);\n\n    &[data-inset] {\n      padding-left: calc(var(--padding) * 2.67);\n    }\n  }\n\n  .separator {\n    @apply -mx-1 my-1 h-px;\n    background-color: var(--separator-background);\n  }\n\n  .shortcut {\n    margin-left: auto;\n    color: var(--shortcut-foreground);\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-to-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n}\n",
    "cssTypes": "declare const styles: {\n  trigger: string\n  content: string\n  list: string\n  item: string\n  'checkbox-item': string\n  'radio-item': string\n  'item-indicator': string\n  'sub-trigger': string\n  'sub-trigger-chevron': string\n  'sub-content': string\n  label: string\n  separator: string\n  shortcut: string\n}\n\nexport default styles\n"
  },
  "modal": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useDialog } from \"react-aria\";\nimport { useOverlayTriggerState } from \"react-stately\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { asElementProps } from \"@/lib/react-aria\";\nimport { X } from \"lucide-react\";\nimport css from \"./Modal.module.css\";\n\nconst useModalKeyboard = (\n  ref: React.RefObject<HTMLDivElement | null>,\n  isOpen: boolean,\n  isDismissable: boolean,\n  isKeyboardDismissDisabled: boolean,\n  onClose: () => void\n) => {\n  const onCloseRef = React.useRef(onClose);\n  onCloseRef.current = onClose;\n\n  React.useEffect(() => {\n    if (!isOpen || !ref.current) return;\n\n    ref.current.focus();\n\n    const handleKeyDown = (e: KeyboardEvent) => {\n      if (e.key === \"Escape\" && isDismissable && !isKeyboardDismissDisabled) {\n        e.preventDefault();\n        onCloseRef.current();\n      }\n    };\n\n    ref.current.addEventListener(\"keydown\", handleKeyDown);\n    return () => ref.current?.removeEventListener(\"keydown\", handleKeyDown);\n  }, [isOpen, isDismissable, isKeyboardDismissDisabled]);\n};\n\ninterface ModalStyleSlots {\n  root?: StyleValue;\n  overlay?: StyleValue;\n  backdrop?: StyleValue;\n  header?: StyleValue;\n  title?: StyleValue;\n  spacer?: StyleValue;\n  close?: StyleValue;\n  closeIcon?: StyleValue;\n  content?: StyleValue;\n  footer?: StyleValue;\n}\n\ntype ModalStylesProp = StylesProp<ModalStyleSlots>;\n\nconst resolveModalBaseStyles = createStylesResolver([\n  'root', 'overlay', 'backdrop', 'header', 'title', 'spacer', 'close', 'closeIcon', 'content', 'footer'\n] as const);\n\nexport interface ModalProps {\n  /** Whether the modal is open */\n  isOpen?: boolean;\n  /** Callback when the open state changes */\n  onOpenChange?: (isOpen: boolean) => void;\n  /** Optional title rendered in the modal header bar */\n  title?: React.ReactNode;\n  /** Modal body content */\n  children: React.ReactNode;\n  /** Optional footer content rendered below the body */\n  footer?: React.ReactNode;\n  /** Whether to show the X close button in the header */\n  close?: boolean;\n  /** Controls modal width: \"fit\" adapts to content, \"auto\" uses default width */\n  size?: \"fit\" | \"auto\";\n  /** Whether clicking the backdrop dismisses the modal */\n  isDismissable?: boolean;\n  /** Prevents the Escape key from dismissing the modal */\n  isKeyboardDismissDisabled?: boolean;\n  /** Additional class for the modal panel */\n  className?: string;\n  /** Additional class for the inner content area */\n  contentClassName?: string;\n  /** Additional class for the backdrop overlay */\n  overlayClassName?: string;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: ModalStylesProp;\n}\n\nconst sizeClasses: Record<string, string> = {\n  fit: (css as any)[\"size-fit\"],\n  auto: (css as any)[\"size-auto\"],\n};\n\n/**\n * Modal component that displays content in a centered dialog with a backdrop overlay.\n * Built with React Aria for full accessibility support including focus management,\n * keyboard handling, and screen reader announcements.\n */\nconst ModalBase = React.forwardRef<HTMLDivElement, ModalProps>(\n  (\n    {\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      title,\n      children,\n      footer,\n      close = true,\n      size = \"auto\",\n      isDismissable = true,\n      isKeyboardDismissDisabled = false,\n      className,\n      contentClassName,\n      overlayClassName,\n      styles,\n    },\n    ref\n  ) => {\n    const modalRef = React.useRef<HTMLDivElement>(null);\n    const [mounted, setMounted] = React.useState(false);\n\n    const resolved = resolveModalBaseStyles(styles);\n\n    // Use uncontrolled state management via useOverlayTriggerState\n    const state = useOverlayTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange: onOpenChange,\n    });\n\n    // Handle mount to prevent hydration issues\n    React.useEffect(() => {\n      setMounted(true);\n    }, []);\n\n    // Use forwardRef callback to expose modalRef\n    React.useImperativeHandle(ref, () => modalRef.current as HTMLDivElement);\n\n    // Handle keyboard events and auto-focus\n    useModalKeyboard(\n      modalRef,\n      state.isOpen,\n      isDismissable,\n      isKeyboardDismissDisabled,\n      () => state.close()\n    );\n\n    // useDialog hook provides accessibility attributes and title handling\n    const { dialogProps, titleProps } = useDialog({}, modalRef);\n\n    if (!mounted || !state.isOpen) return null;\n\n    const handleClose = () => state.close();\n\n    return createPortal(\n      <div\n        className={cn(\n          \"modal\",\n          \"fixed inset-0 z-9999 flex items-center justify-center\",\n          css.overlay,\n          overlayClassName,\n          resolved.overlay\n        )}\n      >\n        {/* Backdrop overlay - click outside to dismiss */}\n        <div\n          className={cn(\"backdrop\", css.backdrop, resolved.backdrop)}\n          onMouseDown={() => { if (isDismissable) state.close(); }}\n        />\n\n        {/* Modal content */}\n        <div\n          {...asElementProps<\"div\">(dialogProps)}\n          aria-modal=\"true\"\n          ref={modalRef}\n          className={cn(\n            css.modal,\n            sizeClasses[size],\n            className,\n            resolved.root\n          )}\n          onClick={(e) => e.stopPropagation()}\n          tabIndex={-1}\n          data-open={state.isOpen || undefined}\n        >\n          {/* Header */}\n          {(title || close) && (\n            <div className={cn(css.header, resolved.header)}>\n              {title && (\n                <h4 {...asElementProps<\"h4\">(titleProps)} className={cn(css.title, resolved.title)}>\n                  {title}\n                </h4>\n              )}\n              {!title && close && <div className={cn(css.spacer, resolved.spacer)} />}\n              {close && (\n                <button\n                  onClick={handleClose}\n                  className={cn(css.close, resolved.close)}\n                  aria-label=\"Close modal\"\n                >\n                  <X className={cn(css.closeIcon, resolved.closeIcon)} />\n                </button>\n              )}\n            </div>\n          )}\n\n          {/* Body */}\n          <div className={cn(css.content, contentClassName, resolved.content)}>\n            {children}\n          </div>\n\n          {/* Footer */}\n          {footer && (\n            <div className={cn(css.footer, resolved.footer)}>\n              {footer}\n            </div>\n          )}\n        </div>\n      </div>,\n      document.body\n    );\n  }\n);\n\nModalBase.displayName = \"Modal\";\n\n/**\n * ModalHeader component for use with compound Modal pattern\n */\nconst ModalHeader = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={css.header} {...props}>\n    {children}\n  </div>\n));\n\nModalHeader.displayName = \"Modal.Header\";\n\n/**\n * ModalBody component for use with compound Modal pattern\n */\nconst ModalBody = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={css.content} {...props}>\n    {children}\n  </div>\n));\n\nModalBody.displayName = \"Modal.Body\";\n\n/**\n * ModalFooter component for use with compound Modal pattern\n */\nconst ModalFooter = React.forwardRef<\n  HTMLDivElement,\n  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }\n>(({ children, ...props }, ref) => (\n  <div ref={ref} className={cn('footer', css.footer)} {...props}>\n    {children}\n  </div>\n));\n\nModalFooter.displayName = \"Modal.Footer\";\n\nconst Modal = Object.assign(ModalBase, {\n  Header: ModalHeader,\n  Body: ModalBody,\n  Footer: ModalFooter,\n});\n\nexport { Modal, ModalHeader, ModalBody, ModalFooter };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .overlay {\n    --disabled-opacity: 0.5;\n  }\n\n  .backdrop {\n    @apply absolute inset-0 cursor-pointer;\n    background-color: var(--backdrop-background);\n    backdrop-filter: blur(4px);\n  }\n\n  .modal:focus-visible {\n    outline: 2px solid var(--modal-focus-ring);\n    outline-offset: 2px;\n  }\n\n  .modal {\n    @apply relative flex w-full flex-col overflow-hidden;\n    z-index: 1;\n    max-height: 90vh;\n    margin: 1rem;\n    background-color: var(--modal-background);\n    border: var(--border-width-base) solid var(--modal-border);\n    border-radius: var(--radius-sm);\n    pointer-events: auto;\n    overflow: hidden;\n  }\n\n  .header {\n    @apply flex shrink-0 items-center justify-between gap-2 px-6 py-4;\n    border-bottom: var(--border-width-base) solid var(--modal-border);\n  }\n\n  .title {\n    @apply m-0;\n    font-size: 1.125rem;\n    font-weight: var(--font-weight-semibold);\n    color: var(--modal-title-color);\n  }\n\n  .spacer {\n    flex: 1;\n  }\n\n  .close {\n    @apply ml-auto flex items-center justify-center cursor-pointer;\n    background: none;\n    border: none;\n    color: var(--modal-close-color);\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .close:hover {\n    color: var(--modal-close-hover);\n  }\n\n  .close:active {\n    transform: scale(0.92);\n  }\n\n  .close:focus {\n    outline: 2px solid var(--modal-close-hover);\n    outline-offset: 2px;\n    border-radius: 0.25rem;\n  }\n\n  .closeIcon {\n    @apply h-5 w-5;\n  }\n\n  .content {\n    flex: 1;\n    min-height: 0;\n    overflow-y: auto;\n    color: var(--modal-text-color);\n  }\n\n  .content::-webkit-scrollbar {\n    width: 6px;\n  }\n\n  .content::-webkit-scrollbar-track {\n    background: transparent;\n  }\n\n  .content::-webkit-scrollbar-thumb {\n    background: var(--modal-border);\n    border-radius: 3px;\n    transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  .content::-webkit-scrollbar-thumb:hover {\n    background: var(--modal-close-color);\n  }\n\n  .footer {\n    @apply flex shrink-0 items-center justify-between gap-4 px-6 py-4;\n    background-color: var(--footer-background);\n    border-top: var(--border-width-base) solid var(--modal-border);\n  }\n\n  /* Size variants */\n  .size-fit {\n    width: fit-content;\n  }\n\n  .size-auto {\n    max-width: min(90vw, 28rem);\n  }\n\n  /* Media queries for smaller screens */\n  @media (max-width: 640px) {\n    .modal {\n      margin: 1rem;\n    }\n\n    .content {\n      max-height: calc(100vh - 10rem);\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  overlay: string;\n  backdrop: string;\n  modal: string;\n  header: string;\n  title: string;\n  spacer: string;\n  close: string;\n  closeIcon: string;\n  content: string;\n  footer: string;\n  \"size-sm\": string;\n  \"size-md\": string;\n  \"size-lg\": string;\n  \"size-xl\": string;\n};\n\nexport default styles;\n"
  },
  "page": {
    "tsx": "\"use client\"\n\nimport * as React from 'react';\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from '@/lib/styles';\nimport { PageContext } from './page.context';\nimport { PageProps, PageContextValue, PagePadding } from './page.types';\nimport css from './Page.module.css';\n\ninterface PageStyleSlots {\n  root?: StyleValue;\n}\n\ntype PageStylesProp = StylesProp<PageStyleSlots>;\n\nconst resolvePageBaseStyles = createStylesResolver(['root'] as const);\n\ninterface PageRootProps extends PageProps {\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: PageStylesProp;\n}\n\nconst paddingMap: Record<PagePadding, string> = {\n  none: css['padding-none'],\n  sm: css['padding-sm'],\n  md: css['padding-md'],\n  lg: css['padding-lg'],\n  xl: css['padding-xl'],\n};\n\nconst PageRoot = React.forwardRef<HTMLDivElement, PageRootProps>(\n  (\n    {\n      maxWidth = '1400px',\n      padding = 'md',\n      centered = true,\n      fullscreen = false,\n      className,\n      children,\n      styles: stylesProp, // Renamed to avoid conflict with the module import\n      ...props\n    },\n    ref\n  ) => {\n    const [isMobile, setIsMobile] = React.useState(false);\n\n    React.useEffect(() => {\n      const mediaQuery = window.matchMedia('(max-width: 768px)');\n      setIsMobile(mediaQuery.matches);\n\n      const handleChange = (e: MediaQueryListEvent) => {\n        setIsMobile(e.matches);\n      };\n\n      mediaQuery.addEventListener('change', handleChange);\n      return () => mediaQuery.removeEventListener('change', handleChange);\n    }, []);\n\n    const contextValue: PageContextValue = {\n      pageWidth: fullscreen ? undefined : maxWidth,\n      isMobile,\n      pageMaxWidth: fullscreen ? undefined : maxWidth,\n      pagePadding: padding,\n    };\n\n    const paddingClass = paddingMap[padding];\n    const { root: resolvedRoot } = resolvePageBaseStyles(stylesProp);\n\n    return (\n      <PageContext.Provider value={contextValue}>\n        <div\n          ref={ref}\n          role=\"main\"\n          className={cn(css.page, paddingClass, className, resolvedRoot)}\n          data-centered={centered}\n          data-fullscreen={fullscreen}\n          style={\n            {\n              maxWidth: !fullscreen ? maxWidth : undefined,\n              ...props.style,\n            } as React.CSSProperties\n          }\n          {...props}\n        >\n          {children}\n        </div>\n      </PageContext.Provider>\n    );\n  }\n);\n\nPageRoot.displayName = 'Page';\n\nexport const Page = PageRoot;\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .page {\n    @apply flex flex-col w-full relative;\n  }\n\n  .page[data-centered=\"true\"] {\n    @apply items-center;\n  }\n\n  .page[data-fullscreen=\"false\"] {\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  .padding-none { padding: 0; }\n\n  .padding-sm { padding: var(--spacing-sm, 0.5rem); }\n\n  .padding-md { padding: var(--spacing-md, 1rem); }\n\n  .padding-lg { padding: var(--spacing-lg, 1.5rem); }\n\n  .padding-xl { padding: var(--spacing-xl, 2rem); }\n}\n",
    "cssTypes": "export interface Styles {\n  \"page\": string;\n  \"padding-none\": string;\n  \"padding-sm\": string;\n  \"padding-md\": string;\n  \"padding-lg\": string;\n  \"padding-xl\": string;\n}\n\nexport default styles;\n"
  },
  "panel": {
    "tsx": "'use client'\n\nimport React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'\nimport {\n  PanelProps,\n  PanelHeaderProps,\n  PanelContentProps,\n  PanelFooterProps,\n  PanelSidebarProps,\n  PanelToggleProps,\n  PanelGroupProps,\n  PanelResizeProps,\n  PanelGroupContextValue,\n  PanelStylesProp, // Added\n} from './panel.types'\nimport { PanelContext, PanelGroupContext } from './panel.context'\nimport { StyleValue, cn } from '../../lib/utils' // Added/Modified\nimport { createStylesResolver } from '../../lib/styles' // Added\nimport styles from './Panel.module.css'\n\nconst resolvePanelBaseStyles = createStylesResolver(['root'] as const) // Added\n\n/** Flexible multi-panel layout with header, content, footer, and sidebar */\nconst PanelRoot = React.forwardRef<HTMLDivElement, PanelProps>(\n  ({ spacing = 'md', variant = 'default', className, children, styles: stylesProp, ...props }, ref) => { // Modified: added `styles: stylesProp`\n    const [isStacked, setIsStacked] = useState(false)\n    const [sidebarOpen, setSidebarOpen] = useState(true)\n    const containerRef = useRef<HTMLDivElement>(null)\n\n    useEffect(() => {\n      const container = containerRef.current || (ref && 'current' in ref ? ref.current : null)\n      if (!container) return\n\n      // Initial check\n      const checkViewport = () => {\n        setIsStacked(window.innerWidth < 768)\n      }\n\n      checkViewport()\n\n      // Setup ResizeObserver to detect viewport changes\n      const observer = new ResizeObserver(() => {\n        checkViewport()\n      })\n\n      observer.observe(document.documentElement)\n\n      // Also listen to window resize as fallback\n      window.addEventListener('resize', checkViewport)\n\n      return () => {\n        observer.disconnect()\n        window.removeEventListener('resize', checkViewport)\n      }\n    }, [ref])\n\n    const contextValue = useMemo(\n      () => ({\n        spacing,\n        isStacked,\n        variant,\n        sidebarOpen,\n        toggleSidebar: () => setSidebarOpen((prev) => !prev),\n      }),\n      [spacing, isStacked, variant, sidebarOpen]\n    )\n\n    const spacingClass =\n      {\n        none: styles.spacingNone,\n        sm: styles.spacingSm,\n        md: styles.spacingMd,\n        lg: styles.spacingLg,\n      }[spacing] || styles.spacingMd\n\n    const variantClass = variant === 'compact' ? styles.compact : ''\n    const stackedClass = isStacked ? styles.stacked : ''\n\n    const panelRef = ref && 'current' in ref ? ref : containerRef\n\n    // Modified: use the new style resolver\n    const resolvedStyles = resolvePanelBaseStyles(stylesProp)\n\n    return (\n      <div\n        ref={panelRef}\n        className={cn(styles.panel, spacingClass, variantClass, stackedClass, className, resolvedStyles.root)} // Modified\n        data-spacing={spacing}\n        data-variant={variant}\n        data-stacked={isStacked}\n        {...props}\n      >\n        <PanelContext.Provider value={contextValue}>{children}</PanelContext.Provider>\n      </div>\n    )\n  }\n)\n\nPanelRoot.displayName = 'Panel'\n\n/** Top bar of the panel, typically for a title and actions */\nconst PanelHeader = React.forwardRef<HTMLElement, PanelHeaderProps>(\n  ({ sticky = true, className, ...props }, ref) => {\n    const stickyClass = sticky ? styles.sticky : ''\n\n    return (\n      <header ref={ref} className={`${styles.header} ${stickyClass} ${className || ''}`} {...props} />\n    )\n  }\n)\n\nPanelHeader.displayName = 'Panel.Header'\n\n/** Main scrollable body area of the panel */\nconst PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(\n  ({ className, ...props }, ref) => {\n    return <div ref={ref} role=\"main\" className={`${styles.content} ${className || ''}`} {...props} />\n  }\n)\n\nPanelContent.displayName = 'Panel.Content'\n\n/** Bottom bar of the panel, typically for controls or status */\nconst PanelFooter = React.forwardRef<HTMLElement, PanelFooterProps>(\n  ({ fixed = false, className, ...props }, ref) => {\n    const fixedClass = fixed ? styles.fixed : ''\n\n    return (\n      <footer ref={ref} className={`${styles.footer} ${fixedClass} ${className || ''}`} {...props} />\n    )\n  }\n)\n\nPanelFooter.displayName = 'Panel.Footer'\n\n/** Collapsible side panel that slides in from left or right */\nconst PanelSidebar = React.forwardRef<HTMLElement, PanelSidebarProps>(\n  ({ side = 'left', defaultOpen = true, width = '240px', collapsedWidth = '0', className, ...props }, ref) => {\n    const { sidebarOpen } = usePanelContext()\n    const isOpen = defaultOpen && sidebarOpen\n\n    const sidebarStyle: React.CSSProperties = {\n      width: isOpen ? width : collapsedWidth,\n      transition: 'width 0.2s ease',\n      overflow: 'hidden',\n      flexShrink: 0,\n      [side === 'right' ? 'marginLeft' : 'marginRight']: 'auto',\n    }\n\n    return (\n      <aside\n        ref={ref}\n        className={`${styles['sidebar']} ${className || ''}`}\n        data-open={isOpen}\n        data-side={side}\n        style={sidebarStyle}\n        {...props}\n      />\n    )\n  }\n)\n\nPanelSidebar.displayName = 'Panel.Sidebar'\n\n/** Button that shows/hides the Panel.Sidebar */\nconst PanelToggle = React.forwardRef<HTMLDivElement, PanelToggleProps>(\n  ({ children, ...props }, ref) => {\n    const { toggleSidebar } = usePanelContext()\n\n    const handleClick = () => {\n      toggleSidebar()\n    }\n\n    const clonedChild = React.cloneElement(children as React.ReactElement<any>, {\n      onClick: (e: React.MouseEvent) => {\n        handleClick()\n        ;(children as any).props?.onClick?.(e)\n      },\n    })\n\n    return (\n      <div ref={ref} className={styles['toggle']} {...props}>\n        {clonedChild}\n      </div>\n    )\n  }\n)\n\nPanelToggle.displayName = 'Panel.Toggle'\n\n/** Container that manages side-by-side resizable panel columns */\nconst PanelGroup = React.forwardRef<HTMLDivElement, PanelGroupProps>(\n  ({ direction = 'horizontal', className, children, ...props }, ref) => {\n    const containerRef = useRef<HTMLDivElement>(null)\n    const [sizes, setSizes] = useState<number[]>([])\n    const resizeIndexRef = useRef(0)\n\n    // Extract panel children (skip Resize handles)\n    const panelChildren = React.Children.toArray(children).filter(\n      (child) =>\n        React.isValidElement(child) &&\n        child.type !== PanelResize &&\n        (child.props as any).children !== undefined\n    )\n\n    const panelCount = panelChildren.length\n\n    useEffect(() => {\n      // Initialize sizes as equal percentages\n      if (panelCount > 0) {\n        setSizes(Array(panelCount).fill(100 / panelCount))\n      }\n    }, [panelCount])\n\n    const handleSetSize = useCallback(\n      (resizeIndex: number, delta: number) => {\n        setSizes((prev) => {\n          if (prev.length === 0) return prev\n          const newSizes = [...prev]\n          const containerSize =\n            direction === 'horizontal'\n              ? containerRef.current?.clientWidth || 1\n              : containerRef.current?.clientHeight || 1\n\n          const deltaPercent = (delta / containerSize) * 100\n          const minSize = 10\n\n          if (resizeIndex + 1 < newSizes.length) {\n            // For paired panels: maintain total, apply min/max constraints\n            const totalSize = newSizes[resizeIndex] + newSizes[resizeIndex + 1]\n            const maxSize = totalSize - minSize\n\n            let newSizeA = Math.max(minSize, Math.min(maxSize, newSizes[resizeIndex] + deltaPercent))\n            let newSizeB = totalSize - newSizeA\n\n            newSizes[resizeIndex] = newSizeA\n            newSizes[resizeIndex + 1] = Math.max(minSize, newSizeB)\n          } else {\n            // Single panel, just apply min constraint\n            newSizes[resizeIndex] = Math.max(minSize, newSizes[resizeIndex] + deltaPercent)\n          }\n\n          return newSizes\n        })\n      },\n      [direction]\n    )\n\n    const contextValue = useMemo(\n      () => ({\n        sizes,\n        setSize: handleSetSize,\n        direction,\n        containerRef: containerRef as React.RefObject<HTMLDivElement>,\n      }),\n      [sizes, direction, handleSetSize]\n    )\n\n    const groupRef = ref && 'current' in ref ? ref : containerRef\n\n    // Render children, injecting sizes into panels and tracking resize indices\n    let panelIndex = 0\n    let resizeIndex = 0\n    const renderedChildren = React.Children.map(children, (child) => {\n      if (!React.isValidElement(child)) return child\n\n      if (child.type === PanelResize) {\n        const currentResizeIndex = resizeIndex\n        resizeIndex++\n        return React.cloneElement(child as React.ReactElement<any>, {\n          'data-resize-index': currentResizeIndex,\n        })\n      }\n\n      if (child.type !== PanelResize && (child.props as any).children !== undefined) {\n        const currentPanelIndex = panelIndex\n        const size = sizes[currentPanelIndex] ?? 100 / panelCount\n        panelIndex++\n\n        const style: React.CSSProperties = {\n          ...((child.props as any).style || {}),\n          flex: `0 0 ${size}%`,\n          overflow: 'hidden',\n        }\n\n        return React.cloneElement(child as React.ReactElement<any>, {\n          style,\n        })\n      }\n\n      return child\n    })\n\n    return (\n      <div\n        ref={groupRef}\n        className={`${styles['group']} ${className || ''}`}\n        data-direction={direction}\n        {...props}\n      >\n        <PanelGroupContext.Provider value={contextValue}>{renderedChildren}</PanelGroupContext.Provider>\n      </div>\n    )\n  }\n)\n\nPanelGroup.displayName = 'Panel.Group'\n\n/** Drag handle between Panel.Group columns for resizing */\nconst PanelResize = React.forwardRef<HTMLDivElement, PanelResizeProps & { 'data-resize-index'?: number }>(\n  ({ className, 'data-resize-index': resizeIndexProp, ...props }, ref) => {\n    const { direction, setSize } = usePanelGroupContext()\n    const [isDragging, setIsDragging] = useState(false)\n    const startPosRef = useRef(0)\n    const resizeIndexRef = useRef(resizeIndexProp ?? 0)\n\n    // Update index if it changes\n    useEffect(() => {\n      resizeIndexRef.current = resizeIndexProp ?? 0\n    }, [resizeIndexProp])\n\n    const handleMouseDown = (e: React.MouseEvent) => {\n      e.preventDefault()\n      setIsDragging(true)\n      startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY\n\n      const handleMouseMove = (moveEvent: MouseEvent) => {\n        const currentPos = direction === 'horizontal' ? moveEvent.clientX : moveEvent.clientY\n        const delta = currentPos - startPosRef.current\n        setSize(resizeIndexRef.current, delta)\n        startPosRef.current = currentPos\n      }\n\n      const handleMouseUp = () => {\n        setIsDragging(false)\n        document.removeEventListener('mousemove', handleMouseMove)\n        document.removeEventListener('mouseup', handleMouseUp)\n      }\n\n      document.addEventListener('mousemove', handleMouseMove)\n      document.addEventListener('mouseup', handleMouseUp)\n    }\n\n    return (\n      <div\n        ref={ref}\n        className={`${styles['resize']} ${className || ''}`}\n        data-resizing={isDragging}\n        data-direction={direction}\n        onMouseDown={handleMouseDown}\n        {...props}\n      />\n    )\n  }\n)\n\nPanelResize.displayName = 'Panel.Resize'\n\n// Helper function for internal use\nfunction usePanelContext() {\n  const context = React.useContext(PanelContext)\n  if (!context) {\n    throw new Error('usePanelContext must be used within a Panel component')\n  }\n  return context\n}\n\nfunction usePanelGroupContext() {\n  const context = React.useContext(PanelGroupContext)\n  if (!context) {\n    throw new Error('usePanelGroupContext must be used within a Panel.Group component')\n  }\n  return context\n}\n\nexport const Panel = Object.assign(PanelRoot, {\n  Header: PanelHeader,\n  Content: PanelContent,\n  Footer: PanelFooter,\n  Sidebar: PanelSidebar,\n  Toggle: PanelToggle,\n  Group: PanelGroup,\n  Resize: PanelResize,\n})\n\nexport {\n  PanelContext,\n  PanelGroupContext,\n}\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .panel {\n    @apply flex h-full w-full min-h-0 min-w-0 flex-row;\n    background: inherit;\n  }\n\n  .panel[data-stacked=\"true\"] { flex-direction: column; }\n\n  .header,\n  .footer {\n    @apply shrink-0;\n    background: inherit;\n  }\n\n  .sticky {\n    position: sticky;\n    top: 0;\n    z-index: 10;\n  }\n\n  .content {\n    @apply flex min-h-0 min-w-0;\n    flex: 1;\n    overflow: auto;\n  }\n\n  .fixed {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    z-index: 5;\n  }\n\n  /* Sidebar */\n  .sidebar {\n    @apply shrink-0 overflow-hidden;\n    overflow: hidden;\n    transition: width 0.2s ease;\n    border-right: var(--border-width-base) solid var(--background-700);\n  }\n\n  .sidebar[data-side=\"right\"] {\n    border-right: none;\n    border-left: var(--border-width-base) solid var(--background-700);\n  }\n\n  /* Toggle */\n  .toggle {\n    @apply flex items-center;\n  }\n\n  /* Group */\n  .group {\n    @apply flex w-full h-full;\n    background: inherit;\n  }\n\n  .group[data-direction=\"vertical\"] { flex-direction: column; }\n\n  /* Resize handle */\n  .resize {\n    @apply relative shrink-0;\n    cursor: col-resize;\n    background: transparent;\n    width: 10px;\n  }\n\n  .resize::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 50%;\n    width: 1px;\n    background: var(--background-700, #374151);\n    transform: translateX(-50%);\n    transition: width 0.15s ease;\n  }\n\n  .resize[data-direction=\"vertical\"] {\n    cursor: row-resize;\n    height: 10px;\n  }\n\n  .resize[data-direction=\"vertical\"]::before {\n    top: 50%;\n    bottom: auto;\n    left: 0;\n    right: 0;\n    width: auto;\n    height: 1px;\n    transform: translateY(-50%);\n  }\n\n  .resize:hover::before,\n  .resize[data-resizing=\"true\"]::before { width: 2px; }\n\n  .resize[data-direction=\"vertical\"]:hover::before,\n  .resize[data-direction=\"vertical\"][data-resizing=\"true\"]::before {\n    width: auto;\n    height: 2px;\n  }\n\n  /* Spacing variants */\n  .spacingNone,\n  .spacing-none { gap: 0; }\n\n  .spacingSm,\n  .spacing-sm { gap: var(--spacing-sm, 0.5rem); }\n\n  .spacingMd,\n  .spacing-md { gap: var(--spacing-md, 1rem); }\n\n  .spacingLg,\n  .spacing-lg { gap: var(--spacing-lg, 1.5rem); }\n\n  /* Compact variant */\n  .compact {\n    gap: calc(var(--spacing-sm, 0.5rem) / 2);\n  }\n\n  /* Responsive stacking (mobile) */\n  @media (max-width: 767px) {\n    .stacked { flex-direction: column; }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly panel: string;\n  readonly header: string;\n  readonly sticky: string;\n  readonly content: string;\n  readonly footer: string;\n  readonly fixed: string;\n  readonly sidebar: string;\n  readonly toggle: string;\n  readonly group: string;\n  readonly resize: string;\n  readonly spacingNone: string;\n  readonly spacingSm: string;\n  readonly spacingMd: string;\n  readonly spacingLg: string;\n  readonly compact: string;\n  readonly stacked: string;\n};\n\nexport default styles;\n"
  },
  "path": {
    "tsx": "'use client';\n\nimport React, { ReactNode, forwardRef } from 'react';\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from '@/lib/styles';\nimport css from \"./Path.module.css\";\n\nexport interface PathItemProps {\n  /** URL this path item links to */\n  href?: string;\n  /** Called when the path item is pressed */\n  onPress?: () => void;\n  children: ReactNode;\n  /** Whether this is the current/active page */\n  isCurrent?: boolean;\n  /** Whether the item is non-interactive */\n  isDisabled?: boolean;\n  /** Additional CSS class names */\n  className?: string;\n}\n\ninterface PathStyleSlots {\n  root?: StyleValue;\n  list?: StyleValue;\n  separator?: StyleValue;\n}\n\ntype PathStylesProp = StylesProp<PathStyleSlots>;\n\nexport interface PathProps {\n  children: ReactNode;\n  /** Additional CSS class for the path container */\n  className?: string;\n  /** Custom separator element between path items */\n  separator?: ReactNode;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: PathStylesProp;\n}\n\nconst resolvePathBaseStyles = createStylesResolver(['root', 'list', 'separator'] as const);\n\nconst PathItem = forwardRef<HTMLLIElement, PathItemProps>(\n  ({ href, onPress, children, isCurrent = false, isDisabled = false, className }, ref) => {\n    const isInteractive = !isCurrent && !isDisabled && (href || onPress);\n\n    return (\n      <li ref={ref} className={css['path-item']}>\n        {isInteractive ? (\n          <a\n            href={href}\n            className={cn(css['path-item-link'], className || '')}\n            data-disabled={isDisabled || undefined}\n            data-current={isCurrent || undefined}\n            aria-current={isCurrent ? 'page' : undefined}\n            onClick={(e) => {\n              if (onPress) {\n                e.preventDefault();\n                onPress();\n              }\n            }}\n          >\n            {children}\n          </a>\n        ) : (\n          <span\n            className={`${css['path-item-link']} ${className || ''}`}\n            data-disabled={isDisabled || undefined}\n            data-current={isCurrent || undefined}\n            aria-current={isCurrent ? 'page' : undefined}\n          >\n            {children}\n          </span>\n        )}\n      </li>\n    );\n  }\n);\n\nPathItem.displayName = 'Path.Item';\n\nconst Path = forwardRef<HTMLElement, PathProps>(\n  ({ children, className, separator, styles }, ref) => {\n    const childArray = React.Children.toArray(children);\n    const childCount = childArray.length;\n\n    const resolved = resolvePathBaseStyles(styles);\n\n    return (\n      <nav\n        ref={ref}\n        className={cn(css.path, className, resolved.root)}\n        aria-label=\"Path\"\n      >\n        <ol className={cn(\n          css['path-list'],\n          resolved.list,\n          separator && css['with-custom-separator']\n        )}>\n          {React.Children.map(childArray, (child, index) => {\n            const isLastChild = index === childCount - 1;\n            if (React.isValidElement(child)) {\n              const element = React.cloneElement(child as React.ReactElement<PathItemProps>, {\n                isCurrent: isLastChild,\n              });\n\n              // Add separator after each item except the last\n              if (separator && !isLastChild) {\n                return (\n                  <React.Fragment key={index}>\n                    {element}\n                    <li className={cn(css.separator, resolved.separator)} aria-hidden=\"true\">\n                      {separator}\n                    </li>\n                  </React.Fragment>\n                );\n              }\n              return element;\n            }\n            return child;\n          })}\n        </ol>\n      </nav>\n    );\n  }\n);\n\nPath.displayName = 'Path';\n\nexport { Path, PathItem };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .path {\n    --foreground: var(--foreground-primary);\n    --foreground-muted: var(--foreground-secondary);\n    --separator-color: var(--border-secondary);\n    --focus-ring-color: var(--accent-500);\n    --disabled-opacity: 0.6;\n\n    @apply block;\n  }\n\n  .path-list {\n    list-style: none;\n    @apply m-0 flex flex-wrap items-center gap-2 p-0;\n    flex-wrap: wrap;\n  }\n\n  .path-list.with-custom-separator .path-item:not(:last-child)::after {\n    content: none;\n  }\n\n  .path-item {\n    @apply m-0 flex items-center gap-2 p-0;\n  }\n\n  /* Separator after each item except the last */\n  .path-item:not(:last-child)::after {\n    content: '/';\n    color: var(--separator-color);\n    margin-left: 0.5rem;\n    user-select: none;\n    pointer-events: none;\n  }\n\n  /* Custom separator element */\n  .separator {\n    list-style: none;\n    @apply m-0 flex items-center p-0;\n    color: var(--separator-color);\n    user-select: none;\n    pointer-events: none;\n  }\n\n  .path-item-link {\n    @apply relative cursor-pointer rounded-sm px-2 py-1;\n    color: var(--foreground);\n    text-decoration: none;\n    font-size: var(--text-sm);\n    font-weight: var(--font-weight-medium);\n    line-height: 1.5;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n\n    &:hover:not([data-disabled='true']) {\n      background-color: var(--background-hover, rgba(0, 0, 0, 0.04));\n      color: var(--accent-600);\n    }\n\n    &:active:not([data-disabled='true']) {\n      background-color: var(--background-active, rgba(0, 0, 0, 0.08));\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--focus-ring-color);\n      outline-offset: 2px;\n    }\n\n    &[data-current='true'] {\n      color: var(--foreground-muted);\n      cursor: default;\n      font-weight: var(--font-weight-medium);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n\n    &[data-disabled='true'] {\n      color: var(--foreground-muted);\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n\n      &:hover {\n        background-color: transparent;\n      }\n    }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  \"path\": string;\n  \"path-list\": string;\n  \"with-custom-separator\": string;\n  \"path-item\": string;\n  \"separator\": string;\n  \"path-item-link\": string;\n}\n\nexport default styles;\n"
  },
  "popover": {
    "tsx": "\"use client\"\n\nimport React from \"react\";\nimport { createPortal } from \"react-dom\";\nimport { useOverlayTrigger, useDialog, mergeProps } from \"react-aria\";\nimport { useOverlayTriggerState } from \"react-stately\";\nimport { useFloating } from \"../../hooks/useFloat/react/useFloating\";\nimport { flip } from \"../../hooks/useFloat/core/middleware/flip\";\nimport { offset } from \"../../hooks/useFloat/core/middleware/offset\";\nimport { shift } from \"../../hooks/useFloat/core/middleware/shift\";\nimport { autoUpdate } from \"../../hooks/useFloat/dom/autoUpdate\";\nimport { cn } from \"./utils\";\nimport { type StyleValue } from \"./utils\";\nimport { asElementProps } from \"@/lib/react-aria\";\nimport { Frame } from \"../Frame\";\nimport css from \"./Popover.module.css\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\n\nconst ARROW_PATH = \"M 0 0 L 6 -12 L 12 0\";\nconst ARROW_WIDTH = 12;\nconst POPOVER_GAP = 8;\nconst ARROW_POSITIONING_SIZE = 6;\n\ntype PopoverPosition = \"top\" | \"right\" | \"bottom\" | \"left\";\n\nconst getFrameSide = (position: PopoverPosition): \"top\" | \"right\" | \"bottom\" | \"left\" => {\n  switch (position) {\n    case \"top\":\n      return \"bottom\";\n    case \"bottom\":\n      return \"top\";\n    case \"left\":\n      return \"right\";\n    case \"right\":\n      return \"left\";\n  }\n};\n\n/**\n * Maps placement to initial transform for directional entrance animation.\n * When animating in, the component slides from its placement direction toward the center.\n * For example, \"top\" placement slides up (-Y) and fades in.\n */\nconst getInitialTransform = (placement: string): string => {\n  switch (placement) {\n    case \"top\":\n      return \"translateY(3px) scale(0.95)\";\n    case \"bottom\":\n      return \"translateY(-3px) scale(0.95)\";\n    case \"left\":\n      return \"translateX(3px) scale(0.95)\";\n    case \"right\":\n      return \"translateX(-3px) scale(0.95)\";\n    default:\n      return \"scale(0.95)\";\n  }\n};\n\ninterface PopoverStyleSlots {\n  root?: StyleValue;\n  content?: StyleValue;\n  trigger?: StyleValue;\n}\n\ntype PopoverStylesProp = StylesProp<PopoverStyleSlots>;\n\nexport interface PopoverProps {\n  children: React.ReactNode;\n  /** Content to display inside the popover panel */\n  content: React.ReactNode;\n  /** Preferred side of the trigger where the popover appears */\n  position?: PopoverPosition;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: PopoverStylesProp;\n  /** Additional CSS class for the trigger element. */\n  className?: string;\n  /** Controlled open state */\n  isOpen?: boolean;\n  /** Called when the popover opens or closes */\n  onOpenChange?: (isOpen: boolean) => void;\n  /** Whether to render a directional arrow pointing at the trigger */\n  showArrow?: boolean;\n}\n\nconst Popover = React.forwardRef<HTMLDivElement, PopoverProps>(\n  ({ children, content, position = \"bottom\", styles, className: externalClassName, isOpen: controlledIsOpen, onOpenChange, showArrow = false }, ref) => {\n\n    const resolvePopoverBaseStyles = createStylesResolver([\n      'root',\n      'content',\n      'trigger',\n    ] as const);\n\n    const resolved = resolvePopoverBaseStyles(styles);\n\n    const triggerRef = React.useRef<HTMLDivElement>(null);\n    const popoverContentRef = React.useRef<HTMLDivElement>(null);\n    const [isAnimating, setIsAnimating] = React.useState(false);\n    const [isExiting, setIsExiting] = React.useState(false);\n\n    const state = useOverlayTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange,\n    });\n\n    const { triggerProps, overlayProps } = useOverlayTrigger({ type: \"dialog\" }, state, triggerRef);\n    const { dialogProps } = useDialog({}, popoverContentRef);\n\n    const placementMap: Record<PopoverPosition, \"top\" | \"bottom\" | \"left\" | \"right\"> = {\n      top: \"top\",\n      bottom: \"bottom\",\n      left: \"left\",\n      right: \"right\",\n    };\n\n    const { refs, floatingStyles, placement } = useFloating({\n      placement: placementMap[position],\n      whileElementsMounted: autoUpdate,\n      middleware: [\n        offset(POPOVER_GAP + ARROW_POSITIONING_SIZE),\n        flip(),\n        shift({ padding: 8 }),\n      ],\n    });\n\n    const isPositioned = floatingStyles.transform !== undefined;\n\n    // Trigger animation when popover is opened and positioned\n    React.useEffect(() => {\n      if (state.isOpen && isPositioned) {\n        setIsExiting(false);\n        setIsAnimating(true);\n      }\n    }, [state.isOpen, isPositioned]);\n\n    // Handle exit animation when closing\n    React.useEffect(() => {\n      if (!state.isOpen && isAnimating) {\n        // First, enable exit mode so element stays in DOM\n        setIsExiting(true);\n\n        requestAnimationFrame(() => setIsAnimating(false));\n        const timer = setTimeout(() => setIsExiting(false), 50)\n        return () => clearTimeout(timer);\n      }\n    }, [state.isOpen, isAnimating]);\n\n    React.useLayoutEffect(() => {\n      refs.setReference(triggerRef.current);\n    }, [refs]);\n\n    React.useEffect(() => {\n      if (!state.isOpen) return;\n      const handleClickOutside = (e: MouseEvent) => {\n        const target = e.target as Node;\n        if (\n          triggerRef.current &&\n          !triggerRef.current.contains(target) &&\n          popoverContentRef.current &&\n          !popoverContentRef.current.contains(target)\n        ) {\n          state.close();\n        }\n      };\n      document.addEventListener(\"click\", handleClickOutside);\n      return () => document.removeEventListener(\"click\", handleClickOutside);\n    }, [state.isOpen, state]);\n\n    React.useEffect(() => {\n      if (!state.isOpen) return;\n      const handleKeyDown = (event: KeyboardEvent) => {\n        if (event.key === \"Escape\") state.close();\n      };\n      document.addEventListener(\"keydown\", handleKeyDown);\n      return () => document.removeEventListener(\"keydown\", handleKeyDown);\n    }, [state.isOpen, state]);\n\n    const mergedRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        (triggerRef as React.RefObject<HTMLDivElement | null>).current = el;\n        refs.setReference(el);\n        if (typeof ref === \"function\") ref(el);\n        else if (ref) ref.current = el;\n      },\n      [refs, ref]\n    );\n\n    const mergedContentRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        (popoverContentRef as React.RefObject<HTMLDivElement | null>).current = el;\n        refs.setFloating(el);\n      },\n      [refs]\n    );\n\n    // Convert React Aria's onPress to onClick for native HTML elements\n    const nativeProps = React.useMemo(() => {\n      const props: any = { ...triggerProps };\n      if (props.onPress && typeof props.onPress === 'function') {\n        const onPress = props.onPress;\n        props.onClick = (e: React.MouseEvent) => {\n          onPress({ target: e.currentTarget, type: 'press', pointerType: 'mouse', ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey });\n        };\n        delete props.onPress;\n      }\n      return props;\n    }, [triggerProps]);\n\n    const triggerElement = React.isValidElement(children)\n      ? React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement | HTMLDivElement> }>, {\n        ...nativeProps,\n        className: cn((children as React.ReactElement<{ className?: string }>).props.className, externalClassName, css.trigger, resolved.trigger),\n        ref: mergedRef,\n      })\n      : (\n        <span ref={mergedRef} {...nativeProps} className={cn(css.trigger, externalClassName, resolved.trigger)}>\n          {children}\n        </span>\n      );\n\n    return (\n      <>\n        {triggerElement}\n        {(state.isOpen || isExiting) &&\n          createPortal(\n            <div\n              ref={mergedContentRef}\n              {...asElementProps<\"div\">(mergeProps(overlayProps, dialogProps))}\n              className={cn(css.root, resolved.root)}\n              style={{\n                ...floatingStyles,\n              }}\n            >\n              <div\n                className={cn('popover', 'content', css.content)}\n                style={{\n                  opacity: isAnimating ? 1 : 0,\n                  transform: isAnimating ? \"scale(1)\" : getInitialTransform(placement),\n                  pointerEvents: isAnimating ? 'auto' : 'none',\n                }}\n              >\n                <Frame\n                  role=\"dialog\"\n                  side={showArrow ? getFrameSide(position) : position}\n                  shapeMode={showArrow ? \"extend\" : undefined}\n                  path={showArrow ? ARROW_PATH : undefined}\n                  pathWidth={showArrow ? ARROW_WIDTH : undefined}\n                  cornerRadius={8}\n                  padding=\"none\"\n                  className={cn('popover', 'frame', css.frame, resolved.content)}\n                >\n                  {content}\n                </Frame>\n              </div>\n            </div>,\n            document.body\n          )}\n      </>\n    );\n  }\n);\n\nPopover.displayName = \"Popover\";\n\nexport { Popover };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    @apply inline-block;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--popover-fill);\n    --frame-stroke-color: var(--popover-border-color);\n    opacity: 0;\n    transform: scale(0.95);\n    transition: opacity 0.2s ease-out, transform 0.2s ease-out;\n    pointer-events: none;\n    min-width: 200px;\n    max-width: 400px;\n    padding: 0.75rem;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    transform: scale(1);\n    pointer-events: auto;\n  }\n\n  .content[data-instant] {\n    transition: none;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1;\n    color: var(--foreground);\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    @apply whitespace-nowrap;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  trigger: string;\n  root: string;\n  content: string;\n  frame: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "progress": {
    "tsx": "\"use client\";\n\nimport * as React from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport css from \"./Progress.module.css\";\n\ntype ProgressSize = \"sm\" | \"md\" | \"lg\";\n\ninterface ProgressStyleSlots {\n  root?: StyleValue;\n  ['label-row']?: StyleValue;\n  label?: StyleValue;\n  value?: StyleValue;\n  progress?: StyleValue;\n  fill?: StyleValue;\n}\n\ntype ProgressStylesProp = StylesProp<ProgressStyleSlots>;\n\nexport interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {\n  /** Current progress value */\n  value?: number;\n  /** Maximum value that represents 100% */\n  max?: number;\n  /** Visual color variant indicating progress state */\n  variant?: string;\n  /** Size of the progress bar */\n  size?: ProgressSize;\n  /** Whether to show an infinite loading animation instead of a fixed value */\n  indeterminate?: boolean;\n  /** Accessible label describing what is progressing */\n  label?: string;\n  /** Whether to display the percentage value next to the label */\n  showValue?: boolean;\n  /** Whether to show a shimmer animation on the progress fill */\n  animated?: boolean;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: ProgressStylesProp;\n}\n\nconst sizeMap = {\n  sm: css.sm,\n  md: css.md,\n  lg: css.lg,\n} as const;\n\nconst resolveProgressBaseStyles = createStylesResolver([\n  'root',\n  'label-row',\n  'label',\n  'value',\n  'progress',\n  'fill',\n] as const);\n\nconst Progress = React.forwardRef<HTMLDivElement, ProgressProps>(\n  (\n    {\n      className,\n      value = 0,\n      max = 100,\n      variant = \"default\",\n      size = \"md\",\n      indeterminate = false,\n      label,\n      showValue = false,\n      animated = false,\n      styles: stylesProp,\n      ...props\n    },\n    ref\n  ) => {\n    const clampedValue = Math.min(Math.max(value, 0), max);\n    const percentage = (clampedValue / max) * 100;\n    const hasLabelContent = label || showValue;\n\n    const resolved = resolveProgressBaseStyles(stylesProp);\n\n    return (\n      <div\n        className={cn(css.wrapper, hasLabelContent && css.hasLabel, resolved.root)}\n      >\n        {hasLabelContent && (\n          <div className={cn('progress', 'label-row', css['label-row'], resolved['label-row'])}>\n            {label && (\n              <span className={cn(css.label, resolved.label)}>\n                {label}\n              </span>\n            )}\n            {showValue && !indeterminate && (\n              <span className={cn(css.value, resolved.value)}>{Math.round(percentage)}%</span>\n            )}\n          </div>\n        )}\n        <div\n          ref={ref}\n          role=\"progressbar\"\n          aria-valuenow={indeterminate ? undefined : clampedValue}\n          aria-valuemin={0}\n          aria-valuemax={max}\n          aria-label={label}\n          className={cn('progress', variant, css.progress, sizeMap[size], className, resolved.progress)}\n          data-variant={variant}\n          data-size={size}\n          data-indeterminate={indeterminate || undefined}\n          {...props}\n        >\n          <div\n            className={cn('progress', 'fill', variant, css.fill, (animated || indeterminate) && css.animated, indeterminate && css.indeterminate, resolved.fill)}\n            style={indeterminate ? undefined : { width: `${percentage}%` }}\n          />\n        </div>\n      </div>\n    );\n  }\n);\n\nProgress.displayName = \"Progress\";\n\nexport { Progress };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .progress {\n    @apply relative w-full overflow-hidden;\n    border-radius: var(--radius-full);\n    background-color: var(--track-background);\n  }\n\n  .progress.sm { height: 0.25rem; }\n  .progress.md { height: 0.5rem; }\n  .progress.lg { height: 0.75rem; }\n\n  .fill {\n    @apply h-full;\n    border-radius: var(--radius-full);\n    background-color: var(--fill-background);\n    transition: width 300ms var(--ease-snappy-pop);\n  }\n\n  .fill.animated {\n    animation: pulse 2s var(--ease-gentle-ease) infinite;\n  }\n\n  .fill.indeterminate {\n    width: 33.333%;\n    animation: progress-indeterminate 1.5s var(--ease-gentle-ease) infinite;\n  }\n\n  .wrapper {\n    @apply w-full;\n  }\n\n  .wrapper.has-label {\n    @apply space-y-1;\n  }\n\n  .label-row {\n    @apply flex items-center justify-between;\n    font-size: var(--text-sm);\n    color: var(--foreground);\n  }\n\n  .label {\n    user-select: none;\n  }\n\n  .value {\n    font-variant-numeric: tabular-nums;\n  }\n\n  @keyframes pulse {\n    0%, 100% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes progress-indeterminate {\n    0% { transform: translateX(-100%); }\n    100% { transform: translateX(400%); }\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  progress: string;\n  sm: string;\n  md: string;\n  lg: string;\n  fill: string;\n  default: string;\n  success: string;\n  warning: string;\n  error: string;\n  animated: string;\n  indeterminate: string;\n  wrapper: string;\n  hasLabel: string;\n  \"label-row\": string;\n  label: string;\n  value: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "radio": {
    "tsx": "\"use client\";\n\nimport React, { useId, createContext, useContext } from \"react\";\nimport { useRadioGroupState } from \"react-stately\";\n\nimport { mergeProps, } from \"@react-aria/utils\";\nimport { useFocusRing } from \"@react-aria/focus\"\nimport { useRadioGroup, useRadio } from \"@react-aria/radio\";\n\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { asElementProps } from \"@/lib/react-aria\";\nimport styles from \"./Radio.module.css\";\n\ninterface RadioStyleSlots {\n  root?: StyleValue;\n  label?: StyleValue;\n  description?: StyleValue;\n  helperText?: StyleValue;\n}\n\ntype RadioStylesProp = StylesProp<RadioStyleSlots>;\n\nconst resolveRadioBaseStyles = createStylesResolver(['root', 'label', 'description', 'helperText'] as const);\n\ntype Size = \"sm\" | \"md\" | \"lg\";\n\n// Context for Radio.Group\ninterface RadioGroupContextType {\n  state?: ReturnType<typeof useRadioGroupState>;\n  disabled?: boolean;\n  size?: Size;\n}\n\nconst RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);\n\nconst useRadioGroupContext = () => {\n  const context = useContext(RadioGroupContext);\n  return context;\n};\n\n// Radio.Group Component\nexport interface RadioGroupProps {\n  /** Controlled selected radio value */\n  value?: string;\n  /** Initial selected value for uncontrolled usage */\n  defaultValue?: string;\n  /** Called when the selected value changes */\n  onValueChange?: (value: string) => void;\n  /** Whether all radios in the group are disabled */\n  disabled?: boolean;\n  /** Size of all radio buttons in the group */\n  size?: Size;\n  children: React.ReactNode;\n  /** Additional CSS class names */\n  className?: string;\n  /** Accessible label for the radio group */\n  label?: string;\n  /** Descriptive text shown below the group label */\n  description?: string;\n}\n\nconst RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(\n  ({\n    value: controlledValue,\n    defaultValue,\n    onValueChange,\n    disabled = false,\n    size = \"md\",\n    children,\n    className,\n    label,\n    description,\n  }, ref) => {\n    const state = useRadioGroupState({\n      value: controlledValue,\n      defaultValue,\n      onChange: onValueChange,\n      isDisabled: disabled,\n    });\n\n    useRadioGroup(\n      {\n        isDisabled: disabled,\n        label,\n        description,\n      },\n      state\n    );\n\n    return (\n      <RadioGroupContext.Provider\n        value={{ state, disabled, size }}\n      >\n        <div\n          ref={ref}\n          className={className}\n          role=\"group\"\n        >\n          {label && (\n            <label\n              className={cn(\n                'radio', 'radio-label', styles[\"radio-label\"],\n                disabled && 'radio-label-disabled', disabled && styles[\"radio-label-disabled\"]\n              )}\n            >\n              {label}\n            </label>\n          )}\n          {description && (\n            <p className=\"text-sm text-foreground-400\">\n              {description}\n            </p>\n          )}\n          <div className={styles[\"radio-group\"]}>\n            {children}\n          </div>\n        </div>\n      </RadioGroupContext.Provider>\n    );\n  }\n);\n\nRadioGroup.displayName = \"RadioGroup\";\n\n// Radio.Item Component\nexport interface RadioItemProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\"> {\n  /** Size of the radio button */\n  size?: Size;\n  /** Label text or element displayed next to the radio */\n  label?: React.ReactNode;\n  /** Secondary description shown below the label */\n  description?: React.ReactNode;\n  /** Helper text shown below the radio item */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Whether to apply error styling */\n  error?: boolean;\n  /** Value submitted when this radio is selected */\n  value: string;\n  /** Classes applied to named slots */\n  styles?: RadioStylesProp;\n}\n\nconst RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(\n  ({\n    className,\n    size: sizeProp,\n    disabled: disabledProp = false,\n    error = false,\n    label,\n    description,\n    helperText,\n    helperTextError = false,\n    value,\n    id,\n    styles: stylesProp,\n    ...props\n  }, ref) => {\n    const radioGroupContext = useRadioGroupContext();\n    const generatedId = useId();\n    const radioId = id || `radio-${generatedId}`;\n\n    if (!radioGroupContext?.state) {\n      throw new Error(\"RadioItem must be used within a Radio.Group\");\n    }\n\n    const { state } = radioGroupContext;\n    const size = sizeProp || radioGroupContext?.size || \"md\";\n    const disabled = disabledProp ?? radioGroupContext?.disabled ?? false;\n    const isSelected = state.selectedValue === value;\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    // Extract aria-label from props if provided, fallback to label if it's a string\n    const ariaLabelFromProps = props[\"aria-label\"];\n    const ariaLabelValue =\n      ariaLabelFromProps ||\n      (typeof label === \"string\" ? label : undefined);\n\n    const { inputProps } = useRadio(\n      {\n        value,\n        isDisabled: disabled,\n        ...(ariaLabelValue && { \"aria-label\": ariaLabelValue }),\n      },\n      state,\n      inputRef\n    );\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n    const resolved = resolveRadioBaseStyles(stylesProp);\n\n    return (\n      <div className=\"w-full\">\n        <div\n          className={styles[\"radio-item\"]}\n          data-disabled={disabled || undefined}\n        >\n          <div className=\"relative\">\n            <div\n              className={cn(\n                'radio', styles.radio,\n                styles[size],\n                className,\n                resolved.root\n              )}\n              data-checked={isSelected || undefined}\n              data-disabled={disabled || undefined}\n              data-error={error ? \"true\" : undefined}\n              data-focus-visible={isFocusVisible || undefined}\n              role=\"presentation\"\n            >\n              {isSelected && (\n                <div className={cn(styles[\"radio-dot\"], styles[size])} />\n              )}\n            </div>\n            <input\n              {...asElementProps<\"input\">(mergeProps(inputProps, focusProps))}\n              ref={ref || inputRef}\n              type=\"radio\"\n              id={radioId}\n              className={styles[\"radio-input\"]}\n              suppressHydrationWarning\n              {...props}\n            />\n          </div>\n          {(label || description) && (\n            <div className=\"flex flex-col gap-1\">\n              {label && (\n                <label\n                  htmlFor={radioId}\n                  className={cn(\n                    'radio', 'radio-label', styles[\"radio-label\"],\n                    disabled && 'radio-label-disabled', disabled && styles[\"radio-label-disabled\"],\n                    resolved.label\n                  )}\n                  suppressHydrationWarning\n                >\n                  {label}\n                </label>\n              )}\n              {description && (\n                <p\n                  className={cn(\n                    'radio', 'radio-description', styles[\"radio-description\"],\n                    error && 'radio-description-error', error && styles[\"radio-description-error\"],\n                    resolved.description\n                  )}\n                >\n                  {description}\n                </p>\n              )}\n            </div>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              \"text-sm mt-2 ml-8 transition-colors\",\n              helperTextError ? \"text-danger-600\" : \"text-foreground-400\",\n              resolved.helperText\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nRadioItem.displayName = \"RadioItem\";\n\n// Standalone Radio component for backward compatibility\nexport interface RadioProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\"> {\n  /** Size of the radio button */\n  size?: Size;\n  /** Label text or element displayed next to the radio */\n  label?: React.ReactNode;\n  /** Secondary description shown below the label */\n  description?: React.ReactNode;\n  /** Helper text shown below the radio item */\n  helperText?: React.ReactNode;\n  /** Whether to style the helper text as an error */\n  helperTextError?: boolean;\n  /** Whether to apply error styling */\n  error?: boolean;\n  /** Classes applied to named slots */\n  styles?: RadioStylesProp;\n}\n\nconst RadioBase = React.forwardRef<HTMLInputElement, RadioProps>(\n  ({\n    className,\n    size = \"md\",\n    disabled = false,\n    error = false,\n    label,\n    description,\n    helperText,\n    helperTextError = false,\n    checked: checkedProp,\n    defaultChecked,\n    onChange,\n    id,\n    styles: stylesProp,\n    ...props\n  }, ref) => {\n    const [internalChecked, setInternalChecked] = React.useState(checkedProp ?? defaultChecked ?? false);\n    const generatedId = useId();\n\n    const isControlled = checkedProp !== undefined;\n    const checked = isControlled ? checkedProp : internalChecked;\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n      if (!isControlled) {\n        setInternalChecked(e.target.checked);\n      }\n      onChange?.(e);\n    };\n\n    const radioId = id || `radio-${generatedId}`;\n    const inputRef = React.useRef<HTMLInputElement>(null);\n    const resolved = resolveRadioBaseStyles(stylesProp);\n\n    return (\n      <div className=\"w-full\">\n        <div\n          className={styles[\"radio-item\"]}\n          data-disabled={disabled || undefined}\n        >\n          <div className=\"relative\">\n            <div\n              className={cn(\n                'radio', styles.radio,\n                styles[size],\n                className,\n                resolved.root\n              )}\n              data-checked={checked || undefined}\n              data-disabled={disabled || undefined}\n              data-error={error ? \"true\" : undefined}\n              data-focus-visible={isFocusVisible || undefined}\n              role=\"presentation\"\n            >\n              {checked && (\n                <div className={cn(styles[\"radio-dot\"], styles[size])} />\n              )}\n            </div>\n            <input\n              {...asElementProps<\"input\">(focusProps)}\n              ref={inputRef}\n              type=\"radio\"\n              id={radioId}\n              checked={checked}\n              onChange={handleChange}\n              disabled={disabled ?? false}\n              className={styles[\"radio-input\"]}\n              aria-label={typeof label === \"string\" ? label : undefined}\n              suppressHydrationWarning\n              {...props}\n            />\n          </div>\n          {(label || description) && (\n            <div className=\"flex flex-col gap-1\">\n              {label && (\n                <label\n                  htmlFor={radioId}\n                  className={cn(\n                    'radio', 'radio-label', styles[\"radio-label\"],\n                    disabled && 'radio-label-disabled', disabled && styles[\"radio-label-disabled\"],\n                    resolved.label\n                  )}\n                  suppressHydrationWarning\n                >\n                  {label}\n                </label>\n              )}\n              {description && (\n                <p\n                  className={cn(\n                    'radio', 'radio-description', styles[\"radio-description\"],\n                    error && 'radio-description-error', error && styles[\"radio-description-error\"],\n                    resolved.description\n                  )}\n                >\n                  {description}\n                </p>\n              )}\n            </div>\n          )}\n        </div>\n        {helperText && (\n          <p\n            className={cn(\n              \"text-sm mt-2 ml-8 transition-colors\",\n              helperTextError ? \"text-danger-600\" : \"text-foreground-400\",\n              resolved.helperText\n            )}\n          >\n            {helperText}\n          </p>\n        )}\n      </div>\n    );\n  }\n);\n\nRadioBase.displayName = \"Radio\";\n\n// Compound component\nconst Radio = Object.assign(RadioBase, {\n  Group: RadioGroup,\n  Item: RadioItem,\n});\n\nexport { Radio };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .radio-group {\n    @apply flex flex-col gap-3;\n  }\n\n  .radio-item {\n    @apply flex items-start gap-3 cursor-pointer select-none;\n  }\n\n  .radio-input {\n    @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer\n  }\n\n  .radio {\n    --disabled-opacity: 0.6;\n\n    @apply relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center;\n    border: var(--border-width-base) solid;\n    border-radius: 9999px;\n    transition: all 200ms var(--ease-snappy-pop), transform 200ms var(--ease-snappy-pop);\n    background-color: var(--radio-background-unchecked);\n    border-color: var(--radio-border-unchecked);\n  }\n\n  .radio-item:active .radio {\n    transform: scale(0.92);\n  }\n\n  .radio-dot {\n    border-radius: 9999px;\n    background-color: var(--radio-dot-unchecked);\n    transform: scale(0);\n    transform-origin: center;\n    transition: transform 200ms var(--ease-snappy-pop);\n  }\n\n  .radio[data-checked=\"true\"] {\n    --radio-background-unchecked: var(--radio-background-checked);\n    --radio-border-unchecked: var(--radio-border-checked);\n    --radio-dot-unchecked: var(--radio-dot-checked);\n  }\n\n  .radio[data-checked=\"true\"] .radio-dot {\n    transform: scale(1);\n  }\n\n  @media (hover: hover) {\n    .radio-item:not([data-disabled]):hover .radio {\n      --radio-background-unchecked: var(--radio-hover-background);\n      --radio-border-unchecked: var(--radio-hover-border);\n      opacity: 0.9;\n    }\n  }\n\n  .radio-item[data-disabled] .radio {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n    --radio-dot-unchecked: transparent;\n  }\n\n  .radio[data-error=\"true\"] {\n    --radio-border-unchecked: var(--radio-error-border);\n  }\n\n  .radio[data-error=\"true\"][data-checked=\"true\"] {\n    --radio-border-unchecked: var(--radio-border-checked);\n  }\n\n  .radio[data-focus-visible=\"true\"] {\n    outline: 2px solid;\n    outline-color: var(--ring-color);\n    outline-offset: -2px;\n  }\n\n  .radio-label {\n    @apply cursor-pointer;\n    font-weight: var(--font-weight-medium);\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-foreground);\n    font-size: inherit;\n    line-height: inherit;\n    select: none;\n  }\n\n  .radio-label-disabled {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n    color: var(--radio-foreground-disabled);\n  }\n\n  .radio-description {\n    font-size: 0.875rem;\n    margin-top: 0.125rem;\n    transition: color 200ms var(--ease-snappy-pop);\n    color: var(--radio-helper);\n  }\n\n  .radio-description-error {\n    color: var(--radio-helper-error);\n  }\n  /* Size variants */\n  .radio.sm {\n    @apply h-4 w-4;\n  }\n\n  .radio.sm .radio-dot {\n    width: 0.375rem;\n    height: 0.375rem;\n  }\n\n  .radio.md {\n    @apply h-5 w-5;\n  }\n\n  .radio.md .radio-dot {\n    width: 0.625rem;\n    height: 0.625rem;\n  }\n\n  .radio.lg {\n    @apply h-6 w-6;\n  }\n\n  .radio.lg .radio-dot {\n    width: 0.75rem;\n    height: 0.75rem;\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  \"radio-group\": string;\n  \"radio-item\": string;\n  \"radio-input\": string;\n  radio: string;\n  \"radio-dot\": string;\n  sm: string;\n  md: string;\n  lg: string;\n  \"radio-label\": string;\n  \"radio-label-disabled\": string;\n  \"radio-description\": string;\n  \"radio-description-error\": string;\n};\n\nexport default styles;\n"
  },
  "scroll": {
    "tsx": "\"use client\";\n\nimport React, {\n  useRef,\n  useLayoutEffect,\n  useState,\n  useCallback,\n} from \"react\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { Mask } from \"../Mask\";\nimport css from \"./Scroll.module.css\";\nimport {\n  SCROLL_RESTORE_AXIS_ATTR,\n  SCROLL_RESTORE_DEBUG_ID_KEY,\n  SCROLL_RESTORE_FLAG,\n  SCROLL_RESTORE_STORAGE_KEY_ATTR,\n  getBootstrapRestoredNode,\n  getScrollRestoreDebugId,\n  getScrollRestoreMetrics,\n  getScrollPositionProperty,\n  recordScrollRestoreTrace,\n} from \"./scripts/restore-scroll.constants\";\n\ninterface ScrollStyleSlots {\n  root?: StyleValue;\n  content?: StyleValue;\n  track?: StyleValue;\n  thumb?: StyleValue;\n  horizontal?: StyleValue;\n  vertical?: StyleValue;\n}\n\ntype ScrollStylesProp = StylesProp<ScrollStyleSlots>;\n\nexport interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {\n  children: React.ReactNode;\n  maxHeight?: string;\n  maxWidth?: string;\n  direction?: \"vertical\" | \"horizontal\";\n  paddingY?: string | number;\n  \"fade-y\"?: boolean;\n  fadeDistance?: number;\n  fadeSize?: number;\n  enabled?: boolean;\n  hide?: boolean;\n  inline?: boolean;\n  styles?: ScrollStylesProp;\n  storageKey?: string;\n}\n\nconst resolveScrollBaseStyles = createStylesResolver([\n  \"root\",\n  \"content\",\n  \"track\",\n  \"thumb\",\n  \"horizontal\",\n  \"vertical\",\n] as const);\n\nfunction getInitialScrollFadeVars(\n  direction: ScrollProps[\"direction\"],\n  fadeY: boolean,\n  fadeSize: number,\n): React.CSSProperties {\n  if (direction !== \"vertical\" || !fadeY) {\n    return {\n      \"--mask-top-fade\": \"0%\",\n      \"--mask-bottom-fade\": \"0%\",\n    } as React.CSSProperties;\n  }\n\n  // SSR cannot know overflow or scroll position, so default to a bottom-only hint.\n  return {\n    \"--mask-top-fade\": \"0%\",\n    \"--mask-bottom-fade\": `${fadeSize}%`,\n  } as React.CSSProperties;\n}\n\nfunction readStoredScrollOffset(storageKey: string): number | null {\n  if (typeof window === \"undefined\") return null;\n\n  try {\n    const storedValue = window.sessionStorage.getItem(storageKey);\n    if (storedValue === null) return null;\n\n    const parsedValue = parseInt(storedValue, 10);\n    return Number.isNaN(parsedValue) ? null : parsedValue;\n  } catch {\n    return null;\n  }\n}\n\nfunction persistStoredScrollOffset(storageKey: string, scrollOffset: number): void {\n  if (typeof window === \"undefined\") return;\n\n  try {\n    window.sessionStorage.setItem(storageKey, String(scrollOffset));\n  } catch {\n    // Ignore storage failures. The live scroll position is already updated.\n  }\n}\n\nfunction hasPreHydrationScrollRestore(node: HTMLDivElement): boolean {\n  return Boolean((node as HTMLDivElement & Record<string, unknown>)[SCROLL_RESTORE_FLAG]);\n}\n\nconst Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(\n  (\n    {\n      children,\n      className,\n      maxHeight,\n      maxWidth,\n      direction = \"vertical\",\n      paddingY = 4,\n      \"fade-y\": fadeY = false,\n      fadeDistance = 5,\n      fadeSize = 4,\n      enabled = true,\n      hide = true,\n      inline = false,\n      styles,\n      storageKey,\n      style: propsStyle,\n      ...restProps\n    },\n    ref,\n  ) => {\n    const isHoriz = direction === \"horizontal\";\n\n    // Axis-Agnostic property keys\n    const clientSizeKey = isHoriz ? \"clientWidth\" : \"clientHeight\";\n    const scrollSizeKey = isHoriz ? \"scrollWidth\" : \"scrollHeight\";\n    const scrollPosKey = getScrollPositionProperty(direction);\n    const clientPosKey = isHoriz ? \"clientX\" : \"clientY\";\n    const trackSizeKey = isHoriz ? \"width\" : \"height\";\n    const trackPosKey = isHoriz ? \"left\" : \"top\";\n\n    const numPaddingY = typeof paddingY === \"number\" ? paddingY : parseInt(String(paddingY), 10) || 0;\n    const strPaddingY = typeof paddingY === \"number\" ? `${paddingY}px` : String(paddingY);\n\n    const containerRef = useRef<HTMLDivElement>(null);\n    const contentRef = useRef<HTMLDivElement>(null);\n    const maskRef = useRef<HTMLDivElement>(null);\n    const thumbRef = useRef<HTMLDivElement>(null);\n    const mergedRef = useMergedRef(ref, containerRef);\n\n    const resolved = resolveScrollBaseStyles(styles);\n\n    const [needsScrollbar, setNeedsScrollbar] = useState(false);\n    const [isHoveredRight, setIsHoveredRight] = useState(false);\n    const [thumbSize, setThumbSize] = useState(0);\n    const [thumbPosition, setThumbPosition] = useState(0);\n    const [isDragging, setIsDragging] = useState(false);\n    const [isScrolling, setIsScrolling] = useState(false);\n\n    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);\n    const dragStartRef = useRef({ origin: 0, scrollOrigin: 0 });\n    const thumbSizeRef = useRef(0);\n    const resizeObserverRef = useRef<ResizeObserver | null>(null);\n    const mutationObserverRef = useRef<MutationObserver | null>(null);\n\n    const updateScrollbar = useCallback(() => {\n      if (!containerRef.current || !contentRef.current) return;\n\n      const container = containerRef.current;\n      const content = contentRef.current;\n\n      const containerSize = container[clientSizeKey];\n      const contentSize = content[scrollSizeKey] || containerSize;\n      const currentScroll = content[scrollPosKey];\n      const trackSize = isHoriz ? containerSize : containerSize - numPaddingY * 2;\n\n      const needs = contentSize > containerSize;\n      setNeedsScrollbar(needs);\n\n      const scrollRatio = trackSize / Math.max(1, contentSize);\n      const newThumbSize = Math.max(20, Math.min(trackSize, trackSize * scrollRatio));\n      const maxScroll = contentSize - containerSize;\n      const scrollProgress = needs ? currentScroll / maxScroll : 0;\n      const maxThumbPos = trackSize - newThumbSize;\n      const newThumbPos = scrollProgress * maxThumbPos;\n\n      setThumbSize(newThumbSize);\n      thumbSizeRef.current = newThumbSize;\n      setThumbPosition(newThumbPos);\n\n      if (!isHoriz && maskRef.current) {\n        const maskNode = maskRef.current;\n        if (fadeY && needs) {\n          const topP = Math.min(1, Math.max(0, currentScroll / fadeDistance));\n          const botP = Math.min(1, Math.max(0, (maxScroll - currentScroll) / fadeDistance));\n          maskNode.style.setProperty(\"--mask-top-fade\", `${topP * fadeSize}%`);\n          maskNode.style.setProperty(\"--mask-bottom-fade\", `${botP * fadeSize}%`);\n        } else {\n          maskNode.style.setProperty(\"--mask-top-fade\", \"0%\");\n          maskNode.style.setProperty(\"--mask-bottom-fade\", \"0%\");\n        }\n      }\n    }, [isHoriz, clientSizeKey, scrollSizeKey, scrollPosKey, numPaddingY, fadeY, fadeDistance, fadeSize]);\n\n    const cleanupScrollTimeout = useCallback(() => {\n      if (scrollTimeoutRef.current) {\n        clearTimeout(scrollTimeoutRef.current);\n        scrollTimeoutRef.current = null;\n      }\n    }, []);\n\n    const cleanupObservers = useCallback(() => {\n      resizeObserverRef.current?.disconnect();\n      mutationObserverRef.current?.disconnect();\n      resizeObserverRef.current = null;\n      mutationObserverRef.current = null;\n    }, []);\n\n    const cleanupDragListeners = useCallback(() => {\n      document.removeEventListener(\"mousemove\", handleMouseMove);\n      document.removeEventListener(\"mouseup\", handleMouseUp);\n      document.body.style.userSelect = \"\";\n    }, []);\n\n    const restoreStoredScrollPosition = useCallback(() => {\n      if (!storageKey || !contentRef.current) return;\n\n      const contentNode = contentRef.current;\n      const bootstrapNode = getBootstrapRestoredNode(storageKey);\n      const sameNodeAsBootstrap = Boolean(bootstrapNode) && bootstrapNode === contentNode;\n      const currentNodeId = getScrollRestoreDebugId(contentNode);\n      const bootstrapNodeId = getScrollRestoreDebugId(bootstrapNode);\n      const beforeMetrics = getScrollRestoreMetrics(contentNode, direction);\n      const hasPreHydrationRestore = hasPreHydrationScrollRestore(contentNode);\n\n      recordScrollRestoreTrace(\"client:layout-effect\", {\n        storageKey,\n        hasPreHydrationRestore,\n        sameNodeAsBootstrap,\n        nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,\n        currentNodeId,\n        bootstrapNodeId,\n        clientSize: beforeMetrics.clientSize,\n        scrollSize: beforeMetrics.scrollSize,\n        maxScroll: beforeMetrics.maxScroll,\n        scrollOffset: beforeMetrics.scrollOffset,\n      });\n\n      if (hasPreHydrationRestore) {\n        recordScrollRestoreTrace(\"client:skip-prehydrated\", {\n          storageKey,\n          sameNodeAsBootstrap,\n          nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,\n          currentNodeId,\n          bootstrapNodeId,\n        });\n        return;\n      }\n\n      const savedOffset = readStoredScrollOffset(storageKey);\n      if (savedOffset === null) {\n        recordScrollRestoreTrace(\"client:no-stored-offset\", {\n          storageKey,\n          sameNodeAsBootstrap,\n          nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,\n          currentNodeId,\n          bootstrapNodeId,\n        });\n        return;\n      }\n\n      contentNode[scrollPosKey] = savedOffset;\n\n      const afterMetrics = getScrollRestoreMetrics(contentNode, direction);\n      recordScrollRestoreTrace(\"client:fallback-restore\", {\n        storageKey,\n        storedOffset: savedOffset,\n        sameNodeAsBootstrap,\n        nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,\n        currentNodeId,\n        bootstrapNodeId,\n        beforeScrollOffset: beforeMetrics.scrollOffset,\n        afterScrollOffset: afterMetrics.scrollOffset,\n        clientSize: afterMetrics.clientSize,\n        scrollSize: afterMetrics.scrollSize,\n        maxScroll: afterMetrics.maxScroll,\n        clamped: savedOffset !== afterMetrics.scrollOffset,\n        clampedToZero: savedOffset > 0 && afterMetrics.scrollOffset === 0,\n      });\n    }, [direction, scrollPosKey, storageKey]);\n\n    const connectObservers = useCallback(() => {\n      cleanupObservers();\n      updateScrollbar();\n\n      const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updateScrollbar));\n      const mutationObserver = new MutationObserver(() => requestAnimationFrame(updateScrollbar));\n\n      if (containerRef.current) resizeObserver.observe(containerRef.current);\n      if (contentRef.current) {\n        resizeObserver.observe(contentRef.current);\n        mutationObserver.observe(contentRef.current, { childList: true, subtree: true });\n      }\n\n      resizeObserverRef.current = resizeObserver;\n      mutationObserverRef.current = mutationObserver;\n    }, [cleanupObservers, updateScrollbar]);\n\n    const handleContentRef = useCallback(\n      (node: HTMLDivElement | null) => {\n        contentRef.current = node;\n        if (!node) {\n          cleanupObservers();\n          cleanupDragListeners();\n          cleanupScrollTimeout();\n          return;\n        }\n\n        recordScrollRestoreTrace(\"client:content-ref\", {\n          storageKey: storageKey ?? null,\n          currentNodeId: getScrollRestoreDebugId(node),\n          preHydrationFlag: hasPreHydrationScrollRestore(node),\n          bootstrapDebugId: storageKey ? getScrollRestoreDebugId(getBootstrapRestoredNode(storageKey)) : null,\n          debugIdPropertyKey: SCROLL_RESTORE_DEBUG_ID_KEY,\n        });\n        connectObservers();\n      },\n      [cleanupDragListeners, cleanupObservers, cleanupScrollTimeout, connectObservers, storageKey]\n    );\n\n    const handleScroll = useCallback(() => {\n      updateScrollbar();\n      if (storageKey && contentRef.current) {\n        persistStoredScrollOffset(storageKey, contentRef.current[scrollPosKey]);\n      }\n      setIsScrolling(true);\n      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);\n      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1500);\n    }, [updateScrollbar, storageKey, scrollPosKey]);\n\n    const handleContainerMouseMove = useCallback(\n      (e: React.MouseEvent<HTMLDivElement>) => {\n        if (!containerRef.current) return;\n        const rect = containerRef.current.getBoundingClientRect();\n        const mousePos = isHoriz ? e.clientY - rect.top : e.clientX - rect.left;\n        const rectSize = isHoriz ? rect.height : rect.width;\n\n        const newIsHovered = mousePos > rectSize - 20;\n        if (newIsHovered !== isHoveredRight) setIsHoveredRight(newIsHovered);\n      },\n      [isHoriz, isHoveredRight]\n    );\n\n    const handleContainerMouseLeave = useCallback(() => setIsHoveredRight(false), []);\n\n    const handleMouseMove = useCallback(\n      (e: MouseEvent) => {\n        if (!contentRef.current || !containerRef.current) return;\n\n        const delta = e[clientPosKey] - dragStartRef.current.origin;\n        const containerSize = containerRef.current[clientSizeKey];\n        const maxScroll = contentRef.current[scrollSizeKey] - containerSize;\n        const scrollRatio = maxScroll / (containerSize - thumbSizeRef.current);\n\n        contentRef.current[scrollPosKey] = Math.max(\n          0,\n          Math.min(maxScroll, dragStartRef.current.scrollOrigin + delta * scrollRatio)\n        );\n      },\n      [clientPosKey, clientSizeKey, scrollPosKey, scrollSizeKey]\n    );\n\n    const handleMouseUp = useCallback(() => {\n      setIsDragging(false);\n      cleanupDragListeners();\n    }, [cleanupDragListeners]);\n\n    const handleMouseDown = useCallback(\n      (e: React.MouseEvent) => {\n        if (!contentRef.current) return;\n        e.preventDefault();\n\n        dragStartRef.current = {\n          origin: e[clientPosKey],\n          scrollOrigin: contentRef.current[scrollPosKey],\n        };\n        setIsDragging(true);\n        document.addEventListener(\"mousemove\", handleMouseMove);\n        document.addEventListener(\"mouseup\", handleMouseUp);\n        document.body.style.userSelect = \"none\";\n      },\n      [clientPosKey, scrollPosKey, handleMouseMove, handleMouseUp]\n    );\n\n    const handleTrackClick = useCallback(\n      (e: React.MouseEvent) => {\n        if (!containerRef.current || !contentRef.current || !thumbRef.current) return;\n\n        const rect = containerRef.current.getBoundingClientRect();\n        const thumbRect = thumbRef.current.getBoundingClientRect();\n        const rectStartKey = isHoriz ? \"left\" : \"top\";\n        const rectEndKey = isHoriz ? \"right\" : \"bottom\";\n        const padOffset = isHoriz ? 0 : numPaddingY;\n\n        const clickPos = e[clientPosKey] - rect[rectStartKey] - padOffset;\n        const relThumbStart = thumbRect[rectStartKey] - rect[rectStartKey] - padOffset;\n        const relThumbEnd = thumbRect[rectEndKey] - rect[rectStartKey] - padOffset;\n\n        // Ignore clicks directly on the thumb (handled by handleMouseDown)\n        if (clickPos >= relThumbStart && clickPos <= relThumbEnd) return;\n\n        const containerSize = containerRef.current[clientSizeKey];\n        const contentSize = contentRef.current[scrollSizeKey];\n        const maxScroll = contentSize - containerSize;\n        const trackSize = isHoriz ? containerSize : containerSize - numPaddingY * 2;\n\n        const newThumbSize = Math.max(20, trackSize * (trackSize / contentSize));\n        const targetThumbStart = clickPos - newThumbSize / 2;\n        const maxThumbPos = trackSize - newThumbSize;\n        const clampedThumbStart = Math.max(0, Math.min(maxThumbPos, targetThumbStart));\n\n        const scrollProgress = clampedThumbStart / maxThumbPos;\n        contentRef.current[scrollPosKey] = Math.max(0, Math.min(maxScroll, scrollProgress * maxScroll));\n\n        dragStartRef.current = {\n          origin: e[clientPosKey],\n          scrollOrigin: contentRef.current[scrollPosKey],\n        };\n        setIsDragging(true);\n        document.addEventListener(\"mousemove\", handleMouseMove);\n        document.addEventListener(\"mouseup\", handleMouseUp);\n        document.body.style.userSelect = \"none\";\n      },\n      [isHoriz, numPaddingY, clientPosKey, clientSizeKey, scrollPosKey, scrollSizeKey, handleMouseMove, handleMouseUp]\n    );\n\n    const handleWheel = useCallback(\n      (e: React.WheelEvent) => {\n        if (!contentRef.current || !isHoriz) return;\n        e.preventDefault();\n\n        const content = contentRef.current;\n        const scrollAmount = e.deltaY || e.deltaX;\n        const maxScroll = content.scrollWidth - content.clientWidth;\n\n        content.scrollLeft = Math.max(0, Math.min(maxScroll, content.scrollLeft + scrollAmount));\n      },\n      [isHoriz]\n    );\n\n    useLayoutEffect(() => {\n      restoreStoredScrollPosition();\n      connectObservers();\n    }, [restoreStoredScrollPosition, connectObservers, enabled]);\n\n    const axisConstraintStyle = {\n      ...(isHoriz\n        ? (maxWidth ? { maxWidth } : {})\n        : (maxHeight ? { maxHeight } : {})),\n    };\n\n    if (!enabled) {\n      return (\n        <div\n          ref={ref}\n          className={cn(\"scroll\", css.root, resolved.root, className)}\n          style={{\n            [isHoriz ? \"width\" : \"height\"]: \"100%\",\n            ...axisConstraintStyle,\n            ...propsStyle,\n          }}\n          {...restProps}\n        >\n          {children}\n        </div>\n      );\n    }\n\n    const showOpacity = needsScrollbar && (!hide || isHoveredRight || isDragging || isScrolling) ? 1 : 0;\n\n    return (\n      <div\n        ref={mergedRef}\n        className={cn(\n          \"scroll\",\n          css.root,\n          isHoriz ? css.horizontal : css.vertical,\n          className,\n          resolved.root,\n          isHoriz ? resolved.horizontal : resolved.vertical\n        )}\n        style={{\n          [isHoriz ? \"width\" : \"height\"]: \"100%\",\n          ...axisConstraintStyle,\n          ...(!isHoriz && strPaddingY ? { \"--scroll-padding-y\": strPaddingY } : {}),\n          ...propsStyle,\n        } as React.CSSProperties}\n        onMouseMove={handleContainerMouseMove}\n        onMouseLeave={handleContainerMouseLeave}\n        data-dragging={String(isDragging)}\n        data-inline={String(inline)}\n        {...restProps}\n      >\n        <Mask\n          ref={maskRef}\n          style={{\n            [isHoriz ? \"maxWidth\" : \"maxHeight\"]: \"inherit\",\n            overflow: \"hidden\",\n            ...getInitialScrollFadeVars(direction, fadeY, fadeSize),\n          } as React.CSSProperties}\n        >\n          {!isHoriz && fadeY ? <Mask.Fade /> : null}\n          <div\n            ref={handleContentRef}\n            className={cn(css.content, resolved.content)}\n            onScroll={handleScroll}\n            onWheel={isHoriz ? handleWheel : undefined}\n            style={{\n              [isHoriz ? \"maxWidth\" : \"maxHeight\"]: \"inherit\",\n              minHeight: 0,\n              minWidth: 0,\n            }}\n            {...(storageKey\n              ? {\n                [SCROLL_RESTORE_STORAGE_KEY_ATTR]: storageKey,\n                [SCROLL_RESTORE_AXIS_ATTR]: direction,\n              }\n              : {})}\n          >\n            {children}\n          </div>\n        </Mask>\n\n        <div\n          className={cn(css.track, resolved.track)}\n          data-hide={String(hide)}\n          style={{\n            opacity: showOpacity,\n            pointerEvents: needsScrollbar ? \"auto\" : \"none\",\n          }}\n          onMouseDown={handleTrackClick}\n        >\n          {needsScrollbar && (\n            <div\n              ref={thumbRef}\n              className={cn(css.thumb, resolved.thumb)}\n              style={{\n                [trackSizeKey]: `${thumbSize}px`,\n                [trackPosKey]: `${thumbPosition}px`,\n              }}\n              onMouseDown={handleMouseDown}\n            />\n          )}\n        </div>\n      </div>\n    );\n  }\n);\n\nScroll.displayName = \"Scroll\";\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return (value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  };\n}\n\nexport { Scroll };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .root {\n    @apply relative;\n  }\n\n  .vertical {\n    --scrollbar-width: 12px;\n    min-height: 0;\n  }\n\n  .horizontal { --scrollbar-height: 12px; }\n\n  .content {\n    @apply h-full w-full;\n    overflow: auto;\n  }\n\n  .vertical .content {\n    overflow-y: auto;\n    overflow-x: hidden;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .vertical[data-inline=\"true\"] .content {\n    padding-right: 16px;\n  }\n\n  .horizontal .content {\n    overflow-x: auto;\n    overflow-y: hidden;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .horizontal[data-inline=\"true\"] .content {\n    padding-bottom: 16px;\n  }\n\n  .vertical .content::-webkit-scrollbar,\n  .horizontal .content::-webkit-scrollbar { display: none; }\n\n  .track {\n    @apply absolute;\n    z-index: 10;\n  }\n\n  .track[data-hide=\"true\"] {\n    transition-property: opacity;\n    transition-duration: 200ms;\n  }\n\n  .vertical .track {\n    right: 4px;\n    top: var(--scroll-padding-y, 0);\n    width: 12px;\n    height: calc(100% - 2 * var(--scroll-padding-y, 0));\n    background-color: var(--track-background);\n    box-sizing: border-box;\n  }\n\n  .horizontal .track {\n    bottom: 2px;\n    left: 0;\n    height: 12px;\n    width: 100%;\n    background-color: var(--track-background);\n  }\n\n  .thumb {\n    position: absolute;\n    border-radius: calc(var(--radius-xs) * 0.80);\n    background-color: var(--thumb-background);\n    transition-property: background-color, width, height;\n    transition-duration: 150ms;\n  }\n\n  .thumb:hover { background-color: var(--thumb-hover-background); }\n\n  .root[data-dragging=\"true\"] .thumb {\n    background-color: var(--thumb-dragging-background);\n  }\n\n  .vertical .thumb {\n    width: 6px;\n    margin-left: 6px;\n    transition-property: background-color, width, margin-left;\n    transition-duration: 150ms;\n  }\n\n  .vertical .thumb:hover,\n  .vertical[data-dragging=\"true\"] .thumb {\n    width: 8px;\n    margin-left: 4px;\n  }\n\n  .horizontal .thumb {\n    height: 6px;\n    margin-top: 6px;\n    transition-property: background-color, height, margin-top;\n    transition-duration: 150ms;\n  }\n\n  .horizontal .thumb:hover,\n  .horizontal[data-dragging=\"true\"] .thumb {\n    height: 8px;\n    margin-top: 4px;\n  }\n}\n",
    "cssTypes": "export const root: string;\nexport const vertical: string;\nexport const horizontal: string;\nexport const content: string;\nexport const track: string;\nexport const thumb: string;\n"
  },
  "select": {
    "tsx": "import * as React from \"react\"\nimport { Key } from \"@react-types/shared\";\n\nimport { mergeProps, } from \"@react-aria/utils\";\nimport { useHover } from \"@react-aria/interactions\";\nimport { useFocusRing } from \"@react-aria/focus\"\nimport { useButton } from \"@react-aria/button\";\n\nimport { cn, type StyleValue } from \"./utils\"\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\"\nimport styles from \"./Select.module.css\"\nimport { useListNavigation, useMergedRef, handleListKeyDown, type ItemData } from \"./Select.shared\"\n\nexport type SelectItemData = ItemData\n\nexport type SelectTriggerMode = \"click\" | \"hover\"\nexport type SelectMode = \"single\" | \"multiple\"\n\ninterface SelectStyleSlots {\n  root?: StyleValue;\n}\n\ntype SelectStylesProp = StylesProp<SelectStyleSlots>;\n\nexport interface SelectContextValue {\n  isOpen: boolean\n  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>\n  contentPlacement: \"top\" | \"bottom\"\n  setContentPlacement: React.Dispatch<React.SetStateAction<\"top\" | \"bottom\">>\n  triggerType: \"button\" | \"input\"\n  mode: SelectMode\n  selectedKey: Key | null\n  selectedKeys?: Set<Key>\n  selectedTextValue: string\n  onSelect: (key: Key) => void\n  onToggle?: (key: Key) => void\n  triggerRef: React.MutableRefObject<HTMLElement | null>\n  wrapperRef: React.MutableRefObject<HTMLElement | null>\n  contentRef: React.MutableRefObject<HTMLElement | null>\n  triggerProps: any\n  isFocusVisible: boolean\n  isPressed: boolean\n  isHovered: boolean\n  isDisabled: boolean\n  items: SelectItemData[]\n  registerItem: (key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => void\n  unregisterItem: (key: Key) => void\n  searchValue: string\n  setSearchValue: React.Dispatch<React.SetStateAction<string>>\n  filteredItems: SelectItemData[]\n  visibleKeys: Set<Key>\n  focusedKey: Key | null\n  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>\n  navigateToNextItem: () => void\n  navigateToPrevItem: () => void\n  selectFocusedItem: () => void\n  isFocusedItemSubmenu: () => boolean\n  maxItems: number\n  triggerMode: SelectTriggerMode\n  handleHoverIntent: (isHovering: boolean) => void\n  mouseMoveDetectedRef: React.MutableRefObject<boolean>\n  filter?: (item: any) => boolean\n  contentId: string\n}\n\nconst SelectContext = React.createContext<SelectContextValue | null>(null)\n\nexport function useSelectContext() {\n  const context = React.useContext(SelectContext)\n  if (!context) {\n    throw new Error(\"Select component must be used within Select root\")\n  }\n  return context\n}\n\nexport interface SelectProps<T = any> extends React.PropsWithChildren {\n  /** Selection mode: \"single\" for one item, \"multiple\" for multi-item selection */\n  mode?: SelectMode\n  /** External items array — used when items are provided as data rather than JSX */\n  items?: Array<T>\n  /** Controlled selected key for single-select mode */\n  selectedKey?: Key | null\n  /** Default selected key for uncontrolled single-select */\n  defaultSelectedKey?: Key | null\n  /** Controlled selected keys for multi-select mode */\n  selectedKeys?: Key[]\n  /** Default selected keys for uncontrolled multi-select */\n  defaultSelectedKeys?: Key[]\n  /** Default display text shown in the trigger when nothing is selected */\n  defaultValue?: string | null\n  /** Display text for the currently selected value — used for SSR/SSG to avoid\n   * flash of placeholder before items register. Provide alongside selectedKey or\n   * defaultSelectedKey so the correct label renders on the first pass. */\n  valueLabel?: string\n  /** Called when selection changes; receives a single key (single) or key array (multiple) */\n  onSelectionChange?: (value: any) => void\n  /** Disables the entire select and prevents interaction */\n  isDisabled?: boolean\n  /** Focuses the trigger automatically on mount */\n  autoFocus?: boolean\n  /** Maximum number of items visible before the dropdown scrolls */\n  maxItems?: number\n  /** Additional CSS class for the root wrapper */\n  className?: string\n  /** How the dropdown opens: \"click\" (default) or \"hover\" */\n  trigger?: SelectTriggerMode\n  /** Custom filter predicate applied to the items array */\n  filter?: (item: T) => boolean\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: SelectStylesProp;\n}\n\nconst resolveSelectBaseStyles = createStylesResolver(['root'] as const);\n\nconst Select = React.forwardRef<HTMLDivElement, SelectProps<any>>(\n  (\n    {\n      mode = \"single\",\n      items: propItems = [],\n      selectedKey: controlledSelectedKey,\n      defaultSelectedKey,\n      selectedKeys: controlledSelectedKeys,\n      defaultSelectedKeys = [],\n      defaultValue,\n      valueLabel,\n      onSelectionChange,\n      isDisabled = false,\n      autoFocus = false,\n      maxItems = 6,\n      children,\n      className,\n      trigger: triggerMode = \"click\",\n      filter,\n      styles: stylesProp,\n    },\n    ref\n  ) => {\n    const triggerRef = React.useRef<HTMLElement>(null)\n    const wrapperRef = React.useRef<HTMLElement>(null)\n    const contentRef = React.useRef<HTMLElement>(null)\n    const mouseMoveDetectedRef = React.useRef(true)\n    const itemExtrasRef = React.useRef<Map<Key, { onSelect?: () => void; isSubmenuTrigger?: boolean }>>(new Map())\n    const [isOpen, setIsOpen] = React.useState(false)\n    const [contentPlacement, setContentPlacement] = React.useState<\"top\" | \"bottom\">(\"bottom\")\n    const contentId = React.useId()\n    const hoverTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)\n\n    const handleHoverIntent = React.useCallback((isHovering: boolean) => {\n      if (triggerMode !== \"hover\" || isDisabled) return\n      if (hoverTimeoutRef.current) {\n        clearTimeout(hoverTimeoutRef.current)\n        hoverTimeoutRef.current = null\n      }\n\n      if (isHovering) {\n        setIsOpen(true)\n      } else {\n        hoverTimeoutRef.current = setTimeout(() => {\n          setIsOpen(false)\n        }, 100)\n      }\n    }, [triggerMode, isDisabled])\n\n    React.useEffect(() => {\n      if (!isOpen || triggerMode !== \"hover\" || isDisabled) return\n\n      const handleMouseMove = (e: MouseEvent) => {\n        const target = e.target as HTMLElement\n        const isOver = wrapperRef.current?.contains(target) ||\n          contentRef.current?.contains(target)\n\n        if (!isOver) {\n          handleHoverIntent(false)\n        } else {\n          handleHoverIntent(true)\n        }\n      }\n\n      window.addEventListener(\"mousemove\", handleMouseMove)\n      return () => window.removeEventListener(\"mousemove\", handleMouseMove)\n    }, [isOpen, triggerMode, isDisabled, handleHoverIntent])\n\n    React.useEffect(() => {\n      return () => {\n        if (hoverTimeoutRef.current) {\n          clearTimeout(hoverTimeoutRef.current)\n        }\n      }\n    }, [])\n\n    const [uncontrolledSelectedKey, setUncontrolledSelectedKey] = React.useState<Key | null>(\n      defaultSelectedKey ?? null\n    )\n    const [uncontrolledSelectedKeys, setUncontrolledSelectedKeys] = React.useState<Set<Key>>(\n      new Set(defaultSelectedKeys)\n    )\n    const [selectedTextValue, setSelectedTextValue] = React.useState(valueLabel ?? defaultValue ?? \"\")\n    const selectedKey = controlledSelectedKey !== undefined ? controlledSelectedKey : uncontrolledSelectedKey\n    const selectedKeys = controlledSelectedKeys !== undefined ? new Set(controlledSelectedKeys) : uncontrolledSelectedKeys\n\n    const nav = useListNavigation({\n      isOpen,\n      externalItems: propItems.length > 0 ? propItems : undefined,\n      filter: filter ? (item: any) => filter({ ...item, label: item.textValue } as any) : undefined\n    })\n\n    const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, onSelect?: () => void, isSubmenuTrigger?: boolean) => {\n      nav.registerItem(key, textValue, isDisabled)\n      itemExtrasRef.current.set(key, { onSelect, isSubmenuTrigger })\n    }, [nav.registerItem])\n\n    const unregisterItem = React.useCallback((key: Key) => {\n      nav.unregisterItem(key)\n      itemExtrasRef.current.delete(key)\n    }, [nav.unregisterItem])\n\n    const isFocusedItemSubmenu = React.useCallback(() => {\n      if (nav.focusedKey === null) return false\n      return itemExtrasRef.current.get(nav.focusedKey)?.isSubmenuTrigger ?? false\n    }, [nav.focusedKey])\n\n    const onSelect = React.useCallback((key: Key) => {\n      const item = nav.items.find(i => i.key === key)\n      if (item) {\n        setSelectedTextValue(item.textValue)\n      }\n      if (controlledSelectedKey === undefined) {\n        setUncontrolledSelectedKey(key)\n      }\n      onSelectionChange?.(key)\n      setIsOpen(false)\n      nav.setSearchValue(\"\")\n    }, [controlledSelectedKey, onSelectionChange, nav.items])\n\n    const onToggle = React.useCallback((key: Key) => {\n      const newKeys = new Set(selectedKeys)\n      if (newKeys.has(key)) {\n        newKeys.delete(key)\n      } else {\n        newKeys.add(key)\n      }\n      if (controlledSelectedKeys === undefined) {\n        setUncontrolledSelectedKeys(newKeys)\n      }\n      onSelectionChange?.(Array.from(newKeys))\n    }, [selectedKeys, controlledSelectedKeys, onSelectionChange])\n\n    const selectFocusedItem = React.useCallback(() => {\n      if (nav.focusedKey !== null) {\n        const item = nav.enabledFilteredItems.find(item => item.key === nav.focusedKey)\n        if (item && !item.isDisabled) {\n          const extras = itemExtrasRef.current.get(nav.focusedKey)\n          if (extras?.onSelect) {\n            extras.onSelect()\n          } else if (mode === \"multiple\") {\n            onToggle(nav.focusedKey)\n          } else {\n            onSelect(nav.focusedKey)\n          }\n        }\n      }\n    }, [nav.focusedKey, nav.enabledFilteredItems, onSelect, onToggle, mode])\n\n    React.useEffect(() => {\n      if (isOpen) {\n        // Only initialize focusedKey if it's not already valid\n        if (nav.focusedKey !== null && nav.visibleKeys.has(nav.focusedKey)) {\n          const item = nav.filteredItems.find(item => item.key === nav.focusedKey)\n          if (item && !item.isDisabled) {\n            return  // Keep current keyboard focus, don't reset it\n          }\n        }\n\n        const focusKey = mode === \"multiple\" && selectedKeys.size > 0\n          ? Array.from(selectedKeys)[0]\n          : selectedKey\n\n        if (focusKey !== null && nav.visibleKeys.has(focusKey)) {\n          const item = nav.filteredItems.find(item => item.key === focusKey)\n          if (item && !item.isDisabled) {\n            nav.setFocusedKey(focusKey)\n            return\n          }\n        }\n        if (nav.enabledFilteredItems.length > 0) {\n          nav.setFocusedKey(nav.enabledFilteredItems[0].key)\n        } else {\n          nav.setFocusedKey(null)\n        }\n      }\n    }, [isOpen, selectedKey, selectedKeys, nav.visibleKeys, nav.enabledFilteredItems, nav.filteredItems, mode, nav.focusedKey])\n\n    const { buttonProps, isPressed } = useButton({\n      isDisabled,\n      onPress: (e) => {\n        if (isDisabled) return\n        // Keyboard interactions are handled by onKeyDown to prevent conflicts\n        if (e.pointerType !== 'keyboard') {\n          setIsOpen(prev => !prev)\n        }\n      },\n    }, triggerRef)\n    const { focusProps, isFocusVisible } = useFocusRing()\n    const { hoverProps, isHovered } = useHover({\n      isDisabled,\n      onHoverStart: () => handleHoverIntent(true),\n      onHoverEnd: () => handleHoverIntent(false),\n    })\n\n    const triggerProps = mergeProps(buttonProps, focusProps, hoverProps, {\n      'aria-haspopup': 'listbox' as const,\n      'aria-expanded': isOpen,\n      'aria-controls': isOpen ? contentId : undefined,\n      'aria-disabled': isDisabled || undefined,\n      onKeyDown: (e: React.KeyboardEvent) => {\n        if (!isOpen) {\n          if (e.key === 'ArrowDown' || e.key === 'Enter' || (e.key === ' ' && !isDisabled)) {\n            e.preventDefault()\n            setIsOpen(true)\n          }\n          return\n        }\n\n        handleListKeyDown(e, {\n          navigateNext: nav.navigateToNextItem,\n          navigatePrev: nav.navigateToPrevItem,\n          confirm: selectFocusedItem,\n          close: () => {\n            setIsOpen(false)\n            nav.setSearchValue(\"\")\n            triggerRef.current?.focus()\n          },\n          filteredItems: nav.filteredItems,\n          setFocusedKey: nav.setFocusedKey,\n        })\n      },\n    })\n\n    React.useEffect(() => {\n      if (autoFocus && triggerRef.current) {\n        triggerRef.current.focus({ preventScroll: true })\n      }\n    }, [autoFocus])\n\n    React.useEffect(() => {\n      if (mode === \"single\") {\n        if (selectedKey === null) {\n          setSelectedTextValue(\"\")\n        } else {\n          const selectedItem = nav.items.find(item => item.key === selectedKey)\n          if (selectedItem) {\n            setSelectedTextValue(selectedItem.textValue)\n          } else if (valueLabel !== undefined) {\n            setSelectedTextValue(valueLabel)\n          } else if (defaultValue !== undefined && defaultValue !== null) {\n            setSelectedTextValue(defaultValue)\n          }\n        }\n      }\n    }, [selectedKey, nav.items, mode, defaultValue, valueLabel])\n\n    const rootRef = useMergedRef<HTMLDivElement>(wrapperRef, ref)\n\n    const childrenArray = React.Children.toArray(children)\n    const trigger = childrenArray.find(child => React.isValidElement(child) && (\n      (child.type as any)?.displayName === 'SelectTrigger' ||\n      (child.type as any)?.displayName === 'SearchableTrigger'\n    ))\n    const contentItems = childrenArray.filter(child => React.isValidElement(child) && ((child.type as any)?.displayName === 'SelectContent' || (child.type as any)?.displayName === 'SearchableContent'))\n    const otherContent = childrenArray.filter(child => !React.isValidElement(child) || (\n      (child.type as any)?.displayName !== 'SelectTrigger' &&\n      (child.type as any)?.displayName !== 'SearchableTrigger' &&\n      (child.type as any)?.displayName !== 'SelectContent' &&\n      (child.type as any)?.displayName !== 'SearchableContent'\n    ))\n    const triggerType = React.isValidElement(trigger) && (trigger.type as any)?.displayName === 'SearchableTrigger'\n      ? 'input'\n      : 'button'\n\n    const resolvedStyles = resolveSelectBaseStyles(stylesProp);\n\n    return (\n      <SelectContext.Provider\n        value={{\n          isOpen,\n          setIsOpen,\n          contentPlacement,\n          setContentPlacement,\n          triggerType,\n          mode,\n          selectedKey,\n          selectedKeys: mode === \"multiple\" ? selectedKeys : undefined,\n          selectedTextValue,\n          onSelect,\n          onToggle: mode === \"multiple\" ? onToggle : undefined,\n          triggerRef,\n          wrapperRef,\n          contentRef,\n          triggerProps,\n          isFocusVisible,\n          isPressed,\n          isHovered,\n          isDisabled,\n          items: nav.items,\n          registerItem,\n          unregisterItem,\n          searchValue: nav.searchValue,\n          setSearchValue: nav.setSearchValue,\n          filteredItems: nav.filteredItems,\n          visibleKeys: nav.visibleKeys,\n          focusedKey: nav.focusedKey,\n          setFocusedKey: nav.setFocusedKey,\n          navigateToNextItem: nav.navigateToNextItem,\n          navigateToPrevItem: nav.navigateToPrevItem,\n          selectFocusedItem,\n          isFocusedItemSubmenu,\n          maxItems,\n          triggerMode,\n          handleHoverIntent,\n          mouseMoveDetectedRef,\n          filter,\n          contentId,\n        }}\n      >\n        <div\n          ref={rootRef}\n          className={cn('select', styles.select, className, resolvedStyles.root)}\n          data-mode={mode}\n        >\n          {otherContent}\n          {trigger}\n          {contentItems}\n        </div>\n      </SelectContext.Provider>\n    )\n  }\n)\nSelect.displayName = \"Select\"\n\nexport { Select, SelectContext }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .select {\n    --disabled-opacity: 0.5;\n    --padding-x: calc(var(--spacing) * 2.00);\n    --padding-y: calc(var(--spacing) * 1.75);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    font-size: var(--font-size);\n\n    @apply p-0 gap-0 w-full flex-row items-center;\n\n    background-color: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base, 1px) solid var(--border-color);\n    border-radius: var(--radius);\n\n    @apply select-none cursor-pointer;\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n    }\n\n    &[data-pressed]:not([data-disabled]) {\n      background-color: var(--pressed-background);\n    }\n\n    &[aria-expanded=\"true\"] {\n      background-color: var(--hover-background);\n    }\n  }\n\n  .trigger {\n    @apply flex items-stretch flex-1 gap-0 w-full h-full min-h-0;\n\n    background: transparent;\n\n    @apply border-none cursor-pointer select-none;\n\n    @media (hover: hover) {\n      &:not(:disabled):hover .icon-section,\n      &:not(:disabled):hover .value-section:not(:empty) {\n        background-color: var(--hover-background);\n      }\n    }\n\n    &:focus-visible {\n      box-shadow: 0 0 0 2px var(--focus-ring-background), 0 0 0 4px var(--ring-color);\n      @apply outline-none;\n    }\n\n    :global(.group) &:focus-visible {\n      @apply outline-none;\n    }\n  }\n\n  button.trigger { @apply p-0; }\n\n  .value-section {\n    @apply flex items-center flex-1 min-w-0 gap-0.5;\n\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n    font-size: var(--font-size);\n\n    &:only-child {\n      border-radius: var(--inner-radius);\n      justify-content: center;\n    }\n    &:empty {\n      flex: 0;\n      padding: 0;\n      min-width: auto;\n    }\n  }\n\n  .icon-section {\n    @apply flex items-center justify-center shrink-0;\n    padding: var(--padding-y) var(--padding-x);\n    border-radius: 0 var(--inner-radius) var(--inner-radius) 0;\n  }\n\n  .icon {\n    @apply flex items-center justify-center w-4 h-4 opacity-70;\n  }\n\n  .trigger[aria-expanded=\"true\"] .icon,\n  .trigger[data-open=\"true\"] .icon {\n    transform: rotate(180deg);\n  }\n\n  .value {\n    @apply flex items-center flex-1 min-w-0 gap-2 bg-transparent border-none p-0;\n    cursor: inherit;\n  }\n\n  .value-icon {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n    color: var(--foreground);\n  }\n\n  .value-text {\n    font-weight: var(--font-weight-medium);\n    @apply overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .content,\n  .sub-content {\n    --padding-x: calc(var(--spacing) * 1.5);\n    --padding-y: var(--spacing);\n    --radius: var(--radius-sm, 0.375rem);\n    --inner-radius: calc(var(--radius) - var(--border-width-base, 1px));\n    overflow: hidden;\n    background-color: var(--content-background);\n    border: var(--border-width-base, 1px) solid var(--content-border);\n    border-radius: var(--radius);\n  }\n\n  .content-root,\n  .sub-content-root {\n    position: absolute;\n  }\n\n  .content {\n    &[data-state=\"open\"][data-placement=\"bottom\"] { animation: slide-in-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"open\"][data-placement=\"top\"] { animation: slide-in-from-bottom 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"bottom\"] { animation: slide-out-from-top 0.15s var(--ease-snappy-pop); }\n    &[data-state=\"closed\"][data-placement=\"top\"] { animation: slide-out-from-bottom 0.15s var(--ease-snappy-pop); }\n  }\n\n  .list {\n    @apply space-y-1;\n  }\n\n  .item {\n    --item-padding-x: var(--padding-x);\n    --item-padding-y: calc(var(--padding-y) * 1.15);\n\n    @apply flex items-center gap-2 outline-none cursor-default select-none;\n    padding: var(--item-padding-y) var(--item-padding-x);\n\n    border-radius: var(--inner-radius);\n    font-size: var(--font-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--item-foreground);\n\n    &[data-selected=\"true\"] {\n      color: var(--item-foreground);\n    }\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n    &[data-highlighted=\"true\"] {\n      background-color: var(--item-background-hover);\n    }\n  }\n\n  .item-content {\n    @apply flex flex-col flex-1 min-w-0;\n  }\n\n  .item-text {\n    @apply min-w-0 overflow-hidden text-ellipsis whitespace-nowrap;\n  }\n\n  .item-description {\n    font-size: var(--font-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--item-description-color);\n    @apply min-w-0 whitespace-normal break-words;\n  }\n\n  .item-icon, .item-indicator {\n    @apply flex items-center justify-center shrink-0 w-4 h-4;\n  }\n\n  .item-icon { color: var(--item-icon-color); }\n  .item-indicator { color: var(--item-indicator-color); margin-left: auto; }\n\n  .item-with-description { @apply items-start py-2; }\n  .item-icon-with-description, .item-indicator-with-description { @apply mt-0.5; }\n\n  .separator {\n    @apply my-1 -mx-1 h-px;\n    background-color: var(--content-border); /* Reuses content border var */\n  }\n\n  .placeholder {\n    color: var(--placeholder-color);\n  }\n\n  .icon-prefix {\n    @apply inline-flex items-center shrink-0;\n  }\n\n  .select[data-mode=\"multiple\"] .item { gap: 0.5rem; }\n\n  .search-trigger {\n    @apply flex items-stretch relative bg-transparent cursor-text overflow-hidden;\n    border-radius: var(--inner-radius);\n    transition: box-shadow 150ms var(--ease-snappy-pop), border-color 150ms var(--ease-snappy-pop);\n\n    --input-active-border-color: transparent;\n    --input-active-box-shadow: none;\n\n    &:focus-within {\n      @apply outline-none;\n      box-shadow: 0 0 0 1px var(--search-focus-ring);\n      z-index: 1;\n    }\n  }\n\n  .search-value-section {\n    @apply p-0;\n    border-radius: var(--inner-radius) 0 0 var(--inner-radius);\n  }\n\n  .input {\n    padding: var(--padding-y) calc(var(--padding-x) * 1.50);\n    padding-right: calc(var(--padding-x) * 2 + 1rem);\n    @apply border-none rounded-none shadow-none bg-transparent;\n\n    &[data-active], &[data-focus-visible] {\n      @apply border-none shadow-none;\n    }\n  }\n\n  .search-content-input {\n    padding-inline: calc(var(--padding-x) * 1.50);\n    @apply border-none rounded-none bg-transparent;\n  }\n\n  .search-icon-section {\n    @apply absolute right-0 top-0 bottom-0 flex items-center justify-center bg-transparent pointer-events-none;\n    padding-inline: var(--padding-x);\n  }\n\n\n  .search-wrapper {\n    @apply overflow-hidden;\n    border-bottom: var(--border-width-base, 1px) solid var(--content-border);\n  }\n\n  .content[data-placement=\"top\"] .search-wrapper {\n    border-radius: 0;\n    border-bottom: none;\n    border-top: var(--border-width-base, 1px) solid var(--content-border);\n  }\n\n  .sub-trigger {\n    --subtrigger-padding-x: var(--padding-x);\n    --subtrigger-padding-y: var(--padding-y);\n\n    @apply flex items-center gap-2 cursor-default select-none outline-none;\n    padding: var(--subtrigger-padding-y) var(--subtrigger-padding-x);\n    border-radius: var(--inner-radius);\n    font-size: var(--font-size);\n    font-weight: var(--font-weight-medium);\n    color: var(--subtrigger-foreground);\n\n    &[data-highlighted=\"true\"],\n    &[data-state=\"open\"]:not([data-highlighted=\"true\"]) {\n      background-color: var(--subtrigger-background-hover);\n    }\n\n    &[data-disabled] {\n      opacity: var(--disabled-opacity, 0.5);\n      pointer-events: none;\n    }\n  }\n\n  .sub-trigger-chevron {\n    @apply shrink-0 ml-auto w-4 h-4 opacity-60;\n  }\n\n  .sub-content {\n    min-width: 160px;\n    max-width: 320px;\n  }\n\n  @keyframes slide-in-from-top { from { opacity: 0; translate: 0 -2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-in-from-bottom { from { opacity: 0; translate: 0 2px; } to { opacity: 1; translate: 0 0; } }\n  @keyframes slide-out-from-top { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 -2px; } }\n  @keyframes slide-out-from-bottom { from { opacity: 1; translate: 0 0; } to { opacity: 0; translate: 0 2px; } }\n}\n",
    "cssTypes": "declare const styles: {\n  select: string;\n  trigger: string;\n  input: string;\n  \"search-trigger\": string;\n  \"search-value-section\": string;\n  \"search-content-input\": string;\n  \"search-icon-section\": string;\n  \"search-wrapper\": string;\n  \"value-section\": string;\n  \"icon-section\": string;\n  icon: string;\n  value: string;\n  \"value-icon\": string;\n  \"value-text\": string;\n  \"value-chevron\": string;\n  \"content-root\": string;\n  content: string;\n  viewport: string;\n  list: string;\n  item: string;\n  \"item-icon\": string;\n  \"item-indicator\": string;\n  \"item-text\": string;\n  \"item-content\": string;\n  \"item-description\": string;\n  \"item-with-description\": string;\n  \"item-icon-with-description\": string;\n  \"item-indicator-with-description\": string;\n  separator: string;\n  \"scroll-button\": string;\n  placeholder: string;\n  \"icon-prefix\": string;\n  \"sub-trigger\": string;\n  \"sub-trigger-chevron\": string;\n  \"sub-content-root\": string;\n  \"sub-content\": string;\n};\n\nexport default styles;\n"
  },
  "slider": {
    "tsx": "\"use client\"\n\nimport * as React from 'react';\n\nimport { useFocusRing } from '@react-aria/focus';\n\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from '@/lib/styles';\nimport { asElementProps } from '@/lib/react-aria';\n\nimport css from \"./Slider.module.css\";\n\ntype SliderSize = 'sm' | 'md' | 'lg';\n\nexport interface SliderStyleSlots {\n  root?: StyleValue;\n  track?: StyleValue;\n  range?: StyleValue;\n  thumb?: StyleValue;\n}\n\nexport type SliderStylesProp = StylesProp<SliderStyleSlots>;\n\nconst resolveSliderBaseStyles = createStylesResolver(['root', 'track', 'range', 'thumb'] as const);\n\ninterface SliderRootProps {\n  /** Size of the slider track and thumb */\n  size?: SliderSize;\n  /** Whether the slider is disabled */\n  disabled?: boolean;\n  /** Additional CSS class for the slider container */\n  className?: string;\n  /** Inline styles for the slider container */\n  style?: React.CSSProperties;\n  /** Minimum value of the slider range */\n  min?: number;\n  /** Maximum value of the slider range */\n  max?: number;\n  /** Step increment between values */\n  step?: number;\n  /** Initial value(s) for uncontrolled usage */\n  defaultValue?: number | number[];\n  /** Controlled value(s) for the slider thumb(s) */\n  value?: number | number[];\n  /** Called when the value changes */\n  onValueChange?: (value: number[]) => void;\n  /** Orientation of the slider track */\n  orientation?: 'horizontal' | 'vertical';\n  /** Accessible label for the slider */\n  'aria-label'?: string;\n  /** ID of an element that labels the slider */\n  'aria-labelledby'?: string;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: SliderStylesProp;\n}\n\nconst SliderContext = React.createContext<{\n  size: SliderSize;\n  disabled?: boolean;\n} | null>(null);\n\nfunction clamp(value: number, min: number, max: number): number {\n  return Math.min(Math.max(value, min), max);\n}\n\nfunction snapToStep(value: number, min: number, max: number, step: number): number {\n  const snapped = Math.round((value - min) / step) * step + min;\n  return clamp(snapped, min, max);\n}\n\ninterface ThumbProps {\n  index: number;\n  value: number;\n  min: number;\n  max: number;\n  step: number;\n  disabled?: boolean;\n  trackRef: React.RefObject<HTMLDivElement | null>;\n  onValueChange: (index: number, value: number) => void;\n  'aria-label'?: string;\n  'aria-labelledby'?: string;\n  className?: string;\n}\n\nfunction SliderThumbInternal({\n  index,\n  value,\n  min,\n  max,\n  step,\n  disabled,\n  trackRef,\n  onValueChange,\n  'aria-label': ariaLabel,\n  'aria-labelledby': ariaLabelledBy,\n  className,\n}: ThumbProps) {\n  const thumbRef = React.useRef<HTMLDivElement>(null);\n  const [isDragging, setIsDragging] = React.useState(false);\n  const { focusProps, isFocusVisible } = useFocusRing();\n\n  const percent = ((value - min) / (max - min)) * 100;\n\n  const getValueFromPointer = React.useCallback((clientX: number) => {\n    const track = trackRef.current;\n    if (!track) return value;\n\n    const rect = track.getBoundingClientRect();\n    const percent = clamp((clientX - rect.left) / rect.width, 0, 1);\n    const rawValue = percent * (max - min) + min;\n    return snapToStep(rawValue, min, max, step);\n  }, [trackRef, min, max, step, value]);\n\n  const handlePointerDown = (e: React.PointerEvent) => {\n    if (disabled) return;\n    e.preventDefault();\n    setIsDragging(true);\n    thumbRef.current?.setPointerCapture(e.pointerId);\n    thumbRef.current?.focus();\n  };\n\n  const handlePointerMove = (e: React.PointerEvent) => {\n    if (!isDragging || disabled) return;\n    const newValue = getValueFromPointer(e.clientX);\n    if (newValue !== value) {\n      onValueChange(index, newValue);\n    }\n  };\n\n  const handlePointerUp = (e: React.PointerEvent) => {\n    if (isDragging) {\n      setIsDragging(false);\n      thumbRef.current?.releasePointerCapture(e.pointerId);\n    }\n  };\n\n  const handleKeyDown = (e: React.KeyboardEvent) => {\n    if (disabled) return;\n\n    let newValue = value;\n    const largeStep = step * 10;\n\n    switch (e.key) {\n      case 'ArrowRight':\n      case 'ArrowUp':\n        newValue = clamp(value + step, min, max);\n        break;\n      case 'ArrowLeft':\n      case 'ArrowDown':\n        newValue = clamp(value - step, min, max);\n        break;\n      case 'PageUp':\n        newValue = clamp(value + largeStep, min, max);\n        break;\n      case 'PageDown':\n        newValue = clamp(value - largeStep, min, max);\n        break;\n      case 'Home':\n        newValue = min;\n        break;\n      case 'End':\n        newValue = max;\n        break;\n      default:\n        return;\n    }\n\n    e.preventDefault();\n    if (newValue !== value) {\n      onValueChange(index, newValue);\n    }\n  };\n\n  return (\n    <div\n      ref={thumbRef}\n      role=\"slider\"\n      tabIndex={disabled ? -1 : 0}\n      aria-valuemin={min}\n      aria-valuemax={max}\n      aria-valuenow={value}\n      aria-disabled={disabled || undefined}\n      aria-label={ariaLabel}\n      aria-labelledby={ariaLabelledBy}\n      className={cn('slider thumb', css.thumb, className)}\n      style={{ left: `${percent}%` }}\n      data-dragging={isDragging || undefined}\n      data-focus-visible={isFocusVisible || undefined}\n      onPointerDown={handlePointerDown}\n      onPointerMove={handlePointerMove}\n      onPointerUp={handlePointerUp}\n      onPointerCancel={handlePointerUp}\n      onKeyDown={handleKeyDown}\n      {...asElementProps<\"div\">(focusProps)}\n    />\n  );\n}\n\n/** Horizontal slider for selecting a value within a range */\nconst Root = React.forwardRef<HTMLDivElement, SliderRootProps>(\n  (\n    {\n      className,\n      styles,\n      size = 'md',\n      disabled,\n      style,\n      defaultValue,\n      value: controlledValue,\n      onValueChange,\n      min = 0,\n      max = 100,\n      step = 1,\n      orientation = 'horizontal',\n      'aria-label': ariaLabel,\n      'aria-labelledby': ariaLabelledBy,\n      ...props\n    },\n    ref\n  ) => {\n    const trackRef = React.useRef<HTMLDivElement>(null);\n\n    // Normalize to arrays\n    const normalizeValue = (v: number | number[] | undefined): number[] | undefined => {\n      if (v === undefined) return undefined;\n      return Array.isArray(v) ? v : [v];\n    };\n\n    const [internalValues, setInternalValues] = React.useState<number[]>(() => {\n      return normalizeValue(defaultValue) ?? normalizeValue(controlledValue) ?? [min];\n    });\n\n    const isControlled = controlledValue !== undefined;\n    const values = isControlled ? normalizeValue(controlledValue)! : internalValues;\n\n    const resolved = resolveSliderBaseStyles(styles);\n\n    const handleValueChange = React.useCallback((index: number, newValue: number) => {\n      const newValues = [...values];\n      newValues[index] = newValue;\n\n      if (!isControlled) {\n        setInternalValues(newValues);\n      }\n      onValueChange?.(newValues);\n    }, [values, isControlled, onValueChange]);\n\n    const handleTrackClick = (e: React.PointerEvent) => {\n      if (disabled) return;\n      // Only handle clicks directly on the track, not on thumbs\n      if (e.target !== trackRef.current) return;\n\n      const track = trackRef.current;\n      if (!track) return;\n\n      const rect = track.getBoundingClientRect();\n      const percent = clamp((e.clientX - rect.left) / rect.width, 0, 1);\n      const rawValue = percent * (max - min) + min;\n      const newValue = snapToStep(rawValue, min, max, step);\n\n      // Find the closest thumb and update it\n      let closestIndex = 0;\n      let closestDistance = Math.abs(values[0] - newValue);\n      for (let i = 1; i < values.length; i++) {\n        const distance = Math.abs(values[i] - newValue);\n        if (distance < closestDistance) {\n          closestDistance = distance;\n          closestIndex = i;\n        }\n      }\n\n      handleValueChange(closestIndex, newValue);\n    };\n\n    return (\n      <SliderContext.Provider value={{ size, disabled }}>\n        <div\n          ref={ref}\n          data-size={size}\n          data-disabled={disabled || undefined}\n          data-orientation={orientation}\n          style={style}\n          className={cn('slider', css.slider, className, resolved.root)}\n          {...props}\n        >\n          <div\n            ref={trackRef}\n            className={cn('slider track', css.track, resolved.track)}\n            onPointerDown={handleTrackClick}\n          >\n            <div\n              className={cn('slider range', css.range, resolved.range)}\n              style={{\n                left: `${values.length === 1 ? 0 : ((values[0] - min) / (max - min)) * 100}%`,\n                right: `${values.length === 1 ? 100 - ((values[0] - min) / (max - min)) * 100 : 100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,\n              }}\n            />\n            {values.map((value, index) => (\n              <SliderThumbInternal\n                key={index}\n                index={index}\n                value={value}\n                min={min}\n                max={max}\n                step={step}\n                disabled={disabled}\n                trackRef={trackRef}\n                onValueChange={handleValueChange}\n                aria-label={ariaLabel}\n                aria-labelledby={ariaLabelledBy}\n                className={resolved.thumb}\n              />\n            ))}\n          </div>\n        </div>\n      </SliderContext.Provider>\n    );\n  }\n);\nRoot.displayName = 'SliderRoot';\n\nexport { Root };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .slider {\n    --disabled-opacity: 0.6;\n\n    @apply relative flex w-full items-center;\n    touch-action: none;\n    user-select: none;\n  }\n\n  .slider[data-size=\"sm\"] { @apply h-6; }\n  .slider[data-size=\"md\"] { @apply h-8; }\n  .slider[data-size=\"lg\"] { @apply h-10; }\n\n  .slider[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n  .track {\n    --track-height-sm: 0.25rem;\n    --track-height-md: 0.375rem;\n    --track-height-lg: 0.5rem;\n\n    @apply relative flex grow items-center;\n    flex-grow: 1;\n    overflow: visible;\n    border-radius: var(--radius-xs);\n    background-color: var(--slider-track-background);\n  }\n\n  .slider[data-size=\"sm\"] .track { height: var(--track-height-sm); }\n  .slider[data-size=\"md\"] .track { height: var(--track-height-md); }\n  .slider[data-size=\"lg\"] .track { height: var(--track-height-lg); }\n\n  .range {\n    @apply absolute h-full;\n    background-color: var(--slider-range-background-default);\n    transition: background-color 200ms var(--ease-snappy-pop);\n    border-radius: var(--radius-xs);\n  }\n\n  .slider[data-disabled] .range { background-color: var(--slider-range-background-disabled); }\n\n  .thumb {\n    --thumb-size-sm: 0.75rem;\n    --thumb-size-md: 1rem;\n    --thumb-size-lg: 1.25rem;\n\n    @apply absolute block;\n    background-color: var(--slider-thumb-background-default);\n    border-radius: 9999px;\n    outline: none;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n\n  .slider[data-size=\"sm\"] .thumb {\n    width: var(--thumb-size-sm);\n    height: var(--thumb-size-sm);\n  }\n\n  .slider[data-size=\"md\"] .thumb {\n    width: var(--thumb-size-md);\n    height: var(--thumb-size-md);\n  }\n\n  .slider[data-size=\"lg\"] .thumb {\n    width: var(--thumb-size-lg);\n    height: var(--thumb-size-lg);\n  }\n\n  .slider[data-disabled] .thumb {\n    background-color: var(--slider-thumb-background-disabled);\n    cursor: not-allowed;\n  }\n\n  .thumb[data-focus-visible] {\n    background-color: var(--slider-thumb-background-focus);\n    box-shadow: 0 0 0 3px var(--slider-thumb-ring);\n  }\n\n  .thumb[data-dragging] {\n    cursor: grabbing;\n    transform: translate(-50%, -50%) scale(1.1);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  readonly slider: string;\n  readonly track: string;\n  readonly range: string;\n  readonly thumb: string;\n};\n\nexport default styles;\n"
  },
  "switch": {
    "tsx": "\"use client\";\n\nimport React from \"react\";\n\nimport { mergeProps, } from \"@react-aria/utils\";\nimport { useHover } from \"@react-aria/interactions\";\nimport { useFocusRing } from \"@react-aria/focus\"\nimport { useSwitch } from \"@react-aria/switch\";\n\nimport { useToggleState } from \"react-stately\";\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\n\nimport styles from \"./Switch.module.css\";\n\n\n\ninterface SwitchStyleSlots {\n  root?: StyleValue;\n  track?: StyleValue;\n  thumb?: StyleValue;\n}\n\ntype SwitchStylesProp = StylesProp<SwitchStyleSlots>;\n\nconst resolveSwitchBaseStyles = createStylesResolver(['root', 'track', 'thumb'] as const);\n\nexport interface SwitchProps\n  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, \"type\" | \"size\" | \"onChange\" | \"checked\" | \"defaultChecked\"> {\n  /** Controlled selected (on) state */\n  isSelected?: boolean;\n  /** Called when the switch is toggled */\n  onChange?: (isSelected: boolean) => void;\n  /** Initial selected state for uncontrolled usage */\n  defaultSelected?: boolean;\n\n  /** Whether the switch is disabled */\n  isDisabled?: boolean;\n  /** Size of the switch */\n  size?: \"default\" | \"sm\";\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: SwitchStylesProp;\n}\n\n\nconst Switch = React.forwardRef<HTMLInputElement, SwitchProps>(\n  ({\n    className,\n    styles: stylesProp,\n    isDisabled = false,\n    isSelected: controlledSelected,\n    onChange,\n    defaultSelected,\n    size = \"default\",\n    ...props\n  },\n    ref\n  ) => {\n    const state = useToggleState({\n      isSelected: controlledSelected,\n      defaultSelected: defaultSelected ?? false,\n      onChange,\n    });\n\n    const inputRef = React.useRef<HTMLInputElement>(null);\n\n    // Extract aria-label from props if provided\n    const { \"aria-label\": ariaLabel, \"aria-labelledby\": ariaLabelledby, ...otherProps } = props;\n\n    const { inputProps, isSelected } = useSwitch(\n      {\n        isDisabled,\n        ...(ariaLabel && { \"aria-label\": ariaLabel }),\n        ...(ariaLabelledby && { \"aria-labelledby\": ariaLabelledby }),\n      },\n      state,\n      inputRef\n    );\n    const { focusProps, isFocusVisible } = useFocusRing();\n    const { hoverProps, isHovered } = useHover({ isDisabled });\n\n\n\n    React.useImperativeHandle(ref, () => inputRef.current!);\n\n    const resolved = resolveSwitchBaseStyles(stylesProp);\n\n    return (\n      <div\n        className={cn(\n          'switch',\n          styles.switch,\n          size === \"sm\" && styles[\"switch-sm\"],\n          className,\n          resolved.root\n        )}\n        data-selected={isSelected || undefined}\n        data-disabled={isDisabled || undefined}\n        data-focus-visible={isFocusVisible || undefined}\n        data-hovered={isHovered || undefined}\n      >\n        <div\n          className={cn(\n            'switch-track',\n            styles[\"switch-track\"],\n            resolved.track\n          )}\n        />\n        <div\n          className={cn(\n            'switch-thumb',\n            styles[\"switch-thumb\"],\n            resolved.thumb\n          )}\n        />\n        <input\n          ref={inputRef}\n          type=\"checkbox\"\n          className=\"absolute inset-0 w-full h-full opacity-0 cursor-pointer\"\n          aria-checked={isSelected}\n          {...mergeProps(inputProps, focusProps, hoverProps)}\n          {...otherProps}\n        />\n      </div>\n    );\n  }\n);\n\nSwitch.displayName = \"Switch\";\n\nexport { Switch };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .switch {\n    --radius: 9999px;\n    --inner-radius: calc(var(--radius) - var(--border-width-base));\n\n    --width: 2.75rem;\n    --height: 1.5rem;\n    --thumb-size: 1rem;\n    --thumb-offset: 0.25rem;\n\n    --disabled-opacity: 0.6;\n\n    @apply relative inline-flex cursor-pointer items-center;\n    user-select: none;\n    width: var(--width);\n    height: var(--height);\n  }\n\n  .switch-track {\n    @apply absolute inset-0;\n    transition: background-color 180ms var(--ease-snappy-pop), border-color 180ms var(--ease-snappy-pop), transform 180ms var(--ease-snappy-pop);\n    background-color: var(--track-background-unchecked);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius);\n  }\n\n  .switch:active:not([data-disabled]) .switch-track {\n    transform: scale(0.98);\n  }\n\n  .switch-thumb {\n    @apply absolute top-0 bottom-0 my-auto;\n    left: var(--thumb-offset);\n    width: var(--thumb-size);\n    height: var(--thumb-size);\n    transition: left 180ms var(--ease-snappy-pop), background-color 180ms var(--ease-snappy-pop);\n    background-color: var(--thumb-background-unchecked);\n    border-radius: var(--inner-radius);\n    z-index: 1;\n    pointer-events: none;\n  }\n\n  .switch[data-selected] .switch-track {\n    background-color: var(--track-background-checked);\n    border-color: var(--border-checked);\n  }\n\n  .switch[data-selected] .switch-thumb {\n    background-color: var(--thumb-background-checked);\n    left: calc(var(--width) - var(--thumb-size) - var(--thumb-offset));\n  }\n\n  @media (hover: hover) {\n    .switch[data-selected]:not([data-disabled]):hover .switch-track {\n      border-color: var(--border-hover);\n    }\n  }\n\n  .switch[data-selected]:not([data-disabled]):active .switch-track {\n    border-color: var(--border-active);\n  }\n\n  .switch[data-disabled] {\n    opacity: var(--disabled-opacity);\n    cursor: not-allowed;\n  }\n\n\n\n  .switch[data-focus-visible] {\n    box-shadow: var(--focus-ring);\n  }\n\n  .switch-sm {\n    --width: 1.75rem;\n    --height: 1rem;\n    --thumb-size: 0.625rem;\n    --thumb-offset: 0.1875rem;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  switch: string;\n  \"switch-track\": string;\n  \"switch-thumb\": string;\n  \"switch-sm\": string;\n\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  },
  "table": {
    "tsx": "\"use client\";\n\nimport { useState } from \"react\";\nimport { cn } from \"./utils\";\n\nexport interface Column<T> {\n  /** Key of the data row object to display in this column */\n  key: keyof T;\n  /** Column header label displayed in the table head */\n  label: string;\n  /** Whether the column supports sorting (reserved for future use) */\n  sortable?: boolean;\n  /** Whether a filter input is shown for this column when showFilters is enabled */\n  filterable?: boolean;\n  /** Custom render function for the cell; receives the cell value and full row */\n  render?: (value: any, row: T) => React.ReactNode;\n}\n\nexport interface TableProps<T> {\n  /** Array of data rows to display */\n  data: T[];\n  /** Column definitions including key, label, and optional render function */\n  columns: Column<T>[];\n  /** Whether to show filter inputs above the table */\n  showFilters?: boolean;\n  /** Called when a table row is clicked */\n  onRowClick?: (row: T) => void;\n  /** Called when any column filter value changes */\n  onFilterChange?: (filters: Record<string, string>) => void;\n}\n\nexport function Table<T extends Record<string, any>>({\n  data,\n  columns,\n  showFilters = false,\n  onRowClick,\n  onFilterChange,\n}: TableProps<T>) {\n  const [filters, setFilters] = useState<Record<string, string>>({});\n\n  const filterableColumns = columns.filter((col) => col.filterable);\n\n  const handleFilterChange = (columnKey: string, value: string) => {\n    const newFilters = { ...filters, [columnKey]: value };\n    setFilters(newFilters);\n    onFilterChange?.(newFilters);\n  };\n\n  const filteredData = data.filter((row) =>\n    Object.entries(filters).every(([key, filterValue]) => {\n      if (!filterValue) return true;\n      const cellValue = String(row[key]).toLowerCase();\n      return cellValue.includes(filterValue.toLowerCase());\n    })\n  );\n\n  return (\n    <div className=\"w-full\">\n      {showFilters && filterableColumns.length > 0 && (\n        <div className=\"mb-4 p-4 bg-background-900 rounded-sm border border-background-800\">\n          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">\n            {filterableColumns.map((col) => (\n              <div key={String(col.key)}>\n                <label className=\"block text-sm font-medium text-foreground-300 mb-2\">\n                  {col.label}\n                </label>\n                <input\n                  type=\"text\"\n                  value={filters[String(col.key)] || \"\"}\n                  onChange={(e) =>\n                    handleFilterChange(String(col.key), e.target.value)\n                  }\n                  placeholder={`Filter by ${col.label.toLowerCase()}`}\n                  className=\"w-full px-3 py-2 rounded-md border border-background-700 bg-background-950 text-foreground-50 placeholder-foreground-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-all\"\n                />\n              </div>\n            ))}\n          </div>\n        </div>\n      )}\n\n      <div className=\"overflow-x-auto border border-background-800 rounded-md\">\n        <table className=\"w-full text-sm\">\n          <thead>\n            <tr className=\"border-b border-background-800 bg-background-900\">\n              {columns.map((col) => (\n                <th\n                  key={String(col.key)}\n                  className=\"px-4 py-3 text-left font-semibold text-foreground-200\"\n                >\n                  {col.label}\n                </th>\n              ))}\n            </tr>\n          </thead>\n          <tbody>\n            {filteredData.length > 0 ? (\n              filteredData.map((row, idx) => (\n                <tr\n                  key={idx}\n                  onClick={() => onRowClick?.(row)}\n                  className={cn(\n                    \"border-b border-background-800 last:border-b-0\",\n                    onRowClick\n                      ? \"cursor-pointer hover:bg-background-900 transition-colors\"\n                      : \"\"\n                  )}\n                >\n                  {columns.map((col) => (\n                    <td\n                      key={String(col.key)}\n                      className=\"px-4 py-3 text-foreground-300\"\n                    >\n                      {col.render ? (\n                        col.render(row[col.key], row)\n                      ) : (\n                        String(row[col.key])\n                      )}\n                    </td>\n                  ))}\n                </tr>\n              ))\n            ) : (\n              <tr>\n                <td\n                  colSpan={columns.length}\n                  className=\"px-4 py-8 text-center text-foreground-400\"\n                >\n                  No data available\n                </td>\n              </tr>\n            )}\n          </tbody>\n        </table>\n      </div>\n    </div>\n  );\n}\n",
    "css": "",
    "cssTypes": ""
  },
  "tabs": {
    "tsx": "\"use client\"\n\nimport * as React from \"react\"\nimport { useFocusRing } from \"react-aria\"\nimport { cn } from \"./utils\"\nimport { StyleValue } from \"./utils\"\nimport { asElementProps } from \"@/lib/react-aria\"\nimport { StylesProp, createStylesResolver } from \"@/lib/styles\"\nimport css from \"./Tabs.module.css\"\n\ntype TabsVariant = \"underline\"\ntype TabsOrientation = \"horizontal\" | \"vertical\"\n\ninterface IndicatorPosition {\n  left: number\n  top: number\n  width: number\n  height: number\n}\n\ninterface ListDimensions {\n  width: number\n  height: number\n}\n\ninterface TabsContextValue {\n  selectedValue: string\n  setSelectedValue: (value: string) => void\n  variant?: TabsVariant\n  orientation: TabsOrientation\n  isDisabledTab: (value: string) => boolean\n  indicatorReady: boolean\n  setIndicatorReady: (ready: boolean) => void\n}\n\nconst TabsContext = React.createContext<TabsContextValue | null>(null)\nconst TABS_INDICATOR_INSET = 4\nconst TABS_UNDERLINE_THICKNESS = 2\n\ninterface TabsListContextValue {\n  indicatorClassName: string\n}\n\nconst TabsListContext = React.createContext<TabsListContextValue | null>(null)\n\nfunction useTabsContext() {\n  const context = React.useContext(TabsContext)\n  if (!context) {\n    throw new Error(\"Tabs component must be used within Tabs root\")\n  }\n  return context\n}\n\nfunction useTabsListContext() {\n  return React.useContext(TabsListContext)\n}\n\nfunction getTabsIndicatorClassName(indicator: string, variant?: TabsVariant) {\n  return cn(\n    \"tabs\",\n    \"indicator\",\n    variant === \"underline\" && \"underline\",\n    variant === \"underline\" && \"indicator-underline\",\n    css.indicator,\n    {\n      [css[\"indicator-underline\"]]: variant === \"underline\",\n    },\n    indicator\n  )\n}\n\ninterface TabsStyleSlots {\n  root?: StyleValue\n}\n\ninterface TabsProps {\n  /** Optional alternate visual style of the tab list indicator */\n  variant?: TabsVariant\n  /** Direction of the tab list layout */\n  orientation?: TabsOrientation\n  /** Initially selected tab value for uncontrolled usage */\n  defaultValue?: string\n  /** Controlled selected tab value */\n  value?: string\n  /** Called when the selected tab changes */\n  onValueChange?: (value: string) => void\n  /** Additional CSS class for the tabs root */\n  className?: string\n  /** Custom styles for the component slots */\n  styles?: StylesProp<TabsStyleSlots>\n  children?: React.ReactNode\n}\n\nconst resolveTabsBaseStyles = createStylesResolver(['root'] as const)\n\nconst TabsRoot = React.forwardRef<HTMLDivElement, TabsProps>(\n  (\n    {\n      variant,\n      orientation = \"horizontal\",\n      defaultValue,\n      value: controlledValue,\n      onValueChange,\n      className,\n      styles: stylesProp,\n      children,\n    },\n    ref\n  ) => {\n    const { root } = resolveTabsBaseStyles(stylesProp)\n\n    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || \"\")\n    const [disabledTabs, setDisabledTabs] = React.useState<Set<string>>(new Set())\n\n    const selectedValue = controlledValue !== undefined ? controlledValue : uncontrolledValue\n    const isDisabledTab = React.useCallback(\n      (value: string) => disabledTabs.has(value),\n      [disabledTabs]\n    )\n\n    const setSelectedValue = React.useCallback(\n      (newValue: string) => {\n        if (!isDisabledTab(newValue)) {\n          if (controlledValue === undefined) {\n            setUncontrolledValue(newValue)\n          }\n          onValueChange?.(newValue)\n        }\n      },\n      [controlledValue, isDisabledTab, onValueChange]\n    )\n\n    const registerDisabledTab = React.useCallback((value: string) => {\n      setDisabledTabs((prev) => new Set(prev).add(value))\n    }, [])\n\n    const unregisterDisabledTab = React.useCallback((value: string) => {\n      setDisabledTabs((prev) => {\n        const newSet = new Set(prev)\n        newSet.delete(value)\n        return newSet\n      })\n    }, [])\n\n    const [indicatorReady, setIndicatorReady] = React.useState(false)\n\n    return (\n      <TabsContext.Provider\n        value={{\n          selectedValue,\n          setSelectedValue,\n          variant,\n          orientation,\n          isDisabledTab,\n          indicatorReady,\n          setIndicatorReady,\n        }}\n      >\n        <div\n          ref={ref}\n          className={cn(\"tabs\", css.tabs, root, className)}\n          data-orientation={orientation}\n        >\n          {React.Children.map(children, (child) =>\n            React.isValidElement(child) && child.type === TabsTrigger\n              ? React.cloneElement(child, {\n                _registerDisabled: registerDisabledTab,\n                _unregisterDisabled: unregisterDisabledTab,\n              } as any)\n              : child\n          )}\n        </div>\n      </TabsContext.Provider>\n    )\n  }\n)\nTabsRoot.displayName = \"Tabs\"\n\ninterface TabsListStyleSlots {\n  root?: StyleValue\n  indicator?: StyleValue\n}\n\ninterface TabsListProps {\n  /** Additional CSS class names */\n  className?: string\n  children?: React.ReactNode\n  /** Accessible label for the tab list */\n  \"aria-label\"?: string\n  /** Custom styles for the component slots */\n  styles?: StylesProp<TabsListStyleSlots>\n}\n\nconst resolveTabsListBaseStyles = createStylesResolver(['root', 'indicator'] as const);\n\n/** Container for the row of tab trigger buttons */\nconst TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(\n  ({ className, children, \"aria-label\": ariaLabel, styles: stylesProp }, ref) => {\n    const { selectedValue, variant, orientation, setIndicatorReady } = useTabsContext()\n    const { root, indicator } = resolveTabsListBaseStyles(stylesProp)\n    const listRef = React.useRef<HTMLDivElement>(null)\n    const [indicatorPosition, setIndicatorPosition] = React.useState<IndicatorPosition>({\n      left: 0,\n      top: 0,\n      width: 0,\n      height: 0,\n    })\n    const [listDimensions, setListDimensions] = React.useState<ListDimensions>({\n      width: 0,\n      height: 0,\n    })\n\n    const indicatorClassName = React.useMemo(\n      () => getTabsIndicatorClassName(indicator, variant),\n      [indicator, variant]\n    )\n    const tabsListContext = React.useMemo(\n      () => ({ indicatorClassName }),\n      [indicatorClassName]\n    )\n\n    const measureTrigger = React.useCallback((element: HTMLElement | null) => {\n      if (!element) return null\n\n      const rect = element.getBoundingClientRect()\n      const listRect = listRef.current?.getBoundingClientRect()\n\n      if (!listRect) return null\n\n      const relativeLeft = rect.left - listRect.left\n      const relativeTop = rect.top - listRect.top\n\n      return {\n        left: relativeLeft,\n        top: relativeTop,\n        width: rect.width,\n        height: rect.height,\n      }\n    }, [])\n\n    const measureList = React.useCallback(() => {\n      if (!listRef.current) return\n      const rect = listRef.current.getBoundingClientRect()\n      setListDimensions({\n        width: rect.width,\n        height: rect.height,\n      })\n    }, [])\n\n    const updateIndicator = React.useCallback(\n      (value: string) => {\n        if (!listRef.current) return\n\n        const trigger = listRef.current.querySelector(\n          `[data-tabs-value=\"${value}\"]`\n        ) as HTMLElement | null\n\n        if (trigger) {\n          const position = measureTrigger(trigger)\n          if (position) {\n            setIndicatorPosition(position)\n          }\n        }\n      },\n      [measureTrigger]\n    )\n\n    React.useLayoutEffect(() => {\n      measureList()\n      updateIndicator(selectedValue)\n      setIndicatorReady(true)\n    }, [selectedValue, updateIndicator, measureList, setIndicatorReady])\n\n    React.useEffect(() => {\n      if (!listRef.current) return\n\n      const resizeObserver = new ResizeObserver(() => {\n        requestAnimationFrame(() => {\n          measureList()\n          updateIndicator(selectedValue)\n        })\n      })\n\n      resizeObserver.observe(listRef.current)\n      return () => resizeObserver.disconnect()\n    }, [selectedValue, updateIndicator, measureList])\n\n    React.useEffect(() => {\n      const handleWindowResize = () => {\n        requestAnimationFrame(() => {\n          measureList()\n          updateIndicator(selectedValue)\n        })\n      }\n\n      window.addEventListener(\"resize\", handleWindowResize)\n      return () => window.removeEventListener(\"resize\", handleWindowResize)\n    }, [selectedValue, updateIndicator, measureList])\n\n    const getIndicatorStyle = React.useMemo<React.CSSProperties>(() => {\n      const baseStyle: React.CSSProperties = {\n        position: \"absolute\",\n        transition: \"all 0.2s cubic-bezier(0.4, 0, 0.2, 1)\",\n        willChange: \"transform\",\n        pointerEvents: \"none\",\n        margin: 0,\n        opacity: indicatorPosition.width === 0 && indicatorPosition.height === 0 ? 0 : 1,\n      }\n\n      if (indicatorPosition.width === 0 && indicatorPosition.height === 0) {\n        return baseStyle\n      }\n\n      if (orientation === \"vertical\") {\n        if (variant === \"underline\") {\n          return {\n            ...baseStyle,\n            left: 0,\n            top: indicatorPosition.top,\n            width: TABS_UNDERLINE_THICKNESS,\n            height: indicatorPosition.height,\n          }\n        }\n        const horizontalPadding = TABS_INDICATOR_INSET\n        const adjustedWidth = Math.max(0, listDimensions.width - horizontalPadding * 2)\n        return {\n          ...baseStyle,\n          left: horizontalPadding,\n          top: indicatorPosition.top,\n          width: adjustedWidth,\n          height: indicatorPosition.height,\n        }\n      }\n\n      if (variant === \"underline\") {\n        return {\n          ...baseStyle,\n          left: indicatorPosition.left,\n          top: indicatorPosition.top + indicatorPosition.height - TABS_UNDERLINE_THICKNESS,\n          width: indicatorPosition.width,\n          height: TABS_UNDERLINE_THICKNESS,\n        }\n      }\n\n      const verticalPadding = TABS_INDICATOR_INSET\n      const adjustedHeight = Math.max(0, listDimensions.height - verticalPadding * 2)\n      return {\n        ...baseStyle,\n        left: indicatorPosition.left,\n        top: verticalPadding,\n        width: indicatorPosition.width,\n        height: adjustedHeight,\n      }\n    }, [indicatorPosition, listDimensions, variant, orientation])\n\n    const mergedRef = React.useCallback(\n      (el: HTMLDivElement | null) => {\n        listRef.current = el\n        if (typeof ref === \"function\") ref(el)\n        else if (ref) ref.current = el\n      },\n      [ref]\n    )\n\n    return (\n      <TabsListContext.Provider value={tabsListContext}>\n        <div\n          ref={mergedRef}\n          role=\"tablist\"\n          aria-label={ariaLabel}\n          aria-orientation={orientation}\n          className={cn(\"tabs\", \"list\", css.list, root, className)}\n          data-variant={variant}\n          data-orientation={orientation}\n          style={{ position: \"relative\" }}\n        >\n          {children}\n          {indicatorPosition.width > 0 && (\n            <div\n              aria-hidden=\"true\"\n              className={indicatorClassName}\n              style={getIndicatorStyle}\n            />\n          )}\n        </div>\n      </TabsListContext.Provider>\n    )\n  }\n)\nTabsList.displayName = \"TabsList\"\n\ninterface TabsTriggerStyleSlots {\n  root?: StyleValue\n  icon?: StyleValue\n}\n\ninterface TabsTriggerProps {\n  /** Unique identifier matching the associated TabsContent value */\n  value: string\n  /** Whether the tab trigger is disabled */\n  disabled?: boolean\n  /** Icon element displayed before the tab label */\n  icon?: React.ReactNode\n  /** Additional CSS class names */\n  className?: string\n  /** Custom styles for the component slots */\n  styles?: StylesProp<TabsTriggerStyleSlots>\n  children?: React.ReactNode\n  _registerDisabled?: (value: string) => void\n  _unregisterDisabled?: (value: string) => void\n}\n\nconst resolveTabsTriggerBaseStyles = createStylesResolver(['root', 'icon'] as const);\n\n/** A tab button that activates its associated content panel */\nconst TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(\n  (\n    {\n      value,\n      disabled = false,\n      icon,\n      className,\n      styles: stylesProp,\n      children,\n      _registerDisabled,\n      _unregisterDisabled,\n    },\n    ref\n  ) => {\n    const { selectedValue, setSelectedValue, indicatorReady, orientation, variant } = useTabsContext()\n    const tabsListContext = useTabsListContext()\n    const { root, icon: iconStyles } = resolveTabsTriggerBaseStyles(stylesProp)\n    const buttonRef = React.useRef<HTMLButtonElement>(null)\n    const isSelected = value === selectedValue\n    const showIndicatorFallback = isSelected && !indicatorReady && !!tabsListContext\n    const fallbackIndicatorStyle = React.useMemo<React.CSSProperties>(() => {\n      if (variant === \"underline\") {\n        if (orientation === \"vertical\") {\n          return {\n            top: 0,\n            bottom: 0,\n            left: -TABS_UNDERLINE_THICKNESS,\n            width: TABS_UNDERLINE_THICKNESS,\n            height: \"100%\",\n            margin: 0,\n          }\n        }\n\n        return {\n          left: 0,\n          right: 0,\n          bottom: -TABS_UNDERLINE_THICKNESS,\n          width: \"100%\",\n          height: TABS_UNDERLINE_THICKNESS,\n          margin: 0,\n        }\n      }\n\n      return {\n        inset: 0,\n        margin: 0,\n      }\n    }, [orientation, variant])\n\n    const { focusProps, isFocusVisible } = useFocusRing()\n\n    React.useEffect(() => {\n      if (disabled) {\n        _registerDisabled?.(value)\n      } else {\n        _unregisterDisabled?.(value)\n      }\n    }, [disabled, value, _registerDisabled, _unregisterDisabled])\n\n    const handleClick = React.useCallback(() => {\n      if (!disabled) {\n        setSelectedValue(value)\n      }\n    }, [disabled, value, setSelectedValue])\n\n    const handleKeyDown = React.useCallback(\n      (e: React.KeyboardEvent) => {\n        if (disabled) return\n\n        const listElement = buttonRef.current?.parentElement\n        if (!listElement) return\n\n        const triggers = Array.from(\n          listElement.querySelectorAll('[data-tabs-value]')\n        ) as HTMLButtonElement[]\n        const currentIndex = triggers.findIndex((el) => el.getAttribute(\"data-tabs-value\") === value)\n\n        let nextValue: string | null = null\n\n        if (e.key === \"ArrowRight\" || e.key === \"ArrowDown\") {\n          e.preventDefault()\n          const nextIndex = (currentIndex + 1) % triggers.length\n          nextValue = triggers[nextIndex].getAttribute(\"data-tabs-value\")\n        } else if (e.key === \"ArrowLeft\" || e.key === \"ArrowUp\") {\n          e.preventDefault()\n          const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1\n          nextValue = triggers[prevIndex].getAttribute(\"data-tabs-value\")\n        } else if (e.key === \"Home\") {\n          e.preventDefault()\n          nextValue = triggers[0].getAttribute(\"data-tabs-value\")\n        } else if (e.key === \"End\") {\n          e.preventDefault()\n          nextValue = triggers[triggers.length - 1].getAttribute(\"data-tabs-value\")\n        }\n\n        if (nextValue) {\n          setSelectedValue(nextValue)\n          setTimeout(() => {\n            const nextTrigger = listElement.querySelector(\n              `[data-tabs-value=\"${nextValue}\"]`\n            ) as HTMLButtonElement | null\n            nextTrigger?.focus()\n          }, 0)\n        }\n      },\n      [value, disabled, setSelectedValue]\n    )\n\n    const mergedRef = React.useCallback(\n      (el: HTMLButtonElement | null) => {\n        buttonRef.current = el\n        if (typeof ref === \"function\") ref(el)\n        else if (ref) ref.current = el\n      },\n      [ref]\n    )\n\n    return (\n      <button\n        {...asElementProps<\"button\">(focusProps)}\n        ref={mergedRef}\n        id={`${value}-trigger`}\n        role=\"tab\"\n        aria-selected={isSelected}\n        aria-controls={`${value}-content`}\n        tabIndex={isSelected ? 0 : -1}\n        disabled={disabled}\n        data-tabs-value={value}\n        className={cn(\"tabs\", \"trigger\", css.trigger, root, className)}\n        data-selected={isSelected ? \"true\" : \"false\"}\n        data-disabled={disabled ? \"true\" : undefined}\n        data-focus-visible={isFocusVisible ? \"true\" : undefined}\n        data-indicator-ready={isSelected && indicatorReady ? \"true\" : undefined}\n        data-indicator-fallback={showIndicatorFallback ? \"true\" : undefined}\n        onClick={handleClick}\n        onKeyDown={handleKeyDown}\n      >\n        {showIndicatorFallback && tabsListContext && (\n          <span\n            aria-hidden=\"true\"\n            className={cn(tabsListContext.indicatorClassName, css[\"indicator-fallback\"])}\n            style={fallbackIndicatorStyle}\n          />\n        )}\n        {icon && <span className={cn(css[\"trigger-icon\"], iconStyles)}>{icon}</span>}\n        {children}\n      </button>\n    )\n  }\n)\nTabsTrigger.displayName = \"Tab\"\n\ninterface TabsContentStyleSlots {\n  root?: StyleValue\n}\n\ninterface TabsContentProps {\n  /** Unique identifier matching the associated TabsTrigger value */\n  value: string\n  /** Additional CSS class names */\n  className?: string\n  /** Custom styles for the component slots */\n  styles?: StylesProp<TabsContentStyleSlots>\n  children?: React.ReactNode\n}\n\nconst resolveTabsContentBaseStyles = createStylesResolver(['root'] as const);\n\n/** Content panel shown when its corresponding tab is active */\nconst TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(\n  ({ value, className, children, styles: stylesProp }, ref) => {\n    const { selectedValue, orientation } = useTabsContext()\n    const { root } = resolveTabsContentBaseStyles(stylesProp);\n    const isVisible = value === selectedValue\n\n    return (\n      <div\n        ref={ref}\n        role=\"tabpanel\"\n        aria-labelledby={`${value}-trigger`}\n        id={`${value}-content`}\n        className={cn(\"tabs\", \"content\", css.content, root, className)}\n        data-orientation={orientation}\n        hidden={!isVisible}\n      >\n        {isVisible && children}\n      </div>\n    )\n  }\n)\nTabsContent.displayName = \"TabsContent\"\n\nconst Tabs = Object.assign(TabsRoot, {\n  List: TabsList,\n  Trigger: TabsTrigger,\n  Content: TabsContent,\n})\n\nexport { Tabs }\nexport type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps }\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .tabs {\n    @apply flex w-full flex-col;\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: row;\n    }\n  }\n\n  .list {\n    @apply relative flex w-full flex-row items-center gap-3 py-1;\n    border-radius: var(--radius-sm);\n\n    &[data-orientation=\"vertical\"] {\n      flex-direction: column;\n      width: auto;\n      min-width: 120px;\n      height: 100%;\n    }\n\n    &[data-variant=\"underline\"] {\n      background-color: transparent;\n      border-radius: 0;\n      padding: 0;\n    }\n\n    &[data-variant=\"underline\"][data-orientation=\"vertical\"] {\n      border-bottom: none;\n      border-left: var(--border-width-base) solid var(--list-border-color);\n      align-items: stretch;\n    }\n  }\n\n  .indicator {\n    @apply absolute;\n    background-color: var(--indicator-background);\n    box-sizing: border-box;\n    border-radius: var(--radius-xs);\n    z-index: 0;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    pointer-events: none;\n  }\n\n  .indicator-fallback {\n    z-index: -1;\n  }\n\n  .indicator-underline {\n    border-radius: 0;\n  }\n\n  .trigger {\n    @apply relative z-[1] flex shrink-0 items-center justify-center gap-2 rounded-sm px-2 py-1.5 cursor-pointer select-none;\n    height: 100%;\n    background-color: transparent;\n    border: none;\n    color: var(--trigger-color);\n    outline: none;\n    transition: color 0.15s ease, background-color 0.15s ease;\n\n\n    &:not([data-disabled]) {\n      &:hover {\n        color: var(--trigger-hover-color);\n      }\n\n      &:active {\n        color: var(--trigger-active-color);\n      }\n    }\n\n    &[data-selected=\"true\"] {\n      color: var(--trigger-selected-color);\n    }\n\n    &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]):not([data-indicator-fallback=\"true\"]) {\n      .list & {\n        background-color: var(--trigger-selected-background);\n      }\n\n      .list[data-variant=\"underline\"] & {\n        background-color: transparent;\n        border-bottom-color: var(--trigger-underline-color);\n      }\n\n      .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n        border-bottom-color: transparent;\n        border-left-color: var(--trigger-underline-color);\n      }\n    }\n\n    &[data-focus-visible] {\n      background: var(--trigger-focus-background);\n      outline: none;\n    }\n\n    &[data-disabled=\"true\"] {\n      --disabled-opacity: 0.5;\n      opacity: var(--disabled-opacity);\n      cursor: not-allowed;\n      pointer-events: none;\n    }\n\n    .list[data-variant=\"underline\"] & {\n      background-color: transparent;\n      border-radius: 0;\n      border-bottom: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] & {\n      border-bottom: none;\n      border-left: 2px solid transparent;\n    }\n\n    .list[data-variant=\"underline\"][data-orientation=\"vertical\"] &[data-selected=\"true\"]:not([data-indicator-ready=\"true\"]):not([data-indicator-fallback=\"true\"]) {\n      border-left-color: var(--trigger-underline-color);\n      border-bottom: none;\n    }\n  }\n\n  .trigger-icon {\n    @apply flex h-4 w-4 shrink-0 items-center justify-center;\n  }\n\n  .content {\n    @apply w-full p-0 outline-none;\n    flex: 1;\n    padding-top: 1rem;\n\n    &[data-orientation=\"vertical\"] {\n      flex: 1;\n      width: 100%;\n    }\n\n    &:focus-visible {\n      outline: 2px solid var(--content-outline-color);\n      outline-offset: 2px;\n    }\n  }\n\n  @media (max-width: 640px) {\n    .list {\n      padding: 0.125rem;\n\n      &[data-variant=\"underline\"] {\n        padding: 0;\n      }\n    }\n\n    .trigger {\n      @apply px-1 py-1;\n      .list[data-variant=\"underline\"] & {\n        margin: 0.5rem 0.75rem;\n      }\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  tabs: string;\n  list: string;\n  indicator: string;\n  \"indicator-fallback\": string;\n  \"indicator-underline\": string;\n  trigger: string;\n  \"trigger-icon\": string;\n  content: string;\n};\n\nexport default styles;\n"
  },
  "textarea": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useState, type ComponentPropsWithoutRef } from \"react\";\n\nimport { mergeProps } from \"@react-aria/utils\";\nimport { useFocusRing } from \"@react-aria/focus\";\n\nimport { cn, type StyleValue } from \"./utils\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { Scroll } from \"@/components/Scroll\";\nimport css from \"./Textarea.module.css\";\n\ntype Size = \"sm\" | \"md\" | \"lg\";\ntype ResizeAxis = \"both\" | \"x\" | \"y\" | \"none\";\n\ninterface TextAreaStyleSlots {\n  root?: StyleValue;\n  characterCount?: StyleValue;\n}\n\ntype TextAreaStylesProp = StylesProp<TextAreaStyleSlots>;\n\nconst resolveTextAreaBaseStyles = createStylesResolver(['root', 'characterCount'] as const);\n\nexport interface TextAreaProps extends Omit<ComponentPropsWithoutRef<\"textarea\">, \"size\"> {\n  /** Size of the textarea */\n  size?: Size;\n  /** Whether to apply error styling */\n  error?: boolean;\n  /** Whether the textarea can be manually resized by the user. When enabled, `className` may include Tailwind `resize`, `resize-x`, `resize-y`, or `resize-none` to select the resize axis. */\n  resizable?: boolean;\n  /** Whether to display a character count below the textarea */\n  showCharacterCount?: boolean;\n  /** Maximum number of characters allowed */\n  maxCharacters?: number;\n  /** Maximum height before the custom scrollbar activates */\n  maxHeight?: string;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: TextAreaStylesProp;\n}\n\nfunction useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {\n  return React.useCallback((value: T) => {\n    refs.forEach((ref) => {\n      if (typeof ref === \"function\") ref(value);\n      else if (ref && typeof ref === \"object\") (ref as React.MutableRefObject<T | null>).current = value;\n    });\n  }, refs);\n}\n\nconst resizeClassMap: Record<string, ResizeAxis> = {\n  resize: \"both\",\n  \"resize-x\": \"x\",\n  \"resize-y\": \"y\",\n  \"resize-none\": \"none\",\n};\n\nfunction resolveResizeAxis(className: string | undefined, resizable: boolean): ResizeAxis {\n  if (!resizable) return \"none\";\n\n  let axis: ResizeAxis | undefined;\n  for (const token of className?.split(/\\s+/) ?? []) {\n    const nextAxis = resizeClassMap[token];\n    if (nextAxis) axis = nextAxis;\n  }\n\n  return axis ?? \"both\";\n}\n\nfunction stripResizeClasses(className: string | undefined) {\n  if (!className) return className;\n\n  const filtered = className\n    .split(/\\s+/)\n    .filter((token) => token && !resizeClassMap[token])\n    .join(\" \");\n\n  return filtered || undefined;\n}\n\nexport const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(\n  (\n    {\n      className,\n      size = \"md\",\n      error = false,\n      disabled,\n      resizable = true,\n      showCharacterCount = false,\n      maxCharacters,\n      maxHeight,\n      value: controlledValue,\n      defaultValue,\n      onChange,\n      onFocus,\n      onBlur,\n      style: propStyle,\n      styles,\n      ...props\n    },\n    ref\n  ) => {\n    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? \"\");\n    const [isFocused, setIsFocused] = React.useState(false);\n    const [internalHeight, setInternalHeight] = React.useState<number | null>(null);\n    const [internalWidth, setInternalWidth] = React.useState<number | null>(null);\n\n    const textareaRef = React.useRef<HTMLTextAreaElement>(null);\n    const surfaceRef = React.useRef<HTMLDivElement>(null);\n    const scrollWrapperRef = React.useRef<HTMLDivElement>(null);\n    const mergedRef = useMergedRef(ref, textareaRef);\n\n    const { focusProps, isFocusVisible } = useFocusRing();\n\n    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;\n    const charCount = typeof currentValue === \"string\" ? currentValue.length : 0;\n    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;\n\n    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {\n      setIsFocused(true);\n      onFocus?.(e);\n    };\n\n    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {\n      setIsFocused(false);\n      onBlur?.(e);\n    };\n\n    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {\n      const newValue = e.target.value;\n\n      if (maxCharacters && newValue.length > maxCharacters) {\n        const truncated = newValue.slice(0, maxCharacters);\n        if (controlledValue === undefined) {\n          setInternalValue(truncated);\n        }\n        onChange?.({\n          ...e,\n          target: { ...e.target, value: truncated },\n        } as React.ChangeEvent<HTMLTextAreaElement>);\n      } else {\n        if (controlledValue === undefined) {\n          setInternalValue(newValue);\n        }\n        onChange?.(e);\n      }\n    };\n\n    const resolved = resolveTextAreaBaseStyles(styles);\n    const resizeAxis = resolveResizeAxis(className, resizable);\n    const canResize = resizeAxis !== \"none\" && !disabled;\n    const textareaClassName = stripResizeClasses(className);\n\n    const handleResizeMouseDown = React.useCallback((e: React.MouseEvent) => {\n      if (!canResize) return;\n\n      e.preventDefault();\n      const textarea = textareaRef.current;\n      const surface = surfaceRef.current;\n      const scrollWrapper = scrollWrapperRef.current;\n      if (!textarea || !surface) return;\n\n      const computed = window.getComputedStyle(textarea);\n      const minHeight = Number.parseFloat(computed.minHeight) || 60;\n      const minWidth = Number.parseFloat(computed.minWidth) || 160;\n      const startX = e.clientX;\n      const startY = e.clientY;\n      const startWidth = surface.getBoundingClientRect().width;\n      const startHeight = maxHeight\n        ? (scrollWrapper?.getBoundingClientRect().height ?? surface.getBoundingClientRect().height)\n        : surface.getBoundingClientRect().height;\n\n      const onMouseMove = (ev: MouseEvent) => {\n        if (resizeAxis === \"x\" || resizeAxis === \"both\") {\n          const deltaX = ev.clientX - startX;\n          setInternalWidth(Math.max(minWidth, startWidth + deltaX));\n        }\n\n        if (resizeAxis === \"y\" || resizeAxis === \"both\") {\n          const deltaY = ev.clientY - startY;\n          setInternalHeight(Math.max(minHeight, startHeight + deltaY));\n        }\n      };\n\n      const onMouseUp = () => {\n        document.removeEventListener(\"mousemove\", onMouseMove);\n        document.removeEventListener(\"mouseup\", onMouseUp);\n        document.body.style.userSelect = \"\";\n      };\n      document.addEventListener(\"mousemove\", onMouseMove);\n      document.addEventListener(\"mouseup\", onMouseUp);\n      document.body.style.userSelect = \"none\";\n    }, [canResize, maxHeight, resizeAxis]);\n\n    const effectiveMaxHeight = internalHeight !== null ? `${internalHeight}px` : maxHeight;\n\n    const autoResize = React.useCallback(() => {\n      const el = textareaRef.current;\n      if (!el || !maxHeight) return;\n      el.style.height = \"auto\";\n      el.style.height = `${el.scrollHeight}px`;\n    }, [maxHeight]);\n\n    React.useLayoutEffect(() => {\n      autoResize();\n    }, [autoResize, currentValue]);\n\n    const surfaceStyle: React.CSSProperties = {\n      ...(internalWidth !== null ? { width: `${internalWidth}px`, maxWidth: \"100%\" } : {}),\n      ...(maxHeight === undefined && internalHeight !== null ? { height: `${internalHeight}px` } : {}),\n    };\n\n    const textareaStyle: React.CSSProperties = {\n      ...propStyle,\n      resize: \"none\",\n      ...(maxHeight === undefined && internalHeight !== null ? { height: \"100%\" } : {}),\n    };\n\n    const textareaEl = (\n      <textarea\n        ref={mergedRef}\n        disabled={disabled}\n        data-focus-visible={isFocusVisible ? \"true\" : undefined}\n        data-active={isFocused ? \"true\" : undefined}\n        data-disabled={disabled || undefined}\n        data-error={error || isOverLimit ? \"true\" : undefined}\n        data-size={size}\n        data-resize-axis={resizeAxis}\n        data-scroll={maxHeight ? \"true\" : undefined}\n        className={cn('textarea', css.textarea, textareaClassName, resolved.root)}\n        style={textareaStyle}\n        value={currentValue}\n        {...mergeProps(focusProps, {\n          onFocus: handleFocus,\n          onBlur: handleBlur,\n          onChange: handleChange,\n          ...props,\n        })}\n      />\n    );\n\n    return (\n      <div className={css.container}>\n        <div\n          ref={surfaceRef}\n          className={css.surface}\n          data-resize-axis={resizeAxis}\n          style={surfaceStyle}\n        >\n          {maxHeight ? (\n            <div\n              ref={scrollWrapperRef}\n              className={cn('textarea', 'scroll-wrapper', css[\"scroll-wrapper\"])}\n              data-focus-visible={isFocusVisible ? \"true\" : undefined}\n              data-active={isFocused ? \"true\" : undefined}\n              data-disabled={disabled || undefined}\n              data-error={error || isOverLimit ? \"true\" : undefined}\n              data-size={size}\n            >\n              <Scroll maxHeight={effectiveMaxHeight} style={{ height: \"auto\" }}>\n                {textareaEl}\n              </Scroll>\n            </div>\n          ) : (\n            textareaEl\n          )}\n          {canResize && (\n            <div\n              aria-hidden=\"true\"\n              data-axis={resizeAxis}\n              data-slot=\"resize-handle\"\n              className={cn('textarea', 'resize-handle', css[\"resize-handle\"])}\n              onMouseDown={handleResizeMouseDown}\n            />\n          )}\n        </div>\n        {showCharacterCount && (\n          <div\n            className={cn('textarea', 'character-count', css[\"character-count\"], resolved.characterCount)}\n            data-over-limit={isOverLimit || undefined}\n          >\n            {charCount}{maxCharacters ? ` / ${maxCharacters}` : \"\"} characters\n          </div>\n        )}\n      </div>\n    );\n  }\n);\n\nTextArea.displayName = \"TextArea\";\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .textarea {\n    --textarea-padding-x: 0.75rem;\n    --textarea-padding-y: 0.5rem;\n    --disabled-opacity: 0.6;\n\n    @apply block w-full px-3 py-2;\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-snug);\n    color: var(--foreground);\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-sizing: border-box;\n    resize: none;\n    outline: none;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n    &::placeholder {\n      color: var(--placeholder);\n    }\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      color: var(--disabled-foreground);\n      cursor: not-allowed;\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-error] {\n      border-color: var(--border);\n\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n\n    &[data-resize-axis=\"x\"],\n    &[data-resize-axis=\"both\"] {\n      padding-inline-end: calc(var(--textarea-padding-x) + 1rem);\n    }\n\n    &[data-resize-axis=\"y\"],\n    &[data-resize-axis=\"both\"] {\n      padding-block-end: calc(var(--textarea-padding-y) + 1rem);\n    }\n\n    &[data-scroll=\"true\"] {\n      overflow: hidden;\n      resize: none;\n      background: transparent;\n      border: none;\n      border-radius: 0;\n      box-shadow: none;\n\n      &[data-active],\n      &[data-focus-visible] {\n        border-color: transparent;\n        box-shadow: none;\n      }\n\n      &[data-disabled] {\n        background-color: transparent;\n        opacity: 1;\n      }\n\n      &[data-error] {\n        border-color: transparent;\n\n        &[data-active] {\n          border-color: transparent;\n          box-shadow: none;\n        }\n      }\n    }\n  }\n\n  .surface {\n    @apply relative w-full;\n  }\n\n  .resize-handle {\n    position: absolute;\n    z-index: 1;\n    touch-action: none;\n    user-select: none;\n\n    &::before {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--resize-handle-color);\n      transition: background-color 150ms;\n    }\n\n    &::after {\n      content: \"\";\n      position: absolute;\n      border-radius: var(--radius-full);\n      background-color: var(--resize-handle-color);\n      transition: background-color 150ms;\n    }\n\n    &:hover::before,\n    &:hover::after {\n      background-color: var(--resize-handle-color-hover);\n    }\n\n    &[data-axis=\"both\"] {\n      right: 3px;\n      bottom: 3px;\n      width: 1.5rem;\n      height: 1.5rem;\n      cursor: nwse-resize;\n\n      &::before {\n        bottom: 0.35rem;\n        right: 0.15rem;\n        width: 0.5rem;\n        height: 0.125rem;\n        transform: rotate(-45deg);\n        transform-origin: center;\n      }\n\n      &::after {\n        bottom: 0.6rem;\n        right: 0.2rem;\n        width: 1.0rem;\n        height: 0.125rem;\n        transform: rotate(-45deg);\n        transform-origin: center;\n      }\n    }\n\n    &[data-axis=\"x\"] {\n      top: 50%;\n      right: 0;\n      width: 0.75rem;\n      height: 2rem;\n      cursor: ew-resize;\n      transform: translateY(-50%);\n\n      &::before {\n        top: 50%;\n        left: 50%;\n        width: 0.125rem;\n        height: 1.5rem;\n        transform: translate(-50%, -50%);\n      }\n    }\n\n    &[data-axis=\"y\"] {\n      left: 50%;\n      bottom: 0;\n      width: 2rem;\n      height: 0.75rem;\n      cursor: ns-resize;\n      transform: translateX(-50%);\n\n      &::before {\n        top: 50%;\n        left: 50%;\n        width: 1.5rem;\n        height: 0.125rem;\n        transform: translate(-50%, -50%);\n      }\n    }\n  }\n\n  .scroll-wrapper {\n    --disabled-opacity: 0.6;\n\n    @apply w-full overflow-hidden;\n    background-color: var(--background);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n\n    &[data-active] {\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-focus-visible] {\n      outline: none;\n      border-color: var(--ring-color);\n      box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n    }\n\n    &[data-disabled] {\n      background-color: var(--disabled-background);\n      opacity: var(--disabled-opacity);\n    }\n\n    &[data-error] {\n      border-color: var(--border);\n\n      &[data-active] {\n        border-color: var(--ring-color);\n        box-shadow: 0 0 0 1px mix(var(--ring-color) 20%, transparent);\n      }\n    }\n  }\n\n  .textarea[data-size=\"sm\"] {\n    min-height: 5rem;\n    --textarea-padding-x: 0.5rem;\n    --textarea-padding-y: 0.25rem;\n    font-size: var(--text-sm);\n    @apply px-2 py-1;\n  }\n\n  .textarea[data-size=\"md\"] {\n    min-height: 6rem;\n    --textarea-padding-x: 0.75rem;\n    --textarea-padding-y: 0.5rem;\n    font-size: var(--text-sm);\n    @apply px-3 py-2;\n  }\n\n  .textarea[data-size=\"lg\"] {\n    min-height: 8rem;\n    --textarea-padding-x: 1rem;\n    --textarea-padding-y: 0.75rem;\n    font-size: var(--text-md);\n    @apply px-4 py-3;\n  }\n\n  .container {\n    @apply w-full;\n  }\n\n  .character-count {\n    font-size: var(--text-sm);\n    color: var(--character-count-color);\n    @apply mt-1;\n    transition: color 0.15s var(--ease-snappy-pop);\n  }\n\n  .character-count[data-over-limit] {\n    color: var(--character-count-over-limit-color);\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  textarea: string;\n  container: string;\n  surface: string;\n  \"character-count\": string;\n  \"scroll-wrapper\": string;\n  \"resize-handle\": string;\n};\n\nexport default styles;\n"
  },
  "toast": {
    "tsx": "\"use client\";\n\nimport React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from 'react';\nimport gsap from 'gsap';\nimport { useGSAP } from \"@gsap/react\";\nimport { cn } from \"./utils\";\nimport { createStylesResolver } from '@/lib/styles';\nimport css from './Toast.module.css';\nimport { ToastProps as ToastData, dispatch } from \"./Toast.Store\";\n\nimport { Info, CircleCheck, TriangleAlert, CircleAlert } from \"lucide-react\";\n\nimport { X } from 'lucide-react';\n\nconst DRAG_DISMISS_THRESHOLD = 100;\nconst DRAG_LEFT_RESISTANCE = 20;\n\nconst resolveToastBaseStyles = createStylesResolver([\n  'root',\n  'content',\n  'title',\n  'description',\n  'close',\n  'icon'\n] as const);\n\nconst toastIcons = {\n  danger: <TriangleAlert className={css.icon} />,\n  success: <CircleCheck className={css.icon} />,\n  info: <Info className={css.icon} />,\n  warning: <CircleAlert className={css.icon} />,\n  default: null,\n};\n\ninterface ToastComponentProps {\n  /** Toast data object containing content and display options */\n  toast: ToastData;\n  /** Whether the auto-dismiss timer pauses on mouse hover */\n  pauseOnHover?: boolean;\n  onDragStart?: () => void;\n  onDragEnd?: () => void;\n  onDismissStart?: () => void;\n  onDismissEnd?: () => void;\n}\n\nexport const Toast = forwardRef<HTMLDivElement, ToastComponentProps>(function Toast(\n  { toast, pauseOnHover = false, onDragStart, onDragEnd, onDismissStart, onDismissEnd },\n  ref\n) {\n  const innerRef = useRef<HTMLDivElement>(null);\n  useImperativeHandle(ref, () => innerRef.current!);\n\n  const {\n    id,\n    title,\n    description,\n    jsx,\n    variant = 'default',\n    duration = 5000,\n    onDismiss,\n    position = 'bottom-right',\n    styles,\n  } = toast;\n\n  const resolved = resolveToastBaseStyles(styles);\n  const isTop = position.startsWith('top');\n\n  // Time tracking refs\n  const elapsedRef = useRef(0);\n  const lastTimeRef = useRef<number>(Date.now());\n  const animationFrameRef = useRef<number | null>(null);\n\n  // Use a ref for paused state to avoid restarting the effect on every hover change\n  const isPausedRef = useRef(pauseOnHover);\n  useEffect(() => {\n    isPausedRef.current = pauseOnHover;\n  }, [pauseOnHover]);\n\n  // Drag state refs\n  const dragStartXRef = useRef(0);\n  const currentDeltaRef = useRef(0);\n  const dragPausedRef = useRef(false);\n\n  const handleDismiss = useCallback(() => {\n    // Change absolute numbers to relative strings\n    const yOffset = isTop ? \"-=20\" : \"+=20\";\n\n    if (innerRef.current) {\n      innerRef.current.dataset.dismissing = \"true\";\n      onDismissStart?.();\n      dispatch({ type: 'CLOSE_TOAST', toastId: id });\n      gsap.killTweensOf(innerRef.current);\n      gsap.to(innerRef.current, {\n        opacity: 0,\n        y: yOffset, // Animates relative to its current layout position\n        scale: 0.9,\n        duration: 0.3,\n        onComplete: () => {\n          onDismissEnd?.();\n          onDismiss?.();\n          dispatch({ type: 'DISMISS_TOAST', toastId: id });\n        },\n      });\n    } else {\n      onDismiss?.();\n      dispatch({ type: 'DISMISS_TOAST', toastId: id });\n    }\n  }, [id, isTop, onDismiss]);\n\n  useGSAP(() => {\n    if (!innerRef.current) return;\n\n    const spawnDir = toast.spawnDirection || 'bottom';\n    const fromY = spawnDir === 'top' ? (isTop ? 25 : -25) : (isTop ? -25 : 25);\n\n    gsap.from(innerRef.current, {\n      opacity: 1,\n      y: fromY,\n      duration: 0.35,\n      ease: \"power3.out\",\n    });\n  }, { scope: innerRef });\n\n  const handlePointerDown = useCallback((e: React.PointerEvent) => {\n    if (innerRef.current?.dataset.dismissing) return;\n    dragStartXRef.current = e.clientX;\n    currentDeltaRef.current = 0;\n    dragPausedRef.current = true;\n    onDragStart?.();\n    gsap.killTweensOf(innerRef.current);\n\n    const onMove = (ev: PointerEvent) => {\n      if (!innerRef.current) return;\n      const delta = ev.clientX - dragStartXRef.current;\n      currentDeltaRef.current = delta;\n\n      if (delta >= 0) {\n        const progress = Math.min(delta / DRAG_DISMISS_THRESHOLD, 1);\n        gsap.set(innerRef.current, { x: delta, opacity: 1 - progress * 0.5 });\n      } else {\n        const x = -DRAG_LEFT_RESISTANCE * (1 - Math.exp(delta / DRAG_LEFT_RESISTANCE));\n        gsap.set(innerRef.current, { x, opacity: 1 });\n      }\n    };\n\n    const onUp = () => {\n      dragPausedRef.current = false;\n      onDragEnd?.();\n      document.removeEventListener('pointermove', onMove);\n      document.removeEventListener('pointerup', onUp);\n      document.removeEventListener('pointercancel', onUp);\n\n      const delta = currentDeltaRef.current;\n      currentDeltaRef.current = 0;\n\n      if (delta >= DRAG_DISMISS_THRESHOLD) {\n        if (innerRef.current) {\n          innerRef.current.dataset.dismissing = \"true\";\n          onDismissStart?.();\n          // Dispatch CLOSE_TOAST immediately to signal stack adjustment\n          dispatch({ type: 'CLOSE_TOAST', toastId: id });\n          gsap.killTweensOf(innerRef.current);\n          gsap.to(innerRef.current, {\n            x: \"+=200\",\n            opacity: 0,\n            duration: 0.25,\n            ease: \"power2.in\",\n            onComplete: () => {\n              onDismissEnd?.();\n              onDismiss?.();\n              // Dispatch DISMISS_TOAST after animation completes\n              dispatch({ type: 'DISMISS_TOAST', toastId: id });\n            },\n          });\n        } else {\n          // If innerRef.current is null, just dismiss immediately\n          onDismiss?.();\n          dispatch({ type: 'DISMISS_TOAST', toastId: id });\n        }\n      } else if (innerRef.current) {\n        gsap.to(innerRef.current, {\n          x: 0,\n          opacity: 1,\n          duration: 0.55,\n          ease: \"elastic.out(1, 0.55)\",\n        });\n      }\n    };\n\n    document.addEventListener('pointermove', onMove);\n    document.addEventListener('pointerup', onUp);\n    document.addEventListener('pointercancel', onUp);\n  }, [id, isTop, onDismiss, onDragStart, onDragEnd, onDismissStart, onDismissEnd]);\n\n  // Animation Frame Timer Logic\n  useEffect(() => {\n    if (duration === Infinity || duration <= 0) return;\n    lastTimeRef.current = Date.now();\n\n    const loop = () => {\n      const now = Date.now();\n      const delta = now - lastTimeRef.current;\n      lastTimeRef.current = now;\n\n      if (!isPausedRef.current && !dragPausedRef.current) {\n        elapsedRef.current += delta;\n\n        if (elapsedRef.current >= duration) {\n          handleDismiss();\n          return;\n        }\n      }\n\n      animationFrameRef.current = requestAnimationFrame(loop);\n    };\n\n    animationFrameRef.current = requestAnimationFrame(loop);\n\n    return () => {\n      if (animationFrameRef.current) {\n        cancelAnimationFrame(animationFrameRef.current);\n      }\n    };\n  }, [duration, handleDismiss]);\n\n  const icon = toastIcons[variant as keyof typeof toastIcons];\n\n  return (\n    <div\n      ref={innerRef}\n      className={cn('toast', css.toast, variant, resolved.root)}\n      role=\"alert\"\n      onPointerDown={handlePointerDown}\n    >\n      {icon && <div className={cn(\"toast-icon\", resolved.icon)}>{icon}</div>}\n      <div className={cn('toast-content', css.content, resolved.content)}>\n        {jsx || (\n          <>\n            {title && <h4 className={cn('toast-title', css.title, resolved.title)}>{title}</h4>}\n            {description && <p className={cn('toast-description', css.description, resolved.description)}>{description}</p>}\n          </>\n        )}\n        {toast.action}\n      </div>\n      <button\n        onClick={handleDismiss}\n        className={cn('toast-close', css.close, resolved.close)}\n        aria-label=\"Close\"\n      >\n        <X className=\"w-4 h-4\" />\n      </button>\n    </div>\n  );\n});\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .toast {\n    @apply flex w-full max-w-[28rem] items-start gap-3 px-4 py-2.5 select-none;\n    background: var(--background);\n    color: var(--foreground);\n    border: var(--border-width-base) solid var(--border);\n    border-radius: var(--radius-sm);\n    box-shadow: var(--shadow);\n    font-family: inherit;\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n    touch-action: pan-y;\n  }\n\n  .icon {\n    @apply mr-4 mt-2 h-5 w-5 shrink-0;\n    color: var(--icon-color);\n  }\n\n  .content {\n    @apply min-w-0 flex-1;\n  }\n\n  .title {\n    @apply m-0;\n    font-weight: var(--font-weight-semibold);\n    font-size: var(--text-sm);\n    line-height: var(--leading-tight);\n    color: var(--title-color);\n  }\n\n  .description {\n    @apply mt-1 mb-0;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--text-sm);\n    line-height: var(--leading-normal);\n    color: var(--description-color);\n  }\n\n  .close {\n    @apply flex shrink-0 items-center justify-center p-2 cursor-pointer;\n    background: transparent;\n    border: none;\n    border-radius: var(--radius-sm);\n    color: var(--close-color);\n    opacity: 0.6;\n    transition: opacity 0.15s ease-out;\n\n    &:focus-visible {\n      outline: 2px solid currentColor;\n      outline-offset: 2px;\n    }\n\n    @media (hover: hover) {\n      &:hover {\n        opacity: 1;\n        background: var(--close-hover-background);\n      }\n    }\n  }\n}\n",
    "cssTypes": "declare const styles: {\n  toast: string;\n  icon: string;\n  content: string;\n  title: string;\n  description: string;\n  close: string;\n  default: string;\n  danger: string;\n  success: string;\n  info: string;\n  warning: string;\n};\n\nexport default styles;\n"
  },
  "tooltip": {
    "tsx": "\"use client\";\n\nimport React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from \"react\";\n\nimport { createPortal } from \"react-dom\";\nimport { useTooltip, mergeProps } from \"react-aria\";\nimport { useFloating } from \"../../hooks/useFloat/react/useFloating\";\nimport { flip } from \"../../hooks/useFloat/core/middleware/flip\";\nimport { offset } from \"../../hooks/useFloat/core/middleware/offset\";\nimport { shift } from \"../../hooks/useFloat/core/middleware/shift\";\nimport { autoUpdate } from \"../../hooks/useFloat/dom/autoUpdate\";\nimport { cn } from \"./utils\";\nimport { useTooltipTriggerState } from \"react-stately\";\nimport { asElementProps } from \"@/lib/react-aria\";\nimport { Frame } from \"../Frame\";\nimport { Badge } from \"../Badge\";\nimport css from \"./Tooltip.module.css\";\nimport { type StylesProp, createStylesResolver } from \"@/lib/styles\";\nimport { type StyleValue } from \"./utils\";\n\nconst ARROW_PATH = \"M 0 0 C 3 0 4 -9 6 -9 C 8 -9 9 0 12 0\";\nconst ARROW_WIDTH = 12;\nconst TOOLTIP_GAP = 4;\nconst ARROW_POSITIONING_SIZE = 6;\nconst DEFAULT_SHOW_DELAY_MS = 600;\nconst SWAP_WINDOW_MS = 150;\nconst EXIT_ANIMATION_MS = 160;\n\nlet lastCloseTime = 0;\nlet lastOpenTime = 0;\nlet pendingExit: (() => void) | null = null;\n\nfunction useTimeout() {\n  const idRef = useRef<ReturnType<typeof setTimeout>>(undefined);\n\n  const start = useCallback((fn: () => void, ms: number) => {\n    clearTimeout(idRef.current);\n    idRef.current = setTimeout(fn, ms);\n  }, []);\n\n  const clear = useCallback(() => {\n    clearTimeout(idRef.current);\n  }, []);\n\n  useEffect(() => () => clearTimeout(idRef.current), []);\n\n  return [start, clear] as const;\n}\n\ntype TooltipPosition = \"top\" | \"right\" | \"bottom\" | \"left\";\n\nconst getFrameSide = (position: TooltipPosition): \"top\" | \"right\" | \"bottom\" | \"left\" => {\n  switch (position) {\n    case \"top\":\n      return \"bottom\";\n    case \"bottom\":\n      return \"top\";\n    case \"left\":\n      return \"right\";\n    case \"right\":\n      return \"left\";\n  }\n};\n\nconst getInitialTransform = (placement: string): string => {\n  switch (placement) {\n    case \"top\":\n      return \"translateY(3px) scale(0.95)\";\n    case \"bottom\":\n      return \"translateY(-3px) scale(0.95)\";\n    case \"left\":\n      return \"translateX(3px) scale(0.95)\";\n    case \"right\":\n      return \"translateX(-3px) scale(0.95)\";\n    default:\n      return \"scale(0.95)\";\n  }\n};\n\ninterface TooltipStyleSlots {\n  root?: StyleValue;\n  trigger?: StyleValue;\n  content?: StyleValue;\n  frame?: StyleValue;\n  hintBadge?: StyleValue;\n}\n\ntype TooltipStylesProp = StylesProp<TooltipStyleSlots>;\n\nconst resolveTooltipStyles = createStylesResolver([\n  'root',\n  'trigger',\n  'content',\n  'frame',\n  'hintBadge',\n] as const);\n\nexport interface TooltipProps {\n  children: React.ReactNode;\n  /** Content to display inside the tooltip */\n  content: React.ReactNode;\n  /** Preferred side of the trigger where the tooltip appears */\n  position?: TooltipPosition;\n  /** Additional CSS class for the trigger wrapper */\n  className?: string;\n  /** Milliseconds before the tooltip appears after hover */\n  delay?: number;\n  /** Whether the tooltip is disabled */\n  isDisabled?: boolean;\n  /** Controlled open state */\n  isOpen?: boolean;\n  /** Called when the tooltip opens or closes */\n  onOpenChange?: (isOpen: boolean) => void;\n  /** Whether to render a directional arrow pointing at the trigger */\n  showArrow?: boolean;\n  /** Keyboard shortcut or hint text rendered as a Badge at the end of the tooltip */\n  hint?: string;\n  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */\n  styles?: TooltipStylesProp;\n}\n\nconst Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(\n  (\n    {\n      children,\n      content,\n      position = \"top\",\n      className,\n      delay = DEFAULT_SHOW_DELAY_MS,\n      isDisabled = false,\n      isOpen: controlledIsOpen,\n      onOpenChange,\n      showArrow = false,\n      hint,\n      styles,\n    },\n    _ref\n  ) => {\n    const triggerWrapperRef = useRef<HTMLSpanElement>(null);\n    const triggerRef = useRef<HTMLElement>(null);\n    const tooltipRef = useRef<HTMLDivElement>(null);\n    const [shouldRender, setShouldRender] = useState(false);\n    const [isVisible, setIsVisible] = useState(false);\n    const [isInstant, setIsInstant] = useState(false);\n    const wasOpenRef = useRef(false);\n    const [startSwapTimer, clearSwapTimer] = useTimeout();\n    const [startUnmountTimer, clearUnmountTimer] = useTimeout();\n\n    const resolved = resolveTooltipStyles(styles);\n\n    const onOpenChangeRef = useRef(onOpenChange);\n    onOpenChangeRef.current = onOpenChange;\n\n    const state = useTooltipTriggerState({\n      isOpen: controlledIsOpen,\n      onOpenChange: useCallback((open: boolean) => {\n        if (open) lastOpenTime = Date.now();\n        else lastCloseTime = Date.now();\n        onOpenChangeRef.current?.(open);\n      }, []),\n      delay,\n      isDisabled,\n    });\n\n    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);\n\n    const { refs, floatingStyles, placement } = useFloating({\n      placement: position,\n      // Tooltips are commonly used in fixed headers; fixed positioning avoids scroll drift.\n      strategy: \"fixed\",\n      whileElementsMounted: autoUpdate,\n      middleware: [\n        offset(TOOLTIP_GAP + ARROW_POSITIONING_SIZE),\n        flip(),\n        shift({ padding: 8 }),\n      ],\n    });\n\n    const isPositioned = floatingStyles.transform !== undefined;\n\n    useEffect(() => {\n      if (state.isOpen) {\n        wasOpenRef.current = true;\n        const elapsed = Date.now() - lastCloseTime;\n        const isSwap = lastCloseTime > 0 && elapsed < SWAP_WINDOW_MS;\n\n        if (pendingExit) {\n          pendingExit();\n          pendingExit = null;\n        }\n\n        setIsInstant(isSwap);\n        setShouldRender(true);\n      } else if (wasOpenRef.current) {\n        wasOpenRef.current = false;\n\n        if (lastOpenTime > 0 && lastOpenTime >= lastCloseTime) {\n          setIsVisible(false);\n          setShouldRender(false);\n          return;\n        }\n\n        // Non-batched: delay exit to allow cross-frame swap detection.\n        // If another tooltip opens within the window, pendingExit cancels.\n        startSwapTimer(() => {\n          setIsVisible(false);\n          startUnmountTimer(() => {\n            setShouldRender(false);\n            pendingExit = null;\n          }, EXIT_ANIMATION_MS);\n        }, SWAP_WINDOW_MS);\n\n        pendingExit = () => {\n          clearSwapTimer();\n          clearUnmountTimer();\n          setIsVisible(false);\n          setShouldRender(false);\n        };\n      }\n    }, [state.isOpen]);\n\n    useEffect(() => {\n      if (shouldRender && state.isOpen && isPositioned) {\n        if (isInstant) {\n          setIsVisible(true);\n          const frame = requestAnimationFrame(() => setIsInstant(false));\n          return () => cancelAnimationFrame(frame);\n        } else {\n          requestAnimationFrame(() => {\n            requestAnimationFrame(() => {\n              setIsVisible(true);\n            });\n          });\n        }\n      }\n    }, [shouldRender, state.isOpen, isPositioned, isInstant]);\n\n    const mergedTriggerRef = useCallback((el: HTMLElement | null) => {\n      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el;\n      refs.setReference(el);\n    }, [refs]);\n\n    const mergedFloatingRef = useCallback((el: HTMLDivElement | null) => {\n      (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = el;\n      refs.setFloating(el);\n    }, [refs]);\n\n    useLayoutEffect(() => {\n      const wrapper = triggerWrapperRef.current;\n      const reference = wrapper?.firstElementChild instanceof HTMLElement\n        ? wrapper.firstElementChild\n        : wrapper;\n\n      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = reference;\n      refs.setReference(reference);\n    }, [children, refs]);\n\n    useEffect(() => {\n      const trigger = triggerRef.current;\n      if (!trigger || isDisabled) {\n        return;\n      }\n\n      const handleMouseEnter = () => state.open();\n      const handleMouseLeave = () => state.close();\n      const handleFocusIn = () => state.open(true);\n      const handleFocusOut = (event: FocusEvent) => {\n        if (event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget)) {\n          return;\n        }\n\n        state.close(true);\n      };\n\n      trigger.addEventListener(\"mouseenter\", handleMouseEnter);\n      trigger.addEventListener(\"mouseleave\", handleMouseLeave);\n      trigger.addEventListener(\"focusin\", handleFocusIn);\n      trigger.addEventListener(\"focusout\", handleFocusOut);\n\n      return () => {\n        trigger.removeEventListener(\"mouseenter\", handleMouseEnter);\n        trigger.removeEventListener(\"mouseleave\", handleMouseLeave);\n        trigger.removeEventListener(\"focusin\", handleFocusIn);\n        trigger.removeEventListener(\"focusout\", handleFocusOut);\n      };\n    }, [children, isDisabled, state]);\n\n    const trigger = triggerRef.current;\n    const isTriggerVisible = !!(trigger && (trigger.offsetWidth > 0 || trigger.offsetHeight > 0));\n    const child = React.Children.only(children);\n\n    const triggerElement = React.isValidElement(child) && child.type !== React.Fragment\n      ? (\n        <span\n          ref={triggerWrapperRef}\n          className={cn(css.trigger, className, resolved.trigger)}\n        >\n          {child}\n        </span>\n      )\n      : (\n        <span\n          ref={mergedTriggerRef}\n          className={cn(css.trigger, className, resolved.trigger)}\n          style={{ display: \"inline-block\" }}\n        >\n          {children}\n        </span>\n      );\n\n    return (\n      <>\n        {triggerElement}\n\n        {shouldRender &&\n          createPortal(\n            <div\n              ref={mergedFloatingRef}\n              {...asElementProps<\"div\">(mergeProps(ariaTooltipProps))}\n              className={cn(css.root, resolved.root)}\n              style={{\n                ...floatingStyles,\n              }}\n            >\n              <div\n                className={cn('tooltip', 'content', css.content, resolved.content)}\n                data-visible={(isVisible && isTriggerVisible) ? \"true\" : \"false\"}\n                data-instant={(isInstant || !isTriggerVisible) ? \"true\" : undefined}\n                style={{\n                  transform: (isVisible && isTriggerVisible) ? \"scale(1)\" : getInitialTransform(placement),\n                }}\n              >\n                <Frame\n                  side={showArrow ? getFrameSide(position) : position}\n                  shapeMode={showArrow ? \"extend\" : undefined}\n                  path={showArrow ? ARROW_PATH : undefined}\n                  pathWidth={showArrow ? ARROW_WIDTH : undefined}\n                  cornerRadius={8}\n                  padding=\"none\"\n                >\n                  <div className={cn('tooltip', 'frame', css.frame, resolved.frame)} data-hint={hint ? \"\" : undefined}>\n                    {content}\n                    {hint && <Badge variant=\"secondary\" size=\"sm\" className={cn(resolved.hintBadge)}>{hint}</Badge>}\n                  </div>\n                </Frame>\n              </div>\n            </div>,\n            document.body\n          )}\n      </>\n    );\n  }\n);\n\nTooltip.displayName = \"Tooltip\";\n\nexport { Tooltip };\n",
    "css": "@reference \"tailwindcss\";\n\n@layer components {\n  .trigger {\n    display: contents;\n  }\n\n  .root {\n    @apply absolute;\n    pointer-events: none;\n    z-index: 50;\n  }\n\n  .content {\n    --frame-fill: var(--tooltip-fill);\n    --frame-stroke-color: var(--tooltip-border-color);\n    opacity: 0;\n    transition: opacity 0.15s ease-out, transform 0.15s ease-out;\n  }\n\n  .content[data-visible=\"true\"] {\n    opacity: 1;\n    pointer-events: auto;\n  }\n\n  .frame {\n    @apply flex items-center gap-1.5 px-2 py-1 whitespace-nowrap;;\n    color: var(--foreground);\n  }\n\n  .frame[data-hint] {\n    @apply pr-1;\n  }\n}\n",
    "cssTypes": "export interface Styles {\n  trigger: string;\n  root: string;\n  content: string;\n  frame: string;\n}\n\ndeclare const styles: Styles;\nexport default styles;\n"
  }
};

export const reactAriaUrls: Record<string, string> = {
  "anchor": "",
  "badge": "",
  "banner": "",
  "button": "https://react-spectrum.adobe.com/react-aria/useButton.html",
  "card": "",
  "checkbox": "https://react-spectrum.adobe.com/react-aria/useCheckbox.html",
  "code": "",
  "color": "",
  "command": "",
  "confirm": "",
  "date": "",
  "divider": "",
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
  "path": "https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html",
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
  "path": {
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
  "version": "0.3.41"
};
