"use client";

import { TableOfContents } from "@/components/TableOfContents";

export default function CustomizationPage() {
  const tocItems = [
    { id: "design-tokens", title: "Design tokens" },
    { id: "color-system", title: "Color system" },
    { id: "typography", title: "Typography" },
    { id: "spacing-and-sizing", title: "Spacing and sizing" },
    { id: "creating-component-variants", title: "Creating component variants" },
    { id: "extending-tailwind-configuration", title: "Extending Tailwind configuration" },
    { id: "theme-switching", title: "Theme switching" },
    { id: "customization-best-practices", title: "Customization best practices" },
    { id: "next-steps", title: "Next steps" },
  ];

  return (
    <div className="w-full bg-background-950">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-4xl mx-auto w-full px-8 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-foreground-50 mb-4">Customization</h1>
          <p className="text-lg text-foreground-300">
            Customize UI Lab's design system to match your brand and requirements using Tailwind CSS design tokens.
          </p>
        </div>

        {/* Design Tokens Overview */}
        <div id="design-tokens" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Design tokens</h2>
          <p className="text-foreground-300 mb-6">
            UI Lab uses Tailwind CSS design tokens (CSS variables) to control all visual aspects. Modify tokens in your <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">globals.css</code> file to customize the entire design system:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`/* globals.css */
@theme {
  --color-base-50: #ffffff;
  --color-base-100: #f8f8f8;
  --color-base-200: #efefef;
  /* ... continues to 950 */

  --spacing: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
}`}</code></pre>
          </div>

          <p className="text-foreground-300">
            All components automatically use these tokens. Change a single token and it updates across your entire application.
          </p>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Color System */}
        <div id="color-system" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Color system</h2>
          <p className="text-foreground-300 mb-6">
            UI Lab's base palette automatically inverts across light and dark modes. The palette runs from 50 (lightest) to 950 (darkest).
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Understanding the base palette</h3>
          <p className="text-foreground-300 mb-4">
            In dark mode (default), lower values (50-400) are light colors used for text and overlays. Higher values (600-950) are dark colors for backgrounds.
          </p>
          <p className="text-foreground-300 mb-6">
            In light mode, this inverts: lower values become dark, higher values become light. This semantic approach eliminates the need to manage separate color systems.
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`/* Dark mode (default) */
--color-base-50: #ffffff;    /* lightest, for text */
--color-base-100: #f8f8f8;
--color-base-200: #efefef;
--color-base-900: #1a1a1a;   /* darkest, for bg */
--color-base-950: #0f0f0f;

/* Light mode inverts these automatically */`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Custom brand colors</h3>
          <p className="text-foreground-300 mb-4">
            Add accent colors for your brand. Keep the base palette but extend it with semantic colors:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`@theme {
  /* Keep base palette as-is */
  --color-base-50: #ffffff;
  /* ... */

  /* Add accent colors */
  --color-accent-500: #0066ff;
  --color-accent-600: #0052cc;
  --color-accent-700: #003d99;

  /* Semantic colors */
  --color-success-500: #10b981;
  --color-warning-500: #f59e0b;
  --color-destructive-500: #ef4444;
}`}</code></pre>
          </div>

          <p className="text-foreground-300">
            Use these colors in components via Tailwind classes:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`<Button className="bg-accent-500 hover:bg-accent-600">
  Branded Action
</Button>`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Typography */}
        <div id="typography" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Typography</h2>
          <p className="text-foreground-300 mb-6">
            Customize fonts, sizes, and weights through Tailwind configuration:
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Font families</h3>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
}`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Font sizes</h3>
          <p className="text-foreground-300 mb-4">
            UI Lab uses a modular scale for sizes. Adjust in Tailwind config:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`export default {
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
    },
  },
};`}</code></pre>
          </div>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Font weights</h3>
          <p className="text-foreground-300 mb-4">
            Components use specific weights. Define available weights:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`@theme {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Spacing */}
        <div id="spacing-and-sizing" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Spacing and sizing</h2>
          <p className="text-foreground-300 mb-6">
            UI Lab uses a consistent spacing scale. The base unit is 0.25rem (4px):
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`@theme {
  --spacing: 0.25rem; /* 4px base unit */

  /* Components use multiples */
  /* spacing-1 = 0.25rem, spacing-2 = 0.5rem, etc */
}

/* Use in components */
<div className="p-4 gap-6 m-8">
  {/* p-4 = 1rem, gap-6 = 1.5rem, m-8 = 2rem */}
</div>`}</code></pre>
          </div>

          <p className="text-foreground-300">
            Border radius follows the same consistent scale:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`@theme {
  --radius-sm: 0.375rem;    /* 6px */
  --radius-md: 0.5rem;      /* 8px */
  --radius-lg: 0.75rem;     /* 12px */
  --radius-full: 9999px;
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Component Variants */}
        <div id="creating-component-variants" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Creating component variants</h2>
          <p className="text-foreground-300 mb-6">
            UI Lab components support the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">variant</code> prop. Create custom variants by extending component source:
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Example: Custom button variant</h3>
          <p className="text-foreground-300 mb-4">
            If you copied component source into <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">src/components/ui/button.tsx</code>, you can add variants:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// components/ui/button.tsx
const variants = cva('base-button-styles', {
  variants: {
    variant: {
      primary: 'bg-accent-500 text-background-950',
      secondary: 'bg-background-800 text-foreground-50',
      tertiary: 'bg-transparent text-accent-500',
      destructive: 'bg-destructive-500 text-white',
      outline: 'border border-accent-500 text-accent-500',
      // Add your custom variant
      gradient: 'bg-gradient-to-r from-accent-500 to-accent-600',
    },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', ...props }, ref) => (
    <button ref={ref} className={variants({ variant })} {...props} />
  ),
);`}</code></pre>
          </div>

          <p className="text-foreground-300">
            Use your custom variant:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`<Button variant="gradient">Gradient Button</Button>`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Using Tailwind Extend */}
        <div id="extending-tailwind-configuration" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Extending Tailwind configuration</h2>
          <p className="text-foreground-300 mb-6">
            Add project-specific utilities and styles through Tailwind's extend mechanism:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: '#0066ff',
        'brand-light': '#e6f0ff',
      },
      spacing: {
        gutter: '1.5rem',
        'gutter-lg': '3rem',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
      },
    },
  },
};`}</code></pre>
          </div>

          <p className="text-foreground-300">
            Use these custom utilities in your components:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`<div className="p-gutter bg-brand-light rounded animate-slideDown">
  Custom styled element
</div>`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Dark Mode */}
        <div id="theme-switching" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Theme switching</h2>
          <p className="text-foreground-300 mb-6">
            UI Lab's base palette automatically inverts in light mode. Implement theme switching at your app root:
          </p>

          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`// app/layout.tsx
'use client';

import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <html data-theme={theme}>
      <body>
        <button onClick={toggleTheme}>
          Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </button>
        {children}
      </body>
    </html>
  );
}`}</code></pre>
          </div>

          <p className="text-foreground-300 mb-4">
            In your CSS, use the <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">data-theme</code> attribute to adjust tokens:
          </p>
          <div className="bg-background-900 rounded border border-background-700 p-4 overflow-x-auto mb-6">
            <pre className="text-sm text-foreground-300"><code>{`/* globals.css */
html[data-theme="dark"] {
  @theme {
    --color-base-50: #ffffff;
    --color-base-950: #0f0f0f;
  }
}

html[data-theme="light"] {
  @theme {
    --color-base-50: #0f0f0f;
    --color-base-950: #ffffff;
  }
}`}</code></pre>
          </div>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Best Practices */}
        <div id="customization-best-practices" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Customization best practices</h2>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Use design tokens, not hard-coded values</h3>
          <p className="text-foreground-300 mb-6">
            Define tokens once in <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">globals.css</code> or <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">tailwind.config.js</code>, then reference them everywhere. This makes global changes trivial.
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Keep spacing and sizing consistent</h3>
          <p className="text-foreground-300 mb-6">
            Use multiples of the base spacing unit (0.25rem) to maintain visual rhythm. Don't use arbitrary values like <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">p-[13px]</code>.
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Extend, don't override</h3>
          <p className="text-foreground-300 mb-6">
            Use <code className="bg-background-900 text-foreground-200 px-2 py-1 rounded text-sm">theme.extend</code> in Tailwind config to add custom utilities. Overriding the base theme can break component consistency.
          </p>

          <h3 className="text-lg font-semibold text-foreground-100 mb-4">Avoid component className overrides for layout</h3>
          <p className="text-foreground-300 mb-6">
            Don't use className to override a component's core styles. Instead, wrap components or create variants. This preserves component semantics and accessibility.
          </p>
        </div>

        <div className="border-t border-background-700 my-16"></div>

        {/* Next Steps */}
        <div id="next-steps" className="mb-16">
          <h2 className="text-2xl font-bold text-foreground-50 mb-6">Next steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="/docs/best-practices" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
              <h3 className="text-foreground-50 font-semibold mb-2">Best practices</h3>
              <p className="text-foreground-400 text-sm">Learn patterns for scalable, maintainable component usage.</p>
            </a>
            <a href="/docs/accessibility" className="border border-background-700 hover:border-background-600 rounded p-6 transition-colors">
              <h3 className="text-foreground-50 font-semibold mb-2">Accessibility</h3>
              <p className="text-foreground-400 text-sm">Understand built-in a11y features and best practices.</p>
            </a>
          </div>
        </div>
        </main>
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
