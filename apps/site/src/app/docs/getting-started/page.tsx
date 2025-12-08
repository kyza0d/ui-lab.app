"use client";

import { TableOfContents } from "@/components/TableOfContents";

export default function GettingStartedPage() {
  const tocItems = [
    { id: "importing-components", title: "Importing components" },
    { id: "using-buttons", title: "Using buttons" },
    { id: "form-inputs", title: "Form inputs" },
    { id: "cards-for-layout", title: "Cards for layout" },
    { id: "understanding-props", title: "Understanding props" },
    { id: "managing-state", title: "Managing state" },
    { id: "common-patterns", title: "Common patterns" },
    { id: "next-steps", title: "Next steps" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-4xl mx-auto w-full px-8 py-16">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-foreground-50 mb-4">Getting started</h1>
            <p className="text-lg text-foreground-300">
              Learn the fundamentals of using UI Lab components by building your first features.
            </p>
          </div>

          {/* Importing Components */}
          <div id="importing-components" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Importing components</h2>
            <p className="text-foreground-300 mb-6">
              All UI Lab components are exported from a single entry point. Import only what you need:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { Button, Card, Input, Label } from '@ui-lab/core';`}</code></pre>
            </div>
            <p className="text-foreground-300">
              Components support tree-shaking, so unused imports are automatically removed from your bundle. The library provides TypeScript types for all components, ensuring type-safe development.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Button Component */}
          <div id="using-buttons" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Using buttons</h2>
            <p className="text-foreground-300 mb-6">
              Buttons are the most basic interactive element. They support multiple variants and states out of the box:
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Basic usage</h3>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { Button } from '@ui-lab/core';

export default function Demo() {
  return (
    <Button>Click me</Button>
  );
}`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Button variants</h3>
            <p className="text-foreground-300 mb-4">
              UI Lab buttons support semantic variants: <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">primary</code> (default), <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">secondary</code>, <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">tertiary</code>, and <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">destructive</code>.
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="destructive">Delete</Button>`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Sizes and states</h3>
            <p className="text-foreground-300 mb-4">
              Control button size with the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">size</code> prop. Disabled state is handled natively:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Input Component */}
          <div id="form-inputs" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Form inputs</h2>
            <p className="text-foreground-300 mb-6">
              Input components are fully accessible and support all standard HTML input types. They integrate seamlessly with labels:
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Basic input</h3>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { Input, Label } from '@ui-lab/core';

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
        />
      </div>
    </div>
  );
}`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Input with error state</h3>
            <p className="text-foreground-300 mb-4">
              Mark inputs as invalid using the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">invalid</code> prop:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`const [email, setEmail] = useState('');
const isInvalid = email && !email.includes('@');

<>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    invalid={isInvalid}
  />
  {isInvalid && (
    <p className="text-destructive-500 text-sm mt-1">
      Please enter a valid email
    </p>
  )}
</>`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Card Component */}
          <div id="cards-for-layout" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Cards for layout</h2>
            <p className="text-foreground-300 mb-6">
              Cards provide semantic structure for grouped content. Use the compound component pattern to build layouts:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { Card, Button, Input, Label } from '@ui-lab/core';

export default function SignupCard() {
  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Create account</Card.Title>
        <Card.Description>
          Sign up to get started
        </Card.Description>
      </Card.Header>

      <Card.Content className="space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Card.Content>

      <Card.Footer className="flex gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button>Sign up</Button>
      </Card.Footer>
    </Card>
  );
}`}</code></pre>
            </div>

            <p className="text-foreground-300">
              Cards automatically handle spacing and layout. The <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">Card.Header</code>, <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">Card.Content</code>, and <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">Card.Footer</code> slots manage internal spacing, so you focus on content.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Component Props */}
          <div id="understanding-props" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Understanding props</h2>
            <p className="text-foreground-300 mb-6">
              All UI Lab components follow consistent prop patterns for easy prediction:
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Common props across components</h3>
            <ul className="space-y-3 text-foreground-300 mb-6">
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">className</code> — Apply custom Tailwind classes (merged with defaults)</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">variant</code> — Change visual style (e.g., primary, secondary)</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">size</code> — Adjust component size (sm, md, lg)</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">disabled</code> — Disable interaction</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-*</code> — All components support ARIA attributes for accessibility</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Tailwind className merging</h3>
            <p className="text-foreground-300 mb-4">
              Components intelligently merge your custom classes with defaults. Add spacing, colors, or other styles without overriding the component's base styles:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`{/* Both work - classes are intelligently merged */}
<Button className="w-full">Full width button</Button>
<Card className="shadow-lg border-2">Custom styling</Card>`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Working with State */}
          <div id="managing-state" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Managing state</h2>
            <p className="text-foreground-300 mb-6">
              UI Lab components are controlled components. Manage state using React hooks:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { useState } from 'react';
import { Button, Input } from '@ui-lab/core';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="space-y-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>

      <Button onClick={() => setCount(count + 1)}>
        Count: {count}
      </Button>
    </div>
  );
}`}</code></pre>
            </div>

            <p className="text-foreground-300">
              Components emit standard events (<code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">onChange</code>, <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">onClick</code>, etc.). No custom event handlers or complex APIs to learn.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Common Patterns */}
          <div id="common-patterns" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Common patterns</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Building a form</h3>
            <p className="text-foreground-300 mb-4">
              Combine inputs, labels, and buttons to create accessible forms:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { useState } from 'react';
import { Button, Card, Input, Label } from '@ui-lab/core';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
  };

  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Contact us</Card.Title>
      </Card.Header>
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange('name')}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange('message')}
              className="w-full p-2 rounded border border-background-700"
            />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button type="submit" className="w-full">Send</Button>
        </Card.Footer>
      </form>
    </Card>
  );
}`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Next Steps */}
          <div id="next-steps" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Next steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/docs/customization" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Customization</h3>
                <p className="text-foreground-400 text-sm">Learn how to customize colors, spacing, and build component variants.</p>
              </a>
              <a href="/docs/best-practices" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Best practices</h3>
                <p className="text-foreground-400 text-sm">Write efficient, maintainable code with UI Lab components.</p>
              </a>
              <a href="/docs/accessibility" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Accessibility</h3>
                <p className="text-foreground-400 text-sm">Build inclusive interfaces with built-in a11y features.</p>
              </a>
              <a href="/docs/ai-integration" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">AI Integration</h3>
                <p className="text-foreground-400 text-sm">Generate code with AI tools using LLMs.txt.</p>
              </a>
            </div>
          </div>
        </main>
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
