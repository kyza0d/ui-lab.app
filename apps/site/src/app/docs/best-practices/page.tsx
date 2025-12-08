"use client";

import { TableOfContents } from "@/components/TableOfContents";

export default function BestPracticesPage() {
  const tocItems = [
    { id: "component-composition", title: "Component composition" },
    { id: "state-management", title: "State management" },
    { id: "performance-optimization", title: "Performance optimization" },
    { id: "typescript-best-practices", title: "TypeScript best practices" },
    { id: "responsive-design", title: "Responsive design" },
    { id: "common-patterns", title: "Common patterns" },
    { id: "next-steps", title: "Next steps" },
  ];

  return (
    <div className="w-full bg-background-950">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-4xl mx-auto w-full px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-foreground-50 mb-4">Best practices</h1>
          <p className="text-lg text-foreground-300">
            Patterns and guidelines for building scalable, maintainable interfaces with UI Lab components.
          </p>
        </div>

        {/* Component Composition */}
        <div id="component-composition" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Component composition</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Use compound components effectively</h3>
          <p className="text-foreground-300 mb-4">
            Components like Card, Dialog, and Tabs use the compound component pattern. Leverage their slots to build consistent layouts:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { Card, Button } from '@ui-lab/core';

// ✅ Use compound components
export default function UserCard({ user }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{user.name}</Card.Title>
        <Card.Description>{user.email}</Card.Description>
      </Card.Header>
      <Card.Content>
        {/* Content here */}
      </Card.Content>
      <Card.Footer>
        <Button>Edit</Button>
      </Card.Footer>
    </Card>
  );
}`}</code></pre>
          </div>

          <p className="text-foreground-300 mb-4">
            This approach maintains consistent spacing and semantic structure across your app.
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Wrap components for project-specific needs</h3>
          <p className="text-foreground-300 mb-4">
            Create wrapper components for common patterns in your project:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// components/PrimaryButton.tsx
import { Button, type ButtonProps } from '@ui-lab/core';

export default function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" size="md" {...props} />;
}

// components/FormField.tsx
import { Label, Input } from '@ui-lab/core';

interface FormFieldProps {
  label: string;
  error?: string;
  [key: string]: any;
}

export default function FormField({
  label,
  error,
  ...inputProps
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={inputProps.id}>{label}</Label>
      <Input
        aria-invalid={!!error}
        aria-describedby={error ? \`\${inputProps.id}-error\` : undefined}
        {...inputProps}
      />
      {error && (
        <p id={\`\${inputProps.id}-error\`} className="text-destructive-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}`}</code></pre>
          </div>

          <p className="text-foreground-300">
            Wrapper components let you enforce patterns and reduce repetition without forking component source.
          </p>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* State Management */}
        <div id="state-management" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">State management</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Keep component state simple</h3>
          <p className="text-foreground-300 mb-4">
            UI Lab components are controlled components. Manage form state with React hooks or your state management solution:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { useState } from 'react';
import { Button, Input, Card } from '@ui-lab/core';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setErrors({ submit: 'Failed to send message' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>Contact us</Card.Title>
      </Card.Header>
      <form onSubmit={handleSubmit}>
        <Card.Content className="space-y-4">
          <Input
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange('name')}
          />
          <Input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange('email')}
          />
          <textarea
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange('message')}
            className="w-full p-2 rounded border border-background-700"
          />
        </Card.Content>
        <Card.Footer>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Separate concerns with custom hooks</h3>
          <p className="text-foreground-300 mb-4">
            Extract form logic into custom hooks for reuse:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// hooks/useForm.ts
import { useState } from 'react';

export function useForm(onSubmit) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

// Usage in component
import { useForm } from '@/hooks/useForm';
import { Card, Button, Input } from '@ui-lab/core';

export default function SignupForm() {
  const { values, handleChange, handleSubmit, isSubmitting } = useForm(
    async (data) => {
      await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input name="email" value={values.email} onChange={handleChange} />
      <Button type="submit" disabled={isSubmitting}>Sign up</Button>
    </form>
  );
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Performance */}
        <div id="performance-optimization" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Performance optimization</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Use React.memo for list items</h3>
          <p className="text-foreground-300 mb-4">
            When rendering long lists, memoize list items to prevent unnecessary re-renders:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { memo } from 'react';
import { Card, Button } from '@ui-lab/core';

const ListItem = memo(function ListItem({ item, onDelete }) {
  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-foreground-400 text-sm">{item.description}</p>
      </div>
      <Button variant="destructive" onClick={() => onDelete(item.id)}>
        Delete
      </Button>
    </Card>
  );
});

export default function ItemList({ items, onDelete }) {
  return (
    <div className="space-y-2">
      {items.map(item => (
        <ListItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Lazy load dialogs and modals</h3>
          <p className="text-foreground-300 mb-4">
            Use dynamic imports for heavy components shown conditionally:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { lazy, Suspense, useState } from 'react';
import { Button } from '@ui-lab/core';

const SettingsDialog = lazy(() => import('./SettingsDialog'));

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Button onClick={() => setShowSettings(true)}>
        Settings
      </Button>
      {showSettings && (
        <Suspense fallback={<div>Loading...</div>}>
          <SettingsDialog onClose={() => setShowSettings(false)} />
        </Suspense>
      )}
    </>
  );
}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Minimize className computations</h3>
          <p className="text-foreground-300 mb-4">
            Avoid computing className inline. Move it outside render:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// ❌ Don't do this - className computed every render
export default function Item({ isActive }) {
  return (
    <div className={isActive ? 'bg-accent-500' : 'bg-background-800'}>
      Item
    </div>
  );
}

// ✅ Do this - className computed once
const itemClassName = (isActive: boolean) =>
  isActive ? 'bg-accent-500' : 'bg-background-800';

export default function Item({ isActive }) {
  return <div className={itemClassName(isActive)}>Item</div>;
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Type Safety */}
        <div id="typescript-best-practices" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">TypeScript best practices</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Type component props properly</h3>
          <p className="text-foreground-300 mb-4">
            Always define props interfaces for better type safety and documentation:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { Button, Card } from '@ui-lab/core';

interface UserCardProps {
  userId: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function UserCard({
  userId,
  onEdit,
  onDelete,
}: UserCardProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title>User #{userId}</Card.Title>
      </Card.Header>
      <Card.Footer className="gap-2">
        {onEdit && <Button onClick={() => onEdit(userId)}>Edit</Button>}
        {onDelete && (
          <Button variant="destructive" onClick={() => onDelete(userId)}>
            Delete
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Extend component prop types</h3>
          <p className="text-foreground-300 mb-4">
            Reuse UI Lab component types when creating wrappers:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { Button, type ButtonProps } from '@ui-lab/core';

interface PrimaryButtonProps extends ButtonProps {
  icon?: React.ReactNode;
}

export default function PrimaryButton({
  icon,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button variant="primary" {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {props.children}
    </Button>
  );
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Responsive Design */}
        <div id="responsive-design" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Responsive design</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Use Tailwind responsive prefixes</h3>
          <p className="text-foreground-300 mb-4">
            Build responsive layouts with Tailwind's responsive utilities:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`import { Card, Button } from '@ui-lab/core';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <Card.Header>
          <Card.Title className="text-lg md:text-xl">
            Revenue
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <p className="text-2xl md:text-3xl font-bold">$4,231</p>
        </Card.Content>
      </Card>
      {/* More cards */}
    </div>
  );
}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Test on real devices</h3>
          <p className="text-foreground-300 mb-4">
            Browser DevTools responsive mode is helpful, but test on real devices. Common breakpoints:
          </p>
          <ul className="space-y-2 text-foreground-300 ml-4">
            <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">sm: 640px</code> — Small phones</li>
            <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">md: 768px</code> — Tablets</li>
            <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">lg: 1024px</code> — Laptops</li>
            <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">xl: 1280px</code> — Desktops</li>
          </ul>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Common Patterns */}
        <div id="common-patterns" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Common patterns</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Conditional rendering</h3>
          <p className="text-foreground-300 mb-4">
            Use concise conditional rendering:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// ✅ Good
{isLoading && <div>Loading...</div>}
{error && <p className="text-destructive-500">{error}</p>}
{data && <Card>{data.name}</Card>}

// ❌ Avoid
{isLoading ? <div>Loading...</div> : null}
{error ? <p>{error}</p> : null}
{data ? <Card>{data.name}</Card> : null}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Event handler naming</h3>
          <p className="text-foreground-300 mb-4">
            Name handlers consistently with handle prefix:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`export default function Form() {
  const handleSubmit = (e) => { /* ... */ };
  const handleReset = () => { /* ... */ };
  const handleInputChange = (e) => { /* ... */ };
  const handleDelete = (id) => { /* ... */ };

  return (
    <form onSubmit={handleSubmit}>
      <Input onChange={handleInputChange} />
      <Button type="submit">Submit</Button>
      <Button onClick={handleReset}>Reset</Button>
      <Button onClick={() => handleDelete(id)}>Delete</Button>
    </form>
  );
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Next Steps */}
        <div id="next-steps" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Next steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/docs/accessibility" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
              <h3 className="text-foreground-50 font-semibold mb-2">Accessibility</h3>
              <p className="text-foreground-400 text-sm">Ensure your implementations are accessible to all users.</p>
            </a>
            <a href="/docs/customization" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
              <h3 className="text-foreground-50 font-semibold mb-2">Customization</h3>
              <p className="text-foreground-400 text-sm">Learn how to customize and extend components for your needs.</p>
            </a>
            <a href="/docs/troubleshooting" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
              <h3 className="text-foreground-50 font-semibold mb-2">Troubleshooting</h3>
              <p className="text-foreground-400 text-sm">Find solutions to common issues and frequently asked questions.</p>
            </a>
            <a href="/docs/ai-integration" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
              <h3 className="text-foreground-50 font-semibold mb-2">AI Integration</h3>
              <p className="text-foreground-400 text-sm">Use AI tools to generate components that follow these patterns.</p>
            </a>
          </div>
        </div>
        </main>
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
