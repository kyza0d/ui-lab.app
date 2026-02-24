// This file is auto-generated. Do not edit manually.
// To regenerate, run: npm run generate:docs

interface SidebarItem {
  id: string;
  label: string;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

interface FileMetadata {
  title: string;
  description: string;
  slug: string;
  category: string | null;
}

interface DomainRegistry {
  sections: SidebarSection[];
  fileMap: Record<string, FileMetadata>;
  navSectionMap: Record<string, string[]> | null;
}

export interface SidebarRegistry {
  docs: DomainRegistry;
  'design-system': DomainRegistry;
}

export const SIDEBAR_REGISTRY: SidebarRegistry = {
  docs: {
    sections: [
      {
            "label": "Getting Started",
            "items": [
                  {
                        "id": "installation",
                        "label": "Installation"
                  }
            ]
      },
      {
            "label": "Customization",
            "items": [
                  {
                        "id": "customization-theming",
                        "label": "Theming"
                  }
            ]
      },
      {
            "label": "Agents & MCPs",
            "items": [
                  {
                        "id": "agents-mcps-installation",
                        "label": "Overview"
                  },
                  {
                        "id": "agents-mcps-workflows",
                        "label": "Workflows"
                  }
            ]
      }
],
    fileMap: {
      "agents-mcps-installation": {
            "title": "Overview",
            "description": "Install and configure the UI Lab MCP server for Claude and other AI agents.",
            "slug": "agents-mcps-installation",
            "category": "Agents & MCPs"
      },
      "agents-mcps-workflows": {
            "title": "Workflows",
            "description": "All 10 MCP tools, resource URIs, design guidelines, and example agent workflows for building UI with AI.",
            "slug": "agents-mcps-workflows",
            "category": "Agents & MCPs"
      },
      "customization-theming": {
            "title": "Theming",
            "description": "Customize UI Lab components with custom themes",
            "slug": "customization-theming",
            "category": "Customization"
      },
      "installation": {
            "title": "Installation",
            "description": "Add UI Lab to any Tailwind v4 project in under one minute.",
            "slug": "installation",
            "category": "Getting Started"
      }
},
    navSectionMap: {
      "installation": [
            "Getting Started"
      ],
      "customization-theming": [
            "Customization"
      ],
      "agents-mcps-installation": [
            "Agents & MCPs"
      ],
      "agents-mcps-workflows": [
            "Agents & MCPs"
      ]
},
  },
  'design-system': {
    sections: [
      {
            "label": "Foundation",
            "items": [
                  {
                        "id": "colors",
                        "label": "Colors"
                  },
                  {
                        "id": "spacing",
                        "label": "Spacing"
                  },
                  {
                        "id": "typography",
                        "label": "Typography"
                  }
            ]
      },
      {
            "label": "Systems",
            "items": [
                  {
                        "id": "tokens",
                        "label": "Design Tokens"
                  },
                  {
                        "id": "variables",
                        "label": "CSS Variables"
                  }
            ]
      },
      {
            "label": "Guidelines",
            "items": [
                  {
                        "id": "accessibility",
                        "label": "Accessibility"
                  },
                  {
                        "id": "components-guidelines",
                        "label": "Components"
                  }
            ]
      }
],
    fileMap: {
      "accessibility": {
            "title": "Accessibility",
            "description": "WCAG compliance guidelines and inclusive design practices for UI Lab",
            "slug": "accessibility",
            "category": "Guidelines"
      },
      "colors": {
            "title": "Colors",
            "description": "Complete color palette documentation with OKLCH and HEX values for all semantic scales",
            "slug": "colors",
            "category": "Foundation"
      },
      "components-guidelines": {
            "title": "Components",
            "description": "Patterns, usage rules, and best practices for UI Lab components",
            "slug": "components-guidelines",
            "category": "Guidelines"
      },
      "spacing": {
            "title": "Spacing",
            "description": "Consistent spacing scale for creating visual rhythm and balanced layouts",
            "slug": "spacing",
            "category": "Foundation"
      },
      "tokens": {
            "title": "Design Tokens",
            "description": "Complete reference of design tokens including colors, typography, spacing, and more",
            "slug": "tokens",
            "category": "Systems"
      },
      "typography": {
            "title": "Typography",
            "description": "Font families, type scale, and text styles for consistent, readable interfaces",
            "slug": "typography",
            "category": "Foundation"
      },
      "variables": {
            "title": "CSS Variables",
            "description": "Complete reference for CSS custom properties implementing design tokens",
            "slug": "variables",
            "category": "Systems"
      }
},
    navSectionMap: null,
  },
};
