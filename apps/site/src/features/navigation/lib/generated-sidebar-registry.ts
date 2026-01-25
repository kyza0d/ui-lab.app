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
            "label": "Agents & MCPs",
            "items": [
                  {
                        "id": "agents-mcps-api-reference",
                        "label": "API Reference"
                  },
                  {
                        "id": "agents-mcps-core-concepts",
                        "label": "Core Concepts"
                  },
                  {
                        "id": "agents-mcps-custom-mcps",
                        "label": "Custom MCPs"
                  },
                  {
                        "id": "agents-mcps-designing-ai-workflows",
                        "label": "Designing AI Workflows"
                  },
                  {
                        "id": "agents-mcps-examples-use-cases",
                        "label": "Examples & Use Cases"
                  },
                  {
                        "id": "agents-mcps-installation",
                        "label": "Installation"
                  },
                  {
                        "id": "agents-mcps-integrations",
                        "label": "Integrations"
                  },
                  {
                        "id": "agents-mcps-introduction",
                        "label": "Agents & MCPs"
                  },
                  {
                        "id": "agents-mcps-mcps-overview",
                        "label": "MCPs Overview"
                  },
                  {
                        "id": "agents-mcps-prompting-strategies",
                        "label": "Prompting Strategies"
                  },
                  {
                        "id": "agents-mcps-quick-start",
                        "label": "Quick Start"
                  },
                  {
                        "id": "agents-mcps-state-management",
                        "label": "State Management"
                  }
            ]
      },
      {
            "label": "CLI",
            "items": [
                  {
                        "id": "cli-commands",
                        "label": "Commands"
                  },
                  {
                        "id": "cli-installation",
                        "label": "Installation"
                  },
                  {
                        "id": "cli-quick-start",
                        "label": "Quick Start"
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
      "agents-mcps-api-reference": {
            "title": "API Reference",
            "description": "Complete API reference for agents and MCPs",
            "slug": "agents-mcps-api-reference",
            "category": "Agents & MCPs"
      },
      "agents-mcps-core-concepts": {
            "title": "Core Concepts",
            "description": "Understand the fundamental concepts of agents and MCPs",
            "slug": "agents-mcps-core-concepts",
            "category": "Agents & MCPs"
      },
      "agents-mcps-custom-mcps": {
            "title": "Custom MCPs",
            "description": "Build your own Model Context Protocol servers",
            "slug": "agents-mcps-custom-mcps",
            "category": "Agents & MCPs"
      },
      "agents-mcps-designing-ai-workflows": {
            "title": "Designing AI Workflows",
            "description": "Learn how to architect effective AI workflows",
            "slug": "agents-mcps-designing-ai-workflows",
            "category": "Agents & MCPs"
      },
      "agents-mcps-examples-use-cases": {
            "title": "Examples & Use Cases",
            "description": "Real-world examples and use cases for AI agents",
            "slug": "agents-mcps-examples-use-cases",
            "category": "Agents & MCPs"
      },
      "agents-mcps-installation": {
            "title": "Installation",
            "description": "Set up Agents & MCPs in your project",
            "slug": "agents-mcps-installation",
            "category": "Agents & MCPs"
      },
      "agents-mcps-integrations": {
            "title": "Integrations",
            "description": "Integrate agents and MCPs with external services",
            "slug": "agents-mcps-integrations",
            "category": "Agents & MCPs"
      },
      "agents-mcps-introduction": {
            "title": "Agents & MCPs",
            "description": "Learn about AI agents and Model Context Protocol",
            "slug": "agents-mcps-introduction",
            "category": "Agents & MCPs"
      },
      "agents-mcps-mcps-overview": {
            "title": "MCPs Overview",
            "description": "Understanding the Model Context Protocol architecture",
            "slug": "agents-mcps-mcps-overview",
            "category": "Agents & MCPs"
      },
      "agents-mcps-prompting-strategies": {
            "title": "Prompting Strategies",
            "description": "Master effective prompting techniques for AI agents",
            "slug": "agents-mcps-prompting-strategies",
            "category": "Agents & MCPs"
      },
      "agents-mcps-quick-start": {
            "title": "Quick Start",
            "description": "Get started with your first agent in 5 minutes",
            "slug": "agents-mcps-quick-start",
            "category": "Agents & MCPs"
      },
      "agents-mcps-state-management": {
            "title": "State Management",
            "description": "Manage agent and workflow state effectively",
            "slug": "agents-mcps-state-management",
            "category": "Agents & MCPs"
      },
      "best-practices": {
            "title": "Best Practices",
            "description": "Learn how to effectively use and develop with UI Lab components following proven patterns and conventions.",
            "slug": "best-practices",
            "category": "Development"
      },
      "cli-commands": {
            "title": "Commands",
            "description": "Complete reference of all CLI commands",
            "slug": "cli-commands",
            "category": "CLI"
      },
      "cli-guide": {
            "title": "CLI Guide",
            "description": "Comprehensive guide to using the UI Lab CLI for scaffolding and project setup.",
            "slug": "cli-guide",
            "category": "Development"
      },
      "cli-installation": {
            "title": "Installation",
            "description": "Install and setup the UI Lab CLI",
            "slug": "cli-installation",
            "category": "CLI"
      },
      "cli-quick-start": {
            "title": "Quick Start",
            "description": "Get up and running with the CLI in minutes",
            "slug": "cli-quick-start",
            "category": "CLI"
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
                        "id": "components-guidelines",
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
      "components-guidelines": {
            "title": "Component Guidelines",
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
