import type { ComponentRegistry } from './types.js';

export const componentRegistry: ComponentRegistry = {
  anchor: {
    id: "anchor",
    name: "Anchor",
    description: "Link with animated underline and popover preview.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Anchor",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["popover","breadcrumbs"],
    tags: ["navigation","interactive","link"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible with focus visible states","Built on Popover for accessible overlay handling","Screen reader friendly"]},
    usage: undefined,
    examples: [
    {
        "title": "Inline Text",
        "description": "Anchor used inline within a paragraph — the primary use case for navigational links.",
        "code": "import { Anchor } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <p className=\"text-sm text-foreground max-w-prose leading-relaxed\">\n      Read the{\" \"}\n      <Anchor href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a\">\n        MDN documentation\n      </Anchor>{\" \"}\n      for a full reference on anchor semantics, or check the{\" \"}\n      <Anchor href=\"https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html\">\n        WCAG link purpose guidelines\n      </Anchor>{\" \"}\n      for accessibility requirements.\n    </p>\n  );\n}"
    },
    {
        "title": "Underline Variants",
        "description": "Three underline styles available via Anchor.Underline: solid (default), dashed, and dotted.",
        "code": "import { Anchor, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"lg\" align=\"center\">\n      <Anchor href=\"#\">\n        Solid\n      </Anchor>\n      <Anchor href=\"#\">\n        <Anchor.Underline variant=\"dashed\" />\n        Dashed\n      </Anchor>\n      <Anchor href=\"#\">\n        <Anchor.Underline variant=\"dotted\" />\n        Dotted\n      </Anchor>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Preview Tooltip",
        "description": "Hover over the links to see a tooltip preview — composed via the preview prop or Anchor.Preview.",
        "code": "import { Anchor, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"lg\" align=\"center\">\n      <Anchor\n        href=\"https://github.com\"\n        preview={\n          <span className=\"text-xs text-foreground-400\">github.com</span>\n        }\n      >\n        GitHub\n      </Anchor>\n      <Anchor href=\"https://vercel.com\">\n        <Anchor.Preview>\n          <span className=\"text-xs text-foreground-400\">vercel.com</span>\n        </Anchor.Preview>\n        Vercel\n      </Anchor>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Breadcrumb",
        "description": "Anchor used as navigational crumbs — the last segment is non-interactive text.",
        "code": "import { Anchor, Flex } from 'ui-lab-components';\n\nconst crumbs = [\n  { label: 'Home', href: '/' },\n  { label: 'Projects', href: '/projects' },\n  { label: 'ui-lab', href: '/projects/ui-lab' },\n];\n\nexport default function Example() {\n  return (\n    <Flex gap=\"xs\" align=\"center\" className=\"text-sm\">\n      {crumbs.map((crumb, i) => (\n        <span key={crumb.href} className=\"flex items-center gap-xs\">\n          {i > 0 && <span className=\"text-foreground-400 mx-1\">/</span>}\n          {i < crumbs.length - 1 ? (\n            <Anchor href={crumb.href}>{crumb.label}</Anchor>\n          ) : (\n            <span className=\"text-foreground-400\">{crumb.label}</span>\n          )}\n        </span>\n      ))}\n    </Flex>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Status Labels",
        "description": "Inline status labels alongside text content, such as document or workflow states.",
        "code": "import { Badge, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"sm\" align=\"center\" justify=\"center\" wrap=\"wrap\">\n      <Badge variant=\"default\">Draft</Badge>\n      <Badge variant=\"default\">In Review</Badge>\n      <Badge variant=\"default\">Published</Badge>\n      <Badge variant=\"default\">Archived</Badge>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Icon Position",
        "description": "Icons placed on the left or right of the label — left for status/type indicators, right for directional cues.",
        "code": "import { Badge, Flex } from 'ui-lab-components';\nimport { FaCircleCheck, FaTriangleExclamation, FaArrowRight, FaStar } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"xs\" align=\"center\" justify=\"center\" wrap=\"wrap\">\n      <Badge icon={{ left: <FaCircleCheck size={10} /> }}>Verified</Badge>\n      <Badge icon={{ left: <FaTriangleExclamation size={10} /> }}>Warning</Badge>\n      <Badge icon={{ right: <FaArrowRight size={10} /> }}>Continue</Badge>\n      <Badge icon={{ right: <FaStar size={10} /> }}>Featured</Badge>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Selectable Tags",
        "description": "Icon-prefixed tags that toggle active state, e.g. for filtering or labeling.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Badge, Flex } from 'ui-lab-components';\nimport { FaTag } from 'react-icons/fa6';\n\nconst tags = ['design', 'frontend', 'api', 'docs'];\n\nexport default function Example() {\n  const [active, setActive] = useState<string[]>(['design']);\n\n  function toggle(tag: string) {\n    setActive((prev) =>\n      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]\n    );\n  }\n\n  return (\n    <Flex gap=\"xs\" align=\"center\" justify=\"center\" wrap=\"wrap\">\n      {tags.map((tag) => (\n        <Badge\n          key={tag}\n          icon={<FaTag size={10} />}\n          onClick={() => toggle(tag)}\n          style={{\n            cursor: 'pointer',\n            opacity: active.includes(tag) ? 1 : 0.45,\n          }}\n        >\n          {tag}\n        </Badge>\n      ))}\n    </Flex>\n  );\n}"
    },
    {
        "title": "Dismissible Tags",
        "description": "Applied label chips in a multi-select input or filter bar that can be individually removed.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Badge, Flex } from 'ui-lab-components';\n\nconst initial = ['React', 'TypeScript', 'CSS Modules', 'Next.js', 'Radix UI'];\n\nexport default function Example() {\n  const [tags, setTags] = useState(initial);\n\n  return (\n    <Flex gap=\"xs\" align=\"center\" justify=\"center\" wrap=\"wrap\">\n      {tags.map((tag) => (\n        <Badge\n          key={tag}\n          dismissible\n          onDismiss={() => setTags((prev) => prev.filter((t) => t !== tag))}\n        >\n          {tag}\n        </Badge>\n      ))}\n      {tags.length === 0 && (\n        <span\n          className=\"text-sm text-foreground-400 cursor-pointer\"\n          onClick={() => setTags(initial)}\n        >\n          All dismissed — click to reset\n        </span>\n      )}\n    </Flex>\n  );\n}"
    },
    {
        "title": "Semantic Colors",
        "description": "Badges styled with design system semantic color tokens for success, warning, danger, info, and accent states.",
        "code": "import { Badge, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex gap=\"sm\" align=\"center\" justify=\"center\" wrap=\"wrap\">\n      <Badge className=\"bg-success-500/20 text-success-500 border-none\">Success</Badge>\n      <Badge className=\"bg-warning-500/20 text-warning-500 border-none\">Warning</Badge>\n      <Badge className=\"bg-danger-500/20 text-danger-500 border-none\">Danger</Badge>\n      <Badge className=\"bg-info-500/20 text-info-500 border-none\">Info</Badge>\n      <Badge className=\"bg-accent-500/20 text-accent-500 border-none\">Accent</Badge>\n    </Flex>\n  );\n}"
    }
],
  },

  banner: {
    id: "banner",
    name: "Banner",
    description: "Full-width strip for surfacing alerts, notices, and messages.",
    category: "information",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Banner",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","alert","badge"],
    tags: ["notification","layout","visual","full-width"],
    accessibility: {"hasAriaSupport":true,"notes":["Supports keyboard navigation for dismiss button","Semantic HTML structure","ARIA labels for accessibility","Focus management for interactive elements"]},
    usage: undefined,
    examples: [
    {
        "title": "Variants",
        "description": "All five semantic variants: note, info, success, warning, and danger.",
        "code": "import { Banner, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 480 }}>\n      <Banner variant=\"note\">\n        <Banner.Title>Note</Banner.Title>\n        <Banner.Body>This is a general note with supplementary context.</Banner.Body>\n      </Banner>\n      <Banner variant=\"info\">\n        <Banner.Title>Info</Banner.Title>\n        <Banner.Body>Your workspace is on the free plan. Upgrade to unlock more seats.</Banner.Body>\n      </Banner>\n      <Banner variant=\"success\">\n        <Banner.Title>Success</Banner.Title>\n        <Banner.Body>Your changes have been saved and are now live.</Banner.Body>\n      </Banner>\n      <Banner variant=\"warning\">\n        <Banner.Title>Warning</Banner.Title>\n        <Banner.Body>This action cannot be undone. Proceed with caution.</Banner.Body>\n      </Banner>\n      <Banner variant=\"danger\">\n        <Banner.Title>Danger</Banner.Title>\n        <Banner.Body>Your account has exceeded its storage limit.</Banner.Body>\n      </Banner>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Dismissible",
        "description": "A banner with a dismiss button. The caller controls what happens after dismissal.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Banner, Button, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [dismissed, setDismissed] = useState(false);\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 480 }}>\n      {!dismissed ? (\n        <Banner variant=\"info\" isDismissible onDismiss={() => setDismissed(true)}>\n          <Banner.Title>Scheduled maintenance</Banner.Title>\n          <Banner.Body>The system will be unavailable on Saturday from 2–4 AM UTC.</Banner.Body>\n        </Banner>\n      ) : (\n        <Flex gap=\"sm\" style={{ alignItems: 'center' }}>\n          <span className=\"text-sm text-foreground-400\">Banner dismissed.</span>\n          <Button variant=\"ghost\" onClick={() => setDismissed(false)}>\n            Restore\n          </Button>\n        </Flex>\n      )}\n    </Flex>\n  );\n}"
    },
    {
        "title": "Form Feedback",
        "description": "Banners shown conditionally after a form action to relay success or failure.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Banner, Button, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [submitted, setSubmitted] = useState(false);\n  const [error, setError] = useState(false);\n\n  const handleSubmit = () => {\n    if (!submitted) {\n      setError(true);\n      return;\n    }\n    setError(false);\n  };\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 400 }}>\n      {error && (\n        <Banner variant=\"danger\" isDismissible onDismiss={() => setError(false)}>\n          <Banner.Title>Submission failed</Banner.Title>\n          <Banner.Body>Please review the form and correct any errors before retrying.</Banner.Body>\n        </Banner>\n      )}\n      {submitted && !error && (\n        <Banner variant=\"success\">\n          <Banner.Title>Profile updated</Banner.Title>\n          <Banner.Body>Your changes have been saved successfully.</Banner.Body>\n        </Banner>\n      )}\n      <Flex gap=\"sm\">\n        <Button variant=\"primary\" onClick={() => { setSubmitted(true); setError(false); }}>\n          Save changes\n        </Button>\n        <Button variant=\"secondary\" onClick={() => { setSubmitted(false); handleSubmit(); }}>\n          Trigger error\n        </Button>\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Settings Panel",
        "description": "A small warning banner inline with a destructive settings action.",
        "code": "import { Banner, Button, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 420 }}>\n      <div>\n        <p className=\"text-sm font-semibold text-foreground-100\">API Access</p>\n        <p className=\"text-xs text-foreground-400\">Manage keys for external integrations.</p>\n      </div>\n      <Banner variant=\"warning\">\n        <Banner.Body>Regenerating your key will revoke all existing integrations immediately.</Banner.Body>\n      </Banner>\n      <Button variant=\"secondary\">Regenerate API key</Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Body Only",
        "description": "Single-line banners without a title for compact inline notifications.",
        "code": "import { Banner, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 480 }}>\n      <Banner variant=\"info\" isDismissible>\n        <Banner.Body>\n          Two-factor authentication is not enabled on your account.{' '}\n          <a href=\"#\" className=\"underline\">Enable now</a>\n        </Banner.Body>\n      </Banner>\n      <Banner variant=\"success\" isDismissible>\n        <Banner.Body>Deployment #142 completed in 38 seconds.</Banner.Body>\n      </Banner>\n    </Flex>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Button Variants",
        "description": "All available button variants side by side in a single row.",
        "code": "import React from 'react'\nimport { Button, Flex } from 'ui-lab-components'\n\nconst buttonVariants = [\n  { label: \"Primary\", variant: \"primary\" },\n  { label: \"Default\", variant: \"default\" },\n  { label: \"Secondary\", variant: \"secondary\" },\n  { label: \"Outline\", variant: \"outline\" },\n  { label: \"Ghost\", variant: \"ghost\" },\n  { label: \"Danger\", variant: \"danger\" },\n] as const;\n\nexport default function Example() {\n  return (\n    <Flex gap=\"xs\" align=\"center\" justify=\"center\" wrap=\"nowrap\">\n      {buttonVariants.map((button) => (\n        <Button key={button.variant} variant={button.variant}>\n          {button.label}\n        </Button>\n      ))}\n    </Flex>\n  )\n}"
    },
    {
        "title": "Multiple Actions",
        "description": "A primary action button grouped with secondary actions and an options menu.",
        "code": "\"use client\";\n\nimport { Button, Flex } from 'ui-lab-components'\nimport { FaEllipsisVertical } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Flex gap=\"xs\" className=\"w-110 *:not-last:flex-1\">\n      <Button size=\"sm\" variant=\"primary\" >Subscribe</Button>\n      <Button size=\"sm\" >Message</Button>\n      <Button size=\"icon\" variant=\"outline\" icon={<FaEllipsisVertical />} />\n    </Flex>\n  );\n}"
    },
    {
        "title": "Joined Toggle Buttons",
        "description": "Multiple buttons grouped together for view/mode selection with active state indication.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Group, Divider, Input, Flex } from 'ui-lab-components'\nimport { FaList, FaGrip, FaTable, FaPlus } from \"react-icons/fa6\";\nimport { LuSearch } from \"react-icons/lu\";\n\nexport default function Example() {\n  const [viewMode, setViewMode] = useState(\"list\");\n  return (\n    <Flex className=\"w-110\" gap=\"xs\" align=\"center\">\n      <Input\n        placeholder=\"Search items...\"\n        icon={<LuSearch />}\n        className=\"w-full\"\n      />\n      <Group orientation=\"horizontal\" value={viewMode} onChange={setViewMode}>\n        <Group.Button size=\"icon\" value=\"list\"><FaList /></Group.Button>\n        <Divider orientation=\"vertical\" />\n        <Group.Button size=\"icon\" value=\"grid\"><FaGrip /></Group.Button>\n        <Divider orientation=\"vertical\" />\n        <Group.Button size=\"icon\" value=\"table\"><FaTable /></Group.Button>\n      </Group>\n      <Button size=\"sm\" icon={{ left: <FaPlus size={12} /> }} >New</Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Sub Stack Actions",
        "description": "A collection of buttons and inputs arranged horizontally for grouped actions and filtering.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Group, Input, Badge, Flex } from 'ui-lab-components'\nimport { FaList, FaGrip, FaPlus } from \"react-icons/fa6\";\nimport { LuSearch } from \"react-icons/lu\";\n\nexport default function Example() {\n  const [viewMode, setViewMode] = useState(\"list\");\n  return (\n    <Flex align=\"center\" gap=\"xs\" className=\"w-110\">\n      <Group orientation=\"horizontal\" spacing=\"xs\" value={viewMode} onChange={setViewMode}>\n        <Group.Button size=\"icon\" value=\"list\"><FaList /></Group.Button>\n        <Group.Button size=\"icon\" value=\"grid\"><FaGrip /></Group.Button>\n      </Group>\n      <Input\n        placeholder=\"Search...\"\n        icon={<LuSearch />}\n        hint={<Badge variant=\"secondary\" >Ctrl+K</Badge>}\n      />\n      <Button size=\"sm\" icon={{ right: <FaPlus size={12} /> }} >Upload</Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Split Action Button",
        "description": "A split button for bulk actions with dynamic icons, variants, and async feedback while keeping the primary action easy to repeat.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Divider, Select, Badge, Flex } from 'ui-lab-components'\nimport { FaBox, FaSpinner, FaCheck, FaEllipsisVertical, FaCopy, FaTags, FaTrash } from \"react-icons/fa6\";\n\ntype BulkAction = \"archive\" | \"duplicate\" | \"tag\" | \"delete\";\n\nconst selectedCount: number = 12;\n\nconst bulkActions: Record<BulkAction, {\n  label: string;\n  loadingLabel: string;\n  successLabel: string;\n  variant: \"primary\" | \"outline\" | \"danger\";\n  icon: React.ReactNode;\n}> = {\n  archive: {\n    label: \"Archive\",\n    loadingLabel: \"Archiving...\",\n    successLabel: \"Archived\",\n    variant: \"primary\",\n    icon: <FaBox />,\n  },\n  duplicate: {\n    label: \"Duplicate\",\n    loadingLabel: \"Duplicating...\",\n    successLabel: \"Duplicated\",\n    variant: \"outline\",\n    icon: <FaCopy />,\n  },\n  tag: {\n    label: \"Add Tags\",\n    loadingLabel: \"Applying tags...\",\n    successLabel: \"Tagged\",\n    variant: \"outline\",\n    icon: <FaTags />,\n  },\n  delete: {\n    label: \"Delete\",\n    loadingLabel: \"Deleting...\",\n    successLabel: \"Deleted\",\n    variant: \"danger\",\n    icon: <FaTrash />,\n  },\n};\n\nexport default function Example() {\n  const [action, setAction] = useState<BulkAction>(\"archive\");\n  const [status, setStatus] = useState<\"idle\" | \"loading\" | \"done\">(\"idle\");\n  const cfg = bulkActions[action];\n  const itemsLabel = `${selectedCount} ${selectedCount === 1 ? \"item\" : \"items\"}`;\n\n  const handleExecute = () => {\n    setStatus(\"loading\");\n    setTimeout(() => {\n      setStatus(\"done\");\n      setTimeout(() => setStatus(\"idle\"), 2000);\n    }, 1500);\n  };\n\n  const leftIcon = status === \"loading\" ? <FaSpinner className=\"animate-spin\" /> : status === \"done\" ? <FaCheck /> : cfg.icon;\n  const label = status === \"loading\" ? cfg.loadingLabel : status === \"done\" ? cfg.successLabel : `${cfg.label} ${itemsLabel}`;\n\n  return (\n    <Flex gap=\"xs\" className=\"w-110\" align=\"center\">\n      <Badge variant=\"secondary\">{selectedCount} selected</Badge>\n      <Select className=\"flex h-10\" selectedKey={action} onSelectionChange={(key) => setAction(key as BulkAction)} isDisabled={status !== \"idle\"}>\n        <Button\n          onPress={handleExecute}\n          variant={cfg.variant}\n          size=\"sm\"\n          className=\"w-full rounded-none justify-start\"\n          isDisabled={status !== \"idle\" || selectedCount === 0}\n          icon={leftIcon}\n        >\n          {label}\n        </Button>\n        <Divider orientation=\"vertical\" spacing=\"none\" />\n        <Select.Trigger aria-label=\"Choose a bulk action\" />\n        <Select.Content>\n          <Select.Item value=\"archive\" textValue=\"Archive\" icon={<FaBox className=\"h-3 w-3\" />}>Archive</Select.Item>\n          <Select.Item value=\"duplicate\" textValue=\"Duplicate\" icon={<FaCopy className=\"h-3 w-3\" />}>Duplicate</Select.Item>\n          <Select.Item value=\"tag\" textValue=\"Add Tags\" icon={<FaTags className=\"h-3 w-3\" />}>Add Tags</Select.Item>\n          <Select.Item value=\"delete\" textValue=\"Delete\" icon={<FaTrash className=\"h-3 w-3\" />}>Delete</Select.Item>\n        </Select.Content>\n      </Select>\n      <Button size=\"icon\" variant=\"outline\" icon={<FaEllipsisVertical />} aria-label=\"More bulk actions\" />\n    </Flex>\n  );\n}"
    },
    {
        "title": "Icons",
        "description": "Left, right, and icon-only button patterns.",
        "code": "import React from 'react'\nimport { Button, Flex } from 'ui-lab-components'\nimport { FaArrowRight, FaDownload, FaEllipsisVertical, FaPlus } from 'react-icons/fa6'\n\nexport default function Example() {\n  return (\n    <Flex gap=\"xs\" align=\"center\" justify=\"center\" wrap=\"wrap\">\n      <Button variant=\"primary\" icon={{ left: <FaPlus /> }}>\n        New Project\n      </Button>\n      <Button variant=\"outline\" icon={{ right: <FaArrowRight /> }}>\n        Continue\n      </Button>\n      <Button variant=\"secondary\" icon={<FaDownload />}>\n        Download\n      </Button>\n      <Button size=\"icon\" variant=\"ghost\" aria-label=\"More actions\" icon={<FaEllipsisVertical />} />\n    </Flex>\n  )\n}"
    },
    {
        "title": "Split Button",
        "description": "Group + Select primitives for a classic split button with a primary action and a separate menu trigger.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Divider, Flex, Group, Select } from 'ui-lab-components'\nimport { FaChevronDown } from 'react-icons/fa6'\n\nconst splitActions = [\n  { value: \"publish\", label: \"Publish now\" },\n  { value: \"schedule\", label: \"Schedule publish\" },\n  { value: \"save\", label: \"Save draft\" },\n] as const;\n\nexport default function Example() {\n  const [action, setAction] = useState<string | number | null>(splitActions[0].value);\n  const selectedAction = splitActions.find((item) => item.value === action) ?? splitActions[0];\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" align=\"center\">\n      <Group orientation=\"horizontal\">\n        <Group.Select className=\"w-full\" selectedKey={action} onSelectionChange={setAction}>\n          <Select.Value>\n            <Button variant=\"primary\">{selectedAction.label}</Button>\n          </Select.Value>\n          <Divider />\n          <Select.Trigger\n            chevron={<FaChevronDown className=\"h-3.5 w-3.5\" />}\n            aria-label=\"Choose split action\"\n          />\n          <Select.Content>\n            <Select.List>\n              {splitActions.map((item) => (\n                <Select.Item key={item.value} value={item.value} textValue={item.label}>\n                  {item.label}\n                </Select.Item>\n              ))}\n            </Select.List>\n          </Select.Content>\n        </Group.Select>\n      </Group>\n    </Flex>\n  )\n}"
    },
    {
        "title": "Button Group",
        "description": "Joined view switcher using the Group compound component with active state.",
        "code": "\"use client\";\n\nimport React, { useState } from 'react'\nimport { Button, Divider, Group } from 'ui-lab-components'\nimport { FaGrip, FaList, FaTable } from 'react-icons/fa6'\n\nexport default function Example() {\n  const [viewMode, setViewMode] = useState(\"list\");\n\n  return (\n    <Group orientation=\"horizontal\" spacing=\"xs\">\n      <Group.Button active={viewMode === \"list\"} onPress={() => setViewMode(\"list\")}>\n        <FaList className=\"mr-1.5 text-foreground-400\" /> List\n      </Group.Button>\n      <Divider orientation=\"vertical\" />\n      <Group.Button active={viewMode === \"grid\"} onPress={() => setViewMode(\"grid\")}>\n        <FaGrip className=\"mr-1.5 text-foreground-400\" /> Grid\n      </Group.Button>\n      <Divider orientation=\"vertical\" />\n      <Group.Button active={viewMode === \"table\"} onPress={() => setViewMode(\"table\")}>\n        <FaTable className=\"mr-1.5 text-foreground-400\" /> Table\n      </Group.Button>\n    </Group>\n  )\n}"
    }
],
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
    usage: {"summary":"Use Card as a top-level surface that groups related content into a single visual panel.","whenToUse":["Page sections that need their own surface boundary","Standalone panels such as summaries, settings sections, and detail blocks","Collections of related content that benefit from header/body/footer structure"],"whenNotToUse":["Inside other surfaced overlays like Modal, Popover, Confirm, or Menu","For simple internal spacing inside an existing surfaced component","As a generic replacement for every padded container"],"rules":[{"type":"do","title":"Reserve Card for top-level surfaces","description":"Treat Card as the main boundary for a section or standalone block, not as a default inner wrapper."},{"type":"avoid","title":"Do not nest Card inside overlay surfaces","description":"Avoid putting Card inside Modal, Popover, Confirm, or Menu because it creates double-surface chrome and weakens hierarchy.","relatedComponents":["modal","popover","confirm","menu"]},{"type":"prefer","title":"Prefer layout primitives for internal grouping","description":"When content already sits inside a surfaced component, use Flex, Grid, Group, or the host component's slots to structure it instead of adding another Card.","relatedComponents":["flex","grid","group","modal"]}]},
    examples: [
    {
        "title": "Notification Card",
        "description": "A status-driven card with a badge, body copy, and a footer action. Caller controls read state.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Card, Button, Flex, Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  const [read, setRead] = useState(false);\n\n  return (\n    <Card style={{ width: 360, opacity: read ? 0.6 : 1, transition: 'opacity 0.2s' }}>\n      <Card.Header>\n        <Flex justify=\"between\" align=\"center\">\n          <span className=\"text-sm font-medium text-foreground-100\">Deployment failed</span>\n          <Badge variant=\"destructive\">Error</Badge>\n        </Flex>\n      </Card.Header>\n      <Card.Body>\n        <p className=\"text-sm text-foreground-400\">\n          The production deploy of <span className=\"text-foreground-200\">api-gateway</span> failed at step \"Run tests\". Check the logs for details.\n        </p>\n      </Card.Body>\n      <Card.Footer>\n        <Flex justify=\"between\" align=\"center\">\n          <span className=\"text-xs text-foreground-500\">2 minutes ago</span>\n          <Button size=\"sm\" variant=\"ghost\" onPress={() => setRead(true)}>\n            Mark as read\n          </Button>\n        </Flex>\n      </Card.Footer>\n    </Card>\n  );\n}"
    },
    {
        "title": "Settings Panel",
        "description": "Card used as a settings section with a list of toggle rows and save/cancel actions in the footer.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Card, Button, Flex, Switch } from 'ui-lab-components';\n\nconst items = [\n  { label: 'Email alerts', description: 'Receive alerts via email' },\n  { label: 'Push notifications', description: 'Browser push notifications' },\n  { label: 'Weekly digest', description: 'Summary sent every Monday' },\n];\n\nexport default function Example() {\n  const [enabled, setEnabled] = useState(true);\n\n  return (\n    <Card style={{ width: 360 }}>\n      <Card.Header>\n        <span className=\"text-sm font-medium text-foreground-100\">Notifications</span>\n      </Card.Header>\n      <Card.Body className=\"space-y-4 py-4\">\n        {items.map((item) => (\n          <Flex key={item.label} justify=\"between\" align=\"center\">\n            <div>\n              <p className=\"text-sm text-foreground-100\">{item.label}</p>\n              <p className=\"text-xs text-foreground-500\">{item.description}</p>\n            </div>\n            <Switch\n              isSelected={enabled}\n              onChange={setEnabled}\n              aria-label={item.label}\n            />\n          </Flex>\n        ))}\n      </Card.Body>\n      <Card.Footer>\n        <Flex justify=\"end\" gap=\"xs\">\n          <Button size=\"sm\" variant=\"ghost\">Cancel</Button>\n          <Button size=\"sm\" variant=\"primary\">Save</Button>\n        </Flex>\n      </Card.Footer>\n    </Card>\n  );\n}"
    },
    {
        "title": "Task Progress",
        "description": "Card displaying a checklist with a progress bar in the header to summarize completion state.",
        "code": "import { Card, Button, Flex, Progress } from 'ui-lab-components';\n\nconst tasks = [\n  { label: 'Design review', done: true },\n  { label: 'Write changelog', done: true },\n  { label: 'Update docs', done: false },\n  { label: 'Deploy to staging', done: false },\n];\n\nconst completed = tasks.filter((t) => t.done).length;\n\nexport default function Example() {\n  return (\n    <Card style={{ width: 360 }}>\n      <Card.Header>\n        <Flex justify=\"between\" align=\"center\">\n          <span className=\"text-sm font-medium text-foreground-100\">Release v2.4.0</span>\n          <span className=\"text-xs text-foreground-500\">{completed}/{tasks.length}</span>\n        </Flex>\n        <Progress value={(completed / tasks.length) * 100} className=\"mt-2\" />\n      </Card.Header>\n      <Card.Body className=\"py-3\">\n        <ul className=\"space-y-2\">\n          {tasks.map((task) => (\n            <li key={task.label} className=\"flex items-center gap-2 text-sm\">\n              <span className={task.done ? 'text-foreground-500 line-through' : 'text-foreground-200'}>\n                {task.label}\n              </span>\n            </li>\n          ))}\n        </ul>\n      </Card.Body>\n      <Card.Footer>\n        <Button size=\"sm\" variant=\"outline\" className=\"w-full\">View milestone</Button>\n      </Card.Footer>\n    </Card>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Basic States",
        "description": "The default checkbox states: unchecked, checked, disabled, and disabled checked.",
        "code": "import { Checkbox, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 280 }}>\n      <Checkbox id=\"basic-unchecked\" label=\"Unchecked\" />\n      <Checkbox id=\"basic-checked\" label=\"Checked\" defaultChecked />\n      <Checkbox id=\"basic-disabled\" label=\"Disabled\" disabled />\n      <Checkbox id=\"basic-disabled-checked\" label=\"Disabled checked\" disabled defaultChecked />\n    </Flex>\n  );\n}"
    },
    {
        "title": "Helper and Error Text",
        "description": "A labeled checkbox can include supporting text and an invalid state for form feedback.",
        "code": "import { Checkbox, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"lg\" style={{ width: 320 }}>\n      <Checkbox\n        id=\"helper-release-notes\"\n        label=\"Release notes\"\n        helper=\"Get a short product update when a new version ships.\"\n        defaultChecked\n      />\n      <Checkbox\n        id=\"helper-terms\"\n        label=\"Accept terms\"\n        helper=\"You must accept the terms before continuing.\"\n        helperTextError\n        aria-invalid=\"true\"\n      />\n    </Flex>\n  );\n}"
    },
    {
        "title": "Controlled",
        "description": "Use checked and onChange when checkbox state is owned by the surrounding interface.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Button, Checkbox, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [checked, setChecked] = useState(true);\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 300 }}>\n      <Checkbox\n        id=\"controlled-email\"\n        label=\"Email notifications\"\n        helper={checked ? 'Notifications are enabled.' : 'Notifications are paused.'}\n        checked={checked}\n        onChange={(event) => setChecked(event.currentTarget.checked)}\n      />\n      <Button variant=\"secondary\" onClick={() => setChecked((value) => !value)}>\n        {checked ? 'Turn off' : 'Turn on'}\n      </Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Checkbox Group",
        "description": "Use a small group when a user can select any number of related options.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Checkbox, Flex } from 'ui-lab-components';\n\nconst subscriptionOptions = [\n  'Product updates',\n  'Security alerts',\n  'Billing reminders',\n];\n\nexport default function Example() {\n  const [selected, setSelected] = useState<Set<string>>(\n    new Set(['Product updates', 'Security alerts'])\n  );\n\n  const toggleOption = (option: string) => {\n    setSelected((current) => {\n      const next = new Set(current);\n      next.has(option) ? next.delete(option) : next.add(option);\n      return next;\n    });\n  };\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 300 }}>\n      <div>\n        <p className=\"text-sm font-medium text-foreground-100\">Subscriptions</p>\n        <p className=\"text-xs text-foreground-400\">Choose the emails this workspace receives.</p>\n      </div>\n      <Flex direction=\"column\" gap=\"sm\">\n        {subscriptionOptions.map((option) => (\n          <Checkbox\n            key={option}\n            id={`subscription-${option.toLowerCase().replace(/ /g, '-')}`}\n            label={option}\n            checked={selected.has(option)}\n            onChange={() => toggleOption(option)}\n          />\n        ))}\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Indeterminate",
        "description": "A parent checkbox can show partial selection when only some child options are checked.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Checkbox, Divider, Flex } from 'ui-lab-components';\n\nconst tableColumns = ['Name', 'Email', 'Role', 'Last active'];\n\nexport default function Example() {\n  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(\n    new Set(['Name', 'Email'])\n  );\n\n  const allSelected = visibleColumns.size === tableColumns.length;\n  const isIndeterminate = visibleColumns.size > 0 && !allSelected;\n\n  const toggleAll = () => {\n    setVisibleColumns(allSelected ? new Set() : new Set(tableColumns));\n  };\n\n  const toggleColumn = (column: string) => {\n    setVisibleColumns((current) => {\n      const next = new Set(current);\n      next.has(column) ? next.delete(column) : next.add(column);\n      return next;\n    });\n  };\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 280 }}>\n      <Checkbox\n        id=\"columns-all\"\n        label=\"Show all columns\"\n        checked={allSelected}\n        isIndeterminate={isIndeterminate}\n        onChange={toggleAll}\n      />\n      <Divider />\n      <Flex direction=\"column\" gap=\"sm\" styles={{ root: 'pl-8' }}>\n        {tableColumns.map((column) => (\n          <Checkbox\n            key={column}\n            id={`column-${column.toLowerCase().replace(/ /g, '-')}`}\n            label={column}\n            checked={visibleColumns.has(column)}\n            onChange={() => toggleColumn(column)}\n          />\n        ))}\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Consent Form",
        "description": "A required checkbox can gate a form action while optional choices remain independent.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Button, Checkbox, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [accepted, setAccepted] = useState(false);\n  const [updates, setUpdates] = useState(false);\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 320 }}>\n      <Checkbox\n        id=\"consent-terms\"\n        label=\"I agree to the terms\"\n        helper=\"Required to create a workspace.\"\n        checked={accepted}\n        onChange={(event) => setAccepted(event.currentTarget.checked)}\n      />\n      <Checkbox\n        id=\"consent-updates\"\n        label=\"Send product updates\"\n        checked={updates}\n        onChange={(event) => setUpdates(event.currentTarget.checked)}\n      />\n      <Button variant=\"primary\" isDisabled={!accepted} styles={{ root: 'w-full' }}>\n        Continue\n      </Button>\n    </Flex>\n  );\n}"
    }
],
  },

  code: {
    id: "code",
    name: "Code",
    description: "Displays syntax-highlighted code with a built-in copy button.",
    category: "display",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Code",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["code","syntax-highlighting","display"],
    accessibility: {"hasAriaSupport":false,"notes":["Pre-formatted content","Copy button is keyboard accessible"]},
    usage: undefined,
    examples: [],
  },

  color: {
    id: "color",
    name: "Color",
    description: "Color picker with hue slider and format selection.",
    category: "input",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Color",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","select"],
    tags: ["color","form","user-input","interactive"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible sliders","ARIA labels for color components","Visual focus indicators","Screen reader announcements for color values"]},
    usage: undefined,
    examples: [
    {
        "title": "Color Trigger",
        "description": "An uncontrolled color picker using Color as the provider and Color.Trigger to open the picker area in a popover.",
        "code": "\"use client\";\n\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center\">\n      <Color defaultValue=\"#3b82f6\" size=\"md\">\n        <Color.Trigger aria-label=\"Choose color\" />\n      </Color>\n    </div>\n  );\n}"
    },
    {
        "title": "Controlled Color Trigger",
        "description": "A controlled color picker with alpha support, using Color.Trigger to keep the picker area in a popover.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [color, setColor] = useState('#ef4444');\n\n  return (\n    <div className=\"flex flex-col gap-4 items-center\">\n      <Color\n        value={color}\n        onChange={setColor}\n        showOpacity={true}\n        size=\"md\"\n      >\n        <Color.Trigger aria-label=\"Choose accent color\" />\n      </Color>\n      <div className=\"text-sm text-foreground-400\">\n        Selected: {color}\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Inline Color Area",
        "description": "Color.Area can be composed directly inside Color when the picker should stay visible.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [color, setColor] = useState('#8b5cf6');\n\n  return (\n    <div className=\"flex flex-col gap-4 items-center\">\n      <Color\n        value={color}\n        onChange={setColor}\n        showPreview={true}\n        format=\"hex\"\n        size=\"md\"\n      >\n        <Color.Area />\n      </Color>\n    </div>\n  );\n}"
    },
    {
        "title": "Standalone Color Slider",
        "description": "Color.Slider can be used on its own for hue and opacity control without rendering the full color picker.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Color } from 'ui-lab-components';\n\nexport default function Example() {\n  const [hue, setHue] = useState(215);\n  const [opacity, setOpacity] = useState(0.72);\n\n  const baseColor = `hsl(${hue} 100% 50%)`;\n  const previewColor = `hsl(${hue} 100% 50% / ${opacity})`;\n\n  return (\n    <div className=\"w-72 space-y-4\">\n      <div className=\"flex items-center gap-3\">\n        <div\n          className=\"h-10 w-10 rounded-sm border border-background-700\"\n          style={{ backgroundColor: previewColor }}\n          aria-hidden=\"true\"\n        />\n        <div className=\"min-w-0 flex-1 text-sm text-foreground-300\">\n          <div>Hue {Math.round(hue)} deg</div>\n          <div>Opacity {Math.round(opacity * 100)}%</div>\n        </div>\n      </div>\n\n      <Color.Slider\n        aria-label=\"Accent hue\"\n        value={hue}\n        onChange={setHue}\n      />\n\n      <Color.Slider\n        type=\"opacity\"\n        aria-label=\"Accent opacity\"\n        value={opacity}\n        onChange={setOpacity}\n        color={baseColor}\n      />\n    </div>\n  );\n}"
    }
],
  },

  command: {
    id: "command",
    name: "Command",
    description: "Searchable command palette for quick action access.",
    category: "action",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "CommandPalette",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["modal","input"],
    tags: ["search","command","navigation"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard shortcuts","Search support","Focus management"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic Command Palette",
        "description": "A searchable command palette with keyboard shortcuts. Use Cmd+K (or Ctrl+K) to open.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Command, Button, Badge } from 'ui-lab-components';\n\nexport default function Example() {\n  const [open, setOpen] = React.useState(false);\n\n  const commands = [\n    {\n      id: 'search',\n      label: 'Search',\n      description: 'Search documents',\n      shortcut: '⌘F',\n      action: () => console.log('Search'),\n    },\n    {\n      id: 'create',\n      label: 'Create new',\n      description: 'Create a new document',\n      shortcut: '⌘N',\n      action: () => console.log('Create'),\n    },\n    {\n      id: 'settings',\n      label: 'Settings',\n      description: 'Open application settings',\n      shortcut: '⌘,',\n      action: () => console.log('Settings'),\n    },\n  ];\n\n  return (\n    <>\n      <Button onClick={() => setOpen(true)}>\n        Open Palette (⌘K)\n      </Button>\n      <Command\n        open={open}\n        onOpenChange={setOpen}\n        items={commands}\n      >\n        <Command.Input placeholder=\"Search commands...\" />\n        <Command.List>\n          <Command.Groups\n            renderCategory={(category) =>\n              category ? <Command.Category>{category}</Command.Category> : null\n            }\n            renderItem={(cmd) => (\n              <Command.Item\n                key={cmd.id}\n                value={cmd.id}\n                textValue={cmd.label}\n                action={cmd.action}\n                hint={cmd.shortcut}\n              >\n                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>\n                  <div>\n                    <div style={{ fontWeight: 500 }}>{cmd.label}</div>\n                    {cmd.description && (\n                      <div style={{ fontSize: '0.875em', opacity: 0.7 }}>\n                        {cmd.description}\n                      </div>\n                    )}\n                  </div>\n                </div>\n              </Command.Item>\n            )}\n          />\n        </Command.List>\n      </Command>\n    </>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Basic Confirm",
        "description": "A confirmation dialog for critical actions. Use this to prevent accidental deletions or destructive operations.",
        "code": "import { Confirm } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Confirm\n      triggerLabel=\"Delete Account\"\n      title=\"Are you sure?\"\n      description=\"This action cannot be undone. All your data will be permanently deleted.\"\n      confirmLabel=\"Delete\"\n      cancelLabel=\"Cancel\"\n      onConfirm={() => console.log('Account deleted')}\n      onCancel={() => console.log('Cancelled')}\n    />\n  );\n}"
    }
],
  },

  date: {
    id: "date",
    name: "Date",
    description: "Date picker with calendar and keyboard navigation.",
    category: "input",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Date",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","select"],
    tags: ["date","selection","input","interactive"],
    accessibility: {"hasAriaSupport":true,"notes":["Full keyboard navigation with arrow keys","Enter/Space to select dates","PageUp/PageDown for month navigation","Screen reader friendly with semantic HTML","Focus management with visible focus ring","Disabled dates properly announced"]},
    usage: undefined,
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
    usage: undefined,
    examples: [
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
],
  },

  expand: {
    id: "expand",
    name: "Expand",
    description: "Collapsible component for expanding hidden sections.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Expand",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","modal"],
    tags: ["disclosure","accordion","collapsible","expandable"],
    accessibility: {"hasAriaSupport":true,"notes":["Full ARIA disclosure pattern support","Keyboard navigation with Tab and Enter/Space","Proper button and panel roles","Screen reader friendly"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic",
        "description": "Preset mode using the title prop — the simplest way to render a labeled expandable section.",
        "code": "import { Expand } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700\">\n      <Expand title=\"What is UI Lab?\">\n        <p className=\"text-sm text-foreground-400 px-3 py-3\">\n          UI Lab is a component library built for building beautiful, accessible interfaces with a consistent design system.\n        </p>\n      </Expand>\n    </div>\n  );\n}"
    },
    {
        "title": "Accordion",
        "description": "Controlled expand group where only one item can be open at a time.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Expand } from 'ui-lab-components';\n\nconst items = [\n  {\n    id: 'shipping',\n    title: 'Shipping & Delivery',\n    content: 'Standard shipping takes 3–5 business days. Express options are available at checkout for next-day delivery.',\n  },\n  {\n    id: 'returns',\n    title: 'Returns & Refunds',\n    content: 'Items can be returned within 30 days of purchase. Refunds are processed within 5–7 business days after we receive the item.',\n  },\n  {\n    id: 'warranty',\n    title: 'Warranty',\n    content: 'All products include a 12-month manufacturer warranty. Extended coverage can be purchased at checkout.',\n  },\n];\n\nexport default function Example() {\n  const [open, setOpen] = useState<string | null>('shipping');\n\n  return (\n    <div className=\"w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700\">\n      {items.map((item) => (\n        <Expand\n          key={item.id}\n          title={item.title}\n          isExpanded={open === item.id}\n          onExpandedChange={(expanded) => setOpen(expanded ? item.id : null)}\n        >\n          <p className=\"text-sm text-foreground-400 px-3 py-3\">{item.content}</p>\n        </Expand>\n      ))}\n    </div>\n  );\n}"
    },
    {
        "title": "Custom Trigger",
        "description": "Compound mode with a fully composed trigger — custom icon, badge, and layout.",
        "code": "import { Expand, Flex, Badge } from 'ui-lab-components';\nimport { FaUser } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full max-w-sm border border-background-700 rounded-sm\">\n      <Expand>\n        <Expand.Trigger>\n          <Flex align=\"center\" gap=\"xs\" className=\"flex-1 px-3 py-2.5\">\n            <FaUser className=\"text-foreground-400 text-xs shrink-0\" />\n            <span className=\"text-sm font-medium\">Account Settings</span>\n            <Badge className=\"ml-auto mr-2\">New</Badge>\n          </Flex>\n          <Expand.Icon />\n        </Expand.Trigger>\n        <Expand.Divider />\n        <Expand.Content>\n          <Flex direction=\"column\" gap=\"xs\" className=\"px-3 py-3\">\n            <p className=\"text-sm text-foreground-400\">Manage your profile, password, and notification preferences.</p>\n          </Flex>\n        </Expand.Content>\n      </Expand>\n    </div>\n  );\n}"
    },
    {
        "title": "Reveal Directions",
        "description": "Content can reveal from above or horizontally using the from prop on Expand.Content.",
        "code": "import { Expand, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"lg\" className=\"w-full max-w-sm\">\n      <div>\n        <p className=\"text-xs text-foreground-500 mb-2 px-1\">from=\"above\"</p>\n        <div className=\"border border-background-700 rounded-sm\">\n          <Expand title=\"Reveal above\">\n            <Expand.Content from=\"above\">\n              <p className=\"text-sm text-foreground-400 px-3 py-3\">This content slides in from above the trigger.</p>\n            </Expand.Content>\n          </Expand>\n        </div>\n      </div>\n      <div>\n        <p className=\"text-xs text-foreground-500 mb-2 px-1\">from=\"right\"</p>\n        <div className=\"border border-background-700 rounded-sm\">\n          <Expand title=\"Reveal right\">\n            <Expand.Content from=\"right\">\n              <p className=\"text-sm text-foreground-400 px-3 py-3\">Expands horizontally to the right.</p>\n            </Expand.Content>\n          </Expand>\n        </div>\n      </div>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Settings Panel",
        "description": "Grouped settings sections using compound mode with icons, dividers, and a list of rows.",
        "code": "import { Expand, Flex } from 'ui-lab-components';\nimport { FaGear, FaCode } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700\">\n      <Expand defaultExpanded>\n        <Expand.Trigger>\n          <Flex align=\"center\" gap=\"xs\" className=\"flex-1 px-3 py-2.5\">\n            <FaGear className=\"text-foreground-400 text-xs\" />\n            <span className=\"text-sm font-medium\">General</span>\n          </Flex>\n          <Expand.Icon />\n        </Expand.Trigger>\n        <Expand.Divider />\n        <Expand.Content>\n          <Flex direction=\"column\" className=\"divide-y divide-background-700\">\n            {['Language', 'Timezone', 'Date format'].map((setting) => (\n              <Flex key={setting} justify=\"between\" align=\"center\" className=\"px-3 py-2.5\">\n                <span className=\"text-sm text-foreground-300\">{setting}</span>\n                <span className=\"text-xs text-foreground-500\">Auto</span>\n              </Flex>\n            ))}\n          </Flex>\n        </Expand.Content>\n      </Expand>\n      <Expand>\n        <Expand.Trigger>\n          <Flex align=\"center\" gap=\"xs\" className=\"flex-1 px-3 py-2.5\">\n            <FaCode className=\"text-foreground-400 text-xs\" />\n            <span className=\"text-sm font-medium\">Developer</span>\n          </Flex>\n          <Expand.Icon />\n        </Expand.Trigger>\n        <Expand.Divider />\n        <Expand.Content>\n          <Flex direction=\"column\" className=\"divide-y divide-background-700\">\n            {['API keys', 'Webhooks', 'Debug mode'].map((setting) => (\n              <Flex key={setting} justify=\"between\" align=\"center\" className=\"px-3 py-2.5\">\n                <span className=\"text-sm text-foreground-300\">{setting}</span>\n                <span className=\"text-xs text-foreground-500\">Off</span>\n              </Flex>\n            ))}\n          </Flex>\n        </Expand.Content>\n      </Expand>\n    </div>\n  );\n}"
    },
    {
        "title": "Disabled State",
        "description": "An isDisabled section is visually dimmed and blocks interaction.",
        "code": "import { Expand } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700\">\n      <Expand title=\"Available section\">\n        <p className=\"text-sm text-foreground-400 px-3 py-3\">This section is accessible and can be expanded.</p>\n      </Expand>\n      <Expand title=\"Restricted section\" isDisabled>\n        <p className=\"text-sm text-foreground-400 px-3 py-3\">This content is not accessible.</p>\n      </Expand>\n    </div>\n  );\n}"
    },
    {
        "title": "Inline Info",
        "description": "A contextual disclosure pattern for surfacing supplementary information inline.",
        "code": "import { Expand, Flex } from 'ui-lab-components';\nimport { FaCircleInfo } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"w-full max-w-sm rounded-sm border border-background-700 bg-background-900\">\n      <Expand>\n        <Expand.Trigger>\n          <Flex align=\"center\" gap=\"xs\" className=\"flex-1 px-3 py-2.5\">\n            <FaCircleInfo className=\"text-foreground-400 text-xs shrink-0\" />\n            <span className=\"text-sm font-medium text-foreground-200\">Why do we collect this?</span>\n          </Flex>\n          <Expand.Icon />\n        </Expand.Trigger>\n        <Expand.Divider />\n        <Expand.Content>\n          <p className=\"text-sm text-foreground-400 px-3 py-3 leading-relaxed\">\n            We use this information only to verify your identity and improve the service. It is never shared with third parties.\n          </p>\n        </Expand.Content>\n      </Expand>\n    </div>\n  );\n}"
    }
],
  },

  flex: {
    id: "flex",
    name: "Flex",
    description: "Flexbox layout primitive with container query support for UIs.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Flex",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","group","divider"],
    tags: ["layout","flex","container-queries","responsive"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic div element with flexbox layout","No built-in ARIA roles - use for layout purposes","Compose with accessible child components"]},
    usage: undefined,
    examples: [
    {
        "title": "Axis Control",
        "description": "Interactive demo of Flex direction, justify, align, gap, and wrap across row and column layouts.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Flex, Frame } from 'ui-lab-components'\nimport type { FlexProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype FlexDirection = NonNullable<FlexProps['direction']>;\ntype FlexJustify = NonNullable<FlexProps['justify']>;\ntype FlexAlign = NonNullable<FlexProps['align']>;\ntype FlexGap = NonNullable<FlexProps['gap']>;\ntype FlexWrap = NonNullable<FlexProps['wrap']>;\n\nconst BASE_CELL_STYLE = {\n  '--frame-fill': 'var(--background-900)',\n  '--frame-stroke-color': 'var(--background-600)',\n} as React.CSSProperties;\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'direction',\n    label: 'Main Axis',\n    type: 'select',\n    options: [\n      { label: 'Row', value: 'row' },\n      { label: 'Column', value: 'column' },\n    ],\n    defaultValue: 'row',\n  },\n  {\n    name: 'justify',\n    label: 'Main-Axis Distribution',\n    type: 'select',\n    options: [\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n      { label: 'Space Between', value: 'between' },\n      { label: 'Space Around', value: 'around' },\n      { label: 'Space Evenly', value: 'evenly' },\n    ],\n    defaultValue: 'start',\n  },\n  {\n    name: 'align',\n    label: 'Cross-Axis Alignment',\n    type: 'select',\n    options: [\n      { label: 'Stretch', value: 'stretch' },\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n      { label: 'Baseline', value: 'baseline' },\n    ],\n    defaultValue: 'stretch',\n  },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'frameCount',\n    label: 'Frames',\n    type: 'stepper',\n    defaultValue: 4,\n    min: 4,\n    max: 10,\n    step: 1,\n  },\n  {\n    name: 'wrap',\n    label: 'Overflow Strategy',\n    type: 'select',\n    options: [\n      { label: 'No Wrap', value: 'nowrap' },\n      { label: 'Wrap', value: 'wrap' },\n    ],\n    defaultValue: 'nowrap',\n  },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nfunction getDirection(value: unknown): FlexDirection {\n  return value === 'column' ? 'column' : 'row';\n}\n\nfunction getJustify(value: unknown): FlexJustify {\n  if (value === 'center' || value === 'end' || value === 'between' || value === 'around' || value === 'evenly') return value;\n  return 'start';\n}\n\nfunction getAlign(value: unknown): FlexAlign {\n  if (value === 'start' || value === 'center' || value === 'end' || value === 'baseline') return value;\n  return 'stretch';\n}\n\nfunction getGap(value: unknown): FlexGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getWrap(value: unknown): FlexWrap {\n  return value === 'wrap' ? 'wrap' : 'nowrap';\n}\n\nfunction getFrameCount(value: unknown, min: number, max: number, fallback: number) {\n  const n = typeof value === 'number' ? value : Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction FrameCell({ className, style }: { className?: string; style?: React.CSSProperties }) {\n  return (\n    <Frame pathStroke=\"dashed\" className={className} style={{ ...BASE_CELL_STYLE, ...style }}>\n      <div className=\"size-full\" />\n    </Frame>\n  );\n}\n\nfunction getAxisColumnActionSpecs(frameCount: number) {\n  const total = Math.max(frameCount - 2, 1);\n  const pattern = [\n    { className: 'min-w-[4.75rem] flex-1', style: { width: 'auto', minWidth: '4.75rem', height: '2.75rem' } },\n    { className: 'min-w-[5.5rem] flex-1', style: { width: 'auto', minWidth: '5.5rem', height: '2.75rem' } },\n    { className: 'min-w-[4rem] flex-1', style: { width: 'auto', minWidth: '4rem', height: '3rem' } },\n  ];\n  return Array.from({ length: total }, (_, i) => pattern[i % pattern.length]);\n}\n\nfunction getAxisRowGroups(frameCount: number) {\n  const groupCount = Math.max(Math.ceil(frameCount / 4), 1);\n  return Array.from({ length: groupCount }, (_, gi) => {\n    const remaining = frameCount - gi * 4;\n    const itemCount = Math.min(Math.max(remaining, 0), 4);\n    return { rail: itemCount >= 1, canvas: itemCount >= 2, actionTop: itemCount >= 3, actionBottom: itemCount >= 4 };\n  });\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const direction = getDirection(props.direction);\n  const justify = getJustify(props.justify);\n  const align = getAlign(props.align);\n  const gap = getGap(props.gap);\n  const wrap = getWrap(props.wrap);\n  const frameCount = getFrameCount(props.frameCount, 4, 10, 4);\n\n  if (direction === 'row') {\n    const groups = getAxisRowGroups(frameCount);\n    return (\n      <Flex direction=\"column\" justify={justify} align={align} gap={gap} wrap=\"nowrap\" className=\"w-full\">\n        {groups.map((group, index) => (\n          <Flex key={`axis-row-group-${index}`} direction=\"row\" gap=\"md\" align=\"stretch\" className=\"w-full\">\n            {group.rail && <FrameCell className=\"shrink-0\" style={{ width: '4.5rem', height: '8.5rem' }} />}\n            {group.canvas && <FrameCell className=\"min-w-[11rem] flex-1\" style={{ width: 'auto', minWidth: '11rem', flex: '1.4 1 12rem', height: '8.5rem' }} />}\n            {(group.actionTop || group.actionBottom) && (\n              <Flex direction=\"column\" gap=\"sm\" className=\"w-[5.5rem] shrink-0\">\n                {group.actionTop && <FrameCell className=\"shrink-0\" style={{ width: '5.5rem', height: '4.5rem' }} />}\n                {group.actionBottom && <FrameCell className=\"shrink-0\" style={{ width: '5.5rem', height: '3.25rem' }} />}\n              </Flex>\n            )}\n          </Flex>\n        ))}\n      </Flex>\n    );\n  }\n\n  const actions = getAxisColumnActionSpecs(frameCount);\n  return (\n    <Flex direction=\"column\" justify={justify} align={align} gap={gap} wrap={wrap} className=\"w-full\">\n      <FrameCell className=\"w-full\" style={{ width: '100%', height: '2.75rem' }} />\n      <FrameCell className=\"w-full\" style={{ width: '100%', height: '8rem' }} />\n      <Flex direction=\"row\" wrap=\"wrap\" gap=\"sm\" className=\"w-full\">\n        {actions.map((action, index) => (\n          <FrameCell key={`column-action-${index}`} className={action.className} style={action.style as React.CSSProperties} />\n        ))}\n      </Flex>\n    </Flex>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ direction: 'row', justify: 'start', align: 'stretch', gap: 'md', wrap: 'nowrap', frameCount: 4 });\n}"
    },
    {
        "title": "Wrap Overflow Into Rows",
        "description": "When wrap=",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Flex, Frame } from 'ui-lab-components'\nimport type { FlexProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype FlexDirection = NonNullable<FlexProps['direction']>;\ntype FlexJustify = NonNullable<FlexProps['justify']>;\ntype FlexAlign = NonNullable<FlexProps['align']>;\ntype FlexGap = NonNullable<FlexProps['gap']>;\ntype FlexWrap = NonNullable<FlexProps['wrap']>;\n\nconst BASE_CELL_STYLE = {\n  '--frame-fill': 'var(--background-900)',\n  '--frame-stroke-color': 'var(--background-600)',\n} as React.CSSProperties;\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'direction',\n    label: 'Main Axis',\n    type: 'select',\n    options: [\n      { label: 'Row', value: 'row' },\n      { label: 'Column', value: 'column' },\n    ],\n    defaultValue: 'row',\n  },\n  {\n    name: 'justify',\n    label: 'Main-Axis Distribution',\n    type: 'select',\n    options: [\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n      { label: 'Space Between', value: 'between' },\n      { label: 'Space Around', value: 'around' },\n      { label: 'Space Evenly', value: 'evenly' },\n    ],\n    defaultValue: 'start',\n  },\n  {\n    name: 'align',\n    label: 'Cross-Axis Alignment',\n    type: 'select',\n    options: [\n      { label: 'Stretch', value: 'stretch' },\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n      { label: 'Baseline', value: 'baseline' },\n    ],\n    defaultValue: 'stretch',\n  },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'frameCount',\n    label: 'Frames',\n    type: 'stepper',\n    defaultValue: 7,\n    min: 4,\n    max: 12,\n    step: 1,\n  },\n  {\n    name: 'wrap',\n    label: 'Overflow Strategy',\n    type: 'select',\n    options: [\n      { label: 'No Wrap', value: 'nowrap' },\n      { label: 'Wrap', value: 'wrap' },\n    ],\n    defaultValue: 'wrap',\n  },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nfunction getDirection(value: unknown): FlexDirection {\n  return value === 'column' ? 'column' : 'row';\n}\n\nfunction getJustify(value: unknown): FlexJustify {\n  if (value === 'center' || value === 'end' || value === 'between' || value === 'around' || value === 'evenly') return value;\n  return 'start';\n}\n\nfunction getAlign(value: unknown): FlexAlign {\n  if (value === 'start' || value === 'center' || value === 'end' || value === 'baseline') return value;\n  return 'stretch';\n}\n\nfunction getGap(value: unknown): FlexGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getWrap(value: unknown): FlexWrap {\n  return value === 'wrap' ? 'wrap' : 'nowrap';\n}\n\nfunction getFrameCount(value: unknown, min: number, max: number, fallback: number) {\n  const n = typeof value === 'number' ? value : Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction FrameCell({ className, style }: { className?: string; style?: React.CSSProperties }) {\n  return (\n    <Frame pathStroke=\"dashed\" className={className} style={{ ...BASE_CELL_STYLE, ...style }}>\n      <div className=\"size-full\" />\n    </Frame>\n  );\n}\n\nfunction getToolbarFlowSpecs(direction: FlexDirection, frameCount: number) {\n  if (direction === 'column') {\n    const pattern = [\n      { style: { width: '100%', height: '3.25rem' } },\n      { style: { width: '100%', height: '3rem' } },\n      { style: { width: '100%', height: '3.25rem' } },\n      { style: { width: '100%', height: '2.75rem' } },\n    ];\n    return Array.from({ length: frameCount }, (_, i) => ({ className: 'w-full', ...pattern[i % pattern.length] }));\n  }\n  const repeatPattern = [\n    { className: 'shrink-0', style: { width: '6rem', height: '3.25rem' } },\n    { className: 'shrink-0', style: { width: '6.75rem', height: '3.25rem' } },\n    { className: 'shrink-0', style: { width: '5.5rem', height: '3.25rem' } },\n    { className: 'shrink-0', style: { width: '6.5rem', height: '3.25rem' } },\n    { className: 'shrink-0', style: { width: '4.5rem', height: '3.25rem' } },\n    { className: 'shrink-0', style: { width: '5.5rem', height: '3.25rem' } },\n  ];\n  return [\n    { className: 'min-w-[12rem]', style: { width: 'auto', minWidth: '12rem', flex: '1.6 1 14rem', height: '3.25rem' } },\n    ...Array.from({ length: Math.max(frameCount - 1, 0) }, (_, i) => repeatPattern[i % repeatPattern.length]),\n  ];\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const direction = getDirection(props.direction);\n  const frameCount = getFrameCount(props.frameCount, 4, 12, 7);\n  const specs = getToolbarFlowSpecs(direction, frameCount);\n\n  return (\n    <Flex\n      direction={direction}\n      justify={getJustify(props.justify)}\n      align={getAlign(props.align)}\n      gap={getGap(props.gap)}\n      wrap={getWrap(props.wrap)}\n      className=\"w-full\"\n    >\n      {specs.map((spec, index) => (\n        <FrameCell key={`${direction}-toolbar-${index}`} className={spec.className} style={spec.style as React.CSSProperties} />\n      ))}\n    </Flex>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ direction: 'row', justify: 'start', align: 'center', gap: 'md', wrap: 'wrap', frameCount: 7 });\n}"
    },
    {
        "title": "Container-Query Reflow",
        "description": "With containerQueryResponsive enabled, the layout reflows based on available container width rather than viewport size.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Flex, Frame } from 'ui-lab-components'\nimport type { FlexProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype FlexJustify = NonNullable<FlexProps['justify']>;\ntype FlexGap = NonNullable<FlexProps['gap']>;\ntype FlexWrap = NonNullable<FlexProps['wrap']>;\n\nconst BASE_CELL_STYLE = {\n  '--frame-fill': 'var(--background-900)',\n  '--frame-stroke-color': 'var(--background-600)',\n} as React.CSSProperties;\n\nconst CONTAINER_FLOW_STYLES = `\n  .flex-container-flow-avatar {\n    width: 5rem;\n    min-width: 5rem;\n    flex-grow: 0.65;\n    flex-shrink: 1;\n  }\n\n  .flex-container-flow-main {\n    width: 15rem;\n    min-width: 14rem;\n    flex-grow: 2;\n    flex-shrink: 1;\n  }\n\n  .flex-container-flow-sidebar {\n    width: 10rem;\n    min-width: 10rem;\n    flex-grow: 1;\n    flex-shrink: 1;\n  }\n\n  @container flex-parent (width < 400px) {\n    .flex-container-flow-avatar,\n    .flex-container-flow-main,\n    .flex-container-flow-sidebar {\n      width: 100%;\n      min-width: 0;\n    }\n  }\n`;\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'gap',\n    label: 'Base Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'frameCount',\n    label: 'Frames',\n    type: 'stepper',\n    defaultValue: 5,\n    min: 5,\n    max: 10,\n    step: 1,\n  },\n  {\n    name: 'justify',\n    label: 'Main-Axis Distribution',\n    type: 'select',\n    options: [\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'Space Between', value: 'between' },\n      { label: 'Space Around', value: 'around' },\n    ],\n    defaultValue: 'start',\n  },\n  {\n    name: 'wrap',\n    label: 'Overflow Strategy',\n    type: 'select',\n    options: [\n      { label: 'No Wrap', value: 'nowrap' },\n      { label: 'Wrap', value: 'wrap' },\n    ],\n    defaultValue: 'nowrap',\n  },\n  {\n    name: 'containerQueryResponsive',\n    label: 'Enable Container Queries',\n    type: 'toggle',\n    defaultValue: true,\n  },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nfunction getJustify(value: unknown): FlexJustify {\n  if (value === 'center' || value === 'end' || value === 'between' || value === 'around' || value === 'evenly') return value;\n  return 'start';\n}\n\nfunction getGap(value: unknown): FlexGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getWrap(value: unknown): FlexWrap {\n  return value === 'wrap' ? 'wrap' : 'nowrap';\n}\n\nfunction getFrameCount(value: unknown, min: number, max: number, fallback: number) {\n  const n = typeof value === 'number' ? value : Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction FrameCell({ className, style }: { className?: string; style?: React.CSSProperties }) {\n  return (\n    <Frame pathStroke=\"dashed\" className={className} style={{ ...BASE_CELL_STYLE, ...style }}>\n      <div className=\"size-full\" />\n    </Frame>\n  );\n}\n\nfunction getDistribution(frameCount: number) {\n  let metadataCount = 2;\n  let sidebarCount = 1;\n  let remaining = Math.max(frameCount - 5, 0);\n  while (remaining > 0) {\n    metadataCount += 1;\n    remaining -= 1;\n    if (remaining > 0) { sidebarCount += 1; remaining -= 1; }\n  }\n  return { metadataCount, sidebarCount };\n}\n\nconst META_PATTERN = [\n  { className: 'min-w-[4.75rem] flex-1', style: { width: 'auto', minWidth: '4.75rem', height: '2.25rem' } },\n  { className: 'min-w-[4rem] flex-1', style: { width: 'auto', minWidth: '4rem', height: '2.25rem' } },\n  { className: 'min-w-[5.25rem] flex-1', style: { width: 'auto', minWidth: '5.25rem', height: '2.25rem' } },\n];\n\nconst SIDEBAR_PATTERN = [\n  { style: { width: '100%', height: '7rem' } },\n  { style: { width: '100%', height: '3rem' } },\n  { style: { width: '100%', height: '2.5rem' } },\n];\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const frameCount = getFrameCount(props.frameCount, 5, 10, 5);\n  const { metadataCount, sidebarCount } = getDistribution(frameCount);\n\n  return (\n    <>\n      <style>{CONTAINER_FLOW_STYLES}</style>\n      <Flex\n        justify={getJustify(props.justify)}\n        align=\"stretch\"\n        gap={getGap(props.gap)}\n        wrap={getWrap(props.wrap)}\n        containerQueryResponsive={Boolean(props.containerQueryResponsive)}\n        className=\"w-full\"\n      >\n        <FrameCell className=\"flex-container-flow-avatar\" style={{ height: '7rem' }} />\n        <Flex direction=\"column\" gap=\"sm\" className=\"flex-container-flow-main\">\n          <FrameCell style={{ width: '100%', height: '4.5rem' }} />\n          <Flex gap=\"sm\" wrap=\"wrap\" className=\"w-full\">\n            {Array.from({ length: metadataCount }, (_, i) => META_PATTERN[i % META_PATTERN.length]).map((spec, i) => (\n              <FrameCell key={`meta-${i}`} className={spec.className} style={spec.style as React.CSSProperties} />\n            ))}\n          </Flex>\n        </Flex>\n        <Flex direction=\"column\" gap=\"sm\" className=\"flex-container-flow-sidebar\">\n          {Array.from({ length: sidebarCount }, (_, i) => SIDEBAR_PATTERN[i % SIDEBAR_PATTERN.length]).map((spec, i) => (\n            <FrameCell key={`sidebar-${i}`} className=\"w-full\" style={spec.style as React.CSSProperties} />\n          ))}\n        </Flex>\n      </Flex>\n    </>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ gap: 'md', frameCount: 5, justify: 'start', wrap: 'nowrap', containerQueryResponsive: true });\n}"
    }
],
  },

  frame: {
    id: "frame",
    name: "Frame",
    description: "Decorative border with advanced SVG path support.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Frame",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","modal"],
    tags: ["container","decorative","border","svg","custom-shapes"],
    accessibility: {"hasAriaSupport":false,"notes":["Decorative SVG elements are properly hidden from assistive technology"]},
    usage: undefined,
    examples: [
    {
        "title": "Featured Card Frame",
        "description": "A card frame with a curved top cutout for featured images or hero content.",
        "code": "import { Frame } from 'ui-lab-components';\n\n// The SVG path definition for the curve\nconst LIQUID_WIDTH = 180;\nconst LIQUID_PATH = \"M 0 0 C 36 0 36 44 90 44 C 144 44 144 0 180 0\";\n\nconst DefaultFrame = () => {\n  return (\n    <div className=\"flex items-center justify-center min-h-[400px] bg-background-950\">\n      <div className=\"relative w-full max-w-sm group\">\n\n        {/* 1. The Frame Component with the Path Prop */}\n        <Frame\n          path={LIQUID_PATH}\n          pathWidth={LIQUID_WIDTH}\n          className=\"text-background-700  bg-background-700/20 shadow-2xl backdrop-blur-sm\"\n          style={{ color: \"var(--background-700)\" }}\n        >\n          {/* Minimal Content */}\n          <div className=\"w-100 h-50 flex flex-col h-full p-17 text-center\">\n          </div>\n        </Frame>\n      </div>\n    </div>\n  );\n};\n\nexport default DefaultFrame;"
    },
    {
        "title": "Tooltip Frame",
        "description": "A frame with a pointer tail on the bottom, typical for tooltips or popovers.",
        "code": "import React from 'react';\nimport { Frame } from 'ui-lab-components';\n\nconst TAIL_WIDTH = 48;\nconst TAIL_PATH = \"M 0 0 C 8 0 20 -16 24 -16 C 28 -16 36 0 48 0\";\n\nconst Example2 = () => {\n  return (\n    <div className=\"flex flex-col gap-12 p-12 items-center justify-center min-h-[400px] bg-background-950\">\n      <Frame\n        side=\"bottom\"\n        shapeMode=\"extend\"\n        path={TAIL_PATH}\n        pathWidth={TAIL_WIDTH}\n        className=\"max-w-sm border-background-700 p-6\"\n        style={{ \"--frame-fill\": \"var(--color-background-900)\" } as React.CSSProperties}\n      >\n        <div className=\"text-center\">\n          <h3 className=\"font-semibold text-lg mb-2 text-foreground-50\">Did you know?</h3>\n          <p className=\"text-foreground-400 text-sm leading-relaxed\">\n            You can customize the frame orientation using the <code className=\"bg-background-800 px-1 rounded\">side</code> prop.\n            This frame uses <code className=\"text-accent-500\">side=\"bottom\"</code> to create a tooltip tail.\n          </p>\n        </div>\n      </Frame>\n    </div>\n  );\n};\n\nexport default Example2;"
    },
    {
        "title": "Sidebar Tab Frame",
        "description": "A frame with a tab extending from the side, perfect for active navigation states.",
        "code": "import React from 'react';\nimport { Frame } from 'ui-lab-components';\n\nconst TAB_WIDTH = 120;\nconst TAB_PATH = \"M 0 0 C 20 0 20 -24 40 -24 L 80 -24 C 100 -24 100 0 120 0\";\n\nconst Example3 = () => {\n  return (\n    <div className=\"flex flex-row gap-0 p-12 items-center justify-center bg-background-950 min-h-[400px]\">\n      {/* Mock Sidebar */}\n      <div className=\"flex flex-col items-end justify-center space-y-8 pr-6 border-background-800/50 h-64\">\n        <div className=\"text-foreground-400 font-medium cursor-pointer hover:text-foreground-400 transition-colors\">Dashboard</div>\n        <div className=\"text-accent-500 font-bold cursor-default\">Settings</div>\n        <div className=\"text-foreground-400 font-medium cursor-pointer hover:text-foreground-400 transition-colors\">Profile</div>\n      </div>\n\n      {/* Frame content - visually connecting to \"Settings\" */}\n      <div className=\"-ml-[1.5px]\"> {/* Overlap border slightly to merge visual connection */}\n        <Frame\n          side=\"left\"\n          shapeMode=\"extend\"\n          path={TAB_PATH}\n          pathWidth={TAB_WIDTH}\n          className=\"w-80 h-64 p-6\"\n          style={{\n            \"--frame-fill\": \"var(--color-background-900)\",\n            \"--frame-radius\": \"16px\",\n            color: \"var(--background-700)\",\n          } as React.CSSProperties}\n        >\n          <div className=\"h-full flex flex-col justify-center\">\n            <h2 className=\"text-2xl font-bold text-foreground-50 mb-4\">Settings</h2>\n            <div className=\"space-y-3\">\n              <div className=\"h-2 w-2/3 bg-background-800 rounded\"></div>\n              <div className=\"h-2 w-1/2 bg-background-800 rounded\"></div>\n              <div className=\"h-2 w-3/4 bg-background-800 rounded\"></div>\n            </div>\n          </div>\n        </Frame>\n      </div>\n    </div>\n  );\n};\n\nexport default Example3;"
    }
],
  },

  gallery: {
    id: "gallery",
    name: "Gallery",
    description: "Responsive grid for displaying images and media.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Gallery",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","grid"],
    tags: ["gallery","grid","media","images","video","responsive"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses React Aria useFocusRing for keyboard focus indication","Supports both link and button interaction modes","Proper focus order through natural DOM order","Hover and focus states for visual feedback"]},
    usage: undefined,
    examples: [
    {
        "title": "Grid Composition",
        "description": "Gallery items arranged in a configurable grid with consistent gap and aspect ratio.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Gallery, Frame } from 'ui-lab-components'\nimport type { GalleryProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype GalleryGap = NonNullable<GalleryProps['gap']>;\ntype ItemTier = 'common' | 'archived' | 'experimental';\n\nconst FRAME_STYLE: Record<ItemTier, React.CSSProperties> = {\n  common: { '--frame-fill': 'var(--background-900)', '--frame-stroke-color': 'var(--background-600)' } as React.CSSProperties,\n  archived: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-700)' } as React.CSSProperties,\n  experimental: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-800)' } as React.CSSProperties,\n};\n\nexport const controls: ControlDef[] = [\n  { name: 'columns', label: 'Columns', type: 'stepper', defaultValue: 3, min: 1, max: 6, step: 1 },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'aspectRatio',\n    label: 'Aspect Ratio',\n    type: 'select',\n    options: [\n      { label: '1:1', value: '1/1' },\n      { label: '4:3', value: '4/3' },\n      { label: '3:4', value: '3/4' },\n      { label: '16:9', value: '16/9' },\n    ],\n    defaultValue: '4/3',\n  },\n  { name: 'itemCount', label: 'Items', type: 'stepper', defaultValue: 4, min: 4, max: 12, step: 1 },\n  { name: 'responsive', label: 'Container-Query Responsive', type: 'toggle', defaultValue: false },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nconst GRID_ITEMS = [\n  { id: 'g1', title: 'Brand Kit', description: 'Identity · Updated 2d ago', tier: 'common' as ItemTier },\n  { id: 'g2', title: 'Icon Set', description: 'UI Assets · 142 icons', tier: 'common' as ItemTier },\n  { id: 'g3', title: 'Type Scale', description: 'Typography · 8 weights', tier: 'common' as ItemTier },\n  { id: 'g4', title: 'Color Tokens', description: 'Design System · v3.2', tier: 'common' as ItemTier },\n  { id: 'g5', title: 'Grid Spec', description: 'Layout · 12-column', tier: 'common' as ItemTier },\n  { id: 'g6', title: 'Motion Guide', description: 'Animation · 24 presets', tier: 'common' as ItemTier },\n  { id: 'g7', title: 'Legacy Icons', description: 'Archived · v1.4', tier: 'archived' as ItemTier },\n  { id: 'g8', title: 'Old Palette', description: 'Archived · 2021', tier: 'archived' as ItemTier },\n  { id: 'g9', title: 'Beta Components', description: 'Archived · Pre-release', tier: 'archived' as ItemTier },\n  { id: 'g10', title: 'Prototype A', description: 'Experimental · Do not ship', tier: 'experimental' as ItemTier },\n  { id: 'g11', title: 'Prototype B', description: 'Experimental · Internal only', tier: 'experimental' as ItemTier },\n  { id: 'g12', title: 'Prototype C', description: 'Experimental · Unreleased', tier: 'experimental' as ItemTier },\n];\n\nfunction getGap(value: unknown): GalleryGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getInt(value: unknown, min: number, max: number, fallback: number) {\n  const n = Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction getAspectRatio(value: unknown): string {\n  if (typeof value === 'string' && value.includes('/')) return value;\n  return '4/3';\n}\n\nfunction itemClassName(tier: ItemTier) {\n  if (tier === 'archived') return 'opacity-60';\n  if (tier === 'experimental') return 'opacity-35';\n  return undefined;\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const columns = getInt(props.columns, 1, 6, 3);\n  const gap = getGap(props.gap);\n  const ratio = getAspectRatio(props.aspectRatio);\n  const count = getInt(props.itemCount, 4, 12, 4);\n  const responsive = Boolean(props.responsive);\n  const items = GRID_ITEMS.slice(0, count);\n  const resolvedColumns: GalleryProps['columns'] = responsive ? { sm: 1, md: Math.min(2, columns), lg: columns } : columns;\n\n  return (\n    <Gallery columns={resolvedColumns} gap={gap} responsive={responsive} className=\"w-full\">\n      {items.map((item) => (\n        <Gallery.Item key={item.id} className={itemClassName(item.tier)} aria-disabled={item.tier === 'experimental' ? true : undefined}>\n          <Gallery.View aspectRatio={ratio}>\n            <Frame pathStroke={item.tier === 'experimental' ? 'dotted' : 'dashed'} style={FRAME_STYLE[item.tier]} className=\"w-full h-full\" />\n          </Gallery.View>\n          <Gallery.Body>\n            <span>{item.title}</span>\n            <span>{item.description}</span>\n          </Gallery.Body>\n        </Gallery.Item>\n      ))}\n    </Gallery>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ columns: 3, gap: 'md', aspectRatio: '4/3', itemCount: 4, responsive: false });\n}"
    },
    {
        "title": "Item Orientation",
        "description": "Gallery items can be oriented vertically (stacked view + body) or horizontally (side-by-side view + body).",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Gallery, Frame } from 'ui-lab-components'\nimport type { GalleryProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype GalleryGap = NonNullable<GalleryProps['gap']>;\ntype ItemTier = 'common' | 'archived' | 'experimental';\n\nconst FRAME_STYLE: Record<ItemTier, React.CSSProperties> = {\n  common: { '--frame-fill': 'var(--background-900)', '--frame-stroke-color': 'var(--background-600)' } as React.CSSProperties,\n  archived: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-700)' } as React.CSSProperties,\n  experimental: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-800)' } as React.CSSProperties,\n};\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'orientation',\n    label: 'Orientation',\n    type: 'select',\n    options: [\n      { label: 'Vertical', value: 'vertical' },\n      { label: 'Horizontal', value: 'horizontal' },\n    ],\n    defaultValue: 'vertical',\n  },\n  { name: 'columns', label: 'Columns (vertical only)', type: 'stepper', defaultValue: 2, min: 1, max: 4, step: 1 },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n    ],\n    defaultValue: 'sm',\n  },\n  {\n    name: 'aspectRatio',\n    label: 'View Aspect Ratio (vertical only)',\n    type: 'select',\n    options: [\n      { label: '1:1', value: '1/1' },\n      { label: '4:3', value: '4/3' },\n      { label: '3:4', value: '3/4' },\n      { label: '16:9', value: '16/9' },\n    ],\n    defaultValue: '4/3',\n  },\n  { name: 'itemCount', label: 'Items', type: 'stepper', defaultValue: 4, min: 4, max: 12, step: 1 },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nconst ORIENTATION_ITEMS = [\n  { id: 'o1', title: 'Waveform Study', description: '12:34 · Electronic', tier: 'common' as ItemTier },\n  { id: 'o2', title: 'Threshold', description: '8:02 · Ambient', tier: 'common' as ItemTier },\n  { id: 'o3', title: 'Parallel Lines', description: '5:47 · Minimal', tier: 'common' as ItemTier },\n  { id: 'o4', title: 'Resonance', description: '9:15 · Drone', tier: 'common' as ItemTier },\n  { id: 'o5', title: 'Liminal Space', description: '11:20 · Experimental', tier: 'common' as ItemTier },\n  { id: 'o6', title: 'Undertow', description: '7:45 · Ambient', tier: 'common' as ItemTier },\n  { id: 'o7', title: 'Archive Vol. I', description: 'Archived · 2019 sessions', tier: 'archived' as ItemTier },\n  { id: 'o8', title: 'Archive Vol. II', description: 'Archived · Rough cuts', tier: 'archived' as ItemTier },\n  { id: 'o9', title: 'Archive Vol. III', description: 'Archived · Unmixed', tier: 'archived' as ItemTier },\n  { id: 'o10', title: 'Session X-01', description: 'Experimental · Unreleased draft', tier: 'experimental' as ItemTier },\n  { id: 'o11', title: 'Session X-02', description: 'Experimental · Internal', tier: 'experimental' as ItemTier },\n  { id: 'o12', title: 'Session X-03', description: 'Experimental · Do not distribute', tier: 'experimental' as ItemTier },\n];\n\nfunction getGap(value: unknown): GalleryGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getInt(value: unknown, min: number, max: number, fallback: number) {\n  const n = Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction getAspectRatio(value: unknown): string {\n  if (typeof value === 'string' && value.includes('/')) return value;\n  return '4/3';\n}\n\nfunction getOrientation(value: unknown): 'vertical' | 'horizontal' {\n  return value === 'horizontal' ? 'horizontal' : 'vertical';\n}\n\nfunction itemClassName(tier: ItemTier) {\n  if (tier === 'archived') return 'opacity-60';\n  if (tier === 'experimental') return 'opacity-35';\n  return undefined;\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const orientation = getOrientation(props.orientation);\n  const columns = getInt(props.columns, 1, 4, 2);\n  const gap = getGap(props.gap);\n  const ratio = getAspectRatio(props.aspectRatio);\n  const count = getInt(props.itemCount, 4, 12, 4);\n  const items = ORIENTATION_ITEMS.slice(0, count);\n  const resolvedColumns: GalleryProps['columns'] = orientation === 'horizontal' ? 1 : columns;\n\n  return (\n    <Gallery columns={resolvedColumns} gap={gap} className=\"w-full\">\n      {items.map((item) => (\n        <Gallery.Item key={item.id} orientation={orientation} className={itemClassName(item.tier)} aria-disabled={item.tier === 'experimental' ? true : undefined}>\n          <Gallery.View aspectRatio={orientation === 'horizontal' ? '1/1' : ratio}>\n            <Frame pathStroke={item.tier === 'experimental' ? 'dotted' : 'dashed'} style={FRAME_STYLE[item.tier]} className=\"w-full h-full\" />\n          </Gallery.View>\n          <Gallery.Body>\n            <span>{item.title}</span>\n            <span>{item.description}</span>\n          </Gallery.Body>\n        </Gallery.Item>\n      ))}\n    </Gallery>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ orientation: 'vertical', columns: 2, gap: 'sm', aspectRatio: '4/3', itemCount: 4 });\n}"
    },
    {
        "title": "Span Layout",
        "description": "A featured item spans multiple columns and rows to create an editorial grid layout.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Gallery, Frame } from 'ui-lab-components'\nimport type { GalleryProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype GalleryGap = NonNullable<GalleryProps['gap']>;\ntype ItemTier = 'common' | 'archived' | 'experimental';\n\nconst FRAME_STYLE: Record<ItemTier, React.CSSProperties> = {\n  common: { '--frame-fill': 'var(--background-900)', '--frame-stroke-color': 'var(--background-600)' } as React.CSSProperties,\n  archived: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-700)' } as React.CSSProperties,\n  experimental: { '--frame-fill': 'var(--background-950)', '--frame-stroke-color': 'var(--background-800)' } as React.CSSProperties,\n};\n\nexport const controls: ControlDef[] = [\n  { name: 'columns', label: 'Columns', type: 'stepper', defaultValue: 3, min: 2, max: 6, step: 1 },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n    ],\n    defaultValue: 'md',\n  },\n  { name: 'featuredColumnSpan', label: 'Featured Column Span', type: 'stepper', defaultValue: 2, min: 1, max: 4, step: 1 },\n  { name: 'featuredRowSpan', label: 'Featured Row Span', type: 'stepper', defaultValue: 2, min: 1, max: 3, step: 1 },\n  {\n    name: 'featuredAspect',\n    label: 'Featured Aspect Ratio',\n    type: 'select',\n    options: [\n      { label: '4:3', value: '4/3' },\n      { label: '16:9', value: '16/9' },\n      { label: '21:9', value: '21/9' },\n      { label: '1:1', value: '1/1' },\n    ],\n    defaultValue: '16/9',\n  },\n  { name: 'itemCount', label: 'Items', type: 'stepper', defaultValue: 5, min: 3, max: 12, step: 1 },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nconst SPAN_ITEMS = [\n  { id: 's1', title: \"Editor's Pick\", description: 'Featured collection — Spring 2024', tier: 'common' as ItemTier },\n  { id: 's2', title: 'Series No. 1', description: 'Monochrome', tier: 'common' as ItemTier },\n  { id: 's3', title: 'Series No. 2', description: 'Landscape', tier: 'common' as ItemTier },\n  { id: 's4', title: 'Series No. 3', description: 'Portrait', tier: 'common' as ItemTier },\n  { id: 's5', title: 'Series No. 4', description: 'Abstract', tier: 'common' as ItemTier },\n  { id: 's6', title: 'Series No. 5', description: 'Documentary', tier: 'common' as ItemTier },\n  { id: 's7', title: 'Hidden Vol. I', description: 'Archived · Unlisted', tier: 'archived' as ItemTier },\n  { id: 's8', title: 'Hidden Vol. II', description: 'Archived · Private', tier: 'archived' as ItemTier },\n  { id: 's9', title: 'Hidden Vol. III', description: 'Archived · Limited print', tier: 'archived' as ItemTier },\n  { id: 's10', title: 'Vault A', description: 'Experimental · Access restricted', tier: 'experimental' as ItemTier },\n  { id: 's11', title: 'Vault B', description: 'Experimental · Internal preview', tier: 'experimental' as ItemTier },\n  { id: 's12', title: 'Vault C', description: 'Experimental · Embargoed', tier: 'experimental' as ItemTier },\n];\n\nfunction getGap(value: unknown): GalleryGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getInt(value: unknown, min: number, max: number, fallback: number) {\n  const n = Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction getAspectRatio(value: unknown): string {\n  if (typeof value === 'string' && value.includes('/')) return value;\n  return '4/3';\n}\n\nfunction itemClassName(tier: ItemTier) {\n  if (tier === 'archived') return 'opacity-60';\n  if (tier === 'experimental') return 'opacity-35';\n  return undefined;\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const columns = getInt(props.columns, 2, 6, 3);\n  const gap = getGap(props.gap);\n  const colSpan = Math.min(getInt(props.featuredColumnSpan, 1, 4, 2), columns);\n  const rowSpan = getInt(props.featuredRowSpan, 1, 3, 2);\n  const featuredRatio = getAspectRatio(props.featuredAspect);\n  const count = getInt(props.itemCount, 3, 12, 5);\n  const [featured, ...rest] = SPAN_ITEMS.slice(0, count);\n\n  return (\n    <Gallery columns={columns} gap={gap} className=\"w-full\">\n      <Gallery.Item columnSpan={colSpan} rowSpan={rowSpan}>\n        <Gallery.View aspectRatio={featuredRatio}>\n          <Frame pathStroke=\"dashed\" style={FRAME_STYLE.common} className=\"w-full h-full\" />\n        </Gallery.View>\n        <Gallery.Body>\n          <span>{featured.title}</span>\n          <span>{featured.description}</span>\n        </Gallery.Body>\n      </Gallery.Item>\n      {rest.map((item) => (\n        <Gallery.Item key={item.id} className={itemClassName(item.tier)} aria-disabled={item.tier === 'experimental' ? true : undefined}>\n          <Gallery.View aspectRatio=\"4/3\">\n            <Frame pathStroke={item.tier === 'experimental' ? 'dotted' : 'dashed'} style={FRAME_STYLE[item.tier]} className=\"w-full h-full\" />\n          </Gallery.View>\n          <Gallery.Body>\n            <span>{item.title}</span>\n            <span>{item.description}</span>\n          </Gallery.Body>\n        </Gallery.Item>\n      ))}\n    </Gallery>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ columns: 3, gap: 'md', featuredColumnSpan: 2, featuredRowSpan: 2, featuredAspect: '16/9', itemCount: 5 });\n}"
    }
],
  },

  grid: {
    id: "grid",
    name: "Grid",
    description: "Responsive grid layout with container query support.",
    category: "layout",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Grid",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["flex","card","divider"],
    tags: ["layout","grid","container-queries","responsive","columns"],
    accessibility: {"hasAriaSupport":false,"notes":["Semantic div element with grid layout","No built-in ARIA roles - use for layout purposes","Compose with accessible child components"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic Grid",
        "description": "A simple grid layout with multiple cells. Use this for organizing content in a responsive grid structure.",
        "code": "import React from 'react';\nimport { Grid } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Grid columns={3} gap=\"md\">\n      <div style={{ padding: '1rem', background: '#e0e0e0' }}>Cell 1</div>\n      <div style={{ padding: '1rem', background: '#d0d0d0' }}>Cell 2</div>\n      <div style={{ padding: '1rem', background: '#c0c0c0' }}>Cell 3</div>\n      <div style={{ padding: '1rem', background: '#b0b0b0' }}>Cell 4</div>\n      <div style={{ padding: '1rem', background: '#a0a0a0' }}>Cell 5</div>\n      <div style={{ padding: '1rem', background: '#909090' }}>Cell 6</div>\n    </Grid>\n  );\n}"
    },
    {
        "title": "Track Placement",
        "description": "Adjust columns, gap, alignment, and auto-placement flow to explore the CSS Grid track model.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Grid, Frame } from 'ui-lab-components'\nimport type { GridProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype GridColumnsValue = '1' | '2' | '3' | '4' | '5' | '6' | 'auto-fit' | 'auto-fill';\ntype GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';\n\nconst BASE_CELL_STYLE = {\n  '--frame-fill': 'var(--background-900)',\n  '--frame-stroke-color': 'var(--background-600)',\n} as React.CSSProperties;\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'columns',\n    label: 'Columns',\n    type: 'select',\n    options: [\n      { label: '1 Column', value: '1' },\n      { label: '2 Columns', value: '2' },\n      { label: '3 Columns', value: '3' },\n      { label: '4 Columns', value: '4' },\n      { label: '5 Columns', value: '5' },\n      { label: '6 Columns', value: '6' },\n      { label: 'Auto Fit', value: 'auto-fit' },\n      { label: 'Auto Fill', value: 'auto-fill' },\n    ],\n    defaultValue: '3',\n  },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'justifyItems',\n    label: 'Inline Alignment',\n    type: 'select',\n    options: [\n      { label: 'Stretch', value: 'stretch' },\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n    ],\n    defaultValue: 'stretch',\n  },\n  {\n    name: 'alignItems',\n    label: 'Block Alignment',\n    type: 'select',\n    options: [\n      { label: 'Stretch', value: 'stretch' },\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n      { label: 'Baseline', value: 'baseline' },\n    ],\n    defaultValue: 'stretch',\n  },\n  {\n    name: 'autoFlow',\n    label: 'Auto Placement',\n    type: 'select',\n    options: [\n      { label: 'Row', value: 'row' },\n      { label: 'Column', value: 'column' },\n      { label: 'Row Dense', value: 'row-dense' },\n      { label: 'Column Dense', value: 'column-dense' },\n    ],\n    defaultValue: 'row',\n  },\n  {\n    name: 'frameCount',\n    label: 'Panels',\n    type: 'stepper',\n    defaultValue: 6,\n    min: 4,\n    max: 12,\n    step: 1,\n  },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nfunction getColumns(value: unknown): GridColumnsValue {\n  if (value === '1' || value === '2' || value === '4' || value === '5' || value === '6' || value === 'auto-fit' || value === 'auto-fill') return value;\n  return '3';\n}\n\nfunction toColumns(value: GridColumnsValue): number | 'auto-fit' | 'auto-fill' {\n  if (value === 'auto-fit' || value === 'auto-fill') return value;\n  return Number(value);\n}\n\nfunction getApproxColumnCount(value: GridColumnsValue) {\n  if (value === 'auto-fit' || value === 'auto-fill') return 4;\n  return Number(value);\n}\n\nfunction getGap(value: unknown): GridGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getJustifyItems(value: unknown): NonNullable<GridProps['justifyItems']> {\n  if (value === 'start' || value === 'center' || value === 'end') return value;\n  return 'stretch';\n}\n\nfunction getAlignItems(value: unknown): NonNullable<GridProps['alignItems']> {\n  if (value === 'start' || value === 'center' || value === 'end' || value === 'baseline') return value;\n  return 'stretch';\n}\n\nfunction getAutoFlow(value: unknown): NonNullable<GridProps['autoFlow']> {\n  if (value === 'column' || value === 'row-dense' || value === 'column-dense') return value;\n  return 'row';\n}\n\nfunction getFrameCount(value: unknown, min: number, max: number, fallback: number) {\n  const n = typeof value === 'number' ? value : Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction span(trackCount: number, desired: number) {\n  return `span ${Math.max(1, Math.min(desired, trackCount))}`;\n}\n\nfunction getSpecs(trackCount: number, frameCount: number) {\n  if (trackCount <= 2) {\n    const pattern = [{ minHeight: '5rem' }, { minHeight: '3rem' }, { minHeight: '4.5rem' }];\n    return [\n      { minHeight: '3rem' },\n      { minHeight: '8rem' },\n      ...Array.from({ length: Math.max(frameCount - 2, 0) }, (_, i) => ({ minHeight: pattern[i % pattern.length].minHeight })),\n    ].map(s => ({ style: { width: '100%', ...s } as React.CSSProperties }));\n  }\n  if (trackCount === 3) {\n    const pattern = [\n      { width: '100%', minHeight: '6rem', gridColumn: 'span 2' },\n      { width: '100%', minHeight: '3rem' },\n      { width: '100%', minHeight: '4.5rem' },\n    ];\n    return [\n      { style: { width: '100%', minHeight: '9rem', gridColumn: 'span 1', gridRow: 'span 2' } as React.CSSProperties },\n      { style: { width: '100%', minHeight: '5rem', gridColumn: 'span 2' } as React.CSSProperties },\n      { style: { width: '100%', minHeight: '3rem' } as React.CSSProperties },\n      { style: { width: '100%', minHeight: '3rem' } as React.CSSProperties },\n      ...Array.from({ length: Math.max(frameCount - 4, 0) }, (_, i) => ({ style: pattern[i % pattern.length] as React.CSSProperties })),\n    ];\n  }\n  const pattern = [\n    { width: '100%', minHeight: '6.5rem', gridColumn: span(trackCount, 2) },\n    { width: '100%', minHeight: '3rem' },\n    { width: '100%', minHeight: '4rem' },\n    { width: '100%', minHeight: '5rem', gridColumn: span(trackCount, 2) },\n  ];\n  return [\n    { style: { width: '100%', minHeight: '10rem', gridRow: 'span 2' } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '6rem', gridColumn: span(trackCount - 1, trackCount - 1) } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '3rem' } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '3rem' } as React.CSSProperties },\n    ...Array.from({ length: Math.max(frameCount - 4, 0) }, (_, i) => ({ style: pattern[i % pattern.length] as React.CSSProperties })),\n  ];\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const columns = getColumns(props.columns);\n  const frameCount = getFrameCount(props.frameCount, 4, 12, 6);\n  const specs = getSpecs(getApproxColumnCount(columns), frameCount);\n\n  return (\n    <Grid\n      columns={toColumns(columns)}\n      gap={getGap(props.gap)}\n      justifyItems={getJustifyItems(props.justifyItems)}\n      alignItems={getAlignItems(props.alignItems)}\n      autoFlow={getAutoFlow(props.autoFlow)}\n      className=\"w-full\"\n    >\n      {specs.map((spec, index) => (\n        <Frame key={index} pathStroke=\"dashed\" style={{ ...BASE_CELL_STYLE, ...spec.style }} className=\"w-full h-full\">\n          <div className=\"size-full\" />\n        </Frame>\n      ))}\n    </Grid>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ columns: '3', gap: 'md', justifyItems: 'stretch', alignItems: 'stretch', autoFlow: 'row', frameCount: 6 });\n}"
    },
    {
        "title": "Editorial Spans",
        "description": "Dense auto-flow grid with mixed column spans for editorial content layouts.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Grid, Frame } from 'ui-lab-components'\nimport type { GridProps } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype GridColumnsValue = '1' | '2' | '3' | '4' | '5' | '6' | 'auto-fit' | 'auto-fill';\ntype GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';\n\nconst BASE_CELL_STYLE = {\n  '--frame-fill': 'var(--background-900)',\n  '--frame-stroke-color': 'var(--background-600)',\n} as React.CSSProperties;\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'columns',\n    label: 'Columns',\n    type: 'select',\n    options: [\n      { label: '1 Column', value: '1' },\n      { label: '2 Columns', value: '2' },\n      { label: '3 Columns', value: '3' },\n      { label: '4 Columns', value: '4' },\n      { label: '5 Columns', value: '5' },\n      { label: '6 Columns', value: '6' },\n      { label: 'Auto Fit', value: 'auto-fit' },\n      { label: 'Auto Fill', value: 'auto-fill' },\n    ],\n    defaultValue: '4',\n  },\n  {\n    name: 'gap',\n    label: 'Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Extra Small', value: 'xs' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'justifyItems',\n    label: 'Inline Alignment',\n    type: 'select',\n    options: [\n      { label: 'Stretch', value: 'stretch' },\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n    ],\n    defaultValue: 'stretch',\n  },\n  {\n    name: 'alignItems',\n    label: 'Block Alignment',\n    type: 'select',\n    options: [\n      { label: 'Stretch', value: 'stretch' },\n      { label: 'Start', value: 'start' },\n      { label: 'Center', value: 'center' },\n      { label: 'End', value: 'end' },\n      { label: 'Baseline', value: 'baseline' },\n    ],\n    defaultValue: 'stretch',\n  },\n  {\n    name: 'autoFlow',\n    label: 'Auto Placement',\n    type: 'select',\n    options: [\n      { label: 'Row', value: 'row' },\n      { label: 'Column', value: 'column' },\n      { label: 'Row Dense', value: 'row-dense' },\n      { label: 'Column Dense', value: 'column-dense' },\n    ],\n    defaultValue: 'row-dense',\n  },\n  {\n    name: 'frameCount',\n    label: 'Panels',\n    type: 'stepper',\n    defaultValue: 7,\n    min: 5,\n    max: 12,\n    step: 1,\n  },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nfunction getColumns(value: unknown): GridColumnsValue {\n  if (value === '1' || value === '2' || value === '4' || value === '5' || value === '6' || value === 'auto-fit' || value === 'auto-fill') return value;\n  return '3';\n}\n\nfunction toColumns(value: GridColumnsValue): number | 'auto-fit' | 'auto-fill' {\n  if (value === 'auto-fit' || value === 'auto-fill') return value;\n  return Number(value);\n}\n\nfunction getApproxColumnCount(value: GridColumnsValue) {\n  if (value === 'auto-fit' || value === 'auto-fill') return 4;\n  return Number(value);\n}\n\nfunction getGap(value: unknown): GridGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getJustifyItems(value: unknown): NonNullable<GridProps['justifyItems']> {\n  if (value === 'start' || value === 'center' || value === 'end') return value;\n  return 'stretch';\n}\n\nfunction getAlignItems(value: unknown): NonNullable<GridProps['alignItems']> {\n  if (value === 'start' || value === 'center' || value === 'end' || value === 'baseline') return value;\n  return 'stretch';\n}\n\nfunction getAutoFlow(value: unknown): NonNullable<GridProps['autoFlow']> {\n  if (value === 'column' || value === 'row-dense' || value === 'column-dense') return value;\n  return 'row';\n}\n\nfunction getFrameCount(value: unknown, min: number, max: number, fallback: number) {\n  const n = typeof value === 'number' ? value : Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nfunction span(trackCount: number, desired: number) {\n  return `span ${Math.max(1, Math.min(desired, trackCount))}`;\n}\n\nfunction getSpecs(trackCount: number, frameCount: number) {\n  if (trackCount <= 2) {\n    const pattern = [{ minHeight: '4rem' }, { minHeight: '5.5rem' }, { minHeight: '3rem' }];\n    return [\n      { style: { width: '100%', minHeight: '8rem' } as React.CSSProperties },\n      ...Array.from({ length: Math.max(frameCount - 1, 0) }, (_, i) => ({ style: { width: '100%', ...pattern[i % pattern.length] } as React.CSSProperties })),\n    ];\n  }\n  const pattern = [\n    { width: '100%', minHeight: '3rem' },\n    { width: '100%', minHeight: '6.5rem', gridColumn: span(trackCount, 2) },\n    { width: '100%', minHeight: '4rem' },\n    { width: '100%', minHeight: '3rem' },\n  ];\n  return [\n    { style: { width: '100%', minHeight: '8rem', gridColumn: span(trackCount, Math.max(trackCount - 1, 2)) } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '8rem' } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '3rem' } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '5rem', gridColumn: span(trackCount, 2) } as React.CSSProperties },\n    { style: { width: '100%', minHeight: '5rem' } as React.CSSProperties },\n    ...Array.from({ length: Math.max(frameCount - 5, 0) }, (_, i) => ({ style: pattern[i % pattern.length] as React.CSSProperties })),\n  ];\n}\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const columns = getColumns(props.columns);\n  const frameCount = getFrameCount(props.frameCount, 5, 12, 7);\n  const specs = getSpecs(getApproxColumnCount(columns), frameCount);\n\n  return (\n    <Grid\n      columns={toColumns(columns)}\n      gap={getGap(props.gap)}\n      justifyItems={getJustifyItems(props.justifyItems)}\n      alignItems={getAlignItems(props.alignItems)}\n      autoFlow={getAutoFlow(props.autoFlow)}\n      className=\"w-full\"\n    >\n      {specs.map((spec, index) => (\n        <Frame key={index} pathStroke=\"dashed\" style={{ ...BASE_CELL_STYLE, ...spec.style }} className=\"w-full h-full\">\n          <div className=\"size-full\" />\n        </Frame>\n      ))}\n    </Grid>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ columns: '4', gap: 'md', justifyItems: 'stretch', alignItems: 'stretch', autoFlow: 'row-dense', frameCount: 7 });\n}"
    },
    {
        "title": "Responsive Card Rail",
        "description": "Grid that adapts column count and gap based on container width using responsive prop objects.",
        "code": "\"use client\";\n\nimport React from 'react'\nimport { Grid, Frame } from 'ui-lab-components'\nimport type { ControlDef } from '@/types'\n\ntype GridColumnsValue = '2' | '3' | '4' | 'auto-fit' | 'auto-fill';\ntype GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';\n\nconst BASE_CELL_STYLE = {\n  '--frame-fill': 'var(--background-900)',\n  '--frame-stroke-color': 'var(--background-600)',\n} as React.CSSProperties;\n\nexport const controls: ControlDef[] = [\n  {\n    name: 'columns',\n    label: 'Columns',\n    type: 'select',\n    options: [\n      { label: '2 Columns', value: '2' },\n      { label: '3 Columns', value: '3' },\n      { label: '4 Columns', value: '4' },\n      { label: 'Auto Fit', value: 'auto-fit' },\n      { label: 'Auto Fill', value: 'auto-fill' },\n    ],\n    defaultValue: '4',\n  },\n  {\n    name: 'gap',\n    label: 'Base Gap Token',\n    type: 'select',\n    options: [\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n      { label: 'Extra Large', value: 'xl' },\n    ],\n    defaultValue: 'md',\n  },\n  {\n    name: 'rowGap',\n    label: 'Row Gap',\n    type: 'select',\n    options: [\n      { label: 'Match Gap', value: 'inherit' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n    ],\n    defaultValue: 'inherit',\n  },\n  {\n    name: 'columnGap',\n    label: 'Column Gap',\n    type: 'select',\n    options: [\n      { label: 'Match Gap', value: 'inherit' },\n      { label: 'Small', value: 'sm' },\n      { label: 'Medium', value: 'md' },\n      { label: 'Large', value: 'lg' },\n    ],\n    defaultValue: 'inherit',\n  },\n  {\n    name: 'frameCount',\n    label: 'Cards',\n    type: 'stepper',\n    defaultValue: 6,\n    min: 4,\n    max: 10,\n    step: 1,\n  },\n  {\n    name: 'responsive',\n    label: 'Enable Responsive Object',\n    type: 'toggle',\n    defaultValue: true,\n  },\n];\n\nexport const previewLayout = 'start' as const;\nexport const resizable = true;\n\nfunction getColumns(value: unknown): GridColumnsValue {\n  if (value === '2' || value === '3' || value === 'auto-fit' || value === 'auto-fill') return value;\n  return '4';\n}\n\nfunction toColumns(value: GridColumnsValue): number | 'auto-fit' | 'auto-fill' {\n  if (value === 'auto-fit' || value === 'auto-fill') return value;\n  return Number(value);\n}\n\nfunction getGap(value: unknown): GridGap {\n  if (value === 'xs' || value === 'sm' || value === 'lg' || value === 'xl') return value;\n  return 'md';\n}\n\nfunction getOptionalGap(value: unknown): GridGap | undefined {\n  if (value === 'inherit' || value == null) return undefined;\n  return getGap(value);\n}\n\nfunction getFrameCount(value: unknown, min: number, max: number, fallback: number) {\n  const n = typeof value === 'number' ? value : Number(value);\n  if (Number.isNaN(n)) return fallback;\n  return Math.min(max, Math.max(min, Math.round(n)));\n}\n\nconst SPEC_PATTERN = [\n  { minHeight: '9rem' },\n  { minHeight: '4rem' },\n  { minHeight: '3rem' },\n  { minHeight: '5rem' },\n  { minHeight: '3.5rem' },\n  { minHeight: '6rem' },\n];\n\nexport function renderPreview(props: Record<string, unknown>) {\n  const columns = getColumns(props.columns);\n  const baseColumns = toColumns(columns);\n  const gap = getGap(props.gap);\n  const responsive = Boolean(props.responsive);\n  const frameCount = getFrameCount(props.frameCount, 4, 10, 6);\n  const specs = Array.from({ length: frameCount }, (_, i) => SPEC_PATTERN[i % SPEC_PATTERN.length]);\n\n  return (\n    <Grid\n      columns={responsive ? { sm: 1, md: 2, lg: baseColumns } : baseColumns}\n      gap={responsive ? { sm: 'sm', md: gap, lg: gap } : gap}\n      rowGap={getOptionalGap(props.rowGap)}\n      columnGap={getOptionalGap(props.columnGap)}\n      responsive={responsive}\n      className=\"w-full\"\n    >\n      {specs.map((spec, index) => (\n        <Frame key={index} pathStroke=\"dashed\" style={{ ...BASE_CELL_STYLE, width: '100%', minHeight: spec.minHeight } as React.CSSProperties} className=\"w-full h-full\">\n          <div className=\"size-full\" />\n        </Frame>\n      ))}\n    </Grid>\n  );\n}\n\nexport default function Example() {\n  return renderPreview({ columns: '4', gap: 'md', rowGap: 'inherit', columnGap: 'inherit', frameCount: 6, responsive: true });\n}"
    }
],
  },

  group: {
    id: "group",
    name: "Group",
    description: "Groups Button, Input, Select, and Expand with unified border styling.",
    category: "composition",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Group",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["button","input","select","expand"],
    tags: ["composition","grouped","compound","form"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses role=\"group\" for semantic grouping","Propagates disabled state to children","Maintains keyboard navigation for all child components"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic Group",
        "description": "A simple group container that arranges multiple elements together. Use this to organize related UI elements in a consistent layout.",
        "code": "import { Group } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Group>\n      <Group.Button>First</Group.Button>\n      <Group.Button>Second</Group.Button>\n      <Group.Button>Third</Group.Button>\n    </Group>\n  );\n}"
    },
    {
        "title": "Create Project",
        "description": "A primary grouped action for creating a named item.",
        "code": "import { Divider, Group } from \"ui-lab-components\";\nimport { FaPlus } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Group variant=\"primary\" orientation=\"horizontal\" spacing=\"xs\">\n      <Group.Input aria-label=\"Project name\" placeholder=\"Untitled project\" className=\"w-56\" />\n      <Divider orientation=\"vertical\" />\n      <Group.Button>\n        <FaPlus className=\"mr-1.5\" /> Create\n      </Group.Button>\n    </Group>\n  );\n}"
    },
    {
        "title": "Filter Bar with Selects",
        "description": "Horizontal group combining Select dropdowns with action buttons for filtering interfaces.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Divider, Group, Select } from \"ui-lab-components\";\nimport { FaMagnifyingGlass, FaFilter } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [status, setStatus] = useState<string | number | null>(\"active\");\n\n  return (\n    <Group variant=\"default\" orientation=\"horizontal\">\n      <Group.Input icon={<FaMagnifyingGlass />} placeholder=\"Search...\">\n      </Group.Input>\n      <Divider />\n      <Group.Select selectedKey={status} onSelectionChange={setStatus} className=\"w-36\">\n        <Select.Trigger><Select.Value placeholder=\"Status\" /></Select.Trigger>\n        <Select.Content>\n          <Select.List>\n            <Select.Item value=\"active\" textValue=\"Active\">Active</Select.Item>\n            <Select.Item value=\"inactive\" textValue=\"Inactive\">Inactive</Select.Item>\n            <Select.Item value=\"pending\" textValue=\"Pending\">Pending</Select.Item>\n          </Select.List>\n        </Select.Content>\n      </Group.Select>\n      <Divider />\n      <Group.Button size=\"md\"><FaFilter className=\"mr-1.5\" /> Apply</Group.Button>\n    </Group>\n  );\n}"
    },
    {
        "title": "Documentation Search",
        "description": "A search input with an icon prefix and joined submit button.",
        "code": "import { Divider, Group } from \"ui-lab-components\";\nimport { FaMagnifyingGlass } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Group variant=\"secondary\">\n      <div className=\"bg-background-800 flex items-center px-3 text-foreground-400\">\n        <FaMagnifyingGlass />\n      </div>\n      <Divider />\n      <Group.Input placeholder=\"Search documentation...\" className=\"w-64\" />\n      <Divider />\n      <Group.Button className=\"w-full\">Search</Group.Button>\n    </Group>\n  );\n}"
    },
    {
        "title": "Email Signup",
        "description": "An email input with a joined subscription action.",
        "code": "import { Divider, Group } from \"ui-lab-components\";\nimport { FaEnvelope } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Group variant=\"outline\">\n      <div className=\"bg-background-800 flex items-center px-3 text-foreground-400\">\n        <FaEnvelope />\n      </div>\n      <Divider />\n      <Group.Input placeholder=\"you@example.com\" type=\"email\" className=\"w-64\" />\n      <Divider />\n      <Group.Button>Subscribe</Group.Button>\n    </Group>\n  );\n}"
    },
    {
        "title": "Copy Command",
        "description": "A read-only command field with a joined copy action.",
        "code": "import { Divider, Group } from \"ui-lab-components\";\nimport { FaCopy } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Group>\n      <Group.Input defaultValue=\"npm install ui-lab\" readOnly className=\"w-full font-mono text-sm\" />\n      <Divider />\n      <Group.Button icon={{ left: <FaCopy className=\"mr-1.5 text-foreground-400\" /> }} />\n    </Group>\n  );\n}"
    },
    {
        "title": "Delete Confirmation",
        "description": "A danger variant group for destructive confirmation flows.",
        "code": "import { Divider, Group } from \"ui-lab-components\";\nimport { FaTrash } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Group variant=\"danger\">\n      <Group.Input aria-label=\"Confirmation\" placeholder=\"Type DELETE\" className=\"w-48\" />\n      <Divider />\n      <Group.Button>\n        <FaTrash className=\"mr-1.5\" /> Delete\n      </Group.Button>\n    </Group>\n  );\n}"
    },
    {
        "title": "Slider with Input Group",
        "description": "Numeric input synced with a slider for precise value selection.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Group, Slider } from \"ui-lab-components\";\nimport { FaPercent } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [sliderValue, setSliderValue] = useState<number[]>([45]);\n  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n    const val = parseInt(e.target.value);\n    if (!isNaN(val)) setSliderValue([Math.min(Math.max(val, 0), 100)]);\n  };\n\n  return (\n    <div className=\"space-y-4 w-64\">\n      <Group>\n        <Group.Input type=\"number\" min={0} max={100} value={sliderValue[0]} onChange={handleInputChange} className=\"w-full\" />\n        <div className=\"bg-background-800 flex items-center px-3 text-foreground-400 text-sm font-medium\">\n          <FaPercent />\n        </div>\n      </Group>\n      <Slider.Root value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />\n    </div>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Basic Input",
        "description": "A simple text input field with default styling. Use this as the standard input element for collecting user text input.",
        "code": "import React from 'react';\nimport { Input } from 'ui-lab-components';\n\nexport default function Example() {\n  return <Input placeholder=\"Enter text...\" />;\n}"
    },
    {
        "title": "Validation States",
        "description": "Input fields with error and success validation states, including helper text for user feedback.",
        "code": "import React from 'react';\nimport { Input, Label } from 'ui-lab-components';\nimport { FaCircleExclamation, FaCircleCheck } from 'react-icons/fa6';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-6 w-full max-w-sm\">\n      {/* Error State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label error helperText=\"Please enter a valid email address\" helperTextError>\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          error\n          defaultValue=\"invalid-email\"\n          icon={{ suffix: <FaCircleExclamation className=\"text-danger-600\" size={14} /> }}\n        />\n      </div>\n\n      {/* Success State */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label helperText=\"Email address is available\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n          defaultValue=\"user@example.com\"\n          icon={{ suffix: <FaCircleCheck className=\"text-success-600\" size={14} /> }}\n          className=\"border-success-600 focus:border-success-600\"\n        />\n      </div>\n\n      {/* Default State with Helper Text */}\n      <div className=\"flex flex-col gap-1.5\">\n        <Label required helperText=\"We'll never share your email with anyone else.\">\n          Email\n        </Label>\n        <Input\n          type=\"email\"\n          placeholder=\"Enter your email\"\n        />\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Sign In Form",
        "description": "Email and password fields with a password visibility toggle — a common authentication pattern.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Input, Flex, Button } from \"ui-lab-components\";\nimport { FaEnvelope, FaLock, FaEye, FaEyeSlash } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [showPassword, setShowPassword] = useState(false);\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 320 }}>\n      <Input\n        type=\"email\"\n        icon={<FaEnvelope className=\"w-3.5 h-3.5 text-foreground-400\" />}\n        placeholder=\"Email address\"\n        autoComplete=\"email\"\n      />\n      <Input\n        type={showPassword ? \"text\" : \"password\"}\n        icon={<FaLock className=\"w-3.5 h-3.5 text-foreground-400\" />}\n        placeholder=\"Password\"\n        autoComplete=\"current-password\"\n        actions={[\n          {\n            icon: showPassword\n              ? <FaEyeSlash className=\"w-3.5 h-3.5\" />\n              : <FaEye className=\"w-3.5 h-3.5\" />,\n            title: showPassword ? \"Hide password\" : \"Show password\",\n            onClick: () => setShowPassword((v) => !v),\n          },\n        ]}\n      />\n      <Button variant=\"primary\" className=\"w-full mt-1\">Sign in</Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Search",
        "description": "Search input with a keyboard shortcut hint that switches to a clear action once the user types.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Input, Flex, Badge } from \"ui-lab-components\";\nimport { FaMagnifyingGlass, FaXmark } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [query, setQuery] = useState(\"\");\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 340 }}>\n      <Input\n        icon={<FaMagnifyingGlass className=\"w-3.5 h-3.5 text-foreground-400\" />}\n        placeholder=\"Search components...\"\n        value={query}\n        onChange={(e) => setQuery(e.target.value)}\n        hint={!query ? <Badge>⌘K</Badge> : undefined}\n        actions={\n          query\n            ? [{ icon: <FaXmark className=\"w-3.5 h-3.5\" />, title: \"Clear\", onClick: () => setQuery(\"\") }]\n            : []\n        }\n      />\n    </Flex>\n  );\n}"
    },
    {
        "title": "User Handle",
        "description": "Editable username field with an inline copy action.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Input, Flex } from \"ui-lab-components\";\nimport { FaAt, FaCopy, FaCheck } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [handle, setHandle] = useState(\"kyza\");\n  const [copied, setCopied] = useState(false);\n\n  const handleCopy = () => {\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1500);\n  };\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 320 }}>\n      <Input\n        icon={<FaAt className=\"w-3.5 h-3.5 text-foreground-400\" />}\n        placeholder=\"username\"\n        value={handle}\n        onChange={(e) => setHandle(e.target.value)}\n        actions={[\n          {\n            icon: copied\n              ? <FaCheck className=\"w-3.5 h-3.5 text-green-500\" />\n              : <FaCopy className=\"w-3.5 h-3.5\" />,\n            title: copied ? \"Copied!\" : \"Copy handle\",\n            onClick: handleCopy,\n          },\n        ]}\n      />\n    </Flex>\n  );\n}"
    },
    {
        "title": "API Key",
        "description": "Read-only secret field with reveal and copy actions — suitable for credentials and tokens.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Input, Flex } from \"ui-lab-components\";\nimport { FaKey, FaEye, FaEyeSlash, FaCopy, FaCheck } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [revealed, setRevealed] = useState(false);\n  const [copied, setCopied] = useState(false);\n  const key = \"sk-proj-a8f2c1d9e4b7\";\n\n  const handleCopy = () => {\n    setCopied(true);\n    setTimeout(() => setCopied(false), 1500);\n  };\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 360 }}>\n      <Input\n        type={revealed ? \"text\" : \"password\"}\n        icon={<FaKey className=\"w-3.5 h-3.5 text-foreground-400\" />}\n        value={key}\n        readOnly\n        actions={[\n          {\n            icon: revealed\n              ? <FaEyeSlash className=\"w-3.5 h-3.5\" />\n              : <FaEye className=\"w-3.5 h-3.5\" />,\n            title: revealed ? \"Hide key\" : \"Reveal key\",\n            onClick: () => setRevealed((v) => !v),\n          },\n          {\n            icon: copied\n              ? <FaCheck className=\"w-3.5 h-3.5 text-green-500\" />\n              : <FaCopy className=\"w-3.5 h-3.5\" />,\n            title: copied ? \"Copied!\" : \"Copy key\",\n            onClick: handleCopy,\n          },\n        ]}\n      />\n    </Flex>\n  );\n}"
    },
    {
        "title": "URL with Validation",
        "description": "URL field that shows a success or error icon in the suffix slot based on the input value.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Input, Flex } from \"ui-lab-components\";\nimport { FaLink, FaCircleExclamation, FaCheck } from \"react-icons/fa6\";\n\nexport default function Example() {\n  const [url, setUrl] = useState(\"\");\n\n  const isValid = url.length === 0 || /^https?:\\/\\/.+\\..+/.test(url);\n  const showError = url.length > 0 && !isValid;\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 340 }}>\n      <Input\n        placeholder=\"https://example.com\"\n        value={url}\n        onChange={(e) => setUrl(e.target.value)}\n        error={showError}\n        icon={{\n          prefix: <FaLink className=\"w-3.5 h-3.5 text-foreground-400\" />,\n          suffix: showError\n            ? <FaCircleExclamation className=\"w-3.5 h-3.5 text-red-500\" />\n            : url.length > 0\n            ? <FaCheck className=\"w-3.5 h-3.5 text-green-500\" />\n            : undefined,\n        }}\n      />\n    </Flex>\n  );\n}"
    },
    {
        "title": "Quantity",
        "description": "Number input with native spin controls for selecting a bounded quantity.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Input, Flex } from \"ui-lab-components\";\n\nexport default function Example() {\n  const [qty, setQty] = useState(1);\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 200 }}>\n      <Input\n        type=\"number\"\n        placeholder=\"Qty\"\n        value={qty}\n        min={1}\n        max={99}\n        onChange={(e) => setQty(Number(e.target.value))}\n      />\n    </Flex>\n  );\n}"
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
    usage: undefined,
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
    description: "Displays item collections with built-in selection and actions.",
    category: "composition",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "List",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","table"],
    tags: ["list","items","collections","selection","actions"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses list role for semantic structure","Supports interactive items with keyboard navigation","Proper ARIA labels for selection states"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic List",
        "description": "A simple list displaying basic items with selection and interaction support.",
        "code": "import { List } from 'ui-lab-components';\nimport { Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <List aria-label=\"Basic List Example\">\n      <List.Header>\n        <h2>Items</h2>\n      </List.Header>\n      <List.Item interactive>Item One</List.Item>\n      <List.Item interactive>Item Two</List.Item>\n      <List.Item interactive>Item Three</List.Item>\n      <List.Footer align=\"center\">\n        <Button variant=\"primary\" size=\"sm\">\n          Load More\n        </Button>\n      </List.Footer>\n    </List>\n  );\n}"
    },
    {
        "title": "Review Queue",
        "description": "A compact checklist for work that can be completed directly from each row.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { List } from \"ui-lab-components\";\n\nconst reviewItems = [\n  { id: \"legal\", title: \"Legal review\", desc: \"Updated retention language\" },\n  { id: \"security\", title: \"Security review\", desc: \"New access scopes\" },\n  { id: \"billing\", title: \"Billing review\", desc: \"Invoice copy changes\" },\n];\n\nexport default function Example() {\n  const [checked, setChecked] = useState(() => new Set([\"legal\"]));\n\n  const setItem = (id: string, value: boolean) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      value ? next.add(id) : next.delete(id);\n      return next;\n    });\n  };\n\n  const toggleItem = (id: string) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      next.has(id) ? next.delete(id) : next.add(id);\n      return next;\n    });\n  };\n\n  return (\n    <List items={reviewItems} spacing=\"sm\" style={{ width: 320 }}>\n      {reviewItems.map((item) => (\n        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>\n          <List.Checkbox\n            aria-label={`Mark ${item.title} reviewed`}\n            placement=\"start\"\n            checked={checked.has(item.id)}\n            onCheckedChange={(value) => setItem(item.id, value)}\n          />\n          <div className=\"min-w-0 flex-1\">\n            <List.Title>{item.title}</List.Title>\n            <List.Desc>{item.desc}</List.Desc>\n          </div>\n        </List.Item>\n      ))}\n    </List>\n  );\n}"
    },
    {
        "title": "Notification Rules",
        "description": "Rows can combine a leading checkbox with a trailing Select action.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { List, Select } from \"ui-lab-components\";\n\nconst notificationItems = [\n  { id: \"comments\", title: \"Comments\", desc: \"Replies and mentions\" },\n  { id: \"deployments\", title: \"Deployments\", desc: \"Preview and production updates\" },\n  { id: \"incidents\", title: \"Incidents\", desc: \"Status changes and postmortems\" },\n];\n\nexport default function Example() {\n  const [checked, setChecked] = useState(() => new Set([\"comments\", \"incidents\"]));\n  const [delivery, setDelivery] = useState<Record<string, string | number | null>>({\n    comments: \"digest\",\n    deployments: \"email\",\n    incidents: \"push\",\n  });\n\n  const setItem = (id: string, value: boolean) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      value ? next.add(id) : next.delete(id);\n      return next;\n    });\n  };\n\n  const toggleItem = (id: string) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      next.has(id) ? next.delete(id) : next.add(id);\n      return next;\n    });\n  };\n\n  const setDeliveryMode = (id: string, value: string | number | null) => {\n    setDelivery((current) => ({ ...current, [id]: value }));\n  };\n\n  return (\n    <List items={notificationItems} spacing=\"sm\" style={{ width: 400 }}>\n      {notificationItems.map((item) => (\n        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>\n          <List.Checkbox\n            aria-label={`Enable ${item.title.toLowerCase()} notifications`}\n            placement=\"start\"\n            checked={checked.has(item.id)}\n            onCheckedChange={(value) => setItem(item.id, value)}\n          />\n          <div className=\"min-w-0 flex-1\">\n            <List.Title>{item.title}</List.Title>\n            <List.Desc>{item.desc}</List.Desc>\n          </div>\n          <List.Select\n            selectedKey={delivery[item.id]}\n            valueLabel={String(delivery[item.id] ?? \"\")}\n            isDisabled={!checked.has(item.id)}\n            onSelectionChange={(value) => setDeliveryMode(item.id, value)}\n          >\n            <Select.Trigger>\n              <Select.Value placeholder=\"Mode\" />\n            </Select.Trigger>\n            <Select.Content>\n              <Select.List>\n                <Select.Item value=\"email\">Email</Select.Item>\n                <Select.Item value=\"digest\">Digest</Select.Item>\n                <Select.Item value=\"push\">Push</Select.Item>\n              </Select.List>\n            </Select.Content>\n          </List.Select>\n        </List.Item>\n      ))}\n    </List>\n  );\n}"
    },
    {
        "title": "Quota Editor",
        "description": "Inline inputs work as row actions without taking over the List primitive.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { List } from \"ui-lab-components\";\n\nconst quotaItems = [\n  { id: \"seats\", title: \"Seats\", desc: \"Maximum workspace members\" },\n  { id: \"projects\", title: \"Projects\", desc: \"Active projects per workspace\" },\n  { id: \"tokens\", title: \"Tokens\", desc: \"Monthly API token budget\" },\n];\n\nexport default function Example() {\n  const [checked, setChecked] = useState(() => new Set([\"seats\", \"projects\"]));\n  const [limits, setLimits] = useState<Record<string, string>>({\n    seats: \"24\",\n    projects: \"12\",\n    tokens: \"50000\",\n  });\n\n  const setItem = (id: string, value: boolean) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      value ? next.add(id) : next.delete(id);\n      return next;\n    });\n  };\n\n  const toggleItem = (id: string) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      next.has(id) ? next.delete(id) : next.add(id);\n      return next;\n    });\n  };\n\n  const setLimit = (id: string, value: string) => {\n    setLimits((current) => ({ ...current, [id]: value }));\n  };\n\n  return (\n    <List items={quotaItems} spacing=\"sm\" style={{ width: 396 }}>\n      {quotaItems.map((item) => (\n        <List.Item key={item.id} value={item.id} interactive onClick={() => toggleItem(item.id)}>\n          <List.Checkbox\n            aria-label={`Enable ${item.title.toLowerCase()} limit`}\n            placement=\"start\"\n            checked={checked.has(item.id)}\n            onCheckedChange={(value) => setItem(item.id, value)}\n          />\n          <div className=\"min-w-0 flex-1\">\n            <List.Title>{item.title}</List.Title>\n            <List.Desc>{item.desc}</List.Desc>\n          </div>\n          <List.Input\n            aria-label={`${item.title} limit`}\n            type=\"number\"\n            value={limits[item.id]}\n            disabled={!checked.has(item.id)}\n            onChange={(event) => setLimit(item.id, event.currentTarget.value)}\n            className=\"w-24\"\n          />\n        </List.Item>\n      ))}\n    </List>\n  );\n}"
    },
    {
        "title": "Permissions Matrix",
        "description": "A parent checkbox can summarize rows that also expose per-row Select controls.",
        "code": "\"use client\";\n\nimport { useMemo, useState } from \"react\";\nimport { List, Select } from \"ui-lab-components\";\n\nconst permissionItems = [\n  { id: \"members\", title: \"Members\", desc: \"Invite and remove workspace members\" },\n  { id: \"billing\", title: \"Billing\", desc: \"Update plan, seats, and invoices\" },\n  { id: \"tokens\", title: \"Tokens\", desc: \"Issue scoped API credentials\" },\n];\n\nexport default function Example() {\n  const rows = useMemo(() => [{ id: \"all\", title: \"All permissions\" }, ...permissionItems], []);\n  const [checked, setChecked] = useState(() => new Set([\"members\", \"tokens\"]));\n  const [level, setLevel] = useState<Record<string, string | number | null>>({\n    members: \"edit\",\n    billing: \"view\",\n    tokens: \"edit\",\n  });\n  const allChecked = checked.size === permissionItems.length;\n  const isIndeterminate = checked.size > 0 && !allChecked;\n\n  const setItem = (id: string, value: boolean) => {\n    setChecked((current) => {\n      const next = new Set(current);\n      value ? next.add(id) : next.delete(id);\n      return next;\n    });\n  };\n\n  const setAll = (value: boolean) => {\n    permissionItems.forEach((item) => setItem(item.id, value));\n  };\n\n  const setPermissionLevel = (id: string, value: string | number | null) => {\n    setLevel((current) => ({ ...current, [id]: value }));\n  };\n\n  return (\n    <List items={rows} spacing=\"sm\" style={{ width: 420 }}>\n      <List.Item value=\"all\" interactive onClick={() => setAll(!allChecked)}>\n        <List.Checkbox\n          aria-label=\"Toggle all permissions\"\n          placement=\"start\"\n          checked={allChecked}\n          isIndeterminate={isIndeterminate}\n          onCheckedChange={setAll}\n        />\n        <List.Title>All permissions</List.Title>\n      </List.Item>\n      <List.Divider />\n      {permissionItems.map((item) => (\n        <List.Item key={item.id} value={item.id} interactive onClick={() => setItem(item.id, !checked.has(item.id))}>\n          <div className=\"w-5 flex-shrink-0\" />\n          <List.Checkbox\n            aria-label={`Allow ${item.title.toLowerCase()}`}\n            placement=\"start\"\n            checked={checked.has(item.id)}\n            onCheckedChange={(value) => setItem(item.id, value)}\n          />\n          <div className=\"min-w-0 flex-1\">\n            <List.Title>{item.title}</List.Title>\n            <List.Desc>{item.desc}</List.Desc>\n          </div>\n          <List.Select\n            selectedKey={level[item.id]}\n            valueLabel={String(level[item.id] ?? \"\")}\n            isDisabled={!checked.has(item.id)}\n            onSelectionChange={(value) => setPermissionLevel(item.id, value)}\n          >\n            <Select.Trigger>\n              <Select.Value placeholder=\"Access\" />\n            </Select.Trigger>\n            <Select.Content>\n              <Select.List>\n                <Select.Item value=\"view\">View</Select.Item>\n                <Select.Item value=\"edit\">Edit</Select.Item>\n                <Select.Item value=\"admin\">Admin</Select.Item>\n              </Select.List>\n            </Select.Content>\n          </List.Select>\n        </List.Item>\n      ))}\n    </List>\n  );\n}"
    }
],
  },

  mask: {
    id: "mask",
    name: "Mask",
    description: "Container with fading edge effects on content.",
    category: "container",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Mask",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card","scroll"],
    tags: ["container","visual","effect","fade"],
    accessibility: {"hasAriaSupport":false,"notes":["Visual effect only, does not affect content semantics"]},
    usage: undefined,
    examples: [
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
],
  },

  menu: {
    id: "menu",
    name: "Menu",
    description: "Context menu for right-click actions.",
    category: "navigation",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Menu",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["popover"],
    tags: ["menu","right-click","actions"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","Menu role","Focus management"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic Menu",
        "description": "A simple context menu triggered by right-click. Use this to provide quick access to common actions and context-specific commands.",
        "code": "import React from 'react';\nimport { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>Copy</Menu.Item>\n        <Menu.Item>Paste</Menu.Item>\n        <Menu.Item disabled>Cut</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    },
    {
        "title": "Nested Menu",
        "description": "Context menu with submenus for organizing related actions. Hover over items with arrows to reveal nested options.",
        "code": "import { Menu } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Menu>\n      <Menu.Trigger className=\"flex items-center justify-center rounded-md border-2 border-dashed border-background-600 p-12 w-full cursor-context-menu select-none text-foreground-300 hover:border-background-500 transition-colors\">\n        Right click here\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item>New File</Menu.Item>\n        <Menu.Item>New Folder</Menu.Item>\n        <Menu.Separator />\n        <Menu.Sub>\n          <Menu.SubTrigger>Open with...</Menu.SubTrigger>\n          <Menu.SubContent>\n            <Menu.Item>VS Code</Menu.Item>\n            <Menu.Item>Sublime Text</Menu.Item>\n            <Menu.Item>Vim</Menu.Item>\n            <Menu.Separator />\n            <Menu.Item>Other Application...</Menu.Item>\n          </Menu.SubContent>\n        </Menu.Sub>\n        <Menu.Sub>\n          <Menu.SubTrigger>Share</Menu.SubTrigger>\n          <Menu.SubContent>\n            <Menu.Item>Copy Link</Menu.Item>\n            <Menu.Item>Email</Menu.Item>\n            <Menu.Sub>\n              <Menu.SubTrigger>Social Media</Menu.SubTrigger>\n              <Menu.SubContent>\n                <Menu.Item>Twitter</Menu.Item>\n                <Menu.Item>LinkedIn</Menu.Item>\n                <Menu.Item>Facebook</Menu.Item>\n              </Menu.SubContent>\n            </Menu.Sub>\n          </Menu.SubContent>\n        </Menu.Sub>\n        <Menu.Separator />\n        <Menu.Item>Rename</Menu.Item>\n        <Menu.Item disabled>Delete</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    },
    {
        "title": "Toolbar Dropdown",
        "description": "Dropdown menu of actions with keyboard shortcuts and a disabled item.",
        "code": "import { Menu, Button } from \"ui-lab-components\";\nimport { FaChevronDown } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Menu type=\"pop-over\">\n      <Menu.Trigger>\n        <Button variant=\"ghost\">\n          File <FaChevronDown className=\"w-3 h-3 ml-1\" />\n        </Button>\n      </Menu.Trigger>\n      <Menu.Content align=\"start\">\n        <Menu.Item onSelect={() => {}}>\n          New file\n          <Menu.Shortcut>⌘N</Menu.Shortcut>\n        </Menu.Item>\n        <Menu.Item onSelect={() => {}}>\n          Open…\n          <Menu.Shortcut>⌘O</Menu.Shortcut>\n        </Menu.Item>\n        <Menu.Item onSelect={() => {}}>\n          Save\n          <Menu.Shortcut>⌘S</Menu.Shortcut>\n        </Menu.Item>\n        <Menu.Separator />\n        <Menu.Item disabled>Recent files</Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    },
    {
        "title": "Table Row Actions",
        "description": "Per-row overflow menu in a table, with a destructive action separated from neutral ones.",
        "code": "import { Menu, Button } from \"ui-lab-components\";\nimport { FaEllipsis } from \"react-icons/fa6\";\n\nconst rows = [\n  { id: \"doc_1\", name: \"Q3 roadmap\", updated: \"2h ago\" },\n  { id: \"doc_2\", name: \"Pricing review\", updated: \"yesterday\" },\n  { id: \"doc_3\", name: \"Hiring plan\", updated: \"3 days ago\" },\n];\n\nexport default function Example() {\n  return (\n    <table className=\"w-full text-sm border-collapse\">\n      <thead>\n        <tr className=\"border-b border-background-700\">\n          <th className=\"text-left py-2 px-3 font-medium text-foreground-200\">Document</th>\n          <th className=\"text-left py-2 px-3 font-medium text-foreground-200\">Updated</th>\n          <th className=\"py-2 px-3\" />\n        </tr>\n      </thead>\n      <tbody>\n        {rows.map((row) => (\n          <tr key={row.id} className=\"border-b border-background-700 last:border-0\">\n            <td className=\"py-2 px-3\">{row.name}</td>\n            <td className=\"py-2 px-3 text-foreground-400\">{row.updated}</td>\n            <td className=\"py-2 px-3 text-right\">\n              <Menu type=\"pop-over\">\n                <Menu.Trigger>\n                  <Button\n                    icon={<FaEllipsis />}\n                    size=\"icon\"\n                    variant=\"ghost\"\n                    styles=\"p-2\"\n                    aria-label={`Actions for ${row.name}`}\n                  />\n                </Menu.Trigger>\n                <Menu.Content align=\"end\">\n                  <Menu.Item onSelect={() => {}}>Open</Menu.Item>\n                  <Menu.Item onSelect={() => {}}>Rename</Menu.Item>\n                  <Menu.Item onSelect={() => {}}>Duplicate</Menu.Item>\n                  <Menu.Separator />\n                  <Menu.Item\n                    onSelect={() => {}}\n                    styles={{ root: \"text-destructive\" }}\n                  >\n                    Delete\n                  </Menu.Item>\n                </Menu.Content>\n              </Menu>\n            </td>\n          </tr>\n        ))}\n      </tbody>\n    </table>\n  );\n}"
    },
    {
        "title": "Context Menu",
        "description": "Right-click anywhere in the surface to open the menu at the cursor position.",
        "code": "import { Menu } from \"ui-lab-components\";\n\nexport default function Example() {\n  return (\n    <Menu type=\"context-menu\">\n      <Menu.Trigger>\n        <div className=\"flex items-center justify-center w-80 h-32 border border-dashed border-background-700 rounded-sm text-sm text-foreground-400 select-none\">\n          Right-click anywhere in this area\n        </div>\n      </Menu.Trigger>\n      <Menu.Content>\n        <Menu.Item onSelect={() => {}}>\n          Cut\n          <Menu.Shortcut>⌘X</Menu.Shortcut>\n        </Menu.Item>\n        <Menu.Item onSelect={() => {}}>\n          Copy\n          <Menu.Shortcut>⌘C</Menu.Shortcut>\n        </Menu.Item>\n        <Menu.Item onSelect={() => {}}>\n          Paste\n          <Menu.Shortcut>⌘V</Menu.Shortcut>\n        </Menu.Item>\n        <Menu.Separator />\n        <Menu.Item onSelect={() => {}} styles={{ root: \"text-destructive\" }}>\n          Delete\n        </Menu.Item>\n      </Menu.Content>\n    </Menu>\n  );\n}"
    },
    {
        "title": "View Options",
        "description": "Mixed checkbox and radio items for toggling display state and selecting a single density.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Menu, Button } from \"ui-lab-components\";\n\nexport default function Example() {\n  const [showGrid, setShowGrid] = useState(true);\n  const [showRulers, setShowRulers] = useState(false);\n  const [density, setDensity] = useState(\"comfortable\");\n\n  return (\n    <Menu type=\"pop-over\">\n      <Menu.Trigger>\n        <Button>View</Button>\n      </Menu.Trigger>\n      <Menu.Content align=\"start\">\n        <Menu.Label>Display</Menu.Label>\n        <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>\n          Show grid\n        </Menu.CheckboxItem>\n        <Menu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>\n          Show rulers\n        </Menu.CheckboxItem>\n        <Menu.Separator />\n        <Menu.Label>Density</Menu.Label>\n        <Menu.RadioGroup value={density} onValueChange={setDensity}>\n          <Menu.RadioItem value=\"compact\">Compact</Menu.RadioItem>\n          <Menu.RadioItem value=\"comfortable\">Comfortable</Menu.RadioItem>\n          <Menu.RadioItem value=\"spacious\">Spacious</Menu.RadioItem>\n        </Menu.RadioGroup>\n      </Menu.Content>\n    </Menu>\n  );\n}"
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
    usage: {"summary":"Use Modal for short, focused dialog tasks that need a dedicated overlay surface and clear dismissal path.","whenToUse":["Interruptive tasks that need focused attention","Short forms, confirmations, or contextual workflows that should not navigate away","Situations where the dialog itself should provide the only surfaced container"],"whenNotToUse":["Long, browse-heavy, or primary page flows","Cases where inline expansion or a dedicated page would be clearer","Layouts that require another nested surface just to hold the content"],"rules":[{"type":"do","title":"Let Modal be the surface","description":"Use the modal shell, title, content area, and footer as the dialog structure instead of wrapping the body in another surface component."},{"type":"avoid","title":"Avoid nested surfaced containers","description":"Do not place Card or other panel-like surfaces inside the modal body unless there is a strong semantic need for a distinct sub-region.","relatedComponents":["card","panel","confirm"]},{"type":"prefer","title":"Prefer direct content plus layout primitives","description":"Arrange modal content with Flex, Grid, Group, and Modal footer slots so the hierarchy stays shallow and the dialog reads as a single unit.","relatedComponents":["flex","grid","group"]}]},
    examples: [
    {
        "title": "Basic Modal",
        "description": "A simple modal dialog with a trigger button. Use this for important user interactions that require focused attention.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Modal, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>\n        <Modal.Header>Modal Title</Modal.Header>\n        <Modal.Body>This is the modal content. It displays important information or actions.</Modal.Body>\n        <Modal.Footer>Modal Footer</Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
    },
    {
        "title": "Form Modal",
        "description": "A modal dialog containing a form for editing user profile settings. Demonstrates using form inputs, labels, and action buttons within a modal.",
        "code": "'use client';\n\nimport React from 'react';\nimport { Modal, Button, Input, Label, TextArea, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = React.useState(false);\n  const [formData, setFormData] = React.useState({\n    name: 'John Doe',\n    email: 'john.doe@example.com',\n    bio: 'Software developer passionate about building great user experiences.',\n  });\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();\n    // Handle form submission\n    setIsOpen(false);\n  };\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size=\"auto\">\n        <Modal.Header>Edit Profile</Modal.Header>\n        <Modal.Body>\n          <form id=\"profile-form\" onSubmit={handleSubmit}>\n            <Flex direction=\"column\" gap=\"md\">\n              <div>\n                <Label htmlFor=\"name\" required>\n                  Full Name\n                </Label>\n                <Input\n                  id=\"name\"\n                  value={formData.name}\n                  onChange={(e) =>\n                    setFormData({ ...formData, name: e.target.value })\n                  }\n                  placeholder=\"Enter your name\"\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"email\" required>\n                  Email Address\n                </Label>\n                <Input\n                  id=\"email\"\n                  type=\"email\"\n                  value={formData.email}\n                  onChange={(e) =>\n                    setFormData({ ...formData, email: e.target.value })\n                  }\n                  placeholder=\"Enter your email\"\n                />\n              </div>\n              <div>\n                <Label htmlFor=\"bio\">Bio</Label>\n                <TextArea\n                  id=\"bio\"\n                  value={formData.bio}\n                  onChange={(e) =>\n                    setFormData({ ...formData, bio: e.target.value })\n                  }\n                  placeholder=\"Tell us about yourself\"\n                  rows={3}\n                />\n              </div>\n            </Flex>\n          </form>\n        </Modal.Body>\n        <Modal.Footer>\n          <Flex gap=\"sm\" justify=\"end\">\n            <Button variant=\"ghost\" onClick={() => setIsOpen(false)}>\n              Cancel\n            </Button>\n            <Button type=\"submit\" form=\"profile-form\">\n              Save Changes\n            </Button>\n          </Flex>\n        </Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
    },
    {
        "title": "Delete Confirmation",
        "description": "Destructive action dialog that blocks the user until they explicitly confirm or cancel.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Modal, Button } from \"ui-lab-components\";\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = useState(false);\n\n  return (\n    <>\n      <Button variant=\"destructive\" onClick={() => setIsOpen(true)}>\n        Delete workspace\n      </Button>\n\n      <Modal\n        isOpen={isOpen}\n        onOpenChange={setIsOpen}\n        title=\"Delete workspace\"\n        footer={\n          <>\n            <Button variant=\"ghost\" onClick={() => setIsOpen(false)}>\n              Cancel\n            </Button>\n            <Button variant=\"destructive\" onClick={() => setIsOpen(false)}>\n              Delete\n            </Button>\n          </>\n        }\n      >\n        <p className=\"text-sm text-foreground-300\">\n          This will permanently delete <strong className=\"text-foreground-100\">acme-corp</strong> and all\n          its data. This action cannot be undone.\n        </p>\n      </Modal>\n    </>\n  );\n}"
    },
    {
        "title": "Create API Key",
        "description": "Form modal with a single required input. The primary action stays disabled until the field has a value.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Modal, Button, Input, Label } from \"ui-lab-components\";\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [name, setName] = useState(\"\");\n\n  return (\n    <>\n      <Button onClick={() => setIsOpen(true)}>New API key</Button>\n\n      <Modal\n        isOpen={isOpen}\n        onOpenChange={setIsOpen}\n        title=\"New API key\"\n        footer={\n          <>\n            <Button variant=\"ghost\" onClick={() => setIsOpen(false)}>\n              Cancel\n            </Button>\n            <Button\n              onClick={() => setIsOpen(false)}\n              isDisabled={!name.trim()}\n            >\n              Create\n            </Button>\n          </>\n        }\n      >\n        <div className=\"flex flex-col gap-4 px-6 py-4\">\n          <div className=\"flex flex-col gap-1.5\">\n            <Label htmlFor=\"key-name\">Name</Label>\n            <Input\n              id=\"key-name\"\n              placeholder=\"e.g. CI deploy key\"\n              value={name}\n              onChange={(e) => setName(e.target.value)}\n            />\n          </div>\n          <p className=\"text-xs text-foreground-400\">\n            The key will only be shown once after creation.\n          </p>\n        </div>\n      </Modal>\n    </>\n  );\n}"
    },
    {
        "title": "Notification Settings",
        "description": "Settings panel using the compound Modal.Header / Modal.Body / Modal.Footer API with toggle rows.",
        "code": "\"use client\";\n\nimport { useState } from \"react\";\nimport { Modal, Button, Switch } from \"ui-lab-components\";\n\nexport default function Example() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [prefs, setPrefs] = useState({ email: true, push: false, marketing: false });\n\n  const toggle = (key: keyof typeof prefs) =>\n    setPrefs((p) => ({ ...p, [key]: !p[key] }));\n\n  return (\n    <>\n      <Button variant=\"ghost\" onClick={() => setIsOpen(true)}>\n        Notification settings\n      </Button>\n\n      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>\n        <Modal.Header>\n          <span className=\"text-sm font-semibold text-foreground-100\">Notification preferences</span>\n        </Modal.Header>\n\n        <Modal.Body>\n          <div className=\"flex flex-col divide-y divide-border px-6\">\n            {(\n              [\n                { key: \"email\", label: \"Email notifications\", description: \"Receive updates and alerts by email\" },\n                { key: \"push\", label: \"Push notifications\", description: \"Browser and mobile push alerts\" },\n                { key: \"marketing\", label: \"Product updates\", description: \"New features and announcements\" },\n              ] as const\n            ).map(({ key, label, description }) => (\n              <div key={key} className=\"flex items-center justify-between py-4\">\n                <div className=\"flex flex-col gap-0.5\">\n                  <span className=\"text-sm text-foreground-100\">{label}</span>\n                  <span className=\"text-xs text-foreground-400\">{description}</span>\n                </div>\n                <Switch isSelected={prefs[key]} onChange={() => toggle(key)} />\n              </div>\n            ))}\n          </div>\n        </Modal.Body>\n\n        <Modal.Footer>\n          <Button variant=\"ghost\" onClick={() => setIsOpen(false)}>\n            Cancel\n          </Button>\n          <Button onClick={() => setIsOpen(false)}>Save</Button>\n        </Modal.Footer>\n      </Modal>\n    </>\n  );\n}"
    }
],
  },

  page: {
    id: "page",
    name: "Page",
    description: "Top-level page container with layout constraints.",
    category: "container",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Page",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["flex","card","grid"],
    tags: ["container","layout","page-wrapper","responsive","context"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses semantic main role for page structure","Provides page-level context to child components","Mobile viewport detection for responsive behavior","Flexible padding and max-width constraints"]},
    usage: undefined,
    examples: [],
  },

  panel: {
    id: "panel",
    name: "Panel",
    description: "Region container managing header, content, and footer areas.",
    category: "layout",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Panel",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["page","grid","flex"],
    tags: ["composition","panel","regions","responsive","sticky"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses semantic HTML elements (header, main, footer)","Provides context to child components","Supports responsive viewport detection","Sticky header respects user preferences"]},
    usage: undefined,
    examples: [
    {
        "title": "Sidebar with Toggle",
        "description": "Left sidebar that collapses and expands via a toggle button in the content area.",
        "code": "import { Panel } from \"ui-lab-components\";\n\nexport default function Example() {\n  return (\n    <Panel style={{ height: \"400px\" }} className=\"w-full border border-background-700 rounded-lg bg-background-900\">\n      <Panel.Sidebar side=\"left\" defaultOpen width=\"200px\" collapsedWidth=\"0\">\n      </Panel.Sidebar>\n      <Panel.Content>\n        <Panel.Toggle>\n          <button>☰</button>\n        </Panel.Toggle>\n      </Panel.Content>\n    </Panel>\n  );\n}"
    }
],
  },

  path: {
    id: "path",
    name: "Path",
    description: "Breadcrumb navigation showing page hierarchy.",
    category: "navigation",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Path",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["navigation","path","hierarchy","parent-pages"],
    accessibility: {"hasAriaSupport":true,"notes":["Uses nav element with landmark role","Semantic ordered list structure","Current page marked with aria-current","Full keyboard navigation support","Screen reader friendly labels"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic Path",
        "description": "A simple path navigation showing the current page location. Use this to help users understand their position in the site hierarchy.",
        "code": "import { Path } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Path>\n      <Path.Item href=\"/\">Home</Path.Item>\n      <Path.Item href=\"/products\">Products</Path.Item>\n      <Path.Item href=\"/products/electronics\">Electronics</Path.Item>\n      <Path.Item>Laptop</Path.Item>\n    </Path>\n  );\n}"
    },
    {
        "title": "Custom Separator",
        "description": "Pass any node via the separator prop to replace the default slash.",
        "code": "import { Path } from \"ui-lab-components\";\nimport { FaChevronRight } from \"react-icons/fa6\";\n\nexport default function Example() {\n  return (\n    <Path separator={<FaChevronRight className=\"w-3 h-3 text-foreground-400\" />}>\n      <Path.Item href=\"/projects\">Projects</Path.Item>\n      <Path.Item href=\"/projects/ui-lab\">ui-lab</Path.Item>\n      <Path.Item>components</Path.Item>\n    </Path>\n  );\n}"
    },
    {
        "title": "Collapsed Breadcrumb",
        "description": "Deep paths collapse intermediate crumbs into an ellipsis menu — Path.Item wraps the Menu trigger directly.",
        "code": "import { Path, Menu, Button } from \"ui-lab-components\";\nimport { FaEllipsis } from \"react-icons/fa6\";\n\nconst collapsed = [\n  { label: \"Projects\", href: \"/projects\" },\n  { label: \"ui-lab\", href: \"/projects/ui-lab\" },\n  { label: \"packages\", href: \"/projects/ui-lab/packages\" },\n];\n\nexport default function Example() {\n  return (\n    <Path>\n      <Path.Item href=\"/\">Home</Path.Item>\n      <Path.Item>\n        <Menu type=\"pop-over\">\n          <Menu.Trigger>\n            <Button icon={<FaEllipsis />} styles=\"p-2\" size=\"icon\" variant=\"ghost\" aria-label=\"Show collapsed path\" />\n          </Menu.Trigger>\n          <Menu.Content align=\"start\">\n            {collapsed.map((crumb) => (\n              <Menu.Item key={crumb.href} onSelect={() => {}}>\n                {crumb.label}\n              </Menu.Item>\n            ))}\n          </Menu.Content>\n        </Menu>\n      </Path.Item>\n      <Path.Item href=\"/projects/ui-lab/packages/@ui\">@ui</Path.Item>\n      <Path.Item>Path.tsx</Path.Item>\n    </Path>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Basic",
        "description": "Default popover with a short note and two clear actions.",
        "code": "\"use client\";\n\nimport { Popover, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Popover\n      content={\n        <div className=\"w-64 space-y-3\">\n          <div className=\"space-y-1\">\n            <div className=\"text-sm font-medium\">Quick note</div>\n            <p>A popover works best when it adds one small piece of context, one simple choice, or one short action.</p>\n          </div>\n\n          <div className=\"flex items-center gap-2\">\n            <Button variant=\"ghost\" size=\"sm\">\n              Dismiss\n            </Button>\n            <Button size=\"sm\">\n              Continue\n            </Button>\n          </div>\n        </div>\n      }\n    >\n      <Button>Show info</Button>\n    </Popover>\n  );\n}"
    },
    {
        "title": "Toggleable Options",
        "description": "Popover containing a list of toggleable options using List.Item and List.Switch.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Popover, Button, List } from 'ui-lab-components';\n\nconst toggleableItems = [\n  { id: \"notifications\", label: \"Notifications\", desc: \"Push and email alerts\" },\n  { id: \"autoSave\", label: \"Auto-save\", desc: \"Save changes automatically\" },\n  { id: \"darkMode\", label: \"Dark mode\", desc: \"Use dark color scheme\" },\n];\n\nexport default function Example() {\n  const [enabled, setEnabled] = useState<Set<string>>(\n    () => new Set([\"notifications\", \"darkMode\"])\n  );\n\n  const toggle = (id: string) =>\n    setEnabled((prev) => {\n      const next = new Set(prev);\n      next.has(id) ? next.delete(id) : next.add(id);\n      return next;\n    });\n\n  return (\n    <Popover\n      position=\"bottom\"\n      content={\n        <List items={toggleableItems} spacing=\"sm\" style={{ width: 280 }}>\n          {toggleableItems.map((item) => (\n            <List.Item\n              key={item.id}\n              value={item.id}\n              interactive\n              onClick={() => toggle(item.id)}\n            >\n              <div className=\"min-w-0 flex-1\">\n                <List.Title>{item.label}</List.Title>\n                <List.Desc>{item.desc}</List.Desc>\n              </div>\n              <List.Switch\n                isSelected={enabled.has(item.id)}\n                onChange={() => toggle(item.id)}\n                aria-label={item.label}\n              />\n            </List.Item>\n          ))}\n        </List>\n      }\n    >\n      <Button>Options</Button>\n    </Popover>\n  );\n}"
    },
    {
        "title": "Table Row Actions",
        "description": "Per-row action menu in a data table, anchored to the overflow button.",
        "code": "\"use client\";\n\nimport { Popover, Button, List } from 'ui-lab-components';\nimport { FaEllipsis } from 'react-icons/fa6';\n\nconst rows = [\n  { id: \"usr_1\", name: \"Alice\", role: \"Admin\", status: \"Active\" },\n  { id: \"usr_2\", name: \"Bob\", role: \"Member\", status: \"Invited\" },\n  { id: \"usr_3\", name: \"Carol\", role: \"Viewer\", status: \"Active\" },\n];\n\nexport default function Example() {\n  return (\n    <table className=\"w-full text-sm border-collapse\">\n      <thead>\n        <tr className=\"border-b border-background-700\">\n          <th className=\"text-left py-2 px-3 font-medium text-foreground-200\">Name</th>\n          <th className=\"text-left py-2 px-3 font-medium text-foreground-200\">Role</th>\n          <th className=\"text-left py-2 px-3 font-medium text-foreground-200\">Status</th>\n          <th className=\"py-2 px-3\" />\n        </tr>\n      </thead>\n      <tbody>\n        {rows.map((row) => (\n          <tr key={row.id} className=\"border-b border-background-700 last:border-0\">\n            <td className=\"py-2 px-3\">{row.name}</td>\n            <td className=\"py-2 px-3 text-foreground-200\">{row.role}</td>\n            <td className=\"py-2 px-3 text-foreground-200\">{row.status}</td>\n            <td className=\"py-2 px-3 text-right\">\n              <Popover\n                position=\"left\"\n                content={\n                  <List gap=\"sm\" styles={{ root: \"w-full\" }}>\n                    <Button\n                      variant=\"ghost\"\n                      size=\"sm\"\n                      styles={{ root: \"justify-start\" }}\n                    >\n                      Edit {row.name}\n                    </Button>\n                    <Button\n                      variant=\"danger\"\n                      size=\"sm\"\n                      styles={{ root: \"justify-start\" }}\n                    >\n                      Remove {row.name}\n                    </Button>\n                  </List>\n                }\n              >\n                <Button icon={<FaEllipsis />} styles=\"p-2\" size=\"icon\" variant=\"ghost\" aria-label={`Row actions for ${row.name}`} />\n              </Popover>\n            </td>\n          </tr>\n        ))}\n      </tbody>\n    </table>\n  );\n}"
    },
    {
        "title": "Input Form",
        "description": "Popover containing a small form with labeled input fields and save/cancel actions.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Popover, Button, Flex, Label, Input } from 'ui-lab-components';\n\nexport default function Example() {\n  const [name, setName] = useState(\"\");\n  const [email, setEmail] = useState(\"\");\n\n  return (\n    <Popover\n      position=\"bottom\"\n      content={\n        <Flex direction=\"column\" gap=\"sm\" styles={{ root: \"w-80\" }}>\n          <Flex direction=\"column\" gap=\"xs\">\n            <Label htmlFor=\"contact-name\">Name</Label>\n            <Input\n              id=\"contact-name\"\n              type=\"text\"\n              value={name}\n              onChange={(e) => setName((e.target as HTMLInputElement).value)}\n              placeholder=\"Full name\"\n            />\n          </Flex>\n          <Flex direction=\"column\" gap=\"xs\">\n            <Label htmlFor=\"contact-email\">Email</Label>\n            <Input\n              id=\"contact-email\"\n              type=\"email\"\n              value={email}\n              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}\n              placeholder=\"name@example.com\"\n            />\n          </Flex>\n        </Flex>\n      }\n    >\n      <Button>Edit contact</Button>\n    </Popover>\n  );\n}"
    },
    {
        "title": "Arrow & Positions",
        "description": "Directional arrow enabled across all four placement options.",
        "code": "\"use client\";\n\nimport { Popover, Button, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex align=\"center\">\n      {([\"top\", \"bottom\", \"left\", \"right\"] as const).map((position) => (\n        <Popover\n          key={position}\n          position={position}\n          showArrow\n          content={<span className=\"text-sm capitalize\">{position}</span>}\n        >\n          <Button variant=\"ghost\">\n            <span className=\"capitalize\">{position}</span>\n          </Button>\n        </Popover>\n      ))}\n    </Flex>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "File Upload",
        "description": "Simulated upload progress with a label and live percentage — starts on button click.",
        "code": "\"use client\";\n\nimport { useState, useEffect } from 'react';\nimport { Progress, Flex, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [progress, setProgress] = useState(0);\n  const [running, setRunning] = useState(false);\n\n  useEffect(() => {\n    if (!running) return;\n    if (progress >= 100) { setRunning(false); return; }\n    const t = setTimeout(() => setProgress((p) => Math.min(p + Math.random() * 12, 100)), 200);\n    return () => clearTimeout(t);\n  }, [running, progress]);\n\n  const reset = () => { setProgress(0); setRunning(false); };\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 340 }}>\n      <Flex direction=\"column\" gap=\"xs\">\n        <span style={{ fontSize: \"var(--text-sm)\", color: \"var(--foreground-muted)\" }}>\n          report-q4-2025.pdf\n        </span>\n        <Progress value={progress} label=\"Uploading\" showValue />\n      </Flex>\n      <Flex gap=\"sm\">\n        <Button variant=\"primary\" onClick={() => setRunning(true)} disabled={running || progress === 100}>\n          {progress === 100 ? \"Done\" : \"Upload\"}\n        </Button>\n        <Button variant=\"ghost\" onClick={reset}>Reset</Button>\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Storage Quota",
        "description": "Fixed progress bar showing disk usage relative to a custom max value.",
        "code": "import { Progress, Flex } from 'ui-lab-components';\n\nconst used = 7.4;\nconst total = 10;\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 300 }}>\n      <Flex direction=\"column\" gap=\"xs\">\n        <Progress value={used} max={total} label=\"Storage\" showValue />\n        <span style={{ fontSize: \"var(--text-xs)\", color: \"var(--foreground-muted)\" }}>\n          {used} GB of {total} GB used\n        </span>\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Onboarding Steps",
        "description": "Step tracker using value/max to represent wizard completion.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Progress, Flex, Button } from 'ui-lab-components';\n\nconst steps = [\"Profile\", \"Preferences\", \"Integrations\", \"Invite team\"];\n\nexport default function Example() {\n  const [step, setStep] = useState(1);\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 340 }}>\n      <Flex direction=\"column\" gap=\"xs\">\n        <Progress value={step} max={steps.length} />\n        <span style={{ fontSize: \"var(--text-sm)\", color: \"var(--foreground-muted)\" }}>\n          Step {step} of {steps.length} — {steps[step - 1]}\n        </span>\n      </Flex>\n      <Flex gap=\"sm\">\n        <Button variant=\"ghost\" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>\n          Back\n        </Button>\n        <Button variant=\"primary\" onClick={() => setStep((s) => Math.min(steps.length, s + 1))} disabled={step === steps.length}>\n          Next\n        </Button>\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Indeterminate Loading",
        "description": "Animated bar for unknown-duration operations — switches to complete when done.",
        "code": "\"use client\";\n\nimport { useState, useEffect } from 'react';\nimport { Progress, Flex, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    if (!loading) return;\n    const t = setTimeout(() => setLoading(false), 3000);\n    return () => clearTimeout(t);\n  }, [loading]);\n\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 320 }}>\n      <Flex direction=\"column\" gap=\"xs\">\n        <span style={{ fontSize: \"var(--text-sm)\", color: \"var(--foreground-muted)\" }}>\n          {loading ? \"Fetching results…\" : \"Results loaded\"}\n        </span>\n        <Progress indeterminate={loading} value={loading ? 0 : 100} />\n      </Flex>\n      <Button variant=\"ghost\" onClick={() => setLoading(true)} disabled={loading}>\n        Reload\n      </Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Skill Levels",
        "description": "Stacked progress bars in a profile or stats context with labels and values.",
        "code": "import { Progress, Flex } from 'ui-lab-components';\n\nconst skills = [\n  { name: \"TypeScript\", value: 92 },\n  { name: \"Rust\", value: 54 },\n  { name: \"Go\", value: 38 },\n];\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 300 }}>\n      {skills.map((s) => (\n        <Progress key={s.name} value={s.value} label={s.name} showValue />\n      ))}\n    </Flex>\n  );\n}"
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
    usage: undefined,
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
    description: "Scroll area with custom scrollbars for overflow.",
    category: "container",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Scroll",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: [],
    tags: ["scroll","overflow","layout","scrollbar"],
    accessibility: {"hasAriaSupport":false,"notes":["Custom scrollbar implementation for visual consistency"]},
    usage: undefined,
    examples: [
    {
        "title": "Log Viewer",
        "description": "Vertically scrollable log output with fade mask to hint at overflow content.",
        "code": "import { Scroll } from 'ui-lab-components';\n\nconst LOG_ENTRIES = [\n  { level: \"info\", msg: \"Server started on port 3000\" },\n  { level: \"info\", msg: \"Connected to database\" },\n  { level: \"warn\", msg: \"Slow query detected: users.findAll (342ms)\" },\n  { level: \"error\", msg: \"Failed to send email: SMTP timeout\" },\n  { level: \"info\", msg: \"Cache warmed: 1,204 keys loaded\" },\n  { level: \"info\", msg: \"Background job 'sync-orders' started\" },\n  { level: \"warn\", msg: \"Memory usage at 78%\" },\n  { level: \"info\", msg: \"Background job 'sync-orders' completed\" },\n  { level: \"error\", msg: \"Unhandled rejection: Cannot read property 'id' of undefined\" },\n  { level: \"info\", msg: \"Health check passed\" },\n  { level: \"warn\", msg: \"Rate limit reached for IP 192.168.1.42\" },\n  { level: \"info\", msg: \"User #4821 logged in\" },\n  { level: \"info\", msg: \"Deployment complete: v2.14.0\" },\n];\n\nexport default function Example() {\n  return (\n    <div style={{ width: 480, display: 'flex', flexDirection: 'column', gap: 4 }}>\n      <span style={{ fontSize: 11, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>\n        Application Logs\n      </span>\n      <div style={{ border: '1px solid var(--color-border)', borderRadius: 6, background: 'var(--color-background-900)', overflow: 'hidden' }}>\n        <Scroll maxHeight=\"200px\" fade-y fadeDistance={8} fadeSize={5}>\n          <div style={{ padding: '8px 0' }}>\n            {LOG_ENTRIES.map((entry, i) => (\n              <div key={i} style={{\n                display: 'flex',\n                gap: 10,\n                padding: '3px 12px',\n                fontSize: 12,\n                fontFamily: 'var(--font-mono, monospace)',\n                color: entry.level === 'error'\n                  ? 'var(--color-destructive)'\n                  : entry.level === 'warn'\n                    ? 'var(--color-warning, var(--color-muted))'\n                    : 'var(--color-foreground)',\n              }}>\n                <span style={{ color: 'var(--color-muted)', minWidth: 36 }}>{entry.level}</span>\n                <span>{entry.msg}</span>\n              </div>\n            ))}\n          </div>\n        </Scroll>\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Settings Panel",
        "description": "Constrained-height settings list with a custom scrollbar shown on hover.",
        "code": "import { Scroll } from 'ui-lab-components';\n\nconst SETTINGS_ITEMS = Array.from({ length: 18 }, (_, i) => ({\n  label: `Option ${i + 1}`,\n  description: `Configure behavior for setting ${i + 1}`,\n}));\n\nexport default function Example() {\n  return (\n    <div style={{ width: 320, border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden', background: 'var(--color-background)' }}>\n      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)', fontSize: 13, fontWeight: 500 }}>\n        Preferences\n      </div>\n      <Scroll maxHeight=\"240px\">\n        <div style={{ padding: '8px 0' }}>\n          {SETTINGS_ITEMS.map((item, i) => (\n            <div key={i} style={{\n              display: 'flex',\n              justifyContent: 'space-between',\n              alignItems: 'center',\n              padding: '8px 16px',\n              fontSize: 13,\n              borderBottom: i < SETTINGS_ITEMS.length - 1 ? '1px solid var(--color-border)' : undefined,\n            }}>\n              <div>\n                <div style={{ color: 'var(--color-foreground)' }}>{item.label}</div>\n                <div style={{ fontSize: 11, color: 'var(--color-muted)', marginTop: 1 }}>{item.description}</div>\n              </div>\n            </div>\n          ))}\n        </div>\n      </Scroll>\n    </div>\n  );\n}"
    },
    {
        "title": "Horizontal Tag List",
        "description": "Horizontally scrollable row of filter tags that overflow their container.",
        "code": "import { Scroll } from 'ui-lab-components';\n\nconst TAGS = [\n  \"authentication\", \"payments\", \"webhooks\", \"analytics\", \"notifications\",\n  \"billing\", \"user-management\", \"api-keys\", \"rate-limiting\", \"audit-logs\",\n  \"exports\", \"integrations\", \"search\", \"permissions\", \"reports\",\n];\n\nexport default function Example() {\n  return (\n    <div style={{ width: 420, display: 'flex', flexDirection: 'column', gap: 6 }}>\n      <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>Filter by topic</span>\n      <Scroll direction=\"horizontal\" maxWidth=\"420px\" hide={false} inline>\n        <div style={{ display: 'flex', gap: 6, padding: '2px 0' }}>\n          {TAGS.map((tag) => (\n            <span key={tag} style={{\n              whiteSpace: 'nowrap',\n              padding: '3px 10px',\n              border: '1px solid var(--color-border)',\n              borderRadius: 4,\n              fontSize: 12,\n              color: 'var(--color-foreground)',\n              cursor: 'default',\n              background: 'var(--color-background-900)',\n            }}>\n              {tag}\n            </span>\n          ))}\n        </div>\n      </Scroll>\n    </div>\n  );\n}"
    }
],
  },

  select: {
    id: "select",
    name: "Select",
    description: "Dropdown select component for choosing from multiple options.",
    category: "input",
    experimental: true,
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Select",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["input","label","form","group"],
    tags: ["form","dropdown","selection"],
    accessibility: {"hasAriaSupport":true,"notes":["Keyboard accessible","Screen reader friendly","ARIA roles included"]},
    usage: undefined,
    examples: [
    {
        "title": "Basic Select",
        "description": "A simple dropdown select component with options. Use this for form inputs and user choices.",
        "code": "import React from 'react';\nimport { Select } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Select>\n      <Select.Trigger>\n        <Select.Value placeholder=\"Select an option\" />\n      </Select.Trigger>\n      <Select.Content>\n        <Select.Item value=\"option1\" textValue=\"Option 1\">Option 1</Select.Item>\n        <Select.Item value=\"option2\" textValue=\"Option 2\">Option 2</Select.Item>\n        <Select.Item value=\"option3\" textValue=\"Option 3\">Option 3</Select.Item>\n      </Select.Content>\n    </Select>\n  );\n}"
    },
    {
        "title": "Searchable Select",
        "description": "A filterable select component with search input. Type to filter through a large list of options.",
        "code": "import React from 'react';\nimport { Select, Searchable } from 'ui-lab-components';\n\nconst countries = [\n  { value: 'us', label: 'United States' },\n  { value: 'ca', label: 'Canada' },\n  { value: 'mx', label: 'Mexico' },\n  { value: 'br', label: 'Brazil' },\n  { value: 'ar', label: 'Argentina' },\n  { value: 'uk', label: 'United Kingdom' },\n  { value: 'fr', label: 'France' },\n  { value: 'de', label: 'Germany' },\n  { value: 'it', label: 'Italy' },\n  { value: 'es', label: 'Spain' },\n  { value: 'pt', label: 'Portugal' },\n  { value: 'nl', label: 'Netherlands' },\n  { value: 'be', label: 'Belgium' },\n  { value: 'ch', label: 'Switzerland' },\n  { value: 'at', label: 'Austria' },\n  { value: 'se', label: 'Sweden' },\n  { value: 'no', label: 'Norway' },\n  { value: 'dk', label: 'Denmark' },\n  { value: 'fi', label: 'Finland' },\n  { value: 'pl', label: 'Poland' },\n  { value: 'jp', label: 'Japan' },\n  { value: 'cn', label: 'China' },\n  { value: 'kr', label: 'South Korea' },\n  { value: 'in', label: 'India' },\n  { value: 'au', label: 'Australia' },\n  { value: 'nz', label: 'New Zealand' },\n];\n\nexport default function Example() {\n  return (\n    <Select>\n      <Searchable.Input placeholder=\"Search countries...\" />\n      <Searchable.Content searchPlaceholder=\"Type to filter...\">\n        {countries.map((country) => (\n          <Select.Item key={country.value} value={country.value} textValue={country.label}>\n            {country.label}\n          </Select.Item>\n        ))}\n      </Searchable.Content>\n    </Select>\n  );\n}"
    },
    {
        "title": "Country Selector",
        "description": "Button trigger reveals a searchable country list with flags and dial codes inside the dropdown content.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Select, Searchable } from 'ui-lab-components';\n\nconst countries = [\n  { value: \"us\", label: \"United States\", flag: \"🇺🇸\", code: \"+1\" },\n  { value: \"gb\", label: \"United Kingdom\", flag: \"🇬🇧\", code: \"+44\" },\n  { value: \"de\", label: \"Germany\", flag: \"🇩🇪\", code: \"+49\" },\n  { value: \"fr\", label: \"France\", flag: \"🇫🇷\", code: \"+33\" },\n  { value: \"jp\", label: \"Japan\", flag: \"🇯🇵\", code: \"+81\" },\n  { value: \"kr\", label: \"South Korea\", flag: \"🇰🇷\", code: \"+82\" },\n  { value: \"cn\", label: \"China\", flag: \"🇨🇳\", code: \"+86\" },\n  { value: \"in\", label: \"India\", flag: \"🇮🇳\", code: \"+91\" },\n  { value: \"br\", label: \"Brazil\", flag: \"🇧🇷\", code: \"+55\" },\n  { value: \"au\", label: \"Australia\", flag: \"🇦🇺\", code: \"+61\" },\n  { value: \"ca\", label: \"Canada\", flag: \"🇨🇦\", code: \"+1\" },\n  { value: \"mx\", label: \"Mexico\", flag: \"🇲🇽\", code: \"+52\" },\n];\n\nexport default function Example() {\n  const [country, setCountry] = useState<string | number | null>(\"us\");\n  const selected = countries.find(c => c.value === country);\n\n  return (\n    <Select\n      selectedKey={country}\n      valueLabel={selected?.label}\n      onSelectionChange={setCountry}\n      className=\"w-72\"\n    >\n      <Select.Trigger>\n        <Select.Value\n          placeholder=\"Choose a country...\"\n          icon={selected && <span className=\"text-sm\">{selected.flag}</span>}\n        />\n      </Select.Trigger>\n      <Searchable.Content searchPlaceholder=\"Search countries...\">\n        {countries.map((c) => (\n          <Select.Item key={c.value} value={c.value} textValue={c.label} icon={<span className=\"text-md\">{c.flag}</span>}>\n            <div className=\"flex items-center justify-between w-full\">\n              <span>{c.label}</span>\n              <span className=\"ml-2 text-sm text-foreground-400\">{c.code}</span>\n            </div>\n          </Select.Item>\n        ))}\n      </Searchable.Content>\n    </Select>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Volume Control",
        "description": "Horizontal slider with a label and live numeric readout.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  const [volume, setVolume] = useState(60);\n\n  return (\n    <div className=\"flex items-center gap-4 w-72\">\n      <span className=\"text-sm text-muted-foreground w-16\">Volume</span>\n      <Slider\n        aria-label=\"Volume\"\n        value={volume}\n        onValueChange={([v]) => setVolume(v)}\n        className=\"flex-1\"\n      />\n      <span className=\"text-sm tabular-nums w-8 text-right\">{volume}</span>\n    </div>\n  );\n}"
    },
    {
        "title": "Settings Panel",
        "description": "Multiple sliders in a settings list with dividers.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  const [brightness, setBrightness] = useState(80);\n  const [contrast, setContrast] = useState(50);\n  const [saturation, setSaturation] = useState(40);\n\n  const settings = [\n    { id: \"brightness\", label: \"Brightness\", value: brightness, onChange: (v: number[]) => setBrightness(v[0]) },\n    { id: \"contrast\", label: \"Contrast\", value: contrast, onChange: (v: number[]) => setContrast(v[0]) },\n    { id: \"saturation\", label: \"Saturation\", value: saturation, onChange: (v: number[]) => setSaturation(v[0]) },\n  ];\n\n  return (\n    <div className=\"w-80 divide-y divide-border divide-background-700\">\n      {settings.map(({ id, label, value, onChange }) => (\n        <div key={id} className=\"flex items-center gap-4 py-3\">\n          <span className=\"text-sm w-24 shrink-0\">{label}</span>\n          <Slider aria-label={label} value={value} onValueChange={onChange} className=\"flex-1\" />\n          <span className=\"text-sm tabular-nums w-8 text-right text-muted-foreground\">{value}</span>\n        </div>\n      ))}\n    </div>\n  );\n}"
    },
    {
        "title": "Price Range",
        "description": "Range slider with two thumbs for min/max filtering.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  const [range, setRange] = useState([200, 800]);\n\n  return (\n    <div className=\"w-80 flex flex-col gap-4\">\n      <div className=\"flex justify-between text-sm text-muted-foreground\">\n        <span>Price range</span>\n        <span>${range[0]} – ${range[1]}</span>\n      </div>\n      <Slider\n        aria-label=\"Price range\"\n        value={range}\n        min={0}\n        max={1000}\n        step={10}\n        onValueChange={setRange}\n      />\n      <div className=\"flex justify-between text-xs text-muted-foreground\">\n        <span>$0</span>\n        <span>$1,000</span>\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Step Slider",
        "description": "Slider constrained to discrete steps with tick labels.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  const [rating, setRating] = useState(3);\n\n  return (\n    <div className=\"flex flex-col gap-3 w-64\">\n      <div className=\"flex justify-between items-center\">\n        <label className=\"text-sm\">Quality rating</label>\n        <span className=\"text-sm font-medium\">{rating} / 5</span>\n      </div>\n      <Slider\n        aria-label=\"Quality rating\"\n        value={rating}\n        min={1}\n        max={5}\n        step={1}\n        onValueChange={([v]) => setRating(v)}\n      />\n      <div className=\"flex justify-between text-xs text-muted-foreground\">\n        {[1, 2, 3, 4, 5].map((n) => (\n          <span key={n}>{n}</span>\n        ))}\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Disabled State",
        "description": "Active and disabled sliders side by side.",
        "code": "import { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-4 w-64\">\n      <div className=\"flex items-center gap-4\">\n        <span className=\"text-sm text-muted-foreground w-20\">Active</span>\n        <Slider aria-label=\"Active slider\" defaultValue={40} className=\"flex-1\" />\n      </div>\n      <div className=\"flex items-center gap-4\">\n        <span className=\"text-sm text-muted-foreground w-20\">Disabled</span>\n        <Slider aria-label=\"Disabled slider\" defaultValue={40} disabled className=\"flex-1\" />\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Vertical Mixer",
        "description": "Vertical orientation for audio-style channel controls.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Slider } from 'ui-lab-components';\n\nexport default function Example() {\n  const [channels, setChannels] = useState([70, 50, 80, 40]);\n\n  return (\n    <div className=\"flex items-end gap-6 h-40\">\n      {[\"CH1\", \"CH2\", \"CH3\", \"CH4\"].map((label, i) => (\n        <div key={label} className=\"flex flex-col items-center gap-2\">\n          <Slider\n            aria-label={label}\n            value={channels[i]}\n            orientation=\"vertical\"\n            onValueChange={([v]) => {\n              const next = [...channels];\n              next[i] = v;\n              setChannels(next);\n            }}\n            style={{ height: 120 }}\n          />\n          <span className=\"text-xs text-muted-foreground\">{label}</span>\n        </div>\n      ))}\n    </div>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Inline Form Field",
        "description": "Switch paired with a label in a horizontal form row.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  const [enabled, setEnabled] = useState(false);\n\n  return (\n    <div className=\"flex items-center justify-between gap-4 w-64\">\n      <label htmlFor=\"marketing\" className=\"text-sm\">\n        Marketing emails\n      </label>\n      <Switch\n        id=\"marketing\"\n        aria-label=\"Marketing emails\"\n        isSelected={enabled}\n        onChange={setEnabled}\n      />\n    </div>\n  );\n}"
    },
    {
        "title": "Settings Panel",
        "description": "A list of toggleable settings with dividers.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  const [notifications, setNotifications] = useState(true);\n  const [sounds, setSounds] = useState(false);\n  const [badge, setBadge] = useState(true);\n\n  const settings = [\n    { id: \"notifications\", label: \"Push notifications\", value: notifications, onChange: setNotifications },\n    { id: \"sounds\", label: \"Sound effects\", value: sounds, onChange: setSounds },\n    { id: \"badge\", label: \"App badge\", value: badge, onChange: setBadge },\n  ];\n\n  return (\n    <div className=\"w-72 divide-y divide-border\">\n      {settings.map(({ id, label, value, onChange }) => (\n        <div key={id} className=\"flex items-center justify-between py-3\">\n          <span className=\"text-sm\">{label}</span>\n          <Switch aria-label={label} isSelected={value} onChange={onChange} />\n        </div>\n      ))}\n    </div>\n  );\n}"
    },
    {
        "title": "Disabled State",
        "description": "Switch in both on and off disabled states.",
        "code": "import { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <div className=\"flex flex-col gap-4\">\n      <div className=\"flex items-center gap-3\">\n        <Switch aria-label=\"Off disabled\" isDisabled defaultSelected={false} />\n        <span className=\"text-sm text-muted-foreground\">Disabled off</span>\n      </div>\n      <div className=\"flex items-center gap-3\">\n        <Switch aria-label=\"On disabled\" isDisabled defaultSelected={true} />\n        <span className=\"text-sm text-muted-foreground\">Disabled on</span>\n      </div>\n    </div>\n  );\n}"
    },
    {
        "title": "Small Size",
        "description": "Compact switch for dense UIs.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  const [dense, setDense] = useState(false);\n\n  return (\n    <div className=\"flex items-center gap-2\">\n      <Switch\n        size=\"sm\"\n        aria-label=\"Dense mode\"\n        isSelected={dense}\n        onChange={setDense}\n      />\n      <span className=\"text-sm text-muted-foreground\">Dense mode</span>\n    </div>\n  );\n}"
    },
    {
        "title": "Controlled Toggle",
        "description": "Fully controlled switch with external state and reset.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Switch } from 'ui-lab-components';\n\nexport default function Example() {\n  const [active, setActive] = useState(false);\n\n  return (\n    <div className=\"flex flex-col items-center gap-4\">\n      <Switch\n        aria-label=\"Feature flag\"\n        isSelected={active}\n        onChange={setActive}\n      />\n      <p className=\"text-xs text-muted-foreground\">\n        Feature is <strong>{active ? \"enabled\" : \"disabled\"}</strong>\n      </p>\n      <button\n        className=\"text-xs underline text-muted-foreground\"\n        onClick={() => setActive(false)}\n      >\n        Reset\n      </button>\n    </div>\n  );\n}"
    }
],
  },

  table: {
    id: "table",
    name: "Table",
    description: "Table component for displaying and organizing tabular data.",
    category: "display",
    source: {
  "packageName": "ui-lab-components",
  "exportName": "Table",
  "packagePath": "dist/index.d.ts"
},
    relatedComponents: ["card"],
    tags: ["data","table","display"],
    accessibility: {"hasAriaSupport":true,"notes":["Table role","Header associations","Keyboard navigation"]},
    usage: undefined,
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
    usage: undefined,
    examples: [
    {
        "title": "Basic Tabs",
        "description": "A simple tabbed interface with content switching. Use this to organize related content into separate views.",
        "code": "import React from 'react';\nimport { Tabs } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Tabs default=\"overview\">\n      <Tabs.List aria-label=\"Content sections\">\n        <Tabs.Trigger value=\"overview\">Overview</Tabs.Trigger>\n        <Tabs.Trigger value=\"details\">Details</Tabs.Trigger>\n        <Tabs.Trigger value=\"settings\">Settings</Tabs.Trigger>\n      </Tabs.List>\n      <Tabs.Content value=\"overview\">\n        <p>Overview content goes here.</p>\n      </Tabs.Content>\n      <Tabs.Content value=\"details\">\n        <p>Details content goes here.</p>\n      </Tabs.Content>\n      <Tabs.Content value=\"settings\">\n        <p>Settings content goes here.</p>\n      </Tabs.Content>\n    </Tabs>\n  );\n}"
    },
    {
        "title": "Vertical Tabs (Sidebar)",
        "description": "A vertical tab layout ideal for settings pages or sidebar navigation. Tabs are stacked vertically with content panels beside them.",
        "code": "import React from 'react';\nimport { Tabs, Card } from 'ui-lab-components';\nimport { User, Settings, Bell, Shield } from 'lucide-react';\n\nexport default function Example() {\n  return (\n    <div className=\"flex items-center justify-center bg-background-950 p-4 min-h-[400px]\">\n      <Card className=\"w-full max-w-2xl\">\n        <Tabs default=\"profile\" className=\"flex flex-row\">\n          {/* Vertical tab list - styled as sidebar */}\n          <Tabs.List\n            aria-label=\"Settings sections\"\n            className=\"flex-col items-stretch justify-start h-auto w-48 border-r border-background-700 rounded-none bg-transparent p-2\"\n          >\n            <Tabs.Trigger value=\"profile\" icon={<User className=\"w-4 h-4\" />} className=\"justify-start\">\n              Profile\n            </Tabs.Trigger>\n            <Tabs.Trigger value=\"notifications\" icon={<Bell className=\"w-4 h-4\" />} className=\"justify-start\">\n              Notifications\n            </Tabs.Trigger>\n            <Tabs.Trigger value=\"security\" icon={<Shield className=\"w-4 h-4\" />} className=\"justify-start\">\n              Security\n            </Tabs.Trigger>\n            <Tabs.Trigger value=\"preferences\" icon={<Settings className=\"w-4 h-4\" />} className=\"justify-start\">\n              Preferences\n            </Tabs.Trigger>\n          </Tabs.List>\n\n          {/* Content panels */}\n          <div className=\"flex-1 p-6\">\n            <Tabs.Content value=\"profile\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Profile Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Manage your personal information and how others see you on the platform.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-full bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-10 w-2/3 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </Tabs.Content>\n\n            <Tabs.Content value=\"notifications\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Notification Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Control how and when you receive alerts and updates.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-32 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-background-700 rounded\" />\n                  <div className=\"h-4 w-40 bg-background-800 rounded\" />\n                </div>\n                <div className=\"flex items-center gap-3\">\n                  <div className=\"h-5 w-5 bg-accent-500 rounded\" />\n                  <div className=\"h-4 w-28 bg-background-800 rounded\" />\n                </div>\n              </div>\n            </Tabs.Content>\n\n            <Tabs.Content value=\"security\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">Security Settings</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Protect your account with passwords, two-factor authentication, and more.\n              </p>\n              <div className=\"space-y-3\">\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-24 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-48 bg-background-700/50 rounded\" />\n                </div>\n                <div className=\"p-3 bg-background-800 rounded border border-background-700\">\n                  <div className=\"h-4 w-32 bg-background-700 rounded mb-2\" />\n                  <div className=\"h-3 w-40 bg-background-700/50 rounded\" />\n                </div>\n              </div>\n            </Tabs.Content>\n\n            <Tabs.Content value=\"preferences\" className=\"mt-0\">\n              <h3 className=\"text-lg font-semibold text-foreground-100 mb-2\">General Preferences</h3>\n              <p className=\"text-foreground-400 text-sm mb-4\">\n                Customize your experience with theme, language, and display options.\n              </p>\n              <div className=\"grid grid-cols-2 gap-3\">\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n                <div className=\"h-20 bg-background-800 rounded border border-background-700\" />\n              </div>\n            </Tabs.Content>\n          </div>\n        </Tabs>\n      </Card>\n    </div>\n  );\n}"
    },
    {
        "title": "Underline Variant",
        "description": "Horizontal tabs with underline indicator. Great for documentation sites.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Tabs } from 'ui-lab-components';\n\nexport default function Example() {\n  const [selected, setSelected] = useState(\"tab1\");\n\n  return (\n    <Tabs value={selected} onValueChange={setSelected} variant=\"underline\" className=\"w-fit\">\n      <Tabs.List aria-label=\"Tab options\">\n        <Tabs.Trigger value=\"tab1\">Install</Tabs.Trigger>\n        <Tabs.Trigger value=\"tab2\">Usage</Tabs.Trigger>\n        <Tabs.Trigger value=\"tab3\">API</Tabs.Trigger>\n      </Tabs.List>\n    </Tabs>\n  );\n}"
    },
    {
        "title": "Vertical Underline",
        "description": "Vertical tabs with underline variant indicator.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { Tabs } from 'ui-lab-components';\n\nexport default function Example() {\n  const [selected, setSelected] = useState(\"tab1\");\n\n  return (\n    <Tabs value={selected} onValueChange={setSelected} variant=\"underline\" orientation=\"vertical\" className=\"flex w-fit gap-4\">\n      <Tabs.List aria-label=\"Tab options\" className=\"flex flex-col w-fit\">\n        <Tabs.Trigger value=\"tab1\">Profile</Tabs.Trigger>\n        <Tabs.Trigger value=\"tab2\">Billing</Tabs.Trigger>\n        <Tabs.Trigger value=\"tab3\">Team</Tabs.Trigger>\n      </Tabs.List>\n    </Tabs>\n  );\n}"
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
    usage: undefined,
    examples: [
    {
        "title": "Feedback Form",
        "description": "TextArea with a character limit and submit button — disabled until the user types.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { TextArea, Flex, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [value, setValue] = useState(\"\");\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 380 }}>\n      <TextArea\n        placeholder=\"Tell us what you think...\"\n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        showCharacterCount\n        maxCharacters={300}\n        rows={4}\n      />\n      <Button variant=\"primary\" disabled={value.trim().length === 0} className=\"self-end\">\n        Submit\n      </Button>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Profile Bio",
        "description": "Fixed-height settings textarea with a 160-character cap and save/clear actions.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { TextArea, Flex, Button } from 'ui-lab-components';\n\nexport default function Example() {\n  const [bio, setBio] = useState(\"UI designer & developer building minimal tools.\");\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 380 }}>\n      <TextArea\n        value={bio}\n        onChange={(e) => setBio(e.target.value)}\n        showCharacterCount\n        maxCharacters={160}\n        rows={3}\n        resizable={false}\n      />\n      <Flex justify=\"end\" gap=\"sm\">\n        <Button size=\"sm\" variant=\"ghost\" onClick={() => setBio(\"\")}>Clear</Button>\n        <Button size=\"sm\" variant=\"primary\">Save</Button>\n      </Flex>\n    </Flex>\n  );\n}"
    },
    {
        "title": "Validation Error",
        "description": "Error styling triggered when the input is non-empty but below a minimum length.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { TextArea, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [value, setValue] = useState(\"\");\n  const hasError = value.trim().length > 0 && value.trim().length < 20;\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 380 }}>\n      <TextArea\n        placeholder=\"Describe the issue in detail...\"\n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        error={hasError}\n        rows={4}\n      />\n      {hasError && (\n        <span style={{ fontSize: \"0.75rem\", color: \"var(--color-destructive)\" }}>\n          Description must be at least 20 characters.\n        </span>\n      )}\n    </Flex>\n  );\n}"
    },
    {
        "title": "Disabled & Read-only",
        "description": "Side-by-side disabled and read-only states to compare their visual treatment.",
        "code": "import { TextArea, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  return (\n    <Flex direction=\"column\" gap=\"md\" style={{ width: 380 }}>\n      <TextArea\n        value=\"This field is disabled and cannot be edited.\"\n        disabled\n        rows={2}\n        resizable={false}\n      />\n      <TextArea\n        value=\"This is a read-only note visible to all team members.\"\n        readOnly\n        rows={2}\n        resizable={false}\n      />\n    </Flex>\n  );\n}"
    },
    {
        "title": "Scrollable with maxHeight",
        "description": "TextArea bounded by a max height — content scrolls once it overflows.",
        "code": "\"use client\";\n\nimport { useState } from 'react';\nimport { TextArea, Flex } from 'ui-lab-components';\n\nexport default function Example() {\n  const [value, setValue] = useState(\n    \"Line 1\\nLine 2\\nLine 3\\nLine 4\\nLine 5\\nLine 6\\nLine 7\\nLine 8\"\n  );\n\n  return (\n    <Flex direction=\"column\" gap=\"sm\" style={{ width: 380 }}>\n      <TextArea\n        value={value}\n        onChange={(e) => setValue(e.target.value)}\n        maxHeight=\"120px\"\n        resizable={false}\n      />\n    </Flex>\n  );\n}"
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
    usage: undefined,
    examples: [
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
    usage: undefined,
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
