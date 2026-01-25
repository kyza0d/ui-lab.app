// This file is auto-generated. Do not edit manually.
// To regenerate, run: npm run generate:docs

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export type TocRegistry = Record<string, TocItem[]>;

export const tocRegistry: TocRegistry = {
  "agents-mcps-api-reference": [
    {
      "id": "core-types",
      "title": "Core Types",
      "level": 2
    },
    {
      "id": "message",
      "title": "Message",
      "level": 3
    },
    {
      "id": "agent",
      "title": "Agent",
      "level": 3
    },
    {
      "id": "tool",
      "title": "Tool",
      "level": 3
    },
    {
      "id": "toolcall",
      "title": "ToolCall",
      "level": 3
    },
    {
      "id": "agent-api",
      "title": "Agent API",
      "level": 2
    },
    {
      "id": "useagent-hook",
      "title": "useAgent Hook",
      "level": 3
    },
    {
      "id": "send",
      "title": "send()",
      "level": 3
    },
    {
      "id": "reset",
      "title": "reset()",
      "level": 3
    },
    {
      "id": "mcp-server-api",
      "title": "MCP Server API",
      "level": 2
    },
    {
      "id": "mcpserver",
      "title": "MCPServer",
      "level": 3
    },
    {
      "id": "serverregistertool",
      "title": "server.registerTool()",
      "level": 3
    },
    {
      "id": "serverderegistertool",
      "title": "server.deregisterTool()",
      "level": 3
    },
    {
      "id": "mcp-client-api",
      "title": "MCP Client API",
      "level": 2
    },
    {
      "id": "mcpclient",
      "title": "MCPClient",
      "level": 3
    },
    {
      "id": "clientgettools",
      "title": "client.getTools()",
      "level": 3
    },
    {
      "id": "clientcalltool",
      "title": "client.callTool()",
      "level": 3
    },
    {
      "id": "clientcalltoolstream",
      "title": "client.callToolStream()",
      "level": 3
    },
    {
      "id": "error-handling",
      "title": "Error Handling",
      "level": 2
    },
    {
      "id": "mcperror",
      "title": "MCPError",
      "level": 3
    },
    {
      "id": "error-handling-example",
      "title": "Error Handling Example",
      "level": 3
    },
    {
      "id": "memory-management",
      "title": "Memory Management",
      "level": 2
    },
    {
      "id": "memoryconfig",
      "title": "MemoryConfig",
      "level": 3
    },
    {
      "id": "memory-types",
      "title": "Memory Types",
      "level": 3
    },
    {
      "id": "events",
      "title": "Events",
      "level": 2
    },
    {
      "id": "agent-events",
      "title": "Agent Events",
      "level": 3
    },
    {
      "id": "streaming",
      "title": "Streaming",
      "level": 2
    },
    {
      "id": "streaming-responses",
      "title": "Streaming Responses",
      "level": 3
    },
    {
      "id": "rate-limiting",
      "title": "Rate Limiting",
      "level": 2
    },
    {
      "id": "rate-limit-headers",
      "title": "Rate Limit Headers",
      "level": 3
    },
    {
      "id": "pagination",
      "title": "Pagination",
      "level": 2
    },
    {
      "id": "list-operations",
      "title": "List Operations",
      "level": 3
    },
    {
      "id": "versioning",
      "title": "Versioning",
      "level": 2
    },
    {
      "id": "changelog",
      "title": "Changelog",
      "level": 2
    },
    {
      "id": "v100",
      "title": "v1.0.0",
      "level": 3
    },
    {
      "id": "support",
      "title": "Support",
      "level": 2
    }
  ],
  "agents-mcps-core-concepts": [
    {
      "id": "agent-lifecycle",
      "title": "Agent Lifecycle",
      "level": 2
    },
    {
      "id": "messages-and-communication",
      "title": "Messages and Communication",
      "level": 2
    },
    {
      "id": "context-and-memory",
      "title": "Context and Memory",
      "level": 2
    },
    {
      "id": "tools-and-functions",
      "title": "Tools and Functions",
      "level": 2
    },
    {
      "id": "model-context-protocol-mcp",
      "title": "Model Context Protocol (MCP)",
      "level": 2
    },
    {
      "id": "agent-types",
      "title": "Agent Types",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-custom-mcps": [
    {
      "id": "mcp-server-basics",
      "title": "MCP Server Basics",
      "level": 2
    },
    {
      "id": "server-structure",
      "title": "Server Structure",
      "level": 3
    },
    {
      "id": "tool-definition",
      "title": "Tool Definition",
      "level": 3
    },
    {
      "id": "creating-a-simple-mcp-server",
      "title": "Creating a Simple MCP Server",
      "level": 2
    },
    {
      "id": "step-1-define-your-tools",
      "title": "Step 1: Define Your Tools",
      "level": 3
    },
    {
      "id": "step-2-implement-tool-handlers",
      "title": "Step 2: Implement Tool Handlers",
      "level": 3
    },
    {
      "id": "step-3-create-and-start-server",
      "title": "Step 3: Create and Start Server",
      "level": 3
    },
    {
      "id": "advanced-features",
      "title": "Advanced Features",
      "level": 2
    },
    {
      "id": "streaming-responses",
      "title": "Streaming Responses",
      "level": 3
    },
    {
      "id": "resource-management",
      "title": "Resource Management",
      "level": 3
    },
    {
      "id": "error-handling",
      "title": "Error Handling",
      "level": 3
    },
    {
      "id": "authentication",
      "title": "Authentication",
      "level": 3
    },
    {
      "id": "testing-your-mcp",
      "title": "Testing Your MCP",
      "level": 2
    },
    {
      "id": "unit-tests",
      "title": "Unit Tests",
      "level": 3
    },
    {
      "id": "integration-tests",
      "title": "Integration Tests",
      "level": 3
    },
    {
      "id": "deployment",
      "title": "Deployment",
      "level": 2
    },
    {
      "id": "docker-deployment",
      "title": "Docker Deployment",
      "level": 3
    },
    {
      "id": "environment-configuration",
      "title": "Environment Configuration",
      "level": 3
    },
    {
      "id": "monitoring",
      "title": "Monitoring",
      "level": 3
    },
    {
      "id": "best-practices",
      "title": "Best Practices",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-designing-ai-workflows": [
    {
      "id": "workflow-architecture",
      "title": "Workflow Architecture",
      "level": 2
    },
    {
      "id": "planning-your-workflow",
      "title": "Planning Your Workflow",
      "level": 2
    },
    {
      "id": "define-clear-objectives",
      "title": "Define Clear Objectives",
      "level": 3
    },
    {
      "id": "map-user-interactions",
      "title": "Map User Interactions",
      "level": 3
    },
    {
      "id": "error-handling-and-recovery",
      "title": "Error Handling and Recovery",
      "level": 2
    },
    {
      "id": "performance-optimization",
      "title": "Performance Optimization",
      "level": 2
    },
    {
      "id": "state-management",
      "title": "State Management",
      "level": 2
    },
    {
      "id": "monitoring-and-analytics",
      "title": "Monitoring and Analytics",
      "level": 2
    },
    {
      "id": "example-customer-support-workflow",
      "title": "Example: Customer Support Workflow",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-examples-use-cases": [
    {
      "id": "customer-support-assistant",
      "title": "Customer Support Assistant",
      "level": 2
    },
    {
      "id": "components",
      "title": "Components",
      "level": 3
    },
    {
      "id": "workflow",
      "title": "Workflow",
      "level": 3
    },
    {
      "id": "benefits",
      "title": "Benefits",
      "level": 3
    },
    {
      "id": "content-creation-assistant",
      "title": "Content Creation Assistant",
      "level": 2
    },
    {
      "id": "use-cases",
      "title": "Use Cases",
      "level": 3
    },
    {
      "id": "key-features",
      "title": "Key Features",
      "level": 3
    },
    {
      "id": "data-analysis-agent",
      "title": "Data Analysis Agent",
      "level": 2
    },
    {
      "id": "capabilities",
      "title": "Capabilities",
      "level": 3
    },
    {
      "id": "integration-points",
      "title": "Integration Points",
      "level": 3
    },
    {
      "id": "personal-assistant-agent",
      "title": "Personal Assistant Agent",
      "level": 2
    },
    {
      "id": "responsibilities",
      "title": "Responsibilities",
      "level": 3
    },
    {
      "id": "smart-features",
      "title": "Smart Features",
      "level": 3
    },
    {
      "id": "e-commerce-recommendation-agent",
      "title": "E-Commerce Recommendation Agent",
      "level": 2
    },
    {
      "id": "functionality",
      "title": "Functionality",
      "level": 3
    },
    {
      "id": "result",
      "title": "Result",
      "level": 3
    },
    {
      "id": "code-review-agent",
      "title": "Code Review Agent",
      "level": 2
    },
    {
      "id": "tasks",
      "title": "Tasks",
      "level": 3
    },
    {
      "id": "benefits-2",
      "title": "Benefits",
      "level": 3
    },
    {
      "id": "document-processing-agent",
      "title": "Document Processing Agent",
      "level": 2
    },
    {
      "id": "capabilities-2",
      "title": "Capabilities",
      "level": 3
    },
    {
      "id": "applications",
      "title": "Applications",
      "level": 3
    },
    {
      "id": "multi-agent-systems",
      "title": "Multi-Agent Systems",
      "level": 2
    },
    {
      "id": "patterns",
      "title": "Patterns",
      "level": 3
    },
    {
      "id": "example-research-assistant",
      "title": "Example: Research Assistant",
      "level": 3
    },
    {
      "id": "real-time-collaboration",
      "title": "Real-Time Collaboration",
      "level": 2
    },
    {
      "id": "interactive-workflows",
      "title": "Interactive Workflows",
      "level": 3
    },
    {
      "id": "getting-started-with-examples",
      "title": "Getting Started with Examples",
      "level": 2
    },
    {
      "id": "step-1-choose-your-use-case",
      "title": "Step 1: Choose Your Use Case",
      "level": 3
    },
    {
      "id": "step-2-design-your-workflow",
      "title": "Step 2: Design Your Workflow",
      "level": 3
    },
    {
      "id": "step-3-build-and-test",
      "title": "Step 3: Build and Test",
      "level": 3
    },
    {
      "id": "step-4-optimize",
      "title": "Step 4: Optimize",
      "level": 3
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-installation": [
    {
      "id": "prerequisites",
      "title": "Prerequisites",
      "level": 2
    },
    {
      "id": "installation-steps",
      "title": "Installation Steps",
      "level": 2
    },
    {
      "id": "1-install-dependencies",
      "title": "1. Install Dependencies",
      "level": 3
    },
    {
      "id": "2-configure-your-environment",
      "title": "2. Configure Your Environment",
      "level": 3
    },
    {
      "id": "3-set-up-provider",
      "title": "3. Set Up Provider",
      "level": 3
    },
    {
      "id": "verification",
      "title": "Verification",
      "level": 2
    },
    {
      "id": "troubleshooting",
      "title": "Troubleshooting",
      "level": 2
    }
  ],
  "agents-mcps-integrations": [
    {
      "id": "common-integration-patterns",
      "title": "Common Integration Patterns",
      "level": 2
    },
    {
      "id": "api-integration",
      "title": "API Integration",
      "level": 3
    },
    {
      "id": "database-integration",
      "title": "Database Integration",
      "level": 3
    },
    {
      "id": "message-queue-integration",
      "title": "Message Queue Integration",
      "level": 3
    },
    {
      "id": "third-party-service-integration",
      "title": "Third-Party Service Integration",
      "level": 2
    },
    {
      "id": "email-services",
      "title": "Email Services",
      "level": 3
    },
    {
      "id": "analytics-services",
      "title": "Analytics Services",
      "level": 3
    },
    {
      "id": "payment-processing",
      "title": "Payment Processing",
      "level": 3
    },
    {
      "id": "document-storage",
      "title": "Document Storage",
      "level": 3
    },
    {
      "id": "authentication-methods",
      "title": "Authentication Methods",
      "level": 2
    },
    {
      "id": "api-keys",
      "title": "API Keys",
      "level": 3
    },
    {
      "id": "oauth-20",
      "title": "OAuth 2.0",
      "level": 3
    },
    {
      "id": "mtls",
      "title": "mTLS",
      "level": 3
    },
    {
      "id": "error-handling-in-integrations",
      "title": "Error Handling in Integrations",
      "level": 2
    },
    {
      "id": "retry-logic",
      "title": "Retry Logic",
      "level": 3
    },
    {
      "id": "fallback-strategies",
      "title": "Fallback Strategies",
      "level": 3
    },
    {
      "id": "circuit-breaker",
      "title": "Circuit Breaker",
      "level": 3
    },
    {
      "id": "rate-limiting",
      "title": "Rate Limiting",
      "level": 2
    },
    {
      "id": "token-bucket",
      "title": "Token Bucket",
      "level": 3
    },
    {
      "id": "leaky-bucket",
      "title": "Leaky Bucket",
      "level": 3
    },
    {
      "id": "data-synchronization",
      "title": "Data Synchronization",
      "level": 2
    },
    {
      "id": "event-driven-sync",
      "title": "Event-Driven Sync",
      "level": 3
    },
    {
      "id": "polling",
      "title": "Polling",
      "level": 3
    },
    {
      "id": "testing-integrations",
      "title": "Testing Integrations",
      "level": 2
    },
    {
      "id": "mock-external-services",
      "title": "Mock External Services",
      "level": 3
    },
    {
      "id": "integration-tests",
      "title": "Integration Tests",
      "level": 3
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-introduction": [
    {
      "id": "what-are-ai-agents",
      "title": "What are AI Agents?",
      "level": 2
    },
    {
      "id": "what-is-the-model-context-protocol",
      "title": "What is the Model Context Protocol?",
      "level": 2
    },
    {
      "id": "key-concepts",
      "title": "Key Concepts",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-mcps-overview": [
    {
      "id": "architecture",
      "title": "Architecture",
      "level": 2
    },
    {
      "id": "core-components",
      "title": "Core Components",
      "level": 3
    },
    {
      "id": "message-types",
      "title": "Message Types",
      "level": 3
    },
    {
      "id": "tool-definition",
      "title": "Tool Definition",
      "level": 4
    },
    {
      "id": "tool-call",
      "title": "Tool Call",
      "level": 4
    },
    {
      "id": "tool-response",
      "title": "Tool Response",
      "level": 4
    },
    {
      "id": "protocol-flow",
      "title": "Protocol Flow",
      "level": 2
    },
    {
      "id": "resource-types",
      "title": "Resource Types",
      "level": 2
    },
    {
      "id": "apis",
      "title": "APIs",
      "level": 3
    },
    {
      "id": "databases",
      "title": "Databases",
      "level": 3
    },
    {
      "id": "file-systems",
      "title": "File Systems",
      "level": 3
    },
    {
      "id": "real-time-data",
      "title": "Real-Time Data",
      "level": 3
    },
    {
      "id": "security-considerations",
      "title": "Security Considerations",
      "level": 2
    },
    {
      "id": "authentication",
      "title": "Authentication",
      "level": 3
    },
    {
      "id": "authorization",
      "title": "Authorization",
      "level": 3
    },
    {
      "id": "input-validation",
      "title": "Input Validation",
      "level": 3
    },
    {
      "id": "performance-optimization",
      "title": "Performance Optimization",
      "level": 2
    },
    {
      "id": "caching",
      "title": "Caching",
      "level": 3
    },
    {
      "id": "batching",
      "title": "Batching",
      "level": 3
    },
    {
      "id": "streaming",
      "title": "Streaming",
      "level": 3
    },
    {
      "id": "error-handling",
      "title": "Error Handling",
      "level": 2
    },
    {
      "id": "error-types",
      "title": "Error Types",
      "level": 3
    },
    {
      "id": "recovery-strategies",
      "title": "Recovery Strategies",
      "level": 3
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-prompting-strategies": [
    {
      "id": "system-prompts",
      "title": "System Prompts",
      "level": 2
    },
    {
      "id": "writing-effective-system-prompts",
      "title": "Writing Effective System Prompts",
      "level": 3
    },
    {
      "id": "few-shot-prompting",
      "title": "Few-Shot Prompting",
      "level": 2
    },
    {
      "id": "chain-of-thought-prompting",
      "title": "Chain-of-Thought Prompting",
      "level": 2
    },
    {
      "id": "role-based-prompting",
      "title": "Role-Based Prompting",
      "level": 2
    },
    {
      "id": "constraint-based-prompting",
      "title": "Constraint-Based Prompting",
      "level": 2
    },
    {
      "id": "dynamic-prompting",
      "title": "Dynamic Prompting",
      "level": 2
    },
    {
      "id": "testing-and-refinement",
      "title": "Testing and Refinement",
      "level": 2
    },
    {
      "id": "anti-patterns-to-avoid",
      "title": "Anti-Patterns to Avoid",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-quick-start": [
    {
      "id": "your-first-agent",
      "title": "Your First Agent",
      "level": 2
    },
    {
      "id": "step-1-import-required-components",
      "title": "Step 1: Import Required Components",
      "level": 3
    },
    {
      "id": "step-2-create-an-agent",
      "title": "Step 2: Create an Agent",
      "level": 3
    },
    {
      "id": "step-3-handle-agent-responses",
      "title": "Step 3: Handle Agent Responses",
      "level": 3
    },
    {
      "id": "common-patterns",
      "title": "Common Patterns",
      "level": 2
    },
    {
      "id": "simple-question-answer",
      "title": "Simple Question-Answer",
      "level": 3
    },
    {
      "id": "multi-turn-conversations",
      "title": "Multi-turn Conversations",
      "level": 3
    },
    {
      "id": "tool-integration",
      "title": "Tool Integration",
      "level": 3
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-state-management": [
    {
      "id": "types-of-state",
      "title": "Types of State",
      "level": 2
    },
    {
      "id": "conversation-state",
      "title": "Conversation State",
      "level": 3
    },
    {
      "id": "agent-state",
      "title": "Agent State",
      "level": 3
    },
    {
      "id": "user-context",
      "title": "User Context",
      "level": 3
    },
    {
      "id": "application-state",
      "title": "Application State",
      "level": 3
    },
    {
      "id": "state-storage-strategies",
      "title": "State Storage Strategies",
      "level": 2
    },
    {
      "id": "in-memory-state",
      "title": "In-Memory State",
      "level": 3
    },
    {
      "id": "session-storage",
      "title": "Session Storage",
      "level": 3
    },
    {
      "id": "local-storage",
      "title": "Local Storage",
      "level": 3
    },
    {
      "id": "backend-storage",
      "title": "Backend Storage",
      "level": 3
    },
    {
      "id": "state-updates",
      "title": "State Updates",
      "level": 2
    },
    {
      "id": "immutable-updates",
      "title": "Immutable Updates",
      "level": 3
    },
    {
      "id": "batching-updates",
      "title": "Batching Updates",
      "level": 3
    },
    {
      "id": "async-state-management",
      "title": "Async State Management",
      "level": 3
    },
    {
      "id": "cleanup-and-memory-management",
      "title": "Cleanup and Memory Management",
      "level": 2
    },
    {
      "id": "session-cleanup",
      "title": "Session Cleanup",
      "level": 3
    },
    {
      "id": "memory-optimization",
      "title": "Memory Optimization",
      "level": 3
    },
    {
      "id": "debugging-state",
      "title": "Debugging State",
      "level": 2
    },
    {
      "id": "state-snapshots",
      "title": "State Snapshots",
      "level": 3
    },
    {
      "id": "state-validation",
      "title": "State Validation",
      "level": 3
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "best-practices": [
    {
      "id": "table-of-contents",
      "title": "Table of Contents",
      "level": 2
    },
    {
      "id": "component-usage",
      "title": "Component Usage",
      "level": 2
    },
    {
      "id": "importing-components",
      "title": "Importing Components",
      "level": 3
    },
    {
      "id": "importing-styles",
      "title": "Importing Styles",
      "level": 3
    },
    {
      "id": "component-props",
      "title": "Component Props",
      "level": 3
    },
    {
      "id": "variants-sizes",
      "title": "Variants & Sizes",
      "level": 3
    },
    {
      "id": "event-handlers",
      "title": "Event Handlers",
      "level": 3
    },
    {
      "id": "controlled-vs-uncontrolled",
      "title": "Controlled vs Uncontrolled",
      "level": 3
    },
    {
      "id": "accessibility",
      "title": "Accessibility",
      "level": 2
    },
    {
      "id": "keyboard-navigation",
      "title": "Keyboard Navigation",
      "level": 3
    },
    {
      "id": "screen-reader-support",
      "title": "Screen Reader Support",
      "level": 3
    },
    {
      "id": "focus-management",
      "title": "Focus Management",
      "level": 3
    },
    {
      "id": "testing-accessibility",
      "title": "Testing Accessibility",
      "level": 3
    },
    {
      "id": "common-accessibility-issues",
      "title": "Common Accessibility Issues",
      "level": 3
    },
    {
      "id": "styling-components",
      "title": "Styling Components",
      "level": 2
    },
    {
      "id": "using-css-variables-for-theming",
      "title": "Using CSS Variables for Theming",
      "level": 3
    },
    {
      "id": "overriding-styles-safely",
      "title": "Overriding Styles Safely",
      "level": 3
    },
    {
      "id": "tailwind-classes",
      "title": "Tailwind Classes",
      "level": 3
    },
    {
      "id": "dark-mode",
      "title": "Dark Mode",
      "level": 3
    },
    {
      "id": "type-safety",
      "title": "Type Safety",
      "level": 2
    },
    {
      "id": "prop-types",
      "title": "Prop Types",
      "level": 3
    },
    {
      "id": "discriminated-unions",
      "title": "Discriminated Unions",
      "level": 3
    },
    {
      "id": "strict-mode-benefits",
      "title": "Strict Mode Benefits",
      "level": 3
    },
    {
      "id": "component-composition",
      "title": "Component Composition",
      "level": 2
    },
    {
      "id": "compound-components",
      "title": "Compound Components",
      "level": 3
    },
    {
      "id": "composition-over-inheritance",
      "title": "Composition Over Inheritance",
      "level": 3
    },
    {
      "id": "wrapper-components",
      "title": "Wrapper Components",
      "level": 3
    },
    {
      "id": "state-management",
      "title": "State Management",
      "level": 2
    },
    {
      "id": "react-hooks",
      "title": "React Hooks",
      "level": 3
    },
    {
      "id": "react-aria-hooks",
      "title": "React Aria Hooks",
      "level": 3
    },
    {
      "id": "avoiding-state-issues",
      "title": "Avoiding State Issues",
      "level": 3
    },
    {
      "id": "performance-optimization",
      "title": "Performance Optimization",
      "level": 2
    },
    {
      "id": "code-splitting",
      "title": "Code Splitting",
      "level": 3
    },
    {
      "id": "memoization",
      "title": "Memoization",
      "level": 3
    },
    {
      "id": "bundle-size",
      "title": "Bundle Size",
      "level": 3
    },
    {
      "id": "testing",
      "title": "Testing",
      "level": 2
    },
    {
      "id": "unit-testing",
      "title": "Unit Testing",
      "level": 3
    },
    {
      "id": "interaction-testing",
      "title": "Interaction Testing",
      "level": 3
    },
    {
      "id": "accessibility-testing",
      "title": "Accessibility Testing",
      "level": 3
    },
    {
      "id": "development-workflow",
      "title": "Development Workflow",
      "level": 2
    },
    {
      "id": "setup",
      "title": "Setup",
      "level": 3
    },
    {
      "id": "testing-changes",
      "title": "Testing Changes",
      "level": 3
    },
    {
      "id": "code-style",
      "title": "Code Style",
      "level": 3
    },
    {
      "id": "summary",
      "title": "Summary",
      "level": 2
    }
  ],
  "cli-commands": [
    {
      "id": "component-commands",
      "title": "Component Commands",
      "level": 2
    },
    {
      "id": "ui-lab-add",
      "title": "ui-lab add",
      "level": 3
    },
    {
      "id": "ui-lab-list",
      "title": "ui-lab list",
      "level": 3
    },
    {
      "id": "configuration-commands",
      "title": "Configuration Commands",
      "level": 2
    },
    {
      "id": "ui-lab-config",
      "title": "ui-lab config",
      "level": 3
    },
    {
      "id": "documentation-commands",
      "title": "Documentation Commands",
      "level": 2
    },
    {
      "id": "ui-lab-docs",
      "title": "ui-lab docs",
      "level": 3
    },
    {
      "id": "coming-soon",
      "title": "Coming Soon",
      "level": 2
    }
  ],
  "cli-guide": [
    {
      "id": "coming-soon",
      "title": "Coming Soon",
      "level": 2
    }
  ],
  "cli-installation": [
    {
      "id": "installation-steps",
      "title": "Installation Steps",
      "level": 2
    },
    {
      "id": "using-npm",
      "title": "Using npm",
      "level": 3
    },
    {
      "id": "using-pnpm",
      "title": "Using pnpm",
      "level": 3
    },
    {
      "id": "verify-installation",
      "title": "Verify Installation",
      "level": 3
    },
    {
      "id": "first-steps",
      "title": "First Steps",
      "level": 2
    }
  ],
  "cli-quick-start": [
    {
      "id": "installation",
      "title": "Installation",
      "level": 2
    },
    {
      "id": "first-command",
      "title": "First Command",
      "level": 2
    },
    {
      "id": "create-your-first-component",
      "title": "Create Your First Component",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "dark-mode": [
    {
      "id": "automatic-dark-mode",
      "title": "Automatic dark mode",
      "level": 2
    },
    {
      "id": "manual-theme-toggle",
      "title": "Manual theme toggle",
      "level": 2
    },
    {
      "id": "update-css-variables",
      "title": "Update CSS variables",
      "level": 2
    },
    {
      "id": "persist-user-preference",
      "title": "Persist user preference",
      "level": 2
    },
    {
      "id": "use-in-your-app",
      "title": "Use in your app",
      "level": 2
    },
    {
      "id": "color-scale-reference",
      "title": "Color scale reference",
      "level": 2
    },
    {
      "id": "next-step",
      "title": "Next step",
      "level": 2
    }
  ],
  "index": [
    {
      "id": "why-this-matters",
      "title": "Why This Matters",
      "level": 2
    },
    {
      "id": "what-youll-learn",
      "title": "What You'll Learn",
      "level": 2
    },
    {
      "id": "for-claude-users",
      "title": "For Claude Users",
      "level": 3
    },
    {
      "id": "for-ai-developers-agent-builders",
      "title": "For AI Developers & Agent Builders",
      "level": 3
    },
    {
      "id": "core-concepts-three-pillars",
      "title": "Core Concepts: Three Pillars",
      "level": 2
    },
    {
      "id": "1-component-registry",
      "title": "1. Component Registry",
      "level": 3
    },
    {
      "id": "2-design-guidelines",
      "title": "2. Design Guidelines",
      "level": 3
    },
    {
      "id": "when-to-use-button",
      "title": "When to Use Button",
      "level": 2
    },
    {
      "id": "vs-link",
      "title": "vs. Link",
      "level": 3
    },
    {
      "id": "variants",
      "title": "Variants",
      "level": 3
    },
    {
      "id": "3-llmstxt-format",
      "title": "3. LLMs.txt Format",
      "level": 3
    },
    {
      "id": "button",
      "title": "Button",
      "level": 2
    },
    {
      "id": "props",
      "title": "Props",
      "level": 3
    },
    {
      "id": "examples",
      "title": "Examples",
      "level": 3
    },
    {
      "id": "key-features-for-ai",
      "title": "Key Features for AI",
      "level": 2
    },
    {
      "id": "type-safety",
      "title": "Type Safety",
      "level": 3
    },
    {
      "id": "semantic-theming",
      "title": "Semantic Theming",
      "level": 3
    },
    {
      "id": "composability-patterns",
      "title": "Composability Patterns",
      "level": 3
    },
    {
      "id": "accessibility-built-in",
      "title": "Accessibility Built-In",
      "level": 3
    },
    {
      "id": "documentation-structure",
      "title": "Documentation Structure",
      "level": 2
    },
    {
      "id": "quick-navigation",
      "title": "Quick Navigation",
      "level": 2
    },
    {
      "id": "philosophy-beautiful-by-default",
      "title": "Philosophy: Beautiful by Default",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "docs-index": [
    {
      "id": "overview",
      "title": "Overview",
      "level": 3
    },
    {
      "id": "core-values",
      "title": "Core values",
      "level": 3
    },
    {
      "id": "who-this-is-for",
      "title": "Who this is for",
      "level": 3
    },
    {
      "id": "installation",
      "title": "Installation",
      "level": 3
    },
    {
      "id": "common-patterns",
      "title": "Common patterns",
      "level": 3
    },
    {
      "id": "next-steps",
      "title": "Next steps",
      "level": 3
    }
  ],
  "installation": [
    {
      "id": "installation-steps",
      "title": "Installation Steps",
      "level": 2
    },
    {
      "id": "using-npm",
      "title": "Using npm",
      "level": 3
    },
    {
      "id": "using-pnpm",
      "title": "Using pnpm",
      "level": 3
    },
    {
      "id": "verify-installation",
      "title": "Verify Installation",
      "level": 3
    },
    {
      "id": "first-steps",
      "title": "First Steps",
      "level": 2
    }
  ],
  "styling": [
    {
      "id": "architecture-overview",
      "title": "Architecture Overview",
      "level": 2
    },
    {
      "id": "css-module-pattern",
      "title": "CSS Module Pattern",
      "level": 2
    },
    {
      "id": "file-structure",
      "title": "File Structure",
      "level": 3
    },
    {
      "id": "css-modules-basics",
      "title": "CSS Modules Basics",
      "level": 3
    },
    {
      "id": "benefits",
      "title": "Benefits",
      "level": 3
    },
    {
      "id": "css-variable-system",
      "title": "CSS Variable System",
      "level": 2
    },
    {
      "id": "typography-variables",
      "title": "Typography Variables",
      "level": 3
    },
    {
      "id": "color-variables",
      "title": "Color Variables",
      "level": 3
    },
    {
      "id": "spacing-variables",
      "title": "Spacing Variables",
      "level": 3
    },
    {
      "id": "layout-variables",
      "title": "Layout Variables",
      "level": 3
    },
    {
      "id": "using-css-variables",
      "title": "Using CSS Variables",
      "level": 3
    },
    {
      "id": "data-attributes-for-styling",
      "title": "Data Attributes for Styling",
      "level": 2
    },
    {
      "id": "available-data-attributes",
      "title": "Available Data Attributes",
      "level": 3
    },
    {
      "id": "complete-state-example",
      "title": "Complete State Example",
      "level": 3
    },
    {
      "id": "tailwind-css-integration",
      "title": "Tailwind CSS Integration",
      "level": 2
    },
    {
      "id": "theme-directive",
      "title": "@theme Directive",
      "level": 3
    },
    {
      "id": "apply-directive-in-components",
      "title": "@apply Directive in Components",
      "level": 3
    },
    {
      "id": "why-this-approach",
      "title": "Why This Approach",
      "level": 3
    },
    {
      "id": "customizing-component-styles",
      "title": "Customizing Component Styles",
      "level": 2
    },
    {
      "id": "method-1-css-variables-recommended",
      "title": "Method 1: CSS Variables (Recommended)",
      "level": 3
    },
    {
      "id": "method-2-css-modules-override",
      "title": "Method 2: CSS Modules Override",
      "level": 3
    },
    {
      "id": "method-3-tailwind-utilities",
      "title": "Method 3: Tailwind Utilities",
      "level": 3
    },
    {
      "id": "theme-customization",
      "title": "Theme Customization",
      "level": 2
    },
    {
      "id": "preset-themes",
      "title": "Preset Themes",
      "level": 3
    },
    {
      "id": "creating-custom-themes",
      "title": "Creating Custom Themes",
      "level": 3
    },
    {
      "id": "dark-mode-support",
      "title": "Dark Mode Support",
      "level": 2
    },
    {
      "id": "advanced-styling-techniques",
      "title": "Advanced Styling Techniques",
      "level": 2
    },
    {
      "id": "responsive-design-with-css-variables",
      "title": "Responsive Design with CSS Variables",
      "level": 3
    },
    {
      "id": "color-scales-for-consistency",
      "title": "Color Scales for Consistency",
      "level": 3
    },
    {
      "id": "animations-with-transitions",
      "title": "Animations with Transitions",
      "level": 3
    },
    {
      "id": "css-variable-reference",
      "title": "CSS Variable Reference",
      "level": 2
    },
    {
      "id": "best-practices",
      "title": "Best Practices",
      "level": 2
    },
    {
      "id": "1-use-css-variables-for-theming",
      "title": "1. Use CSS Variables for Theming",
      "level": 3
    },
    {
      "id": "2-scope-styles-with-css-modules",
      "title": "2. Scope Styles with CSS Modules",
      "level": 3
    },
    {
      "id": "3-use-data-attributes-for-variants",
      "title": "3. Use Data Attributes for Variants",
      "level": 3
    },
    {
      "id": "4-avoid-css-in-js",
      "title": "4. Avoid CSS-in-JS",
      "level": 3
    },
    {
      "id": "5-leverage-apply-for-composition",
      "title": "5. Leverage @apply for Composition",
      "level": 3
    },
    {
      "id": "summary",
      "title": "Summary",
      "level": 2
    }
  ],
  "accessibility": [
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
  "colors": [
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
  "components-guidelines": [
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
  "design-system-index": [
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
      "id": "foundation",
      "title": "Foundation",
      "level": 3
    },
    {
      "id": "tokens",
      "title": "Tokens",
      "level": 3
    },
    {
      "id": "components",
      "title": "Components",
      "level": 3
    },
    {
      "id": "guidelines",
      "title": "Guidelines",
      "level": 3
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
  "spacing": [
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
      "id": "mobile-768px",
      "title": "Mobile (< 768px)",
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
  "tokens": [
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
  "typography": [
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
  "variables": [
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
  "commands": [
    {
      "id": "component-commands",
      "title": "Component Commands",
      "level": 2
    },
    {
      "id": "ui-lab-add",
      "title": "ui-lab add",
      "level": 3
    },
    {
      "id": "ui-lab-list",
      "title": "ui-lab list",
      "level": 3
    },
    {
      "id": "configuration-commands",
      "title": "Configuration Commands",
      "level": 2
    },
    {
      "id": "ui-lab-config",
      "title": "ui-lab config",
      "level": 3
    },
    {
      "id": "documentation-commands",
      "title": "Documentation Commands",
      "level": 2
    },
    {
      "id": "ui-lab-docs",
      "title": "ui-lab docs",
      "level": 3
    },
    {
      "id": "coming-soon",
      "title": "Coming Soon",
      "level": 2
    }
  ],
  "cli-index": [
    {
      "id": "overview",
      "title": "Overview",
      "level": 2
    },
    {
      "id": "getting-started",
      "title": "Getting Started",
      "level": 2
    }
  ],
  "quick-start": [
    {
      "id": "installation",
      "title": "Installation",
      "level": 2
    },
    {
      "id": "first-command",
      "title": "First Command",
      "level": 2
    },
    {
      "id": "create-your-first-component",
      "title": "Create Your First Component",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ],
  "agents-mcps-index": [
    {
      "id": "why-this-matters",
      "title": "Why This Matters",
      "level": 2
    },
    {
      "id": "what-youll-learn",
      "title": "What You'll Learn",
      "level": 2
    },
    {
      "id": "for-claude-users",
      "title": "For Claude Users",
      "level": 3
    },
    {
      "id": "for-ai-developers-agent-builders",
      "title": "For AI Developers & Agent Builders",
      "level": 3
    },
    {
      "id": "core-concepts-three-pillars",
      "title": "Core Concepts: Three Pillars",
      "level": 2
    },
    {
      "id": "1-component-registry",
      "title": "1. Component Registry",
      "level": 3
    },
    {
      "id": "2-design-guidelines",
      "title": "2. Design Guidelines",
      "level": 3
    },
    {
      "id": "when-to-use-button",
      "title": "When to Use Button",
      "level": 2
    },
    {
      "id": "vs-link",
      "title": "vs. Link",
      "level": 3
    },
    {
      "id": "variants",
      "title": "Variants",
      "level": 3
    },
    {
      "id": "3-llmstxt-format",
      "title": "3. LLMs.txt Format",
      "level": 3
    },
    {
      "id": "button",
      "title": "Button",
      "level": 2
    },
    {
      "id": "props",
      "title": "Props",
      "level": 3
    },
    {
      "id": "examples",
      "title": "Examples",
      "level": 3
    },
    {
      "id": "key-features-for-ai",
      "title": "Key Features for AI",
      "level": 2
    },
    {
      "id": "type-safety",
      "title": "Type Safety",
      "level": 3
    },
    {
      "id": "semantic-theming",
      "title": "Semantic Theming",
      "level": 3
    },
    {
      "id": "composability-patterns",
      "title": "Composability Patterns",
      "level": 3
    },
    {
      "id": "accessibility-built-in",
      "title": "Accessibility Built-In",
      "level": 3
    },
    {
      "id": "documentation-structure",
      "title": "Documentation Structure",
      "level": 2
    },
    {
      "id": "quick-navigation",
      "title": "Quick Navigation",
      "level": 2
    },
    {
      "id": "philosophy-beautiful-by-default",
      "title": "Philosophy: Beautiful by Default",
      "level": 2
    },
    {
      "id": "next-steps",
      "title": "Next Steps",
      "level": 2
    }
  ]
};
