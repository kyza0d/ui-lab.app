"use client";

import { TableOfContents } from "@/components/TableOfContents";
import { tocRegistry } from "@/lib/generated-toc-registry";

export default function AccessibilityPage() {
  const tocItems = tocRegistry["accessibility"] || [];

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-2xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-foreground-50 mb-4">Accessibility</h1>
            <p className="text-lg text-foreground-300">
              UI Lab components are built with accessibility first. Learn what's included and how to ensure your implementations remain accessible.
            </p>
          </div>

          {/* Built-in A11y */}
          <div id="built-in-accessibility-features" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Built-in accessibility features</h2>
            <p className="text-foreground-300 mb-6">
              All UI Lab components are built to meet WCAG 2.1 Level AA standards by default. This includes:
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Semantic HTML</h3>
            <p className="text-foreground-300 mb-6">
              Components use semantic HTML elements (<code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">&lt;button&gt;</code>, <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">&lt;input&gt;</code>, <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">&lt;label&gt;</code>, etc) instead of divs with custom behaviors. This ensures assistive technologies understand component purpose.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Keyboard navigation</h3>
            <p className="text-foreground-300 mb-6">
              All interactive components are fully keyboard accessible. Use Tab to navigate, Enter/Space to activate, Arrow keys for navigation in lists.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">ARIA attributes</h3>
            <p className="text-foreground-300 mb-6">
              Components automatically set appropriate ARIA attributes. For example, Button includes <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-disabled</code> when disabled, and Input sets <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-invalid</code> when in an error state.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Color contrast</h3>
            <p className="text-foreground-300 mb-6">
              All text and interactive elements meet WCAG AA contrast requirements (4.5:1 for text, 3:1 for large text and UI components).
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Focus management</h3>
            <p className="text-foreground-300 mb-6">
              Components maintain visible focus indicators for keyboard navigation. The focus ring is always visible and has sufficient contrast.
            </p>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Screen reader support</h3>
            <p className="text-foreground-300 mb-6">
              Components provide appropriate labels and announcements for screen readers. Buttons announce their purpose, form fields announce labels and error states.
            </p>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Forms and Labels */}
          <div id="forms-and-labels" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Forms and labels</h2>
            <p className="text-foreground-300 mb-6">
              Always associate labels with inputs using the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">htmlFor</code> attribute:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { Input, Label } from '@ui-lab/core';

export default function LoginForm() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          aria-describedby="email-hint"
        />
        <p id="email-hint" className="text-sm text-foreground-400 mt-1">
          We'll never share your email.
        </p>
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
    </div>
  );
}`}</code></pre>
            </div>

            <p className="text-foreground-300 mb-4">
              Key points for accessible forms:
            </p>
            <ul className="space-y-2 text-foreground-300 ml-4 mb-6">
              <li>• Always use <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">&lt;Label&gt;</code> with <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">htmlFor</code> attribute</li>
              <li>• Use <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-describedby</code> to link inputs with helper text</li>
              <li>• Use <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-invalid</code> and <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-errormessage</code> for errors</li>
              <li>• Mark required fields with both visual indicator and <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">required</code> attribute</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Error handling with accessibility</h3>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`import { useState } from 'react';
import { Input, Label } from '@ui-lab/core';

export default function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !value.includes('@')) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <p id="email-error" className="text-destructive-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Components and Keyboard */}
          <div id="keyboard-navigation" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Keyboard navigation</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Button keyboard support</h3>
            <p className="text-foreground-300 mb-4">
              Buttons respond to Enter and Space keys automatically:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`// All UI Lab buttons support keyboard activation
<Button onClick={() => console.log('Clicked')}>
  Click me (or press Enter/Space)
</Button>`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Tab order</h3>
            <p className="text-foreground-300 mb-4">
              Maintain logical tab order by following the visual flow of your layout. Use <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">tabIndex</code> carefully, preferably only when necessary:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`{/* Good: Tab order follows visual flow left-to-right, top-to-bottom */}
<Button>First</Button>
<Button>Second</Button>
<Button>Third</Button>

{/* Avoid: Explicit tabIndex unless absolutely necessary */}
{/* <Button tabIndex={2}>Out of order</Button> */}`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Skip links</h3>
            <p className="text-foreground-300 mb-4">
              For complex layouts, provide skip links to jump past navigation:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <nav>Navigation here</nav>

      <main id="main">Main content</main>
    </>
  );
}`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Custom ARIA */}
          <div id="adding-custom-aria-attributes" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Adding custom ARIA attributes</h2>
            <p className="text-foreground-300 mb-6">
              UI Lab components support standard ARIA attributes. Pass them through like any HTML attribute:
            </p>

            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`{/* Provide context with ARIA attributes */}
<Button
  aria-label="Delete item"
  aria-describedby="delete-warning"
>
  🗑
</Button>
<p id="delete-warning">This action cannot be undone</p>

{/* Mark components as busy during async operations */}
<Button aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>

{/* Announce live region updates */}
<div aria-live="polite" aria-atomic="true">
  {message}
</div>`}</code></pre>
            </div>

            <p className="text-foreground-300">
              Common ARIA attributes:
            </p>
            <ul className="space-y-2 text-foreground-300 ml-4 mb-6">
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-label</code> — Accessible name when label text isn't appropriate</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-describedby</code> — Links to descriptive text by ID</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-invalid</code> — Indicates validation errors</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-busy</code> — Indicates loading or processing state</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-live</code> — Announces dynamic content to screen readers</li>
              <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-expanded</code> — Indicates if collapsible content is open</li>
            </ul>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Testing Accessibility */}
          <div id="testing-accessibility" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Testing accessibility</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Manual testing</h3>
            <p className="text-foreground-300 mb-4">
              Test keyboard navigation yourself:
            </p>
            <ul className="space-y-2 text-foreground-300 ml-4 mb-6">
              <li>• Use Tab key to navigate all interactive elements</li>
              <li>• Verify focus indicator is always visible</li>
              <li>• Test all interactions using keyboard only (no mouse)</li>
              <li>• Check that focus doesn't jump unexpectedly</li>
              <li>• Verify form labels are properly associated</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Automated testing tools</h3>
            <p className="text-foreground-300 mb-4">
              Use browser tools to check accessibility:
            </p>
            <ul className="space-y-2 text-foreground-300 ml-4 mb-6">
              <li>• <strong>axe DevTools</strong> — Browser extension for accessibility audits</li>
              <li>• <strong>Lighthouse</strong> — Chrome DevTools built-in accessibility checks</li>
              <li>• <strong>WAVE</strong> — Browser extension to visualize accessibility issues</li>
              <li>• <strong>Pa11y</strong> — Command-line accessibility testing</li>
              <li>• <strong>Jest and @testing-library/a11y</strong> — Automated testing in your test suite</li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Screen reader testing</h3>
            <p className="text-foreground-300 mb-6">
              Test with actual screen readers on your platform:
            </p>
            <ul className="space-y-2 text-foreground-300 ml-4">
              <li>• <strong>macOS</strong> — VoiceOver (built-in, Cmd+F5)</li>
              <li>• <strong>Windows</strong> — NVDA (free) or JAWS (paid)</li>
              <li>• <strong>iOS</strong> — VoiceOver (built-in, Settings → Accessibility)</li>
              <li>• <strong>Android</strong> — TalkBack (built-in, Settings → Accessibility)</li>
            </ul>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Common Mistakes */}
          <div id="common-accessibility-mistakes-to-avoid" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Common accessibility mistakes to avoid</h2>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Using divs for buttons</h3>
            <p className="text-foreground-300 mb-4">
              Always use the Button component instead of styling divs as buttons:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`// ❌ Don't do this
<div onClick={handleClick} className="bg-blue-500 p-2 rounded">
  Click me
</div>

// ✅ Do this
<Button onClick={handleClick}>
  Click me
</Button>`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Missing form labels</h3>
            <p className="text-foreground-300 mb-4">
              Always use Label components with proper associations:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`// ❌ Don't do this
<Input placeholder="Email" />

// ✅ Do this
<Label htmlFor="email">Email</Label>
<Input id="email" placeholder="you@example.com" />`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Relying only on color for meaning</h3>
            <p className="text-foreground-300 mb-4">
              Don't use color alone to communicate important information:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`// ❌ Don't do this
<p className="text-red-500">Error</p>

// ✅ Do this
<p className="text-destructive-500">
  ⚠️ Error: Please check your input
</p>`}</code></pre>
            </div>

            <h3 className="text-lg font-semibold text-foreground-100 mb-4">Poor focus management</h3>
            <p className="text-foreground-300 mb-4">
              Don't hide focus indicators with <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">outline: none</code> or insufficient contrast:
            </p>
            <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
              <pre className="text-sm text-foreground-300"><code>{`// ❌ Don't do this
button {
  outline: none; /* Removes default focus indicator! */
}

// ✅ Do this (UI Lab does this by default)
button:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}`}</code></pre>
            </div>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Resources */}
          <div id="resources" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Resources</h2>
            <ul className="space-y-3 text-foreground-300">
              <li>• <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="text-accent-500 hover:text-accent-400 underline">WCAG 2.1 Quick Reference</a> — Official web content accessibility guidelines</li>
              <li>• <a href="https://www.w3.org/WAI/tutorials/" className="text-accent-500 hover:text-accent-400 underline">WAI Web Accessibility Tutorials</a> — Step-by-step accessibility guides</li>
              <li>• <a href="https://www.a11y-101.com/" className="text-accent-500 hover:text-accent-400 underline">A11y 101</a> — Accessibility basics and best practices</li>
              <li>• <a href="https://dequeuniversity.com/" className="text-accent-500 hover:text-accent-400 underline">Deque University</a> — Comprehensive accessibility training</li>
            </ul>
          </div>

          <div className="border-t border-background-700 my-16"></div>

          {/* Next Steps */}
          <div id="next-steps" className="mb-16">
            <h2 className="text-2xl font-bold text-foreground-50 mb-6">Next steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/docs/getting-started" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Getting started</h3>
                <p className="text-foreground-400 text-sm">Learn how to build components with accessibility in mind.</p>
              </a>
              <a href="/docs/best-practices" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
                <h3 className="text-foreground-50 font-semibold mb-2">Best practices</h3>
                <p className="text-foreground-400 text-sm">Learn patterns for building accessible, maintainable code.</p>
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
