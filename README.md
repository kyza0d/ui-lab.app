![Banner](./assets/banner.png)

# UI Lab

React component library and design system for building accessible, themeable interfaces. It ships 39 components built on React Aria, a typed registry of pre-built patterns and elements, an MCP server for AI-assisted development, and a documentation site with live previews and an interactive theme configurator.


## What's Included

| Package | npm name | Purpose |
|---------|----------|---------|
| `packages/@ui` | `ui-lab-components` | React component library — 39 accessible, themeable components |
| `packages/registry` | `ui-lab-registry` | Public registry for the existing public site ecosystem |
| `packages/@mcp` | `ui-lab-mcp` | MCP server — exposes library to AI assistants (Claude, Cursor) |
| `apps/site` | — | Next.js documentation site with live previews and public metadata |

---

The private authoring workspace lives in the sibling `dev/` repo in this checkout and houses `@ui-lab-core/elements`.

## Component Library

**Install:**
```bash
npm install ui-lab-components
```

**39 components** across these categories:

| Category | Components |
|----------|-----------|
| Layout | Grid, Flex, Gallery, Divider, Expand, Panel |
| Composition | Group, List |
| Action | Button, Confirm, Command |
| Input | Date, Checkbox, Color, Input, Radio, Select, Slider, Switch, Textarea |
| Information | Banner, Badge, Label, Tooltip |
| Feedback | Popover, Progress, Toast |
| Navigation | Path, Menu, Tabs, Anchor |
| Container | Page, Card, Modal, Scroll, Mask, Frame |
| Display | Table, Code |

**Key characteristics:**

- **Accessibility** — built on [React Aria](https://react-spectrum.adobe.com/react-aria/) (`useButton`, `useDialog`, `useListbox`, `useModalOverlay`, keyboard navigation, focus management)
- **Styling** — CSS Modules with CSS custom properties for theming; Tailwind CSS `@apply` used internally; no Tailwind dependency in consumer projects
- **Compound components** — complex components compose via sub-components: `Card.Header/Body/Footer`, `List.Item/Checkbox/Media/Desc`, `Menu.Item/Group/SubTrigger`, `Panel.Header/Content/Sidebar/Resize`, `Modal.Header/Body/Footer`, and more
- **Theme system** — `ThemeProvider`, `useTheme`, `useThemeMode`, and a `generateThemeScript` for FOUC prevention; light/dark mode with localStorage persistence
- **Outputs** — UMD + ES modules, TypeScript declarations, `styles.css`, PostCSS plugin

---

## Design System

**Design tokens** — semantic color system with 8 families (`background`, `foreground`, `accent`, `success`, `danger`, `warning`, `info`, plus shades 50–950). Pre-defined color recommendations map component+intent pairs (e.g., `button:danger`, `alert:success`) to complete CSS variable pairings (background, text, border, hover, active, disabled) with WCAG compliance notes.

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

## Private Package Pipeline

The private elements pipeline is site-only:

- `@ui-lab-core/elements` is installed only in `app/apps/site`.
- `app/apps/site/src/**` may render the package only from server components, route handlers, or other server-only code paths.
- Convex is the entitlement boundary and decides whether a request is allowed to see locked source.
- `@ui-lab-core/elements/server` may be used after entitlement is confirmed on the server.
- GitHub Packages tokens are build-time only and must never be exposed to browser code.

The first implementation should keep rendering on the Next.js server and use Convex to answer "is this user entitled?" before the server imports or reads the locked source payloads.

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
| Language | TypeScript ^5.9 |
| UI framework | React 19.2.4 |
| Web framework | Next.js 16.2.0 |
| Component bundler | Vite ^5.3.4 |
| Styling | Tailwind CSS ^4.1.11, CSS Modules, PostCSS |
| Accessibility | React Aria ^3.14+, React Stately |
| Animation | GSAP ^3.12.2 |
| Syntax highlighting | Shiki ^3.17.1 |
| Icons | Lucide React |
| Package manager | pnpm 10.21.0 |
| Node.js | >= 18 |

<!-- The best UIs are built with intention, not convention -->
