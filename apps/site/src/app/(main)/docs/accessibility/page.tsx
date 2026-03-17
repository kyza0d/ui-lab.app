import Link from "next/link";
import { Metadata } from "next";
import { DocumentationHeader } from "@/features/docs/components/documentation-header";
import { generateMetadata as buildMetadata } from "@/shared/lib/metadata";

export const metadata: Metadata = buildMetadata({
  pathname: "/docs/accessibility",
  title: "Accessibility",
  description: "Accessibility features and implementation guidance for building inclusive interfaces with UI Lab.",
});

function FormsAndLabelsSection() {
  return (
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
  );
}

function KeyboardNavigationSection() {
  return (
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
  );
}

function AriaAttributesSection() {
  return (
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
        <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-label</code> — Accessible name when label text isn&apos;t appropriate</li>
        <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-describedby</code> — Links to descriptive text by ID</li>
        <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-invalid</code> — Indicates validation errors</li>
        <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-busy</code> — Indicates loading or processing state</li>
        <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-live</code> — Announces dynamic content to screen readers</li>
        <li>• <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">aria-expanded</code> — Indicates if collapsible content is open</li>
      </ul>
    </div>
  );
}

function TestingAccessibilitySection() {
  return (
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
        <li>• Check that focus doesn&apos;t jump unexpectedly</li>
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
  );
}

function CommonMistakesSection() {
  return (
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
        Don&apos;t use color alone to communicate important information:
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
        Don&apos;t hide focus indicators with <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">outline: none</code> or insufficient contrast:
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
  );
}

function ResourcesSection() {
  return (
    <div id="resources" className="mb-16">
      <h2 className="text-2xl font-bold text-foreground-50 mb-6">Resources</h2>
      <ul className="space-y-3 text-foreground-300">
        <li>• <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="text-accent-500 hover:text-accent-400 underline">WCAG 2.1 Quick Reference</a> — Official web content accessibility guidelines</li>
        <li>• <a href="https://www.w3.org/WAI/tutorials/" className="text-accent-500 hover:text-accent-400 underline">WAI Web Accessibility Tutorials</a> — Step-by-step accessibility guides</li>
        <li>• <a href="https://www.a11y-101.com/" className="text-accent-500 hover:text-accent-400 underline">A11y 101</a> — Accessibility basics and best practices</li>
        <li>• <a href="https://dequeuniversity.com/" className="text-accent-500 hover:text-accent-400 underline">Deque University</a> — Comprehensive accessibility training</li>
      </ul>
    </div>
  );
}

function AccessibilityNextStepsSection() {
  return (
    <div id="next-steps" className="mb-16">
      <h2 className="text-2xl font-bold text-foreground-50 mb-6">Next steps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/docs/getting-started" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
          <h3 className="text-foreground-50 font-semibold mb-2">Getting started</h3>
          <p className="text-foreground-400 text-sm">Learn how to build components with accessibility in mind.</p>
        </Link>
        <Link href="/docs/best-practices" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
          <h3 className="text-foreground-50 font-semibold mb-2">Best practices</h3>
          <p className="text-foreground-400 text-sm">Learn patterns for building accessible, maintainable code.</p>
        </Link>
      </div>
    </div>
  );
}

function AccessibilityContent() {
  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main>
          <DocumentationHeader title="Accessibility"
            description="Accessibility features and guidelines for building inclusive interfaces."
          />

          <FormsAndLabelsSection />
          <div className="border-t border-background-700 my-16"></div>
          <KeyboardNavigationSection />
          <div className="border-t border-background-700 my-16"></div>
          <AriaAttributesSection />
          <div className="border-t border-background-700 my-16"></div>
          <TestingAccessibilitySection />
          <div className="border-t border-background-700 my-16"></div>
          <CommonMistakesSection />
          <div className="border-t border-background-700 my-16"></div>
          <ResourcesSection />
          <div className="border-t border-background-700 my-16"></div>
          <AccessibilityNextStepsSection />
        </main>
      </div>
    </div>
  );
}

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
