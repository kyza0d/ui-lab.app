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
  'agents-mcps': DomainRegistry;
  cli: DomainRegistry;
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
            "label": "Development",
            "items": [
                  {
                        "id": "best-practices",
                        "label": "Best Practices"
                  },
                  {
                        "id": "cli-guide",
                        "label": "CLI Guide"
                  },
                  {
                        "id": "styling",
                        "label": "Customization"
                  }
            ]
      },
      {
            "label": "How-To",
            "items": [
                  {
                        "id": "dark-mode",
                        "label": "Dark Mode Setup"
                  }
            ]
      }
],
    fileMap: {
      "best-practices": {
            "title": "Best Practices",
            "description": "Learn how to effectively use and develop with UI Lab components following proven patterns and conventions.",
            "slug": "best-practices",
            "category": "Development"
      },
      "cli-guide": {
            "title": "CLI Guide",
            "description": "Complete reference for the ui-lab command-line tool for initializing projects and installing components.",
            "slug": "cli-guide",
            "category": "Development"
      },
      "dark-mode": {
            "title": "Dark Mode Setup",
            "description": "Implement dark mode support using CSS variables and system preferences.",
            "slug": "dark-mode",
            "category": "How-To"
      },
      "installation": {
            "title": "Installation",
            "description": "Add UI Lab to any Tailwind v4 project in under one minute.",
            "slug": "installation",
            "category": "Getting Started"
      },
      "styling": {
            "title": "Customization",
            "description": "Understanding the CSS variable system, CSS Modules pattern, and how to customize component styling.",
            "slug": "styling",
            "category": "Development"
      }
},
    navSectionMap: null,
  },
  'agents-mcps': {
    sections: [
      {
            "label": "Getting Started",
            "items": [
                  {
                        "id": "getting-started-core-concepts",
                        "label": "Core Concepts"
                  },
                  {
                        "id": "getting-started-installation",
                        "label": "Installation"
                  },
                  {
                        "id": "getting-started-introduction",
                        "label": "Agents & MCPs"
                  },
                  {
                        "id": "getting-started-quick-start",
                        "label": "Quick Start"
                  }
            ]
      },
      {
            "label": "Building Workflows",
            "items": [
                  {
                        "id": "building-workflows-designing-ai-workflows",
                        "label": "Designing AI Workflows"
                  },
                  {
                        "id": "building-workflows-examples-use-cases",
                        "label": "Examples & Use Cases"
                  },
                  {
                        "id": "building-workflows-prompting-strategies",
                        "label": "Prompting Strategies"
                  },
                  {
                        "id": "building-workflows-state-management",
                        "label": "State Management"
                  }
            ]
      },
      {
            "label": "Technical Reference",
            "items": [
                  {
                        "id": "technical-reference-api-reference",
                        "label": "API Reference"
                  },
                  {
                        "id": "technical-reference-custom-mcps",
                        "label": "Custom MCPs"
                  },
                  {
                        "id": "technical-reference-integrations",
                        "label": "Integrations"
                  },
                  {
                        "id": "technical-reference-mcps-overview",
                        "label": "MCPs Overview"
                  }
            ]
      }
],
    fileMap: {
      "agents-and-mcps": {
            "title": "Agents & MCPs",
            "description": "Understanding Agents and MCPs",
            "slug": "agents-and-mcps",
            "category": null
      },
      "api-reference": {
            "title": "API Reference",
            "description": "API reference documentation",
            "slug": "api-reference",
            "category": null
      },
      "building-workflows-designing-ai-workflows": {
            "title": "Designing AI Workflows",
            "description": "Learn how to architect effective AI workflows",
            "slug": "building-workflows-designing-ai-workflows",
            "category": null
      },
      "building-workflows-examples-use-cases": {
            "title": "Examples & Use Cases",
            "description": "Real-world examples and use cases for AI agents",
            "slug": "building-workflows-examples-use-cases",
            "category": null
      },
      "building-workflows-prompting-strategies": {
            "title": "Prompting Strategies",
            "description": "Master effective prompting techniques for AI agents",
            "slug": "building-workflows-prompting-strategies",
            "category": null
      },
      "building-workflows-state-management": {
            "title": "State Management",
            "description": "Manage agent and workflow state effectively",
            "slug": "building-workflows-state-management",
            "category": null
      },
      "building-workflows": {
            "title": "Building Workflows",
            "description": "Build workflows with Agents & MCPs",
            "slug": "building-workflows",
            "category": null
      },
      "core-concepts": {
            "title": "Core Concepts",
            "description": "Learn the core concepts",
            "slug": "core-concepts",
            "category": null
      },
      "custom-mcps": {
            "title": "Custom MCPs",
            "description": "Building custom MCPs",
            "slug": "custom-mcps",
            "category": null
      },
      "designing-ai-workflows": {
            "title": "Designing AI Workflows",
            "description": "Design effective AI workflows",
            "slug": "designing-ai-workflows",
            "category": null
      },
      "examples-and-use-cases": {
            "title": "Examples & Use Cases",
            "description": "Examples and use cases",
            "slug": "examples-and-use-cases",
            "category": null
      },
      "getting-started-core-concepts": {
            "title": "Core Concepts",
            "description": "Understand the fundamental concepts of agents and MCPs",
            "slug": "getting-started-core-concepts",
            "category": null
      },
      "getting-started-installation": {
            "title": "Installation",
            "description": "Set up Agents & MCPs in your project",
            "slug": "getting-started-installation",
            "category": null
      },
      "getting-started-introduction": {
            "title": "Agents & MCPs",
            "description": "Learn about AI agents and Model Context Protocol",
            "slug": "getting-started-introduction",
            "category": null
      },
      "getting-started-quick-start": {
            "title": "Quick Start",
            "description": "Get started with your first agent in 5 minutes",
            "slug": "getting-started-quick-start",
            "category": null
      },
      "getting-started": {
            "title": "Getting Started",
            "description": "Get started with Agents & MCPs",
            "slug": "getting-started",
            "category": null
      },
      "installation": {
            "title": "Installation",
            "description": "Installation guide",
            "slug": "installation",
            "category": null
      },
      "integrations": {
            "title": "Integrations",
            "description": "Integrations guide",
            "slug": "integrations",
            "category": null
      },
      "mcps-overview": {
            "title": "MCPs Overview",
            "description": "Overview of Model Context Protocol",
            "slug": "mcps-overview",
            "category": null
      },
      "prompting-strategies": {
            "title": "Prompting Strategies",
            "description": "Effective prompting strategies",
            "slug": "prompting-strategies",
            "category": null
      },
      "quick-start": {
            "title": "Quick Start",
            "description": "Quick start guide",
            "slug": "quick-start",
            "category": null
      },
      "state-management": {
            "title": "State Management",
            "description": "State management in workflows",
            "slug": "state-management",
            "category": null
      },
      "technical-reference-api-reference": {
            "title": "API Reference",
            "description": "Complete API reference for agents and MCPs",
            "slug": "technical-reference-api-reference",
            "category": null
      },
      "technical-reference-custom-mcps": {
            "title": "Custom MCPs",
            "description": "Build your own Model Context Protocol servers",
            "slug": "technical-reference-custom-mcps",
            "category": null
      },
      "technical-reference-integrations": {
            "title": "Integrations",
            "description": "Integrate agents and MCPs with external services",
            "slug": "technical-reference-integrations",
            "category": null
      },
      "technical-reference-mcps-overview": {
            "title": "MCPs Overview",
            "description": "Understanding the Model Context Protocol architecture",
            "slug": "technical-reference-mcps-overview",
            "category": null
      },
      "technical-reference": {
            "title": "Technical Reference",
            "description": "Technical reference documentation",
            "slug": "technical-reference",
            "category": null
      }
},
    navSectionMap: {
      "agents-mcps-introduction": [
            "Getting Started"
      ],
      "agents-mcps-workflows": [
            "Building Workflows"
      ],
      "agents-mcps-references": [
            "Technical Reference"
      ]
},
  },
  cli: {
    sections: [
      {
            "label": "Getting Started",
            "items": [
                  {
                        "id": "commands",
                        "label": "Commands"
                  },
                  {
                        "id": "installation",
                        "label": "Installation"
                  },
                  {
                        "id": "quick-start",
                        "label": "Quick Start"
                  }
            ]
      }
],
    fileMap: {
      "commands": {
            "title": "Commands",
            "description": "Complete reference of all CLI commands",
            "slug": "commands",
            "category": "Getting Started"
      },
      "installation": {
            "title": "Installation",
            "description": "Install and setup the UI Lab CLI",
            "slug": "installation",
            "category": "Getting Started"
      },
      "quick-start": {
            "title": "Quick Start",
            "description": "Get up and running with the CLI in minutes",
            "slug": "quick-start",
            "category": "Getting Started"
      }
},
    navSectionMap: {
      "cli-getting-started": [
            "Getting Started"
      ],
      "cli-advanced": []
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
                        "label": "Accessibility Standards"
                  },
                  {
                        "id": "component-guidelines",
                        "label": "Component Guidelines"
                  }
            ]
      }
],
    fileMap: {
      "accessibility": {
            "title": "Accessibility Standards",
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
      "component-guidelines": {
            "title": "Component Guidelines",
            "description": "Patterns, usage rules, and best practices for UI Lab components",
            "slug": "component-guidelines",
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
