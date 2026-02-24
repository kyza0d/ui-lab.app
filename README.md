![Banner](./assets/banner.png)

# UI Lab

React component library and design system for building accessible, themeable interfaces. It ships 42 components built on React Aria, a typed registry of pre-built patterns and elements, an MCP server for AI-assisted development, and a documentation site with live previews and an interactive theme configurator.


## What's Included

| Package | npm name | Purpose |
|---------|----------|---------|
| `packages/@ui` | `ui-lab-components` | React component library — 42 accessible, themeable components |
| `packages/registry` | `ui-lab-registry` | Typed registry: component metadata, patterns, elements, sections, design tokens |
| `packages/@mcp` | `ui-lab-mcp` | MCP server — exposes library to AI assistants (Claude, Cursor) |
| `apps/site` | — | Next.js documentation site with live previews and theme config tool |

---

## Component Library

**Install:**
```bash
npm install ui-lab-components
```

**42 components** across these categories:

| Category | Components |
|----------|-----------|
| Layout & Structure | Page, Panel, Group, Flex, Fold, Grid, Frame, Gallery |
| Form Inputs | Input, Textarea, Checkbox, Radio, Switch, Select, Slider, Date |
| Overlay & Popups | Modal, Popover, Tooltip, Menu |
| Data Display | Table, List, Code, Breadcrumbs, Color |
| Feedback | Toast, Confirmation, Progress, Badge |
| Navigation | Tabs, Anchor, Command |
| Visual | Mask, EasingPreview |
| Utility | Label, Divider, Banner, Button, Card, Scroll |

**Key characteristics:**

- **Accessibility** — built on [React Aria](https://react-spectrum.adobe.com/react-aria/) (`useButton`, `useDialog`, `useListbox`, `useModalOverlay`, keyboard navigation, focus management)
- **Styling** — CSS Modules with CSS custom properties for theming; Tailwind CSS `@apply` used internally; no Tailwind dependency in consumer projects
- **Compound components** — complex components compose via sub-components: `Card.Header/Body/Footer`, `List.Item/Checkbox/Media/Desc`, `Menu.Item/Group/SubTrigger`, `Panel.Header/Content/Sidebar/Resize`, `Modal.Header/Body/Footer`, and more
- **Theme system** — `ThemeProvider`, `useTheme`, `useThemeMode`, and a `generateThemeScript` for FOUC prevention; light/dark mode with localStorage persistence
- **Outputs** — UMD + ES modules, TypeScript declarations, `styles.css`, PostCSS plugin

---

## Design System

The `ui-lab-registry` package exposes a typed, searchable registry of design artifacts:

**Design tokens** — semantic color system with 8 families (`background`, `foreground`, `accent`, `success`, `danger`, `warning`, `info`, plus shades 50–950). Pre-defined color recommendations map component+intent pairs (e.g., `button:danger`, `alert:success`) to complete CSS variable pairings (background, text, border, hover, active, disabled) with WCAG compliance notes.

**Patterns (15)** — atomic, copy-paste UI compositions for recurring layouts:
- Layout: `media-object`, `split-row`, `stat-block`
- Form: `labeled-field`, `search-input`, `toggle-setting-row`, `select-row`
- Data: `badge-row`, `progress-metric`, `data-table-row`
- Interaction: `button-group-pattern`, `icon-action-bar`, `tab-content-header`
- Feedback: `inline-alert`, `empty-state-pattern`

**Elements (13)** — multi-component UI blocks assembled from the component library:
- AI: `AIChatInput`, `Chat`, `ChainOfThought`
- Documentation: `CopyPage`, `NextArticle`, `TOC`
- Components: `Carousel`, `Rating`, `Timeline`, `TreeView`
- Foundation: `Header`, `Page`, `Sidebar`

**Sections (5)** — full-width landing page blocks with multiple variations each: `Hero`, `Features`, `CTA`, `Testimonials`, `Pricing`

**Starters (8)** — full project templates for NextJS, Vite, Tauri, Astro, and more.

The registry is consumed by the documentation site and the MCP server. Every entry is typed and searchable:

```ts
import { getComponentById, searchPatterns, getElementById, getColorRecommendation } from 'ui-lab-registry'
```

---

## MCP Integration

The `ui-lab-mcp` package is a [Model Context Protocol](https://modelcontextprotocol.io/) server that connects UI Lab to AI coding assistants. Instead of pasting documentation into chat, the AI can query the library directly.

**Works with:** Claude Desktop, Cursor, and any MCP-compatible tool.

**12 tools exposed:**

| Tool | What it does |
|------|-------------|
| `search_components` | Find components by natural language query |
| `get_component` | Get full API, examples, or design guidance for a component |
| `get_semantic_color` | Get a recommended color pairing for a component + intent |
| `get_theme_setup` | Get complete theme provider setup with FOUC prevention |
| `search_patterns` | Find design patterns by use case |
| `get_pattern` | Get pattern code and design rationale |
| `search_elements` | Find multi-component UI blocks |
| `get_element` | Get element variations and source |
| `search_sections` | Find landing page sections |
| `get_section` | Get section variations and source |
| `get_inspiration` | Fuzzy discovery across all categories |
| `get_variation_code` | Get source for a specific variation |

**Claude Desktop config:**
```json
{
  "mcpServers": {
    "ui-lab": {
      "command": "node",
      "args": ["/path/to/packages/@mcp/dist/index.js"]
    }
  }
}
```

---

## Documentation Site

The Next.js site at `apps/site` provides:

- **Component browser** — category-organized gallery with live preview thumbnails
- **Patterns, Elements, Sections, Starters** — browsable and searchable, with copy-paste code
- **Design system docs** — colors, typography, spacing, tokens, CSS variables, accessibility guidelines
- **MDX documentation** — getting started, customization, AI integration guides
- **Interactive theme configurator** — real-time component preview, full control over colors (OKLCH), typography, spacing, radius; exports a ready-to-use CSS file
- **Dark/light mode** — with FOUC prevention and device preference detection

---

## Getting Started

**Prerequisites:** Node.js >= 18, pnpm 10.21.0

```bash
git clone <repo-url>
cd ui-lab
pnpm install
pnpm dev:site       # docs site at localhost:3000
```

After editing source in `packages/@ui/src/`, rebuild before the site picks up changes:

```bash
pnpm build:packages
```

**All root commands:**

| Command | Effect |
|---------|--------|
| `pnpm dev:site` | Start docs site at localhost:3000 |
| `pnpm dev` | Start all apps |
| `pnpm build` | Build everything |
| `pnpm build:packages` | Build @ui, registry, @mcp only |
| `pnpm build:site` | Build site only |
| `pnpm type-check` | TypeScript check across all packages |
| `pnpm lint` | Lint all packages |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Language | TypeScript 5.7–5.9 |
| UI framework | React 19.2.1 |
| Web framework | Next.js 16.0.10 |
| Component bundler | Vite 5.3.4 |
| Styling | Tailwind CSS 4.1.11, CSS Modules, PostCSS |
| Accessibility | React Aria 3.44+, React Stately 3.42+ |
| Animation | GSAP 3.12.2 |
| Syntax highlighting | Shiki 3.17.1 |
| Icons | Lucide React, React Icons |
| Package manager | pnpm 10.21.0 |
| Node.js | >= 18 |
