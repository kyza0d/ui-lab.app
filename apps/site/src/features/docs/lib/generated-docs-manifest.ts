import 'server-only';

export type DocsDomain = 'docs' | 'design-system';

export interface GeneratedDocsTocItem {
  id: string;
  title: string;
  level: number;
}

export interface GeneratedDocsPageManifest {
  domain: DocsDomain;
  slug: string;
  url: string;
  title: string;
  label: string;
  description: string | null;
  section: string | null;
  toc: GeneratedDocsTocItem[];
  isIndex: boolean;
  order: number;
  sectionOrder: number;
  publishedOn: string | null;
  tags: string[];
}

export interface GeneratedDocsPageTreeItem {
  id: string;
  label: string;
  slug: string;
  url: string;
}

export interface GeneratedDocsPageTreeSection {
  label: string;
  items: GeneratedDocsPageTreeItem[];
}

export interface GeneratedDocsDomainManifest {
  pages: GeneratedDocsPageManifest[];
  pageTree: GeneratedDocsPageTreeSection[];
}

export interface GeneratedDocsManifest {
  docs: GeneratedDocsDomainManifest;
  'design-system': GeneratedDocsDomainManifest;
}

export const DOCS_MANIFEST: GeneratedDocsManifest = {
  "docs": {
    "pages": [
      {
        "domain": "docs",
        "slug": "index",
        "url": "/docs",
        "title": "Getting started",
        "label": "Getting started",
        "description": "A React component library with enforced design quality. OKLCH tokens, compound components, and an MCP server so AI agents build correctly — not by hallucination.",
        "section": null,
        "toc": [
          {
            "id": "what-is-ui-lab",
            "title": "What is UI Lab",
            "level": 2
          },
          {
            "id": "the-problem-it-solves",
            "title": "The problem it solves",
            "level": 2
          },
          {
            "id": "four-levels-of-abstraction",
            "title": "Four levels of abstraction",
            "level": 2
          },
          {
            "id": "quick-start",
            "title": "Quick start",
            "level": 2
          },
          {
            "id": "the-design-system",
            "title": "The design system",
            "level": 2
          },
          {
            "id": "ai-native-tooling",
            "title": "AI-native tooling",
            "level": 2
          },
          {
            "id": "mcp-server-ui-lab-mcp",
            "title": "MCP server (`ui-lab-mcp`)",
            "level": 3
          },
          {
            "id": "design-claude-code-skill",
            "title": "`/design` Claude Code skill",
            "level": 3
          },
          {
            "id": "composing-components",
            "title": "Composing components",
            "level": 2
          },
          {
            "id": "next-steps",
            "title": "Next steps",
            "level": 2
          }
        ],
        "isIndex": true,
        "order": -1,
        "sectionOrder": 999,
        "publishedOn": "2026-01-15",
        "tags": [
          "getting-started",
          "setup",
          "basics"
        ]
      },
      {
        "domain": "docs",
        "slug": "installation",
        "url": "/docs/installation",
        "title": "Installation",
        "label": "Installation",
        "description": "Add UI Lab to any Tailwind v4 project in under one minute.",
        "section": "Getting Started",
        "toc": [
          {
            "id": "choose-your-path",
            "title": "Choose your path",
            "level": 2
          },
          {
            "id": "interactive-installation",
            "title": "Interactive Installation",
            "level": 2
          },
          {
            "id": "manual-installation",
            "title": "Manual Installation",
            "level": 2
          },
          {
            "id": "install",
            "title": "Install",
            "level": 2
          },
          {
            "id": "import-styles",
            "title": "Import styles",
            "level": 2
          },
          {
            "id": "use-components",
            "title": "Use components",
            "level": 2
          },
          {
            "id": "troubleshooting",
            "title": "Troubleshooting",
            "level": 2
          },
          {
            "id": "styles-look-wrong-or-missing",
            "title": "Styles look wrong or missing",
            "level": 3
          },
          {
            "id": "postcss-error",
            "title": "PostCSS error",
            "level": 3
          },
          {
            "id": "styles-still-not-applying",
            "title": "Styles still not applying",
            "level": 3
          },
          {
            "id": "still-stuck",
            "title": "Still stuck?",
            "level": 3
          },
          {
            "id": "next-steps",
            "title": "Next steps",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 0,
        "publishedOn": "2026-01-10",
        "tags": [
          "installation",
          "setup",
          "tailwind"
        ]
      },
      {
        "domain": "docs",
        "slug": "customization-theming",
        "url": "/docs/customization-theming",
        "title": "Theming",
        "label": "Theming",
        "description": "How UI Lab's token system works — color families, shade ranges, dark mode inversion, and dynamic accent customization.",
        "section": "Customization",
        "toc": [
          {
            "id": "how-the-token-pipeline-works",
            "title": "How the token pipeline works",
            "level": 2
          },
          {
            "id": "color-families",
            "title": "Color families",
            "level": 2
          },
          {
            "id": "dark-mode-inversion",
            "title": "Dark mode inversion",
            "level": 2
          },
          {
            "id": "applying-tokens",
            "title": "Applying tokens",
            "level": 2
          },
          {
            "id": "tailwind-classes",
            "title": "Tailwind classes",
            "level": 3
          },
          {
            "id": "css-variables",
            "title": "CSS variables",
            "level": 3
          },
          {
            "id": "customizing-the-accent-color",
            "title": "Customizing the accent color",
            "level": 2
          },
          {
            "id": "common-mistakes",
            "title": "Common mistakes",
            "level": 2
          },
          {
            "id": "further-reading",
            "title": "Further reading",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 1,
        "publishedOn": "2026-02-25",
        "tags": [
          "theming",
          "tokens",
          "colors",
          "dark-mode",
          "css-variables"
        ]
      },
      {
        "domain": "docs",
        "slug": "guides-theme-switching",
        "url": "/docs/guides-theme-switching",
        "title": "Theme Switching",
        "label": "Theme Switching",
        "description": "Set up light/dark mode with UI Lab using the same CSS-first contract as factory-gen.site: app/theme.css, generateColorModeScript(), and useColorMode().",
        "section": "Guides",
        "toc": [
          {
            "id": "recommended-contract",
            "title": "Recommended contract",
            "level": 2
          },
          {
            "id": "1-import-tailwind-your-theme-and-ui-lab-styles",
            "title": "1. Import Tailwind, your theme, and UI Lab styles",
            "level": 2
          },
          {
            "id": "2-add-the-pre-hydration-theme-script-in-applayouttsx",
            "title": "2. Add the pre-hydration theme script in `app/layout.tsx`",
            "level": 2
          },
          {
            "id": "3-toggle-the-theme-from-a-client-component",
            "title": "3. Toggle the theme from a client component",
            "level": 2
          },
          {
            "id": "4-structure-appthemecss-like-factory-gensite",
            "title": "4. Structure `app/theme.css` like `factory-gen.site`",
            "level": 2
          },
          {
            "id": "when-to-use-themeprovider",
            "title": "When to use `ThemeProvider`",
            "level": 2
          },
          {
            "id": "what-changed-from-older-setup-examples",
            "title": "What changed from older setup examples",
            "level": 2
          },
          {
            "id": "further-reading",
            "title": "Further reading",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 2,
        "publishedOn": "2026-03-12",
        "tags": [
          "theme-switching",
          "dark-mode",
          "css",
          "tailwind",
          "next-js"
        ]
      },
      {
        "domain": "docs",
        "slug": "agents-mcps-installation",
        "url": "/docs/agents-mcps-installation",
        "title": "Overview",
        "label": "Overview",
        "description": "Install and configure the UI Lab MCP server for Claude and other AI agents.",
        "section": "Agents & MCPs",
        "toc": [
          {
            "id": "how-it-works",
            "title": "How it works",
            "level": 2
          },
          {
            "id": "prerequisites",
            "title": "Prerequisites",
            "level": 2
          },
          {
            "id": "quick-start-claude-desktop",
            "title": "Quick start: Claude Desktop",
            "level": 2
          },
          {
            "id": "quick-start-cursor",
            "title": "Quick start: Cursor",
            "level": 2
          },
          {
            "id": "quick-start-local-install",
            "title": "Quick start: Local install",
            "level": 2
          },
          {
            "id": "verifying-the-connection",
            "title": "Verifying the connection",
            "level": 2
          },
          {
            "id": "what-the-server-exposes",
            "title": "What the server exposes",
            "level": 2
          },
          {
            "id": "troubleshooting",
            "title": "Troubleshooting",
            "level": 2
          },
          {
            "id": "server-doesnt-start",
            "title": "Server doesn't start",
            "level": 3
          },
          {
            "id": "module-not-found-errors",
            "title": "\"Module not found\" errors",
            "level": 3
          },
          {
            "id": "claude-doesnt-call-any-tools",
            "title": "Claude doesn't call any tools",
            "level": 3
          },
          {
            "id": "npx-downloads-every-time",
            "title": "npx downloads every time",
            "level": 3
          },
          {
            "id": "running-from-source",
            "title": "Running from source",
            "level": 2
          },
          {
            "id": "next-steps",
            "title": "Next steps",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 3,
        "publishedOn": null,
        "tags": []
      },
      {
        "domain": "docs",
        "slug": "agents-mcps-workflows",
        "url": "/docs/agents-mcps-workflows",
        "title": "Workflows",
        "label": "Workflows",
        "description": "All 10 MCP tools, resource URIs, design guidelines, and example agent workflows for building UI with AI.",
        "section": "Agents & MCPs",
        "toc": [
          {
            "id": "tools-overview",
            "title": "Tools overview",
            "level": 2
          },
          {
            "id": "components",
            "title": "Components",
            "level": 2
          },
          {
            "id": "search_components",
            "title": "`search_components`",
            "level": 3
          },
          {
            "id": "get_component",
            "title": "`get_component`",
            "level": 3
          },
          {
            "id": "design-tokens",
            "title": "Design tokens",
            "level": 2
          },
          {
            "id": "get_semantic_color",
            "title": "`get_semantic_color`",
            "level": 3
          },
          {
            "id": "theme",
            "title": "Theme",
            "level": 2
          },
          {
            "id": "get_theme_setup",
            "title": "`get_theme_setup`",
            "level": 3
          },
          {
            "id": "patterns",
            "title": "Patterns",
            "level": 2
          },
          {
            "id": "search_patterns",
            "title": "`search_patterns`",
            "level": 3
          },
          {
            "id": "get_pattern",
            "title": "`get_pattern`",
            "level": 3
          },
          {
            "id": "elements",
            "title": "Elements",
            "level": 2
          },
          {
            "id": "search_elements",
            "title": "`search_elements`",
            "level": 3
          },
          {
            "id": "get_element",
            "title": "`get_element`",
            "level": 3
          },
          {
            "id": "sections",
            "title": "Sections",
            "level": 2
          },
          {
            "id": "search_sections",
            "title": "`search_sections`",
            "level": 3
          },
          {
            "id": "get_section",
            "title": "`get_section`",
            "level": 3
          },
          {
            "id": "resources",
            "title": "Resources",
            "level": 2
          },
          {
            "id": "design-guidelines-always-injected",
            "title": "Design guidelines (always injected)",
            "level": 2
          },
          {
            "id": "color-families",
            "title": "Color families",
            "level": 3
          },
          {
            "id": "shade-ranges",
            "title": "Shade ranges",
            "level": 3
          },
          {
            "id": "class-format",
            "title": "Class format",
            "level": 3
          },
          {
            "id": "common-mistakes-and-corrections",
            "title": "Common mistakes and corrections",
            "level": 3
          },
          {
            "id": "correct-examples",
            "title": "Correct examples",
            "level": 3
          },
          {
            "id": "typical-agent-workflows",
            "title": "Typical agent workflows",
            "level": 2
          },
          {
            "id": "workflow-1-build-a-component-from-scratch",
            "title": "Workflow 1: Build a component from scratch",
            "level": 3
          },
          {
            "id": "workflow-2-find-and-use-a-pattern",
            "title": "Workflow 2: Find and use a pattern",
            "level": 3
          },
          {
            "id": "workflow-3-set-up-theming",
            "title": "Workflow 3: Set up theming",
            "level": 3
          },
          {
            "id": "workflow-4-build-a-landing-page",
            "title": "Workflow 4: Build a landing page",
            "level": 3
          },
          {
            "id": "workflow-5-find-a-pre-built-ui-block",
            "title": "Workflow 5: Find a pre-built UI block",
            "level": 3
          },
          {
            "id": "next-steps",
            "title": "Next steps",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 1,
        "sectionOrder": 3,
        "publishedOn": null,
        "tags": []
      }
    ],
    "pageTree": [
      {
        "label": "Getting Started",
        "items": [
          {
            "id": "installation",
            "label": "Installation",
            "slug": "installation",
            "url": "/docs/installation"
          }
        ]
      },
      {
        "label": "Customization",
        "items": [
          {
            "id": "customization-theming",
            "label": "Theming",
            "slug": "customization-theming",
            "url": "/docs/customization-theming"
          }
        ]
      },
      {
        "label": "Guides",
        "items": [
          {
            "id": "guides-theme-switching",
            "label": "Theme Switching",
            "slug": "guides-theme-switching",
            "url": "/docs/guides-theme-switching"
          }
        ]
      },
      {
        "label": "Agents & MCPs",
        "items": [
          {
            "id": "agents-mcps-installation",
            "label": "Overview",
            "slug": "agents-mcps-installation",
            "url": "/docs/agents-mcps-installation"
          },
          {
            "id": "agents-mcps-workflows",
            "label": "Workflows",
            "slug": "agents-mcps-workflows",
            "url": "/docs/agents-mcps-workflows"
          }
        ]
      }
    ]
  },
  "design-system": {
    "pages": [
      {
        "domain": "design-system",
        "slug": "index",
        "url": "/design-system",
        "title": "Design System Overview",
        "label": "Design System Overview",
        "description": "Comprehensive guide to UI Lab's design system, foundation, tokens, and component guidelines",
        "section": null,
        "toc": [
          {
            "id": "design-system-overview",
            "title": "Design System Overview",
            "level": 2
          },
          {
            "id": "quick-start",
            "title": "Quick Start",
            "level": 3
          },
          {
            "id": "core-pillars",
            "title": "Core Pillars",
            "level": 2
          },
          {
            "id": "design-philosophy",
            "title": "Design Philosophy",
            "level": 2
          },
          {
            "id": "perceptual-uniformity",
            "title": "Perceptual Uniformity",
            "level": 3
          },
          {
            "id": "semantic-over-visual",
            "title": "Semantic Over Visual",
            "level": 3
          },
          {
            "id": "accessibility-first",
            "title": "Accessibility First",
            "level": 3
          },
          {
            "id": "rhythm-and-consistency",
            "title": "Rhythm and Consistency",
            "level": 3
          },
          {
            "id": "key-features",
            "title": "Key Features",
            "level": 2
          },
          {
            "id": "accessibility",
            "title": "Accessibility",
            "level": 2
          },
          {
            "id": "related-documentation",
            "title": "Related Documentation",
            "level": 2
          }
        ],
        "isIndex": true,
        "order": -1,
        "sectionOrder": 999,
        "publishedOn": "2026-12-15",
        "tags": [
          "design-system",
          "overview",
          "foundation"
        ]
      },
      {
        "domain": "design-system",
        "slug": "colors",
        "url": "/design-system/colors",
        "title": "Colors",
        "label": "Colors",
        "description": "Complete color palette documentation with OKLCH and HEX values for all semantic scales",
        "section": "Foundation",
        "toc": [
          {
            "id": "color-system",
            "title": "Color System",
            "level": 2
          },
          {
            "id": "quick-reference",
            "title": "Quick Reference",
            "level": 2
          },
          {
            "id": "understanding-oklch",
            "title": "Understanding OKLCH",
            "level": 2
          },
          {
            "id": "why-oklch",
            "title": "Why OKLCH?",
            "level": 3
          },
          {
            "id": "color-components",
            "title": "Color Components",
            "level": 3
          },
          {
            "id": "complete-color-palette",
            "title": "Complete Color Palette",
            "level": 2
          },
          {
            "id": "color-palette-families",
            "title": "Color Palette Families",
            "level": 2
          },
          {
            "id": "core-colors",
            "title": "Core Colors",
            "level": 3
          },
          {
            "id": "semantic-colors",
            "title": "Semantic Colors",
            "level": 3
          },
          {
            "id": "how-to-use-colors",
            "title": "How to Use Colors",
            "level": 2
          },
          {
            "id": "selecting-colors",
            "title": "Selecting Colors",
            "level": 3
          },
          {
            "id": "practical-examples",
            "title": "Practical Examples",
            "level": 3
          },
          {
            "id": "css-variables",
            "title": "CSS Variables",
            "level": 3
          },
          {
            "id": "accessibility",
            "title": "Accessibility",
            "level": 2
          },
          {
            "id": "contrast-ratios",
            "title": "Contrast Ratios",
            "level": 3
          },
          {
            "id": "best-practices",
            "title": "Best Practices",
            "level": 3
          },
          {
            "id": "testing-tools",
            "title": "Testing Tools",
            "level": 3
          },
          {
            "id": "dynamic-theming",
            "title": "Dynamic Theming",
            "level": 2
          },
          {
            "id": "browser-support",
            "title": "Browser Support",
            "level": 2
          },
          {
            "id": "further-reading",
            "title": "Further Reading",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 0,
        "publishedOn": "2026-12-15",
        "tags": [
          "colors",
          "design",
          "theming",
          "oklch"
        ]
      },
      {
        "domain": "design-system",
        "slug": "spacing",
        "url": "/design-system/spacing",
        "title": "Spacing",
        "label": "Spacing",
        "description": "Consistent spacing scale for creating visual rhythm and balanced layouts",
        "section": "Foundation",
        "toc": [
          {
            "id": "spacing-scale",
            "title": "Spacing Scale",
            "level": 2
          },
          {
            "id": "why-this-scale",
            "title": "Why This Scale?",
            "level": 2
          },
          {
            "id": "mathematical-foundation",
            "title": "Mathematical Foundation",
            "level": 3
          },
          {
            "id": "base-unit-4px",
            "title": "Base Unit (4px)",
            "level": 3
          },
          {
            "id": "spacing-categories",
            "title": "Spacing Categories",
            "level": 2
          },
          {
            "id": "padding-internal-spacing",
            "title": "Padding (Internal Spacing)",
            "level": 3
          },
          {
            "id": "component-padding",
            "title": "Component Padding",
            "level": 4
          },
          {
            "id": "margin-external-spacing",
            "title": "Margin (External Spacing)",
            "level": 3
          },
          {
            "id": "element-margins",
            "title": "Element Margins",
            "level": 4
          },
          {
            "id": "gap-gridflex-spacing",
            "title": "Gap (Grid/Flex Spacing)",
            "level": 3
          },
          {
            "id": "grid-gaps",
            "title": "Grid Gaps",
            "level": 4
          },
          {
            "id": "layout-patterns",
            "title": "Layout Patterns",
            "level": 2
          },
          {
            "id": "horizontal-spacing-inline",
            "title": "Horizontal Spacing (Inline)",
            "level": 3
          },
          {
            "id": "vertical-spacing-block",
            "title": "Vertical Spacing (Block)",
            "level": 3
          },
          {
            "id": "nested-spacing",
            "title": "Nested Spacing",
            "level": 3
          },
          {
            "id": "component-spacing-guidelines",
            "title": "Component Spacing Guidelines",
            "level": 2
          },
          {
            "id": "buttons",
            "title": "Buttons",
            "level": 3
          },
          {
            "id": "form-elements",
            "title": "Form Elements",
            "level": 3
          },
          {
            "id": "cards",
            "title": "Cards",
            "level": 3
          },
          {
            "id": "lists",
            "title": "Lists",
            "level": 3
          },
          {
            "id": "navigation",
            "title": "Navigation",
            "level": 3
          },
          {
            "id": "responsive-spacing",
            "title": "Responsive Spacing",
            "level": 2
          },
          {
            "id": "desktop-1024px",
            "title": "Desktop (1024px+)",
            "level": 3
          },
          {
            "id": "tablet-768px---1023px",
            "title": "Tablet (768px - 1023px)",
            "level": 3
          },
          {
            "id": "mobile-",
            "title": "Mobile (",
            "level": 3
          },
          {
            "id": "touch-target-sizing",
            "title": "Touch Target Sizing",
            "level": 2
          },
          {
            "id": "minimum-touch-target",
            "title": "Minimum Touch Target",
            "level": 3
          },
          {
            "id": "gap-between-touch-targets",
            "title": "Gap Between Touch Targets",
            "level": 3
          },
          {
            "id": "example-button-with-spacing",
            "title": "Example: Button with Spacing",
            "level": 3
          },
          {
            "id": "css-variable-usage",
            "title": "CSS Variable Usage",
            "level": 2
          },
          {
            "id": "practical-examples",
            "title": "Practical Examples",
            "level": 3
          },
          {
            "id": "tailwind-css-classes",
            "title": "Tailwind CSS Classes",
            "level": 3
          },
          {
            "id": "spacing-principles",
            "title": "Spacing Principles",
            "level": 2
          },
          {
            "id": "1-use-the-scale",
            "title": "1. Use the Scale",
            "level": 3
          },
          {
            "id": "2-create-visual-rhythm",
            "title": "2. Create Visual Rhythm",
            "level": 3
          },
          {
            "id": "3-respect-containment",
            "title": "3. Respect Containment",
            "level": 3
          },
          {
            "id": "4-consider-content",
            "title": "4. Consider Content",
            "level": 3
          },
          {
            "id": "5-test-readability",
            "title": "5. Test Readability",
            "level": 3
          },
          {
            "id": "common-mistakes",
            "title": "Common Mistakes",
            "level": 2
          },
          {
            "id": "using-arbitrary-values",
            "title": "Using Arbitrary Values",
            "level": 3
          },
          {
            "id": "inconsistent-spacing",
            "title": "Inconsistent Spacing",
            "level": 3
          },
          {
            "id": "over-spacing-content",
            "title": "Over-Spacing Content",
            "level": 3
          },
          {
            "id": "spacing-in-different-contexts",
            "title": "Spacing in Different Contexts",
            "level": 2
          },
          {
            "id": "marketinglanding-pages",
            "title": "Marketing/Landing Pages",
            "level": 3
          },
          {
            "id": "data-heavy-interfaces",
            "title": "Data-Heavy Interfaces",
            "level": 3
          },
          {
            "id": "mobile-apps",
            "title": "Mobile Apps",
            "level": 3
          },
          {
            "id": "editorial-content",
            "title": "Editorial Content",
            "level": 3
          },
          {
            "id": "accessibility-considerations",
            "title": "Accessibility Considerations",
            "level": 2
          },
          {
            "id": "touch-target-spacing",
            "title": "Touch Target Spacing",
            "level": 3
          },
          {
            "id": "visual-spacing-for-clarity",
            "title": "Visual Spacing for Clarity",
            "level": 3
          },
          {
            "id": "motor-control",
            "title": "Motor Control",
            "level": 3
          },
          {
            "id": "integration-with-other-design-tokens",
            "title": "Integration with Other Design Tokens",
            "level": 2
          },
          {
            "id": "with-colors",
            "title": "With Colors",
            "level": 3
          },
          {
            "id": "with-typography",
            "title": "With Typography",
            "level": 3
          },
          {
            "id": "with-shadowselevation",
            "title": "With Shadows/Elevation",
            "level": 3
          },
          {
            "id": "further-reading",
            "title": "Further Reading",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 1,
        "sectionOrder": 0,
        "publishedOn": "2026-12-15",
        "tags": [
          "spacing",
          "layout",
          "scale"
        ]
      },
      {
        "domain": "design-system",
        "slug": "typography",
        "url": "/design-system/typography",
        "title": "Typography",
        "label": "Typography",
        "description": "Font families, type scale, and text styles for consistent, readable interfaces",
        "section": "Foundation",
        "toc": [
          {
            "id": "font-families",
            "title": "Font Families",
            "level": 2
          },
          {
            "id": "type-scale",
            "title": "Type Scale",
            "level": 2
          },
          {
            "id": "font-sizes",
            "title": "Font Sizes",
            "level": 3
          },
          {
            "id": "font-weights",
            "title": "Font Weights",
            "level": 2
          },
          {
            "id": "weight-usage-guidelines",
            "title": "Weight Usage Guidelines",
            "level": 3
          },
          {
            "id": "line-heights",
            "title": "Line Heights",
            "level": 2
          },
          {
            "id": "line-height-guidelines",
            "title": "Line Height Guidelines",
            "level": 3
          },
          {
            "id": "text-styles",
            "title": "Text Styles",
            "level": 2
          },
          {
            "id": "heading-styles",
            "title": "Heading Styles",
            "level": 3
          },
          {
            "id": "heading-1-h1",
            "title": "Heading 1 (h1)",
            "level": 4
          },
          {
            "id": "heading-2-h2",
            "title": "Heading 2 (h2)",
            "level": 4
          },
          {
            "id": "heading-3-h3",
            "title": "Heading 3 (h3)",
            "level": 4
          },
          {
            "id": "heading-4-h4",
            "title": "Heading 4 (h4)",
            "level": 4
          },
          {
            "id": "body-styles",
            "title": "Body Styles",
            "level": 3
          },
          {
            "id": "body-large",
            "title": "Body Large",
            "level": 4
          },
          {
            "id": "body-default",
            "title": "Body (Default)",
            "level": 4
          },
          {
            "id": "body-small",
            "title": "Body Small",
            "level": 4
          },
          {
            "id": "ui-styles",
            "title": "UI Styles",
            "level": 3
          },
          {
            "id": "label",
            "title": "Label",
            "level": 4
          },
          {
            "id": "caption",
            "title": "Caption",
            "level": 4
          },
          {
            "id": "code",
            "title": "Code",
            "level": 4
          },
          {
            "id": "usage",
            "title": "Usage",
            "level": 2
          },
          {
            "id": "css-variable-usage",
            "title": "CSS Variable Usage",
            "level": 2
          },
          {
            "id": "tailwind-css-classes",
            "title": "Tailwind CSS Classes",
            "level": 3
          },
          {
            "id": "accessibility",
            "title": "Accessibility",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 2,
        "sectionOrder": 0,
        "publishedOn": "2026-12-15",
        "tags": [
          "typography",
          "fonts",
          "text-styles"
        ]
      },
      {
        "domain": "design-system",
        "slug": "tokens",
        "url": "/design-system/tokens",
        "title": "Design Tokens",
        "label": "Design Tokens",
        "description": "Complete reference of design tokens including colors, typography, spacing, and more",
        "section": "Systems",
        "toc": [
          {
            "id": "token-categories",
            "title": "Token Categories",
            "level": 2
          },
          {
            "id": "color-tokens",
            "title": "Color Tokens",
            "level": 2
          },
          {
            "id": "shade-selection-guide",
            "title": "Shade Selection Guide",
            "level": 3
          },
          {
            "id": "typography-tokens",
            "title": "Typography Tokens",
            "level": 2
          },
          {
            "id": "font-size-tokens",
            "title": "Font Size Tokens",
            "level": 3
          },
          {
            "id": "font-weight-tokens",
            "title": "Font Weight Tokens",
            "level": 3
          },
          {
            "id": "line-height-tokens",
            "title": "Line Height Tokens",
            "level": 3
          },
          {
            "id": "complete-text-style-tokens",
            "title": "Complete Text Style Tokens",
            "level": 3
          },
          {
            "id": "spacing-tokens",
            "title": "Spacing Tokens",
            "level": 2
          },
          {
            "id": "border-radius-tokens",
            "title": "Border Radius Tokens",
            "level": 2
          },
          {
            "id": "shadowelevation-tokens",
            "title": "Shadow/Elevation Tokens",
            "level": 2
          },
          {
            "id": "motionanimation-tokens",
            "title": "Motion/Animation Tokens",
            "level": 2
          },
          {
            "id": "duration-tokens",
            "title": "Duration Tokens",
            "level": 3
          },
          {
            "id": "easing-tokens",
            "title": "Easing Tokens",
            "level": 3
          },
          {
            "id": "using-tokens",
            "title": "Using Tokens",
            "level": 2
          },
          {
            "id": "naming-conventions",
            "title": "Naming Conventions",
            "level": 2
          },
          {
            "id": "color-tokens-2",
            "title": "Color Tokens",
            "level": 3
          },
          {
            "id": "typography-tokens-2",
            "title": "Typography Tokens",
            "level": 3
          },
          {
            "id": "spacing-tokens-2",
            "title": "Spacing Tokens",
            "level": 3
          },
          {
            "id": "other-tokens",
            "title": "Other Tokens",
            "level": 3
          },
          {
            "id": "semantic-vs-descriptive",
            "title": "Semantic vs. Descriptive",
            "level": 2
          },
          {
            "id": "semantic-naming-preferred",
            "title": "Semantic Naming (Preferred)",
            "level": 3
          },
          {
            "id": "descriptive-naming-avoid",
            "title": "Descriptive Naming (Avoid)",
            "level": 3
          },
          {
            "id": "token-inheritance-composition",
            "title": "Token Inheritance & Composition",
            "level": 2
          },
          {
            "id": "single-value-tokens",
            "title": "Single Value Tokens",
            "level": 3
          },
          {
            "id": "composite-tokens",
            "title": "Composite Tokens",
            "level": 3
          },
          {
            "id": "token-combinations",
            "title": "Token Combinations",
            "level": 3
          },
          {
            "id": "accessibility-considerations",
            "title": "Accessibility Considerations",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 1,
        "publishedOn": "2026-12-15",
        "tags": [
          "tokens",
          "design-tokens",
          "reference"
        ]
      },
      {
        "domain": "design-system",
        "slug": "variables",
        "url": "/design-system/variables",
        "title": "CSS Variables",
        "label": "CSS Variables",
        "description": "Complete reference for CSS custom properties implementing design tokens",
        "section": "Systems",
        "toc": [
          {
            "id": "what-are-css-variables",
            "title": "What Are CSS Variables?",
            "level": 2
          },
          {
            "id": "syntax",
            "title": "Syntax",
            "level": 3
          },
          {
            "id": "variable-naming-convention",
            "title": "Variable Naming Convention",
            "level": 2
          },
          {
            "id": "examples",
            "title": "Examples",
            "level": 3
          },
          {
            "id": "color-variables",
            "title": "Color Variables",
            "level": 2
          },
          {
            "id": "background-colors",
            "title": "Background Colors",
            "level": 3
          },
          {
            "id": "foreground-colors",
            "title": "Foreground Colors",
            "level": 3
          },
          {
            "id": "accent-colors",
            "title": "Accent Colors",
            "level": 3
          },
          {
            "id": "semantic-colors",
            "title": "Semantic Colors",
            "level": 3
          },
          {
            "id": "typography-variables",
            "title": "Typography Variables",
            "level": 2
          },
          {
            "id": "font-family",
            "title": "Font Family",
            "level": 3
          },
          {
            "id": "font-sizes",
            "title": "Font Sizes",
            "level": 3
          },
          {
            "id": "font-weights",
            "title": "Font Weights",
            "level": 3
          },
          {
            "id": "line-heights",
            "title": "Line Heights",
            "level": 3
          },
          {
            "id": "complete-text-styles",
            "title": "Complete Text Styles",
            "level": 3
          },
          {
            "id": "spacing-variables",
            "title": "Spacing Variables",
            "level": 2
          },
          {
            "id": "border-radius-variables",
            "title": "Border Radius Variables",
            "level": 2
          },
          {
            "id": "shadow-variables",
            "title": "Shadow Variables",
            "level": 2
          },
          {
            "id": "motion-variables",
            "title": "Motion Variables",
            "level": 2
          },
          {
            "id": "duration",
            "title": "Duration",
            "level": 3
          },
          {
            "id": "easing",
            "title": "Easing",
            "level": 3
          },
          {
            "id": "practical-examples",
            "title": "Practical Examples",
            "level": 2
          },
          {
            "id": "button-component",
            "title": "Button Component",
            "level": 3
          },
          {
            "id": "form-element",
            "title": "Form Element",
            "level": 3
          },
          {
            "id": "card-component",
            "title": "Card Component",
            "level": 3
          },
          {
            "id": "alert-component",
            "title": "Alert Component",
            "level": 3
          },
          {
            "id": "theme-switching",
            "title": "Theme Switching",
            "level": 2
          },
          {
            "id": "browser-support",
            "title": "Browser Support",
            "level": 2
          },
          {
            "id": "fallback-values",
            "title": "Fallback Values",
            "level": 3
          },
          {
            "id": "performance-considerations",
            "title": "Performance Considerations",
            "level": 2
          },
          {
            "id": "advantages",
            "title": "Advantages",
            "level": 3
          },
          {
            "id": "best-practices",
            "title": "Best Practices",
            "level": 3
          },
          {
            "id": "debugging",
            "title": "Debugging",
            "level": 2
          },
          {
            "id": "inspecting-variables",
            "title": "Inspecting Variables",
            "level": 3
          },
          {
            "id": "common-issues",
            "title": "Common Issues",
            "level": 3
          },
          {
            "id": "migration-guide",
            "title": "Migration Guide",
            "level": 2
          },
          {
            "id": "from-hardcoded-values",
            "title": "From Hardcoded Values",
            "level": 3
          },
          {
            "id": "further-resources",
            "title": "Further Resources",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 1,
        "sectionOrder": 1,
        "publishedOn": "2026-12-15",
        "tags": [
          "css-variables",
          "custom-properties",
          "implementation"
        ]
      },
      {
        "domain": "design-system",
        "slug": "accessibility",
        "url": "/design-system/accessibility",
        "title": "Accessibility",
        "label": "Accessibility",
        "description": "WCAG compliance guidelines and inclusive design practices for UI Lab",
        "section": "Guidelines",
        "toc": [
          {
            "id": "what-is-accessibility",
            "title": "What is Accessibility?",
            "level": 2
          },
          {
            "id": "wcag-compliance",
            "title": "WCAG Compliance",
            "level": 2
          },
          {
            "id": "compliance-levels",
            "title": "Compliance Levels",
            "level": 3
          },
          {
            "id": "color-contrast",
            "title": "Color Contrast",
            "level": 2
          },
          {
            "id": "contrast-ratios",
            "title": "Contrast Ratios",
            "level": 3
          },
          {
            "id": "implementation",
            "title": "Implementation",
            "level": 3
          },
          {
            "id": "color-alone",
            "title": "Color Alone",
            "level": 3
          },
          {
            "id": "testing-tools",
            "title": "Testing Tools",
            "level": 3
          },
          {
            "id": "keyboard-navigation",
            "title": "Keyboard Navigation",
            "level": 2
          },
          {
            "id": "essential-keys",
            "title": "Essential Keys",
            "level": 3
          },
          {
            "id": "implementation-2",
            "title": "Implementation",
            "level": 3
          },
          {
            "id": "focus-management",
            "title": "Focus Management",
            "level": 3
          },
          {
            "id": "focus-indicators",
            "title": "Focus Indicators",
            "level": 3
          },
          {
            "id": "screen-readers",
            "title": "Screen Readers",
            "level": 2
          },
          {
            "id": "semantic-html",
            "title": "Semantic HTML",
            "level": 3
          },
          {
            "id": "aria-attributes",
            "title": "ARIA Attributes",
            "level": 3
          },
          {
            "id": "testing-with-screen-readers",
            "title": "Testing with Screen Readers",
            "level": 3
          },
          {
            "id": "forms-labels",
            "title": "Forms & Labels",
            "level": 2
          },
          {
            "id": "labels",
            "title": "Labels",
            "level": 3
          },
          {
            "id": "help-text",
            "title": "Help Text",
            "level": 3
          },
          {
            "id": "error-handling",
            "title": "Error Handling",
            "level": 3
          },
          {
            "id": "required-fields",
            "title": "Required Fields",
            "level": 3
          },
          {
            "id": "text-typography",
            "title": "Text & Typography",
            "level": 2
          },
          {
            "id": "font-size",
            "title": "Font Size",
            "level": 3
          },
          {
            "id": "line-height",
            "title": "Line Height",
            "level": 3
          },
          {
            "id": "letter-spacing",
            "title": "Letter Spacing",
            "level": 3
          },
          {
            "id": "text-alignment",
            "title": "Text Alignment",
            "level": 3
          },
          {
            "id": "caps-lock",
            "title": "Caps Lock",
            "level": 3
          },
          {
            "id": "motion-animation",
            "title": "Motion & Animation",
            "level": 2
          },
          {
            "id": "reduced-motion",
            "title": "Reduced Motion",
            "level": 3
          },
          {
            "id": "react-implementation",
            "title": "React Implementation",
            "level": 3
          },
          {
            "id": "guidelines",
            "title": "Guidelines",
            "level": 3
          },
          {
            "id": "images-media",
            "title": "Images & Media",
            "level": 2
          },
          {
            "id": "alt-text",
            "title": "Alt Text",
            "level": 3
          },
          {
            "id": "video-audio",
            "title": "Video & Audio",
            "level": 3
          },
          {
            "id": "links-navigation",
            "title": "Links & Navigation",
            "level": 2
          },
          {
            "id": "link-text",
            "title": "Link Text",
            "level": 3
          },
          {
            "id": "focus-indicators-2",
            "title": "Focus Indicators",
            "level": 3
          },
          {
            "id": "skip-links",
            "title": "Skip Links",
            "level": 3
          },
          {
            "id": "headings-structure",
            "title": "Headings & Structure",
            "level": 2
          },
          {
            "id": "heading-hierarchy",
            "title": "Heading Hierarchy",
            "level": 3
          },
          {
            "id": "heading-tags",
            "title": "Heading Tags",
            "level": 3
          },
          {
            "id": "color-blindness",
            "title": "Color Blindness",
            "level": 2
          },
          {
            "id": "types-of-color-blindness",
            "title": "Types of Color Blindness",
            "level": 3
          },
          {
            "id": "implementation-3",
            "title": "Implementation",
            "level": 3
          },
          {
            "id": "testing-tools-2",
            "title": "Testing Tools",
            "level": 3
          },
          {
            "id": "touch-motor-accessibility",
            "title": "Touch & Motor Accessibility",
            "level": 2
          },
          {
            "id": "touch-target-size",
            "title": "Touch Target Size",
            "level": 3
          },
          {
            "id": "implementation-4",
            "title": "Implementation",
            "level": 3
          },
          {
            "id": "hover-targets",
            "title": "Hover Targets",
            "level": 3
          },
          {
            "id": "testing-for-accessibility",
            "title": "Testing for Accessibility",
            "level": 2
          },
          {
            "id": "automated-testing",
            "title": "Automated Testing",
            "level": 3
          },
          {
            "id": "manual-testing",
            "title": "Manual Testing",
            "level": 3
          },
          {
            "id": "testing-checklist",
            "title": "Testing Checklist",
            "level": 3
          },
          {
            "id": "common-accessibility-patterns",
            "title": "Common Accessibility Patterns",
            "level": 2
          },
          {
            "id": "form-group",
            "title": "Form Group",
            "level": 3
          },
          {
            "id": "error-message",
            "title": "Error Message",
            "level": 3
          },
          {
            "id": "icon-button",
            "title": "Icon Button",
            "level": 3
          },
          {
            "id": "dropdown-menu",
            "title": "Dropdown Menu",
            "level": 3
          },
          {
            "id": "accessibility-resources",
            "title": "Accessibility Resources",
            "level": 2
          },
          {
            "id": "learning",
            "title": "Learning",
            "level": 3
          },
          {
            "id": "tools",
            "title": "Tools",
            "level": 3
          },
          {
            "id": "checklists",
            "title": "Checklists",
            "level": 3
          },
          {
            "id": "continuous-improvement",
            "title": "Continuous Improvement",
            "level": 2
          },
          {
            "id": "summary",
            "title": "Summary",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 0,
        "sectionOrder": 2,
        "publishedOn": "2026-12-15",
        "tags": [
          "accessibility",
          "wcag",
          "inclusive-design",
          "a11y"
        ]
      },
      {
        "domain": "design-system",
        "slug": "components-guidelines",
        "url": "/design-system/components-guidelines",
        "title": "Components",
        "label": "Components",
        "description": "Patterns, usage rules, and best practices for UI Lab components",
        "section": "Guidelines",
        "toc": [
          {
            "id": "component-philosophy",
            "title": "Component Philosophy",
            "level": 2
          },
          {
            "id": "when-to-create-components",
            "title": "When to Create Components",
            "level": 3
          },
          {
            "id": "when-not-to-create-components",
            "title": "When NOT to Create Components",
            "level": 3
          },
          {
            "id": "component-structure",
            "title": "Component Structure",
            "level": 2
          },
          {
            "id": "template",
            "title": "Template",
            "level": 3
          },
          {
            "id": "guidelines",
            "title": "Guidelines",
            "level": 3
          },
          {
            "id": "button-component",
            "title": "Button Component",
            "level": 2
          },
          {
            "id": "purpose",
            "title": "Purpose",
            "level": 3
          },
          {
            "id": "when-to-use",
            "title": "When to Use",
            "level": 3
          },
          {
            "id": "variants",
            "title": "Variants",
            "level": 3
          },
          {
            "id": "sizes",
            "title": "Sizes",
            "level": 3
          },
          {
            "id": "states",
            "title": "States",
            "level": 3
          },
          {
            "id": "props",
            "title": "Props",
            "level": 3
          },
          {
            "id": "usage-examples",
            "title": "Usage Examples",
            "level": 3
          },
          {
            "id": "accessibility",
            "title": "Accessibility",
            "level": 3
          },
          {
            "id": "common-mistakes",
            "title": "Common Mistakes",
            "level": 3
          },
          {
            "id": "input-component",
            "title": "Input Component",
            "level": 2
          },
          {
            "id": "purpose-2",
            "title": "Purpose",
            "level": 3
          },
          {
            "id": "types",
            "title": "Types",
            "level": 3
          },
          {
            "id": "states-2",
            "title": "States",
            "level": 3
          },
          {
            "id": "sizing",
            "title": "Sizing",
            "level": 3
          },
          {
            "id": "props-2",
            "title": "Props",
            "level": 3
          },
          {
            "id": "usage-examples-2",
            "title": "Usage Examples",
            "level": 3
          },
          {
            "id": "validation",
            "title": "Validation",
            "level": 3
          },
          {
            "id": "accessibility-2",
            "title": "Accessibility",
            "level": 3
          },
          {
            "id": "select-component",
            "title": "Select Component",
            "level": 2
          },
          {
            "id": "purpose-3",
            "title": "Purpose",
            "level": 3
          },
          {
            "id": "when-to-use-2",
            "title": "When to Use",
            "level": 3
          },
          {
            "id": "when-not-to-use",
            "title": "When NOT to Use",
            "level": 3
          },
          {
            "id": "states-3",
            "title": "States",
            "level": 3
          },
          {
            "id": "props-3",
            "title": "Props",
            "level": 3
          },
          {
            "id": "usage-examples-3",
            "title": "Usage Examples",
            "level": 3
          },
          {
            "id": "accessibility-3",
            "title": "Accessibility",
            "level": 3
          },
          {
            "id": "card-component",
            "title": "Card Component",
            "level": 2
          },
          {
            "id": "purpose-4",
            "title": "Purpose",
            "level": 3
          },
          {
            "id": "when-to-use-3",
            "title": "When to Use",
            "level": 3
          },
          {
            "id": "variants-2",
            "title": "Variants",
            "level": 3
          },
          {
            "id": "props-4",
            "title": "Props",
            "level": 3
          },
          {
            "id": "usage-examples-4",
            "title": "Usage Examples",
            "level": 3
          },
          {
            "id": "form-guidelines",
            "title": "Form Guidelines",
            "level": 2
          },
          {
            "id": "structure",
            "title": "Structure",
            "level": 3
          },
          {
            "id": "best-practices",
            "title": "Best Practices",
            "level": 3
          },
          {
            "id": "responsive-components",
            "title": "Responsive Components",
            "level": 2
          },
          {
            "id": "breakpoints",
            "title": "Breakpoints",
            "level": 3
          },
          {
            "id": "responsive-guidelines",
            "title": "Responsive Guidelines",
            "level": 3
          },
          {
            "id": "dark-mode-support",
            "title": "Dark Mode Support",
            "level": 2
          },
          {
            "id": "performance-considerations",
            "title": "Performance Considerations",
            "level": 2
          },
          {
            "id": "optimization-tips",
            "title": "Optimization Tips",
            "level": 3
          },
          {
            "id": "testing-components",
            "title": "Testing Components",
            "level": 2
          },
          {
            "id": "unit-tests",
            "title": "Unit Tests",
            "level": 3
          },
          {
            "id": "accessibility-tests",
            "title": "Accessibility Tests",
            "level": 3
          },
          {
            "id": "visual-tests",
            "title": "Visual Tests",
            "level": 3
          },
          {
            "id": "common-patterns",
            "title": "Common Patterns",
            "level": 2
          },
          {
            "id": "loading-state-pattern",
            "title": "Loading State Pattern",
            "level": 3
          },
          {
            "id": "error-state-pattern",
            "title": "Error State Pattern",
            "level": 3
          },
          {
            "id": "confirmation-pattern",
            "title": "Confirmation Pattern",
            "level": 3
          },
          {
            "id": "disabled-state-pattern",
            "title": "Disabled State Pattern",
            "level": 3
          },
          {
            "id": "customization",
            "title": "Customization",
            "level": 2
          },
          {
            "id": "when-to-customize",
            "title": "When to Customize",
            "level": 3
          },
          {
            "id": "when-not-to-customize",
            "title": "When NOT to Customize",
            "level": 3
          },
          {
            "id": "contributing-new-components",
            "title": "Contributing New Components",
            "level": 2
          },
          {
            "id": "further-resources",
            "title": "Further Resources",
            "level": 2
          }
        ],
        "isIndex": false,
        "order": 1,
        "sectionOrder": 2,
        "publishedOn": "2026-12-15",
        "tags": [
          "components",
          "guidelines",
          "patterns"
        ]
      }
    ],
    "pageTree": [
      {
        "label": "Foundation",
        "items": [
          {
            "id": "colors",
            "label": "Colors",
            "slug": "colors",
            "url": "/design-system/colors"
          },
          {
            "id": "spacing",
            "label": "Spacing",
            "slug": "spacing",
            "url": "/design-system/spacing"
          },
          {
            "id": "typography",
            "label": "Typography",
            "slug": "typography",
            "url": "/design-system/typography"
          }
        ]
      },
      {
        "label": "Systems",
        "items": [
          {
            "id": "tokens",
            "label": "Design Tokens",
            "slug": "tokens",
            "url": "/design-system/tokens"
          },
          {
            "id": "variables",
            "label": "CSS Variables",
            "slug": "variables",
            "url": "/design-system/variables"
          }
        ]
      },
      {
        "label": "Guidelines",
        "items": [
          {
            "id": "accessibility",
            "label": "Accessibility",
            "slug": "accessibility",
            "url": "/design-system/accessibility"
          },
          {
            "id": "components-guidelines",
            "label": "Components",
            "slug": "components-guidelines",
            "url": "/design-system/components-guidelines"
          }
        ]
      }
    ]
  }
};
