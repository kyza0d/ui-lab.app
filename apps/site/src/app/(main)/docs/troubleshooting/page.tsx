"use client";

import { useState } from "react";
import { TableOfContents } from "@/features/docs";
import { tocRegistry } from "@/features/docs";

export default function TroubleshootingPage() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const tocItems = tocRegistry["troubleshooting"] || [];

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const FAQItem = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border border-background-700 rounded">
      <button
        onClick={() => toggleItem(id)}
        className="w-full px-6 py-4 text-left font-semibold text-foreground-50 hover:bg-background-900 transition-colors flex items-center justify-between"
      >
        {title}
        <span className="text-lg">{expandedItems[id] ? "−" : "+"}</span>
      </button>
      {expandedItems[id] && (
        <div className="px-6 py-4 border-t border-background-700 text-foreground-300">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-foreground-50 mb-4">Troubleshooting & FAQ</h1>
          <p className="text-lg text-foreground-300">
            Solutions to common issues and frequently asked questions about UI Lab.
          </p>
        </div>

        {/* Installation Issues */}
        <div id="installation-issues" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Installation issues</h2>

          <div className="space-y-3">
            <FAQItem id="install-1" title="Module not found: '@ui-lab/core'">
              <div className="space-y-3">
                <p>
                  This error occurs when the package isn't installed or the node_modules are out of sync.
                </p>
                <p className="font-semibold">Solution:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300">
                    <code>{`# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Or with pnpm
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install`}</code>
                  </pre>
                </div>
                <p>
                  Ensure <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">@ui-lab/core</code> is listed in your <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">package.json</code> dependencies.
                </p>
              </div>
            </FAQItem>

            <FAQItem id="install-2" title="Tailwind CSS not working after installing UI Lab">
              <div className="space-y-3">
                <p>
                  This usually means Tailwind's content configuration doesn't include UI Lab components.
                </p>
                <p className="font-semibold">Solution:</p>
                <p>Update your <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">tailwind.config.js</code>:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@ui-lab/core/**/*.js", // Add this line
  ],
  theme: { /* ... */ },
};`}</code></pre>
                </div>
                <p>
                  Then restart your dev server: <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">npm run dev</code>
                </p>
              </div>
            </FAQItem>

            <FAQItem id="install-3" title="Global styles not loading">
              <div className="space-y-3">
                <p>
                  If components render but lack styling, your global CSS import might be missing.
                </p>
                <p className="font-semibold">Solution:</p>
                <p>Ensure <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">globals.css</code> is imported in your app root:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`// app/layout.tsx (Next.js)
import './globals.css';

export default function RootLayout({ children }) {
  return <html>{children}</html>;
}

// src/main.tsx (Vite)
import './globals.css';
import App from './App';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(<App />);`}</code></pre>
                </div>
              </div>
            </FAQItem>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Styling Issues */}
        <div id="styling-issues" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Styling issues</h2>

          <div className="space-y-3">
            <FAQItem id="style-1" title="Components look unstyled or have default browser styles">
              <div className="space-y-3">
                <p>
                  This means UI Lab's base styles aren't loading. Check your CSS import chain.
                </p>
                <p className="font-semibold">Verify:</p>
                <ul className="space-y-2 ml-4">
                  <li>1. <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">globals.css</code> is imported in your app root</li>
                  <li>2. <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">@import '@ui-lab/core/styles/base.css';</code> is in globals.css</li>
                  <li>3. Dev server is running and CSS files are being served</li>
                  <li>4. Check browser DevTools → Elements → Styles to see if Tailwind classes are applied</li>
                </ul>
              </div>
            </FAQItem>

            <FAQItem id="style-2" title="Colors don't look right or seem inverted">
              <div className="space-y-3">
                <p>
                  UI Lab's base palette automatically inverts in light mode. Verify your theme setup.
                </p>
                <p className="font-semibold">Check:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`/* globals.css should define the base palette correctly */
@theme {
  --color-base-50: #ffffff;   /* Light in dark mode */
  --color-base-100: #f8f8f8;
  /* ... */
  --color-base-900: #1a1a1a;  /* Dark in dark mode */
  --color-base-950: #0f0f0f;
}`}</code></pre>
                </div>
                <p>
                  If colors are inverted, swap the light and dark values in your @theme declaration.
                </p>
              </div>
            </FAQItem>

            <FAQItem id="style-3" title="Custom className doesn't apply to components">
              <div className="space-y-3">
                <p>
                  UI Lab merges custom classes with defaults. If a base style has higher specificity, it wins.
                </p>
                <p className="font-semibold">Solution:</p>
                <p>Use Tailwind's important modifier or adjust your override approach:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`// Add !important modifier if needed
<Button className="!bg-custom-color">Submit</Button>

// Or wrap the component
<div className="bg-custom-color rounded">
  <Button className="w-full">Submit</Button>
</div>`}</code></pre>
                </div>
              </div>
            </FAQItem>

            <FAQItem id="style-4" title="Spacing doesn't match my design">
              <div className="space-y-3">
                <p>
                  UI Lab uses a consistent 0.25rem (4px) spacing scale. You can customize this in your design tokens.
                </p>
                <p className="font-semibold">To adjust spacing:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`/* globals.css or tailwind.config.js */
@theme {
  --spacing: 0.25rem; /* Default, change to custom value */
}`}</code></pre>
                </div>
                <p>
                  Or override specific spacing values via Tailwind config extend.
                </p>
              </div>
            </FAQItem>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Component Issues */}
        <div id="component-behavior-issues" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Component behavior issues</h2>

          <div className="space-y-3">
            <FAQItem id="comp-1" title="Button doesn't respond to clicks">
              <div className="space-y-3">
                <p>
                  Ensure the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">onClick</code> handler is passed correctly and the button isn't disabled.
                </p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`// ✅ Correct
<Button onClick={() => handleSubmit()}>Click me</Button>

// ❌ Incorrect
<Button onClick={handleSubmit()}>Click me</Button> {/* Calls immediately */}

// Check if disabled
<Button disabled={isDisabled} onClick={handleClick}>
  {isDisabled ? 'Disabled' : 'Click me'}
</Button>`}</code></pre>
                </div>
              </div>
            </FAQItem>

            <FAQItem id="comp-2" title="Input value doesn't update when typing">
              <div className="space-y-3">
                <p>
                  UI Lab inputs are controlled components. You must provide value and onChange handlers.
                </p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`// ❌ Won't update
<Input placeholder="Type..." />

// ✅ Correct
const [value, setValue] = useState('');
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Type..."
/>`}</code></pre>
                </div>
              </div>
            </FAQItem>

            <FAQItem id="comp-3" title="Card or Dialog doesn't render as expected">
              <div className="space-y-3">
                <p>
                  Compound components require specific slot structure. Missing slots might cause unexpected layout.
                </p>
                <p className="font-semibold">Example for Card:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`// ✅ Complete structure
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content here</Card.Content>
  <Card.Footer>Footer</Card.Footer>
</Card>

// ✅ Minimal structure (still works)
<Card>
  <Card.Content>Just content</Card.Content>
</Card>`}</code></pre>
                </div>
              </div>
            </FAQItem>

            <FAQItem id="comp-4" title="Form validation errors not showing">
              <div className="space-y-3">
                <p>
                  Ensure error states and messages are properly set and connected via aria attributes.
                </p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-3">
                  <pre className="text-sm text-foreground-300"><code>{`const [error, setError] = useState('');

<>
  <Input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    aria-invalid={!!error}
    aria-describedby={error ? 'error-msg' : undefined}
  />
  {error && (
    <p id="error-msg" className="text-destructive-500 text-sm mt-1">
      {error}
    </p>
  )}
</>`}</code></pre>
                </div>
              </div>
            </FAQItem>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* General Questions */}
        <div id="general-questions" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">General questions</h2>

          <div className="space-y-3">
            <FAQItem id="general-1" title="Can I use UI Lab with Create React App?">
              <div className="space-y-3">
                <p>
                  Yes, UI Lab works with Create React App. Follow the manual installation steps for Vite, which apply to CRA projects as well.
                </p>
                <p className="text-sm text-foreground-400">
                  Note: CRA doesn't support Tailwind CSS 4's <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">@theme</code> directive out of the box. You may need to eject or use a custom setup.
                </p>
              </div>
            </FAQItem>

            <FAQItem id="general-2" title="Can I use UI Lab with TypeScript?">
              <div className="space-y-3">
                <p>
                  Absolutely. UI Lab is built with TypeScript and provides full type support. All components export TypeScript interfaces.
                </p>
                <p className="font-semibold">Example:</p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto">
                  <pre className="text-sm text-foreground-300"><code>{`import { Button, type ButtonProps } from '@ui-lab/core';

export interface MyButtonProps extends ButtonProps {
  loading?: boolean;
}

export function MyButton({ loading, ...props }: MyButtonProps) {
  return <Button {...props}>{loading ? 'Loading...' : props.children}</Button>;
}`}</code></pre>
                </div>
              </div>
            </FAQItem>

            <FAQItem id="general-3" title="Can I customize components without copying source?">
              <div className="space-y-3">
                <p>
                  Use the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">className</code> prop to extend styles, or wrap components for custom behavior:
                </p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto">
                  <pre className="text-sm text-foreground-300"><code>{`// Style customization
<Button className="px-8 py-4 rounded-xl">Large button</Button>

// Behavior wrapping
function MyButton(props) {
  return <Button variant="primary" size="lg" {...props} />;
}`}</code></pre>
                </div>
                <p>
                  For more complex customization, see <a href="/docs/customization" className="text-accent-500 hover:text-accent-400 underline">Customization</a> guide.
                </p>
              </div>
            </FAQItem>

            <FAQItem id="general-4" title="How do I report bugs?">
              <div className="space-y-3">
                <p>
                  Found a bug? Please report it on the <a href="https://github.com/ui-lab/core/issues" className="text-accent-500 hover:text-accent-400 underline">GitHub Issues</a> page.
                </p>
                <p>Include:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Steps to reproduce</li>
                  <li>• Expected vs actual behavior</li>
                  <li>• Browser and OS version</li>
                  <li>• Minimal code example</li>
                </ul>
              </div>
            </FAQItem>

            <FAQItem id="general-5" title="Can I use UI Lab in production?">
              <div className="space-y-3">
                <p>
                  Yes. UI Lab is production-ready. It's actively maintained and follows semantic versioning.
                </p>
                <p>
                  Check the <a href="https://github.com/ui-lab/core" className="text-accent-500 hover:text-accent-400 underline">GitHub repository</a> for the latest version and changelog.
                </p>
              </div>
            </FAQItem>

            <FAQItem id="general-6" title="What's the bundle size impact?">
              <div className="space-y-3">
                <p>
                  UI Lab uses tree-shaking, so you only bundle the components you use. A minimal import (Button + Input) adds ~5-10KB gzipped.
                </p>
                <p>
                  Check your actual bundle size:
                </p>
                <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto">
                  <pre className="text-sm text-foreground-300">
                    <code>npm run build && du -h .next/static/chunks/main.js</code>
                  </pre>
                </div>
              </div>
            </FAQItem>

            <FAQItem id="general-7" title="How do I migrate from another component library?">
              <div className="space-y-3">
                <p>
                  UI Lab components follow standard React patterns. Most migration involves:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>1. Update imports from your old library to UI Lab</li>
                  <li>2. Adjust prop names (they're similar but may differ)</li>
                  <li>3. Update styling using Tailwind classes</li>
                  <li>4. Test accessibility with keyboard and screen readers</li>
                </ul>
                <p>
                  See <a href="/docs/getting-started" className="text-accent-500 hover:text-accent-400 underline">Getting Started</a> for component API reference.
                </p>
              </div>
            </FAQItem>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Getting Help */}
        <div id="getting-help" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Getting help</h2>
          <div className="space-y-4">
            <div className="border border-background-700 rounded p-6">
              <h3 className="text-foreground-50 font-semibold mb-2">Documentation</h3>
              <p className="text-foreground-300">
                Browse all <a href="/docs" className="text-accent-500 hover:text-accent-400 underline">documentation</a> for comprehensive guides and API references.
              </p>
            </div>
            <div className="border border-background-700 rounded p-6">
              <h3 className="text-foreground-50 font-semibold mb-2">GitHub Issues</h3>
              <p className="text-foreground-300">
                Check <a href="https://github.com/ui-lab/core/issues" className="text-accent-500 hover:text-accent-400 underline">open issues</a> or report new bugs.
              </p>
            </div>
            <div className="border border-background-700 rounded p-6">
              <h3 className="text-foreground-50 font-semibold mb-2">Community</h3>
              <p className="text-foreground-300">
                Ask questions and share your projects in the UI Lab community forums.
              </p>
            </div>
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
