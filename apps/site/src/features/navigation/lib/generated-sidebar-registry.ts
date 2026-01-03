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
  components: DomainRegistry;
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
                  },
                  {
                        "id": "form-validation",
                        "label": "Build a Form with Validation"
                  },
                  {
                        "id": "modal-dialog",
                        "label": "Create a Modal Dialog"
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
      "form-validation": {
            "title": "Build a Form with Validation",
            "description": "Add client-side validation to forms with error messages and visual feedback.",
            "slug": "form-validation",
            "category": "How-To"
      },
      "installation": {
            "title": "Installation",
            "description": "Add UI Lab to any Tailwind v4 project in under one minute.",
            "slug": "installation",
            "category": "Getting Started"
      },
      "modal-dialog": {
            "title": "Create a Modal Dialog",
            "description": "Build modal dialogs with proper focus management and keyboard interactions.",
            "slug": "modal-dialog",
            "category": "How-To"
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
  components: {
    sections: [],
    fileMap: {},
    navSectionMap: null,
  },
  'agents-mcps': {
    sections: [
      {
            "label": "Getting Started",
            "items": [
                  {
                        "id": "core-concepts",
                        "label": "Core Concepts"
                  },
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
                  },
                  {
                        "id": "getting-started-with-claude",
                        "label": "Get Started with Claude"
                  },
                  {
                        "id": "installation",
                        "label": "Installation"
                  },
                  {
                        "id": "introduction",
                        "label": "Introduction to Agents & MCPs"
                  },
                  {
                        "id": "quick-start",
                        "label": "Quick Start"
                  },
                  {
                        "id": "setup",
                        "label": "Agent Setup Guide"
                  }
            ]
      },
      {
            "label": "Concepts",
            "items": [
                  {
                        "id": "understanding-component-registry",
                        "label": "Understanding the Component Registry"
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
                  },
                  {
                        "id": "designing-ai-workflows",
                        "label": "Designing AI Workflows"
                  },
                  {
                        "id": "examples-use-cases",
                        "label": "Examples & Use Cases"
                  },
                  {
                        "id": "prompting-strategies",
                        "label": "Prompting Strategies"
                  },
                  {
                        "id": "state-management",
                        "label": "State Management"
                  }
            ]
      },
      {
            "label": "Reference",
            "items": [
                  {
                        "id": "component-registry-reference",
                        "label": "Component Registry Reference"
                  },
                  {
                        "id": "design-guidelines-reference",
                        "label": "Design Guidelines Reference"
                  },
                  {
                        "id": "llms-txt-format-reference",
                        "label": "LLMs.txt Format Reference"
                  }
            ]
      },
      {
            "label": "Technical Reference",
            "items": [
                  {
                        "id": "api-reference",
                        "label": "API Reference"
                  },
                  {
                        "id": "custom-mcps",
                        "label": "Custom MCPs"
                  },
                  {
                        "id": "integrations",
                        "label": "Integrations"
                  },
                  {
                        "id": "mcps-overview",
                        "label": "MCPs Overview"
                  },
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
      },
      {
            "label": "Development",
            "items": [
                  {
                        "id": "configuration",
                        "label": "Configuration & Advanced Setup"
                  }
            ]
      }
],
    fileMap: {
      "api-reference": {
            "title": "API Reference",
            "description": "Complete API reference for agents and MCPs",
            "slug": "api-reference",
            "category": "Technical Reference"
      },
      "building-workflows-designing-ai-workflows": {
            "title": "Designing AI Workflows",
            "description": "Learn how to architect effective AI workflows",
            "slug": "building-workflows-designing-ai-workflows",
            "category": "Building Workflows"
      },
      "building-workflows-examples-use-cases": {
            "title": "Examples & Use Cases",
            "description": "Real-world examples and use cases for AI agents",
            "slug": "building-workflows-examples-use-cases",
            "category": "Building Workflows"
      },
      "building-workflows-prompting-strategies": {
            "title": "Prompting Strategies",
            "description": "Master effective prompting techniques for AI agents",
            "slug": "building-workflows-prompting-strategies",
            "category": "Building Workflows"
      },
      "building-workflows-state-management": {
            "title": "State Management",
            "description": "Manage agent and workflow state effectively",
            "slug": "building-workflows-state-management",
            "category": "Building Workflows"
      },
      "component-registry-reference": {
            "title": "Component Registry Reference",
            "description": "Complete reference for accessing and understanding UI Lab's component registry",
            "slug": "component-registry-reference",
            "category": "Reference"
      },
      "configuration": {
            "title": "Configuration & Advanced Setup",
            "description": "Advanced agent and MCP configuration",
            "slug": "configuration",
            "category": "Development"
      },
      "core-concepts": {
            "title": "Core Concepts",
            "description": "Understand the fundamental concepts of agents and MCPs",
            "slug": "core-concepts",
            "category": "Getting Started"
      },
      "custom-mcps": {
            "title": "Custom MCPs",
            "description": "Build your own Model Context Protocol servers",
            "slug": "custom-mcps",
            "category": "Technical Reference"
      },
      "design-guidelines-reference": {
            "title": "Design Guidelines Reference",
            "description": "Complete guide for component selection and composition decisions",
            "slug": "design-guidelines-reference",
            "category": "Reference"
      },
      "designing-ai-workflows": {
            "title": "Designing AI Workflows",
            "description": "Learn how to architect effective AI workflows",
            "slug": "designing-ai-workflows",
            "category": "Building Workflows"
      },
      "examples-use-cases": {
            "title": "Examples & Use Cases",
            "description": "Real-world examples and use cases for AI agents",
            "slug": "examples-use-cases",
            "category": "Building Workflows"
      },
      "getting-started-core-concepts": {
            "title": "Core Concepts",
            "description": "Understand the fundamental concepts of agents and MCPs",
            "slug": "getting-started-core-concepts",
            "category": "Getting Started"
      },
      "getting-started-installation": {
            "title": "Installation",
            "description": "Set up Agents & MCPs in your project",
            "slug": "getting-started-installation",
            "category": "Getting Started"
      },
      "getting-started-introduction": {
            "title": "Agents & MCPs",
            "description": "Learn about AI agents and Model Context Protocol",
            "slug": "getting-started-introduction",
            "category": "Getting Started"
      },
      "getting-started-quick-start": {
            "title": "Quick Start",
            "description": "Get started with your first agent in 5 minutes",
            "slug": "getting-started-quick-start",
            "category": "Getting Started"
      },
      "getting-started-with-claude": {
            "title": "Get Started with Claude",
            "description": "Step-by-step guide to generating UI Lab components with Claude",
            "slug": "getting-started-with-claude",
            "category": "Getting Started"
      },
      "installation": {
            "title": "Installation",
            "description": "Install and configure the UI Lab MCP Server",
            "slug": "installation",
            "category": "Getting Started"
      },
      "integrations": {
            "title": "Integrations",
            "description": "Integrate agents and MCPs with external services",
            "slug": "integrations",
            "category": "Technical Reference"
      },
      "introduction": {
            "title": "Introduction to Agents & MCPs",
            "description": "Learn about AI agents and Model Context Protocol",
            "slug": "introduction",
            "category": "Getting Started"
      },
      "llms-txt-format-reference": {
            "title": "LLMs.txt Format Reference",
            "description": "Complete reference for the LLMs.txt machine-readable documentation format",
            "slug": "llms-txt-format-reference",
            "category": "Reference"
      },
      "mcps-overview": {
            "title": "MCPs Overview",
            "description": "Understanding the Model Context Protocol architecture",
            "slug": "mcps-overview",
            "category": "Technical Reference"
      },
      "prompting-strategies": {
            "title": "Prompting Strategies",
            "description": "Master effective prompting techniques for AI agents",
            "slug": "prompting-strategies",
            "category": "Building Workflows"
      },
      "quick-start": {
            "title": "Quick Start",
            "description": "Get started with your first agent in 5 minutes",
            "slug": "quick-start",
            "category": "Getting Started"
      },
      "setup": {
            "title": "Agent Setup Guide",
            "description": "Setting up AI agents with UI Lab",
            "slug": "setup",
            "category": "Getting Started"
      },
      "state-management": {
            "title": "State Management",
            "description": "Manage agent and workflow state effectively",
            "slug": "state-management",
            "category": "Building Workflows"
      },
      "technical-reference-api-reference": {
            "title": "API Reference",
            "description": "Complete API reference for agents and MCPs",
            "slug": "technical-reference-api-reference",
            "category": "Technical Reference"
      },
      "technical-reference-custom-mcps": {
            "title": "Custom MCPs",
            "description": "Build your own Model Context Protocol servers",
            "slug": "technical-reference-custom-mcps",
            "category": "Technical Reference"
      },
      "technical-reference-integrations": {
            "title": "Integrations",
            "description": "Integrate agents and MCPs with external services",
            "slug": "technical-reference-integrations",
            "category": "Technical Reference"
      },
      "technical-reference-mcps-overview": {
            "title": "MCPs Overview",
            "description": "Understanding the Model Context Protocol architecture",
            "slug": "technical-reference-mcps-overview",
            "category": "Technical Reference"
      },
      "understanding-component-registry": {
            "title": "Understanding the Component Registry",
            "description": "Learn how the Component Registry enables AI to make smart decisions about components",
            "slug": "understanding-component-registry",
            "category": "Concepts"
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
            "Reference",
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
                        "label": "CLI Commands Reference"
                  },
                  {
                        "id": "installation",
                        "label": "CLI Installation"
                  },
                  {
                        "id": "quick-start",
                        "label": "Quick Start"
                  }
            ]
      },
      {
            "label": "Advanced",
            "items": [
                  {
                        "id": "agents",
                        "label": "Agents"
                  },
                  {
                        "id": "best-practices",
                        "label": "Best Practices"
                  },
                  {
                        "id": "configuration",
                        "label": "Configuration"
                  },
                  {
                        "id": "hooks",
                        "label": "Hooks"
                  },
                  {
                        "id": "mcp-servers",
                        "label": "MCP Servers"
                  },
                  {
                        "id": "skills",
                        "label": "Skills"
                  }
            ]
      }
],
    fileMap: {
      "agents": {
            "title": "Agents",
            "description": "Create and manage autonomous agents within the CLI",
            "slug": "agents",
            "category": "Advanced"
      },
      "best-practices": {
            "title": "Best Practices",
            "description": "Best practices for using the CLI effectively",
            "slug": "best-practices",
            "category": "Advanced"
      },
      "commands": {
            "title": "CLI Commands Reference",
            "description": "Complete reference of all CLI commands",
            "slug": "commands",
            "category": "Getting Started"
      },
      "configuration": {
            "title": "Configuration",
            "description": "Configure the CLI and its extensions",
            "slug": "configuration",
            "category": "Advanced"
      },
      "hooks": {
            "title": "Hooks",
            "description": "Extend CLI functionality with custom hooks",
            "slug": "hooks",
            "category": "Advanced"
      },
      "installation": {
            "title": "CLI Installation",
            "description": "Install and setup the UI Lab CLI",
            "slug": "installation",
            "category": "Getting Started"
      },
      "mcp-servers": {
            "title": "MCP Servers",
            "description": "Integration and management of Model Context Protocol servers",
            "slug": "mcp-servers",
            "category": "Advanced"
      },
      "quick-start": {
            "title": "Quick Start",
            "description": "Get up and running with the CLI in minutes",
            "slug": "quick-start",
            "category": "Getting Started"
      },
      "skills": {
            "title": "Skills",
            "description": "Build and deploy custom skills for the CLI",
            "slug": "skills",
            "category": "Advanced"
      }
},
    navSectionMap: {
      "cli-getting-started": [
            "Getting Started"
      ],
      "cli-advanced": [
            "Advanced"
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
