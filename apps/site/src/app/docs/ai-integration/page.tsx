"use client";

import { TableOfContents } from "@/components/TableOfContents";
import { tocRegistry } from "@/lib/generated-toc-registry";

export default function AIIntegrationPage() {
  const tocItems = tocRegistry["ai-integration"] || [];

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-4xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-foreground-50 mb-4">AI integration</h1>
            <p className="text-lg text-foreground-300">
              Use UI Lab with language models to generate production-ready component code. LLMs.txt provides structured documentation that AI understands.
            </p>
          </div>

          {/* What is LLMs.txt */}
          <div id="what-is-llms-txt" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">What is LLMs.txt</h2>
            <p className="text-foreground-300 mb-6">
              LLMs.txt is a structured, machine-readable documentation format designed for language models. It provides complete component APIs, usage patterns, and constraints in a format that AI tools can reliably understand and use.
            </p>

            <p className="text-foreground-300 mb-4">
              UI Lab includes a comprehensive <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">LLMs.txt</code> file that documents:
            </p>
            <ul className="space-y-2 text-foreground-300 ml-4 mb-6">
              <li>• Complete component interfaces with all props and their types</li>
              <li>• Variant options and their semantic meanings</li>
              <li>• Accessibility requirements and ARIA attributes</li>
              <li>• Common usage patterns and best practices</li>
              <li>• Design system constraints (spacing, colors, typography)</li>
              <li>• Integration examples for complex components</li>
            </ul>

            <p className="text-foreground-300">
              This allows AI assistants to generate code that follows UI Lab conventions and best practices without needing to reverse-engineer from examples.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Finding LLMs.txt */}
          <div id="accessing-llms-txt" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Accessing LLMs.txt</h2>
            <p className="text-foreground-300 mb-6">
              After installing UI Lab, you can reference the documentation in multiple ways:
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Method 1: Local file</h3>
            <p className="text-foreground-300 mb-4">
              The LLMs.txt file is included in the package. Reference it from your node_modules:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300">
                <code>node_modules/@ui-lab/core/LLMs.txt</code>
              </pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Method 2: CLI</h3>
            <p className="text-foreground-300 mb-4">
              Print LLMs.txt content to the terminal:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300">
                <code>npx ui-lab llms</code>
              </pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Method 3: Web documentation</h3>
            <p className="text-foreground-300">
              Visit the UI Lab website for interactive component reference documentation.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Using with AI Tools */}
          <div id="using-with-ai-tools" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Using with AI tools</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">ChatGPT / Claude / Copilot</h3>
            <p className="text-foreground-300 mb-4">
              Provide the LLMs.txt content when asking AI tools to generate components. Copy and paste the documentation at the start of your conversation:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`You are a React/TypeScript developer. Use UI Lab components for the UI layer.

Here is the complete component documentation:

[Copy LLMs.txt content here]

Now, build a user profile card that shows:
- User avatar
- User name and email
- Edit and delete buttons
- Responsive design`}</code></pre>
            </div>

            <p className="text-foreground-300 mb-6">
              The AI will generate code using the documented components and patterns, respecting the design system constraints.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">IDE Extensions</h3>
            <p className="text-foreground-300 mb-4">
              Use GitHub Copilot or Cursor with the documentation. Add a comment with instructions:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`// Use UI Lab components
// Button variants: primary, secondary, tertiary, destructive
// Card has Header, Title, Description, Content, Footer slots
// Build a login form with email, password, and submit button

export default function LoginForm() {
  // IDE suggests code using UI Lab components
}`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Example Prompts */}
          <div id="example-prompts" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Example prompts</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Simple component</h3>
            <p className="text-foreground-300 mb-4">
              Start simple. Provide clear requirements and let the AI handle implementation:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`Using UI Lab components, build a settings card with:
- Title: "Display Settings"
- Toggle for dark mode
- Dropdown for language selection
- Save button at the bottom

Make it accessible with proper labels and ARIA attributes.`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Complex feature</h3>
            <p className="text-foreground-300 mb-4">
              For larger features, break down requirements and explain data structure:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`Build a product list component using UI Lab. Requirements:

Data:
- products: { id, name, price, category, inStock }[]
- isLoading: boolean
- error: string | null

Features:
- Display products in a responsive grid
- Show product card with name, price, category badge
- Disable purchase button if out of stock
- Show loading state with skeleton cards
- Display error message if loading fails
- Include pagination (10 items per page)

Use Tailwind classes for layout, UI Lab for components.`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Style and behavior specifics</h3>
            <p className="text-foreground-300 mb-4">
              Be specific about behavior and styling to get better results:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`Build a notification component using UI Lab:

Requirements:
- Type: success, error, warning, info
- Auto-dismiss after 5 seconds
- Allow manual close
- Stack multiple notifications vertically
- Show icon based on type
- Use proper semantic colors (success-500, destructive-500, etc)
- Animate in/out smoothly
- Position fixed at top-right
- Respond to keyboard (Escape to close)`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Best Practices */}
          <div id="best-practices-for-ai-code-generation" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Best practices for AI code generation</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">1. Provide context</h3>
            <p className="text-foreground-300 mb-6">
              Give the AI information about your project structure, state management (React hooks, Redux, etc), and any existing patterns. This helps generate code that fits your codebase.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">2. Include LLMs.txt early</h3>
            <p className="text-foreground-300 mb-6">
              Always provide the LLMs.txt documentation in the first message or system prompt. This prevents the AI from inventing components or props that don't exist.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">3. Review generated code</h3>
            <p className="text-foreground-300 mb-6">
              Even with AI guidance, review generated code for accessibility, performance, and correctness. Check for proper ARIA attributes, keyboard navigation, and semantic HTML.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">4. Test accessibility</h3>
            <p className="text-foreground-300 mb-6">
              Run accessibility checks on generated code. Use tools like axe DevTools, Lighthouse, or WebAIM to ensure components are truly accessible.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">5. Iterate with feedback</h3>
            <p className="text-foreground-300 mb-6">
              Provide feedback to the AI when code doesn't meet requirements. Iterate by pointing out issues and asking for adjustments rather than starting over.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">6. Don't bypass documentation</h3>
            <p className="text-foreground-300 mb-6">
              If the AI generates props or components that seem wrong, check the LLMs.txt documentation. The AI's understanding is only as good as the documentation provided.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* What's in LLMs.txt */}
          <div id="understanding-llms-txt-structure" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Understanding LLMs.txt structure</h2>
            <p className="text-foreground-300 mb-6">
              LLMs.txt is organized by section, making it easy to find what you need. A typical entry looks like:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`## Button Component

### Props
- variant: 'primary' | 'secondary' | 'tertiary' | 'destructive'
  - primary: High emphasis, use for main actions
  - secondary: Medium emphasis, use for secondary actions
  - tertiary: Low emphasis, for less important actions
  - destructive: Dangerous actions, clearly marked

- size: 'sm' | 'md' | 'lg'
- disabled: boolean
- loading: boolean - shows loading spinner, disables interaction
- type: 'button' | 'submit' | 'reset'
- className: string - merge with defaults using clsx

### Examples
\`\`\`tsx
<Button variant="primary">Submit</Button>
<Button variant="destructive" size="lg">Delete</Button>
<Button disabled>Disabled</Button>
\`\`\`

### Accessibility
- Uses semantic <button> element
- Keyboard accessible (Enter, Space to activate)
- aria-busy set when loading
- aria-disabled set when disabled`}</code></pre>
            </div>

            <p className="text-foreground-300">
              Each component entry includes purpose, props with descriptions, examples, accessibility notes, and integration guidelines.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Advanced Scenarios */}
          <div id="advanced-scenarios" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Advanced scenarios</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Custom hooks with components</h3>
            <p className="text-foreground-300 mb-4">
              Ask the AI to generate custom hooks alongside components:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`Create a useFormValidation hook and a SignupForm component using UI Lab.

Hook should:
- Track form values and validation state
- Support custom validation rules
- Provide error messages per field

Form should:
- Use the hook for state management
- Display validation errors below inputs
- Disable submit button if form is invalid
- Show loading state while submitting`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Integrating with existing code</h3>
            <p className="text-foreground-300 mb-4">
              Share your existing code structure and ask for UI Lab components that fit:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`I have this component:

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
}

const [products, setProducts] = useState<Product[]>([]);

Refactor the rendering to use UI Lab Card, Badge, and Button
components. Keep the same data structure and logic.`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Next Steps */}
          <div id="next-steps" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Next steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/docs/getting-started" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Getting started</h3>
                <p className="text-foreground-400 text-sm">Learn how to use components in your project manually.</p>
              </a>
              <a href="/docs/accessibility" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Accessibility</h3>
                <p className="text-foreground-400 text-sm">Ensure AI-generated code meets a11y standards.</p>
              </a>
              <a href="/docs/best-practices" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Best practices</h3>
                <p className="text-foreground-400 text-sm">Learn patterns for effective component usage.</p>
              </a>
              <a href="/docs/customization" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Customization</h3>
                <p className="text-foreground-400 text-sm">Extend components with custom variants.</p>
              </a>
            </div>
          </div>
        </main>
        <div className="w-full lg:w-auto">
          {tocItems.length > 0 && <TableOfContents items={tocItems} />}
        </div>
      </div>
    </div>
  );
}
